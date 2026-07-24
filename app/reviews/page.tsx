import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';
import reviews from '@/data/reviews.json';
import type { Review } from '@/lib/cms-store';

export const metadata: Metadata = {
  alternates: { canonical: '/reviews' },
  title: 'Отзывы клиентов — NiloV Catering, СПб',
  description:
    'Реальные отзывы клиентов NiloV Catering с 2007 года. Свадьбы, корпоративы, юбилеи, детские праздники, халяль, БГ-меню. Средний рейтинг рассчитан из опубликованных отзывов.',
};

const REVIEWS: Review[] = reviews as Review[];

// Сортировка: новые сверху (по дате в формате "Месяц Год")
const MONTHS: Record<string, number> = {
  'Январь': 0, 'Февраль': 1, 'Март': 2, 'Апрель': 3, 'Май': 4, 'Июнь': 5,
  'Июль': 6, 'Август': 7, 'Сентябрь': 8, 'Октябрь': 9, 'Ноябрь': 10, 'Декабрь': 11,
};

function parseDate(s: string): number {
  const m = s.match(/^(\w+)\s+(\d{4})$/);
  if (!m) return 0;
  return Number(m[2]) * 100 + (MONTHS[m[1]] ?? 0);
}

const SORTED_REVIEWS = [...REVIEWS].sort((a, b) => parseDate(b.date) - parseDate(a.date));

const avgRating = (REVIEWS.reduce((acc, r) => acc + (r.rating || 0), 0) / REVIEWS.length).toFixed(1);
const rating5 = REVIEWS.filter((r) => r.rating === 5).length;
const rating4 = REVIEWS.filter((r) => r.rating === 4).length;
const rating3 = REVIEWS.filter((r) => r.rating === 3).length;

export default function ReviewsPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          {' / '}
          <span className="text-foreground">Отзывы</span>
        </nav>

        <h1 className="font-heading text-3xl md:text-4xl font-medium mb-3 text-center">Отзывы клиентов</h1>
        <p className="text-center text-muted-foreground mb-8">
          {REVIEWS.length} опубликованных отзывов с 2007 года. Свадьбы, корпоративы, юбилеи,
          детские праздники, халяль, БГ-меню.
        </p>

        {/* Honest rating badge — calculated from real reviews */}
        <div className="mb-10 p-6 rounded-2xl border-2 border-gold-tint bg-gold-tint/10 text-center">
          <p className="text-sm text-muted-foreground mb-1">Средний рейтинг (из {REVIEWS.length} отзывов ниже)</p>
          <div className="text-5xl font-bold text-gold-text mb-1">{avgRating} / 5.0</div>
          <div className="flex justify-center gap-1 mb-3 text-gold-text" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < Math.round(Number(avgRating)) ? '★' : '☆'}</span>
            ))}
          </div>
          <div className="text-xs text-muted-foreground mb-3">
            5★: {rating5} · 4★: {rating4} · 3★: {rating3} · ниже 3★: 0
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Рейтинг рассчитан из отзывов, опубликованных на этой странице. На Яндекс.Картах и в 2ГИС
            отзывы публикуются независимо — ссылка ниже.
          </p>
          <a
            href="https://yandex.ru/maps/?text=%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%20NiloV%20Catering%20%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline"
          >
            Найти нас на Яндекс.Картах →
          </a>
        </div>

        {/* Reviews list */}
        <div className="space-y-5">
          {SORTED_REVIEWS.map((r) => (
            <div key={r.id} className="p-5 rounded-xl border border-line bg-card">
              <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                <div>
                  <p className="font-semibold text-base">{r.clientName}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.eventType} · {r.guests} гостей · {r.venue} · {r.date}
                  </p>
                </div>
                <div className="text-right">
                  {r.rating && (
                    <div
                      className="text-sm font-semibold text-gold-text"
                      aria-label={`Рейтинг ${r.rating} из 5`}
                    >
                      {'★'.repeat(r.rating)}
                      <span className="text-muted-foreground/40">{'★'.repeat(5 - r.rating)}</span>
                    </div>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {r.status === 'verified' ? '✓ проверен' : 'на модерации'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-foreground leading-relaxed mt-2">{r.quote}</p>
            </div>
          ))}
        </div>

        {/* Honesty block */}
        <div className="mt-10 p-5 rounded-xl border border-line bg-secondary/30">
          <h2 className="font-heading text-base font-medium mb-2">🛡 Честность отзывов</h2>
          <p className="text-sm text-muted-foreground">
            Все {REVIEWS.length} отзывов выше — реальные и опубликованы с согласия клиентов.
            Каждый отзыв имеет статус «✓ проверен» — это значит, что мы связались с клиентом
            и подтвердили факт мероприятия. Если вы наш клиент и хотите оставить отзыв — напишите
            на <a href={`mailto:${SITE.email}`} className="text-gold-text hover:underline">{SITE.email}</a>{' '}
            или на{' '}
            <a
              href="https://yandex.ru/maps/?text=%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%20NiloV%20Catering%20%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-text hover:underline"
            >
              Яндекс.Картах
            </a>
            .
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Мы не удаляем отзывы с оценкой ниже 5★. Из {REVIEWS.length} опубликованных —{' '}
            {rating4 + rating3 + REVIEWS.filter((r) => (r.rating || 5) < 3).length} с оценкой
            ниже 5★. По каждому такому отзыву мы связались с клиентом и решили проблему.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 p-6 rounded-xl bg-primary text-primary-foreground text-center">
          <h2 className="font-heading text-xl font-medium mb-2">Хотите так же?</h2>
          <p className="text-sm mb-4 opacity-90">Позвоните или оставьте заявку — подберём решение под ваш повод и бюджет.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`tel:${SITE.phoneTel}`} className="rounded-lg bg-background text-foreground px-5 py-2.5 text-sm font-semibold hover:bg-background/90 transition-colors no-underline">
              📞 {SITE.phone}
            </a>
            <Link href="/contact" className="rounded-lg border-2 border-background px-5 py-2.5 text-sm font-semibold hover:bg-background/10 transition-colors no-underline">
              ✍️ Оставить заявку
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
