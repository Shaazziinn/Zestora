import Image from "next/image";
import { site } from "@/lib/site";

type LogoProps = {
  /** "brand" = cobalt logo (for light surfaces) · "mono" = white logo (for dark surfaces) */
  variant?: "brand" | "mono";
  /** show the ZESTORA wordmark next to the mark */
  withText?: boolean;
  className?: string;
};

const ASSETS = {
  brand: { mark: "/logo-mark.png", word: "/logo-word.png" },
  mono: { mark: "/logo-mark-white.png", word: "/logo-word-white.png" },
} as const;

// Intrinsic pixel sizes of the extracted official assets (preserve proportions).
const MARK = { w: 170, h: 201 };
const WORD = { w: 815, h: 194 };

export default function Logo({ variant = "brand", withText = true, className = "" }: LogoProps) {
  const a = ASSETS[variant];
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src={a.mark}
        alt={withText ? "" : `${site.name} logo`}
        width={MARK.w}
        height={MARK.h}
        priority
        className="h-9 w-auto"
      />
      {withText && (
        <Image
          src={a.word}
          alt={site.name}
          width={WORD.w}
          height={WORD.h}
          priority
          className="h-[30px] w-auto"
        />
      )}
    </span>
  );
}
