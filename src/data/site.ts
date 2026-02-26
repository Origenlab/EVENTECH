/**
 * ─── EVENTECH.MX Site Configuration ───
 * Single source of truth for SEO defaults, branding, and contact info.
 */

export const SITE = {
  name: "EVENTECH",
  tagline: "Renta de Equipo para Eventos en CDMX y México",
  url: "https://eventech.mx",
  locale: "es-MX",
  language: "es",

  // ─── SEO Defaults ───
  seo: {
    title: "EVENTECH — Renta de Equipo para Eventos en CDMX",
    titleTemplate: "%s | EVENTECH.MX",
    description:
      "Renta de mobiliario, equipo audiovisual, carpas e iluminación para bodas, XV años, eventos corporativos y sociales en CDMX y México. Cotiza en línea.",
    image: "/images/og-default.jpg",
    type: "website" as const,
  },

  // ─── Social & Contact ───
  social: {
    twitter: "@eventechmx",
    facebook: "https://facebook.com/eventechmx",
    instagram: "https://instagram.com/eventechmx",
  },

  contact: {
    email: "contacto@eventech.mx",
    phone: "55 6432 8954",
    phoneRaw: "+525564328954",
    address: "Ciudad de México, México",
    whatsapp: "525564328954",
  },

  // ─── Organization (JSON-LD) ───
  organization: {
    name: "EVENTECH.MX",
    legalName: "EVENTECH S.A. de C.V.",
    logo: "/images/logo.png",
    foundingDate: "2024",
    sameAs: [
      "https://facebook.com/eventechmx",
      "https://instagram.com/eventechmx",
    ],
  },

  // ─── Business Info (for LocalBusiness schema) ───
  business: {
    priceRange: "$$",
    openingHours: {
      weekdays: { opens: "09:00", closes: "18:00" },
      saturday: { opens: "10:00", closes: "14:00" },
    },
    geo: {
      latitude: 19.4326,
      longitude: -99.1332,
    },
    areaServed: [
      "Ciudad de México",
      "Estado de México",
      "Zona Metropolitana",
    ],
  },
} as const;

/** Type helper for SEO props */
export type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  canonical?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
};

/** Service categories for the site */
export const SERVICE_CATEGORIES = [
  {
    id: "mobiliario",
    name: "Mobiliario",
    description: "Sillas, mesas, salas lounge y más",
    excerpt: "Sillas Tiffany, Chiavari, salas lounge, mesas y barras personalizadas. Calidad premium que impresiona a tus invitados.",
    cta: "Explorar Mobiliario",
    icon: "chair",
    href: "/servicios/mobiliario/",
  },
  {
    id: "audiovisual",
    name: "Audiovisual",
    description: "Pantallas LED, sonido, proyectores",
    excerpt: "Pantallas LED, sonido profesional, proyectores y micrófonos. Todo para presentaciones impactantes.",
    cta: "Ver Equipo Audiovisual",
    icon: "speaker",
    href: "/servicios/audiovisual/",
  },
  {
    id: "carpas",
    name: "Carpas",
    description: "Carpas y estructuras para eventos",
    excerpt: "Carpas profesionales en múltiples tamaños con montaje, iluminación interior y opciones de piso incluidas.",
    cta: "Cotizar Carpas",
    icon: "tent",
    href: "/servicios/carpas/",
  },
  {
    id: "iluminacion",
    name: "Iluminación",
    description: "Iluminación profesional para eventos",
    excerpt: "Luces LED arquitectónicas, robóticas, efectos especiales y cortinas de luz. Creamos el ambiente perfecto.",
    cta: "Diseñar Iluminación",
    icon: "lightbulb",
    href: "/servicios/iluminacion/",
  },
  {
    id: "pistas",
    name: "Pistas de Baile",
    description: "Pistas LED, de madera y más",
    excerpt: "Pistas LED programables, de madera y modulares. El centro de atención de cualquier celebración.",
    cta: "Ver Pistas de Baile",
    icon: "music",
    href: "/servicios/pistas-baile/",
  },
  {
    id: "inflables",
    name: "Inflables",
    description: "Brincolines, toboganes y juegos",
    excerpt: "Brincolines, toboganes, castillos y juegos inflables para fiestas infantiles. Diversión segura garantizada.",
    cta: "Ver Inflables",
    icon: "balloon",
    href: "/servicios/inflables/",
  },
  {
    id: "catering",
    name: "Catering",
    description: "Canapés, mesas de dulces, barras",
    excerpt: "Canapés gourmet, mesas de dulces, barra de quesos y snacks. Deliciosos complementos para consentir a tus invitados.",
    cta: "Ver Menú Catering",
    icon: "utensils",
    href: "/servicios/catering/",
  },
  {
    id: "accesorios",
    name: "Accesorios",
    description: "Barras, calentadores, generadores",
    excerpt: "Barras, calentadores, generadores, manteles y fundas. Todo lo necesario para complementar tu evento.",
    cta: "Ver Accesorios",
    icon: "package",
    href: "/servicios/accesorios/",
  },
] as const;

/** Event types for the site */
export const EVENT_TYPES = [
  {
    id: "bodas",
    name: "Bodas",
    description: "Todo para tu boda perfecta",
    excerpt: "Paquetes completos con mobiliario elegante, iluminación romántica y pistas de baile. Nos encargamos de cada detalle.",
    cta: "Planear Mi Boda",
    icon: "heart",
    href: "/eventos/bodas/",
  },
  {
    id: "xv-anos",
    name: "XV Años",
    description: "Equipamiento para quinceañeras",
    excerpt: "Pista de baile LED, iluminación espectacular y mobiliario de lujo. Hacemos realidad el sueño de la quinceañera.",
    cta: "Cotizar XV Años",
    icon: "crown",
    href: "/eventos/xv-anos/",
  },
  {
    id: "corporativos",
    name: "Corporativos",
    description: "Congresos, conferencias, lanzamientos",
    excerpt: "Audio y video de alta calidad, mobiliario ejecutivo y montaje impecable para eventos empresariales.",
    cta: "Solicitar Cotización",
    icon: "briefcase",
    href: "/eventos/corporativos/",
  },
  {
    id: "sociales",
    name: "Eventos Sociales",
    description: "Cumpleaños, graduaciones, reuniones",
    excerpt: "Cumpleaños, graduaciones, baby showers y reuniones. Adaptamos nuestros servicios a tu presupuesto.",
    cta: "Organizar Mi Evento",
    icon: "users",
    href: "/eventos/sociales/",
  },
  {
    id: "infantiles",
    name: "Fiestas Infantiles",
    description: "Cumpleaños y eventos para niños",
    excerpt: "Inflables, mesas temáticas, juegos y decoración colorida. Diversión garantizada para los más pequeños.",
    cta: "Ver Paquetes Infantiles",
    icon: "cake",
    href: "/eventos/infantiles/",
  },
  {
    id: "graduaciones",
    name: "Graduaciones",
    description: "Ceremonias y fiestas de graduación",
    excerpt: "Escenarios, audio profesional y mobiliario elegante para celebrar este logro académico como se merece.",
    cta: "Cotizar Graduación",
    icon: "graduation",
    href: "/eventos/graduaciones/",
  },
  {
    id: "baby-showers",
    name: "Baby Showers",
    description: "Celebraciones para futuros bebés",
    excerpt: "Decoración temática, mesas de dulces y mobiliario encantador para darle la bienvenida al nuevo integrante.",
    cta: "Planear Baby Shower",
    icon: "baby",
    href: "/eventos/baby-showers/",
  },
  {
    id: "religiosos",
    name: "Eventos Religiosos",
    description: "Bautizos, primeras comuniones, confirmaciones",
    excerpt: "Mobiliario clásico, carpas elegantes y decoración sobria para celebraciones de fe y tradición familiar.",
    cta: "Ver Opciones",
    icon: "church",
    href: "/eventos/religiosos/",
  },
] as const;

/** Trust badges/stats for homepage */
export const TRUST_STATS = [
  { value: "500+", label: "Eventos realizados" },
  { value: "98%", label: "Clientes satisfechos" },
  { value: "24h", label: "Respuesta garantizada" },
  { value: "CDMX", label: "Cobertura completa" },
] as const;

/** Why choose us features */
export const FEATURES = [
  {
    id: "respuesta-24h",
    name: "Respuesta en 24h",
    excerpt: "Cotización garantizada en menos de 24 horas. Sabemos que tu tiempo es valioso.",
    cta: "Cotizar Ahora",
    icon: "clock",
    href: "/contacto/",
  },
  {
    id: "inventario-completo",
    name: "Inventario Completo",
    excerpt: "Todo lo que necesitas para tu evento en un solo proveedor. Sin complicaciones.",
    cta: "Ver Catálogo",
    icon: "layers",
    href: "/servicios/",
  },
  {
    id: "garantia-calidad",
    name: "Garantía de Calidad",
    excerpt: "Equipo en perfectas condiciones. Si algo no funciona, lo resolvemos al instante.",
    cta: "Conocer Más",
    icon: "shield",
    href: "/nosotros/",
  },
  {
    id: "precios-transparentes",
    name: "Precios Transparentes",
    excerpt: "Sin sorpresas. Te damos el precio real desde el inicio, incluyendo montaje.",
    cta: "Ver Precios",
    icon: "creditcard",
    href: "/precios/",
  },
  {
    id: "cobertura-cdmx",
    name: "Cobertura CDMX",
    excerpt: "Llegamos a toda la Ciudad de México y Zona Metropolitana sin costos ocultos.",
    cta: "Ver Zonas",
    icon: "mappin",
    href: "/zonas/",
  },
  {
    id: "equipo-profesional",
    name: "Equipo Profesional",
    excerpt: "Personal capacitado que se encarga del montaje y te asesora durante todo el proceso.",
    cta: "Conocer Equipo",
    icon: "team",
    href: "/nosotros/",
  },
  {
    id: "montaje-incluido",
    name: "Montaje Incluido",
    excerpt: "Nos encargamos de instalar y desmontar todo el equipo. Tú solo disfruta tu evento.",
    cta: "Cómo Funciona",
    icon: "truck",
    href: "/como-funciona/",
  },
  {
    id: "experiencia",
    name: "+500 Eventos",
    excerpt: "Experiencia comprobada en bodas, XV años, corporativos y todo tipo de celebraciones.",
    cta: "Ver Portafolio",
    icon: "award",
    href: "/portafolio/",
  },
] as const;

/** Company reviews/testimonials */
export const REVIEWS = [
  {
    id: "review-1",
    company: "PODIUMEX",
    author: "Equipo PODIUMEX",
    role: "Especialistas en Podiums para Eventos",
    rating: 5,
    text: "Como empresa líder en venta y renta de podiums en México, valoramos trabajar con proveedores de primer nivel. EVENTECH complementa perfectamente nuestros servicios con su equipo audiovisual y mobiliario de alta calidad. Una alianza estratégica que beneficia a nuestros clientes.",
    event: "Alianza Estratégica",
    website: "https://podiumex.com/",
  },
  {
    id: "review-2",
    company: "PALED",
    author: "Equipo PALED",
    role: "Especialistas en Pantallas LED",
    rating: 5,
    text: "Con más de 30 años en el mercado de pantallas LED en México, reconocemos cuando una empresa comparte nuestros estándares de excelencia. EVENTECH es el complemento perfecto: mientras nosotros aportamos la tecnología visual, ellos proveen mobiliario, audio e iluminación de primer nivel. Juntos creamos experiencias memorables.",
    event: "Alianza Estratégica",
    website: "https://pantalla-led.com/",
  },
  {
    id: "review-3",
    company: "INFLAPY",
    author: "Equipo INFLAPY",
    role: "Especialistas en Inflables para Fiestas",
    rating: 5,
    text: "Con más de 500 eventos en CDMX y Estado de México, sabemos lo importante que es contar con proveedores confiables. EVENTECH complementa nuestros servicios de inflables con mobiliario, carpas e iluminación de primera. Juntos hacemos fiestas infantiles inolvidables.",
    event: "Alianza Estratégica",
    website: "https://inflablesparafiestas.com.mx/",
  },
  {
    id: "review-4",
    company: "REDEIL",
    author: "Equipo REDEIL",
    role: "Especialistas en Iluminación Profesional",
    rating: 5,
    text: "Con más de 30 años iluminando eventos en CDMX, sabemos reconocer la excelencia. EVENTECH es nuestro aliado perfecto: mientras nosotros transformamos espacios con luz profesional, ellos aportan mobiliario, audio y carpas de primera. Marcas como Martin Professional y Chauvet nos respaldan.",
    event: "Alianza Estratégica",
    website: "https://rentadeiluminacion.com/",
  },
  {
    id: "review-5",
    company: "DEGLOB",
    author: "Equipo DEGLOB",
    role: "Especialistas en Decoración con Globos",
    rating: 5,
    text: "Desde 2015 hemos decorado más de 5,000 eventos en CDMX. EVENTECH es nuestro aliado estratégico: nosotros aportamos arcos, columnas y backdrops de globos premium, mientras ellos complementan con mobiliario, iluminación y carpas de primera. Juntos creamos escenarios mágicos.",
    event: "Alianza Estratégica",
    website: "https://fantasyglobos.com.mx/",
  },
  {
    id: "review-6",
    company: "MESPIC",
    author: "Equipo MESPIC",
    role: "Especialistas en Mesas Picnic",
    rating: 5,
    text: "Con más de 10 años y 500+ eventos en todo México, somos líderes en renta de mesas picnic. EVENTECH complementa perfectamente nuestro servicio: nosotros aportamos el mobiliario rústico y ellos la iluminación, carpas y equipo audiovisual. Una combinación ganadora para eventos al aire libre.",
    event: "Alianza Estratégica",
    website: "https://mesaspicnic.com/",
  },
  {
    id: "review-7",
    company: "MEDEDUL",
    author: "Equipo MEDEDUL",
    role: "Especialistas en Mesas de Dulces y Candy Bar",
    rating: 5,
    text: "Con más de 127 reseñas y calificación de 4.9 estrellas, MEDEDUL es referente en mesas de dulces en CDMX. EVENTECH es nuestro aliado perfecto: mientras nosotros creamos candy bars, fuentes de chocolate y mesas de postres espectaculares, ellos aportan mobiliario, iluminación y carpas premium. Juntos hacemos eventos inolvidables.",
    event: "Alianza Estratégica",
    website: "https://mesas-de-dulces.com/",
  },
  {
    id: "review-8",
    company: "SOEVE",
    author: "Equipo SOEVE",
    role: "Especialistas en Sonido Profesional para Eventos",
    rating: 5,
    text: "Con más de 500 eventos exitosos en CDMX y Estado de México, SOEVE lidera en renta de sonido profesional. EVENTECH es nuestro aliado perfecto: mientras nosotros aportamos bocinas, consolas de mezcla y micrófonos de alta calidad, ellos complementan con mobiliario, carpas e iluminación premium. Juntos cubrimos eventos de 50 a 5,000 personas.",
    event: "Alianza Estratégica",
    website: "https://sonidoparaeventos.com.mx/",
  },
] as const;

/** Venue directory - Salones de fiestas reales en CDMX y Edo. Mex */
export const VENUES = [
  // ─── CDMX ───
  {
    name: "Hacienda de los Morales",
    zone: "CDMX",
    location: "Polanco",
    capacity: "150 – 500",
    eventTypes: ["Bodas", "Corporativo", "Social"],
    priceRange: "$$$$",
    mapUrl: "https://maps.google.com/?q=Hacienda+de+los+Morales+Polanco+CDMX",
  },
  {
    name: "Salón Los Candiles",
    zone: "CDMX",
    location: "Tlalpan",
    capacity: "100 – 300",
    eventTypes: ["Bodas", "XV Años", "Social"],
    priceRange: "$$$",
    mapUrl: "https://maps.google.com/?q=Salon+Los+Candiles+Tlalpan+CDMX",
  },
  {
    name: "Jardín Versal",
    zone: "CDMX",
    location: "Tlalpan",
    capacity: "80 – 250",
    eventTypes: ["Bodas", "Bautizos", "Social"],
    priceRange: "$$",
    mapUrl: "https://maps.google.com/?q=Jardin+Versal+Tlalpan+CDMX",
  },
  {
    name: "Ex Convento de San Hipólito",
    zone: "CDMX",
    location: "Centro Histórico",
    capacity: "200 – 600",
    eventTypes: ["Bodas", "Corporativo", "Galas"],
    priceRange: "$$$$",
    mapUrl: "https://maps.google.com/?q=Ex+Convento+de+San+Hipolito+CDMX",
  },
  {
    name: "Salón Acuarinto",
    zone: "CDMX",
    location: "Del Valle",
    capacity: "50 – 200",
    eventTypes: ["XV Años", "Social", "Infantil"],
    priceRange: "$$",
    mapUrl: "https://maps.google.com/?q=Salon+Acuarinto+Del+Valle+CDMX",
  },
  {
    name: "Quinta Real México",
    zone: "CDMX",
    location: "Polanco",
    capacity: "100 – 400",
    eventTypes: ["Bodas", "Corporativo", "Galas"],
    priceRange: "$$$$",
    mapUrl: "https://maps.google.com/?q=Quinta+Real+Mexico+Polanco",
  },
  // ─── Estado de México ───
  {
    name: "Jardín Lomas del Bosque",
    zone: "Edo. Méx",
    location: "Naucalpan",
    capacity: "100 – 350",
    eventTypes: ["Bodas", "XV Años", "Social"],
    priceRange: "$$$",
    mapUrl: "https://maps.google.com/?q=Jardin+Lomas+del+Bosque+Naucalpan",
  },
  {
    name: "Hacienda Santa Lucía",
    zone: "Edo. Méx",
    location: "Metepec",
    capacity: "150 – 500",
    eventTypes: ["Bodas", "Corporativo", "Social"],
    priceRange: "$$$",
    mapUrl: "https://maps.google.com/?q=Hacienda+Santa+Lucia+Metepec",
  },
  {
    name: "Salón Real Acozac",
    zone: "Edo. Méx",
    location: "Ixtapaluca",
    capacity: "200 – 800",
    eventTypes: ["Bodas", "XV Años", "Social"],
    priceRange: "$$",
    mapUrl: "https://maps.google.com/?q=Salon+Real+Acozac+Ixtapaluca",
  },
  {
    name: "La Mansión Toscana",
    zone: "Edo. Méx",
    location: "Huixquilucan",
    capacity: "100 – 300",
    eventTypes: ["Bodas", "Corporativo", "Galas"],
    priceRange: "$$$$",
    mapUrl: "https://maps.google.com/?q=La+Mansion+Toscana+Huixquilucan",
  },
  {
    name: "Jardines de Xochitla",
    zone: "Edo. Méx",
    location: "Tepotzotlán",
    capacity: "200 – 1000",
    eventTypes: ["Bodas", "Corporativo", "Social"],
    priceRange: "$$$",
    mapUrl: "https://maps.google.com/?q=Jardines+de+Xochitla+Tepotzotlan",
  },
  {
    name: "Hacienda Villejé",
    zone: "Edo. Méx",
    location: "Atlacomulco",
    capacity: "150 – 500",
    eventTypes: ["Bodas", "XV Años", "Social"],
    priceRange: "$$",
    mapUrl: "https://maps.google.com/?q=Hacienda+Villeje+Atlacomulco",
  },
] as const;

/** Company locations */
export const LOCATIONS = [
  {
    id: "polanco",
    name: "Polanco - Chapultepec",
    zone: "Norte-Centro CDMX",
    building: "IZA Business Centers Latitud Polanco",
    address: "Av. Ejército Nacional Mexicano 453 Piso 1",
    colony: "Chapultepec Morales, Granada",
    city: "Miguel Hidalgo, 11520 CDMX",
    phone: "55 6432 8954",
    rating: 4.4,
    reviews: 1022,
    coverage: "Polanco, Reforma, embajadas, corporativos multinacionales",
    mapUrl: "https://maps.google.com/?q=IZA+Business+Centers+Latitud+Polanco",
  },
  {
    id: "tlalnepantla",
    name: "Tlalnepantla",
    zone: "Norte Estado de México",
    building: "Sach Sentura",
    address: "Perif. Blvd. Manuel Ávila Camacho 2610, Torre B Piso 10",
    colony: "Valle de los Pinos 1a. Secc.",
    city: "Tlalnepantla de Baz, 54040 Edo. Méx.",
    phone: "55 6432 8954",
    rating: 4.6,
    reviews: 47,
    coverage: "Periférico norte, zona industrial Tlalnepantla, norte del Estado de México",
    mapUrl: "https://maps.google.com/?q=Sach+Sentura+Tlalnepantla",
  },
  {
    id: "bosques-lomas",
    name: "Bosques de las Lomas",
    zone: "Poniente CDMX",
    building: "IZA Business Centers Arcos Bosques",
    address: "Paseo de Los Tamarindos 400 Piso 21 y 26, Torre A",
    colony: "Bosques de las Lomas",
    city: "Cuajimalpa de Morelos, 05120 CDMX",
    phone: "55 6432 8954",
    rating: 4.7,
    reviews: 14,
    coverage: "Arcos Bosques, Santa Fe norte, zona corporativa exclusiva",
    mapUrl: "https://maps.google.com/?q=IZA+Business+Centers+Arcos+Bosques",
  },
  {
    id: "alvaro-obregon",
    name: "Álvaro Obregón",
    zone: "Sur-Poniente CDMX",
    building: "Oficinas EVENTECH",
    address: "Álvaro Obregón",
    colony: "Álvaro Obregón",
    city: "01210 Ciudad de México, CDMX",
    phone: "55 6432 8954",
    rating: 5.0,
    reviews: 0,
    coverage: "San Ángel, Coyoacán, Pedregal, sur de CDMX",
    mapUrl: "https://maps.app.goo.gl/Eo7XNEMCseLSVEALA",
  },
] as const;
