import Link from 'next/link';

export default function WowCase() {
  return (
    <section className="py-16 md:py-20 bg-secondary/40">
      <div className="container-site max-w-4xl">
        <div className="rounded-2xl overflow-hidden border border-line bg-card shadow-lg">
          {/* Photo */}
          <div className="aspect-[16/9] relative overflow-hidden bg-secondary">
            <picture>
              <source srcSet="/images/catering/corporate-04.jpg" type="image/jpeg" />
              <img
                src="/images/catering/corporate-04.jpg"
                alt="Корпоративный фестиваль 800 человек — 2 дня"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute bottom-4 left-6 text-white">
              <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Кейс месяца</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium">800 гостей × 2 дня</h2>
              <p className="text-sm opacity-90">Корпоративный фестиваль в «Экспофоруме»</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-3xl font-heading font-medium text-gold-text">800</p>
                <p className="text-xs text-muted-foreground">гостей в день</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-medium text-gold-text">2</p>
                <p className="text-xs text-muted-foreground">дня фестиваля</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-medium text-gold-text">12</p>
                <p className="text-xs text-muted-foreground">шоу-станций</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Май 2025. Конгресс-холл «Экспофорум», СПб. Полный банкет-сервис: 3 кухни, 40 официантов,
              4 бармена, 2 сомелье. Меню из 124 блюд: от канапе до авторских десертов.
              SLA ±15 минут, страхование 30 млн ₽.
            </p>

            <Link
              href="/events/recap"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-text hover:underline"
            >
              Смотреть все кейсы и видео →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
