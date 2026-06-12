# Reseñas / testimonios

Las reseñas del home son **testimonios de empresas aliadas** que han trabajado con EVENTECH (B2B), no de clientes finales. Cada una enlaza al sitio real del aliado.

## Datos
`REVIEWS` en `src/data/site.ts`: `company`, `author`, `role`, `rating`, `text`, `website`. El home muestra 4 (`featuredReviews` en `index.astro`), **REDEIL primero**: REDEIL · PODIUMEX · PALED · INFLAPY. Grid 4→3→2→1.

## Reglas de contenido
- Texto en voz del aliado: reconoce su propia especialidad + cómo EVENTECH complementa. Tono profesional B2B.
- **Datos verídicos del aliado** (no inventar trayectoria). Ej. REDEIL = **10+ años** (su sitio https://redeil.com/), iluminación LED + audio JBL/QSC + DJ; marcas Martin Professional, Chauvet, Elation. ⚠️ Antes decía "30 años" (incorrecto) — corregido.
- `website` debe ser el dominio real del aliado (REDEIL → `https://redeil.com/`).
- Rating 5. Enlaces externos con `target="_blank" rel="noopener noreferrer"`.

## Diseño (componente `.hm-tst`)
Card homologada al lenguaje del sitio: fondo blanco, borde hairline, radio 6px, barra dorada izquierda, comilla decorativa, estrellas doradas, cita en cuerpo legible, footer con **avatar monograma** (2 letras de la empresa, navy/dorado) + autor + rol + **link al sitio del aliado** con icono externo. Hover: borde dorado + sombra. Grid 3→2→1.

## Aliados registrados (12 / 12 ✓)
1. REDEIL (redeil.com) — iluminación + audio, 10+ años
2. PODIUMEX (podiumex.com) — podiums
3. PALED (pantalla-led.com) — pantallas LED
4. INFLAPY (inflablesparafiestas.com.mx) — inflables
5. DEGLOB (fantasyglobos.com.mx) — globos
6. MESPIC (mesaspicnic.com) — mesas picnic
7. MEDEDUL (mesas-de-dulces.com) — mesas de dulces
8. SOEVE (sonidoparaeventos.com.mx) — sonido
9. AVANTEXPO (avantexpo.com.mx) — equipos para exposiciones, 20 años
10. BRINCOLINS (brincolins.com) — inflables/brincolines, 20+ años
11. SEGUREVENTOS (seguridadeventos.com) — seguridad privada DGSSP/STPS, 15+ años
12. PALOMITA (palomita.mx) — máquinas de palomitas, operador/vintage/gourmet

Home muestra las 12 (`slice(0,12)`), REDEIL primero. Grid 4×3.
