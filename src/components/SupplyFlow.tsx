"use client";

import { motion, useReducedMotion } from "motion/react";
import { supplyChain } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const icons: Record<string, React.ReactNode> = {
  Sourcing: (
    <path d="M12 21c5-1 8-5 8-10V5l-4 1C9 7 5 11 5 16c3 .4 5-.4 7-2.5" />
  ),
  Inventory: (
    <>
      <path d="M4 8l8-4 8 4-8 4-8-4Z" />
      <path d="M4 8v8l8 4 8-4V8" />
      <path d="M12 12v8" />
    </>
  ),
  Fulfilment: (
    <>
      <path d="M3 7h11v8H3z" />
      <path d="M14 10h4l3 3v2h-7" />
      <circle cx="7" cy="17" r="1.6" />
      <circle cx="17" cy="17" r="1.6" />
    </>
  ),
  Kitchen: (
    <>
      <path d="M5 12h11a3 3 0 0 1 0 6H8a3 3 0 0 1-3-3v-3Z" />
      <path d="M16 14h4" />
      <path d="M8 12V7M11 12V7" />
    </>
  ),
};

export default function SupplyFlow({ tone = "default" }: { tone?: "default" | "cream" }) {
  const reduce = useReducedMotion();
  const cream = tone === "cream";
  const lineCol = cream ? "rgba(216,185,136,0.4)" : "rgba(185,148,90,0.45)";
  const textCol = cream ? "text-cream" : "text-ink";
  const noteCol = cream ? "text-cream/60" : "text-muted";

  return (
    <div className="relative">
      {/* connecting line (horizontal on md+) */}
      <div
        className="absolute left-0 right-0 top-9 hidden md:block"
        style={{ height: 2 }}
        aria-hidden
      >
        <svg width="100%" height="2" preserveAspectRatio="none">
          <motion.line
            x1="6%"
            y1="1"
            x2="94%"
            y2="1"
            stroke={lineCol}
            strokeWidth="2"
            strokeDasharray="2 6"
            strokeLinecap="round"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASE }}
          />
        </svg>
      </div>

      <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
        {supplyChain.map((node, i) => (
          <motion.li
            key={node.step}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.14 }}
            className="relative flex flex-col items-center text-center md:items-start md:text-left"
          >
            <div
              className={`relative flex h-[72px] w-[72px] items-center justify-center rounded-2xl border ${
                cream ? "border-cream/20 bg-olive-soft" : "border-line bg-ivory"
              } shadow-[var(--shadow-card)]`}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke={cream ? "#d8b988" : "#243d2f"}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {icons[node.title]}
              </svg>
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brass text-[0.65rem] font-bold text-olive-deep">
                {node.step}
              </span>
            </div>
            <h3 className={`mt-5 font-display text-2xl ${textCol}`}>{node.title}</h3>
            <p className={`mt-1.5 text-sm ${noteCol}`}>{node.note}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
