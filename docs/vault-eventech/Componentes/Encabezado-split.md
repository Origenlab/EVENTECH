# Encabezado de sección en dos columnas — `hm__head--split`

Variante del encabezado de sección del home. Columna izquierda = bloque de título; columna derecha = copy SEO/marketing (dos párrafos).

## Markup
```astro
<div class="hm__head hm__head--split">
  <div class="hm__head-title">
    <p class="hm__eyebrow">Eyebrow</p>
    <h2 id="...-heading">Título H2</h2>
    <p class="hm__head-sub">Subtítulo breve.</p>
  </div>
  <div class="hm__head-copy">
    <p>Párrafo 1 (destacado en navy).</p>
    <p>Párrafo 2.</p>
  </div>
</div>
```

## Comportamiento (CSS en `src/styles/home-2026.css`)
- `display: grid`, columnas `0.85fr / 1.15fr`, gap fluido.
- **Ancho 100%** del contenedor (`max-width: 100%`, sin centrado) — requisito del proyecto: todo ocupa el 100% del explorador.
- **Centrado vertical** entre columnas: `align-items: center`.
- Texto alineado a la izquierda.
- Barra dorada vertical a la izquierda del título (`::before`).
- Primer párrafo del copy: navy + peso 500 (jerarquía).
- Colapsa a 1 columna en `max-width: 860px`.

## Dónde se usa
- Home → sección **Servicios** (`src/pages/index.astro`).

## Reglas de homologación
- El copy de la derecha SIEMPRE son 2 párrafos: primero beneficio/propuesta de valor, segundo experiencia + CTA.
- Sin "EVENTECH" en el copy salvo necesidad de marca explícita.
- Reutilizar esta variante para encabezados de secciones largas que necesiten texto SEO.
