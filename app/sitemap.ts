import { MetadataRoute } from "next";

const BASE_URL = "https://odaeda.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "", "/about", "/services", "/menu", "/gallery", "/testimonials",
    "/contact", "/faq", "/pricing", "/blog", "/privacy", "/terms",
  ];
  const servicePages = ["/services/weddings", "/services/corporate", "/services/private", "/services/buffets"];
  const blogPages = ["/blog/tendencii-keyteringa-2026", "/blog/kak-vybrat-menyu-dlya-svadby", "/blog/oshibki-pri-organizacii-keyteringa", "/blog/sezonnye-ingredienty-letо-2026", "/blog/korporativnyj-furshet-sekrety-uspeha", "/blog/deserty-na-zakaz-trendy-2026"];
  const all = [...staticPages, ...servicePages, ...blogPages];

  return all.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
    priority: path === "" ? 1 : path.startsWith("/services/") ? 0.8 : 0.7,
  }));
}