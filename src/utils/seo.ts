/**
 * ─── EVENTECH SEO Utilities ───
 * Helpers for building canonical URLs, formatting titles, and generating
 * structured data (JSON-LD) for local business, services, and events.
 */

import { SITE, type SEOProps } from "@data/site";

/** Build a full canonical URL from a relative path */
export function canonicalURL(path: string): string {
  const base = SITE.url.endsWith("/") ? SITE.url.slice(0, -1) : SITE.url;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

/** Apply the title template from site config */
export function formatTitle(title?: string): string {
  if (!title) return SITE.seo.title;
  return SITE.seo.titleTemplate.replace("%s", title);
}

/** Merge page-level SEO props with site defaults */
export function resolveSEO(props: SEOProps) {
  return {
    title: formatTitle(props.title),
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

/** Generate Organization JSON-LD */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.organization.name,
    url: SITE.url,
    logo: canonicalURL(SITE.organization.logo),
    foundingDate: SITE.organization.foundingDate,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.contact.phone,
      email: SITE.contact.email,
      contactType: "customer service",
      availableLanguage: "Spanish",
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
  name?: string;
  description?: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#localbusiness`,
    name: overrides?.name ?? SITE.organization.name,
    description: overrides?.description ?? SITE.seo.description,
    url: SITE.url,
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    priceRange: SITE.business.priceRange,
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
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: canonicalURL(service.url),
    image: service.image ? canonicalURL(service.image) : undefined,
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

  return {
    ...base,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: service.ratingValue,
      bestRating: 5,
      worstRating: 1,
      reviewCount: service.reviewCount,
    },
    review: service.reviews.map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
      author: {
        "@type": "Person",
        name: r.author,
      },
      reviewBody: r.text,
      datePublished: r.date,
    })),
  };
}

/** Generate Article JSON-LD for blog posts */
export function articleJsonLd(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
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
