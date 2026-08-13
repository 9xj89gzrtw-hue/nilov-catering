import type { Metadata } from "next";
import Link from "next/link";
import FoodPhoto from "@/components/common/FoodPhoto";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Бар и миксология — кейтеринг в СПб — NiloV Catering" },
  description:
    "Бармен-шоу, коктейльная карта, пирамида из бокалов — барное сопровождение от NiloV Catering.",
  alternates: { canonical: "/menu/bar", languages: { ru: "/menu/bar", "x-default": "/menu/bar" } },
};

const SERVICES = [
  {
    t: "Приветственный бар",
    p: "от 1 200 ₽/гость",
    i: "Аперитив, игристое, лёгкие коктейли. 2 бармена на 50 гостей.",
    img: "/images/dishes-new/welcome-bar.jpg",
    features: ["Игристое", "Аперитив Шприц", "Мохито", "2 бармена", "50 гостей"],
    duration: "1.5–2 часа",
  },
  {
    t: "Коктейльная карта",
    p: "от 1 800 ₽/гость",
    i: "6 авторских коктейлей + 4 классических. Бармен-шоу с элементами флейринга.",
    img: "/images/dishes-new/cocktail-bar.jpg",
    features: ["6 авторских", "4 классики", "Бармен-шоу", "Флейринг", "Лёд"],
    duration: "3 часа",
  },
  {
    t: "Винное сопровождение",
    p: "от 2 500 ₽/бутылку",
    i: "Сомелье подбирает вино к каждому блюду. Карта от 6 позиций.",
    img: "/images/dishes-new/wine-sommelier.jpg",
    features: ["Сомелье", "6+ позиций", "Подбор к меню", "Декантер", "Бокалы Riedel"],
    duration: "Весь банкет",
  },
  {
    t: "Пирамида из бокалов",
    p: "7 000 ₽",
    i: "Эффектная подача игристого. 60 бокалов, сборка на месте, фотогенично.",
    img: "/images/dishes-new/pyramid-champagne.jpg",
    features: ["60 бокалов", "Сборка на месте", "Игристое каскадом", "Фотозона"],
    duration: "15–20 минут шоу",
  },
  {
    t: "Безалкогольный бар",
    p: "от 700 ₽/гость",
    i: "Смузи, лимонады, мохито 0%, свежевыжатые соки. Для ЗОЖ-мероприятий.",
    img: "/images/dishes-new/non-alcohol-bar.jpg",
    features: ["Смузи", "Лимонады", "Моктейли", "Свежевыжатые соки", "ЗОЖ-опции"],
    duration: "2–3 часа",
  },
  {
    t: "Кофе-бар",
    p: "от 450 ₽/гость",
    i: "Бариста с профессиональной кофемашиной. Капучино, латте, альтернатива.",
    img: "/images/dishes-new/coffee-bar.jpg",
    features: ["Бариста", "Проф. машина", "Капучино / латте", "Аэропресс / V60", "Спешелти-зёрна"],
    duration: "Весь вечер",
  },
];

const BAR_ITEMS = [
  {
    name: "Красное вино",
    price: "от 2 500 ₽/бутылка",
    img: "/images/dishes-new/wine-red.jpg",
    desc: "Каберне, Мерло, Пино Нуар",
  },
  {
    name: "Белое вино",
    price: "от 2 500 ₽/бутылка",
    img: "/images/dishes-new/wine-white.jpg",
    desc: "Шардоне, Совиньон Блан, Рислинг",
  },
  {
    name: "Шампанское",
    price: "от 3 500 ₽/бутылка",
    img: "/images/dishes-new/champagne.jpg",
    desc: "Игристое брют/полусухое для тоста",
  },
  {
    name: "Виски-бар",
    price: "от 4 500 ₽/гость",
    img: "/images/dishes-new/whisky-bar.jpg",
    desc: "Односолодовый, купажированный, на льду",
  },
  {
    name: "Крафтовое пиво",
    price: "от 450 ₽/бутылка",
    img: "/images/dishes-new/beer-craft.jpg",
    desc: "Лагер, IPA, стаут — локальные пивоварни",
  },
  {
    name: "Авторские коктейли",
    price: "от 600 ₽/коктейль",
    img: "/images/dishes-new/cocktail-bar.jpg",
    desc: "Сигнатурные коктейли от шеф-бармена",
  },
];

export default function BarPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
      header { background: rgba(28,24,21,0.9) !important; border-color: rgba(250,247,242,0.1) !important; }
      header a, header button { color: rgba(250,247,242,0.7) !important; }
      header a:hover, header button:hover { color: rgb(250,247,242) !important; }
      header svg { color: rgba(250,247,242,0.7) !important; }
      body { background: rgb(28,24,21) !important; }
    `,
        }}
      />
      <main id="main" className="bg-foreground text-background pt-24 pb-20">
        <div className="container-site max-w-6xl">
          <nav aria-label="Хлебные крошки" className="text-background/60 mb-4 text-sm">
            <Link href="/" className="hover:text-background">
              Главная
            </Link>
            {" / "}
            <Link href="/menu" className="hover:text-background">
              Меню
            </Link>
            {" / "}
            <span className="text-background">Бар и миксология</span>
          </nav>

          <div className="mb-12 max-w-3xl">
            <span className="mb-3 inline-block rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
              18+
            </span>
            <h1
              className="font-heading mb-3 text-4xl font-medium md:text-6xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Бар и миксология
            </h1>
            <p className="text-background/70 mb-6 text-lg md:text-xl">
              Бармен-шоу, коктейльная карта, винное сопровождение — добавим стиля вашему событию.
              Профессиональные бармены, премиальные ингредиенты, фотогеничная подача.
            </p>
          </div>

          {/* Hero bar image — full-width dark */}
          <div className="relative mb-16 aspect-[21/9] overflow-hidden rounded-3xl shadow-2xl">
            <FoodPhoto
              src="/images/dishes-new/cocktail-bar.jpg"
              alt="Бармен-шоу от NiloV Catering"
              aspectRatio="wide"
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-6 text-white md:p-10">
              <p className="mb-2 text-xs tracking-[0.22em] uppercase opacity-90">
                Премиальное барное обслуживание
              </p>
              <h2 className="font-heading mb-2 text-2xl font-medium md:text-3xl">
                Профессиональный бар на ваше событие
              </h2>
              <p className="max-w-2xl text-sm opacity-90 md:text-base">
                От приветственный бара до пирамиды из бокалов. Полная мобильная барная станция с
                подсветкой, барменами и авторскими коктейлями.
              </p>
            </div>
          </div>

          {/* Services grid with photos — dark cards */}
          <div className="mb-16">
            <h2 className="font-heading mb-2 text-3xl font-medium">Барные сервисы</h2>
            <p className="text-background/60 mb-8">Выберите формат под ваше мероприятие</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <div
                  key={s.t}
                  className="border-background/15 bg-background/5 hover:border-gold-text group flex flex-col overflow-hidden rounded-2xl border transition-all hover:shadow-xl"
                >
                  <div className="bg-background/10 relative aspect-[4/3] overflow-hidden">
                    <FoodPhoto
                      src={s.img}
                      alt={s.t}
                      aspectRatio="wide"
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-background/90 text-foreground rounded-full px-3 py-1 text-xs font-semibold">
                        {s.p}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="rounded bg-black/60 px-2 py-1 text-xs tracking-wider text-white uppercase">
                        {s.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-heading text-background mb-2 text-lg font-medium">{s.t}</h3>
                    <p className="text-background/60 mb-3 flex-1 text-sm">{s.i}</p>
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {s.features.map((f) => (
                        <span
                          key={f}
                          className="bg-background/10 text-background/70 rounded-full px-2 py-0.5 text-xs"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/plan/calculator"
                      className="bg-gold-text hover:bg-gold-text/90 block inline-flex min-h-[44px] w-full items-center rounded-lg py-2.5 text-center text-sm font-semibold text-white transition-colors"
                    >
                      Заказать
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bar menu items — dark grid */}
          <div className="mb-16">
            <h2 className="font-heading mb-2 text-3xl font-medium">Барная карта</h2>
            <p className="text-background/60 mb-8">
              Напитки, которые можно включить в любой барный сервис
            </p>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {BAR_ITEMS.map((item) => (
                <div
                  key={item.name}
                  className="border-background/15 bg-background/5 hover:border-gold-text group overflow-hidden rounded-xl border transition-all hover:shadow-lg"
                >
                  <div className="bg-background/10 relative aspect-square overflow-hidden">
                    <FoodPhoto
                      src={item.img}
                      alt={item.name}
                      aspectRatio="square"
                      className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute right-2 bottom-2 z-10">
                      <span className="bg-background/90 text-foreground rounded-full px-2 py-0.5 text-xs font-semibold">
                        {item.price}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-background group-hover:text-gold-text mb-1 text-sm font-medium transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-background/50 line-clamp-2 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA — dark with gold accent */}
          <div className="border-gold-text/30 bg-gold-text/10 rounded-3xl border p-8 text-center">
            <h2 className="font-heading text-background mb-3 text-2xl font-medium">
              Собрать бар под событие
            </h2>
            <p className="text-background/60 mx-auto mb-6 max-w-2xl">
              Шеф-бармен соберёт коктейльную карту под ваш бюджет и формат. Дегустация коктейлей
              перед мероприятием — бесплатно.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/plan/calculator"
                className="bg-gold-text hover:bg-gold-text/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors"
              >
                Добавить бар в заказ
              </Link>
              <Link
                href="/plan/constructor"
                className="border-background/20 text-background hover:border-gold-text inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition-colors"
              >
                Составить барную карту с шефом
              </Link>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="border-background/20 text-background hover:border-gold-text inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition-colors"
              >
                {SITE.phone}
              </a>
            </div>
          </div>

          {/* Note */}
          <div className="border-background/10 mt-8 border-t pt-6">
            <p className="text-background/40 text-xs">
              Все цены ориентировочные. Финальный расчёт — после консультации с менеджером.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
