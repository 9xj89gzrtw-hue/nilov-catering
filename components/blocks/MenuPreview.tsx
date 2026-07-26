import Link from 'next/link';
import { ALL_DISHES } from '@/lib/menu-data';
import { getDishImage, getObjectPositionForDish } from '@/lib/dish-images';
import FoodPhoto from '@/components/common/FoodPhoto';

const CATS = [
  { title: 'Фуршет', href: '/menu/furshet', items: 'Канапе, тарталетки, мини-бургеры', dishId: 'canape-salmon' },
  { title: 'Банкет', href: '/menu/banquet', items: 'Закуски, горячее, винная карта', dishId: 'beef-medallions' },
  { title: 'Кофе-брейк', href: '/menu/coffee-break', items: 'Выпечка, канапе, кофе, чай', dishId: 'macaron-shooter' },
  { title: 'Детское', href: '/menu/detskoe', items: 'Бутерброды, капкейки, соки', dishId: 'mini-burger' },
  { title: 'Веган', href: '/menu/vegan', items: 'Растительные блюда без мяса и молока', dishId: 'buddha-bowl' },
  { title: 'Без глютена', href: '/menu/gluten-free', items: 'Блюда без глютена', dishId: 'gluten-free-cake' },
  { title: 'Халяль', href: '/menu/halal', items: `${ALL_DISHES.filter(d => d.dietBadges.includes('halal')).length} блюд халяль на отдельной линии`, dishId: 'halal-chicken-shashlik' },
];

export default function MenuPreview() {
  return (
    <section className="py-16 md:py-20 bg-background" aria-labelledby="menu-heading">
      <div className="container-site">
        <h2 id="menu-heading" className="mb-2 font-heading text-3xl md:text-4xl text-center">Меню</h2>
        <p className="text-center text-muted-foreground mb-8">Нажмите на блюдо, чтобы открыть в конструкторе</p>

        {/* Horizontal scroll carousel on mobile, grid on desktop */}
        <div className="carousel-horizontal flex gap-3 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible max-w-3xl mx-auto">
          {CATS.map((cat) => {
            const dish = ALL_DISHES.find(d => d.id === cat.dishId);
            const img = dish ? getDishImage(dish.id, dish.station) : '/images/gallery/furshet-menu.jpg';
            const objPos = dish ? getObjectPositionForDish(dish.id, dish.station) : 'center 40%';
            const href = dish ? `/plan/constructor?format=${dish.format[0] || 'furshet'}&guests=20&dish=${dish.id}` : cat.href;
            return (
              <Link key={cat.href} href={href} className="carousel-item group block shrink-0 w-40 md:w-auto">
                <div className="drinqit-3d drinqit-shine aspect-square rounded-2xl overflow-hidden mb-3 group-hover:shadow-lg transition-shadow border border-line">
                  <div className="drinqit-3d-inner w-full h-full">
                    <div className="drinqit-3d-img w-full h-full">
                      <FoodPhoto
                        src={img}
                        alt={cat.title}
                        aspectRatio="square"
                        objectPosition={objPos}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
                <h3 className="font-heading text-sm font-medium text-center group-hover:text-gold-text transition-colors">{cat.title}</h3>
                <p className="text-[11px] text-muted-foreground text-center mt-0.5">{cat.items}</p>
              </Link>
            );
          })}
        </div>

        {/* Scroll hint on mobile */}
        <p className="md:hidden text-center text-xs text-muted-foreground mt-2">← Листайте влево →</p>

        <div className="mt-8 text-center">
          <Link href="/menu" className="text-sm font-medium text-gold-text hover:underline">Полное меню →</Link>
        </div>
      </div>
    </section>
  );
}
