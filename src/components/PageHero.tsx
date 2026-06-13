import Image from "next/image";
import { Reveal } from "./Reveal";
import { Container, Eyebrow } from "./ui/primitives";

export default function PageHero({
  eyebrow,
  title,
  intro,
  media,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  media?: { src: string; alt: string };
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <section className="wash-warm relative overflow-hidden pt-[var(--hero-top)] [--hero-top:120px] lg:[--hero-top:160px]">
      {/* decorative floating accents */}
      <div
        className="pointer-events-none absolute right-[-6rem] top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(185,148,90,0.4), transparent 70%)" }}
      />
      <Container className="relative">
        <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display-1 mt-6 text-balance text-ink">{title}</h1>
          </Reveal>
          {intro && (
            <Reveal delay={0.12}>
              <p
                className={`mt-7 text-pretty text-xl leading-relaxed text-muted ${
                  centered ? "mx-auto max-w-2xl" : "max-w-2xl"
                }`}
              >
                {intro}
              </p>
            </Reveal>
          )}
        </div>
      </Container>

      {media ? (
        <Container className="relative mt-14 lg:mt-20">
          <Reveal delay={0.1}>
            <div className="grain relative overflow-hidden rounded-[2rem] border border-brass/20 shadow-[var(--shadow-lift)]">
              <div className="relative aspect-[16/9]">
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  priority
                  sizes="(max-width: 1280px) 92vw, 1200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-olive-deep/25 to-transparent" />
              </div>
            </div>
          </Reveal>
        </Container>
      ) : (
        <div className="h-16 lg:h-24" />
      )}
    </section>
  );
}
