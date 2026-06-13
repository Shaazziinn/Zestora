# Zestora Hospitality Solution — Website

Premium, production-ready marketing site for **Zestora Hospitality Solution**, a
Bengaluru-based foodservice & FMCG distribution partner for restaurants, cloud
kitchens, QSRs, caterers, food retailers and HoReCa businesses.

Editorial hospitality aesthetic: warm cream canvas, deep-olive primary,
muted-brass accent, with the brand's cobalt blue used sparingly as a "zest"
highlight and in the logo.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4** (tokens in `src/app/globals.css` `@theme`)
- **Motion** (`motion/react`) for reveals, parallax, micro-interactions
- Pseudo-3D via CSS/SVG (cursor-reactive tilt + float) — no WebGL, reduced-motion safe
- Fonts: **Cormorant Garamond** (display) + **Manrope** (body) via `next/font`
- All imagery is custom-generated editorial visuals, optimized to WebP (58–182 KB)

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes prerender static)
npm start
```

## Pages

`/` Home · `/about` · `/services` · `/products` · `/industries` · `/contact`
Plus generated `sitemap.xml`, `robots.txt`, and an SVG favicon (`src/app/icon.svg`).

## Content & contact

Single source of truth: **`src/lib/site.ts`** (name, email, phone, nav,
categories, supply-chain steps). Update once, it propagates everywhere.

- Email: Hello@zestorahospitality.com
- Phone: 96454 56262
- The contact form composes a prefilled email via `mailto:` and shows a success
  state. To wire a real backend, replace the `onSubmit` handler in
  `src/components/ContactForm.tsx`.

## Logo

Uses the **official logo**, extracted from the supplied artwork into transparent
PNGs (`public/logo-mark*.png`, `public/logo-word*.png`, `public/logo-full*.png`)
via `scripts/extract-logo.mjs`. `src/components/Logo.tsx` composes mark + wordmark;
`variant="mono"` swaps to the white version for dark surfaces. Favicon is
`src/app/icon.png` (mark on cream). To refresh from new artwork, update the source
path in `scripts/extract-logo.mjs` and re-run `node scripts/extract-logo.mjs`.

## Regenerating imagery

Source prompts live in `scripts/gen-images.mjs`. Optimize any new PNGs with:

```bash
node scripts/optimize-images.mjs   # PNG -> WebP, resizes, deletes source PNG
```

## Deploy

Optimized for Vercel (zero config). `next build` produces fully static routes;
images are served through the Next Image Optimizer.
