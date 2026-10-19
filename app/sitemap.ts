import type { MetadataRoute } from "next";
import { SITE_URL, seo } from "@/lib/seo";

const priority: Record<string, number> = {
  "/": 1,
  "/fotokoutek": 0.9,
  "/ai-fotokoutek": 0.9,
  "/hostesky": 0.9,
  "/partyspin360": 0.9,
  "/ai-draw-bot": 0.9,
  "/cena": 0.8,
  "/kontakt": 0.8,
  "/dalsisluzby": 0.7,
  "/galerie": 0.6,
  "/pozadi": 0.6,
  "/specialni-pozadi": 0.5,
  "/tistena-pozadi-4": 0.5,
  "/ai-filtry": 0.5,
  "/skupinove-ai-filtry": 0.5,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return Object.values(seo).map((p) => ({
    url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
    lastModified: now,
    changeFrequency: p.path === "/galerie" ? "weekly" : "monthly",
    priority: priority[p.path] ?? 0.5,
  }));
}
