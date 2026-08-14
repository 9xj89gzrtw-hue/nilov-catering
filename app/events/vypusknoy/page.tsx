import type { Metadata } from "next";
import Link from "next/link";
import TariffOffersSection from "@/components/blocks/TariffOffersSection";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Выпускные — кейтеринг для школ и вузов СПб",
  description:
    "Кейтеринг на выпускной: фуршеты и банкеты для школ и вузов. Школьный пакет от 1 800 ₽/гость, стандартный банкет от 3 950 ₽/гость. B2B: договор, ЭДО, медкнижки, бракераж, согласование с Роспотребнадзором.",
  alternates: {
    canonical: "/events/vypusknoy",
    languages: { ru: "/events/vypusknoy", "x-default": "/events/vypusknoy" },
  },
};

export default function VypusknoyPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-4xl">
        <nav aria-label="Хлебные крошки" className="text-muted-foreground mb-4 text-sm">
          <Link href="/" className="hover:text-foreground">
            Главная
          </Link>
          {" / "}
          <Link href="/events" className="hover:text-foreground">
            События
          </Link>
          {" / "}
          <span className="text-foreground">Выпускные</span>
        </nav>

        <h1 className="font-heading mb-3 text-3xl font-medium md:text-4xl">Выпускные</h1>
        <p className="text-muted-foreground mb-6 text-lg">
          Кейтеринг для школьных и студенческих выпускных. Бюджетные решения от 390 ₽/гость
          (кофе-брейк) до 7 350 ₽/гость (расширенный банкет). Работаем со школами, вузами, детскими
          садами — полный пакет документов для Роспотребнадзора.
        </p>

        {/* Бюджетный мост — для тех, кому фуршет дорого */}
        <div className="border-gold-tint bg-gold-tint/10 mb-8 rounded-xl border-2 p-6">
          <h2 className="font-heading mb-2 text-lg font-medium">Ограниченный бюджет?</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Кофе-брейк от <strong className="text-foreground">390 ₽/гость</strong> — выпечка,
            сэндвичи, фрукты, напитки. На 25 человек = ~9 750 ₽. На 60 детей = ~23 400 ₽. Или
            доставка без официантов от <strong className="text-foreground">5 000 ₽</strong>.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/pricing?event=coffee-break"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] items-center rounded-lg px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Смотреть кофе-брейк тарифы
            </Link>
            <Link
              href="/delivery/order"
              className="border-line bg-card hover:border-gold-text inline-flex min-h-[44px] items-center rounded-lg border px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Заказать доставкой
            </Link>
          </div>
        </div>

        <TariffOffersSection
          eventId="vypusknoy"
          eventName="Выпускной"
          description="Тарифы для выпускных: от бюджетного фуршета до праздника с DJ и баром безалкогольных коктейлей."
        />

        {/* School B2B block — для Ларисы (директора школы) */}
        <div className="mt-12 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6">
          <h2 className="font-heading mb-3 text-xl font-medium">
            Для школ и образовательных учреждений
          </h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Работаем со школами, вузами, детскими садами, гос. учреждениями. Полное согласование с
            Роспотребнадзором. Закупки по 44-ФЗ и 223-ФЗ — поддерживаем.
          </p>

          <div className="mb-4 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Документы для Роспотребнадзора</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>Медицинские книжки 100% персонала</li>
                <li>Журнал бракеража на каждое событие</li>
                <li>Программа производственного контроля (ППК)</li>
                <li>ТР ТС 021/2011 (пищевая безопасность) + HACCP</li>
                <li>Температурный режим (холодовая цепь ≤+6 °C)</li>
                <li>Сертификаты на все продукты</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">B2B-условия</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>Договор юр.лицо ↔ юр.лицо</li>
                <li>Счёт, акт, счёт-фактура (без НДС — УСН; с НДС — через партнёрское ООО)</li>
                <li>ЭДО: Контур.Диадок, СБИС</li>
                <li>Отсрочка платежа для постоянных клиентов</li>
                <li>Скидки от 100 гостей</li>
                <li>Индивидуальные сметы под бюджет</li>
                <li>
                  Реквизиты:{" "}
                  <a href={`mailto:${SITE.email}`} className="text-gold-text hover:underline">
                    {SITE.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-4 rounded-lg border border-emerald-200 bg-white p-4">
            <h3 className="mb-2 text-sm font-semibold">
              Спец. тариф для школ (от 30 детей + родителей)
            </h3>
            <p className="text-muted-foreground mb-2 text-sm">
              Школьный пакет: <strong className="text-foreground">от 1 800 ₽/гость</strong> — фуршет
              с детским меню + станция напитков + бумажная посуда. Включает: канапе, мини-сэндвичи,
              фрукты, пицца, капкейки, морс/лимонад.
            </p>
            <p className="text-muted-foreground text-xs">
              Бюджет на 90 чел (60 детей + 30 родителей): ~162 000 ₽ — вписывается в типовой
              школьный бюджет 200 000 ₽.
            </p>
            <p className="text-muted-foreground mt-2 rounded border border-amber-200 bg-amber-50 p-2 text-xs">
              <strong>Ограниченный бюджет? Пример:</strong> 85 детей × 1 800 ₽ = 153 000 ₽. Если
              бюджет 150 000 ₽ — сократите до 80 детей (144 000 ₽) или замените фуршет на кофе-брейк
              (85 × 390 ₽ = 33 150 ₽ + доставка 5 000 ₽ = 38 150 ₽). Также возможна рассрочка или
              спонсорская скидка —{" "}
              <Link href="/contact" className="underline">
                обсудите с менеджером
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] items-center rounded-lg px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Запросить пакет документов
            </Link>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="border-line bg-card hover:border-gold-text inline-flex min-h-[44px] items-center rounded-lg border px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              {SITE.phone}
            </a>
            <Link
              href="/certificates"
              className="border-line bg-card hover:border-gold-text inline-flex min-h-[44px] items-center rounded-lg border px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Все сертификаты
            </Link>
          </div>
        </div>

        {/* Безопасность для детей */}
        <div className="border-line bg-card mt-8 rounded-xl border p-5">
          <h2 className="font-heading mb-2 text-lg font-medium">Безопасность детей</h2>
          <ul className="text-muted-foreground space-y-1.5 text-sm">
            <li>• Все блюда готовятся на сертифицированном производстве (ТР ТС 021/2011, HACCP)</li>
            <li>• 14 аллергенов маркируются по ТР ТС 022/2011 (Приложение 3)</li>
            <li>
              • Возможность исключить конкретные аллергены (орехи, глютен, молоко) — указать в
              заявке
            </li>
            <li>
              • Возрастные ограничения: блюда без алкоголя, без сырой рыбы для детей до 12 лет
            </li>
            <li>• Бумажная или многоразовая посуда (на выбор), бирки с составом на каждое блюдо</li>
            <li>• Персонал с медкнижками и санминимумом</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
