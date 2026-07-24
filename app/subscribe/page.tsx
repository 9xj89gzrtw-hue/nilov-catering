import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: '/subscribe', languages: { 'ru': '/', 'en': '/en', 'x-default': '/' } },
  title: 'Подписка на кейтеринг — офисные обеды и кофе-брейки',
  description:
    'Регулярный кейтеринг для офисов: кофе-брейки, бизнес-ланчи. Скидки до 23%. Годовой контракт с ЭДО и SLA. СПб.',
};

export default function SubscribePage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-2xl">
        <h1 className="mb-4">Регулярный кейтеринг для офисов</h1>
        <p className="text-muted-foreground mb-8">
          Кофе-брейки, бизнес-ланчи, еженедельные обеды — на постоянной основе со скидкой.
          Годовой контракт с фикс-ценой, ЭДО-инвойс ежемесячно, SLA в комплекте.
        </p>

        {/* Pricing tiers */}
        <div className="mb-8">
          <h2 className="font-heading text-xl font-medium mb-3">Тарифы подписки</h2>

          {/* Comparison table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-line">
                  <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Тариф</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Цена/мес</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Скидка</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Минимум</th>
                  <th className="text-right py-2 pl-2 font-medium text-muted-foreground">Тест</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line/60">
                  <td className="py-2 pr-4 font-medium">☕ Кофе-брейк weekly</td>
                  <td className="text-right py-2 px-2 font-semibold text-gold-text">66 300 ₽</td>
                  <td className="text-right py-2 px-2">15%</td>
                  <td className="text-right py-2 px-2">20 сотр.</td>
                  <td className="text-right py-2 pl-2">1 нед.</td>
                </tr>
                <tr className="border-b border-line/60 bg-gold-tint/5">
                  <td className="py-2 pr-4 font-medium">💼 Годовой контракт</td>
                  <td className="text-right py-2 px-2 font-semibold text-gold-text">60 000 ₽</td>
                  <td className="text-right py-2 px-2">23%</td>
                  <td className="text-right py-2 px-2">30 сотр.</td>
                  <td className="text-right py-2 pl-2">1 нед.</td>
                </tr>
                <tr className="border-b border-line/60">
                  <td className="py-2 pr-4 font-medium">🍽 Бизнес-ланч weekly</td>
                  <td className="text-right py-2 px-2 font-semibold text-gold-text">110 500 ₽</td>
                  <td className="text-right py-2 px-2">15%</td>
                  <td className="text-right py-2 px-2">20 сотр.</td>
                  <td className="text-right py-2 pl-2">1 нед.</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">📦 Комбо (CB+обед)</td>
                  <td className="text-right py-2 px-2 font-semibold text-gold-text">166 400 ₽</td>
                  <td className="text-right py-2 px-2">20%</td>
                  <td className="text-right py-2 px-2">30 сотр.</td>
                  <td className="text-right py-2 pl-2">1 нед.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Detailed cards */}
          <div className="space-y-4">

          <div className="p-5 rounded-xl border border-line bg-card">
            <h3 className="font-heading text-base font-medium mb-1">☕ Кофе-брейк — еженедельно</h3>
            <p className="text-sm text-muted-foreground mb-2">
              4 события × 50 чел × 390 ₽ = 78 000 ₽/мес → со скидкой 15% = <strong className="text-foreground">66 300 ₽/мес</strong>
            </p>
            <p className="text-xs text-muted-foreground">Ротация меню: 8-недельный цикл без повторов. Сезонные обновления. Минимум — 20 сотрудников. Тестовый период — 1 неделя.</p>
          </div>

          <div className="p-5 rounded-xl border-2 border-gold-text/40 bg-gold-tint/5">
            <h3 className="font-heading text-base font-medium mb-1">💼 Годовой контракт (кофе-брейк)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Фикс-цена <strong className="text-foreground">60 000 ₽/мес</strong> (скидка 23%).
              Ежемесячный ЭДО-инвойс. SLA ±15 минут включён.
            </p>
            <p className="text-xs text-muted-foreground">
              Для компаний от 30 сотрудников. Минимальный срок — 3 месяца.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-line bg-card">
            <h3 className="font-heading text-base font-medium mb-1">🍽 Бизнес-ланч — еженедельно</h3>
            <p className="text-sm text-muted-foreground mb-2">
              4 обеда × 50 чел × 650 ₽ = 130 000 ₽/мес → со скидкой 15% = <strong className="text-foreground">110 500 ₽/мес</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              Горячее + салат + суп + напиток. Ротация: 12-недельный цикл. Минимум — 20 сотрудников. Тестовый период — 1 неделя.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-line bg-card">
            <h3 className="font-heading text-base font-medium mb-1">📦 Комбо (кофе-брейк + обед)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              4 дня × (кофе-брейк 390 ₽ + обед 650 ₽) × 50 чел = 208 000 ₽/мес →
              со скидкой 20% = <strong className="text-foreground">166 400 ₽/мес</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              Полный рабочий день питания. Экономия 41 600 ₽/мес vs раздельные заказы. Минимум — 30 сотрудников. Тестовый период — 1 неделя.
            </p>
          </div>
          </div>
        </div>

        {/* What's included */}
        <div className="mb-8 p-5 rounded-xl border border-line bg-secondary/30">
          <h2 className="font-heading text-lg font-medium mb-3">Что входит в подписку</h2>
          <ul className="text-sm space-y-1.5 list-disc list-inside text-foreground/90">
            <li>✓ Фикс-цена на весь срок контракта (защита от инфляции)</li>
            <li>✓ ЭДО-инвойс ежемесячно (Диадок / СБИС)</li>
            <li>✓ SLA: доставка ±15 минут, штраф 1%/мин опоздания</li>
            <li>✓ Ротация меню — без повторов 8–12 недель</li>
            <li>✓ Персональный менеджер с прямым мобильным</li>
            <li>✓ Сезонные обновления меню (весна/лето/осень/зима)</li>
            <li>✓ Доставка в пределах КАД — бесплатно</li>
            <li>✓ Возможность паузы (отпуск, праздники) — без штрафа</li>
          </ul>
        </div>

        {/* Form */}
        <div className="rounded-xl border border-line bg-card p-6">
          <h2 className="font-heading text-xl font-medium mb-4">Оставить заявку на подписку</h2>
          <form className="space-y-4" action="/api/quote" method="POST">
            <input type="hidden" name="source" value="subscribe" />
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Имя *</label>
                <input id="name" name="name" required className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Телефон *</label>
                <input id="phone" name="phone" type="tel" required className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm" />
              </div>
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1">Компания</label>
              <input id="company" name="company" placeholder='ООО «Ромашка»' className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm" />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="employees" className="block text-sm font-medium mb-1">Сотрудников</label>
                <input id="employees" name="guests" type="number" min="1" placeholder="напр. 50" className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label htmlFor="tier" className="block text-sm font-medium mb-1">Тип подписки</label>
                <select id="tier" name="tier" className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm">
                  <option value="coffee-weekly">Кофе-брейк еженедельно (66 300 ₽/мес)</option>
                  <option value="coffee-yearly">Годовой контракт (60 000 ₽/мес)</option>
                  <option value="lunch-weekly">Бизнес-ланч еженедельно (110 500 ₽/мес)</option>
                  <option value="combo">Комбо кофе+обед (166 400 ₽/мес)</option>
                  <option value="custom">Другой вариант</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium mb-1">Комментарий</label>
              <textarea id="comment" name="comment" rows={2} placeholder="Особые пожелания, диеты, адрес доставки..." className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm resize-none" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Отправить заявку
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Менеджер свяжется в течение 1 рабочего часа с коммерческим предложением.
              Нажимая кнопку, вы соглашаетесь с{' '}
              <Link href="/privacy" className="underline">политикой конфиденциальности</Link>.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
