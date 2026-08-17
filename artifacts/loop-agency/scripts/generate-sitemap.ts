/**
 * generate-sitemap.ts
 * Reads blogPosts from src/data/blog.ts and writes a fresh public/sitemap.xml.
 * Run automatically as part of the build via the "prebuild" script.
 */

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { blogPosts } from "../src/data/blog.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://waberagency.com";
const today = new Date().toISOString().slice(0, 10);

function url(
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

const staticUrls = [
  url(`${BASE_URL}/`, today, "weekly", "1.0"),
  url(`${BASE_URL}/blog`, today, "weekly", "0.9"),
];

const blogUrls = blogPosts.map((post) =>
  url(`${BASE_URL}/blog/${post.slug}`, post.publishedAt, "monthly", "0.85"),
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
  `Sitemap generated: ${blogPosts.length} blog posts → ${outPath}`,
);
