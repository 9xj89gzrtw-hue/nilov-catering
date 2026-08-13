import type { Metadata } from 'next';
import { cormorant, inter, jetbrains } from '@/lib/fonts';
import { SITE } from '@/lib/data';
import { headers } from 'next/headers';
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
import { OrganizationJsonLd, ServiceJsonLd, MenuJsonLd } from './JsonLd';
import Analytics from '@/components/layout/Analytics';
import { getPricing } from '@/lib/cms';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: { default: `Кейтеринг под ключ в Санкт-Петербурге — ${SITE.name}`, template: `%s — ${SITE.name}` },
  description: 'Кейтеринг под ключ для любого бюджета. Ресторанное качество по реальной цене, без переплат за вывеску. С 2007 года в Петербурге.',
  keywords: ['кейтеринг', 'Санкт-Петербург', 'банкет', 'фуршет', 'кофе-брейк', 'свадьба', 'корпоратив'],
  alternates: { languages: { 'ru': '/', 'x-default': '/' } },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE.name,
    url: `https://${SITE.domain}`,
  },
  twitter: { card: 'summary_large_image', title: `${SITE.name} — кейтеринг в СПб`, description: 'Фуршет от 2 450 ₽, банкет от 3 950 ₽, кофе-брейк от 390 ₽/гость. С 2007 года.' },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cmsPricing = await getPricing();
  // Read locale from middleware header (set for /en routes)
  const headersList = await headers();
  const contentLang = headersList.get('x-content-lang');
  const htmlLang = contentLang || 'ru';

  return (
    <html lang={htmlLang} className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SkipLink />
        <link rel="preconnect" href={`https://${SITE.domain}`} />
        <link rel="preconnect" href="https://yandex.ru" />
        <link rel="sitemap" href="/sitemap.xml" type="application/xml" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="stylesheet" href="/styles/print.css" media="print" />
        <meta name="theme-color" content="#8C7140" />
        <meta name="color-scheme" content="light" />
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
          </SmoothScrollProvider>
        </PricingWrapper>
        <noscript>
          <style>{`[style*="opacity:0"], [style*="opacity: 0"] { opacity: 1 !important; filter: none !important; transform: none !important; }`}</style>
          <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
            <h1>NiloV Catering — Кейтеринг в Санкт-Петербурге</h1>
            <p>Для работы сайта необходимо включить JavaScript.</p>
            <p><strong>📞 Позвоните:</strong> <a href="tel:+78129195911">+7 (812) 919-59-11</a></p>
            <p><strong>💬 WhatsApp:</strong> <a href="https://wa.me/78129195911">Написать нам</a></p>
          </div>
        </noscript>
      </body>
    </html>
  );
}

/** SkipLink — WCAG 2.2 (33_UXSIM_ANNA) */
function SkipLink() {
  return (
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-gold-text focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg">
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
