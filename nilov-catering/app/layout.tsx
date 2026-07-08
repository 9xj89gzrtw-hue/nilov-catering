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
  metadataBase: new URL("https://odaeda.ru"),
  title: {
    default: "Nilov Catering — Профессиональный кейтеринг в Москве",
    template: "%s | Nilov Catering",
  },
  description:
    "Кейтеринговая компания Nilov Catering — организация свадебных, корпоративных и частных мероприятий. Авторское меню, безупречный сервис, 12 лет опыта.",
  keywords: [
    "кейтеринг",
    "Москва",
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
    url: "https://odaeda.ru",
    siteName: "Nilov Catering",
    title: "Nilov Catering — Профессиональный кейтеринг в Москве",
    description:
      "Кейтеринговая компания Nilov Catering — организация свадебных, корпоративных и частных мероприятий.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Nilov Catering — кейтеринг в Москве",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Nilov Catering",
  description:
    "Профессиональный кейтеринг в Москве. Свадьбы, корпоративы, частные мероприятия.",
  url: "https://odaeda.ru",
  telephone: "+7-495-921-34-56",
  email: "info@odaeda.ru",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Тверская, д. 15, офис 301",
    addressLocality: "Москва",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 55.7654,
    longitude: 37.6006,
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