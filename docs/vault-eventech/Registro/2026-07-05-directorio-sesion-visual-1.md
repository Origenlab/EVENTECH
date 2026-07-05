# Reporte — Sesión visual #1: sidebar sticky + mapa embebido L3 (2026-07-05)

**Objetivo:** ficha técnica sticky + mapa embebido en L3.
**Resultado:** parcial — 1 de 2 entregables; el segundo revertido conforme al plan de rollback acordado con Frank.

## Sidebar sticky — YA EXISTÍA, verificado ✅

`.dr-vp__aside` ya tenía `position: sticky; top: 24px` y funciona en producción (verificado con scroll real en eventech.mx: las tarjetas de contacto/capacidad/CTA acompañan todo el scroll). Sin cambios necesarios. Se desactiva correctamente en <980px.

## Mapa embebido — REVERTIDO ❌ (commits `9ef60b08` → revert `18991e8b`)

Cronología del intento, con verificación en cada paso:

1. **OSM embed** (`openstreetmap.org/export/embed.html`): requiere WebGL — falla en headless y en dispositivos sin WebGL. Descartado antes de push.
2. **Google Maps clásico** (`maps.google.com/maps?output=embed`): pusheado con plan de rollback autorizado. En producción el iframe carga (450px, sin errores de consola) pero **no renderiza tiles** ni tras 6s en viewport — solo fondo gris. Verificado con navegador real vía extensión.
3. **Rollback ejecutado** el mismo día: iframe retirado, tarjeta de dirección + botón "Ver en Google Maps" intactos (nunca dejaron de funcionar — el mapa era mejora progresiva). CSS `.dr-loc__map` se conserva para la alternativa.

## Alternativa planificada (sesión #1 bis)

**Mapa estático generado en build**: script que genera una imagen PNG/AVIF del mapa por venue (tiles OSM compuestos con marcador, © OpenStreetMap contributors) y se sirve self-hosted como cualquier imagen. Ventajas: cero dependencia de terceros en runtime, cero JS, funciona en todos los dispositivos, cacheable en CDN. Es la solución robusta que el iframe no pudo dar.

## Métricas

- Regresiones: 0 (imgs rotas 0, deploy verde en los 2 pushes, rollback en <10 min desde la detección)
- Deploys de la sesión: 2/2 verdes

## Sesión #1 bis — mapa estático COMPLETADA ✅ (commit `b271a5c0`)

- `scripts/generate-static-maps.py`: compone mapas 1032x460 con tiles OSM z15 (caché local `.cache-tiles/` + throttle 0.2s, User-Agent identificado), pin dorado/navy de marca y atribución © OpenStreetMap contributors.
- **223 mapas WebP** (~27MB total, q78) en `public/images/maps/` — self-hosted, cero terceros en runtime, servidos vía exactdn.
- Template L3: `<a class="dr-loc__map">` con `<img>` lazy (solo si el archivo existe en build) que enlaza a Google Maps.
- **Verificado en producción** con navegador real: mapa renderizado, pin correcto en Hacienda de los Morales, clic → Google Maps, 0 imágenes rotas.
- Para venues nuevos: correr `python3 scripts/generate-static-maps.py` tras agregar coordenadas (salta los ya generados).
