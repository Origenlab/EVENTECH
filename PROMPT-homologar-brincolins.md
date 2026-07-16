# Homologar BRINCOLINS a la fuente de verdad de precios

## Contexto

`brincolins.com` e `inflablesparafiestas.com.mx` (INFLAPY) son sitios hermanos: mismo teléfono (**55 3128 1706**) y mismas tres sucursales (Masaryk 111, Reforma 600, Magnocentro 8). Ambos publican **el mismo catálogo de 8 inflables**.

`eventech.mx` los presenta como aliados operadores y enlaza a los dos sitios desde sus páginas L4. Hoy, un cliente puede cotizar un Barco Pirata en $1,800 en eventech, hacer clic al link del aliado y verlo en $2,500. Eso hay que cerrarlo.

**Decisión del DG (Frank), 15-jul-2026:** los precios reales son los de **inflablesparafiestas.com.mx**.

## Fuente de verdad

`https://inflablesparafiestas.com.mx/catalogo/` — es **la única** página de INFLAPY que publica precio por modelo.

Ojo con esto, porque es fácil equivocarse:
- Las páginas de categoría (`/inflables-chicos/`, `/inflables-medianos/`, `/inflables-grandes/`) solo publican **pisos** ("desde $1,700"), no precio por modelo.
- Las **fichas de producto no traen precio** en ningún lado.
- Si lees los pisos y los cruzas con el nav de BRINCOLINS, vas a concluir mal. Ve a `/catalogo/` directo.

Precios verificados el 15-jul-2026 (y ya homologados en el data file de eventech, 8/8 exacto):

| Modelo | Precio correcto |
|---|---|
| Mini Castillo | $800 |
| Dragones Rojos | $1,200 |
| Castillo de Princesas | $1,200 |
| Mini Jungla | $1,300 |
| Gusanitos | $1,350 |
| Barco Pirata | $1,800 |
| Extremo | $1,900 |
| Castillo Blanco | $1,700 |

---

## BLOQUE A — Cambios mecánicos de precio (hazlos, no preguntes)

Cinco de los ocho modelos están fuera de línea en brincolins.com:

| Modelo | Dice hoy | Debe decir |
|---|---|---|
| Mini Jungla | $1,200 | **$1,300** |
| Gusanitos | $1,200 | **$1,350** |
| Barco Pirata | $2,500 | **$1,800** |
| Extremo | $3,000 | **$1,900** |
| Castillo Blanco | $2,800 | **$1,700** |

Correctos, no los toques: Mini Castillo $800, Dragones Rojos $1,200, Castillo de Princesas $1,200.

### Dónde aparecen (barrer todo esto, no solo el catálogo)

1. **Menú desplegable "Inflables"** — header desktop y móvil. Los 8 llevan precio pegado al nombre.
2. **`/inflables/`** — tarjetas del catálogo.
3. **`/inflables/{slug}/`** — las 8 fichas de producto.
4. **`/precios/`** — si existe, revisar completa.
5. **FAQ global** (se repite en varias páginas, incluida `/nosotros/`): *"Los inflables medianos —Dragones Rojos, Castillo de Princesas, Mini Jungla y Gusanitos— desde $1,200 MXN. El Barco Pirata desde $2,500 MXN y el Circuito Extremo desde $3,000 MXN."* → hay que reescribirla: los medianos ya no arrancan todos en $1,200 (van de $1,200 a $1,350) y los grandes arrancan en **$1,700**, no en $2,500.
6. **Formulario de cotización** — el `<select>` "¿Qué inflable te interesa?" trae el precio en cada `<option>`. Aparece en varias páginas.
7. **Metas y titles** — cualquiera que diga "desde $X".
8. **JSON-LD** — `Product` / `Offer` / `AggregateOffer` con `price`, `lowPrice`, `highPrice`.
9. **Blog** — buscar `2,500`, `3,000`, `2,800` en todos los posts.
10. **Textos sueltos** — cualquier "desde $2,500" en copy de secciones.

### Rango del catálogo

Con los precios correctos el rango pasa a ser **$800 – $1,900** (antes, con los viejos, llegaba a $3,000). Actualizar cualquier `priceRange`, `lowPrice`/`highPrice` y todo copy que diga "desde $800 hasta $X".

---

## BLOQUE B — Lo que se rompe al cambiar los precios (recalcular)

Esto es lo que se suele olvidar: los paquetes de `/servicios/paquetes-de-fiesta/` están construidos **encima** de los precios individuales.

Paquetes actuales:
- **Básico** $2,800 — hasta 30 invitados / 4 hrs — "Ahorro del 15% vs individual"
- **Premium** $4,500 — hasta 50 invitados / 6 hrs — "Ahorro del 20% vs individual"
- **VIP** $6,800 — hasta 80 invitados / 8 hrs — "Ahorro del 30% vs individual"

Dos problemas:

1. **Los porcentajes de ahorro ya no cuadran.** Se calcularon contra un Barco Pirata de $2,500 y un Extremo de $3,000. Si el inflable ahora vale $1,800/$1,900, el "ahorro del 30%" del VIP es aritmética que ya no da. Hay que **recalcular los tres porcentajes** contra los precios nuevos, o quitar el claim.

2. **El Básico cuesta $2,800 y el Castillo Blanco ahora cuesta $1,700.** Revisar que ningún paquete quede en un precio absurdo frente a la suma de sus partes — un paquete que sale más caro que rentar todo por separado es peor que no tener paquete.

**No inventes los precios nuevos de paquete.** Recalcula los porcentajes si el precio del paquete se queda igual; si hay que mover el precio del paquete, eso lo decide el DG. Pregunta.

---

## BLOQUE C — Contradicciones entre las dos marcas: PREGUNTA, NO ADIVINES

Esto **no** son bugs que puedas arreglar solo. Son hechos de negocio que solo el DG sabe. Preséntaselos y espera respuesta antes de tocar una línea.

### C1. Fecha de fundación (el más grave)

| | INFLAPY | BRINCOLINS |
|---|---|---|
| Fundación | **1994** | **2005** |
| Antigüedad | "30 años" | "+20 años" |

Mismo teléfono. Mismas tres sucursales. Las dos historias no pueden ser ciertas a la vez para la misma operación, y eventech.mx ya publica la versión de 1994 con link a INFLAPY.

BRINCOLINS además tiene un timeline completo (2005 fundación → 2010 diez inflables → 2015 cinco mil fiestas → 2020 protocolos → 2024 quince modelos) que habría que reescribir entero si la fecha cambia.

**Pregunta al DG:** ¿qué son BRINCOLINS e INFLAPY entre sí — misma empresa con dos marcas, dos empresas aliadas, o una marca nueva sobre una operación vieja? De ahí sale qué fecha va en cada sitio.

### C2. Tamaño de la flota

INFLAPY dice "**50+ modelos**". BRINCOLINS dice "**más de 15 modelos**". Pero ambos publican el mismo catálogo de **8**. Los tres números no pueden ser correctos.

### C3. Duración de la renta

INFLAPY: **4 a 6 horas**. BRINCOLINS: **hasta 8 horas**, y usa 4/6/8 hrs como escalón de sus paquetes.

Si es el mismo equipo con el mismo inflable, ¿cuál es la duración real? Nota: el data file de eventech dice 4–6 hrs, así que si la buena es 8, hay que avisar para corregir eventech también.

### C4. Espacio del Circuito Extremo

BRINCOLINS: *"el Circuito Extremo al menos **14×5 metros**"*.
INFLAPY: el Extremo mide **7×4 m** y pide **8×5 m** de espacio.

14 metros es casi el doble. Uno de los dos está mal y es un dato operativo — con ese número un cliente descarta el inflable creyendo que no le cabe, o lo aparta y el día del evento no entra.

### C5. Volumen de eventos (contradicción interna de INFLAPY, para reportar)

El `/nosotros/` de INFLAPY dice "**+50,000 celebraciones**" y "200,000 familias". Su propio footer dice "**Más de 500 eventos exitosos**". Dos órdenes de magnitud de diferencia, en el mismo sitio.

BRINCOLINS dice "+500 eventos **al año**" y "5,000 fiestas para 2015" — internamente coherente.

En eventech decidimos no citar ninguna de las cifras de volumen de INFLAPY por esto. Si van a homologar, hay que definir una cifra real y usarla en los dos sitios (o quitarla).

---

## Qué SÍ está bien y no hay que tocar

Para que no se vaya de más:

- **El data file de eventech ya está correcto.** 8/8 contra INFLAPY. No lo cambies.
- Mini Castillo, Dragones Rojos y Castillo de Princesas ya cuadran en los dos sitios.
- Los pisos por categoría de INFLAPY ($800 / $1,200 / $1,700) son correctos y consistentes con su `/catalogo/`.
- Seguro de responsabilidad civil, anticipo 50%, reagendar sin costo por lluvia, cancelación >48h con 100% de reembolso: coherentes, déjalos.
- La cobertura de BRINCOLINS al norte y oriente del Edomex (Ecatepec, Cuautitlán Izcalli, Coacalco, Neza) es un diferenciador real frente a INFLAPY, que solo cubre el poniente. **No lo borres al homologar** — es lo que hace valiosa a la marca.

---

## Verificación antes de cerrar

1. `grep -rn "2,500\|3,000\|2,800" src/` → cero resultados en contexto de precio.
2. Los 8 modelos con el mismo precio en: nav, catálogo, ficha, FAQ, `<select>` del form y JSON-LD. Cuadrar los seis lugares, no solo el catálogo.
3. Rango del sitio = $800 – $1,900 en todo `priceRange` / `lowPrice` / `highPrice`.
4. Validar el JSON-LD en el Rich Results Test.
5. **Cruce final contra la fuente:** abrir `https://inflablesparafiestas.com.mx/catalogo/` y `https://brincolins.com/inflables/` lado a lado. Los 8 precios deben coincidir uno a uno.
6. Auditar sobre `dist/` después del build, no sobre `src/` — sobre `src/` salen falsos negativos.
7. Los porcentajes de ahorro de los paquetes: hacer la aritmética explícita y enseñarla.

## Entregable

Al terminar, reporta:
- Tabla de qué cambió, dónde y cuántas ocurrencias por archivo.
- La aritmética de los porcentajes de ahorro recalculados.
- **Las respuestas del DG a los puntos C1–C5**, o la lista de qué quedó pendiente por falta de respuesta. No cierres C1–C5 adivinando.
