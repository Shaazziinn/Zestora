import type { Metadata } from "next";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { Container, SectionHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Product distribution, inventory management, sales coordination, fulfilment and portfolio management for foodservice businesses across Bangalore.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    title: "Product distribution",
    line: "Reliable delivery across key Bengaluru zones, built around your service windows.",
    icon: (
      <>
        <path d="M3 7h11v8H3z" />
        <path d="M14 10h4l3 3v2h-7" />
        <circle cx="7" cy="17" r="1.6" />
        <circle cx="17" cy="17" r="1.6" />
      </>
    ),
  },
  {
    title: "Inventory management",
    line: "Stock movement handled with care, so the right products are where they need to be.",
    icon: (
      <>
        <path d="M4 8l8-4 8 4-8 4-8-4Z" />
        <path d="M4 8v8l8 4 8-4V8" />
        <path d="M12 12v8" />
      </>
    ),
  },
  {
    title: "Sales coordination",
    line: "Order support that keeps communication clear and reordering effortless.",
    icon: (
      <>
        <path d="M4 5h16v11H8l-4 3V5Z" />
        <path d="M8 9h8M8 12h5" />
      </>
    ),
  },
  {
    title: "Fulfilment & dispatch",
    line: "Coordinated dispatch management that keeps deliveries steady and accountable.",
    icon: (
      <>
        <path d="M3 6h12v9H3z" />
        <path d="M15 9h3l3 3v3h-6" />
        <circle cx="7" cy="18" r="1.7" />
        <circle cx="17" cy="18" r="1.7" />
      </>
    ),
  },
  {
    title: "Brand & portfolio management",
    line: "Considered management of select product lines, from positioning to availability.",
    icon: (
      <>
        <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 16.5 7.1 18.2 8 12.7 4 8.8 9.5 8 12 3Z" />
      </>
    ),
  },
  {
    title: "Zonal sub-distributor support",
    line: "A network model that extends dependable reach further across the city.",
    icon: (
      <>
        <circle cx="12" cy="10" r="3" />
        <path d="M12 21c5-4 7-7 7-11a7 7 0 1 0-14 0c0 4 2 7 7 11Z" />
      </>
    ),
  },
];

const process = [
  { n: "01", t: "Product Sourcing", d: "Curating quality-checked supply from trusted lines." },
  { n: "02", t: "Stock Planning", d: "Aligning inventory to real, repeating demand." },
  { n: "03", t: "Order Coordination", d: "Clear order support and responsive communication." },
  { n: "04", t: "Dispatch & Fulfilment", d: "Coordinated, accountable delivery to your door." },
  { n: "05", t: "Kitchen Readiness", d: "Stocked, consistent and ready for the next service." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="More than supply. Built for execution."
        intro="Zestora supports the foodservice supply chain with practical, day-to-day distribution services — designed to help partners reduce friction, manage stock better, and maintain continuity across operations."
      />

      {/* SERVICE GRID */}
      <section className="py-22 sm:py-28">
        <Container>
          <SectionHeader
            eyebrow="What we handle"
            title="Six ways we keep your supply side steady."
            className="mb-14"
          />
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
            {services.map((s) => (
              <StaggerItem key={s.title}>
                <div className="card-3d group flex h-full flex-col rounded-[1.5rem] border border-line bg-ivory p-7 shadow-[var(--shadow-card)] transition-colors hover:border-brass/50">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-cream text-olive transition-colors duration-300 group-hover:border-brass group-hover:bg-olive group-hover:text-cream">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-ink">{s.title}</h3>
                  <p className="mt-2.5 text-pretty leading-relaxed text-muted">{s.line}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* PROCESS FLOW */}
      <section className="relative overflow-hidden bg-olive-deep py-22 text-cream sm:py-28">
        <div className="grain pointer-events-none absolute inset-0" />
        <div
          className="pointer-events-none absolute -left-10 bottom-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(79,114,234,0.6), transparent 70%)" }}
        />
        <Container className="relative">
          <SectionHeader
            eyebrow="The supply chain, mapped"
            title="From sourcing to a kitchen ready for service."
            intro="A connected flow that turns procurement into continuity — five steps, one dependable rhythm."
            tone="cream"
          />

          <div className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] border border-cream/12 bg-cream/10 md:grid-cols-5">
            {process.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.1}>
                <div className="group relative flex h-full flex-col bg-olive-deep p-7 transition-colors duration-300 hover:bg-olive-soft">
                  <span className="font-display text-4xl text-brass">{p.n}</span>
                  <span
                    className="absolute right-5 top-7 hidden text-cream/25 md:block"
                    aria-hidden
                  >
                    {i < process.length - 1 && (
                      <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <h3 className="mt-5 font-display text-xl text-cream">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SERVICE VALUE */}
      <section className="py-22 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal>
              <h2 className="display-2 text-balance text-ink">
                A more dependable way to source what you use every day.
              </h2>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                That means fewer supply gaps, better operational control, and stronger confidence
                in menu delivery — so your team can stay focused on the food.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grain relative overflow-hidden rounded-[1.75rem] border border-brass/20 shadow-[var(--shadow-lift)]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/distribution.webp"
                    alt="Sealed FMCG packs and kitchen essentials organised in a clean fulfilment area."
                    fill
                    sizes="(max-width: 1024px) 92vw, 480px"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Let's map your supply, step by step."
        body="Share how your kitchen runs and we'll show you where Zestora fits."
      />
    </>
  );
}
