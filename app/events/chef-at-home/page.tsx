import type { Metadata } from 'next';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';

export const metadata: Metadata = {
  title: 'Выезд шефа',
  description: 'Выезд шеф-повара NiloV на дом: персональный ужин на 2–12 персон. Шеф и сомелье у вас дома.',
};

export default function ChefAtHomePage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">Выезд шефа</h1>
        <p className="text-muted-foreground mb-2">
          Шеф-повар и сомелье приезжают к вам домой. Персональный ужин ресторанного уровня на 2–12 персон.
        </p>
        <p className="text-xs text-muted-foreground mb-8">
          от 2 500 ₽/час работы шефа + стоимость продуктов. Меню согласовывается индивидуально.
        </p>

        <TariffOffersSection
          eventId="chef-at-home"
          eventName="Шеф на дом"
          description="Тарифы для выезда шефа: от 4-курсного ужина до гастрономического опыта с wine pairing."
        />

        {/* Детали */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { n: 'Что входит', items: 'Работа шеф-повара, сомелье (опционально), сервировка, уборка кухни после' },
            { n: 'Длительность', items: '3–6 часов. Приезд за 2 часа до подачи.' },
            { n: 'Меню', items: 'Индивидуальная разработка: от 3 до 6 курсов. Французская, итальянская, паназиатская, русская кухня.' },
            { n: 'Винное сопровождение', items: 'Сомелье подбирает вино к каждому блюду. Карта от 3 500 ₽/бутылку.' },
          ].map((s) => (
            <div key={s.n} className="rounded-xl border border-line bg-card p-5">
              <h2 className="font-heading text-lg font-medium mb-1">{s.n}</h2>
              <p className="text-sm text-muted-foreground">{s.items}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}