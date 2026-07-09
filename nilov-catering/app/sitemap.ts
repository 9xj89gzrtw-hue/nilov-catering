import { MetadataRoute } from "next";

const BASE_URL = "https://nilov-catering.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "", "/about", "/services", "/services/weddings", "/services/corporate",
    "/services/private", "/menu", "/gallery", "/testimonials", "/contact",
    "/quote", "/faq", "/pricing", "/blog", "/team", "/privacy", "/terms",
  ];
  return pages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
