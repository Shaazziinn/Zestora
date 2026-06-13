import Link from "next/link";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-olive-deep text-cream/80">
      <div className="grain pointer-events-none absolute inset-0" />
      {/* warm glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(185,148,90,0.5), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        {/* top — statement */}
        <div className="grid gap-12 border-b border-cream/12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
          <div className="max-w-sm">
            <Logo variant="mono" className="text-cream" />
            <p className="mt-6 text-pretty text-[0.97rem] leading-relaxed text-cream/65">
              A Bengaluru-based distribution partner for restaurants, cloud kitchens, food
              retailers, and HoReCa businesses — built to keep great kitchens moving.
            </p>
            <a
              href={site.emailHref}
              className="mt-6 inline-block font-display text-2xl text-cream link-sweep"
            >
              {site.email}
            </a>
          </div>

          <div>
            <h3 className="eyebrow text-brass-soft">Explore</h3>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/70 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-brass-soft">Get in touch</h3>
            <ul className="mt-5 space-y-3 text-cream/70">
              <li>
                <a href={site.phoneHref} className="transition-colors hover:text-cream">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="transition-colors hover:text-cream">
                  {site.email}
                </a>
              </li>
              <li className="pt-1 leading-relaxed">
                {site.location}
                <br />
                Serving HoReCa across Bengaluru
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-cream/25 px-5 py-2.5 text-sm text-cream transition-colors hover:border-brass hover:bg-brass/10"
            >
              Partner With Zestora
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col gap-4 py-7 text-xs text-cream/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="max-w-xl text-cream/40">
            Hospitality distribution · FMCG distributor Bangalore · Foodservice procurement &
            cloud kitchen supply.
          </p>
        </div>
      </div>
    </footer>
  );
}
