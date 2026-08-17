/**
 * generate-sitemap.ts
 * Reads blogPosts from src/data/blog.ts and writes a fresh public/sitemap.xml.
 * Run automatically as part of the build via the "prebuild" script.
 *
 * To add a new static route to the sitemap, append an entry to STATIC_ROUTES below.
 */

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { blogPosts } from "../src/data/blog.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://waberagency.com";
const today = new Date().toISOString().slice(0, 10);

// ---------------------------------------------------------------------------
// Static routes
// Add any new marketing or utility page here — one entry per route.
// changefreq: how often the page is likely to change
//   "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
// priority: relative importance 0.0–1.0 (Google treats all values equally, but
//   it's useful documentation of your own hierarchy).
// ---------------------------------------------------------------------------
const STATIC_ROUTES: Array<{
  path: string;
  changefreq: string;
  priority: string;
}> = [
  { path: "/",        changefreq: "weekly",  priority: "1.0" },
  { path: "/blog",    changefreq: "weekly",  priority: "0.9" },
  { path: "/services", changefreq: "monthly", priority: "0.85" },
  { path: "/about",   changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/portfolio", changefreq: "monthly", priority: "0.8" },
];

function urlEntry(
  loc: string,
  lastmod: string,
  changefreq: string,
  priority: string,
): string {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const staticUrls = STATIC_ROUTES.map(({ path, changefreq, priority }) =>
  urlEntry(`${BASE_URL}${path}`, today, changefreq, priority),
);

const blogUrls = blogPosts.map((post) =>
  urlEntry(`${BASE_URL}/blog/${post.slug}`, post.publishedAt, "monthly", "0.85"),
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${staticUrls.join("\n")}

${blogUrls.join("\n")}

</urlset>
`;

const outPath = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(
  `Sitemap generated: ${STATIC_ROUTES.length} static pages + ${blogPosts.length} blog posts → ${outPath}`,
);
