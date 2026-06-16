# Template L5 — Página de producto

**Página de referencia (fuente de verdad): `src/pages/servicios/mobiliario/sillas/tiffany/index.astro`**
URL: `/servicios/mobiliario/sillas/tiffany/`

Toda página **L5** (producto con variantes/acabados, hija de un hub L4 como `…/sillas/`) debe replicar exactamente este layout, componentes, complementos y colores. Solo cambia el **contenido** (textos, imágenes, specs, FAQs, reseñas). Aprobado 2026-06-15.

> Jerarquía del sitio: L1 Home → L2 `/servicios/` → L3 categoría (`/servicios/mobiliario/`) → L4 hub (`/servicios/mobiliario/sillas/`) → **L5 producto (`…/sillas/tiffany/`)** → L6 variante (`…/tiffany/dorada-champagne/`).

---

## 1. Imports obligatorios (frontmatter)

```astro
import PageLayout from "@layouts/PageLayout.astro";
import ServiceShowcase from "@components/ServiceShowcase.astro";
import HeroPage from "@components/HeroPage.astro";
import CTABanner from "@components/CTABanner.astro";
import SectionHeader from "@components/SectionHeader.astro";
import ProductCard from "@components/ProductCard.astro";
import Breadcrumbs from "@components/Breadcrumbs.astro";
import { SITE } from "@data/site";
import { serviceWithReviewJsonLd, breadcrumbJsonLd, faqJsonLd } from "@utils/seo";
import '@styles/l3-shared.css';
import '@styles/l4-shared.css';
```

CSS compartido: **`l3-shared.css` + `l4-shared.css`** (globales). NO duplicar sus reglas en `<style>` scoped de la página.

---

## 2. Anatomía — orden de secciones (FIJO)

| # | Sección | Ancho | Componente / markup |
|---|---------|-------|---------------------|
| 0 | Breadcrumbs | barra full | `<Breadcrumbs items={breadcrumbItems} slot="breadcrumbs" />` |
| 1 | Hero | full | `<HeroPage>` (badge, title con `.highlight`, subtitle, 2 CTAs, 2 `cards`) |
| 2 | CTA banner | full | `<CTABanner>` (primary `#reserva-heading`, secondary `tel:`) |
| 3 | **Acabados — "elige el tuyo"** | container | `<SectionHeader>` + `<div class="grid grid--4">` con 4 `<ProductCard>` → L6 |
| 4 | Mobile nav | container | `<section class="l4-mobile-nav">` (sidebar cards, solo ≤1024px) |
| 5 | Contenido + sidebar | container | `<div class="l4-content-section"> > .l4-layout > .l4-main + aside.l4-sidebar--desktop` |
| 5a | · Specs | — | `<div class="specs-table">` (mapea `specs[]`) |
| 5b | · 4 Showcases | — | 4× `<ServiceShowcase>` (uno por variante) con galería `showcase__gallery3` |
| 5c | · FAQ | — | `faq-heading` + `.faq-layout` (`.faq-list` con `<details>` + `.faq-sidebar`) |
| 5d | · Sidebar desktop | — | `sidebar-card` ×3: nav sillas, servicios relacionados, CTA |
| 6 | Formulario reserva | full, `section--alt` | `reserva-heading` + `.reserva-layout` (form + `.reserva-sidebar`) + `<script>` WhatsApp |
| 7 | Proveedores | container | `proveedores-heading` + `grid grid--4` de 4 `partner-card` |
| 8 | CTA final | full | `<CTABanner … variant="accent" />` |
| 9 | Override de color | — | `<style is:global>` con `:root` dorado institucional (ver §5) |

**Regla:** los 4 `<ServiceShowcase>` van con `class="section"` (fondo blanco). **NUNCA** `section--alt` en los showcases (se ve apretado). El gris `section--alt` solo se usa en la sección de **reserva** (#6).

---

## 3. Complementos (idénticos en toda L5)

- **Sidebar (nav sillas):** `sidebarNav[]` con las 5 sillas; la actual con `active:true` y `href:null`. Incluye links "↑ Volver a Sillas" y "↑ Volver a Mobiliario".
- **Servicios relacionados:** `sidebarRelated[]` (5 links contextuales).
- **CTA card** (WhatsApp + teléfono + link al formulario) en sidebar desktop y en mobile-nav.
- **FAQ sidebar:** 3 cards (WhatsApp accent, Llámanos, Cotización express).
- **Reserva:** form con campos `nombre*`, `telefono*`, `tipoEvento`, `fecha`, `tipo<Producto>` (select de acabados), `mensaje*` + `<script>` que arma el texto y abre `wa.me`. `reserva-sidebar` con 4 `reserva-card`.
- **Proveedores:** 4 `partner-card` (Mobiliario Premium MX, Rent All CDMX, EventMob, MesasyMás).
- **Teléfono/WhatsApp** siempre desde `SITE.contact.*` (nunca hardcodear).

---

## 4. Galería de showcase (`showcase__gallery3`) — 1 arriba + 2 abajo

Markup dentro del slot `media` de cada `<ServiceShowcase>`:

```astro
<Fragment slot="media">
  <div class="showcase__gallery3">
    <div class="showcase__gallery3-main"><img src="…" alt="…" loading="lazy" decoding="async" /></div>
    <div class="showcase__gallery3-thumb"><img src="…" alt="…" loading="lazy" decoding="async" /></div>
    <div class="showcase__gallery3-thumb"><img src="…" alt="…" loading="lazy" decoding="async" /></div>
  </div>
</Fragment>
```

CSS **global en `src/styles/l3-shared.css`** (NO scoped, NO inline por página): main full-width arriba (16:9) + 2 thumbs abajo (4:3). Una sola imagen principal y dos miniaturas. Ver también [[Galeria-hm-feat-g3]] (patrón equivalente en L3).

---

## 5. Colores — DORADO INSTITUCIONAL (obligatorio)

Bloque al final del archivo, fuera de `<PageLayout>`:

```astro
<style is:global>
  :root {
    --color-accent: #c2a24a;
    --color-accent-hover: #a9883a;
    --color-accent-light: #d4b96a;
    --color-accent-soft: rgba(194, 162, 74, 0.1);
    --gradient-accent: linear-gradient(135deg, #c2a24a 0%, #a9883a 100%);
    --shadow-accent: 0 4px 14px rgba(194, 162, 74, 0.35);
    --shadow-accent-hover: 0 6px 20px rgba(194, 162, 74, 0.45);
  }
</style>
```

- **Dorado de marca `#c2a24a`** (token `--color-gold`) + `#a9883a` (`--color-gold-deep`). Es el color institucional del header, logo, hub L4 e index.
- **PROHIBIDO** acentos por categoría (ámbar `#e17055`, etc.) en sillas. El ámbar fue retirado de las 5 páginas el 2026-06-15.
- **Miga de pan:** siempre dorado institucional `#c2a24a` fijo (en `Breadcrumbs.astro`), NUNCA cambia por página. Ver [[Cambios]].

---

## 6. Datos que SÍ cambian por página

Solo se edita el contenido; la estructura no se toca:

- `breadcrumbItems[]` — ruta hasta la página actual (último sin `href`).
- `faqs[]` — 8 preguntas con respuesta (`set:html`). Alimentan `faqJsonLd`.
- `specs[]` — ~10 filas (Material, Resistencia, Acabados, Peso, Cojín, etc.).
- `sidebarNav[]` / `sidebarRelated[]` — la actual `active`, related contextual.
- `reviews[]` — 3 testimonios reales (autor, texto, rating 5, fecha). Alimentan `serviceWithReviewJsonLd`.
- `jsonLd[]` — `serviceWithReviewJsonLd` + `breadcrumbJsonLd` + `faqJsonLd`.
- **Acabados (§3):** 4 `<ProductCard>` con `name`, `price`, `excerpt`, `href` (→ L6 real), `image` (verificada en `/public/images/`), `tags[]`, `badge` solo en la más popular.

---

## 7. SEO / títulos

- `<title>` y `meta description` **sin la marca**. Patrón: `[keyword] | Equipo para eventos en México`. Ver [[Convencion-de-titulos]] y [[Meta-descripciones]].
- `title` del Hero usa `<span class="highlight">…</span>` en el nombre del producto.

---

## 8. Checklist de homologación de una L5

- [ ] Imports completos (§1) incluyendo `Breadcrumbs` y `ProductCard`.
- [ ] `<Breadcrumbs items={breadcrumbItems} slot="breadcrumbs" />` (NO markup crudo `sv-breadcrumb`).
- [ ] Orden de secciones de la tabla §2, completo.
- [ ] Sección **Acabados** con `grid grid--4` de 4 ProductCards → L6 (imágenes verificadas en disco).
- [ ] 4 ServiceShowcase con `class="section"` (sin `section--alt`) y galería `showcase__gallery3` (1+2).
- [ ] FAQ (8), specs, sidebar (nav+related+CTA), reserva (form+script+sidebar), proveedores (4), CTA `variant="accent"`.
- [ ] `<style is:global>` con el **dorado institucional** (§5). Sin ámbar ni acentos por categoría.
- [ ] `title`/`description` sin marca; JSON-LD (service+breadcrumb+faq).
- [ ] Verificar en `localhost:4321` (si un color no aparece, `touch` al `.astro` — staleness del watcher de Vite).

---

## Estado de las L5 de sillas (2026-06-15)

`tiffany` (template), `chiavari`, `ghost`, `plegables`, `crossback` — **homologadas**: Acabados grid, galería 1+2, sin fondo gris, miga por componente, dorado institucional.

Ver registro completo en [[Cambios]].
