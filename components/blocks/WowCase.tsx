import Link from "next/link";

export default function WowCase() {
  return (
    <section className="bg-secondary/40 py-16 md:py-20">
      <div className="container-site max-w-4xl">
        <div className="border-line bg-card overflow-hidden rounded-2xl border shadow-lg">
          {/* Photo */}
          <div className="bg-secondary relative aspect-[16/9] overflow-hidden">
            <picture>
              <source srcSet="/images/catering/corporate-04.jpg" type="image/jpeg" />
              <img
                src="/images/catering/corporate-04.jpg"
                alt="Корпоративный фестиваль 800 человек — 2 дня"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute bottom-4 left-6 text-white">
              <p className="mb-1 text-xs tracking-wider uppercase opacity-80">Кейс месяца</p>
              <h2 className="font-heading text-2xl font-medium md:text-3xl">800 гостей × 2 дня</h2>
              <p className="text-sm opacity-90">Корпоративный фестиваль в «Экспофоруме»</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="font-heading text-gold-text text-3xl font-medium">800</p>
                <p className="text-muted-foreground text-xs">гостей в день</p>
              </div>
              <div>
                <p className="font-heading text-gold-text text-3xl font-medium">2</p>
                <p className="text-muted-foreground text-xs">дня фестиваля</p>
              </div>
              <div>
                <p className="font-heading text-gold-text text-3xl font-medium">12</p>
                <p className="text-muted-foreground text-xs">шоу-станций</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 text-sm">
              Май 2025. Конгресс-холл «Экспофорум», СПб. Полный банкет-сервис: 3 кухни, 40
              официантов, 4 бармена, 2 сомелье. Меню из 124 блюда: от канапе до авторских десертов.
              SLA ±15 минут, страхование 30 млн ₽.
            </p>

            <Link
              href="/events/recap"
              className="text-gold-text inline-flex items-center gap-2 text-sm font-semibold hover:underline"
            >
              Смотреть все кейсы и видео →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
