/**
 * ─── Catálogo de Inflables Infantiles (flota real EVENTECH) ───
 * Fuente única para el hub L4 (/servicios/inflables/juegos-infantiles/) y las
 * fichas L5 dinámicas ([slug]/index.astro). 20 inflables reales con imágenes
 * propias en /public/images/inflables/juegos-infantiles/{slug}/.
 *
 * - Los 8 "documentados" (estudio Etapa 1) llevan medidas/precio reales.
 * - Los 12 restantes llevan copy profesional y specs APROXIMADAS (marcadas
 *   "aprox.") + precio "Cotizar"; el cliente confirma medidas y tarifa exactas.
 */

export type Cat = "chico" | "mediano" | "grande";

export interface Inflable {
  slug: string;
  name: string;
  cat: Cat;
  badge: string;
  price: string;        // "Desde $1,200" | "Cotizar"
  photos: number;       // nº de fotos disponibles ({slug}-...-NN.avif)
  excerpt: string;      // tarjeta del hub
  specsLine: string[];  // chips cortos en la tarjeta
  lead: string;         // L5: frase destacada
  body1: string;        // L5: párrafo 1 (admite <strong>/<a>)
  body2: string;        // L5: párrafo 2
  specs: { label: string; value: string }[]; // L5: tabla
}

export const CAT_LABEL: Record<Cat, string> = {
  chico: "Chico",
  mediano: "Mediano",
  grande: "Grande",
};

export const INFLABLES: Inflable[] = [
  // ───────────────────────── DOCUMENTADOS (8) ─────────────────────────
  {
    slug: "mini-castillo", name: "Mini Castillo", cat: "chico", badge: "Para bebés", price: "Desde $800", photos: 5,
    excerpt: "El inflable más compacto y seguro: paredes acolchonadas y 2 m de altura. El único que cabe en departamentos y terrazas para primeros cumpleaños y bautizos.",
    specsLine: ["2 × 2 × 2 m", "1–4 años", "3–4 niños"],
    lead: "Cuando los invitados son bebés y niños de 1 a 4 años, el tamaño y las paredes blandas importan más que la altura o la velocidad.",
    body1: "El <strong>Mini Castillo</strong> mide 2 × 2 × 2 m: cabe en una sala, terraza o cuarto despejado y funciona perfecto para primeros cumpleaños en departamento y bautizos. Paredes acolchonadas sin bordes rígidos y altura reducida para que la supervisión sea total.",
    body2: "Llega listo, lo instalamos con anclaje seguro en unos 15 minutos y al final lo recogemos. Cada inflable se <strong>lava, desinfecta y revisa antes de cada renta</strong>. Combínalo con nuestras <a href=\"/servicios/mobiliario/\">mesas y sillas infantiles</a> para una zona de fiesta completa.",
    specs: [
      { label: "Categoría", value: "Inflable chico (bebés y niños pequeños)" },
      { label: "Dimensiones", value: "2 × 2 × 2 m" },
      { label: "Edad recomendada", value: "1 a 4 años" },
      { label: "Capacidad", value: "3 a 4 niños" },
      { label: "Espacio requerido", value: "3 × 3 m · apto interiores (techo ≥ 2.5 m)" },
      { label: "Incluye", value: "Entrega, instalación, soplador y recolección" },
      { label: "Higiene", value: "Lavado y desinfección antes de cada renta" },
    ],
  },
  {
    slug: "dragones-rojos", name: "Dragones Rojos", cat: "mediano", badge: "El más rentado", price: "Desde $1,200", photos: 6,
    excerpt: "Dos dragones de 3 m, resbaladilla integrada de alta velocidad y mallas de seguridad en todos los costados. El favorito para cumpleaños de 4 a 10 años y kermeses.",
    specsLine: ["4 × 4 × 3 m", "4–10 años", "5–7 niños"],
    lead: "Es el modelo que más nos piden: combina presencia visual con diversión real para fiestas de 4 a 10 años.",
    body1: "Los <strong>dos dragones de 3 metros</strong> en rojo y dorado custodian el castillo y se ven desde lejos, mientras la <strong>resbaladilla integrada de alta velocidad</strong> y la amplia zona de salto mantienen ocupados a 5 a 7 niños a la vez. Fabricado en PVC de grado comercial de 18 oz resistente a rasgaduras.",
    body2: "Lleva <strong>mallas de seguridad en todos los costados</strong> para que los papás vean a los niños en todo momento, y piso acolchonado. Lo instalamos con anclaje profesional en unos 20 minutos sobre pasto, tierra o concreto.",
    specs: [
      { label: "Categoría", value: "Inflable mediano (el más rentado)" },
      { label: "Dimensiones", value: "4 × 4 × 3 m" },
      { label: "Edad recomendada", value: "4 a 10 años" },
      { label: "Capacidad", value: "5 a 7 niños" },
      { label: "Incluye", value: "Dos dragones de 3 m, resbaladilla y mallas de seguridad" },
      { label: "Material", value: "PVC grado comercial 18 oz" },
      { label: "Espacio requerido", value: "5 × 5 m" },
    ],
  },
  {
    slug: "castillo-princesas", name: "Castillo de Princesas", cat: "mediano", badge: "Fiestas de niñas", price: "Desde $1,200", photos: 6,
    excerpt: "Castillo de cuento con torres rosa y turquesa y resbaladilla incluida. El fondo perfecto para fotos y temáticas de princesas, hadas y Frozen.",
    specsLine: ["4 × 4 × 3 m", "3–10 años", "5–7 niños"],
    lead: "El sueño de toda pequeña princesa hecho realidad — y el inflable más fotografiado de las fiestas de niñas.",
    body1: "Castillo en tonos <strong>rosa y turquesa</strong> con torres decorativas y <strong>resbaladilla integrada incluida</strong>. Es el favorito para fiestas de princesas, hadas o cualquier temática donde quieras que la decoración combine. Edad recomendada: 3 a 10 años.",
    body2: "Lleva mallas de seguridad perimetrales y se instala en unos 20 minutos. Las torres rosas y turquesas crean un <strong>fondo espectacular para fotos</strong>. Combínalo con nuestra <a href=\"/servicios/iluminacion/decorativa/\">iluminación decorativa</a> para una atmósfera mágica.",
    specs: [
      { label: "Categoría", value: "Inflable mediano (temático)" },
      { label: "Dimensiones", value: "4 × 4 × 3 m" },
      { label: "Edad recomendada", value: "3 a 10 años" },
      { label: "Capacidad", value: "5 a 7 niños" },
      { label: "Incluye", value: "Torres rosa/turquesa, resbaladilla y mallas de seguridad" },
      { label: "Espacio requerido", value: "5 × 5 m · en salón, techo ≥ 3.5 m" },
    ],
  },
  {
    slug: "mini-jungla", name: "Mini Jungla", cat: "mediano", badge: "Aventura safari", price: "Desde $1,200", photos: 6,
    excerpt: "Temática de selva con figuras de animales y zonas para esconderse. Funciona como circuito de exploradores, ideal para fiestas safari y al aire libre.",
    specsLine: ["4 × 4 × 3 m", "3–10 años", "5–7 niños"],
    lead: "Transporta a los niños a una aventura selvática — ideal para pequeños exploradores y fiestas al aire libre.",
    body1: "Inflable con <strong>temática de selva</strong>, figuras de animales y zonas para esconderse. Los niños lo usan como circuito más que como brincolín, perfecto para fiestas safari, de exploradores o de animales. Edad recomendada: 3 a 10 años.",
    body2: "Mide 4 × 4 × 3 m, recibe de 5 a 7 niños y se instala en unos 15 minutos —la instalación más rápida del catálogo—. Cada renta incluye entrega, anclaje profesional, soplador y recolección.",
    specs: [
      { label: "Categoría", value: "Inflable mediano (temático safari)" },
      { label: "Dimensiones", value: "4 × 4 × 3 m" },
      { label: "Edad recomendada", value: "3 a 10 años" },
      { label: "Capacidad", value: "5 a 7 niños" },
      { label: "Incluye", value: "Figuras temáticas, zonas de juego y mallas de seguridad" },
      { label: "Espacio requerido", value: "5 × 5 m" },
    ],
  },
  {
    slug: "gusanitos", name: "Gusanitos", cat: "mediano", badge: "Tropical", price: "Desde $1,200", photos: 6,
    excerpt: "El más colorido y fotografiado: gusanitos verde y morado con palmeras y amplia zona de salto. Combina con cualquier temática tropical o hawaiana.",
    specsLine: ["4 × 4 × 3 m", "4–10 años", "5–7 niños"],
    lead: "El brincolín más colorido y fotografiado del catálogo — funciona para cualquier temática tropical.",
    body1: "Inflable tropical con <strong>gusanitos verde y morado</strong>, palmeras decorativas y amplia zona de salto en colores vibrantes (verde, morado, amarillo y azul). Perfecto para cumpleaños, fiestas de verano, hawaianas y pool parties.",
    body2: "Mide 4 × 4 × 3 m y recibe de 5 a 7 niños. Al no tener personaje de franquicia, <strong>combina con cualquier decoración</strong>. Incluye entrega, instalación con anclaje, soplador y recolección.",
    specs: [
      { label: "Categoría", value: "Inflable mediano (tropical)" },
      { label: "Dimensiones", value: "4 × 4 × 3 m" },
      { label: "Edad recomendada", value: "4 a 10 años" },
      { label: "Capacidad", value: "5 a 7 niños" },
      { label: "Colores", value: "Verde, morado, amarillo y azul" },
      { label: "Espacio requerido", value: "5 × 5 m" },
    ],
  },
  {
    slug: "barco-pirata", name: "Barco Pirata", cat: "grande", badge: "Mayor impacto", price: "Desde $2,500", photos: 5,
    excerpt: "Galeón de 7 m con mástil, velas y tobogán de alta velocidad en la popa. La atracción central de cualquier fiesta grande — hasta 15 niños a la vez.",
    specsLine: ["7 × 5 × 4 m", "3–12 años", "10–15 niños"],
    lead: "Nuestro inflable más épico y aventurero — el mástil de 4 m da la sensación real de estar dentro de un barco.",
    body1: "Galeón pirata de <strong>7 metros de largo</strong> con mástil, velas y un <strong>tobogán de alta velocidad en la popa</strong>. Es la atracción que más impacta a la entrada de la fiesta y recibe de 10 a 15 niños al mismo tiempo. Funciona desde los 3 años.",
    body2: "Necesita jardín o patio amplio (espacio libre de 8 × 6 m) y entrega con camión grande. Lleva redes y paredes laterales de seguridad, anclaje reforzado y se instala en unos 30 minutos.",
    specs: [
      { label: "Categoría", value: "Inflable grande (atracción central)" },
      { label: "Dimensiones", value: "7 × 5 × 4 m" },
      { label: "Edad recomendada", value: "3 a 12 años" },
      { label: "Capacidad", value: "10 a 15 niños" },
      { label: "Incluye", value: "Mástil, velas, tobogán y redes de seguridad" },
      { label: "Espacio requerido", value: "8 × 6 m · uso exterior" },
    ],
  },
  {
    slug: "extremo", name: "Extremo", cat: "grande", badge: "Competencias", price: "Desde $3,000", photos: 6,
    excerpt: "Circuito de obstáculos con muros de escalada, túneles y tobogán final, en doble carril para carreras. Ideal para kermeses, eventos escolares y corporativos.",
    specsLine: ["12 × 4 × 3 m", "6+ años", "Doble carril"],
    lead: "El inflable más grande e impactante del catálogo — el doble carril convierte cualquier fiesta en un torneo de velocidad.",
    body1: "<strong>Circuito de obstáculos</strong> con muros para escalar, túneles, barreras y tobogán final, en diseño de <strong>doble carril</strong> para carreras simultáneas. Lo usamos mucho en kermeses, fiestas de niños grandes y team building corporativo. Edad ideal: 6 años en adelante.",
    body2: "Mide hasta 12 metros de largo, requiere espacio amplio (13–14 × 6 m) y entrega con camión grande. Lleva anclaje reforzado y monitor para organizar los turnos. Apto para adolescentes y adultos.",
    specs: [
      { label: "Categoría", value: "Inflable grande (circuito de obstáculos)" },
      { label: "Dimensiones", value: "12 × 4 × 3 m" },
      { label: "Edad recomendada", value: "6 años en adelante (incluye adultos)" },
      { label: "Capacidad", value: "Doble carril · 60–120 personas/hora por turnos" },
      { label: "Incluye", value: "Muros, túneles, tobogán y monitor" },
      { label: "Espacio requerido", value: "13–14 × 6 m · uso exterior" },
    ],
  },
  {
    slug: "castillo-blanco", name: "Castillo Blanco", cat: "grande", badge: "Eventos formales", price: "Cotizar", photos: 4,
    excerpt: "Castillo de gran formato para eventos especiales. Ideal cuando quieres una atracción grande con presencia para bodas, XV años y celebraciones formales.",
    specsLine: ["Gran formato", "Todas las edades", "Cotizar medidas"],
    lead: "Una atracción de gran formato para los eventos que quieren impactar — apto para niños y adultos.",
    body1: "Castillo inflable de gran formato pensado para eventos especiales y celebraciones formales. Recibe a niños y adultos y funciona como pieza central en bodas, XV años, primeras comuniones y eventos corporativos.",
    body2: "Requiere espacio amplio y entrega coordinada con el resto del montaje. <strong>Cotiza medidas exactas y disponibilidad por WhatsApp</strong> — te asesoramos según tu venue y el tipo de evento.",
    specs: [
      { label: "Categoría", value: "Inflable grande (eventos formales)" },
      { label: "Dimensiones", value: "Gran formato (cotiza medidas exactas)" },
      { label: "Edad recomendada", value: "Todas las edades" },
      { label: "Capacidad", value: "Alta (cotiza según evento)" },
      { label: "Ideal para", value: "Bodas, XV años, comuniones, corporativos" },
      { label: "Precio", value: "Cotiza por WhatsApp" },
    ],
  },
  // ───────────────────────── FLOTA ADICIONAL (12) ─────────────────────────
  // Specs aprox. — el cliente confirma medidas y precio exactos.
  {
    slug: "mini-princess", name: "Mini Princess", cat: "chico", badge: "Princesas mini", price: "Cotizar", photos: 6,
    excerpt: "Castillo de princesas en versión compacta, en tonos rosa y pastel. Ideal para las princesas más pequeñas y fiestas en espacios reducidos.",
    specsLine: ["Compacto", "1–6 años aprox.", "3–5 niños"],
    lead: "La versión pequeña del castillo de princesas — perfecta para las más chiquitas y espacios reducidos.",
    body1: "Castillo de princesas <strong>en formato compacto</strong>, en tonos rosa y pastel. Pensado para niñas pequeñas (aprox. 1 a 6 años) y fiestas íntimas en casa, departamento o salón pequeño.",
    body2: "Llega listo, lo instalamos con anclaje y al final lo recogemos. <strong>Cotiza medidas exactas y precio por WhatsApp</strong>; te confirmamos si entra en tu espacio.",
    specs: [
      { label: "Categoría", value: "Inflable chico (temático princesas)" },
      { label: "Tamaño", value: "Compacto (medidas aprox., cotiza exactas)" },
      { label: "Edad recomendada", value: "1 a 6 años (aprox.)" },
      { label: "Capacidad", value: "3 a 5 niños (aprox.)" },
      { label: "Ideal para", value: "Fiestas de niñas pequeñas, espacios reducidos" },
      { label: "Precio", value: "Cotiza por WhatsApp" },
    ],
  },
  {
    slug: "igloo-interactivo", name: "Igloo Interactivo", cat: "mediano", badge: "Juegos dentro", price: "Cotizar", photos: 3,
    excerpt: "Iglú inflable con juegos interactivos en su interior. Más que brincar: los niños exploran, trepan y se deslizan dentro de un domo cerrado y seguro.",
    specsLine: ["Domo interactivo", "3–10 años aprox.", "5–7 niños"],
    lead: "Más que un brincolín: un domo cerrado con juegos interactivos para explorar, trepar y deslizarse.",
    body1: "El <strong>Igloo Interactivo</strong> es un domo inflable con obstáculos y juegos en su interior. Los niños entran, exploran y se mantienen ocupados con distintas actividades dentro de un espacio cerrado y supervisado.",
    body2: "Ideal para fiestas de 3 a 10 años. Incluye entrega, instalación con anclaje, soplador y recolección. <strong>Cotiza medidas y precio exactos por WhatsApp</strong>.",
    specs: [
      { label: "Categoría", value: "Inflable mediano (interactivo)" },
      { label: "Tamaño", value: "Domo (medidas aprox., cotiza exactas)" },
      { label: "Edad recomendada", value: "3 a 10 años (aprox.)" },
      { label: "Capacidad", value: "5 a 7 niños (aprox.)" },
      { label: "Ideal para", value: "Fiestas infantiles, eventos escolares" },
      { label: "Precio", value: "Cotiza por WhatsApp" },
    ],
  },
  {
    slug: "castillo-del-dragon", name: "Castillo del Dragón", cat: "mediano", badge: "Aventura", price: "Cotizar", photos: 5,
    excerpt: "Castillo temático de dragón con resbaladilla. Aventura medieval para fiestas de niños de 4 a 10 años que sueñan con caballeros y dragones.",
    specsLine: ["Con resbaladilla", "4–10 años aprox.", "5–7 niños"],
    lead: "Aventura medieval con dragón y resbaladilla — para los pequeños caballeros de la fiesta.",
    body1: "Castillo inflable con <strong>temática de dragón y resbaladilla</strong>, en colores vibrantes. Perfecto para cumpleaños de 4 a 10 años con temática de aventura, caballeros o fantasía.",
    body2: "Recibe de 5 a 7 niños y se instala con anclaje profesional. Incluye entrega, soplador y recolección. <strong>Cotiza medidas y precio exactos por WhatsApp</strong>.",
    specs: [
      { label: "Categoría", value: "Inflable mediano (temático)" },
      { label: "Tamaño", value: "Mediano con resbaladilla (cotiza medidas)" },
      { label: "Edad recomendada", value: "4 a 10 años (aprox.)" },
      { label: "Capacidad", value: "5 a 7 niños (aprox.)" },
      { label: "Ideal para", value: "Fiestas de aventura y fantasía" },
      { label: "Precio", value: "Cotiza por WhatsApp" },
    ],
  },
  {
    slug: "super-combo-infantil", name: "Super Combo Infantil", cat: "mediano", badge: "Brinco + resbaladilla", price: "Cotizar", photos: 5,
    excerpt: "Combo de brinco más resbaladilla en una sola pieza. Más diversión en el mismo espacio para fiestas infantiles de varios niños.",
    specsLine: ["Brinco + tobogán", "3–10 años aprox.", "6–8 niños"],
    lead: "Dos atracciones en una: zona de brinco más resbaladilla integrada para más diversión en el mismo espacio.",
    body1: "El <strong>Super Combo Infantil</strong> une zona de salto y resbaladilla en una sola pieza. Mantiene a más niños entretenidos a la vez y es de los más versátiles para cualquier cumpleaños.",
    body2: "Pensado para niños de 3 a 10 años. Incluye entrega, instalación con anclaje, soplador y recolección. <strong>Cotiza medidas y precio exactos por WhatsApp</strong>.",
    specs: [
      { label: "Categoría", value: "Inflable mediano (combo)" },
      { label: "Tamaño", value: "Combo brinco + resbaladilla (cotiza medidas)" },
      { label: "Edad recomendada", value: "3 a 10 años (aprox.)" },
      { label: "Capacidad", value: "6 a 8 niños (aprox.)" },
      { label: "Ideal para", value: "Cumpleaños y fiestas infantiles" },
      { label: "Precio", value: "Cotiza por WhatsApp" },
    ],
  },
  {
    slug: "super-combo-junior", name: "Super Combo Junior", cat: "mediano", badge: "Combo compacto", price: "Cotizar", photos: 3,
    excerpt: "Versión compacta del combo de brinco y resbaladilla. Ideal para los más pequeños y para espacios medianos.",
    specsLine: ["Combo compacto", "3–8 años aprox.", "5–7 niños"],
    lead: "El combo de brinco y resbaladilla en versión compacta — ideal para los más pequeños y espacios medianos.",
    body1: "El <strong>Super Combo Junior</strong> ofrece brinco y resbaladilla en un formato más compacto, pensado para niños pequeños (aprox. 3 a 8 años) y espacios medianos.",
    body2: "Llega listo, se instala con anclaje y al final lo recogemos. Incluye soplador y extensión. <strong>Cotiza medidas y precio exactos por WhatsApp</strong>.",
    specs: [
      { label: "Categoría", value: "Inflable mediano (combo compacto)" },
      { label: "Tamaño", value: "Compacto (cotiza medidas exactas)" },
      { label: "Edad recomendada", value: "3 a 8 años (aprox.)" },
      { label: "Capacidad", value: "5 a 7 niños (aprox.)" },
      { label: "Ideal para", value: "Fiestas pequeñas y medianas" },
      { label: "Precio", value: "Cotiza por WhatsApp" },
    ],
  },
  {
    slug: "super-combo-alargado", name: "Super Combo Alargado", cat: "grande", badge: "Circuito largo", price: "Cotizar", photos: 5,
    excerpt: "Combo alargado que une brinco, obstáculos y resbaladilla en un recorrido. Más capacidad y recorrido para fiestas grandes.",
    specsLine: ["Recorrido largo", "4–12 años aprox.", "8–10 niños"],
    lead: "Un recorrido completo: brinco, obstáculos y resbaladilla en una sola pieza alargada para fiestas grandes.",
    body1: "El <strong>Super Combo Alargado</strong> combina zona de salto, obstáculos y resbaladilla en un recorrido extenso. Da más capacidad y juego continuo, ideal para fiestas grandes y kermeses.",
    body2: "Requiere espacio amplio y entrega con camión. Incluye instalación con anclaje, soplador y recolección. <strong>Cotiza medidas y precio exactos por WhatsApp</strong>.",
    specs: [
      { label: "Categoría", value: "Inflable grande (combo alargado)" },
      { label: "Tamaño", value: "Recorrido largo (cotiza medidas exactas)" },
      { label: "Edad recomendada", value: "4 a 12 años (aprox.)" },
      { label: "Capacidad", value: "8 a 10 niños (aprox.)" },
      { label: "Ideal para", value: "Fiestas grandes, kermeses" },
      { label: "Precio", value: "Cotiza por WhatsApp" },
    ],
  },
  {
    slug: "laberinto", name: "Laberinto", cat: "grande", badge: "Túneles y retos", price: "Cotizar", photos: 5,
    excerpt: "Laberinto inflable con túneles, paredes y retos. Los niños entran, exploran y buscan la salida — diversión por horas para grupos grandes.",
    specsLine: ["Túneles y retos", "4–12 años aprox.", "Grupos grandes"],
    lead: "Un laberinto para explorar: túneles, paredes y retos donde los niños entran y buscan la salida.",
    body1: "El <strong>Laberinto inflable</strong> tiene túneles conectados, paredes y retos por todo el recorrido. Los niños pasan horas entrando y saliendo, ideal para grupos grandes y edades mezcladas.",
    body2: "Funciona muy bien en kermeses, eventos escolares y fiestas con muchos invitados. Incluye instalación con anclaje, soplador y recolección. <strong>Cotiza medidas y precio exactos por WhatsApp</strong>.",
    specs: [
      { label: "Categoría", value: "Inflable grande (circuito/laberinto)" },
      { label: "Tamaño", value: "Grande (cotiza medidas exactas)" },
      { label: "Edad recomendada", value: "4 a 12 años (aprox.)" },
      { label: "Capacidad", value: "Grupos grandes por turnos (aprox.)" },
      { label: "Ideal para", value: "Kermeses, eventos escolares" },
      { label: "Precio", value: "Cotiza por WhatsApp" },
    ],
  },
  {
    slug: "super-tobogan", name: "Super Tobogán", cat: "grande", badge: "Tobogán gigante", price: "Cotizar", photos: 5,
    excerpt: "Tobogán inflable de gran altura con aterrizaje seguro. Adrenalina controlada para niños grandes y adolescentes en eventos al aire libre.",
    specsLine: ["Gran altura", "5–14 años aprox.", "Por turnos"],
    lead: "Adrenalina controlada: un tobogán inflable de gran altura con pista rápida y aterrizaje seguro.",
    body1: "El <strong>Super Tobogán</strong> es un tobogán inflable de gran altura con pista de deslizamiento rápida, escalera y zona de aterrizaje. Una atracción de alto impacto para niños grandes, adolescentes y eventos al aire libre.",
    body2: "Requiere espacio amplio con altura libre y entrega con camión. Lleva anclaje reforzado y monitor para los turnos. <strong>Cotiza medidas y precio exactos por WhatsApp</strong>.",
    specs: [
      { label: "Categoría", value: "Inflable grande (tobogán)" },
      { label: "Tamaño", value: "Gran altura (cotiza medidas exactas)" },
      { label: "Edad recomendada", value: "5 a 14 años (aprox.)" },
      { label: "Capacidad", value: "Por turnos con monitor (aprox.)" },
      { label: "Ideal para", value: "Eventos al aire libre, kermeses, festivales" },
      { label: "Precio", value: "Cotiza por WhatsApp" },
    ],
  },
  {
    slug: "tortuga-pelotas", name: "Tortuga de Pelotas", cat: "chico", badge: "Alberca de pelotas", price: "Cotizar", photos: 5,
    excerpt: "Alberca de pelotas inflable con forma de tortuga. Juego suave y seguro para los más pequeños — ideal para bebés y primeros cumpleaños.",
    specsLine: ["Alberca de pelotas", "1–6 años aprox.", "4–6 niños"],
    lead: "Juego suave y seguro para los más pequeños: una alberca de pelotas con forma de tortuga.",
    body1: "La <strong>Tortuga de Pelotas</strong> es una alberca inflable llena de pelotas, con forma de tortuga y paredes blandas. Ideal para bebés y niños pequeños (aprox. 1 a 6 años) en primeros cumpleaños y baby showers.",
    body2: "Llega lista con sus pelotas, se instala en minutos y al final la recogemos. Cada renta incluye sanitización. <strong>Cotiza precio y disponibilidad por WhatsApp</strong>.",
    specs: [
      { label: "Categoría", value: "Inflable chico (alberca de pelotas)" },
      { label: "Tamaño", value: "Compacto (cotiza medidas exactas)" },
      { label: "Edad recomendada", value: "1 a 6 años (aprox.)" },
      { label: "Capacidad", value: "4 a 6 niños (aprox.)" },
      { label: "Ideal para", value: "Bebés, primeros cumpleaños, baby showers" },
      { label: "Precio", value: "Cotiza por WhatsApp" },
    ],
  },
  {
    slug: "mini-casita", name: "Mini Casita", cat: "chico", badge: "Para los más chicos", price: "Cotizar", photos: 3,
    excerpt: "Casita inflable de brinco en formato pequeño. Segura y compacta para los más chiquitos y para fiestas en espacios reducidos.",
    specsLine: ["Compacta", "1–5 años aprox.", "3–4 niños"],
    lead: "Una casita de brinco pequeña y segura — pensada para los más chiquitos y los espacios reducidos.",
    body1: "La <strong>Mini Casita</strong> es un inflable de brinco compacto con forma de casita, paredes blandas y altura reducida. Perfecta para niños de 1 a 5 años y fiestas en casa o departamento.",
    body2: "Cabe prácticamente en cualquier espacio interior. Llega lista, se instala en minutos y al final la recogemos. <strong>Cotiza precio por WhatsApp</strong>.",
    specs: [
      { label: "Categoría", value: "Inflable chico (brinco)" },
      { label: "Tamaño", value: "Compacto (cotiza medidas exactas)" },
      { label: "Edad recomendada", value: "1 a 5 años (aprox.)" },
      { label: "Capacidad", value: "3 a 4 niños (aprox.)" },
      { label: "Ideal para", value: "Fiestas en casa, departamentos" },
      { label: "Precio", value: "Cotiza por WhatsApp" },
    ],
  },
  {
    slug: "mini-tumbling", name: "Mini Tumbling", cat: "chico", badge: "Bebés", price: "Cotizar", photos: 4,
    excerpt: "Colchón de tumbling inflable para bebés y niños muy pequeños. Superficie suave para gatear, rodar y dar sus primeros saltos con seguridad.",
    specsLine: ["Colchón suave", "0–4 años aprox.", "Área blanda"],
    lead: "Una superficie suave para gatear, rodar y dar los primeros saltos — pensada para bebés y niños muy pequeños.",
    body1: "El <strong>Mini Tumbling</strong> es un colchón inflable de superficie blanda, ideal para bebés y niños muy pequeños (aprox. 0 a 4 años). Un área segura para gatear, rodar y jugar bajo supervisión.",
    body2: "Perfecto para baby showers, primeros cumpleaños y reuniones familiares. Se instala en minutos y se sanitiza antes de cada renta. <strong>Cotiza precio por WhatsApp</strong>.",
    specs: [
      { label: "Categoría", value: "Inflable chico (colchón/tumbling)" },
      { label: "Tamaño", value: "Área blanda (cotiza medidas exactas)" },
      { label: "Edad recomendada", value: "0 a 4 años (aprox.)" },
      { label: "Capacidad", value: "Varios bebés con supervisión (aprox.)" },
      { label: "Ideal para", value: "Baby showers, primeros cumpleaños" },
      { label: "Precio", value: "Cotiza por WhatsApp" },
    ],
  },
  {
    slug: "super-castillo-dragones", name: "Super Castillo de Dragones", cat: "grande", badge: "Gran formato", price: "Cotizar", photos: 6,
    excerpt: "La versión grande del castillo de dragones, con más capacidad y presencia. Para fiestas grandes que quieren una atracción de impacto.",
    specsLine: ["Gran formato", "4–12 años aprox.", "8–12 niños"],
    lead: "El castillo de dragones en gran formato — más capacidad y presencia para las fiestas que quieren impactar.",
    body1: "El <strong>Super Castillo de Dragones</strong> es la versión grande del castillo temático, con dragones, más área de juego y mayor capacidad (aprox. 8 a 12 niños). Una atracción de impacto para fiestas grandes y kermeses.",
    body2: "Requiere espacio amplio y entrega con camión. Incluye instalación con anclaje, soplador y recolección. <strong>Cotiza medidas y precio exactos por WhatsApp</strong>.",
    specs: [
      { label: "Categoría", value: "Inflable grande (temático dragones)" },
      { label: "Tamaño", value: "Gran formato (cotiza medidas exactas)" },
      { label: "Edad recomendada", value: "4 a 12 años (aprox.)" },
      { label: "Capacidad", value: "8 a 12 niños (aprox.)" },
      { label: "Ideal para", value: "Fiestas grandes, kermeses" },
      { label: "Precio", value: "Cotiza por WhatsApp" },
    ],
  },
];

export const bySlug = (s: string) => INFLABLES.find((i) => i.slug === s);
export const byCat = (c: Cat) => INFLABLES.filter((i) => i.cat === c);

// Ruta de imagen card/galería
export const imgBase = "/images/inflables/juegos-infantiles";
export const cardImg = (i: Inflable) => `${imgBase}/${i.slug}/${i.slug}-inflable-fiesta-infantil-01-sm.avif`;
export const mainImg = (i: Inflable) => `${imgBase}/${i.slug}/${i.slug}-inflable-fiesta-infantil-01.avif`;
export const photoImg = (slug: string, n: number, sm = false) =>
  `${imgBase}/${slug}/${slug}-inflable-fiesta-infantil-${String(n).padStart(2, "0")}${sm ? "-sm" : ""}.avif`;

// FAQs genéricas (reutilizadas en cada ficha L5; {name} se interpola)
export const faqsFor = (name: string) => [
  { question: `¿Para qué edades es el inflable ${name}?`, answer: `Cada inflable tiene una edad recomendada según su tamaño y diseño. Te asesoramos para elegir el más adecuado a la edad de los invitados; escríbenos por WhatsApp con el dato y te confirmamos si el ${name} es el ideal o te sugerimos otro de nuestra flota.` },
  { question: "¿Cuánto espacio necesito para instalarlo?", answer: "Depende del modelo: los chicos necesitan desde 3 × 3 m, los medianos 5 × 5 m y los grandes de 8 × 6 m en adelante. Siempre se requiere un contacto eléctrico de 110V a no más de 15 metros del área. Mándanos las medidas de tu espacio por WhatsApp y te confirmamos si entra." },
  { question: "¿Qué incluye la renta?", answer: "Cada renta incluye entrega a domicilio, instalación profesional con anclaje, soplador con extensión eléctrica, sanitización del inflable y recolección al terminar. Sin costos ocultos por escaleras, distancia dentro de la zona habitual ni horario." },
  { question: "¿Los inflables están limpios y son seguros?", answer: "Sí. Cada inflable se lava, desinfecta y revisa antes y después de cada evento. Usamos productos seguros, sin olor fuerte, aptos para niños. Todos cuentan con múltiples puntos de anclaje y son instalados por personal capacitado; los modelos medianos y grandes llevan mallas de seguridad." },
  { question: "¿Con cuánta anticipación debo reservar?", answer: "Recomendamos apartar con al menos 5 a 7 días de anticipación, y más en temporada alta (Día del Niño y fin de año). Los modelos temáticos y grandes son los más solicitados. Para última hora, contáctanos: en ocasiones tenemos disponibilidad." },
  { question: "¿Qué pasa si llueve el día de mi fiesta?", answer: "Si llueve fuerte, puedes reagendar sin costo adicional sujeto a disponibilidad, o usar el inflable bajo techo si cuentas con un espacio con altura suficiente. Avísanos con al menos 2 horas de anticipación." },
];
