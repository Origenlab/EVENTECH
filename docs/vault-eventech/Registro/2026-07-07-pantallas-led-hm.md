# Reporte — Homologación L4: Pantallas LED al molde hm- (2026-07-07)

**Objetivo:** homologar y mejorar `/servicios/audiovisual/pantallas-led/` al molde L4 `hm-` (ver [[Template-L4-hub]]).
**Resultado:** hub reconstruido de sistema viejo → `hm-`. `astro check` limpio en el archivo (único error del repo es preexistente en `directorio/[...slug].astro`, ts7006, ajeno a este cambio).

## Antes → Después

- **Antes:** sistema viejo — `HeroPage` + `ServiceShowcase` + `CTABanner` + `ProductCard` + `Gallery4x4` + `PricingCards` + `FaqSection`, `l3-shared.css`, y `:root { --color-accent: #6c5ce7 }` (override **morado**, el bug que el molde prohíbe). Showcases con placeholders SVG "Imagen próximamente". Title sin `rawTitle` ni complemento.
- **Después:** molde `hm-` completo dentro de `<div class="hm">` con dorado institucional por defecto. Un solo CSS (`home-2026.css`). Sin override de accent.

## Anatomía entregada (orden fijo del molde)

Hero (`hm-hero`, CTAs gold+ghost, 2 párrafos SEO) → Nav (`hm-menu`, 4 L5 + CTA WhatsApp) → Catálogo (`#catalogo`, `hm-cat-grid` de 4) → Detalle (`hm__section--ivory`, 4× `hm-feat` con galería `--g3`) → Por qué (`hm__section--navy`, 6 `hm-why`) → Cómo funciona (`hm-steps`, 4) → FAQ+form (`hm-faqx`, 7 FAQ + `#pantallasForm` que abre wa.me).

## Decisiones (aprobadas por Frank)

- **L5 son hojas (sin L6):** pedestal, videowall, exterior, monitores solo tienen `index.astro`. A diferencia de mesas/salas-lounge/barras (que sí tienen L6), aquí los chips → L6 no aplican. **Solución:** specs como pills NO enlazadas usando la clase nativa `hm-feat__stats` (en tarjetas de catálogo y en módulos detalle); un solo CTA "Ver [tipo]" → L5 por tarjeta. Cero links rotos.
- **Imágenes:** solo ~4 reales de pantalla en `public/images/audiovisual/`. Se reusaron mapeadas por tipo (`monitor-pantalla-presentacion-congreso`, `pantalla-led-videowall-evento-corporativo`, `proyector-4k-pantalla-gigante-evento`, `equipo-audiovisual-completo-boda`, `sistema-audio-bafle-jbl...`). Algunas se repiten entre slots g3. Marcado en el código con `IMG: reusadas … reemplazar`.

## Contenido

- 4 tipos: Pedestal (55–85", Full HD/4K) · Videowall (P2.5/P3.9, hasta 6×3 m, Novastar) · Exterior (5,000+ nits, IP65, P4.8/P6.2) · Monitores (retorno 24–32", señalización 43–55").
- 6 diferenciadores (técnico dedicado, inventario calibrado, procesador incluido, cableado oculto+pruebas, respaldo en sitio, asesoría de dimensión/brillo).
- 4 pasos (visita técnica → propuesta/aparto → instalación/calibración/pruebas → operación en vivo/desmontaje).
- 7 FAQ (se agregó "¿transmisión en vivo / videoconferencia?"). JSON-LD service+breadcrumb+faq, `priceRange 500–15000`.
- Title: `Renta de Pantallas LED para Eventos en CDMX | Equipo para eventos en México` + `rawTitle`. Ver [[Convencion-de-titulos]].
- CSS scoped mínimo: `hm-menu__item--cta` + `hm-cat__specs` (padding de las pills en tarjeta).

## Verificado

- 5/5 imágenes existen en disco · 4/4 links L5 válidos · sin `--color-accent`/`6c5ce7`/componentes viejos · 4 galerías `--g3` · `astro check` sin errores en el archivo.
- **Pendiente correr `npm run build` en la Mac** (rollup/esbuild nativos; el sandbox se pasa de 45 s por optimización de imágenes de todo el sitio).

## Pendiente / follow-up

- Fotos reales por tipo de pantalla (hoy reusadas). Sustituir en `SUB_SERVICES[].image` y en los `hm-feat__media--g3`.
- Opcional: refrescar las 4 L5 hijas (pedestal/videowall/exterior/monitores) al estándar L5 [[Template-L5-producto]].
- Homologar el resto de hubs L4 de audiovisual (`sonido`, `proyectores`, `microfonos-dj`) y de otras categorías.
