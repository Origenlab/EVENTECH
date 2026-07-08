# 2026-07-08 — Análisis MESPIC + Plan de nueva L4 Mesas Picnic

## Contexto
Frank arranca la absorción de servicios del portafolio dentro del contenedor **EVENTECH**. Primer servicio: **renta de mesas picnic**, con sitio dedicado existente **https://mesaspicnic.com/** (MESPIC). Encargo: analizar todo lo que ofrece MESPIC, documentarlo (memory + Obsidian) y **armar el plan** para colocarlo en `/servicios/mobiliario/`. Documentar primero, construir después.

## Hecho hoy
1. **Análisis de mesaspicnic.com** (home + `/catalogo/` + `/paquetes/`): 22 modelos reales (comercializa "20"), 4 categorías, 8 tipos de evento, 3 paquetes, marca/tono/cobertura, alianza con EVENTECH. → [[MESPIC-Analisis-Servicios]]
2. **Auditoría de la estructura EVENTECH mobiliario**: 4 L4 existentes (sillas 26, mesas 13, barras 22, salas-lounge 16 fichas), sistema `hm-`, moldes L4/L5. La L4 `mesas` es banquete, no madera.
3. **Plan de integración** con las 4 decisiones de Frank. → [[Plan-Mesas-Picnic-L4]]
4. **Memoria** actualizada: `eventech-mespic-analisis`, `eventech-mesas-picnic-plan` + índice.

## Decisiones de Frank (2026-07-08)
- **Arquitectura:** nueva L4 dedicada `/servicios/mobiliario/mesas-picnic/`.
- **Alcance:** los 22 modelos completos como fichas.
- **Marca/SEO:** white-label voz EVENTECH (dorado, no verde) + cross-link a mesaspicnic.com.
- **Precios:** rangos "desde $" por modelo (bandas por validar).

## Resultado
Estructura definida: 1 L4 + 4 grupos L5 (picnic 8 · especiales 6 · sets 6 · infantil 2) + 22 fichas L6 = **27 páginas nuevas**.

## Pendiente antes de construir (Fase 1)
- [ ] Confirmar slug `mesas-picnic` vs `madera`.
- [ ] Rate card real de precios (4 bandas).
- [ ] Imágenes propias (no hotlinkear ExactDN de MESPIC).
- [ ] Añadir 5.º subService al hub mobiliario L3.

## Enlaces
[[MESPIC-Analisis-Servicios]] · [[Plan-Mesas-Picnic-L4]] · [[Template-L4-hub]] · [[Template-L5-producto]] · [[Convencion-de-titulos]]
