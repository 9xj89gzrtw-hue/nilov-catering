import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/account/", "/thank-you", "/plan/assistant"],
    },
    sitemap: `https://${SITE.domain}/sitemap.xml`,
  };
}
