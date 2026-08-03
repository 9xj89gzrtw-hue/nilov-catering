import Link from 'next/link';
import { ALL_DISHES } from '@/lib/menu-data';
import { getDishImage, getObjectPositionForDish } from '@/lib/dish-images';
import FoodPhoto from '@/components/common/FoodPhoto';

const CATS = [
  { title: 'Фуршет', href: '/menu/furshet', photo: '/images/real/canape-platter.jpg', dishId: 'canape-salmon' },
  { title: 'Банкет', href: '/menu/banquet', photo: '/images/real/beef-medallions.jpg', dishId: 'beef-medallions' },
  { title: 'Кофе-брейк', href: '/menu/coffee-break', photo: '/images/real/macarons.jpg', dishId: 'macaron-shooter' },
  { title: 'Халяль', href: '/menu/halal', photo: '/images/real/grilled-chicken.jpg', dishId: 'halal-chicken-shashlik' },
  { title: 'Веган', href: '/menu/vegan', photo: '/images/real/vegetarian-bowl.jpg', dishId: 'buddha-bowl' },
  { title: 'Без глютена', href: '/menu/gluten-free', photo: '/images/real/cake-berry.jpg', dishId: 'gluten-free-cake' },
  { title: 'Детское', href: '/menu/detskoe', photo: '/images/real/burger.jpg', dishId: 'mini-burger' },
  { title: 'Десерты', href: '/menu/catalog', photo: '/images/real/dessert-table.jpg', dishId: 'choc-mousse' },
];

export default function MenuPreview() {
  return (
    <section className="py-16 md:py-20 bg-background" aria-labelledby="menu-heading">
      <div className="container-site">
        <h2 id="menu-heading" className="mb-8 font-heading text-3xl md:text-4xl text-center">Наше меню</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
          {CATS.map((cat) => {
            const dish = ALL_DISHES.find(d => d.id === cat.dishId);
            const img = cat.photo || (dish ? getDishImage(dish.id, dish.station) : '');
            const objPos = dish ? getObjectPositionForDish(dish.id, dish.station) : 'center 40%';
            return (
              <Link key={cat.href} href={cat.href} className="group block no-underline">
                <div className="aspect-square rounded-xl overflow-hidden mb-2 border border-line">
                  <FoodPhoto
                    src={img}
                    alt={cat.title}
                    aspectRatio="square"
                    objectPosition={objPos}
                    className="w-full h-full"
                  />
                </div>
                <p className="text-sm font-medium text-center group-hover:text-gold-text transition-colors">{cat.title}</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link href="/menu/catalog" className="text-sm font-medium text-gold-text hover:underline">Все 124 блюда →</Link>
        </div>
      </div>
    </section>
  );
}
