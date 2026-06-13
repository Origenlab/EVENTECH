# Galería hm-feat__media--g3

Variante de media column para módulos `hm-feat` en páginas L3. Muestra 1 imagen principal (16:10) arriba y 2 thumbnails (4:3) en fila abajo.

## HTML

```html
<div class="hm-feat__media hm-feat__media--g3">
  <img class="hm-feat__g3-main" src="/images/..." alt="..." loading="lazy" decoding="async" />
  <div class="hm-feat__g3-thumbs">
    <img src="/images/..." alt="..." loading="lazy" decoding="async" />
    <img src="/images/..." alt="..." loading="lazy" decoding="async" />
  </div>
</div>
```

## CSS — ubicación

CSS en **`/src/styles/home-2026.css`** (global). Colocado justo después del bloque `.hm-feat__media img { position: absolute }` para que lo sobreescriba por source order.

**NUNCA** en `<style>` scoped de Astro — el scoping añade `[data-astro-cid-xxx]` pero la imagen puede perder la propiedad si el orden en la cascada es incorrecto.

## CSS

```css
/* Variante galería 3 imágenes (1 main + 2 thumbs) */
.hm-feat__media--g3 {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: static;
  min-height: 0;
  padding: 20px 20px 20px 0;
  align-self: stretch;
}
.hm-feat__media--g3 img {
  position: static;
  inset: auto;
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}
.hm-feat__g3-main {
  flex: 1;
  min-height: 220px;
  aspect-ratio: 16 / 10;
  border-radius: 6px 6px 4px 4px;
}
.hm-feat__g3-thumbs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.hm-feat__g3-thumbs img {
  aspect-ratio: 4 / 3;
  border-radius: 4px 4px 6px 6px;
}
@media (max-width: 760px) {
  .hm-feat__media--g3 { padding: 0; }
}
```

## Páginas que usan este patrón

- `/servicios/mobiliario/sillas/` (5 módulos hm-feat)

## Relación con home-2026.css

La regla base `.hm-feat__media img { position: absolute; inset: 0; ... }` aplica a TODOS los `img` hijos de `.hm-feat__media`. La variante `--g3` sobreescribe eso con `position: static` por specificity (0,1,1 vs 0,1,1, mismo nivel → source order gana, y --g3 va después).
