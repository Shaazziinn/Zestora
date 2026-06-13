import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import HeroSupply from "@/components/HeroSupply";
import SupplyFlow from "@/components/SupplyFlow";
import TiltCard from "@/components/TiltCard";
import CTABanner from "@/components/CTABanner";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Container, Eyebrow, SectionHeader } from "@/components/ui/primitives";
import { categories } from "@/lib/site";

const audience = [
  "Restaurant Chains",
  "Cloud Kitchens",
  "QSRs",
  "Caterers",
  "Food Retailers",
  "HoReCa Operators",
  "FMCG Brands",
];

const whatWeDo = [
  {
    title: "FMCG distribution across Bangalore",
    body: "Dependable distribution of FMCG and foodservice products to kitchens and retailers across the city.",
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
    title: "Inventory, sales & fulfilment support",
    body: "Hands-on coordination of stock movement, order support and dispatch so nothing stalls.",
    icon: (
      <>
        <path d="M4 8l8-4 8 4-8 4-8-4Z" />
        <path d="M4 8v8l8 4 8-4V8" />
        <path d="M12 12v8" />
      </>
    ),
  },
  {
    title: "Curated product supply",
    body: "A focused range built for restaurants, cloud kitchens and retailers — quality balanced with value.",
    icon: (
      <>
        <path d="M6 3h12l-1 6H7L6 3Z" />
        <path d="M5 9h14v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9Z" />
        <path d="M10 14h4" />
      </>
    ),
  },
  {
    title: "Built around daily requirements",
    body: "Service designed around the real, repeating rhythm of a working kitchen — not a catalogue.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
];

const whyZestora = [
  {
    title: "Better procurement support",
    body: "Procurement that works the way professional kitchens do — responsive, organised and reliable.",
  },
  {
    title: "Less waste, controlled cost",
    body: "Curated products that help reduce waste and keep long-term costs predictable.",
  },
  {
    title: "Consistent quality",
    body: "Reliable product quality that translates into steadier menu performance, service after service.",
  },
  {
    title: "Reliable local reach",
    body: "Dependable delivery and genuine local reach across Bengaluru's foodservice zones.",
  },
];

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-[120px] lg:pt-[150px]">
        <div className="wash-warm pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="grid items-center gap-14 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-24">
            <div>
              <Reveal>
                <Eyebrow>Bengaluru Foodservice Distribution</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="display-1 mt-6 text-balance text-ink">
                  Built to keep great kitchens moving.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-xl text-pretty text-xl leading-relaxed text-muted">
                  From sourcing to fulfilment, Zestora helps foodservice businesses run smoother
                  with premium FMCG and kitchen essentials curated for value, consistency, and
                  cost efficiency.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted/90">
                  A Bengaluru-based distribution partner for restaurants, cloud kitchens, food
                  retailers, and HoReCa businesses that need reliable supply, smarter
                  procurement, and consistent quality every day.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <Button href="/products" size="lg" withArrow>
                    Explore Our Products
                  </Button>
                  <Button href="/contact" size="lg" variant="outline">
                    Partner With Zestora
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="lg:pl-6">
              <HeroSupply />
            </div>
          </div>
        </Container>
      </section>

      {/* ================= AUDIENCE STRIP ================= */}
      <section className="border-y border-line/70 bg-ivory/60">
        <Container className="py-7">
          <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between">
            <p className="eyebrow shrink-0 text-bronze">Trusted across</p>
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 md:justify-end">
              {audience.map((a) => (
                <span
                  key={a}
                  className="text-sm font-medium tracking-tight text-muted transition-colors hover:text-olive"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ================= INTRO STATEMENT ================= */}
      <section className="py-22 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <Reveal>
              <h2 className="display-2 text-balance text-ink">
                Zestora is built for kitchens that cannot afford delays, inconsistency, or
                waste.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col justify-center">
                <div className="hairline mb-7 w-16" />
                <p className="text-pretty text-lg leading-relaxed text-muted">
                  We curate products that balance quality and cost, helping food businesses
                  improve menu performance while keeping procurement efficient and controlled.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ================= WHAT WE DO ================= */}
      <section className="relative bg-ivory/70 py-22 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader
                eyebrow="What We Do"
                title="Distribution, dialled in for daily service."
                intro="A practical, end-to-end role in your supply chain — so your team can focus on the pass, not the procurement."
              />
              <Reveal delay={0.15}>
                <div className="grain relative mt-10 overflow-hidden rounded-[1.75rem] border border-brass/20 shadow-[var(--shadow-lift)]">
                  <div className="relative aspect-[16/11]">
                    <Image
                      src="/images/distribution.webp"
                      alt="Neatly arranged foodservice cartons, sealed packs and jars staged in a clean fulfilment area."
                      fill
                      sizes="(max-width: 1024px) 92vw, 560px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            </div>

            <Stagger className="flex flex-col divide-y divide-line/60">
              {whatWeDo.map((item, i) => (
                <StaggerItem key={item.title}>
                  <div className="group flex items-start gap-6 py-9 transition-[padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] first:pt-0 last:pb-0 lg:group-hover:pl-1">
                    <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-cream text-olive transition-colors duration-300 group-hover:border-brass group-hover:bg-olive group-hover:text-cream">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                        {item.icon}
                      </svg>
                    </span>
                    <div className="pt-0.5">
                      <div className="flex items-baseline gap-3">
                        <span className="eyebrow text-bronze/70">0{i + 1}</span>
                        <h3 className="font-display text-2xl leading-tight text-ink">{item.title}</h3>
                      </div>
                      <p className="mt-3 text-pretty leading-relaxed text-muted">{item.body}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* ================= WHY ZESTORA ================= */}
      <section className="py-22 sm:py-28">
        <Container>
          <SectionHeader
            eyebrow="Why Zestora"
            title="A supply partner that earns its place in your kitchen."
            align="center"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyZestora.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <TiltCard className="h-full">
                  <div className="card-3d flex h-full flex-col rounded-[1.5rem] border border-line bg-ivory p-7 shadow-[var(--shadow-card)]">
                    <span className="font-display text-5xl text-brass/45">0{i + 1}</span>
                    <h3 className="mt-5 font-display text-2xl text-ink">{card.title}</h3>
                    <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-muted">
                      {card.body}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= FEATURED CATEGORIES ================= */}
      <section className="relative overflow-hidden bg-ivory/70 py-22 sm:py-28">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="Curated Categories"
              title="What we move, every day."
              className="md:max-w-xl"
            />
            <Reveal delay={0.1}>
              <Link
                href="/products"
                className="link-sweep hidden items-center gap-2 pb-2 text-sm font-medium text-olive md:inline-flex"
              >
                View all products
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <Reveal key={cat.slug} delay={i * 0.08}>
                <TiltCard className="h-full" intensity={6}>
                  <Link
                    href="/products"
                    className="card-3d block h-full overflow-hidden rounded-[1.5rem] border border-line bg-cream shadow-[var(--shadow-card)]"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 280px"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-olive-deep/65 via-olive-deep/5 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <h3 className="font-display text-2xl text-cream">{cat.name}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-cream/75">
                          {cat.short}
                        </p>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= OPERATIONAL PROMISE + FLOW ================= */}
      <section className="relative overflow-hidden bg-olive-deep py-22 text-cream sm:py-28">
        <div className="grain pointer-events-none absolute inset-0" />
        <div
          className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(185,148,90,0.6), transparent 70%)" }}
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <SectionHeader
              eyebrow="Operational Promise"
              title="Reliable supply for kitchens that move fast."
              intro="From daily-use products to coordinated fulfilment, Zestora helps businesses keep operations steady, stocked, and ready for service."
              tone="cream"
            />
            <Reveal delay={0.1}>
              <div className="grain relative overflow-hidden rounded-[1.75rem] border border-cream/15 shadow-[var(--shadow-lift)]">
                <div className="relative aspect-[16/11]">
                  <Image
                    src="/images/inventory.webp"
                    alt="Organised inventory of sealed foodservice packs and dispatch-ready boxes on tidy shelving."
                    fill
                    sizes="(max-width: 1024px) 92vw, 560px"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 border-t border-cream/12 pt-14 lg:mt-20">
            <Reveal>
              <p className="eyebrow mb-10 text-brass-soft">
                Sourcing → Inventory → Fulfilment → Kitchen
              </p>
            </Reveal>
            <SupplyFlow tone="cream" />
          </div>
        </Container>
      </section>

      {/* ================= CTA ================= */}
      <CTABanner
        eyebrow="Let's get started"
        title="Ready to simplify your kitchen supply?"
        body="Tell us what your kitchen runs on. We'll help you source it with less friction and more consistency."
      />
    </>
  );
}
