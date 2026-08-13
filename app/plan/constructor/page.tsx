import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ConstructorWizard from "@/components/interactive/ConstructorWizard";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ShareButton from "@/components/common/ShareButton";
import PageHeader from "@/components/common/PageHeader";
import FoodPhoto from "@/components/common/FoodPhoto";
import { SITE } from "@/lib/data";
import { getDishImage, getObjectPositionForDish } from "@/lib/dish-images";

export const metadata: Metadata = {
  alternates: {
    canonical: "/plan/constructor",
    languages: { ru: "/plan/constructor", "x-default": "/plan/constructor" },
  },
  title: "Заявка на подбор меню — соберите кейтеринг под ваше событие",
  description:
    "Соберите меню под ваше событие за 2 минуты. Фуршет от 2 450 ₽/гость, банкет от 3 950 ₽/гость, кофе-брейк от 390 ₽/гость. Мульти-диета: веган + халяль + без глютена + без орехов + всеядные в одном заказе.",
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
      name: "Фуршет",
      slug: "furshet",
      emoji: "🥂",
      img: "/images/menu/kanape/k1.jpg",
      price: "от 2 450 ₽/гость",
      minGuests: "мин. 20 гостей",
      desc: "Гости едят стоя, лёгкие закуски, можно свободно ходить",
      href: "/plan/constructor?format=furshet",
    },
    {
      name: "Банкет",
      slug: "banket",
      emoji: "🍽",
      img: "/images/real/beef-medallions.jpg",
      price: "от 3 950 ₽/гость",
      minGuests: "мин. 15 гостей",
      desc: "Посадка за стол, официанты, классическая подача",
      href: "/plan/constructor?format=banket",
    },
    {
      name: "Кофе-брейк",
      slug: "coffee-break",
      emoji: "☕",
      img: "/images/menu/deserty/d1.jpg",
      price: "от 390 ₽/гость",
      minGuests: "мин. 10 гостей",
      desc: "Кофе и десерты в перерыве мероприятия",
      href: "/plan/constructor?format=coffee-break",
    },
    {
      name: "Детский праздник",
      slug: "detskoe",
      emoji: "🧒",
      img: "/images/menu/goryachee/h1.jpg",
      price: "от 1 550 ₽/гость",
      minGuests: "мин. 10 детей",
      desc: "Специальное меню и развлечения для детей",
      href: "/plan/constructor?format=detskoe",
    },
    {
      name: "Выезд шефа",
      slug: "chef-at-home",
      emoji: "👨\u200d🍳",
      img: "/images/dishes-new/beef-steak.jpg",
      price: "от 4 500 ₽/гость",
      minGuests: "мин. 6 гостей",
      desc: "Шеф-повар и сомелье у вас дома",
      href: "/plan/constructor?format=chef-at-home",
    },
    {
      name: "Мобильный фуршет",
      slug: "mobile-furshet",
      emoji: "🚚",
      img: "/images/real/canape-platter.jpg",
      price: "от 2 450 ₽/гость",
      minGuests: "мин. 10 гостей",
      desc: "Выезд на площадку без кухни",
      href: "/plan/constructor?format=mobile-furshet",
    },
    {
      name: "Поминки",
      slug: "pominki",
      emoji: "🕯",
      img: "/images/real/salmon-dish.jpg",
      price: "от 1 800 ₽/гость",
      minGuests: "мин. 10 гостей",
      desc: "Поминальный обед по православной традиции. Кутья, блины, кисель, рыба. Без алкоголя.",
      href: "/events/pominki",
    },
  ];

  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-4xl">
        <Breadcrumbs />

        <PageHeader
          title="Подбор меню"
          eyebrow="Конструктор меню"
          subtitle="Соберите меню под ваше событие за 2 минуты. Выберите формат — подберём меню под ваш бюджет и диеты. Мульти-диета: веган + халяль + без глютена + без орехов + всеядные в одном заказе с цена по группам."
        />

        {/* Шаг 1 — формат (виден SSR) */}
        <div className="mb-8">
          <h2 className="font-heading mb-2 text-2xl font-medium">
            <span className="bg-primary text-primary-foreground mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm">
              1
            </span>{" "}
            Выберите формат
          </h2>
          <p className="text-muted-foreground mb-6 ml-0 text-sm md:ml-11">
            Цены указаны за гостя. Всё включено: еда, персонал, посуда, доставка по КАД.
          </p>
          <div className="ml-0 grid grid-cols-1 gap-4 md:ml-11 md:grid-cols-2 lg:grid-cols-3">
            {formats.map((f) => (
              <a
                key={f.name}
                href={f.href}
                data-format-card={f.slug}
                className="group border-line bg-card hover:border-gold-text block overflow-hidden rounded-xl border no-underline transition-all hover:shadow-lg"
              >
                {/* W85: Photo on top */}
                <div className="bg-secondary relative aspect-[4/3] overflow-hidden">
                  <FoodPhoto
                    src={f.img}
                    alt={f.name}
                    aspectRatio="wide"
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute right-3 bottom-2 left-3 text-white">
                    <div className="font-heading text-lg font-semibold">{f.name}</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-muted-foreground mt-1 text-sm">{f.desc}</div>
                  <div className="text-gold-text mt-3 text-base font-semibold">{f.price}</div>
                  <div className="text-muted-foreground mt-1 text-xs">{f.minGuests}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Шаг 2-5 — preview (видны SSR как roadmap) */}
        <div className="mb-8 ml-0 space-y-4 md:ml-11">
          <h2 className="font-heading mb-2 text-2xl font-medium">
            <span className="bg-muted text-foreground mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm">
              2
            </span>{" "}
            Гости и диеты
          </h2>
          <p className="text-muted-foreground ml-0 text-sm md:ml-11">
            Укажите количество гостей. Включите «Несколько групп гостей» — каждая группа получит
            своё под-меню с фильтром по диете (веган / халяль / без глютена / без орехов /
            всеядные). Цена по группам: вы платите только за блюда своей группы.
          </p>

          {/* SSR dish selection — works without JS */}
          <div className="border-line bg-card mb-6 ml-0 rounded-lg border p-4 md:ml-11">
            <h3 className="font-heading mb-3 text-base font-medium">
              Популярные блюда (отметьте нужные)
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {[
                { id: "canape-salmon", name: "Канапе с лососем", price: "190 ₽" },
                { id: "canape-cheese", name: "Канапе с сыром", price: "180 ₽" },
                { id: "tartlet-chicken", name: "Тарталетка куриная", price: "160 ₽" },
                { id: "mini-burger", name: "Мини-бургер", price: "250 ₽" },
                { id: "yakitori", name: "Куриные якитори", price: "220 ₽" },
                { id: "borscht", name: "Борщ", price: "280 ₽" },
                { id: "beef-medallions", name: "Медальоны из вырезки", price: "580 ₽" },
                { id: "trout", name: "Форель с картофельным муссом", price: "520 ₽" },
                { id: "macaron-shooter", name: "Макаронс-шутер", price: "220 ₽" },
                { id: "brownie-shooter", name: "Брауни-шутер", price: "190 ₽" },
                { id: "cranberry-mors", name: "Клюквенный морс", price: "100 ₽" },
                { id: "seabuckthorn-tea", name: "Облепиховый чай", price: "120 ₽" },
              ].map((d) => (
                <label
                  key={d.id}
                  className="border-line hover:border-gold-text flex cursor-pointer items-center gap-3 rounded border p-2 transition-colors"
                >
                  <input
                    type="checkbox"
                    name="dishes"
                    value={d.id}
                    className="accent-gold-text shrink-0"
                  />
                  <div className="bg-secondary h-12 w-12 shrink-0 overflow-hidden rounded">
                    <FoodPhoto
                      src={getDishImage(d.id, "cold")}
                      alt={d.name}
                      aspectRatio="square"
                      objectPosition={getObjectPositionForDish(d.id, "cold")}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-foreground block text-sm font-medium">{d.name}</span>
                    <span className="text-gold-text text-xs font-semibold">{d.price}</span>
                  </div>
                </label>
              ))}
            </div>
            <p className="text-muted-foreground mt-3 text-xs">
              Отметьте блюда — менеджер включит их в предложение. Полный интерактивный конструктор с
              перетаскиванием элементов доступен при включённом JavaScript.
            </p>
            <div className="mt-4">
              <ShareButton
                title="Моё меню — NiloV Catering"
                text="Посмотри меню — нужно согласовать"
                label="Отправить ссылку родным/коллегам"
              />
            </div>
          </div>

          {/* Static SSR form for guests (no-JS fallback) */}
          <form
            className="border-line bg-card mt-4 ml-0 space-y-3 rounded-lg border p-4 md:ml-11"
            action="/api/quote"
            method="POST"
          >
            <input type="hidden" name="source" value="constructor-ssr" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-muted-foreground mb-1 block text-xs">Кол-во гостей *</span>
                <input
                  type="number"
                  name="guests"
                  min="6"
                  required
                  placeholder="напр. 25"
                  data-prefill="guests"
                  className="border-line bg-background w-full rounded border px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-muted-foreground mb-1 block text-xs">Дата события</span>
                <input
                  type="date"
                  name="date"
                  data-prefill="date"
                  className="border-line bg-background w-full rounded border px-3 py-2 text-sm"
                />
              </label>
            </div>
            <fieldset className="border-line rounded border p-3">
              <legend className="px-2 text-xs font-medium">
                Группы гостей по диетам (заполните при необходимости)
              </legend>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                <label className="block">
                  <span className="text-muted-foreground mb-1 block text-xs">Всеядные</span>
                  <input
                    type="number"
                    name="groupOmnivore"
                    min="0"
                    placeholder="0"
                    className="border-line bg-background w-full rounded border px-2 py-1.5 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-muted-foreground mb-1 block text-xs">Веганы</span>
                  <input
                    type="number"
                    name="groupVegan"
                    min="0"
                    placeholder="0"
                    className="border-line bg-background w-full rounded border px-2 py-1.5 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-muted-foreground mb-1 block text-xs">Халяль</span>
                  <input
                    type="number"
                    name="groupHalal"
                    min="0"
                    placeholder="0"
                    className="border-line bg-background w-full rounded border px-2 py-1.5 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-muted-foreground mb-1 block text-xs">Без глютена</span>
                  <input
                    type="number"
                    name="groupGlutenFree"
                    min="0"
                    placeholder="0"
                    className="border-line bg-background w-full rounded border px-2 py-1.5 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-muted-foreground mb-1 block text-xs">Без орехов</span>
                  <input
                    type="number"
                    name="groupNutFree"
                    min="0"
                    placeholder="0"
                    className="border-line bg-background w-full rounded border px-2 py-1.5 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-muted-foreground mb-1 block text-xs">Без сахара (СД1)</span>
                  <input
                    type="number"
                    name="groupSugarFree"
                    min="0"
                    placeholder="0"
                    className="border-line bg-background w-full rounded border px-2 py-1.5 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-muted-foreground mb-1 block text-xs">Без молока</span>
                  <input
                    type="number"
                    name="groupDairyFree"
                    min="0"
                    placeholder="0"
                    className="border-line bg-background w-full rounded border px-2 py-1.5 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-muted-foreground mb-1 block text-xs">Без яиц</span>
                  <input
                    type="number"
                    name="groupEggFree"
                    min="0"
                    placeholder="0"
                    className="border-line bg-background w-full rounded border px-2 py-1.5 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-muted-foreground mb-1 block text-xs">Другое</span>
                  <input
                    type="number"
                    name="groupOther"
                    min="0"
                    placeholder="0"
                    className="border-line bg-background w-full rounded border px-2 py-1.5 text-sm"
                  />
                </label>
              </div>
            </fieldset>
            <div>
              <label className="mb-1 block">
                <span className="text-muted-foreground mb-1 block text-xs">Тариф</span>
              </label>
              <select
                name="tier"
                className="border-line bg-background w-full rounded border px-3 py-2 text-sm"
              >
                <option value="">Не выбран</option>
                <option value="economy">Эконом</option>
                <option value="standard">Стандарт</option>
                <option value="premium">Расширенный</option>
                <option value="luxury">Максимальный</option>
              </select>
              <p className="text-muted-foreground mt-1 text-xs">
                Цены: Эконом от 390 ₽/гость (кофе-брейк) до 3 950 ₽ (банкет). Максимальный — от 2
                450 (кофе-брейк) до 9 950 ₽/гость (свадебный люкс).
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-muted-foreground mb-1 block text-xs">Имя *</span>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  className="border-line bg-background w-full rounded border px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-muted-foreground mb-1 block text-xs">Телефон *</span>
                <input
                  type="tel"
                  name="phone"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+7"
                  className="border-line bg-background w-full rounded border px-3 py-2 text-sm"
                />
              </label>
            </div>
            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] w-full items-center rounded-lg py-2.5 text-sm font-semibold transition-colors"
            >
              Отправить заявку (без JS)
            </button>
            <p className="text-muted-foreground text-center text-xs">
              Менеджер перезвонит ≤15 мин. Или позвоните: +7 (812) 919-59-11.
            </p>
          </form>

          <h2 className="font-heading mb-2 text-2xl font-medium">
            <span className="bg-muted text-foreground mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm">
              3
            </span>{" "}
            Тариф
          </h2>
          <p className="text-muted-foreground ml-0 text-sm md:ml-11">
            Эконом / Стандарт / Расширенный / Максимальный. Цены варьируются от 390 ₽/гость
            (кофе-брейк) до 9 950 ₽/гость (свадебный люкс).
          </p>

          <h2 className="font-heading mb-2 text-2xl font-medium">
            <span className="bg-muted text-foreground mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm">
              4
            </span>{" "}
            Меню
          </h2>
          <p className="text-muted-foreground ml-0 text-sm md:ml-11">
            124 блюда в каталоге с фото, аллергенами и составом. Менеджер подберёт блюда под ваш
            тариф и диетические требования. Фильтр по 14 аллергенам ТР ТС 022/2011 доступен в{" "}
            <a href="/menu/catalog" className="underline">
              каталоге блюд
            </a>
            .
          </p>

          <h2 className="font-heading mb-2 text-2xl font-medium">
            <span className="bg-muted text-foreground mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm">
              5
            </span>{" "}
            Контакты и отправка
          </h2>
          <p className="text-muted-foreground ml-0 text-sm md:ml-11">
            Заполняете имя + телефон — заявка уходит на{" "}
            <a href={`mailto:${SITE.email}`} className="underline">
              {SITE.email}
            </a>
            . Получаете номер заявки и перезвон в течение 15 минут.
          </p>
        </div>

        {/* Quick budget calculator link + No-JS fallback */}
        <div className="border-gold-tint bg-gold-tint/5 ml-0 rounded-xl border-2 p-6 md:ml-11">
          <h3 className="font-heading mb-2 text-lg font-medium">Быстрый расчёт бюджета</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Не хотите собирать вручную? Посмотрите цены в калькуляторе или позвоните — шеф-повар
            Дмитрий Нилов подберёт меню под ваш бюджет.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/plan/calculator"
              className="bg-gold-text hover:bg-gold-text/90 inline-flex min-h-[44px] items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors"
            >
              Калькулятор бюджета →
            </Link>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="border-line bg-card text-foreground hover:border-gold-text inline-flex min-h-[44px] items-center rounded-lg border px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              {SITE.phone}
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="border-line bg-card hover:border-gold-text inline-flex min-h-[44px] items-center rounded-lg border px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              WhatsApp
            </a>
            <Link
              href="/contact"
              className="border-line bg-card hover:border-gold-text inline-flex min-h-[44px] items-center rounded-lg border px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Заполнить форму
            </Link>
          </div>
        </div>

        <noscript>
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Внимание:</strong> полная интерактивная версия конструктора требует JavaScript.
            Выше — статичная форма заявки, которая работает без JS. Вы можете выбрать формат выше
            или связаться напрямую по телефону{" "}
            <a href={`tel:${SITE.phoneTel}`} className="underline">
              {SITE.phone}
            </a>
            .
          </div>
        </noscript>

        {/* URL prefill script — reads guests/date/format/tier from URL, highlights active format card */}
        <script
          dangerouslySetInnerHTML={{
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
                  badge.textContent = 'Выбрано';
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
          })();`,
          }}
        />
      </div>
    </main>
  );
}

export default function ConstructorPage() {
  return (
    <Suspense fallback={<ConstructorServerFallback />}>
      <ConstructorWizard />
    </Suspense>
  );
}
