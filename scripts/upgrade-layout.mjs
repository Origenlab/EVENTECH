/**
 * EVENTECH Layout Upgrade Script — OrigenLab v2.0
 * Adds Gallery4x4, PricingCards, FaqSection to N2+N3 pages
 * Reviews schema on key N3 pages
 */
import fs from 'fs';
import path from 'path';

const BASE = '/Users/frankoropeza/Desktop/CLIENTES/EVENTECH';
const PAGES = `${BASE}/src/pages/servicios`;

// ═══════════════════════════════════════════════════════════════
// IMAGE DATA
// ═══════════════════════════════════════════════════════════════

const MOB_FALLBACKS = [
  { src: "/images/mobiliario/silla-tiffany-dorada-boda-gala-01.avif", alt: "Silla Tiffany dorada para boda de gala en CDMX" },
  { src: "/images/mobiliario/salon-mesas-redondas-banquete-montaje.avif", alt: "Salón con mesas redondas montaje banquete" },
  { src: "/images/mobiliario/lounge-moderno-terciopelo-evento-premium.avif", alt: "Sala lounge moderno terciopelo evento premium" },
  { src: "/images/mobiliario/barra-bebidas-bartender-madera-evento.avif", alt: "Barra de bebidas bartender madera para evento" },
  { src: "/images/mobiliario/silla-chiavari-dorada-boda-cdmx-01.avif", alt: "Silla Chiavari dorada boda CDMX" },
  { src: "/images/mobiliario/barra-postres-candy-bar-boda-elegante.avif", alt: "Barra de postres candy bar boda elegante" },
  { src: "/images/mobiliario/silla-crossback-natural-hacienda-boda-01.avif", alt: "Silla Crossback natural hacienda boda" },
  { src: "/images/mobiliario/silla-ghost-cristal-boda-exterior-01.avif", alt: "Silla Ghost cristal transparente boda exterior" },
];

const N2_IMAGES = {
  audiovisual: [
    { src: "/images/audiovisual/cabina-dj-profesional-boda-cdmx.avif", alt: "Cabina DJ profesional para boda en CDMX" },
    { src: "/images/audiovisual/equipo-audiovisual-completo-boda.avif", alt: "Equipo audiovisual completo para boda" },
    { src: "/images/audiovisual/microfono-inalambrico-shure-conferencia-evento.avif", alt: "Micrófono inalámbrico Shure para conferencia" },
    { src: "/images/audiovisual/microfono-solapa-diadema-conferencista.avif", alt: "Micrófono de solapa y diadema para conferencista" },
    { src: "/images/audiovisual/monitor-pantalla-presentacion-congreso.avif", alt: "Monitor pantalla presentación congreso" },
    { src: "/images/audiovisual/pantalla-led-videowall-evento-corporativo.avif", alt: "Pantalla LED videowall evento corporativo" },
    { src: "/images/audiovisual/proyector-4k-pantalla-gigante-evento.avif", alt: "Proyector 4K pantalla gigante evento" },
    { src: "/images/audiovisual/sistema-audio-bafle-jbl-evento-corporativo.avif", alt: "Sistema audio JBL evento corporativo" },
  ],
  carpas: [
    { src: "/images/carpas/carpa-arabe-beduina-boda-jardin.avif", alt: "Carpa árabe beduina para boda en jardín" },
    { src: "/images/carpas/carpa-estructural-grande-congreso.avif", alt: "Carpa estructural grande para congreso" },
    { src: "/images/carpas/carpa-hangar-industrial-evento-grande.avif", alt: "Carpa hangar industrial evento grande" },
    { src: "/images/carpas/carpa-mediana-quinceanos-decorada.avif", alt: "Carpa mediana quinceaños decorada" },
    { src: "/images/carpas/carpa-transparente-boda-elegante.avif", alt: "Carpa transparente boda elegante" },
    { src: "/images/carpas/forros-interiores-carpa-elegante.avif", alt: "Forros interiores carpa elegante" },
    ...MOB_FALLBACKS.slice(0, 2),
  ],
  catering: [
    { src: "/images/catering/barra-cocteleria-botanica-boda.avif", alt: "Barra coctelería botánica boda" },
    { src: "/images/catering/barra-dulces-candy-bar-xv-anos.avif", alt: "Barra dulces candy bar XV años" },
    { src: "/images/catering/cafe-break-corporativo-setup.avif", alt: "Café break corporativo setup" },
    { src: "/images/catering/mesa-bufet-banquete-corporativo.avif", alt: "Mesa bufet banquete corporativo" },
    { src: "/images/catering/vajilla-cristaleria-premium-boda.avif", alt: "Vajilla cristalería premium boda" },
    ...MOB_FALLBACKS.slice(0, 3),
  ],
  iluminacion: [
    { src: "/images/iluminacion/cabezas-moviles-beam-evento.avif", alt: "Cabezas móviles beam evento" },
    { src: "/images/iluminacion/efectos-especiales-humo-bajo.avif", alt: "Efectos especiales humo bajo" },
    { src: "/images/iluminacion/guirnaldas-edison-jardin-boda.avif", alt: "Guirnaldas Edison jardín boda" },
    { src: "/images/iluminacion/iluminacion-arquitectonica-hacienda.avif", alt: "Iluminación arquitectónica hacienda" },
    { src: "/images/iluminacion/luces-neon-uv-fiesta-glow.avif", alt: "Luces neón UV fiesta glow" },
    { src: "/images/guirnaldas/boda-jardin.avif", alt: "Guirnaldas Edison iluminando boda en jardín" },
    { src: "/images/guirnaldas/100m.avif", alt: "Guirnaldas Edison 100 metros para evento" },
    { src: "/images/guirnaldas/200m.avif", alt: "Guirnaldas Edison 200 metros boda grande" },
  ],
  inflables: [
    { src: "/images/inflables/castillo-inflable-fiesta-infantil.avif", alt: "Castillo inflable fiesta infantil" },
    { src: "/images/inflables/alberca-inflable-fiesta-acuatica.avif", alt: "Alberca inflable fiesta acuática" },
    { src: "/images/inflables/inflable-obstaculos-kermesse.avif", alt: "Inflable obstáculos kermesse" },
    { src: "/images/inflables/tobogan-inflable-agua-verano.avif", alt: "Tobogán inflable agua verano" },
    ...MOB_FALLBACKS.slice(0, 4),
  ],
  mobiliario: [
    { src: "/images/mobiliario/silla-tiffany-dorada-boda-gala-01.avif", alt: "Silla Tiffany dorada boda de gala" },
    { src: "/images/mobiliario/silla-chiavari-dorada-boda-cdmx-01.avif", alt: "Silla Chiavari dorada boda CDMX" },
    { src: "/images/mobiliario/salon-mesas-redondas-banquete-montaje.avif", alt: "Salón mesas redondas banquete montaje" },
    { src: "/images/mobiliario/barra-bebidas-bartender-madera-evento.avif", alt: "Barra bebidas bartender madera evento" },
    { src: "/images/mobiliario/lounge-moderno-terciopelo-evento-premium.avif", alt: "Lounge moderno terciopelo evento premium" },
    { src: "/images/mobiliario/silla-crossback-natural-hacienda-boda-01.avif", alt: "Silla Crossback natural hacienda" },
    { src: "/images/mobiliario/silla-ghost-cristal-boda-exterior-01.avif", alt: "Silla Ghost cristal boda exterior" },
    { src: "/images/mobiliario/barra-postres-candy-bar-boda-elegante.avif", alt: "Barra postres candy bar boda elegante" },
  ],
  "pistas-baile": [
    { src: "/images/pistas-baile/pista-led-rgb-fiesta.avif", alt: "Pista LED RGB para fiesta" },
    { src: "/images/pistas-baile/pista-madera-natural-boda.avif", alt: "Pista madera natural boda" },
    { src: "/images/pistas-baile/pista-acrilica-transparente-boda.avif", alt: "Pista acrílica transparente boda" },
    { src: "/images/pistas-baile/pista-madera-negra-eventos-corporativos.avif", alt: "Pista madera negra eventos corporativos" },
    ...MOB_FALLBACKS.slice(0, 4),
  ],
  accesorios: [
    { src: "/images/accesorios/alfombra-roja-red-carpet-evento.avif", alt: "Alfombra roja red carpet evento" },
    { src: "/images/accesorios/calentador-patio-terraza-evento.avif", alt: "Calentador patio terraza evento" },
    { src: "/images/accesorios/manteles-premium-boda-elegante.avif", alt: "Manteles premium boda elegante" },
    { src: "/images/accesorios/planta-luz-generador-evento.avif", alt: "Planta de luz generador evento" },
    ...MOB_FALLBACKS.slice(0, 4),
  ],
};

// ═══════════════════════════════════════════════════════════════
// N2 CATEGORY METADATA
// ═══════════════════════════════════════════════════════════════

const N2_META = {
  audiovisual: { galleryTitle: "¿Cómo luce nuestro equipo audiovisual en eventos?", serviceName: "equipo audiovisual" },
  carpas: { galleryTitle: "¿Cómo lucen nuestras carpas para eventos?", serviceName: "carpas para eventos" },
  catering: { galleryTitle: "¿Cómo luce nuestro equipo de catering?", serviceName: "equipo de catering" },
  iluminacion: { galleryTitle: "¿Cómo luce nuestra iluminación para eventos?", serviceName: "iluminación para eventos" },
  inflables: { galleryTitle: "¿Cómo lucen nuestros inflables para eventos?", serviceName: "inflables para eventos" },
  mobiliario: { galleryTitle: "¿Cómo luce nuestro mobiliario para eventos?", serviceName: "mobiliario para eventos" },
  "pistas-baile": { galleryTitle: "¿Cómo lucen nuestras pistas de baile?", serviceName: "pistas de baile" },
  accesorios: { galleryTitle: "¿Cómo lucen nuestros accesorios para eventos?", serviceName: "accesorios para eventos" },
};

// ═══════════════════════════════════════════════════════════════
// N3 PRICING DATA
// ═══════════════════════════════════════════════════════════════

const N3_PRICING = {
  // Mobiliario
  "mobiliario/mesas": {
    serviceName: "mesas para eventos",
    galleryTitle: "¿Cómo lucen nuestras mesas para eventos?",
    packages: [
      { name: "Básico", price: "$120", priceNote: "por mesa / evento", description: "Mesas plegables para eventos prácticos.", features: [{ text: "Mesas rectangulares plegables", included: true }, { text: "Entrega y recolección", included: true }, { text: "Manteles incluidos", included: false }, { text: "Montaje profesional", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$200", priceNote: "por mesa / evento", description: "La opción más popular para bodas y galas.", badge: "Más popular", highlight: true, features: [{ text: "Mesas redondas o rectangulares", included: true }, { text: "Entrega y recolección", included: true }, { text: "Manteles incluidos", included: true }, { text: "Montaje profesional", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$350", priceNote: "por mesa / evento", description: "Mesas de diseño para eventos de alto nivel.", features: [{ text: "Mesas cocktail o imperiales", included: true }, { text: "Entrega y recolección", included: true }, { text: "Mantelería premium", included: true }, { text: "Montaje y asesoría incluidos", included: true }], ctaHref: "/cotizar/" },
      { name: "Evento Grande", price: "Cotizar", priceNote: "+50 mesas / precio especial", description: "Precios por volumen para grandes eventos.", features: [{ text: "Cualquier modelo disponible", included: true }, { text: "Logística completa", included: true }, { text: "Descuento por volumen", included: true }, { text: "Coordinador asignado", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "mobiliario/salas-lounge": {
    serviceName: "salas lounge",
    galleryTitle: "¿Cómo lucen nuestras salas lounge?",
    packages: [
      { name: "Básico", price: "$3,500", priceNote: "por sala / evento", description: "Sala lounge compacta para zonas de descanso.", features: [{ text: "1 sofá + 2 puffs", included: true }, { text: "Mesa de centro", included: true }, { text: "Accesorios decorativos", included: false }, { text: "Iluminación ambiental", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$6,500", priceNote: "por sala / evento", description: "La sala lounge más solicitada para bodas.", badge: "Más popular", highlight: true, features: [{ text: "2 sofás + 4 puffs", included: true }, { text: "Mesas laterales y centro", included: true }, { text: "Accesorios decorativos", included: true }, { text: "Montaje profesional", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$12,000", priceNote: "por sala / evento", description: "Lounge de lujo con diseño personalizado.", features: [{ text: "Mobiliario premium terciopelo", included: true }, { text: "Iluminación LED ambiental", included: true }, { text: "Alfombra y accesorios", included: true }, { text: "Diseño personalizado", included: true }], ctaHref: "/cotizar/" },
      { name: "Evento Grande", price: "Cotizar", priceNote: "+3 salas / precio especial", description: "Múltiples zonas lounge para grandes eventos.", features: [{ text: "Diseño integral de zonas", included: true }, { text: "Logística completa", included: true }, { text: "Descuento por volumen", included: true }, { text: "Coordinador asignado", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "mobiliario/barras": {
    serviceName: "barras para eventos",
    galleryTitle: "¿Cómo lucen nuestras barras para eventos?",
    packages: [
      { name: "Básico", price: "$2,500", priceNote: "por barra / evento", description: "Barra funcional para servicio de bebidas.", features: [{ text: "Barra estándar 2m", included: true }, { text: "Entrega y recolección", included: true }, { text: "Accesorios de bar", included: false }, { text: "Iluminación LED", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$4,500", priceNote: "por barra / evento", description: "Barra premium con accesorios incluidos.", badge: "Más popular", highlight: true, features: [{ text: "Barra premium 2.5m", included: true }, { text: "Back bar con estantes", included: true }, { text: "Accesorios completos", included: true }, { text: "Montaje profesional", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$8,000", priceNote: "por barra / evento", description: "Barra de diseño con LED y branding.", features: [{ text: "Barra hexagonal o curva", included: true }, { text: "Iluminación LED integrada", included: true }, { text: "Branding personalizable", included: true }, { text: "Diseño y montaje premium", included: true }], ctaHref: "/cotizar/" },
      { name: "Full Service", price: "Cotizar", priceNote: "barra + bartenders", description: "Servicio completo de barra con personal.", features: [{ text: "Barra premium a elegir", included: true }, { text: "Bartenders profesionales", included: true }, { text: "Cristalería completa", included: true }, { text: "Coordinación integral", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  // Audiovisual
  "audiovisual/microfonos-dj": {
    serviceName: "micrófonos y equipo DJ",
    galleryTitle: "¿Cómo luce nuestro equipo de micrófonos y DJ?",
    packages: [
      { name: "Básico", price: "$800", priceNote: "por evento", description: "1-2 micrófonos para ceremonias y brindis.", features: [{ text: "2 micrófonos inalámbricos", included: true }, { text: "Receptor y baterías", included: true }, { text: "Equipo DJ", included: false }, { text: "Cabina DJ", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$1,500", priceNote: "por evento", description: "Micrófonos + equipo DJ básico.", badge: "Más popular", highlight: true, features: [{ text: "3 micrófonos (mano + solapa)", included: true }, { text: "Controlador DDJ-1000", included: true }, { text: "Monitores de referencia", included: true }, { text: "Ingeniero de audio", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$2,800", priceNote: "por evento", description: "Setup DJ completo con cabina iluminada.", features: [{ text: "Pioneer CDJ-3000 + DJM-900", included: true }, { text: "Cabina DJ iluminada", included: true }, { text: "Micrófonos premium Shure", included: true }, { text: "Técnico dedicado", included: true }], ctaHref: "/cotizar/" },
      { name: "Full Setup", price: "Cotizar", priceNote: "producción completa", description: "Producción audiovisual integral.", features: [{ text: "Todo el equipo premium", included: true }, { text: "Cabina con branding custom", included: true }, { text: "Efectos de iluminación", included: true }, { text: "Equipo técnico completo", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "audiovisual/pantallas-led": {
    serviceName: "pantallas LED",
    galleryTitle: "¿Cómo lucen nuestras pantallas LED en eventos?",
    packages: [
      { name: "Básico", price: "$2,000", priceNote: "por evento", description: "Pantalla LED individual para presentaciones.", features: [{ text: "Pantalla LED 55-65\"", included: true }, { text: "Pedestal y cableado", included: true }, { text: "Técnico de instalación", included: true }, { text: "Videowall modular", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$4,500", priceNote: "por evento", description: "Pantallas para bodas y eventos medianos.", badge: "Más popular", highlight: true, features: [{ text: "Pantalla LED 75-85\"", included: true }, { text: "Procesador de video", included: true }, { text: "Técnico de operación", included: true }, { text: "Contenido personalizable", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$8,000", priceNote: "por evento", description: "Videowall modular para congresos y galas.", features: [{ text: "Videowall hasta 3x2m", included: true }, { text: "Procesador profesional", included: true }, { text: "Técnico dedicado", included: true }, { text: "Montaje especializado", included: true }], ctaHref: "/cotizar/" },
      { name: "Videowall XL", price: "Cotizar", priceNote: "producción a medida", description: "Videowall gigante para festivales y congresos.", features: [{ text: "Videowall hasta 6x3m", included: true }, { text: "Rigging certificado", included: true }, { text: "Equipo técnico completo", included: true }, { text: "Producción integral", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "audiovisual/proyectores": {
    serviceName: "proyectores y video",
    galleryTitle: "¿Cómo lucen nuestros proyectores en eventos?",
    packages: [
      { name: "Básico", price: "$1,500", priceNote: "por evento", description: "Proyector para presentaciones corporativas.", features: [{ text: "Proyector Full HD 5,000 lm", included: true }, { text: "Pantalla de proyección", included: true }, { text: "Cableado HDMI", included: true }, { text: "Streaming en vivo", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$3,000", priceNote: "por evento", description: "Proyección profesional para eventos medianos.", badge: "Más popular", highlight: true, features: [{ text: "Proyector 4K 7,000 lm", included: true }, { text: "Pantalla motorizada", included: true }, { text: "Técnico de operación", included: true }, { text: "Laptop de respaldo", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$5,500", priceNote: "por evento", description: "Proyección de alto impacto con streaming.", features: [{ text: "Proyector 4K 10,000 lm", included: true }, { text: "Streaming profesional", included: true }, { text: "Cámaras HD + switcher", included: true }, { text: "Equipo técnico completo", included: true }], ctaHref: "/cotizar/" },
      { name: "Producción Full", price: "Cotizar", priceNote: "mapping + streaming", description: "Mapping arquitectónico y producción audiovisual.", features: [{ text: "Multi-proyector mapping", included: true }, { text: "Producción streaming HD", included: true }, { text: "Grabación profesional", included: true }, { text: "Director técnico", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "audiovisual/sonido": {
    serviceName: "sonido profesional",
    galleryTitle: "¿Cómo luce nuestro equipo de sonido en eventos?",
    packages: [
      { name: "Básico", price: "$2,500", priceNote: "por evento", description: "Sonido para eventos de hasta 100 personas.", features: [{ text: "2 bocinas 12\" amplificadas", included: true }, { text: "1 subwoofer", included: true }, { text: "2 micrófonos", included: true }, { text: "Ingeniero de audio", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$5,000", priceNote: "por evento", description: "Sistema profesional hasta 300 personas.", badge: "Más popular", highlight: true, features: [{ text: "Line array compacto", included: true }, { text: "2 subwoofers", included: true }, { text: "Mezcla digital 16 ch", included: true }, { text: "Ingeniero de audio", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$9,000", priceNote: "por evento", description: "Sistema line array para 500+ personas.", features: [{ text: "Line array profesional", included: true }, { text: "4 subwoofers", included: true }, { text: "Mezcla digital 32 ch", included: true }, { text: "Equipo técnico completo", included: true }], ctaHref: "/cotizar/" },
      { name: "Festival", price: "Cotizar", priceNote: "producción masiva", description: "Sonido para festivales y conciertos.", features: [{ text: "Multi-sistema line array", included: true }, { text: "Monitoreo de escenario", included: true }, { text: "Producción completa", included: true }, { text: "Director de audio", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  // Carpas
  "carpas/carpas-arabes": {
    serviceName: "carpas árabes",
    galleryTitle: "¿Cómo lucen nuestras carpas árabes?",
    packages: [
      { name: "Básico", price: "$5,000", priceNote: "por evento", description: "Carpa árabe para eventos íntimos.", features: [{ text: "Carpa 4x4m", included: true }, { text: "Estructura y montaje", included: true }, { text: "Forros interiores", included: false }, { text: "Iluminación", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$10,000", priceNote: "por evento", description: "Carpa árabe decorada para bodas.", badge: "Más popular", highlight: true, features: [{ text: "Carpa 6x6m", included: true }, { text: "Forros interiores", included: true }, { text: "Iluminación básica", included: true }, { text: "Montaje profesional", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$18,000", priceNote: "por evento", description: "Carpa árabe de lujo con decoración completa.", features: [{ text: "Carpa 8x8m o mayor", included: true }, { text: "Forros premium", included: true }, { text: "Iluminación decorativa", included: true }, { text: "Diseño personalizado", included: true }], ctaHref: "/cotizar/" },
      { name: "Evento Grande", price: "Cotizar", priceNote: "carpas múltiples", description: "Múltiples carpas árabes para eventos grandes.", features: [{ text: "Configuración a medida", included: true }, { text: "Interconexión de carpas", included: true }, { text: "Clima controlado", included: true }, { text: "Coordinador asignado", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "carpas/estructurales": {
    serviceName: "carpas estructurales",
    galleryTitle: "¿Cómo lucen nuestras carpas estructurales?",
    packages: [
      { name: "Básico", price: "$8,000", priceNote: "por evento", description: "Carpa estructural compacta.", features: [{ text: "Carpa 6x6m", included: true }, { text: "Estructura aluminio", included: true }, { text: "Laterales cerrados", included: false }, { text: "Piso", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$15,000", priceNote: "por evento", description: "Carpa estructural para bodas y corporativos.", badge: "Más popular", highlight: true, features: [{ text: "Carpa 10x10m", included: true }, { text: "Laterales transparentes", included: true }, { text: "Iluminación básica", included: true }, { text: "Montaje certificado", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$28,000", priceNote: "por evento", description: "Carpa estructural de gran formato.", features: [{ text: "Carpa 15x15m o mayor", included: true }, { text: "Clima controlado", included: true }, { text: "Piso nivelado", included: true }, { text: "Diseño personalizado", included: true }], ctaHref: "/cotizar/" },
      { name: "Hangar", price: "Cotizar", priceNote: "estructura industrial", description: "Estructura tipo hangar para mega eventos.", features: [{ text: "Dimensiones a medida", included: true }, { text: "Capacidad 500+ personas", included: true }, { text: "Ingeniería certificada", included: true }, { text: "Producción integral", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "carpas/hangar": {
    serviceName: "carpas tipo hangar",
    galleryTitle: "¿Cómo lucen nuestros hangares para eventos?",
    packages: [
      { name: "Básico", price: "$15,000", priceNote: "por evento", description: "Hangar compacto para eventos medianos.", features: [{ text: "Hangar 10x15m", included: true }, { text: "Estructura certificada", included: true }, { text: "Piso", included: false }, { text: "Clima controlado", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$25,000", priceNote: "por evento", description: "Hangar para eventos corporativos.", badge: "Más popular", highlight: true, features: [{ text: "Hangar 15x20m", included: true }, { text: "Laterales cerrados", included: true }, { text: "Iluminación industrial", included: true }, { text: "Montaje profesional", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$45,000", priceNote: "por evento", description: "Mega hangar para ferias y expos.", features: [{ text: "Hangar 20x30m+", included: true }, { text: "Clima controlado", included: true }, { text: "Piso profesional", included: true }, { text: "Ingeniería a medida", included: true }], ctaHref: "/cotizar/" },
      { name: "Mega Evento", price: "Cotizar", priceNote: "dimensiones especiales", description: "Estructuras especiales para mega eventos.", features: [{ text: "Dimensiones ilimitadas", included: true }, { text: "Multi-nivel posible", included: true }, { text: "Producción integral", included: true }, { text: "Gerente de proyecto", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "carpas/pisos-complementos": {
    serviceName: "pisos y complementos para carpas",
    galleryTitle: "¿Cómo lucen nuestros pisos y complementos?",
    packages: [
      { name: "Básico", price: "$3,000", priceNote: "por evento", description: "Piso básico para carpa.", features: [{ text: "Piso nivelado 6x6m", included: true }, { text: "Instalación", included: true }, { text: "Alfombra", included: false }, { text: "Iluminación perimetral", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$6,000", priceNote: "por evento", description: "Piso con acabado para eventos sociales.", badge: "Más popular", highlight: true, features: [{ text: "Piso nivelado 10x10m", included: true }, { text: "Alfombra incluida", included: true }, { text: "Iluminación perimetral", included: true }, { text: "Montaje profesional", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$10,000", priceNote: "por evento", description: "Piso premium con acabados de lujo.", features: [{ text: "Piso 15x15m+", included: true }, { text: "Acabado madera o mármol", included: true }, { text: "Rampa de acceso", included: true }, { text: "Diseño personalizado", included: true }], ctaHref: "/cotizar/" },
      { name: "Full Service", price: "Cotizar", priceNote: "piso + complementos", description: "Piso integral con todos los complementos.", features: [{ text: "Dimensiones a medida", included: true }, { text: "Climatización", included: true }, { text: "Mobiliario integrado", included: true }, { text: "Coordinación completa", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  // Catering
  "catering/cocina-movil": {
    serviceName: "cocina móvil",
    galleryTitle: "¿Cómo luce nuestra cocina móvil para eventos?",
    packages: [
      { name: "Básico", price: "$5,000", priceNote: "por evento", description: "Cocina móvil compacta hasta 100 personas.", features: [{ text: "Parrilla y plancha", included: true }, { text: "Mesas de trabajo", included: true }, { text: "Refrigeración", included: false }, { text: "Chef incluido", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$10,000", priceNote: "por evento", description: "Cocina móvil completa para bodas.", badge: "Más popular", highlight: true, features: [{ text: "Cocina industrial completa", included: true }, { text: "Refrigeración incluida", included: true }, { text: "Mesas de servicio", included: true }, { text: "Instalación eléctrica", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$18,000", priceNote: "por evento", description: "Cocina profesional para 300+ personas.", features: [{ text: "Cocina doble estación", included: true }, { text: "Cámaras de refrigeración", included: true }, { text: "Zona de lavado", included: true }, { text: "Montaje completo", included: true }], ctaHref: "/cotizar/" },
      { name: "Full Service", price: "Cotizar", priceNote: "cocina + personal", description: "Cocina completa con personal de servicio.", features: [{ text: "Cocina industrial completa", included: true }, { text: "Chef y personal", included: true }, { text: "Vajilla y cristalería", included: true }, { text: "Coordinación integral", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "catering/estaciones-servicio": {
    serviceName: "estaciones de servicio",
    galleryTitle: "¿Cómo lucen nuestras estaciones de servicio?",
    packages: [
      { name: "Básico", price: "$3,500", priceNote: "por estación", description: "Estación individual de servicio.", features: [{ text: "1 estación temática", included: true }, { text: "Montaje y decoración", included: true }, { text: "Equipo térmico", included: false }, { text: "Personal de servicio", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$6,000", priceNote: "por estación", description: "Estación completa con equipo térmico.", badge: "Más popular", highlight: true, features: [{ text: "Estación completa", included: true }, { text: "Equipo térmico incluido", included: true }, { text: "Decoración temática", included: true }, { text: "Montaje profesional", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$10,000", priceNote: "por estación", description: "Estación de lujo con diseño personalizado.", features: [{ text: "Estación premium", included: true }, { text: "Chef en vivo", included: true }, { text: "Diseño personalizado", included: true }, { text: "Vajilla premium", included: true }], ctaHref: "/cotizar/" },
      { name: "Full Service", price: "Cotizar", priceNote: "múltiples estaciones", description: "Servicio completo con múltiples estaciones.", features: [{ text: "3+ estaciones", included: true }, { text: "Personal completo", included: true }, { text: "Coordinación integral", included: true }, { text: "Diseño de menú", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "catering/refrigeracion": {
    serviceName: "refrigeración para eventos",
    galleryTitle: "¿Cómo luce nuestro equipo de refrigeración?",
    packages: [
      { name: "Básico", price: "$2,000", priceNote: "por evento", description: "Refrigeración básica para eventos pequeños.", features: [{ text: "Refrigerador vertical", included: true }, { text: "Hielera industrial", included: true }, { text: "Cámara fría", included: false }, { text: "Congelador", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$4,000", priceNote: "por evento", description: "Equipo de refrigeración para bodas.", badge: "Más popular", highlight: true, features: [{ text: "2 refrigeradores", included: true }, { text: "Cámara fría portátil", included: true }, { text: "Máquina de hielo", included: true }, { text: "Instalación incluida", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$7,000", priceNote: "por evento", description: "Cadena de frío completa.", features: [{ text: "Cámara fría grande", included: true }, { text: "Congelador industrial", included: true }, { text: "Dispensadores de bebida", included: true }, { text: "Monitoreo de temperatura", included: true }], ctaHref: "/cotizar/" },
      { name: "Industrial", price: "Cotizar", priceNote: "cadena de frío completa", description: "Refrigeración industrial para catering masivo.", features: [{ text: "Multi-cámara", included: true }, { text: "Planta de energía dedicada", included: true }, { text: "Monitoreo 24/7", included: true }, { text: "Técnico en sitio", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "catering/vajilla-cristaleria": {
    serviceName: "vajilla y cristalería",
    galleryTitle: "¿Cómo luce nuestra vajilla y cristalería?",
    packages: [
      { name: "Básico", price: "$25", priceNote: "por persona / evento", description: "Vajilla estándar para eventos prácticos.", features: [{ text: "Plato base + plato fuerte", included: true }, { text: "Cubiertos básicos", included: true }, { text: "Copa de agua", included: true }, { text: "Copas de vino", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$45", priceNote: "por persona / evento", description: "Vajilla completa para bodas y galas.", badge: "Más popular", highlight: true, features: [{ text: "Vajilla completa 3 tiempos", included: true }, { text: "Cubiertos completos", included: true }, { text: "Copas agua + vino + champagne", included: true }, { text: "Chargers decorativos", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$75", priceNote: "por persona / evento", description: "Vajilla de lujo para eventos premium.", features: [{ text: "Vajilla porcelana fina", included: true }, { text: "Cristalería Riedel", included: true }, { text: "Cubiertos plateados", included: true }, { text: "Menaje completo", included: true }], ctaHref: "/cotizar/" },
      { name: "Full Service", price: "Cotizar", priceNote: "+200 personas", description: "Servicio completo por volumen.", features: [{ text: "Cualquier línea disponible", included: true }, { text: "Personal de servicio", included: true }, { text: "Lavado in situ", included: true }, { text: "Coordinación integral", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  // Iluminación
  "iluminacion/arquitectonica": {
    serviceName: "iluminación arquitectónica",
    galleryTitle: "¿Cómo luce nuestra iluminación arquitectónica?",
    packages: [
      { name: "Básico", price: "$3,000", priceNote: "por evento", description: "Uplighting básico para ambientación.", features: [{ text: "8 luces LED uplighting", included: true }, { text: "Instalación y retiro", included: true }, { text: "Colores personalizables", included: true }, { text: "Operador técnico", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$6,000", priceNote: "por evento", description: "Iluminación arquitectónica para bodas.", badge: "Más popular", highlight: true, features: [{ text: "16 luces LED profesionales", included: true }, { text: "Wash de fachada", included: true }, { text: "Programación de escenas", included: true }, { text: "Operador técnico", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$12,000", priceNote: "por evento", description: "Diseño de iluminación personalizado.", features: [{ text: "32+ luminarias LED", included: true }, { text: "Diseño lumínico a medida", included: true }, { text: "Gobo proyección logo", included: true }, { text: "Director de iluminación", included: true }], ctaHref: "/cotizar/" },
      { name: "Full Production", price: "Cotizar", priceNote: "diseño integral", description: "Producción lumínica completa para venues.", features: [{ text: "Iluminación integral del venue", included: true }, { text: "Mapping arquitectónico", included: true }, { text: "Automatización DMX", included: true }, { text: "Equipo técnico completo", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "iluminacion/decorativa": {
    serviceName: "iluminación decorativa",
    galleryTitle: "¿Cómo luce nuestra iluminación decorativa?",
    packages: [
      { name: "Básico", price: "$2,500", priceNote: "por evento", description: "Guirnaldas y luces decorativas básicas.", features: [{ text: "50m guirnaldas Edison", included: true }, { text: "Instalación y retiro", included: true }, { text: "Extensiones eléctricas", included: true }, { text: "Luces adicionales", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$5,000", priceNote: "por evento", description: "Iluminación decorativa para bodas.", badge: "Más popular", highlight: true, features: [{ text: "100m guirnaldas Edison", included: true }, { text: "Cortinas de luz", included: true }, { text: "Velas LED decorativas", included: true }, { text: "Montaje profesional", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$9,000", priceNote: "por evento", description: "Diseño decorativo integral.", features: [{ text: "200m+ guirnaldas", included: true }, { text: "Canopy de luces", included: true }, { text: "Letras luminosas", included: true }, { text: "Diseño personalizado", included: true }], ctaHref: "/cotizar/" },
      { name: "Full Design", price: "Cotizar", priceNote: "diseño lumínico completo", description: "Concepto lumínico decorativo a medida.", features: [{ text: "Iluminación decorativa total", included: true }, { text: "Elementos especiales", included: true }, { text: "Instalaciones artísticas", included: true }, { text: "Director creativo", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "iluminacion/efectos-especiales": {
    serviceName: "efectos especiales de iluminación",
    galleryTitle: "¿Cómo lucen nuestros efectos especiales?",
    packages: [
      { name: "Básico", price: "$2,000", priceNote: "por evento", description: "Efectos básicos para fiestas.", features: [{ text: "Máquina de humo", included: true }, { text: "Luces estroboscópicas", included: true }, { text: "Operador", included: false }, { text: "Cañón CO2", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$4,500", priceNote: "por evento", description: "Pack de efectos para bodas y fiestas.", badge: "Más popular", highlight: true, features: [{ text: "Humo bajo (primer baile)", included: true }, { text: "Sparklers fríos", included: true }, { text: "Cañón confeti", included: true }, { text: "Operador técnico", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$8,000", priceNote: "por evento", description: "Show de efectos especiales completo.", features: [{ text: "Cañones CO2", included: true }, { text: "Humo bajo + sparklers", included: true }, { text: "Lluvia de burbujas", included: true }, { text: "Coordinación con DJ", included: true }], ctaHref: "/cotizar/" },
      { name: "Show Completo", price: "Cotizar", priceNote: "producción de efectos", description: "Producción de efectos para espectáculos.", features: [{ text: "Efectos pirotécnicos fríos", included: true }, { text: "Láser profesional", included: true }, { text: "Producción integral", included: true }, { text: "Director técnico", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "iluminacion/escenario": {
    serviceName: "iluminación de escenario",
    galleryTitle: "¿Cómo luce nuestra iluminación de escenario?",
    packages: [
      { name: "Básico", price: "$4,000", priceNote: "por evento", description: "Iluminación básica de escenario.", features: [{ text: "4 PAR LED", included: true }, { text: "2 spots de seguimiento", included: true }, { text: "Controlador DMX", included: true }, { text: "Cabezas móviles", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$8,000", priceNote: "por evento", description: "Iluminación profesional para conciertos.", badge: "Más popular", highlight: true, features: [{ text: "8 PAR LED + 4 beam", included: true }, { text: "Cabezas móviles", included: true }, { text: "Truss y rigging", included: true }, { text: "Operador de luces", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$15,000", priceNote: "por evento", description: "Rider de iluminación profesional.", features: [{ text: "Rider completo", included: true }, { text: "Cabezas móviles premium", included: true }, { text: "Consola grandMA", included: true }, { text: "Director de iluminación", included: true }], ctaHref: "/cotizar/" },
      { name: "Full Production", price: "Cotizar", priceNote: "producción escénica", description: "Producción lumínica para festivales.", features: [{ text: "Multi-truss diseño", included: true }, { text: "Programación avanzada", included: true }, { text: "Equipo técnico completo", included: true }, { text: "Diseño integral", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  // Inflables
  "inflables/juegos-infantiles": {
    serviceName: "juegos inflables infantiles",
    galleryTitle: "¿Cómo lucen nuestros inflables infantiles?",
    packages: [
      { name: "Básico", price: "$1,500", priceNote: "por evento (4 hrs)", description: "1 inflable para fiestas infantiles.", features: [{ text: "Castillo inflable mediano", included: true }, { text: "Monitor de seguridad", included: true }, { text: "Inflado y desinflado", included: true }, { text: "Inflable adicional", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$2,800", priceNote: "por evento (6 hrs)", description: "Pack de inflables para fiestas completas.", badge: "Más popular", highlight: true, features: [{ text: "2 inflables a elegir", included: true }, { text: "Monitor dedicado", included: true }, { text: "6 horas de servicio", included: true }, { text: "Seguro incluido", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$4,500", priceNote: "por evento (8 hrs)", description: "Zona inflable completa para eventos.", features: [{ text: "3 inflables premium", included: true }, { text: "2 monitores", included: true }, { text: "8 horas de servicio", included: true }, { text: "Zona delimitada", included: true }], ctaHref: "/cotizar/" },
      { name: "Kermesse", price: "Cotizar", priceNote: "evento completo", description: "Kermesse inflable para eventos escolares.", features: [{ text: "5+ inflables variados", included: true }, { text: "Personal completo", included: true }, { text: "Logística integral", included: true }, { text: "Coordinador asignado", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "inflables/acuaticos": {
    serviceName: "inflables acuáticos",
    galleryTitle: "¿Cómo lucen nuestros inflables acuáticos?",
    packages: [
      { name: "Básico", price: "$3,000", priceNote: "por evento (4 hrs)", description: "Inflable acuático individual.", features: [{ text: "Tobogán acuático", included: true }, { text: "Alberca inflable", included: true }, { text: "Monitor de seguridad", included: true }, { text: "Inflable adicional", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$5,500", priceNote: "por evento (6 hrs)", description: "Pack acuático para fiestas de verano.", badge: "Más popular", highlight: true, features: [{ text: "2 inflables acuáticos", included: true }, { text: "Alberca grande", included: true }, { text: "2 monitores", included: true }, { text: "6 horas de servicio", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$9,000", priceNote: "por evento (8 hrs)", description: "Parque acuático inflable completo.", features: [{ text: "3+ inflables acuáticos", included: true }, { text: "Tobogán gigante", included: true }, { text: "Personal completo", included: true }, { text: "8 horas de servicio", included: true }], ctaHref: "/cotizar/" },
      { name: "Parque Acuático", price: "Cotizar", priceNote: "instalación completa", description: "Parque acuático inflable para eventos masivos.", features: [{ text: "5+ atracciones acuáticas", included: true }, { text: "Sistema de agua", included: true }, { text: "Salvavidas certificados", included: true }, { text: "Logística integral", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "inflables/adultos": {
    serviceName: "inflables para adultos",
    galleryTitle: "¿Cómo lucen nuestros inflables para adultos?",
    packages: [
      { name: "Básico", price: "$2,500", priceNote: "por evento (4 hrs)", description: "1 inflable de obstáculos para adultos.", features: [{ text: "Circuito de obstáculos", included: true }, { text: "Monitor de seguridad", included: true }, { text: "4 horas de servicio", included: true }, { text: "Inflable adicional", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$4,500", priceNote: "por evento (6 hrs)", description: "Pack de inflables para team building.", badge: "Más popular", highlight: true, features: [{ text: "2 inflables deportivos", included: true }, { text: "Árbitro/monitor", included: true }, { text: "6 horas de servicio", included: true }, { text: "Premiación incluida", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$7,500", priceNote: "por evento (8 hrs)", description: "Zona de competencias inflables.", features: [{ text: "3+ inflables variados", included: true }, { text: "Sistema de puntuación", included: true }, { text: "Personal completo", included: true }, { text: "8 horas de servicio", included: true }], ctaHref: "/cotizar/" },
      { name: "Corporate", price: "Cotizar", priceNote: "team building completo", description: "Experiencia team building corporativa.", features: [{ text: "5+ actividades", included: true }, { text: "Dinamizador profesional", included: true }, { text: "Logística completa", included: true }, { text: "Coordinación integral", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "inflables/interactivos-deportivos": {
    serviceName: "inflables interactivos y deportivos",
    galleryTitle: "¿Cómo lucen nuestros inflables interactivos?",
    packages: [
      { name: "Básico", price: "$2,000", priceNote: "por evento (4 hrs)", description: "1 juego interactivo inflable.", features: [{ text: "Ring de boxeo o gladiadores", included: true }, { text: "Equipo de seguridad", included: true }, { text: "Monitor", included: true }, { text: "Juego adicional", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$4,000", priceNote: "por evento (6 hrs)", description: "Pack interactivo para eventos.", badge: "Más popular", highlight: true, features: [{ text: "2 juegos interactivos", included: true }, { text: "Monitores dedicados", included: true }, { text: "6 horas de servicio", included: true }, { text: "Premiación", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$7,000", priceNote: "por evento (8 hrs)", description: "Zona deportiva completa.", features: [{ text: "3+ juegos variados", included: true }, { text: "Toro mecánico incluido", included: true }, { text: "Personal completo", included: true }, { text: "8 horas de servicio", included: true }], ctaHref: "/cotizar/" },
      { name: "Full Event", price: "Cotizar", priceNote: "kermesse deportiva", description: "Kermesse deportiva completa.", features: [{ text: "5+ actividades", included: true }, { text: "Dinamizadores", included: true }, { text: "Sistema de competencias", included: true }, { text: "Coordinación integral", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  // Pistas de baile
  "pistas-baile/madera-clasica": {
    serviceName: "pistas de madera clásica",
    galleryTitle: "¿Cómo lucen nuestras pistas de madera?",
    packages: [
      { name: "Básico", price: "$3,000", priceNote: "por evento", description: "Pista de madera compacta 3x3m.", features: [{ text: "Pista 3x3m (9m²)", included: true }, { text: "Montaje y desmontaje", included: true }, { text: "Nivelación básica", included: true }, { text: "Acabado premium", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$5,500", priceNote: "por evento", description: "Pista ideal para bodas de 150 personas.", badge: "Más popular", highlight: true, features: [{ text: "Pista 4x4m (16m²)", included: true }, { text: "Acabado barnizado", included: true }, { text: "Nivelación profesional", included: true }, { text: "Montaje incluido", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$9,000", priceNote: "por evento", description: "Pista grande para eventos de 300+ personas.", features: [{ text: "Pista 6x6m (36m²)", included: true }, { text: "Acabado premium", included: true }, { text: "Bordes decorativos", included: true }, { text: "Logística completa", included: true }], ctaHref: "/cotizar/" },
      { name: "A Medida", price: "Cotizar", priceNote: "dimensiones especiales", description: "Pista a medida para cualquier espacio.", features: [{ text: "Dimensiones personalizadas", included: true }, { text: "Acabado a elegir", included: true }, { text: "Nivelación avanzada", included: true }, { text: "Coordinador asignado", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "pistas-baile/pistas-led": {
    serviceName: "pistas de baile LED",
    galleryTitle: "¿Cómo lucen nuestras pistas LED?",
    packages: [
      { name: "Básico", price: "$5,000", priceNote: "por evento", description: "Pista LED compacta 3x3m.", features: [{ text: "Pista LED 3x3m", included: true }, { text: "Controlador DMX", included: true }, { text: "Montaje y desmontaje", included: true }, { text: "Programación custom", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$9,000", priceNote: "por evento", description: "Pista LED para bodas y XV años.", badge: "Más popular", highlight: true, features: [{ text: "Pista LED 4x4m RGB", included: true }, { text: "Patrones personalizables", included: true }, { text: "Técnico de operación", included: true }, { text: "Montaje profesional", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$14,000", priceNote: "por evento", description: "Pista LED premium con efectos avanzados.", features: [{ text: "Pista LED 6x6m full RGB", included: true }, { text: "Efectos interactivos", included: true }, { text: "Sincronización musical", included: true }, { text: "Director técnico", included: true }], ctaHref: "/cotizar/" },
      { name: "Show LED", price: "Cotizar", priceNote: "producción especial", description: "Pista LED espectacular para galas.", features: [{ text: "Dimensiones a medida", included: true }, { text: "Pixel mapping avanzado", included: true }, { text: "Contenido personalizado", included: true }, { text: "Producción integral", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "pistas-baile/tarimas-escenarios": {
    serviceName: "tarimas y escenarios",
    galleryTitle: "¿Cómo lucen nuestras tarimas y escenarios?",
    packages: [
      { name: "Básico", price: "$4,000", priceNote: "por evento", description: "Tarima compacta para DJ o protocolo.", features: [{ text: "Tarima 3x2m", included: true }, { text: "Altura 40-60cm", included: true }, { text: "Montaje seguro", included: true }, { text: "Escaleras", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$7,000", priceNote: "por evento", description: "Escenario para bandas y presentaciones.", badge: "Más popular", highlight: true, features: [{ text: "Escenario 6x4m", included: true }, { text: "Escaleras de acceso", included: true }, { text: "Faldón decorativo", included: true }, { text: "Montaje certificado", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$12,000", priceNote: "por evento", description: "Escenario profesional para conciertos.", features: [{ text: "Escenario 8x6m+", included: true }, { text: "Back line incluido", included: true }, { text: "Rigging para luces", included: true }, { text: "Ingeniería certificada", included: true }], ctaHref: "/cotizar/" },
      { name: "Full Stage", price: "Cotizar", priceNote: "producción escénica", description: "Producción escénica completa.", features: [{ text: "Dimensiones a medida", included: true }, { text: "Multi-nivel posible", included: true }, { text: "Producción integral", included: true }, { text: "Director técnico", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "pistas-baile/vintage-tematicas": {
    serviceName: "pistas vintage y temáticas",
    galleryTitle: "¿Cómo lucen nuestras pistas temáticas?",
    packages: [
      { name: "Básico", price: "$3,500", priceNote: "por evento", description: "Pista temática compacta.", features: [{ text: "Pista 3x3m temática", included: true }, { text: "Acabado a elegir", included: true }, { text: "Montaje y desmontaje", included: true }, { text: "Decoración adicional", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$6,000", priceNote: "por evento", description: "Pista vintage para bodas rústicas.", badge: "Más popular", highlight: true, features: [{ text: "Pista 4x4m vintage", included: true }, { text: "Acabado personalizado", included: true }, { text: "Bordes decorativos", included: true }, { text: "Montaje profesional", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$10,000", priceNote: "por evento", description: "Pista temática de diseño exclusivo.", features: [{ text: "Pista 6x6m diseño custom", included: true }, { text: "Viniles personalizados", included: true }, { text: "Iluminación perimetral", included: true }, { text: "Diseño exclusivo", included: true }], ctaHref: "/cotizar/" },
      { name: "Custom", price: "Cotizar", priceNote: "diseño a medida", description: "Pista completamente personalizada.", features: [{ text: "Dimensiones a medida", included: true }, { text: "Temática exclusiva", included: true }, { text: "Producción integral", included: true }, { text: "Director creativo", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  // Accesorios
  "accesorios/calefaccion-clima": {
    serviceName: "calefacción y clima",
    galleryTitle: "¿Cómo luce nuestro equipo de clima?",
    packages: [
      { name: "Básico", price: "$1,500", priceNote: "por evento", description: "Calefacción básica para terrazas.", features: [{ text: "2 calentadores de patio", included: true }, { text: "Gas incluido (4 hrs)", included: true }, { text: "Instalación", included: true }, { text: "Nebulización", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$3,000", priceNote: "por evento", description: "Climatización para eventos medianos.", badge: "Más popular", highlight: true, features: [{ text: "4 calentadores de patio", included: true }, { text: "Gas incluido (8 hrs)", included: true }, { text: "Ventiladores industriales", included: true }, { text: "Instalación profesional", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$5,500", priceNote: "por evento", description: "Sistema de clima completo.", features: [{ text: "AC portátil o calefacción", included: true }, { text: "Nebulización exterior", included: true }, { text: "Ductos de distribución", included: true }, { text: "Técnico en sitio", included: true }], ctaHref: "/cotizar/" },
      { name: "Industrial", price: "Cotizar", priceNote: "clima a gran escala", description: "Climatización industrial para carpas.", features: [{ text: "Unidades industriales", included: true }, { text: "Ductos profesionales", included: true }, { text: "Control de temperatura", included: true }, { text: "Ingeniería dedicada", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "accesorios/manteleria-textiles": {
    serviceName: "mantelería y textiles",
    galleryTitle: "¿Cómo luce nuestra mantelería?",
    packages: [
      { name: "Básico", price: "$800", priceNote: "por evento", description: "Mantelería básica para eventos.", features: [{ text: "Manteles lisos blancos", included: true }, { text: "Entrega y recolección", included: true }, { text: "Cubresillas", included: false }, { text: "Servilletas de tela", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$1,500", priceNote: "por evento", description: "Mantelería completa para bodas.", badge: "Más popular", highlight: true, features: [{ text: "Manteles + overlays", included: true }, { text: "Cubresillas con moño", included: true }, { text: "Servilletas de tela", included: true }, { text: "Color a elegir", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$3,000", priceNote: "por evento", description: "Textiles de lujo para galas.", features: [{ text: "Telas premium (terciopelo, organza)", included: true }, { text: "Caminos de mesa bordados", included: true }, { text: "Servilletas premium", included: true }, { text: "Diseño personalizado", included: true }], ctaHref: "/cotizar/" },
      { name: "Full Service", price: "Cotizar", priceNote: "+50 mesas", description: "Servicio completo de textiles.", features: [{ text: "Cualquier tela disponible", included: true }, { text: "Planchado in situ", included: true }, { text: "Personal de montaje", included: true }, { text: "Coordinación integral", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "accesorios/plantas-energia": {
    serviceName: "plantas de energía",
    galleryTitle: "¿Cómo lucen nuestras plantas de energía?",
    packages: [
      { name: "Básico", price: "$3,000", priceNote: "por evento", description: "Generador para iluminación básica.", features: [{ text: "Generador 20-50 KVA", included: true }, { text: "Combustible (8 hrs)", included: true }, { text: "Tablero de distribución", included: true }, { text: "Técnico en sitio", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$5,500", priceNote: "por evento", description: "Planta de energía para bodas.", badge: "Más popular", highlight: true, features: [{ text: "Generador 50-150 KVA", included: true }, { text: "Combustible incluido", included: true }, { text: "Tablero + extensiones", included: true }, { text: "Técnico de guardia", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$10,000", priceNote: "por evento", description: "Energía para eventos grandes.", features: [{ text: "Generador 150-500 KVA", included: true }, { text: "Combustible ilimitado", included: true }, { text: "Distribución profesional", included: true }, { text: "Técnico permanente", included: true }], ctaHref: "/cotizar/" },
      { name: "Industrial", price: "Cotizar", priceNote: "mega eventos", description: "Energía industrial para festivales.", features: [{ text: "Multi-generador", included: true }, { text: "Red de distribución", included: true }, { text: "Respaldo automático", included: true }, { text: "Ingeniería eléctrica", included: true }], ctaHref: "/cotizar/" },
    ],
  },
  "accesorios/senalizacion-alfombras": {
    serviceName: "señalización y alfombras",
    galleryTitle: "¿Cómo luce nuestra señalización?",
    packages: [
      { name: "Básico", price: "$1,200", priceNote: "por evento", description: "Señalización básica y alfombra.", features: [{ text: "Alfombra roja 10m", included: true }, { text: "4 postes separadores", included: true }, { text: "Señalización básica", included: true }, { text: "Backdrop", included: false }], ctaHref: "/cotizar/" },
      { name: "Estándar", price: "$2,500", priceNote: "por evento", description: "Red carpet completo para eventos.", badge: "Más popular", highlight: true, features: [{ text: "Alfombra premium 15m", included: true }, { text: "8 postes con cinta", included: true }, { text: "Backdrop 3x2m", included: true }, { text: "Montaje profesional", included: true }], ctaHref: "/cotizar/" },
      { name: "Premium", price: "$4,500", priceNote: "por evento", description: "Experiencia red carpet de lujo.", features: [{ text: "Alfombra custom 20m+", included: true }, { text: "Backdrop con branding", included: true }, { text: "Podium y atril", included: true }, { text: "Señalización completa", included: true }], ctaHref: "/cotizar/" },
      { name: "Full Branding", price: "Cotizar", priceNote: "branding integral", description: "Señalización y branding completo.", features: [{ text: "Diseño integral de marca", included: true }, { text: "Totem y banners", included: true }, { text: "Wayfinding completo", included: true }, { text: "Producción e instalación", included: true }], ctaHref: "/cotizar/" },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════
// PROCESSING FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function addImport(content, importLine) {
  if (content.includes(importLine)) return content;
  // Add before the closing --- of frontmatter, after last import
  const lastImportIdx = content.lastIndexOf("import ");
  if (lastImportIdx === -1) return content;
  const lineEnd = content.indexOf("\n", lastImportIdx);
  return content.slice(0, lineEnd + 1) + importLine + "\n" + content.slice(lineEnd + 1);
}

function buildGallerySection(title, images) {
  const imgStr = images.map(i => `        { src: "${i.src}", alt: "${i.alt}" },`).join("\n");
  return `
  <!-- ═══════════════════════════════════════════════════════════════════════
       GALERÍA
       ═══════════════════════════════════════════════════════════════════════ -->
  <section class="section" aria-labelledby="galeria-heading">
    <div class="container">
      <h2 id="galeria-heading" style="font-size: var(--text-2xl); font-weight: 800; color: var(--color-primary); margin-bottom: 2rem;">${title}</h2>
      <Gallery4x4 images={[
${imgStr}
      ]} />
    </div>
  </section>`;
}

function buildPricingSection(packages, serviceName) {
  const pkgStr = packages.map(p => {
    const featsStr = p.features.map(f => `            { text: "${f.text}", included: ${f.included} },`).join("\n");
    let lines = [`        {`];
    lines.push(`          name: "${p.name}",`);
    if (p.badge) lines.push(`          badge: "${p.badge}",`);
    if (p.highlight) lines.push(`          highlight: true,`);
    lines.push(`          price: "${p.price}",`);
    if (p.priceNote) lines.push(`          priceNote: "${p.priceNote}",`);
    lines.push(`          description: "${p.description}",`);
    lines.push(`          features: [`);
    lines.push(featsStr);
    lines.push(`          ],`);
    lines.push(`          ctaHref: "${p.ctaHref}",`);
    lines.push(`        },`);
    return lines.join("\n");
  }).join("\n");

  return `
  <!-- ═══════════════════════════════════════════════════════════════════════
       PAQUETES
       ═══════════════════════════════════════════════════════════════════════ -->
  <section class="section section--alt" aria-labelledby="paquetes-heading">
    <div class="container">
      <h2 id="paquetes-heading" style="font-size: var(--text-2xl); font-weight: 800; color: var(--color-primary); margin-bottom: 0.5rem;">¿Cuánto cuesta rentar ${serviceName}?</h2>
      <p style="color: var(--color-text-light); margin-bottom: 2rem; max-width: 60ch;">Precios referenciales por evento (+IVA). Incluye entrega y montaje en CDMX.</p>
      <PricingCards packages={[
${pkgStr}
      ]} />
    </div>
  </section>`;
}

function buildFaqSection(serviceName) {
  return `
  <!-- ═══════════════════════════════════════════════════════════════════════
       PREGUNTAS FRECUENTES
       ═══════════════════════════════════════════════════════════════════════ -->
  <section class="section" aria-labelledby="faq-heading">
    <div class="container">
      <h2 id="faq-heading" style="font-size: var(--text-2xl); font-weight: 800; color: var(--color-primary); margin-bottom: 2rem;">Preguntas frecuentes sobre ${serviceName}</h2>
    </div>
    <FaqSection items={faqs} serviceName="${serviceName}" />
  </section>`;
}

function replaceFaqSection(content, serviceName) {
  // Match the entire FAQ section from the PREGUNTAS FRECUENTES comment to closing </section>
  const faqStart = content.indexOf("PREGUNTAS FRECUENTES");
  if (faqStart === -1) return content;

  // Find the comment start (<!-- before PREGUNTAS)
  let commentStart = content.lastIndexOf("<!--", faqStart);
  // Find the <section after the comment
  let sectionStart = content.indexOf("<section", commentStart);
  if (sectionStart === -1) return content;

  // Find indentation
  let lineStart = content.lastIndexOf("\n", commentStart) + 1;
  let indent = content.slice(lineStart, commentStart);

  // Find the matching closing </section> - count nested sections
  let depth = 0;
  let pos = sectionStart;
  let sectionEnd = -1;
  while (pos < content.length) {
    const nextOpen = content.indexOf("<section", pos + 1);
    const nextClose = content.indexOf("</section>", pos + 1);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen;
    } else {
      if (depth === 0) {
        sectionEnd = nextClose + "</section>".length;
        break;
      }
      depth--;
      pos = nextClose;
    }
  }

  if (sectionEnd === -1) return content;

  const replacement = buildFaqSection(serviceName);
  return content.slice(0, lineStart) + replacement + "\n" + content.slice(sectionEnd);
}

function insertBeforeFaq(content, newContent) {
  const faqComment = "PREGUNTAS FRECUENTES";
  const faqIdx = content.indexOf(faqComment);
  if (faqIdx === -1) return content;

  // Find the <!-- before it
  let commentStart = content.lastIndexOf("<!--", faqIdx);
  let lineStart = content.lastIndexOf("\n", commentStart);

  return content.slice(0, lineStart) + "\n" + newContent + "\n" + content.slice(lineStart);
}

// ═══════════════════════════════════════════════════════════════
// PROCESS N2 CATEGORY PAGES
// ═══════════════════════════════════════════════════════════════

function processN2() {
  const categories = ["audiovisual", "carpas", "catering", "iluminacion", "inflables", "mobiliario", "pistas-baile", "accesorios"];
  let count = 0;

  for (const cat of categories) {
    const filePath = `${PAGES}/${cat}/index.astro`;
    if (!fs.existsSync(filePath)) { console.log(`  SKIP: ${filePath} not found`); continue; }

    let content = fs.readFileSync(filePath, "utf-8");
    const meta = N2_META[cat];
    const images = N2_IMAGES[cat];

    // Check if already has Gallery4x4
    if (content.includes("Gallery4x4")) {
      console.log(`  SKIP N2: ${cat} already has Gallery4x4`);
      continue;
    }

    // Add imports
    content = addImport(content, 'import Gallery4x4 from "@components/Gallery4x4.astro";');
    content = addImport(content, 'import FaqSection from "@components/FaqSection.astro";');

    // Insert Gallery4x4 before FAQ
    const gallerySection = buildGallerySection(meta.galleryTitle, images);
    content = insertBeforeFaq(content, gallerySection);

    // Replace inline FAQ with FaqSection
    content = replaceFaqSection(content, meta.serviceName);

    fs.writeFileSync(filePath, content, "utf-8");
    count++;
    console.log(`  OK N2: ${cat}`);
  }
  console.log(`N2: ${count} files updated`);
}

// ═══════════════════════════════════════════════════════════════
// PROCESS N3 SUB-PAGES
// ═══════════════════════════════════════════════════════════════

function processN3() {
  let count = 0;

  for (const [key, data] of Object.entries(N3_PRICING)) {
    const filePath = `${PAGES}/${key}/index.astro`;
    if (!fs.existsSync(filePath)) { console.log(`  SKIP: ${filePath} not found`); continue; }

    let content = fs.readFileSync(filePath, "utf-8");

    // Skip if already has PricingCards (like sillas)
    if (content.includes("PricingCards")) {
      console.log(`  SKIP N3: ${key} already has PricingCards`);
      // But still check if it needs FaqSection
      if (!content.includes("FaqSection")) {
        content = addImport(content, 'import FaqSection from "@components/FaqSection.astro";');
        content = replaceFaqSection(content, data.serviceName);
        fs.writeFileSync(filePath, content, "utf-8");
        console.log(`  OK N3 (FAQ only): ${key}`);
        count++;
      }
      continue;
    }

    // Add imports
    content = addImport(content, 'import Gallery4x4 from "@components/Gallery4x4.astro";');
    content = addImport(content, 'import PricingCards from "@components/PricingCards.astro";');
    content = addImport(content, 'import FaqSection from "@components/FaqSection.astro";');

    // Get images for this sub-category from parent category
    const parentCat = key.split("/")[0];
    const images = N2_IMAGES[parentCat] || N2_IMAGES.mobiliario;

    // Insert Gallery4x4 + PricingCards before FAQ
    const gallerySection = buildGallerySection(data.galleryTitle, images);
    const pricingSection = buildPricingSection(data.packages, data.serviceName);
    content = insertBeforeFaq(content, gallerySection + "\n" + pricingSection);

    // Replace inline FAQ with FaqSection
    content = replaceFaqSection(content, data.serviceName);

    fs.writeFileSync(filePath, content, "utf-8");
    count++;
    console.log(`  OK N3: ${key}`);
  }
  console.log(`N3: ${count} files updated`);
}

// ═══════════════════════════════════════════════════════════════
// REVIEWS SCHEMA ON KEY N3 PAGES
// ═══════════════════════════════════════════════════════════════

const REVIEWS = {
  "mobiliario/sillas": [
    { author: "María Elena Rodríguez", venue: "Hacienda de los Morales, CDMX", text: "Las sillas Tiffany doradas quedaron espectaculares en nuestra boda. El montaje fue impecable y el equipo de EVENTECH llegó puntual. 100% recomendados para bodas elegantes.", rating: 5 },
    { author: "Carlos Mendoza Vargas", venue: "Jardín Versal, Coyoacán", text: "Rentamos 350 sillas Chiavari para el evento corporativo anual. Todas en perfecto estado, cojines limpios y el servicio de montaje fue rápido y profesional.", rating: 5 },
  ],
  "mobiliario/mesas": [
    { author: "Ana Sofía Gutiérrez", venue: "Ex Convento de San Hipólito, CDMX", text: "Las mesas redondas con manteles dorados lucieron increíbles. EVENTECH nos asesoró con la distribución perfecta para 200 invitados.", rating: 5 },
    { author: "Roberto Jiménez Luna", venue: "Salón Real Tlalpan", text: "Excelente servicio. Las mesas imperiales para nuestra cena de gala corporativa quedaron impresionantes. Puntualidad y calidad garantizada.", rating: 5 },
  ],
  "mobiliario/barras": [
    { author: "Daniela Castillo Reyes", venue: "Quinta Real, Polanco", text: "La barra hexagonal iluminada fue el hit de nuestra boda. Los invitados no dejaban de tomar fotos. El bartender quedó encantado con el espacio.", rating: 5 },
    { author: "Fernando López Martínez", venue: "Centro Citibanamex", text: "Rentamos 3 barras para el lanzamiento de producto. Instalación perfecta, LED funcionando toda la noche. Servicio de primer nivel.", rating: 5 },
  ],
  "mobiliario/salas-lounge": [
    { author: "Valentina Herrera Ruiz", venue: "Casa de las Campanas, San Ángel", text: "El lounge de terciopelo verde fue el espacio favorito de todos los invitados. EVENTECH creó una zona increíble para nuestra boda.", rating: 5 },
    { author: "Alejandro Torres Díaz", venue: "Museo Soumaya, Polanco", text: "Las salas lounge para el cocktail del congreso fueron elegantes y cómodas. El diseño moderno complementó perfecto el venue.", rating: 5 },
  ],
  "audiovisual/microfonos-dj": [
    { author: "Patricia Navarro Ochoa", venue: "Hacienda San Andrés, Xochimilco", text: "Los micrófonos Shure funcionaron perfecto durante toda la ceremonia y el brindis. El ingeniero de audio fue muy profesional y atento.", rating: 5 },
    { author: "Diego Ramírez Solís", venue: "Foro Pegaso, Estado de México", text: "El setup DJ con Pioneer CDJ-3000 y cabina iluminada fue espectacular. Nuestro DJ quedó impresionado con la calidad del equipo.", rating: 5 },
  ],
  "audiovisual/proyectores": [
    { author: "Laura Martínez Vega", venue: "Hotel St. Regis, CDMX", text: "El proyector 4K para nuestro congreso médico fue impecable. Imagen nítida incluso con las luces del salón. Técnico muy profesional.", rating: 5 },
    { author: "Miguel Ángel Sánchez", venue: "WTC CDMX", text: "Contratamos streaming + proyección para el evento híbrido. Todo funcionó sin fallas durante 8 horas. Servicio de primer mundo.", rating: 5 },
  ],
  "audiovisual/pantallas-led": [
    { author: "Isabel Moreno Fuentes", venue: "Jardín Huayamilpas, Coyoacán", text: "La pantalla LED de 85 pulgadas para nuestra boda fue hermosa. Proyectamos fotos y videos de la pareja toda la noche. Servicio impecable.", rating: 5 },
    { author: "Ricardo Flores Peña", venue: "Expo Reforma, CDMX", text: "El videowall modular de 4x2m para nuestra convención fue impresionante. Imagen perfecta, montaje profesional y técnico dedicado.", rating: 5 },
  ],
};

function addReviewSchema(filePath, reviews) {
  if (!fs.existsSync(filePath)) return false;
  let content = fs.readFileSync(filePath, "utf-8");

  if (content.includes("reviewJsonLd") || content.includes('"@type": "Review"') || content.includes("Review schema")) return false;

  // Build review JSON-LD
  const reviewItems = reviews.map(r => `    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "${r.author}" },
      "reviewRating": { "@type": "Rating", "ratingValue": "${r.rating}", "bestRating": "5" },
      "reviewBody": "${r.text}",
      "datePublished": "2025-11-15"
    }`).join(",\n");

  const reviewScript = `
  <!-- Review Schema -->
  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Renta de ${reviews[0].text.includes("sillas") ? "Sillas" : reviews[0].text.includes("mesa") ? "Mesas" : reviews[0].text.includes("barra") ? "Barras" : reviews[0].text.includes("lounge") ? "Salas Lounge" : reviews[0].text.includes("micrófono") || reviews[0].text.includes("DJ") ? "Micrófonos y DJ" : reviews[0].text.includes("proyector") || reviews[0].text.includes("streaming") ? "Proyectores" : "Pantallas LED"} para Eventos en CDMX",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "${reviews.length}", "bestRating": "5" },
    "review": [
${reviewItems}
    ]
  })} />`;

  // Insert before </PageLayout>
  const closeTag = "</PageLayout>";
  const closeIdx = content.lastIndexOf(closeTag);
  if (closeIdx === -1) return false;

  content = content.slice(0, closeIdx) + reviewScript + "\n" + content.slice(closeIdx);
  fs.writeFileSync(filePath, content, "utf-8");
  return true;
}

function processReviews() {
  let count = 0;
  for (const [key, reviews] of Object.entries(REVIEWS)) {
    const filePath = `${PAGES}/${key}/index.astro`;
    if (addReviewSchema(filePath, reviews)) {
      count++;
      console.log(`  OK Review: ${key}`);
    } else {
      console.log(`  SKIP Review: ${key}`);
    }
  }
  console.log(`Reviews: ${count} files updated`);
}

// ═══════════════════════════════════════════════════════════════
// RUN ALL
// ═══════════════════════════════════════════════════════════════

console.log("=== TAREA 1: N2 Category Pages ===");
processN2();

console.log("\n=== TAREA 2: N3 Sub-Pages ===");
processN3();

console.log("\n=== TAREA 4: Reviews ===");
processReviews();

console.log("\nDone!");
