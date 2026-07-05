# Taxonomía del Directorio — Regla Zona/Colonia

**Fecha:** 5 de julio de 2026
**Estado:** Vigente — aplicada en commits `ea80b08d` y siguiente

---

## Regla única de asignación

Cada venue vive en **una sola zona** (`zoneSlug` = carpeta). La zona se determina así:

1. **Si la colonia del venue pertenece a una zona premium** (tabla abajo) → va en esa zona premium.
2. **Si no** → va en la zona de su **alcaldía**.
3. La colonia real siempre va en `neighborhood` (nombre oficial SEPOMEX, con acentos).
4. `zoneSlug` DEBE coincidir con la carpeta. `zone` es el nombre display de la zona.

## Zonas premium y sus colonias

| Zona premium | Colonias que la componen |
|---|---|
| `polanco` | Polanco I-V Secciones, Los Morales (Palmas/Sección Alameda), Bosque de Chapultepec I |
| `roma-condesa` | Roma Norte, Roma Sur, Condesa, Hipódromo, Hipódromo Condesa, Cuauhtémoc (colonia) |
| `centro-historico` | Centro Histórico, Centro (Área 1-9) |
| `del-valle` | Del Valle Centro, Del Valle Norte, Del Valle Sur, Insurgentes San Borja, Tlacoquemécatl |
| `san-angel` | San Ángel, San Ángel Inn, Tizapán San Ángel, Chimalistac |
| `pedregal` | Jardines del Pedregal, Pedregal de San Ángel, Jardines del Pedregal de San Ángel |
| `lomas-chapultepec` | Lomas de Chapultepec I-VIII, Bosques de las Lomas |
| `santa-fe` | Santa Fe (todas las secciones: Cuajimalpa y Álvaro Obregón), Peña Blanca, La Loma |

**Los pedregales populares NO son zona pedregal:** Pedregal de Santa Úrsula, Santo Domingo, Carrasco, San Nicolás → van en su alcaldía (coyoacán/tlalpan).

## Excepciones documentadas

| Venue | Regla diría | Se queda en | Motivo |
|---|---|---|---|
| `hotel-camino-real` (Nueva Anzures) | miguel-hidalgo | polanco | Marca oficial "Camino Real Polanco"; intent de búsqueda 100% Polanco |

Toda nueva excepción se agrega a esta tabla — sin tabla, no hay excepción.

## Movimientos aplicados (2026-07-05)

**Ronda 1 (ea80b08d):** azul-historico-terraza→centro-historico · four-seasons, st-regis→cuauhtemoc · casa-lamm→roma-condesa · au-pied-de-cochon→polanco · casa-del-lago, museo-soumaya, centro-citibanamex→miguel-hidalgo · hacienda-san-angel→san-angel · fix zoneSlug perisur→coyoacan

**Ronda 2:** casino-espanol, palacio-de-mineria→centro-historico · salon-metropolis→roma-condesa · loft-escandon→miguel-hidalgo · casa-goldsmith, gran-salon-del-valle, hyatt-regency, la-fontana→del-valle · centro-convenciones-insurgentes→alvaro-obregon (Guadalupe Inn) · loreto-pena-pobre, hacienda-de-cortes→san-angel

Todos con redirect 301 en `public/_redirects` (CF Pages).

## Checklist para fichas nuevas

- [ ] Colonia oficial en `neighborhood` (verificar en SEPOMEX por CP)
- [ ] ¿Colonia en tabla premium? → zona premium; si no → alcaldía
- [ ] Carpeta = `zoneSlug`
- [ ] Si URL vieja existía: agregar 301 a `public/_redirects`
