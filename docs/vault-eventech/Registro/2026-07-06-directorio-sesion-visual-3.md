# Reporte — Sesión visual #3: filtros en L2 (2026-07-06)

**Objetivo:** filtros por colonia, capacidad y precio en páginas de zona.
**Resultado:** completado y verificado FUNCIONALMENTE en producción (commit `368e2b3c`, deploy verde).

## Entregado

- Barra de filtros homologada al sistema dr- (card blanca, pills con navy activo, dropdown de colonia con contadores) en zonas con **6+ venues** — las zonas chicas quedan limpias sin UI innecesaria.
- **Colonia**: `<select>` dinámico con conteo por colonia. **Capacidad**: pills Todas / Hasta 150 / 150-400 / 400+. **Precio**: pills $ a $$$$.
- Contador "X de Y venues" en vivo (aria-live), estado vacío con botón "Limpiar filtros".
- Vanilla JS inline (~40 líneas), cero dependencias, filtros combinables.

## Verificación funcional en producción (Iztapalapa, 26 venues)

Test con clics reales vía extensión: filtro 400+ → 1 visible con contador "1 de 26 venues" ✓ · combinado 400+ y $$ → 0 visibles con estado vacío mostrado ✓ · reset → 26 visibles ✓.

**Cola Fase 2 restante:** badge verificado, profundizar 8 featured, fotos reales, mobile overhaul, candidatos de fichas (T&H Gourmet, Hotel Geneve, Marriott Reforma...).

## Sesión visual #4 — Badge de datos verificados ✅ (commit `b54416c8`)

Cerrada la última atestación falsa visible del directorio:

- **Badge L3**: "Verificado EVENTECH" (flag legacy en 128 fichas sin verificación) → **"Datos verificados"** condicionado a `reviewsSource` (fuente pública citable, hoy 10 fichas), con tooltip explicativo.
- **3 contadores "Verificados"** (stats de región, cards de zona, stats de zona) → sustituidos por **"Colonias"** (conteo real de colonias únicas) — métrica verdadera y útil.
- Textos de verificación masiva ("espacios verificados", "servicios verificados") → "documentados".
- Verificado EN VIVO: Tepepan muestra el badge, Four Seasons ya no muestra ninguno (0), stat "Colonias" activa en Iztapalapa.

Con esto, TODO señalamiento de verificación en el directorio corresponde a datos con fuente real. El flag `verified` legacy queda solo en frontmatter, sin efecto visual ni en structured data.
