import type { Metadata } from "next";
import Link from "next/link";
import TariffOffersSection from "@/components/blocks/TariffOffersSection";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Детские праздники",
  description:
    "Детский кейтеринг NiloV: Эконом — без орехов; Стандарт/Расширенный — с маркировкой. Анафилаксия-протокол: EpiPen, отдельная смена. Мин. 10 (мед. диеты — от 6).",
  alternates: {
    canonical: "/events/detskoe",
    languages: { ru: "/events/detskoe", "x-default": "/events/detskoe" },
  },
};

export default function DetskoeEventPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">Детские праздники</h1>
        <p className="text-muted-foreground mb-2">
          Специальное меню, аниматоры, шоу-программа. Безопасные ингредиенты, согласованное меню.
          Мин. 10 гостей (для медицинских диет — от 6 детей).
        </p>
        <p className="text-muted-foreground mb-8 text-xs">
          Все цены ориентировочные. Меню адаптируется под возраст детей.
        </p>

        {/* Анафилаксия-протокол — ВВЕРХУ */}
        <div className="mb-8 rounded-xl border-2 border-red-300 bg-red-50 p-5">
          <h2 className="font-heading mb-2 text-base font-bold text-red-900">
            Анафилаксия на орехи? Безопасно.
          </h2>
          <p className="mb-3 text-sm text-red-900">
            <strong>В пакетах «Эконом» и базовом наборе НЕТ блюд с цельными орехами</strong>{" "}
            (арахис, лесной, кедровый, грецкий) — по умолчанию. В пакетах «Стандарт» и «Расширенный»
            часть десертов (брауни, миндальная мука в БГ-выпечке) содержит орехи — они
            промаркированы значком «Орехи» (см.{" "}
            <a href="/menu/detskoe" className="underline">
              /menu/detskoe
            </a>
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
        <div className="mb-8 rounded-xl border-2 border-purple-300 bg-purple-50 p-5">
          <h2 className="font-heading mb-2 text-base font-bold text-purple-900">
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
        <div className="mb-8 rounded-xl border-2 border-blue-300 bg-blue-50 p-5">
          <h2 className="font-heading mb-2 text-base font-bold text-blue-900">
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
        <div className="border-gold-tint bg-gold-tint/30 mb-8 rounded-xl border p-4">
          <p className="mb-1 text-sm font-medium">Нужен и взрослый стол?</p>
          <p className="text-muted-foreground mb-3 text-xs">
            В конструкторе меню можно включить режим «Несколько групп гостей» — отдельно собрать
            детское меню и отдельно взрослое, с раздельным расчётом цены.
          </p>
          <Link
            href="/plan/constructor?format=detskoe"
            className="text-gold-text text-xs font-semibold hover:underline"
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
        <div className="bg-primary text-primary-foreground mt-12 rounded-xl p-6 text-center">
          <h2 className="font-heading mb-2 text-xl font-medium">Безопасный детский праздник</h2>
          <p className="mb-4 text-sm opacity-90">
            Позвоните или оставьте заявку — менеджер свяжется для подтверждения протокола
            безопасности.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="bg-background text-foreground hover:bg-background/90 inline-flex min-h-[44px] items-center rounded-lg px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              {SITE.phone}
            </a>
            <Link
              href="/contact"
              className="border-background hover:bg-background/10 inline-flex min-h-[44px] items-center rounded-lg border-2 px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Заявка с аллергией
            </Link>
            <Link
              href="/menu/detskoe"
              className="border-background hover:bg-background/10 inline-flex min-h-[44px] items-center rounded-lg border-2 px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Детское меню
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
