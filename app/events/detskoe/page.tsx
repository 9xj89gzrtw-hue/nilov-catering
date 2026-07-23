import type { Metadata } from 'next';
import Link from 'next/link';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Детские праздники',
  description: 'Детский кейтеринг NiloV: меню без орехов, аниматоры, шоу. Анафилаксия-протокол: EpiPen, отдельная смена. Мин. 10 (мед. диеты — от 6).',
  alternates: { canonical: '/events/detskoe' },
};

export default function DetskoeEventPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">Детские праздники</h1>
        <p className="text-muted-foreground mb-2">
          Специальное меню, аниматоры, шоу-программа. Безопасные ингредиенты, согласованное меню. Мин. 10 гостей (для медицинских диет — от 6 детей).
        </p>
        <p className="text-xs text-muted-foreground mb-8">
          Все цены ориентировочные. Меню адаптируется под возраст детей.
        </p>

        {/* Анафилаксия-протокол — ВВЕРХУ */}
        <div className="mb-8 p-5 rounded-xl border-2 border-red-300 bg-red-50">
          <h2 className="font-heading text-base font-bold text-red-900 mb-2">🥜 Анафилаксия на орехи? Безопасно.</h2>
          <p className="text-sm text-red-900 mb-3">
            <strong>В детском меню НЕТ блюд с цельными орехами</strong> (арахис, лесной, кедровый, грецкий) — по умолчанию.
            Несколько БГ-десертов используют миндальную муку — они имеют значок ⚠ Орехи и НЕ рекомендуются при анафилаксии на миндаль.
            При заявленной анафилаксии:
          </p>
          <ul className="text-sm text-red-900 space-y-1 mb-3 ml-4 list-disc">
            <li>✓ Отдельная смена приготовления — без пересечения с другими заказами</li>
            <li>✓ Отдельная зона кухни с красной цветовой маркировкой</li>
            <li>✓ Отдельные доски, ножи, посуда — никогда не используются для ореховых блюд</li>
            <li>✓ Per-dish маркировка на событии — этикетка с составом на каждом блюде</li>
            <li>✓ <strong>EpiPen / адреналин</strong> на руках у ответственного сотрудника</li>
            <li>✓ Менеджер звонит клиенту за 24 часа до события для подтверждения протокола</li>
          </ul>
          <p className="text-sm text-red-900">
            Укажите тип ореха и тяжесть аллергии в заявке. Подробнее:{' '}
            <Link href="/allergens" className="underline font-semibold">/allergens →</Link>{' '}
            ·{' '}
            <Link href="/certificates" className="underline font-semibold">/certificates →</Link>
          </p>
        </div>

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

        {/* CTA — контакты */}
        <div className="mt-12 p-6 rounded-xl bg-primary text-primary-foreground text-center">
          <h2 className="font-heading text-xl font-medium mb-2">Безопасный детский праздник</h2>
          <p className="text-sm mb-4 opacity-90">
            Позвоните или оставьте заявку — менеджер свяжется для подтверждения протокола безопасности.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`tel:${SITE.phoneTel}`} className="rounded-lg bg-background text-foreground px-5 py-2.5 text-sm font-semibold hover:bg-background/90 transition-colors no-underline">
              📞 {SITE.phone}
            </a>
            <Link href="/contact" className="rounded-lg border-2 border-background px-5 py-2.5 text-sm font-semibold hover:bg-background/10 transition-colors no-underline">
              ✍️ Заявка с аллергией
            </Link>
            <Link href="/menu/detskoe" className="rounded-lg border-2 border-background px-5 py-2.5 text-sm font-semibold hover:bg-background/10 transition-colors no-underline">
              🍔 Детское меню
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
