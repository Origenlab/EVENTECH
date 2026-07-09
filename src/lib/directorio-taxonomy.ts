/**
 * ─── Taxonomía del directorio — FUENTE ÚNICA DE VERDAD ───
 *
 * Los venues declaran en su frontmatter `eventTypes` y `type` valores libres.
 * Solo algunos de esos valores tienen una página de landing generada
 * (`/directorio/tipo-evento/<slug>/` y `/directorio/tipo-venue/<slug>/`).
 *
 * Antes, las fichas de venue renderizaban un <a> por CADA valor del frontmatter,
 * generando cientos de enlaces a páginas inexistentes (p. ej. `fiestas-privadas`
 * aparecía en 162 páginas y no existía la landing).
 *
 * Regla: si un slug NO está en estas listas, NO se enlaza — se muestra como
 * etiqueta de texto plano. Para publicar una nueva landing hay que (1) añadir su
 * config en la página [eventType].astro / [venueType].astro y (2) añadir el slug aquí.
 */

/** Slugs con landing real en /directorio/tipo-evento/<slug>/ */
export const EVENT_TYPE_SLUGS = [
  "bodas",
  "xv-anos",
  "corporativos",
  "graduaciones",
  "bautizos",
  "aniversarios",
  "cumpleanos",
  "cenas-gala",
  "lanzamientos",
] as const;

/** Slugs con landing real en /directorio/tipo-venue/<slug>/ */
export const VENUE_TYPE_SLUGS = [
  "haciendas",
  "jardines",
  "salones",
  "terrazas",
  "hoteles",
  "quintas",
  "restaurantes",
  "foros",
  "centros-convenciones",
] as const;

const EVENT_SET: ReadonlySet<string> = new Set(EVENT_TYPE_SLUGS);
const VENUE_SET: ReadonlySet<string> = new Set(VENUE_TYPE_SLUGS);

/** ¿El tipo de evento tiene página propia? */
export const hasEventTypePage = (slug: string): boolean => EVENT_SET.has(slug);

/** ¿El tipo de venue tiene página propia? */
export const hasVenueTypePage = (slug: string): boolean => VENUE_SET.has(slug);
