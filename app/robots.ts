import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { allow: "/" },
    sitemap: "https://nilov-catering.vercel.app/sitemap.xml",
  };
}
