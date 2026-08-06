import Link from 'next/link';

/**
 * TrustBar — replaced fake-client marquee with real venue names + honest count.
 *
 * Design critic: "TrustBar shows fake client names in marquee — actively damages credibility"
 * Business critic: "3000+ событий fabricated, flagged in FACTCHECK_REPORT"
 *
 * Now: 3 real venue logos/names + honest "27 отзывов" count, no animation.
 */
const VENUES = [
  { name: 'Особняк Бруноз', note: 'Свадьбы · 40-100 гостей' },
  { name: 'Лофт «Севкабель»', note: 'Корпоративы · 50-300 гостей' },
  { name: 'Конгресс-холл «Экспофорум»', note: 'Конференции · 100-800 гостей' },
  { name: 'Загородный клуб «Скандинавия»', note: 'Банкеты · 30-150 гостей' },
  { name: 'Технополис Meta', note: 'IT-конференции · 50-200 гостей' },
  { name: 'ГБОУ школа №355', note: 'Выпускные · 50-100 выпускников' },
];

export default function TrustBar() {
  return (
    <section className="py-16 md:py-20 bg-secondary/40 border-y border-line" aria-labelledby="trust-heading">
      <div className="container-site">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-text mb-3">Площадки</p>
          <h2 id="trust-heading" className="font-heading text-2xl md:text-4xl mb-3" style={{ fontWeight: 500 }}>
            Работаем на лучших площадках СПб
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            27 отзывов на Яндекс.Картах и 2ГИС. Конкретные имена корпоративных заказчиков
            раскрываем по согласию —{' '}
            <a href="mailto:b2b@odaeda.ru" className="text-gold-text hover:underline">запросите референсы</a>.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {VENUES.map((v) => (
            <div
              key={v.name}
              className="p-4 rounded-xl border border-line bg-card hover:border-gold-text/40 transition-colors"
            >
              <p className="font-heading text-sm md:text-base text-foreground" style={{ fontWeight: 500 }}>
                {v.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{v.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-sm font-medium text-gold-text hover:underline no-underline"
          >
            Все 27 отзывов с площадками и датами →
          </Link>
        </div>
      </div>
    </section>
  );
}
