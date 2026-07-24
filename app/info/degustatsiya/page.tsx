import type { Metadata } from 'next';
import Link from 'next/link';
import { getReviews } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Дегустация меню',
  description: 'Запишитесь на бесплатную дегустацию меню для свадьбы или корпоратива. Попробуйте блюда, обсудите меню с шефом, получите КП.',
};

const FORMATS = [
  { id: 'svadba', label: 'Свадьба', href: '/events/svadba' },
  { id: 'korporativ', label: 'Корпоратив', href: '/events/korporativ' },
  { id: 'detskoe', label: 'Детский праздник', href: '/events/detskoe' },
  { id: 'furshet', label: 'Фуршет / Кофе-брейк', href: '/menu/furshet' },
];

const TIME_SLOTS = [
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
];

export default async function DegustatsiyaPage() {
  const reviews = await getReviews();

  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-4xl">
        {/* Hero section */}
        <section className="mb-16 text-center" aria-labelledby="degust-heading">
          <p className="font-mono text-xs tracking-[0.2em] text-gold-text uppercase mb-2">Бесплатно для заказчиков</p>
          <h1 id="degust-heading" className="mb-6 tracking-tight" style={{ lineHeight: 1.08 }}>
            Дегустация меню
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Приходите на бесплатную дегустацию в нашу кухню. Попробуйте блюда из меню, обсудите состав с шеф-поваром,
            получите коммерческое предложение с точной стоимостью. Без обязательств.
          </p>
        </section>

        {/* Info cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16" aria-labelledby="details-heading">
          <h2 id="details-heading" className="sr-only">Что входит в дегустацию</h2>
          <article className="rounded-xl border border-line bg-card p-6">
            <h3 className="font-heading text-lg font-medium mb-2">Что вы попробуете</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 3–5 блюд из выбранного формата (фуршет/банкет/кофе-брейк)</li>
              <li>• Десерт и напитки</li>
              <li>• Обсуждение аллергенов и диет</li>
            </ul>
          </article>
          <article className="rounded-xl border border-line bg-card p-6">
            <h3 className="font-heading text-lg font-medium mb-2">Как проходит</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 45–60 минут в нашей дегустационной кухне (Центр СПб)</li>
              <li>• Шеф-повар отвечает на вопросы по составу и технологиям</li>
              <li>• Менеджер готовит КП с точной ценой на месте</li>
            </ul>
          </article>
          <article className="rounded-xl border border-line bg-card p-6">
            <h3 className="font-heading text-lg font-medium mb-2">Когда доступно</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Пн–Пт: 10:00–18:00 (по записи)</li>
              <li>• Сб: 10:00–14:00 (по записи, ограниченные слоты)</li>
              <li>• Бронирование за 3+ дня</li>
            </ul>
          </article>
        </section>

        {/* Booking form */}
        <section className="rounded-xl border border-line bg-card p-6 md:p-8 mb-16" aria-labelledby="booking-heading">
          <h2 id="booking-heading" className="mb-6 text-center">Записаться на дегустацию</h2>

          <form className="max-w-xl mx-auto space-y-4" id="degust-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="format" className="block text-sm font-medium mb-1">Формат события *</label>
                <select
                  id="format"
                  name="format"
                  required
                  className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold-text"
                >
                  <option value="">Выберите формат</option>
                  {FORMATS.map(f => (
                    <option key={f.id} value={f.id}>{f.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="guests" className="block text-sm font-medium mb-1">Количество гостей *</label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  min="10"
                  max="500"
                  required
                  placeholder="Напр. 80"
                  className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold-text"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium mb-1">Предпочтительная дата *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  min={new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]}
                  className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold-text"
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium mb-1">Время *</label>
                <select
                  id="time"
                  name="time"
                  required
                  className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold-text"
                >
                  <option value="">Выберите время</option>
                  {TIME_SLOTS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Ваше имя *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Иван Петров"
                  className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold-text"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Телефон *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="+7 (___) ___-__-__"
                  className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold-text"
                />
              </div>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium mb-1">Комментарий (аллергии, пожелания, формат дегустации)</label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                placeholder="Например: нужна веганская опция, аллергия на орехи, хотим групповую дегустацию..."
                className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold-text resize-none"
              />
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Нажимая кнопку, вы соглашаетесь с <Link href="/privacy" className="underline hover:text-gold-text">политикой конфиденциальности</Link>.
              Менеджер подтвердит запись звонком в течение 15 минут (в рабочее время).
            </p>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Записаться на дегустацию
            </button>
          </form>
        </section>

        {/* FAQ */}
        <section className="mb-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="mb-6 text-center">Частые вопросы</h2>
          <dl className="space-y-4 max-w-2xl mx-auto text-left">
            <div className="rounded-xl border border-line bg-card p-5">
              <dt className="font-medium mb-1">Дегустация действительно бесплатная?</dt>
              <dd className="text-sm text-muted-foreground">Да, для клиентов, планирующих событие от 20 гостей. Групповые дегустации (до 4 человек) — без оплаты.</dd>
            </div>
            <div className="rounded-xl border border-line bg-card p-5">
              <dt className="font-medium mb-1">Можно прийти с детьми / супругом / коллегами?</dt>
              <dd className="text-sm text-muted-foreground">Да, до 4 человек на одну запись. Дополнительные гости — по согласованию.</dd>
            </div>
            <div className="rounded-xl border border-line bg-card p-5">
              <dt className="font-medium mb-1">Что если меню не понравится?</dt>
              <dd className="text-sm text-muted-foreground">Никаких обязательств. Дегустация — чтобы вы точно знали, что заказываете. Можно не бронировать.</dd>
            </div>
            <div className="rounded-xl border border-line bg-card p-5">
              <dt className="font-medium mb-1">Где проходит дегустация?</dt>
              <dd className="text-sm text-muted-foreground">В нашей дегустационной кухне в центре Санкт-Петербурга (точный адрес пришлём при подтверждении записи).</dd>
            </div>
            <div className="rounded-xl border border-line bg-card p-5">
              <dt className="font-medium mb-1">Можно задегустировать конкретные позиции?</dt>
              <dd className="text-sm text-muted-foreground">Да, укажите в комментарии — мы подготовим именно их. Иначе подадим repräsentтивный набор из тарифа.</dd>
            </div>
          </dl>
        </section>

        {/* Reviews / Trust */}
        {reviews.length > 0 && (
          <section className="mb-16" aria-labelledby="reviews-heading">
            <h2 id="reviews-heading" className="mb-6 text-center">Отзывы о дегустациях</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reviews.slice(0, 3).map(r => (
                <article key={r.id} className="rounded-xl border border-line bg-card p-5">
                  <p className="text-sm text-muted-foreground mb-3">"{r.quote.slice(0, 120)}..."</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{r.clientName}</span>
                    <span className="text-xs text-muted-foreground">{r.eventType}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* CTA to calculator */}
        <section className="text-center" aria-labelledby="next-heading">
          <h2 id="next-heading" className="mb-4">Не готовы к дегустации? Получите расчёт за 2 минуты</h2>
          <Link
            href="/plan/calculator"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground"
          >
            Открыть калькулятор →
          </Link>
        </section>
      </div>
    </main>
  );
}