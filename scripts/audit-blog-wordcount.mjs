import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(process.cwd());
const blogPostsPath = path.join(projectRoot, 'src', 'data', 'blog-posts.ts');
const outJsonPath = path.join(projectRoot, 'scripts', 'wordcount-report.json');
const outMdPath = path.join(projectRoot, 'scripts', 'wordcount-report.md');

function countWords(markdown) {
  // Words: unicode letters/numbers sequences
  const matches = markdown.match(/[\p{L}\p{N}]+/gu);
  return matches ? matches.length : 0;
}

function extractPostContent(fileContent, slug) {
  const slugNeedle = `slug: "${slug}"`;
  const slugIndex = fileContent.indexOf(slugNeedle);
  if (slugIndex === -1) return null;

  const contentNeedle = 'content: `';
  const contentStart = fileContent.indexOf(contentNeedle, slugIndex);
  if (contentStart === -1) return null;

  const startPos = contentStart + contentNeedle.length;

  // Find the closing backtick that ends the template literal for content.
  // In this dataset, the next line is typically "    `," (or with different indentation).
  // We'll search for a newline followed by optional spaces then `,
  const closeRegex = /\n\s*`,/g;
  closeRegex.lastIndex = startPos;
  const closeMatch = closeRegex.exec(fileContent);
  if (!closeMatch) return null;

  const endPos = closeMatch.index;
  return fileContent.slice(startPos, endPos);
}

function extractAllSlugs(fileContent) {
  const slugs = [];
  const re = /\bslug:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(fileContent)) !== null) {
    slugs.push(m[1]);
  }
  return slugs;
}

function main() {
  if (!fs.existsSync(blogPostsPath)) {
    console.error(`blog-posts.ts not found: ${blogPostsPath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(blogPostsPath, 'utf8');
  const slugs = extractAllSlugs(fileContent);

  const results = [];
  for (const slug of slugs) {
    const content = extractPostContent(fileContent, slug);
    if (content == null) {
      results.push({ slug, words: null, error: 'content_not_found' });
      continue;
    }

    results.push({ slug, words: countWords(content) });
  }

  const withCounts = results.filter((r) => typeof r.words === 'number');
  const missing = results.filter((r) => r.words == null);
  const below400 = withCounts.filter((r) => r.words < 400).sort((a, b) => a.words - b.words);

  const summary = {
    totalPosts: slugs.length,
    counted: withCounts.length,
    missingContent: missing.length,
    below400: below400.length,
    generatedAt: new Date().toISOString(),
  };

  const report = { summary, below400, missing, all: results };
  fs.writeFileSync(outJsonPath, JSON.stringify(report, null, 2) + '\n');

  const md = [
    '# Wordcount Report',
    '',
    `- **Total posts**: ${summary.totalPosts}`,
    `- **Counted**: ${summary.counted}`,
    `- **Missing content**: ${summary.missingContent}`,
    `- **Below 400 words**: ${summary.below400}`,
    '',
    '## Below 400 words (ascending)',
    '',
    ...below400.map((r) => `- /blog/${r.slug} — **${r.words}** words`),
    '',
  ].join('\n');

  fs.writeFileSync(outMdPath, md);

  console.log('Report written:');
  console.log(`- ${outJsonPath}`);
  console.log(`- ${outMdPath}`);
  console.log(`Below 400: ${summary.below400}`);
  if (summary.missingContent > 0) {
    console.log(`Missing content: ${summary.missingContent}`);
  }
}

main();
