import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Zestora Hospitality Solution for product enquiries, distribution partnerships, or supply support for restaurants, cloud kitchens and retailers in Bangalore.",
  alternates: { canonical: "/contact" },
};

const details = [
  {
    label: "Website",
    value: site.domain,
    href: site.url,
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
      </>
    ),
  },
  {
    label: "Email",
    value: site.email,
    href: site.emailHref,
    icon: (
      <>
        <path d="M3 6h18v12H3z" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
  {
    label: "Phone",
    value: site.phone,
    href: site.phoneHref,
    icon: (
      <path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build a stronger supply chain for your kitchen."
        intro="For product enquiries, distribution partnerships, or supply support, reach Zestora Hospitality Solution — we'll get back to you with a clear next step."
      />

      <section className="relative overflow-hidden pb-22 sm:pb-28">
        {/* service-area background */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-[0.5]">
          <Image
            src="/images/contact-bg.webp"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
          />
        </div>

        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
            {/* contact info */}
            <div className="flex flex-col gap-6">
              <Reveal>
                <div className="rounded-[1.75rem] border border-line bg-olive p-8 text-cream shadow-[var(--shadow-lift)] sm:p-9">
                  <Eyebrow tone="cream">Reach us directly</Eyebrow>
                  <p className="mt-5 text-pretty font-display text-2xl leading-snug">
                    A dependable supply partner is one message away.
                  </p>
                  <div className="mt-8 flex flex-col gap-5">
                    {details.map((d) => (
                      <a
                        key={d.label}
                        href={d.href}
                        className="group flex items-center gap-4"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cream/20 text-brass-soft transition-colors group-hover:border-brass group-hover:bg-brass/10">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                            {d.icon}
                          </svg>
                        </span>
                        <span className="leading-tight">
                          <span className="block text-xs uppercase tracking-[0.18em] text-cream/50">
                            {d.label}
                          </span>
                          <span className="text-cream transition-colors group-hover:text-brass-soft">
                            {d.value}
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-[1.75rem] border border-line bg-ivory p-8 sm:p-9">
                  <Eyebrow>Service area</Eyebrow>
                  <p className="mt-4 text-pretty leading-relaxed text-muted">
                    Based in {site.location}, Zestora supports HoReCa businesses across the
                    city&apos;s foodservice zones — from single outlets to multi-location and
                    zonal operations.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Central", "North", "South", "East", "West", "Zonal reach"].map((z) => (
                      <span
                        key={z}
                        className="rounded-full border border-line bg-cream px-3.5 py-1.5 text-sm text-bronze"
                      >
                        {z}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* form */}
            <Reveal delay={0.08}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
