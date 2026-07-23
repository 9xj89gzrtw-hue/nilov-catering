import type { Metadata } from 'next';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';

export function generateMetadata(): Metadata {
  return {
    title: 'Корпоративы',
    description: 'Кейтеринг для корпоративных мероприятий в СПб. Бизнес-ланчи, фуршеты, банкеты. От 10 до 500 человек.',
  };
}

export default function CorporatePage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">Корпоративы</h1>
        <p className="text-muted-foreground mb-8">
          Бизнес-ланчи, фуршеты и банкеты для компаний любого размера. От неформальной встречи на 10 человек до годового собрания на 500 гостей.
        </p>

        <TariffOffersSection
          eventId="korporativ"
          eventName="Корпоратив"
          description="Готовые тарифы для корпоративных событий. Каждый включает полный состав блюд."
        />
      </div>
    </main>
  );
}