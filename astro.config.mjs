import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";

// ─── Sitemap lastmod dinámico ──────────────────────────────────────────────
// Resuelve URL → archivo fuente → fecha real (git log → mtime → omitir).
// Mejor omitir lastmod que mentir con la fecha del build.
const ROOT = dirname(fileURLToPath(import.meta.url));
const _dateCache = new Map();

function sourceDate(relPath) {
  if (_dateCache.has(relPath)) return _dateCache.get(relPath);
  let date = null;
  const abs = join(ROOT, relPath);
  if (existsSync(abs)) {
    try {
      const out = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      if (out) date = new Date(out);
    } catch {}
    if (!date) {
      try {
        date = statSync(abs).mtime;
      } catch {}
    }
  }
  _dateCache.set(relPath, date);
  return date;
}

function lastmodForUrl(url) {
  const path = new URL(url).pathname.replace(/\/+$/, "");
  const rel = path === "" ? "index" : path.replace(/^\//, "");
  const last = rel.split("/").pop();
  const candidates = [
    `src/pages/${rel}/index.astro`,
    `src/pages/${rel}.astro`,
    `src/pages/${rel}/index.md`,
  ];
  // Content collections: probar ruta completa bajo la colección y el slug final
  for (const col of ["blog", "servicios", "eventos", "venues", "zonas", "pages"]) {
    const sub = rel.startsWith(`${col}/`) ? rel.slice(col.length + 1) : rel;
    for (const ext of ["md", "mdx"]) {
      candidates.push(`src/content/${col}/${sub}.${ext}`);
      candidates.push(`src/content/${col}/${sub}/index.${ext}`);
      candidates.push(`src/content/${col}/${last}.${ext}`);
    }
  }
  // Directorio de venues: /directorio/<ciudad>/<zona>/<venue>/
  if (rel.startsWith("directorio/")) {
    const sub = rel.slice("directorio/".length);
    for (const ext of ["md", "mdx"]) {
      candidates.push(`src/content/venues/${sub}.${ext}`);
      candidates.push(`src/content/venues/${sub}/index.${ext}`);
    }
  }
  for (const c of candidates) {
    const d = sourceDate(c);
    if (d) return d;
  }
  return null;
}

// ─── ExactDN CDN ───────────────────────────────────────────────────────────
const CDN_BASE = "https://ehzpd66uywy.exactdn.com";

/**
 * Astro integration: al final del build reescribe TODAS las referencias a
 * imágenes del sitio para que apunten al CDN de ExactDN. Cubre:
 *
 *  · Rutas relativas en atributos HTML  →  src="/images/", href="/images/",
 *                                           content="/images/", etc.
 *  · URLs absolutas del origen          →  https://eventech.mx/images/
 *    (og:image, twitter:image, JSON-LD logo/image, RSS <enclosure>, etc.)
 *  · url() en CSS inline y hojas de estilo externas
 *
 * Aplica sobre HTML, XML y CSS generados; en desarrollo las imágenes se
 * sirven localmente sin cambios.
 */
function exactdnRewriter() {
  const ORIGIN = "https://eventech.mx";

  return {
    name: "exactdn-rewriter",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const distDir = dir.pathname;
        let filesUpdated = 0;
        let replacements = 0;

        async function processDir(dirPath) {
          const entries = await readdir(dirPath, { withFileTypes: true });
          await Promise.all(
            entries.map(async (entry) => {
              const fullPath = join(dirPath, entry.name);
              if (entry.isDirectory()) {
                await processDir(fullPath);
                return;
              }
              if (!/\.(html|xml|css)$/.test(entry.name)) return;

              const content = await readFile(fullPath, "utf-8");

              // ── 1. Rutas relativas en atributos (doble comilla) ──────────
              // Cubre: src="", href="", content="", action=""...
              let updated = content.replaceAll(
                '="/images/',
                `="${CDN_BASE}/images/`
              );

              // ── 2. Rutas relativas en atributos (comilla simple) ─────────
              updated = updated.replaceAll(
                "='/images/",
                `='${CDN_BASE}/images/`
              );

              // ── 3. url() en CSS (sin comillas o con cualquier comilla) ───
              updated = updated
                .replaceAll('url("/images/', `url("${CDN_BASE}/images/`)
                .replaceAll("url('/images/", `url('${CDN_BASE}/images/`)
                .replaceAll("url(/images/", `url(${CDN_BASE}/images/`);

              // ── 4. URLs absolutas del origen (og:image, JSON-LD, RSS…) ───
              // Reemplaza https://eventech.mx/images/ → CDN en CUALQUIER contexto:
              // atributos HTML, valores JSON, texto XML, contenido CSS.
              updated = updated.replaceAll(
                `${ORIGIN}/images/`,
                `${CDN_BASE}/images/`
              );

              if (updated !== content) {
                // Contar reemplazos para diagnóstico
                const diff =
                  (updated.match(new RegExp(CDN_BASE, "g")) || []).length -
                  (content.match(new RegExp(CDN_BASE, "g")) || []).length;
                replacements += diff;
                filesUpdated++;
                await writeFile(fullPath, updated, "utf-8");
              }
            })
          );
        }

        await processDir(distDir);
        logger.info(
          `exactdn: ${filesUpdated} archivos · ${replacements} referencias → ${CDN_BASE}`
        );
      },
    },
  };
}

export default defineConfig({
  // ─── Site URL ───
  site: "https://eventech.mx",

  // ─── Output Mode ───
  output: "static",

  // ─── Trailing Slash (avoids duplicate URLs) ───
  trailingSlash: "always",

  // ─── Integrations ───
  integrations: [
    mdx(),
    exactdnRewriter(),
    sitemap({
      filter: (page) => !page.includes("/draft/") && !page.includes("/admin/"),
      changefreq: "weekly",
      priority: 0.7,
      serialize: (item) => {
        // Custom priorities by page type
        if (item.url === "https://eventech.mx/") {
          item.priority = 1.0;
          item.changefreq = "daily";
        } else if (item.url === "https://eventech.mx/servicios/") {
          item.priority = 0.9;
          item.changefreq = "weekly";
        } else if (item.url.includes("/servicios/") && item.url.split("/").filter(Boolean).length <= 3) {
          // L2: /servicios/mobiliario/
          item.priority = 0.8;
          item.changefreq = "weekly";
        } else if (item.url.includes("/servicios/") && item.url.split("/").filter(Boolean).length <= 4) {
          // L3: /servicios/iluminacion/decorativa/
          item.priority = 0.7;
          item.changefreq = "weekly";
        } else if (item.url.includes("/servicios/")) {
          // L4/L5: deeper pages
          item.priority = 0.6;
          item.changefreq = "weekly";
        } else if (item.url.includes("/eventos/")) {
          item.priority = 0.8;
          item.changefreq = "weekly";
        } else if (item.url.includes("/zonas/")) {
          item.priority = 0.7;
          item.changefreq = "monthly";
        } else if (item.url.includes("/cotizar/")) {
          item.priority = 0.8;
          item.changefreq = "weekly";
        } else if (item.url.includes("/directorio/")) {
          item.priority = 0.7;
          item.changefreq = "monthly";
        } else if (item.url.includes("/blog/")) {
          item.priority = 0.6;
          item.changefreq = "monthly";
        }
        // lastmod real por archivo fuente; si no se resuelve, se omite
        const lm = lastmodForUrl(item.url);
        if (lm) {
          item.lastmod = lm.toISOString();
        } else {
          delete item.lastmod;
        }
        return item;
      },
    }),
  ],

  // ─── Markdown Configuration ───
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },

  // ─── Image Optimization ───
  image: {
    domains: ["eventech.mx", "ehzpd66uywy.exactdn.com"],
    remotePatterns: [{ protocol: "https" }],
  },

  // ─── Build Configuration ───
  build: {
    inlineStylesheets: "auto",
  },

  // ─── Vite (cache en /tmp para evitar EPERM en sandbox) ───
  // Alias: fuente única = tsconfig.json "paths" (Astro los aplica solo).
  // El bloque vite.resolve.alias duplicado se eliminó en la auditoría F5.
  vite: {
    cacheDir: process.env.VITE_CACHE_DIR || "/tmp/vite-eventech",
  },

  // ─── Dev Server ───
  server: {
    port: 4321,
  },

  // ─── Prefetch (performance) ───
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },

  // ─── Redirects ───
  // Los 301 de reubicación/limpieza viven en public/_redirects (Cloudflare, 301 real).
  // Aquí solo el alias de sitemap para crawlers.
  redirects: {
    // ZeroRank / crawlers que buscan /sitemap.xml en lugar de /sitemap-index.xml
    "/sitemap.xml": "/sitemap-index.xml",
  },
});
