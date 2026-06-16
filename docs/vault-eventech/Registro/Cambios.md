# Registro de cambios

Changelog de todo lo generado, para mantener homologación. Fechas absolutas.

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

## Pendiente
- Migrar metas de las páginas de producto (L3/L4) una por una para keyword/length finos (el motor ya las deja sin marca y sin truncar). Checklist en [[Convencion-de-titulos]].
- Correr `npm run build` en la Mac para confirmar.
