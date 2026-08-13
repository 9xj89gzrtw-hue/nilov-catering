import Link from "next/link";
import { ArrowRight, Star, Users } from "lucide-react";
import { ALL_DISHES } from "@/lib/menu-data";
import { getDishImage, getObjectPositionForDish } from "@/lib/dish-images";
import FoodPhoto from "@/components/common/FoodPhoto";
import type { Format, Diet } from "@/lib/types";

// ═══════════════════════════════════════════
// ТИПЫ
// ═══════════════════════════════════════════
interface PopularDish {
  id: string;
  name: string;
  price: number;
}

interface MenuCategory {
  title: string;
  href: string;
  description: string;
  dishId: string;
  realPhoto: string;
  // Популярные блюда для превью (показываем 2-3)
  popularDishes: PopularDish[];
  // Статистика категории
  dishCount: number;
  priceFrom: number; // минимальная цена за персону
  // Что увидит пользователь при клике
  clickHint: string;
}

// ═══════════════════════════════════════════
// ДАННЫЕ КАТЕГОРИЙ С КОНКРЕТНЫМИ БЛЮДАМИ
// ═══════════════════════════════════════════

// Вспомогательная функция для получения блюд по формату
function getDishesByFormat(format: Format) {
  return ALL_DISHES.filter((d) => d.format.includes(format));
}

// Вспомогательная функция для получения блюд по диетическому фильтру
function getDishesByDiet(badge: Diet) {
  return ALL_DISHES.filter((d) => d.dietBadges.includes(badge));
}

const CATS: MenuCategory[] = [
  // === ФУРШЕТ ===
  {
    title: "Фуршет",
    href: "/menu/furshet",
    description: "Канапе, тарталетки, мини-бургеры, гриль-станция",
    dishId: "canape-salmon",
    realPhoto: "/images/dishes-new/menu-canape-platter.jpg",
    popularDishes: [
      { id: "canape-salmon", name: "Канапе с лососем", price: 290 },
      { id: "tartlet-chicken", name: "Тарталетка с курицей", price: 250 },
      { id: "mini-burger", name: "Мини-бургер", price: 320 },
      { id: "bao-pork", name: "Бао со свининой", price: 350 },
    ],
    dishCount: getDishesByFormat("furshet").length,
    priceFrom: 150,
    clickHint: "Конструктор фуршета с 45+ блюдами",
  },

  // === БАНКЕТ ===
  {
    title: "Банкет",
    href: "/menu/banquet",
    description: "Закуски, горячее, десерты, винная карта",
    dishId: "beef-medallions",
    realPhoto: "/images/dishes-new/menu-banquet-spread.jpg",
    popularDishes: [
      { id: "beef-medallions", name: "Медальоны из говядины", price: 890 },
      { id: "salmon-grill", name: "Лосось на гриле", price: 750 },
      { id: "caesar", name: "Салат Цезарь", price: 380 },
      { id: "macaron-tower", name: "Башня макаронс", price: 380 },
    ],
    dishCount: getDishesByFormat("banket").length,
    priceFrom: 280,
    clickHint: "Полное банкетное меню на выбор",
  },

  // === КОФЕ-БРЕЙК ===
  {
    title: "Кофе-брейк",
    href: "/menu/coffee-break",
    description: "Выпечка, канапе, кофе, чай, напитки",
    dishId: "macaron-shooter",
    realPhoto: "/images/dishes-new/menu-coffee-break.jpg",
    popularDishes: [
      { id: "macaron-shooter", name: "Макаронс ассорти", price: 180 },
      { id: "croissant-ham", name: "Круассан с ветчиной", price: 220 },
      { id: "coffee-specialty", name: "Спешелти-кофе", price: 200 },
      { id: "lemonade-berry", name: "Ягодный лимонад", price: 150 },
    ],
    dishCount: getDishesByFormat("coffee-break").length,
    priceFrom: 100,
    clickHint: "Перекус для конференций и встреч",
  },

  // === ДЕТСКОЕ ===
  {
    title: "Детское",
    href: "/menu/detskoe",
    description: "Бургеры, наггетсы, капкейки, молочные коктейли",
    dishId: "kids-burger",
    realPhoto: "/images/dishes-new/menu-kids-party.jpg",
    popularDishes: [
      { id: "kids-burger", name: "Детский бургер", price: 350 },
      { id: "nuggets", name: "Куриные наггетсы", price: 280 },
      { id: "mini-pizza", name: "Мини-пицца", price: 300 },
      { id: "milkshake", name: "Молочный коктейль", price: 200 },
    ],
    dishCount: getDishesByFormat("detskoe").length,
    priceFrom: 200,
    clickHint: "Детское меню для праздников",
  },

  // === ВЕГАН ===
  {
    title: "Веган",
    href: "/menu/vegan",
    description: "Растительные блюда без мяса и молочных продуктов",
    dishId: "buddha-bowl",
    realPhoto: "/images/dishes-new/menu-vegan-bowl.jpg",
    popularDishes: [
      { id: "buddha-bowl", name: "Будда-боул", price: 420 },
      { id: "vegan-grazing", name: "Веган grazing-борд", price: 480 },
      { id: "taco-cauliflower", name: "Тако с цветной капустой", price: 280 },
      { id: "fruit-canape", name: "Фруктовые канапе", price: 220 },
    ],
    dishCount: getDishesByDiet("vegan").length,
    priceFrom: 220,
    clickHint: "100% растительное меню",
  },

  // === БЕЗ ГЛЮТЕНА ===
  {
    title: "Без глютена",
    href: "/menu/gluten-free",
    description: "Блюда без пшеницы, ржи, ячменя",
    dishId: "gluten-free-cake",
    realPhoto: "/images/dishes-new/menu-cake-berry.jpg",
    popularDishes: [
      { id: "gluten-free-cupcakes", name: "БГ капкейки", price: 280 },
      { id: "gluten-free-pizza", name: "БГ мини-пицца", price: 320 },
      { id: "taco-fish", name: "Тако с рыбой", price: 320 },
      { id: "poke-salmon", name: "Поке с лососем", price: 420 },
    ],
    dishCount: getDishesByDiet("gluten-free").length,
    priceFrom: 280,
    clickHint: "Безопасное меню для целиакии",
  },

  // === ХАЛЯЛЬ ===
  {
    title: "Халяль",
    href: "/menu/halal",
    description: `${getDishesByDiet("halal").length} блюд халяль на отдельной линии`,
    dishId: "halal-chicken-shashlik",
    realPhoto: "/images/dishes-new/menu-grilled-chicken.jpg",
    popularDishes: [
      { id: "halal-chicken-shashlik", name: "Шашлык из курицы", price: 450 },
      { id: "halal-lamb-kofta", name: "Кофта из баранины", price: 520 },
      { id: "halal-plov", name: "Халяль плов", price: 480 },
      { id: "halal-baklava", name: "Пахлава", price: 180 },
    ],
    dishCount: getDishesByDiet("halal").length,
    priceFrom: 180,
    clickHint: "Сертифицированное халяль меню",
  },
];

// ═══════════════════════════════════════════
// КОМПОНЕНТ
// ═══════════════════════════════════════════

export default function MenuPreview() {
  return (
    <section
      className="bg-secondary/30 relative overflow-hidden py-20 md:py-28"
      aria-labelledby="menu-heading"
    >
      {/* Декоративный фон */}
      <div
        className="from-gold-tint/5 pointer-events-none absolute inset-0 bg-gradient-to-b via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="container-site relative">
        {/* Заголовок секции */}
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p className="text-gold-text mb-3 text-xs tracking-[0.22em] uppercase">
            Меню под любой повод
          </p>
          <h2
            id="menu-heading"
            className="font-heading mb-3 text-3xl md:text-5xl"
            style={{ fontWeight: 500 }}
          >
            {ALL_DISHES.length} блюда. 7 категорий. 1 команда шефов.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Нажмите на категорию — откроется конструктор с блюдами и ценами
          </p>
        </div>

        {/* Сетка категорий */}
        <div className="carousel-horizontal mx-auto flex max-w-6xl gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible">
          {CATS.map((cat) => {
            const dish = ALL_DISHES.find((d) => d.id === cat.dishId);
            const img =
              cat.realPhoto ||
              (dish ? getDishImage(dish.id, dish.station) : "/images/gallery/furshet-menu.jpg");
            const objPos = dish ? getObjectPositionForDish(dish.id, dish.station) : "center 40%";
            const href = dish
              ? `/plan/constructor?format=${dish.format[0] || "furshet"}&guests=20&dish=${dish.id}`
              : cat.href;

            return (
              <Link
                key={cat.href}
                href={href}
                className="carousel-item group block w-72 shrink-0 no-underline md:w-auto"
              >
                {/* Карточка категории */}
                <div className="group-hover:shadow-gold/10 border-line bg-card relative mb-3 aspect-[4/5] overflow-hidden rounded-2xl border transition-all duration-500 group-hover:shadow-xl">
                  {/* Фото категории */}
                  <div className="absolute inset-0">
                    <FoodPhoto
                      src={img}
                      alt={cat.title}
                      aspectRatio="portrait"
                      objectPosition={objPos}
                      className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Градиентный оверлей для читаемости текста */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Контент поверх фото */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    {/* Заголовок категории */}
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-heading text-lg font-medium text-white">{cat.title}</h3>
                      <Star className="text-gold-text fill-gold-text h-4 w-4" />
                    </div>

                    {/* Подзаголовок с количеством */}
                    <p className="mb-2 text-xs text-white/80">{cat.clickHint}</p>

                    {/* Популярные блюда с ценами */}
                    <div className="mb-3 space-y-1">
                      {cat.popularDishes.slice(0, 3).map((popularDish) => (
                        <div
                          key={popularDish.id}
                          className="flex items-center justify-between rounded-lg bg-white/10 px-2 py-1.5 text-xs backdrop-blur-sm"
                        >
                          <span className="mr-2 truncate text-white/90">{popularDish.name}</span>
                          <span className="text-gold-text font-medium whitespace-nowrap">
                            {popularDish.price}₽
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Футер карточки - цена от + количество */}
                    <div className="flex items-center justify-between border-t border-white/20 pt-2">
                      <div className="flex items-center gap-1 text-xs text-white/70">
                        <Users className="h-3 w-3" />
                        <span>от {cat.priceFrom}₽/чел</span>
                      </div>
                      <span className="text-gold-text text-xs font-medium">
                        +{cat.dishCount} блюд
                      </span>
                    </div>
                  </div>

                  {/* Индикатор при наведении */}
                  <div className="absolute top-3 right-3 z-10 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <span className="bg-gold-text text-foreground block flex h-8 w-8 items-center justify-center rounded-full text-sm shadow-md">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>

                {/* Описание под карточкой (только desktop) */}
                <p className="text-muted-foreground mt-1.5 hidden px-2 text-center text-xs md:block">
                  {cat.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Подсказка для мобильных */}
        <p className="text-muted-foreground mt-3 text-center text-xs md:hidden">
          ← Листайте для всех категорий →
        </p>

        {/* Кнопка полного меню */}
        <div className="mt-10 text-center">
          <Link
            href="/menu"
            className="border-line bg-card text-foreground hover:border-gold-text hover:text-gold-text hover:shadow-gold/10 inline-flex min-h-[44px] items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium no-underline transition-all hover:shadow-lg"
          >
            Смотреть полное меню ({ALL_DISHES.length} блюд)
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Дополнительная информация о конструкторе */}
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-muted-foreground text-xs">
            💡 В конструкторе можно комбинировать блюда из разных категорий, менять количество
            гостей и видеть итоговую стоимость
          </p>
        </div>
      </div>
    </section>
  );
}
