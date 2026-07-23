import type { Metadata } from 'next';
import Link from 'next/link';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';

export const metadata: Metadata = {
  title: 'Свадебный кейтеринг',
  description: 'Свадебный кейтеринг NiloV в СПб: банкет, фуршет, торт, флористика. Полный цикл подготовки свадьбы под ключ.',
};

export default function SvadbaPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="mb-2">Свадебный кейтеринг</h1>
          <p className="text-muted-foreground mb-2 max-w-xl mx-auto">
            Меню, сервировка, торт, флористика — всё для вашей свадьбы. Работаем с лучшими площадками СПб.
          </p>
          <p className="text-xs text-muted-foreground">Цены ориентировочные. Итоговая смета — после дегустации и выбора площадки.</p>
        </div>

        {/* Direct order CTAs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Link href="/plan/constructor?event=svadba" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Оставить заявку на свадьбу
          </Link>
          <Link href="/tasting" className="rounded-lg border border-line px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors">
            Записаться на дегустацию
          </Link>
          <Link href="/pricing" className="rounded-lg border border-line px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors">
            Все тарифы и цены
          </Link>
        </div>

        <TariffOffersSection
          eventId="svadba"
          eventName="Свадьба"
          description="Выберите готовый тариф или настройте меню под себя. Каждый тариф — полный состав блюд с ценами."
        />

        {/* What's included */}
        <div className="mt-12 p-6 rounded-xl border border-line bg-card">
          <h2 className="font-heading text-lg font-medium mb-3">Что входит в полный цикл</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {[{ icon: '👨‍🍳', text: 'Дегустация меню' }, { icon: '🍽️', text: 'Сервировка и персонал' }, { icon: '💐', text: 'Флористика (бесплатно)' }, { icon: '🎂', text: 'Свадебный торт' }, { icon: '🚚', text: 'Доставка в КАД' }, { icon: '📋', text: 'Координатор события' }, { icon: '🍷', text: 'Винная карта' }, { icon: '♻️', text: 'Эко-упаковка остатков' }].map(item => (
              <div key={item.text} className="flex items-center gap-2 p-2">
                <span className="text-xl">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}