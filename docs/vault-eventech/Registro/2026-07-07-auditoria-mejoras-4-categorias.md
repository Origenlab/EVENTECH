# Auditoría profesional + Plan de mejoras — 4 categorías homologadas

**Fecha:** 2026-07-07
**Alcance:** audiovisual, carpas, iluminación, pistas-baile — 88 páginas (16 hubs L4 + 64 L5 + 4 L3 + 4 hojas).
**Objetivo:** reparar defectos detectados y priorizar mejoras de alto impacto. Ver [[Cambios]], [[Template-L4-hub]], [[Template-L5-producto]].

---

## 1. Resumen ejecutivo

Las 4 categorías están **homologadas y técnicamente sólidas**. La auditoría no encontró errores rotos ni deuda de homologación: la base de SEO técnico, accesibilidad y datos estructurados es de nivel profesional y consistente en las 88 páginas.

El diagnóstico honesto es que **la mayor palanca de mejora no es técnica, es de contenido visual**: audiovisual, carpas y pistas-baile reutilizan un pool minúsculo de imágenes genéricas (10–14 fotos únicas repartidas entre 21 páginas cada una), mientras que iluminación ya trabaja con 123 fotos reales por tipo. Cerrar esa brecha es lo que más eleva la percepción de profesionalismo y la conversión.

**Veredicto:** no hay que "reparar" mucho (ya se hizo en esta sesión); hay que **subir de nivel el contenido visual y afinar 3–4 detalles de rich results y conversión**.

---

## 2. Reparado en esta sesión

| # | Defecto | Acción | Estado |
|---|---------|--------|--------|
| R1 | 6 `meta description` > 160 caracteres (se truncan en Google) | Recortadas a ≤160 sin perder keyword ni CTA | ✅ |
| R2 | CSS duplicado en 16 hubs: bloque `<style>` scoped con `.hm-cat__specs` y `.hm-menu__item--cta` repetido idéntico 16 veces | Centralizado en `src/styles/home-2026.css`; eliminados los 16 bloques scoped (DRY) | ✅ |

**R1 — descripciones recortadas (todas ≤160):**

- `carpas/estructurales` → 139
- `carpas/pisos-complementos/clima-artificial` → 148
- `carpas/pisos-complementos` → 142
- `iluminacion/arquitectonica` → 155
- `iluminacion/escenario/moving-heads` → 146
- `pistas-baile/madera-clasica` → 150

**R2 — verificación:** `.hm-cat__specs` / `.hm-menu__item--cta` restantes en hubs = 0; reglas ahora viven una sola vez en `home-2026.css`. `npx astro check` = 0 errores nuevos (el único error, `directorio/[...slug].astro` ts7006, y los warnings `FEATURES`/`idx`/`is:inline` son preexistentes y ajenos).

---

## 3. Evidencia de la auditoría (medido, no estimado)

### Lo que YA está bien (no tocar)

| Señal | Resultado | Lectura |
|-------|-----------|---------|
| Enlaces rotos | 0 | Los 3 links a `/directorio/cdmx/*` son válidos (ruta dinámica) |
| Títulos / descripciones duplicadas | 0 | Convención [[Convencion-de-titulos]] aplicada al 100% |
| `alt` en imágenes | 1103/1103 con alt descriptivo, 0 vacíos | Accesibilidad + SEO de imagen correctos |
| Formato de imagen | 1171 refs `.avif`, 0 `.jpg/.png` | Formato moderno al 100% |
| `loading="lazy"` | 1103/1103 | Carga diferida completa |
| Breadcrumbs | 88/88 páginas | Navegación + BreadcrumbList schema |
| JSON-LD | Service + Review + Breadcrumb + FAQ en todas | Grafo de datos completo ([[Schemas-JSON-LD]]) |
| `related` / enlaces a hermanas | 64 L5 | Enlazado interno intra-categoría presente |
| Infra SEO | canonical, og:image, sitemap, robots.txt | Todo presente |

### Dónde está la brecha real

| Categoría | Refs de imagen | **Imágenes únicas** | Fotos reales en carpeta | Diagnóstico |
|-----------|---------------|---------------------|------------------------|-------------|
| **iluminación** | 340 | **123** | 25+ por tipo | ✅ Estándar a seguir |
| **audiovisual** | 277 | **14** | 20 | ⚠️ Reuso alto |
| **carpas** | 277 | **10** | 14 | ⚠️ Reuso alto |
| **pistas-baile** | 277 | **11** | 16 | ⚠️ Reuso alto |

> Traducción: en audiovisual, 21 páginas comparten 14 fotos. Un cliente que navega pantallas-led → sonido → proyectores ve **las mismas imágenes** repetidas. Iluminación no tiene ese problema. Esta es la mejora #1.

---

## 4. Plan de mejoras priorizado

### 🔴 P1 — Alto impacto (hacer primero)

**P1.1 · Fotografía real por tipo (audiovisual, carpas, pistas-baile)**
El diferenciador. Iluminación ya es la prueba de que el molde luce excelente con foto real. Falta llevar las otras 3 al mismo nivel.

Shot-list mínima (objetivo: 4–6 fotos reales por hub, 1 hero por L5):

- **Audiovisual** — pantalla LED en evento nocturno; line array volado; proyección mapping; cabina DJ con controladora; micrófonos de solapa/diadema; screen de contenido en vivo. *(objetivo: de 14 → ~40 únicas)*
- **Carpas** — carpa estructural montada de día y de noche; interior con forro y clima; unión de módulos; carpa transparente en boda; piso de duela nivelado. *(de 10 → ~35)*
- **Pistas-baile** — pista de madera con invitados; pista LED encendida; tarima/escenario montado; pista vintage temática; detalle de nivelación en terreno irregular. *(de 11 → ~35)*

Origen posible: banco de fotos de eventos ya realizados, sesión de producto en bodega, o foto de stock licenciada mapeada por tipo (último recurso). Guardar en `public/images/<categoria>/` con nombres descriptivos-keyword (ej. `line-array-concierto-cdmx.avif`) y convertir a `.avif`.

**P1.2 · Schema `Offer` / `priceRange` para rich results**
Hoy el `Service` schema no lleva precio. Añadir `priceRange` u `Offer` (aunque sea "$$" o "desde") habilita que Google muestre **precio + estrellas** en el resultado — mayor CTR sin subir de ranking. Ya hay reseñas (`serviceWithReviewJsonLd`); sumar oferta cierra el rich snippet. Implementar en `src/lib/seo.ts` para propagar a las 88 sin tocar página por página (mismo patrón que se usó con Product).

**P1.3 · LCP: primera imagen del catálogo en `eager`**
Las 1103 imágenes son `loading="lazy"`, incluida la primera tarjeta visible del catálogo (candidata a LCP). La hero es texto (rápida), pero la primera fila de tarjetas debe cargar `loading="eager"` + `fetchpriority="high"` para mejorar Largest Contentful Paint. Cambio de bajo esfuerzo, ganancia directa en Core Web Vitals.

### 🟡 P2 — Impacto medio

**P2.1 · Enlazado cruzado entre categorías (cross-sell temático)**
Hoy el `related` enlaza dentro de la misma categoría. Añadir bloque "Complementa tu evento" que cruce categorías por caso de uso: audiovisual ↔ iluminación (escenario/concierto), carpas ↔ pistas-baile ↔ iluminación (jardín/boda). Sube autoridad temática y ticket promedio.

**P2.2 · Precio "desde" consistente**
58/88 páginas ya muestran "desde $". Estandarizar en las 88 (aunque sea rango) reduce fricción y alimenta P1.2.

**P2.3 · `srcset` responsive**
Servir variantes por ancho (móvil vs desktop) reduce bytes en móvil. Astro `<Image>` puede generar `srcset` automático; hoy se usa `<img>` con una sola fuente.

### 🟢 P3 — Pulido / contenido

- **P3.1** Tabla comparativa por hub (tipo × capacidad × ideal-para × precio-desde) — bloque de contenido escaneable y muy indexable.
- **P3.2** `fetchpriority` + `width/height` explícitos en galerías L5 (el catálogo ya es CLS-safe por `aspect-ratio`; las galerías `showcase__gallery3` conviene fijarlas).
- **P3.3** WhatsApp flotante sticky + prueba social (logos de clientes / nº de eventos) cerca del CTA.
- **P3.4** Micro-copys de urgencia estacional ("agenda para temporada de bodas / fin de año").

---

## 5. Roadmap sugerido

| Fase | Entregable | Esfuerzo | Impacto |
|------|-----------|----------|---------|
| 1 | P1.2 `Offer`/priceRange en `seo.ts` + P1.3 eager LCP | Bajo | Alto (rich snippet + CWV) |
| 2 | P1.1 Fotografía real audiovisual → carpas → pistas | Medio-alto | **Máximo** (percepción + conversión) |
| 3 | P2.1 cross-linking + P2.2 precio consistente | Bajo-medio | Medio |
| 4 | P2.3 srcset + P3 pulido | Medio | Medio |

**Regla de oro:** iluminación es el patrón de referencia visual; las otras 3 categorías se miden contra ella. La homologación estructural ya está hecha — la siguiente frontera es el **contenido visual real**.

---

## 6. Verificación técnica final

- `npx astro check`: 0 errores nuevos (solo preexistentes ajenos).
- `grep e17055|6c5ce7` (ámbar/morado prohibidos): 0.
- Placeholders SVG en las 4 categorías: 0.
- CSS DRY: `.hm-cat__specs`/`.hm-menu__item--cta` centralizados; 0 duplicados en hubs.
- Descripciones > 160: 0.
