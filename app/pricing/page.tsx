import type { Metadata } from 'next';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';

export const metadata: Metadata = {
  alternates: { canonical: '/pricing', languages: { 'ru': '/', 'en': '/en' } },
  title: 'Тарифы и цены',
  description: 'Прозрачные цены на кейтеринг в СПб. Фуршет от 2 450 ₽/гость, банкет от 3 950 ₽/гость, кофе-брейк от 390 ₽/гость. Все тарифы с полным составом меню.',
};

// Force static rendering — removes cookie/searchParams dependency that prevents prerender
export const dynamic = 'force-static';

export default function PricingPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-4">Тарифы и цены</h1>
        <p className="text-muted-foreground mb-8">
          Прозрачные цены без скрытых платежей. Все тарифы включают: меню, официантов,
          координатора, доставку в пределах КАД, сервировку и уборку.
        </p>
        <TariffOffersSection />
      </div>
    </main>
  );
}
