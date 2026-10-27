// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/content", "@nuxt/icon"],
  /*
   * Fonts are self-hosted, matching quark.autobutler.org: @fontsource packages
   * are bundled into the build, so no request ever leaves for a font CDN.
   */
  css: [
    "@fontsource-variable/newsreader/opsz.css",
    "@fontsource-variable/newsreader/opsz-italic.css",
    "@fontsource-variable/geist",
    "@fontsource-variable/geist-mono",
    "~/assets/css/main.css",
    "~/assets/css/content.css",
  ],
  nitro: {
    static: true,
    prerender: {
      // Crawl from "/" so every linked page is prerendered, and list each
      // route explicitly so none depends on being linked.
      crawlLinks: true,
      routes: [
        "/",
        "/about",
        "/blogs",
        "/community",
        "/contact",
        "/enterprise",
        "/privacy",
        "/stories",
        "/support",
        "/terms",
        "/waitlist",
        "/sitemap.xml",
      ],
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      meta: [
        {
          name: "description",
          content:
            "AutoButler builds open-source tools for data autonomy, starting with Quark, a private home cloud for your router.",
        },
        { property: "og:site_name", content: "AutoButler" },
        { property: "og:title", content: "AutoButler" },
        { property: "og:type", content: "website" },
        {
          property: "og:image",
          content: "https://autobutler.org/og-image.png",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content: "AutoButler. Data Autonomy For Everyone.",
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image:alt",
          content: "AutoButler. Data Autonomy For Everyone.",
        },
        {
          name: "twitter:image",
          content: "https://autobutler.org/og-image.png",
        },
        {
          name: "theme-color",
          content: "#f7f6f3",
          media: "(prefers-color-scheme: light)",
        },
        {
          name: "theme-color",
          content: "#161615",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "shortcut icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/android-chrome-512x512.png",
        },
      ],
    },
  },
  content: {
    renderer: {
      // Enable anchor links for all headings
      anchorLinks: true,
    },
    build: {
      markdown: {
        // Configure content module for better TOC generation
        highlight: {
          theme: {
            default: "github-light",
            dark: "github-dark",
          },
          preload: [
            "json",
            "js",
            "ts",
            "html",
            "css",
            "vue",
            "bash",
            "yaml",
            "markdown",
          ],
        },
        // Enable comprehensive table of contents
        toc: {
          depth: 5,
          searchDepth: 6,
        },
      },
    },
  },
});
