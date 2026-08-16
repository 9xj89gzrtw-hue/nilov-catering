import type { Metadata } from "next";
import Link from "next/link";
import TariffOffersSection from "@/components/blocks/TariffOffersSection";
import EventHero from "@/components/events/EventHero";
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

const QUICK_FACTS = [
  { value: "от 79 000 ₽", label: "за 15 гостей" },
  { value: "от 15", label: "минимум гостей" },
  { value: "банкет", label: "с посадкой" },
  { value: "19 лет", label: "опыт работы" },
];

export default function YubileyPage() {
  return (
    <main id="main" className="pb-20">
      {/* Premium Hero Section */}
      <EventHero
        label="Юбилеи и годовщины · камерный формат"
        title="Юбилей и годовщина свадьбы"
        description="Кейтеринг на золотую свадьбу, юбилей, годовщину. Банкет с посадкой для пожилых гостей — камерный формат от 15 человек. Честные цены, большой шрифт, телефон для звонка."
        breadcrumbName="Юбилей / Годовщина"
        priceInfo={
          <>
            <span className="font-semibold">
              <span style={{ color: "#C9A66B" }}>от 79 000 ₽</span> за 15 чел
            </span>
            <span className="text-white/40">·</span>
            <span>банкет с посадкой</span>
            <span className="text-white/40">·</span>
            <span>диетическое меню</span>
          </>
        }
        quickFacts={QUICK_FACTS}
      />

      <div className="container-site max-w-4xl">
        {/* Phone CTA — large for elderly */}
        <div className="-mx-4 mt-12 mb-8 rounded-2xl border-2 border-[#C9A66B]/30 bg-[#C9A66B]/5 p-6 sm:-mx-6 md:-mx-8">
          <h2 className="font-heading mb-2 text-xl font-medium text-[#2D2624] md:text-2xl">
            Позвоните — поможем выбрать
          </h2>
          <p className="mb-4 text-base text-[#6B6560]">
            Не любите заполнять формы? Позвоните — шеф-повар Дмитрий Нилов лично подберёт меню под
            ваш бюджет и повод. Перезвоним в течение 15 минут.
          </p>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex items-center gap-3 rounded-xl px-6 py-4 text-xl font-semibold text-white no-underline transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #AA771C 100%)",
              boxShadow: "0 4px 16px rgba(184,134,11,0.35), 0 0 0 1px rgba(212,175,55,0.2) inset",
            }}
          >
            {SITE.phone}
          </a>
          <p className="mt-3 text-sm text-[#6B6560]">
            Звонок бесплатный из любой точки РФ. Работаем ежедневно с 9:00 до 21:00.
          </p>
        </div>

        {/* Бюджетные решения — для 15 чел на 79 000 ₽ */}
        <div
          className="mb-8 rounded-2xl border border-[#E8E4DE] bg-white p-6"
          role="region"
          aria-labelledby="budget-heading"
        >
          <h2 id="budget-heading" className="font-heading mb-3 text-xl font-medium text-[#2D2624]">
            Что помещается в бюджет 79 000 ₽ на 15 гостей
          </h2>
          <p className="mb-4 text-sm text-[#6B6560]">
            Золотая свадьба или юбилей на 20 гостей — нужен банкет с посадкой. Вот реальные варианты
            под бюджет 79 000 ₽:
          </p>
          <div className="space-y-3">
            {/* Вариант 1 */}
            <div
              className="rounded-lg border-2 border-[#C9A66B]/30 bg-[#C9A66B]/5 p-4"
              role="article"
            >
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold text-[#2D2624]">
                  Вариант 1: Индивидуальный пакет «Юбилейный»
                </h3>
                <span className="text-base font-bold" style={{ color: "#C9A66B" }}>
                  от 79 000 ₽ за 15 чел
                </span>
              </div>
              <p className="text-sm text-[#6B6560]">
                Камерный банкет под ваш бюджет: 3 закуски, 1 горячее, десерт, чай/кофе, посуда,
                официант, доставка по КАД. Меню адаптировано для пожилых гостей (диетические опции,
                без острых блюд).
              </p>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="mt-3 inline-flex min-h-[44px] items-center rounded-lg px-4 py-2 text-sm font-semibold text-white no-underline transition-colors"
                style={{
                  background: "linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #AA771C 100%)",
                }}
              >
                Обсудить пакет «Юбилейный»
              </a>
            </div>

            {/* Вариант 2 */}
            <div className="rounded-lg border border-[#E8E4DE] bg-white p-4" role="article">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold text-[#2D2624]">
                  Вариант 2: Фуршет-Эконом с посадкой
                </h3>
                <span className="text-base font-bold" style={{ color: "#C9A66B" }}>
                  15 × 2 450 ₽ = 36 750 ₽
                </span>
              </div>
              <p className="text-sm text-[#6B6560]">
                Лёгкие закуски, канапе, горячее, чай/кофе. Гости могут сидеть за столом, но без
                полноценной подачи. Экономия ~22 500 ₽ от бюджета — можно добавить торт или
                расширить меню.
              </p>
            </div>
          </div>
        </div>

        {/* Premium (вне бюджета) */}
        <div
          className="mb-8 rounded-xl border border-[#E8E4DE] bg-[#FAF8F5] p-4"
          role="complementary"
        >
          <h3 className="font-heading mb-2 text-base font-medium text-[#2D2624]">
            Премиум-вариант (вне основного бюджета)
          </h3>
          <p className="text-sm text-[#6B6560]">
            Банкет-Люкс:{" "}
            <strong className="text-[#2D2624]">15 × 9 950 ₽ = 149 250 ₽</strong> — 5 закусок, 2
            горячих, икорная станция, сомелье, торт, координатор. Премиум-формат для особого повода.
            Возможна рассрочка или уменьшение количества блюд.
          </p>
        </div>

        <TariffOffersSection
          eventId="chastnoe"
          eventName="Юбилей / Годовщина"
          description="Тарифы для юбилея (используются тарифы частных событий — банкет с посадкой, от 20 гостей). Для юбилеев рекомендуется тариф «Стандарт» или «Премиум»."
        />

        {/* Что важно для пожилых гостей */}
        <div
          className="mt-12 rounded-2xl border border-[#E8E4DE] bg-white p-6"
          role="region"
          aria-labelledby="elderly-heading"
        >
          <h2 id="elderly-heading" className="font-heading mb-3 text-xl font-medium text-[#2D2624]">
            Что важно для пожилых гостей
          </h2>
          <ul className="space-y-2 text-base text-[#6B6560]">
            <li className="flex gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "#C9A66B" }}
                aria-hidden="true"
              />
              Банкет с посадкой (не фуршет стоя) — пожилым тяжело стоять 2+ часа
            </li>
            <li className="flex gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "#C9A66B" }}
                aria-hidden="true"
              />
              Меню с диетическими опциями (без острого, без жареного, без сырой рыбы)
            </li>
            <li className="flex gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "#C9A66B" }}
                aria-hidden="true"
              />
              Возможность безглютенового и безмолочного меню для аллергиков
            </li>
            <li className="flex gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "#C9A66B" }}
                aria-hidden="true"
              />
              Официанты с опытом работы с пожилыми гостями (терпение, вежливость)
            </li>
            <li className="flex gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "#C9A66B" }}
                aria-hidden="true"
              />
              Чайная станция с травяными чаями (облепиха, ромашка, иван-чай)
            </li>
            <li className="flex gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "#C9A66B" }}
                aria-hidden="true"
              />
              Тишина и неспешная подача — без шумных станций и бармен-шоу
            </li>
            <li className="flex gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "#C9A66B" }}
                aria-hidden="true"
              />
              Возможность тоста и музыкального сопровождения (по запросу)
            </li>
          </ul>
        </div>

        {/* Юридическая прозрачность */}
        <div
          className="mt-8 rounded-xl border-2 border-[#C9A66B]/20 bg-[#C9A66B]/5 p-5"
          role="complementary"
          aria-labelledby="legal-heading"
        >
          <h2 id="legal-heading" className="font-heading mb-2 text-lg font-medium text-[#2D2624]">
            Юридическая прозрачность
          </h2>
          <dl className="space-y-1 text-base">
            <div className="flex gap-2">
              <dt className="shrink-0 text-[#6B6560]">Юр.лицо:</dt>
              <dd className="font-medium text-[#2D2624]">{SITE.legalName}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 text-[#6B6560]">ИНН:</dt>
              <dd className="font-mono text-[#2D2624]">{SITE.inn}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 text-[#6B6560]">ОГРНИП:</dt>
              <dd className="font-mono text-[#2D2624]">{SITE.ogrnip}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 text-[#6B6560]">Адрес:</dt>
              <dd className="text-[#2D2624]">{SITE.legalAddress}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 text-[#6B6560]">Сайт:</dt>
              <dd className="text-[#2D2624]">
                {SITE.domain} · {SITE.altDomain}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 text-[#6B6560]">С работы:</dt>
              <dd className="text-[#2D2624]">с 2007 года (19 лет в бизнесе)</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-[#6B6560]">
            Проверить контрагента:{" "}
            <a
              href="https://www.rusprofile.ru/ip/314784710400401"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-colors hover:underline"
              style={{ color: "#C9A66B" }}
            >
              rusprofile.ru →
            </a>
            {" · "}
            <Link
              href="/certificates"
              className="font-semibold transition-colors hover:underline"
              style={{ color: "#C9A66B" }}
            >
              все сертификаты →
            </Link>
            {" · "}
            <Link
              href="/reviews"
              className="font-semibold transition-colors hover:underline"
              style={{ color: "#C9A66B" }}
            >
              отзывы →
            </Link>
          </p>
        </div>

        {/* CTA Section */}
        <div
          className="mt-8 rounded-xl p-6 text-center"
          style={{
            background: "linear-gradient(135deg, #2D2624 0%, #3D3530 100%)",
          }}
        >
          <h2 className="font-heading mb-2 text-xl font-medium text-white md:text-2xl">
            Готовы обсудить ваше событие?
          </h2>
          <p className="mb-6 text-base text-white/80 md:text-lg">
            Позвоните или оставьте заявку — перезвоним за 15 минут.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-[#2D2624] no-underline transition-colors hover:bg-white/90"
            >
              {SITE.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center rounded-full border-2 border-white/30 px-6 py-3 text-base font-medium text-white no-underline transition-colors hover:border-white/50 hover:bg-white/5"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
