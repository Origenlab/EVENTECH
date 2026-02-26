import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // ─── Site URL ───
  site: "https://eventech.mx",

  // ─── Integrations ───
  integrations: [
    mdx(),
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
        } else if (item.url.includes("/servicios/")) {
          item.priority = 0.9;
          item.changefreq = "weekly";
        } else if (item.url.includes("/eventos/")) {
          item.priority = 0.8;
          item.changefreq = "weekly";
        } else if (item.url.includes("/zonas/")) {
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
    domains: ["eventech.mx"],
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
