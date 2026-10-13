import { queryCollection } from "@nuxt/content/server";

const SITE = "https://autobutler.org";
// Keep in sync with the non-blog pages under pages/.
const PAGES = [
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
] as const;

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, "content").select("path").all();
  const blogPaths = posts
    .map((post) => post.path)
    .filter((path) => path.startsWith("/blogs/"));
  const urls = [...PAGES, ...blogPaths]
    .map((path) => `  <url><loc>${SITE}${path}</loc></url>`)
    .join("\n");
  setHeader(event, "content-type", "application/xml");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
});
