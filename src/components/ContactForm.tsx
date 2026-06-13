"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/site";

const requirements = [
  "Product enquiry",
  "Distribution partnership",
  "Restaurant / cloud kitchen supply",
  "Retail supply",
  "Brand partnership",
  "Other",
];

type Fields = {
  name: string;
  company: string;
  business: string;
  phone: string;
  email: string;
  requirement: string;
  message: string;
};

const empty: Fields = {
  name: "",
  company: "",
  business: "",
  phone: "",
  email: "",
  requirement: requirements[0],
  message: "",
};

const fieldBase =
  "w-full rounded-xl border border-line bg-ivory px-4 py-3.5 text-ink placeholder:text-muted/55 transition-colors duration-200 focus:border-brass focus:bg-cream focus:outline-none";

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-ink">
      {children}
    </label>
  );
}

export default function ContactForm() {
  const [f, setF] = useState<Fields>(empty);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof Fields>(k: K, v: Fields[K]) {
    setF((prev) => ({ ...prev, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.name.trim() || !f.email.trim() || !f.message.trim()) {
      setError("Please add your name, email, and a short message.");
      return;
    }
    setError("");

    const subject = `Enquiry — ${f.requirement}${f.company ? ` · ${f.company}` : ""}`;
    const body = [
      `Name: ${f.name}`,
      `Company: ${f.company || "—"}`,
      `Business type: ${f.business || "—"}`,
      `Phone: ${f.phone || "—"}`,
      `Email: ${f.email}`,
      `Requirement: ${f.requirement}`,
      "",
      "Message:",
      f.message,
    ].join("\n");

    window.location.href = `${site.emailHref}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div className="grain relative overflow-hidden rounded-[1.75rem] border border-line bg-cream p-6 shadow-[var(--shadow-card)] sm:p-9">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-olive text-cream">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h3 className="mt-6 font-display text-3xl text-ink">Thank you.</h3>
            <p className="mt-3 max-w-sm text-pretty leading-relaxed text-muted">
              Your enquiry is ready in your email app. If it didn&apos;t open, write to us
              directly at{" "}
              <a href={site.emailHref} className="link-sweep text-olive">
                {site.email}
              </a>
              .
            </p>
            <button
              onClick={() => {
                setSent(false);
                setF(empty);
              }}
              className="mt-7 rounded-full border border-line px-6 py-2.5 text-sm text-ink transition-colors hover:border-olive hover:bg-olive hover:text-cream"
            >
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            noValidate
            className="grid gap-5 sm:grid-cols-2"
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <input
                id="name"
                className={fieldBase}
                value={f.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your full name"
                autoComplete="name"
                required
              />
            </div>
            <div>
              <Label htmlFor="company">Company name</Label>
              <input
                id="company"
                className={fieldBase}
                value={f.company}
                onChange={(e) => update("company", e.target.value)}
                placeholder="Your business"
                autoComplete="organization"
              />
            </div>
            <div>
              <Label htmlFor="business">Business type</Label>
              <input
                id="business"
                className={fieldBase}
                value={f.business}
                onChange={(e) => update("business", e.target.value)}
                placeholder="Restaurant, cloud kitchen, retailer…"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <input
                id="phone"
                type="tel"
                className={fieldBase}
                value={f.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="Contact number"
                autoComplete="tel"
              />
            </div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <input
                id="email"
                type="email"
                className={fieldBase}
                value={f.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@business.com"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <Label htmlFor="requirement">Requirement type</Label>
              <div className="relative">
                <select
                  id="requirement"
                  className={`${fieldBase} appearance-none pr-10`}
                  value={f.requirement}
                  onChange={(e) => update("requirement", e.target.value)}
                >
                  {requirements.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                rows={5}
                className={`${fieldBase} resize-none`}
                value={f.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Tell us what your kitchen needs…"
                required
              />
            </div>

            {error && (
              <p className="sm:col-span-2 text-sm text-cobalt" role="alert">
                {error}
              </p>
            )}

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-olive px-8 py-4 text-base font-medium text-cream shadow-[0_14px_34px_-14px_rgba(36,61,47,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-olive-soft sm:w-auto"
              >
                Send Enquiry
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
