import Link from "next/link";

const VENUES = [
  { name: "Особняк Бруноз", note: "Свадьбы · 40-100 гостей", photo: "/images/catering/spb-01.jpg" },
  {
    name: "Лофт «Севкабель»",
    note: "Корпоративы · 50-300 гостей",
    photo: "/images/catering/spb-02.jpg",
  },
  {
    name: "Экспофорум",
    note: "Конференции · 100-800 гостей",
    photo: "/images/catering/spb-03.jpg",
  },
  {
    name: "Клуб «Скандинавия»",
    note: "Банкеты · 30-150 гостей",
    photo: "/images/catering/wedding-03.jpg",
  },
  {
    name: "Технополис Meta",
    note: "IT-конференции · 50-200",
    photo: "/images/catering/spb-04.jpg",
  },
  { name: "Школа №355", note: "Выпускные · 50-100", photo: "/images/catering/spb-05.jpg" },
];

export default function TrustBar() {
  return (
    <section
      className="bg-secondary/40 border-line border-y py-16 md:py-20"
      aria-labelledby="trust-heading"
    >
      <div className="container-site">
        <div className="mb-10 text-center">
          <p className="text-gold-text mb-3 text-xs tracking-[0.2em] uppercase">Площадки</p>
          <h2
            id="trust-heading"
            className="font-heading mb-3 text-2xl md:text-4xl"
            style={{ fontWeight: 500 }}
          >
            Площадки, на которых мы работали
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl text-sm">
            Кейсы с реальных событий. Полный список рекомендуемых площадок с адресами — на странице{" "}
            <Link
              href="/venues"
              className="text-gold-text inline-flex min-h-[44px] items-center px-1 underline hover:underline"
            >
              «Площадки» →
            </Link>
            . 27 верифицированных отзывов на сайте. Конкретные имена корпоративных заказчиков
            раскрываем по согласию —{" "}
            <a
              href="mailto:b2b@nilov-catering.ru"
              className="text-gold-text inline-flex min-h-[44px] items-center px-1 underline hover:underline"
            >
              запросите референсы
            </a>
            .
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-3">
          {VENUES.map((v) => (
            <div
              key={v.name}
              className="group border-line bg-card hover:border-gold-text/40 relative overflow-hidden rounded-xl border transition-colors"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.photo}
                  alt={v.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                  }}
                  aria-hidden="true"
                />
                <div className="absolute right-0 bottom-0 left-0 p-3">
                  <p
                    className="font-heading text-sm text-white md:text-base"
                    style={{ fontWeight: 500 }}
                  >
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
            className="text-gold-text inline-flex items-center gap-2 text-sm font-medium no-underline hover:underline"
          >
            Все 27 отзывов с площадками и датами →
          </Link>
        </div>
      </div>
    </section>
  );
}
