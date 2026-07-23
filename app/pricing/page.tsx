import type { Metadata } from 'next';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';

export const metadata: Metadata = {
  title: 'Тарифы и цены — NiloV Catering',
  description: 'Прозрачные цены на кейтеринг в СПб. Фуршет от 2 450 ₽/гость, банкет от 4 470 ₽/гость, кофе-брейк от 390 ₽/гость. Все тарифы с полным составом меню.',
};

export default function PricingPage() {
  return <TariffOffersSection />;
}