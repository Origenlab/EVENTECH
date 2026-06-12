# Schemas JSON-LD (datos estructurados)

Todo el JSON-LD se genera en `src/utils/seo.ts` y se inyecta vía `components/JsonLd.astro`. Ver también [[Convencion-de-titulos]].

## Grafo base (en TODAS las páginas)
Inyectado por `layouts/BaseLayout.astro`:
- **Organization** `@id #organization` — entidad editora. Logo como `ImageObject` (`@id #logo`), `legalName`, `contactPoint`, `sameAs`.
- **WebSite** `@id #website` — `publisher` → `#organization`.
- **LocalBusiness** `@id #localbusiness` — NAP completo (teléfono, dirección, geo, horarios, `areaServed`, `priceRange`, `currenciesAccepted`). `parentOrganization` → `#organization`.

> **Bug arreglado (2026-06-11):** las páginas de servicio emiten `provider: { @id: "#localbusiness" }`, pero ese nodo **no** se inyectaba globalmente (solo Organization + WebSite). La referencia quedaba colgada en ~231 páginas. Ahora LocalBusiness es global y resuelve.

## Anti-duplicado de @id
`BaseLayout` detecta si la página ya pasa un nodo con `@id #localbusiness` (home, zonas). Si es así, **no** inyecta el global, para no duplicar el `@id`. Las zonas pueden pasar un `id` propio (ej. `…/zonas/polanco/#localbusiness`) para tener un LocalBusiness con `areaServed` específico sin chocar con el global.

## Nodos por tipo de página
| Página | Función | Notas |
|---|---|---|
| Home | `faqJsonLd` (+ LocalBusiness global) | |
| Categoría servicio (L2) | `serviceJsonLd` + `breadcrumbJsonLd` + `faqJsonLd` | provider → `#localbusiness` |
| Producto (L3/L4) | `serviceWithReviewJsonLd` + breadcrumb + faq | reseñas self-serving **omitidas** del schema (política Google) |
| Blog | `articleJsonLd` | publisher → `#organization` |
| Tipo de evento | `eventTypeJsonLd` | Service con `serviceType` |
| Directorio (listado) | `itemListJsonLd` / `collectionPageJsonLd` | |
| Zona | `localBusinessJsonLd` (id propio) + breadcrumb | |
| Venue/salón | `venueJsonLd` | EventVenue con address, geo, capacity, amenities |

## Reglas de homologación
- Toda referencia entre nodos usa `@id` absoluto (`https://eventech.mx/#…`).
- `provider`/`publisher` SIEMPRE por `@id`, nunca repetir el objeto completo.
- Teléfono en formato E.164 (`phoneRaw`, `+52…`).
- La marca **SÍ** va en el schema (es la entidad real); solo se prohíbe en `<title>`/`description`.
- No emitir `aggregateRating`/`review` self-serving sobre la propia marca.
