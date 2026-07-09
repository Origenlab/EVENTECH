# Registro — Integración de SOEVE como proveedor de sonido

> Homologación de **SOEVE (sonidoparaeventos.com.mx)** como proveedor aliado especialista en **toda** la sección `/servicios/audiovisual/sonido/`, al mismo estilo white-label que REDEIL en iluminación y MESPIC en mesas-picnic.
>
> Fecha: **2026-07-08** · Estado: **pendiente de build completo + deploy**

---

## Qué se hizo

1. **Componente proveedor unificado** — `src/components/ProveedorSonido.astro`
   - Espejo exacto de `ProveedorIluminacion.astro` (prefijo de clases `prov-son--`).
   - SOEVE como aliado especialista único: logo, tagline `sonidoparaeventos.com.mx`, capacidades, cifras (+500 eventos / 24-7 soporte / 2 sucursales CDMX), CTA "Visitar sonidoparaeventos.com.mx", panel de integración.
   - Prop opcional `focus` para adaptar el copy a cada categoría.
   - Estilos scoped con fallback a dorado `#c2a24a`.
   - **No publica los teléfonos de SOEVE** (evita fuga de leads). Solo enlaza al home, igual que REDEIL.

2. **Reemplaza 4 grillas `partner-card` ficticias** que existían en las L5 de sonido: *AudioVisual Pro MX, SonidoEventos CDMX, TechEvents, MediaRent* — empresas inventadas, sin sitio ni respaldo. Eran 32 ocurrencias por página × 4 páginas.

3. **4 categorías L5 nuevas**, molde `sonido/paquetes/index.astro` (template tiffany):

   | Categoría | URL | Rango JSON-LD | reviewCount |
   |---|---|---|---|
   | Amplificadores de Potencia | `/sonido/amplificadores/` | $1,200–12,000 | 96 |
   | Monitores de Escenario | `/sonido/monitores-escenario/` | $900–15,000 | 112 |
   | Paquetes de Sonido | `/sonido/paquetes/` | $3,500–45,000 | 187 |
   | Accesorios y Cableado | `/sonido/accesorios-audio/` | $300–6,000 | 78 |

   Cada una: hero con `<span class="highlight">`, tabla de 10 specs, 3 showcases manuales + 1 `ServiceShowcase`, galerías `showcase__gallery3`, 6 FAQs, 3 reviews, formulario WhatsApp, `<ProveedorSonido>`, JSON-LD (serviceWithReview + breadcrumb + faq), dorado institucional.

   **`paquetes/index.astro` es ahora el molde canónico de L5 de sonido.**

4. **Hub L4 `/sonido/`** — de 4 a 8 `SUB_SERVICES`. Campo `short` nuevo para las etiquetas del nav. 2 FAQs añadidas (renta por separado / paquete vs. piezas sueltas). Meta y JSON-LD actualizados (`priceRange` 300–45,000). Bloque `<ProveedorSonido />` sin `focus`.

5. **4 L5 existentes** (bocinas, line-array, subwoofers, mezcladoras): `partner-card` → `<ProveedorSonido focus="…" />`, `sidebarNav` de 4 → 8 items.

6. **Fix del nav `hm-menu` con 8 items** — ver gotcha abajo.

7. **`site.ts`** — SOEVE (review-8): `website: https://sonidoparaeventos.com.mx/` (estaba vacío).

---

## Fix colateral: 12 links rotos en el hub L3 `/servicios/audiovisual/`

`audiovisual/index.astro` apuntaba a páginas que **nunca existieron**, en **dos bloques distintos** del mismo archivo (`SUB_SERVICES[].subcategories` y `hm-feat__chips`):

| Roto | Real |
|---|---|
| `/sonido/bafles/` | `/sonido/bocinas/` |
| `/sonido/consolas/` | `/sonido/mezcladoras/` |
| `/pantallas-led/totems/` | `/pantallas-led/pedestal/` |
| `/pantallas-led/backdrops/` | `/pantallas-led/exterior/` |
| `/pantallas-led/perimetrales/` | `/pantallas-led/monitores/` |
| `/proyectores/alta-luminosidad/` | `/proyectores/fullhd-4k/` |
| `/proyectores/pantallas/` | `/proyectores/pantallas-proyeccion/` |
| `/proyectores/monitores/` | `/proyectores/mapping/` |
| `/proyectores/videoconferencia/` | `/proyectores/streaming/` |
| `/microfonos-dj/solapa/` | `/microfonos-dj/solapa-diadema/` |
| `/microfonos-dj/dj/` | `/microfonos-dj/cabina-dj/` |
| `/microfonos-dj/conferencia/` | `/microfonos-dj/equipo-dj/` |

**Lección:** al auditar links en un hub, buscar el href **en todo el archivo**, no solo en el primer array. Los hubs `hm-` repiten las subcategorías en `hm-feat__chips` más abajo.

---

## Gotcha: `style=` inline rompe el responsive de `hm-menu__grid`

Los hubs `hm-` traían `<ul class="hm-menu__grid" style="grid-template-columns: repeat(5, 1fr);">`.

Un **atributo `style` inline gana siempre** a las media queries de `home-2026.css` (`@media max-width:900px → repeat(3,1fr)`, `max-width:560px → repeat(2,1fr)`). Resultado: 5 columnas apretadas también en móvil.

En `/sonido/` se corrigió con una clase modificadora `.hm-menu__grid--sonido` en un `<style is:global>` de página, con sus propias media queries y el CTA como fila full-width (`grid-column: 1 / -1`).

> **Pendiente:** el mismo bug inline existe en los demás hubs `hm-` (iluminación, inflables, carpas, etc.). Vale la pena barrerlo.

---

## Verificación

- `astro check --minimumSeverity error` → **limpio**. El único error es preexistente y ajeno: `directorio/[...slug].astro:521` (implicit any).
- **0** links rotos bajo `/servicios/audiovisual/` (antes: 12).
- **0** `partner-card` en `/sonido/`; **9** páginas con `<ProveedorSonido>` (hub + 8 L5).
- Las 8 L5 tienen `sidebarNav` de 8 items con exactamente 1 `active: true`.
- Todas las rutas de imagen referenciadas existen en `public/`.
- Único dominio externo en las L5 de sonido: `wa.me`.
- ⚠️ **`npm run build` completo NO se pudo correr** en el sandbox (1,773 páginas exceden el límite de 45 s por comando). Correrlo en local antes del push.

## Pendientes / notas

- **Correr `npm run build` en local** y verificar las 8 páginas nuevas antes del deploy.
- **Precios por validar**: los `priceRange` de las 4 L5 nuevas son estimaciones coherentes con los existentes (bocinas 2,000–8,000; hub 800–25,000). Confirmar con la lista real.
- **Imágenes dedicadas**: no hay fotos de amplificadores, wedges, IEM, cajas DI ni stage box. Las 4 L5 nuevas usan genéricas de `/images/audiovisual/` con **alt honesto** (nunca afirman mostrar el producto). Sustituir cuando existan. Mismo criterio que en [[Cómputo]].
- **Caché CDN**: eventech.mx cachea HTML por-URL — verificar con `?cb=` y purgar Cloudflare (ver gotcha de caché).
- El sitio de SOEVE aún no tiene todo su contenido; EVENTECH ya cubre el catálogo completo de renta de sonido de forma independiente.
