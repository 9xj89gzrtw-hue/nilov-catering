import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: {
    canonical: "/subscribe",
    languages: { ru: "/subscribe", "x-default": "/subscribe" },
  },
  title: "Подписка на кейтеринг — офисные обеды и кофе-брейки",
  description:
    "Регулярный кейтеринг для офисов: кофе-брейки, бизнес-ланчи. Скидки до 23%. Долгосрочный контракт с ЭДО и SLA. СПб.",
};

export default function SubscribePage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-2xl">
        <h1 className="mb-4">Регулярный кейтеринг для офисов</h1>
        <p className="text-muted-foreground mb-8">
          Кофе-брейки, бизнес-ланчи, еженедельные обеды — на постоянной основе со скидкой.
          Долгосрочный контракт с фикс-ценой, ЭДО-инвойс ежемесячно, SLA в комплекте.
        </p>

        {/* Pricing tiers */}
        <div className="mb-8">
          <h2 className="font-heading mb-3 text-xl font-medium">Тарифы подписки</h2>

          {/* Comparison table */}
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-line border-b-2">
                  <th className="text-muted-foreground py-2 pr-4 text-left font-medium">Тариф</th>
                  <th className="text-muted-foreground px-2 py-2 text-right font-medium">
                    Цена/мес
                  </th>
                  <th className="text-muted-foreground px-2 py-2 text-right font-medium">Скидка</th>
                  <th className="text-muted-foreground px-2 py-2 text-right font-medium">
                    Минимум
                  </th>
                  <th className="text-muted-foreground py-2 pl-2 text-right font-medium">Тест</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-line/60 border-b">
                  <td className="py-2 pr-4 font-medium">Кофе-брейк еженедельно</td>
                  <td className="text-gold-text px-2 py-2 text-right font-semibold">
                    66 300 ₽{" "}
                    <span className="text-muted-foreground text-xs font-normal">(при 50 чел.)</span>
                  </td>
                  <td className="px-2 py-2 text-right">15%</td>
                  <td className="px-2 py-2 text-right">20 сотр.</td>
                  <td className="py-2 pl-2 text-right">1 нед.</td>
                </tr>
                <tr className="border-line/60 bg-gold-tint/5 border-b">
                  <td className="py-2 pr-4 font-medium">Долгосрочный контракт</td>
                  <td className="text-gold-text px-2 py-2 text-right font-semibold">
                    60 000 ₽{" "}
                    <span className="text-muted-foreground text-xs font-normal">(фикс.)</span>
                  </td>
                  <td className="px-2 py-2 text-right">23%</td>
                  <td className="px-2 py-2 text-right">30 сотр.</td>
                  <td className="py-2 pl-2 text-right">1 нед.</td>
                </tr>
                <tr className="border-line/60 border-b">
                  <td className="py-2 pr-4 font-medium">Бизнес-ланч еженедельно</td>
                  <td className="text-gold-text px-2 py-2 text-right font-semibold">
                    110 500 ₽{" "}
                    <span className="text-muted-foreground text-xs font-normal">(при 50 чел.)</span>
                  </td>
                  <td className="px-2 py-2 text-right">15%</td>
                  <td className="px-2 py-2 text-right">20 сотр.</td>
                  <td className="py-2 pl-2 text-right">1 нед.</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Комбо (CB+обед)</td>
                  <td className="text-gold-text px-2 py-2 text-right font-semibold">
                    166 400 ₽{" "}
                    <span className="text-muted-foreground text-xs font-normal">(при 50 чел.)</span>
                  </td>
                  <td className="px-2 py-2 text-right">20%</td>
                  <td className="px-2 py-2 text-right">30 сотр.</td>
                  <td className="py-2 pl-2 text-right">1 нед.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Detailed cards */}
          <div className="space-y-4">
            <div className="border-line bg-card rounded-xl border p-5">
              <h3 className="font-heading mb-1 text-base font-medium">Кофе-брейк — еженедельно</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                4 события × 50 чел × 390 ₽ = 78 000 ₽/мес → со скидкой 15% ={" "}
                <strong className="text-foreground">66 300 ₽/мес</strong>
              </p>
              <p className="text-muted-foreground text-xs">
                Ротация меню: 8-недельный цикл без повторов. Сезонные обновления. Минимум — 20
                сотрудников. Тестовый период — 1 неделя.
              </p>
            </div>

            <div className="border-gold-text/40 bg-gold-tint/5 rounded-xl border-2 p-5">
              <h3 className="font-heading mb-1 text-base font-medium">
                Долгосрочный контракт (кофе-брейк)
              </h3>
              <p className="text-muted-foreground mb-2 text-sm">
                Фикс-цена <strong className="text-foreground">60 000 ₽/мес</strong> (скидка 23%).
                Ежемесячный ЭДО-инвойс. SLA ±15 минут включён.
              </p>
              <p className="text-muted-foreground text-xs">
                Для компаний от 30 сотрудников. Минимальный срок — 3 месяца.
              </p>
            </div>

            <div className="border-line bg-card rounded-xl border p-5">
              <h3 className="font-heading mb-1 text-base font-medium">Бизнес-ланч — еженедельно</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                4 обеда × 50 чел × 650 ₽ = 130 000 ₽/мес → со скидкой 15% ={" "}
                <strong className="text-foreground">110 500 ₽/мес</strong>
              </p>
              <p className="text-muted-foreground text-xs">
                Горячее + салат + суп + напиток. Ротация: 12-недельный цикл. Минимум — 20
                сотрудников. Тестовый период — 1 неделя.
              </p>
            </div>

            <div className="border-line bg-card rounded-xl border p-5">
              <h3 className="font-heading mb-1 text-base font-medium">Комбо (кофе-брейк + обед)</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                4 дня × (кофе-брейк 390 ₽ + обед 650 ₽) × 50 чел = 208 000 ₽/мес → со скидкой 20% ={" "}
                <strong className="text-foreground">166 400 ₽/мес</strong>
              </p>
              <p className="text-muted-foreground text-xs">
                Полный рабочий день питания. Экономия 41 600 ₽/мес vs раздельные заказы. Минимум —
                30 сотрудников. Тестовый период — 1 неделя.
              </p>
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="border-line bg-secondary/30 mb-8 rounded-xl border p-5">
          <h2 className="font-heading mb-3 text-lg font-medium">Что входит в подписку</h2>
          <ul className="text-foreground/90 list-inside list-disc space-y-1.5 text-sm">
            <li>Фикс-цена на весь срок контракта (защита от инфляции)</li>
            <li>ЭДО-инвойс ежемесячно (Диадок / СБИС)</li>
            <li>SLA: доставка ±15 минут, штраф 1%/мин опоздания</li>
            <li>Ротация меню — без повторов 8–12 недель</li>
            <li>Персональный менеджер с прямым мобильным</li>
            <li>Сезонные обновления меню (весна/лето/осень/зима)</li>
            <li>Доставка в пределах КАД — бесплатно</li>
            <li>Возможность паузы (отпуск, праздники) — без штрафа</li>
          </ul>
        </div>

        {/* Form */}
        <div className="border-line bg-card rounded-xl border p-6">
          <h2 className="font-heading mb-4 text-xl font-medium">Оставить заявку на подписку</h2>
          <form className="space-y-4" action="/api/quote" method="POST">
            <input type="hidden" name="source" value="subscribe" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium">
                  Имя *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="border-line bg-background min-h-[44px] w-full rounded-lg border px-4 py-3 text-sm"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                  Телефон *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="border-line bg-background min-h-[44px] w-full rounded-lg border px-4 py-3 text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="company" className="mb-1 block text-sm font-medium">
                Компания
              </label>
              <input
                id="company"
                name="company"
                placeholder="ООО «Ромашка»"
                className="border-line bg-background min-h-[44px] w-full rounded-lg border px-4 py-3 text-sm"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="employees" className="mb-1 block text-sm font-medium">
                  Сотрудников
                </label>
                <input
                  id="employees"
                  name="guests"
                  type="number"
                  min="1"
                  placeholder="напр. 50"
                  className="border-line bg-background min-h-[44px] w-full rounded-lg border px-4 py-3 text-sm"
                />
              </div>
              <div>
                <label htmlFor="tier" className="mb-1 block text-sm font-medium">
                  Тип подписки
                </label>
                <select
                  id="tier"
                  name="tier"
                  className="border-line bg-background min-h-[44px] w-full rounded-lg border px-4 py-3 text-sm"
                >
                  <option value="coffee-weekly">Кофе-брейк еженедельно (66 300 ₽/мес)</option>
                  <option value="coffee-yearly">Долгосрочный контракт (60 000 ₽/мес)</option>
                  <option value="lunch-weekly">Бизнес-ланч еженедельно (110 500 ₽/мес)</option>
                  <option value="combo">Комбо кофе+обед (166 400 ₽/мес)</option>
                  <option value="custom">Другой вариант</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="comment" className="mb-1 block text-sm font-medium">
                Комментарий
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={2}
                placeholder="Особые пожелания, диеты, адрес доставки..."
                className="border-line bg-background min-h-[44px] w-full resize-none rounded-lg border px-4 py-3 text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg py-3 text-sm font-semibold transition-colors"
            >
              Отправить заявку
            </button>
            <p className="text-muted-foreground text-center text-xs">
              Менеджер свяжется в течение 1 рабочего часа с коммерческим предложением. Нажимая
              кнопку, вы соглашаетесь с{" "}
              <Link href="/privacy" className="underline">
                политикой конфиденциальности
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
