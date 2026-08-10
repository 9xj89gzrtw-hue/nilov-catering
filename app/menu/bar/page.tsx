import type { Metadata } from 'next';
import Link from 'next/link';
import FoodPhoto from '@/components/common/FoodPhoto';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Бар и mixology',
  description: 'Бармен-шоу, коктейльная карта, пирамида из бокалов — барное сопровождение от NiloV Catering.',
};

const SERVICES = [
  {
    t: 'Welcome-бар',
    p: 'от 1 200 ₽/гость',
    i: 'Аперитив, игристое, лёгкие коктейли. 2 бармена на 50 гостей.',
    img: '/images/dishes-new/welcome-bar.jpg',
    features: ['Игристое', 'Аперитив Шприц', 'Мохито', '2 бармена', '50 гостей'],
    duration: '1.5–2 часа',
  },
  {
    t: 'Коктейльная карта',
    p: 'от 1 800 ₽/гость',
    i: '6 авторских коктейлей + 4 классических. Бармен-шоу с элементами флейринга.',
    img: '/images/dishes-new/cocktail-bar.jpg',
    features: ['6 авторских', '4 классики', 'Бармен-шоу', 'Флейринг', 'Лёд'],
    duration: '3 часа',
  },
  {
    t: 'Винное сопровождение',
    p: 'от 2 500 ₽/бутылку',
    i: 'Сомелье подбирает вино к каждому блюду. Карта от 6 позиций.',
    img: '/images/dishes-new/wine-sommelier.jpg',
    features: ['Сомелье', '6+ позиций', 'Подбор к меню', 'Декантер', 'Бокалы Riedel'],
    duration: 'Весь банкет',
  },
  {
    t: 'Пирамида из бокалов',
    p: '7 000 ₽',
    i: 'Эффектная подача игристого. 60 бокалов, сборка на месте, фотогенично.',
    img: '/images/dishes-new/pyramid-champagne.jpg',
    features: ['60 бокалов', 'Сборка на месте', 'Игристое cascade', 'Фотозона'],
    duration: '15–20 минут шоу',
  },
  {
    t: 'Безалкогольный бар',
    p: 'от 700 ₽/гость',
    i: 'Смузи, лимонады, мохито 0%, свежевыжатые соки. Для ЗОЖ-мероприятий.',
    img: '/images/dishes-new/non-alcohol-bar.jpg',
    features: ['Смузи', 'Лимонады', 'Mocktails', 'Fresh juices', 'ЗОЖ-опции'],
    duration: '2–3 часа',
  },
  {
    t: 'Кофе-бар',
    p: 'от 450 ₽/гость',
    i: 'Бариста с профессиональной кофемашиной. Капучино, латте, альтернатива.',
    img: '/images/dishes-new/coffee-bar.jpg',
    features: ['Бариста', 'Проф. машина', 'Капучино / латте', 'V60 / AeroPress', 'Зёрна specialty'],
    duration: 'Весь вечер',
  },
];

const BAR_ITEMS = [
  { name: 'Красное вино', price: 'от 2 500 ₽/бутылка', img: '/images/dishes-new/wine-red.jpg', desc: 'Каберне, Мерло, Пино Нуар' },
  { name: 'Белое вино', price: 'от 2 500 ₽/бутылка', img: '/images/dishes-new/wine-white.jpg', desc: 'Шардоне, Совиньон Блан, Рислинг' },
  { name: 'Шампанское', price: 'от 3 500 ₽/бутылка', img: '/images/dishes-new/champagne.jpg', desc: 'Игристое брют/полусухое для тоста' },
  { name: 'Виски-бар', price: 'от 4 500 ₽/гость', img: '/images/dishes-new/whisky-bar.jpg', desc: 'Single malt, blended, rocks' },
  { name: 'Крафтовое пиво', price: 'от 450 ₽/бутылка', img: '/images/dishes-new/beer-craft.jpg', desc: 'Lager, IPA, Stout — локальные пивоварни' },
  { name: 'Авторские коктейли', price: 'от 600 ₽/коктейль', img: '/images/dishes-new/cocktail-bar.jpg', desc: 'Сигнатурные коктейли от шеф-бармена' },
];

export default function BarPage() {
  return (
    <>
    <style dangerouslySetInnerHTML={{__html: `
      header { background: rgba(28,24,21,0.9) !important; border-color: rgba(250,247,242,0.1) !important; }
      header a, header button { color: rgba(250,247,242,0.7) !important; }
      header a:hover, header button:hover { color: rgb(250,247,242) !important; }
      header svg { color: rgba(250,247,242,0.7) !important; }
      body { background: rgb(28,24,21) !important; }
    `}} />
    <main id="main" className="pt-24 pb-20 bg-foreground text-background">
      <div className="container-site max-w-6xl">
        <nav aria-label="Хлебные крошки" className="text-sm text-background/60 mb-4">
          <Link href="/" className="hover:text-background">Главная</Link>
          {' / '}
          <Link href="/menu" className="hover:text-background">Меню</Link>
          {' / '}
          <span className="text-background">Бар и mixology</span>
        </nav>

        <div className="mb-12 max-w-3xl">
          <span className="inline-block text-xs bg-red-600 text-white px-2 py-1 rounded font-bold mb-3">18+</span>
          <h1 className="font-heading text-4xl md:text-6xl font-medium mb-3" style={{ letterSpacing: '-0.02em' }}>
            Бар и mixology
          </h1>
          <p className="text-lg md:text-xl text-background/70 mb-6">
            Бармен-шоу, коктейльная карта, винное сопровождение — добавим стиля вашему событию.
            Профессиональные бармены, premium-ингредиенты, фотогеничная подача.
          </p>
        </div>

        {/* Hero bar image — full-width dark */}
        <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl relative aspect-[21/9]">
          <FoodPhoto
            src="/images/dishes-new/cocktail-bar.jpg"
            alt="Бармен-шоу от NiloV Catering"
            aspectRatio="wide"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
            <p className="text-xs uppercase tracking-[0.22em] mb-2 opacity-90">Premium bar service</p>
            <h2 className="font-heading text-2xl md:text-3xl font-medium mb-2">Профессиональный бар на ваше событие</h2>
            <p className="text-sm md:text-base opacity-90 max-w-2xl">
              От welcome-бара до пирамиды из бокалов. Полная мобильная барная станция с подсветкой, барменами и авторскими коктейлями.
            </p>
          </div>
        </div>

        {/* Services grid with photos — dark cards */}
        <div className="mb-16">
          <h2 className="font-heading text-3xl font-medium mb-2">Барные сервисы</h2>
          <p className="text-background/60 mb-8">Выберите формат под ваше мероприятие</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.t} className="rounded-2xl border border-background/15 bg-background/5 overflow-hidden hover:border-gold-text hover:shadow-xl transition-all group flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-background/10">
                  <FoodPhoto
                    src={s.img}
                    alt={s.t}
                    aspectRatio="wide"
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-xs bg-background/90 text-foreground rounded-full px-3 py-1 font-semibold">
                      {s.p}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="text-xs uppercase tracking-wider bg-black/60 text-white px-2 py-1 rounded">
                      {s.duration}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-heading text-lg font-medium mb-2 text-background">{s.t}</h3>
                  <p className="text-sm text-background/60 mb-3 flex-1">{s.i}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {s.features.map(f => (
                      <span key={f} className="text-xs bg-background/10 text-background/70 px-2 py-0.5 rounded-full">{f}</span>
                    ))}
                  </div>
                  <Link
                    href="/plan/calculator"
                    className="block w-full rounded-lg bg-gold-text text-white py-2.5 text-sm font-semibold text-center hover:bg-gold-text/90 transition-colors"
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
          <h2 className="font-heading text-3xl font-medium mb-2">Барная карта</h2>
          <p className="text-background/60 mb-8">Напитки, которые можно включить в любой барный сервис</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {BAR_ITEMS.map((item) => (
              <div key={item.name} className="rounded-xl border border-background/15 bg-background/5 overflow-hidden hover:border-gold-text hover:shadow-lg transition-all group">
                <div className="relative aspect-square overflow-hidden bg-background/10">
                  <FoodPhoto
                    src={item.img}
                    alt={item.name}
                    aspectRatio="square"
                    className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-2 right-2 z-10">
                    <span className="text-xs bg-background/90 text-foreground rounded-full px-2 py-0.5 font-semibold">{item.price}</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium mb-1 text-background group-hover:text-gold-text transition-colors">{item.name}</h3>
                  <p className="text-xs text-background/50 line-clamp-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA — dark with gold accent */}
        <div className="p-8 rounded-3xl border border-gold-text/30 bg-gold-text/10 text-center">
          <h2 className="font-heading text-2xl font-medium mb-3 text-background">Собрать бар под событие</h2>
          <p className="text-background/60 mb-6 max-w-2xl mx-auto">
            Шеф-бармен соберёт коктейльную карту под ваш бюджет и формат. Дегустация коктейлей перед мероприятием — бесплатно.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/plan/calculator"
              className="inline-flex items-center gap-2 rounded-lg bg-gold-text text-white px-6 py-3 text-sm font-semibold hover:bg-gold-text/90 transition-colors"
            >
              Добавить бар в заказ
            </Link>
            <Link
              href="/plan/constructor"
              className="inline-flex items-center gap-2 rounded-lg border border-background/20 text-background px-6 py-3 text-sm font-semibold hover:border-gold-text transition-colors"
            >
              Составить барную карту с шефом
            </Link>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex items-center gap-2 rounded-lg border border-background/20 text-background px-6 py-3 text-sm font-semibold hover:border-gold-text transition-colors"
            >
              {SITE.phone}
            </a>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 pt-6 border-t border-background/10">
          <p className="text-xs text-background/40">Все цены ориентировочные. Финальный расчёт — после консультации с менеджером.</p>
        </div>
      </div>
    </main>
    </>
  );
}
