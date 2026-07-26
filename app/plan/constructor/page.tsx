import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import ConstructorWizard from '@/components/interactive/ConstructorWizard';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PageHeader from '@/components/common/PageHeader';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/plan/constructor', languages: { 'ru': '/plan/constructor', 'en': '/en', 'x-default': '/plan/constructor' } },
  title: 'Заявка на подбор меню — соберите кейтеринг под ваше событие',
  description: 'Соберите меню под ваше событие за 2 минуты. Фуршет от 2 450 ₽/гость, банкет от 3 950 ₽/гость, кофе-брейк от 390 ₽/гость. Multi-диета: веган + халяль + без глютена + без орехов + всеядные в одном заказе.',
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
      slug: 'furshet',
      emoji: '🥪',
      price: 'от 2 450 ₽/гость',
      minGuests: 'мин. 20 гостей',
      desc: 'Гости едят стоя, лёгкие закуски, можно свободно ходить',
      href: '/plan/constructor?format=furshet',
    },
    {
      name: 'Банкет',
      slug: 'banket',
      emoji: '🍽️',
      price: 'от 3 950 ₽/гость',
      minGuests: 'мин. 15 гостей',
      desc: 'Посадка за стол, официанты, классическая подача',
      href: '/plan/constructor?format=banket',
    },
    {
      name: 'Кофе-брейк',
      slug: 'coffee-break',
      emoji: '☕',
      price: 'от 390 ₽/гость',
      minGuests: 'мин. 10 гостей',
      desc: 'Кофе и десерты в перерыве мероприятия',
      href: '/plan/constructor?format=coffee-break',
    },
    {
      name: 'Детский праздник', slug: 'detskoe',
      emoji: '🧒',
      price: 'от 1 550 ₽/гость',
      minGuests: 'мин. 10 детей',
      desc: 'Специальное меню и развлечения для детей',
      href: '/plan/constructor?format=detskoe',
    },
    {
      name: 'Выезд шефа', slug: 'chef-at-home',
      emoji: '👨‍🍳',
      price: 'от 5 000 ₽/гость',
      minGuests: 'мин. 6 гостей',
      desc: 'Шеф-повар и сомелье у вас дома',
      href: '/plan/constructor?format=chef-at-home',
    },
    {
      name: 'Мобильный фуршет', slug: 'mobile-furshet',
      emoji: '🚚',
      price: 'от 1 500 ₽/гость',
      minGuests: 'мин. 30 гостей',
      desc: 'Выезд на площадку без кухни',
      href: '/plan/constructor?format=mobile-furshet',
    },
    {
      name: 'Поминки', slug: 'pominki',
      emoji: '🕯️',
      price: 'от 1 800 ₽/гость',
      minGuests: 'мин. 10 гостей',
      desc: 'Поминальный обед по православной традиции. Кутья, блины, кисель, рыба. Без алкоголя.',
      href: '/events/pominki',
    },
  ];

  return (
    <div className="pt-24 pb-20" id="main">
      <div className="container-site max-w-4xl">
        <Breadcrumbs />

        <PageHeader
          title="Подбор меню"
          eyebrow="Конструктор меню"
          subtitle="Соберите меню под ваше событие за 2 минуты. Выберите формат — подберём меню под ваш бюджет и диеты. Multi-диета: веган + халяль + без глютена + без орехов + всеядные в одном заказе с per-group pricing."
        />

        {/* Шаг 1 — формат (виден SSR) */}
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-medium mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm mr-3">1</span>
            Выберите формат
          </h2>
          <p className="text-sm text-muted-foreground mb-6 ml-0 md:ml-11">
            Цены указаны за гостя. Всё включено: еда, персонал, посуда, доставка по КАД.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-0 md:ml-11">
            {formats.map((f) => (
              <a
                key={f.name}
                href={f.href}
                data-format-card={f.slug}
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
        <div className="mb-8 ml-0 md:ml-11 space-y-4">
          <h2 className="font-heading text-2xl font-medium mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-foreground text-sm mr-3">2</span>
            Гости и диеты
          </h2>
          <p className="text-sm text-muted-foreground ml-0 md:ml-11">
            Укажите количество гостей. Включите «Несколько групп гостей» — каждая группа получит своё под-меню
            с фильтром по диете (веган / халяль / без глютена / без орехов / всеядные). Per-group pricing: вы платите только за блюда своей группы.
          </p>


        {/* SSR dish selection — works without JS */}
        <div className="ml-0 md:ml-11 mb-6 p-4 rounded-lg border border-line bg-card">
          <h3 className="font-heading text-base font-medium mb-3">Популярные блюда (отметьте нужные)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { id: 'canape-salmon', name: 'Канапе с лососем', price: '190 ₽' },
              { id: 'canape-cheese', name: 'Канапе с сыром', price: '180 ₽' },
              { id: 'tartlet-chicken', name: 'Тарталетка куриная', price: '160 ₽' },
              { id: 'mini-burger', name: 'Мини-бургер', price: '250 ₽' },
              { id: 'yakitori', name: 'Куриные якитори', price: '220 ₽' },
              { id: 'borscht', name: 'Борщ', price: '280 ₽' },
              { id: 'beef-medallions', name: 'Медальоны из вырезки', price: '580 ₽' },
              { id: 'trout', name: 'Форель с картофельным муссом', price: '520 ₽' },
              { id: 'macaron-shooter', name: 'Макаронс-шутер', price: '220 ₽' },
              { id: 'brownie-shooter', name: 'Брауни-шутер', price: '190 ₽' },
              { id: 'cranberry-mors', name: 'Клюквенный морс', price: '100 ₽' },
              { id: 'seabuckthorn-tea', name: 'Облепиховый чай', price: '120 ₽' },
            ].map(d => (
              <label key={d.id} className="flex items-center gap-2 p-2 rounded border border-line hover:border-gold-text transition-colors cursor-pointer">
                <input type="checkbox" name="dishes" value={d.id} className="accent-gold-text" />
                <span className="text-sm flex-1">{d.name}</span>
                <span className="text-xs text-gold-text font-semibold">{d.price}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Отметьте блюда — менеджер включит их в предложение. Полный интерактивный конструктор с drag-and-drop доступен при включённом JavaScript.
          </p>
        </div>

          {/* Static SSR form for guests (no-JS fallback) */}
          <form className="ml-0 md:ml-11 mt-4 p-4 rounded-lg border border-line bg-card space-y-3" action="/api/quote" method="POST">
            <input type="hidden" name="source" value="constructor-ssr" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs text-muted-foreground block mb-1">Кол-во гостей *</span>
                <input type="number" name="guests" min="6" required placeholder="напр. 25" data-prefill="guests" className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
              </label>
              <label className="block">
                <span className="text-xs text-muted-foreground block mb-1">Дата события</span>
                <input type="date" name="date" data-prefill="date" className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
              </label>
            </div>
            <fieldset className="border border-line rounded p-3">
              <legend className="text-xs font-medium px-2">Группы гостей по диетам (заполните при необходимости)</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
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
                  <span className="text-xs text-muted-foreground block mb-1">Без сахара (СД1)</span>
                  <input type="number" name="groupSugarFree" min="0" placeholder="0" className="w-full rounded border border-line bg-background px-2 py-1.5 text-sm" />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground block mb-1">Без молока</span>
                  <input type="number" name="groupDairyFree" min="0" placeholder="0" className="w-full rounded border border-line bg-background px-2 py-1.5 text-sm" />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground block mb-1">Без яиц</span>
                  <input type="number" name="groupEggFree" min="0" placeholder="0" className="w-full rounded border border-line bg-background px-2 py-1.5 text-sm" />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground block mb-1">Другое</span>
                  <input type="number" name="groupOther" min="0" placeholder="0" className="w-full rounded border border-line bg-background px-2 py-1.5 text-sm" />
                </label>
              </div>
            </fieldset>
            <div>
              <label className="block mb-1">
                <span className="text-xs text-muted-foreground block mb-1">Тариф</span>
              </label>
              <select name="tier" className="w-full rounded border border-line bg-background px-3 py-2 text-sm">
                <option value="">Не выбран</option>
                <option value="economy">Эконом</option>
                <option value="standard">Стандарт</option>
                <option value="premium">Расширенный</option>
                <option value="luxury">Максимальный</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">Цены: Эконом от 390 ₽/гость (кофе-брейк) до 3 950 ₽ (банкет). Максимальный — от 5 950 до 9 950 ₽/гость.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs text-muted-foreground block mb-1">Имя *</span>
                <input type="text" name="name" required autoComplete="name" className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
              </label>
              <label className="block">
                <span className="text-xs text-muted-foreground block mb-1">Телефон *</span>
                <input type="tel" name="phone" required inputMode="tel" autoComplete="tel" placeholder="+7" className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
              </label>
            </div>
            <button type="submit" className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              ✍️ Отправить заявку (no-JS)
            </button>
            <p className="text-xs text-muted-foreground text-center">Менеджер перезвонит ≤15 мин. Или позвоните: +7 (812) 919-59-11.</p>
          </form>

          <h2 className="font-heading text-2xl font-medium mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-foreground text-sm mr-3">3</span>
            Тариф
          </h2>
          <p className="text-sm text-muted-foreground ml-0 md:ml-11">
            Эконом / Стандарт / Расширенный / Максимальный. Цены варьируются от 390 ₽/гость (кофе-брейк) до 9 950 ₽/гость (свадебный люкс).
          </p>

          <h2 className="font-heading text-2xl font-medium mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-foreground text-sm mr-3">4</span>
            Меню
          </h2>
          <p className="text-sm text-muted-foreground ml-0 md:ml-11">
            121 блюдо в каталоге с фото, аллергенами и составом. Менеджер подберёт блюда под
            ваш тариф и диетические требования. Фильтр по 14 аллергенам ТР ТС 022/2011
            доступен в <a href="/menu/catalog" className="underline">каталоге блюд</a>.
          </p>

          <h2 className="font-heading text-2xl font-medium mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-foreground text-sm mr-3">5</span>
            Контакты и отправка
          </h2>
          <p className="text-sm text-muted-foreground ml-0 md:ml-11">
            Заполняете имя + телефон — заявка уходит на <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>.
            Получаете orderId и перезвон в течение 15 минут.
          </p>
        </div>

        {/* Quick budget calculator link + No-JS fallback */}
        <div className="ml-0 md:ml-11 p-6 rounded-xl border-2 border-gold-tint bg-gold-tint/5">
          <h3 className="font-heading text-lg font-medium mb-2">Быстрый расчёт бюджета</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Не хотите собирать вручную? Посмотрите цены в калькуляторе или позвоните — шеф-повар Дмитрий Нилов подберёт меню под ваш бюджет.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/plan/calculator"
              className="rounded-lg bg-gold-text text-white px-5 py-2.5 text-sm font-semibold hover:bg-gold-text/90 transition-colors no-underline"
            >
              💰 Калькулятор бюджета →
            </Link>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="rounded-lg border border-line bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:border-gold-text transition-colors no-underline"
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
            <strong>Внимание:</strong> полная интерактивная версия конструктора требует JavaScript. Выше — SSR-форма заявки, которая работает без JS..
            Вы можете выбрать формат выше или связаться напрямую по телефону{' '}
            <a href={`tel:${SITE.phoneTel}`} className="underline">{SITE.phone}</a>.
          </div>
        </noscript>

        {/* URL prefill script — reads guests/date/format/tier from URL, highlights active format card */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){
            try {
              var sp = new URLSearchParams(window.location.search);

              // Prefill form fields
              var fields = ['guests', 'date'];
              fields.forEach(function(name) {
                var val = sp.get(name);
                if (!val) return;
                var el = document.querySelector('[data-prefill="' + name + '"]');
                if (el) el.value = val;
              });

              // Highlight active format card
              var fmt = sp.get('format');
              if (fmt) {
                var card = document.querySelector('[data-format-card="' + fmt + '"]');
                if (card) {
                  card.style.borderColor = 'var(--color-gold, #B08D57)';
                  card.style.borderWidth = '2px';
                  card.style.background = 'var(--color-gold-tint, #EFE6D6)';
                  card.setAttribute('aria-current', 'true');
                  // Add checkmark badge
                  var badge = document.createElement('div');
                  badge.textContent = '✓ Выбрано';
                  badge.style.cssText = 'position:absolute;top:8px;right:8px;background:var(--color-gold,#B08D57);color:#fff;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:600';
                  card.style.position = 'relative';
                  card.appendChild(badge);
                }
              }

              // Highlight active tier in the tier select
              var tier = sp.get('tier');
              if (tier) {
                var tierSelect = document.querySelector('[name="tier"]');
                if (tierSelect) {
                  for (var i = 0; i < tierSelect.options.length; i++) {
                    if (tierSelect.options[i].value === tier) {
                      tierSelect.selectedIndex = i;
                      break;
                    }
                  }
                }
              }
            } catch (e) { console.warn('prefill error:', e); }
          })();`
        }} />
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
