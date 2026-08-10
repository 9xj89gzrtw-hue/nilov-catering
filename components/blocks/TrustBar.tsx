import Link from 'next/link';

const VENUES = [
  { name: 'Особняк Бруноз', note: 'Свадьбы · 40-100 гостей', photo: '/images/catering/spb-01.jpg' },
  { name: 'Лофт «Севкабель»', note: 'Корпоративы · 50-300 гостей', photo: '/images/catering/spb-02.jpg' },
  { name: 'Экспофорум', note: 'Конференции · 100-800 гостей', photo: '/images/catering/spb-03.jpg' },
  { name: 'Клуб «Скандинавия»', note: 'Банкеты · 30-150 гостей', photo: '/images/catering/wedding-03.jpg' },
  { name: 'Технополис Meta', note: 'IT-конференции · 50-200', photo: '/images/catering/spb-04.jpg' },
  { name: 'Школа №355', note: 'Выпускные · 50-100', photo: '/images/catering/spb-05.jpg' },
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
            <a href="mailto:b2b@nilov-catering.ru" className="text-gold-text hover:underline">запросите референсы</a>.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {VENUES.map((v) => (
            <div
              key={v.name}
              className="group relative overflow-hidden rounded-xl border border-line bg-card hover:border-gold-text/40 transition-colors"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.photo}
                  alt={v.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-heading text-sm md:text-base text-white" style={{ fontWeight: 500 }}>
                    {v.name}
                  </p>
                  <p className="text-xs text-white/75">{v.note}</p>
                </div>
              </div>
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
