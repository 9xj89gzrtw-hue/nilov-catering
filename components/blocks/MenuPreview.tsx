import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ALL_DISHES } from '@/lib/menu-data';
import { getDishImage, getObjectPositionForDish } from '@/lib/dish-images';
import FoodPhoto from '@/components/common/FoodPhoto';

// W86: ФОТО ПРОВЕРЕНЫ РУКАМИ + VLM. Каждое фото РЕАЛЬНО соответствует категории.
const CATS: { title: string; href: string; items: string; dishId: string; realPhoto?: string }[] = [
  // Фуршет → k1.jpg = канапе с лососем на тёмном хлебе (VLM verified)
  { title: 'Фуршет', href: '/menu/furshet', items: 'Канапе, тарталетки, мини-бургеры', dishId: 'canape-salmon', realPhoto: '/images/menu/kanape/k1.jpg' },
  // Банкет → beef-medallions.jpg = стейк (VLM verified)
  { title: 'Банкет', href: '/menu/banquet', items: 'Закуски, горячее, винная карта', dishId: 'beef-medallions', realPhoto: '/images/real/beef-medallions.jpg' },
  // Кофе-брейк → d1.jpg = тирамису (VLM verified — десерт для кофе-брейка)
  { title: 'Кофе-брейк', href: '/menu/coffee-break', items: 'Выпечка, канапе, кофе, чай', dishId: 'macaron-shooter', realPhoto: '/images/menu/deserty/d1.jpg' },
  // Детское → НОВОЕ фото: бургер с кунжутной булочкой (VLM verified — было h1.jpg=рыба!)
  { title: 'Детское', href: '/menu/detskoe', items: 'Бургеры, наггетсы, капкейки', dishId: 'mini-burger', realPhoto: '/images/menu-preview/kids-burger.jpg' },
  // Веган → НОВОЕ фото: киноа с овощами (VLM verified — было vegetarian-bowl.jpg=лосось!)
  { title: 'Веган', href: '/menu/vegan', items: 'Растительные блюда без мяса и молока', dishId: 'buddha-bowl', realPhoto: '/images/menu-preview/vegan-bowl.jpg' },
  // Без глютена → cake-berry.jpg = торт с ягодами (VLM verified)
  { title: 'Без глютена', href: '/menu/gluten-free', items: 'Блюда без глютена', dishId: 'gluten-free-cake', realPhoto: '/images/real/cake-berry.jpg' },
  // Халяль → НОВОЕ фото: куриные крылышки (VLM verified — было b1.jpg=СВИНИНА!)
  { title: 'Халяль', href: '/menu/halal', items: `${ALL_DISHES.filter(d =>d.dietBadges.includes('halal')).length} блюд халяль на отдельной линии`, dishId: 'halal-chicken-shashlik', realPhoto: '/images/menu-preview/halal-shashlik.jpg' },
];

export default function MenuPreview() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30 relative overflow-hidden" aria-labelledby="menu-heading">
      {/* Декоративный фон */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gold-tint/5 via-transparent to-transparent" aria-hidden="true" />

      <div className="container-site relative">
        <div className="mb-10 md:mb-14 max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-3">
            Меню под любой повод
          </p>
          <h2
            id="menu-heading"
            className="font-heading text-3xl md:text-5xl mb-3"
            style={{ fontWeight: 500 }}
          >
            {ALL_DISHES.length} блюда. 7 категорий. 1 команда шефов.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Нажмите на категорию, чтобы открыть блюда в конструкторе меню
          </p>
        </div>

        <div className="carousel-horizontal flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible max-w-5xl mx-auto">
          {CATS.map((cat) => {
            const dish = ALL_DISHES.find(d =>d.id === cat.dishId);
            const img = cat.realPhoto || (dish ? getDishImage(dish.id, dish.station) : '/images/gallery/furshet-menu.jpg');
            const objPos = dish ? getObjectPositionForDish(dish.id, dish.station) : 'center 40%';
            const href = dish ? `/plan/constructor?format=${dish.format[0] || 'furshet'}&guests=20&dish=${dish.id}` : cat.href;
            return (
              <Link key={cat.href} href={href} className="carousel-item group block shrink-0 w-44 md:w-auto no-underline">
                <div className="aspect-square rounded-2xl overflow-hidden mb-3 group-hover:shadow-xl group-hover:shadow-gold/10 transition-all duration-500 border border-line relative overflow-hidden">
                  <FoodPhoto
                    src={img}
                    alt={cat.title}
                    aspectRatio="square"
                    objectPosition={objPos}
                    className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay gradient for hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Arrow indicator */}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <span className="block w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-foreground flex items-center justify-center text-sm shadow-md">
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
                <h3 className="font-heading text-sm md:text-base font-medium text-center group-hover:text-gold-text transition-colors">{cat.title}</h3>
                <p className="text-xs text-muted-foreground text-center mt-0.5">{cat.items}</p>
              </Link>
            );
          })}
        </div>

        <p className="md:hidden text-center text-xs text-muted-foreground mt-2">← Листайте влево →</p>

        <div className="mt-10 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:border-gold-text hover:text-gold-text transition-colors no-underline"
          >
            Полное меню
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
