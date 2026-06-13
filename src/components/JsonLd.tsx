"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

/**
 * Injects Organization/LocalBusiness structured data as a trusted, static
 * <script type="application/ld+json"> node. Content is a fixed constant
 * (no user input), appended on mount and removed on unmount.
 */
const data = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: site.region,
    addressCountry: "IN",
  },
  areaServed: { "@type": "City", name: "Bengaluru" },
  knowsAbout: [
    "Foodservice distribution",
    "FMCG distribution",
    "Cloud kitchen supply",
    "HoReCa procurement",
  ],
};

export default function JsonLd() {
  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.textContent = JSON.stringify(data);
    document.head.appendChild(el);
    return () => {
      document.head.removeChild(el);
    };
  }, []);
  return null;
}
