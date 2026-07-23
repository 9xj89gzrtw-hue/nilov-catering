import type { Metadata } from 'next';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';

export const metadata: Metadata = {
  title: 'Детские праздники',
  description: 'Организация детских праздников NiloV: кейтеринг, аниматоры, шоу-программа. Безопасно и весело.',
};

export default function DetskoeEventPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">Детские праздники</h1>
        <p className="text-muted-foreground mb-2">
          Специальное меню, аниматоры, шоу-программа. Безопасные ингредиенты, согласованное меню. Мин. 10 гостей.
        </p>
        <p className="text-xs text-muted-foreground mb-8">
          Все цены ориентировочные. Меню адаптируется под возраст детей.
        </p>

        <TariffOffersSection
          eventId="detskoe"
          eventName="Детский праздник"
          description="Тарифы для детских праздников: от базового фуршета до шоу-программы с candy-bar."
        />
      </div>
    </main>
  );
}