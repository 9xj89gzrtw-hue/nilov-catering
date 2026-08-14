import Link from "next/link";

export default function DeliveryBanner() {
  return (
    <section className="py-10" aria-label="Доставка еды">
      <div className="container-site">
        <div className="from-gold-tint to-secondary border-gold-tint flex flex-col items-center justify-between gap-6 rounded-2xl border bg-gradient-to-r p-6 md:flex-row md:p-8">
          <div className="flex-1 text-center md:text-left">
            <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
              <span className="text-3xl"></span>
              <h2 className="font-heading text-2xl font-medium">
                Нужна просто еда — без официантов?
              </h2>
            </div>
            <p className="text-muted-foreground mx-auto max-w-xl text-sm md:mx-0">
              Доставка готовых блюд домой или в офис. Минимальный заказ —{" "}
              <strong className="text-foreground">5 000 ₽</strong>. Бесплатная доставка в пределах
              КАД. Готовые сеты для офиса и дома.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2">
            <Link
              href="/delivery/order"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 text-center text-sm font-semibold transition-colors"
            >
              Собрать заказ доставки →
            </Link>
            <Link
              href="/delivery"
              className="text-muted-foreground hover:text-foreground text-center text-xs transition-colors"
            >
              Зоны и стоимость доставки
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
