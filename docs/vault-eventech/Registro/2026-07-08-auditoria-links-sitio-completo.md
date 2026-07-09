# Registro — Auditoría de enlaces de todo el sitio

> Barrido completo de enlaces internos, menús y cards. De **122 destinos rotos** (análisis de código) y **28 más** (solo visibles en el HTML generado) a **0 sobre 98,151 enlaces en 724 páginas**.
>
> Fecha: **2026-07-08** · Estado: **build OK, `astro check` 0 errores, pendiente deploy**

---

## Lección metodológica: auditar el código fuente NO basta

El primer barrido sobre `src/` dio 122 rotos. Tras arreglarlos, el auditor decía **0**.
Pero al auditar el **HTML generado** aparecieron **28 destinos rotos más**, invisibles en el código:

1. Se generan en runtime desde el frontmatter de los venues (`eventTypes`, `type`, `zoneSlug`).
2. La ruta de un venue la define su **`slug` del frontmatter**, no el nombre de archivo.
3. Algunos `href` iban dentro de strings escapados (`href=\"…\"`) y el regex no los veía.

**Regla nueva: la única verificación válida es sobre `dist/` después de `npm run build`.**

---

## Causas raíz corregidas (no parches)

### 1. Chips de tipo de evento sin validar — ~700 enlaces rotos
`directorio/[...slug].astro` renderizaba un `<a>` por **cada** valor de `eventTypes` del venue.
13 tipos declarados no tienen landing: `fiestas-privadas` (162 páginas), `comuniones` (148),
`fiestas-infantiles` (84), `baby-showers` (61), `sesiones-foto` (58), `convenciones` (45),
`despedidas` (44), `reuniones` (36), `primeras-comuniones` (15), `congresos` (11),
`exposiciones` (7), `conciertos` (4), `ferias` (1). Ídem `tipo-venue`: `mansiones`, `rooftops`.

**Fix:** nuevo `src/lib/directorio-taxonomy.ts` como **fuente única de verdad**
(`EVENT_TYPE_SLUGS`, `VENUE_TYPE_SLUGS`, `hasEventTypePage()`, `hasVenueTypePage()`).
Lo consumen `getStaticPaths` de ambas páginas dinámicas **y** los chips. Si un slug no tiene
landing, se renderiza como `<span>` de texto, nunca como enlace roto. Ya no pueden divergir.

### 2. Slug de zona generado slugificando el nombre — 5 enlaces rotos
`directorio/index.astro` hacía `zone.toLowerCase().replace(/\s+/g,"-")…`:
`"Cuajimalpa de Morelos"` → `cuajimalpa-de-morelos`, pero el `zoneSlug` real es `cuajimalpa`.
**Fix:** helper `uniqueZones()` que devuelve `{name, slug}` tomando el slug del frontmatter.

### 3. Cards de hubs apuntando a L5 inexistentes — 40 destinos
Mismo patrón ya visto en `/servicios/audiovisual/`. Afectaba a `carpas` (16), `inflables` (11),
`pistas-baile` (9), `mobiliario` (3) e `iluminacion/corporativa` (1).
**Ojo:** cada hub `hm-` repite las subcategorías en **dos bloques** (`SUB_SERVICES[].subcategories`
y `hm-feat__chips` más abajo). Hay que corregir los dos. Se reescribieron etiqueta **y** destino
para no dejar labels que prometen productos inexistentes.

### 4. `/contacto/` no existe — 14 enlaces
Remapeados a `/cotizar/` (13 archivos: 2 componentes de blog + 11 posts).

### 5. `interlinking.ts` — 3 enlaces
`cumpleanos`, `bautizos` y `graduaciones` no tienen landing en `/eventos/`. Su `href` ahora
apunta al directorio. Se añadió `fiestas-infantiles`, que sí existía y no estaba mapeado.

### 6. `relatedPosts` fantasma
5 posts enlazaban guías de precios **nunca escritas** (`cuanto-cuesta-rentar-{canones-confeti,
humo-bajo, laser, luz-negra-uv, mariposas-papel}-…`). Des-enlazados en el cuerpo (texto conservado)
y quitados del frontmatter. Otros 2 `relatedPosts` apuntaban a slugs inexistentes → remapeados.

### 7. Otros
- `BaseLayout.astro`: `<link rel=preload href="/fonts/my-font.woff2">` **comentado** viajaba en las 724 páginas. Eliminado.
- `/servicios/catering/hieleras/` → `/servicios/catering/refrigeracion/hieleras/` (iba en un string escapado).
- Slugs de venue: 6 enlaces usaban el nombre de archivo en vez del `slug` (`hotel-camino-real` → `hotel-camino-real-polanco`, `jardin-botanico` → `jardin-botanico-tlalpan`, etc.).
- `Hacienda Panoaya` está en **amecameca**, no en metepec. `Jardín Los Ahuehuetes` en **milpa-alta**, no en xochimilco.
- `ProductCard.astro` ignoraba la prop `imageAlt` (usaba `name` como alt). Añadida — era el último error de `astro check`.

---

## Código muerto eliminado

9 componentes sin un solo import: `ZoneCards` (13 enlaces rotos él solo), `HeroHome`,
`CategoryCard`, `TestimonialCards`, `ReviewCard`, `FeatureGrid`, `DirectorySearch`,
`CtaBar`, `ContentWithSidebar`.

---

## Verificación

| Métrica | Resultado |
|---|---|
| `npm run build` | ✅ 724 páginas |
| `astro check --minimumSeverity error` | ✅ **0 errores** (antes: 1 preexistente) |
| Enlaces internos en `dist/` | **98,151** |
| Destinos rotos | **0** |
| Menú (home, /servicios/, /blog/) | ✅ 65–87 destinos, todos válidos |
| Cards de los 9 hubs de servicios | ✅ todos válidos |

---

## Deuda / oportunidad detectada

**13 tipos de evento y 2 de venue están declarados en cientos de venues pero no tienen landing.**
Ya no generan enlaces rotos (se muestran como texto), pero representan tráfico de cola larga sin capturar.
Por volumen: `fiestas-privadas` (162 venues), `comuniones` (148), `fiestas-infantiles` (84),
`baby-showers` (61), `sesiones-foto` (58), `convenciones` (45), `despedidas` (44), `reuniones` (36).
Publicar una landing = añadir su config en `[eventType].astro` + su slug en `directorio-taxonomy.ts`.

**5 guías de precios referenciadas y nunca escritas** (confeti, humo bajo, láser, luz negra, mariposas de papel).
El resto del blog sí tiene su `cuanto-cuesta-rentar-…` correspondiente.

**4 venues citados en el blog no existen en el directorio**: Salón Los Fresnos (MC), Salón Jardín Las Ánimas (Tlalpan),
Salón Los Volcanes (Tlalpan), y el Jardín Los Ahuehuetes de Xochimilco. Sus enlaces apuntan ahora a la página
de zona; conviene revisar si el texto debe citarlos.

**Nombres de archivo duplicados en venues**: `club-de-banqueros.md`, `hacienda-vista-hermosa.md`,
`jardin-las-fuentes.md` existen en dos zonas cada uno. Funciona porque el `slug` los desambigua,
pero es frágil.
