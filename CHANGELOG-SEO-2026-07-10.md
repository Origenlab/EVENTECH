# CHANGELOG SEO — EVENTECH — 2026-07-10

Auditoría + reparación con el Prompt Maestro (SEO técnico + Schema + Social Cards). Piloto del portafolio.

## Cambios aplicados

1. **Canónico www → non-www** — `public/_redirects`: regla `https://www.eventech.mx/* https://eventech.mx/:splat 301` al inicio del archivo. Confirmado ANTES del fix: `www.eventech.mx` respondía **200** (sitio duplicado para Google).
2. **OG/Twitter en JPEG** — 121 páginas servían `og:image` en AVIF (redes no lo soportan → shares sin imagen). Fix arquitectónico en `src/components/SEOHead.astro`: si la imagen resuelta es `.avif/.webp`, se sirve la variante `/images/og/<nombre>.jpg`. Generados **104 JPEG 1200×630** (crop cover, q82, progressive, strip) en `public/images/og/`.
3. **Metas nuevas** en SEOHead: `og:image:type` (dinámico jpeg/png) + `og:image:alt` (título de la página).
4. **7 imágenes de blog rotas** (frontmatter apuntaba a archivos inexistentes → hero + og 404 en prod). Remapeadas a imágenes reales existentes del mismo tema (carpas/corporativos/xv/salones).
5. **Logo schema** — `src/lib/seo.ts` organizationJsonLd: `width: 600, height: 160` (dimensiones reales verificadas de `public/images/logo.png`).
6. **Sitemap lastmod dinámico** — `astro.config.mjs`: eliminado `lastmod: new Date()` (734 URLs con timestamp idéntico del build = señal de frescura anulada). Nuevo `lastmodForUrl()`: URL → archivo fuente (pages/ o content collections) → `git log -1 --format=%cI` → fallback mtime → si no resuelve, se OMITE. Resultado: 642/734 con fecha real (10 fechas distintas), 92 omitidas honestamente.

## Hallazgos del prompt NO aplicados (con razón)

- **`["Service","Product"]` híbrido** en `lib/seo.ts:163`: NO es bloque duplicado; es un solo nodo con doble tipo, decisión AISO documentada en el código (motores de IA buscan Product en equipo rentable). Se conserva.
- **aggregateRating**: ya se omite a propósito (sin reseñas reales; comentario en `lib/seo.ts:224`). Correcto según regla de oro — nada que reparar.
- **BreadcrumbList duplicado**: no existe; 1 por página, home sin breadcrumb. Ya correcto.
- **og-default**: ya era JPEG 1200×630.

## Pendientes manuales (dashboard)

1. **Cloudflare Redirect Rule** (fix garantizado www): Rules → Redirect Rules → When `Hostname equals www.eventech.mx` → Dynamic 301 → `concat("https://eventech.mx", http.request.uri.path)`, preserve query. El `_redirects` solo aplica si www está adjunto al proyecto Pages.
2. **Facebook Sharing Debugger**: re-scrape homepage + 2-3 servicios (https://developers.facebook.com/tools/debug/).
3. **Rich Results Test**: homepage + 1 servicio.
4. **Search Console**: verificar propiedad www, consolidar en non-www, reenviar sitemap.
5. **Cloudflare AI Crawl Control**: revisar que GPTBot/ClaudeBot/PerplexityBot estén permitidos.

## Datos por confirmar con el dueño

- ¿@eventechmx (X), facebook/instagram.com/eventechmx son cuentas reales? Si no, quitar `twitter:site` y depurar `sameAs` en `config/site.ts`.
- ¿"EVENTECH S.A. de C.V." (legalName) y fundación 2024 son reales?

## Validación post-deploy (resultado 2026-07-10)

- [ ] www → 301: **PENDIENTE** — sigue 200; `_redirects` no aplica porque www no está adjunto al proyecto Pages. Requiere Redirect Rule en dashboard (pendiente manual #1).
- [x] og JPEG CDN → `200 image/jpeg` ✓
- [x] og:image .jpg + og:image:type + og:image:alt en HTML servido de /servicios/carpas/ ✓
- [x] sitemap live con lastmod real variado ✓ (requirió 2º commit: `fetch-depth: 0` en deploy.yml — checkout shallow devolvía fecha del HEAD para todo)
- [ ] Rich Results Test + FB Debugger re-scrape (manual)

Actions verdes: `5a4eb5e5` (fixes) y `ba881d84` (fetch-depth). Gate cumplido.

## Mejora para el prompt maestro (Regla 6)

- Agregar chequeo: **og:image apuntando a archivos inexistentes** (aquí 7 posts de blog, el prompt no lo contemplaba).
- El swap AVIF→JPEG en el shell (1 edición) escala mejor que editar N páginas: adoptarlo como patrón estándar.
- Sitios con estrategia AISO previa pueden tener `["Service","Product"]` intencional: verificar comentarios del código antes de "corregir".
