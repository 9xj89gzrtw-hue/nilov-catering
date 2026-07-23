import type { Metadata } from 'next';
import { cormorant, inter, jetbrains } from '@/lib/fonts';
import { SITE } from '@/lib/data';
import SmoothScrollProvider from '@/components/effects/SmoothScrollProvider';
import TextSizeToggle from '@/components/effects/TextSizeToggle';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import CustomCursor from '@/components/effects/CustomCursor';
import CookieBanner from '@/components/layout/CookieBanner';
import ScrollProgress from '@/components/common/ScrollProgress';
import { ClientLayout } from '@/components/layout/ClientLayout';
import PricingWrapper from '@/components/layout/PricingWrapper';
import { OrganizationJsonLd, MenuJsonLd } from './JsonLd';
import Analytics from '@/components/layout/Analytics';
import { getPricing } from '@/lib/cms';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: { default: `${SITE.name} — Кейтеринг под ключ в Санкт-Петербурге`, template: `%s | ${SITE.name}` },
  description: 'Кейтеринг под ключ для любого бюджета. Ресторанное качество по реальной цене, без переплат за вывеску. Более 19 лет в Петербурге.',
  keywords: ['кейтеринг', 'Санкт-Петербург', 'банкет', 'фуршет', 'кофе-брейк', 'свадьба', 'корпоратив'],
  openGraph: { type: 'website', locale: 'ru_RU', siteName: SITE.name, images: [{ url: SITE.ogImage, width: 1200, height: 630 }] },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cmsPricing = await getPricing();

  return (
    <html lang="ru" className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Analytics />
        <OrganizationJsonLd />
        <MenuJsonLd />
        <SkipLink />
        <PricingWrapper cmsPricing={cmsPricing}>
          <SmoothScrollProvider>
            <AnnouncementBar message={null} />
            <Header />
            <ClientLayout>{children}</ClientLayout>
            <Footer />
            <MobileBottomNav />
            <StickyMobileCTA />
            <CustomCursor />
            <ScrollProgress />
            <CookieBanner />
          </SmoothScrollProvider>
        </PricingWrapper>
      </body>
    </html>
  );
}

/** SkipLink — WCAG 2.2 (33_UXSIM_ANNA) */
function SkipLink() {
  return (
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
      Перейти к содержимому
    </a>
  );
}
