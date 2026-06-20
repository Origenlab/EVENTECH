/**
 * ─── Interlinking Utilities ───
 * Helpers for connecting blog, services, and directory sections.
 * Improves SEO through strategic internal linking.
 */

import type { CollectionEntry } from "astro:content";

// ============================================
// Service Category Mappings
// ============================================
export const SERVICE_CATEGORIES = {
  mobiliario: {
    label: "Mobiliario",
    href: "/servicios/mobiliario/",
    keywords: ["sillas", "mesas", "salas lounge", "barras", "mobiliario", "furniture"],
    icon: "chair",
  },
  audiovisual: {
    label: "Audiovisual",
    href: "/servicios/audiovisual/",
    keywords: ["pantallas", "sonido", "proyectores", "microfonos", "audio", "video", "dj"],
    icon: "speaker",
  },
  carpas: {
    label: "Carpas y Toldos",
    href: "/servicios/carpas/",
    keywords: ["carpas", "toldos", "hangar", "estructural", "pisos"],
    icon: "tent",
  },
  iluminacion: {
    label: "Iluminación",
    href: "/servicios/iluminacion/",
    keywords: ["iluminación", "luces", "guirnaldas", "edison", "uplighting", "fairy lights", "led"],
    icon: "lightbulb",
  },
  "pistas-baile": {
    label: "Pistas de Baile",
    href: "/servicios/pistas-baile/",
    keywords: ["pista", "baile", "led", "madera", "tarima", "escenario"],
    icon: "music",
  },
  inflables: {
    label: "Inflables",
    href: "/servicios/inflables/",
    keywords: ["inflables", "brincolines", "juegos", "acuáticos", "toro mecánico"],
    icon: "balloon",
  },
  catering: {
    label: "Catering",
    href: "/servicios/catering/",
    keywords: ["catering", "vajilla", "cristalería", "cocina", "refrigeración"],
    icon: "utensils",
  },
  accesorios: {
    label: "Accesorios",
    href: "/servicios/accesorios/",
    keywords: ["mantelería", "textiles", "señalización", "plantas", "energía", "clima"],
    icon: "package",
  },
} as const;

// ============================================
// Event Type Mappings
// ============================================
export const EVENT_TYPES = {
  bodas: {
    label: "Bodas",
    href: "/eventos/bodas/",
    directoryHref: "/directorio/tipo-evento/bodas/",
    keywords: ["boda", "bodas", "matrimonio", "nupcial", "wedding"],
  },
  "xv-anos": {
    label: "XV Años",
    href: "/eventos/xv-anos/",
    directoryHref: "/directorio/tipo-evento/xv-anos/",
    keywords: ["xv años", "quinceañera", "15 años", "quinceaños"],
  },
  corporativos: {
    label: "Eventos Corporativos",
    href: "/eventos/corporativos/",
    directoryHref: "/directorio/tipo-evento/corporativos/",
    keywords: ["corporativo", "empresa", "conferencia", "convención", "lanzamiento"],
  },
  cumpleanos: {
    label: "Cumpleaños",
    href: "/eventos/cumpleanos/",
    directoryHref: "/directorio/tipo-evento/cumpleanos/",
    keywords: ["cumpleaños", "fiesta", "celebración", "birthday"],
  },
  bautizos: {
    label: "Bautizos",
    href: "/eventos/bautizos/",
    directoryHref: "/directorio/tipo-evento/bautizos/",
    keywords: ["bautizo", "bautismo", "religioso"],
  },
  graduaciones: {
    label: "Graduaciones",
    href: "/eventos/graduaciones/",
    directoryHref: "/directorio/tipo-evento/graduaciones/",
    keywords: ["graduación", "graduaciones", "egresados"],
  },
} as const;

// ============================================
// Venue Type Mappings
// ============================================
export const VENUE_TYPES = {
  hacienda: {
    label: "Haciendas",
    href: "/directorio/tipo-venue/haciendas/",
    keywords: ["hacienda", "colonial", "histórico"],
  },
  jardin: {
    label: "Jardines",
    href: "/directorio/tipo-venue/jardines/",
    keywords: ["jardín", "jardines", "aire libre", "outdoor"],
  },
  salon: {
    label: "Salones",
    href: "/directorio/tipo-venue/salones/",
    keywords: ["salón", "salones", "interior"],
  },
  terraza: {
    label: "Terrazas",
    href: "/directorio/tipo-venue/terrazas/",
    keywords: ["terraza", "rooftop", "azotea"],
  },
  hotel: {
    label: "Hoteles",
    href: "/directorio/tipo-venue/hoteles/",
    keywords: ["hotel", "hospedaje"],
  },
} as const;

// ============================================
// Find Related Services by Keywords
// ============================================
export function findRelatedServices(
  content: string,
  title: string,
  tags: string[] = [],
  limit: number = 4
): Array<{ label: string; href: string; icon: string }> {
  const text = `${title} ${content} ${tags.join(" ")}`.toLowerCase();
  const matches: Array<{ key: string; score: number }> = [];

  for (const [key, category] of Object.entries(SERVICE_CATEGORIES)) {
    let score = 0;
    for (const keyword of category.keywords) {
      const regex = new RegExp(keyword, "gi");
      const matchCount = (text.match(regex) || []).length;
      score += matchCount;
    }
    if (score > 0) {
      matches.push({ key, score });
    }
  }

  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(m => {
      const cat = SERVICE_CATEGORIES[m.key as keyof typeof SERVICE_CATEGORIES];
      return { label: cat.label, href: cat.href, icon: cat.icon };
    });
}

// ============================================
// Find Related Event Types
// ============================================
export function findRelatedEventTypes(
  content: string,
  title: string,
  category?: string,
  limit: number = 3
): Array<{ label: string; href: string; directoryHref: string }> {
  const text = `${title} ${content} ${category || ""}`.toLowerCase();
  const matches: Array<{ key: string; score: number }> = [];

  for (const [key, eventType] of Object.entries(EVENT_TYPES)) {
    let score = 0;
    // Boost if category matches
    if (category && key === category) {
      score += 10;
    }
    for (const keyword of eventType.keywords) {
      const regex = new RegExp(keyword, "gi");
      const matchCount = (text.match(regex) || []).length;
      score += matchCount;
    }
    if (score > 0) {
      matches.push({ key, score });
    }
  }

  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(m => {
      const et = EVENT_TYPES[m.key as keyof typeof EVENT_TYPES];
      return { label: et.label, href: et.href, directoryHref: et.directoryHref };
    });
}

// ============================================
// Find Related Venue Types
// ============================================
export function findRelatedVenueTypes(
  content: string,
  title: string,
  limit: number = 3
): Array<{ label: string; href: string }> {
  const text = `${title} ${content}`.toLowerCase();
  const matches: Array<{ key: string; score: number }> = [];

  for (const [key, venueType] of Object.entries(VENUE_TYPES)) {
    let score = 0;
    for (const keyword of venueType.keywords) {
      const regex = new RegExp(keyword, "gi");
      const matchCount = (text.match(regex) || []).length;
      score += matchCount;
    }
    if (score > 0) {
      matches.push({ key, score });
    }
  }

  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(m => {
      const vt = VENUE_TYPES[m.key as keyof typeof VENUE_TYPES];
      return { label: vt.label, href: vt.href };
    });
}

// ============================================
// Get Service Links from Slugs
// ============================================
export function getServiceLinks(slugs: string[]): Array<{ label: string; href: string }> {
  return slugs.map(slug => {
    // Convert slug to label (e.g., "iluminacion/decorativa" → "Iluminación Decorativa")
    const parts = slug.split("/");
    const label = parts
      .map(p => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, " "))
      .join(" - ");
    return {
      label,
      href: `/servicios/${slug}/`,
    };
  });
}

// ============================================
// Generate Breadcrumb-style Service Path
// ============================================
export function getServiceBreadcrumbs(slug: string): Array<{ label: string; href: string }> {
  const parts = slug.split("/");
  const breadcrumbs: Array<{ label: string; href: string }> = [
    { label: "Servicios", href: "/servicios/" },
  ];

  let currentPath = "/servicios";
  for (const part of parts) {
    currentPath += `/${part}`;
    const label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ");
    breadcrumbs.push({ label, href: `${currentPath}/` });
  }

  return breadcrumbs;
}

// ============================================
// Popular Service Links (for sidebars)
// ============================================
export const POPULAR_SERVICES = [
  { label: "Guirnaldas Edison", href: "/servicios/iluminacion/decorativa/fairy-lights/", icon: "lightbulb" },
  { label: "Sillas Tiffany", href: "/servicios/mobiliario/sillas/tiffany/", icon: "chair" },
  { label: "Pistas LED", href: "/servicios/pistas-baile/pistas-led/", icon: "music" },
  { label: "Carpas Árabes", href: "/servicios/carpas/carpas-arabes/", icon: "tent" },
  { label: "Sonido Line Array", href: "/servicios/audiovisual/sonido/line-array/", icon: "speaker" },
  { label: "Salas Lounge", href: "/servicios/mobiliario/salas-lounge/", icon: "chair" },
];

// ============================================
// Popular Venues (for sidebars)
// ============================================
export const POPULAR_VENUES = [
  { label: "Hacienda de los Morales", href: "/directorio/cdmx/polanco/hacienda-de-los-morales/", zone: "Polanco" },
  { label: "San Ángel Inn", href: "/directorio/cdmx/san-angel/san-angel-inn/", zone: "San Ángel" },
  { label: "Hacienda de Tlalpan", href: "/directorio/cdmx/tlalpan/hacienda-de-tlalpan/", zone: "Tlalpan" },
  { label: "Casa Awolly", href: "/directorio/cdmx/roma-condesa/casa-awolly/", zone: "Roma" },
  { label: "Jardín Escondido", href: "/directorio/cdmx/san-angel/jardin-escondido/", zone: "San Ángel" },
];

// ============================================
// Zone Links for CDMX
// ============================================
export const CDMX_ZONES = [
  { label: "Polanco", href: "/directorio/cdmx/polanco/" },
  { label: "San Ángel", href: "/directorio/cdmx/san-angel/" },
  { label: "Coyoacán", href: "/directorio/cdmx/coyoacan/" },
  { label: "Roma-Condesa", href: "/directorio/cdmx/roma-condesa/" },
  { label: "Tlalpan", href: "/directorio/cdmx/tlalpan/" },
  { label: "Santa Fe", href: "/directorio/cdmx/santa-fe/" },
];

// ============================================
// Zone Links for Estado de México
// ============================================
export const EDOMEX_ZONES = [
  { label: "Valle de Bravo", href: "/directorio/estado-mexico/valle-de-bravo/" },
  { label: "Metepec", href: "/directorio/estado-mexico/metepec/" },
  { label: "Toluca", href: "/directorio/estado-mexico/toluca/" },
  { label: "Huixquilucan", href: "/directorio/estado-mexico/huixquilucan/" },
  { label: "Naucalpan", href: "/directorio/estado-mexico/naucalpan/" },
];
