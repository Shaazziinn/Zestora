import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { nav } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map((item) => ({
    url: `${site.url}${item.href === "/" ? "" : item.href}`,
    lastModified: new Date(),
    changeFrequency: item.href === "/" ? "monthly" : "yearly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
