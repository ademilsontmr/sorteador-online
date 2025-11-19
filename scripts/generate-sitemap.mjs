import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT_URL = "https://allwheel.click";
const BLOG_PAGE_SIZE = 10;

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const BLOG_DATA_PATH = join(__dirname, "../src/data/blog-posts.ts");
const OUTPUT_PATH = join(__dirname, "../public/sitemap.xml");

const STATIC_URLS = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/spin-wheel", changefreq: "monthly", priority: "0.9" },
  { loc: "/number-generator", changefreq: "monthly", priority: "0.9" },
  { loc: "/name-picker", changefreq: "monthly", priority: "0.9" },
  { loc: "/tools", changefreq: "monthly", priority: "0.8" },
  { loc: "/privacy", changefreq: "yearly", priority: "0.3" },
  { loc: "/terms", changefreq: "yearly", priority: "0.3" },
];

const BLOG_INDEX_URL = { loc: "/blog", changefreq: "daily", priority: "0.8" };

const today = new Date().toISOString().split("T")[0];

async function extractSlugs() {
  const file = await readFile(BLOG_DATA_PATH, "utf8");
  const slugRegex = /slug:\s*"([^"]+)"/g;
  const slugs = [];
  let match;
  while ((match = slugRegex.exec(file)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

function buildUrlEntry({ loc, changefreq, priority }) {
  return `  <url>
    <loc>${ROOT_URL}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function generate() {
  const slugs = await extractSlugs();
  const blogPages = Math.ceil(slugs.length / BLOG_PAGE_SIZE);

  const entries = [
    ...STATIC_URLS.map(buildUrlEntry),
    buildUrlEntry(BLOG_INDEX_URL),
  ];

  for (let page = 1; page <= blogPages; page += 1) {
    entries.push(
      buildUrlEntry({
        loc: `/blog/page/${page}`,
        changefreq: "daily",
        priority: page === 1 ? "0.8" : "0.7",
      }),
    );
  }

  entries.push(
    ...slugs.map((slug) =>
      buildUrlEntry({
        loc: `/blog/${slug}`,
        changefreq: "monthly",
        priority: "0.7",
      }),
    ),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

  await writeFile(OUTPUT_PATH, xml);
  console.log(`[sitemap] Generated ${entries.length} url entries.`);
}

generate().catch((error) => {
  console.error("[sitemap] Generation failed:", error);
  process.exit(1);
});

