import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SupplyFlow from "@/components/SupplyFlow";
import CTABanner from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow, SectionHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "About",
  description:
    "Zestora Hospitality Solution is a Bangalore-based distribution company supplying high-quality FMCG and foodservice products to restaurants, cloud kitchens, food retailers, and HoReCa businesses.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    k: "Dependable",
    v: "Supply you can plan around — consistent timing, consistent quality.",
  },
  { k: "Curated", v: "A focused portfolio chosen for real kitchen requirements." },
  { k: "End-to-end", v: "Inventory, sales, fulfilment and market support, managed." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Zestora"
        title="A distribution partner built for hospitality."
        intro="Zestora Hospitality Solution is a Bengaluru-based distribution company serving restaurant chains, cloud kitchens, food retailers, and other hospitality businesses."
        media={{
          src: "/images/kitchen.webp",
          alt: "A clean professional restaurant kitchen prepared for service with organised stations and warm light.",
        }}
      />

      {/* STORY */}
      <section className="py-22 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <Eyebrow>Who we are</Eyebrow>
              <h2 className="display-3 mt-5 max-w-md text-balance font-display text-ink">
                Making supply simpler, faster, and more dependable.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5 text-pretty text-lg leading-relaxed text-muted">
                <p>
                  We focus on supplying high-quality FMCG and foodservice products that help
                  kitchens improve efficiency, consistency, and service quality.
                </p>
                <p>
                  As an authorized distribution partner for select brands, we manage end-to-end
                  operations including inventory, sales, fulfilment, and market support.
                </p>
                <p>
                  Our role is to make supply simpler, faster, and more dependable for businesses
                  that operate every day at high pace.
                </p>
                <div className="grid gap-4 pt-4 sm:grid-cols-3">
                  {principles.map((p) => (
                    <div key={p.k} className="rounded-2xl border border-line bg-ivory p-5">
                      <p className="font-display text-xl text-olive">{p.k}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* MISSION / VISION */}
      <section className="bg-ivory/70 py-22 sm:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="card-3d flex h-full flex-col rounded-[1.75rem] border border-line bg-cream p-9 shadow-[var(--shadow-card)] sm:p-11">
                <Eyebrow>Mission</Eyebrow>
                <p className="mt-6 text-pretty font-display text-2xl leading-snug text-ink sm:text-[1.7rem]">
                  To support foodservice businesses with dependable distribution, quality
                  products, and service that improves kitchen performance.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-3d relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-olive/20 bg-olive p-9 text-cream shadow-[var(--shadow-lift)] sm:p-11">
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full opacity-30 blur-2xl"
                  style={{ background: "radial-gradient(circle, rgba(185,148,90,0.8), transparent 70%)" }}
                />
                <Eyebrow tone="cream">Vision</Eyebrow>
                <p className="relative mt-6 text-pretty font-display text-2xl leading-snug sm:text-[1.7rem]">
                  To become the preferred supply partner for hospitality businesses across
                  Bengaluru and beyond.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="py-22 sm:py-28">
        <Container>
          <SectionHeader
            eyebrow="How we operate"
            title="A clear path from source to service."
            intro="Every order moves through the same dependable sequence — so quality and timing stay predictable."
            align="center"
          />
          <div className="mt-16">
            <SupplyFlow />
          </div>
        </Container>
      </section>

      {/* IMAGE BAND */}
      <section className="pb-22 sm:pb-28">
        <Container>
          <Reveal>
            <div className="grain relative overflow-hidden rounded-[2rem] border border-brass/20 shadow-[var(--shadow-lift)]">
              <div className="relative aspect-[16/7]">
                <Image
                  src="/images/cloud-kitchen.webp"
                  alt="A modern cloud kitchen back-of-house with organised supply shelves and clean stainless counters."
                  fill
                  sizes="(max-width: 1280px) 92vw, 1200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-olive-deep/40 to-transparent" />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTABanner
        title="Let's build something dependable together."
        body="Whether you run one outlet or many, we're ready to be the supply side you don't have to think about."
      />
    </>
  );
}
