"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "./Logo";
import Button from "./ui/Button";
import { nav, site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        solid
          ? "border-b border-line/70 bg-cream/80 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(36,61,47,0.4)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[var(--h)] max-w-[1280px] items-center justify-between px-5 sm:px-8 [--h:74px] lg:[--h:84px]">
        <Link href="/" aria-label={`${site.name} — home`} className="relative z-10">
          <Logo />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-[0.92rem] transition-colors duration-300 ${
                  active ? "text-olive" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute inset-x-4 -bottom-0.5 h-px bg-brass"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" size="md" withArrow>
            Partner With Zestora
          </Button>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line/80 bg-ivory/60 backdrop-blur lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col items-center gap-[5px]">
            <span
              className={`block h-[1.5px] w-5 bg-ink transition-all duration-300 ${
                open ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-ink transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-ink transition-all duration-300 ${
                open ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-0 flex flex-col bg-cream lg:hidden"
          >
            <div className="grain pointer-events-none absolute inset-0" />
            <div className="relative flex h-full flex-col justify-between px-6 pb-10 pt-28">
              <nav className="flex flex-col">
                {nav.map((item, i) => {
                  const active =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: EASE }}
                      className="border-b border-line/70"
                    >
                      <Link
                        href={item.href}
                        className="flex items-baseline justify-between py-5"
                      >
                        <span
                          className={`font-display text-3xl ${
                            active ? "text-olive" : "text-ink"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="eyebrow text-bronze">
                          0{i + 1}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
                className="flex flex-col gap-5"
              >
                <Button href="/contact" size="lg" withArrow className="w-full">
                  Partner With Zestora
                </Button>
                <div className="flex flex-col gap-1 text-sm text-muted">
                  <a href={site.emailHref} className="link-sweep w-fit">
                    {site.email}
                  </a>
                  <a href={site.phoneHref} className="link-sweep w-fit">
                    {site.phone}
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
