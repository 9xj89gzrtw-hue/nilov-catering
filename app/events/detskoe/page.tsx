import type { Metadata } from "next";
import Link from "next/link";
import TariffOffersSection from "@/components/blocks/TariffOffersSection";
import EventHero from "@/components/events/EventHero";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Детские праздники — кейтеринг в СПб",
  description:
    "Детский кейтеринг NiloV: Эконом — без орехов; Стандарт/Расширенный — с маркировкой. Анафилаксия-протокол: EpiPen, отдельная смена. Мин. 10 (мед. диеты — от 6).",
  alternates: {
    canonical: "/events/detskoe",
    languages: { ru: "/events/detskoe", "x-default": "/events/detskoe" },
  },
};

const QUICK_FACTS = [
  { value: "от 1 550 ₽", label: "за гостя" },
  { value: "от 10", label: "минимум гостей" },
  { value: "0", label: "орехов по умолчанию" },
  { value: "EpiPen", label: "протокол аллергии" },
];

export default function DetskoeEventPage() {
  return (
    <main id="main" className="pb-20">
      {/* Premium Hero Section */}
      <EventHero
        label="Детские праздники · безопасно"
        title="Детские праздники"
        description="Специальное меню, аниматоры, шоу-программа. Безопасные ингредиенты, согласованное меню. Протокол анафилаксии: отдельная смена, EpiPen на руках у ответственного сотрудника."
        breadcrumbName="Детские праздники"
        priceInfo={
          <>
            <span className="font-semibold">
              <span style={{ color: "#C9A66B" }}>от 1 550 ₽</span>/гость
            </span>
            <span className="text-white/40">·</span>
            <span>от 10 гостей</span>
            <span className="text-white/40">·</span>
            <span>без орехов по умолчанию</span>
          </>
        }
        quickFacts={QUICK_FACTS}
      />

      <div className="container-site max-w-3xl">
        {/* Intro section */}
        <div className="mt-12 mb-8 md:mt-16">
          <p className="mb-4 text-sm text-[#6B6560] md:text-base">
            Все цены ориентировочные. Меню адаптируется под возраст детей.
          </p>
        </div>

        {/* Анафилаксия-протокол — ВВЕРХУ */}
        <div
          className="mb-8 rounded-xl border-2 border-red-300 bg-red-50 p-5"
          role="region"
          aria-labelledby="anaphylaxis-heading"
        >
          <h2
            id="anaphylaxis-heading"
            className="font-heading mb-2 text-base font-bold text-red-900"
          >
            Анафилаксия на орехи? Безопасно.
          </h2>
          <p className="mb-3 text-sm text-red-900">
            <strong>В пакетах «Эконом» и базовом наборе НЕТ блюд с цельными орехами</strong>{" "}
            (арахис, лесной, кедровый, грецкий) — по умолчанию. В пакетах «Стандарт» и «Расширенный»
            часть десертов (брауни, миндальная мука в БГ-выпечке) содержит орехи — они
            промаркированы значком «Орехи» (см.{" "}
            <Link href="/menu/detskoe" className="underline">
              /menu/detskoe
            </Link>
            ). При заявленной анафилаксии на любой орех (включая миндаль) — выбираем только
            Эконом/базовый набор:
          </p>
          <ul className="mb-3 ml-4 list-disc space-y-1 text-sm text-red-900">
            <li>Отдельная смена приготовления — без пересечения с другими заказами</li>
            <li>Отдельная зона кухни с красной цветовой маркировкой</li>
            <li>Отдельные доски, ножи, посуда — никогда не используются для ореховых блюд</li>
            <li>Маркировка каждого блюда на событии — этикетка с составом на каждом блюде</li>
            <li>
              {" "}
              <strong>EpiPen / адреналин</strong> на руках у ответственного сотрудника
            </li>
            <li>Менеджер звонит клиенту за 24 часа до события для подтверждения протокола</li>
          </ul>
          <p className="text-sm text-red-900">
            Укажите тип ореха и тяжесть аллергии в заявке. Подробнее:{" "}
            <Link href="/allergens" className="font-semibold underline">
              /allergens →
            </Link>{" "}
            <Link href="/certificates" className="font-semibold underline">
              /certificates →
            </Link>
          </p>
        </div>

        {/* СД1/СД2-протокол */}
        <div
          className="mb-8 rounded-xl border-2 border-purple-300 bg-purple-50 p-5"
          role="region"
          aria-labelledby="diabetes-heading"
        >
          <h2
            id="diabetes-heading"
            className="font-heading mb-2 text-base font-bold text-purple-900"
          >
            Сахарный диабет (СД1/СД2)? Безопасно.
          </h2>
          <p className="mb-3 text-sm text-purple-900">
            <strong>Для гостя с СД1 сладкий стол исключаем по умолчанию</strong> и заменяем на
            сырно-фруктовую тарелку (брусника, черника, киви, твёрдые сыры — низкий ГИ) или десерты
            без добавленного сахара (стевия/эритрит). Если в пакете «Стандарт» или «Расширенный»
            сладкий стол заявлен — для группы с СД1 он автоматически заменяется.
          </p>
          <ul className="mb-3 ml-4 list-disc space-y-1 text-sm text-purple-900">
            <li>Расчёт хлебных единиц (ХЕ) на каждое блюдо — 1 ХЕ = 10–12 г углеводов</li>
            <li>Без добавленного сахара, мёда, фруктозы, сиропов (включая кленовый, агавы)</li>
            <li>
              Без скрытых сахаров в соусах (кетчуп, терияки — либо исключаем, либо готовим без
              сахара)
            </li>
            <li>Фрукты с низким ГИ (клубника, киви, черника) — без банана, винограда, дыни</li>
            <li>Состав БЖУ + ХЕ указываем в карточке блюда и в меню-карте</li>
            <li>Шеф-кондитер Елена Соколова специализируется на диабетической выпечке</li>
            <li>Обязательная дегустация для гостя с СД1 — подтверждение состава и расчёта ХЕ</li>
            <li>
              Ищите в каталоге блюда со значком{" "}
              <span className="inline-block rounded bg-purple-200 px-1.5 py-0.5 text-[10px] font-medium text-purple-800">
                SF
              </span>{" "}
              (без сахара)
            </li>
          </ul>
          <p className="text-sm text-purple-900">
            Укажите «СД1» или «СД2» в заявке. Полный протокол — на странице{" "}
            <Link href="/allergens" className="font-semibold underline">
              /allergens →
            </Link>
          </p>
        </div>

        {/* Целиакия-протокол */}
        <div
          className="mb-8 rounded-xl border-2 border-blue-300 bg-blue-50 p-5"
          role="region"
          aria-labelledby="celiac-heading"
        >
          <h2 id="celiac-heading" className="font-heading mb-2 text-base font-bold text-blue-900">
            Целиакия? Безопасно.
          </h2>
          <p className="mb-3 text-sm text-blue-900">
            <strong>Безглютеновое детское меню</strong> на миндальной/рисовой муке — отдельная линия
            кухни, тестирование &lt;20 ppm (стандарт GFCO). БГ торт, БГ капкейки, БГ пицца, БГ
            панкейки без сахара (для СД1).{" "}
            <Link href="/menu/gluten-free" className="font-semibold underline">
              БГ-меню →
            </Link>
          </p>
        </div>

        {/* Гибрид: дети + взрослые */}
        <div className="mb-8 rounded-xl border border-[#C9A66B]/30 bg-[#C9A66B]/5 p-4">
          <p className="mb-1 text-sm font-medium text-[#2D2624]">Нужен и взрослый стол?</p>
          <p className="mb-3 text-xs text-[#6B6560]">
            В конструкторе меню можно включить режим «Несколько групп гостей» — отдельно собрать
            детское меню и отдельно взрослое, с раздельным расчётом цены.
          </p>
          <Link
            href="/plan/constructor?format=detskoe"
            className="text-sm font-semibold transition-colors hover:underline"
            style={{ color: "#C9A66B" }}
          >
            Собрать гибридное меню в конструкторе →
          </Link>
        </div>

        <TariffOffersSection
          eventId="detskoe"
          eventName="Детский праздник"
          description="Тарифы для детских праздников: от базового фуршета до шоу-программы с сладкий стол."
        />

        {/* CTA — контакты */}
        <div
          className="mt-12 rounded-xl p-6 text-center"
          style={{ background: "linear-gradient(135deg, #2D2624 0%, #3D3530 100%)" }}
        >
          <h2 className="font-heading mb-2 text-xl font-medium text-white">
            Безопасный детский праздник
          </h2>
          <p className="mb-4 text-sm text-white/80">
            Позвоните или оставьте заявку — менеджер свяжется для подтверждения протокола
            безопасности.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex min-h-[44px] items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#2D2624] no-underline transition-colors hover:bg-white/90"
            >
              {SITE.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center rounded-lg border-2 border-white/30 px-5 py-2.5 text-sm font-medium text-white no-underline transition-colors hover:border-white/50 hover:bg-white/5"
            >
              Заявка с аллергией
            </Link>
            <Link
              href="/menu/detskoe"
              className="inline-flex min-h-[44px] items-center rounded-lg border-2 border-white/30 px-5 py-2.5 text-sm font-medium text-white no-underline transition-colors hover:border-white/50 hover:bg-white/5"
            >
              Детское меню
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
