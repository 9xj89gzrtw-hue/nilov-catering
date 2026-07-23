import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import Calculator from '@/components/interactive/Calculator';
import { SITE } from '@/lib/data';
import { getPricesForFormat } from '@/lib/tariff-offers';
import type { Format } from '@/lib/types';

export const metadata: Metadata = {
  alternates: { canonical: '/plan/calculator' },
  title: 'Калькулятор стоимости кейтеринга ',
  description: 'Рассчитайте стоимость кейтеринга . Фуршет от 2 450 ₽/гость, банкет от 3 950 ₽/гость, кофе-брейк от 390 ₽/гость. Всё включено: еда, персонал, посуда, доставка по КАД.',
};

/**
 * SSR-fallback для калькулятора.
 * Показывает статичную таблицу тарифов с формулой guests × price/guest.
 * JS-калькулятор заменяет блок на интерактивный.
 */
function CalculatorServerFallback() {
  const formats: { format: Format; label: string; emoji: string; tiers: { tier: string; price: number; min: number }[] }[] = [
    {
      format: 'furshet', label: 'Фуршет', emoji: '🥪',
      tiers: [
        { tier: 'Эконом', price: 2450, min: 20 },
        { tier: 'Стандарт', price: 3950, min: 20 },
        { tier: 'Расширенный', price: 5950, min: 20 },
      ],
    },
    {
      format: 'banket', label: 'Банкет', emoji: '🍽️',
      tiers: [
        { tier: 'Эконом', price: 3950, min: 30 },
        { tier: 'Стандарт', price: 5470, min: 25 },
        { tier: 'Расширенный', price: 7350, min: 20 },
        { tier: 'Максимальный', price: 9950, min: 15 },
      ],
    },
    {
      format: 'coffee-break', label: 'Кофе-брейк', emoji: '☕',
      tiers: [
        { tier: 'Эконом', price: 390, min: 10 },
        { tier: 'Стандарт', price: 1450, min: 10 },
        { tier: 'Расширенный', price: 1950, min: 10 },
      ],
    },
    {
      format: 'detskoe', label: 'Детский', emoji: '🧒',
      tiers: [
        { tier: 'Эконом', price: 1550, min: 10 },
        { tier: 'Стандарт', price: 2450, min: 10 },
        { tier: 'Расширенный', price: 3450, min: 10 },
      ],
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="container-site max-w-4xl">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          {' / '}
          <Link href="/plan" className="hover:text-foreground">Спланировать</Link>
          {' / '}
          <span className="text-foreground">Калькулятор</span>
        </nav>

        <h1 className="font-heading text-4xl md:text-5xl font-medium mb-4 text-center">
          Калькулятор стоимости
        </h1>
        <p className="text-lg text-muted-foreground mb-8 text-center">
          Базовая формула: <strong>гостей × цена за гостя</strong>. Всё включено — еда, персонал, посуда, доставка по КАД.
        </p>

        {/* Статичная таблица тарифов — видна SSR */}
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left p-4 font-heading">Формат</th>
                <th className="text-left p-4 font-heading">Тариф</th>
                <th className="text-right p-4 font-heading">Цена/гость</th>
                <th className="text-right p-4 font-heading">Мин. гостей</th>
                <th className="text-right p-4 font-heading">Пример: 50 гостей</th>
              </tr>
            </thead>
            <tbody>
              {formats.map((f) =>
                f.tiers.map((t, idx) => (
                  <tr key={`${f.format}-${t.tier}`} className={idx === 0 ? 'border-t-2 border-line/30' : 'border-t border-line/30'}>
                    {idx === 0 ? (
                      <td className="p-4 font-semibold align-top" rowSpan={f.tiers.length}>
                        <span className="text-2xl mr-2">{f.emoji}</span>
                        {f.label}
                      </td>
                    ) : null}
                    <td className="p-4">{t.tier}</td>
                    <td className="p-4 text-right font-semibold text-gold-text">{t.price.toLocaleString('ru-RU')} ₽</td>
                    <td className="p-4 text-right text-muted-foreground">от {t.min}</td>
                    <td className="p-4 text-right font-medium">{(t.price * 50).toLocaleString('ru-RU')} ₽</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Что включено */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-line bg-card">
            <h2 className="font-heading text-lg font-medium mb-3">✓ Что включено в цену</h2>
            <ul className="text-sm space-y-1.5 text-muted-foreground">
              <li>• Еда и напитки по тарифу</li>
              <li>• Официанты (1 на 10 гостей)</li>
              <li>• Координатор события</li>
              <li>• Посуда, столовые приборы, текстиль</li>
              <li>• Доставка в пределах КАД</li>
              <li>• Установка и сервировка</li>
              <li>• Уборка после события</li>
            </ul>
          </div>
          <div className="p-5 rounded-xl border border-line bg-card">
            <h2 className="font-heading text-lg font-medium mb-3">💳 Дополнительно (опционально)</h2>
            <ul className="text-sm space-y-1.5 text-muted-foreground">
              <li>• Доставка за КАД — от 3 000 ₽</li>
              <li>• Аренда оборудования — от 5 000 ₽</li>
              <li>• Бармен-шоу — от 8 000 ₽</li>
              <li>• Шампанское безлимит — от 1 500 ₽/гость</li>
              <li>• Свадебный торт — от 1 200 ₽/кг</li>
              <li>• Флористика — по запросу</li>
              <li>• Депозит 30%, возврат за 7+ дней</li>
            </ul>
          </div>
        </div>

        {/* Скидки */}
        <div className="mt-6 p-5 rounded-xl border-2 border-gold-tint bg-gold-tint/5">
          <h2 className="font-heading text-lg font-medium mb-2">🎁 Скидки</h2>
          <ul className="text-sm space-y-1.5">
            <li>• <strong>Раннее бронирование:</strong> 10% за 60+ дней, 15% за 90+ дней</li>
            <li>• <strong>Объём:</strong> от 100 гостей — индивидуальная скидка</li>
            <li>• <strong>B2B:</strong> от 50 гостей — отсрочка платежа для постоянных клиентов</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-8 p-6 rounded-xl bg-primary text-primary-foreground text-center">
          <h2 className="font-heading text-2xl font-medium mb-2">Готовы точнее?</h2>
          <p className="text-sm mb-4 opacity-90">
            Интерактивный калькулятор позволяет выбрать формат, гостей и тариф — итог обновляется мгновенно.
            Или позвоните — рассчитаем за 15 минут.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="rounded-lg bg-background text-foreground px-5 py-2.5 text-sm font-semibold hover:bg-background/90 transition-colors no-underline"
            >
              📞 {SITE.phone}
            </a>
            <Link
              href="/plan/constructor"
              className="rounded-lg border-2 border-background px-5 py-2.5 text-sm font-semibold hover:bg-background/10 transition-colors no-underline"
            >
              ✨ Открыть конструктор
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border-2 border-background px-5 py-2.5 text-sm font-semibold hover:bg-background/10 transition-colors no-underline"
            >
              ✍️ Оставить заявку
            </Link>
          </div>
        </div>

        <noscript>
          <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm">
            <strong>Внимание:</strong> интерактивный калькулятор требует JavaScript.
            Выше — статичная таблица тарифов. Для точного расчёта позвоните{' '}
            <a href={`tel:${SITE.phoneTel}`} className="underline">{SITE.phone}</a>.
          </div>
        </noscript>
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <main className="pt-24 pb-20">
      <Suspense fallback={<CalculatorServerFallback />}>
        <Calculator />
      </Suspense>
    </main>
  );
}
