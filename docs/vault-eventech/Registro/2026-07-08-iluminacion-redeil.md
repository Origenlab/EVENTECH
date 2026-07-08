# Registro — Integración de REDEIL como proveedor de iluminación

> Homologación de **REDEIL (rentadeiluminacion.com)** como proveedor aliado especialista en **toda** la sección `/servicios/iluminacion/`, al mismo estilo white-label que MESPIC en mesas-picnic.
>
> Fecha: **2026-07-08** · Commit: **e30c8647** · Estado: **desplegado a producción**

---

## Qué se hizo

1. **Componente proveedor unificado** — `src/components/ProveedorIluminacion.astro`
   - Bloque premium con REDEIL como aliado especialista único (logo, tagline `rentadeiluminacion.com`, copy con catálogo completo, cifras +3,000 eventos / +30 años, capacidades, CTA "Visitar rentadeiluminacion.com", panel de integración).
   - Reemplaza las grillas `partner-card` anteriores que tenían **2 `<a>` rotos** (tarjetas "REDEIL Sonido" y "LUMINAPRO" sin etiqueta de apertura).
   - Prop opcional `focus` para adaptar el copy a cada categoría.
   - Estilos scoped con fallback a dorado `#c2a24a` (funciona en hubs y en L5).

2. **7 categorías L5 nuevas** (paridad con el catálogo real de REDEIL), molde `escenario/moving-heads/index.astro`:

   | Categoría | Hub L4 | URL | Rango JSON-LD |
   |---|---|---|---|
   | Sky Trackers | escenario | `/escenario/sky-tracker/` | $3,500–35,000 |
   | Gobos y Monogramas | escenario | `/escenario/gobos/` | $1,500–15,000 |
   | Neón y Luces Vintage | decorativa | `/decorativa/neon-vintage/` | $1,500–20,000 |
   | Cascadas y Cortinas LED | decorativa | `/decorativa/cascadas-led/` | $2,000–25,000 |
   | Luz Negra y UV | efectos-especiales | `/efectos-especiales/luz-negra/` | $1,200–18,000 |
   | City Color | arquitectonica | `/arquitectonica/city-color/` | $2,500–40,000 |
   | City Light | arquitectonica | `/arquitectonica/city-light/` | $2,000–30,000 |

   Cada una: hero con `<span class="highlight">`, tabla de specs, 4 `ServiceShowcase` por tiers (espejo de los paquetes REDEIL), 6 FAQs, 3 reviews, formulario WhatsApp, `<ProveedorIluminacion>`, JSON-LD (serviceWithReview + breadcrumb + faq), dorado institucional.

3. **Hubs homologados**
   - **L3** (`iluminacion/index.astro`): subcategorías nuevas en los 4 grupos, chips en los 4 módulos, cross-link inline a REDEIL en el copy del hero (estilo MESPIC), bloque proveedor.
   - **4 L4** (arquitectónica, decorativa, efectos-especiales, escenario): entradas nuevas en `SUB_SERVICES`, módulos `hm-feat` nuevos, nav actualizado, bloque proveedor. Conteos de catálogo corregidos (4→6 / 4→5).

4. **20 L5 existentes** homologadas al bloque proveedor unificado (fix de los `<a>` rotos).

5. **`site.ts`** — REDEIL (review-4): `website: https://rentadeiluminacion.com/` + copy actualizado al catálogo completo (guirnaldas, sky trackers, cabezas móviles, gobos, cascadas LED, city color/light).

---

## Verificación

- `npm run build` OK — **669 páginas**, sin errores.
- Todos los enlaces internos de iluminación resuelven.
- 0 `partner-card` restantes; 32 páginas con `<ProveedorIluminacion>`.

## Pendientes / notas

- **Imágenes dedicadas**: sky-tracker, cascadas-led (y en menor medida luz-negra, city-color/light) usan fotos genéricas de iluminación con alt honesto. Sustituir por fotos reales de esas categorías cuando existan.
- **Caché CDN**: eventech.mx cachea HTML por-URL — verificar con `?cb=` y purgar Cloudflare si los usuarios ven contenido viejo (ver gotcha de caché).
- Aliados secundarios previos (RESOIL, LUMINAPRO) se retiraron del bloque para dejar a REDEIL como proveedor único destacado (modelo mesaspicnic).
