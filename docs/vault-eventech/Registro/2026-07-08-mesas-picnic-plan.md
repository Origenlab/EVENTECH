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

## Fase 2 (2026-07-08) — L5/L6 construidas y homologadas
- **27 páginas** totales: 1 hub L4 (`hm-`) + 4 grupos L5 + 22 fichas L6.
- L5/L6 homologadas al **sistema de componentes** de `mesas/redondas/` y `mesas/redondas/150cm/` (NO `hm-`): HeroPage, ServiceShowcase, CTABanner, SectionHeader, ProductCard (grid en L5), Gallery4x4 (en L6), `l3-shared.css`+`l4-shared.css`, y `<style is:global>` **dorado #c2a24a**.
- Construidas por 4 subagentes en paralelo (una familia c/u) con specs reales de [[MESPIC-Analisis-Servicios]] y precios `desde $` por banda.
- Enlaces del hub L4 repuntados de anclas/WhatsApp a **URLs reales**.
- **Verificación:** 26/26 L5-L6 con dorado `is:global` + `l3/l4-shared`; 0 usan `hm-`/`home-2026`; 0 "EVENTECH" en títulos; 0 `rawTitle`; 22 fichas con Gallery4x4. **27/27 enlaces internos resuelven (0 404).** Compila limpio (pasa fase Vite; build completo hace timeout solo por volumen de 1607+ páginas).
- **Placeholders (por reemplazar):** imágenes (reusan avif de madera existentes) y reseñas (marcadas `// PLACEHOLDER reviews`).

## Enlaces
[[MESPIC-Analisis-Servicios]] · [[Plan-Mesas-Picnic-L4]] · [[Template-L4-hub]] · [[Template-L5-producto]] · [[Convencion-de-titulos]]
