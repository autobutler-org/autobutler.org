// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/content", "@nuxt/icon"],
  css: ["~/assets/css/content.css"],
  nitro: {
    static: true,
  },
  site: {
    url: "https://autobutler.org",
    name: "AutoButler",
  },
  app: {
    head: {
      meta: [
        { name: "description", content: "AutoButler — your personal home data butler. Self-hosted file management, backup, and media serving." },
        { property: "og:site_name", content: "AutoButler" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://autobutler.org/android-chrome-512x512.png" },
        { property: "og:image:width", content: "512" },
        { property: "og:image:height", content: "512" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:image", content: "https://autobutler.org/android-chrome-512x512.png" },
        { name: "theme-color", content: "#20b2aa" },
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
    build: {
      markdown: {
        // Configure content module for better TOC generation
        highlight: {
          theme: {
            default: "catppuccin-mocha",
            dark: "catppuccin-mocha",
            light: "catppuccin-latte",
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
      },
    },
    markdown: {
      // Enable anchor links for headings
      anchorLinks: {
        depth: 6,
        exclude: [],
      },
      // Enable comprehensive table of contents
      toc: {
        depth: 5,
        searchDepth: 6,
      },
      // Generate IDs for all headings
      remarkPlugins: [],
      rehypePlugins: [],
    },
  },
});
