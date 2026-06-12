# Cards de categoría — `.hm-cat`

Cards del index (sección Servicios) que muestran **categoría con subcategorías**. Namespace propio `.hm-cat` (no reusar `.hm-card`, que lo usa la sección Eventos).

## Anatomía
1. **Media** (`.hm-cat__media`, `<a>` a la categoría): imagen + degradado + **nombre** de categoría sobreimpreso (`.hm-cat__name`) + **badge** "N subcategorías" (`.hm-cat__badge`, pill dorada).
2. **Body** (`.hm-cat__body`):
   - Subtítulo corto (`.hm-cat__sub`) = `description` de la categoría.
   - **Menú de subcategorías** (`.hm-cat__menu` `<ul>`): cada subcategoría es una fila-link con flecha, separadas por hairline. Estilo menú/dropdown.
   - **CTA botón** (`.hm-cat__cta`): "Ver todo en {categoría}" → navy, hover dorado. `margin-top:auto` lo fija abajo (cards de igual alto).

## Datos
Desde `SERVICE_CATEGORIES` (`src/data/site.ts`): `name`, `description`, `image`, `href`, `subcategories[{name,href}]`. El index usa `slice(0,8)` — las 8 categorías de equipo: Mobiliario, Audiovisual, Carpas, Iluminación, Pistas de Baile, Inflables, Catering, Accesorios (2 filas de 4).

## Grid / responsive
`.hm-cat-grid`: 4 col → 3 (≤1100px) → 2 (≤820px) → 1 (≤520px). Sin transforms ni transiciones (convención del archivo).

## Reuso en "Tipos de evento"
La sección Tipos de evento (`EVENT_TYPES.slice(0,4)`: Bodas, XV Años, Corporativos, Eventos Sociales) usa **el mismo** markup/clases `.hm-cat`. Diferencias: badge de la 1ª card = "Más popular" (`.hm-cat__badge--pop`, navy); resto = "N servicios". Cada subcategoría apunta a su servicio. Antes era `.hm-ev` (overlay de imagen, ahora en desuso).

## Reglas
- No anidar `<a>` dentro de `<a>`: la card NO es un solo enlace; media, cada subcategoría y el CTA son enlaces independientes.
- `alt` de imagen: `Renta de {categoría} para eventos`.
- Reutilizable para la página `/servicios/` (mismo patrón categoría→subcategorías).
