import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "preview-chat-ed285eb4-0d20-440e-b873-33e202def24d.space-z.ai",
  ],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: "https", hostname: "z-cdn.chatglm.cn" },
      { protocol: "https", hostname: "mc.yandex.ru" },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@dnd-kit/core", "@dnd-kit/sortable"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  async redirects() {
    return [
      // Unify 4 planning tools → 1 canonical path (/plan/helper)
      // UX critic: "5 competing planning tools, no canonical primary"
      { source: "/plan/calculator", destination: "/plan/helper", permanent: true },
      { source: "/plan/assistant", destination: "/plan/helper", permanent: true },

      // === URL CANONICALIZATION REDIRECTS (from middleware.ts) ===
      // Legacy page redirects
      { source: "/about", destination: "/why-us", permanent: true },
      { source: "/testimonials", destination: "/reviews", permanent: true },
      { source: "/services", destination: "/events", permanent: true },
      { source: "/quote", destination: "/plan/helper", permanent: true },
      { source: "/constructor", destination: "/plan/constructor", permanent: true },

      // Common typos and legacy URLs (Cycle 1)
      { source: "/prices", destination: "/pricing", permanent: true },
      { source: "/tariffs", destination: "/pricing", permanent: true },
      { source: "/contacts", destination: "/contact", permanent: true },
      { source: "/career", destination: "/careers", permanent: true },
      { source: "/account", destination: "/account/orders", permanent: true },
      { source: "/delivery-zones", destination: "/delivery", permanent: true },
      { source: "/subscription", destination: "/subscribe", permanent: true },

      // Menu legacy URLs
      { source: "/menu/buffet", destination: "/menu/furshet", permanent: true },
      { source: "/menu/kids", destination: "/menu/detskoe", permanent: true },
      { source: "/menu/banket", destination: "/menu/banquet", permanent: true },

      // Events legacy URLs (English → Russian slugs)
      { source: "/events/wedding", destination: "/events/svadba", permanent: true },
      { source: "/events/corporate", destination: "/events/korporativ", permanent: true },

      // Common misspellings
      { source: "/menu-picker", destination: "/menu/catalog", permanent: true },
      { source: "/assistant", destination: "/plan/helper", permanent: true },
      { source: "/help", destination: "/faq", permanent: true },
      { source: "/tarify", destination: "/pricing", permanent: true },

      // Broken links fix (Cycle 2)
      { source: "/catalog", destination: "/menu/catalog", permanent: true },
    ];
  },
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      {
        key: "Content-Security-Policy",
        value:
          "default-src 'self'; script-src 'self' 'unsafe-inline' https://mc.yandex.ru https://web.archive.org; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https: wss:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
      },
    ];
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Static video assets — long-lived cache (immutable, filename-hashed)
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Static image assets — long-lived cache
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
