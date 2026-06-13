"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const BROCHURE_PATH = "/zestora-brochure.pdf";
const BROCHURE_FILENAME = "Zestora-Product-Brochure.pdf";

const fieldBase =
  "w-full rounded-xl border border-line bg-ivory px-4 py-3.5 text-ink placeholder:text-muted/55 transition-colors duration-200 focus:border-brass focus:bg-cream focus:outline-none";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function isValidMobile(v: string) {
  // Accept +, spaces, dashes, parentheses; require at least 7 digits.
  return (v.match(/\d/g) ?? []).length >= 7;
}

function triggerDownload() {
  const a = document.createElement("a");
  a.href = BROCHURE_PATH;
  a.download = BROCHURE_FILENAME;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function BrochureDownload() {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Close on Escape and lock body scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  function reset() {
    setMobile("");
    setEmail("");
    setError("");
    setDone(false);
  }

  function close() {
    setOpen(false);
    // Let the exit animation play before clearing state.
    window.setTimeout(reset, 250);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidMobile(mobile)) {
      setError("Please enter a valid mobile number.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    // Record the lead (best-effort). The download is never blocked on this.
    try {
      await fetch("/api/brochure-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: mobile.trim(), email: email.trim() }),
      });
    } catch {
      /* ignore — still allow the download */
    }

    triggerDownload();
    setDone(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-olive px-8 py-4 text-base font-medium text-cream shadow-[0_14px_34px_-14px_rgba(36,61,47,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-olive-soft"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
        </svg>
        Download Our Full Product Brochure
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="brochure-title"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="grain relative z-10 w-full max-w-md overflow-hidden rounded-[1.75rem] border border-line bg-cream p-6 shadow-[var(--shadow-lift)] sm:p-8"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-ivory hover:text-ink"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center py-4 text-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-olive text-cream">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <h3 id="brochure-title" className="mt-5 font-display text-2xl text-ink">
                      Your brochure is downloading.
                    </h3>
                    <p className="mt-3 text-pretty leading-relaxed text-muted">
                      If it didn&apos;t start automatically, use the link below.
                    </p>
                    <a
                      href={BROCHURE_PATH}
                      download={BROCHURE_FILENAME}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-6 py-2.5 text-sm text-ink transition-colors hover:border-olive hover:bg-olive hover:text-cream"
                    >
                      Download the brochure
                    </a>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="eyebrow text-bronze">Brochure</p>
                    <h3 id="brochure-title" className="mt-3 font-display text-2xl text-ink sm:text-3xl">
                      Get Our Full Product Brochure
                    </h3>
                    <p className="mt-2 text-pretty leading-relaxed text-muted">
                      Enter your mobile number and email to download the brochure.
                    </p>

                    <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-4">
                      <div>
                        <label htmlFor="brochure-mobile" className="mb-2 block text-sm font-medium text-ink">
                          Mobile number
                        </label>
                        <input
                          id="brochure-mobile"
                          ref={firstFieldRef}
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          className={fieldBase}
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="+91 00000 00000"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="brochure-email" className="mb-2 block text-sm font-medium text-ink">
                          Email address
                        </label>
                        <input
                          id="brochure-email"
                          type="email"
                          autoComplete="email"
                          className={fieldBase}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@business.com"
                          required
                        />
                      </div>

                      {error && (
                        <p className="text-sm text-cobalt" role="alert">
                          {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-olive px-8 py-4 text-base font-medium text-cream shadow-[0_14px_34px_-14px_rgba(36,61,47,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-olive-soft"
                      >
                        Download Our Full Brochure
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden>
                          <path d="M8 3v7m0 0 3-3m-3 3L5 7M3 13h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <p className="text-center text-xs leading-relaxed text-muted/80">
                        We&apos;ll only use your details to share the brochure and relevant supply updates.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
