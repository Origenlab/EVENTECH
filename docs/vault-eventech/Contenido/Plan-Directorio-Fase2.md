# Plan Directorio Fase 2 — Fichas profundas, presentación visual y proceso

**Fecha:** 5 de julio de 2026
**Aprobación de enfoque:** Frank (2026-07-05) — tres dimensiones: profundidad de fichas, presentación visual, proceso y reportes
**Relacionado:** [[Template-Ficha-Venue]] · [[Taxonomia-Directorio-Zonas]] · [[Analisis-Directorio-Colonias-CDMX]]

---

## Baseline (al cierre de Fase 1, 2026-07-05)

| Métrica | Valor |
|---|---|
| Venues totales | 189 (167 CDMX + 22 Edomex) |
| Imágenes rotas en producción | 0 (antes 364) |
| Links internos rotos | 0 (antes 68) |
| Contactos placeholder | 0 (antes 48) |
| Ratings fabricados visibles/emitidos | 0 (antes 128 fichas) |
| Fichas con reseñas de fuente real (`reviewsSource`) | 6 |
| Fichas con foto real del venue | 0 (todas usan imagen base por tipo) |
| Redirects 301 activos | 23 |
| Colonias ALTA sin cubrir | Coapa, Clavería, San Miguel Chapultepec, Irrigación |

## Dimensión 1 — Ficha profunda (estándar v2)

Una ficha se considera **profunda** cuando cumple TODO lo siguiente (además del estándar v1 del template):

- [ ] **Teléfono directo verificado** contra sitio oficial o listing activo (no agregadores muertos)
- [ ] **Todos los espacios documentados** con nombre propio, m² y capacidad por montaje (banquete/cóctel/auditorio)
- [ ] **Precios con vigencia**: rango por persona o renta, con fuente y fecha de consulta
- [ ] **Foto real del venue** como hero (fuente: sitio oficial con permiso, prensa, o sesión propia EVENTECH) — mientras no exista, imagen base por tipo, NUNCA presentada como foto del lugar
- [ ] **reviewsSource** o campos de rating vacíos
- [ ] **Políticas operativas**: curfew, eventos/día, catering externo sí/no, formas de pago
- [ ] Cuerpo con las 6 secciones canónicas y cero afirmaciones sin fuente

**Cadencia:** lotes de 5-8 fichas profundas por sesión > 20 fichas superficiales. Prioridad: los 30 featured, luego zonas premium, luego volumen.

## Dimensión 2 — Presentación visual (L2 zona / L3 ficha)

Backlog priorizado — cada punto es una sesión o media:

1. **L3 ficha técnica sticky**: tarjeta lateral con capacidad, precio, colonia, CTA WhatsApp — visible al hacer scroll (hoy se pierde abajo)
2. **Mapa embebido** en L3 (OpenStreetMap estático o iframe de Google) para fichas con coordenadas exactas — 170+ ya las tienen
3. **Badge de datos verificados**: distintivo visual en fichas que cumplen estándar v2 (reemplaza al `verified` legacy sin significado)
4. **L2 con filtros**: por colonia, capacidad y rango de precio (hoy solo lista plana) — client-side, sin framework
5. **Galería real**: reactivar los thumbs SOLO para fichas con fotos reales (el fallback actual ya lo hace automático al existir los archivos)
6. **Mobile audit** del directorio con la skill mobile-responsive-overhaul
7. **Breadcrumbs enriquecidos** con colonia (hoy: región > zona > venue; falta el nivel colonia visual)

Regla: cada cambio visual se aprueba con captura antes/después ANTES de push.

## Dimensión 3 — Proceso y reportes

**Cada sesión de trabajo del directorio sigue este contrato:**

1. **Apertura**: objetivo único y medible declarado en el primer mensaje (ej. "5 fichas profundas de zona premium" o "implementar ficha técnica sticky")
2. **Criterios de aceptación** listados antes de tocar código/contenido
3. **Ejecución** con verificación en vivo (build + deploy verde + check en eventech.mx)
4. **Cierre**: reporte ejecutivo en el vault (`Registro/`) con: qué se hizo, métricas antes/después, fuentes usadas, pendientes y riesgos
5. Nada se inventa: dato sin fuente = campo vacío. Fuente con ubicación dudosa = se verifica CP/mapa antes de aplicar (lección San Pablo de Enmedio / Hacienda San Angel Coahuila)

**Reporte ejecutivo**: un archivo por sesión en `docs/vault-eventech/Registro/AAAA-MM-DD-directorio.md`, máximo una página.

## Cola de trabajo (orden propuesto)

| # | Sesión | Entregable |
|---|---|---|
| 1 | Visual: ficha técnica sticky + mapa embebido | L3 nivel directorio comercial |
| 2 | 6 fichas profundas: candidatos con listing fuerte (Finca La Gloria 4.8/156, Hacienda Tepepan 5.0/35, Hacienda Zacapa 4.7/61, Capital Eventos, Casa del Corregidor, Hotel Geneve) | +6 venues con rating real |
| 3 | Visual: filtros en L2 + badge verificado | L2 usable como buscador |
| 4 | Profundizar 8 featured existentes (patrón Morales) | Reviews reales en los top |
| 5 | Fotos reales: pipeline para los 15 más visitados | Heroes auténticos |
| 6 | Mobile overhaul del directorio | Auditoría + fixes |

---

*Este plan gobierna las sesiones siguientes. Cambios de alcance se registran aquí con fecha.*
