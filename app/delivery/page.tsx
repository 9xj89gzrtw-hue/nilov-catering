import type { Metadata } from 'next';
import Link from 'next/link';
import DeliveryZonesMap from '@/components/blocks/DeliveryZonesMap';

export const metadata: Metadata = {
  alternates: { canonical: '/delivery' },
  title: 'Доставка кейтеринга',
  description: 'Закажите доставку готовых блюд на дом или в офис. Бесплатно в пределах КАД. Минимальный заказ 5000 ₽. Соберите меню сами.',
};

export default function DeliveryPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="container-site py-10">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.2em] uppercase text-gold-text mb-3">Услуга</p>
          <h1 className="font-heading text-4xl md:text-5xl font-medium mb-4">Доставка кейтеринга</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Соберите заказ из нашего меню — привезём готовые блюда на дом или в офис. Без официантов и посуды, только еда.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/delivery/order"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              🛒 Собрать заказ доставки
            </Link>
            <Link
              href="/menu/catalog"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-6 py-3 text-sm font-medium hover:border-gold-text transition-colors"
            >
              Смотреть каталог блюд
            </Link>
          </div>
        </div>
      </section>

      {/* Feature blocks */}
      <section className="container-site py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🚚', title: 'Бесплатно в КАД', text: 'Доставка в пределах КАД — бесплатно. Вне КАД — честные надбавки.' },
            { icon: '💰', title: 'Мин. заказ 5 000 ₽', text: 'Минимальная сумма заказа для доставки. Можно набрать из любых блюд.' },
            { icon: '❄️', title: 'Холодовая цепь', text: 'Сохраняем температуру блюд. Для дальних зон — термобоксы с залогом.' },
            { icon: '⏱', title: 'Слоты + точное время', text: '7 слотов по 2 часа (09:00–23:00). Можно указать точное время подачи — например, к 19:00.' },
            { icon: '📅', title: 'На следующий день', text: 'Доставка оформляется минимум на завтра. Срочные заказы — по телефону.' },
            { icon: '📞', title: 'Курьер позвонит', text: 'За 30 минут до прибытия курьер позвонит — будете готовы встретить.' },
          ].map(f => (
            <div key={f.title} className="rounded-xl border border-line bg-card p-5">
              <span className="text-3xl mb-2 block">{f.icon}</span>
              <h3 className="font-heading font-medium text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zones map (existing component) */}
      <DeliveryZonesMap />

      {/* CTA */}
      <section className="container-site py-16">
        <div className="rounded-2xl border border-gold-tint bg-gold-tint/30 p-8 text-center">
          <h2 className="font-heading text-2xl font-medium mb-3">Готовы заказать доставку?</h2>
          <p className="text-muted-foreground mb-5 max-w-xl mx-auto">
            Соберите меню из нашего каталога — от канапе до десертов. Привезём свежим и горячим.
          </p>
          <Link
            href="/delivery/order"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            🛒 Начать сборку заказа →
          </Link>
        </div>
      </section>
    </main>
  );
}
