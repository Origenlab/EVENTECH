/**
 * ─── EVENTECH Content Collections Configuration ───
 * Defines schemas for all content types: services, events, zones, blog, etc.
 * Astro validates frontmatter at build time using these schemas.
 */
import { defineCollection, z } from "astro:content";

// ============================================
// Hero Schema (reutilizable para todas las colecciones)
// ============================================
const heroSchema = z.object({
  badge: z.string().optional(),
  title: z.string(),
  subtitle: z.string(),
  primaryCTA: z.object({
    label: z.string(),
    href: z.string(),
  }),
  secondaryCTA: z.object({
    label: z.string(),
    href: z.string(),
  }).optional(),
  cards: z.array(
    z.object({
      title: z.string().optional(),
      content: z.string(),
    })
  ).optional(),
});

// ============================================
// SERVICIOS Collection
// ============================================
const servicios = defineCollection({
  type: "content",
  schema: z.object({
    // Basic metadata
    title: z.string(),
    description: z.string().max(160),

    // Hierarchy
    category: z.enum([
      "mobiliario",
      "audiovisual",
      "carpas",
      "pistas-baile",
      "barras",
      "accesorios",
      "iluminacion",
    ]),
    subcategory: z.string().optional(),
    parentService: z.string().optional(),

    // SEO
    seoTitle: z.string().max(70).optional(),
    seoDescription: z.string().max(160).optional(),
    keywords: z.array(z.string()).optional(),
    noindex: z.boolean().default(false),

    // Visual
    image: z.string().optional(),
    gallery: z.array(z.string()).optional(),

    // Pricing (for transparency)
    pricing: z
      .object({
        min: z.number(),
        max: z.number(),
        unit: z.enum(["pieza", "set", "evento", "hora", "día"]),
        note: z.string().optional(),
      })
      .optional(),

    // Specs
    specs: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .optional(),

    // What's included
    includes: z.array(z.string()).optional(),

    // Relationships
    relatedServices: z.array(z.string()).optional(),
    idealForEvents: z.array(z.string()).optional(),

    // Sub-services (for hub pages)
    subServices: z
      .array(
        z.object({
          name: z.string(),
          excerpt: z.string(),
          cta: z.string(),
          href: z.string(),
          icon: z.string().optional(),
        })
      )
      .optional(),

    // FAQs
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),

    // Hero section
    hero: heroSchema.optional(),

    // Metadata
    order: z.number().default(0),
    featured: z.boolean().default(false),
    isHub: z.boolean().default(false),
    publishedAt: z.coerce.date().optional(),
  }),
});

// ============================================
// EVENTOS Collection
// ============================================
const eventos = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),

    // SEO
    seoTitle: z.string().max(70).optional(),
    seoDescription: z.string().max(160).optional(),
    keywords: z.array(z.string()).optional(),

    // Visual
    image: z.string(),
    heroImage: z.string().optional(),
    gallery: z.array(z.string()).optional(),

    // Content
    intro: z.string().optional(),

    // Service sections
    serviceSections: z
      .array(
        z.object({
          name: z.string(),
          description: z.string(),
          services: z.array(z.string()),
        })
      )
      .optional(),

    // Styles available
    styles: z
      .array(
        z.object({
          name: z.string(),
          description: z.string(),
          image: z.string().optional(),
        })
      )
      .optional(),

    // Stats
    stats: z
      .object({
        avgGuests: z.number().optional(),
        avgBudget: z.string().optional(),
        peakMonths: z.array(z.string()).optional(),
      })
      .optional(),

    // FAQs
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),

    // Hero section
    hero: heroSchema.optional(),

    // Metadata
    order: z.number().default(0),
    featured: z.boolean().default(false),
    publishedAt: z.coerce.date().optional(),
  }),
});

// ============================================
// ZONAS Collection (SEO Local)
// ============================================
const zonas = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),

    // Geography
    type: z.enum(["ciudad", "estado", "alcaldia", "municipio", "zona"]),
    parentZone: z.string().optional(),

    // SEO
    seoTitle: z.string().max(70).optional(),
    seoDescription: z.string().max(160).optional(),
    keywords: z.array(z.string()).optional(),

    // Geo data
    geo: z
      .object({
        lat: z.number().optional(),
        lng: z.number().optional(),
        postalCodes: z.array(z.string()).optional(),
      })
      .optional(),

    // Visual
    image: z.string().optional(),

    // Content
    intro: z.string().optional(),

    // Popular venues
    venues: z
      .array(
        z.object({
          name: z.string(),
          type: z.string(),
          url: z.string().optional(),
        })
      )
      .optional(),

    // Delivery info
    delivery: z
      .object({
        time: z.string(),
        cost: z.string().optional(),
        notes: z.string().optional(),
      })
      .optional(),

    // Subzones (for hub pages)
    subzones: z.array(z.string()).optional(),

    // Hero section
    hero: heroSchema.optional(),

    // Metadata
    order: z.number().default(0),
    isHub: z.boolean().default(false),
    publishedAt: z.coerce.date().optional(),
  }),
});

// ============================================
// BLOG Collection
// ============================================
const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(160),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    // Category
    category: z.enum([
      "bodas",
      "xv-anos",
      "corporativos",
      "tendencias",
      "guias",
      "tips",
      "casos-exito",
    ]),
    tags: z.array(z.string()).default([]),

    // Visual
    image: z.string().optional(),
    imageAlt: z.string().optional(),

    // Author
    author: z.string().default("Equipo EVENTECH"),

    // SEO
    seoTitle: z.string().max(70).optional(),
    seoDescription: z.string().max(160).optional(),
    keywords: z.array(z.string()).optional(),
    noindex: z.boolean().default(false),

    // Relationships
    relatedServices: z.array(z.string()).optional(),
    relatedEvents: z.array(z.string()).optional(),
    relatedPosts: z.array(z.string()).optional(),

    // CTA
    cta: z
      .object({
        label: z.string(),
        href: z.string(),
      })
      .optional(),

    // FAQs for schema
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),

    // Status
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

// ============================================
// PAGES Collection (for static pages)
// ============================================
const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    image: z.string().optional(),
    noindex: z.boolean().default(false),

    // Hero section (usa el schema reutilizable)
    hero: heroSchema.optional(),
  }),
});

// ============================================
// Export all collections
// ============================================
export const collections = {
  servicios,
  eventos,
  zonas,
  blog,
  pages,
};
