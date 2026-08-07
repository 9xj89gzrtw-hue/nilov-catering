import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ALL_DISHES } from '@/lib/menu-data';
import { getDishImage, getObjectPositionForDish } from '@/lib/dish-images';
import FoodPhoto from '@/components/common/FoodPhoto';

const CATS: { title: string; href: string; items: string; dishId: string; realPhoto?: string }[] = [
  { title: 'Фуршет', href: '/menu/furshet', items: 'Канапе, тарталетки, мини-бургеры', dishId: 'canape-salmon', realPhoto: '/images/real/canape-platter.jpg' },
  { title: 'Банкет', href: '/menu/banquet', items: 'Закуски, горячее, винная карта', dishId: 'beef-medallions', realPhoto: '/images/real/beef-medallions.jpg' },
  { title: 'Кофе-брейк', href: '/menu/coffee-break', items: 'Выпечка, канапе, кофе, чай', dishId: 'macaron-shooter', realPhoto: '/images/real/macarons.jpg' },
  { title: 'Детское', href: '/menu/detskoe', items: 'Бутерброды, капкейки, соки', dishId: 'mini-burger', realPhoto: '/images/real/burger.jpg' },
  { title: 'Веган', href: '/menu/vegan', items: 'Растительные блюда без мяса и молока', dishId: 'buddha-bowl', realPhoto: '/images/real/vegetarian-bowl.jpg' },
  { title: 'Без глютена', href: '/menu/gluten-free', items: 'Блюда без глютена', dishId: 'gluten-free-cake', realPhoto: '/images/real/cake-berry.jpg' },
  { title: 'Халяль', href: '/menu/halal', items: `${ALL_DISHES.filter(d => d.dietBadges.includes('halal')).length} блюд халяль на отдельной линии`, dishId: 'halal-chicken-shashlik', realPhoto: '/images/real/grilled-chicken.jpg' },
];

export default function MenuPreview() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30" aria-labelledby="menu-heading">
      <div className="container-site">
        <div className="mb-10 md:mb-14 max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-3">
            Меню под любой повод
          </p>
          <h2
            id="menu-heading"
            className="font-heading text-3xl md:text-5xl mb-3"
            style={{ fontWeight: 500 }}
          >
            124 блюда. 7 категорий. 1 команда шефов.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Нажмите на категорию, чтобы открыть блюда в конструкторе меню
          </p>
        </div>

        <div className="carousel-horizontal flex gap-3 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible max-w-4xl mx-auto">
          {CATS.map((cat) => {
            const dish = ALL_DISHES.find(d => d.id === cat.dishId);
            const img = cat.realPhoto || (dish ? getDishImage(dish.id, dish.station) : '/images/gallery/furshet-menu.jpg');
            const objPos = dish ? getObjectPositionForDish(dish.id, dish.station) : 'center 40%';
            const href = dish ? `/plan/constructor?format=${dish.format[0] || 'furshet'}&guests=20&dish=${dish.id}` : cat.href;
            return (
              <Link key={cat.href} href={href} className="carousel-item group block shrink-0 w-40 md:w-auto no-underline">
                <div className="aspect-square rounded-xl overflow-hidden mb-3 group-hover:shadow-lg transition-shadow border border-line">
                  <FoodPhoto
                    src={img}
                    alt={cat.title}
                    aspectRatio="square"
                    objectPosition={objPos}
                    className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-heading text-sm md:text-base font-medium text-center group-hover:text-gold-text transition-colors">{cat.title}</h3>
                <p className="text-xs text-muted-foreground text-center mt-0.5">{cat.items}</p>
              </Link>
            );
          })}
        </div>

        <p className="md:hidden text-center text-xs text-muted-foreground mt-2">Листайте влево</p>

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
