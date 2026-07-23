import type { Metadata } from 'next';
import Link from 'next/link';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';

export const metadata: Metadata = {
  title: 'Детские праздники',
  description: 'Организация детских праздников NiloV: кейтеринг, аниматоры, шоу-программа. Безопасно и весело.',
  alternates: { canonical: '/events/detskoe' },
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

        {/* Гибрид: дети + взрослые */}
        <div className="mb-8 p-4 rounded-xl border border-gold-tint bg-gold-tint/30">
          <p className="text-sm font-medium mb-1">👨‍👩‍👧‍👦 Нужен и взрослый стол?</p>
          <p className="text-xs text-muted-foreground mb-3">
            В конструкторе меню можно включить режим «Несколько групп гостей» — отдельно собрать детское меню и отдельно взрослое, с раздельным расчётом цены.
          </p>
          <Link href="/plan/constructor?format=detskoe" className="text-xs text-gold-text font-semibold hover:underline">
            Собрать гибридное меню в конструкторе →
          </Link>
        </div>

        <TariffOffersSection
          eventId="detskoe"
          eventName="Детский праздник"
          description="Тарифы для детских праздников: от базового фуршета до шоу-программы с candy-bar."
        />
      </div>
    </main>
  );
}
