import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";
import BrochureDownload from "@/components/BrochureDownload";
import { Reveal } from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { Container, Eyebrow, SectionHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Zestora's full foodservice portfolio — packaged food, beverages, condiments and kitchen essentials. Download our complete product brochure for restaurants, cloud kitchens and food retailers in Bangalore.",
  alternates: { canonical: "/products" },
};

const categoryLabels = [
  "Packaged Food",
  "Beverages",
  "Condiments",
  "Kitchen Essentials",
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Portfolio"
        title="Products that support real kitchens."
        intro="Zestora's portfolio is curated for the daily requirements of restaurants, cloud kitchens, and food retailers — products that support flavour, consistency, convenience, and kitchen efficiency."
      />

      {/* BROCHURE CTA */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <div className="grain relative overflow-hidden rounded-[2rem] border border-brass/20 bg-cream px-6 py-14 text-center shadow-[var(--shadow-lift)] sm:px-12 sm:py-20">
              <div
                className="pointer-events-none absolute -right-16 -top-24 h-[320px] w-[320px] rounded-full opacity-25 blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(185,148,90,0.45), transparent 70%)" }}
              />
              <div className="relative mx-auto max-w-2xl">
                <Eyebrow tone="brass" className="justify-center">
                  Full Range
                </Eyebrow>
                <h2 className="display-2 mt-6 text-balance font-display text-ink">
                  Get Our Full Product Brochure
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                  Our complete range is detailed in one brochure — everything Zestora supplies to
                  professional kitchens, in a single document.
                </p>

                {/* Category labels — what's inside the brochure */}
                <div className="mt-8 flex flex-wrap justify-center gap-2.5">
                  {categoryLabels.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-line bg-ivory px-4 py-1.5 text-sm text-bronze"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex justify-center">
                  <BrochureDownload />
                </div>
                <p className="mt-4 text-sm text-muted/80">
                  Enter your mobile number and email to download the brochure.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* VALUE LINE */}
      <section className="bg-ivory/70 py-22 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow tone="brass" className="justify-center">
                Built for execution
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-6 text-balance font-display text-2xl leading-snug text-ink sm:text-3xl">
                From marinades and seasoning systems to other kitchen essentials, Zestora helps
                businesses build menus that are easier to execute and more consistent to serve.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* NOTE STRIP */}
      <section className="py-22 sm:py-28">
        <Container>
          <SectionHeader
            eyebrow="A note on our range"
            title="Curated, not crowded."
            intro="We focus on products that earn their place in a working kitchen. Specific brands and SKUs are shared directly with partners based on requirement and availability."
            align="center"
          />
        </Container>
      </section>

      <CTABanner
        title="Tell us what your menu runs on."
        body="Share your category needs and we'll put together a supply plan that fits your kitchen."
      />
    </>
  );
}
