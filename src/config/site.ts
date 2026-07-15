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
    // Título fallback (páginas sin `title`). Sin marca, ver vault: Convencion-de-titulos.
    title: "Renta de equipo para eventos | Equipo para eventos en México",
    // Complemento homologado. Se añade solo si el título resultante cabe (≤60 chars).
    titleTemplate: "%s | Equipo para eventos en México",
    titleComplement: "Equipo para eventos en México",
    titleMaxLength: 60,
    description:
      "Renta de mobiliario, audio, carpas e iluminación para bodas, XV años y eventos corporativos en CDMX y Estado de México. Entrega, montaje y cotización en 24h.",
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
    alternateName: [
      "EVENTECH",
      "Eventech MX",
      "Renta de Equipo para Eventos CDMX",
      "eventech.mx",
    ],
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
      weekdays: { opens: "09:00", closes: "19:00" },
      saturday: { opens: "09:00", closes: "14:00" },
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
  rawTitle?: boolean;
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
    cta: "Mobiliario",
    icon: "chair",
    href: "/servicios/mobiliario/",
    image: "/images/mobiliario/silla-chiavari-dorada-salon-cdmx-07.avif",
    subcategories: [
      { name: "Sillas", href: "/servicios/mobiliario/sillas/" },
      { name: "Mesas", href: "/servicios/mobiliario/mesas/" },
      { name: "Salas Lounge", href: "/servicios/mobiliario/salas-lounge/" },
      { name: "Barras", href: "/servicios/mobiliario/barras/" },
      { name: "Mesas Picnic", href: "/servicios/mobiliario/mesas-picnic/" },
    ],
  },
  {
    id: "audiovisual",
    name: "Audiovisual",
    description: "Pantallas LED, sonido, proyectores",
    excerpt: "Pantallas LED, sonido profesional, proyectores y micrófonos. Todo para presentaciones impactantes.",
    cta: "Audiovisual",
    icon: "speaker",
    href: "/servicios/audiovisual/",
    image: "/images/audiovisual/sistema-audio-bafle-jbl-evento-corporativo.avif",
    subcategories: [
      { name: "Pantallas LED", href: "/servicios/audiovisual/pantallas-led/" },
      { name: "Sonido", href: "/servicios/audiovisual/sonido/" },
      { name: "Proyectores", href: "/servicios/audiovisual/proyectores/" },
      { name: "Micrófonos y DJ", href: "/servicios/audiovisual/microfonos-dj/" },
    ],
  },
  {
    id: "carpas",
    name: "Carpas",
    description: "Carpas y estructuras para eventos",
    excerpt: "Carpas profesionales en múltiples tamaños con montaje, iluminación interior y opciones de piso incluidas.",
    cta: "Carpas",
    icon: "tent",
    href: "/servicios/carpas/",
    image: "/images/carpas/carpa-transparente-boda-elegante.avif",
    subcategories: [
      { name: "Carpas Árabes", href: "/servicios/carpas/carpas-arabes/" },
      { name: "Estructurales", href: "/servicios/carpas/estructurales/" },
      { name: "Hangar", href: "/servicios/carpas/hangar/" },
      { name: "Pisos y Complementos", href: "/servicios/carpas/pisos-complementos/" },
    ],
  },
  {
    id: "iluminacion",
    name: "Iluminación",
    description: "Iluminación profesional para eventos",
    excerpt: "Luces LED arquitectónicas, robóticas, efectos especiales y cortinas de luz. Creamos el ambiente perfecto.",
    cta: "Iluminación",
    icon: "lightbulb",
    href: "/servicios/iluminacion/",
    image: "/images/iluminacion/efectos-especiales-humo-bajo.avif",
    subcategories: [
      { name: "Arquitectónica", href: "/servicios/iluminacion/arquitectonica/" },
      { name: "Decorativa", href: "/servicios/iluminacion/decorativa/" },
      { name: "Escenario", href: "/servicios/iluminacion/escenario/" },
      { name: "Efectos Especiales", href: "/servicios/iluminacion/efectos-especiales/" },
    ],
  },
  {
    id: "pistas",
    name: "Pistas de Baile",
    description: "Pistas LED, de madera y más",
    excerpt: "Pistas LED programables, de madera y modulares. El centro de atención de cualquier celebración.",
    cta: "Pistas de Baile",
    icon: "music",
    href: "/servicios/pistas-baile/",
    image: "/images/pistas-baile/pista-led-rgb-fiesta.avif",
    subcategories: [
      { name: "Pistas LED", href: "/servicios/pistas-baile/pistas-led/" },
      { name: "Madera Clásica", href: "/servicios/pistas-baile/madera-clasica/" },
      { name: "Tarimas y Escenarios", href: "/servicios/pistas-baile/tarimas-escenarios/" },
      { name: "Vintage y Temáticas", href: "/servicios/pistas-baile/vintage-tematicas/" },
    ],
  },
  {
    id: "inflables",
    name: "Inflables",
    description: "Brincolines, toboganes y juegos",
    excerpt: "Brincolines, toboganes, castillos y juegos inflables para fiestas infantiles. Diversión segura garantizada.",
    cta: "Inflables",
    icon: "balloon",
    href: "/servicios/inflables/",
    image: "/images/inflables/castillo-inflable-fiesta-infantil.avif",
    subcategories: [
      { name: "Juegos Infantiles", href: "/servicios/inflables/juegos-infantiles/" },
      { name: "Acuáticos", href: "/servicios/inflables/acuaticos/" },
      { name: "Interactivos", href: "/servicios/inflables/interactivos-deportivos/" },
      { name: "Adultos", href: "/servicios/inflables/adultos/" },
    ],
  },
  {
    id: "catering",
    name: "Catering",
    description: "Canapés, mesas de dulces, barras",
    excerpt: "Canapés gourmet, mesas de dulces, barra de quesos y snacks. Deliciosos complementos para consentir a tus invitados.",
    cta: "Catering",
    icon: "utensils",
    href: "/servicios/catering/",
    image: "/images/catering/cafe-break-corporativo-setup.avif",
    subcategories: [
      { name: "Estaciones de Servicio", href: "/servicios/catering/estaciones-servicio/" },
      { name: "Cocina Móvil", href: "/servicios/catering/cocina-movil/" },
      { name: "Vajilla y Cristalería", href: "/servicios/catering/vajilla-cristaleria/" },
      { name: "Refrigeración", href: "/servicios/catering/refrigeracion/" },
    ],
  },
  {
    id: "computo",
    name: "Cómputo",
    description: "Laptops, iPads, PCs e impresoras",
    excerpt: "Laptops empresariales, iPads, PCs de escritorio e impresoras para registro, congresos y capacitaciones. Configuradas, probadas e instaladas en tu evento.",
    cta: "Cómputo",
    icon: "laptop",
    href: "/servicios/computo/",
    image: "/images/audiovisual/monitor-pantalla-presentacion-congreso.avif",
    subcategories: [
      { name: "Laptops", href: "/servicios/computo/laptops/" },
      { name: "iPads y Tablets", href: "/servicios/computo/ipads-tablets/" },
      { name: "PCs de Escritorio", href: "/servicios/computo/pcs-escritorio/" },
      { name: "Impresión y Periféricos", href: "/servicios/computo/impresion-perifericos/" },
    ],
  },
  {
    id: "accesorios",
    name: "Accesorios",
    description: "Barras, calentadores, generadores",
    excerpt: "Barras, calentadores, generadores, manteles y fundas. Todo lo necesario para complementar tu evento.",
    cta: "Accesorios",
    icon: "package",
    href: "/servicios/accesorios/",
    image: "/images/accesorios/alfombra-roja-red-carpet-evento.avif",
    subcategories: [
      { name: "Señalización y Alfombras", href: "/servicios/accesorios/senalizacion-alfombras/" },
      { name: "Mantelería y Textiles", href: "/servicios/accesorios/manteleria-textiles/" },
      { name: "Plantas de Energía", href: "/servicios/accesorios/plantas-energia/" },
      { name: "Calefacción y Clima", href: "/servicios/accesorios/calefaccion-clima/" },
    ],
  },
] as const;

/** Event types for the site */
export const EVENT_TYPES = [
  {
    id: "bodas",
    name: "Bodas",
    description: "Todo para tu boda perfecta",
    excerpt: "Paquetes completos con mobiliario elegante, iluminación romántica y pistas de baile. Nos encargamos de cada detalle.",
    cta: "Bodas",
    icon: "heart",
    href: "/eventos/bodas/",
    image: "/images/eventos/bodas-mobiliario-iluminacion.avif",
    subcategories: [
      { name: "Mobiliario para Bodas", href: "/servicios/mobiliario/sillas/" },
      { name: "Iluminación Romántica", href: "/servicios/iluminacion/decorativa/" },
      { name: "Pista de Baile", href: "/servicios/pistas-baile/pistas-led/" },
      { name: "Carpas para Jardín", href: "/servicios/carpas/carpas-arabes/" },
    ],
  },
  {
    id: "xv-anos",
    name: "XV Años",
    description: "Equipamiento para quinceañeras",
    excerpt: "Pista de baile LED, iluminación espectacular y mobiliario de lujo. Hacemos realidad el sueño de la quinceañera.",
    cta: "XV Años",
    icon: "crown",
    href: "/servicios/",
    image: "/images/eventos/xv-anos-pista-iluminacion.avif",
    subcategories: [
      { name: "Pista LED Programable", href: "/servicios/pistas-baile/pistas-led/" },
      { name: "Iluminación Escenario", href: "/servicios/iluminacion/escenario/" },
      { name: "Salas Lounge", href: "/servicios/mobiliario/salas-lounge/" },
      { name: "Efectos Especiales", href: "/servicios/iluminacion/efectos-especiales/" },
    ],
  },
  {
    id: "corporativos",
    name: "Corporativos",
    description: "Congresos, conferencias, lanzamientos",
    excerpt: "Audio y video de alta calidad, mobiliario ejecutivo y montaje impecable para eventos empresariales.",
    cta: "Corporativos",
    icon: "briefcase",
    href: "/servicios/",
    image: "/images/eventos/corporativo-audio-pantalla.avif",
    subcategories: [
      { name: "Pantallas LED", href: "/servicios/audiovisual/pantallas-led/" },
      { name: "Sonido Profesional", href: "/servicios/audiovisual/sonido/" },
      { name: "Mobiliario Ejecutivo", href: "/servicios/mobiliario/mesas/" },
      { name: "Iluminación Arquitectónica", href: "/servicios/iluminacion/arquitectonica/" },
    ],
  },
  {
    id: "sociales",
    name: "Eventos Sociales",
    description: "Cumpleaños, graduaciones, reuniones",
    excerpt: "Cumpleaños, graduaciones, baby showers y reuniones. Adaptamos nuestros servicios a tu presupuesto.",
    cta: "Eventos Sociales",
    icon: "users",
    href: "/servicios/",
    image: "/images/eventos/evento-social-fiesta.avif",
    subcategories: [
      { name: "Mobiliario para Fiestas", href: "/servicios/mobiliario/sillas/" },
      { name: "Sonido y DJ", href: "/servicios/audiovisual/microfonos-dj/" },
      { name: "Iluminación Decorativa", href: "/servicios/iluminacion/decorativa/" },
      { name: "Catering", href: "/servicios/catering/estaciones-servicio/" },
    ],
  },
  {
    id: "infantiles",
    name: "Fiestas Infantiles",
    description: "Cumpleaños y eventos para niños",
    excerpt: "Inflables, mesas temáticas, juegos y decoración colorida. Diversión garantizada para los más pequeños.",
    cta: "Fiestas Infantiles",
    icon: "cake",
    href: "/servicios/inflables/",
    image: "/images/eventos/fiesta-infantil-inflables.avif",
    subcategories: [
      { name: "Juegos Infantiles", href: "/servicios/inflables/juegos-infantiles/" },
      { name: "Inflables Acuáticos", href: "/servicios/inflables/acuaticos/" },
      { name: "Mesas de Dulces", href: "/servicios/catering/estaciones-servicio/" },
      { name: "Inflables Interactivos", href: "/servicios/inflables/interactivos-deportivos/" },
    ],
  },
  {
    id: "graduaciones",
    name: "Graduaciones",
    description: "Ceremonias y fiestas de graduación",
    excerpt: "Escenarios, audio profesional y mobiliario elegante para celebrar este logro académico como se merece.",
    cta: "Graduaciones",
    icon: "graduation",
    href: "/servicios/audiovisual/",
    image: "/images/eventos/graduacion-escenario-audio.avif",
    subcategories: [
      { name: "Tarimas y Escenarios", href: "/servicios/pistas-baile/tarimas-escenarios/" },
      { name: "Audio Profesional", href: "/servicios/audiovisual/sonido/" },
      { name: "Sillas para Ceremonia", href: "/servicios/mobiliario/sillas/" },
      { name: "Proyectores", href: "/servicios/audiovisual/proyectores/" },
    ],
  },
  {
    id: "baby-showers",
    name: "Baby Showers",
    description: "Celebraciones para futuros bebés",
    excerpt: "Decoración temática, mesas de dulces y mobiliario encantador para darle la bienvenida al nuevo integrante.",
    cta: "Baby Showers",
    icon: "baby",
    href: "/servicios/accesorios/",
    image: "/images/eventos/baby-shower-decoracion.avif",
    subcategories: [
      { name: "Mesas de Dulces", href: "/servicios/catering/estaciones-servicio/" },
      { name: "Mobiliario Vintage", href: "/servicios/mobiliario/salas-lounge/" },
      { name: "Mantelería Temática", href: "/servicios/accesorios/manteleria-textiles/" },
      { name: "Iluminación Decorativa", href: "/servicios/iluminacion/decorativa/" },
    ],
  },
  {
    id: "religiosos",
    name: "Eventos Religiosos",
    description: "Bautizos, primeras comuniones, confirmaciones",
    excerpt: "Mobiliario clásico, carpas elegantes y decoración sobria para celebraciones de fe y tradición familiar.",
    cta: "Eventos Religiosos",
    icon: "church",
    href: "/servicios/mobiliario/",
    image: "/images/eventos/evento-religioso-mobiliario.avif",
    subcategories: [
      { name: "Sillas Clásicas", href: "/servicios/mobiliario/sillas/" },
      { name: "Carpas Elegantes", href: "/servicios/carpas/estructurales/" },
      { name: "Audio para Ceremonia", href: "/servicios/audiovisual/sonido/" },
      { name: "Mantelería", href: "/servicios/accesorios/manteleria-textiles/" },
    ],
  },
] as const;

/** Why choose us features */
export const FEATURES = [
  {
    id: "respuesta-24h",
    name: "Respuesta en 24h",
    excerpt: "Cotización garantizada en menos de 24 horas. Sabemos que tu tiempo es valioso.",
    cta: "Cotizar Ahora",
    icon: "clock",
    href: "#reserva-heading",
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
    href: "/servicios/",
  },
  {
    id: "cobertura-cdmx",
    name: "Cobertura CDMX",
    excerpt: "Llegamos a toda la Ciudad de México y Zona Metropolitana sin costos ocultos.",
    cta: "Ver Zonas",
    icon: "mappin",
    href: "/zonas/cdmx/",
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
    href: "/nosotros/",
  },
  {
    id: "experiencia",
    name: "+500 Eventos",
    excerpt: "Experiencia comprobada en bodas, XV años, corporativos y todo tipo de celebraciones.",
    cta: "Ver Portafolio",
    icon: "award",
    href: "/nosotros/",
  },
] as const;

/**
 * Alianzas estratégicas — empresas del sector eventos con las que EVENTECH
 * coordina montajes conjuntos. NO son reseñas ni testimonios: cada texto
 * describe al aliado (giro, cobertura) y cómo se complementan los servicios.
 * No mostrar estrellas ni emitir schema.org/Review desde estas entradas.
 */
export const ALLIANCES = [
  {
    id: "aliado-1",
    company: "PODIUMEX",
    name: "PODIUMEX",
    role: "Especialistas en Podiums para Eventos",
    text: "Empresa de venta y renta de podiums para eventos en México. En montajes coordinados, PODIUMEX aporta los podiums y EVENTECH complementa con equipo audiovisual y mobiliario.",
    website: "https://podiumex.com/",
  },
  {
    id: "aliado-2",
    company: "PALED",
    name: "PALED",
    role: "Especialistas en Pantallas LED",
    text: "Más de 30 años en el mercado de pantallas LED en México. En eventos coordinados, PALED aporta la tecnología visual y EVENTECH complementa con mobiliario, audio e iluminación.",
    website: "https://pantalla-led.com/",
  },
  {
    id: "aliado-3",
    company: "INFLAPY",
    name: "INFLAPY",
    role: "Especialistas en Inflables para Fiestas",
    text: "Renta de inflables para fiestas con más de 500 eventos en CDMX y Estado de México. En fiestas infantiles coordinadas, INFLAPY aporta los inflables y EVENTECH complementa con mobiliario, carpas e iluminación.",
    website: "https://inflablesparafiestas.com.mx/",
  },
  {
    id: "aliado-4",
    company: "REDEIL",
    name: "REDEIL",
    role: "Especialistas en Iluminación para Eventos",
    text: "Más de 30 años y 3,000 eventos iluminados en CDMX y Estado de México: guirnaldas Edison, sky trackers, cabezas móviles, gobos, cascadas LED, city color y city light con equipo Martin Professional, Chauvet y Elation, con instalación y operación técnica incluidas. En producciones coordinadas, REDEIL aporta la iluminación y los efectos y EVENTECH complementa con mobiliario, carpas, audio y pistas.",
    website: "https://rentadeiluminacion.com/",
  },
  {
    id: "aliado-5",
    company: "DEGLOB",
    name: "DEGLOB",
    role: "Especialistas en Decoración con Globos",
    text: "Decoración con globos desde 2015, con más de 5,000 eventos en CDMX. En montajes coordinados, DEGLOB aporta arcos, columnas y backdrops de globos y EVENTECH complementa con mobiliario, iluminación y carpas.",
    website: "",
  },
  {
    id: "aliado-6",
    company: "MESPIC",
    name: "MESPIC",
    role: "Especialistas en Mesas Picnic",
    text: "Más de 10 años y 500+ eventos en renta de mesas picnic en todo México. En eventos al aire libre coordinados, MESPIC aporta el mobiliario rústico y EVENTECH complementa con iluminación, carpas y equipo audiovisual.",
    website: "https://mesaspicnic.com/",
  },
  {
    id: "aliado-7",
    company: "MEDEDUL",
    name: "MEDEDUL",
    role: "Especialistas en Mesas de Dulces y Candy Bar",
    text: "Mesas de dulces y candy bar en CDMX: candy bars, fuentes de chocolate y mesas de postres. En eventos coordinados, MEDEDUL aporta la mesa de dulces y EVENTECH complementa con mobiliario, iluminación y carpas.",
    website: "https://mesas-de-dulces.com/",
  },
  {
    id: "aliado-8",
    company: "SOEVE",
    name: "SOEVE",
    role: "Especialistas en Sonido Profesional para Eventos",
    text: "Renta de sonido profesional con más de 500 eventos en CDMX y Estado de México: bocinas, consolas de mezcla y micrófonos. En montajes coordinados, SOEVE aporta el audio y EVENTECH complementa con mobiliario, carpas e iluminación para eventos de 50 a 5,000 personas.",
    website: "https://sonidoparaeventos.com.mx/",
  },
  {
    id: "aliado-9",
    company: "AVANTEXPO",
    name: "AVANTEXPO",
    role: "Especialistas en Equipos para Exposiciones",
    text: "20 años en venta y renta de equipos para exposiciones —stands modulares, vitrinas, pantallas LED e iluminación— para ferias y congresos en México. Cuando el montaje va más allá del stand, AVANTEXPO coordina con EVENTECH mobiliario, carpas, audio e iluminación.",
    website: "",
  },
  {
    id: "aliado-10",
    company: "BRINCOLINS",
    name: "BRINCOLINS",
    role: "Especialistas en Inflables para Fiestas Infantiles",
    text: "Más de 20 años y 500+ eventos al año en renta de inflables y brincolines en CDMX y Estado de México. En fiestas infantiles coordinadas, BRINCOLINS aporta los inflables y EVENTECH complementa con mobiliario, carpas, iluminación y audio.",
    website: "https://brincolins.com/",
  },
  {
    id: "aliado-11",
    company: "SEGUREVENTOS",
    name: "SeguridadEventos",
    role: "Especialistas en Seguridad para Eventos",
    text: "Más de 15 años y 500+ eventos protegidos en México, con personal certificado ante DGSSP y STPS. En eventos coordinados, SeguridadEventos cubre la seguridad y EVENTECH monta mobiliario, carpas, audio e iluminación.",
    website: "https://seguridadeventos.com/",
  },
  {
    id: "aliado-12",
    company: "PALOMITA",
    name: "Palomita.mx",
    role: "Especialistas en Máquinas de Palomitas para Eventos",
    text: "Renta de máquinas de palomitas con operador —carrito vintage y gourmet— para bodas, XV años y corporativos en CDMX y Estado de México, con más de 500 eventos. En montajes coordinados, Palomita.mx aporta la estación de snacks y EVENTECH el mobiliario, las carpas, la iluminación y el audio.",
    website: "",
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
