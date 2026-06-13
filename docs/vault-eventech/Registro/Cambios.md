# Registro de cambios

Changelog de todo lo generado, para mantener homologación. Fechas absolutas.

## 2026-06-12

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
