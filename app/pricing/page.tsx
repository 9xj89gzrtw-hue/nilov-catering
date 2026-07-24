import type { Metadata } from 'next';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';

export const metadata: Metadata = {
  alternates: { canonical: '/pricing' },
  title: 'Тарифы и цены',
  description: 'Прозрачные цены на кейтеринг в СПб. Фуршет от 2 450 ₽/гость, банкет от 3 950 ₽/гость, кофе-брейк от 390 ₽/гость. Все тарифы с полным составом меню.',
};

// Server component — читает searchParams на SSR, передаёт в TariffOffersSection как eventId
export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const eventParam = typeof params?.event === 'string' ? params.event : undefined;

  return <TariffOffersSection eventId={eventParam} />;
}
