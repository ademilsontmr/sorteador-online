import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { brotliCompressSync, constants as zlibConstants } from "node:zlib";

const DIST_ASSETS_DIR = fileURLToPath(new URL("../dist/assets/", import.meta.url));

const ELIGIBLE_EXTENSIONS = new Set([".js", ".css"]);

async function pathExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function walkAndCompress(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walkAndCompress(entryPath);
        return;
      }

      if (!ELIGIBLE_EXTENSIONS.has(extname(entry.name))) {
        return;
      }

      const original = await readFile(entryPath);
      const compressed = brotliCompressSync(original, {
        params: {
          [zlibConstants.BROTLI_PARAM_QUALITY]: 11,
        },
      });

      if (compressed.length >= original.length) {
        return;
      }

      await writeFile(entryPath, compressed);
      console.log(
        `[brotli] Compressed ${entryPath} from ${(original.length / 1024).toFixed(
          1,
        )}KB to ${(compressed.length / 1024).toFixed(1)}KB`,
      );
    }),
  );
}

const run = async () => {
  if (!(await pathExists(DIST_ASSETS_DIR))) {
    console.warn("[brotli] dist/assets directory not found. Skipping compression.");
    return;
  }

  await walkAndCompress(DIST_ASSETS_DIR);
};

run().catch((error) => {
  console.error("[brotli] Compression failed:", error);
  process.exitCode = 1;
});

