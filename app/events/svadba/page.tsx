import type { Metadata } from 'next';
import Link from 'next/link';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';

export const metadata: Metadata = {
  alternates: { canonical: '/events/svadba' },
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
        <div className="flex flex-wrap justify-center gap-3 mb-6">
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

        {/* Аллергии — прямой мост в конструктор */}
        <div className="mb-10 p-4 rounded-xl border border-gold-tint bg-gold-tint/30 text-center">
          <p className="text-sm font-medium mb-1">🛡 Аллергии у гостей? Рыба, орехи, глютен?</p>
          <p className="text-xs text-muted-foreground mb-3">
            В конструкторе меню можно исключить конкретные аллергены фильтром — 14 аллергенов ТР ТС 022/2011. Менеджер подтвердит по телефону.
          </p>
          <Link href="/plan/constructor?format=banket" className="text-xs text-gold-text font-semibold hover:underline">
            Собрать свадебное меню с фильтром аллергенов →
          </Link>
        </div>

        <TariffOffersSection
          eventId="svadba"
          eventName="Свадьба"
          description="Выберите готовый тариф или настройте меню под себя. Каждый тариф — полный состав блюд с ценами."
        />

        {/* What's included — с разбивкой по тирам */}
        <div className="mt-12 p-6 rounded-xl border border-line bg-card">
          <h2 className="font-heading text-lg font-medium mb-2">Что входит в тариф</h2>
          <p className="text-xs text-muted-foreground mb-4">Состав «полного цикла» зависит от выбранного тарифа. Ниже — что входит в каждый.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border border-line p-3 bg-secondary/30">
              <h3 className="font-medium text-sm mb-2">🟢 Эконом (3 950 ₽)</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✓ Доставка в КАД</li>
                <li>✓ Сервировка и базовый персонал</li>
                <li>✓ Чай/кофе, морс</li>
                <li>✗ Свадебный торт</li>
                <li>✗ Винная карта</li>
                <li>✗ Координатор события</li>
              </ul>
            </div>
            <div className="rounded-lg border border-line p-3 bg-secondary/30">
              <h3 className="font-medium text-sm mb-2">🔵 Стандарт (5 470 ₽)</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✓ Доставка в КАД</li>
                <li>✓ Сервировка и персонал</li>
                <li>✓ Вино красное/белое (2 бокала)</li>
                <li>✓ Десертный стол</li>
                <li>✗ Свадебный торт</li>
                <li>✗ Координатор события</li>
              </ul>
            </div>
            <div className="rounded-lg border border-line p-3 bg-secondary/30">
              <h3 className="font-medium text-sm mb-2">🟡 Расширенный (7 350 ₽)</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✓ Всё из Стандарта</li>
                <li>✓ Welcome drink</li>
                <li>✓ Винная карта (безлимит)</li>
                <li>✓ Шампанское (2 бокала)</li>
                <li>✓ Морепродукты</li>
                <li>✗ Свадебный торт</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gold-text p-3 bg-gold-tint/30">
              <h3 className="font-medium text-sm mb-2">👑 Максимальный (9 950 ₽)</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✓ Всё из Расширенного</li>
                <li>✓ Свадебный торт на заказ</li>
                <li>✓ Координатор события</li>
                <li>✓ Сомелье + 5 вин</li>
                <li>✓ Чёрная икра</li>
                <li>✓ Эко-упаковка остатков</li>
              </ul>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground mt-3">💡 Флористика — отдельно, бесплатно при бронировании за 60+ дней. Свадебный торт, винная карта, координатор — доступны как опции в любом тарифе.</p>
        </div>
      </div>
    </main>
  );
}