import type { Metadata } from 'next';
import Link from 'next/link';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';

export function generateMetadata(): Metadata {
  return {
    title: 'Корпоративы',
    description: 'Кейтеринг для корпоративных мероприятий в СПб. Бизнес-ланчи, фуршеты, банкеты. От 10 до 500 человек.',
    alternates: { canonical: '/events/korporativ' },
  };
}

export default function CorporatePage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">Корпоративы</h1>
        <p className="text-muted-foreground mb-8">
          Бизнес-ланчи, фуршеты и банкеты для компаний любого размера. От неформальной встречи на 10 человек до годового собрания на 500 гостей.
        </p>

        <TariffOffersSection
          eventId="korporativ"
          eventName="Корпоратив"
          description="Готовые тарифы для корпоративных событий. Каждый включает полный состав блюд."
        />

        {/* B2B-блок — для юридических лиц */}
        <div className="mt-12 p-6 rounded-2xl border-2 border-gold-tint bg-card">
          <h2 className="font-heading text-xl font-medium mb-3">💼 Работаем с юридическими лицами</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="p-3 rounded-lg border border-line bg-background">
              <p className="text-sm font-semibold mb-1">📋 Документы</p>
              <p className="text-xs text-muted-foreground">Договор, счёт, акт, счёт-фактура, ЭДО (Диадок, СБИС), чек по 54-ФЗ</p>
            </div>
            <div className="p-3 rounded-lg border border-line bg-background">
              <p className="text-sm font-semibold mb-1">💰 НДС</p>
              <p className="text-xs text-muted-foreground">ИП Нилов Д.И. на УСН — без НДС. Для плательщиков НДС поможем с партнёрским ООО (по запросу).</p>
            </div>
            <div className="p-3 rounded-lg border border-line bg-background">
              <p className="text-sm font-semibold mb-1">📅 Сроки</p>
              <p className="text-xs text-muted-foreground">Срочные заказы — от 24 часов. Стандарт — 3+ дня. Готовим тендерную документацию за 1-2 дня.</p>
            </div>
            <div className="p-3 rounded-lg border border-line bg-background">
              <p className="text-sm font-semibold mb-1">💳 Оплата</p>
              <p className="text-xs text-muted-foreground">50% предоплата, 50% постоплата 3 дня. Для постоянных B2B (3+ событий) — отсрочка 7-14 дней.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <p className="font-medium mb-1">🛡 SLA в договоре (для событий от 30 гостей (B2B)):</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>✓ Punctuality: опоздание ≤15 мин</li>
                <li>✓ Качество: жалобы ≤5% гостей</li>
                <li>✓ Компенсация: штраф 5-15% при нарушении</li>
                <li>✓ Страхование ГО: 5 000 000 ₽ (СОГАЗ/РЕСО)</li>
                <li>✓ Contingency plan: резервный шеф + транспорт в течение 4 часов</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">🎓 Закупки и учреждения:</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>✓ 44-ФЗ и 223-ФЗ — тендерная документация</li>
                <li>✓ Школы, вузы, детсады, гос. учреждения</li>
                <li>✓ Школьный тариф от 1 800 ₽/гость</li>
                <li>✓ Скидки: от 50 гостей — 5%, от 100 — 10%, от 200 — 15%</li>
                <li>✓ Многодневные конференции (3+ дня) — дополнительно -20%</li>
                <li>✓ Реквизиты: ИНН 781433059704, ОГРНИП 314784710400401</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-line flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline">
              ✍️ Оставить B2B-заявку
            </Link>
            <a href="tel:+78129195911" className="rounded-lg border border-gold-text px-5 py-2.5 text-sm font-semibold text-gold-text hover:bg-gold-tint transition-colors no-underline">
              📞 +7 (812) 919-59-11
            </a>
            <Link href="/certificates" className="rounded-lg border border-line bg-background px-5 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors no-underline">
              📋 Сертификаты и страхование
            </Link>
            <Link href="/events/vypusknoy" className="rounded-lg border border-line bg-background px-5 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors no-underline">
              🎓 Школьный B2B
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
