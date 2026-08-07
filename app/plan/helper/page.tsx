import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  alternates: { canonical: '/plan/helper', languages: { 'ru': '/plan/helper', 'en': '/en', 'x-default': '/plan/helper' } },
  title: 'Помощник выбора кейтеринга — 3 вопроса, 30 секунд',
  description: 'Ответьте на 3 простых вопроса — подберём идеальный формат кейтеринга: повод, гостей, место. Без регистрации, без телефона.',
};

const OCCASIONS = [
  { label: 'Свадьба',           format: 'banket',       photo: 'wedding-banquet' },
  { label: 'Корпоратив',         format: 'banket',       photo: 'corporate-buffet' },
  { label: 'День рождения',      format: 'furshet',      photo: 'canape-platter' },
  { label: 'Детский праздник',   format: 'detskoe',      photo: 'dessert-table' },
  { label: 'Выпускной',          format: 'banket',       photo: 'canape-platter' },
  { label: 'Юбилей',             format: 'banket',       photo: 'beef-medallions' },
  { label: 'Конференция',        format: 'coffee-break', photo: 'coffee-drink' },
  { label: 'Шеф на дом',         format: 'chef-at-home', photo: 'salmon-dish' },
  { label: 'Поминки',            format: 'pominki',      photo: 'salmon-dish' },
  { label: 'Никах',              format: 'banket',       photo: 'grilled-chicken' },
];

const GUEST_RANGES = [
  { label: 'до 20 гостей',  value: '0-20',   desc: 'камерный формат' },
  { label: '20–50 гостей',  value: '20-50',  desc: 'среднее событие' },
  { label: '50–100 гостей', value: '50-100', desc: 'большой праздник' },
  { label: '100–200 гостей', value: '100-200', desc: 'крупное событие' },
  { label: '200+ гостей',   value: '200+',   desc: 'гала-формат' },
];

const LOCATIONS = [
  { label: 'Дома',                          desc: 'Шеф приедет к вам на кухню' },
  { label: 'В офисе',                       desc: 'Привезём фуршет или банкет' },
  { label: 'На площадке (лофт/ресторан)',   desc: 'Сервировка с нуля' },
  { label: 'На природе',                    desc: 'Шатёр, мангал, фуршет-станции' },
  { label: 'Пока не знаю',                  desc: 'Подскажем площадки под ваш бюджет' },
];

const OCCASION_TO_PAGE: Record<string, string> = {
  'Свадьба': '/events/svadba',
  'Корпоратив': '/events/korporativ',
  'День рождения': '/events/chastnoe',
  'Детский праздник': '/events/detskoe',
  'Выпускной': '/events/vypusknoy',
  'Юбилей': '/events/yubiley',
  'Конференция': '/events/korporativ',
  'Шеф на дом': '/events/chef-at-home',
  'Поминки': '/events/pominki',
  'Никах': '/events/nikah',
};

const OCCASION_PHOTO: Record<string, string> = {
  'Свадьба': 'wedding-banquet',
  'Корпоратив': 'corporate-buffet',
  'День рождения': 'canape-platter',
  'Детский праздник': 'dessert-table',
  'Выпускной': 'canape-platter',
  'Юбилей': 'beef-medallions',
  'Конференция': 'coffee-drink',
  'Шеф на дом': 'salmon-dish',
  'Поминки': 'salmon-dish',
  'Никах': 'grilled-chicken',
};

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
    const heroPhoto = OCCASION_PHOTO[occasion] || 'wedding-banquet';

    return (
      <main id="main" className="pt-24 pb-20">
        <div className="container-site max-w-3xl mx-auto">
          <Breadcrumbs />

          {/* Hero photo — visual anchor */}
          <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden mb-8">
            <picture>
              <source srcSet={`/images/real/${heroPhoto}-480.avif 480w, /images/real/${heroPhoto}-768.avif 768w, /images/real/${heroPhoto}.avif 1920w`} sizes="768px" type="image/avif" />
              <source srcSet={`/images/real/${heroPhoto}-480.webp 480w, /images/real/${heroPhoto}-768.webp 768w, /images/real/${heroPhoto}.webp 1920w`} sizes="768px" type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/real/${heroPhoto}.jpg`} alt={occasion} className="w-full h-full object-cover" />
            </picture>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }} aria-hidden="true" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#E8C97E] mb-1">Подобрали</p>
              <h1 className="font-heading text-2xl md:text-3xl text-white" style={{ fontWeight: 500 }}>
                {occasion} · {guests} · {location}
              </h1>
            </div>
          </div>

          {/* INLINE LEAD FORM — single conversion action at peak intent */}
          <div className="p-6 md:p-8 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-gold-tint/40 to-card mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-text font-semibold mb-3">Ваш расчёт</p>
            <h2 className="font-heading text-2xl md:text-3xl mb-4" style={{ fontWeight: 500 }}>
              {format === 'banket' ? 'Банкет' : format === 'furshet' ? 'Фуршет' : format === 'coffee-break' ? 'Кофе-брейк' : format === 'detskoe' ? 'Детский кейтеринг' : 'Выезд шефа'}
              {' · '}
              <span className="text-gold-text">{guests}</span>
              {' · '}
              {location}
            </h2>

            {/* Price estimate */}
            <div className="bg-card rounded-xl p-4 mb-6 border border-line">
              <p className="text-xs text-muted-foreground mb-1">Ориентировочная стоимость</p>
              <p className="font-heading text-3xl md:text-4xl text-foreground" style={{ fontWeight: 600 }}>
                {format === 'coffee-break' ? 'от 390 ₽/гость' : format === 'furshet' ? 'от 2 450 ₽/гость' : format === 'banket' ? 'от 3 950 ₽/гость' : format === 'detskoe' ? 'от 1 550 ₽/гость' : 'от 5 000 ₽/час'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Финальная смета — после уточнения меню и тарифа</p>
            </div>

            {/* Inline lead form — 2 fields only */}
            <form action="/api/quote" method="POST" className="space-y-3">
              <input type="hidden" name="source" value="helper" />
              <input type="hidden" name="format" value={format} />
              <input type="hidden" name="subject" value={`${occasion} · ${guests} · ${location}`} />
              <div>
                <label htmlFor="helper-name" className="block text-sm font-medium text-foreground mb-1.5">Ваше имя</label>
                <input
                  type="text"
                  id="helper-name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Анна"
                  className="w-full rounded-xl border border-line bg-background px-4 py-3.5 text-base focus:border-gold-text focus:outline-none focus:ring-2 focus:ring-gold-text/20 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="helper-phone" className="block text-sm font-medium text-foreground mb-1.5">Телефон</label>
                <input
                  type="tel"
                  id="helper-phone"
                  name="phone"
                  required
                  autoComplete="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="w-full rounded-xl border border-line bg-background px-4 py-3.5 text-base focus:border-gold-text focus:outline-none focus:ring-2 focus:ring-gold-text/20 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-primary text-primary-foreground px-6 py-4 text-base font-semibold hover:bg-primary/90 transition-colors no-underline shadow-md"
              >
                Получить расчёт →
              </button>
              <p className="text-xs text-muted-foreground text-center">
                Перезвоним за 15 минут в рабочее время (9:00–21:00). Без спама.
              </p>
            </form>

            {/* Secondary action — smaller, below */}
            <div className="mt-6 pt-6 border-t border-line text-center">
              <p className="text-sm text-muted-foreground mb-2">Хотите детальнее?</p>
              <Link
                href={`/plan/constructor?format=${format}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-text hover:underline no-underline"
              >
                Собрать меню в конструкторе →
              </Link>
            </div>
          </div>

          <div className="text-center">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-block rounded-lg border-2 border-gold-text px-6 py-3 text-base font-semibold text-foreground hover:bg-gold-tint/10 transition-colors no-underline mr-3"
            >
              {SITE.phone}
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

  const current = step === 0
    ? { q: 'Какой у вас повод?', sub: 'Подберём формат и примерный бюджет', opts: OCCASIONS.map((o) => ({ label: o.label, photo: o.photo })), key: 'occasion' as const }
    : step === 1
    ? { q: 'Сколько гостей ожидается?', sub: 'От этого зависит формат и тариф', opts: GUEST_RANGES.map((g) => ({ label: g.label, desc: g.desc })), key: 'guests' as const }
    : { q: 'Где проходит событие?', sub: 'Это влияет на логистику и персонал', opts: LOCATIONS.map((l) => ({ label: l.label, desc: l.desc })), key: 'location' as const };

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
        <div className="flex gap-1.5 mb-10" role="progressbar" aria-valuenow={step + 1} aria-label={`Прогресс: шаг ${step + 1} из 3`} aria-valuemin={1} aria-valuemax={3}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-colors ${
                i < step ? 'bg-gold-text' : i === step ? 'bg-gold-text/70' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="text-center mb-10">
          <p className="text-sm md:text-base uppercase tracking-[0.2em] text-gold-text font-semibold mb-2">
            Шаг {step + 1} из 3 · 30 секунд
          </p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-3 leading-tight" style={{ fontWeight: 500 }}>
            {current.q}
          </h1>
          <p className="text-base text-muted-foreground">{current.sub}</p>
        </div>

        {/* Step 0: photo cards for occasions */}
        {step === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {current.opts.map((opt) => {
              const photo = (opt as { photo: string }).photo;
              const selected = occasion === opt.label;
              return (
                <a
                  key={opt.label}
                  href={buildHref(opt.label)}
                  className={`group relative block aspect-[4/5] rounded-xl overflow-hidden no-underline transition-all ${
                    selected ? 'ring-2 ring-gold-text ring-offset-2' : 'hover:ring-1 hover:ring-gold-text/40'
                  }`}
                >
                  <picture>
                    <source srcSet={`/images/real/${photo}-480.avif 480w, /images/real/${photo}-768.avif 768w`} sizes="200px" type="image/avif" />
                    <source srcSet={`/images/real/${photo}-480.webp 480w, /images/real/${photo}-768.webp 768w`} sizes="200px" type="image/webp" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/images/real/${photo}.jpg`} alt={opt.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </picture>
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }} aria-hidden="true" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-medium text-sm md:text-base">{opt.label}</p>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          /* Steps 1-2: text cards with descriptions */
          <div className="space-y-3">
            {current.opts.map((opt) => {
              const desc = (opt as { desc?: string }).desc;
              const selected =
                (step === 1 && guests === opt.label) ||
                (step === 2 && location === opt.label);
              return (
                <a
                  key={opt.label}
                  href={buildHref(opt.label)}
                  className={`block w-full rounded-xl border p-5 text-left transition-all no-underline ${
                    selected
                      ? 'border-gold-text bg-gold-tint/30 ring-1 ring-gold-text text-foreground'
                      : 'border-line bg-card hover:border-gold-text hover:bg-secondary/30 text-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-base">{opt.label}</p>
                      {desc && <p className="text-xs text-muted-foreground mt-1">{desc}</p>}
                    </div>
                    <svg className="w-5 h-5 text-muted-foreground shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M7 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {step > 0 && (
          <a
            href={step === 1 ? '/plan/helper' : step === 2 ? `/plan/helper?occasion=${encodeURIComponent(occasion!)}` : '/plan/helper'}
            className="inline-block mt-6 text-sm text-muted-foreground hover:text-foreground no-underline"
          >
            ← Назад
          </a>
        )}

        <div className="mt-12 p-5 rounded-xl bg-card border border-line text-center">
          <p className="text-sm text-foreground mb-3">Не хотите проходить опрос?</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link href="/pricing" className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-background font-medium hover:bg-foreground/90 no-underline">
              Сразу к тарифам →
            </Link>
            <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-background px-4 py-2 font-medium hover:border-gold-text no-underline">
              {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
