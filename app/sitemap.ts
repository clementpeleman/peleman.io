import type { MetadataRoute } from "next";
import { vakken } from "@/lib/vakken";

const site = "https://peleman.io";
const bijgewerkt = new Date("2026-10-13");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site}/`, lastModified: bijgewerkt, changeFrequency: "monthly", priority: 1 },
    ...vakken.map((v) => ({ url: `${site}${v.pad}`, lastModified: v.pad === "/maatwerk" ? bijgewerkt : new Date("2026-10-14"), changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: `${site}/cases`, lastModified: bijgewerkt, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site}/aanvraag`, lastModified: bijgewerkt, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site}/voorwaarden`, lastModified: bijgewerkt, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site}/privacy`, lastModified: bijgewerkt, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site}/cookies`, lastModified: bijgewerkt, changeFrequency: "yearly", priority: 0.2 },
  ];
}
