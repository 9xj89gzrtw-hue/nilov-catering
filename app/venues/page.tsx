import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Площадки для мероприятий в СПб',
  description: 'Рекомендованные площадки для кейтеринга в Санкт-Петербурге: лофты, дворцы, шатёры, бизнес-центры. Работаем на вашей площадке.',
  alternates: { canonical: '/venues', languages: { 'ru': '/venues', 'x-default': '/venues' } },
};

const VENUES = [
  {
    name: 'Александринский театр',
    type: 'Исторический',
    capacity: 'до 500',
    address: 'Островского пл., 1, СПб, м. Островская',
    features: 'Императорский зал, гримёрки, исторический интерьер, парковка для VIP',
    image: '/images/real/wedding-banquet.jpg',
    highlight: true,
  },
  {
    name: 'Эрмитаж (Новый Эрмитаж)',
    type: 'Музей',
    capacity: 'до 300',
    address: 'Дворцовая наб., 2, СПб, м. Адмиралтейская',
    features: 'Зал Нового Эрмитажа, галереи, уникальная атмосфера',
    image: '/images/dishes/medallion-01.jpg',
    highlight: false,
  },
  {
    name: 'Лофт «Большая Морская»',
    type: 'Лофт',
    capacity: 'до 150',
    address: 'Большая Морская ул., 18, СПб, м. Адмиралтейская',
    features: 'Кухня, парковка, световое оборудование, лофт-стиль',
    image: '/images/catering/corporate-02-768.avif',
    highlight: false,
  },
  {
    name: 'Особняк на Фонтанке',
    type: 'Особняк',
    capacity: 'до 80',
    address: 'наб. реки Фонтанки, 21, СПб, м. Гостиный двор',
    features: 'Исторический зал, рояль, сад, парковка',
    image: '/images/dishes/chocolate-mousse-01.jpg',
    highlight: false,
  },
  {
    name: 'Константиновский дворец (Стрельна)',
    type: 'Дворец',
    capacity: 'до 800',
    address: 'Стрельна, Батарейная дорога, 36',
    features: 'Кухонный корпус, парадные залы, вид на залив, гостиница',
    image: '/images/real/dessert-table.jpg',
    highlight: true,
  },
  {
    name: 'Шатёр на Крестовском',
    type: 'Шатёр',
    capacity: 'до 200',
    address: 'Крестовский остров, Приморский парк Победы',
    features: 'Вид на воду, летняя веранда, гриль-зона, парковка',
    image: '/images/menu/bbq/b1.jpg',
    highlight: false,
  },
  {
    name: 'БЦ «Невский Премьер»',
    type: 'Конференц-зал',
    capacity: 'до 300',
    address: 'Невский пр., 100, СПб, м. Маяковская',
    features: 'Проектор, звук, Wi-Fi, кейтеринг-зона, климат-контроль',
    image: '/images/real/corporate-buffet.jpg',
    highlight: false,
  },
  {
    name: 'ДК «Выборгский»',
    type: 'ДК',
    capacity: 'до 500',
    address: 'Кронверкский пр., 23, СПб, м. Горьковская',
    features: 'Сцена, гримёрки, большая кухня, парковка, доступная цена',
    image: '/images/real/pizza.jpg',
    highlight: false,
  },
  {
    name: 'Арт-пространство «Ткачи»',
    type: 'Лофт',
    capacity: 'до 120',
    address: 'Пикалёв ул., 32, СПб, м. Нарвская',
    features: 'Индустриальный стиль, гибрая планировка, неограниченное время',
    image: '/images/real/grilled-chicken.jpg',
    highlight: false,
  },
  {
    name: 'Ваша площадка',
    type: 'Любая',
    capacity: 'без ограничений',
    address: 'СПб и ЛО — приедем куда скажете',
    features: 'Оценим кухню и логистику за 1 день. Нет кухни — привезём всё с собой.',
    image: '/images/formats/furshet-hero.svg',
    highlight: false,
    custom: true,
  },
];

const typeIcons: Record<string, string> = {
  'Исторический': '🏛️',
  'Музей': '🎨',
  'Лофт': '🏭',
  'Особняк': '🏰',
  'Дворец': '👑',
  'Шатёр': '⛺',
  'Конференц-зал': '🏢',
  'ДК': '🎭',
  'Любая': '📍',
};

export default function VenuesPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="mb-3 font-heading text-3xl md:text-4xl lg:text-5xl font-medium">
            Площадки для ваших событий
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Работаем на вашей площадке в СПб и ЛО. Нет кухни? Привезём всё с собой.
          </p>
          
          {/* Info banner */}
          <div className="max-w-xl mx-auto p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm text-left">
            <p className="font-medium text-blue-900 mb-1">
              🌍 Иногородним клиентам (Москва и регионы):
            </p>
            <p className="text-blue-800">
              Поможем подобрать площадку в СПб под ваш формат и бюджет. Присылайте параметры — пришлём 3-5 вариантов с фото и ценой. Организуем{' '}
              <strong>видеодегустацию по Zoom</strong>. Связь:{' '}
              <a href="tel:+78129195911" className="underline font-semibold text-gold-text hover:text-gold-hover">+7 (812) 919-59-11</a>{' '}
              или{' '}
              <a href="https://wa.me/78129195911" className="underline font-semibold text-gold-text hover:text-gold-hover">WhatsApp</a>.
            </p>
          </div>
        </div>

        {/* Featured Venues */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {VENUES.filter(v => v.highlight).map((v) => (
            <Link
              key={v.name}
              href="/contact"
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:border-gold-text hover:shadow-xl hover:shadow-gold/10 hover:-translate-y-1 ${v.custom ? 'border-dashed' : ''}`}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/90 backdrop-blur-sm text-white text-xs font-semibold">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Популярная
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-foreground text-xs font-medium">
                    {typeIcons[v.type]} {v.type}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <h2 className="font-heading text-xl md:text-2xl font-medium text-white mb-2 group-hover:text-gold-light transition-colors">
                    {v.name}
                  </h2>
                  <p className="text-white/80 text-sm mb-2 line-clamp-2">{v.features}</p>
                  <div className="flex items-center gap-3 text-white/70 text-xs">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      до {v.capacity} гостей
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {v.address.split(',')[0]}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Regular Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {VENUES.filter(v => !v.highlight).map((v) => (
            <div
              key={v.name}
              className={`group rounded-xl overflow-hidden border border-line bg-card transition-all duration-300 hover:border-gold-text hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-1 ${v.custom ? 'border-dashed border-2' : ''}`}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Type badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-foreground text-xs font-medium shadow-sm">
                    {typeIcons[v.type]} {v.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-heading text-lg font-medium mb-1.5 group-hover:text-gold-text transition-colors">
                  {v.name}
                </h3>
                
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {v.capacity} гостей
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mb-2 truncate">{v.address}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{v.features}</p>

                {v.custom && (
                  <Link
                    href="/contact"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-text hover:text-gold-hover transition-colors"
                  >
                    Обсудить
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-accent to-primary/10 p-8 md:p-12 text-center border border-gold/20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium mb-3">
            Не нашли свою площадку?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Мы работали на 200+ площадках Санкт-Петербурга. Расскажите о своих требованиях — подберём идеальный вариант.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors touch-target shadow-lg shadow-primary/20"
            >
              Связаться с нами
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/plan/calculator"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-card px-8 py-3.5 text-sm font-semibold hover:border-gold-text transition-colors touch-target"
            >
              Рассчитать стоимость
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
