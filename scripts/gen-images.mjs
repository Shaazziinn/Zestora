import fs from "node:fs";
import path from "node:path";

const KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3-pro-image";
const OUT = path.resolve("public/images");
fs.mkdirSync(OUT, { recursive: true });

const PALETTE =
  "Cohesive warm palette: ivory/cream backgrounds, deep olive green, muted brass-gold accents, charcoal depth. " +
  "Soft warm studio lighting, gentle long shadows, shallow depth of field. " +
  "No text, no logos, no readable labels, no brand names, no people, no faces. " +
  "Premium editorial foodservice photography, realistic materials, calm luxury, ultra clean.";

const JOBS = [
  ["hero", "16:9", "Hero composition for a luxury hospitality supply & distribution brand. Elegant unbranded FMCG and professional kitchen supply items arranged on a warm cream linen surface: sealed foodservice cartons, frosted glass condiment jars, matte beverage cans, kraft ingredient pouches, fresh herb sprigs of rosemary and basil, a smooth wooden spoon, brushed stainless tools, a subtle delivery box. Generous negative space on the right for headline text."],
  ["kitchen", "16:9", "A clean professional restaurant kitchen preparing for service. Spotless stainless steel counters, neatly organized fresh ingredients in mise-en-place stations, copper and steel pans, faint steam. Calm high-end hospitality atmosphere, warm natural window light. No mess, no clutter."],
  ["distribution", "16:9", "Neatly arranged foodservice cartons, sealed FMCG packs, glass jars and kitchen essentials staged in a clean modern fulfilment area on light wood shelving, a few dispatch-ready boxes. Elegant B2B hospitality supply-chain mood."],
  ["cat-packaged", "4:3", "Premium packaged foodservice ingredients on a cream stone surface: sealed kraft pouches, neat cartons, grains, a scatter of fresh herbs. Refined hospitality supply still life."],
  ["cat-beverages", "4:3", "Beverage still life: premium unbranded matte cans, glass bottles and a couple of serving glasses on a warm cream background, soft reflections and condensation droplets."],
  ["cat-condiments", "4:3", "Condiment still life: frosted glass jars of sauces, small seasoning bowls, fresh herbs, a wooden ladle and ceramic dishes in a refined editorial foodservice scene on cream stone."],
  ["cat-essentials", "4:3", "Kitchen essentials still life: brushed stainless utensils, stacked prep containers, neat kraft paper packaging, folded linen towels and organized back-of-house service items on a cream surface."],
  ["cloud-kitchen", "16:9", "Modern cloud kitchen back-of-house: organized supply shelves with neatly stacked sealed ingredient packs, dispatch cartons, clean stainless counters. Efficient, tidy, a sense of readiness."],
  ["inventory", "16:9", "B2B fulfilment scene: organized inventory of unbranded cartons on tidy shelving, sealed foodservice packs, dispatch-ready boxes neatly stacked. Clean warehouse-meets-hospitality aesthetic."],
  ["contact-bg", "16:9", "Minimal abstract background: warm cream paper texture with subtle hand-drawn olive-green route lines forming an abstract city delivery network, muted brass-gold dots marking nodes, soft grain, lots of negative space. Calm and elegant."],
];

async function gen([name, aspect, scene]) {
  const body = {
    contents: [{ parts: [{ text: `${scene} ${PALETTE} Aspect ratio ${aspect}.` }] }],
    generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: aspect } },
  };
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const j = await res.json();
  if (!res.ok) throw new Error(`${name}: ${res.status} ${JSON.stringify(j.error || j).slice(0, 300)}`);
  const part = j.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
  if (!part) throw new Error(`${name}: no image in response ${JSON.stringify(j).slice(0, 300)}`);
  const file = path.join(OUT, `${name}.png`);
  fs.writeFileSync(file, Buffer.from(part.inlineData.data, "base64"));
  console.log(`OK  ${name}  ${(fs.statSync(file).size / 1024).toFixed(0)}KB`);
}

// limited concurrency
const queue = [...JOBS];
const WORKERS = 3;
const fails = [];
await Promise.all(
  Array.from({ length: WORKERS }, async () => {
    while (queue.length) {
      const job = queue.shift();
      try { await gen(job); } catch (e) { console.error("FAIL", e.message); fails.push(job[0]); }
    }
  })
);
console.log(fails.length ? `\nDONE with failures: ${fails.join(", ")}` : "\nALL DONE");
