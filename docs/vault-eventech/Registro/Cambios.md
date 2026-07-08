# Registro de cambios

Changelog de todo lo generado, para mantener homologación. Fechas absolutas.

## 2026-07-04 (2) — Migración DNS a Cloudflare Pages completada

eventech.mx migrado de GitHub Pages a **Cloudflare Pages** (via Claude en Chrome + verificación externa):

- **Zona DNS movida** a la cuenta CF de Frank (`711c2e12a6bd9cec3ec5c6a7633f147c`, ccarsolio@gmail.com). Antes vivía en una cuenta Cloudflare desconocida (NS terin/may — nunca identificada; ya irrelevante). Nuevos NS: `eleanor.ns.cloudflare.com` / `ryan.ns.cloudflare.com`, cambiados en el registrador **HOSPEDANDO.MX** (dominio vence 2027-02-14, sin DNSSEC).
- **Custom domains** eventech.mx y www.eventech.mx → proyecto Pages `eventech` (**eventech-3dd.pages.dev** — ojo: `eventech.pages.dev` NO es nuestro, es un sitio francés de terceros). Zona solo con 2 CNAME proxied (apex y www); TXT intactos.
- **Verificado:** NS propagados, sin header `x-github-request-id`, llms.txt/computo/www → 200.
- **Retirado `deploy-ghpages.yml`** (dual deploy temporal del 2026-07-04). Pipeline canónico: solo `deploy.yml` → wrangler → CF Pages.
- **Pendientes:** (a) el dominio NO tiene registros MX — contacto@eventech.mx no recibe correo; elegir proveedor y crear MX. (b) En el dash de Cloudflare apareció repetidamente un widget "Enable Agent Lee access / Create Token" — NO es funcionalidad de Cloudflare, no se tocó; revisar extensiones de Chrome.

## 2026-07-04

### Implementación plan ZeroRank (AEO) — técnico, schema, cómputo, confianza

**Contexto:** informe de visibilidad IA (26% visibilidad, rank #2.5, AI Readiness 59/100). Auditoría previa reveló que el informe estaba parcialmente desactualizado: llms.txt, sitemap-index, robots IA, BreadcrumbList (240 pág.), FAQ (235), Article+autor (blog) ya existían.

**1. Infraestructura técnica:**
- `public/robots.txt`: añadidos `PerplexityBot`, `Perplexity-User`, `OAI-SearchBot`, `ChatGPT-User` (Allow /).
- `public/llms.txt`: añadida línea de servicio **Cómputo para eventos**; nueva sección **Enlaces canónicos principales** (15 URLs); nueva sección **Señales de confianza** (constitución 2024 + equipo fundador 30 años, 500+ eventos, 3 oficinas, CFDI, seguro RC, Google Maps).

**2. Schema JSON-LD:**
- `src/lib/seo.ts` → `serviceJsonLd()` ahora emite multi-type `["Service","Product"]` + `brand`. Propaga a **228 páginas** de servicio (vía `serviceWithReviewJsonLd` incluido). Cierra el check Product de ZeroRank sin tocar páginas individuales.
- `src/pages/cotizar/index.astro`: añadido **HowTo** "Cómo cotizar la renta de equipo para tu evento paso a paso" (4 pasos, PT24H).
- Ya existentes (sin cambios): BreadcrumbList sitewide, FAQPage, Article con autor, Organization/WebSite/LocalBusiness. Nota: ratings auto-emitidos siguen deshabilitados (política Google).

**3. Nueva categoría CÓMPUTO (visibilidad 0% → línea completa):**
- Creados: `servicios/computo/index.astro` (hub L3 sistema hm-), + 4 L4: `laptops`, `ipads-tablets`, `pcs-escritorio`, `impresion-perifericos`. Template = catering (L3) y refrigeración (L4). Acento azul #2563eb. Precios orientativos MXN por día. 6 FAQs por página. Frases de citación integradas ("renta de computadoras para eventos CDMX", etc.).
- Integración: `SERVICE_CATEGORIES` en `site.ts` (icon laptop), `navigation.ts` (mainNav + footer), `interlinking.ts`, `RelatedContent`/`CtaBar` (SVG laptop), `servicios/index.astro` (9 categorías, módulo idx 7), `que-es-eventech.astro`.
- Sin fotos reales de cómputo: imágenes contextuales existentes + placeholders "Imagen próximamente". ProductCards → `#reserva-heading` (no hay L5 aún). **Pendiente:** generar fotos y L5.

**4. Confianza (objeción "30 años" detectada por modelos de IA):**
- **Decisión del usuario:** empresa constituida 2024, equipo fundador con 30+ años de oficio (desde 1994). Reframe aplicado en `index.astro` (10 menciones), `nosotros/index.astro` (hero, historia, FAQ, meta description, eyebrows "Oficio desde 1994", card final del timeline → "2024 · Nace EVENTECH S.A. de C.V."). foundingDate 2024 en schema queda coherente con el copy. Menciones "30 años" de terceros (PALED, proveedor iluminación) en blog: sin cambios, son de otras empresas.

**5. Fixes de build preexistentes** (bloqueaban compilación): 6 venues con `phone` duplicado, enums inválidos en 4 venues, 22 `shortDescription` >160, 1 seoTitle >70, 5 seoDescription >160.

**6. Incidente de deploy descubierto y resuelto:** eventech.mx (DNS → GH Pages via proxy Cloudflare) estaba **congelado en el build del 16-jun** porque el pipeline se migró a Cloudflare Pages y GH Pages dejó de recibir deploys — llms.txt y los artículos del 27-jun nunca estuvieron live. Fix: restaurado `deploy-ghpages.yml` (dual deploy temporal). **Pendiente: migrar DNS a eventech.pages.dev y retirar dual deploy.** Verificado live: computo 200, llms.txt 200, PerplexityBot en robots, HowTo en /cotizar, Product schema en L5.

**Pendiente (backlog off-page, no código):** gestiones editoriales en lugaresparaeventos.mx y bodas.com.mx (alta), participación auténtica en Facebook/YouTube/Reddit (r/sweatystartup, r/Changarrito, r/CDMX), WebMCP (evaluar), contenido blog inflables/mobiliario/carpas, listicle "mejores empresas renta de equipo CDMX".

## 2026-06-15

### Auditoría y optimización integral de mobiliario (78 páginas)
Auditoría completa de `/servicios/mobiliario/` (L3 + 4 hubs L4 + 17 L5 + ~56 L6). Hallazgos y correcciones:

- **Color homologado al 100%:** se detectaron **68 páginas L5/L6** con override de acento fuera de marca (morado #6c5ce7, ámbar #e17055, café, azul, verde, etc.). Script reescribió las 7 variables `--*-accent` al **dorado institucional #c2a24a** en todas. Verificado: 0 acentos no-dorado en todo mobiliario.
- **122 imágenes rotas corregidas:** 19 páginas L6 (plegables ×4, barras-bebidas ×3, periqueras ×3, accesorios ×2, salas-lounge variantes) referenciaban imágenes inexistentes en `/public` (esquemas de nombres nunca generados, 9 por página en los peores casos). Se sustituyeron por imágenes reales del pool por tipo (`silla-plegable-plastico-*`, `barra-bebidas-*`, `periqueras-*`, candelabros, `lounge-*`, etc.). Verificado: 0 imágenes rotas en mobiliario.
- **Marca:** corregida mención "EVENTECH" en subtítulo de `crossback/caoba` (la regla aplica a `<title>`/meta; se conserva la mención natural dentro de un testimonio de cliente).
- **OK confirmado:** las 78 páginas usan el componente `<Breadcrumbs>`; títulos sin marca; bloques de override completos. Hubs L4 en sistema `hm-` dorado.

### Homologación L4 hubs de mobiliario — template = hub de SILLAS (sistema hm-)
**Decisión del usuario (corrige la anterior):** el homólogo/template de los hubs L4 de mobiliario es **`/servicios/mobiliario/sillas/`** (sistema `hm-`: hero navy, `hm-menu`, `hm-cat-grid`, `hm-feat` zig-zag con galería `--g3`, `hm-why` navy, `hm-steps`, `hm-faqx` con formulario). NO el sistema de componentes. Los hubs se reconstruyen a ese molde.

- **`mesas/index.astro` reconstruido por completo** al sistema `hm-`, homólogo de sillas en layout, complementos e implementación. Importa `home-2026.css` (no l3/l4-shared), dorado institucional por defecto (sin override de color). Contenido de mesas: 4 formatos (Redondas, Rectangulares, Cocktail, Tablones) con `SUB_SERVICES`, `whyFeatures` (6), `steps` (4), `faqs` (7), `hm-feat` (4) con chips → L6 y galería g3, formulario WhatsApp (`#mesasForm`). Título sin marca + `rawTitle`, JSON-LD (service+breadcrumb+faq). Imágenes y rutas L5/L6 verificadas.
- **`salas-lounge/index.astro` reconstruido por completo** al sistema `hm-`, homólogo de sillas/mesas. Contenido: 4 estilos (Moderno, Vintage, Boho, Elegante) con `SUB_SERVICES`, `whyFeatures` (6), `steps` (4), `faqs` (7), `hm-feat` (4) con chips → L6 y galería g3, formulario WhatsApp (`#loungeForm`). Dorado por defecto (home-2026.css, sin override morado). Título sin marca + `rawTitle`, JSON-LD. Imágenes y rutas L5/L6 verificadas.
- **`barras/index.astro` reconstruido por completo** al sistema `hm-`, homólogo de sillas. Contenido: 4 líneas (Barras de Bebidas, Periqueras, Mesas de Postres, Accesorios Decorativos) con `SUB_SERVICES`, `whyFeatures` (6), `steps` (4), `faqs` (7), `hm-feat` (4) con chips → L6 y galería g3, formulario WhatsApp (`#barrasForm`). Dorado por defecto. Título sin marca + `rawTitle`, JSON-LD. 12 imágenes + 12 rutas L6 verificadas.
- **✅ COMPLETO — los 4 hubs L4 de mobiliario homologados al sistema `hm-`:** `sillas` (template), `mesas`, `salas-lounge`, `barras`. Mismo layout, complementos, dorado institucional. Template documentado en [[Template-L4-hub]].

### Acento de las páginas de sillas — homologado al DORADO institucional `#c2a24a`
Las 5 páginas de detalle de sillas (`tiffany`, `chiavari`, `ghost`, `plegables`, `crossback`) overrideaban `--color-accent` a **ámbar `#e17055`** en su `<style is:global>`, lo que las hacía verse naranjas y fuera de línea respecto al resto del sitio (index, hubs L2/L3/L4) que usa el **dorado de marca `#c2a24a`** (token `--color-gold`).

- En las 5 se reemplazó el bloque `:root` ámbar por el dorado institucional: `--color-accent:#c2a24a`, `-hover:#a9883a` (gold-deep), `-light:#d4b96a`, `-soft/gradient/shadow` derivados. Comentario actualizado a "ACENTO INSTITUCIONAL".
- Afecta highlight del hero, botones primarios/secundarios, badges, links, tags y CTAs — todo el acento de cada página.
- **Regla de marca:** la sección sillas usa el dorado institucional, NO acentos por categoría. (El sitio tiene 220 páginas con overrides de color variados — pendiente revisar si se quieren homologar también, pero fuera del alcance de sillas.)
- **Nota dev:** el watcher de Vite sobre la carpeta montada a veces no recompila el `<style is:global>` de un `.astro`; si un cambio de color no aparece, `touch` al archivo o reinicio del dev server lo fuerza (no es problema del código).

### Migas de pan — homologadas 100% al componente (SITEWIDE)
Había **dos implementaciones** conviviendo: 223 páginas usaban el componente `<Breadcrumbs>` (markup `.bc-*`, estilos scoped) y **13 hubs L2/L3** usaban markup crudo `<nav class="sv-breadcrumb">` dentro de `.hm-breadcrumb-bar` (estilos en `home-2026.css`). Se notaba en sillas: el hub `sillas/index` se veía distinto a sus hijas (tiffany, chiavari…).

- **Migradas las 13** a `<Breadcrumbs items={breadcrumbItems} slot="breadcrumbs" />**: `nosotros`, `directorio`, `blog/[...page]`, `servicios/index` y las 8 categorías L3 (`carpas`, `audiovisual`, `inflables`, `iluminacion`, `pistas-baile`, `accesorios`, `mobiliario`, `catering`) + `mobiliario/sillas/index`. En cada una: añadido `import Breadcrumbs`, `const breadcrumbItems = [...]` (extraído del markup crudo, mismo orden/labels/hrefs) y reemplazado el bloque `<div class="hm-breadcrumb-bar">…</nav></div></div>`.
- **Resultado:** 236/245 páginas con la MISMA miga (las 9 sin miga son correctas: home, 404, rutas catch-all dinámicas, cotizar, eventos/index).
- **CSS muerto retirado** de `home-2026.css` (~48 líneas): `.hm-breadcrumb-bar`, `.hm-bc__*` y `.hm-breadcrumb-bar .sv-breadcrumb`. El componente es autocontenido (`.bc-*` scoped) y no depende de `home-2026.css`. Se conservó el bloque legacy `.sv-breadcrumb` de hero (inerte).
- **Color de la miga = dorado institucional `#c2a24a` (FIJO, sitewide).** Se probó `var(--color-accent)` para tomar el acento por página pero se **revirtió**: la miga debe respetar el dorado de marca aprobado en todas las páginas, no el accent por página (que en sillas es ámbar y en hubs teal). Regla: la miga NO cambia de color por página.


### Homologación L5 de Sillas — sección "Acabados / elige el tuyo"
Página modelo aprobada: `sillas/tiffany/` (L5). Se replicó su sección **Acabados** (grid de 4 `ProductCard` que enlazan a las variantes L6) a las otras 4 L5 de sillas, que ya compartían el resto del esqueleto (hero, 2 CTABanner, specs, 4 ServiceShowcase galería-3, FAQ, sidebar sticky, formulario reserva, proveedores, CTABanner accent, override ámbar).

- **Patrón insertado** en `chiavari`, `crossback`, `ghost`, `plegables`: `import ProductCard` + `<section aria-labelledby="acabados-heading">` con `SectionHeader` + `<div class="grid grid--4">` de 4 cards. Ubicación: entre el primer `CTABanner` y `<section class="l4-mobile-nav">` (mismo orden que tiffany).
- **Cards → L6 reales** (`name`, `price`, `excerpt`, `href`, `image`, `tags`, badge en la más popular):
  - chiavari: dorada (Más popular) / plateada / negra / bronce — desde $40.
  - crossback: natural (Más popular) / nogal / blanco-vintage / caoba — desde $40.
  - ghost: transparente (Más popular) / humo / ambar / exterior — desde $45.
  - plegables: plastico (Más económica, $15) / madera ($25) / napoleon ($30) / apilable ($20).
- **Bug fix en tiffany**: el ServiceShowcase "Blanca Mate" usaba imágenes **doradas** (`silla-tiffany-dorada-boda-premier-04/05/06`). Reemplazadas por imágenes blancas reales (`sillas-tiffany-blanca-mate`, `tiffany-blanca-01`, `tiffany-blanca-02`).
- **Imágenes**: todas las de las cards verificadas en disco. Nota: `plegables/apilable` no tiene imágenes propias en `/public/images/mobiliario/` (su L6 referencia `plegable-apilable-*.avif` inexistentes) — la card usa `silla-plegable-plastico-salon-filas-09.avif` como representativa. **Pendiente:** generar fotos reales de apilable.
- **Verificación**: las 5 L5 renderizadas en `localhost:4321` sin errores de Astro; grids y links L6 OK.

### Galería showcase (`showcase__gallery3`) — distribución 1 arriba + 2 abajo (SITEWIDE)
- En `src/styles/l3-shared.css` se cambió el desktop de `grid 2fr/1fr + height:420px` (1 grande izq + 2 apiladas der) a **1 imagen principal full-width arriba (16:9) + 2 miniaturas abajo (4:3)**. Sin alturas fijas (aspect-ratio), bordes redondeados por imagen. Afecta a TODAS las galerías showcase del sitio (~60 páginas: sillas, mesas, barras, salas-lounge, iluminación) — homologación total. Decisión del usuario.
- Eliminada la copia **inline** de `showcase__gallery3` en `chiavari/index.astro` que pisaba el global; ahora usa el CSS compartido (regla: nunca CSS scoped, solo global — ver [[Galeria-hm-feat-g3]]).
- **Fondo gris quitado** de los 4 bloques `ServiceShowcase` de cada L5 de sillas: `class="section section--alt"` → `class="section"` (solo en los showcase; la sección de reserva conserva su fondo). Se veía apretado; ahora abierto en blanco.

## 2026-06-12

### Breadcrumbs — rediseño sitewide (todas las páginas)
- **`Breadcrumbs.astro`** rediseñado: sin `<style>` scoped, usa clases globales `hm-breadcrumb-bar` + `hm-bc__*`. Renders un `<nav class="hm-breadcrumb-bar">` limpio.
- **`home-2026.css`** — añadido bloque `.hm-breadcrumb-bar` (fondo blanco, `border-bottom` hairline dorado, `padding-block: 10px`) + `.hm-bc__list / item / link / current / sep`. Override `.hm-breadcrumb-bar .sv-breadcrumb` para texto oscuro cuando no está dentro del hero.
- **13 páginas L2/L3** (`nosotros`, `directorio`, `servicios/*`, `blog`): script Python extrajo `<nav class="sv-breadcrumb">` de dentro de `hm-hero` y lo colocó en `<div slot="breadcrumbs" class="hm-breadcrumb-bar"><div class="hm__wrap">` antes de `<div class="hm">`.
- **223 páginas L4** (`sillas/tiffany/*`, etc.): script Python migró `<div class="container"><Breadcrumbs .../></div>` → `<Breadcrumbs items={breadcrumbItems} slot="breadcrumbs" />` (directo en `<PageLayout>`).
- Resultado: breadcrumb visible entre header y hero en **todas las 236 páginas** del sitio.



### /servicios/iluminacion/ — homologación L3 + mejoras profesionales
- **Why section**: `ul.hm-why > li.hm-why__item + div.hm-why__ic (SVG checkmark) + h3 + p` (bare, sin clases). Fondo navy.
- **Steps section**: `li.hm-step + div.hm-step__num + h3 + p` (bare, sin clases). 4-col grid gold.
- **Zig-zag**: `hm-feat--reverse` en módulo 2 (Decorativa) y módulo 4 (Efectos Especiales).
- **Stats mejorados**: "4 Tipos" → `16<span>K</span>` Watts inventario; "DMX512 Control" → `100<span>%</span>` Técnico DMX.
- **CTA final**: sección `.hm-cta` añadida (HTML faltaba, CSS ya existía en global). Eyebrow "Diseño lumínico profesional · CDMX y ZMVM", headline, párrafo, botón gold WA + ghost /directorio/.
- **Scoped style**: eliminado bloque gallery3 CSS redundante con `!important` + overrides `.hm-cta h2/p` innecesarios.

### /servicios/catering/ — homologación L3 + mejoras profesionales
- **Why section**: `ul.hm-why > li.hm-why__item + div.hm-why__ic (SVG checkmark) + h3 + p` (bare, sin clases). Fondo navy.
- **Steps section**: `li.hm-step + div.hm-step__num + h3 + p` (bare, sin clases). 4-col grid gold.
- **Zig-zag**: `hm-feat--reverse` en módulo 2 (Cocina Móvil) y módulo 4 (Vajilla y Cristalería).
- **Stats**: ya eran impactantes (400+ eventos, 1,500 servicios de vajilla, 85°C lavado industrial, 30+ años) — sin cambios.
- **CTA final**: sección `.hm-cta` añadida. Eyebrow "Equipo para catering · CDMX y ZMVM", headline "Tu chef llega — el equipo ya está montado y verificado", botón gold WA + ghost /directorio/.
- **Scoped style**: eliminado `.hm-cta h2/p` + bloque gallery3 CSS con `!important`.

### /servicios/accesorios/ — homologación L3 + mejoras profesionales
- **Why section**: `ul.hm-why > li.hm-why__item + div.hm-why__ic (SVG checkmark) + h3 + p` (bare, sin clases). Fondo navy.
- **Steps section**: `li.hm-step + div.hm-step__num + h3 + p` (bare, sin clases). 4-col grid gold.
- **Zig-zag**: `hm-feat--reverse` en módulo 2 (Señalización y Alfombras) y módulo 4 (Plantas de Energía).
- **Stats**: ya eran impactantes (500+ eventos, 40+ colores, 500kVA, 30+ años) — sin cambios.
- **CTA final**: sección `.hm-cta` añadida. Eyebrow "Accesorios para eventos · CDMX y ZMVM", headline "Los detalles que separan un evento producido…", botón gold WA + ghost /directorio/.
- **Scoped style**: eliminado `.hm-cta h2/p` + bloque gallery3 CSS con `!important`.

### /servicios/pistas-baile/ — homologación L3 + mejoras profesionales
- **Why section**: `ul.hm-why > li.hm-why__item + div.hm-why__ic (SVG checkmark) + h3 + p` (bare, sin clases). Fondo navy.
- **Steps section**: `li.hm-step + div.hm-step__num + h3 + p` (bare, sin clases). 4-col grid gold.
- **Zig-zag**: `hm-feat--reverse` en módulo 2 (Madera Clásica) y módulo 4 (Tarimas y Escenarios).
- **Stats mejorados**: "3×3m Tamaño mínimo" → `10<span>+</span>` Tipos de pista y acabado; "8×12m Tamaño máximo" → `100<span>%</span>` Con nivelación incluida.
- **CTA final**: sección `.hm-cta` añadida. Eyebrow "Pistas de baile · CDMX y ZMVM", headline "La pista perfecta para tu evento…", botón gold WA + ghost /directorio/.
- **Scoped style**: eliminado bloque gallery3 CSS redundante con `!important` + overrides `.hm-cta h2/p` innecesarios.

### /servicios/audiovisual/ — homologación L3 + CTA final
- **Why section**: `ul.hm-why > li.hm-why__item + div.hm-why__ic (SVG checkmark) + h3 + p` (bare, sin clases).
- **Steps section**: `li.hm-step + div.hm-step__num + h3 + p` (bare, sin clases).
- **Zig-zag**: `hm-feat--reverse` en módulo 2 (Pantallas LED) y módulo 4 (Micrófonos y DJ).
- **CTA final**: sección `.hm-cta` añadida. Headline "El audio que se escucha — la imagen que no se olvida", botón gold WA + ghost /directorio/.
- **Scoped style**: eliminado bloque gallery3 CSS redundante con `!important` + overrides `.hm-cta h2/p` innecesarios.

### /servicios/mobiliario/sillas/ — reescritura L3 con home-2026.css
- Página reescrita desde cero con design system `home-2026.css`. Hero, breadcrumb, nav subcategorías (5 tipos), catálogo grid, 5 módulos `hm-feat` con galería g3, why section, steps, FAQ, form, CTA final.
- **Galería `hm-feat__media--g3`:** CSS añadido globalmente en `home-2026.css` (después del bloque `.hm-feat__media img`). Ver [[Galeria-hm-feat-g3]].
- **Why section:** `hm__section--navy` + `ul.hm-why` + `li.hm-why__item` + `div.hm-why__ic` con SVG checkmark. Requiere fondo navy porque el texto es blanco.
- **Steps:** `ol.hm-steps` + `li.hm-step` + `div.hm-step__num` (global 4-col grid desde home-2026.css).
- **FAQ:** `div.hm-faq` + `details.hm-faq__item` + `<summary>question</summary>` sin clases extra (global `summary::after { content: "+" }` funciona solo).
- **Scoped `<style>`:** solo contiene form custom (`.hm-form-layout`, `.hm-form-card`, etc.) y CTA final. Todo lo demás usa clases globales.

## 2026-06-11
- **SEO títulos:** definida [[Convencion-de-titulos]]. Complemento homologado: `… | Equipo para eventos en México`. Prohibido "EVENTECH" en metas.
- **`rawTitle`:** nuevo flag en `SEOProps` (`src/data/site.ts`) + lógica en `resolveSEO` (`src/utils/seo.ts`). Ver [[SEOHead-rawTitle]].
- **Home (`src/pages/index.astro`):**
  - Title → `Renta de equipo para eventos | Equipo para eventos en México` (`rawTitle`).
  - Description nueva sin marca, keyword "renta de equipo para eventos en México".
  - Sección Servicios: encabezado convertido a dos columnas `hm__head--split` con 2 párrafos SEO. Ver [[Encabezado-split]].
  - CSS `hm__head--split` en `src/styles/home-2026.css`: 100% ancho, centrado vertical, barra dorada, responsive 860px.
- **Vault:** creado `docs/vault-eventech` (este vault).

### Tarde — pasada SEO global
- **Motor de títulos length-aware** (`src/utils/seo.ts` `formatTitle` + `src/data/site.ts`):
  - `titleTemplate` → `%s | Equipo para eventos en México` (sin EVENTECH, sitewide).
  - El complemento se añade **solo si el título resultante cabe en ≤60 chars** (`titleMaxLength`); si no, el título de la página queda solo (nunca con marca). Esto homologa las 250+ páginas sin editarlas una por una.
  - Fallback `seo.title` y `seo.description` reescritos sin marca.
- **Schemas reestructurados** — ver [[Schemas-JSON-LD]]:
  - Arreglado `provider @id #localbusiness` colgado: LocalBusiness ahora es global en `BaseLayout` (con guard anti-duplicado para home/zonas).
  - Organization: logo como `ImageObject` `@id #logo`, `legalName`, `contactPoint` E.164, `areaServed`.
  - LocalBusiness: `parentOrganization` → `#organization`, `image`, `currenciesAccepted`, `id` parametrizable.
- **Metas reescritas a mano (12 páginas top):** servicios index + 8 categorías + eventos + directorio + cotizar. Títulos keyword-first ≤60, descripciones 147–160 chars, sin marca.
- **Validación:** lógica de `seo.ts` transpilada y ejecutada (títulos, longitudes, `@id` del grafo, serialización JSON). Build de Astro debe correrse en la Mac (rollup/esbuild nativos no corren en el sandbox).

### Cards de categoría (index)
- Rediseño de la sección Servicios del home: nuevas cards `.hm-cat` con imagen + título sobreimpreso + badge "N subcategorías" + **menú de subcategorías** + CTA botón "Ver todo en {categoría}". Namespace propio para no afectar la sección Eventos (`.hm-card`). Ver [[Cards-categoria]]. Markup en `src/pages/index.astro`, estilos en `src/styles/home-2026.css`.

### Homologación de cards
- Cards de categoría ampliadas a 8 (`slice(0,8)`): + Catering + Accesorios (2 filas de 4).
- Sección "Cómo funciona" (`.hm-step`) restyleada al **mismo formato de card** que las categorías: fondo blanco, borde hairline, radio 6px, sombra + hover dorado. Número en círculo alineado a la izquierda.

### Reseñas
- Rediseño de cards `.hm-tst`: barra dorada, comilla decorativa, avatar monograma, autor+rol y **link al sitio del aliado** con icono externo. Hover homologado. Ver [[Resenas]].
- **REDEIL como primera reseña** (`featuredReviews` en `index.astro`). Texto corregido a datos reales (10+ años, no 30) y `website` → `https://redeil.com/`.

### FAQ en dos columnas
- Sección FAQ del home dividida: acordeón a la izquierda + **módulo de formulario que arma un mensaje y abre WhatsApp** a la derecha (sticky). Card homologada, botón verde WhatsApp, sin backend. Ver [[Formulario-whatsapp]].

## Homologación L4 audiovisual al molde hm- (2026-07-07, una por una)

Todas venían de sistema viejo (HeroPage/ServiceShowcase + `l3-shared` + override morado `#6c5ce7`) → reconstruidas al **molde `hm-`** con dorado institucional. Variante L5 hoja (sin L6): specs como pills `hm-feat__stats` no enlazadas + 1 CTA → L5. Imágenes reales reusadas. `astro check` limpio en cada archivo. Ver [[Template-L4-hub]].

- **Pantallas LED** ✅ — pedestal/videowall/exterior/monitores. Ver [[2026-07-07-pantallas-led-hm]].
- **Sonido** ✅ — line-array/bocinas/subwoofers/mezcladoras. 6 diferenciadores + 4 pasos + 7 FAQ (+"¿incluye micrófonos?"). Imgs `audio-evento-0X` + `bafle-jbl`. Cross-links verificados (microfonos-dj, iluminacion, carpas, pistas-baile, mobiliario).
- **Proyectores** ✅ — fullhd-4k/streaming/mapping/pantallas-proyeccion. 7 FAQ (+"¿exteriores/luz de día?"). Imgs `proyector-4k` + `monitor-pantalla` + `videowall` + fillers. Cross-links sonido/iluminacion/carpas.
- **Micrófonos y DJ** ✅ — inalambricos/solapa-diadema/equipo-dj/cabina-dj. 7 FAQ (+"¿cuánto tarda el montaje?"). Imgs `microfono-*` + `cabina-dj` + fillers. Cross-links sonido/pistas-baile/iluminacion/mobiliario.

**AUDIOVISUAL COMPLETO ✅** — los 4 hubs L4 (pantallas-led, sonido, proyectores, microfonos-dj) homologados al molde `hm-`. El L3 padre `audiovisual/index.astro` ya estaba en `hm-` (sin cambios).

## Pase de calidad audiovisual (2026-07-07)

Auditoría completa de la sección (L3 + 4 hubs L4 + 16 L5). Hallazgos y correcciones:

**Hubs L4 (pulido):** eliminado código muerto (campo `icon:` sin renderizar, 24 líneas); arreglados heros de módulo repetidos (cada `hm-feat` ahora con imagen principal distinta). Estructura ya idéntica entre los 4.

**16 L5 (pase de corrección — NO eran rebuilds, ya tenían la anatomía L5 correcta):**
- **Color:** ámbar `#e17055` → **dorado institucional `#c2a24a`** (el molde L5 lo prohíbe explícitamente; ver [[Template-L5-producto]] §5). Bloque `:root` exacto del molde en las 16.
- **Showcases:** `section section--alt` (gris) → `section` (blanco) en los 4 ServiceShowcase de cada página; sólo la reserva queda gris (regla del molde §2).
- **Títulos:** sufijo de convención `| Equipo para eventos en México` + `rawTitle={true}` en las 16 (ver [[Convencion-de-titulos]]).
- Aplicado con `sed` (las 16 eran idénticas: 2× ámbar, 5× section--alt). `astro check` limpio.

**Pase de calidad audiovisual v2 (2026-07-07) ✅:** auditoría profunda de las 21 páginas (0 enlaces rotos, 0 imgs sin alt). Corregido: (1) los **64 placeholders SVG** de las 16 L5 → galería real `showcase__gallery3` con imgs de `/images/audiovisual` mapeadas por tipo (pool rotado, hero distinto por showcase) — ahora al mismo nivel que carpas; (2) 1 descripción >160 (`microfonos-dj/solapa-diadema` 162→146). Verificado: 0 ámbar/morado, 0 placeholders, 16/16 L5 con galería, 0 descripciones >160, `astro check` limpio.

## Homologación categoría CARPAS (2026-07-07, en progreso)

Estructura: `carpas` (L3) ya en `hm-`. 4 hubs L4 (`carpas-arabes`, `estructurales`, `hangar`, `pisos-complementos`) en sistema viejo + morado `#6c5ce7`. L5 bajo cada hub en sistema viejo + ámbar `#e17055`.

- **carpas-arabes** ✅ (hub L4) — reconstruido de sistema viejo (HeroPage/ServiceShowcase + `l3-shared` + morado) al **molde `hm-`** dorado. 4 L5 hoja (clasica/forros/transparente/beduina) → specs-pills. **Imágenes reales de carpas** (beduina, transparente, forros + `carpa-boda-01..04` genéricas) con heros de módulo distintos — mejor situación que audiovisual. 7 FAQ (+"¿cualquier terreno?"), title `rawTitle`. `astro check` limpio.
- **carpas-arabes L5 (4) ✅** — clasica/forros/transparente/beduina: pase de corrección (ámbar→dorado, showcases `section--alt`→`section`, título+sufijo+`rawTitle`) + **upgrade de imágenes**: los 16 placeholders SVG (4 showcases × 4 L5) reemplazados por galería real `showcase__gallery3` con fotos de carpas (pool rotado por tipo, hero distinto por showcase). `astro check` limpio. **Rama árabe 100% homologada** (hub + 4 L5, 0 ámbar/0 morado).
- **estructurales** ✅ (hub L4) — reconstruido al molde `hm-` dorado. 4 L5 hoja (medianas/grandes/paredes-modulares/accesorios-estructurales) → specs-pills. Copy técnico reforzado (aluminio serie 6000, lona PVC 650 g, anclaje/viento 80 km/h, unión de módulos, NOM). Imgs carpas reales heros distintos. 7 FAQ (+"¿unir varias carpas?"). `astro check` limpio.
- **estructurales L5 (4) ✅** — medianas/grandes/paredes-modulares/accesorios-estructurales: pase de corrección (ámbar→dorado, showcases blancos, título+sufijo+`rawTitle`) + 16 placeholders → galería real `showcase__gallery3`. `astro check` limpio. **Rama estructurales 100% homologada** (hub + 4 L5, 0 ámbar/0 morado).
- **hangar (hub + 4 L5) ✅** — hub reconstruido a `hm-` dorado; 4 L5 hoja (hangar-20m/hangar-30m/rigging/industrial) con pase de corrección (ámbar→dorado, showcases blancos, título+`rawTitle`) + placeholders→galería real. Copy técnico de gran formato (acero galvanizado, lona PVC 900 g, claro libre 20/30 m, rigging 500 kg, trifásica NOM, permisos/protección civil, memoria de ingeniería). 7 FAQ (+"¿piso y clima?"). `astro check` limpio. **Rama hangar 100% homologada** (0 ámbar/0 morado).
- **pisos-complementos (hub + 4 L5) ✅** — hub a `hm-` dorado; 4 L5 hoja (duela/alfombra/cortinas-forros/clima-artificial) con pase de corrección + galería real. Copy de complementos (duela 12 mm, alfombra +15 colores, forros chiffon/satín/blackout, clima 30K-100K BTU / hasta 20 ton, nivelación ±40 cm). 7 FAQ (+"¿anticipación?").

**CARPAS COMPLETA ✅ (2026-07-07)** — categoría 100% homologada: L3 `carpas` (ya hm-) + 4 hubs L4 (carpas-arabes, estructurales, hangar, pisos-complementos) al molde `hm-` dorado + 16 L5 (pase de corrección color/showcases/títulos + galería `showcase__gallery3` real). Verificado: **0 ámbar / 0 morado / 0 placeholders** en toda la categoría; 4/4 hubs hm-, 16/16 L5 con `rawTitle`. `astro check` limpio. Imágenes reales de `/images/carpas` (beduina, transparente, forros, estructural-grande, hangar-industrial, mediana + carpa-boda-01..04) mapeadas por tipo, heros distintos.
## Homologación categoría ILUMINACIÓN (2026-07-07, en progreso)

Estructura: L3 `iluminacion` ya en `hm-`. 4 hubs L4 (`arquitectonica`, `decorativa`, `efectos-especiales`, `escenario`) en sistema viejo + morado. Ojo: `decorativa/fairy-lights` SÍ tiene L6 (guirnaldas-50/100/200/400m) — ahí los chips podrían enlazar.

- **arquitectonica (hub + 4 L5) ✅** — hub a `hm-` dorado (wash-lights/uplighting/banadores/fachadas). **Mejor caso de imágenes hasta ahora**: carpeta `/images/iluminacion-arquitectonica/` con 25 fotos reales específicas por tipo (5-6 c/u + hero); hub usa 13 vía `const IMG` + template literals, todas verificadas. Las 4 L5 **ya tenían galería `showcase__gallery3` real** → el pase L5 fue solo color ámbar→dorado + showcases blancos + título+`rawTitle` (sin Python de galería). Copy de diseño de luz (RGBWA, DMX512, wireless DMX, pixel mapping, gobos, IP65, escenas por timeline). 7 FAQ (+"¿gobos con logo?"). `astro check` limpio. Rama arquitectónica 100% (0 ámbar/morado).
- **decorativa (hub + 4 L5 + 4 L6) ✅** — hub a `hm-` dorado (fairy-lights/candiles/esferas-led/letras-luminosas). fairy-lights tiene L6 (guirnaldas 50/100/200/400 m) representadas como specs "50–400 m" + FAQ de metros; la L5 fairy-lights enlaza sus L6. Pase de corrección en 8 subpáginas (4 L5 + 4 L6): color ámbar→dorado, showcases blancos, título+sufijo+`rawTitle` (sed robusto para "en CDMX" y "CDMX" bare). Galería real en candiles/esferas-led/letras-luminosas (12 placeholders→gallery3). Copy decorativo (IP44/IP65, velas LED/protección civil, truss con motor, personalización). 7 FAQ (+"¿cuántos metros de guirnalda?"). `astro check` limpio. 0 ámbar/morado/placeholders en las 9 páginas.
- **escenario (hub + 4 L5) ✅** — hub a `hm-` dorado (par-led/moving-heads/follow-spots/barras-led). Copy técnico de show (RGBWA 5-en-1, beam 230W gobos/prisma, follow spot 1200W, pixel mapping, truss/rigging, modo silencioso <25 dB, sound-to-light/timecode). 7 FAQ (+"¿sincronizar con música en vivo?"). Pase L5: color/títulos + 16 placeholders→galería real (imgs `/images/iluminacion` + `cabezas-moviles-beam`). `astro check` limpio. 0 ámbar/morado.
- **efectos-especiales (hub + 4 L5) ✅** — hub a `hm-` dorado (humo-bajo/laser/mariposas/confeti). Copy con seguridad y timing (hielo seco grado alimenticio sin alarma, láser IEC 60825 con zona de exclusión, mariposas biodegradables aire comprimido, confeti CO2 con recolección). 7 FAQ (+"¿los venues lo permiten?"). Pase L5: color/títulos + 16 placeholders→galería real. `astro check` limpio.

**ILUMINACIÓN COMPLETA ✅ (2026-07-07)** — categoría 100% homologada: L3 `iluminacion` (hm-) + 4 hubs L4 (arquitectonica, decorativa, efectos-especiales, escenario) al molde `hm-` dorado + 16 L5 + 4 L6 (guirnaldas) al molde L5 dorado con galería real. Verificado en 25 páginas: **0 ámbar / 0 morado / 0 placeholders**, 4/4 hubs hm-, 25/25 con `rawTitle`, `astro check` limpio. (Los 20 archivos con `l3-shared` son las L5/L6 usando correctamente el molde L5 — no es defecto.) `arquitectonica` con carpeta de imgs reales dedicada; resto usa `/images/iluminacion` mapeadas por tipo.
## Homologación categoría PISTAS-BAILE (2026-07-07, en progreso)

Estructura: L3 `pistas-baile` ya en `hm-`. 4 hubs L4 (`madera-clasica`, `pistas-led`, `tarimas-escenarios`, `vintage-tematicas`) en sistema viejo + morado; cada uno con 4 L5. Imgs reales en `/images/pistas-baile` (madera-natural, madera-negra, acrilica-transparente, led-rgb, pista-baile-01..06).

- **madera-clasica (hub + 4 L5) ✅** — hub a `hm-` dorado (duela-laminada/parquet-modular/marco-decorativo/terreno-irregular). Copy de pistas (duela 12 mm antiderrapante, parquet interlock, marco LED perimetral, plataforma niveladora 500 kg/m² con geotextil). 7 FAQ (+"¿elegir tono de madera?"). Pase L5: color/títulos (uno sin CDMX y otro sin "de" corregidos a mano) + 16 placeholders→galería real. `astro check` limpio. 0 ámbar/morado.
- **pistas-led (hub + 4 L5) ✅** — hub a `hm-` dorado (rgb/pixel/infinita/exterior). Copy de pistas LED (paneles 50×50 16M colores DMX, control por pixel con logo/monograma/video, espejo infinito 3D, IP65 antideslizante, 750 kg/m²). 7 FAQ (+"¿proyectar logo?"). Pase L5: color/títulos (exterior sin "de" corregido) + 16 placeholders→galería real. `astro check` limpio. 0 ámbar/morado.
- **tarimas-escenarios (hub + 4 L5) ✅** — hub a `hm-` dorado (modulares/con-techo/pasarelas/plataformas-niveladas). Copy técnico (aluminio 750 kg/m², 40-120 cm, truss + rigging 500 kg, lona impermeable, viento 80 km/h, nivelación láser). 7 FAQ (+"¿montaje a medida?"). Pase L5: color/títulos + 16 placeholders→galería real. `astro check` limpio. 0 ámbar/morado. (Imgs genéricas pista-baile; falta fotografía de tarima por tipo.)
- **vintage-tematicas (hub + 4 L5) ✅** — hub a `hm-` dorado (disco/damero/acrilico/personalizada). Copy temático (espejos acrílicos no vidrio, policarbonato 30 mm 500 kg/m² con LED inferior, vinil HD 1440 DPI Pantone, combinar estilos). 7 FAQ (+"¿qué estilo con mi temática?"). Pase L5: color/títulos (damero y acrilico sin "de"/"CDMX" corregidos a mano) + 16 placeholders→galería real.

**PISTAS-BAILE COMPLETA ✅ (2026-07-07)** — categoría 100% homologada: L3 `pistas-baile` (hm-) + 4 hubs L4 (madera-clasica, pistas-led, tarimas-escenarios, vintage-tematicas) al molde `hm-` dorado + 16 L5 al molde L5 dorado con galería real. Verificado en 21 páginas: **0 ámbar / 0 morado / 0 placeholders**, 4/4 hubs hm-, 21/21 con `rawTitle`, `astro check` limpio. Imgs reales de `/images/pistas-baile` (madera-natural/negra, acrilica, led-rgb, pista-baile-01..06). Pendiente foto: tarimas/escenarios usan genéricas.
- Siguiente categoría (revisar sistema viejo): `accesorios`, `catering`, `mobiliario/salas-lounge` restantes, etc.
- Siguiente (otras categorías): `mobiliario/salas-lounge` restantes, `accesorios`, `catering`, etc.
- Siguiente (otras categorías): `pistas-baile`, `mobiliario/salas-lounge` restantes, `accesorios`, `catering`, etc.

## Auditoría + mejoras 4 categorías (2026-07-07)

Auditoría profesional de las 4 categorías homologadas (audiovisual, carpas, iluminación, pistas-baile = 88 páginas) + reparaciones. Doc completo con plan priorizado: [[2026-07-07-auditoria-mejoras-4-categorias]].

**Reparado:**
- **6 `meta description` > 160 → ≤160** (se truncaban en SERP): `carpas/estructurales` (139), `carpas/pisos-complementos/clima-artificial` (148), `carpas/pisos-complementos` (142), `iluminacion/arquitectonica` (155), `iluminacion/escenario/moving-heads` (146), `pistas-baile/madera-clasica` (150). Recorte solo en la línea `description=`, sin perder keyword ni CTA.
- **CSS DRY:** el bloque `<style>` scoped con `.hm-cat__specs` y `.hm-menu__item--cta` estaba **duplicado idéntico en los 16 hubs**. Centralizado en `src/styles/home-2026.css` (junto a `.hm-menu__item` y `.hm-cat__sub`); eliminados los 16 bloques scoped. Verificado: 0 duplicados restantes, `astro check` sin errores nuevos.

**Auditoría — lo que ya está bien (medido):** 0 enlaces rotos, 0 títulos/descripciones duplicadas, 1103/1103 imgs con `alt` descriptivo, 100% `.avif`, 100% `loading=lazy`, 88/88 con Breadcrumbs, JSON-LD Service+Review+Breadcrumb+FAQ en todas, canonical/og:image/sitemap/robots presentes.

**Brecha #1 detectada — fotografía real (reuso de imágenes):**
- iluminación: **123 imgs únicas** (estándar a seguir, foto por tipo).
- audiovisual: solo **14 únicas** / 21 páginas.
- carpas: solo **10 únicas** / 21 páginas.
- pistas-baile: solo **11 únicas** / 21 páginas.

**Plan priorizado (resumen):** P1 = fotografía real por tipo (audiovisual/carpas/pistas) + schema `Offer`/`priceRange` para rich snippet + LCP eager en primera tarjeta. P2 = cross-linking entre categorías + precio "desde" consistente + `srcset`. P3 = tablas comparativas, WhatsApp sticky, urgencia estacional. Detalle en el doc.

## Homologación categoría ACCESORIOS (2026-07-07) ✅

Quinta categoría homologada. L3 `accesorios` ya estaba en `hm-`. 4 hubs L4 (`calefaccion-clima`, `manteleria-textiles`, `plantas-energia`, `senalizacion-alfombras`) reconstruidos de sistema viejo (HeroPage/ServiceShowcase + l3-shared + ámbar `#e17055`) al molde `hm-` dorado (variante L5-hoja: specs como pills `hm-feat__stats hm-cat__specs`, CSS ya centralizado en home-2026.css → sin bloque `<style>` scoped). 3 de los 4 hubs los escribió un subagente en paralelo; `senalizacion-alfombras` se escribió directo tras trabarse el subagente. Contenido técnico preservado del viejo (BTU, kVA, toneladas, tipos de tela, medidas de alfombra).

- **calefaccion-clima ✅** — L5: calentadores-patio, calefaccion-industrial, nebulizacion-ventilacion, ac-portatil.
- **manteleria-textiles ✅** — L5: manteles-cubremesas, cubresillas-bandas, servilletas-caminos, overlays-especiales.
- **plantas-energia ✅** — L5: gen-20-50, gen-50-150, gen-150-500, tableros-distribucion.
- **senalizacion-alfombras ✅** — L5: alfombras-premium, backdrops-senaletica, podiums-atriles, postes-separadores.

**Pase de corrección 16 L5:** color ámbar→dorado, `section--alt`→`section` (blanco, sólo reserva gris), título + sufijo convención + `rawTitle`, 64 placeholders SVG → galería `showcase__gallery3` real (pool por hub de `/images/accesorios`, alt = título del showcase).

**Reparación de bug encontrado:** el índice L3 `accesorios/index.astro` tenía **32 hrefs de subcategoría obsoletos** (16 en `SUB_SERVICES` + 16 en los `hm-feat__chips` de los módulos) que apuntaban a slugs L5 inexistentes (ej. `/lino/`, `/ac/`, `/pequenos/`). Corregidos a los slugs reales en disco.

**Verificación (21 pág):** 0 morado / 0 ámbar / 0 placeholders, 4/4 hubs `hm-`, 20/20 L4+L5 con `rawTitle`, 0 hrefs internos rotos, todas las imágenes existen, `astro check` sin errores nuevos (solo el preexistente ajeno `directorio/[...slug].astro` ts7006). Imgs genéricas reusadas (8 fotos en `/images/accesorios`) → pendiente fotografía real por tipo (usuario la dejó al final).

## Pendiente
- **Ejecutar plan de mejoras** [[2026-07-07-auditoria-mejoras-4-categorias]]: P1 fotografía real (audiovisual/carpas/pistas/accesorios) + `Offer`/priceRange en `seo.ts` + LCP eager.
- Migrar metas de las páginas de producto (L3/L4) una por una para keyword/length finos (el motor ya las deja sin marca y sin truncar). Checklist en [[Convencion-de-titulos]].
- Correr `npm run build` en la Mac para confirmar.
- Fotos reales por tipo (pantallas LED y sonido hoy reusan imgs de `/images/audiovisual`).
