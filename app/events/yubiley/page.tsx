import type { Metadata } from "next";
import Link from "next/link";
import TariffOffersSection from "@/components/blocks/TariffOffersSection";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Юбилей и годовщина — кейтеринг в СПб",
  description:
    "Кейтеринг на золотую свадьбу, юбилей, годовщину. Банкет от 20 гостей. Бюджетные решения от 36 750 ₽ за 15 чел (фуршет-Эконом) или от 79 000 ₽ (банкет-Эконом). Честные цены, реальные отзывы, большой шрифт.",
  alternates: {
    canonical: "/events/yubiley",
    languages: { ru: "/events/yubiley", "x-default": "/events/yubiley" },
  },
};

export default function YubileyPage() {
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
          <span className="text-foreground">Юбилей / Годовщина</span>
        </nav>

        <h1 className="font-heading mb-4 text-3xl font-medium md:text-5xl">
          Юбилей и годовщина свадьбы
        </h1>
        <p className="text-muted-foreground mb-6 text-lg">
          Кейтеринг на золотую свадьбу, юбилей, годовщину. Банкет с посадкой для пожилых гостей —
          камерный формат от 15 человек. Честные цены, большой шрифт, телефон для звонка.
        </p>

        {/* Phone CTA — large for elderly */}
        <div className="border-gold-tint bg-gold-tint/10 mb-8 rounded-2xl border-2 p-6">
          <h2 className="font-heading mb-2 text-xl font-medium">Позвоните — поможем выбрать</h2>
          <p className="text-muted-foreground mb-4 text-base">
            Не любите заполнять формы? Позвоните — шеф-повар Дмитрий Нилов лично подберёт меню под
            ваш бюджет и повод. Перезвоним в течение 15 минут.
          </p>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-xl px-6 py-4 text-xl font-semibold no-underline transition-colors"
          >
            {SITE.phone}
          </a>
          <p className="text-muted-foreground mt-3 text-sm">
            Звонок бесплатный из любой точки РФ. Работаем ежедневно с 9:00 до 21:00.
          </p>
        </div>

        {/* Бюджетные решения — для 15 чел на 79 000 ₽ */}
        <div className="border-line bg-card mb-8 rounded-2xl border p-6">
          <h2 className="font-heading mb-3 text-xl font-medium">
            Что помещается в бюджет 79 000 ₽ на 15 гостей
          </h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Золотая свадьба или юбилей на 20 гостей — нужен банкет с посадкой. Вот реальные варианты
            под бюджет 79 000 ₽:
          </p>
          <div className="space-y-3">
            <div className="border-gold-tint bg-gold-tint/10 rounded-lg border-2 p-4">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold">Вариант 1: Индивидуальный пакет «Юбилейный»</h3>
                <span className="text-gold-text text-base font-bold">от 79 000 ₽ за 15 чел</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Камерный банкет под ваш бюджет: 3 закуски, 1 горячее, десерт, чай/кофе, посуда,
                официант, доставка по КАД. Меню адаптировано для пожилых гостей (диетические опции,
                без острых блюд).
              </p>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="bg-primary text-primary-foreground hover:bg-primary/90 mt-3 inline-block inline-flex min-h-[44px] items-center rounded-lg px-4 py-2 text-sm font-semibold no-underline transition-colors"
              >
                Обсудить пакет «Юбилейный»
              </a>
            </div>
            <div className="border-line bg-background rounded-lg border p-4">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold">Вариант 2: Фуршет-Эконом с посадкой</h3>
                <span className="text-gold-text text-base font-bold">15 × 2 450 ₽ = 36 750 ₽</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Лёгкие закуски, канапе, горячее, чай/кофе. Гости могут сидеть за столом, но без
                полноценной подачи. Экономия ~22 500 ₽ от бюджета — можно добавить торт или
                расширить меню.
              </p>
            </div>
          </div>
        </div>

        {/* Premium (вне бюджета) — отдельный блок */}
        <div className="border-line bg-secondary/30 mb-8 rounded-xl border p-4">
          <h3 className="font-heading mb-2 text-base font-medium">
            Премиум-вариант (вне основного бюджета)
          </h3>
          <p className="text-muted-foreground text-sm">
            Банкет-Максимальный: <strong>15 × 9 950 ₽ = 149 250 ₽</strong> — 5 закусок, 2 горячих,
            икорная станция, сомелье, торт, координатор. Премиум-формат для особого повода. Возможна
            рассрочка или уменьшение количества блюд.
          </p>
        </div>

        <TariffOffersSection
          eventId="chastnoe"
          eventName="Юбилей / Годовщина"
          description="Тарифы для юбилея (используются тарифы частных событий — банкет с посадкой, от 20 гостей). Для юбилеев рекомендуется тариф «Стандарт» или «Расширенный»."
        />

        {/* Что важно для пожилых гостей */}
        <div className="border-line bg-card mt-12 rounded-2xl border p-6">
          <h2 className="font-heading mb-3 text-xl font-medium">Что важно для пожилых гостей</h2>
          <ul className="text-muted-foreground space-y-2 text-base">
            <li>Банкет с посадкой (не фуршет стоя) — пожилым тяжело стоять 2+ часа</li>
            <li>Меню с диетическими опциями (без острого, без жареного, без сырой рыбы)</li>
            <li>Возможность безглютенового и безмолочного меню для аллергиков</li>
            <li>Официанты с опытом работы с пожилыми гостями (терпение, вежливость)</li>
            <li>Чайная станция с травяными чаями (облепиха, ромашка, иван-чай)</li>
            <li>Тишина и неспешная подача — без шумных станций и бармен-шоу</li>
            <li>Возможность тоста и музыкального сопровождения (по запросу)</li>
          </ul>
        </div>

        {/* Юридическая прозрачность */}
        <div className="border-gold-tint bg-gold-tint/5 mt-8 rounded-xl border-2 p-5">
          <h2 className="font-heading mb-2 text-lg font-medium">Юридическая прозрачность</h2>
          <dl className="space-y-1 text-base">
            <div className="flex gap-2">
              <dt className="text-muted-foreground shrink-0">Юр.лицо:</dt>
              <dd className="font-medium">{SITE.legalName}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground shrink-0">ИНН:</dt>
              <dd className="font-mono">{SITE.inn}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground shrink-0">ОГРНИП:</dt>
              <dd className="font-mono">{SITE.ogrnip}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground shrink-0">Адрес:</dt>
              <dd>{SITE.legalAddress}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground shrink-0">Сайт:</dt>
              <dd>
                {SITE.domain} · {SITE.altDomain}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground shrink-0">С работы:</dt>
              <dd>с 2007 года (19 лет в бизнесе)</dd>
            </div>
          </dl>
          <p className="text-muted-foreground mt-3 text-sm">
            Проверить контрагента:{" "}
            <a
              href="https://www.rusprofile.ru/ip/314784710400401"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-text hover:underline"
            >
              rusprofile.ru →
            </a>
            {" · "}
            <Link href="/certificates" className="text-gold-text hover:underline">
              все сертификаты →
            </Link>
            {" · "}
            <Link href="/reviews" className="text-gold-text hover:underline">
              отзывы →
            </Link>
          </p>
        </div>

        {/* CTA */}
        <div className="bg-primary text-primary-foreground mt-8 rounded-xl p-6 text-center">
          <h2 className="font-heading mb-2 text-xl font-medium">Готовы обсудить ваше событие?</h2>
          <p className="mb-4 text-base opacity-90">
            Позвоните или оставьте заявку — перезвоним за 15 минут.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="bg-background text-foreground hover:bg-background/90 rounded-lg px-6 py-3 text-base font-semibold no-underline transition-colors"
            >
              {SITE.phone}
            </a>
            <Link
              href="/contact"
              className="border-background hover:bg-background/10 rounded-lg border-2 px-6 py-3 text-base font-semibold no-underline transition-colors"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
