---
tipo: estudio
servicio: guirnaldas / string lights / fairy lights
estado: borrador para aprobación
fecha: 2026-07-09
aliados: REDEIL (rentadeiluminacion.com, redeil.com)
---

# Estudio — Renta de Guirnaldas de Luces (Etapa 1)

> Objetivo: entender cómo se renta realmente el servicio, auditar lo que EVENTECH ya tiene, y proponer un plan para convertir "guirnaldas" en un vertical propio del sitio (hoy vive enterrado a 4 niveles de profundidad).

---

## 1. Resumen ejecutivo

**El servicio existe en EVENTECH, pero está mal posicionado.**

Hoy las guirnaldas viven en `/servicios/iluminacion/decorativa/fairy-lights/` — nivel 5 — mezcladas con candiles, esferas LED y letras luminosas. Es el servicio más buscado del catálogo de iluminación y está tratado como uno de seis subitems decorativos.

Mientras tanto, nuestro aliado REDEIL le da a guirnaldas **posición #1 en su navegación**, hero propio, 4 paquetes con precio público, 16 fotos y una sección "combina con". Su homepage lista guirnaldas como el primero de "Los Servicios Más Pedidos".

Tres datos que fundamentan la expansión:

| Señal | Dato |
|---|---|
| Precio de entrada del vertical | $3,500 MXN (50 m) — el ticket más accesible de toda la iluminación |
| Activos ya en repo | **90 imágenes** en `public/images/guirnaldas/` + 15 posts de blog relacionados |
| Profundidad actual | 5 clics desde home hasta la ficha de 100 m |

La conclusión no es "crear el servicio". Es **sacarlo de donde está y darle arquitectura propia**.

---

## 2. Cómo se renta el servicio (mecánica del mercado)

### 2.1 La unidad de venta es el metro lineal

Nadie renta "una guirnalda". Se renta **metraje** y el metraje se traduce a paquetes. Es el mismo patrón que usamos en carpas (m²) o sillas (piezas).

Regla de cálculo que usa REDEIL y que conviene adoptar:

- **Líneas paralelas:** largo del espacio × 1.5
- **Cruce en zigzag:** largo del espacio × 2
- Jardín de 100 m² → 50–80 m lineales
- Pérgola de 4×6 m → ~30 m
- Carpa grande → 80–150 m

Nota: la ficha actual de fairy-lights de EVENTECH usa otra regla (10 m de micro LED por m² de techo → 2,000 m para un salón de 200 m²). **No es contradictorio, son dos productos distintos:** micro LED denso (canopy tipo cielo estrellado) vs. guirnalda Edison (foco visible, líneas separadas). El sitio hoy no explica esa diferencia con claridad y confunde al usuario que compara precios.

### 2.2 Lo que decide la cotización

1. **Metraje** — la variable principal.
2. **Patrón de montaje** — canopy de techo, zigzag, líneas paralelas, perimetral, tree wrap, cortina.
3. **Tipo de foco** — Edison LED (bajo consumo, no calienta, aguanta 8–10 h) vs. filamento real (brillo oscilante tipo vela, se calienta, se reemplaza alguno durante el evento). *Mismo precio en ambos.* Los fotógrafos prefieren filamento.
4. **Clasificación IP** — IP44 interior / IP65 exterior certificado para lluvia directa.
5. **Color de cable** — transparente (se integra con vegetación), dorado/cobrizo (vintage), negro (profesional/discreto).
6. **Anclaje** — columnas y vigas existentes en haciendas; **postes telescópicos de aluminio** con base lastrada de arena en jardines sin postes; tensado entre postes de la carpa.
7. **Energía** — planta de luz si el venue no tiene corriente.

### 2.3 Lo que siempre va incluido (estándar del mercado)

Transporte · montaje · operación durante el evento · desmontaje. **Sin costo extra.** Quien cobra instalación aparte pierde la comparación.

Extras que escalan por paquete: dimmer de intensidad, asesoría en sitio, visita técnica previa con diagrama de montaje, segundo técnico, plantas de luz.

### 2.4 Tiempos y estacionalidad

- Montaje: **2–4 horas** según metraje.
- Reserva: 2–4 semanas ideal; 4–6 semanas en temporada alta.
- Temporada alta: **noviembre–febrero** (fin de año, posadas, bazares navideños) y **mayo–junio** (bodas).
- Los fines de semana de diciembre se agotan primero.

### 2.5 Argumentos de venta que funcionan

- *"Ningún elemento transforma tanto un espacio por tan poco."* — el ROI estético más alto del catálogo.
- IP65: **"hemos montado en julio en plena temporada de lluvias sin un solo corto."**
- El canopy sobre la pista es el efecto más fotografiado de una boda.
- Combo estrella: **guirnaldas en el techo + uplighting ámbar en las columnas.** Cubre arriba y abajo, un solo proveedor, un solo traslado.

---

## 3. Cómo lo renta REDEIL (nuestro aliado)

REDEIL opera **dos dominios** con el mismo catálogo y precios ligeramente distintos:

| Paquete | rentadeiluminacion.com | redeil.com | EVENTECH hoy (priceRange) |
|---|---|---|---|
| Básico 50 m | $3,500 + IVA | $3,500 + IVA | $1,500 – $3,500 |
| Estándar 100 m | $6,500 + IVA | $6,200 + IVA | $2,800 – $6,000 |
| Premium 200 m | $11,500 + IVA | $10,800 + IVA | $5,000 – $11,000 |
| Producción | **500 m** — $24,000 | **500 m** — $22,000 | **400 m** — $9,000 – $20,000 |

**Hallazgos:**

1. **Inconsistencia de escalón:** EVENTECH usa 400 m, REDEIL usa 500 m. Si un cliente compara, el nuestro se ve más caro por metro.
2. **Nuestros priceRange son rangos, los de REDEIL son precios cerrados.** El precio cerrado convierte mejor y gana el snippet de Google ("desde $3,500").
3. Las tres primeras filas de EVENTECH sí son coherentes con el mercado. El techo del rango coincide casi exacto.
4. Diferenciales por paquete de REDEIL: dimmer aparece en 100 m+, asesoría en sitio en 200 m+, visita previa y 2 técnicos en 500 m.

**Benchmark internacional** (para calibrar, no para copiar): en EE. UU. el string light rental va de **US$3–5 por pie lineal** instalado; algunos cobran $0.85/pie sin instalación vs. $1.25/pie instalado. Convertido a metro: ~$10–16 USD/m instalado. Nuestro Estándar (100 m / $6,500 MXN ≈ $3.5 USD/m) está **muy por debajo** del precio gringo — margen para no competir por precio sino por servicio.

### 3.1 Modelo de relación

REDEIL ya es aliado white-label declarado: existe `src/components/ProveedorIluminacion.astro` y aparece en el pie de la L4 decorativa. REDEIL nos lista como testimonio en ambos sitios ("Mariana López, Directora de Producción, Eventech.mx" / "Sonia Castañeda, Gerente de Proyectos, Eventech"). La relación está sellada en ambas direcciones.

**El modelo sigue siendo: EVENTECH al frente, REDEIL como capacidad de producción.** Igual que MESPIC en mesas-picnic.

---

## 4. Estado actual en EVENTECH — auditoría

### 4.1 Lo que existe

```
/servicios/iluminacion/                        L3 hub
  /decorativa/                                 L4 hub  ← guirnaldas viven aquí adentro
    /fairy-lights/                             L5 producto
      /guirnaldas-50m/                         L6 ficha
      /guirnaldas-100m/                        L6
      /guirnaldas-200m/                        L6
      /guirnaldas-400m/                        L6
    /candiles/  /esferas-led/  /letras-luminosas/  /neon-vintage/  /cascadas-led/
```

**Activos:**

- 90 imágenes en `public/images/guirnaldas/` — ya nombradas con slug SEO (`renta-guirnaldas-100m-techo-carpa.avif`, `guirnaldas-400m-feria-navidad-cdmx.avif`, etc.). Cubren 50/100/200/400 m, canopy, tree wrap, cortina lluvia, pérgola, hacienda, feria, mercado.
- 15 posts de blog tocan el tema (`guia-fairy-lights-guirnaldas-edison-eventos-cdmx.md`, `cuanto-cuesta-rentar-guirnaldas-cdmx-precios-2026.md`, `guirnaldas-edison-bodas-eventos-cdmx-guia-definitiva.mdx`, `renta-guirnaldas-edison-eventos-cdmx.md`, entre otros).
- `ProveedorIluminacion.astro` funcionando.
- La L5 fairy-lights ya tiene FAQs largas, specs, reseñas y JSON-LD `serviceWithReview`.

### 4.2 Los seis problemas

| # | Problema | Impacto |
|---|---|---|
| 1 | **Profundidad.** 5 clics desde home. Google reparte poco PageRank interno a URLs a 5 saltos. | SEO |
| 2 | **Nomenclatura partida.** "Fairy lights" (inglés, bajo volumen en MX) es el título de la página. "Guirnaldas" (lo que la gente busca) es el subtítulo. | SEO / CTR |
| 3 | **Dos productos en una URL.** Micro LED y Edison son estéticas, precios y cálculos distintos, y comparten página. | Conversión |
| 4 | **Sin precio visible.** El usuario ve rangos en JSON-LD pero no una tabla de paquetes. REDEIL sí la tiene. | Conversión |
| 5 | **Sin cobertura geográfica.** Cero landings de zona para guirnaldas. REDEIL tiene `/zonas/polanco/`, `/condesa/`, `/santa-fe/` enlazadas desde su hub de guirnaldas. | SEO local |
| 6 | **Escalón 400 m vs. 500 m** contra el aliado. | Coherencia |

### 4.3 Lo que ya está bien y no hay que tocar

- Nombres de archivo de imagen (ya SEO-ready, 90 piezas).
- El copy de la L4 decorativa es bueno; no compite, complementa.
- El sistema `hm-` / `dr-` y las plantillas `Template-L4-hub` / `Template-L5-producto` sirven tal cual.

---

## 5. Demanda y territorio de keywords

El usuario mexicano no busca "fairy lights". Busca, en orden aproximado de intención comercial:

1. `renta de guirnaldas` / `renta de guirnaldas de luces`
2. `renta de guirnaldas cdmx` · `... para bodas` · `... para jardín`
3. `luces vintage para eventos` · `focos edison renta`
4. `cadena de luces` · `serie de luces` · `string lights`
5. `cuánto cuesta rentar guirnaldas`
6. `guirnaldas para boda en jardín`
7. `canopy de luces` · `cielo de luces` · `tree wrap`

Cada uno de esos racimos merece una URL. Hoy **todos** compiten por la misma página.

Nota: REDEIL ya rankea con `redeil.com/renta-de-iluminacion/guirnaldas/` y `rentadeiluminacion.com/servicios/guirnaldas/`. **No queremos canibalizarlos** — queremos ocupar el ángulo que ellos no cubren: *guirnaldas como parte de una producción integral* (carpa + mobiliario + pista + luz), que es la propuesta real de EVENTECH.

---

## 6. Plan de expansión propuesto

### 6.1 Principio rector

> Guirnaldas deja de ser un item decorativo y se vuelve un **vertical con hub propio**, hermano de "decorativa" en jerarquía de navegación aunque viva bajo iluminación.

### 6.2 Arquitectura propuesta

```
/servicios/iluminacion/guirnaldas/                      ← NUEVO hub L4 (molde: sillas/index.astro)
│
├── por metraje  (fichas L5, template tiffany)
│   ├── /50-metros/          $3,500   pérgola, terraza, boda civil
│   ├── /100-metros/         $6,500   ★ el más pedido — jardín, hasta 120 inv.
│   ├── /200-metros/        $11,500   hacienda, 200+ inv.
│   └── /500-metros/        $24,000   festival, feria, venue masivo
│
├── por tipo de luz  (L5)
│   ├── /edison-vintage/            foco de filamento visible
│   ├── /fairy-lights-micro-led/    ← REDIRIGE la actual /decorativa/fairy-lights/
│   ├── /cortinas-y-cascadas/       efecto lluvia / meteoro
│   └── /neon-flex/                 (ya existe en neon-vintage, se enlaza)
│
├── por patrón de montaje  (L5 — territorio que nadie ocupa en MX)
│   ├── /canopy-de-techo/           el cielo de estrellas sobre la pista
│   ├── /tree-wrap/                 envolver árboles
│   ├── /perimetral-y-zigzag/
│   └── /pergolas-y-arcos/
│
└── por tipo de evento  (L5 — alta intención comercial)
    ├── /guirnaldas-para-bodas/
    ├── /guirnaldas-para-xv-anos/
    ├── /guirnaldas-para-jardin/
    ├── /guirnaldas-para-carpas/
    └── /guirnaldas-corporativas-y-navidenas/
```

**17 páginas nuevas** + 1 hub. Todas con foto real (las 90 ya están en repo).

### 6.3 Cobertura geográfica

⚠️ **Bloqueador previo:** la colección `src/content/zonas/` tiene **un solo archivo** (`cdmx/index.md`). No hay infraestructura de zonas todavía — `zonas/[...slug].astro` existe pero alimenta una sola página. Antes de las landings de guirnaldas por zona hay que poblar la colección.

Zonas objetivo (10), alineadas con la cobertura declarada de REDEIL:

`polanco` · `condesa` · `santa-fe` · `coyoacan` · `huixquilucan` · `naucalpan` · `tlalpan` · `valle-de-bravo` · `cuernavaca` · `tepoztlan`

REDEIL cubre "100 km desde CDMX sin costo de traslado" — replicamos la promesa. Añadir los slugs a `src/lib/directorio-taxonomy.ts` al publicar ([[eventech-directorio-taxonomy]]).

### 6.4 Cambios en páginas existentes

| Página | Acción |
|---|---|
| `/servicios/iluminacion/` | Guirnaldas sube a **primera card** del hub, con foto propia |
| `/servicios/iluminacion/decorativa/` | La card "Fairy Lights y Guirnaldas" apunta al nuevo hub. Se mantiene el bloque, se cambia el destino |
| `/decorativa/fairy-lights/` | **301 →** `/servicios/iluminacion/guirnaldas/fairy-lights-micro-led/` |
| `/decorativa/fairy-lights/guirnaldas-{50,100,200,400}m/` | **301 →** `/servicios/iluminacion/guirnaldas/{50,100,200,500}-metros/` (el 400 m se convierte en 500 m) |
| Menú principal | "Iluminación" gana un item directo: **Guirnaldas** |
| Home | Guirnaldas entra al bloque de servicios destacados |

⚠️ **Los 301 son obligatorios y el blast radius es grande.** `grep -rl "decorativa/fairy-lights" src` devuelve **121 archivos**, de los cuales **34 son posts de blog**. Mover esas URLs sin 301 + reescritura de enlaces internos rompe un tercio del cluster de contenido. Ver [[eventech-auditar-sobre-dist]] — auditar links sobre `dist/` tras el build, no sobre `src/`.

### 6.5 Componentes

- Reusar `ProveedorIluminacion.astro` con `focus="guirnaldas Edison y fairy lights"`.
- **Nuevo:** `CalculadoraMetros.astro` — el usuario mete largo × ancho del espacio y elige patrón; devuelve metros y paquete sugerido. **Es el diferenciador.** Ni REDEIL ni la competencia lo tienen. Convierte una duda ("¿cuántos metros necesito?") en un lead calificado por WhatsApp.
- **Nuevo:** `TablaPaquetes.astro` — 4 columnas, precio cerrado, checkmarks diferenciales, badge "Más popular" en 100 m. Copiar la mecánica de REDEIL, no el diseño.
- Galería: sistema `hm-feat-g3` (1 principal + 2 thumbs) ya definido — ver [[hm-feat-g3-gallery]].

### 6.6 Contenido / blog

Los 15 posts existentes se re-enlazan al nuevo hub. **6 posts nuevos** para cerrar el cluster:

1. `cuantos-metros-de-guirnaldas-necesito-calculadora` — captura la keyword de cálculo
2. `guirnaldas-edison-vs-fairy-lights-cual-elegir`
3. `canopy-de-luces-como-se-monta-en-jardin-sin-postes`
4. `guirnaldas-bajo-lluvia-ip65-temporada-de-lluvias-cdmx`
5. `tree-wrap-envolver-arboles-con-luces-boda-jardin`
6. `iluminacion-navidena-para-bazares-y-ferias-cdmx` — estacional, publicar en octubre

### 6.7 Cambio de precios (requiere tu decisión)

Propuesta: **abandonar los rangos y publicar precio cerrado**, alineado con REDEIL:

| Paquete | Propuesta EVENTECH |
|---|---|
| Básico 50 m | $3,500 + IVA |
| Estándar 100 m | $6,500 + IVA |
| Premium 200 m | $11,500 + IVA |
| Producción 500 m | $24,000 + IVA |

Motivo de alinear con `rentadeiluminacion.com` (el más caro de los dos) y no con `redeil.com`: si EVENTECH cotiza por debajo del aliado que ejecuta el montaje, el margen se come solo.

---

## 7. Fases de ejecución

| Fase | Alcance | Entregable |
|---|---|---|
| ✅ **0** | Aprobación de este estudio + decisión de precios | Aprobado 2026-07-09 |
| ✅ **1** | Hub L4 `/servicios/iluminacion/guirnaldas/` + 4 fichas de metraje + 301s | **Hecho 2026-07-09** — build 725 págs, 0 links rotos. Ver [[2026-07-09-guirnaldas-fase1]] |
| 🟡 **2** | 4 páginas de tipo de luz + 4 de patrón de montaje | **Patrones hechos 2026-07-09** (canopy, perimetral-y-zigzag, pérgolas-y-arcos, tree-wrap). Ver [[2026-07-09-guirnaldas-fase2]]. Falta el eje tipo de luz. |
| **3** | 5 páginas de tipo de evento + `CalculadoraMetros.astro` | Diferenciador vivo |
| **4** | 10 landings de zona + taxonomía | SEO local |
| **5** | 6 posts de blog + re-enlazado de los 15 existentes | Cluster cerrado |
| **6** | Auditoría de links sobre `dist/`, purga de caché CF, verificación con `?cb=` | Deploy limpio |

Cada fase cierra con entrada en `Registro/` con fecha absoluta.

---

## 8. Riesgos

- **Canibalización interna:** `/decorativa/fairy-lights/` y el nuevo hub compitiendo por la misma keyword. Mitiga el 301.
- **Canibalización con el aliado:** REDEIL rankea guirnaldas. Diferenciar por ángulo (producción integral) y enlazar hacia ellos, no contra ellos.
- **Links rotos — el riesgo mayor:** 121 archivos de `src/` (34 de ellos posts) apuntan a URLs que se mueven. Auditar sobre `dist/` tras el build ([[eventech-auditar-sobre-dist]]). Ojo con el gotcha del linter que borra `relatedPosts` a posts inexistentes ([[eventech-blog-faq-schema]]).
- **Caché CDN:** eventech.mx cachea HTML por URL; purgar Cloudflare tras el deploy ([[eventech-cdn-cache]]).
- **Sobre-fragmentación:** 17 páginas nuevas sobre un solo servicio. Si el copy se repite, Google las trata como thin content. Cada página necesita un ángulo, foto y FAQ propios — no plantilla rellenada.

---

## 9. Decisiones — resueltas 2026-07-09

1. ✅ **Precio cerrado**, alineado con `rentadeiluminacion.com`.
2. ✅ **400 m → 500 m** para alinear con REDEIL.
3. ✅ Hub bajo **`/servicios/iluminacion/guirnaldas/`**.
4. ✅ Arrancar por Fase 1 (hub + 4 fichas + 301s) y evaluar.
5. ⏳ **Calculadora de metros** — pendiente, entra en Fase 3. Sigue siendo el único elemento sin competidor mexicano.

---

## Fuentes

- [REDEIL — Guirnaldas Edison (rentadeiluminacion.com)](https://rentadeiluminacion.com/servicios/guirnaldas/)
- [REDEIL — Guirnaldas de Luces (redeil.com)](https://redeil.com/renta-de-iluminacion/guirnaldas/)
- [EVENTECH — Iluminación Decorativa](https://eventech.mx/servicios/iluminacion/decorativa/)
- [Zola — How Much Does Wedding Lighting Cost](https://www.zola.com/expert-advice/how-much-does-wedding-lighting-cost)
- [UplightRentals — String Light Rentals](https://uplightrentals.com/rent/string-lights/)

Relacionado: [[eventech-iluminacion-redeil]] · [[eventech-l4-template]] · [[eventech-l5-template]] · [[eventech-blog-iluminacion-cluster]]
