# Convención de títulos (meta title)

> **Lo más importante del sitio.** Aplica a TODAS las páginas.

## Regla #1 — Prohibido "EVENTECH"
Nunca aparece la marca "EVENTECH" / "EVENTECH.MX" en el `<title>` ni en la `meta description`. El espacio del título se usa 100% para keywords de negocio.

## Regla #2 — Complemento de título homologado
Todo título sigue este patrón:

```
[Keyword principal de la página] | Equipo para eventos en México
```

- **Complemento fijo:** `Equipo para eventos en México`
- **Separador:** ` | ` (pipe con espacios)
- La parte izquierda es única por página (su keyword principal).

### Ejemplo base (Home / index)
```
Renta de equipo para eventos | Equipo para eventos en México
```

### Ejemplos por página (patrón a seguir)
| Página | Keyword izquierda | Título final |
|---|---|---|
| Home | Renta de equipo para eventos | Renta de equipo para eventos \| Equipo para eventos en México |
| Mobiliario | Renta de mobiliario para eventos | Renta de mobiliario para eventos \| Equipo para eventos en México |
| Audiovisual | Renta de equipo audiovisual | Renta de equipo audiovisual \| Equipo para eventos en México |
| Carpas | Renta de carpas para eventos | Renta de carpas para eventos \| Equipo para eventos en México |
| Iluminación | Renta de iluminación para eventos | Renta de iluminación para eventos \| Equipo para eventos en México |
| Pistas de baile | Renta de pistas de baile | Renta de pistas de baile \| Equipo para eventos en México |
| Bodas | Equipo para bodas | Equipo para bodas \| Equipo para eventos en México |
| XV años | Equipo para XV años | Equipo para XV años \| Equipo para eventos en México |

> Nota: si en una página el complemento "Equipo para eventos en México" resulta redundante con la keyword izquierda, se puede sustituir por una variante geo/intención (ej. `… | Renta en CDMX y Edomex`). El complemento por defecto es siempre "Equipo para eventos en México".

## Regla #3 — Longitud
- Objetivo: **50–60 caracteres** visibles en Google. Máx duro recomendado 65.
- Keyword principal lo más a la izquierda posible.

## Cómo se implementa en código
La plantilla global vieja era `%s | EVENTECH.MX` en `src/data/site.ts` (`seo.titleTemplate`). Para escapar de ella y poner el título exacto se usa el flag **`rawTitle`**. Ver [[SEOHead-rawTitle]].

```astro
<PageLayout
  title="Renta de equipo para eventos | Equipo para eventos en México"
  rawTitle={true}
  description="…"
>
```

### Estado de migración
Desde 2026-06-11 el motor (`formatTitle`) ya **elimina la marca de TODAS las páginas** y añade el complemento solo donde cabe (≤60). No hace falta `rawTitle` salvo para control exacto. Estado de reescritura manual fina (keyword/length):
- [x] Home (`src/pages/index.astro`)
- [x] Servicios: index + categorías (mobiliario, audiovisual, carpas, iluminación, pistas, accesorios, catering, inflables)
- [x] Eventos (index)
- [x] Directorio (index)
- [x] Cotizar
- [ ] Productos L3/L4 (~230 páginas) — el motor ya las deja limpias; pendiente afinar keyword/longitud una por una
- [ ] Zonas / Blog (heredan de frontmatter; revisar `seoTitle`)
