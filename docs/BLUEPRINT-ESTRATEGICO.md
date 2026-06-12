# EVENTECH.MX — BLUEPRINT ESTRATÉGICO DE DOMINANCIA DE MERCADO

## Documento de Consultoría Estratégica | Versión 1.0

---

## RESUMEN EJECUTIVO

**Empresa:** EVENTECH.MX
**Industria:** Renta de equipos para eventos (México)
**Objetivo:** Dominar el mercado nacional en 36 meses
**Stack técnico:** Astro + Markdown/MDX + Tailwind CSS
**Mercado primario:** CDMX + Zona Metropolitana

### Métricas Clave del Mercado

| Métrica | Valor |
|---------|-------|
| **TAM México (Renta equipos eventos)** | ~$4,300 millones MXN/año |
| **Mercado de bodas** | $7,500 millones USD/año |
| **Costo promedio boda** | $180,000 MXN (140 invitados) |
| **Matrimonios/año** | ~500,000 |

---

## FASE 1 — INTELIGENCIA DE MERCADO

### Segmentación por Tipo de Evento

| Segmento | Ticket Promedio | Estacionalidad | Competencia |
|----------|-----------------|----------------|-------------|
| Eventos corporativos | $15K - $500K MXN | Baja dic/verano | Alta |
| Bodas | $15K - $80K MXN | May, Oct-Dic | Alta |
| XV Años | $8K - $40K MXN | Todo el año | Media-Alta |
| Eventos sociales | $2K - $15K MXN | Todo el año | Muy Alta |
| Exposiciones/Ferias | $50K - $2M MXN | Feb-Abr, Sep-Nov | Baja |
| Gubernamentales | $20K - $500K MXN | Cierre Q4 | Media |

### Catálogo de Equipos por Tier

#### TIER 1 — Core Revenue
- Sillas (plegables, Tiffany, Crossback): $15-120 MXN/unidad
- Mesas (redondas, rectangulares, cocktail): $80-350 MXN/unidad
- Manteles y cubremantel: $50-200 MXN/unidad
- Carpas/Toldos básicos: $2,000-15,000 MXN
- Sonido básico: $1,500-8,000 MXN
- Iluminación básica: $1,000-5,000 MXN

#### TIER 2 — Growth Drivers
- Salas lounge completas: $3,000-25,000 MXN/set
- Pantallas LED: $5,000-50,000 MXN
- Proyectores HD/4K: $2,000-15,000 MXN
- Barras y estaciones: $2,500-8,000 MXN
- Pistas de baile: $3,000-15,000 MXN

#### TIER 3 — Blue Ocean
- Mapping y proyección inmersiva: $20,000-200,000 MXN
- Tecnología eventos híbridos: $10,000-80,000 MXN
- Photobooth 360°: $8,000-25,000 MXN
- Mobiliario de diseño exclusivo: $5,000-30,000 MXN

---

## FASE 2 — ANÁLISIS BLUE OCEAN

### Factores a ELIMINAR
- Obligar a llamar para conocer precios
- Catálogos en PDF descargables
- Proceso de cotización de 24-48 horas

### Factores a CREAR
- Cotizador inteligente online
- Calculadora de necesidades
- Sistema de disponibilidad en vivo
- Blog de autoridad del sector
- Programa de partners (wedding planners)

### Posicionamiento Único
**EVENTECH.MX = La empresa de renta de equipo para eventos más tecnológica y transparente de México**

---

## FASE 3 — ARQUITECTURA SEO

### Keywords por Tier

#### TIER 1 — Head Terms
| Keyword | Volumen Est./mes |
|---------|------------------|
| renta de mobiliario para eventos | 4,400 |
| renta de sillas y mesas | 3,600 |
| renta de equipo audiovisual | 2,400 |
| renta de carpas para eventos | 1,900 |
| renta de pantallas LED | 1,300 |

#### TIER 2 — Commercial Intent
| Keyword | Volumen Est./mes |
|---------|------------------|
| renta de sillas tiffany CDMX | 720 |
| renta de salas lounge para eventos | 590 |
| cuánto cuesta rentar una carpa | 480 |
| renta de mobiliario para bodas precio | 390 |

#### TIER 3 — Long Tail
- renta de sillas para boda en jardín
- equipo de sonido para fiesta de XV años
- renta de pantalla LED para boda
- renta de carpa para primera comunión

### Clusters de Topical Authority

1. **Mobiliario para Eventos** (Pillar: /servicios/mobiliario/)
2. **Equipamiento Audiovisual** (Pillar: /servicios/audiovisual/)
3. **Eventos por Tipo** (Pillar: /eventos/)
4. **Carpas y Estructuras** (Pillar: /servicios/carpas/)
5. **Cobertura Geográfica** (Pillar: /zonas/)

---

## FASE 4 — ARQUITECTURA DEL SITIO

### Sitemap Estratégico

```
EVENTECH.MX/
├── HOME /
├── SERVICIOS/
│   ├── Mobiliario/
│   │   ├── Sillas/ (Tiffany, Crossback, Plegables, Ghost)
│   │   ├── Mesas/ (Redondas, Rectangulares, Cocktail)
│   │   ├── Salas Lounge/ (Moderno, Vintage, Boho)
│   │   ├── Mantelería/
│   │   └── Decorativo/
│   ├── Audiovisual/
│   │   ├── Pantallas/ (LED, LCD, Videowall)
│   │   ├── Proyectores/
│   │   ├── Sonido/
│   │   ├── Iluminación/
│   │   └── Tecnología/
│   ├── Carpas/
│   ├── Pistas de Baile/
│   ├── Barras/
│   └── Accesorios/
├── EVENTOS/
│   ├── Bodas/ (Jardín, Salón, Playa, Íntima)
│   ├── XV Años/
│   ├── Corporativos/ (Congresos, Conferencias, Lanzamientos)
│   ├── Fiestas Infantiles/
│   ├── Graduaciones/
│   └── Exposiciones/
├── ZONAS/
│   ├── CDMX/ (Polanco, Coyoacán, Santa Fe, etc.)
│   └── Estado de México/ (Naucalpan, Metepec, etc.)
├── PAQUETES/
├── GALERÍA/
├── BLOG/
├── RECURSOS/ (Calculadora, Checklist)
├── COTIZAR/
├── CONTACTO/
└── FAQ/
```

---

## FASE 5 — ARQUITECTURA TÉCNICA ASTRO

### Estructura de Carpetas

```
eventech-mx/
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   ├── servicios/
│   │   ├── eventos/
│   │   ├── zonas/
│   │   ├── blog/
│   │   ├── testimonios/
│   │   └── paquetes/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── servicios/[...slug].astro
│   │   ├── eventos/[slug].astro
│   │   ├── zonas/[...slug].astro
│   │   └── blog/[...slug].astro
│   ├── components/
│   │   ├── seo/
│   │   ├── ui/
│   │   └── content/
│   ├── layouts/
│   └── data/
└── public/
```

---

## FASE 6 — ROADMAP 36 MESES

### Fases de Desarrollo

| Fase | Meses | Páginas | Tráfico Meta |
|------|-------|---------|--------------|
| 0 - Fundación | 1-2 | 25-30 | 500/mes |
| 1 - Crecimiento | 3-6 | 80-100 | 3,000/mes |
| 2 - Autoridad | 7-12 | 150-180 | 15,000/mes |
| 3 - Liderazgo | 13-24 | 300-350 | 50,000/mes |
| 4 - Dominancia | 25-36 | 500+ | 100,000/mes |

### KPIs de Dominancia

| Fase | Keywords Top 3 | Keywords Top 10 | Domain Rating |
|------|----------------|-----------------|---------------|
| Fase 0 | 0 | 5 | 5-10 |
| Fase 1 | 5 | 30 | 15-20 |
| Fase 2 | 25 | 100 | 25-35 |
| Fase 3 | 75 | 300 | 40-50 |
| Fase 4 | 150 | 500 | 50-60 |

---

## PRÓXIMOS PASOS

### Fase 0 — Fundación (Semanas 1-8)

1. **Semana 1-2:** Setup técnico, estructura de carpetas, CI/CD
2. **Semana 3-4:** HOME + 5 páginas de servicio principales
3. **Semana 5-6:** 3 páginas de eventos + zonas CDMX hub
4. **Semana 7-8:** Cotizar, Contacto, FAQ, Google Business Profile

---

*Documento generado: Febrero 2026*
*Versión: 1.0*
