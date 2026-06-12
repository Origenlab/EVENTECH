# Auditoría técnica — EVENTECH.MX

**Fecha:** 11 jun 2026 · **Stack:** Astro 5.18 (sitio estático, 575 páginas) · **Alcance:** código/calidad, SEO, rendimiento, accesibilidad.

El sitio está bien arquitecturado: SEO centralizado, content collections con schemas Zod, layouts reutilizables, CDN de imágenes (ExactDN) y un solo `<h1>` por página. La mayoría de los problemas eran **sistemáticos** y se corrigieron en pocos puntos centrales. Este documento separa lo **ya aplicado** de lo **pendiente/recomendado**.

---

## 1. Resumen ejecutivo

| Estado inicial | Resultado |
|---|---|
| 6 errores de ESLint | **0 errores** |
| 1 warning de build (conflicto de ruta) | **0 warnings** |
| 5 imágenes sin `alt` válido | **corregidas** |
| Contraste de color por debajo de WCAG AA en CTAs/textos | **corregido a nivel de tokens** |
| Logo e íconos referenciados pero inexistentes | **generados** |
| Favicon mostraba "A" (resto del template) | **corregido a "E"** |
| 49 títulos con doble marca | **corregidos** |
| Reseñas auto-emitidas en JSON-LD (~200 páginas) | **eliminadas** |
| 172 errores de TypeScript | **0 errores** (limpieza completa) |
| 431 títulos >60 y 114 descripciones >160 | **0 / 0** (todos dentro de límite) |
| Imágenes JPG pesadas (set referenciado) | **AVIF generado, −50%**, refs cambiadas |

Build verificado tras los cambios: **575 páginas, 0 errores, 0 warnings**. ESLint: **limpio**.

---

## 2. Correcciones aplicadas

### 2.1 Bug real de accesibilidad — `alt:` en vez de `alt=`
Cinco `<img>` usaban dos puntos en lugar de igual, generando HTML inválido (`alt: "..."`) → la imagen quedaba **sin texto alternativo** y el lector de pantalla la ignora.

Archivos corregidos:
- `src/pages/servicios/mobiliario/barras/barras-bebidas/industrial/index.astro`
- `src/pages/servicios/mobiliario/barras/periqueras/{acrilico,madera,metal}/index.astro`
- `src/pages/servicios/mobiliario/sillas/plegables/madera/index.astro`

Esto también eliminó 5 de los 6 errores de ESLint (eran "Identifier expected" sobre esas líneas).

### 2.2 Contraste de color (WCAG 2.1 AA) — corregido en `src/styles/tokens.css`
El verde de acento y el coral de CTA se usaban como fondo de botón con texto blanco y como texto sobre blanco, sin alcanzar el mínimo 4.5:1. Un solo cambio de tokens corrige **cientos de páginas**:

| Token | Antes | Después | Contraste s/blanco |
|---|---|---|---|
| `--color-accent` | `#00b894` (2.54:1 ❌) | `#0a8266` | 4.78:1 ✅ |
| `--color-accent-hover` | `#00a085` | `#086955` | ✅ |
| `--color-cta` | `#FF6B6B` (2.78:1 ❌) | `#D92D2D` | 4.81:1 ✅ |
| `--color-cta-hover` | `#FF5252` | `#C0271F` | ✅ |
| `--color-text-light` | `#6c757d` (falla s/fondo gris) | `#5a6268` | 6.21:1 ✅ |
| `--color-text-muted` | `#adb5bd` (2.07:1 ❌) | `#6c757d` | 4.69:1 ✅ |

> Nota de marca: los colores se oscurecieron levemente para cumplir AA. Si quieres conservar el tono mint/coral vibrante en usos **decorativos** (no-texto), se puede separar en tokens distintos (`--color-accent` para fondos grandes vs `--color-accent-text` para texto/botones). Dímelo y lo refactorizo.

### 2.3 Assets faltantes generados
- `public/images/logo.png` — referenciado en JSON-LD (Organization + Article publisher); antes **no existía** → invalidaba el logo en resultados enriquecidos de Google.
- `public/images/icon-512.png` — referenciado en `site.webmanifest` (incl. `maskable`); rompía la instalación PWA.
- `public/favicon.svg` y `icon-192.png` — regenerados: el favicon mostraba una **"A"** heredada del template, ahora muestra la "E" de EVENTECH con el navy de marca y punto de acento.

> Son assets generados (marca tipográfica simple). Si tienes el logo oficial en vector, reemplázalos para máxima calidad.

### 2.4 Conflicto de ruta — `src/pages/servicios/[...slug].astro`
La ruta dinámica generaba `/servicios/mobiliario`, que ya tiene página estática dedicada (warning de build). Se filtró ese slug del `getStaticPaths` (`STATIC_PAGES`). Build ahora sin warnings.

### 2.5 Doble marca en títulos (49 páginas)
49 páginas tenían `title="... | EVENTECH"` y el template añadía `| EVENTECH.MX`, resultando en `... | EVENTECH | EVENTECH.MX`. Se eliminó el sufijo manual; el template aporta la marca.

### 2.6 Accesibilidad — mejoras varias
- **`<html lang>`**: `"es"` → `"es-MX"` (coherente con OG y manifest). `BaseLayout.astro`.
- **`prefers-reduced-motion`**: bloque global añadido en `global.css` (WCAG 2.3.3) que neutraliza animaciones/transiciones para usuarios sensibles al movimiento.
- **Buscador de directorio** (`DirectorySearch.astro`): `aria-label` en el input y en los 3 `<select>` (antes solo tenían placeholder → sin nombre accesible).
- **Formulario de cotización** (`cotizar/index.astro`): `autocomplete="name"` y `autocomplete="tel"` + `inputmode="tel"` (WCAG 1.3.5, mejor UX móvil).
- **Menú móvil** (`Header.astro`): ahora cierra con tecla **Escape** (devolviendo el foco al botón) y al hacer clic en un enlace (WCAG 2.1.2).

### 2.7 Lint limpio
Se reestructuraron dos comentarios dentro de un ternario JSX en `[...slug].astro` que el parser de ESLint rechazaba. ESLint pasa con 0 errores.

### 2.8 Reseñas auto-emitidas eliminadas del JSON-LD (riesgo de penalización resuelto)
Google prohíbe `aggregateRating`/`review` *self-serving* (reseñas que la marca escribe sobre sí misma). Estaban presentes en ~200 páginas. Eliminadas en tres frentes:
- **`src/utils/seo.ts`** → `serviceWithReviewJsonLd` ahora devuelve solo el schema `Service` base (sin rating/review). Esto neutralizó **~190 páginas L4** de un solo cambio.
- **`src/pages/index.astro`** → se quitó el `AggregateRating` + reviews del `LocalBusiness`.
- **7 páginas hub** (`sillas`, `mesas`, `barras`, `salas-lounge`, `proyectores`, `pantallas-led`, `microfonos-dj`) → se eliminó el bloque `<script>` de Product con reseñas.

Los **testimonios siguen visibles como contenido** en la página; solo se retiraron de los datos estructurados. Verificado: tras el build, `AggregateRating` solo permanece en 229 páginas de **directorio** (ratings de venues de terceros — uso legítimo, no self-serving).

---

## 3. Pendiente / recomendado (requiere tu decisión)

### 3.1 ✅ RESUELTO — Reseñas auto-emitidas en datos estructurados
Ver §2.8. Se eliminaron de ~200 páginas. Si en el futuro consigues reseñas verificables de terceros (Google Business), se pueden reactivar de forma compatible con la política.

### 3.2 ✅ RESUELTO — Longitudes de meta tags
Se llevaron **todos los títulos a ≤60 caracteres y todas las meta descriptions a ≤160**, verificado sobre el HTML compilado de las 575 páginas (antes: 431 títulos y 114 descripciones excedían).

Cómo se hizo:
- Se generaron propuestas de reescritura (conservando keyword principal, modelo/material y "CDMX") y se documentaron en `AUDITORIA-SEO-propuestas.xlsx` (antes→después).
- Se aplicaron 545 cambios a títulos/descripciones literales (props `.astro` y frontmatter de colecciones), anclados al atributo correcto y a todas sus ocurrencias.
- Se corrigieron los títulos **dinámicos** del directorio (que mi primer escaneo no cubría por generarse en plantilla): `directorio/[...slug].astro` (región/zona/venue — ahora el venue usa su `seoTitle`), los 18 `seoTitle` de `tipo-venue`/`tipo-evento`, y el índice del blog. En todos se eliminó el `| EVENTECH` / `| Directorio EVENTECH` manual (el template ya añade ` | EVENTECH.MX`) y se recortó el nombre de región redundante.

Solo cambió el `<title>` y la meta description del `<head>`; los encabezados visibles (H1 del hero) NO se tocaron (usan props distintos). Build verificado: 575 páginas, 0 errores. ESLint y `astro check` siguen limpios.

### 3.3 ✅ RESUELTO — TypeScript: 0 errores
Se llevó `npx astro check` de **172 → 0 errores** sin cambiar lógica de runtime (solo anotaciones de tipo). Enfoque:
- Se tipó la fuente `getCollection("X")` como `CollectionEntry<"X">[]` y `Astro.props` en las rutas dinámicas, propagando tipos a los callbacks `.map/.filter/.sort` (resolvió la mayoría de los 106 `ts(7006)` y los 30 `ts(2339)` "type never").
- `blog/[...page].astro`: `page` tipado como `Page<CollectionEntry<"blog">>`.
- Ajustes puntuales: `CategoryCard` (`ReadonlyArray`), `Card` (prop `badge?`), eliminación de imports sin usar, y `seo.ts` (`articleJsonLd.datePublished` ampliado a `string | undefined` para reflejar el uso real).

Archivos modificados (16): `directorio/{index,[...slug]}.astro`, `blog/{[...slug],[...page]}.astro`, `[...slug].astro`, `directorio/tipo-{venue,evento}/*`, `servicios/[...slug].astro`, `zonas/[...slug].astro`, `eventos/[...slug].astro`, `rss.xml.ts`, `BlogLayout.astro`, `DirectorySearch.astro`, `CategoryCard.astro`, `Card.astro`, `utils/seo.ts`.

Build verificado tras los cambios: 575 páginas, sin errores. (Los ~255 *hints* restantes son avisos `is:inline` de Astro, no errores — opcional silenciarlos añadiendo `is:inline` a los `<script>` con atributos.)

### 3.4 ✅ RESUELTO (parcial) — Rendimiento de imágenes
- **Lazy loading** ya estaba bien aplicado (684/686 `<img>` con `loading="lazy"`; los heroes usan background CSS, no `<img>`).
- **AVIF generado + referencias cambiadas**: se generaron **246 versiones `.avif`** de las imágenes JPG referenciadas (fotos de venues principalmente) y se cambiaron **255 referencias** `.jpg → .avif`, conservando los `.jpg` originales (no destructivo). Peso de ese set: **61 MB → 30.5 MB (−50%)**.
- Seguro para redes/SEO: se verificó que **ningún `og:image` apunta a un `.jpg` de venue** (usan `og-default.jpg`), y el sitio ya servía `.avif` en og:image/JSON-LD de páginas de producto, así que el cambio es consistente. `og-default.jpg` se dejó intacto.
- En **producción** el CDN ExactDN ya negociaba formato (sirve AVIF/WebP desde la URL `.jpg`); el cambio beneficia sobre todo al origen/repo y a navegadores sin CDN.

Pendiente opcional: las imágenes de producto que aún son JPG grandes (p. ej. algunas de 2.8 MB en `mobiliario/`) podrían recomprimirse en origen (q82 ≈ −85%) si quieres aligerar el repo; el CDN ya las optimiza en entrega.

### 3.4b ⚠️ NUEVO HALLAZGO — Imágenes de venues faltantes (rotas)
**903 referencias** a `/images/venues/*.jpg` (en los `.md` de venues y un componente) **apuntan a archivos que no existen** → imágenes rotas en las páginas de directorio de esos venues (se ve el texto `alt` en lugar de la foto). Solo **246** de las imágenes referenciadas existen. Además hay **128 referencias `.avif` de producto** (114 en `mobiliario/`, resto en `eventos/`, etc.) que tampoco existen.

Esto es una **brecha de contenido**, no de código: requiere subir las fotos reales con esos nombres a `public/images/venues/` (y las de producto faltantes). Es el punto de mayor impacto visual pendiente. Puedo darte la lista exacta de archivos faltantes por venue si quieres priorizar la carga.

### 3.6 Refactor de código — CSS muerto eliminado (verificado)
Análisis de duplicación: **157,328 líneas en páginas** vs 8,176 en componentes. Los 8 hubs de servicios repetían ~480 líneas de `<style>` inline cada uno, de las cuales una gran parte era **CSS muerto**: reglas `.faq-*` (el FAQ se renderiza vía el componente `FaqSection`, que usa sus propias clases scoped `__q`/`__a`, por lo que el CSS inline `.faq-item__question`/`.faq-layout` no matcheaba ningún elemento — los estilos scoped de Astro no penetran componentes hijos), más `showcase__placeholder`, etc.

Se eliminaron **~2,250 líneas de CSS muerto** de los 8 hubs + `index.astro` + `servicios/index.astro`, con un removedor que solo borra reglas cuyas clases no existen en el markup de esa página (respeta `:global`, `@media`, keyframes y `is:global`).

Verificación (sin capturas, por diff de compilado): el `<body>` renderizado de las 10 páginas es **byte-idéntico** antes/después; todas las clases vivas conservan su CSS; las muertas desaparecieron; build limpio (575 páginas) y ESLint en 0. Riesgo visual: nulo (solo se quitó CSS que no aplicaba a nada).

Tras esta limpieza, un escaneo del resto del sitio (234 páginas) encontró solo 7 reglas muertas más (ya aplicadas) — el CSS muerto estaba concentrado en los hubs.

### 3.7 ✅ RESUELTO — Hubs consolidados al stylesheet compartido (verificado visualmente)
Hallazgo: el CSS de secciones (`showcase`, `reserva-form`, `form-field`) **ya existía** en `src/styles/l3-shared.css` + `l4-shared.css`, usado por las 190 páginas L4. Los 8 hubs lo **duplicaban inline** y, peor, habían **divergido** (p. ej. `.showcase__image` centrado vs columna, `showcase__img` sin aspect-ratio, hover con transform, focus con verde hardcodeado).

Acción: se migraron los 8 hubs a `import '@styles/l3-shared.css'` + `l4-shared.css` y se eliminó el CSS de secciones inline (conservando lo propio, p. ej. `.partner-card` en inflables).

Verificación **visual** (capturas headless antes/después, en `_auditoria-capturas/`):
- Altura de página idéntica (sin layout shift); home y L4 con **0% de cambio**.
- Hubs: cambio mínimo y localizado (0.04–0.17%) en el área de showcase — las imágenes pasaron de "centradas" a "ancho completo con aspect-ratio", que es **exactamente el diseño canónico de las 190 páginas L4** → mayor **consistencia**, no regresión.
- Build 575 páginas, `astro check` 0 errores, ESLint limpio.

Resultado: los 8 hubs pasaron de ~1,000–1,200 líneas a ~555–689 (**~48% menos**, sumando §3.6). El CSS de secciones ahora vive en un único stylesheet compartido para todo el sitio.

### 3.8 ✅ RESUELTO — Componente `<ServiceShowcase>` (migración por lotes, pixel-verificada)
Se creó `src/components/ServiceShowcase.astro` (props para texto simple + slots `body`/`media` que preservan el HTML rico y las 4 variantes de imagen verbatim; sin `<style>` propio porque el CSS ya es global, §3.7).

Se migraron **741 de 771** instancias (en 229 páginas) del markup inline al componente. **30 se omitieron a propósito** (texto con caracteres que romperían un prop) y conservan su markup original — decisión conservadora para garantizar cero riesgo.

Proceso profesional:
- Parser dedicado que extrae badge/título/id/subtítulo/tags/CTA a props y envuelve párrafos e imagen en slots verbatim.
- Se detectó y corrigió un bug del parser (un `>` huérfano que añadía una línea de texto por bloque, +116 px/página).
- **Verificación pixel-perfect**: en una página gallery3 (boho) el render es **0.0000 % de diferencia de píxeles** (alto idéntico, bbox vacío) tras el fix. Variantes placeholder (carpas) y galería-2 (mobiliario): **0 diferencias no-whitespace** en el HTML renderizado. Variante imagen-única (inflables) intacta.
- Build 575 páginas · `astro check` 0 errores · ESLint limpio.

Resultado: el markup del showcase tiene ahora una **única fuente** (`ServiceShowcase`). Las páginas bajaron de 157,328 a 150,573 líneas; sumado al resto del refactor, el código es notablemente más mantenible y consistente.

### 3.5 ✅ RESUELTO — Afinamientos de accesibilidad
- **Salto de heading h1→h3 (WCAG 1.3.1)**: en las **189 páginas L4** los títulos de las tarjetas del sidebar (`<aside class="l4-sidebar...">` y `l4-sidebar--mobile`) eran `<h3>` y aparecían antes del primer `<h2>`. Se cambiaron a `<h2>` solo dentro de esos contenedores (1,119 cambios), dejando los `<h3>` correctos de la sección "Combos" (que sí van bajo su `<h2>`). El outline renderizado quedó h1→h2→…→h3 sin saltos. **Pixel-neutral**: `typography.css` resetea `margin-block:0` y `.sidebar-card__title` fija `font-size`/`font-weight` explícitos, así que `<h2>` se ve idéntico a `<h3>` (verificado: la zona de títulos no cambió en las capturas).
- **Touch target de la hamburguesa (WCAG 2.5.5)**: `.header__toggle` ahora tiene `min-width/min-height: 44px` con el contenido centrado. (Los íconos sociales del Topbar son 24px — cumplen el mínimo AA 2.5.8 de 24px; se dejaron para no romper la barra compacta.)
- **Hero con imagen de fondo**: `Hero.astro` ahora aplica un overlay semitransparente y texto claro cuando recibe `backgroundImage` (clase `hero--image`). Es defensivo (ninguna página lo usa hoy), sin efecto en las páginas actuales.

Verificación: build 575 páginas, `astro check` 0 errores, ESLint 0 problemas. Cambios de heading verificados pixel-neutrales contra el render previo.

---

## 4. Lo que ya estaba bien (verificado)

- `astro.config.mjs`: `site` configurado, `trailingSlash: "always"`, sitemap con filtros/priority/changefreq.
- Canonical derivado correctamente del pathname; 0 enlaces internos sin trailing slash (sin cadenas de redirección).
- Open Graph y Twitter Cards completos; RSS válido y enlazado.
- Datos estructurados amplios: Organization, WebSite, LocalBusiness, Service, Article, FAQPage, BreadcrumbList, Event, ItemList.
- Un solo `<h1>` por página; skip-link funcional; `:focus-visible` global; toggles con `<button>` real y `aria-expanded`.
- Formulario de cotización con `<label for>` asociados y campos `required`.
- robots.txt apunta correctamente a `sitemap-index.xml`.

---

## 5. Verificación

- `npm run build` → 575 páginas, 0 errores, 0 warnings.
- `npx eslint .` → 0 errores.
- Contrastes recalculados y validados ≥ 4.5:1 (texto normal AA).

**Próximo paso sugerido:** decidir 3.1 (schema de reseñas) y 3.3 (limpieza de TypeScript), que son las dos tareas de mayor valor restantes.
