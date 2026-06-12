# SEOHead — flag `rawTitle`

Permite que una página defina su `<title>` **exacto**, sin que se le aplique la plantilla global `%s | EVENTECH.MX`.

## Por qué existe
La plantilla histórica (`src/data/site.ts` → `seo.titleTemplate = "%s | EVENTECH.MX"`) añadía la marca a cada título. El proyecto requiere títulos sin "EVENTECH". `rawTitle` deja escapar de la plantilla página por página. Ver [[Convencion-de-titulos]].

## Implementación
**`src/data/site.ts`** — tipo `SEOProps`:
```ts
export type SEOProps = {
  title?: string;
  /** Si es true, usa `title` tal cual, sin plantilla. */
  rawTitle?: boolean;
  ...
};
```

**`src/utils/seo.ts`** — `resolveSEO`:
```ts
title: props.rawTitle && props.title ? props.title : formatTitle(props.title),
```

El flag fluye: página → `PageLayout` → `BaseLayout` → `SEOHead` (todos hacen spread de `seoProps`).

## Uso
```astro
<PageLayout
  title="Renta de equipo para eventos | Equipo para eventos en México"
  rawTitle={true}
  description="…"
>
```

## Futuro
Cuando TODAS las páginas usen `rawTitle`, se puede eliminar `titleTemplate` y limpiar `formatTitle`. Hasta entonces conviven.
