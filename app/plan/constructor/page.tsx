import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import ConstructorWizard from '@/components/interactive/ConstructorWizard';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/plan/constructor' },
  title: 'Конструктор меню — соберите кейтеринг под ваше событие',
  description: 'Соберите меню под ваше событие за 2 минуты. Фуршет от 2 450 ₽/гость, банкет от 3 950 ₽/гость, кофе-брейк от 390 ₽/гость. Multi-диета: веган + халяль + без глютена + всеядные в одном заказе.',
};

/**
 * SSR-fallback для конструктора.
 * Если JS отключён или ещё грузится — пользователь видит РЕАЛЬНЫЙ первый шаг:
 * выбор формата с ценами + контакты для ручной заявки.
 * Гидрация ConstructorWizard заменяет этот блок на интерактивный wizard.
 */
function ConstructorServerFallback() {
  const formats = [
    {
      name: 'Фуршет',
      emoji: '🥪',
      price: 'от 2 450 ₽/гость',
      minGuests: 'мин. 20 гостей',
      desc: 'Гости едят стоя, лёгкие закуски, можно свободно ходить',
      href: '/plan/constructor?format=furshet',
    },
    {
      name: 'Банкет',
      emoji: '🍽️',
      price: 'от 3 950 ₽/гость',
      minGuests: 'мин. 15 гостей',
      desc: 'Посадка за стол, официанты, классическая подача',
      href: '/plan/constructor?format=banket',
    },
    {
      name: 'Кофе-брейк',
      emoji: '☕',
      price: 'от 390 ₽/гость',
      minGuests: 'мин. 10 гостей',
      desc: 'Кофе и десерты в перерыве мероприятия',
      href: '/plan/constructor?format=coffee-break',
    },
    {
      name: 'Детский праздник',
      emoji: '🧒',
      price: 'от 1 550 ₽/гость',
      minGuests: 'мин. 10 детей',
      desc: 'Специальное меню и развлечения для детей',
      href: '/plan/constructor?format=detskoe',
    },
    {
      name: 'Выезд шефа',
      emoji: '👨‍🍳',
      price: 'от 5 000 ₽/гость',
      minGuests: 'мин. 6 гостей',
      desc: 'Шеф-повар и сомелье у вас дома',
      href: '/plan/constructor?format=chef-at-home',
    },
    {
      name: 'Мобильный фуршет',
      emoji: '🚚',
      price: 'от 1 500 ₽/гость',
      minGuests: 'мин. 30 гостей',
      desc: 'Выезд на площадку без кухни',
      href: '/plan/constructor?format=mobile-furshet',
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="container-site max-w-4xl">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          {' / '}
          <Link href="/plan" className="hover:text-foreground">Спланировать</Link>
          {' / '}
          <span className="text-foreground">Конструктор меню</span>
        </nav>

        <h1 className="font-heading text-4xl md:text-5xl font-medium mb-4">
          Конструктор меню
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Соберите меню под ваше событие за 2 минуты. Выберите формат — рассчитаем стоимость и состав instantly.
          Multi-диета: веган + халяль + без глютена + без орехов + всеядные в одном заказе с per-group pricing.
        </p>

        {/* Шаг 1 — формат (виден SSR) */}
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-medium mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm mr-3">1</span>
            Выберите формат
          </h2>
          <p className="text-sm text-muted-foreground mb-6 ml-11">
            Цены указаны за гостя. Всё включено: еда, персонал, посуда, доставка по КАД.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-11">
            {formats.map((f) => (
              <a
                key={f.name}
                href={f.href}
                className="block p-5 rounded-xl border border-line bg-card hover:border-gold-text transition-colors no-underline"
              >
                <div className="text-3xl mb-2">{f.emoji}</div>
                <div className="font-heading font-semibold text-lg text-foreground">{f.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{f.desc}</div>
                <div className="mt-3 text-base font-semibold text-gold-text">{f.price}</div>
                <div className="text-xs text-muted-foreground mt-1">{f.minGuests}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Шаг 2-5 — preview (видны SSR как roadmap) */}
        <div className="mb-8 ml-11 space-y-4">
          <h2 className="font-heading text-2xl font-medium mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-foreground text-sm mr-3">2</span>
            Гости и диеты
          </h2>
          <p className="text-sm text-muted-foreground ml-11">
            Укажите количество гостей. Включите «Несколько групп гостей» — каждая группа получит своё под-меню
            с фильтром по диете (веган / халяль / без глютена / без орехов / всеядные). Per-group pricing: вы платите только за блюда своей группы.
          </p>

          {/* Static SSR form for guests (no-JS fallback) */}
          <form className="ml-11 mt-4 p-4 rounded-lg border border-line bg-card space-y-3" action="/api/quote" method="POST">
            <input type="hidden" name="source" value="constructor-ssr" />
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs text-muted-foreground block mb-1">Кол-во гостей *</span>
                <input type="number" name="guests" min="6" required placeholder="напр. 25" className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
              </label>
              <label className="block">
                <span className="text-xs text-muted-foreground block mb-1">Дата события</span>
                <input type="date" name="date" className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
              </label>
            </div>
            <fieldset className="border border-line rounded p-3">
              <legend className="text-xs font-medium px-2">🥗 Группы гостей по диетам (заполните при необходимости)</legend>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                <label className="block">
                  <span className="text-xs text-muted-foreground block mb-1">Всеядные</span>
                  <input type="number" name="groupOmnivore" min="0" placeholder="0" className="w-full rounded border border-line bg-background px-2 py-1.5 text-sm" />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground block mb-1">Веганы</span>
                  <input type="number" name="groupVegan" min="0" placeholder="0" className="w-full rounded border border-line bg-background px-2 py-1.5 text-sm" />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground block mb-1">Халяль</span>
                  <input type="number" name="groupHalal" min="0" placeholder="0" className="w-full rounded border border-line bg-background px-2 py-1.5 text-sm" />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground block mb-1">Без глютена</span>
                  <input type="number" name="groupGlutenFree" min="0" placeholder="0" className="w-full rounded border border-line bg-background px-2 py-1.5 text-sm" />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground block mb-1">Без орехов</span>
                  <input type="number" name="groupNutFree" min="0" placeholder="0" className="w-full rounded border border-line bg-background px-2 py-1.5 text-sm" />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground block mb-1">Другое</span>
                  <input type="number" name="groupOther" min="0" placeholder="0" className="w-full rounded border border-line bg-background px-2 py-1.5 text-sm" />
                </label>
              </div>
            </fieldset>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs text-muted-foreground block mb-1">Имя *</span>
                <input type="text" name="name" required className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
              </label>
              <label className="block">
                <span className="text-xs text-muted-foreground block mb-1">Телефон *</span>
                <input type="tel" name="phone" required placeholder="+7" className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
              </label>
            </div>
            <button type="submit" className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              ✍️ Отправить заявку (no-JS)
            </button>
            <p className="text-xs text-muted-foreground text-center">Менеджер перезвонит ≤15 мин. Или используйте интерактивный конструктор выше (нужен JS).</p>
          </form>

          <h2 className="font-heading text-2xl font-medium mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-foreground text-sm mr-3">3</span>
            Тариф
          </h2>
          <p className="text-sm text-muted-foreground ml-11">
            Эконом / Стандарт / Расширенный / Максимальный. Цены варьируются от 390 ₽/гость (кофе-брейк) до 9 950 ₽/гость (свадебный люкс).
          </p>

          <h2 className="font-heading text-2xl font-medium mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-foreground text-sm mr-3">4</span>
            Меню
          </h2>
          <p className="text-sm text-muted-foreground ml-11">
            121 блюдо в каталоге. Drag-and-drop сборка. Фильтр по 14 аллергенам ТР ТС 022/2011.
            Гибридный режим: можно добавить блюда из другого формата.
          </p>

          <h2 className="font-heading text-2xl font-medium mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-foreground text-sm mr-3">5</span>
            Контакты и отправка
          </h2>
          <p className="text-sm text-muted-foreground ml-11">
            Заполняете имя + телефон — заявка уходит на <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>.
            Получаете orderId и перезвон в течение 15 минут.
          </p>
        </div>

        {/* No-JS fallback: прямая заявка */}
        <div className="ml-11 p-6 rounded-xl border-2 border-gold-tint bg-gold-tint/5">
          <h3 className="font-heading text-lg font-medium mb-2">Не хотите собирать вручную?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Позвоните или напишите — шеф-повар Дмитрий Нилов подберёт меню под ваш бюджет и диеты за 15 минут.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline"
            >
              📞 {SITE.phone}
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-line bg-card px-5 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors no-underline"
            >
              💬 WhatsApp
            </a>
            <Link
              href="/contact"
              className="rounded-lg border border-line bg-card px-5 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors no-underline"
            >
              ✍️ Заполнить форму
            </Link>
          </div>
        </div>

        <noscript>
          <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm">
            <strong>Внимание:</strong> интерактивный конструктор требует JavaScript.
            Вы можете выбрать формат выше или связаться напрямую по телефону{' '}
            <a href={`tel:${SITE.phoneTel}`} className="underline">{SITE.phone}</a>.
          </div>
        </noscript>
      </div>
    </div>
  );
}

export default function ConstructorPage() {
  return (
    <Suspense fallback={<ConstructorServerFallback />}>
      <ConstructorWizard />
    </Suspense>
  );
}
