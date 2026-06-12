import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

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
      lastmod: new Date(),
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
  redirects: {
    // Legacy redirects (add as needed)
    // "/old-path": "/new-path",
  },
});
