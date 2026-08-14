import type { Metadata } from "next";
import Link from "next/link";
import DeliveryZonesMap from "@/components/blocks/DeliveryZonesMap";

export const metadata: Metadata = {
  alternates: { canonical: "/delivery", languages: { ru: "/delivery", "x-default": "/delivery" } },
  title: "Доставка кейтеринга",
  description:
    "Закажите доставку готовых блюд на дом или в офис. Бесплатно в пределах КАД. Минимальный заказ 5000 ₽. Соберите меню сами.",
};

export default function DeliveryPage() {
  return (
    <main id="main" className="pt-24">
      {/* Hero */}
      <section className="container-site py-10">
        <div className="max-w-2xl">
          <p className="text-gold-text mb-3 text-xs tracking-[0.2em] uppercase">Услуга</p>
          <h1 className="font-heading mb-4 text-4xl font-medium md:text-5xl">
            Доставка кейтеринга
          </h1>
          <p className="text-muted-foreground mb-6 text-lg">
            Соберите заказ из нашего меню — привезём готовые блюда на дом или в офис. Без официантов
            и посуды, только еда.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/delivery/order"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
            >
              Собрать заказ доставки
            </Link>
            <Link
              href="/menu/catalog"
              className="border-line bg-card hover:border-gold-text inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition-colors"
            >
              Смотреть каталог блюд
            </Link>
          </div>
        </div>
      </section>

      {/* Feature blocks */}
      <section className="container-site py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "🚚",
              title: "Бесплатно в КАД",
              text: "Доставка в пределах КАД — бесплатно. Вне КАД — честные надбавки.",
            },
            {
              icon: "💰",
              title: "Мин. заказ 5 000 ₽",
              text: "Минимальная сумма заказа для доставки. Можно набрать из любых блюд.",
            },
            {
              icon: "🧊",
              title: "Холодовая цепь",
              text: "Блюда везём в сумках-холодильниках при +2…+6 °C, не дольше 90 минут от кухни. Для дальних зон — термобоксы с залогом.",
            },
            {
              icon: "⏱",
              title: "Слоты + точное время",
              text: "7 слотов по 2 часа (09:00–23:00). Для B2B-событий (конференции, кофе-брейки) — доставка в окно ±15 минут от согласованного времени. SLA: штраф 1% за минуту опоздания.",
            },
            {
              icon: "⏰",
              title: "На следующий день",
              text: "Доставка оформляется на следующий день. Срочная доставка в день заказа (при заказе до 13:00) — +30% надбавка, звоните +7 (812) 919-59-11.",
            },
            {
              icon: "📞",
              title: "Курьер позвонит",
              text: "За 30 минут до прибытия курьер позвонит — будете готовы встретить.",
            },
          ].map((f) => (
            <div key={f.title} className="border-line bg-card rounded-xl border p-5">
              <span className="mb-2 block text-3xl">{f.icon}</span>
              <h3 className="font-heading mb-1 text-sm font-medium">{f.title}</h3>
              <p className="text-muted-foreground text-xs">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zones map (existing component) */}
      <DeliveryZonesMap />

      {/* CTA */}
      <section className="container-site py-16">
        <div className="border-gold-tint bg-gold-tint/30 rounded-2xl border p-8 text-center">
          <h2 className="font-heading mb-3 text-2xl font-medium">Готовы заказать доставку?</h2>
          <p className="text-muted-foreground mx-auto mb-5 max-w-xl">
            Соберите меню из нашего каталога — от канапе до десертов. Привезём свежим: холодные
            блюда при +2…+6 °C, горячие — в термоконтейнерах с подогревом. SLA ±15 минут.
          </p>
          <Link
            href="/delivery/order"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold transition-colors"
          >
            Начать сборку заказа →
          </Link>
        </div>
      </section>
    </main>
  );
}
