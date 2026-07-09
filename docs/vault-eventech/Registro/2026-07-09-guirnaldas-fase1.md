# 2026-07-09 — Guirnaldas Fase 1: vertical propio

Ejecución de la Fase 1 del [[Estudio-Guirnaldas-Luces]]. Guirnaldas deja de ser un subitem de `decorativa` y pasa a ser hub L4 con identidad propia.

## Decisiones aprobadas (Frank, 2026-07-09)

1. Hub en `/servicios/iluminacion/guirnaldas/` (jerarquía limpia, no landing raíz).
2. **Precio cerrado**, alineado con `rentadeiluminacion.com` (el más caro de los dos dominios del aliado, para no cotizar por debajo de quien ejecuta el montaje).
3. Escalón grande **400 m → 500 m**, para ser comparable metro a metro con REDEIL.
4. Alcance: hub + 4 fichas de metraje + 301s.

## Lo que se construyó

### Hub L4 nuevo
`src/pages/servicios/iluminacion/guirnaldas/index.astro` — molde `hm-` ([[Template-L4-hub]]), variante **§8b (L5 hoja)**: las fichas de metraje no tienen L6, así que los specs van como pills `hm-feat__stats` no enlazadas dentro de las tarjetas y como chips enlazados solo en el L3 padre.

- Hero + nav de 4 paquetes + catálogo + 4 módulos `hm-feat` con galería `--g3` + why (6) + steps (4) + FAQ (7) + formulario WhatsApp.
- `ProveedorIluminacion focus="guirnaldas Edison y fairy lights"`.
- JSON-LD: `serviceJsonLd` (offers 3500–24000) + breadcrumb + `faqJsonLd`.
- `hm-menu` con `<style is:global>` y media queries — **nunca** `style=` inline (rompe el responsive; ver [[eventech-hm-menu-inline-bug]]).

### Fichas movidas (git mv, historial preservado)

| Antes | Ahora | Precio |
|---|---|---|
| `…/decorativa/fairy-lights/guirnaldas-50m/` | `…/iluminacion/guirnaldas/50-metros/` | $3,500 + IVA |
| `…/guirnaldas-100m/` | `…/guirnaldas/100-metros/` | $6,500 + IVA |
| `…/guirnaldas-200m/` | `…/guirnaldas/200-metros/` | $11,500 + IVA |
| `…/guirnaldas-400m/` | `…/guirnaldas/500-metros/` | $24,000 + IVA |

En las 4 fichas: breadcrumb sin `Decorativa`/`Fairy Lights`, back-links al nuevo hub, `priceRange` con precio cerrado (min = max), y nueva fila `Precio del paquete` como primer spec.

**La ficha de 500 m se reescribió numéricamente:** 400→500 metros, 800→1,000 focos, ~1,600W→~2,000W, 4→5 circuitos, 4→5 dimmers, 3-4→4-5 técnicos, montaje 6-10 h→8-12 h.

### Padres actualizados
- `iluminacion/index.astro` (L3): **Guirnaldas entra como primera** de 5 subcategorías — card de catálogo, item de nav (`hm-menu--cols5` → grid base de 6) y módulo `hm-feat` propio.
- `decorativa/index.astro`: el enlace "guirnaldas por longitud" ahora va al hub.
- `decorativa/fairy-lights/index.astro`: card 400m → 500m; `sidebarRelated` gana enlace al hub. La página **sigue viva** como la de micro LED (su migración a `guirnaldas/fairy-lights-micro-led/` es Fase 2).

### Redirects
4 líneas 301 en `public/_redirects`, incluyendo `guirnaldas-400m/ → 500-metros/`.

## Verificación

- `npm run build` → **725 páginas, 0 errores**, 16.26 s.
- Auditoría de links **sobre `dist/`** ([[eventech-auditar-sobre-dist]]): **734 hrefs internos únicos, 0 rotos**.
- `dist/servicios/iluminacion/decorativa/fairy-lights/guirnaldas-*` ya no existe.
- Hub: canonical correcto, `"minPrice":3500,"maxPrice":24000`, 1 bloque `FAQPage`.
- Cero rastros de "400 m" / "800 focos" en texto visible.

## Deuda técnica consciente

**Los archivos de imagen del paquete de 500 m siguen nombrados `*-400m-*.avif`.** Los `alt` ya dicen 500 metros. Renombrarlos implicaba tocar 4 posts de blog que los referencian; se decidió no hacerlo en Fase 1. Si se renombran después: `git mv` + sed sobre `src/content/blog/`.

## Pendiente CDN

`eventech.mx` cachea HTML por URL. Tras el deploy hay que **purgar Cloudflare** y verificar con `?cb=` ([[eventech-cdn-cache]]).

## Siguiente

Fase 2 del [[Estudio-Guirnaldas-Luces]]: 4 páginas de tipo de luz (incluida la migración de `fairy-lights` a `fairy-lights-micro-led`) + 4 de patrón de montaje (canopy, tree wrap, perimetral/zigzag, pérgolas y arcos).

---

## Deploy — verificado en vivo (2026-07-09)

- Commit `94d2b777`, push a `master`. Los 4 `git mv` quedaron registrados como `R` (rename) → historial preservado.
- Action `deploy.yml` (Cloudflare Pages, wrangler-action) → **completed / success**.
- Hub y las 4 fichas: **HTTP 200**. Los 4 redirects viejos: **301** hacia la URL correcta (incluido `guirnaldas-400m/ → 500-metros/`).
- `"minPrice":3500,"maxPrice":24000` presente en el hub en producción.
- **No hizo falta purgar Cloudflare:** `cf-cache-status: DYNAMIC` en `/servicios/iluminacion/` y `/decorativa/`.

### Dos trampas encontradas en el camino

1. **`.fuse_hidden*`** — editar por el mount del sandbox dejó 15 archivos basura en `src/`. Se borraron antes del `git add`. Revisar siempre con `find src -name '.fuse_hidden*'` antes de commitear.
2. **`.git/index.lock` huérfano** — un `git status` desde el sandbox dejó el lock (no puede hacer unlink por permisos). Se borró tras confirmar que no había proceso git vivo.

### Nota sobre el nombre del workflow

`gh run list` muestra los runs como **"Deploy to GitHub Pages"**, pero es un nombre cacheado por GitHub: el archivo `deploy.yml` (en HEAD y en origin) es **"Deploy to Cloudflare Pages"** y ejecuta `cloudflare/wrangler-action@v3`. Confirmado por los pasos del run y por `server: cloudflare` en los headers. Además, GitHub tiene registrado un `deploy-ghpages.yml` que **ya no existe en el repo** (huérfano) y `pages-build-deployment` activo. No estorban, pero conviene desregistrarlos algún día.
