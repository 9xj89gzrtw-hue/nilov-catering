import type { Metadata } from 'next';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';

export const metadata: Metadata = {
  title: 'Выпускные',
  description: 'Кейтеринг на выпускной в СПб: фуршеты и банкеты для школ и вузов. Бюджетные решения от 2 450 ₽/гость.',
};

export default function VypusknoyPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">Выпускные</h1>
        <p className="text-muted-foreground mb-8">
          Фуршеты и банкеты для выпускных вечеров. Бюджетные решения для школ и вузов.
        </p>

        <TariffOffersSection
          eventId="vypusknoy"
          eventName="Выпускной"
          description="Тарифы для выпускных: от бюджетного фуршета до праздника с DJ и mocktail-баром."
        />
      </div>
    </main>
  );
}