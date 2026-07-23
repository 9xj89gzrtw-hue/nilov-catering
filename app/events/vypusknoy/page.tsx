import type { Metadata } from 'next';
import Link from 'next/link';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';

export const metadata: Metadata = {
  title: 'Выпускные',
  description: 'Кейтеринг на выпускной в СПб: фуршеты и банкеты для школ и вузов. Бюджетные решения от 2 450 ₽/гость.',
  alternates: { canonical: '/events/vypusknoy' },
};

export default function VypusknoyPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">Выпускные</h1>
        <p className="text-muted-foreground mb-4">
          Фуршеты и банкеты для выпускных вечеров. Бюджетные решения для школ и вузов.
        </p>

        {/* Бюджетный мост — для тех, кому фуршет дорого */}
        <div className="mb-8 p-4 rounded-xl border border-gold-tint bg-gold-tint/30">
          <p className="text-sm font-medium mb-1">💰 Ограниченный бюджет?</p>
          <p className="text-xs text-muted-foreground mb-3">
            Кофе-брейк от <strong className="text-foreground">390 ₽/гость</strong> — выпечка, сэндвичи, фрукты, напитки. На 25 человек = ~9 750 ₽.
            Или доставка без официантов от <strong className="text-foreground">5 000 ₽</strong>.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/pricing?event=coffee-break" className="text-xs text-gold-text font-semibold hover:underline">
              Смотреть кофе-брейк тарифы →
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/delivery/order" className="text-xs text-gold-text font-semibold hover:underline">
              Заказать доставкой →
            </Link>
          </div>
        </div>

        <TariffOffersSection
          eventId="vypusknoy"
          eventName="Выпускной"
          description="Тарифы для выпускных: от бюджетного фуршета до праздника с DJ и mocktail-баром."
        />
      </div>
    </main>
  );
}
