import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/plan/helper' },
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

const LOCATIONS = [
  { label: 'Дома', emoji: '🏠' },
  { label: 'В офисе', emoji: '💼' },
  { label: 'На площадке (лофт/ресторан)', emoji: '🏛️' },
  { label: 'На природе', emoji: '🌳' },
  { label: 'Пока не знаю', emoji: '🤔' },
];

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

export default function PlanHelperPage({
  searchParams,
}: {
  searchParams: { occasion?: string; guests?: string; location?: string };
}) {
  const { occasion, guests, location } = searchParams;
  const step = !occasion ? 0 : !guests ? 1 : !location ? 2 : 3;

  // Финальный экран
  if (step === 3 && occasion && guests && location) {
    const eventPage = OCCASION_TO_PAGE[occasion] || '/pricing';
    const formatMatch = OCCASIONS.find((o) => o.label === occasion);
    const format = formatMatch?.format || 'furshet';

    return (
      <main className="pt-24 pb-20">
        <div className="container-site max-w-2xl mx-auto">
          <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">Главная</Link>
            {' / '}
            <Link href="/plan" className="hover:text-foreground">Спланировать</Link>
            {' / '}
            <span className="text-foreground">Помощник</span>
          </nav>

          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🎉</div>
            <h1 className="font-heading text-3xl md:text-4xl font-medium mb-3">
              Готово! Вот что мы подобрали
            </h1>
            <p className="text-lg text-muted-foreground">
              <strong className="text-foreground">{occasion}</strong>
              {' · '}
              <strong className="text-foreground">{guests}</strong>
              {' · '}
              <strong className="text-foreground">{location}</strong>
            </p>
          </div>

          <div className="p-6 rounded-xl border border-line bg-card mb-6">
            <h2 className="font-heading text-xl font-medium mb-3">Рекомендуем</h2>
            <p className="text-sm text-muted-foreground mb-4">
              На основе ваших ответов рекомендуем формат <strong className="text-foreground">{format === 'banket' ? 'Банкет' : format === 'furshet' ? 'Фуршет' : format === 'coffee-break' ? 'Кофе-брейк' : format === 'detskoe' ? 'Детский кейтеринг' : 'Выезд шефа'}</strong>.
              Перейдите на страницу события, чтобы увидеть тарифы и состав меню.
            </p>
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

  const current = step === 0
    ? { q: 'Какой повод?', opts: OCCASIONS.map((o) => ({ label: o.label, emoji: o.emoji })), key: 'occasion' as const }
    : step === 1
    ? { q: 'Сколько гостей?', opts: GUEST_RANGES.map((g) => ({ label: g.label, emoji: '' })), key: 'guests' as const }
    : { q: 'Где проходит?', opts: LOCATIONS.map((l) => ({ label: l.label, emoji: l.emoji })), key: 'location' as const };

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
    <main className="pt-24 pb-20">
      <div className="container-site max-w-2xl mx-auto">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          {' / '}
          <Link href="/plan" className="hover:text-foreground">Спланировать</Link>
          {' / '}
          <span className="text-foreground">Помощник</span>
        </nav>

        {/* Progress bar */}
        <div className="flex gap-1 mb-10" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={3}>
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
          <p className="font-mono text-xs tracking-[0.2em] text-gold-text uppercase mb-2">
            Шаг {step + 1} из 3
          </p>
          <h1 className="text-3xl md:text-4xl font-heading font-medium tracking-tight">
            {current.q}
          </h1>
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
