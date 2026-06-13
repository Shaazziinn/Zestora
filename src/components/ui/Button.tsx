import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "outline" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-8 py-4 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-olive text-cream shadow-[0_10px_30px_-12px_rgba(36,61,47,0.7)] hover:bg-olive-soft hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_rgba(36,61,47,0.65)]",
  outline:
    "border border-line text-ink hover:border-olive hover:bg-olive hover:text-cream hover:-translate-y-0.5",
  ghost: "text-ink hover:text-olive",
  light:
    "bg-cream text-olive hover:bg-ivory hover:-translate-y-0.5 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.5)]",
};

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      aria-hidden
    >
      <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Props = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  href?: string;
  className?: string;
} & Omit<ComponentProps<"button">, "ref"> &
  Partial<Pick<ComponentProps<typeof Link>, "href">>;

export default function Button({
  variant = "primary",
  size = "md",
  withArrow = false,
  href,
  className = "",
  children,
  ...rest
}: Props) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {withArrow && <Arrow />}
    </>
  );
  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");
    if (external) {
      return (
        <a href={href} className={cls}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}
