import type { Metadata } from 'next';
import Link from 'next/link';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Детские праздники',
  description: 'Детский кейтеринг NiloV: Эконом — без орехов; Стандарт/Расширенный — с маркировкой. Анафилаксия-протокол: EpiPen, отдельная смена. Мин. 10 (мед. диеты — от 6).',
  alternates: { canonical: '/events/detskoe', languages: { 'ru': '/events/detskoe', 'x-default': '/events/detskoe' } },
};

export default function DetskoeEventPage() {
  return (
    <main id="main" className="pt-24 pb-20">
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
          <h2 className="font-heading text-base font-bold text-red-900 mb-2">Анафилаксия на орехи? Безопасно.</h2>
          <p className="text-sm text-red-900 mb-3">
            <strong>В пакетах «Эконом» и базовом наборе НЕТ блюд с цельными орехами</strong>(арахис, лесной, кедровый, грецкий) — по умолчанию.
            В пакетах «Стандарт» и «Расширенный» часть десертов (брауни, миндальная мука в БГ-выпечке) содержит орехи — они промаркированы значком «Орехи» (см. <a href="/menu/detskoe" className="underline">/menu/detskoe</a>).
            При заявленной анафилаксии на любой орех (включая миндаль) — выбираем только Эконом/базовый набор:
          </p>
          <ul className="text-sm text-red-900 space-y-1 mb-3 ml-4 list-disc">
            <li>Отдельная смена приготовления — без пересечения с другими заказами</li>
            <li>Отдельная зона кухни с красной цветовой маркировкой</li>
            <li>Отдельные доски, ножи, посуда — никогда не используются для ореховых блюд</li>
            <li>Маркировка каждого блюда на событии — этикетка с составом на каждом блюде</li>
            <li> <strong>EpiPen / адреналин</strong> на руках у ответственного сотрудника</li>
            <li>Менеджер звонит клиенту за 24 часа до события для подтверждения протокола</li>
          </ul>
          <p className="text-sm text-red-900">
            Укажите тип ореха и тяжесть аллергии в заявке. Подробнее:{' '}
            <Link href="/allergens" className="underline font-semibold">/allergens →</Link>{' '}
            {' '}
            <Link href="/certificates" className="underline font-semibold">/certificates →</Link>
          </p>
        </div>

        {/* СД1/СД2-протокол */}
        <div className="mb-8 p-5 rounded-xl border-2 border-purple-300 bg-purple-50">
          <h2 className="font-heading text-base font-bold text-purple-900 mb-2">Сахарный диабет (СД1/СД2)? Безопасно.</h2>
          <p className="text-sm text-purple-900 mb-3">
            <strong>Для гостя с СД1 candy-bar / сладкий стол исключаем по умолчанию</strong> и заменяем
            на сырно-фруктовую тарелку (брусника, черника, киви, твёрдые сыры — низкий ГИ) или
            десерты без добавленного сахара (стевия/эритрит). Если в пакете «Стандарт» или
            «Расширенный» candy-bar заявлен — для группы с СД1 он автоматически заменяется.
          </p>
          <ul className="text-sm text-purple-900 space-y-1 mb-3 ml-4 list-disc">
            <li>Расчёт хлебных единиц (ХЕ) на каждое блюдо — 1 ХЕ = 10–12 г углеводов</li>
            <li>Без добавленного сахара, мёда, фруктозы, сиропов (включая кленовый, агавы)</li>
            <li>Без скрытых сахаров в соусах (кетчуп, терияки — либо исключаем, либо готовим без сахара)</li>
            <li>Фрукты с низким ГИ (клубника, киви, черника) — без банана, винограда, дыни</li>
            <li>Состав БЖУ + ХЕ указываем в карточке блюда и в меню-карте</li>
            <li>Шеф-кондитер Елена Соколова специализируется на диабетической выпечке</li>
            <li>Обязательная дегустация для гостя с СД1 — подтверждение состава и расчёта ХЕ</li>
            <li>Ищите в каталоге блюда со значком <span className="inline-block bg-purple-200 text-purple-800 px-1.5 py-0.5 rounded text-[10px] font-medium">SF</span>(sugar-free)</li>
          </ul>
          <p className="text-sm text-purple-900">
            Укажите «СД1» или «СД2» в заявке. Полный протокол — на странице{' '}
            <Link href="/allergens" className="underline font-semibold">/allergens →</Link>
          </p>
        </div>

        {/* Целиакия-протокол */}
        <div className="mb-8 p-5 rounded-xl border-2 border-blue-300 bg-blue-50">
          <h2 className="font-heading text-base font-bold text-blue-900 mb-2">Целиакия? Безопасно.</h2>
          <p className="text-sm text-blue-900 mb-3">
            <strong>Безглютеновое детское меню</strong> на миндальной/рисовой муке — отдельная
            линия кухни, тестирование &lt;20 ppm (GFCO standard). БГ торт, БГ капкейки, БГ пицца,
            БГ панкейки без сахара (для СД1). {' '}
            <Link href="/menu/gluten-free" className="underline font-semibold">БГ-меню →</Link>
          </p>
        </div>

        {/* Гибрид: дети + взрослые */}
        <div className="mb-8 p-4 rounded-xl border border-gold-tint bg-gold-tint/30">
          <p className="text-sm font-medium mb-1">Нужен и взрослый стол?</p>
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
               {SITE.phone}
            </a>
            <Link href="/contact" className="rounded-lg border-2 border-background px-5 py-2.5 text-sm font-semibold hover:bg-background/10 transition-colors no-underline">
               Заявка с аллергией
            </Link>
            <Link href="/menu/detskoe" className="rounded-lg border-2 border-background px-5 py-2.5 text-sm font-semibold hover:bg-background/10 transition-colors no-underline">
               Детское меню
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
