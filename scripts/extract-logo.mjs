import sharp from "sharp";
import path from "node:path";

const SRC = "/Users/elchai/Downloads/WhatsApp Image 2026-06-05 at 3.48.05 PM.jpeg"; // blue on white
const OUT = path.resolve("public");

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

// 1) Build an alpha mask by keying out the white background.
//    alpha = 255 - min(r,g,b); floor noise, gain for crisp edges. Collect brand blue.
const alpha = new Uint8Array(W * H);
let br = 0, bg = 0, bb = 0, bn = 0;
for (let i = 0; i < W * H; i++) {
  const r = data[i * C], g = data[i * C + 1], b = data[i * C + 2];
  let a = 255 - Math.min(r, g, b);
  if (a < 26) a = 0;
  a = Math.min(255, Math.round(a * 1.25));
  alpha[i] = a;
  if (a > 200) { br += r; bg += g; bb += b; bn++; }
}
const BLUE = { r: Math.round(br / bn), g: Math.round(bg / bn), b: Math.round(bb / bn) };
console.log("brand blue ≈", `rgb(${BLUE.r},${BLUE.g},${BLUE.b})`, "#" + [BLUE.r, BLUE.g, BLUE.b].map((v) => v.toString(16).padStart(2, "0")).join(""));

// 2) Row/col ink profiles to find content bounds + the mark/wordmark split.
const rowInk = new Array(H).fill(0);
for (let y = 0; y < H; y++) {
  let s = 0;
  for (let x = 0; x < W; x++) s += alpha[y * W + x];
  rowInk[y] = s;
}
const maxRow = Math.max(...rowInk);
const rThr = maxRow * 0.02;

// contiguous inked vertical bands
const bands = [];
let start = -1;
for (let y = 0; y < H; y++) {
  const inked = rowInk[y] > rThr;
  if (inked && start < 0) start = y;
  if (!inked && start >= 0) {
    if (y - start > 6) bands.push([start, y - 1]);
    start = -1;
  }
}
if (start >= 0) bands.push([start, H - 1]);
console.log("bands (y-ranges):", bands);

function colBounds(y0, y1) {
  let left = W, right = 0;
  for (let x = 0; x < W; x++) {
    let s = 0;
    for (let y = y0; y <= y1; y++) s += alpha[y * W + x];
    if (s > (y1 - y0 + 1) * 255 * 0.01) {
      if (x < left) left = x;
      if (x > right) right = x;
    }
  }
  return [left, right];
}

const pad = 8;
function cropRegion(y0, y1) {
  const [l, r] = colBounds(y0, y1);
  const x = Math.max(0, l - pad);
  const y = Math.max(0, y0 - pad);
  const w = Math.min(W - x, r - l + 1 + pad * 2);
  const h = Math.min(H - y, y1 - y0 + 1 + pad * 2);
  return { left: x, top: y, width: w, height: h };
}

// mark = first band; wordmark = from second band start to last band end
const mark = cropRegion(bands[0][0], bands[0][1]);
const word = cropRegion(bands[1][0], bands[bands.length - 1][1]);
const full = cropRegion(bands[0][0], bands[bands.length - 1][1]);
console.log("mark", mark, "\nword", word);

// 3) Compose a recolored RGBA buffer (flat color + alpha mask), then extract+save.
function buildPng(color, region, outfile) {
  const buf = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    buf[i * 4] = color.r;
    buf[i * 4 + 1] = color.g;
    buf[i * 4 + 2] = color.b;
    buf[i * 4 + 3] = alpha[i];
  }
  return sharp(buf, { raw: { width: W, height: H, channels: 4 } })
    .extract(region)
    .png()
    .toFile(path.join(OUT, outfile));
}

const WHITE = { r: 255, g: 255, b: 255 };
await Promise.all([
  buildPng(BLUE, mark, "logo-mark.png"),
  buildPng(WHITE, mark, "logo-mark-white.png"),
  buildPng(BLUE, word, "logo-word.png"),
  buildPng(WHITE, word, "logo-word-white.png"),
  buildPng(BLUE, full, "logo-full.png"),
  buildPng(WHITE, full, "logo-full-white.png"),
]);
console.log("\nwrote 6 logo PNGs to public/");
