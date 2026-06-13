"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

function Float({
  children,
  depth,
  px,
  py,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  depth: number;
  px: ReturnType<typeof useMotionValue<number>>;
  py: ReturnType<typeof useMotionValue<number>>;
  className?: string;
  delay?: number;
}) {
  const x = useTransform(px, (v) => v * depth);
  const y = useTransform(py, (v) => v * depth);
  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.9, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={`absolute z-20 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSupply() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 90, damping: 18 });
  const py = useSpring(my, { stiffness: 90, damping: 18 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 26);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 26);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      className="relative"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {/* soft glow behind frame */}
      <div
        className="pointer-events-none absolute -inset-6 -z-0 rounded-[2.5rem] opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 20%, rgba(185,148,90,0.28), transparent 70%), radial-gradient(60% 60% at 80% 90%, rgba(36,61,47,0.18), transparent 70%)",
        }}
      />

      {/* framed hero image */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
        className="grain relative z-10 overflow-hidden rounded-[2rem] border border-brass/25 bg-ivory shadow-[var(--shadow-lift)]"
      >
        <div className="relative aspect-[4/5] sm:aspect-[5/5] lg:aspect-[4/4.4]">
          <Image
            src="/images/hero.webp"
            alt="An editorial arrangement of premium foodservice supplies — sealed cartons, condiment jars, beverage cans, kraft ingredient pouches, fresh herbs and kitchen tools on warm cream linen."
            fill
            priority
            sizes="(max-width: 1024px) 92vw, 560px"
            className="object-cover"
          />
          {/* warm gradient veil for cohesion */}
          <div className="absolute inset-0 bg-gradient-to-t from-olive-deep/15 via-transparent to-transparent" />
        </div>

        {/* corner ticks */}
        <span className="absolute left-4 top-4 h-6 w-6 border-l border-t border-cream/60" />
        <span className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-cream/60" />
      </motion.div>

      {/* floating chips */}
      <Float depth={1} px={px} py={py} delay={0.5} className="-left-3 top-10 sm:-left-7">
        <div className="flex items-center gap-3 rounded-2xl border border-line/80 bg-ivory/95 px-4 py-3 shadow-[var(--shadow-card)] backdrop-blur">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-olive/10 text-olive">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21c5-1 8-5 8-10V5l-4 1C9 7 5 11 5 16c3 .4 5-.4 7-2.5" />
            </svg>
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-ink">Curated supply</p>
            <p className="text-xs text-muted">Quality you can plate</p>
          </div>
        </div>
      </Float>

      <Float depth={1.7} px={px} py={py} delay={0.65} className="-right-3 bottom-16 sm:-right-8">
        <div className="flex items-center gap-3 rounded-2xl border border-line/80 bg-ivory/95 px-4 py-3 shadow-[var(--shadow-card)] backdrop-blur">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cobalt/10 text-cobalt">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-ink">On-time fulfilment</p>
            <p className="text-xs text-muted">Across Bengaluru</p>
          </div>
        </div>
      </Float>

      <Float depth={2.4} px={px} py={py} delay={0.8} className="-right-2 top-6 sm:right-2">
        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border border-brass/40 bg-cream/95 text-center shadow-[var(--shadow-card)]">
          <span className="font-display text-xl leading-none text-olive">B'luru</span>
          <span className="mt-0.5 text-[0.55rem] font-semibold tracking-[0.2em] text-bronze">HoReCa</span>
        </div>
      </Float>
    </div>
  );
}
