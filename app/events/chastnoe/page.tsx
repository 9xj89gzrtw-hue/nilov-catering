import type { Metadata } from 'next';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';

export const metadata: Metadata = {
  title: 'Частные события',
  description: 'Кейтеринг для частных событий в СПб: дни рождения, юбилеи, семейные ужины. Дома, на веранде, на крыше.',
};

export default function ChastnoePage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">Частные события</h1>
        <p className="text-muted-foreground mb-8">
          Дни рождения, юбилеи, семейные ужины. Дома, на веранде, на крыше — мы приедем куда скажете.

      Праздник для ТСЖ / соседей? Кофе-брейк от 390 ₽/гость — на 100 человек = 39 000 ₽. Без официантов, доставка по ЖК. → /menu/coffee-break
        </p>

        <TariffOffersSection
          eventId="chastnoe"
          eventName="Частное событие"
          description="Тарифы для частных событий: от камерного ужина до гастрономического опыта с сомелье."
        />
      </div>
    </main>
  );
}