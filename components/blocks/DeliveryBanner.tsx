import Link from 'next/link';

export default function DeliveryBanner() {
  return (
    <section className="py-10" aria-label="Доставка еды">
      <div className="container-site">
        <div className="rounded-2xl bg-gradient-to-r from-gold-tint to-secondary border border-gold-tint p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <span className="text-3xl">🚚</span>
              <h2 className="font-heading text-2xl font-medium">Нужна просто еда — без официантов?</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto md:mx-0">
              Доставка готовых блюд домой или в офис — от <strong className="text-foreground">5 000 ₽</strong>, без минимума по гостям.
              Привезём от 1 порции. Бесплатно в пределах КАД.
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <Link
              href="/delivery/order"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors text-center"
            >
              Собрать заказ доставки →
            </Link>
            <Link
              href="/delivery"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
            >
              Зоны и стоимость доставки
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
