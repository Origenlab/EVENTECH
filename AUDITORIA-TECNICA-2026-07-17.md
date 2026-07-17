# Auditoría técnica del proyecto — EVENTECH (eventech.mx)

**Fecha:** 2026-07-17 · **Modo:** solo lectura (ningún archivo modificado) · **Auditado sobre:** `src/` + `dist/` construido (737 HTML)

> Nota de contexto: el prompt asumía Astro 5 + Tailwind v4. La realidad del repo es **Astro 6.4.8, CSS plano propio (no hay Tailwind ni `@tailwindcss/typography`), TS estricto (`astro/tsconfigs/strict`), SSG puro, deploy en Cloudflare Pages**. Toda la auditoría se hizo sobre lo real.

---

## 1. Resumen ejecutivo

El proyecto está en un estado técnico **mucho mejor que el promedio**: 0 errores de `astro check`, lint limpio, 0 islas de JS cliente (`client:*` = 0), canonicals y sitemap en paridad perfecta (736/736), 0 JSON-LD malformado de ~2,800 bloques, 0 imágenes sin atributo `alt` de 7,036, skip-link y nav accesible en todas las páginas, 1,404 de 2,179 imágenes ya en AVIF.

Los problemas reales se concentran en cuatro frentes:

1. **Datos fantasma en venues:** las 959 imágenes de galería declaradas en frontmatter **no existen ninguna** en `public/` — ningún venue del directorio renderiza galería (empeoró desde las ~822 conocidas). 5 heros de hoteles premium caen a placeholder.
2. **Bug móvil conocido sin corregir:** `style=` inline en `.hm-menu__grid` rompe el nav responsive en **32 hubs** (solo sonido se corrigió).
3. **LCP evitable:** el 100% de las imágenes se sirve desde ExactDN pero no hay `preconnect` al CDN, ni `fetchpriority`/preload del hero; y 2,144 `<img>` sin `width/height` generan CLS.
4. **Deuda estructural:** plantillas L4/L5 duplicadas a mano (~66% idénticas entre hermanas), formulario WhatsApp copiado en 237 páginas, CSS legacy muerto (69KB `directorio.css`, ~57% de `blog.css`), y 2 colecciones de contenido zombie (`servicios`, `pages`) que se pueden editar sin efecto alguno.

Impacto mayor por esfuerzo menor: preconnect CDN (5 min), fix Facebook links (16 404s, 30 min), fix nav móvil (1–2 h), doble H1 (1 h), aspect-ratio para CLS (medio día).

---

## 2. Resultados de validación

Ejecutado en la máquina local (2026-07-17):

| Comando | Resultado |
|---|---|
| `npx astro check` | **0 errores, 0 warnings, 256 hints** (348 archivos). Hints = el `<script define:vars>` del formulario repetido por página (ver H-I2) |
| `npx eslint 'src/**/*.{astro,ts}'` | **0 problemas** (exit 0) |
| `npm outdated` | astro 6.4.8 → 7.1.1 · @astrojs/mdx 6.0.3 → 7.0.3 · typescript 5.9.3 → 7.0.2 · prettier 3.8.5 → 3.9.5 · @astrojs/rss 4.0.18 → 4.0.19 |
| Build | No re-ejecutado (dist/ existente del 2026-07 usado como base de auditoría; `npm run build` encadena `validate:mdx` y pasó en el último build según `dist/` íntegro) |

Inventario verificado: 294 páginas `.astro`, 37 componentes, 6 layouts, 11 CSS (`src/styles`), 368 archivos de contenido (blog 121, venues 240, eventos 4, servicios 1, zonas 1, pages 1), `public/` 233MB, `dist/` 304MB / 737 HTML, 0 errores YAML, **0 violaciones reales de schema zod**.

---

## 3. Hallazgos críticos

### C1. Galerías de venues 100% rotas — 959/959 imágenes inexistentes
- **Problema:** los 222 venues con `gallery` referencian imágenes que no existen; 18 venues más no declaran galería. Total: **240/240 venues sin galería renderizable**.
- **Evidencia:** script sobre frontmatter: refs=959, existentes en `public/`=0. `public/images/venues/` (449 archivos) solo contiene heros. Ej.: `src/content/venues/cdmx/alvaro-obregon/kalesh-salon.md` → 9/9 rotas.
- **Archivo:** `src/content/venues/**/*.md` (campo `gallery`); filtro en `src/pages/directorio/[...slug].astro:105-113` (`imgExists()` evita 404 pero anula la galería).
- **Impacto técnico:** frontmatter masivamente falso; cualquier refactor que quite el filtro produce 959 404s.
- **Impacto SEO/UX:** 240 fichas con 1 sola foto = thin content visual, menor engagement, cero imágenes indexables extra.
- **Solución:** conseguir/generar imágenes por lotes priorizando venues `featured`, o podar el campo `gallery` fantasma para que el dato refleje la realidad.
- **Riesgo:** bajo (el dato ya es inerte). **Esfuerzo:** alto (fotos reales) / bajo (poda).

### C2. 5 heros de venues premium rotos → placeholder
- **Problema/Evidencia:** `image:` inexistente en `galeria-plaza-reforma.md`, `hotel-geneve.md`, `marriott-reforma.md`, `sheraton-maria-isabel.md` (cdmx/cuauhtemoc) y `presidente-intercontinental-polanco.md`. Fallback a `/images/placeholder-venue.avif` (`directorio/[...slug].astro:109-111`).
- **Impacto:** fichas de máximo valor comercial con foto genérica; og:image y JSON-LD apuntan al placeholder.
- **Solución:** añadir los 5 `.avif` o corregir rutas. **Riesgo:** nulo. **Esfuerzo:** bajo.

### C3. `style=` inline en `.hm-menu__grid` rompe el nav en móvil — 32 hubs
- **Problema:** `<ul class="hm-menu__grid" style="grid-template-columns: repeat(5, 1fr);">` gana a las media queries → menú de 5 columnas apretadas en móvil.
- **Evidencia:** 32 archivos (`grep -rln 'hm-menu__grid" style=' src/pages`): `/servicios/`, `/directorio/`, hubs de carpas, audiovisual, pistas-baile, accesorios, mobiliario, catering, cómputo, inflables… Ej.: `src/pages/directorio/index.astro:316`. El propio CSS lo prohíbe: `src/styles/home-2026.css:246-247`; la media query de 900px (`home-2026.css:1131-1134`) pierde contra el inline. Confirmado también en `dist/` (30×repeat(5), 1×6, 1×4). Solo sonido está corregido.
- **Impacto:** UX móvil rota en las páginas de mayor tráfico interno; mobile-friendliness.
- **Solución:** clases modificadoras `.hm-menu__grid--5/--6/--4` (el patrón `--7` ya existe en `home-2026.css:248`) y reemplazo mecánico en los 32.
- **Riesgo:** bajo. **Esfuerzo:** bajo (1–2 h + revisión visual).

### C4. 16 links de Facebook rotos (404 interno) en fichas de venue
- **Problema:** frontmatter `facebook:` guarda un slug (`"Casa-Nextengo-Salon-de-Eventos-Sociales"`) y el componente lo emite como href relativo → URL interna inexistente.
- **Evidencia:** 16 páginas `/directorio/`: casa-nextengo, jardin-del-renacimiento, jardin-milan-azc, la-industrial, salon-melody-azc, cetro-wtc, le-crillon, monarquia-coronado-imperial, gran-salon-del-valle, hyatt-regency-insurgentes, hacienda-de-los-morales, hacienda-panoaya, salon-monarca (Chalco), hacienda-san-martin (Lerma), jardin-las-fuentes-tultitlan, hotel-avandaro-golf-spa.
- **Impacto:** 404s reales para usuarios y crawlers; crawl budget; UX en fichas premium.
- **Solución:** en el componente de contacto (`dr-contact__item`), anteponer `https://facebook.com/` cuando el valor no empiece con `http` (arregla los 16 y previene futuros), o normalizar los 16 frontmatters.
- **Riesgo:** nulo. **Esfuerzo:** bajo (30 min).

### C5. Sin `preconnect` al CDN de imágenes ni prioridad en el hero (LCP)
- **Problema:** tras el rewriter de build, el 100% de las imágenes (LCP incluido) se sirve desde `ehzpd66uywy.exactdn.com`, pero `BaseLayout.astro:48-49` solo preconecta a Google Fonts. `fetchpriority` = 0 usos en src; sin preload del hero.
- **Impacto:** el LCP paga DNS+TLS+TCP completos al CDN en conexión fría — probablemente el mayor costo de LCP evitable del sitio.
- **Solución:** `<link rel="preconnect" href="https://ehzpd66uywy.exactdn.com" crossorigin>` en BaseLayout (5 min) + `fetchpriority="high"` en la imagen hero de cada plantilla (medio).
- **Riesgo:** nulo. **Esfuerzo:** bajo/medio.

### C6. Contraste del dorado de marca falla WCAG AA como texto
- **Problema:** `--color-accent: #c2a24a` sobre blanco = **2.45:1** (AA exige 4.5:1; falla también el 3:1 de texto grande). `#d4b96a` (stats proveedores) ≈ 2:1.
- **Evidencia:** 214 definiciones en dist; usado como TEXTO en links del `.prose` del blog (121 posts), `.hm__eyebrow` (0.75rem), `.benefits-list__icon`, `.toc-list__item--active`.
- **Impacto:** accesibilidad real (baja visión, sol); los links dorados del blog son el caso grave: texto pequeño funcional.
- **Solución:** token derivado `--color-accent-text` ≈ `#8a6d2f` (4.6:1) solo para texto sobre claro; mantener `#c2a24a` en bordes/fondos/decoración.
- **Riesgo:** medio (identidad visual — decisión de diseño). **Esfuerzo:** medio (2–4 h).

---

## 4. Hallazgos importantes

### I1. Doble `<h1>` en 15 posts del blog (confirmado en dist)
- **Evidencia:** `BlogLayout.astro:199` emite `<h1>` y 15 posts abren el body con `# Título` distinto. Ej. `dist/blog/guia-maestra-bodas-cdmx-equipamiento-completo-2026/` tiene dos H1 diferentes. Afectados: ambientacion-bodas-lujo, bodas-aire-libre-cdmx-2026, carpas-bodas-cdmx, corporativos-terraza-cdmx, guia-accesorios-infraestructura, guia-eventos-corporativos, guia-maestra-bodas, mejores-jardines, mejores-salones-fiestas, mejores-salones-xv-anos + 5 más.
- **Impacto:** dos H1 con textos distintos diluyen el heading principal; outline a11y roto.
- **Solución:** degradar el `#` inicial a `##` en los 15 (o filtrarlo en el layout). **Riesgo:** nulo. **Esfuerzo:** bajo.

### I2. Formulario WhatsApp duplicado como script inline en 237 páginas
- **Evidencia:** `<script define:vars={{ whatsapp: SITE.contact.whatsapp }}>` en 237 páginas, ~1.8KB c/u, solo cambia el nombre del producto. Son los 256 hints de `astro check`. Ej.: `src/pages/servicios/carpas/hangar/hangar-30m/index.astro`.
- **Impacto:** ~430KB de fuente duplicada; cualquier fix del form = tocar 237 archivos.
- **Solución:** componente `ReservaForm.astro` con props + `data-*` en lugar de `define:vars`.
- **Riesgo:** medio (migrar por lotes con build entre lotes). **Esfuerzo:** alto.

### I3. Plantillas L4/L5 duplicadas a mano (deuda estructural raíz)
- **Evidencia:** L5 hermanas comparten ~66% (`diff` rgb vs pixel: 240/698 líneas distintas); hubs L4: 599/769. ~230 páginas repiten breadcrumbs/JSON-LD/FAQ/form; 239 imports de `l3-shared.css`, 231 de `l4-shared.css`.
- **Impacto:** cada cambio de plantilla = cientos de archivos; ya produjo C3 ("solo sonido corregido"). El build lo absorbe (dist deduplica a 16 CSS/224KB) — el costo es de mantenimiento, no de peso.
- **Solución:** mediano plazo, `[slug].astro` + colección/datos por vertical (el patrón ya existe: inflables usa `[slug]` con `src/data/inflables-juegos.ts`). Mínimo: extraer form/CTA/FAQ a componentes.
- **Riesgo:** alto si se hace de golpe (cambia HTML); ir vertical por vertical. **Esfuerzo:** alto.

### I4. 2,144 `<img>` sin `width`/`height` → CLS
- **Evidencia:** 2,375 `<img>` planos (0 usos de `<Image>` de astro:assets); `loading="lazy"` en 2,372 ✔ y `decoding` en 2,145 ✔, pero `width=` solo en 231.
- **Impacto:** sin espacio reservado → layout shift en galerías/cards (CLS), sobre todo en directorio.
- **Solución:** `aspect-ratio` en el CSS de las cards (pocas reglas cubren miles de imgs); `width/height` explícitos en heros. Migrar a `<Image>` no aplica con imágenes en `public/`.
- **Riesgo:** bajo. **Esfuerzo:** medio.

### I5. BlogLayout carga 4 CSS incluida la hoja legacy mayormente muerta
- **Evidencia:** `BlogLayout.astro:22-25` importa `blog.css` (16.8KB) + `blog-components.css` + `home-2026.css` + `blog-2026.css`. **27 de 47 selectores raíz de `blog.css` no aparecen en ningún `class=` de src** (`.blog-sidebar__*`, `.pagination__*`, `.blog-filter-tab`…).
- **Impacto:** 121 páginas de blog cargan CSS legacy; doble sistema `blog-` vs `hm-bl-`.
- **Solución:** migrar lo vivo a `blog-2026.css` y eliminar `blog.css`. **Riesgo:** medio (clases vía markdown/JS). **Esfuerzo:** medio.

### I6. Colecciones `servicios` y `pages` zombie
- **Evidencia:** `servicios` (1 entrada) excluida explícitamente por `src/pages/servicios/[...slug].astro` (`STATIC_PAGES = new Set(["mobiliario"])`) → genera 0 páginas; el hub real es `.astro` con title hardcodeado que ya divergió del `.md`. `pages/nosotros.md` queda sombreado por `src/pages/nosotros/index.astro` (gana el `.astro`, verificado en dist).
- **Impacto:** editar ese contenido no cambia nada en el sitio (drift real ya existente).
- **Solución:** borrar las 2 entradas (y sus `defineCollection` o documentarlas vacías), o migrar los hubs a la colección. **Riesgo:** bajo. **Esfuerzo:** bajo.

### I7. Rating/reviews sin `reviewsSource` en ~200 venues
- **Evidencia:** política anti-reseñas-fabricadas (`content.config.ts:500-504`): sin `reviewsSource` no se muestran ni emiten. **209/240 con `rating` sin fuente; 187 con `reviews[]` pobladas sin fuente; solo 17 con fuente.**
- **Impacto:** peso muerto con riesgo reputacional si un refactor las emite por accidente; se pierde AggregateRating en el 87% del directorio.
- **Solución:** documentar fuente real venue por venue (valor SEO alto) o purgar rating/reviews sin fuente (elimina el riesgo; nulo en UI, ya están ocultos). **Esfuerzo:** medio.

### I8. Contenido plantilla duplicado en el cluster de blog masivo
- **Evidencia:** hashing de párrafos ≥120 chars: **18 hashes repetidos entre posts**; el peor, un párrafo idéntico en 7 posts (`cuanto-cuesta-iluminar-fachada`, `city-color`, `guirnaldas`, `luz-negra-uv`…); otro en 7, otro en 6; CTA idéntico en 4 posts de inflables.
- **Impacto:** near-duplicate en el cluster de 46 artículos de iluminación; debilita E-E-A-T ("tres montajes reales" repetidos textuales en 7 páginas).
- **Solución:** reescribir los ~6 bloques plantilla con variación real (~25 posts). **Riesgo:** bajo. **Esfuerzo:** medio.

### I9. Blog: 65 posts sin `faqs` y 51 sin `image`
- **Evidencia:** FAQPage se emite solo desde `faqs` (`BlogLayout.astro:171`): 56 lo tienen, 65 no (incluidos pillar posts). 51 posts sin `image` (casi todo el cluster `cuanto-cuesta-*`) → placeholder gris en cards y og:image genérica.
- **Impacto:** rich results perdidos en >50% del blog; CTR en compartidos/cards.
- **Solución:** añadir 3–5 faqs (muchos ya tienen la sección en el body) y asignar imagen del servicio correspondiente (ya existen en `public/images/`). **Riesgo:** nulo. **Esfuerzo:** medio.

### I10. Paginación del blog sin H1 y con description duplicada — 13 páginas
- **Evidencia:** `/blog/2/`…`/blog/14/`: 0 H1 y description idéntica a `/blog/`.
- **Solución:** H1 "Blog — página N" + description numerada en el template de paginación. **Riesgo:** nulo. **Esfuerzo:** bajo (20 min).

### I11. Salto h2→h4 sistemático en las 240 fichas de directorio
- **Evidencia:** sección "Horarios" (h4 tras h2) — componente compartido del layout de venue, un solo lugar.
- **Solución:** h4→h3 en el sidebar del venue. **Riesgo:** nulo. **Esfuerzo:** bajo (10 min + rebuild).

### I12. `getStaticPaths` del directorio omite venues silenciosamente + únicos 2 `any` del repo
- **Evidencia:** `src/pages/directorio/[...slug].astro:35` `const regions = ["cdmx", "estado-mexico"]` hardcodeado — un venue con otra `region` jamás genera página, sin warning (mecanismo de los históricos "misfiled"; hoy 240/240 coinciden). `props: any` (línea 32) y `let VenueContent: any` (línea 96) — los únicos `any` de src, en el archivo más grande (76KB).
- **Solución:** derivar regiones de la colección o `console.warn` en build; tipar props con unión discriminada; considerar partir el monolito en 3 rutas. **Riesgo:** bajo. **Esfuerzo:** medio.

### I13. Script ExactDN client-side muerto en BaseLayout (footgun)
- **Evidencia:** `BaseLayout.astro:63-74` reescribe `img[src^="/images/"]` al CDN en DOMContentLoaded, pero el rewriter de build (`astro.config.mjs:88-159`) ya reescribió todo: 0 archivos en dist con src relativo → el script nunca hace nada.
- **Impacto:** JS muerto en ~737 páginas; si algún día encontrara un src relativo causaría doble descarga (daña LCP).
- **Solución:** eliminarlo del BaseLayout. **Riesgo:** bajo (verificar 1 build). **Esfuerzo:** bajo.

### I14. Imágenes pesadas y material de referencia publicado
- **Evidencia:** 18 archivos >400KB en `public/images` (top: `mobiliario/tiffany-dorada-gallery-1.jpg` 528KB; `mobiliario/ref/silla-real-06.jpg` 528KB). `public/images/mobiliario/ref/` = 16 archivos de referencia interna publicados. Totales: 538 jpg = 99MB, 1,404 avif, 232 webp.
- **Impacto:** ExactDN mitiga en runtime, pero infla repo/deploy y publica material interno.
- **Solución:** convertir los 18 a AVIF ≤200KB; mover `ref/` a `reference-photos/` (verificar referencias antes). **Riesgo:** bajo. **Esfuerzo:** bajo.

### I15. 27 links internos sin trailing slash + 9 Product sin offers
- **Evidencia:** 11 links sin `/` final en `/blog/tendencias-decoracion-bodas-2026-cdmx/` (redirect 308 por click); los otros 16 son C4. JSON-LD: 9 hubs L3 emiten Product sin `offers` (`/servicios/accesorios/`, `/audiovisual/`, `/carpas/`, `/catering/`, `/computo/`, `/iluminacion/` +3); 1 EventVenue de 241 sin `address`.
- **Solución:** añadir slashes (10 min); en hubs L3 emitir solo `Service` o añadir `AggregateOffer`; completar el address. **Riesgo:** bajo. **Esfuerzo:** bajo.

---

## 5. Mejoras recomendadas

- **R1. Fuentes:** Cormorant Garamond vía Google Fonts (con `display=swap` ✔) es un request chain de terceros en el critical path. Self-hostear el woff2 + `<link rel="preload">` lo elimina. Esfuerzo bajo.
- **R2. og:image genérica en 615/736 páginas (84%):** `og-default.jpg` domina; fichas de producto/venue tienen fotos reales utilizables. CTR en compartidos. Esfuerzo medio.
- **R3. Titles >60 chars en 153 páginas:** causa: complemento fijo de 30 chars (convención del proyecto, no error). Acortar solo la parte variable en los ~20 peores (máx: 96 chars en `/servicios/iluminacion/arquitectonica/city-light/`). 41 descriptions >160 (peores: `/que-es-eventech/` 194, `/precios/` 192, `/servicios/` 178).
- **R4. Dominios hermanos sin `rel` de relación:** rentadeiluminacion.com (89 págs), mesaspicnic.com (31), sonidoparaeventos.com.mx (11), inflablesparafiestas.com.mx (5) — solo `noopener noreferrer`. Red de sitios del mismo operador con anchor comercial en plantilla: riesgo bajo de lectura como link scheme. `rel="sponsored"` es lo canónico, pero pierde valor de link entre sitios propios — **decisión a nivel portafolio**.
- **R5. `/que-es-eventech/` huérfana:** 0 links entrantes internos (está en sitemap). Enlazar desde footer o `/nosotros/`.
- **R6. Consolidar layouts:** ServiceLayout/ZoneLayout/EventLayout casi idénticos (duplican types `HeroCard`/`HeroProps` y el shell). BlogLayout de 32KB es un layout-dios (JSON-LD + related + getCollection propio) — extraer partes.
- **R7. Endurecer schema zod:** usar `reference('blog')` en `relatedPosts` (hoy `z.array(z.string())`; los rotos son 0 solo gracias al linter), `refine()` que exija `reviewsSource` cuando hay `rating` (habría prevenido I7), `min()` en `venues.description`, unificar el campo `slug` decorativo que ya divergió en 7 venues.
- **R8. Fechas del blog en clusters:** 51 posts con `date: 2026-07-08`, 35 con `2025-01-01`. Footprint de generación masiva y orden arbitrario en listados/RSS. Escalonar + `updatedDate`.
- **R9. Venues, datos menores:** 6 sin `coordinates` (sin geo en JSON-LD), 43 sin `faqs`, **18 con `contact` totalmente vacío** (ficha sin ningún dato de contacto), 1 nombre duplicado ("Club de Banqueros de México" en centro-historico Y lomas-chapultepec — verificar cuál es real), 1 campo huérfano `payment` (salones-centenario.md).
- **R10. Extender `scripts/validate-mdx.mjs`:** hoy solo valida MDX del blog (imports/props de componentes). Añadir: chequeo de `gallery` de venues vs `public/` y H1 en body — los dos bugs que llegaron a producción; ~10 líneas cada uno. `listMdx` no es recursivo (rompería con subcarpetas) y `REQUIRED_PROPS` hardcodeado.
- **R11. Dependencias:** Astro 7.1.1 y MDX 7 disponibles (major — planificar con la skill de migración, no urgente); prettier/rss patch triviales. `package.json` aún se llama `astro-pro-template`.
- **R12. Alias duplicados** en `tsconfig.json` y `astro.config.mjs` (vite.resolve.alias): dos fuentes que pueden divergir; Astro lee los paths del tsconfig — probar build sin el bloque de vite.
- **R13. `alt=""` en 237 imágenes (107 págs):** mayormente thumbnails decorativos de related-cards (aceptable); revisar los casos en cuerpo de blog.
- **R14. `hm-form` (home):** el `outline:none` se reemplaza solo con border-color — reforzar con box-shadow como en los demás forms. `Disallow: /draft/` y `/api/` en robots.txt apuntan a rutas inexistentes (inofensivo).

---

## 6. Código y archivos innecesarios

Todo verificado con grep de referencias (0 refs = seguro tras verificación final):

| Elemento | Evidencia | Acción |
|---|---|---|
| `src/styles/directorio.css` (69KB) | 0 imports en src (el vivo es `directorio-2026.css`, 5 imports) | Borrar |
| ~57% de `src/styles/blog.css` | 27/47 selectores raíz sin uso en src | Migrar lo vivo a blog-2026.css y borrar |
| Script ExactDN en `BaseLayout.astro:63-74` | 0 imgs con src relativo en dist | Borrar (I13) |
| `_propuesta-home.html`, `_seocheck.cjs`, `_seocheck.mjs`, `assign-venue-images.sh`, `PROMPT-homologar-brincolins.md`, `build.log` | 0 referencias en src/scripts/package.json | Borrar de la raíz |
| `reference-photos/` (48MB) + `_auditoria-capturas/` (19MB) | 175 archivos trackeados en git | `git rm --cached` + .gitignore |
| `public/images/mobiliario/ref/` (16 archivos) | Material de referencia publicado en producción | Mover a reference-photos (verificar refs) |
| `src/content/servicios/mobiliario/index.md`, `src/content/pages/nosotros.md` | Nunca se renderizan (I6) | Borrar o migrar |
| `src/content/blog/segundo-articulo.mdx` | Draft placeholder del template | Borrar |
| `rating/reviews` en 187-209 venues sin fuente | Ocultos por política (I7) | Purgar o documentar fuente |
| Campo `gallery` fantasma en 222 venues | 959/959 rotas (C1) | Podar o poblar |

Regla del proyecto respetada: nada de `git add -A`; limpiar `.fuse_hidden` desde el sistema real.

---

## 7. Rendimiento y Core Web Vitals

- **LCP:** hero desde ExactDN sin preconnect (C5) = handshake completo en frío; sin `fetchpriority`/preload; Google Fonts en el critical path (R1). Son las tres palancas reales de LCP.
- **CLS:** 2,144 `<img>` sin dimensiones (I4). Vía barata: `aspect-ratio` en CSS de cards/galerías.
- **INP:** riesgo casi nulo — 0 islas, 1 solo JS bundleado, handlers triviales. Nada que hacer.
- **Peso:** HTML por página alto pero aceptable con compresión CF (`index.html` 160KB, L5 típica 104KB — mucho JSON-LD + FAQ duplicada visible+schema). CSS en dist: 16 archivos/224KB, bien deduplicado pese a los 470 imports por página. Imágenes: 1,404 AVIF ✔, pero 99MB de JPG con 18 archivos >400KB (I14).
- **Caché:** ya conocido — CF cachea HTML por URL; purga tras deploy y verificación con `?cb=` (memoria del proyecto).
- **Build:** el `execSync` de git por archivo en el sitemap-lastmod tiene cache Map ✔; el mayor costo de build son las ~740 páginas — nada anómalo detectado.
- **Lo que ya está bien:** lazy loading 2,372/2,375, decoding async 2,145, 0 `client:*`, sitemap con lastmod real por git.

---

## 8. SEO técnico y contenido Markdown

**Sólido (verificado, no tocar):** canonicals 736/736 con dominio y trailing slash correctos; 0 titles ausentes/duplicados; sitemap ↔ dist en paridad perfecta (0 huérfanas en sitemap, 0 fantasma); 0 noindex accidental; OG + twitter card completos en 736/736; JSON-LD 0 errores de parseo (~2,800 bloques): Organization+WebSite+LocalBusiness en todas, BreadcrumbList 735 + breadcrumb visual 731, FAQPage en 547 con preguntas visibles en HTML, Article 121, EventVenue 241; robots.txt correcto con sitemap; 404.html útil (12 links + buscador); `lang="es-MX"`; RSS presente; 0 links internos rotos en los 121 bodies de blog; 0 imágenes de body rotas; 0 descriptions ausentes.

**A corregir:** 16 404s de Facebook (C4), doble H1 en 15 posts (I1), h2→h4 en 240 fichas (I11), paginación sin H1 (I10), 27 links sin slash (I15), Product sin offers en 9 hubs (I15), duplicación de párrafos plantilla (I8), 65 posts sin FAQPage (I9), og:image genérica 84% (R2), titles largos (R3), huérfana `/que-es-eventech/` (R5), fechas en cluster (R8).

---

## 9. Accesibilidad

| Severidad | Hallazgo | Alcance |
|---|---|---|
| **Alta** | Contraste dorado #c2a24a como texto (2.45:1) — links del blog, eyebrows, iconos (C6) | Todo el sitio |
| **Alta** | Nav móvil roto por style inline (C3) — afecta a todos los usuarios móviles, más a quienes usan zoom | 32 hubs |
| **Media** | Doble H1 (I1) y salto h2→h4 (I11) — navegación por encabezados de lectores de pantalla | 15 + 240 págs |
| **Media** | CLS por imgs sin dimensiones (I4) — desorientación durante la carga | Global |
| **Baja** | `hm-form` con outline reemplazado solo por border-color (R14) | Home |
| **Baja** | `alt=""` en algunos casos de cuerpo de blog (R13) | ~107 págs |

**Bien:** skip-link 736/736, hamburger `<button>` con aria-expanded/controls/label, FAQs con `<details>/<summary>` nativos, formulario cotizar 8/8 labels + autocomplete + inputmode, `:focus-visible` global, `prefers-reduced-motion` presente (solo 1 keyframes en dist — riesgo bajo), Nav con Escape y click-outside.

---

## 10. Plan de optimización

**Fase 1 — Correcciones críticas (1 día):**
1. C4 fix Facebook links (componente, 30 min) · 2. C3 nav móvil 32 hubs (1–2 h) · 3. C2 los 5 heros rotos · 4. C5a preconnect CDN (5 min) · 5. I1 doble H1 (1 h) · 6. I10+I11+I15a (paginación, h4→h3, slashes: ~1 h).

**Fase 2 — Alto impacto / bajo esfuerzo (1–2 días):**
7. I13 borrar script ExactDN muerto · 8. C5b fetchpriority en heros · 9. I6 colecciones zombie · 10. I15b Product sin offers · 11. Limpieza sección 6 (directorio.css, raíz, git rm --cached) · 12. R5 enlazar huérfana · 13. R14 focus hm-form.

**Fase 3 — Rendimiento (2–3 días):**
14. I4 aspect-ratio para CLS · 15. R1 self-host fuente · 16. I14 comprimir 18 imgs + mover ref/ · 17. I5 matar blog.css legacy.

**Fase 4 — Contenido/SEO (1–2 semanas, por lotes):**
18. C1 decisión galerías venues (poblar featured o podar) · 19. I9 faqs+image en blog · 20. I8 reescribir bloques duplicados · 21. I7 decisión reviews · 22. R2 og:image reales · 23. R3 acortar 20 peores titles.

**Fase 5 — Refactor y largo plazo:**
24. C6 token de contraste (decisión de diseño) · 25. I2 componente ReservaForm (por lotes) · 26. I12 tipar/partir directorio · 27. R7 endurecer zod + R10 extender validador · 28. I3 migrar L5 a [slug] por vertical · 29. R6 consolidar layouts · 30. R11 evaluar Astro 7.

---

## 11. Matriz de prioridades

| Prioridad | Hallazgo | Archivo | Impacto | Esfuerzo | Riesgo | Acción recomendada |
|---|---|---|---|---|---|---|
| P0 | C4 16 links Facebook rotos | componente dr-contact / 16 .md venues | Alto (404s) | Bajo | Nulo | Prefijar https://facebook.com/ en componente |
| P0 | C3 nav móvil roto 32 hubs | 32 index.astro + home-2026.css | Alto (UX móvil) | Bajo | Bajo | Clases --5/--6/--4, quitar style inline |
| P0 | C5 sin preconnect CDN | BaseLayout.astro:48 | Alto (LCP) | Bajo | Nulo | preconnect + fetchpriority hero |
| P0 | C2 5 heros venues rotos | 5 .md en cuauhtemoc/polanco | Alto (fichas premium) | Bajo | Nulo | Añadir los 5 avif |
| P1 | I1 doble H1 15 posts | 15 .md blog | Medio (SEO) | Bajo | Nulo | `#`→`##` |
| P1 | I10 paginación blog | template [...page].astro | Medio | Bajo | Nulo | H1 + description por página |
| P1 | I11 h2→h4 en 240 fichas | sidebar venue (1 componente) | Medio | Bajo | Nulo | h4→h3 |
| P1 | I13 script ExactDN muerto | BaseLayout.astro:63-74 | Medio (footgun) | Bajo | Bajo | Eliminar |
| P1 | I6 colecciones zombie | content/servicios, content/pages | Medio (drift) | Bajo | Bajo | Borrar entradas |
| P1 | I4 CLS imgs sin dimensiones | CSS cards/galerías | Medio (CWV) | Medio | Bajo | aspect-ratio |
| P1 | C1 galerías venues fantasma | 222 .md venues | Alto (contenido) | Alto/Bajo | Bajo | Poblar featured o podar |
| P2 | C6 contraste dorado | tokens.css + usos texto | Medio (a11y) | Medio | Medio | --color-accent-text #8a6d2f |
| P2 | I5 blog.css legacy | BlogLayout.astro:22 | Medio | Medio | Medio | Migrar y borrar |
| P2 | I9 blog sin faqs/image | 65+51 .md | Medio (rich results) | Medio | Nulo | Completar frontmatter |
| P2 | I8 párrafos duplicados | ~25 .md blog | Medio (SEO) | Medio | Bajo | Reescribir 6 bloques |
| P2 | I7 reviews sin fuente | ~200 .md venues | Medio (riesgo) | Medio | Nulo | Purgar o documentar |
| P2 | I14 imgs pesadas + ref/ | public/images | Bajo-medio | Bajo | Bajo | AVIF + mover ref/ |
| P3 | I2 form duplicado 237 págs | 237 index.astro | Alto (mantenim.) | Alto | Medio | Componente ReservaForm |
| P3 | I3 plantillas L4/L5 a mano | ~230 páginas | Alto (mantenim.) | Alto | Alto | [slug] por vertical |
| P3 | I12 directorio monolito + any | directorio/[...slug].astro | Medio | Medio | Bajo | Tipar, derivar regiones |
| P3 | R7/R10 zod + validador | content.config.ts, validate-mdx.mjs | Medio (prevención) | Bajo | Bajo | reference() + refine + checks |

---

## 12. Métricas esperadas

Medir antes/después con Lighthouse (móvil, 3 corridas) sobre: home, 1 hub L4, 1 L5, 1 ficha de venue, 1 post de blog. Validar en producción con `?cb=` (CDN cachea) y a las 4 semanas en Search Console + CrUX.

| Métrica | Cómo validar | Esperado |
|---|---|---|
| LCP | Lighthouse + CrUX | −300–800 ms en frío (preconnect + fetchpriority + fuente) |
| CLS | Lighthouse + CrUX | <0.05 en directorio/galerías (hoy con shift por imgs sin dims) |
| 404 internos | Screaming Frog / script sobre dist | 16 → 0 |
| Mobile usability | Prueba manual + Search Console | Nav colapsando en los 32 hubs |
| Rich results FAQ | Search Console → Mejoras | +65 páginas elegibles |
| Product warnings | Search Console | 9 hubs sin avisos de offers |
| Contraste | axe DevTools | 0 fallos AA en texto |
| Peso repo git | `git count-objects -vH` | −67MB tras rm --cached |
| Hints astro check | `npx astro check` | 256 → ~0 tras ReservaForm |
| Indexación/CTR | Search Console (4–8 semanas) | CTR up en posts con og:image real; impresiones estables (ningún cambio arriesga lo indexado) |

---

## Top 10 acciones por impacto real

1. **Fix nav móvil en 32 hubs** (C3) — bug visible para todo el tráfico móvil en las páginas más enlazadas.
2. **Preconnect a ExactDN + fetchpriority del hero** (C5) — la mejora de LCP más barata del sitio.
3. **Fix 16 links de Facebook rotos** (C4) — 404s reales, 30 minutos.
4. **Decisión sobre galerías de venues** (C1) — 240 fichas sin galería es el mayor hueco de contenido del sitio; poblar los featured primero.
5. **5 heros de hoteles premium** (C2) — máximo valor comercial por 5 archivos.
6. **Doble H1 + paginación + h2→h4** (I1, I10, I11) — higiene SEO estructural, ~2 h total.
7. **aspect-ratio para CLS** (I4) — cubre 2,144 imágenes con pocas reglas CSS.
8. **faqs + image en el blog** (I9) — +65 páginas elegibles a rich results y cards con imagen.
9. **Limpieza total** (sección 6) — CSS muerto, script muerto, colecciones zombie, 67MB en git.
10. **Contraste del dorado como texto** (C6) — requiere decisión de diseño, pero es el fallo a11y más extendido.

---

*Auditoría de solo lectura completada. Ningún archivo del proyecto fue modificado. Espero autorización para implementar cualquier cambio.*
