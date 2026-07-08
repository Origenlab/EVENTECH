/**
 * ─── Catálogo de Inflables Infantiles (flota real EVENTECH) ───
 * Fuente única para el hub L4 (/servicios/inflables/juegos-infantiles/) y las
 * fichas L5 dinámicas ([slug]/index.astro).
 *
 * HOMOLOGADO al catálogo real del proveedor (INFLAPY, inflablesparafiestas.com.mx):
 * 8 modelos curados con precio "desde", medidas, edad, capacidad, espacio y
 * condiciones de renta reales. 1 chico · 4 medianos · 3 grandes.
 * Imágenes propias en /public/images/inflables/juegos-infantiles/{slug}/.
 *
 * Precios = tarifa de arranque ("desde") por evento de 4 a 6 horas, con entrega,
 * instalación y recolección incluidas en CDMX. Precio final se confirma por
 * WhatsApp según zona y duración.
 */

export type Cat = "chico" | "mediano" | "grande";

export interface Inflable {
  slug: string;
  name: string;
  cat: Cat;
  badge: string;
  price: string;        // display: "Desde $800"
  priceFrom: number;    // numérico para JSON-LD (Offer/Product), p. ej. 800
  photos: number;       // nº de fotos ({slug}-...-NN.avif)
  dimensions: string;   // "2 × 2 × 2.5 m"
  ageRange: string;     // "1 a 3 años"
  capacity: string;     // "3 a 4 niños"
  space: string;        // "3 × 3 m"
  excerpt: string;      // tarjeta del hub
  specsLine: string[];  // chips cortos en la tarjeta
  lead: string;         // L5: frase destacada
  body1: string;        // L5: párrafo 1 (admite <strong>/<a>)
  body2: string;        // L5: párrafo 2
  specs: { label: string; value: string }[]; // L5: tabla de especificaciones
}

export const CAT_LABEL: Record<Cat, string> = {
  chico: "Chico",
  mediano: "Mediano",
  grande: "Grande",
};

/** Rango de precios del catálogo (para JSON-LD AggregateOffer del hub) */
export const PRICE_RANGE = { min: 800, max: 1900, currency: "MXN" as const };

/** Lo que incluye toda renta (homologado con el proveedor) — reutilizable */
export const RENTA_INCLUYE =
  "Entrega a domicilio (gratis en CDMX), instalación profesional con anclaje, sanitización, soplador silencioso con extensión eléctrica, recolección al terminar y seguro de responsabilidad civil.";

export const INFLABLES: Inflable[] = [
  // ───────────────────────────── CHICO (1) ─────────────────────────────
  {
    slug: "mini-castillo", name: "Mini Castillo", cat: "chico", badge: "El único para interiores",
    price: "Desde $800", priceFrom: 800, photos: 5,
    dimensions: "2 × 2 × 2.5 m", ageRange: "1 a 3 años", capacity: "3 a 4 niños", space: "3 × 3 m (interior, techo ≥ 2.5 m)",
    excerpt: "El inflable más compacto y seguro, con paredes acolchonadas y 2.5 m de altura. El único que cabe en departamentos y terrazas: ideal para primeros cumpleaños y bautizos.",
    specsLine: ["2 × 2 × 2.5 m", "1–3 años", "3–4 niños"],
    lead: "Cuando los invitados son bebés y niños de 1 a 3 años, el tamaño y las paredes blandas importan más que la altura o la velocidad.",
    body1: "El <strong>Mini Castillo</strong> mide 2 × 2 × 2.5 m: cabe en una sala, terraza o cuarto despejado y es <strong>el único modelo del catálogo apto para interiores</strong>, perfecto para primeros cumpleaños en departamento y bautizos. Paredes acolchonadas sin bordes rígidos y altura reducida para que la supervisión sea total.",
    body2: "Llega listo, lo instalamos con anclaje seguro en 15 a 20 minutos y al final lo recogemos. Cada inflable se <strong>lava, desinfecta y revisa antes de cada renta</strong>. Combínalo con nuestras <a href=\"/servicios/mobiliario/\">mesas y sillas infantiles</a> para una zona de fiesta completa.",
    specs: [
      { label: "Categoría", value: "Inflable chico (bebés y niños pequeños)" },
      { label: "Dimensiones", value: "2 × 2 × 2.5 m" },
      { label: "Edad recomendada", value: "1 a 3 años" },
      { label: "Capacidad", value: "3 a 4 niños" },
      { label: "Espacio requerido", value: "3 × 3 m · apto interiores (techo ≥ 2.5 m)" },
      { label: "Duración de renta", value: "4 a 6 horas" },
      { label: "Instalación", value: "Anclaje profesional · 15 a 20 min · contacto 110V a ≤ 15 m" },
      { label: "Incluye", value: "Entrega, instalación, soplador, recolección y seguro" },
    ],
  },

  // ──────────────────────────── MEDIANOS (4) ────────────────────────────
  {
    slug: "dragones-rojos", name: "Dragones Rojos", cat: "mediano", badge: "El más rentado",
    price: "Desde $1,200", priceFrom: 1200, photos: 6,
    dimensions: "4 × 4 × 3.8 m", ageRange: "4 a 12 años", capacity: "5 a 7 niños", space: "5 × 5 m (exterior)",
    excerpt: "Dos dragones que custodian el castillo, dos toboganes integrados y mallas de seguridad en todos los costados. Nuestro modelo más solicitado para cumpleaños de 4 a 12 años y kermeses.",
    specsLine: ["4 × 4 × 3.8 m", "4–12 años", "5–7 niños"],
    lead: "Es el modelo que más nos piden: combina presencia visual con diversión real para fiestas de 4 a 12 años.",
    body1: "Los <strong>dos dragones</strong> en rojo y dorado custodian el castillo y se ven desde lejos, mientras los <strong>dos toboganes integrados</strong> y la amplia zona de salto mantienen ocupados a 5 a 7 niños a la vez. Fabricado en PVC de grado comercial resistente a rasgaduras.",
    body2: "Lleva <strong>mallas de seguridad en todos los costados</strong> para que los papás vean a los niños en todo momento, y piso acolchonado. Lo instalamos con anclaje profesional en 25 a 35 minutos sobre pasto, tierra o concreto.",
    specs: [
      { label: "Categoría", value: "Inflable mediano (el más rentado)" },
      { label: "Dimensiones", value: "4 × 4 × 3.8 m" },
      { label: "Edad recomendada", value: "4 a 12 años" },
      { label: "Capacidad", value: "5 a 7 niños" },
      { label: "Incluye", value: "Dos dragones, dos toboganes y mallas de seguridad" },
      { label: "Espacio requerido", value: "5 × 5 m · uso exterior" },
      { label: "Duración de renta", value: "4 a 6 horas · montaje 25 a 35 min" },
    ],
  },
  {
    slug: "castillo-princesas", name: "Castillo de Princesas", cat: "mediano", badge: "Fiestas de niñas",
    price: "Desde $1,200", priceFrom: 1200, photos: 6,
    dimensions: "4 × 4 × 3.5 m", ageRange: "3 a 10 años", capacity: "5 a 7 niños", space: "5 × 5 m (exterior)",
    excerpt: "Castillo de cuento en tonos rosa y pastel con torres y resbaladilla integrada. El fondo perfecto para fotos y para temáticas de princesas, hadas y Frozen.",
    specsLine: ["4 × 4 × 3.5 m", "3–10 años", "Con resbaladilla"],
    lead: "El sueño de toda pequeña princesa hecho realidad — y el inflable más fotografiado de las fiestas de niñas.",
    body1: "Castillo en tonos <strong>rosa y pastel</strong> con torres decorativas y <strong>resbaladilla integrada incluida</strong>. Es el favorito para fiestas de princesas, hadas o cualquier temática donde quieras que la decoración combine. Edad recomendada: 3 a 10 años.",
    body2: "Lleva mallas de seguridad perimetrales y se instala en unos 20 minutos. Las torres crean un <strong>fondo espectacular para fotos</strong>. Combínalo con nuestra <a href=\"/servicios/iluminacion/decorativa/\">iluminación decorativa</a> para una atmósfera mágica.",
    specs: [
      { label: "Categoría", value: "Inflable mediano (temático · princesas)" },
      { label: "Dimensiones", value: "4 × 4 × 3.5 m" },
      { label: "Edad recomendada", value: "3 a 10 años" },
      { label: "Capacidad", value: "5 a 7 niños" },
      { label: "Incluye", value: "Torres rosa/pastel, resbaladilla y mallas de seguridad" },
      { label: "Espacio requerido", value: "5 × 5 m · en salón, techo ≥ 4 m" },
      { label: "Duración de renta", value: "4 a 6 horas" },
    ],
  },
  {
    slug: "mini-jungla", name: "Mini Jungla", cat: "mediano", badge: "Aventura safari",
    price: "Desde $1,300", priceFrom: 1300, photos: 6,
    dimensions: "4.5 × 4 × 3.5 m", ageRange: "5 a 10 años", capacity: "5 a 7 niños", space: "6 × 5 m (exterior)",
    excerpt: "Circuito con temática de selva: obstáculos, zonas para trepar y escondites. Funciona más como aventura de exploradores que como brincolín — ideal para fiestas safari.",
    specsLine: ["4.5 × 4 × 3.5 m", "5–10 años", "Circuito"],
    lead: "Transporta a los niños a una aventura selvática — ideal para pequeños exploradores y fiestas al aire libre.",
    body1: "Inflable con <strong>temática de selva</strong>, figuras de animales, obstáculos, zonas para trepar y escondites. Los niños lo usan como <strong>circuito de exploración</strong> más que como brincolín, perfecto para fiestas safari, de exploradores o de animales. Edad recomendada: 5 a 10 años.",
    body2: "Mide 4.5 × 4 × 3.5 m, recibe de 5 a 7 niños y se instala con anclaje profesional. Cada renta incluye entrega, soplador, sanitización y recolección. Un espacio libre de 6 × 5 m en exterior es suficiente.",
    specs: [
      { label: "Categoría", value: "Inflable mediano (temático · safari)" },
      { label: "Dimensiones", value: "4.5 × 4 × 3.5 m" },
      { label: "Edad recomendada", value: "5 a 10 años" },
      { label: "Capacidad", value: "5 a 7 niños" },
      { label: "Incluye", value: "Obstáculos, zonas de trepa, escondites y mallas de seguridad" },
      { label: "Espacio requerido", value: "6 × 5 m · uso exterior" },
      { label: "Duración de renta", value: "4 a 6 horas" },
    ],
  },
  {
    slug: "gusanitos", name: "Gusanitos", cat: "mediano", badge: "Túneles y colores",
    price: "Desde $1,350", priceFrom: 1350, photos: 6,
    dimensions: "5 × 3 × 2.5 m", ageRange: "Todas las edades (desde 3 años)", capacity: "5 a 7 niños", space: "6 × 4 m (exterior)",
    excerpt: "El más colorido y fotografiado: gusanitos con túneles de múltiples entradas y salidas. Diseño bajo y alargado que combina con cualquier temática tropical o infantil.",
    specsLine: ["5 × 3 × 2.5 m", "Desde 3 años", "Túneles"],
    lead: "El inflable más colorido del catálogo — túneles para entrar, salir y esconderse que funcionan con cualquier temática.",
    body1: "Inflable tropical de <strong>gusanitos con túneles</strong> de múltiples entradas y salidas, en colores vibrantes. Su diseño bajo (2.5 m) y alargado lo hace de los más seguros y versátiles: perfecto para cumpleaños, fiestas de verano y hawaianas, apto desde los 3 años.",
    body2: "Mide 5 × 3 × 2.5 m y recibe de 5 a 7 niños. Al no tener personaje de franquicia, <strong>combina con cualquier decoración</strong>. Se monta en menos de 30 minutos e incluye entrega, instalación con anclaje, soplador y recolección.",
    specs: [
      { label: "Categoría", value: "Inflable mediano (túneles · tropical)" },
      { label: "Dimensiones", value: "5 × 3 × 2.5 m" },
      { label: "Edad recomendada", value: "Todas las edades (desde 3 años)" },
      { label: "Capacidad", value: "5 a 7 niños" },
      { label: "Incluye", value: "Túneles con múltiples entradas/salidas y mallas de seguridad" },
      { label: "Espacio requerido", value: "6 × 4 m · uso exterior" },
      { label: "Duración de renta", value: "4 a 6 horas · montaje < 30 min" },
    ],
  },

  // ───────────────────────────── GRANDES (3) ─────────────────────────────
  {
    slug: "barco-pirata", name: "Barco Pirata", cat: "grande", badge: "Mayor impacto",
    price: "Desde $1,800", priceFrom: 1800, photos: 5,
    dimensions: "7 × 5 × 4.5 m", ageRange: "4 años en adelante", capacity: "8 a 10 niños", space: "8 × 6 m · altura libre 5 m (exterior)",
    excerpt: "Galeón de 7 m con mástil, velas y tobogán de alta velocidad en la popa. La atracción central de cualquier fiesta grande — hasta 10 niños a la vez.",
    specsLine: ["7 × 5 × 4.5 m", "4+ años", "8–10 niños"],
    lead: "Nuestro inflable más épico y aventurero — el mástil de 4.5 m da la sensación real de estar dentro de un barco.",
    body1: "Galeón pirata de <strong>7 metros de largo</strong> con mástil, velas y un <strong>tobogán de alta velocidad en la popa</strong>. Es la atracción que más impacta a la entrada de la fiesta y recibe de 8 a 10 niños al mismo tiempo. Funciona desde los 4 años.",
    body2: "Necesita jardín o patio amplio (espacio libre de 8 × 6 m con 5 m de altura) y entrega con camión grande. Lleva redes y paredes laterales de seguridad, anclaje reforzado y se instala en 35 a 45 minutos.",
    specs: [
      { label: "Categoría", value: "Inflable grande (atracción central)" },
      { label: "Dimensiones", value: "7 × 5 × 4.5 m" },
      { label: "Edad recomendada", value: "4 años en adelante" },
      { label: "Capacidad", value: "8 a 10 niños" },
      { label: "Incluye", value: "Mástil, velas, tobogán y redes de seguridad" },
      { label: "Espacio requerido", value: "8 × 6 m · altura libre 5 m · uso exterior" },
      { label: "Duración de renta", value: "4 a 6 horas · montaje 35 a 45 min" },
    ],
  },
  {
    slug: "extremo", name: "Extremo", cat: "grande", badge: "Competencias",
    price: "Desde $1,900", priceFrom: 1900, photos: 6,
    dimensions: "7 × 4 × 3.8 m", ageRange: "6 años en adelante", capacity: "6 a 10 niños por turno", space: "8 × 5 m (exterior)",
    excerpt: "Circuito de obstáculos con muros de escalada, túneles y tobogán final para carreras por equipos. Ideal para kermeses, eventos escolares y team building corporativo.",
    specsLine: ["7 × 4 × 3.8 m", "6+ años", "Carreras"],
    lead: "El circuito que convierte cualquier fiesta en un torneo de velocidad — el favorito de niños grandes, adolescentes y adultos.",
    body1: "<strong>Circuito de obstáculos</strong> con muros para escalar, túneles, barreras y tobogán final, diseñado para <strong>carreras por equipos</strong>. Lo usamos mucho en kermeses, fiestas de niños grandes y team building corporativo. Edad ideal: 6 años en adelante.",
    body2: "Mide 7 × 4 × 3.8 m, requiere un espacio libre de 8 × 5 m y entrega con camión grande. Lleva anclaje reforzado y podemos asignar monitor para organizar los turnos. Apto para adolescentes y adultos.",
    specs: [
      { label: "Categoría", value: "Inflable grande (circuito de obstáculos)" },
      { label: "Dimensiones", value: "7 × 4 × 3.8 m" },
      { label: "Edad recomendada", value: "6 años en adelante (incluye adultos)" },
      { label: "Capacidad", value: "6 a 10 niños por turno" },
      { label: "Incluye", value: "Muros, túneles, tobogán final y anclaje reforzado" },
      { label: "Espacio requerido", value: "8 × 5 m · uso exterior" },
      { label: "Duración de renta", value: "4 a 6 horas · montaje ~45 min" },
    ],
  },
  {
    slug: "castillo-blanco", name: "Castillo Blanco", cat: "grande", badge: "Eventos formales",
    price: "Desde $1,700", priceFrom: 1700, photos: 4,
    dimensions: "6 × 5 × 4 m", ageRange: "Todas las edades", capacity: "8 a 12 niños", space: "7 × 6 m · altura libre 5 m",
    excerpt: "Castillo totalmente blanco, elegante y sin personajes: el más espacioso del catálogo. Diseñado para bodas, XV años y celebraciones formales que quieren una atracción con estilo.",
    specsLine: ["6 × 5 × 4 m", "Todas las edades", "8–12 niños"],
    lead: "Una atracción de gran formato en blanco total — se integra a la decoración de bodas y XV años sin romper la estética.",
    body1: "Castillo inflable <strong>blanco en su totalidad</strong>, sin colores ni personajes, pensado para eventos elegantes. Es el <strong>más espacioso del catálogo</strong> (recibe de 8 a 12 niños) y funciona como pieza central en bodas, XV años, primeras comuniones y eventos corporativos, para niños y adultos.",
    body2: "Requiere un espacio libre de 7 × 6 m con 5 m de altura y entrega coordinada con el resto del montaje. Coordinamos la instalación con tu venue o wedding planner y, como proveedor integral, sumamos <a href=\"/servicios/mobiliario/\">mobiliario</a> e <a href=\"/servicios/iluminacion/\">iluminación</a> en un solo contrato.",
    specs: [
      { label: "Categoría", value: "Inflable grande (eventos formales)" },
      { label: "Dimensiones", value: "6 × 5 × 4 m" },
      { label: "Edad recomendada", value: "Todas las edades" },
      { label: "Capacidad", value: "8 a 12 niños" },
      { label: "Ideal para", value: "Bodas, XV años, comuniones y corporativos" },
      { label: "Espacio requerido", value: "7 × 6 m · altura libre 5 m" },
      { label: "Duración de renta", value: "4 a 6 horas" },
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

// FAQs por ficha L5 — homologadas con datos e indicaciones reales del proveedor.
// Reciben el inflable completo para interpolar precio, edad, capacidad y espacio.
export const faqsFor = (inf: Inflable) => [
  {
    question: `¿Cuánto cuesta rentar el inflable ${inf.name}?`,
    answer: `El ${inf.name} se renta ${inf.price} MXN por un evento de 4 a 6 horas, con entrega, instalación y recolección incluidas en CDMX. El precio final depende de la zona y la duración; te confirmamos el total exacto por WhatsApp, sin costos ocultos. En Estado de México puede aplicar un costo de traslado que te informamos antes de apartar.`,
  },
  {
    question: `¿Para qué edades y cuántos niños es el ${inf.name}?`,
    answer: `El ${inf.name} está recomendado para ${inf.ageRange.toLowerCase()} y recibe ${inf.capacity} a la vez. Si tienes invitados de edades muy distintas, escríbenos y te ayudamos a combinar modelos o a elegir el más adecuado de nuestra flota.`,
  },
  {
    question: `¿Cuánto espacio necesito para instalar el ${inf.name}?`,
    answer: `El ${inf.name} necesita un espacio libre de ${inf.space} y un contacto eléctrico de 110V a no más de 15 metros del área. Lo instalamos sobre pasto, tierra firme, loseta o concreto. Mándanos las medidas de tu espacio por WhatsApp y confirmamos si entra antes de apartar.`,
  },
  {
    question: "¿Qué incluye la renta?",
    answer: `Cada renta incluye ${RENTA_INCLUYE} Llegamos 1 a 2 horas antes del evento y no cobramos extra por escaleras, distancia dentro de la zona habitual ni por el horario.`,
  },
  {
    question: `¿El ${inf.name} está limpio y es seguro?`,
    answer: `Sí. Cada inflable se lava, desinfecta y revisa —costuras, soplador, anclajes y conexiones— antes de cada evento, con productos seguros y sin olor fuerte. Cuenta con múltiples puntos de anclaje, lo instala personal capacitado y ${inf.cat === "chico" ? "tiene paredes acolchonadas para los más pequeños" : "lleva mallas o redes de seguridad perimetrales"}.`,
  },
  {
    question: "¿Con cuánta anticipación reservo y qué pasa si llueve?",
    answer: "Recomendamos apartar con 5 a 7 días de anticipación, y más en temporada alta (mayo, con el Día del Niño, y diciembre). Se aparta con un anticipo (efectivo, transferencia o tarjeta). Si llueve fuerte, reagendamos sin costo sujeto a disponibilidad o usamos el inflable bajo techo si hay altura suficiente; avísanos con al menos 2 horas de anticipación.",
  },
];
