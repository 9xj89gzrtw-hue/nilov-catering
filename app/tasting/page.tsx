import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/tasting", languages: { ru: "/tasting", "x-default": "/tasting" } },
  title: "Дегустация меню",
  description:
    "Дегустация перед событием: бесплатно для событий от 30 гостей, от 1 гостя для медицинских диет. До 6 блюд, аперитив, комплимент от шефа.",
};

export default function TastingPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-2xl">
        <nav aria-label="Хлебные крошки" className="text-muted-foreground mb-4 text-sm">
          <Link href="/" className="hover:text-foreground">
            Главная
          </Link>
          {" / "}
          <span className="text-foreground">Дегустация</span>
        </nav>

        <h1 className="font-heading mb-3 text-3xl font-medium md:text-4xl">Дегустация</h1>
        <p className="text-muted-foreground mb-4 text-lg">
          Пробуем меню вместе перед событием. Вы выбираете блюда, мы готовим — вы дегустируете и
          утверждаете. Для событий от 30 гостей — бесплатно. Для медицинских диет (целиакия,
          анафилаксия, сахарный диабет СД1/СД2) — обязательно от 1 гостя.
        </p>
        <p className="text-muted-foreground mb-8 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm">
          <strong>Иногородним клиентам (Москва и регионы):</strong> организуем{" "}
          <strong>видеодегустацию по Zoom</strong> — шеф покажет готовые блюда, расскажет состав,
          ответит на вопросы. Для бронирования достаточно видеодегустации. Запись —{" "}
          <a href="tel:+78129195911" className="text-gold-text underline">
            +7 (812) 919-59-11
          </a>{" "}
          или{" "}
          <a href="https://wa.me/78129195911" className="text-gold-text underline">
            WhatsApp
          </a>
          .
        </p>

        {/* Free/paid block */}
        <div className="border-gold-tint bg-gold-tint/10 mb-8 rounded-xl border-2 p-5">
          <h2 className="font-heading mb-3 text-lg font-medium">Стоимость дегустации</h2>
          <ul className="space-y-2 text-sm">
            <li>
              {" "}
              <strong>Бесплатно</strong> — для событий от 30 гостей (до 6 блюд из вашего тарифа)
            </li>
            <li>
              {" "}
              <strong>Бесплатно</strong> — для медицинских диет (целиакия, анафилаксия, сахарный
              диабет СД1/СД2) от 1 гостя
            </li>
            <li>
              {" "}
              <strong>3 000 ₽/чел</strong> — для событий до 30 гостей (3 блюда на выбор)
            </li>
            <li>
              {" "}
              <strong>5 000 ₽/чел</strong> — расширенная дегустация (6 блюд + винное сопровождение)
            </li>
            <li>
              {" "}
              <strong>От 5 000 ₽</strong> — выезд к вам (выездные расходы)
            </li>
          </ul>
          <p className="text-muted-foreground mt-3 text-xs">
            При бронировании события — стоимость дегустации вычитается из итогового счёта (для
            платных дегустаций).
          </p>
        </div>

        {/* Что входит */}
        <div className="mb-8 grid gap-4">
          {[
            {
              title: "Что входит",
              text: "До 6 блюд на выбор из вашего тарифа. Аперитив (игристое/морс) и комплимент от шефа. Длительность — до 1.5 часов. Возможность адаптации блюд под диету (веган/БГ/халяль).",
            },
            {
              title: "Где проходит",
              text: "У нас на производстве (м. Василеостровская, В.О., 20-я линия, 11) или с выездом к вам (от 5 000 ₽ за выезд по СПб и ЛО).",
            },
            {
              title: "Когда",
              text: "Будни 10:00–18:00, суббота по договорённости. Запись минимум за 5 дней. Для срочных — по запросу.",
            },
            {
              title: "Диеты и аллергены",
              text: "Для целиакии, анафилаксии, халяль, веган — дегустация по отдельному протоколу. Можно попробовать безглютеновый торт, халяль-шашлык, веган-десерт, безореховое меню. Укажите диеты в форме ниже.",
            },
          ].map((item) => (
            <div key={item.title} className="border-line bg-card rounded-lg border p-4">
              <h2 className="font-heading mb-1 text-base font-medium">{item.title}</h2>
              <p className="text-muted-foreground text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Tasting form — with diet field */}
        <div className="border-line bg-card rounded-xl border p-6">
          <h2 className="font-heading mb-4 text-xl font-medium">Записаться на дегустацию</h2>
          <form className="space-y-4" action="/api/quote" method="POST">
            <input type="hidden" name="format" value="Дегустация" />

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-foreground mb-1 block text-sm font-medium">
                  Имя *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="border-line bg-background focus:ring-ring focus:border-gold-text focus-visible:outline-gold w-full rounded-lg border px-4 py-3 text-base transition-shadow outline-none focus:ring-2 focus-visible:outline-2 focus-visible:outline-offset-2"
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-foreground mb-1 block text-sm font-medium">
                  Телефон *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  className="border-line bg-background focus:ring-ring focus:border-gold-text focus-visible:outline-gold w-full rounded-lg border px-4 py-3 text-base transition-shadow outline-none focus:ring-2 focus-visible:outline-2 focus-visible:outline-offset-2"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="date" className="text-foreground mb-1 block text-sm font-medium">
                  Желаемая дата
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  className="border-line bg-background focus:ring-ring focus:border-gold-text focus-visible:outline-gold w-full rounded-lg border px-4 py-3 text-base transition-shadow outline-none focus:ring-2 focus-visible:outline-2 focus-visible:outline-offset-2"
                />
              </div>
              <div>
                <label htmlFor="guests" className="text-foreground mb-1 block text-sm font-medium">
                  Кол-во гостей на дегустацию
                </label>
                <input
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  max="12"
                  defaultValue="2"
                  className="border-line bg-background focus:ring-ring focus:border-gold-text focus-visible:outline-gold w-full rounded-lg border px-4 py-3 text-base transition-shadow outline-none focus:ring-2 focus-visible:outline-2 focus-visible:outline-offset-2"
                />
              </div>
            </div>

            {/* Diets — multi-select */}
            <div>
              <label className="text-foreground mb-2 block text-sm font-medium">
                Диеты гостей на дегустации
              </label>
              <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                {[
                  { value: "vegan", label: "Веган" },
                  { value: "gluten-free", label: "Без глютена" },
                  { value: "halal", label: "Халяль" },
                  { value: "nut-free", label: "Без орехов" },
                  { value: "dairy-free", label: "Без молока" },
                  { value: "allergy-other", label: "Другая аллергия" },
                ].map((d) => (
                  <label
                    key={d.value}
                    className="border-line bg-background hover:border-gold-text flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 transition-colors"
                  >
                    <input type="checkbox" name="diets" value={d.value} />
                    <span>{d.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Format of event */}
            <div>
              <label
                htmlFor="eventFormat"
                className="text-foreground mb-1 block text-sm font-medium"
              >
                Формат планируемого события
              </label>
              <select
                id="eventFormat"
                name="eventFormat"
                className="border-line bg-background focus:ring-ring focus:border-gold-text focus-visible:outline-gold w-full rounded-lg border px-4 py-3 text-base transition-shadow outline-none focus:ring-2 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <option value="">Не определились</option>
                <option value="Свадьба">Свадьба</option>
                <option value="Корпоратив">Корпоратив</option>
                <option value="День рождения / Юбилей">День рождения / Юбилей</option>
                <option value="Выпускной">Выпускной</option>
                <option value="Конференция / Кофе-брейк">Конференция / Кофе-брейк</option>
                <option value="Другое">Другое</option>
              </select>
            </div>

            <div>
              <label htmlFor="comment" className="text-foreground mb-1 block text-sm font-medium">
                Комментарий
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                placeholder="Какие блюда хотите попробовать? Особые пожелания? Аллергии?"
                className="border-line bg-background focus:ring-ring focus:border-gold-text focus-visible:outline-gold w-full resize-none rounded-lg border px-4 py-3 text-base transition-shadow outline-none focus:ring-2 focus-visible:outline-2 focus-visible:outline-offset-2"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg py-3.5 text-base font-semibold transition-all active:scale-[0.98]"
            >
              Записаться на дегустацию
            </button>
            <p className="text-muted-foreground text-center text-xs">
              Менеджер перезвонит ≤15 минут для подтверждения. Нажимая кнопку, вы соглашаетесь с{" "}
              <Link href="/privacy" className="hover:text-foreground underline">
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
