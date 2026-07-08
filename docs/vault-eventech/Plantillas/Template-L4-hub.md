# Template L4 — Hub de subcategoría (sistema `hm-`)

**Fuente de verdad: `src/pages/servicios/mobiliario/sillas/index.astro`**
URL: `/servicios/mobiliario/sillas/` · Aprobado 2026-06-15 · Doc actualizada 2026-07-07

Todo **hub L4** (subcategoría que agrupa productos L5 — `…/sillas/`, `…/mesas/`, `…/salas-lounge/`, `…/barras/`) usa el **sistema `hm-`** de la página de sillas. Solo cambia el **contenido** (textos, imágenes, subcategorías); markup, clases y orden de secciones son idénticos.

> Decisión: el molde L4 **NO** es el sistema de componentes viejo (HeroPage/CategoryCard/ServiceShowcase) ni usa `l3-shared`/`l4-shared`. Es el sistema `hm-` de `home-2026.css`. Los hubs `mesas`, `salas-lounge` y `barras` ya fueron reconstruidos a este molde.

---

## 1. Imports (frontmatter) — aliases REALES

```astro
import PageLayout from "@layouts/PageLayout.astro";
import { SITE } from "@config/site";            // NO @data/site
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@lib/seo";  // NO @utils/seo
import "@styles/home-2026.css";                 // único CSS del hub
import Breadcrumbs from "@components/Breadcrumbs.astro";
```

Aliases del proyecto (`tsconfig.json` + `astro.config.mjs`): `@components` `@layouts` `@config` `@data` `@lib` `@styles` `@/*`. El hub `mobiliario/index.astro` importa además `FEATURES` desde `@config/site`.

Solo `home-2026.css`. **NO** se importa `l3-shared` ni `l4-shared` (existen pero son del sistema viejo). El sistema `hm-` usa el **dorado institucional por defecto** — NO se pone bloque `:root` con override de `--color-accent` (ese era el bug morado/teal de los hubs viejos).

---

## 2. Datos del frontmatter

- `SUB_SERVICES[]` — subcategorías L5 (4–5). Cada una: `id`, `name`, `badge`, `excerpt`, `href` (→ L5), `image` (verificada en disco), `subcategories[]` (2–4 enlaces → L6).
- `whyFeatures[]` — 6 diferenciadores (`icon`, `title`, `body`): inventario propio, extra incluido, entrega+colocación, revisión pieza por pieza, reposición en sitio, asesoría.
- `steps[]` — 4 pasos (`n`, `t`, `p`): cotización/aparto, coordinación, entrega/montaje/verificación, recolección.
- `faqs[]` — 7 preguntas (`question`, `answer`); alimentan `faqJsonLd`.
- `jsonLd[]` — `serviceJsonLd({name, description, url, priceRange})` + `breadcrumbJsonLd([...])` + `faqJsonLd(faqs)`.
- `breadcrumbItems[]` — `{label, href}` (el último sin `href`).

---

## 3. Anatomía — orden de secciones (FIJO)

`<Breadcrumbs slot="breadcrumbs" />` va **fuera** de `.hm` (es slot de PageLayout). Todo lo demás dentro de `<div class="hm">`:

| # | Sección | Markup |
|---|---------|--------|
| — | Breadcrumbs | `<Breadcrumbs items={breadcrumbItems} slot="breadcrumbs" />` (slot, fuera de `.hm`) |
| 1 | Hero | `section.hm-hero > .hm__wrap.hm-hero__wrap > .hm-hero__grid` → `.hm-hero__main` (eyebrow, `h1` con `<em>`, `.hm-hero__lead`, `.sv-hero__ctas` con `hm__btn--gold` + `hm__btn--ghost`) + `.hm-hero__seo` (2 párrafos SEO con enlaces internos) |
| 2 | Nav subcategorías | `nav.hm-menu > ul.hm-menu__grid` (`style="grid-template-columns: repeat(N,1fr)"`) → items `hm-menu__item` + último `hm-menu__item--cta` (WhatsApp) |
| 3 | Catálogo | `section#catalogo.hm__section` → `.hm__head.hm__head--split` (`.hm__head-title` + `.hm__head-copy`) + `.hm-cat-grid` de `article.hm-cat` (`.hm-cat__media` con img+badge+name, `.hm-cat__body` con sub, `.hm-cat__menu` → L6, `.hm-cat__cta`) |
| 4 | Módulos detalle | `section.hm__section--ivory` → `.hm__head--split` + N× `article.hm-feat` (`.hm-feat__text`: eyebrow, `.hm-feat__title` h3, `.hm-feat__lead`, 2 p, `.hm-feat__chips` → L6, `.hm-feat__cta` · `.hm-feat__media.hm-feat__media--g3`: 1 main + 2 thumbs) |
| 5 | Por qué | `section.hm__section--navy` → `.hm__head` + `ul.hm-why` (6 `hm-why__item` con `.hm-why__ic` SVG check) |
| 6 | Cómo funciona | `section.hm__section--ivory` → `.hm__head--split` + `ol.hm-steps` (4 `li.hm-step` con `.hm-step__num`) |
| 7 | FAQ + formulario | `section.hm__section--ivory` → `.hm__head--split` + `.hm-faqx` (`.hm-faq` con `<details.hm-faq__item>` + `aside.hm-faqx__aside` con `form.hm-form`) |
| — | Script | listener `submit` del form: arma texto y abre `wa.me` |
| — | `<style>` | solo `.hm-menu__item--cta` (fondo `--color-gold`) |

---

## 4. Galería del módulo detalle (`hm-feat__media--g3`)

```astro
<div class="hm-feat__media hm-feat__media--g3">
  <img class="hm-feat__g3-main" src="…" alt="…" loading="lazy" decoding="async" />
  <div class="hm-feat__g3-thumbs">
    <img src="…" alt="…" loading="lazy" decoding="async" />
    <img src="…" alt="…" loading="lazy" decoding="async" />
  </div>
</div>
```

1 imagen principal arriba + 2 thumbs abajo. CSS global en `home-2026.css` (no scoped). Ver [[Galeria-hm-feat-g3]].

---

## 5. Sistema de diseño `hm-` (tokens y contenedores)

Tokens locales definidos en el scope `.hm` (dentro de `home-2026.css`), derivados de `tokens.css`:

```css
.hm {
  --hm-wrap: 1200px;
  --hm-gold: var(--color-gold);        /* #c2a24a */
  --hm-gold-deep: var(--color-gold-deep); /* #a9883a */
  --hm-navy: var(--color-primary);
  --hm-navy-soft: #1f1f3d;
  --hm-ink: #23232f;
  --hm-muted: #6b6b78;
}
```

**Contenedor:** `.hm__wrap` (ancho vía `--container-padding`). **Sección:** `.hm__section` con `padding-block: clamp(56px, 8vw, 96px)`.

**Fondos de sección (alternancia):**
- `.hm__section` → fondo página (claro) por defecto.
- `.hm__section--ivory` → `var(--color-ivory-alt)` = `#f3efe7`.
- `.hm__section--navy` → `var(--hm-navy)`, texto blanco.

**Botones:** `.hm__btn` + variante `--gold` (relleno dorado) · `--ghost` (borde) · `--navy`.

**Encabezado:** `.hm__head` (centrado) o `.hm__head--split` (`.hm__head-title` izquierda + `.hm__head-copy` derecha). Eyebrow = `.hm__eyebrow`.

Tokens de color base viven en `src/styles/tokens.css`: `--color-gold #c2a24a`, `--color-gold-deep #a9883a`, `--color-ivory #faf8f4`, `--color-ivory-alt #f3efe7`, `--color-accent #0a8266` (NO usar en hubs).

---

## 6. Colores

Dorado institucional por defecto del sistema `hm-` (`--color-gold #c2a24a`). **NUNCA** override de `--color-accent` a morado/teal/ámbar. Migas de pan: dorado fijo (componente `Breadcrumbs`).

---

## 7. SEO / títulos

- `title` con `rawTitle={true}`, patrón `[keyword] | Equipo para eventos en México`, sin marca. Ver [[Convencion-de-titulos]].
- `image` y `description` propios en `<PageLayout>`.
- `jsonLd`: service + breadcrumb + faq. Ver [[Schemas-JSON-LD]].

---

## 8. Checklist de homologación de un hub L4

- [ ] Imports: solo `home-2026.css` + PageLayout + `SITE` (`@config/site`) + seo (`@lib/seo`) + Breadcrumbs. SIN `l3-shared`/`l4-shared`.
- [ ] SIN bloque `:root` de `--color-accent` (dorado por defecto). SIN morado/teal/ámbar.
- [ ] `<Breadcrumbs items={breadcrumbItems} slot="breadcrumbs" />` fuera de `.hm`.
- [ ] Orden de secciones §3 completo (hero, nav, catálogo, detalle, why, steps, faq+form).
- [ ] `SUB_SERVICES` con `image` y `href` L5/L6 **verificados en disco** (`ls public/images/...`, dirs existentes).
- [ ] `hm-feat` con galería `--g3` (1+2) y `hm-feat__chips` → L6.
- [ ] Formulario con `id` propio + `data-wa` + script que abre WhatsApp.
- [ ] `title` sin marca + `rawTitle`; JSON-LD (service+breadcrumb+faq).
- [ ] Alternancia de fondos correcta (catálogo default → ivory → navy → ivory → ivory).
- [ ] Verificar en `localhost:4321`; si un cambio de color no aparece, `touch` al `.astro` (staleness del watcher de Vite).

---

## 8b. Variante: hub con L5 hoja (sin L6)

Algunos hubs tienen L5 que **no** tienen páginas hijas L6 (ej. `audiovisual/pantallas-led/`: pedestal, videowall, exterior, monitores son hojas). En ese caso los chips/menú → L6 del molde no aplican. Convención (aprobada 2026-07-07):

- **NO** usar `hm-cat__menu` ni `hm-feat__chips` con enlaces (generarían links duplicados/rotos).
- Mostrar los specs/variantes como **pills NO enlazadas** con la clase nativa `hm-feat__stats` (renderiza `<li>` en dorado uppercase, sin `<a>`). Sirve igual en tarjeta de catálogo (`hm-feat__stats hm-cat__specs`) y en módulo detalle.
- Un solo CTA `hm-cat__cta` / `hm-feat__cta` → la L5.
- CSS scoped extra permitido y mínimo: `.hm-cat__specs { padding-top:14px; margin-bottom:16px }`.

Referencia viva: `src/pages/servicios/audiovisual/pantallas-led/index.astro`. Registro: [[2026-07-07-pantallas-led-hm]].

---

## 9. Estado de los hubs L4 de mobiliario (2026-07-07)

| Hub | Archivo | Líneas | Estado |
|-----|---------|--------|--------|
| `sillas` | `mobiliario/sillas/index.astro` | 767 | **Template — fuente de verdad** |
| `mesas` | `mobiliario/mesas/index.astro` | 661 | Homologado |
| `salas-lounge` | `mobiliario/salas-lounge/index.astro` | 660 | Homologado |
| `barras` | `mobiliario/barras/index.astro` | 662 | Homologado |
| `mobiliario` (L3 padre) | `mobiliario/index.astro` | 935 | Usa `hm-` + `FEATURES` |

Los 4 hubs comparten imports idénticos y `<div class="hm">`. Relación con L5: cada hub L4 enlaza a sus productos L5, que siguen [[Template-L5-producto]]. Registro completo en [[Cambios]].
