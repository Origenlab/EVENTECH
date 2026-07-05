# Template — Ficha de Venue (Directorio)

**Fecha:** 5 de julio de 2026
**Estado:** Vigente — estándar obligatorio para toda ficha nueva y para homologación de existentes
**Relacionado:** [[Taxonomia-Directorio-Zonas]]

---

## Principios (no negociables)

1. **Solo datos verificados.** Dirección, teléfono, capacidades, precios y políticas salen de fuentes reales (sitio oficial del venue, bodas.com.mx, directorios con datos consistentes). Lo que no se pueda verificar, se omite — el schema lo permite: casi todo es opcional.
2. **Cero reviews inventadas.** El campo `reviews` solo se llena con testimonios reales y citables. `rating` solo si existe una fuente (Google, bodas.com.mx). Fichas legacy con reviews fabricadas: no replicar el patrón; migrar cuando se retrabajen.
3. **Coordenadas solo exactas.** Si no hay coords de fuente, usar `googleMapsUrl` con query por nombre y omitir `coordinates`.
4. **FAQs = hechos.** Cada FAQ responde con datos confirmados (capacidad, dirección, políticas de banquete, formas de pago, horarios). Nada aspiracional.
5. **Fuentes en el commit.** El mensaje de commit o el PR lista las URLs de donde salieron los datos.

## Frontmatter — campos y convenciones

| Campo | Regla |
|---|---|
| `name` | Nombre comercial real |
| `slug` | = nombre de archivo, kebab-case |
| `description` | 3-5 líneas factuales |
| `shortDescription` | ≤160 chars, dato duro + colonia |
| `zone`/`zoneSlug` | Según [[Taxonomia-Directorio-Zonas]]; carpeta = zoneSlug |
| `neighborhood` | Colonia oficial SEPOMEX con acentos |
| `postalCode` | Verificado contra la colonia |
| `capacity` | min/max de fuente; `cocktail` solo si publicado |
| `priceRange` | $: <500 pp o <18K evento · $$: 500-1,200 pp · $$$: 1,200-2,500 pp · $$$$: >2,500 pp |
| `pricePerPerson`/`rentalPrice` | Solo si hay cifras publicadas |
| `contact` | Solo canales verificados; instituciones sin WA no llevan `whatsapp` |
| `image` | `/images/venues/<slug>-hero.avif` 1200x800; base de venues-base si no hay foto real |
| `rating` | Solo con fuente; `reviewCount` solo si se conoce |
| `seoTitle` | = `name` (≤70; el layout agrega el complemento fijo — ver convención de títulos) |
| `seoDescription` | ≤160, dato duro + colonia, sin marca |
| `keywords` | 5, long-tail con colonia |
| `verified` | `true` solo si EVENTECH validó en sitio |
| `publishedAt` | Fecha real de publicación |

## Cuerpo — secciones canónicas (en este orden)

```markdown
## <H2 libre — gancho editorial con la colonia>
(2 párrafos: qué es, por qué importa en su zona)

## Espacios y capacidades   ← o "## Espacios", "## El espacio" si es único
(bullets con cifras verificadas)

## <sección propia del venue>  ← gastronomía / servicios / paquetes, según lo que haya
(solo lo confirmado)

## Ubicación
(dirección completa, colonia en negritas, referencias de acceso reales)

## Producción EVENTECH      ← heading EXACTO, canónico
(3 bullets con links a /servicios/ relevantes al tipo de venue)

## Venues similares          ← heading EXACTO, canónico
(3 links internos a fichas de la misma zona o tipo, con descriptor de 4-8 palabras)
```

**Los headings `## Producción EVENTECH` y `## Venues similares` son literales** — homologados en las 226 fichas el 2026-07-05. Ninguna variante nueva ("Producción Profesional...", "Venues Recomendados...", "Checklist EVENTECH...").

## Checklist pre-commit

- [ ] Datos con fuente (URLs anotadas)
- [ ] Colonia oficial + zona según taxonomía
- [ ] Hero avif generado y existente en `public/images/venues/`
- [ ] Headings canónicos exactos
- [ ] 3+ links internos en Venues similares que apuntan a fichas EXISTENTES
- [ ] Sin reviews/ratings sin fuente
- [ ] `npx astro build` verde
