# 2026-07-09 — Guirnaldas Fase 3: CalculadoraMetros

> El plan pedía 5 páginas de tipo de evento + la calculadora. **Se construye solo la calculadora.** Las 5 páginas ya no tienen sentido.

## Por qué se cancelan las 5 páginas de tipo de evento

Mientras yo construía los patrones, otro agente publicó un cluster de 5 posts de blog que cubre exactamente ese eje — y bien: enlazan al hub 8 y 10 veces respectivamente.

| Página del plan | Ya existe como | Veredicto |
|---|---|---|
| `guirnaldas-para-bodas` | blog `guirnaldas-luces-boda-jardin-cdmx-guia-2026` | duplica |
| `guirnaldas-para-jardin` | el mismo post (jardín = boda en este mercado) | duplica |
| `corporativas-y-navidenas` | blog `guirnaldas-eventos-corporativos-festivales-terrazas-cdmx` | duplica |
| `guirnaldas-para-carpas` | `/canopy-de-techo/` (carpa es **venue**, no tipo de evento) | duplica |
| `guirnaldas-para-xv-anos` | — | **cero imágenes reales** de XV en el repo (90 fotos, ninguna) |

El blog cubre la capa informacional y alimenta al hub. El hub, las 4 fichas de metraje y los 4 patrones cubren la transaccional. Añadir 5 páginas sobre los mismos términos habría repetido la canibalización que deshicimos en [[2026-07-09-guirnaldas-consolidacion]] — esta vez a sabiendas.

**Segunda vez que el plan original resulta equivocado al auditarlo.** El estudio se escribió antes de conocer el inventario real. Vale más que el plan.

## Lo que se construyó

`src/components/CalculadoraMetros.astro` — el único elemento del vertical sin competencia mexicana. REDEIL y `redeil.com` venden metros sin explicar cómo calcularlos.

- **Entrada:** largo × ancho del área + patrón de montaje (perimetral, zigzag, canopy, pérgola).
- **Salida:** metraje estimado, la fórmula usada, el paquete que corresponde con su precio cerrado, enlace a la ficha y un **WhatsApp prellenado con el cálculo completo**.
- Vanilla JS, sin `localStorage`, sin dependencias.

### Dos decisiones de producto que importan

**No empuja al paquete caro.** Si sobra más del 40% del paquete, avisa: *"quizá te alcance el escalón de abajo — pregúntanos antes de contratar de más"*. Un calculador honesto vende menos hoy y más veces.

**No vende certeza que no tiene.** Dice explícitamente que es una estimación, no una cotización, y que el metraje fino sale de la visita técnica.

### Dónde vive

Sección `#calculadora` en el hub, entre los patrones y el bloque navy. Enlazada desde el nav, desde el copy del catálogo, desde las **4 páginas de patrón** y desde las **4 fichas de metraje**.

## 🐛 Bug propio, encontrado al escribir la fórmula

Publiqué la regla del zigzag como **"largo del espacio × 2"**, junto a un ejemplo que solo cuadra con **perímetro × 2**:

> Jardín de 12×8 m. Perímetro = 40 m.
> Regla publicada: 12 × 2 = **24 m**.
> Ejemplo publicado: *"ese mismo jardín ≈ **80 m**"*.
> 40 × 2 = 80 ✓

**La regla estaba mal escrita; el ejemplo estaba bien.** Corregido en el hub, en `perimetral-y-zigzag` y en el artículo de precios.

También corregí una FAQ que afirmaba que un canopy de "50 a 60 metros" *entra en el paquete de 50 metros*. No entra: si necesitas 55, contratas 100. Ahora dice 48 m, que es lo que da la fórmula para una pista de 6×6.

Escribir la calculadora obligó a hacer la aritmética explícita, y ahí saltó la inconsistencia. **El código no deja mentir a la prosa.**

## Verificación

Las fórmulas se validaron contra los cuatro ejemplos que ya estaban publicados:

| Patrón | Área | Calculadora | Publicado |
|---|---|---|---|
| Perimetral | 12×8 m | 46 m → paquete 50 | 46 m |
| Zigzag | 12×8 m | 80 m → paquete 100 | 80 m |
| Canopy | 6×6 m | 48 m → paquete 50 | ~50 m |
| Pérgola | 6×4 m | 30 m → paquete 50 | 30 m |

- `npm run build` → **735 páginas**, 0 errores.
- **744 hrefs internos, 0 rotos.**
- Redondeo siempre **hacia arriba** al metro: quedarse corto el día del montaje cuesta más que sobrar dos metros de cable.

## Siguiente — mi recomendación, por orden de retorno

1. **Componente de reseñas.** Hay **668 testimonios reales** de clientes que no se renderizan en ninguna página. Es la mejora de conversión más barata del sitio y no toca SEO.
2. **Limpiar los 204 `reviewCount` inventados** (hasta 345 declarados con 3 reseñas). Hoy es dato muerto; el día que alguien reactive el emisor de `aggregateRating`, se publica de golpe.
3. **Landings de zona.** Requiere poblar `src/content/zonas/` primero — hoy tiene un solo archivo.
4. **Medir.** Dejar que Google reindexe la consolidación 4–6 semanas antes de sumar nada más al vertical.

---

## Deploy — verificado en vivo (2026-07-09)

Commit `d9c83613`. Action `deploy.yml` → **completed / success**.

- Sección `#calculadora` presente en el hub, con los 2 inputs y los 4 patrones.
- El aviso *"es una estimación, no una cotización"* y el de *"no contrates de más"* están en vivo.
- **`Perímetro × 2` = 1 · `Largo × 2` = 0** — la regla corregida se sirve, la errónea desapareció.
- Las **8 páginas hijas** enlazan a `#calculadora` (2 enlaces cada una: sidebar desktop + móvil).
- La FAQ del artículo de precios ya dice *"se resuelve con unos 48 metros lineales"*.
