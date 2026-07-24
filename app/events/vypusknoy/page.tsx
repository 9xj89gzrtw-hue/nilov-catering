import type { Metadata } from 'next';
import Link from 'next/link';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Выпускные — кейтеринг для школ и вузов СПб',
  description: 'Кейтеринг на выпускной: фуршеты и банкеты для школ и вузов. Бюджетные решения от 390 ₽/гость. B2B: договор, ЭДО, медкнижки, бракераж, согласование с Роспотребнадзором.',
  alternates: { canonical: '/events/vypusknoy' },
};

export default function VypusknoyPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-4xl">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          {' / '}
          <Link href="/events" className="hover:text-foreground">События</Link>
          {' / '}
          <span className="text-foreground">Выпускные</span>
        </nav>

        <h1 className="font-heading text-3xl md:text-4xl font-medium mb-3">Выпускные</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Кейтеринг для школьных и студенческих выпускных. Бюджетные решения от 390 ₽/гость (кофе-брейк) до 4 950 ₽/гость (расширенный банкет).
          Работаем со школами, вузами, детскими садами — полный пакет документов для Роспотребнадзора.
        </p>

        {/* Бюджетный мост — для тех, кому фуршет дорого */}
        <div className="mb-8 p-6 rounded-xl border-2 border-gold-tint bg-gold-tint/10">
          <h2 className="font-heading text-lg font-medium mb-2">💰 Ограниченный бюджет?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Кофе-брейк от <strong className="text-foreground">390 ₽/гость</strong> — выпечка, сэндвичи, фрукты, напитки.
            На 25 человек = ~9 750 ₽. На 60 детей = ~23 400 ₽.
            Или доставка без официантов от <strong className="text-foreground">5 000 ₽</strong>.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/pricing?event=coffee-break" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline">
              ☕ Смотреть кофе-брейк тарифы
            </Link>
            <Link href="/delivery/order" className="rounded-lg border border-line bg-card px-5 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors no-underline">
              🚚 Заказать доставкой
            </Link>
          </div>
        </div>

        <TariffOffersSection
          eventId="vypusknoy"
          eventName="Выпускной"
          description="Тарифы для выпускных: от бюджетного фуршета до праздника с DJ и mocktail-баром."
        />

        {/* School B2B block — для Ларисы (директора школы) */}
        <div className="mt-12 p-6 rounded-2xl border-2 border-emerald-200 bg-emerald-50">
          <h2 className="font-heading text-xl font-medium mb-3">🏫 Для школ и образовательных учреждений</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Работаем со школами, вузами, детскими садами, гос. учреждениями. Полное согласование с Роспотребнадзором.
            Закупки по 44-ФЗ и 223-ФЗ — поддерживаем.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <h3 className="font-semibold mb-2">📋 Документы для Роспотребнадзора</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>✓ Медицинские книжки 100% персонала</li>
                <li>✓ Журнал бракеража на каждое событие</li>
                <li>✓ Программа производственного контроля (ППК)</li>
                <li>✓ Декларация соответствия ЕАЭС</li>
                <li>✓ ТР ТС 021/2011 (пищевая безопасность) + HACCP</li>
                <li>✓ Температурный режим (холодовая цепь ≤+6 °C)</li>
                <li>✓ Сертификаты на все продукты</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">💼 B2B-условия</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>✓ Договор юр.лицо ↔ юр.лицо</li>
                <li>✓ Счёт, акт, счёт-фактура (с НДС/без НДС)</li>
                <li>✓ ЭДО: Контур.Диадок, СБИС</li>
                <li>✓ Отсрочка платежа для постоянных клиентов</li>
                <li>✓ Скидки от 100 гостей</li>
                <li>✓ Индивидуальные сметы под бюджет</li>
                <li>✓ Реквизиты: <a href={`mailto:${SITE.email}`} className="text-gold-text hover:underline">{SITE.email}</a></li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white border border-emerald-200 mb-4">
            <h3 className="font-semibold text-sm mb-2">🎓 Спец. тариф для школ (от 30 детей + родителей)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Школьный пакет: <strong className="text-foreground">от 1 800 ₽/гость</strong> — фуршет с детским меню + станция напитков + бумажная посуда.
              Включает: канапе, мини-сэндвичи, фрукты, пицца, капкейки, морс/лимонад.
            </p>
            <p className="text-xs text-muted-foreground">
              Бюджет на 90 чел (60 детей + 30 родителей): ~162 000 ₽ — вписывается в типовой школьный бюджет 200 000 ₽.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline">
              ✍️ Запросить пакет документов
            </Link>
            <a href={`tel:${SITE.phoneTel}`} className="rounded-lg border border-line bg-card px-5 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors no-underline">
              📞 {SITE.phone}
            </a>
            <Link href="/certificates" className="rounded-lg border border-line bg-card px-5 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors no-underline">
              📋 Все сертификаты
            </Link>
          </div>
        </div>

        {/* Безопасность для детей */}
        <div className="mt-8 p-5 rounded-xl border border-line bg-card">
          <h2 className="font-heading text-lg font-medium mb-2">🛡 Безопасность детей</h2>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            <li>• Все блюда готовятся на сертифицированном производстве (ТР ТС 021/2011, HACCP)</li>
            <li>• 14 аллергенов маркируются по ТР ТС 022/2011 (Приложение 3)</li>
            <li>• Возможность исключить конкретные аллергены (орехи, глютен, молоко) — указать в заявке</li>
            <li>• Возрастные ограничения: блюда без алкоголя, без сырой рыбы для детей до 12 лет</li>
            <li>• Бумажная или многоразовая посуда (на выбор), бирки с составом на каждое блюдо</li>
            <li>• Персонал с медкнижками и санминимумом</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
