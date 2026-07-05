# Reporte ejecutivo — Directorio Fase 1 (2026-07-05)

**Alcance:** saneamiento estructural y de integridad de datos del directorio completo.
**Commits:** 12 (`3fcf5b04` → `ac532edd`) · **Deploys:** 12/12 verdes · **Verificación:** en vivo en eventech.mx tras cada deploy

## Resultados

| Problema | Antes | Después |
|---|---|---|
| Imágenes rotas en fichas | 364 | 0 |
| Heroes faltantes | 14 | 0 |
| Venues en zona equivocada | 20 | 0 (con 22 redirects 301) |
| Zona fantasma (perisur) | 1 | 0 |
| Links internos rotos | 68 | 0 |
| Headings de marca sin homologar | 120+ variantes | 2 canónicos en 226 fichas |
| Teléfonos/WhatsApp placeholder | 48 | 0 |
| Ratings fabricados emitidos a Google | 128 fichas | 0 |
| Ratings fabricados visibles en UI | 128 fichas | 0 (gate reviewsSource) |
| Duplicados fabricados de venues reales | ≥1 | 0 (hacienda-tlalpan-eventos eliminado + 301) |
| Fichas nuevas con datos verificados | — | 8 (Condesa x2, Anzures x2, Coyoacán, Mixcoac, Balbuena, Tlalnepantla) |
| Colonias nuevas cubiertas | — | 7 |

## Decisiones registradas

- Taxonomía zona/colonia: regla premium documentada en [[Taxonomia-Directorio-Zonas]]; excepción única Camino Real
- JSON-LD de ratings: solo con `reviewsSource` (guías anti fake-reviews de Google); flag `verified` legacy declarado no confiable
- Reviews fabricadas: ocultas en UI hasta sustitución por reales (decisión de Frank)
- Metodología de fuentes: verificar CP/estado del mapa del listing antes de aplicar datos (2 falsos positivos evitados: Hacienda San Angel Coahuila, etiqueta Azcapotzalco de San Pablo de Enmedio)

## Pendientes y riesgos

- ~125 fichas legacy con datos sin fuente (reviews ocultas, teléfonos por cotejar al retrabajarlas)
- 0 fotos reales de venues — todas las imágenes son base por tipo
- Colonias ALTA sin cubrir: Coapa, Clavería, San Miguel Chapultepec, Irrigación
- Verificación manual pendiente: "Mehiko" (milpa-alta/salon-faisanes), "Barrio 18 de Marzo" (terraza-xochimilco), 22 instituciones sin WhatsApp

**Siguiente sesión:** #1 del plan — ficha técnica sticky + mapa embebido en L3 (ver [[Plan-Directorio-Fase2]]).
