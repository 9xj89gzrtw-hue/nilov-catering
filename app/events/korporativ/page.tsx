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
        <div className="mt-12 p-6 rounded-2xl border border-line bg-card">
          <h2 className="font-heading text-xl font-medium mb-3">Работаем с юридическими лицами</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium mb-1">Документы:</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>✓ Договор на оказание услуг</li>
                <li>✓ Счёт на оплату (безналичный расчёт)</li>
                <li>✓ Закрывающие документы: акт + счёт-фактура</li>
                <li>✓ ЭДО (Диадок, СБИС)</li>
                <li>✓ Работаем с НДС и без НДС</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">Условия:</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>✓ Отсрочка платежа для постоянных клиентов</li>
                <li>✓ Скидки от объёма (от 100 гостей)</li>
                <li>✓ Индивидуальные сметы под бюджет</li>
                <li>✓ Реквизиты по запросу: info@odaeda.ru</li>
                <li>✓ Срочно? Звоните: +7 (812) 919-59-11</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-line flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Оставить заявку
            </Link>
            <a href="tel:+78129195911" className="rounded-lg border border-gold-text px-5 py-2.5 text-sm font-semibold text-gold-text hover:bg-gold-tint transition-colors">
              📞 Позвонить
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
