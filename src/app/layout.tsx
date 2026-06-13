import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Foodservice & FMCG Distribution in Bangalore`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    "hospitality distribution Bangalore",
    "FMCG distributor Bangalore",
    "foodservice products Bangalore",
    "HoReCa supply partner",
    "restaurant supply Bangalore",
    "cloud kitchen supply",
    "kitchen essentials distributor",
    "foodservice procurement support",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Foodservice & FMCG Distribution in Bangalore`,
    description: site.description,
    images: [{ url: "/images/hero.webp", width: 1920, height: 2112, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Foodservice & FMCG Distribution in Bangalore`,
    description: site.description,
    images: ["/images/hero.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f2e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="min-h-screen antialiased">
        <JsonLd />
        <Loader />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-olive focus:px-5 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
