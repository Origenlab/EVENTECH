// scripts/validate-mdx.mjs
// Cacha bugs comunes de MDX antes de mandar al build de Astro/CF Pages.
// Diseñado para correr en pre-push hook local Y en CI (GitHub Actions).
// Falla rápido (~1-2s). Ningún dependency externo.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const COMPONENTS_DIR = path.join(ROOT, 'src', 'components');

// Reglas de validación
const RULES = {
  // Tags de cierre con espacio: </Stats Grid> -> bug, debe ser </StatsGrid>
  badClosingTag: /<\/[A-Z][a-zA-Z0-9]*\s+[A-Z][a-zA-Z0-9]*>/g,

  // Tags de cierre con atributos: </AlertBox type="info"> -> bug
  closingWithAttr: /<\/[A-Z][a-zA-Z0-9]+\s+[a-z][^>]*>/g,
};

// Componentes con props REQUERIDOS (debe pasarlos)
const REQUIRED_PROPS = {
  StepList:        ['items'],
  FeatureList:     ['items'],
  FAQAccordion:    ['items'],
  ProsCons:        ['pros', 'cons'],
  ComparisonTable: ['headers'],
  CTABox:          ['title', 'buttonText', 'buttonLink'],
  StatCard:        ['value', 'label'],
};

// Mapeo de nombres-de-prop equivocados frecuentes
const PROP_ALIASES = {
  StepList:    { steps: 'items' },
  FeatureList: { features: 'items' },
  FAQAccordion:{ faqs: 'items', questions: 'items' },
};

function listMdx(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(n => n.endsWith('.mdx') || n.endsWith('.md'))
    .map(n => path.join(dir, n));
}

function buildComponentIndex() {
  // Mapea NombreComponente -> ruta relativa a src/ (sin extensión)
  const idx = {};
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.isFile() && e.name.endsWith('.astro')) {
        const name = e.name.replace(/\.astro$/, '');
        idx[name] = p;
      }
    }
  }
  walk(COMPONENTS_DIR);
  return idx;
}

function validateImports(content, file, componentIdx, errors) {
  // import X from '@components/SOMETHING.astro' o '../components/X.astro'
  const importRe = /^import\s+(\w+)\s+from\s+['"]([^'"]+\.astro)['"];?/gm;
  const fileDir = path.dirname(path.join(ROOT, file));
  let m;
  while ((m = importRe.exec(content))) {
    const [, name, importPath] = m;
    let fullPath;
    if (importPath.startsWith('.')) {
      // Path relativo: resolver desde el directorio del archivo
      fullPath = path.resolve(fileDir, importPath);
    } else {
      // Alias path: resolver vía aliasMap
      const aliasMap = {
        '@components/': 'src/components/',
        '@/components/': 'src/components/',
        '@layouts/': 'src/layouts/',
        '@/layouts/': 'src/layouts/',
        '@/': 'src/',
      };
      let resolved = importPath;
      let matched = false;
      for (const [alias, real] of Object.entries(aliasMap)) {
        if (importPath.startsWith(alias)) {
          resolved = importPath.replace(alias, real);
          matched = true;
          break;
        }
      }
      if (!matched) continue; // bare module import, asumir que npm lo resuelve
      fullPath = path.join(ROOT, resolved);
    }
    if (!fs.existsSync(fullPath)) {
      const suggestion = componentIdx[name]
        ? ` -> sugerido: '@${path.relative(path.join(ROOT,'src'), componentIdx[name]).replace(/\\/g,'/')}'`
        : '';
      errors.push(`${file}: import '${importPath}' no existe (componente ${name})${suggestion}`);
    }
  }
}

function validateClosingTags(content, file, errors) {
  for (const [name, re] of Object.entries(RULES)) {
    const matches = [...content.matchAll(re)];
    for (const m of matches) {
      const lineNum = content.slice(0, m.index).split('\n').length;
      errors.push(`${file}:${lineNum}: ${name} -> "${m[0]}"`);
    }
  }
}

function validateProps(content, file, errors, warnings) {
  for (const [comp, requiredProps] of Object.entries(REQUIRED_PROPS)) {
    // Match opening tag of <Component ...>
    const re = new RegExp(`<${comp}\\b([^/>]*?)(?:/>|>)`, 'gs');
    let m;
    while ((m = re.exec(content))) {
      const attrs = m[1];
      const props = new Set();
      for (const am of attrs.matchAll(/(\w+)=\{/g)) props.add(am[1]);
      for (const am of attrs.matchAll(/(\w+)=\"/g)) props.add(am[1]);

      const lineNum = content.slice(0, m.index).split('\n').length;

      // Aliases: detecta props mal-nombrados
      const aliases = PROP_ALIASES[comp] || {};
      for (const wrong of Object.keys(aliases)) {
        if (props.has(wrong)) {
          errors.push(`${file}:${lineNum}: <${comp}> usa prop '${wrong}={...}' -> debe ser '${aliases[wrong]}={...}'`);
        }
      }

      // Required props
      for (const req of requiredProps) {
        if (!props.has(req)) {
          // Si tiene un alias mal-nombrado, ya lo reportamos arriba; no duplicar
          const aliasedFrom = Object.entries(aliases).find(([_, v]) => v === req);
          if (aliasedFrom && props.has(aliasedFrom[0])) continue;
          errors.push(`${file}:${lineNum}: <${comp}> falta prop requerido '${req}'`);
        }
      }
    }
  }
}

function main() {
  const files = listMdx(BLOG_DIR);
  if (files.length === 0) {
    console.log('validate-mdx: sin archivos .mdx — OK');
    return;
  }
  const componentIdx = buildComponentIndex();

  const errors = [];
  const warnings = [];

  for (const f of files) {
    const rel = path.relative(ROOT, f);
    const content = fs.readFileSync(f, 'utf8');
    validateImports(content, rel, componentIdx, errors);
    validateClosingTags(content, rel, errors);
    validateProps(content, rel, errors, warnings);
  }

  if (warnings.length) {
    console.warn('validate-mdx WARNINGS:');
    warnings.forEach(w => console.warn('  ' + w));
  }

  if (errors.length) {
    console.error(`validate-mdx FAIL: ${errors.length} error(es) en ${files.length} archivo(s)`);
    errors.forEach(e => console.error('  ' + e));
    process.exit(1);
  }

  console.log(`validate-mdx OK: ${files.length} archivos, ${Object.keys(componentIdx).length} componentes mapeados`);
}

main();
