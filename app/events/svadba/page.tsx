import type { Metadata } from "next";
import Link from "next/link";
import TariffOffersSection from "@/components/blocks/TariffOffersSection";
import ShareButton from "@/components/common/ShareButton";

export const metadata: Metadata = {
  alternates: {
    canonical: "/events/svadba",
    languages: { ru: "/events/svadba", "x-default": "/events/svadba" },
  },
  title: "Свадебный кейтеринг",
  description:
    "Свадебный кейтеринг NiloV в СПб: банкет, фуршет, торт, флористика. Полный цикл подготовки свадьбы под ключ.",
};

export default function SvadbaPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-5xl">
        {/* Hero photo — real wedding banquet */}
        <div className="relative mb-8 h-64 overflow-hidden rounded-2xl md:h-80">
          <picture>
            <source
              srcSet="/images/real/wedding-banquet-480.avif 480w, /images/real/wedding-banquet-768.avif 768w, /images/real/wedding-banquet.avif 1920w"
              sizes="(max-width: 768px) 100vw, 1024px"
              type="image/avif"
            />
            <source
              srcSet="/images/real/wedding-banquet-480.webp 480w, /images/real/wedding-banquet-768.webp 768w, /images/real/wedding-banquet.webp 1920w"
              sizes="(max-width: 768px) 100vw, 1024px"
              type="image/webp"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/real/wedding-banquet.jpg"
              alt="Свадебный банкет — кейтеринг NiloV"
              className="h-full w-full object-cover"
            />
          </picture>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 100%)",
            }}
            aria-hidden="true"
          />
          <div className="absolute right-0 bottom-0 left-0 p-5 md:p-6">
            <p className="text-gold-text mb-1 text-xs tracking-[0.2em] uppercase">
              Свадьбы под ключ
            </p>
            <h1
              className="font-heading text-2xl text-white md:text-4xl"
              style={{ fontWeight: 500 }}
            >
              Свадебный кейтеринг
            </h1>
          </div>
        </div>

        <div className="mb-8 text-center">
          <p className="text-muted-foreground mx-auto mb-2 max-w-xl">
            Меню, сервировка, торт, флористика — всё для вашей свадьбы. Работаем с лучшими
            площадками СПб.
          </p>
          <p className="text-muted-foreground text-xs">
            Цены фиксированы по тарифам (₽/гость). Доплата только за индивидуальные позиции (торт с
            декором, доп. персонал, выезд за КАД). Финальная смета фиксируется в договоре после
            согласования меню.
          </p>
          {/* Trust bar */}
          <p className="text-muted-foreground mt-3 text-sm">
            19 лет на кухне СПб · 3 000+ событий · 4.8/5 по 27 отзывам · ⏱ Перезвоним за 15 минут
          </p>
          <div className="mt-4">
            <ShareButton
              title="Свадебный кейтеринг — NiloV"
              text="Посмотри свадебные тарифы и меню — нужно согласовать"
              label="Отправить ссылку жениху/родным"
            />
          </div>
        </div>

        {/* Seasonal: White Nights */}
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-center">
          <p className="text-sm font-medium text-amber-900">
            Сезон белых ночей (май-июль) — бронирование за 60+ дней
          </p>
          <p className="mt-1 text-xs text-amber-700">
            Пиковый сезон свадеб в СПб. Забронируйте дату заранее — скидка 5% за 30 дней, 10% за 60
            дней, 15% за 90 дней.
          </p>
        </div>

        {/* Multi-diet callout — для невест с разными диетами среди гостей */}
        <div className="mb-6 rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 text-center">
          <h2 className="font-heading mb-2 text-base font-medium">
            Веган + халяль + БГ + без орехов в одной свадьбе?
          </h2>
          <p className="text-foreground/90 mb-3 text-sm">
            Да! В конструкторе меню есть режим «Несколько групп гостей». Каждая группа получает своё
            под-меню с фильтром по диете. Например, свадьба на 80: 10 веганов + 8 халяль + 4 БГ + 1
            без орехов + 57 всеядных. Цена по группам — платите только за блюда своей группы.
          </p>
          <p className="text-muted-foreground mb-3 text-xs">
            <strong>Как считается цена:</strong> веган-группа — по тарифу «Веган Стандарт» (2 950
            ₽/гость, см.{" "}
            <Link href="/menu/vegan" className="underline">
              веган-меню
            </Link>
            ). Всеядная группа — по тарифу «Свадьба Стандарт» (5 470 ₽/гость, см. тарифы ниже). Итог
            = сумма (цена по группе × кол-во гостей). Например: 50 веганов × 2 950 + 30 всеядных × 5
            470 = 147 500 + 164 100 = <strong className="text-gold-text">311 600 ₽</strong> за 80
            гостей (вместо 437 600 ₽ при единой цене 5 470 ₽/гость).
          </p>
          <Link
            href="/plan/constructor?event=svadba"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
          >
            Собрать свадебное меню с разными диетами →
          </Link>
        </div>

        {/* Vegan wedding cake callout */}
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-center">
          <p className="text-foreground/90 text-sm">
            <span className="font-medium">Веганский свадебный торт?</span> Да — отдельная выпечка на
            миндальной/рисовой муке с кокосовыми сливками. Также: БГ-торт (&lt;20 ppm), без-сахара
            торт (для СД1, на стевии). Цены — от 1 200 ₽/кг.{" "}
            <Link href="/menu/vegan" className="text-gold-text underline">
              Веган-меню →
            </Link>
          </p>
        </div>

        {/* Remote/Moscow client note */}
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-center">
          <p className="text-foreground/90 text-sm">
            <span className="font-medium">Невеста из Москвы или другого города?</span> Работаем
            удалённо: поможем найти площадку в СПб, организуем видеодегустацию по Zoom, согласуем
            меню через WhatsApp/Telegram. Связь —{" "}
            <a href="tel:+78129195911" className="text-gold-text underline">
              +7 (812) 919-59-11
            </a>{" "}
            или{" "}
            <a href="https://wa.me/78129195911" className="text-gold-text underline">
              WhatsApp
            </a>
            .
          </p>
        </div>

        {/* Direct order CTAs */}
        <div className="mb-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/plan/constructor?event=svadba"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
          >
            Оставить заявку на свадьбу
          </Link>
          <Link
            href="/tasting"
            className="border-line hover:bg-muted rounded-lg border px-6 py-3 text-sm font-semibold transition-colors"
          >
            Записаться на дегустацию
          </Link>
          <Link
            href="/pricing"
            className="border-line hover:bg-muted rounded-lg border px-6 py-3 text-sm font-semibold transition-colors"
          >
            Все тарифы и цены
          </Link>
        </div>

        {/* Аллергии — прямой мост в конструктор */}
        <div className="border-gold-tint bg-gold-tint/30 mb-10 rounded-xl border p-4 text-center">
          <p className="mb-1 text-sm font-medium">Аллергии у гостей? Рыба, орехи, глютен?</p>
          <p className="text-muted-foreground mb-3 text-xs">
            В конструкторе меню можно исключить конкретные аллергены фильтром — 14 аллергенов ТР ТС
            022/2011. Менеджер подтвердит по телефону.
          </p>
          <Link
            href="/plan/constructor?format=banket"
            className="text-gold-text text-xs font-semibold hover:underline"
          >
            Собрать свадебное меню с фильтром аллергенов →
          </Link>
        </div>

        {/* Chef quote — emotional storytelling */}
        <div className="bg-secondary/30 border-gold-text mt-12 mb-8 rounded-2xl border-l-4 p-6">
          <p className="font-heading text-foreground/90 mb-3 text-lg italic md:text-xl">
            «Свадьба — это не банкет. Это день, когда каждая деталь говорит невесте: &quot;Ты
            важна&quot;. Мы готовим не еду — мы готовим спокойствие».
          </p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <img
                src="/images/team/chef-nilov.jpg"
                alt="Дмитрий Нилов"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Дмитрий Нилов</p>
              <p className="text-muted-foreground text-xs">Шеф-повар, 19 лет опыта</p>
            </div>
          </div>
        </div>

        <TariffOffersSection
          eventId="svadba"
          eventName="Свадьба"
          description="Выберите готовый тариф или настройте меню под себя. Каждый тариф — полный состав блюд с ценами."
        />

        {/* What's included — с разбивкой по тирам */}
        <div className="border-line bg-card mt-12 rounded-xl border p-6">
          <h2 className="font-heading mb-2 text-lg font-medium">Что входит в тариф</h2>
          <p className="text-muted-foreground mb-4 text-xs">
            Состав «полного цикла» зависит от выбранного тарифа. Ниже — что входит в каждый.
          </p>

          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div className="border-line bg-secondary/30 rounded-lg border p-3">
              <h3 className="mb-2 text-sm font-medium">Эконом (3 950 ₽)</h3>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>Доставка в КАД</li>
                <li>Сервировка и базовый персонал</li>
                <li>Чай/кофе, морс</li>
                <li>Свадебный торт</li>
                <li>Винная карта и координатор — со Стандарта</li>
              </ul>
            </div>
            <div className="border-line bg-secondary/30 rounded-lg border p-3">
              <h3 className="mb-2 text-sm font-medium">Стандарт (5 470 ₽)</h3>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>Доставка в КАД</li>
                <li>Сервировка и персонал</li>
                <li>Барная станция (вкл. вино 2 бокала — опц. безалк. для халяль)</li>
                <li>Десертный стол</li>
                <li>Свадебный торт</li>
                <li>Координатор события</li>
              </ul>
            </div>
            <div className="border-line bg-secondary/30 rounded-lg border p-3">
              <h3 className="mb-2 text-sm font-medium">Расширенный (7 350 ₽)</h3>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>Всё из Стандарта</li>
                <li>Приветственный напиток</li>
                <li>Барная станция (вкл. винная карта безлимит — опц. безалк. для халяль)</li>
                <li>Шампанское (2 бокала)</li>
                <li>Морепродукты</li>
                <li>Свадебный торт</li>
              </ul>
            </div>
            <div className="border-gold-text bg-gold-tint/30 rounded-lg border p-3">
              <h3 className="mb-2 text-sm font-medium">Максимальный (9 950 ₽)</h3>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>Всё из Расширенного</li>
                <li>Свадебный торт на заказ</li>
                <li>Координатор события</li>
                <li>Сомелье + 5 вин (опц. безалк. дегустация для халяль)</li>
                <li>Чёрная икра</li>
                <li>Эко-упаковка остатков</li>
              </ul>
            </div>
          </div>
          <p className="text-muted-foreground mt-3 text-xs">
            Флористика — отдельно, бесплатно при бронировании за 60+ дней. Свадебный торт включён во
            все тарифы. Винная карта и координатор — включены в Стандарт и выше.
          </p>
          <p className="text-muted-foreground mt-2 text-xs">
            <strong>Халяль-вариант любого тарифа:</strong> винная карта заменяется на безалкогольную
            (морс/лимонад/мята-вода/бар безалкогольных коктейлей). Скидка 200 ₽/гость. Укажите
            «халяль» в заявке.
          </p>
          <p className="text-muted-foreground mt-2 text-xs">
            <strong>Анафилаксия на орехи?</strong> В меню по умолчанию нет цельных орехов. При
            анафилаксии — отдельная смена, EpiPen у ответственного сотрудника. См.{" "}
            <a href="/allergens" className="underline">
              аллергены
            </a>
            .
          </p>
        </div>

        {/* Production rider — тайминги, оборудование, штат */}
        <div className="border-line bg-card mt-12 rounded-xl border p-6">
          <h2 className="font-heading mb-4 text-2xl font-medium">Производственный райдер</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-gold-text mb-2 font-semibold">Тайминги</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>Заезд команды: за 4 часа до начала (банкет 100+ — за 6 часов)</li>
                <li>Готовность раздаточных столов: за 30 мин до начала</li>
                <li>Подача блюд: по согласованному таймингу (±15 минут для всех форматов)</li>
                <li>Демонтаж: после завершения + 30 мин</li>
                <li>Вывоз оборудования: 1.5 часа</li>
              </ul>
            </div>
            <div>
              <h3 className="text-gold-text mb-2 font-semibold">Штат</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>1 официант на 10 гостей (банкет), на 15 (фуршет)</li>
                <li>1 шеф-повар + 2 повара на 50 гостей</li>
                <li>1 координатор-менеджер на мероприятие</li>
                <li>Сомелье — опционально (тарифы Расширенный/Максимальный)</li>
                <li>Бармен — при наличии бара (1 на 30 гостей)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-gold-text mb-2 font-semibold">Оборудование (включено)</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>Столы раздаточные, мармиты</li>
                <li>Посуда, столовые приборы, бокалы (бокалы Riedel — тариф Премиум+)</li>
                <li>Скатерти, салфетки, текстиль (цвет — по запросу)</li>
                <li>Освещение раздаточных столов (светодиодные светильники)</li>
                <li>Музыкальное оборудование — не входит (предоставляется площадкой)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-gold-text mb-2 font-semibold">Логистика</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>Доставка по СПб (в пределах КАД) — включена</li>
                <li>Доставка за КАД — от 3 000 ₽ (зависит от расстояния)</li>
                <li>Парковка для транспорта — предоставляется площадкой</li>
                <li>Разгрузка — 30-45 мин, нужна зона разгрузки</li>
                <li>Кухня на площадке — не требуется (полуфабрикаты высокой готовности)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Extended rider — technical requirements */}
        <div className="border-line bg-secondary/30 mt-6 rounded-xl border p-6">
          <h3 className="text-gold-text mb-3 font-semibold">Технические требования к площадке</h3>
          <div className="text-muted-foreground grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-foreground mb-1 font-medium">Электричество</p>
              <p>
                Не менее 6 кВт для раздаточной зоны. Розетки 220В с заземлением. При недостатке
                мощности — генератор за отдельную плату.
              </p>
            </div>
            <div>
              <p className="text-foreground mb-1 font-medium">Вода и канализация</p>
              <p>
                Доступ к проточной воде (для мытья рук персонала). При отсутствии — бутылированная
                вода + биотуалет для персонала.
              </p>
            </div>
            <div>
              <p className="text-foreground mb-1 font-medium">Раздевалка для персонала</p>
              <p>
                Отдельное помещение 6+ м² для переодевания и хранения личных вещей персонала (8-15
                чел).
              </p>
            </div>
            <div>
              <p className="text-foreground mb-1 font-medium">Мусор и отходы</p>
              <p>
                Контейнеры для пищевых отходов + пластик/стекло. Вывоз организует NiloV Catering
                (включено).
              </p>
            </div>
          </div>
        </div>

        {/* SPb Palace/Venue Matrix — venue partnerships */}
        <section className="mt-12 mb-8">
          <h2 className="font-heading mb-4 text-2xl font-medium">Площадки Санкт-Петербурга</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Работаем на лучших площадках СПб. Знаем логистику, ограничения, кухонные мощности
            каждой.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                name: "Особняк Бруноз",
                area: "Петроградский",
                guests: "до 120",
                feature: "Исторический особняк, камерный зал",
              },
              {
                name: "Лофт «Севкабель»",
                area: "Васильевский",
                guests: "до 300",
                feature: "Индустриальный лофт, панорама Невы",
              },
              {
                name: "Конгресс-холл «Экспофорум»",
                area: "Пушкин",
                guests: "до 800",
                feature: "Конгресс-холл, 3 зала, парковка",
              },
              {
                name: "Константиновский дворец",
                area: "Стрельна",
                guests: "до 200",
                feature: "Дворцовый комплекс, набережная",
              },
              {
                name: "Особняк Половцова",
                area: "Адмиралтейский",
                guests: "до 80",
                feature: "Дворец XIX века, мраморный зал",
              },
              {
                name: "Лахта Центр",
                area: "Приморский",
                guests: "до 500",
                feature: "Небоскрёб, панорамные залы",
              },
              {
                name: "Царская усадьба «Царское Село»",
                area: "Пушкин",
                guests: "до 150",
                feature: "Исторический парк, павильоны",
              },
              {
                name: "Ресторан «Гостиный двор»",
                area: "Васильевский",
                guests: "до 100",
                feature: "Собственная кухня, терраса",
              },
              {
                name: "Вилла Роза",
                area: "Репино",
                guests: "до 60",
                feature: "Загородная вилла, Финский залив",
              },
            ].map((v) => (
              <div
                key={v.name}
                className="border-line bg-card hover:border-gold-text rounded-xl border p-4 transition-colors"
              >
                <h3 className="font-heading mb-1 text-base font-medium">{v.name}</h3>
                <p className="text-muted-foreground mb-2 text-xs">
                  {v.area} · {v.guests}
                </p>
                <p className="text-foreground/80 text-xs">{v.feature}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-4 text-center text-xs">
            Не нашли свою площадку? Работаем на любой — привезём всё необходимое.{" "}
            <Link
              href="/contact?subject=Площадка-не-в-списке"
              className="text-gold-text hover:underline"
            >
              Уточнить →
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
