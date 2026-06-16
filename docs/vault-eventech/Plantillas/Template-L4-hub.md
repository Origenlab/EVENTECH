# Template L4 — Hub de subcategoría (sistema hm-)

**Página de referencia (fuente de verdad): `src/pages/servicios/mobiliario/sillas/index.astro`**
URL: `/servicios/mobiliario/sillas/`

Todo **hub L4** (subcategoría de mobiliario que agrupa productos L5, ej. `…/sillas/`, `…/mesas/`) usa el **sistema `hm-`** del hub de sillas. Solo cambia el **contenido** (textos, imágenes, subcategorías). Aprobado 2026-06-15.

> Decisión: el molde L4 NO es el sistema de componentes (HeroPage/CategoryCard/ServiceShowcase). Es el sistema `hm-`. Los hubs `mesas`, `salas-lounge` y `barras` fueron reconstruidos a este molde.

---

## 1. Imports (frontmatter)

```astro
import PageLayout from "@layouts/PageLayout.astro";
import { SITE } from "@data/site";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@utils/seo";
import "@styles/home-2026.css";
import Breadcrumbs from "@components/Breadcrumbs.astro";
```

Solo `home-2026.css` (NO `l3-shared`/`l4-shared`). El sistema `hm-` usa el **dorado institucional `--color-gold` (#c2a24a) por defecto** — NO se pone bloque `:root` con override de `--color-accent` (eso era el bug morado/teal de los hubs viejos).

---

## 2. Datos del frontmatter

- `SUB_SERVICES[]` — las subcategorías L5 (4-5). Cada una: `id`, `name`, `badge`, `excerpt`, `href` (→ L5), `image` (verificada en disco), `subcategories[]` (2-4 enlaces → L6).
- `whyFeatures[]` — 6 diferenciadores (inventario propio, calidad/proceso, entrega+montaje, revisión, reposición, asesoría).
- `steps[]` — 4 pasos del proceso (cotización/aparto, coordinación, entrega/montaje/verificación, recolección).
- `faqs[]` — 7 preguntas (alimentan `faqJsonLd`).
- `jsonLd[]` — `serviceJsonLd` + `breadcrumbJsonLd` + `faqJsonLd`.
- `breadcrumbItems[]`.

---

## 3. Anatomía — orden de secciones (FIJO)

Todo dentro de `<div class="hm">`:

| # | Sección | Markup |
|---|---------|--------|
| 0 | Breadcrumbs | `<Breadcrumbs items={breadcrumbItems} slot="breadcrumbs" />` |
| 1 | Hero | `section.hm-hero > .hm-hero__grid` → `.hm-hero__main` (eyebrow, h1 con `<em>`, lead, `.sv-hero__ctas` con `hm__btn--gold` + `hm__btn--ghost`) + `.hm-hero__seo` (2 párrafos) |
| 2 | Nav subcategorías | `nav.hm-menu > ul.hm-menu__grid` (items + `hm-menu__item--cta`) |
| 3 | Catálogo | `section#catalogo.hm__section` → `.hm__head--split` + `.hm-cat-grid` de `article.hm-cat` (media+badge+name, excerpt, `.hm-cat__menu` → L6, `.hm-cat__cta`) |
| 4 | Módulos detalle | `section.hm__section--ivory` → `.hm__head--split` + N× `article.hm-feat` (texto: eyebrow, title, lead, 2 p, `.hm-feat__chips` → L6, `.hm-feat__cta` · media: `.hm-feat__media--g3` con 1 main + 2 thumbs) |
| 5 | Por qué | `section.hm__section--navy` → `.hm__head` + `ul.hm-why` (6 `hm-why__item` con SVG check) |
| 6 | Cómo funciona | `section.hm__section--ivory` → `.hm__head--split` + `ol.hm-steps` (4 `hm-step`) |
| 7 | FAQ + formulario | `section.hm__section--ivory` → `.hm__head--split` + `.hm-faqx` (`.hm-faq` con `<details>` + `aside.hm-faqx__aside` con `form.hm-form`) |
| — | Script | listener del form que arma texto y abre `wa.me` |
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

1 imagen principal arriba + 2 thumbs abajo. CSS global en `home-2026.css`. Ver [[Galeria-hm-feat-g3]].

---

## 5. Colores

Dorado institucional por defecto del sistema `hm-` (`--color-gold #c2a24a`). **NUNCA** override de `--color-accent` a morado/teal/ámbar. Miga: dorado fijo (componente Breadcrumbs).

---

## 6. SEO / títulos

- `title` con `rawTitle={true}`, patrón `[keyword] | Equipo para eventos en México`, sin marca. Ver [[Convencion-de-titulos]].
- `image` y `description` propios. JSON-LD: service + breadcrumb + faq.

---

## 7. Checklist de homologación de un hub L4

- [ ] Imports: solo `home-2026.css` + PageLayout + SITE + seo + Breadcrumbs. SIN l3/l4-shared.
- [ ] SIN bloque `:root` de `--color-accent` (dorado por defecto). SIN morado/teal/ámbar.
- [ ] `<Breadcrumbs items={breadcrumbItems} slot="breadcrumbs" />`.
- [ ] Orden de secciones de la tabla §3, completo (hero, nav, catálogo, detalle, why, steps, faq+form).
- [ ] `SUB_SERVICES` con imágenes y `href` L5/L6 **verificados en disco** (`ls public/images/...`, dirs existentes).
- [ ] hm-feat con galería `--g3` (1+2) y chips → L6.
- [ ] Formulario con `id` propio + script que abre WhatsApp.
- [ ] `title` sin marca + `rawTitle`; JSON-LD (service+breadcrumb+faq).
- [ ] Verificar en `localhost:4321` (si un color/cambio no aparece, `touch` al `.astro` — staleness del watcher de Vite).

---

## Estado de los hubs L4 de mobiliario (2026-06-15)

`sillas` (template), `mesas`, `salas-lounge`, `barras` — **homologados** al sistema `hm-` con dorado institucional.

Relación con L5: cada hub L4 enlaza a sus productos L5, que siguen [[Template-L5-producto]]. Registro completo en [[Cambios]].
