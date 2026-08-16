import type { Metadata } from "next";
import { cormorant, inter, jetbrains } from "@/lib/fonts";
import { SITE } from "@/lib/data";
import { headers } from "next/headers";
import SmoothScrollProvider from "@/components/effects/SmoothScrollProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import CookieBanner from "@/components/layout/CookieBanner";
import LiveChatWidget from "@/components/layout/LiveChatWidget";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import ScrollProgress from "@/components/common/ScrollProgress";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { ClientLayout } from "@/components/layout/ClientLayout";
import PricingWrapper from "@/components/layout/PricingWrapper";
import { OrganizationJsonLd, ServiceJsonLd, MenuJsonLd } from "./JsonLd";
import Analytics from "@/components/layout/Analytics";
import { getPricing } from "@/lib/cms";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: `Кейтеринг под ключ в Санкт-Петербурге — ${SITE.name}`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "Кейтеринг под ключ для любого бюджета. Ресторанное качество по реальной цене, без переплат за вывеску. С 2007 года в Петербурге.",
  keywords: [
    "кейтеринг",
    "Санкт-Петербург",
    "банкет",
    "фуршет",
    "кофе-брейк",
    "свадьба",
    "корпоратив",
  ],
  alternates: { languages: { ru: "/", en: "/en", "x-default": "/" } },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE.name,
    url: `https://${SITE.domain}`,
    title: `Кейтеринг под ключ в Санкт-Петербурге — ${SITE.name}`,
    description:
      "Кейтеринг под ключ для любого бюджета. Ресторанное качество по реальной цене, без переплат за вывеску. С 2007 года в Петербурге.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Премиум кейтеринг в Санкт-Петербурге`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Кейтеринг под ключ в Санкт-Петербурге — ${SITE.name}`,
    description:
      "Кейтеринг под ключ для любого бюджета. Ресторанное качество по реальной цене, без переплат за вывеску. С 2007 года в Петербурге.",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cmsPricing = await getPricing();
  // Read locale from middleware header (set for /en routes)
  const headersList = await headers();
  const contentLang = headersList.get("x-content-lang");
  const htmlLang = contentLang || "ru";

  return (
    <html
      lang={htmlLang}
      className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="bg-background text-foreground min-h-screen antialiased" id="main">
        <SkipLink />
        <link rel="preconnect" href={`https://${SITE.domain}`} />
        <link rel="preconnect" href="https://yandex.ru" />
        <link rel="sitemap" href="/sitemap.xml" type="application/xml" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="stylesheet" href="/styles/print.css" media="print" />
        <meta name="theme-color" content="#8C7140" />
        <meta name="color-scheme" content="light" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <Analytics />
        <OrganizationJsonLd />
        <ServiceJsonLd />
        <MenuJsonLd />
        <PricingWrapper cmsPricing={cmsPricing}>
          <SmoothScrollProvider>
            <AnnouncementBar message={null} />
            <Header />
            <ClientLayout>{children}</ClientLayout>
            <Footer />
            <MobileBottomNav />
            <ScrollProgress />
            <ScrollReveal />
            <CookieBanner />
            <LiveChatWidget />
            <FloatingWhatsApp />
            <StickyMobileCTA />
          </SmoothScrollProvider>
        </PricingWrapper>
        <noscript>
          <style>{`[style*="opacity:0"], [style*="opacity: 0"] { opacity: 1 !important; filter: none !important; transform: none !important; }`}</style>
          <div
            style={{ padding: "2rem", textAlign: "center", fontFamily: "system-ui, sans-serif" }}
          >
            <h1>NiloV Catering — Кейтеринг в Санкт-Петербурге</h1>
            <p>Для работы сайта необходимо включить JavaScript.</p>
            <p>
              <strong>📞 Позвоните:</strong> <a href="tel:+78129195911">+7 (812) 919-59-11</a>
            </p>
            <p>
              <strong>💬 WhatsApp:</strong> <a href="https://wa.me/78129195911">Написать нам</a>
            </p>
          </div>
        </noscript>
      </body>
    </html>
  );
}

/** SkipLink — WCAG 2.2 (33_UXSIM_ANNA) */
function SkipLink() {
  return (
    <a
      href="#main"
      className="focus:bg-gold-text sr-only no-underline focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:px-4 focus:py-3 focus:text-white focus:shadow-lg"
    >
      Перейти к содержимому
    </a>
  );
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#faf8f3" },
  ],
};
