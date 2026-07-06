# Sesión: contactos verificados en featured + render de canales — 2026-07-06

## Objetivo
Profundizar fichas featured con el patrón Morales: cotejar contacto contra fuente oficial, buscar listing citable para el badge.

## Resultados

### Hotel Carlota (Roma-Condesa) — commit `756532ae`
- **Los 3 canales de la ficha legacy eran incorrectos**: tel 55 5511 3300 → real **55 5511 6300**; email `eventos@hotelcarlota.mx` → real `Reservaciones@hotelcarlota.com`; IG `@hotelcarlotacdmx` → real `@hotelcarlotamx`. Fuente: hotelcarlota.mx/eventos (sitio oficial).
- Se añadió `website` oficial. Sin listing en bodas.com.mx → sin `reviewsSource`, sin badge (correcto).

### Casa Lamm (Roma-Condesa) — commit `8ddab2c3`
- **El dominio casalamm.com.mx migró a "LAMM educación"** (universidad en línea) — cero eventos en el sitio. La operación de eventos SIGUE viva (FB oficial la promueve; partnership TableStudio jul-2025).
- Contacto depurado a lo citable: tel **55 5525 3938** (prensa LatamMeetings) + FB oficial `facebook.com/CasaLamm`. El tel 3939, el email `eventos@casalamm.com.mx` y el IG `@casalamm` no eran verificables → eliminados (política: dato sin fuente = campo vacío).
- Sin listing bodas.com.mx → sin badge.

### Template L3 — commit `816ec9e3`
- **Gap encontrado**: el bloque de contacto solo renderizaba tel/WA/email; los campos `website`, `facebook`, `instagram` existían en 15+ fichas pero eran invisibles.
- Añadidos los tres canales con iconos al bloque `dr-contact` + gate actualizado.

## Verificación en vivo (curl producción, Action verde 3/3)
- Carlota: tel 6300, "Sitio oficial" e `instagram.com/hotelcarlotamx` visibles.
- Casa Lamm: tel 3938 y `facebook.com/CasaLamm` visibles.
- Tepepan: FB oficial ahora visible (beneficio retroactivo del fix).

## Lección operativa
Los contactos legacy de fichas featured tienen errores reales (2 de 2 revisadas hoy). Cotejar contra sitio oficial **uno por uno** antes de confiar en cualquier canal legacy.

## Cola
Siguientes featured con sitio oficial verificable: San Ángel Inn, Foro Kaluz, Club de Banqueros, Palacio de Minería. Luego: fotos reales, mobile overhaul, fichas candidatas con listing.
