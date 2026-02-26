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
    icon: "chair",
    href: "/servicios/mobiliario/",
  },
  {
    id: "audiovisual",
    name: "Audiovisual",
    description: "Pantallas LED, sonido, proyectores",
    icon: "speaker",
    href: "/servicios/audiovisual/",
  },
  {
    id: "carpas",
    name: "Carpas",
    description: "Carpas y estructuras para eventos",
    icon: "tent",
    href: "/servicios/carpas/",
  },
  {
    id: "iluminacion",
    name: "Iluminación",
    description: "Iluminación profesional para eventos",
    icon: "lightbulb",
    href: "/servicios/iluminacion/",
  },
  {
    id: "pistas",
    name: "Pistas de Baile",
    description: "Pistas LED, de madera y más",
    icon: "music",
    href: "/servicios/pistas-baile/",
  },
  {
    id: "accesorios",
    name: "Accesorios",
    description: "Barras, calentadores, generadores",
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
    icon: "heart",
    href: "/eventos/bodas/",
  },
  {
    id: "xv-anos",
    name: "XV Años",
    description: "Equipamiento para quinceañeras",
    icon: "crown",
    href: "/eventos/xv-anos/",
  },
  {
    id: "corporativos",
    name: "Corporativos",
    description: "Congresos, conferencias, lanzamientos",
    icon: "briefcase",
    href: "/eventos/corporativos/",
  },
  {
    id: "sociales",
    name: "Eventos Sociales",
    description: "Cumpleaños, graduaciones, reuniones",
    icon: "users",
    href: "/eventos/sociales/",
  },
] as const;

/** Trust badges/stats for homepage */
export const TRUST_STATS = [
  { value: "500+", label: "Eventos realizados" },
  { value: "98%", label: "Clientes satisfechos" },
  { value: "24h", label: "Respuesta garantizada" },
  { value: "CDMX", label: "Cobertura completa" },
] as const;
