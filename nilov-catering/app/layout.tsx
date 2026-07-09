import type { Metadata } from "next";
import { headingFont, bodyFont } from "@/lib/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import CookieBanner from "@/components/common/CookieBanner";
import ScrollToTop from "@/components/common/ScrollToTop";
import SkipLink from "@/components/common/SkipLink";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nilov-catering.ru"),
  title: {
    default: "Nilov Catering — Профессиональный кейтеринг в Санкт-Петербурге",
    template: "%s | Nilov Catering",
  },
  description:
    "Кейтеринговая компания Nilov Catering — организация свадебных, корпоративных и частных мероприятий. Авторское меню, безупречный сервис, 19 лет опыта.",
  keywords: [
    "кейтеринг",
    "Санкт-Петербург",
    "свадебный кейтеринг",
    "корпоративный кейтеринг",
    "выездное обслуживание",
    "банкет",
    "фуршет",
    "заказать кейтеринг",
    "меню на мероприятие",
    "кейтеринг с доставкой",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://nilov-catering.ru",
    siteName: "Nilov Catering",
    title: "Nilov Catering — Профессиональный кейтеринг в Санкт-Петербурге",
    description:
      "Кейтеринговая компания Nilov Catering — организация свадебных, корпоративных и частных мероприятий.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Nilov Catering — кейтеринг в Санкт-Петербурге",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nilov Catering — Профессиональный кейтеринг в Санкт-Петербурге",
    description:
      "Организация свадебных, корпоративных и частных мероприятий. Авторское меню, 19 лет опыта.",
    images: ["https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&h=630&fit=crop"],
  },
  verification: {
    yandex: "yandex_verification_code",
  },
  alternates: {
    canonical: "https://nilov-catering.ru",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Nilov Catering",
  description:
    "Профессиональный кейтеринг в Санкт-Петербурге. Свадьбы, корпоративы, частные мероприятия.",
  url: "https://nilov-catering.ru",
  telephone: "+7-812-919-59-11",
  email: "interfood-catering@yandex.ru",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Невский проспект, д. 28, офис 501",
    addressLocality: "Санкт-Петербург",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 59.9343,
    longitude: 30.3351,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "21:00",
    },
  ],
  priceRange: "₽₽₽",
  image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&h=630&fit=crop",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "847",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${headingFont.variable} ${bodyFont.variable}`} suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://nilov-catering.ru" />
        <link rel="alternate" hreflang="ru-RU" href="https://nilov-catering.ru" />
        <link rel="alternate" hreflang="x-default" href="https://nilov-catering.ru" />
        <meta name="theme-color" content="#C8782A" />
        <meta name="format-detection" content="telephone=yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <SkipLink />
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <MobileNav />
          <Toaster position="top-right" richColors />
          <CookieBanner />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}