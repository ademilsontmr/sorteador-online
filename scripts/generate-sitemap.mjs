import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT_URL = "https://sorteador.click";
const BLOG_PAGE_SIZE = 10;

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const BLOG_DATA_PATH = join(__dirname, "../src/data/blog-posts.ts");
const OUTPUT_DIR = join(__dirname, "../public");

const STATIC_URLS = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/roleta", changefreq: "monthly", priority: "0.9" },
  { loc: "/gerador-de-numeros", changefreq: "monthly", priority: "0.9" },
  { loc: "/selecionador-de-nomes", changefreq: "monthly", priority: "0.9" },
  { loc: "/ferramentas", changefreq: "monthly", priority: "0.8" },
  { loc: "/privacidade", changefreq: "yearly", priority: "0.3" },
  { loc: "/termos", changefreq: "yearly", priority: "0.3" },
];

const BLOG_INDEX_URL = { loc: "/blog", changefreq: "daily", priority: "0.8" };

const today = new Date().toISOString().split('T')[0];

async function extractPosts() {
  const file = await readFile(BLOG_DATA_PATH, "utf8");
  // Regex to capture slug and date. Assumes slug comes before date in the object.
  const postRegex = /slug:\s*"([^"]+)"[\s\S]*?date:\s*"([^"]+)"/g;
  const posts = [];
  let match;
  while ((match = postRegex.exec(file)) !== null) {
    posts.push({
      slug: match[1],
      date: match[2]
    });
  }
  return posts;
}

function buildUrlEntry({ loc, changefreq, priority, lastmod }) {
  const date = lastmod || today;
  return `  <url>
    <loc>${ROOT_URL}${loc}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function buildSitemap(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;
}

function buildSitemapIndex(sitemaps) {
  const entries = sitemaps.map(({ loc, lastmod }) => 
    `  <sitemap>
    <loc>${ROOT_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>
`;
}

async function generate() {
  const posts = await extractPosts();
  const blogPages = Math.ceil(posts.length / BLOG_PAGE_SIZE);

  // 1. Generate sitemap-pages.xml (static pages)
  const pagesEntries = [
    ...STATIC_URLS.map(url => buildUrlEntry({ ...url })),
    buildUrlEntry({ ...BLOG_INDEX_URL }),
  ];
  const pagesSitemap = buildSitemap(pagesEntries);
  await writeFile(join(OUTPUT_DIR, "sitemap-pages.xml"), pagesSitemap);
  console.log(`[sitemap] Generated sitemap-pages.xml with ${pagesEntries.length} entries.`);

  // 2. Generate sitemap-blog-pages.xml (blog pagination)
  const blogPagesEntries = [];
  for (let page = 1; page <= blogPages; page += 1) {
    blogPagesEntries.push(
      buildUrlEntry({
        loc: `/blog/pagina/${page}`,
        changefreq: "daily",
        priority: page === 1 ? "0.8" : "0.7",
      })
    );
  }
  const blogPagesSitemap = buildSitemap(blogPagesEntries);
  await writeFile(join(OUTPUT_DIR, "sitemap-blog-pages.xml"), blogPagesSitemap);
  console.log(`[sitemap] Generated sitemap-blog-pages.xml with ${blogPagesEntries.length} entries.`);

  // 3. Generate sitemap-blog-posts.xml (blog posts)
  const blogPostsEntries = posts.map((post) => {
    let postDate = post.date;
    // Check if date is in the future
    if (new Date(postDate) > new Date(today)) {
      postDate = today;
    }

    return buildUrlEntry({
      loc: `/blog/${post.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: postDate
    });
  });
  const blogPostsSitemap = buildSitemap(blogPostsEntries);
  await writeFile(join(OUTPUT_DIR, "sitemap-blog-posts.xml"), blogPostsSitemap);
  console.log(`[sitemap] Generated sitemap-blog-posts.xml with ${blogPostsEntries.length} entries.`);

  // 4. Generate sitemap.xml (sitemap index)
  const sitemapIndex = buildSitemapIndex([
    { loc: "/sitemap-pages.xml", lastmod: today },
    { loc: "/sitemap-blog-pages.xml", lastmod: today },
    { loc: "/sitemap-blog-posts.xml", lastmod: today },
  ]);
  await writeFile(join(OUTPUT_DIR, "sitemap.xml"), sitemapIndex);
  console.log(`[sitemap] Generated sitemap.xml (index) with 3 sitemaps.`);

  const totalEntries = pagesEntries.length + blogPagesEntries.length + blogPostsEntries.length;
  console.log(`[sitemap] Total: ${totalEntries} URL entries across 3 sitemaps.`);
}

generate().catch((error) => {
  console.error("[sitemap] Generation failed:", error);
  process.exit(1);
});

