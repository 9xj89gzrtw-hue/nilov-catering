import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata: Metadata = {
  alternates: { canonical: '/plan/helper', languages: { 'ru': '/plan/helper', 'en': '/en', 'x-default': '/plan/helper' } },
  title: 'Помощник выбора кейтеринга — 3 вопроса, 30 секунд',
  description: 'Ответьте на 3 простых вопроса — подберём идеальный формат кейтеринга: повод, гостей, место. Без регистрации, без телефона.',
};

const OCCASIONS = [
  { label: 'Свадьба', emoji: '💍', format: 'banket' },
  { label: 'Корпоратив', emoji: '🏢', format: 'banket' },
  { label: 'День рождения', emoji: '🎂', format: 'furshet' },
  { label: 'Детский праздник', emoji: '🧒', format: 'detskoe' },
  { label: 'Выпускной', emoji: '🎓', format: 'banket' },
  { label: 'Юбилей', emoji: '🏅', format: 'banket' },
  { label: 'Конференция', emoji: '🎤', format: 'coffee-break' },
  { label: 'Просто ужин', emoji: '🍽️', format: 'furshet' },
];

const GUEST_RANGES = [
  { label: 'до 20 гостей', value: '0-20' },
  { label: '20–50 гостей', value: '20-50' },
  { label: '50–100 гостей', value: '50-100' },
  { label: '100–200 гостей', value: '100-200' },
  { label: '200+ гостей', value: '200+' },
];

// All possible locations
const ALL_LOCATIONS = [
  { label: 'Дома', emoji: '🏠' },
  { label: 'В офисе', emoji: '💼' },
  { label: 'На площадке (лофт/ресторан)', emoji: '🏛️' },
  { label: 'На природе', emoji: '🌳' },
  { label: 'Пока не знаю', emoji: '🤔' },
] as const;

/**
 * W93-v7 FIX: Filter locations by occasion.
 * - Wedding/Юбилей/Выпускной/Детский → no "В офисе" (doesn't make sense)
 * - Conference/Корпоратив → "В офисе" allowed
 * - Просто ужин → no "На природе" (private dinner)
 */
function getLocationsForOccasion(occasion: string | undefined): readonly { label: string; emoji: string }[] {
  if (!occasion) return ALL_LOCATIONS;
  // Office-appropriate occasions
  const officeOk = ['Корпоратив', 'Конференция'].includes(occasion);
  // Outdoor-appropriate occasions (not private dinner)
  const outdoorOk = !['Просто ужин', 'Детский праздник'].includes(occasion);
  // Home-appropriate (small events only)
  const homeOk = ['День рождения', 'Юбилей', 'Просто ужин', 'Детский праздник'].includes(occasion);

  return ALL_LOCATIONS.filter((loc) => {
    if (loc.label === 'В офисе') return officeOk;
    if (loc.label === 'На природе') return outdoorOk;
    if (loc.label === 'Дома') return homeOk;
    return true; // На площадке, Пока не знаю — always OK
  });
}

const OCCASION_TO_PAGE: Record<string, string> = {
  'Свадьба': '/events/svadba',
  'Корпоратив': '/events/korporativ',
  'День рождения': '/events/chastnoe',
  'Детский праздник': '/events/detskoe',
  'Выпускной': '/events/vypusknoy',
  'Юбилей': '/events/chastnoe',
  'Конференция': '/events/korporativ',
  'Просто ужин': '/events/chef-at-home',
};

// Recommended package per occasion+guests (W93-v7: real recommendation, not empty)
function getRecommendation(occasion: string, guests: string): { name: string; price: number; minGuests: number; tier: string; format: string; whatIncluded: string[] } | null {
  const small = guests === '0-20';
  const med = guests === '20-50';
  const large = guests === '50-100' || guests === '100-200' || guests === '200+';

  switch (occasion) {
    case 'Свадьба':
      if (small) return { name: 'Свадьба «Стандарт»', price: 5470, minGuests: 15, tier: 'Стандарт', format: 'banket', whatIncluded: ['2 холодные закуски, салат, горячее, гарнир, десерт', 'Вино (1 бокал) + игристое на welcome', 'Официант 1/10', 'Свадебный торт включён', 'Координатор события'] };
      if (med) return { name: 'Свадьба «Расширенный»', price: 7350, minGuests: 15, tier: 'Расширенный', format: 'banket', whatIncluded: ['3 холодные закуски, 2 салата, 2 горячих', 'Рыбное блюдо + сырная тарелка', 'Вино (2 бокала) + игристое', 'Свадебный торт + десерты', 'Координатор + сомелье (опц.)'] };
      return { name: 'Свадьба «Максимальный»', price: 9950, minGuests: 15, tier: 'Максимальный', format: 'banket', whatIncluded: ['4 холодные закуски, 2 салата, 2 горячих', 'Рыбное блюдо + сырная тарелка + 3 десерта', 'Премиум-бар: шампанское, вина, дижестивы', 'Свадебный торт премиум', 'Координатор + сомелье + флорист (опц.)'] };
    case 'Корпоратив':
      if (small) return { name: 'Корпоратив «Фуршет Стандарт»', price: 2450, minGuests: 20, tier: 'Стандарт', format: 'furshet', whatIncluded: ['Канапе (6 видов), тарталетки, брускетты', 'Сырная тарелка, рыбное ассорти', 'Соки, морсы, лимонады', 'Официант 1/15', 'Фуршетная сервировка'] };
      if (med) return { name: 'Корпоратив «Банкет Стандарт»', price: 5470, minGuests: 15, tier: 'Стандарт', format: 'banket', whatIncluded: ['2 холодные закуски, салат, горячее', 'Говядина/лосось на выбор', 'Вино (1 бокал), чай/кофе', 'Официант 1/10', 'Координатор'] };
      return { name: 'Корпоратив «Фуршет Расширенный»', price: 5950, minGuests: 20, tier: 'Расширенный', format: 'furshet', whatIncluded: ['Канапе (8 видов), брускетты, тартар', 'Карпаччо, сыры, морепродукты', 'Игристое, вино, коктейли', 'Официант 1/12', 'Шоу-станция (опц.)'] };
    case 'День рождения':
      if (small) return { name: 'День рождения «Фуршет Эконом»', price: 2450, minGuests: 20, tier: 'Эконом', format: 'furshet', whatIncluded: ['Канапе (4 вида), тарталетки', 'Мини-бургеры, овощная нарезка', 'Безалкогольные напитки', 'Официант 1/15', 'Фуршетная сервировка'] };
      return { name: 'День рождения «Фуршет Стандарт»', price: 3950, minGuests: 20, tier: 'Стандарт', format: 'furshet', whatIncluded: ['Канапе (6 видов), тарталетки, брускетты', 'Сырная тарелка, рыбное ассорти', 'Соки, морсы, лимонады', 'Официант 1/15', 'Торт включён'] };
    case 'Детский праздник':
      return { name: 'Детский праздник «Стандарт»', price: 1550, minGuests: 10, tier: 'Эконом', format: 'detskoe', whatIncluded: ['Мини-пицца, наггетсы, канапе без аллергенов', 'Фруктовая тарелка, соки', 'Капкейки, мармелад', 'Аниматор (опц.)', 'Посуда яркая, небьющаяся'] };
    case 'Выпускной':
      if (small) return { name: 'Выпускной «Банкет Эконом»', price: 3950, minGuests: 15, tier: 'Эконом', format: 'banket', whatIncluded: ['Холодная закуска, салат, горячее', 'Курица/рыба на выбор', 'Гарнир, хлебная корзина', 'Чай/кофе', 'Официант 1/10'] };
      return { name: 'Выпускной «Банкет Стандарт»', price: 5470, minGuests: 15, tier: 'Стандарт', format: 'banket', whatIncluded: ['2 холодные закуски, салат, горячее', 'Говядина/лосось', 'Десерт, вино (1 бокал)', 'Чай/кофе', 'Координатор'] };
    case 'Юбилей':
      if (small) return { name: 'Юбилей «Банкет Эконом»', price: 3950, minGuests: 15, tier: 'Эконом', format: 'banket', whatIncluded: ['Холодная закуска, салат, горячее', 'Гарнир, хлебная корзина', 'Чай/кофе', 'Торт включён', 'Официант 1/10'] };
      return { name: 'Юбилей «Банкет Стандарт»', price: 5470, minGuests: 15, tier: 'Стандарт', format: 'banket', whatIncluded: ['2 холодные закуски, салат, горячее', 'Говядина/лосось', 'Десерт, вино (1 бокал)', 'Чай/кофе', 'Координатор'] };
    case 'Конференция':
      return { name: 'Кофе-брейк «Стандарт»', price: 1450, minGuests: 10, tier: 'Стандарт', format: 'coffee-break', whatIncluded: ['Выпечка (5 видов)', 'Канапе, фрукты', 'Соки, чай, кофе', 'Бумажная посуда', 'Доставка по КАД'] };
    case 'Просто ужин':
      return { name: 'Шеф на дом', price: 4500, minGuests: 6, tier: 'Стандарт', format: 'chef-at-home', whatIncluded: ['5 перемен блюд от шеф-повара', 'Премиум-фарфор', 'Сервировка и уборка', 'Все продукты включены', 'Сомелье (опц.)'] };
    default:
      return null;
  }
}

export default async function PlanHelperPage({
  searchParams,
}: {
  searchParams: Promise<{ occasion?: string; guests?: string; location?: string }>;
}) {
  const { occasion, guests, location } = await searchParams;
  const step = !occasion ? 0 : !guests ? 1 : !location ? 2 : 3;

  // Финальный экран
  if (step === 3 && occasion && guests && location) {
    const eventPage = OCCASION_TO_PAGE[occasion] || '/pricing';
    const formatMatch = OCCASIONS.find((o) => o.label === occasion);
    const format = formatMatch?.format || 'furshet';
    const recommendation = getRecommendation(occasion, guests);
    const formatLabel = format === 'banket' ? 'Банкет' : format === 'furshet' ? 'Фуршет' : format === 'coffee-break' ? 'Кофе-брейк' : format === 'detskoe' ? 'Детский кейтеринг' : 'Выезд шефа';

    return (
      <main id="main" className="pt-24 pb-20">
        <div className="container-site max-w-2xl mx-auto">
          <Breadcrumbs />

          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-xs uppercase tracking-[0.18em] text-gold-text font-semibold mb-2">Готово</p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-3 leading-tight">
              Вот что мы подобрали
            </h1>
            <p className="text-lg text-muted-foreground">
              <strong className="text-foreground">{occasion}</strong>
              {' · '}
              <strong className="text-foreground">{guests}</strong>
              {' · '}
              <strong className="text-foreground">{location}</strong>
            </p>
          </div>

          {/* W93-v7: Real recommendation card, not empty */}
          {recommendation && (
            <div className="p-6 rounded-xl border-2 border-gold-text bg-card mb-6 shadow-lg shadow-gold/10">
              <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
                <h2 className="font-heading text-xl font-medium">{recommendation.name}</h2>
                <span className="inline-block text-xs bg-gold-text text-white px-2 py-0.5 rounded-full font-semibold">{recommendation.tier}</span>
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-gold-text">{recommendation.price.toLocaleString('ru-RU')}</span>
                <span className="text-sm text-muted-foreground">₽/гость · мин. {recommendation.minGuests} гостей</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Формат: <strong className="text-foreground">{formatLabel}</strong>. Подобрали под ваш повод и количество гостей.
              </p>
              <ul className="space-y-1.5 mb-4">
                {recommendation.whatIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-gold-text mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground">
                Цена предварительная. Финальная смета — после согласования меню и логистики.
              </p>
            </div>
          )}

          <div className="p-6 rounded-xl border border-line bg-card mb-6">
            <h2 className="font-heading text-xl font-medium mb-3">Что дальше</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link
                href={eventPage}
                className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline text-center"
              >
                📄 Открыть страницу события
              </Link>
              <Link
                href={`/plan/constructor?format=${format}`}
                className="rounded-lg border border-line bg-background px-5 py-3 text-sm font-semibold hover:border-gold-text transition-colors no-underline text-center"
              >
                ✨ Собрать меню в конструкторе
              </Link>
              <Link
                href="/pricing"
                className="rounded-lg border border-line bg-background px-5 py-3 text-sm font-semibold hover:border-gold-text transition-colors no-underline text-center"
              >
                💰 Смотреть все тарифы
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-line bg-background px-5 py-3 text-sm font-semibold hover:border-gold-text transition-colors no-underline text-center"
              >
                ✍️ Оставить заявку
              </Link>
            </div>
          </div>

          <div className="text-center">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-block rounded-lg border-2 border-gold-text px-6 py-3 text-base font-semibold text-foreground hover:bg-gold-tint/10 transition-colors no-underline mr-3"
            >
              📞 {SITE.phone}
            </a>
            <Link
              href="/plan/helper"
              className="inline-block text-sm text-muted-foreground hover:text-foreground mt-2"
            >
              ↺ Начать заново
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // W93-v7: Filter locations by occasion (no "В офисе" for weddings etc.)
  const locations = step === 2 ? getLocationsForOccasion(occasion) : ALL_LOCATIONS;

  const current = step === 0
    ? { q: 'Какой повод?', opts: OCCASIONS.map((o) => ({ label: o.label, emoji: o.emoji })), key: 'occasion' as const }
    : step === 1
    ? { q: 'Сколько гостей?', opts: GUEST_RANGES.map((g) => ({ label: g.label, emoji: '' })), key: 'guests' as const }
    : { q: 'Где проходит?', opts: locations.map((l) => ({ label: l.label, emoji: l.emoji })), key: 'location' as const };

  const buildHref = (value: string) => {
    const params = new URLSearchParams();
    if (occasion) params.set('occasion', occasion);
    if (guests) params.set('guests', guests);
    if (step === 0) params.set('occasion', value);
    if (step === 1) params.set('guests', value);
    if (step === 2) params.set('location', value);
    return `/plan/helper?${params.toString()}`;
  };

  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-2xl mx-auto">
        <Breadcrumbs />

        {/* Progress bar */}
        <div className="flex gap-1 mb-10" role="progressbar" aria-label={`Шаг ${step + 1} из 3`} aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={3}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                i < step ? 'bg-gold-text' : i === step ? 'bg-gold-text/50' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.18em] text-gold-text font-semibold mb-2">
            Шаг {step + 1} из 3
          </p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-3 leading-tight">
            {current.q}
          </h1>
          <p className="text-base text-muted-foreground mb-3">
            От 390 ₽/гость — всё включено. Рассчитаем за 15 минут. Без скрытых платежей.
          </p>
        </div>

        <div className="space-y-3">
          {current.opts.map((opt) => (
            <Link
              key={opt.label}
              href={buildHref(opt.label)}
              className={`block w-full rounded-xl border p-5 text-left transition-all no-underline ${
                step === 0 && occasion === opt.label
                  ? 'border-gold-text bg-gold-tint ring-1 ring-gold-text text-foreground'
                  : step === 1 && guests === opt.label
                  ? 'border-gold-text bg-gold-tint ring-1 ring-gold-text text-foreground'
                  : step === 2 && location === opt.label
                  ? 'border-gold-text bg-gold-tint ring-1 ring-gold-text text-foreground'
                  : 'border-line bg-card hover:border-gold-text text-foreground'
              }`}
            >
              {opt.emoji && <span className="text-2xl mr-3">{opt.emoji}</span>}
              <span className="font-medium">{opt.label}</span>
            </Link>
          ))}
        </div>

        {step > 0 && (
          <Link
            href={step === 1 ? '/plan/helper' : step === 2 ? `/plan/helper?occasion=${encodeURIComponent(occasion!)}` : '/plan/helper'}
            className="inline-block mt-6 text-sm text-muted-foreground hover:text-foreground"
          >
            ← Назад
          </Link>
        )}

        <div className="mt-12 p-4 rounded-lg bg-secondary/50 text-center text-sm text-muted-foreground">
          Не хотите проходить опрос?{' '}
          <Link href="/pricing" className="text-gold-text hover:underline">Сразу к тарифам →</Link>
          {' '}или{' '}
          <a href={`tel:${SITE.phoneTel}`} className="text-gold-text hover:underline">позвоните {SITE.phone}</a>
        </div>
      </div>
    </main>
  );
}
// W88 deploy Sun Aug  9 16:52:14 UTC 2026
