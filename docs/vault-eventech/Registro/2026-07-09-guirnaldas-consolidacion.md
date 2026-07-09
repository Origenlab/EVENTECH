# 2026-07-09 — Guirnaldas Fase 2b: consolidación semántica

> El eje "tipo de luz" del [[Estudio-Guirnaldas-Luces]] **se cancela**. Al auditarlo antes de construirlo resultó que duplicaba páginas existentes. El trabajo real era otro: deshacer una canibalización que la Fase 1 dejó abierta.

## El hallazgo

Tras crear el hub `/servicios/iluminacion/guirnaldas/` en Fase 1, **tres páginas competían por la misma keyword** y la nueva era la más débil:

| URL | Enlaces internos entrantes | Desde blog | Señal |
|---|---|---|---|
| `/iluminacion/guirnaldas/` (nueva) | **12** | **0** | H1 "Guirnaldas de luces vintage" |
| `/decorativa/fairy-lights/` | **120** | **34** | H1 "Fairy Lights **y Guirnaldas**" · 115 menciones de "guirnalda" |
| `/decorativa/neon-vintage/` | 23 | — | showcase "Ambiente Vintage **Edison**" |

A ojos de Google, `fairy-lights` **era** la página de guirnaldas. Toda la autoridad interna del sitio apuntaba ahí. La Fase 1 creó la URL correcta y la dejó sin alimentar.

## El eje "tipo de luz" era basura — retirado del plan

Lo que yo mismo propuse en el estudio duplicaba lo que ya existe:

| Página propuesta | Ya existe como |
|---|---|
| `edison-vintage` | `/decorativa/neon-vintage/` |
| `fairy-lights-micro-led` | `/decorativa/fairy-lights/` |
| `cortinas-y-cascadas` | `/decorativa/cascadas-led/` |
| `neon-flex` | `/decorativa/esferas-led/` + `neon-vintage` |

Construirlo habría **empeorado** la canibalización. La lección: auditar el inventario existente antes de ejecutar un plan propio.

## Lo que se hizo

### 1. `/decorativa/fairy-lights/` reposicionada como micro LED puro

**Sin mover la URL** (habría tirado 120 enlaces por un 301). Se reposicionó el contenido:

- Title: `Renta de Fairy Lights Micro LED para Bodas en CDMX` (antes: "Fairy Lights **y Guirnaldas**")
- H1: *"Fairy Lights — el micro LED que convierte un techo en cielo"*
- Meta description: cero menciones de guirnalda.
- Segunda card del hero → bloque de desambiguación: qué es cada producto y adónde ir.
- La sección "Paquetes de Guirnaldas Edison" → **puente explícito al hub** con CTA.
- Specs: se añadió "Unidad de cálculo: metro cuadrado de techo (no metro lineal)".
- FAQ de desambiguación reescrita con la diferencia de unidad de cálculo + enlace al hub.
- Comentario de aviso en el frontmatter para que nadie reintroduzca "guirnaldas".

### 2. `/decorativa/neon-vintage/`: el showcase Edison es ahora un puente

Se conservó la sección (buen enlace interno) pero cambió de función: de vender guirnaldas a **explicar que no se venden ahí** y enrutar al hub. La página queda enfocada en su producto real: neón LED cortado a medida.

### 3. Reescritura de anchors — caso por caso, no sed a ciegas

Regla aplicada:

- Anchor **puro de guirnalda** (`guirnaldas Edison`, `guirnaldas de luces`) → repuntado al hub.
- Anchor **mixto** (`fairy lights y guirnaldas Edison`) → **partido en dos enlaces**: `[fairy lights](fairy-lights)` y `[guirnaldas Edison](hub)`.
- Anchor con **metraje específico** (`guirnaldas de 200m`) → repuntado a `/200-metros/`.
- Anchor `guirnaldas fairy lights` → **se queda** en fairy-lights (es fraseo de micro LED).

18 posts de blog + 10 páginas `.astro` modificados.

### 4. Los dos guías de guirnaldas describían un paquete inexistente

`renta-guirnaldas-edison-eventos-cdmx.md` y `guirnaldas-edison-bodas-eventos-cdmx-guia-definitiva.mdx` documentaban el paquete de **400 m / 800 focos / 1,600W**, que en Fase 1 pasó a **500 m / 1,000 focos / 2,000W**. Actualizados, incluyendo la tabla de specs (5 circuitos, montaje 8-12 h el día previo con 4-5 técnicos, desmontaje 5-6 h) para que coincida con la ficha.

Se protegieron por token las cifras que NO debían cambiar: `400W` (consumo del paquete de 100 m), `400 focos` (paquete de 200 m), `400 personas`, `2400K` y las rutas de imagen.

## Resultado medido (sobre `dist/`)

| Métrica | Antes | Después |
|---|---|---|
| Páginas que enlazan al hub | 12 | **36** |
| Anchors con "guirnalda" → hub | 0 | **54** |
| Anchors con "guirnalda" → fairy-lights | 25 | **9** (los 9 dicen "guirnaldas fairy lights") |
| "guirnalda" en title/meta de fairy-lights | sí | **0** |

- `npm run build` → 729 páginas, 0 errores.
- 738 hrefs internos únicos, **0 rotos**.
- 0 imágenes rotas en los posts editados.

---

## ⛔ BLOQUEADOR — requiere números de Frank

**`cuanto-cuesta-rentar-guirnaldas-cdmx-precios-2026.md` contradice los precios cerrados que ahora publicamos.**

| Metraje | Dice el blog | Dice la página de servicio |
|---|---|---|
| 50 m | $800 – $1,800 | **$3,500** |
| 100 m | $1,600 – $3,200 | **$6,500** |
| 200 m | $3,200 – $5,500 | **$11,500** |
| 400/500 m | $5,500 – $8,000 | **$24,000** |

Un usuario que lea el post y luego la página siente un bait-and-switch de 2 a 3×. El post rankea para "cuánto cuesta rentar guirnaldas" — intención comercial máxima.

**Por qué no lo arreglé solo:** el artículo cotiza montajes **mixtos de fairy lights (micro LED) + Edison**, y los rangos bajos podrían ser correctos *para micro LED* (cuyo `priceRange` en `fairy-lights` es $800–$8,000). No sé cuál de los dos conjuntos de números refleja lo que la empresa cobra. Inventarlos sería publicar un precio falso.

**Necesito de Frank:** ¿los rangos del artículo son de fairy lights, de guirnaldas Edison, o están simplemente desactualizados? Con eso el artículo se parte en dos tablas o se corrige.

## ⚠ Pendiente relacionado — reseñas

`fairy-lights` y `neon-vintage` publican `reviews` con nombres y fechas que alimentan estrellas en Google (`serviceWithReviewJsonLd`). Además, una de las reseñas de `fairy-lights` (Gabriela Soto) habla de **guirnaldas Edison** — producto que ya no vive en esa página.

Sigue sin resolverse si esos testimonios son reales. Las páginas que yo construí no llevan ninguno. Ver [[2026-07-09-guirnaldas-fase2]].

## Siguiente

Fase 3: 5 páginas de tipo de evento (`guirnaldas-para-bodas`, `xv-anos`, `jardin`, `carpas`, `corporativas-y-navidenas`) — cero duplicación con lo existente — y `CalculadoraMetros.astro`.
