import type { Metadata } from 'next';
import { cormorant, inter, jetbrains } from '@/lib/fonts';
import { SITE } from '@/lib/data';
import SmoothScrollProvider from '@/components/effects/SmoothScrollProvider';
import TextSizeToggle from '@/components/effects/TextSizeToggle';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import CookieBanner from '@/components/layout/CookieBanner';
import LiveChatWidget from '@/components/layout/LiveChatWidget';
import ScrollProgress from '@/components/common/ScrollProgress';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { ClientLayout } from '@/components/layout/ClientLayout';
import PricingWrapper from '@/components/layout/PricingWrapper';
import { OrganizationJsonLd, ServiceJsonLd } from './JsonLd';
import Analytics from '@/components/layout/Analytics';
import { getPricing } from '@/lib/cms';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: { default: `Кейтеринг под ключ в Санкт-Петербурге — ${SITE.name}`, template: `%s — ${SITE.name}` },
  description: 'Кейтеринг под ключ для любого бюджета. Ресторанное качество по реальной цене, без переплат за вывеску. С 2007 года в Петербурге.',
  keywords: ['кейтеринг', 'Санкт-Петербург', 'банкет', 'фуршет', 'кофе-брейк', 'свадьба', 'корпоратив'],
  alternates: { languages: { 'ru': '/', 'en': '/en', 'x-default': '/' } },
  openGraph: { type: 'website', locale: 'ru_RU', siteName: SITE.name },
  twitter: { card: 'summary_large_image', title: `${SITE.name} — кейтеринг в СПб`, description: 'Фуршет от 2 450 ₽, банкет от 3 950 ₽, кофе-брейк от 390 ₽/гость. С 2007 года.' },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cmsPricing = await getPricing();

  return (
    <html lang="ru" className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SkipLink />
        <link rel="preconnect" href={`https://${SITE.domain}`} />
        <link rel="preconnect" href="https://yandex.ru" />
        <link rel="sitemap" href="/sitemap.xml" type="application/xml" />
        <Analytics />
        <OrganizationJsonLd />
        <ServiceJsonLd />
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
          </SmoothScrollProvider>
        </PricingWrapper>
      </body>
    </html>
  );
}

/** SkipLink — WCAG 2.2 (33_UXSIM_ANNA) */
function SkipLink() {
  return (
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-gold-text focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg">
      Перейти к содержимому
    </a>
  );
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#faf8f3' },
  ],
};
