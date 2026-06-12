# Astro Pro Template

Plantilla profesional para sitios web de producción con Astro, Markdown/MDX, SEO avanzado y rendimiento optimizado.

## Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir http://localhost:4321
```

## Estructura del proyecto

```
astro-pro-template/
├── public/                     # Archivos estáticos (no procesados)
│   ├── robots.txt              # Directivas para rastreadores
│   ├── site.webmanifest        # PWA manifest
│   ├── favicon.svg             # Favicon vectorial
│   ├── fonts/                  # Fuentes locales (.woff2)
│   └── images/                 # Imágenes estáticas
│
├── src/
│   ├── components/             # Componentes reutilizables
│   │   ├── Header.astro        # Header con navegación y menú móvil
│   │   ├── Footer.astro        # Footer con columnas de navegación
│   │   ├── Nav.astro           # Navegación principal (data-driven)
│   │   ├── SEOHead.astro       # Meta tags: OG, Twitter, canonical
│   │   ├── JsonLd.astro        # Datos estructurados schema.org
│   │   ├── Hero.astro          # Sección hero configurable
│   │   ├── CTA.astro           # Call-to-action reutilizable
│   │   └── BlogCard.astro      # Tarjeta de preview para posts
│   │
│   ├── layouts/                # Plantillas de página
│   │   ├── BaseLayout.astro    # HTML root: <head>, global CSS, JSON-LD
│   │   ├── PageLayout.astro    # Header + main + Footer
│   │   └── BlogLayout.astro    # Layout para artículos individuales
│   │
│   ├── pages/                  # Rutas del sitio (file-based routing)
│   │   ├── index.astro         # Página de inicio
│   │   ├── 404.astro           # Página de error personalizada
│   │   ├── rss.xml.ts          # Feed RSS automático
│   │   ├── [...slug].astro     # Páginas dinámicas (nosotros, servicios)
│   │   └── blog/
│   │       ├── index.astro     # Listado de blog
│   │       └── [...slug].astro # Posts individuales
│   │
│   ├── content/                # Content Collections (Markdown/MDX)
│   │   ├── config.ts           # Schemas con validación Zod
│   │   ├── blog/               # Artículos del blog
│   │   └── pages/              # Páginas estáticas
│   │
│   ├── styles/                 # Estilos globales
│   │   ├── tokens.css          # Design tokens (colores, espaciado, etc.)
│   │   ├── typography.css      # Tipografía base y clase .prose
│   │   └── global.css          # Reset, layout primitives, utilities
│   │
│   ├── data/                   # Configuración centralizada
│   │   ├── site.ts             # SEO defaults, contacto, organización
│   │   └── navigation.ts       # Menús de header y footer
│   │
│   └── utils/                  # Funciones helper
│       ├── seo.ts              # canonicalURL, JSON-LD generators
│       └── helpers.ts          # formatDate, readingTime, slugify
│
├── astro.config.mjs            # Config de Astro + integraciones
├── tsconfig.json               # TypeScript con path aliases
├── package.json                # Scripts y dependencias
├── .env.example                # Variables de entorno de ejemplo
├── .prettierrc                 # Config de Prettier + plugin Astro
├── eslint.config.mjs           # ESLint flat config
└── .gitignore
```

## Cómo personalizar

### 1. Configuración del sitio

Edita `src/data/site.ts` con la información de tu negocio: nombre, URL, contacto, redes sociales y datos de la organización para JSON-LD.

### 2. Navegación

Modifica `src/data/navigation.ts` para agregar o quitar enlaces del header y footer.

### 3. Colores y tipografía

Cambia los design tokens en `src/styles/tokens.css`. Todas las variables CSS se propagan automáticamente.

### 4. Crear contenido

Agrega archivos `.md` o `.mdx` en `src/content/blog/` o `src/content/pages/`. El frontmatter se valida automáticamente contra los schemas definidos en `src/content/config.ts`.

### 5. Agregar páginas

Las páginas estáticas se crean en `src/content/pages/` y se renderizan automáticamente vía la ruta dinámica `src/pages/[...slug].astro`.

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (localhost:4321) |
| `npm run build` | Build de producción a `dist/` |
| `npm run preview` | Preview del build local |
| `npm run check` | Verificación de tipos de Astro |
| `npm run lint` | Lint con ESLint |
| `npm run format` | Formateo con Prettier |
| `npm run lighthouse` | Auditoría Lighthouse local |

## Características SEO incluidas

- Meta tags Open Graph y Twitter Cards en cada página
- JSON-LD automático: Organization, WebSite, Article, BreadcrumbList
- Sitemap XML generado automáticamente
- Feed RSS para el blog
- Canonical URLs
- robots.txt con bloqueo de bots de IA
- Estructura de encabezados semántica (h1 > h2 > h3)

## Rendimiento

- Zero JS por defecto (Island Architecture)
- CSS scoped por componente
- Prefetch inteligente en hover
- Imágenes optimizadas via astro:assets
- Fluid typography con clamp()

## Accesibilidad

- Skip link "Saltar al contenido"
- Landmarks semánticos (header, main, footer, nav)
- aria-label en enlaces y botones interactivos
- Focus visible personalizado
- Contraste de colores WCAG AA
- Navegación por teclado

## Cómo extender

- **Añadir Tailwind**: `npx astro add tailwind` y reemplaza los estilos CSS
- **Añadir un CMS**: Integra con Contentful, Sanity o Strapi vía Content Collections Loader
- **Añadir i18n**: Usa `@astrojs/i18n` o estructura manual de carpetas por idioma
- **Añadir analytics**: Configura en `.env` e importa el script en BaseLayout
- **Añadir formularios**: Integra Formspree, Netlify Forms, o un endpoint propio
