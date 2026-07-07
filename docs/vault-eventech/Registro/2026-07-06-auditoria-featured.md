# Auditoría de venues featured — 2026-07-06/07

## Objetivo
Cotejar cada ficha featured contra fuentes oficiales (sitio propio, ficha técnica Cvent, listing bodas.com.mx, registros SIC/UNAM), corregir contactos, eliminar datos fabricados y otorgar el badge "Datos verificados" solo donde exista fuente citable.

## Resultado global
**14 de 14 featured auditados presentaron problemas.** 2 venues no existían como se describían (1 eliminado, 1 reescrito), 2 fichas describían un negocio distinto al real, 12 tenían contactos erróneos o no verificables, 7 inflaban capacidades, 8 traían ratings/reviews fabricados. **2 badges otorgados** con fuente real.

| # | Venue | Commit | Hallazgo principal | Badge |
|---|-------|--------|--------------------|-------|
| 1 | Hotel Carlota | `756532ae` | 3 canales de contacto incorrectos | — |
| 2 | Casa Lamm | `8ddab2c3` | Dominio migró a universidad; contacto depurado a prensa+FB | — |
| 3 | San Ángel Inn | `41173b2e` | Tel de banquetes e IG incorrectos | — |
| 4 | Foro Kaluz Santa Fe | `5a46551f` | **VENUE FABRICADO — eliminado** (fuente circular, WA secuencial) | n/a |
| 5 | Club de Banqueros | `cc986aea` | **Ubicación fabricada** (Polanco→Centro Histórico); reescrito con 14 espacios oficiales | — |
| 6 | Palacio de Minería | `0bd42c2e` | Aforos inflados 800/1200→450 oficial UNAM; tel erróneo | — |
| 7 | Casa de los Azulejos | `6bb29729` | Es un Sanborns; renta no publicada; 4 salones inventados | — |
| 8 | Museo Soumaya | `fec48034` | Aforos 1500/2500→350 oficial SIC; colonia y CP erróneos | — |
| 9 | Centro Banamex | `24a78c7a` | **Rebrand** (ex Citibanamex, OCESA); "Santa Fe" erróneo | — |
| 10 | Azul Histórico | `c8fb30d9` | **"Rooftop con vistas al Zócalo" fabricado**; es el restaurante del patio | — |
| 11 | Camino Real Polanco | `6a20a75a` | Capacidad 2000→1,350 oficial; menús y Kosher con fuente | ✅ 4.6/9, WA 2026 |
| 12 | W Mexico City | `f66a2764` | Great Room "800 m²"→375 m² oficial (320 máx) | — |
| 13 | St. Regis | `0e10d83e` | La más limpia; solo cóctel sin fuente y email fabricado | — |
| 14 | Four Seasons | `8f2093bf` | **Rating fabricado 4.8/428 → real 5.0/5**; capacidad 500/700→15-312 | ✅ 5.0/5, WA 2015 |

## Método consolidado
1. Leer ficha (contacto, capacidad, rating, ubicación).
2. Fuente oficial: sitio propio → Cvent (ficha técnica de hoteles: m², aforos por salón) → SIC/UNAM (recintos públicos) → listing bodas.com.mx (rating del día + condiciones).
3. Regla de detección de fabricados: buscar el nombre; si la única fuente es eventech.mx, es inventado.
4. Aplicar solo datos citables; dato sin fuente = campo vacío. Ratings solo con `reviewsSource`.
5. Build → scan de secretos → push → Action verde → verificación curl en producción → memoria.

## Fixes de plataforma derivados
- Template L3: render de `website`/`facebook`/`instagram` en bloque de contacto (`816ec9e3`).
- Redirects 301: foro-kaluz→zona, club-de-banqueros a centro-historico.
- Mapas regenerados: club-de-banqueros, four-seasons (coords corregidas).

## Pendiente
~30 featured por auditar (hilton-reforma, jw-marriott-santa-fe, presidente-intercontinental†, marriott-reforma†, hoteles y salones restantes). † = listing bodas.com.mx confirmado en esta sesión (4.7/20 y 4.9/24) → candidatos a badge inmediato. Después: fichas candidatas con listing fuerte, fotos reales, mobile overhaul.
