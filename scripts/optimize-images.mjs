import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const DIR = path.resolve("public/images");
// wide hero/scene images vs 4:3 category tiles
const WIDE = new Set(["hero", "kitchen", "distribution", "cloud-kitchen", "inventory", "contact-bg"]);

const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".png"));
let saved = 0;
for (const f of files) {
  const name = f.replace(/\.png$/, "");
  const src = path.join(DIR, f);
  const out = path.join(DIR, `${name}.webp`);
  const width = WIDE.has(name) ? 1920 : 1280;
  const before = fs.statSync(src).size;
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(out);
  const after = fs.statSync(out).size;
  saved += before - after;
  fs.unlinkSync(src);
  console.log(`${name.padEnd(16)} ${(before / 1e6).toFixed(1)}MB -> ${(after / 1e3).toFixed(0)}KB webp`);
}
console.log(`\nfreed ~${(saved / 1e6).toFixed(1)}MB`);
