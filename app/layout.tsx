import type { Metadata } from "next";
import { headingFont, bodyFont } from "@/lib/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Preloader from "@/components/providers/Preloader";
import CustomCursor from "@/components/effects/CustomCursor";
import NoiseOverlay from "@/components/effects/NoiseOverlay";
import AIConcierge from "@/components/ai/AIConcierge";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nilov-catering.vercel.app"),
  title: {
    default: "Нилов Кейтеринг — Премиальный кейтеринг в Санкт-Петербурге",
    template: "%s | Нилов Кейтеринг",
  },
  description:
    "Кейтеринговая компания Нилов Кейтеринг — организация свадебных, корпоративных и частных мероприятий в Санкт-Петербурге. Авторское меню, безупречный сервис, 12 лет опыта.",
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
    url: "https://nilov-catering.vercel.app",
    siteName: "Нилов Кейтеринг",
    title: "Нилов Кейтеринг — Премиальный кейтеринг в Санкт-Петербурге",
    description:
      "Организация свадебных, корпоративных и частных мероприятий. Авторское меню, 12 лет опыта.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Нилов Кейтеринг — премиальный кейтеринг в Санкт-Петербурге",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Нилов Кейтеринг — Премиальный кейтеринг в Санкт-Петербурге",
    description:
      "Организация свадебных, корпоративных и частных мероприятий. Авторское меню, 12 лет опыта.",
    images: ["https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&h=630&fit=crop"],
  },
  verification: {
    yandex: "yandex_verification_code",
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
  name: "Нилов Кейтеринг",
  description:
    "Премиальный кейтеринг в Санкт-Петербурге. Свадьбы, корпоративы, частные мероприятия, фуршеты.",
  url: "https://nilov-catering.vercel.app",
  telephone: "+7-812-919-59-11",
  email: "info@nilov-catering.ru",
  address: {
    "@type": "PostalAddress",
    streetAddress: "наб. реки Фонтанки, 90",
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
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Нилов Кейтеринг",
  url: "https://nilov-catering.vercel.app",
  logo: "https://nilov-catering.vercel.app/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-812-919-59-11",
    contactType: "sales",
    areaServed: "RU-SPE",
    availableLanguage: "Russian",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" manifest="/manifest.json" className={`${headingFont.variable} ${bodyFont.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="format-detection" content="telephone=yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-background text-foreground">
        <Preloader />
        <SmoothScrollProvider>
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <AIConcierge />
        </SmoothScrollProvider>
        <CustomCursor />
        <NoiseOverlay />
      </body>
    </html>
  );
}