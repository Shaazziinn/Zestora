import type { Metadata } from "next";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import TiltCard from "@/components/TiltCard";
import { Reveal } from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { Container, SectionHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Zestora serves restaurant chains, cloud kitchens, QSRs, caterers and food retailers across Bangalore with dependable foodservice supply and practical support.",
  alternates: { canonical: "/industries" },
};

const segments = [
  {
    name: "Restaurant chains",
    image: "/images/kitchen.webp",
    desc: "Consistent supply across outlets so every kitchen plates the same quality.",
  },
  {
    name: "Cloud kitchens",
    image: "/images/cloud-kitchen.webp",
    desc: "Fast, organised replenishment built for high-volume, delivery-first operations.",
  },
  {
    name: "QSR & food counters",
    image: "/images/distribution.webp",
    desc: "Dependable daily essentials that keep quick-service lines moving.",
  },
  {
    name: "Caterers",
    image: "/images/cat-condiments.webp",
    desc: "Reliable volume and timing for events where there's no room for gaps.",
  },
  {
    name: "Food retailers",
    image: "/images/cat-packaged.webp",
    desc: "A focused range and steady supply for shelves that need to stay stocked.",
  },
];

const scale = [
  {
    t: "Single outlet",
    d: "Personal, responsive supply for an independent kitchen — easy ordering, dependable delivery.",
  },
  {
    t: "Multi-outlet",
    d: "Coordinated supply across locations, keeping quality and timing consistent everywhere.",
  },
  {
    t: "Zonal operations",
    d: "Wider reach through zonal and sub-distributor support, without losing reliability.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Serve"
        title="Built for the pace of foodservice."
        intro="Zestora works with businesses that need dependable supply and practical support across hospitality operations — especially kitchens that rely on consistent quality and fast execution."
      />

      {/* SEGMENTS */}
      <section className="py-22 sm:py-28">
        <Container>
          <SectionHeader
            eyebrow="Segments we support"
            title="Different kitchens, the same dependable supply."
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {segments.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 0.08}>
                <TiltCard className="h-full" intensity={6}>
                  <div className="card-3d group h-full overflow-hidden rounded-[1.5rem] border border-line bg-cream shadow-[var(--shadow-card)]">
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-olive-deep/55 to-transparent" />
                      <h3 className="absolute bottom-4 left-5 font-display text-2xl text-cream">
                        {s.name}
                      </h3>
                    </div>
                    <p className="p-6 text-pretty leading-relaxed text-muted">{s.desc}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SCALE */}
      <section className="relative overflow-hidden bg-olive-deep py-22 text-cream sm:py-28">
        <div className="grain pointer-events-none absolute inset-0" />
        <div
          className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(185,148,90,0.6), transparent 70%)" }}
        />
        <Container className="relative">
          <SectionHeader
            eyebrow="However you operate"
            title="From one outlet to many, organised and reliable."
            intro="Whether the business is serving one outlet or multiple locations, Zestora helps keep the supply side organised and reliable."
            tone="cream"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {scale.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.1}>
                <div className="card-3d flex h-full flex-col rounded-[1.5rem] border border-cream/12 bg-olive-soft/40 p-8 backdrop-blur-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brass/40 font-display text-lg text-brass-soft">
                    {i + 1}
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-cream">{c.t}</h3>
                  <p className="mt-2.5 text-pretty leading-relaxed text-cream/65">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        title="Let's keep your supply side organised."
        body="Tell us about your operation and we'll tailor a supply approach that fits its pace."
      />
    </>
  );
}
