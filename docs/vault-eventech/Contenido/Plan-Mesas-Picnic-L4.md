# Plan — Nueva L4 "Mesas Picnic y Mobiliario de Madera"

> Blueprint de ejecución para absorber el catálogo de **MESPIC** ([[MESPIC-Analisis-Servicios]]) dentro de EVENTECH como **nueva subcategoría L4 de mobiliario**. Documentar primero, construir después.
>
> Creado: **2026-07-08** · Estado: **Plan aprobado, pendiente de build**

---

## 1. Decisiones aprobadas (Frank, 2026-07-08)

| Decisión | Elección |
|---|---|
| **Arquitectura** | **Nueva L4 dedicada** — 5ª subcategoría de mobiliario (junto a sillas, mesas, barras, salas-lounge) |
| **Alcance** | **22 modelos completos** como fichas (paridad total con mesaspicnic.com) |
| **Marca / SEO** | **White-label EVENTECH** (voz propia, dorado no verde) + **cross-link** a mesaspicnic.com como sitio especializado |
| **Precios** | **Rangos "desde $" por modelo** — derivados de competencia CDMX (§8); ajustar con margen propio |

---

## 2. Nomenclatura y URL

- **Slug L4:** `mesas-picnic` → `/servicios/mobiliario/mesas-picnic/`
  - Captura la keyword de mayor intención ("renta mesas picnic cdmx") y da paraguas a toda la línea de madera. Alt evaluado: `madera` (más amplio, menos volumen de búsqueda) — se descarta como primario.
- **H1 hub:** "Renta de Mesas Picnic y Mobiliario de Madera para Eventos"
- **4 grupos L5** (espejo de las 4 categorías reales de MESPIC → homologación 1:1):

| L5 grupo | Slug | URL | Modelos |
|---|---|---|---|
| Mesas Picnic | `picnic` | `/servicios/mobiliario/mesas-picnic/picnic/` | 8 |
| Mesas Especiales | `especiales` | `/servicios/mobiliario/mesas-picnic/especiales/` | 6 |
| Sets y Complementos | `sets` | `/servicios/mobiliario/mesas-picnic/sets/` | 6 |
| Para Niños | `infantil` | `/servicios/mobiliario/mesas-picnic/infantil/` | 2 |

- **22 fichas L6:** `/servicios/mobiliario/mesas-picnic/{grupo}/{modelo}/`

---

## 3. Mapeo completo de los 22 modelos → URL

### Grupo `picnic/` (8)
| Modelo | Ficha L6 |
|---|---|
| Mesa Picnic Estándar | `…/picnic/estandar/` |
| Mesa Picnic Grande | `…/picnic/grande/` |
| Mesa Picnic XL | `…/picnic/xl/` |
| Mesa Picnic Premium | `…/picnic/premium/` |
| Mesa Picnic Rústica | `…/picnic/rustica/` |
| Mesa Picnic Hexagonal | `…/picnic/hexagonal/` |
| Mesa Picnic Plegable | `…/picnic/plegable/` |
| Mesa Farm Americana | `…/picnic/farm-americana/` |

### Grupo `especiales/` (6)
| Modelo | Ficha L6 |
|---|---|
| Mesa Redonda de Madera | `…/especiales/redonda/` |
| Mesa Biergarten | `…/especiales/biergarten/` |
| Mesa Madera Teka | `…/especiales/teka/` |
| Mesa Farm Patas de Horquilla | `…/especiales/farm-hairpin/` |
| Mesa Sweetheart para Novios | `…/especiales/sweetheart/` |
| Mesa Picnic de Parota | `…/especiales/parota/` |

### Grupo `sets/` (6)
| Modelo | Ficha L6 |
|---|---|
| Set Picnic Completo | `…/sets/picnic-completo/` |
| Set Comedor Exterior | `…/sets/comedor-exterior/` |
| Set Lounge Exterior | `…/sets/lounge-exterior/` |
| Mesa Alta Cocktail | `…/sets/alta-cocktail/` |
| Banca Picnic Individual | `…/sets/banca-individual/` |
| Barra de Madera | `…/sets/barra-madera/` |

### Grupo `infantil/` (2)
| Modelo | Ficha L6 |
|---|---|
| Mesa Picnic Infantil | `…/infantil/mesa-infantil/` |
| Set Infantil Temático | `…/infantil/set-tematico/` |

**Total: 1 L4 + 4 L5 + 22 L6 = 27 páginas nuevas.**

---

## 4. Integración con el ecosistema existente

1. **Hub mobiliario L3** (`src/content/servicios/mobiliario/index.md`): añadir 5.º item a `subServices[]` → "Mesas Picnic y Madera" con `href: /servicios/mobiliario/mesas-picnic/`, `icon: "tree"` (o similar). Añadir a `relatedServices` y actualizar el spec "Catálogo 50+ modelos".
2. **Menú L4 del hub mobiliario** (`src/pages/servicios/mobiliario/index.astro`): añadir card/enlace a la nueva L4.
3. **Breadcrumbs:** Inicio › Servicios › Mobiliario › Mesas Picnic › {grupo} › {modelo}.
4. **Cross-links internos:** desde `mesas/cocktail` → `mesas-picnic/sets/alta-cocktail`; desde `barras` → `sets/barra-madera`; desde `salas-lounge` → `sets/lounge-exterior`. Evita canibalización, refuerza tema.
5. **Sitemap:** se genera solo por Astro al crear las páginas.
6. **Cross-link recíproco ya existe:** MESPIC figura como testimonio aliado en `src/config/site.ts` (`role: "Especialistas en Mesas Picnic"`, "500+ eventos") y en el blog `eventech-renta-equipo-eventos-cdmx-guia-completa`. La nueva L4 debe enlazar a mesaspicnic.com de forma consistente. ⚠️ **Verificar** `eventech.mx/renta-de-mesas-picnic/`: aparece en Google pero **no existe en el repo** → confirmar 404 y crear **redirect 301 → nueva L4** (o landing plana que apunte al hub).

---

## 5. Especificación del hub L4 (sistema `hm-`)

Sigue **[[Template-L4-hub]]** al 100% (molde `sillas/index.astro`). Dorado institucional por defecto (NO override verde). Secciones fijas:

- **Hero** `hm-hero`: eyebrow "Mobiliario de madera", H1 con `<em>`, lead SEO 2 párrafos con enlaces internos, CTAs gold + ghost.
- **Nav subcategorías** `hm-menu`: 4 grupos + CTA WhatsApp (`grid-template-columns: repeat(5,1fr)`).
- **Catálogo** `hm-cat-grid`: 4 `article.hm-cat` (uno por grupo) con imagen, badge, sub-lista de modelos L6, CTA.
- **Módulos detalle** `hm-feat` (×4, uno por grupo) con galería **g3** (1 main + 2 thumbs) → ver [[Galeria-hm-feat-g3]].
- **Por qué** `hm-why` (navy): 6 diferenciadores adaptados de MESPIC → madera 100% natural, 3 manos de barniz, entrega+montaje+recolección incluidos, sin límite de tiempo, inspección pieza por pieza, +120 piezas / eventos 100+.
- **Cómo funciona** `hm-steps`: 4 pasos (cotización/aparto → coordinación → entrega/montaje → recolección).
- **FAQ + formulario** `hm-faqx`: 7 preguntas (reusar §6 de [[MESPIC-Analisis-Servicios]]) + form WhatsApp.
- **JSON-LD:** `serviceJsonLd` + `breadcrumbJsonLd` + `faqJsonLd`.

`SUB_SERVICES[]` (4) = los 4 grupos, cada uno con `subcategories[]` enlazando sus fichas L6.

---

## 6. Especificación de fichas (L5 grupo + L6 producto)

- **L5 grupo** (`picnic/`, `especiales/`, `sets/`, `infantil/`): hub ligero estilo `mesas/redondas/index.astro` — hero + grid de fichas del grupo + copy + FAQ + form.
- **L6 producto** (×22): sigue **[[Template-L5-producto]]** (molde `sillas/tiffany/`): hero de ficha, specs (medidas/capacidad/material de §3 análisis), galería, "incluye", complementos/cross-sell, rango de precio "desde $", FAQ, CTA WhatsApp. Cada ficha usa specs reales del análisis.

---

## 7. SEO

- **Títulos:** convención [[Convencion-de-titulos]] — **sin "EVENTECH"** en `<title>` ni meta; keyword de negocio + complemento fijo. Ej. hub: "Renta de Mesas Picnic y Mobiliario de Madera para Eventos | CDMX". Ficha: "Renta de Mesa Picnic Estándar (6 personas) | CDMX y Edomex".
- **Meta descriptions:** reglas [[Meta-descripciones]]; incluir capacidad, material, cobertura, "entrega y montaje incluidos".
- **Keywords objetivo:** "renta mesas picnic cdmx", "mesas de madera para eventos", "renta mesa farm", "banca picnic renta", "mobiliario madera bodas", long-tails por modelo.
- **Cross-link a mesaspicnic.com:** enlace contextual "sitio especializado en mesas picnic" (no canonical cruzado; ambos sitios son propios). **Contenido reescrito** con voz EVENTECH para evitar duplicado. Canonical de cada página → a sí misma en eventech.mx.
- **Schema:** Product + Offer (con priceRange una vez validado) por ficha; BreadcrumbList; FAQPage en hub y grupos.

---

## 8. Precios — bandas "desde $" (derivados de competencia · 2026-07-08)

MESPIC no publica precios → se posicionan con **rangos de mercado** de la competencia CDMX (por pieza/evento-día, **montaje incluido**, MXN). Son referencia de **posicionamiento**, no costo propio; ajustar con margen antes de publicar.

**Anclas de mercado (competencia):**

| Referencia | Rango | Fuente |
|---|---|---|
| Mesa redonda madera 1.80 m | $350–$650 | Event Planner MX |
| Mesa rectangular / imperial | $280–$2,500 | Event Planner MX |
| Mesa cocktail alta | $280–$450 | Event Planner MX |
| Paquete mesa vintage madera imperial + 10 crossback | $2,055 | AlFresco (Vintage Top) |
| Paquete mesa picnic (con montaje) | $2,000–$9,000 +IVA | REDEIL |
| Silla crossback (referencia sets) | $140–$240 | Event Planner MX |

**4 bandas de precio:**

| Banda | Modelos | desde $ |
|---|---|---|
| **A · Base** | Estándar, Plegable, Banca Individual, Mesa Infantil, Alta Cocktail | $350 |
| **B · Estándar** | Grande, Rústica, Redonda, Biergarten, Farm Americana, Set Infantil, Sweetheart | $550 |
| **C · Premium** | XL, Premium, Hexagonal, Farm Hairpin, Set Picnic Completo, Barra Madera | $850 |
| **D · VIP/Lujo** | Teka, Parota, Set Lounge Exterior, Set Comedor Exterior | $1,800 |

**Grilla sugerida por modelo (`desde $`, referencia de mercado — ajustar con margen):**

| Modelo | desde $ | | Modelo | desde $ |
|---|---|---|---|---|
| Estándar | $450 | | Redonda Madera | $550 |
| Grande | $650 | | Biergarten | $500 |
| XL | $900 | | Teka | $1,800 |
| Premium | $700 | | Parota | $2,200 |
| Rústica | $550 | | Farm Hairpin | $950 |
| Hexagonal | $850 | | Sweetheart | $650 |
| Plegable | $400 | | Set Picnic Completo | $1,200 |
| Farm Americana | $750 | | Set Comedor Exterior | $1,800 |
| Alta Cocktail | $350 | | Set Lounge Exterior | $2,500 |
| Banca Individual | $200 | | Barra de Madera | $1,200 |
| Mesa Infantil | $350 | | Set Infantil Temático | $450 |

> Nota: sets con extras (lounge, comedor, picnic completo) incluyen textiles/sillas → banca más alta. Banca individual es complemento. Definir esquema de IVA. Estos "desde $" alimentan `pricing.min` / schema `Offer.priceRange` de cada ficha.

---

## 9. Imágenes

- **Decisión Frank (2026-07-08): placeholders por ahora.** Construir el hub y las fichas con imágenes placeholder y sustituir por fotos reales/propias en una 2.ª pasada. No bloquear el build por imágenes.
- MESPIC entrega imágenes vía `ew3fy9iennp.exactdn.com` (ExactDN). **No hotlinkear.** Para la versión final: conseguir originales del sitio hermano o producir propias.
- **Convención:** `/public/images/mobiliario/mesas-picnic/{grupo}-{modelo}-...avif` (kebab, descriptivo, AVIF).
- **Necesidades mínimas:** 1 hero L4 + 4 heros de grupo + 4 imágenes de card (hub) + por ficha L6: 1 card + 3 galería g3 (1 main + 2 thumbs) → ~22×4 = 88 imágenes de ficha + 13 de estructura ≈ **~100 imágenes**. Priorizar los 8 modelos `picnic/` para lanzamiento.

---

## 10. Fases de ejecución

1. **Fase 0 — Contenido (este vault):** análisis ✓ + plan ✓. Falta: rate card real + inventario de imágenes.
2. **Fase 1 — Hub L4 + 4 grupos L5:** construir `mesas-picnic/index.astro` + 4 grupos con molde `hm-`. Integrar en hub mobiliario. Deploy.
3. **Fase 2 — Fichas core (8 `picnic/`):** los modelos más rentados primero.
4. **Fase 3 — Fichas restantes (14):** especiales, sets, infantil.
5. **Fase 4 — SEO/cross-link:** títulos homologados, schema Product+Offer, enlaces cruzados a barras/lounge/cocktail y a mesaspicnic.com, verificación LCP/rich snippets.

## 11. Checklist de arranque (Fase 1)

- [x] Confirmar slug `mesas-picnic` — **confirmado (Frank)**.
- [x] Bandas de precio — **derivadas de competencia (§8)**; falta ajustar con margen propio.
- [x] Imágenes — **placeholders por ahora (Frank)**; fotos reales en 2.ª pasada.
- [x] Añadir 5.º `subService` al hub mobiliario L3 — **hecho 2026-07-08** (card "Mesas Picnic y Madera" + nav a 6 col).
- [x] Construir hub L4 con molde `sillas/index.astro` (dorado, no verde) — **hecho 2026-07-08** (`mesas-picnic/index.astro`, 668 líneas, 4 familias, compila OK).
- [x] Construir 4 grupos L5 (picnic/especiales/sets/infantil) con molde `mesas/redondas/index.astro` — **hecho 2026-07-08** (ProductCard grid + ServiceShowcases).
- [x] Construir 22 fichas L6 con molde `mesas/redondas/150cm/index.astro` (specs reales + `desde $`) — **hecho 2026-07-08** (Gallery4x4, dorado `is:global`).
- [x] Repuntar enlaces L4→L5→L6 a URLs reales — **hecho 2026-07-08** (0 residuos, 27/27 enlaces resuelven, 0 404).
- [x] Títulos + metas sin marca ([[Convencion-de-titulos]]) — verificado (0 "EVENTECH" en títulos).
- [ ] Verificar/crear redirect `renta-de-mesas-picnic/` → nueva L4.
- [ ] `git` + verificar deploy (skill `origenlab:deploy-seguridad`).

## 12. Decisiones (estado)

1. ✅ Slug: **`mesas-picnic`** (confirmado Frank).
2. ✅ Precios: **bandas derivadas de competencia** (§8); ajustar con margen propio antes de publicar.
3. ✅ Fotos: **placeholders por ahora** (Frank); fotos reales/propias en 2.ª pasada.
4. ⏳ ¿Incluir los 8 "tipos de evento" de MESPIC como landings, o solo catálogo de producto? (De momento: **solo producto**; los tipos de evento ya los cubren otras secciones EVENTECH.)
