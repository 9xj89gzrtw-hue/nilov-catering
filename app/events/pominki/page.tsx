import type { Metadata } from 'next';
import Link from 'next/link';
import FoodPhoto from '@/components/common/FoodPhoto';
import ShareButton from '@/components/common/ShareButton';
import { RevealBlock } from '@/components/effects/MotionPrimitives';
import { getDishImage, getObjectPositionForDish } from '@/lib/dish-images';

export const metadata: Metadata = {
  alternates: {
    canonical: '/events/pominki',
    languages: { ru: '/events/pominki', 'x-default': '/events/pominki' },
  },
  title: 'Поминки — кейтеринг в СПб, поминальное меню',
  description:
    'Поминальный обед в Санкт-Петербурге. Постное меню без алкоголя: кутья, блины, кисель, рыбные блюда. Доставка в кафе и домой. 1 800 ₽/гость (фиксированная цена).',
};

type PominkiItem = {
  name: string;
  desc: string;
  price: string;
  dishId: string;
  station?: 'cold' | 'hot' | 'desserts' | 'drinks' | 'show' | 'bbq';
};

type PominkiSection = {
  section: string;
  note?: string;
  items: PominkiItem[];
};

const POMINKI_MENU: PominkiSection[] = [
  {
    section: 'Обязательные блюда',
    note: 'По православной традиции — подаются в первую очередь.',
    items: [
      {
        name: 'Кутья (коливо)',
        desc: 'Пшеница с мёдом, маком и изюмом. Символ вечной памяти и воскресения.',
        price: '150 ₽/порция',
        dishId: 'buddha-bowl',
        station: 'desserts',
      },
      {
        name: 'Блины постные',
        desc: 'С мёдом или без начинки. Подаются первыми, без масла и молока.',
        price: '120 ₽/порция',
        dishId: 'syrniki',
        station: 'desserts',
      },
      {
        name: 'Кисель овсяный или ягодный',
        desc: 'Традиционный поминальный напиток. Подаётся тёплым.',
        price: '90 ₽/порция',
        dishId: 'lemonade-berry',
        station: 'drinks',
      },
    ],
  },
  {
    section: 'Холодные закуски',
    items: [
      {
        name: 'Селёдка с отварным картофелем',
        desc: 'Классика поминального стола. Картофель с укропом, сельдь, лук.',
        price: '220 ₽/порция',
        dishId: 'salmon-grill',
        station: 'hot',
      },
      {
        name: 'Винегрет',
        desc: 'Свёкла, морковь, картофель, солёные огурцы, квашеная капуста.',
        price: '180 ₽/порция',
        dishId: 'beet-carpaccio',
        station: 'cold',
      },
      {
        name: 'Солёные огурцы и помидоры',
        desc: 'Домашние заготовки. Без уксуса, по-деревенски.',
        price: '120 ₽/порция',
        dishId: 'greek-salad',
        station: 'cold',
      },
      {
        name: 'Пирожки постные с капустой и грибами',
        desc: 'Домашние, из печи. Тесто на воде, без яиц и молока.',
        price: '90 ₽/шт',
        dishId: 'mini-sandwich',
        station: 'cold',
      },
    ],
  },
  {
    section: 'Первые блюда',
    items: [
      {
        name: 'Борщ постный',
        desc: 'Без мясного бульона, с фасолью. Густой, тёмный, по-русски.',
        price: '180 ₽/порция',
        dishId: 'borscht',
        station: 'hot',
      },
      {
        name: 'Уха рыбацкая',
        desc: 'Из трёх видов рыбы. Подается с расстегаем.',
        price: '240 ₽/порция',
        dishId: 'trout',
        station: 'hot',
      },
    ],
  },
  {
    section: 'Горячие блюда',
    items: [
      {
        name: 'Рыба запечённая с гарниром',
        desc: 'Судак или треска с отварным картофелем и зеленью.',
        price: '380 ₽/порция',
        dishId: 'salmon-grill',
        station: 'hot',
      },
      {
        name: 'Грибы жареные с картофелем',
        desc: 'Лесные грибы, молодой картофель, лук. Без сметаны.',
        price: '320 ₽/порция',
        dishId: 'veggie-grill',
        station: 'hot',
      },
      {
        name: 'Котлеты рыбные',
        desc: 'Из трески с зеленью. Без хлеба в фарше, плотные.',
        price: '280 ₽/порция',
        dishId: 'trout',
        station: 'hot',
      },
    ],
  },
  {
    section: 'Напитки',
    note: 'Без алкоголя. Только традиционные напитки — морс, компот, чай.',
    items: [
      {
        name: 'Морс клюквенный',
        desc: 'Домашний, без сахара. Протёртая ягода.',
        price: '90 ₽/порция',
        dishId: 'cranberry-mors',
        station: 'drinks',
      },
      {
        name: 'Компот из сухофруктов',
        desc: 'Без сахара. Яблоко, груша, чернослив, изюм.',
        price: '80 ₽/порция',
        dishId: 'fresh-juice',
        station: 'drinks',
      },
      {
        name: 'Чай (чёрный, зелёный)',
        desc: 'С мёдом и лимоном. Заваривается в чайнике, подаётся тёплым.',
        price: '50 ₽/порция',
        dishId: 'seabuckthorn-tea',
        station: 'drinks',
      },
    ],
  },
];

const WHATS_INCLUDED = [
  {
    title: 'Постное меню',
    desc: 'Без мяса, молока, яиц и животного жира. Подходит для постных дней и траура.',
    photo: '/images/real/vegetarian-bowl.jpg',
    alt: 'Постное блюдо на поминальный обед',
  },
  {
    title: 'Без алкоголя',
    desc: 'Полностью исключён. Шампанское, вино, пиво — не подаём и не предлагаем.',
    photo: '/images/real/cranberry-juice.jpg',
    alt: 'Клюквенный морс — безалкогольный напиток',
  },
  {
    title: 'Доставка и сервировка',
    desc: 'Привозим за 60 минут до начала. Сервируем тихо, без лишних разговоров.',
    photo: '/images/real/salmon-dish.jpg',
    alt: 'Сервировка поминального стола',
  },
];

const PROTOCOL_DO = [
  'Кутья, блины и кисель — обязательны. Подаются в первую очередь.',
  'Еда простая, без изысков. Картофель, каша, рыба, овощи — основа.',
  'Сервировка сдержанная: белая или светлая скатерть, простая посуда.',
  'Стол накрыт до прихода гостей. Подаём тихо, без объявлений и фанфар.',
  'Чай подаётся тёплым, не горячим — чтобы можно было пить не торопясь.',
  'Документы и чек выдаём родным лично, без вопросов.',
];

const PROTOCOL_DONT = [
  'Без алкоголя — даже пиво и вино исключаются полностью.',
  'Без торта «С днём рождения», свечек и надписей.',
  'Без музыки, микрофона, ведущего и аниматоров.',
  'Без тостов «за здоровье», «за любовь», «за будущий год».',
  'Без фотосессии и видеографа. Тихо и спокойно.',
  'Без ярких цветов в сервировке — никаких красных скатертей и шариков.',
];

const QUICK_FACTS = [
  { value: '1 800 ₽', label: 'за гостя, фикс.' },
  { value: 'от 10', label: 'минимум гостей' },
  { value: '1 день', label: 'срок организации' },
  { value: '0', label: 'алкоголя в меню' },
];

export default function PominkiPage() {
  const totalMin = POMINKI_MENU.reduce((acc, s) => acc + s.items.length, 0);

  return (
    <main id="main" className="pb-20" data-hide-newsletter="true">
      {/* ───────────────── HERO with photo ───────────────── */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
        <FoodPhoto
          src="/images/real/salmon-dish.jpg"
          alt="Поминальный обед — запечённая рыба с гарниром от NiloV Catering"
          aspectRatio="video"
          className="absolute inset-0 w-full h-full"
          eager
          animate={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(28, 24, 21, 0.92) 0%, rgba(28, 24, 21, 0.55) 45%, rgba(28, 24, 21, 0.15) 100%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full">
          <div className="container-site max-w-5xl pt-28 pb-10 md:pt-32 md:pb-14">
            {/* Breadcrumbs — поверх HERO */}
            <nav
              aria-label="Хлебные крошки"
              className="text-xs md:text-sm text-white/70 mb-6"
            >
              <Link href="/" className="hover:text-white">
                Главная
              </Link>
              {' / '}
              <Link href="/events" className="hover:text-white">
                События
              </Link>
              {' / '}
              <span className="text-white">Поминки</span>
            </nav>

            <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#C9A961] mb-3">
              Поминальный обед · без алкоголя
            </p>

            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-5 max-w-3xl">
              Поминальный обед
            </h1>

            <p className="text-base md:text-lg text-white/85 max-w-2xl mb-6 leading-relaxed">
              Тихо, достойно, по православной традиции. Постное меню, кутья, блины,
              кисель. Доставка в кафе, храм или домой — в пределах СПб.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm md:text-base text-white">
              <span className="font-semibold">
                от <span className="text-gold-text">1 800 ₽</span>/гость <span className="text-xs text-muted-foreground">(фиксированная цена)</span>
              </span>
              <span className="text-white/40">·</span>
              <span>от 10 гостей</span>
              <span className="text-white/40">·</span>
              <span>без алкоголя</span>
              <span className="text-white/40">·</span>
              <span>доставка по СПб</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── QUICK FACTS STRIP ───────────────── */}
      <section className="border-b border-line bg-card">
        <div className="container-site max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
            {QUICK_FACTS.map((f) => (
              <div key={f.label} className="px-4 py-5 text-center">
                <div className="font-heading text-xl md:text-2xl font-medium text-foreground">
                  {f.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  {f.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-site max-w-5xl">
        {/* ───────────────── INTRO ───────────────── */}
        <RevealBlock className="mt-12 md:mt-16 mb-10">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl md:text-3xl font-medium mb-4">
              Особый вид мероприятия
            </h2>
            <p className="text-base md:text-lg text-foreground/85 leading-relaxed mb-4">
              Поминальный обед — не банкет и не фуршет. Мы готовим по православной
              традиции: постное меню без алкоголя, без торта «С днём рождения», без
              шумных тостов. Кутья, блины, кисель — обязательно. Доставка в кафе, в
              церковный зал, в кафе рядом с кладбищем или домой. Тихо, достойно,
              профессионально.
            </p>
            <div className="mt-5">
              <ShareButton
                title="Поминки — кейтеринг NiloV"
                text="Посмотри поминальное меню и цены — нужно согласовать"
                label="Отправить ссылку родным (WhatsApp / Telegram / Email)"
              />
            </div>
          </div>
        </RevealBlock>

        {/* ───────────────── ЧТО ВХОДИТ — 3 фото-карточки ───────────────── */}
        <RevealBlock className="mb-14 md:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {WHATS_INCLUDED.map((item) => (
              <article
                key={item.title}
                className="rounded-xl overflow-hidden border border-line bg-card hover:border-foreground/30 transition-colors"
              >
                <FoodPhoto
                  src={item.photo}
                  alt={item.alt}
                  aspectRatio="wide"
                  objectPosition="center 50%"
                />
                <div className="p-4 md:p-5">
                  <h3 className="font-heading text-base md:text-lg font-medium mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </RevealBlock>

        {/* ───────────────── ОБЯЗАТЕЛЬНЫЕ БЛЮДА — large feature ───────────────── */}
        <RevealBlock className="mb-14 md:mb-20">
          <div className="rounded-2xl overflow-hidden border border-line bg-secondary/40">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {POMINKI_MENU[0].items.map((item, idx) => {
                const img = getDishImage(item.dishId, item.station);
                const pos = getObjectPositionForDish(item.dishId, item.station);
                return (
                  <div
                    key={item.name}
                    className={`relative ${
                      idx > 0 ? 'md:border-l border-line' : ''
                    }`}
                  >
                    <FoodPhoto
                      src={img}
                      alt={item.name}
                      aspectRatio="square"
                      objectPosition={pos}
                    />
                    <div className="p-5">
                      <h3 className="font-heading text-lg font-medium mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                        {item.desc}
                      </p>
                      <p className="text-sm font-semibold text-foreground/80">
                        {item.price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealBlock>

        {/* ───────────────── ПОМИНАЛЬНОЕ МЕНЮ с фото ───────────────── */}
        <RevealBlock className="mb-10">
          <div className="flex items-end justify-between flex-wrap gap-2 mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-medium">
              Поминальное меню
            </h2>
            <p className="text-sm text-muted-foreground">{totalMin} блюд · фикс-цена</p>
          </div>
        </RevealBlock>

        <div className="space-y-10 md:space-y-12 mb-14 md:mb-20">
          {POMINKI_MENU.slice(1).map((sec, secIdx) => (
            <RevealBlock key={sec.section} delay={secIdx * 0.05}>
              <section>
                <div className="flex items-baseline justify-between flex-wrap gap-2 mb-4 md:mb-5">
                  <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground">
                    {sec.section}
                  </h3>
                  {sec.note && (
                    <p className="text-xs md:text-sm text-muted-foreground italic max-w-md">
                      {sec.note}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {sec.items.map((item) => {
                    const img = getDishImage(item.dishId, item.station);
                    const pos = getObjectPositionForDish(item.dishId, item.station);
                    return (
                      <article
                        key={item.name}
                        className="rounded-xl overflow-hidden border border-line bg-card hover:border-foreground/30 hover:shadow-[0_4px_12px_rgba(28,24,21,0.05)] transition-all"
                      >
                        <div className="relative">
                          <FoodPhoto
                            src={img}
                            alt={item.name}
                            aspectRatio="wide"
                            objectPosition={pos}
                          />
                          <span className="absolute top-2 right-2 rounded-md bg-white/95 px-2 py-1 text-xs font-semibold text-foreground shadow-sm">
                            {item.price}
                          </span>
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium text-sm md:text-base mb-1">
                            {item.name}
                          </h4>
                          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            </RevealBlock>
          ))}
        </div>

        {/* ───────────────── ПРИМЕР РАСЧЁТА ───────────────── */}
        <RevealBlock className="mb-14 md:mb-20">
          <div className="rounded-2xl border border-line bg-card p-6 md:p-8">
            <h2 className="font-heading text-xl md:text-2xl font-medium mb-3">
              Пример расчёта
            </h2>
            <p className="text-sm md:text-base text-foreground/85 mb-5 leading-relaxed">
              <strong>1 800 ₽/гость — фиксированная цена.</strong> Включает: еда,
              посуда, доставка по СПб (в пределах КАД), салфетки, столовые приборы.
              Доплаты: выезд за КАД (+30 ₽/км), дополнительный персонал на площадке
              (+1 500 ₽/час). Минимум — 10 человек.
            </p>
            <div className="rounded-lg bg-secondary/60 p-4 md:p-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm md:text-base">
                <span className="text-muted-foreground">25 гостей</span>
                <span className="text-muted-foreground">×</span>
                <span className="text-muted-foreground">1 800 ₽</span>
                <span className="text-muted-foreground">=</span>
                <span className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
                  45 000 ₽
                </span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mt-2">
                Финальная цена для кафе или дома в пределах КАД. Без скрытых доплат.
              </p>
            </div>
          </div>
        </RevealBlock>

        {/* ───────────────── ПРОТОКОЛ — DO / DON'T ───────────────── */}
        <RevealBlock className="mb-14 md:mb-20">
          <div className="mb-6 md:mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Правила поминального обеда
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-medium">
              Как мы сервируем
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl">
              Поминки — это серьёзное событие. Мы соблюдаем православную традицию
              и не предлагаем того, что неуместно.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="rounded-xl border border-line bg-card p-5 md:p-6">
              <h3 className="font-heading text-base md:text-lg font-medium mb-4 text-foreground">
                Что входит
              </h3>
              <ul className="space-y-2.5 text-sm text-foreground/90">
                {PROTOCOL_DO.map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-card p-5 md:p-6">
              <h3 className="font-heading text-base md:text-lg font-medium mb-4 text-foreground">
                Чего не делаем
              </h3>
              <ul className="space-y-2.5 text-sm text-foreground/90">
                {PROTOCOL_DONT.map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive/70"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-line bg-secondary/40 p-5 md:p-6">
            <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
              <strong className="font-medium">Доставка рядом с кладбищами:</strong>{' '}
              Богословское, Смоленское, Ковалёвское, Северное — согласуем с менеджером
              по телефону. Срочные поминки возможны — даже на день обращения, если есть
              свободная бригада.
            </p>
          </div>
        </RevealBlock>

        {/* ───────────────── КАК ЗАКАЗАТЬ ───────────────── */}
        <RevealBlock className="mb-14 md:mb-20">
          <div className="rounded-2xl border border-foreground/20 bg-card p-6 md:p-8">
            <h2 className="font-heading text-xl md:text-2xl font-medium mb-4">
              Как заказать
            </h2>
            <ol className="space-y-3 text-sm md:text-base text-foreground/90 mb-5">
              <li className="flex gap-3">
                <span className="font-heading font-semibold text-foreground/60 shrink-0">
                  1.
                </span>
                <span>
                  Позвоните:{' '}
                  <a
                    href="tel:+78129195911"
                    className="text-foreground font-semibold underline underline-offset-2 hover:text-muted-foreground"
                  >
                    +7 (812) 919-59-11
                  </a>
                  . С городского в СПб — просто 919-59-11, без 812.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-heading font-semibold text-foreground/60 shrink-0">
                  2.
                </span>
                <span>
                  Скажите: дату, время, количество гостей, адрес (дом, кафе или
                  кладбище).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-heading font-semibold text-foreground/60 shrink-0">
                  3.
                </span>
                <span>
                  Менеджер предложит меню под ваш бюджет — фикс 1 800 ₽/гость.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-heading font-semibold text-foreground/60 shrink-0">
                  4.
                </span>
                <span>
                  Курьер привезёт за 60 минут до начала. Сервируем тихо.
                </span>
              </li>
            </ol>

            <div className="rounded-lg bg-secondary/60 p-4 md:p-5 mb-5">
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                Если вам тяжело говорить — напишите в WhatsApp:{' '}
                <a
                  href="https://wa.me/78129195911"
                  className="underline underline-offset-2 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  wa.me/78129195911
                </a>
                . Менеджер свяжется в течение 15 минут. Можно общаться только по
                email/ЭДО — укажите это в форме заявки.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <a
                href="tel:+78129195911"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                +7 (812) 919-59-11
              </a>
              <a
                href="https://wa.me/78129195911"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-3 text-sm font-semibold text-foreground hover:border-foreground/40 transition-colors"
              >
                WhatsApp
              </a>
              <Link
                href="/contact?eventType=%D0%9F%D0%BE%D0%BC%D0%B8%D0%BD%D0%BA%D0%B8&format=%D0%9F%D0%BE%D0%BC%D0%B8%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9+%D0%BE%D0%B1%D0%B5%D0%B4&guests=25"
                className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-3 text-sm font-semibold text-foreground hover:border-foreground/40 transition-colors"
              >
                Форма заявки
              </Link>
            </div>
          </div>
        </RevealBlock>

        {/* ───────────────── CTA ───────────────── */}
        <RevealBlock>
          <div className="rounded-2xl border border-dashed border-line bg-card/50 p-6 md:p-8 text-center">
            <p className="font-heading text-lg md:text-xl font-medium mb-2">
              Принимаем срочные заказы
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
              Даже на день обращения, если есть свободная бригада. Позвоните —
              менеджер ответит за 15 минут.
            </p>
          </div>
        </RevealBlock>
      </div>
    </main>
  );
}
