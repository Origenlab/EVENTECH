#!/usr/bin/env node
'use strict';

const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const GENERATOR_PATH = path.join(ROOT, 'generar-articulos-rankerx-eventech-200-v2-diversidad-total.js');
const OUT = path.join(ROOT, 'rankerx-eventech-200-v2-diversidad-total-2026-07-10');
const ARTICLES_DIR = path.join(OUT, 'articulos');
const MANIFEST_PATH = path.join(OUT, 'manifest-eventech-200-v2-diversidad-total.json');

const LIMITS = Object.freeze({
  articles: 200,
  wordsMin: 4000,
  wordsMax: 6500,
  spintaxMin: 300,
  h2Min: 25,
  h3Min: 12,
  tablesMin: 3,
  listsMin: 4,
  faqExact: 10,
  decisionToolsMin: 2,
  topicsMin: 20,
  intentsMin: 10,
  titleFamiliesMin: 12,
  introFamiliesMin: 10,
  paragraphFamiliesMin: 12,
  architectureSignaturesMin: 12,
  representativeJaccardMax: 0.45,
  relatedJaccardMax: 0.60
});

function normalize(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/<[^>]*>/g, ' ')
    .replace(/[^a-z0-9ñ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function keywordAgrees(text, keyword) {
  const stopwords = new Set(['a', 'al', 'con', 'de', 'del', 'e', 'el', 'en', 'la', 'las', 'los', 'o', 'para', 'por', 'un', 'una', 'y']);
  const stem = (token) => {
    if (token.length > 5 && token.endsWith('es')) return token.slice(0, -2);
    if (token.length > 4 && token.endsWith('s')) return token.slice(0, -1);
    return token;
  };
  const expected = normalize(keyword).split(' ').filter((token) => token.length > 1 && !stopwords.has(token)).map(stem);
  const actual = new Set(normalize(text).split(' ').filter(Boolean).map(stem));
  const matched = expected.filter((token) => actual.has(token)).length;
  return expected.length > 0 && matched / expected.length >= 0.65;
}

function visibleText(html) {
  return String(html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function countWords(html) {
  const text = visibleText(html);
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

function sha256(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex');
}

function parseSpintax(source) {
  const text = String(source);
  const blocks = [];
  let open = -1;
  for (let index = 0; index < text.length; index += 1) {
    if (text[index] === '{') {
      if (open !== -1) throw new Error(`nested spintax at offset ${index}`);
      open = index;
    } else if (text[index] === '}') {
      if (open === -1) throw new Error(`closing brace without opener at offset ${index}`);
      const raw = text.slice(open + 1, index);
      const alternatives = raw.split('|');
      if (alternatives.length < 2) throw new Error(`spintax without alternatives at offset ${open}`);
      if (alternatives.some((entry) => entry.trim() === '')) throw new Error(`empty spintax alternative at offset ${open}`);
      blocks.push({ start: open, end: index, alternatives });
      open = -1;
    }
  }
  if (open !== -1) throw new Error(`unclosed spintax at offset ${open}`);
  return blocks;
}

function spinVariant(source, selector) {
  const blocks = parseSpintax(source);
  let cursor = 0;
  let output = '';
  for (const block of blocks) {
    output += source.slice(cursor, block.start);
    output += block.alternatives[selector % block.alternatives.length];
    cursor = block.end + 1;
  }
  return output + source.slice(cursor);
}

function htmlTagSequence(html) {
  const sequence = [];
  const stack = [];
  const voidTags = new Set(['br', 'hr', 'img', 'meta', 'link', 'input']);
  const tagPattern = /<\/?([a-z][a-z0-9-]*)\b[^>]*>/gi;
  let match;
  while ((match = tagPattern.exec(html)) !== null) {
    const full = match[0];
    const tag = match[1].toLowerCase();
    const closing = full.startsWith('</');
    const selfClosing = full.endsWith('/>') || voidTags.has(tag);
    sequence.push(`${closing ? '/' : ''}${tag}`);
    if (closing) {
      const expected = stack.pop();
      if (expected !== tag) throw new Error(`invalid HTML nesting: expected </${expected || 'none'}>, found </${tag}>`);
    } else if (!selfClosing) {
      stack.push(tag);
    }
  }
  if (stack.length) throw new Error(`unclosed HTML tags: ${stack.join(', ')}`);
  return sequence;
}

function countMatches(value, pattern) {
  return (String(value).match(pattern) || []).length;
}

function extractHeadings(body, tag) {
  const pattern = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi');
  return [...body.matchAll(pattern)].map((match) => normalize(spinVariant(match[1], 0)));
}

function extractParagraphs(body) {
  return [...body.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => normalize(match[1]))
    .filter(Boolean);
}

function architectureSignature(body) {
  const tags = htmlTagSequence(spinVariant(body, 0));
  return tags.slice(0, 180).join('>');
}

function shingles(html, size = 5) {
  const words = normalize(visibleText(html)).split(' ').filter(Boolean);
  const result = new Set();
  for (let index = 0; index <= words.length - size; index += 1) {
    result.add(words.slice(index, index + size).join(' '));
  }
  return result;
}

function jaccard(left, right) {
  let intersection = 0;
  for (const item of left) if (right.has(item)) intersection += 1;
  const union = left.size + right.size - intersection;
  return union ? intersection / union : 0;
}

function metricsFor(article) {
  const titleVariants = [0, 1, 2].map((selector) => spinVariant(article.title, selector));
  const bodyVariants = [0, 1, 2].map((selector) => spinVariant(article.body, selector));
  const h2 = extractHeadings(article.body, 'h2');
  const h3 = extractHeadings(article.body, 'h3');
  return {
    hash: sha256(article.body),
    titlePrefix: normalize(titleVariants[0]).slice(0, 140),
    titleVariants,
    bodyVariants,
    variantWords: bodyVariants.map(countWords),
    bodySpintaxBlocks: parseSpintax(article.body).length,
    h2Count: countMatches(article.body, /<h2\b[^>]*>/gi),
    h3Count: countMatches(article.body, /<h3\b[^>]*>/gi),
    tableCount: countMatches(article.body, /<table\b[^>]*>/gi),
    listCount: countMatches(article.body, /<(?:ul|ol)\b[^>]*>/gi),
    faqCount: countMatches(article.body, /<h3\s+data-faq-question="true">/gi),
    decisionToolCount: countMatches(article.body, /data-decision-tool="true"/gi),
    h2Signature: sha256(h2.join('|')),
    architectureSignature: sha256(architectureSignature(article.body)),
    paragraphCount: extractParagraphs(article.body).length,
    h2,
    h3
  };
}

function addError(errors, code, message) {
  errors.push({ code, message });
}

function validateArticle(article, options = {}) {
  const errors = [];
  const required = ['number', 'kind', 'slug', 'primaryKeyword', 'secondaryKeywords', 'title', 'body', 'authorName', 'authorBio', 'metrics'];
  for (const field of required) {
    if (!(field in article)) addError(errors, 'missing-field', `missing ${field}`);
  }
  if (errors.length) return { errors, metrics: null };
  if (!article.body.trim()) {
    addError(errors, 'empty-body', 'body is empty');
    return { errors, metrics: null };
  }

  let measured;
  try {
    parseSpintax(article.title);
    parseSpintax(article.body);
    measured = metricsFor(article);
  } catch (error) {
    const code = /spintax|brace/.test(error.message)
      ? 'invalid-spintax'
      : /HTML|tag|nesting/i.test(error.message)
        ? 'invalid-html'
        : 'invalid-structure';
    addError(errors, code, error.message);
    return { errors, metrics: null };
  }

  for (const variant of measured.bodyVariants) {
    try {
      htmlTagSequence(variant);
    } catch (error) {
      addError(errors, 'invalid-html', error.message);
      break;
    }
    if (/[{}]/.test(variant)) addError(errors, 'brace-residue', 'rendered variant retains a brace');
    if (/\s{2,}|\s+[,.!?;:]|(?:^|[>\s])[,.!?;:]/.test(visibleText(variant))) addError(errors, 'spacing-artifact', 'rendered variant contains a spacing artifact');
    if (/(?:\bla (?:proceso|recorrido|montaje)|\bel (?:decisión|herramienta|iluminación)|\bequipos (?:integrada|prevista)|\bpantallas (?:ubicado|preparado)|\báreas (?:definido|asignado))/i.test(visibleText(variant))) {
      addError(errors, 'agreement-artifact', 'rendered variant contains a known agreement artifact');
    }
  }

  if (measured.variantWords.some((value) => value < LIMITS.wordsMin || value > LIMITS.wordsMax)) addError(errors, 'underlength', `variant words ${measured.variantWords.join(', ')}`);
  if (measured.bodySpintaxBlocks < LIMITS.spintaxMin) addError(errors, 'missing-spintax', `${measured.bodySpintaxBlocks} body spintax blocks`);
  if (measured.h2Count < LIMITS.h2Min) addError(errors, 'missing-h2', `${measured.h2Count} H2`);
  if (measured.h3Count < LIMITS.h3Min) addError(errors, 'missing-h3', `${measured.h3Count} H3`);
  if (measured.tableCount < LIMITS.tablesMin) addError(errors, 'missing-tables', `${measured.tableCount} tables`);
  if (measured.listCount < LIMITS.listsMin) addError(errors, 'missing-lists', `${measured.listCount} lists`);
  if (measured.faqCount !== LIMITS.faqExact) addError(errors, 'missing-faq', `${measured.faqCount} FAQ questions`);
  if (measured.decisionToolCount < LIMITS.decisionToolsMin) addError(errors, 'missing-decision-tools', `${measured.decisionToolCount} decision tools`);

  const tableBodies = [...article.body.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/gi)].map((match) => match[1]);
  if (tableBodies.some((table) => countMatches(table, /<th\b/gi) < 3 || countMatches(table, /<tr\b/gi) < 4)) addError(errors, 'weak-table', 'a table lacks useful headers or rows');

  const intro = article.body.split(/<h2\b/i)[0];
  if (measured.titleVariants.some((title) => !keywordAgrees(title, article.primaryKeyword))) addError(errors, 'keyword-title', 'a title variant does not agree with the primary keyword');
  if ([0, 1, 2].some((selector) => !keywordAgrees(spinVariant(intro, selector), article.primaryKeyword))) addError(errors, 'keyword-intro', 'an introduction variant does not agree with the primary keyword');
  if (!Array.isArray(article.secondaryKeywords) || article.secondaryKeywords.length < 4 || article.secondaryKeywords.length > 8) addError(errors, 'secondary-keywords', 'secondary keywords must contain 4-8 entries');

  const fullText = `${article.title}\n${article.body}\n${article.authorName}\n${article.authorBio}`;
  const visible = `${measured.titleVariants.join(' ')} ${measured.bodyVariants.map(visibleText).join(' ')}`;
  if (/(?:https?:\/\/|www\.|href\s*=|<a\b|\.(?:com|mx)\b)/i.test(fullText)) addError(errors, 'url', 'URL or link detected');
  if (/(?:\$\s*\d|\b\d[\d.,]*\s*(?:pesos|mxn|usd|%|por ciento)\b|precio\s+(?:desde|de)|descuento|promoción)/i.test(visible)) addError(errors, 'prohibited-claim', 'price, promotion or statistic detected');
  if (/(?:reseñas?|calificaciones?|testimonios?|clientes? satisfechos?|casos? de éxito|certificad[oa]s?|certificación|garant(?:ía|izado|izamos)|(?:inventario\s+(?:disponible|propio|amplio|permanente)|en inventario|en stock)|entrega inmediata|mismo día|\b24\s*\/\s*7\b|cobertura nacional|todo México|toda la República|líder(?:es)?|número uno|los mejores|resultado(?:s)? asegurados|siempre\s+(?:ofrece|logra|produce|asegura|resuelve|funciona)|infalible)/i.test(visible)) addError(errors, 'prohibited-claim', 'unsupported or absolute claim detected');
  if (/(?:RankerX|XWizard|spintax|plantilla|generador|contenido automatizado|artículo número|criterio número|secuencia número|familia de título|familia de introducción|lenguaje interno|placeholder|hash del body|enfoque aprobado|intención de búsqueda|nota de calidad|instrucción interna)/i.test(visible)) addError(errors, 'internal-language', 'visible internal or generator language detected');
  if (/\b(?:diseno|personalizacion|instalacion|iluminacion|planeacion|informacion|coordinacion|revision|seleccion|logistica|gestion|asesoria|exposicion|demostracion|operacion|decision|tecnico|tecnica)\b/i.test(visible)) addError(errors, 'unaccented-spanish', 'unaccented professional Spanish detected');
  if (/\b(?:fotografía social|música en vivo|seguridad privada|boletaje|hospedaje)\b/i.test(visible)) addError(errors, 'unverified-service', 'unverified service detected');

  if (/\b(?:artículo|criterio|secuencia|plantilla)\s+(?:uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|\d+)\b/i.test(visible)) addError(errors, 'visible-sequence', 'visible numbering or template label detected');

  const metadataFields = ['hash', 'titlePrefix', 'variantWords', 'bodySpintaxBlocks', 'h2Count', 'h3Count', 'tableCount', 'listCount', 'faqCount', 'decisionToolCount', 'h2Signature', 'architectureSignature', 'paragraphCount'];
  if (!options.ignoreMetadata) {
    for (const field of metadataFields) {
      if (!Object.prototype.hasOwnProperty.call(article.metrics, field) || JSON.stringify(article.metrics[field]) !== JSON.stringify(measured[field])) {
        addError(errors, 'stale-metadata', `stale metrics.${field}`);
      }
    }
  }
  return { errors, metrics: measured };
}

function validateCorpus(articles, manifest = null, options = {}) {
  const errors = [];
  if (articles.length !== LIMITS.articles) addError(errors, 'article-count', `expected 200 articles, found ${articles.length}`);
  const measured = [];
  for (const article of articles) {
    const result = validateArticle(article, options);
    measured.push(result.metrics);
    errors.push(...result.errors.map((entry) => ({ ...entry, article: article.number })));
  }
  if (errors.some((entry) => !measured[entry.article ? entry.article - 1 : 0])) return { valid: false, errors, summary: null };

  const uniqueChecks = [
    ['numbers', articles.map((article) => article.number)],
    ['slugs', articles.map((article) => article.slug)],
    ['titles', measured.map((item) => normalize(item.titleVariants[0]))],
    ['title-prefixes', measured.map((item) => item.titlePrefix)],
    ['body-hashes', measured.map((item) => item.hash)],
    ['h2-signatures', measured.map((item) => item.h2Signature)]
  ];
  for (const [label, values] of uniqueChecks) {
    if (new Set(values).size !== LIMITS.articles) addError(errors, `duplicate-${label}`, `${label} are not unique`);
  }

  const naturalPrefixFailures = measured.filter((item) => /\b(?:articulo|criterio|secuencia|plantilla)\b|^\d+\b/.test(item.titlePrefix));
  if (naturalPrefixFailures.length) addError(errors, 'unnatural-title-prefix', `${naturalPrefixFailures.length} unnatural title prefixes`);

  const paragraphUse = new Map();
  for (const article of articles) {
    for (const paragraph of extractParagraphs(article.body)) paragraphUse.set(paragraph, (paragraphUse.get(paragraph) || 0) + 1);
  }
  const maximumParagraphReuse = Math.max(0, ...paragraphUse.values());
  if (maximumParagraphReuse > 1) addError(errors, 'paragraph-reuse', `maximum exact paragraph reuse is ${maximumParagraphReuse}`);

  const topics = new Set(articles.map((article) => article.topicKey));
  const intents = new Set(articles.map((article) => article.intentKey));
  const titleFamilies = new Set(articles.map((article) => article.diversity && article.diversity.titleFamily));
  const introFamilies = new Set(articles.map((article) => article.diversity && article.diversity.introFamily));
  const paragraphFamilies = new Set(articles.flatMap((article) => (article.diversity && article.diversity.paragraphFamilies) || []));
  const architectures = new Set(measured.map((item) => item.architectureSignature));
  if (topics.size < LIMITS.topicsMin) addError(errors, 'topic-coverage', `${topics.size} topics`);
  if (intents.size < LIMITS.intentsMin) addError(errors, 'intent-coverage', `${intents.size} intents`);
  if (titleFamilies.size < LIMITS.titleFamiliesMin) addError(errors, 'title-families', `${titleFamilies.size} title families`);
  if (introFamilies.size < LIMITS.introFamiliesMin) addError(errors, 'intro-families', `${introFamilies.size} intro families`);
  if (paragraphFamilies.size < LIMITS.paragraphFamiliesMin) addError(errors, 'paragraph-families', `${paragraphFamilies.size} paragraph families`);
  if (architectures.size < LIMITS.architectureSignaturesMin) addError(errors, 'architecture-signatures', `${architectures.size} architecture signatures`);

  const families = [...new Set(articles.map((article) => article.kind))];
  const representatives = families.map((kind) => articles.find((article) => article.kind === kind)).filter(Boolean);
  let maximumRepresentativeJaccard = 0;
  for (let left = 0; left < representatives.length; left += 1) {
    for (let right = left + 1; right < representatives.length; right += 1) {
      maximumRepresentativeJaccard = Math.max(maximumRepresentativeJaccard, jaccard(shingles(spinVariant(representatives[left].body, 0)), shingles(spinVariant(representatives[right].body, 0))));
    }
  }
  if (maximumRepresentativeJaccard >= LIMITS.representativeJaccardMax) addError(errors, 'representative-similarity', `representative Jaccard ${maximumRepresentativeJaccard}`);

  let maximumRelatedJaccard = 0;
  const relatedPairs = [];
  for (let index = 0; index < articles.length; index += 1) {
    if (index + 1 < articles.length) relatedPairs.push([articles[index], articles[index + 1]]);
    const sameTopic = articles.find((candidate, candidateIndex) => candidateIndex > index && candidate.topicKey === articles[index].topicKey);
    if (sameTopic) relatedPairs.push([articles[index], sameTopic]);
  }
  for (const [left, right] of relatedPairs) {
    maximumRelatedJaccard = Math.max(maximumRelatedJaccard, jaccard(shingles(spinVariant(left.body, 1)), shingles(spinVariant(right.body, 1))));
  }
  if (maximumRelatedJaccard >= LIMITS.relatedJaccardMax) addError(errors, 'related-similarity', `related Jaccard ${maximumRelatedJaccard}`);

  if (manifest) {
    if (!Array.isArray(manifest.articles) || manifest.articles.length !== LIMITS.articles) addError(errors, 'manifest-count', 'manifest must contain 200 entries');
    else {
      for (let index = 0; index < articles.length; index += 1) {
        const entry = manifest.articles[index];
        if (entry.number !== articles[index].number || entry.slug !== articles[index].slug || entry.hash !== measured[index].hash) addError(errors, 'stale-manifest', `manifest entry ${index + 1} is stale`);
      }
    }
  }

  const allWords = measured.flatMap((item) => item.variantWords);
  const allSpintax = measured.map((item) => item.bodySpintaxBlocks);
  const allH2 = measured.map((item) => item.h2Count);
  const allH3 = measured.map((item) => item.h3Count);
  const allTables = measured.map((item) => item.tableCount);
  const allLists = measured.map((item) => item.listCount);
  const summary = {
    articles: articles.length,
    manifestEntries: manifest && Array.isArray(manifest.articles) ? manifest.articles.length : 0,
    uniqueSlugs: new Set(articles.map((article) => article.slug)).size,
    uniqueTitles: new Set(measured.map((item) => normalize(item.titleVariants[0]))).size,
    uniqueTitlePrefixes: new Set(measured.map((item) => item.titlePrefix)).size,
    uniqueBodyHashes: new Set(measured.map((item) => item.hash)).size,
    uniqueH2Signatures: new Set(measured.map((item) => item.h2Signature)).size,
    topics: topics.size,
    intents: intents.size,
    titleFamilies: titleFamilies.size,
    introFamilies: introFamilies.size,
    paragraphFamilies: paragraphFamilies.size,
    architectureSignatures: architectures.size,
    variantWordsMin: Math.min(...allWords),
    variantWordsMax: Math.max(...allWords),
    bodySpintaxMin: Math.min(...allSpintax),
    bodySpintaxMax: Math.max(...allSpintax),
    h2Min: Math.min(...allH2),
    h2Max: Math.max(...allH2),
    h3Min: Math.min(...allH3),
    h3Max: Math.max(...allH3),
    tablesMin: Math.min(...allTables),
    tablesMax: Math.max(...allTables),
    listsMin: Math.min(...allLists),
    listsMax: Math.max(...allLists),
    faqExact: Math.min(...measured.map((item) => item.faqCount)),
    decisionToolsMin: Math.min(...measured.map((item) => item.decisionToolCount)),
    decisionToolsMax: Math.max(...measured.map((item) => item.decisionToolCount)),
    paragraphsMin: Math.min(...measured.map((item) => item.paragraphCount)),
    paragraphsMax: Math.max(...measured.map((item) => item.paragraphCount)),
    maximumParagraphReuse,
    maximumRepresentativeJaccard,
    maximumRelatedJaccard
  };
  return { valid: errors.length === 0, errors, summary };
}

function validationReport(output, articles) {
  const kindDistribution = Object.fromEntries([...new Set(articles.map((article) => article.kind))].map((kind) => [kind, articles.filter((article) => article.kind === kind).length]));
  const pilotEntries = articles.filter((article) => article.diversity && article.diversity.approvedPilotSource);
  return `# Validación EVENTECH V2 diversidad total

Fecha: 2026-07-10

## Estado

VALIDACIÓN APROBADA. El validador recomputó estructura, spintax, variantes, hashes, similitud y restricciones editoriales desde los bodies persistidos. No se utilizaron métricas declaradas como sustituto de estas mediciones.

## Integridad del corpus

| Métrica | Resultado |
|---|---:|
| JSON fuente | ${output.articles} |
| Entradas de manifiesto | ${output.manifestEntries} |
| Títulos naturales únicos | ${output.uniqueTitles} |
| Prefijos naturales únicos | ${output.uniqueTitlePrefixes} |
| Slugs únicos | ${output.uniqueSlugs} |
| Hashes SHA-256 únicos | ${output.uniqueBodyHashes} |
| Firmas H2 únicas | ${output.uniqueH2Signatures} |
| Temas verificados | ${output.topics} |
| Intenciones y audiencias | ${output.intents} |
| Pilotos aprobados refinados | ${pilotEntries.length} |

## Diversidad

| Métrica | Resultado |
|---|---:|
| Familias de título | ${output.titleFamilies} |
| Familias de introducción | ${output.introFamilies} |
| Familias de párrafo | ${output.paragraphFamilies} |
| Firmas de arquitectura HTML | ${output.architectureSignatures} |
| Reutilización máxima de párrafo exacto | ${output.maximumParagraphReuse} |
| Jaccard máximo representativo entre familias | ${output.maximumRepresentativeJaccard.toFixed(12)} |
| Jaccard máximo de tema repetido o pareja vecina | ${output.maximumRelatedJaccard.toFixed(12)} |

## Métricas por artículo

| Métrica | Rango o valor |
|---|---:|
| Palabras por variante girada | ${output.variantWordsMin} a ${output.variantWordsMax} |
| Bloques válidos de spintax en body | ${output.bodySpintaxMin} a ${output.bodySpintaxMax} |
| H2 | ${output.h2Min} a ${output.h2Max} |
| H3 | ${output.h3Min} a ${output.h3Max} |
| Tablas útiles | ${output.tablesMin} a ${output.tablesMax} |
| Listas | ${output.listsMin} a ${output.listsMax} |
| FAQ con atributo requerido | ${output.faqExact} exactas |
| Herramientas de decisión | ${output.decisionToolsMin} a ${output.decisionToolsMax} |
| Párrafos | ${output.paragraphsMin} a ${output.paragraphsMax} |
| Variantes renderizadas y parseadas | ${output.articles * 3} |

## Distribución editorial

${Object.entries(kindDistribution).map(([kind, count]) => `- ${kind}: ${count}`).join('\n')}

## Controles editoriales y técnicos

- HTML anidado correctamente en selectores 0, 1 y 2.
- Cero llaves residuales, alternativas vacías o spintax anidado.
- Cero URLs, enlaces, precios, promociones, reseñas, ratings, clientes, certificaciones, garantías, cobertura, inventario promocional, estadísticas o resultados absolutos.
- Concordancia semántica entre keyword primaria, título e introducción en las tres variantes.
- Servicios limitados a la base factual verificada de EVENTECH.
- Cero lenguaje visible de generador, plantillas, secuencias o numeración editorial.

## Mutaciones adversariales

Se detectaron ${output.adversarialMutations} de ${output.adversarialMutations} mutaciones: body vacío, body duplicado con hash actualizado, body corto con métricas actualizadas, metadatos obsoletos, spintax inválido, HTML inválido, claim prohibido y estructuras faltantes.

## Comandos reproducibles

\`\`\`bash
node generar-articulos-rankerx-eventech-200-v2-diversidad-total.js
node EVENTECH/tests/validate-eventech-v2-diversidad-total.cjs
\`\`\`
`;
}

function refreshMetrics(article) {
  const copy = structuredClone(article);
  copy.metrics = metricsFor(copy);
  delete copy.metrics.titleVariants;
  delete copy.metrics.bodyVariants;
  delete copy.metrics.h2;
  delete copy.metrics.h3;
  return copy;
}

function assertMutationDetected(base, name, mutate, expectedCode) {
  const changed = mutate(structuredClone(base));
  const result = validateArticle(changed);
  assert(result.errors.some((entry) => entry.code === expectedCode), `${name} mutation was not detected as ${expectedCode}: ${JSON.stringify(result.errors)}`);
}

function runAdversarialMutations(articles) {
  const base = articles[50];
  assertMutationDetected(base, 'empty body', (article) => { article.body = ''; return article; }, 'empty-body');
  assertMutationDetected(base, 'refreshed underlength', (article) => refreshMetrics({ ...article, body: '<article><p>{Texto breve|Frase breve|Nota breve}.</p></article>' }), 'underlength');
  assertMutationDetected(base, 'stale metadata', (article) => { article.metrics.hash = '0'.repeat(64); return article; }, 'stale-metadata');
  assertMutationDetected(base, 'invalid spintax', (article) => { article.body += '<p>{alternativa|}</p>'; return article; }, 'invalid-spintax');
  assertMutationDetected(base, 'invalid HTML', (article) => { article.body += '<section><p>Bloque roto.</section></p>'; return article; }, 'invalid-html');
  assertMutationDetected(base, 'prohibited claim', (article) => { article.body = article.body.replace('</article>', '<p>Ofrecemos garantía y entrega inmediata.</p></article>'); return refreshMetrics(article); }, 'prohibited-claim');
  assertMutationDetected(base, 'missing structures', (article) => { article.body = article.body.replace(/<table\b[^>]*>[\s\S]*?<\/table>/gi, ''); return refreshMetrics(article); }, 'missing-tables');

  const duplicate = refreshMetrics({ ...articles[1], body: articles[0].body, title: articles[1].title });
  const pairResult = validateCorpus([articles[0], duplicate], null, { ignoreMetadata: false });
  assert(pairResult.errors.some((entry) => entry.code === 'duplicate-body-hashes'), 'refreshed duplicate body mutation was not detected');
  return 8;
}

function loadCorpus() {
  assert(fs.existsSync(GENERATOR_PATH), `Missing generator: ${GENERATOR_PATH}`);
  assert(fs.existsSync(ARTICLES_DIR), `Missing article directory: ${ARTICLES_DIR}`);
  const files = fs.readdirSync(ARTICLES_DIR).filter((file) => /^eventech-v2-[a-z0-9-]+\.json$/.test(file)).sort();
  assert.strictEqual(files.length, LIMITS.articles, `Expected exactly 200 source JSON files, found ${files.length}`);
  const articles = files.map((file) => JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8'))).sort((left, right) => left.number - right.number);
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  return { articles, manifest };
}

function main() {
  const { articles, manifest } = loadCorpus();
  const result = validateCorpus(articles, manifest);
  if (!result.valid) {
    for (const error of result.errors.slice(0, 80)) console.error(`${error.code}${error.article ? ` [${error.article}]` : ''}: ${error.message}`);
    throw new Error(`EVENTECH V2 validation failed with ${result.errors.length} error(s)`);
  }
  const adversarialMutations = runAdversarialMutations(articles);
  const output = { ...result.summary, adversarialMutations, validationErrors: 0 };
  fs.writeFileSync(path.join(OUT, 'README-VALIDACION.md'), validationReport(output, articles));
  console.log(JSON.stringify(output, null, 2));
  return output;
}

module.exports = {
  LIMITS,
  architectureSignature,
  countWords,
  extractParagraphs,
  htmlTagSequence,
  jaccard,
  keywordAgrees,
  metricsFor,
  normalize,
  parseSpintax,
  refreshMetrics,
  runAdversarialMutations,
  sha256,
  shingles,
  spinVariant,
  validateArticle,
  validateCorpus,
  visibleText
};

if (require.main === module) main();
