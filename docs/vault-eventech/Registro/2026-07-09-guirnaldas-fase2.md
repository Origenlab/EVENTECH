# 2026-07-09 — Guirnaldas Fase 2: patrones de montaje

Segunda fase del [[Estudio-Guirnaldas-Luces]]. Se construye el eje **patrón de montaje**: 4 páginas L5 nuevas bajo el hub `/servicios/iluminacion/guirnaldas/`.

Es el territorio que ningún competidor mexicano ocupa. REDEIL vende metros; nadie explica cómo se cuelgan.

## Las 4 páginas

| URL | Ángulo propio | Dato que la sostiene |
|---|---|---|
| `/canopy-de-techo/` | El plano que nadie ilumina y todos miran | Catenaria: caída de 30–50 cm por cada 6 m de claro; la guirnalda **nunca** tensa, cuelga de cable de acero |
| `/perimetral-y-zigzag/` | Uno define el espacio, el otro lo envuelve | Los dos multiplicadores: perímetro × 1.15 vs. largo × 2 |
| `/pergolas-y-arcos/` | La estructura ya está, solo falta encenderla | Pérgola 4×6 m ≈ 30 m; bridas sin perforar; montaje 1–2 h |
| `/tree-wrap/` | **El wrap no se hace con foco Edison** | Tronco de 3 m y 40 cm ø ≈ 38 m de micro LED solo el tronco |

Molde: [[Template-L5-producto]], variante hoja (sin grid de `ProductCard` porque no hay L6). Hero, specs, 3 `ServiceShowcase`, galería, FAQ (8), sidebar triple, formulario de reserva, `ProveedorIluminacion` con `focus` propio, dorado institucional.

## Dos decisiones de fondo

### 1. Cero reseñas inventadas

Las 4 fichas de metraje heredadas traen arrays de `reviews` con nombres y fechas que alimentan `serviceWithReviewJsonLd` — es decir, estrellas en el snippet de Google. **Las páginas nuevas usan `serviceJsonLd`, sin reseñas.**

Publicar testimonios ficticios en structured data engaña al comprador y expone el dominio a una penalización de Google por rich snippets fraudulentos. Si aparecen testimonios reales, se agregan. Verificado en `dist`: `"@type":"Review"` = **0** en las 4 páginas.

Pendiente para Frank: decidir qué se hace con las `reviews` que ya existen en el resto del sitio.

### 2. Honestidad técnica en tree-wrap

La keyword "tree wrap" tiene demanda, pero **el foco Edison no envuelve troncos**: es grande, rígido y va cada 50 cm. El wrap real se hace con micro LED. La página lo dice en el hero, en la primera FAQ y en la tabla de specs, enruta el micro LED a `/decorativa/fairy-lights/`, y ofrece la alternativa honesta —tender guirnalda Edison **entre** árboles— que además cuesta una fracción.

Capturamos la búsqueda sin mentirle al que la hace. También le decimos que envolver los ocho árboles del jardín es tirar dinero: uno o dos, los focales.

## Cambios en el hub L4

- Nueva sección `#patrones` (fondo default, entre los módulos de detalle y el bloque navy) con grid de 4 cards.
- `hm-menu` gana un item **Patrones de montaje** en su propia fila (`hm-menu__cta-row`).
- El copy del catálogo enlaza al ancla: *"¿No sabes cuántos metros necesitas? Depende del patrón."*
- Las 4 fichas de metraje ganan los 3 patrones principales en `sidebarRelated`.

Con esto el hub explica **las dos variables independientes**: el paquete dice cuántos metros contratas, el patrón dice cuántos necesitas.

## Verificación

- `npm run build` → **729 páginas** (+4), 0 errores, 15.82 s.
- Auditoría de links sobre `dist/` ([[eventech-auditar-sobre-dist]]): **738 hrefs internos únicos, 0 rotos**.
- Todas las imágenes referenciadas existen en `public/`.
- **0 preguntas de FAQ repetidas** entre las 4 páginas (control de thin content).
- Volumen de texto: 3,233–3,264 palabras por página. Contenido original, no plantilla rellenada.
- `FAQPage` = 1 y `Review` = 0 en las cuatro. Dorado institucional aplicado. `ProveedorIluminacion` presente.

## Siguiente

Fase 2 restante: el eje **tipo de luz** (`edison-vintage`, `fairy-lights-micro-led`, `cortinas-y-cascadas`), que incluye migrar `/decorativa/fairy-lights/` con sus **121 referencias** — el trabajo más delicado del plan.

Después, Fase 3: 5 páginas de tipo de evento + `CalculadoraMetros.astro`, el único diferenciador sin competencia en el mercado mexicano.
