# Análisis Profesional del Directorio CDMX — EVENTECH
**Fecha:** 30 de junio de 2026  
**Alcance:** 168 venues activos en `/directorio/cdmx/` | 24 alcaldías

---

## 1. Resumen Ejecutivo

El directorio de CDMX es el activo de contenido más grande de EVENTECH: 168 páginas indexables distribuidas en 24 alcaldías. La arquitectura base es sólida (Astro, rutas canónicas, hero images), pero el directorio opera actualmente muy por debajo de su potencial de posicionamiento. Los hallazgos se agrupan en **tres problemas de impacto crítico** y **cuatro áreas de mejora estructural** que, resueltos en orden de prioridad, pueden transformar la visibilidad orgánica del sitio en 90 días.

**Score promedio actual: 6.9 / 10**  
**Score máximo alcanzable hoy: 8 / 10** (techo forzado por ausencia universal de testimonios y FAQs)

---

## 2. Dashboard de Diagnóstico

### Cobertura de campos por venue (168 total)

| Campo | Venues completos | % | Estado |
|---|---|---|---|
| Horarios | 168 / 168 | 100% | ✅ Completo |
| Rating y reviewCount | 168 / 168 | 100% | ✅ Completo |
| Precio (priceRange) | 168 / 168 | 100% | ✅ Completo |
| Tipos de evento | 168 / 168 | 100% | ✅ Completo |
| Galería (referencias en MD) | 168 / 168 | 100% | ⚠️ Referencias OK, archivos faltantes |
| Hero image en public/ | 168 / 168 | 100% | ✅ Completo |
| Teléfono de contacto | 146 / 168 | 87% | 🔴 22 venues sin teléfono |
| WhatsApp de contacto | 135 / 168 | 80% | 🔴 33 venues sin WhatsApp |
| Coordenadas GPS | 138 / 168 | 82% | 🔴 30 venues sin coords |
| Código Postal | 138 / 168 | 82% | 🔴 30 venues sin CP |
| Testimonios en MD | 0 / 168 | 0% | 🚨 CRÍTICO — campo inexistente |
| FAQs en MD | 0 / 168 | 0% | 🚨 CRÍTICO — campo inexistente |
| Imágenes de galería existentes | 168 / 923 refs | 18% | 🚨 CRÍTICO — 755 imgs faltantes |

### Distribución de precios

| Nivel | Venues | Ejemplo representativo |
|---|---|---|
| $ (hasta ~$18K) | 45 venues | Casa Ángel, Salón Danny |
| $$ ($13K–$58K) | 75 venues | Salón Versalles, Salón Diamante |
| $$$ ($35K–$250K) | 33 venues | Kalesh, Loreto y Peña Pobre |
| $$$$ (precio/persona) | 15 venues | Four Seasons, St. Regis, W Hotel |

### Score promedio por alcaldía

| Alcaldía | Venues | Score avg | Estado |
|---|---|---|---|
| Cuajimalpa | 4 | 8.0/10 | ✅ Mejor alcaldía |
| Iztacalco | 4 | 8.0/10 | ✅ |
| Coyoacán | 9 | 7.8/10 | ✅ |
| Pedregal | 3 | 7.7/10 | ✅ |
| Roma-Condesa | 6 | 7.7/10 | ✅ |
| Benito Juárez | 5 | 7.6/10 | ✅ |
| Tlalpan | 11 | 7.6/10 | ✅ |
| Álvaro Obregón | 10 | 7.4/10 | 🟡 |
| Del Valle | 3 | 7.3/10 | 🟡 |
| Miguel Hidalgo | 3 | 7.3/10 | 🟡 |
| Azcapotzalco | 8 | 7.5/10 | 🟡 |
| Centro Histórico | 2 | 7.5/10 | 🟡 |
| Santa Fe | 4 | 7.5/10 | 🟡 |
| Polanco | 8 | 6.9/10 | 🟠 |
| Lomas Chapultepec | 3 | 6.7/10 | 🟠 |
| San Ángel | 3 | 6.7/10 | 🟠 |
| Xochimilco | 9 | 6.7/10 | 🟠 |
| Iztapalapa | 26 | 6.7/10 | 🟠 (volumen más grande) |
| Cuauhtémoc | 9 | 6.4/10 | 🔴 |
| Tláhuac | 5 | 6.4/10 | 🔴 |
| Magdalena Contreras | 6 | 6.3/10 | 🔴 |
| Gustavo A. Madero | 19 | 6.1/10 | 🔴 (segundo más grande) |
| Venustiano Carranza | 4 | 5.8/10 | 🔴 |
| Milpa Alta | 4 | 5.8/10 | 🔴 |

---

## 3. Hallazgos Críticos (ordenados por impacto SEO)

---

### 🚨 CRÍTICO #1 — 755 imágenes de galería no existen en disco

**Impacto: Reputación, tiempo en sitio, bounce rate, conversión**

Todos los archivos de galería referenciados en los 168 MD están declarados en el frontmatter, pero no existen en `public/images/venues/`. Solo existen 422 archivos y todos son hero images (formato `[slug]-hero.avif` / `.jpg`). Las referencias de galería como `/images/venues/kalesh-salon-interior.jpg`, `/images/venues/salon-versalles-pista.jpg`, etc. generan 404 o imágenes rotas en el frontend.

**Evidencia:**
- Total referencias de galería: 923
- Imágenes existentes fuera de hero: 0
- Venues afectados: 168 / 168 (100%)

**Consecuencias:**
- Las galerías del venue muestran placeholders vacíos o errores visuales
- Un visitante que llega sin imágenes sale inmediatamente (bounce rate alto = señal negativa para Google)
- Las búsquedas de imagen de Google no indexan nada del directorio
- Los venues perciben que "la página se ve incompleta" y tienen menos incentivo de pagar membresía

**Solución:**

Hay dos caminos en paralelo:

**A) Inmediato (placeholder inteligente):** En el componente de galería del venue, si la imagen 404 se puede detectar con `onerror`, reemplazar con una imagen de categoría genérica por tipo (`salon-default.jpg`, `jardin-default.jpg`, `terraza-default.jpg`, `hotel-default.jpg`). Esto tapa el problema visualmente mientras se resuelve el fondo.

**B) Estructural (fotografía real):** Diseñar un flujo de onboarding de imágenes para venues. Cada venue debe entregar al menos 6 fotos en resolución mínima 1200×800px. Las fotos deben cubrir: exterior/entrada, salón principal, pista de baile, jardín o terraza (si aplica), area de fotos o vestidor, evento real montado. Nombres de archivo deben seguir la convención: `[slug]-[escena].jpg`.

**Meta:** 6 imágenes reales por venue. Inicio: priorizar los 40 venues `featured:true` en primera fase.

---

### 🚨 CRÍTICO #2 — Cero testimonios y cero FAQs en todos los venues

**Impacto: E-E-A-T (Experience, Expertise, Authoritativeness, Trust), CTR, conversión**

Ninguno de los 168 MD tiene campos `testimonials` o `faqs`. Los testimonios visibles en algunas páginas (como Kalesh o Versalles) están hardcodeados en la plantilla, no en el contenido del venue. Esto significa:

- Son idénticos o inexistentes en la mayoría de venues
- No se pueden personalizar por venue
- No aportan señal de relevancia específica al venue

**¿Por qué importa para SEO?** Las FAQs en formato JSON-LD FAQ Schema son elegibles para FAQ Rich Results en Google, lo que puede duplicar el espacio ocupado en SERP. Los testimonios activan `Review` schema que muestra estrellas en resultados.

**Solución:**

**A) Agregar schema FAQSchema en el head de cada venue page:**
Definir un campo `faqs` en el content schema como array de `{question, answer}`. Cada venue debe tener mínimo 4 preguntas relevantes. Ejemplos universales para salones:
- ¿Cuántas personas caben en [nombre]?
- ¿Se puede llevar catering externo a [nombre]?
- ¿Hasta qué hora puede durar el evento en [nombre]?
- ¿[nombre] tiene estacionamiento?

**B) Agregar campo `testimonials` en MD:**
Array de `{author, event, date, text, rating}`. Mínimo 3 testimonios por venue. Fuente: reseñas reales de Google Maps o del venue.

**C) Implementar `Review` + `LocalBusiness` JSON-LD:**
El campo `rating` y `reviewCount` ya existen en todos los MDs. Solo falta inyectarlos en un schema structured data en el `<head>`. Impacto inmediato en CTR con estrellas en SERP.

---

### 🚨 CRÍTICO #3 — 30 venues sin coordenadas GPS y sin Código Postal

**Impacto: Local SEO, Google Maps, búsquedas geolocalizadas**

Los 30 venues afectados están todos en Gustavo A. Madero (12 venues), Iztapalapa (5), Venustiano Carranza (4), Milpa Alta (3), Xochimilco (3), Tláhuac (2) y Magdalena Contreras (1). Son precisamente las alcaldías populares con mayor volumen de búsqueda de salones económicos y de nivel medio.

Sin coordenadas y sin CP, el `LocalBusiness` schema no puede generar un pin de Google Maps. Las búsquedas "salón de fiestas cerca de mí" o "salón en Iztapalapa" no posicionan porque Google no puede verificar la ubicación.

**Venues sin coordenadas (30):**

Gustavo A. Madero: jardín-el-roble, jardin-verali, los-ventanales-salon, salon-galaxia, salon-george-king, salon-los-arcos, salon-sarita, salon-sol, salon-tepeyac-inn, salon-villa-portilla, salon-diamante-gam, salon-majestic-gam, salon-premier-gam  
Iztapalapa: jardin-fenix, jardin-la-fuente, salon-julis, salon-las-hadas, salon-las-palmas  
Venustiano Carranza: salon-danny, salon-marisol, salon-memito, salon-crystal-palace-vc  
Milpa Alta: jardin-mexico, salon-faisanes, salon-santa-martha  
Xochimilco: jardin-del-arenal, jardin-la-caleta, salon-xochitl  
Tláhuac: salon-velsy, salon-vicky  

**Solución:** Geocodificar los 30 venues. Herramienta recomendada: Google Maps Geocoding API o búsqueda manual con Google Maps → clic derecho → "¿Qué hay aquí?" → copiar lat/lng. Tiempo estimado: 2–3 horas de trabajo manual.

---

## 4. Hallazgos Estructurales (impacto medio-alto)

---

### ⚠️ ESTRUCTURA #1 — 22 venues sin teléfono | 33 sin WhatsApp

El teléfono y WhatsApp son los principales canales de conversión de un directorio de venues. Un visitante que quiere reservar abandona si no encuentra contacto directo. Los venues más afectados están en Iztapalapa (8 sin teléfono, 8 sin WhatsApp), Gustavo A. Madero (3 sin teléfono, 3 sin WhatsApp) y Polanco (2 sin WhatsApp — Camino Real y Pujol, que probablemente no lo tienen pero sí deberían tener un CTA de email o formulario).

**Venues sin teléfono (22):**  
alvaro-obregon: salon-casa-angel, salon-los-laureles-ao  
azcapotzalco: salon-fiesta-royal-azc, salon-imperial-azc  
cuauhtemoc: salon-belle-epoque  
gustavo-a-madero: salon-diamante-gam, salon-majestic-gam, salon-premier-gam  
iztapalapa: jardin-real-iztapalapa, salon-crystal-iztapalapa, salon-de-fiestas-anely, salon-dvalle, salon-fenix-iztapalapa, salon-gran-diamante, salon-las-fuentes-iztapalapa, salon-platino, salon-victoria-iztapalapa  
magdalena-contreras: jardin-la-perita, salon-villa-contenta-mc  
tlahuac: salon-las-bugambilias-tlahuac  
tlalpan: salon-los-cedros-tlalpan  
xochimilco: salon-real-xochimilco  

**Acción:** Crear un proceso de validación de datos de contacto para cada venue. Opciones: a) contactar directamente al venue para obtener número, b) buscar en Google Maps la ficha del negocio, c) marcar el venue como "información pendiente" con un CTA de "Solicitar información" que redirija a un formulario de contacto de EVENTECH como intermediario.

---

### ⚠️ ESTRUCTURA #2 — Galería: 21 venues con solo 3 imágenes, 21 con 4

El mínimo recomendado es 6 imágenes para que un venue inspire confianza visual. Los venues con 3 imágenes incluyen algunos de alto perfil: Casino Español, Centro de Convenciones Tlatelolco, Palacio de Minería, Casa Lamm, Hotel Camino Real Polanco, Restaurante Pujol, San Ángel Inn, Centro Citibanamex. Curiosamente estos son venues premium que sí tienen imágenes de calidad disponibles públicamente — el problema es que no se integraron al directorio.

**Venues con 3 imágenes (21):**  
Loreto y Peña Pobre, Casa Goldsmith, Palacio de la Autonomía, Casa del Lago UNAM, Hacienda San Ángel, Terraza Perisur, Casino Español, Centro de Convenciones Tlatelolco, Palacio de Minería, Salón Iztapalapa Eventos, Club de Banqueros, Casa Lamm, Hotel Camino Real Polanco, Restaurante Pujol, Casa Awolly, Roma House, Terraza Roma, Jardín Escondido San Ángel, San Ángel Inn, Centro Citibanamex.

**Acción:** Para venues de perfil alto ($$$ y $$$$), buscar sus propias galerías de prensa o sus sitios web y licenciar/referenciar 3–6 fotos adicionales. Para venues de perfil bajo, incluir en el proceso de onboarding de fotografía mencionado en Crítico #1.

---

### ⚠️ ESTRUCTURA #3 — Diferencia de profundidad entre alcaldías

Hay una brecha significativa entre las alcaldías con contenido más completo y las más débiles:

**Álvaro Obregón y Azcapotzalco** son las mejor documentadas (score avg 7.4–7.5), con venues que tienen coordenadas, CP, teléfono, WhatsApp y galerías de 5–6 imágenes. La razón es que son de las primeras alcaldías trabajadas en el proyecto.

**Gustavo A. Madero** (19 venues, score avg 6.1) y **Milpa Alta** (4 venues, score avg 5.8) son las más deficientes. Gustavo A. Madero es crítico por volumen: es la segunda alcaldía con más venues (19) y tiene 12 venues sin coordenadas — exactamente donde la búsqueda local de nivel económico-popular es más competida y más valiosa.

---

### ⚠️ ESTRUCTURA #4 — Ausencia de Schema Markup en el `<head>`

El campo `rating` y `reviewCount` existen en todos los 168 MDs pero no se inyectan como `AggregateRating` en un `LocalBusiness` o `EventVenue` JSON-LD. Tampoco existe `FAQ Schema`. Esto significa que el directorio está dejando pasar rich results que Google otorga de forma gratuita cuando el markup es correcto.

**Schema mínimo recomendado por página de venue:**
```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EventVenue"],
  "name": "[nombre]",
  "address": { "@type": "PostalAddress", "streetAddress": "...", "postalCode": "...", "addressLocality": "CDMX", "addressCountry": "MX" },
  "geo": { "@type": "GeoCoordinates", "latitude": ..., "longitude": ... },
  "telephone": "...",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": 4.5, "reviewCount": 150 },
  "url": "https://eventech.mx/directorio/cdmx/[zona]/[slug]/",
  "image": "https://eventech.mx/images/venues/[slug]-hero.jpg"
}
```

El FAQSchema se agrega por separado como segundo objeto en el mismo `<script type="application/ld+json">`.

---

## 5. Análisis Individual por Alcaldía

---

### ÁLVARO OBREGÓN (10 venues | avg 7.4/10)

La alcaldía mejor trabajada del poniente. Kalesh Salón es el venue insignia del directorio (score 8/10, rating 4.8, 315 reseñas, 9 imágenes de galería declaradas, FAQs en plantilla). La principales oportunidades son:

- **Casa Ángel** (score ~6): Sin teléfono ni WhatsApp. Es el venue más accesible ($5K–$18K) y con el rating más bajo (4.0). Necesita refuerzo de contacto urgente y se beneficiaría de testimonios que respalden su propuesta de valor de precio y trato personal.
- **Los Laureles** (score ~6): Sin teléfono ni WhatsApp. Completar contacto.
- **Loreto y Peña Pobre** (score 7): Sin WhatsApp. Solo 3 imágenes. Es el venue más espectacular arquitectónicamente de la alcaldía y uno de los más impresionantes del directorio — el diferenciador de "fábrica de papel de 1580" es extraordinario. Necesita mínimo 6 imágenes (naves, chimeneas, jardín del río, eventos reales) y testimonios corporativos para activar su potencial.
- **Todos los venues**: Sin coordenadas 2 (Loreto, Casa Ángel — verificar si tienen en sus MDs).

**Prioridad de mejora:** 1) Casa Ángel contacto, 2) Loreto imágenes + WhatsApp, 3) FAQs en todos.

---

### AZCAPOTZALCO (8 venues | avg 7.5/10)

Segunda alcaldía mejor documentada. Todos tienen teléfono y la mayoría WhatsApp. Los dos venues sin WhatsApp (Fiesta Royal, Imperial) deben completarse.

**Fiesta Royal y Salón Imperial** son los únicos con gaps de contacto. Ambos son venues de nivel $$ con buen potencial de búsqueda ("salón de fiestas Azcapotzalco boda").

**La Industrial Eventos** merece atención especial: venue industrial reconvertida en zona norte — diferenciador fuerte similar a Loreto. Si tiene pocas fotos, priorizarla.

**Prioridad:** Completar contacto de Fiesta Royal e Imperial, luego galería.

---

### BENITO JUÁREZ (5 venues | avg 7.6/10)

Alcaldía bien documentada y con venues de alto perfil (Au Pied de Cochon con 892 reseñas, Centro de Convenciones Insurgentes). El venue **Jardín Nevado** y **Casa Goldsmith** (3 imágenes) necesitan galería ampliada. 

**Casa Goldsmith** es un venue boutique en Del Valle/Narvarte con fuerte demanda de bodas íntimas — su propuesta de escala pequeña merece un copy más trabajado y 3 imágenes adicionales.

**Restaurante Au Pied de Cochon** tiene el mayor reviewCount del directorio (892). Aprovechar esto añadiendo el schema de `AggregateRating` sería un win inmediato de SERP.

---

### CENTRO HISTÓRICO (2 venues | avg 7.5/10)

Solo 2 venues — **Casa de los Azulejos** y **Palacio de la Autonomía**. Ambos son venues icónicos con potencial de posicionamiento en búsquedas de alto valor ("venue histórico CDMX boda", "salón centro histórico evento corporativo").

**Palacio de la Autonomía** tiene solo 3 imágenes y sin WhatsApp. Dado su carácter patrimonial, es uno de los venues donde más impacto tiene una galería ampliada (6+ imágenes de sus murales, patio, cúpulas).

**Área de oportunidad:** Crear contenido editorial sobre la historia de cada venue — este tipo de contenido largo genera backlinks naturales y tiempo en página.

---

### COYOACÁN (9 venues | avg 7.8/10)

Mejor alcaldía del sur. **Hacienda San Ángel** (3 imágenes) y **Terraza Perisur** (3 imágenes) necesitan ampliar galería. 

**Casa del Lago UNAM** (3 imágenes) es un venue único — lago, árboles centenarios, entorno cultural del sur — con enorme potencial de diferenciación que una galería de 6+ fotos puede activar.

**Salón Encantados, Salón Jimmy, Salón Romanza** son venues de nivel $–$$ bien documentados; verificar que todos tengan WhatsApp activo.

---

### CUAJIMALPA (4 venues | avg 8.0/10)

La alcaldía con mejor score promedio. Pocos venues pero bien documentados. **Jardín Colonial, Jardín Los Bambús, Salón Los Colorines y Hacienda Cuajimalpa** cubren el rango $ a $$$.

La oportunidad en Cuajimalpa es diferente: no es completar datos faltantes sino profundizar el copy para búsquedas de nicho de la zona (Santa Fe, Interlomas, Bosques de las Lomas). Las palabras clave de proximidad a colonias premium son muy valiosas aquí.

---

### CUAUHTÉMOC (9 venues | avg 6.4/10)

Álcaldía con el mayor potencial desaprovechado. Tiene los venues más premium del directorio (Hotel Hilton, Casino Español, Palacio de Minería, Loft Escandón) pero con uno de los scores más bajos.

**Problemas principales:**
- **Salón Diamante Azul y Moriskos**: Sin coordenadas ni CP — completar urgente.
- **Casino Español, Palacio de Minería, Tlatelolco**: Sin WhatsApp — para venues institucionales, al menos un CTA de email o formulario.
- **Loft Escandón Industrial**: Con 678 reseñas (segundo más alto del directorio) — activar AggregateRating schema de inmediato.

El **Loft Escandón** y el **Palacio de Minería** son especialmente valiosos para búsquedas de eventos corporativos y culturales de alto ticket. Ampliar descripción con keywords corporativas ("evento empresarial CDMX", "venue para lanzamiento de producto", "espacio para convención").

---

### DEL VALLE (3 venues | avg 7.3/10)

**Casa del Sol, Salón Del Valle Eventos y Terrazas Del Valle** cubren bien el segmento medio de la zona sur-poniente. Sin issues críticos de contacto. Oportunidad en galería y en aprovechar la densidad de búsquedas de la zona ("salón Del Valle", "venue Insurgentes Sur").

---

### GUSTAVO A. MADERO (19 venues | avg 6.1/10)

**La alcaldía más crítica del directorio.** Es la segunda con más venues (19) y la que tiene más problemas acumulados: 12 sin coordenadas, 3 sin teléfono, 3 sin WhatsApp.

La demanda de búsqueda en GAM es altísima y de ticket accesible (bodas $–$$, XV años populares). Posicionarse aquí con listings completos tiene ROI alto porque la competencia de directorios rivales (Bodas.com.mx, Salones.mx) frecuentemente tiene datos desactualizados.

**Venues en peor estado (score 5/10):**
- jardín-el-roble, jardin-verali, los-ventanales-salon, salon-galaxia, salon-george-king, salon-los-arcos, salon-sarita, salon-sol, salon-tepeyac-inn, salon-villa-portilla

**Todos ellos comparten el mismo problema:** sin coordenadas, sin CP. La dirección está, pero falta geocodificarla. Esta es una tarea técnica de 2–3 horas que sube el score de 10 venues de 5/10 a 7/10 de forma instantánea.

**Salón Majestic GAM y Premier GAM**: Además de coordenadas, sin teléfono — prioridad alta.

---

### IZTACALCO (4 venues | avg 8.0/10)

Empata como la mejor alcaldía. Pocos venues, bien documentados. **Jardín Real de Oriente, Salón Cristal, Jardín Flamingos y Segundo Castillo** tienen datos completos.

Oportunidad: ampliar galería y agregar FAQs específicos del tipo de evento más buscado en Iztacalco (XV años, bodas de tamaño mediano $$ nivel).

---

### IZTAPALAPA (26 venues | avg 6.7/10)

**La alcaldía más grande del directorio (26 venues)** y la más importante por volumen de búsqueda. Iztapalapa tiene la mayor densidad de búsquedas de salones de fiestas en CDMX (nivel $–$$).

**Problemas:**
- 8 venues sin teléfono: crystal-iztapalapa, anely, dvalle, fenix-iztapalapa, gran-diamante, las-fuentes-iztapalapa, platino, victoria-iztapalapa
- 8 venues sin WhatsApp (los mismos anteriores + jardin-real-iztapalapa)
- 5 venues sin coordenadas: jardin-fenix, jardin-la-fuente, salon-julis, salon-las-hadas, salon-las-palmas

**Salón Versalles** es el venue más trabajado de la alcaldía (score 8, 198 reseñas, 6 imágenes, buena descripción). Puede servir de template para elevar los demás.

**Salones Florett** y **Salón La Cascada** son venues con potencial de diferenciación que merecen descripciones más específicas.

El conjunto de 26 venues en Iztapalapa, correctamente optimizados con coordenadas, contacto y schema markup, puede generar tráfico orgánico significativo de búsquedas como "salón de fiestas Iztapalapa", "salón para XV años Iztapalapa barato", "jardín de fiestas oriente CDMX".

---

### LOMAS CHAPULTEPEC (3 venues | avg 6.7/10)

**Hacienda de la Palma, Club de Banqueros y Museo Soumaya**. El Club de Banqueros aparece en dos alcaldías (también en Miguel Hidalgo) — verificar que el slug sea único y que no haya duplicación de índice.

Todos son venues de nivel $$$$. El **Museo Soumaya** como venue de eventos es un diferenciador brutal — pocos directorios lo listan. Ampliar descripción con el contexto cultural (colección de 66,000 piezas, arquitectura de Fernando Romero) y keywords corporativas de alta gama.

---

### MAGDALENA CONTRERAS (6 venues | avg 6.3/10)

**Jardin El Pinal y Salón La Pradera**: Sin coordenadas — geocodificar.  
**Jardin La Perita y Salon Villa Contenta**: Sin teléfono ni WhatsApp — contacto crítico.  

La Contreras tiene venues de jardín con entorno verde único — diferenciador de "naturaleza al sur de CDMX" que el copy debe explotar más (comparar con Santa Fe y Coyoacán).

---

### MIGUEL HIDALGO (3 venues | avg 7.3/10)

**Casa Lamm** (3 imágenes, sin WhatsApp) es el venue con mayor potencial desaprovechado: galería cultural de primer nivel en Colonia Roma con espacio arquitectónico extraordinario. Merece 6+ imágenes y un copy que posicione en búsquedas de "venue boutique CDMX" y "espacio cultural para eventos".

---

### MILPA ALTA (4 venues | avg 5.8/10)

La peor alcaldía junto con Venustiano Carranza. **Jardín México, Salón Faisanes y Salón Santa Martha** sin coordenadas, sin CP. **Salón Faisanes** tiene el reviewCount más bajo del directorio (52 reseñas).

Milpa Alta es geográficamente periférica y la demanda de búsqueda es más baja. Sin embargo, su característica de "entorno natural / zona rural de CDMX" es un diferenciador que, bien trabajado en el copy, puede atraer búsquedas de nicho (eventos al aire libre, fincas rurales CDMX).

---

### PEDREGAL (3 venues | avg 7.7/10)

**Jardín Pedregal Eventos, Jardín Pedregal y La Cantera**. Bien documentados. La Cantera tiene buena galería y copy. Área de mejora: FAQs sobre privacidad/exclusividad del venue (el Pedregal tiene perfil sociodemográfico que valora la discreción).

---

### POLANCO (8 venues | avg 6.9/10)

Alcaldía premium con score sorprendentemente bajo. El problema es que varios venues de lujo (Camino Real, Restaurante Pujol) no tienen WhatsApp (coherente con su perfil, pero necesitan un CTA alternativo claro).

**Four Seasons** (4.8, 428 reseñas) y **St. Regis** son los venues de mayor ticket del directorio. Solo 4 imágenes c/u — para venues $$$$, la galería es el principal factor de decisión. Necesitan 8–10 imágenes de alta calidad.

**Hotel W Mexico City** y **Hacienda de los Morales** son diferenciadores fuertes que merecen copy más profundo sobre su propuesta única (diseño vanguardista vs. tradición colonial, respectivamente).

**Azul Histórico Terraza** y **Salón Chapultepec Eventos** son los venues de nivel $$$–$$$$ más accesibles de Polanco — trabajar copy con keywords de "terraza Polanco eventos" y "salón Chapultepec boda".

---

### ROMA-CONDESA (6 venues | avg 7.7/10)

Buena alcaldía en general. **Casa Awolly, Roma House y Terraza Roma** tienen solo 3 imágenes. Son venues boutique con fuerte identidad de marca — el copy está bien pero la galería los limita.

**Hotel Carlota** y **Salon Prim** son los más completos. **Terraza Condesa** merece ampliar descripción con keywords específicos ("terraza Ámsterdam", "evento íntimo Condesa").

---

### SAN ÁNGEL (3 venues | avg 6.7/10)

**Hacienda Gogorron, Jardín Escondido y San Ángel Inn**. El San Ángel Inn es uno de los venues más icónicos de CDMX (bodas en el jardín del siglo XVII) — sin WhatsApp y con solo 3 imágenes. Esto es uno de los casos donde la brecha entre el potencial del venue y su presencia en el directorio es más grande.

**Jardín Escondido** también con 3 imágenes.

**Hacienda Gogorron** — verificar que el copy explote el diferenciador de entorno histórico.

---

### SANTA FE (4 venues | avg 7.5/10)

**Centro Citibanamex** (sin WhatsApp, 3 imágenes) es el venue de convenciones más grande del directorio con capacidad para miles de personas. El copy es correcto pero la galería es insuficiente para un venue de esta escala.

**Hotel JW Marriott** y **Foro Kaluz** bien documentados. **Jardín Santa Fe Eventos** cubre el segmento $$ para eventos medianos en la zona corporativa.

---

### TLÁHUAC (5 venues | avg 6.4/10)

**Salon Velsy y Salon Vicky**: Sin coordenadas — geocodificar.  
**Salon Las Bugambilias**: Sin teléfono ni WhatsApp.  

Tláhuac tiene una demanda de búsqueda similar a Iztapalapa en el segmento económico-popular. **Salón Velsy** con paquetes todo-incluido es el venue más diferenciado — comunicar mejor ese beneficio (organizador sin estrés).

---

### TLALPAN (11 venues | avg 7.6/10)

Tercera alcaldía más grande (11 venues) y bien documentada. **Salón Partenón** (445 reseñas, cuarto del directorio) es el venue de referencia de la zona sur.

**Salon Los Cedros**: Sin teléfono ni WhatsApp — completar.  
**Hacienda de Tlalpan y Hacienda Tlalpan Eventos**: Verificar que no sean duplicados — dos venues con nombre similar en la misma alcaldía.

El copy de los venues de Tlalpan puede mejorar explotando el entorno de "sur verde de CDMX", cercanía al bosque y las características coloniales de la zona.

---

### VENUSTIANO CARRANZA (4 venues | avg 5.8/10)

La peor alcaldía junto con Milpa Alta. **Salon Danny, Salon Marisol, Salon Memito**: Sin coordenadas, sin CP. **Crystal Palace VC**: Verificar datos.

Son venues de nivel $–$$ en zona oriente con alta demanda. El principal gap es puramente técnico (coordenadas) — una vez geocodificados suben a 7/10 automáticamente.

---

### XOCHIMILCO (9 venues | avg 6.7/10)

**Jardín del Arenal, Jardín La Caleta y Salón Xochitl**: Sin coordenadas, sin CP.

Xochimilco tiene una oportunidad de diferenciación única por su entorno lacustre y cultural (trajineras, canales, zona patrimonial UNESCO). Ningún venue del directorio explota esta proximidad en su copy. Keywords de oportunidad: "venue cerca de Xochimilco", "salón con trajineras CDMX", "evento jardín Xochimilco".

**Salon Real Xochimilco**: Sin teléfono ni WhatsApp — completar urgente.

**Nativitas** — verificar qué tipo de venue es y completar datos.

---

## 6. Plan de Acción Priorizado

### FASE 1 — Semana 1–2 (impacto inmediato, esfuerzo bajo)

**Objetivo: Subir score base de los 30 venues más incompletos**

1. **Geocodificar 30 venues** sin coordenadas: buscar dirección en Google Maps, copiar lat/lng al MD. ~3 horas. Sube score de 10 venues GAM de 5→7, 4 VC de 5→7, etc.

2. **Completar teléfono y WhatsApp** de los 22+33 venues faltantes. Buscar en Google Maps (ficha del negocio → teléfono). ~4 horas.

3. **Implementar LocalBusiness + AggregateRating JSON-LD** en el layout de venue pages usando los campos `rating` y `reviewCount` ya existentes en todos los MDs. Trabajo de frontend, ~4 horas de desarrollo. Impacto: estrellas en SERP para los 168 venues.

### FASE 2 — Semana 3–4 (impacto SEO estructural)

4. **Agregar campo `faqs`** al content schema de venues. Definir 4–5 FAQs genéricas por tipo de venue (salon, jardin, hotel, hacienda) y personalizarlas por venue. Implementar FAQ Schema en el `<head>`. Trabajo: 1 día de desarrollo + contenido.

5. **Agregar campo `testimonials`** al schema. Poblar con 3 testimonios reales por venue. Priorizar los 40 featured venues primero. Implementar Review Schema.

6. **Placeholder de imagen inteligente**: Implementar `onerror` en el componente de galería para mostrar imagen genérica por tipo cuando la galería foto no existe. Esto soluciona visualmente el problema de las 755 imágenes faltantes mientras se resuelve la fotografía real.

### FASE 3 — Mes 2 (impacto de conversión y diferenciación)

7. **Campaña de fotografía** para los 40 venues featured. Mínimo 6 fotos reales por venue. Puede ser: a) solicitar fotos al venue directamente, b) scraping ético de sus redes sociales (con permiso), c) session fotográfica propia.

8. **Ampliar galería** de los 42 venues con 3–4 imágenes a mínimo 6, priorizando: San Ángel Inn, Casa Lamm, Loreto y Peña Pobre, Palacio de Minería, Casino Español, Museo Soumaya, Hotel Camino Real, Pujol.

9. **Enriquecer copy** de los venues premium ($$$, $$$$) con contenido editorial sobre historia, arquitectura, reconocimientos y propuesta de valor única.

### FASE 4 — Mes 3 (escala y contenido long-tail)

10. **Contenido editorial por venue** de alto perfil: artículos de 800–1,200 palabras sobre "Bodas en [venue]", "Eventos corporativos en [venue]". Link building natural y señal de autoridad temática.

11. **Validación de datos de contacto** con los venues: crear un proceso de actualización semestral para asegurar que teléfonos, WhatsApp y precios sigan siendo vigentes.

12. **Estructura de upgrades de membresía** basada en los niveles de completitud del listing: venues con ficha completa (coordenadas, contacto, galería, testimonios, FAQs) reciben badge "Listing Premium EVENTECH" — incentivo de calidad para los venues.

---

## 7. Indicadores de Seguimiento

| KPI | Estado actual | Meta 30 días | Meta 90 días |
|---|---|---|---|
| Score promedio global | 6.9/10 | 7.5/10 | 8.5/10 |
| Venues con coordenadas | 138/168 (82%) | 168/168 (100%) | 168/168 |
| Venues con WhatsApp | 135/168 (80%) | 160/168 (95%) | 168/168 |
| Imágenes de galería existentes | 168/923 (18%) | 300/923 (33%) | 600/923 (65%) |
| Venues con JSON-LD activo | 0/168 (0%) | 168/168 (100%) | 168/168 |
| Venues con FAQs | 0/168 (0%) | 40/168 (24%) | 168/168 |
| Venues con testimonios | 0/168 (0%) | 40/168 (24%) | 120/168 |

---

## Apéndice A — Venues con score 5/10 (prioridad máxima)

Todos los siguientes venues comparten el mismo perfil de gaps: sin coordenadas, sin CP, sin testimonios, sin FAQs. Resolver coordenadas y CP sube automáticamente a 7/10.

| Venue | Alcaldía | Gaps adicionales |
|---|---|---|
| Salón Diamante Azul | Cuauhtémoc | coords, CP |
| Salón Moriskos | Cuauhtémoc | coords, CP |
| Jardín El Roble | Gustavo A. Madero | coords, CP |
| Jardín Veralí | Gustavo A. Madero | coords, CP |
| Los Ventanales | Gustavo A. Madero | coords, CP |
| Salón Galaxia | Gustavo A. Madero | coords, CP |
| Salon George King | Gustavo A. Madero | coords, CP |
| Salón Los Arcos | Gustavo A. Madero | coords, CP |
| Salón Sarita | Gustavo A. Madero | coords, CP |
| Salón Sol | Gustavo A. Madero | coords, CP |
| Salón Tepeyac Inn | Gustavo A. Madero | coords, CP |
| Salón Villa Portilla | Gustavo A. Madero | coords, CP |
| Jardín Fénix | Iztapalapa | coords, CP |
| Jardín La Fuente | Iztapalapa | coords, CP |
| Salón Julis | Iztapalapa | coords, CP |
| Salón Las Hadas | Iztapalapa | coords, CP |
| Salón Las Palmas | Iztapalapa | coords, CP |
| Jardín El Pinal | Magdalena Contreras | coords, CP |
| Salón La Pradera | Magdalena Contreras | coords, CP |
| Jardín México | Milpa Alta | coords, CP |
| Salón Faisanes | Milpa Alta | coords, CP |
| Salón Santa Martha | Milpa Alta | coords, CP |
| Salón Velsy | Tláhuac | coords, CP |
| Salón Vicky | Tláhuac | coords, CP |
| Salón Danny | Venustiano Carranza | coords, CP |
| Salón Marisol | Venustiano Carranza | coords, CP |
| Salón Memito | Venustiano Carranza | coords, CP |
| Jardín del Arenal | Xochimilco | coords, CP |
| Jardín La Caleta | Xochimilco | coords, CP |
| Salón Xochitl | Xochimilco | coords, CP |

---

*Reporte generado por EVENTECH Internal — Claude AI Analysis — 30 jun 2026*
