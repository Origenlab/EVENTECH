/**
 * ─── EVENTECH SEO Utilities ───
 * Helpers for building canonical URLs, formatting titles, and generating
 * structured data (JSON-LD) for local business, services, and events.
 */

import { SITE, type SEOProps } from "@config/site";

/** Build a full canonical URL from a relative path */
export function canonicalURL(path: string): string {
  const base = SITE.url.endsWith("/") ? SITE.url.slice(0, -1) : SITE.url;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

/**
 * Apply the title template, but only when it fits.
 * Adds the homologated complement (`| Equipo para eventos en México`) when the
 * resulting title stays within `titleMaxLength` (~60 chars). Otherwise returns
 * the page title alone — never with the brand. See vault: Convencion-de-titulos.
 */
export function formatTitle(title?: string): string {
  if (!title) return SITE.seo.title;
  const max = SITE.seo.titleMaxLength ?? 60;
  const withComplement = SITE.seo.titleTemplate.replace("%s", title);
  return withComplement.length <= max ? withComplement : title;
}

/** Merge page-level SEO props with site defaults */
export function resolveSEO(props: SEOProps) {
  return {
    title: props.rawTitle ? (props.title ?? SITE.seo.title) : formatTitle(props.title),
    description: props.description ?? SITE.seo.description,
    image: props.image ?? SITE.seo.image,
    type: props.type ?? SITE.seo.type,
    noindex: props.noindex ?? false,
    canonical: props.canonical,
    publishedTime: props.publishedTime,
    modifiedTime: props.modifiedTime,
    author: props.author,
  };
}

/** Generate Organization JSON-LD (publisher entity, referenced by @id everywhere) */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.organization.name,
    legalName: SITE.organization.legalName,
    alternateName: SITE.organization.alternateName,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE.url}/#logo`,
      url: canonicalURL(SITE.organization.logo),
      // Dimensiones reales del archivo public/images/logo.png (verificado)
      width: 600,
      height: 160,
      caption: SITE.organization.name,
    },
    image: { "@id": `${SITE.url}/#logo` },
    description: SITE.seo.description,
    foundingDate: SITE.organization.foundingDate,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.contact.phoneRaw,
      email: SITE.contact.email,
      contactType: "customer service",
      areaServed: "MX",
      availableLanguage: ["es-MX", "Spanish"],
    },
    sameAs: SITE.organization.sameAs,
  };
}

/** Generate WebSite JSON-LD with SearchAction */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.locale,
    description: SITE.seo.description,
    publisher: {
      "@id": `${SITE.url}/#organization`,
    },
  };
}

/** Generate LocalBusiness JSON-LD for homepage and zone pages */
export function localBusinessJsonLd(overrides?: {
  id?: string;
  name?: string;
  description?: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": overrides?.id ?? `${SITE.url}/#localbusiness`,
    name: overrides?.name ?? SITE.organization.name,
    description: overrides?.description ?? SITE.seo.description,
    url: SITE.url,
    image: canonicalURL(SITE.seo.image),
    logo: { "@id": `${SITE.url}/#logo` },
    parentOrganization: { "@id": `${SITE.url}/#organization` },
    telephone: SITE.contact.phoneRaw,
    email: SITE.contact.email,
    priceRange: SITE.business.priceRange,
    currenciesAccepted: "MXN",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ciudad de México",
      addressRegion: "CDMX",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.business.geo.latitude,
      longitude: SITE.business.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: SITE.business.openingHours.weekdays.opens,
        closes: SITE.business.openingHours.weekdays.closes,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: SITE.business.openingHours.saturday.opens,
        closes: SITE.business.openingHours.saturday.closes,
      },
    ],
    areaServed: (overrides?.areaServed ?? SITE.business.areaServed).map(
      (area) => ({
        "@type": "City",
        name: area,
      })
    ),
    sameAs: SITE.organization.sameAs,
  };
}

/** Generate Service JSON-LD for service pages */
export function serviceJsonLd(service: {
  name: string;
  description: string;
  url: string;
  image?: string;
  priceRange?: {
    min: number;
    max: number;
    currency?: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    // Multi-type Service+Product: los motores de IA (ZeroRank check) buscan
    // Product en páginas de equipo rentable; Service describe la renta.
    // Sin priceRange NO emitimos Product: Google exige offers/review/rating
    // en Product y generaría avisos en Search Console (hubs L3).
    "@type": service.priceRange ? ["Service", "Product"] : "Service",
    name: service.name,
    description: service.description,
    url: canonicalURL(service.url),
    image: service.image ? canonicalURL(service.image) : undefined,
    brand: {
      "@type": "Brand",
      name: SITE.organization.name,
    },
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}/#localbusiness`,
      name: SITE.organization.name,
    },
    areaServed: SITE.business.areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    ...(service.priceRange && {
      offers: {
        "@type": "Offer",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: service.priceRange.min,
          maxPrice: service.priceRange.max,
          priceCurrency: service.priceRange.currency ?? "MXN",
        },
      },
    }),
  };
}

/** Generate Service JSON-LD with AggregateRating + Reviews (for L4 product pages) */
export function serviceWithReviewJsonLd(service: {
  name: string;
  description: string;
  url: string;
  image?: string;
  priceRange?: {
    min: number;
    max: number;
    currency?: string;
  };
  reviews: {
    author: string;
    text: string;
    rating: number;
    date: string;
  }[];
  ratingValue: number;
  reviewCount: number;
}) {
  const base = serviceJsonLd({
    name: service.name,
    description: service.description,
    url: service.url,
    image: service.image,
    priceRange: service.priceRange,
  });

  // NOTA: Google prohíbe reseñas/ratings auto-emitidos (self-serving) sobre la
  // propia entidad. Se omiten `aggregateRating` y `review` del JSON-LD para
  // evitar acciones manuales. Las reseñas siguen visibles como contenido.
  // Si en el futuro hay reseñas verificables de terceros, reactivar aquí.
  void service.reviews;
  void service.ratingValue;
  void service.reviewCount;
  return base;
}

/** Generate Article JSON-LD for blog posts */
export function articleJsonLd(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string | undefined;
  dateModified?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: canonicalURL(article.url),
    image: article.image ? canonicalURL(article.image) : undefined,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: {
      "@type": "Person",
      name: article.author ?? SITE.organization.name,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.organization.name,
      logo: {
        "@type": "ImageObject",
        url: canonicalURL(SITE.organization.logo),
      },
    },
  };
}

/** Generate FAQPage JSON-LD */
export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** Generate BreadcrumbList JSON-LD */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonicalURL(item.url),
    })),
  };
}

/** Generate Event JSON-LD (for event type pages) */
export function eventTypeJsonLd(eventType: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `Renta de equipo para ${eventType.name}`,
    name: `Equipamiento para ${eventType.name}`,
    description: eventType.description,
    url: canonicalURL(eventType.url),
    image: eventType.image ? canonicalURL(eventType.image) : undefined,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}/#localbusiness`,
    },
    areaServed: SITE.business.areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
  };
}

/** Generate ItemList JSON-LD (for directory listing pages) */
export function itemListJsonLd(items: {
  name: string;
  url: string;
  image?: string;
  description?: string;
}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: canonicalURL(item.url),
      ...(item.image && { image: canonicalURL(item.image) }),
      ...(item.description && { description: item.description }),
    })),
  };
}

/** Generate Product JSON-LD for rental equipment items (satisfies ZeroRank Product check) */
export function productJsonLd(product: {
  name: string;
  description: string;
  url: string;
  image?: string;
  sku?: string;
  priceRange?: {
    min: number;
    max: number;
    currency?: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: canonicalURL(product.url),
    ...(product.image && { image: canonicalURL(product.image) }),
    ...(product.sku && { sku: product.sku }),
    brand: {
      "@type": "Brand",
      name: SITE.organization.name,
    },
    ...(product.priceRange && {
      offers: {
        "@type": "Offer",
        url: canonicalURL(product.url),
        priceCurrency: product.priceRange.currency ?? "MXN",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: product.priceRange.min,
          maxPrice: product.priceRange.max,
          priceCurrency: product.priceRange.currency ?? "MXN",
        },
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          "@id": `${SITE.url}/#organization`,
        },
      },
    }),
  };
}

/** Generate HowTo JSON-LD for step-by-step instructional content */
export function howToJsonLd(howTo: {
  name: string;
  description: string;
  url: string;
  image?: string;
  totalTime?: string; // ISO 8601, e.g. "PT24H"
  steps: {
    name: string;
    text: string;
    url?: string;
    image?: string;
  }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    url: canonicalURL(howTo.url),
    ...(howTo.image && { image: canonicalURL(howTo.image) }),
    ...(howTo.totalTime && { totalTime: howTo.totalTime }),
    step: howTo.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: canonicalURL(step.url) }),
      ...(step.image && { image: canonicalURL(step.image) }),
    })),
  };
}

/** Generate CollectionPage JSON-LD (for directory region/zone pages) */
export function collectionPageJsonLd(page: {
  name: string;
  description: string;
  url: string;
  numberOfItems: number;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.name,
    description: page.description,
    url: canonicalURL(page.url),
    numberOfItems: page.numberOfItems,
    ...(page.areaServed && {
      about: {
        "@type": "Place",
        name: page.areaServed,
        address: {
          "@type": "PostalAddress",
          addressLocality: page.areaServed,
          addressCountry: "MX",
        },
      },
    }),
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
    },
  };
}

/** Generate EventVenue JSON-LD (for venue/salon pages in directorio) */
export function venueJsonLd(venue: {
  name: string;
  description: string;
  url: string;
  image?: string;
  address: {
    street: string;
    locality: string;
    region: string;
    postalCode?: string;
    country?: string;
  };
  geo?: {
    lat: number;
    lng: number;
  };
  telephone?: string;
  email?: string;
  priceRange?: string;
  capacity?: {
    min: number;
    max: number;
  };
  rating?: number;
  reviewCount?: number;
  amenities?: string[];
  openingHours?: {
    weekdays?: string;
    weekends?: string;
  };
}) {
  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: venue.name,
    description: venue.description,
    url: canonicalURL(venue.url),
    image: venue.image ? canonicalURL(venue.image) : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: venue.address.street,
      addressLocality: venue.address.locality,
      addressRegion: venue.address.region,
      postalCode: venue.address.postalCode,
      addressCountry: venue.address.country ?? "MX",
    },
  };

  if (venue.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: venue.geo.lat,
      longitude: venue.geo.lng,
    };
  }

  if (venue.telephone) {
    schema.telephone = venue.telephone;
  }

  if (venue.email) {
    schema.email = venue.email;
  }

  if (venue.priceRange) {
    schema.priceRange = venue.priceRange;
  }

  if (venue.capacity) {
    schema.maximumAttendeeCapacity = venue.capacity.max;
  }

  if (venue.rating && venue.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: venue.rating,
      reviewCount: venue.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  if (venue.amenities && venue.amenities.length > 0) {
    schema.amenityFeature = venue.amenities.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    }));
  }

  if (venue.openingHours) {
    const hours: string[] = [];
    if (venue.openingHours.weekdays) {
      hours.push(`Mo-Fr ${venue.openingHours.weekdays}`);
    }
    if (venue.openingHours.weekends) {
      hours.push(`Sa-Su ${venue.openingHours.weekends}`);
    }
    if (hours.length > 0) {
      schema.openingHours = hours;
    }
  }

  return schema;
}
