import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

export function Eyebrow({
  children,
  className = "",
  tone = "brass",
}: {
  children: ReactNode;
  className?: string;
  tone?: "brass" | "olive" | "cream";
}) {
  const color =
    tone === "cream" ? "text-brass-soft" : tone === "olive" ? "text-olive" : "text-bronze";
  return (
    <span className={`eyebrow inline-flex items-center gap-2.5 ${color} ${className}`}>
      <span className="h-px w-7 bg-current opacity-50" />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "default",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "cream";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow tone={tone === "cream" ? "cream" : "brass"}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={`display-2 mt-5 text-balance ${
            tone === "cream" ? "text-cream" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p
            className={`mt-5 text-pretty text-lg leading-relaxed ${
              tone === "cream" ? "text-cream/70" : "text-muted"
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
