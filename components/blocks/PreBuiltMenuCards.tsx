import Link from 'next/link';
import FoodPhoto from '@/components/common/FoodPhoto';
import { getDishImage } from '@/lib/dish-images';
import { ALL_DISHES } from '@/lib/menu-data';
import { Users, Utensils, ArrowRight, Clock } from 'lucide-react';

/**
 * PreBuiltMenuCards — готовые наборы "Фуршет на 50 чел: 12 блюд"
 * Показывает готовые меню с количеством блюд, гостей, ценой и составом.
 * Клиент видит готовое решение — нажимает и сразу попадает в конструктор с предзаполненным меню.
 */
const PREBUILT = [
  {
    id: 'furshet-50',
    title: 'Фуршет на 50 человек',
    subtitle: '12 блюд · 2 часа',
    img: '/images/menu/kanape/k1.jpg',
    guests: 50,
    dishes: 12,
    duration: '2 часа',
    pricePerGuest: 2450,
    totalPrice: 122500,
    format: 'furshet',
    dishIds: ['canape-salmon', 'canape-cheese', 'canape-caprese', 'tartlet-chicken', 'tartlet-mushroom', 'bruschetta-tomato', 'lavash-roll', 'mini-burger', 'yakitori', 'veggie-grill', 'macaron-shooter', 'lemonade-tarragon'],
    tags: ['Канапе', 'Тарталетки', 'Мини-бургеры', 'Напитки'],
    popular: true,
  },
  {
    id: 'banket-30',
    title: 'Банкет на 30 человек',
    subtitle: '15 блюд · 5 часов',
    img: '/images/real/beef-medallions.jpg',
    guests: 30,
    dishes: 15,
    duration: '5 часов',
    pricePerGuest: 3950,
    totalPrice: 118500,
    format: 'banket',
    dishIds: ['meat-platter', 'cheese-platter', 'burrata-tomatoes', 'antipasto', 'caesar', 'salmon-salad', 'beef-medallions', 'beef-stroganoff', 'chicken-quinoa', 'trout', 'borscht', 'chocolate-brownie', 'cheesecake-shooter', 'mini-tart', 'seabuckthorn-tea'],
    tags: ['4 перемены', 'Горячее', 'Десерт', 'Торт'],
    popular: false,
  },
  {
    id: 'coffee-30',
    title: 'Кофе-брейк на 30 человек',
    subtitle: '8 блюд · 1.5 часа',
    img: '/images/menu/deserty/d1.jpg',
    guests: 30,
    dishes: 8,
    duration: '1.5 часа',
    pricePerGuest: 600,
    totalPrice: 18000,
    format: 'coffee-break',
    dishIds: ['croissant', 'eclair', 'cheesecake-shooter', 'mini-tart', 'chocolate-brownie', 'macaron-shooter', 'seabuckthorn-tea', 'cranberry-mors'],
    tags: ['Выпечка', 'Кофе', 'Чай', 'Десерты'],
    popular: false,
  },
  {
    id: 'kids-15',
    title: 'Детский праздник на 15 чел',
    subtitle: '7 блюд · 3 часа',
    img: '/images/menu/goryachee/h1.jpg',
    guests: 15,
    dishes: 7,
    duration: '3 часа',
    pricePerGuest: 1550,
    totalPrice: 23250,
    format: 'detskoe',
    dishIds: ['mini-burger', 'nuggets', 'mini-pizza', 'pasta-cheese', 'cupcakes', 'fruit-platter', 'lemonade-berry'],
    tags: ['Бургеры', 'Наггетсы', 'Капкейки', 'Фрукты'],
    popular: false,
  },
];

export default function PreBuiltMenuCards() {
  return (
    <section className="py-16 md:py-24 bg-background" aria-labelledby="prebuilt-heading">
      <div className="container-site">
        <div className="mb-10 md:mb-14 max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-3">Готовые наборы</p>
          <h2 id="prebuilt-heading" className="font-heading text-3xl md:text-5xl mb-3" style={{ fontWeight: 500 }}>
            Меню под ключ за 1 клик
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Готовые наборы на любое количество гостей. Нажмите — и меню уже в конструкторе, можно сразу оформить заказ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PREBUILT.map((set) => {
            const constructorHref = `/plan/constructor?format=${set.format}&guests=${set.guests}&preset=${set.id}`;
            return (
              <Link
                key={set.id}
                href={constructorHref}
                className={`group relative rounded-2xl overflow-hidden border-2 ${set.popular ? 'border-gold-text shadow-lg shadow-gold/10' : 'border-line'} bg-card hover:shadow-2xl hover:shadow-gold/10 hover:-translate-y-1 transition-all duration-300`}
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <FoodPhoto
                    src={set.img}
                    alt={set.title}
                    aspectRatio="video"
                    className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Popular badge */}
                  {set.popular && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[10px] bg-gold-text text-white px-2 py-1 rounded-full font-semibold shadow-md">
                        Хит продаж
                      </span>
                    </div>
                  )}

                  {/* Stats overlay */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-3 text-white">
                    <span className="inline-flex items-center gap-1 text-xs bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                      <Users className="w-3 h-3" />
                      {set.guests} чел
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                      <Utensils className="w-3 h-3" />
                      {set.dishes} блюд
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                      <Clock className="w-3 h-3" />
                      {set.duration}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4">
                  <h3 className="font-heading text-base font-medium mb-1">{set.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{set.subtitle}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {set.tags.map(t => (
                      <span key={t} className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-end justify-between pt-3 border-t border-line">
                    <div>
                      <div className="text-lg font-bold text-gold-text">
                        {set.totalPrice.toLocaleString('ru-RU')} ₽
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {set.pricePerGuest} ₽/гость
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gold-text transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/menu/catalog"
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-6 py-3 text-sm font-semibold hover:border-gold-text transition-colors"
          >
            Собрать своё меню
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
