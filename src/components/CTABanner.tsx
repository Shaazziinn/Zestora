import Button from "./ui/Button";
import { Reveal } from "./Reveal";
import { Container, Eyebrow } from "./ui/primitives";

export default function CTABanner({
  eyebrow = "Partner with Zestora",
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-olive py-20 text-cream sm:py-28">
      <div className="grain pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute -left-20 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(185,148,90,0.7), transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -right-16 -bottom-24 h-[360px] w-[360px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(79,114,234,0.5), transparent 70%)" }}
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow tone="cream">{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-2 mt-6 text-balance text-cream">{title}</h2>
          </Reveal>
          {body && (
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-cream/70">
                {body}
              </p>
            </Reveal>
          )}
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" size="lg" variant="light" withArrow>
                Partner With Zestora
              </Button>
              <Button
                href="/contact"
                size="lg"
                className="border border-cream/30 text-cream hover:bg-cream hover:text-olive"
                variant="ghost"
              >
                Contact Us
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
