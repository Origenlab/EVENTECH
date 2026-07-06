# Reporte — Sesión #2: ficha profunda Finca La Gloria (2026-07-06)

**Objetivo:** primera ficha del lote de candidatos con listing fuerte, bajo estándar v2.
**Resultado:** completada y verificada en producción (commit `be8b3fb8`, deploy verde).

## Entregado

- **Finca La Gloria** (La Noria, Xochimilco) — el candidato más fuerte de la cola: **4.8 con 156 opiniones, 96% de recomendación y 9 Wedding Awards (2014-2026)**, +295 eventos contratados vía bodas.com.mx.
- Datos 100% del listing oficial (extraído íntegro, 1,774 líneas): dirección con CP verificado (Av. México 5665, La Noria, 16030), coords exactas del mapa del listing, capacidad 100-500, menús $800-1,000 con desglose de lo que incluyen (7 hrs, 3 tiempos, música, cóctel), políticas completas (1 evento/día, curfew 00:00, banquete propio, 30% anticipo), desglose de calificación por rubro.
- `reviewsSource` desde el día uno → estrellas legítimas en UI y JSON-LD.
- Mapa estático generado (227 mapas totales) y hero desde base jardín.
- **Verificado en vivo:** ★ 4.8 (156) renderizado, mapa presente, headings canónicos, 0 imágenes rotas.

## Cola restante (candidatos con listing fuerte)

Hacienda Tepepan (5.0/35), Hacienda Zacapa (4.7/61), Capital Eventos (Tlalpan 4.7/26), La Casa del Corregidor (MH 4.7/45), Hotel Geneve (4.9/18), Marriott Reforma (4.9/24), Ex Hda Santa Mónica (Azcapotzalco 4.6/9).

## Métricas

- Venues: 190 · Fichas con reviewsSource: 7 · Deploys: 1/1 verde · Regresiones: 0

## Sesión #3 — Hacienda Tepepan ✅ (commit `723623dd`)

- **Hacienda Tepepan** (Santa María Tepepan, Xochimilco — colonia nueva): **5.0 perfecto con 36 opiniones, 100% recomendación**, nota máxima en los 5 rubros. Único venue del directorio con calificación perfecta.
- Datos íntegros del listing (cupo en contexto, sin subagente): Cda. Tecuantitla 1 CP 16020, coords del mapa, 80-350 pax, menús $1,100-1,500 (3 tiempos + tornafiesta + barra de café), descorche libre, 1 evento/día, curfew 00:00, operado con Protocolo Eventos (4.9/65), menús especiales (celíacos/diabéticos/hipertensos), suite para festejados.
- Nota editorial de reseñas reales incluida (frío invernal en zona alta → cross-sell calefacción EVENTECH).
- Verificado en vivo: ★ 5 (36), mapa estático, headings canónicos, 0 imágenes rotas.

**Métricas:** 191 venues · 8 con reviewsSource · colonias nuevas hoy: La Noria ya existía, Santa María Tepepan nueva · deploys 2/2 verdes.
