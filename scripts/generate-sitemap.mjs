import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT_URL = "https://sorteador.click";
const BLOG_PAGE_SIZE = 10;

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const BLOG_DATA_PATH = join(__dirname, "../src/data/blog-posts.ts");
const OUTPUT_PATH = join(__dirname, "../public/sitemap.xml");

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

async function generate() {
  const posts = await extractPosts();
  const blogPages = Math.ceil(posts.length / BLOG_PAGE_SIZE);

  const entries = [
    ...STATIC_URLS.map(url => buildUrlEntry({ ...url })),
    buildUrlEntry({ ...BLOG_INDEX_URL }),
  ];

  for (let page = 1; page <= blogPages; page += 1) {
    entries.push(
      buildUrlEntry({
        loc: `/blog/pagina/${page}`,
        changefreq: "daily",
        priority: page === 1 ? "0.8" : "0.7",
      }),
    );
  }

  entries.push(
    ...posts.map((post) => {
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
    }),
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
