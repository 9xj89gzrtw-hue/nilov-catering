// Маппинг блюд на реальные фотографии из /public/images/menu/
// Фото разбиты по категориям: kanape, salaty, goryachee, deserty, napitki, sezonne

// Базовый путь к фото
const IMG_BASE = '/images/menu';

// Маппинг по station (тип блюда)
const STATION_IMAGES: Record<string, string[]> = {
  cold: [
    `${IMG_BASE}/kanape/k1.jpg`, `${IMG_BASE}/kanape/k2.jpg`, `${IMG_BASE}/kanape/k3.jpg`,
    `${IMG_BASE}/kanape/k4.jpg`, `${IMG_BASE}/kanape/k5.jpg`, `${IMG_BASE}/kanape/k6.jpg`,
    `${IMG_BASE}/kanape/k7.jpg`, `${IMG_BASE}/kanape/k8.jpg`, `${IMG_BASE}/kanape/k9.jpg`,
    `${IMG_BASE}/salaty/s1.jpg`, `${IMG_BASE}/salaty/s2.jpg`, `${IMG_BASE}/salaty/s3.jpg`,
    `${IMG_BASE}/salaty/s4.jpg`, `${IMG_BASE}/salaty/s5.jpg`, `${IMG_BASE}/salaty/s6.jpg`,
    `${IMG_BASE}/salaty/s7.jpg`, `${IMG_BASE}/salaty/s8.jpg`,
  ],
  hot: [
    `${IMG_BASE}/goryachee/h1.jpg`, `${IMG_BASE}/goryachee/h2.jpg`, `${IMG_BASE}/goryachee/h3.jpg`,
    `${IMG_BASE}/goryachee/h4.jpg`, `${IMG_BASE}/goryachee/h5.jpg`, `${IMG_BASE}/goryachee/h6.jpg`,
    `${IMG_BASE}/goryachee/h7.jpg`, `${IMG_BASE}/goryachee/h8.jpg`,
  ],
  desserts: [
    `${IMG_BASE}/deserty/d1.jpg`, `${IMG_BASE}/deserty/d2.jpg`, `${IMG_BASE}/deserty/d3.jpg`,
    `${IMG_BASE}/deserty/d4.jpg`, `${IMG_BASE}/deserty/d5.jpg`, `${IMG_BASE}/deserty/d6.jpg`,
    `${IMG_BASE}/deserty/d7.jpg`, `${IMG_BASE}/deserty/d8.jpg`, `${IMG_BASE}/deserty/d9.jpg`,
  ],
  drinks: [
    `${IMG_BASE}/napitki/n1.jpg`, `${IMG_BASE}/napitki/n2.jpg`, `${IMG_BASE}/napitki/n3.jpg`,
    `${IMG_BASE}/napitki/n4.jpg`,
  ],
  show: [
    `${IMG_BASE}/goryachee/h1.jpg`, `${IMG_BASE}/goryachee/h3.jpg`,
  ],
};

// Специальные изображения для конкретных блюд
const DISH_IMAGE_MAP: Record<string, string> = {
  'canape-salmon': `${IMG_BASE}/kanape/k1.jpg`,
  'canape-cheese': `${IMG_BASE}/kanape/k2.jpg`,
  'canape-caprese': `${IMG_BASE}/kanape/k3.jpg`,
  'canape-ham': `${IMG_BASE}/kanape/k4.jpg`,
  'canape-red-fish': `${IMG_BASE}/kanape/k9.jpg`,
  'tartlet-chicken': `${IMG_BASE}/kanape/k5.jpg`,
  'tartlet-mushroom': `${IMG_BASE}/kanape/k6.jpg`,
  'bruschetta-tomato': `${IMG_BASE}/kanape/k7.jpg`,
  'lavash-roll': `${IMG_BASE}/kanape/k7.jpg`,
  'mini-burger': `${IMG_BASE}/goryachee/h1.jpg`,
  'yakitori': `${IMG_BASE}/goryachee/h2.jpg`,
  'veggie-grill': `${IMG_BASE}/goryachee/h3.jpg`,
  'beef-stroganoff': `${IMG_BASE}/goryachee/h1.jpg`,
  'beef-medallions': `${IMG_BASE}/goryachee/h5.jpg`,
  'trout': `${IMG_BASE}/goryachee/h5.jpg`,
  'chicken-quinoa': `${IMG_BASE}/goryachee/h7.jpg`,
  'borscht': `${IMG_BASE}/goryachee/h4.jpg`,
  'macaron-shooter': `${IMG_BASE}/deserty/d1.jpg`,
  'donut-wall': `${IMG_BASE}/deserty/d2.jpg`,
  'cheesecake-shooter': `${IMG_BASE}/deserty/d3.jpg`,
  'choc-mousse': `${IMG_BASE}/deserty/d4.jpg`,
  'chia-pudding': `${IMG_BASE}/deserty/d5.jpg`,
  'brownie-shooter': `${IMG_BASE}/deserty/d4.jpg`,
  'cookie-shooter': `${IMG_BASE}/deserty/d7.jpg`,
  'mini-tart': `${IMG_BASE}/deserty/d8.jpg`,
  'chocolate-brownie': `${IMG_BASE}/deserty/d9.jpg`,
  'seabuckthorn-tea': `${IMG_BASE}/napitki/n1.jpg`,
  'cranberry-mors': `${IMG_BASE}/napitki/n2.jpg`,
  'cedar-raf': `${IMG_BASE}/napitki/n3.jpg`,
  'lemonade-tarragon': `${IMG_BASE}/napitki/n4.jpg`,
  'lemonade-berry': `${IMG_BASE}/napitki/n2.jpg`,
  'fruit-platter': `${IMG_BASE}/kanape/k9.jpg`,
  'meat-platter': `${IMG_BASE}/salaty/s1.jpg`,
  'cheese-platter': `${IMG_BASE}/salaty/s2.jpg`,
  'burrata-tomatoes': `${IMG_BASE}/salaty/s3.jpg`,
  'antipasto': `${IMG_BASE}/salaty/s4.jpg`,
  'caesar': `${IMG_BASE}/salaty/s5.jpg`,
  'salmon-salad': `${IMG_BASE}/salaty/s6.jpg`,
  'croissant': `${IMG_BASE}/deserty/d9.jpg`,
  'eclair': `${IMG_BASE}/deserty/d1.jpg`,
  'muffin': `${IMG_BASE}/deserty/d2.jpg`,
  'mini-sandwich': `${IMG_BASE}/kanape/k6.jpg`,
  'latte': `${IMG_BASE}/napitki/n4.jpg`,
  'omelette': `${IMG_BASE}/goryachee/h8.jpg`,
  'syrniki': `${IMG_BASE}/deserty/d3.jpg`,
  'greek-yogurt': `${IMG_BASE}/deserty/d7.jpg`,
  'fresh-juice': `${IMG_BASE}/napitki/n2.jpg`,
  'eggs-benedict': `${IMG_BASE}/goryachee/h8.jpg`,
  'halal-chicken-shashlik': `${IMG_BASE}/goryachee/h3.jpg`,
  'halal-lamb-kofta': `${IMG_BASE}/goryachee/h6.jpg`,
  'halal-beef-burger': `${IMG_BASE}/goryachee/h5.jpg`,
  'halal-plov': `${IMG_BASE}/goryachee/h6.jpg`,
  'halal-samsa': `${IMG_BASE}/goryachee/h4.jpg`,
  'halal-kebab-plate': `${IMG_BASE}/goryachee/h2.jpg`,
  'halal-hummus': `${IMG_BASE}/salaty/s7.jpg`,
  'halal-fattoush': `${IMG_BASE}/salaty/s8.jpg`,
};

// Фотографии для галереи — расширенный набор 45 фото (W26 fix)
export const GALLERY_IMAGES = [
  // === События (9 фото) ===
  { src: '/images/gallery/wedding-banquet.jpg', alt: 'Свадебный банкет', caption: 'Свадьба · 120 гостей · Особняк Бруноз · Август 2024' },
  { src: '/images/gallery/corporate-furshet.jpg', alt: 'Корпоративный фуршет', caption: 'Корпоратив · 300 гостей · Лофт «Севкабель» · Декабрь 2024' },
  { src: '/images/gallery/dessert-table.jpg', alt: 'Десертный стол', caption: 'Десертная станция · свадьба · Июль 2024' },
  { src: '/images/gallery/cocktail.jpg', alt: 'Коктейльный бар', caption: 'Бармен-шоу · корпоратив · 50 чел' },
  { src: '/images/gallery/show-station.jpg', alt: 'Шоу-станция', caption: 'Живая станция · конференция Expoforum · Октябрь 2024' },
  { src: '/images/gallery/furshet-menu.jpg', alt: 'Фуршетное меню', caption: 'Канапе и закуски · фуршет на 80 чел' },
  { src: '/images/gallery/banket.jpg', alt: 'Банкет', caption: 'Банкет под ключ · юбилей · 25 чел' },
  { src: '/images/gallery/kids.jpg', alt: 'Детский праздник', caption: 'Детский праздник · БГ-меню · 8 детей · Ноябрь 2025' },
  { src: '/images/gallery/servirovka.jpg', alt: 'Сервировка', caption: 'Авторская сервировка · свадьба · 60 чел' },

  // === Канапе (9 фото) ===
  { src: '/images/menu/kanape/k1.jpg', alt: 'Канапе с лососем', caption: 'Канапе с лососем · фуршет' },
  { src: '/images/menu/kanape/k2.jpg', alt: 'Канапе с сыром', caption: 'Канапе с сыром и орехом · фуршет' },
  { src: '/images/menu/kanape/k3.jpg', alt: 'Канапе капрезе', caption: 'Канапе капрезе · моцарелла, томаты, песто' },
  { src: '/images/menu/kanape/k4.jpg', alt: 'Канапе с хамоном', caption: 'Канапе с хамоном · премиум-фуршет' },
  { src: '/images/menu/kanape/k5.jpg', alt: 'Тарталетки с курицей', caption: 'Тарталетка с курицей · фуршет' },
  { src: '/images/menu/kanape/k6.jpg', alt: 'Тарталетки с грибами', caption: 'Тарталетка грибная · фуршет' },
  { src: '/images/menu/kanape/k7.jpg', alt: 'Брускетта с томатами', caption: 'Брускетта с томатами · веган · фуршет' },
  { src: '/images/menu/kanape/k8.jpg', alt: 'Рулетик из лаваша', caption: 'Рулет из лаваша · фуршет' },
  { src: '/images/menu/kanape/k9.jpg', alt: 'Канапе ассорти', caption: 'Канапе-ассорти · 5 видов · фуршет' },

  // === Салаты (9 фото) ===
  { src: '/images/menu/salaty/s1.jpg', alt: 'Мясная нарезка', caption: 'Мясное плато · банкет' },
  { src: '/images/menu/salaty/s2.jpg', alt: 'Сырная нарезка', caption: 'Сырное плато · банкет' },
  { src: '/images/menu/salaty/s3.jpg', alt: 'Буррата с томатами', caption: 'Буррата с томатами · банкет' },
  { src: '/images/menu/salaty/s4.jpg', alt: 'Антипасто', caption: 'Антипасто · банкет' },
  { src: '/images/menu/salaty/s5.jpg', alt: 'Салат Цезарь', caption: 'Салат Цезарь · банкет' },
  { src: '/images/menu/salaty/s6.jpg', alt: 'Салат с лососем', caption: 'Салат с лососем · банкет' },
  { src: '/images/menu/salaty/s7.jpg', alt: 'Хумус', caption: 'Хумус с питой · халяль · веган' },
  { src: '/images/menu/salaty/s8.jpg', alt: 'Фаттуш', caption: 'Салат фаттуш · халяль · веган' },
  { src: '/images/menu/salaty/s9.jpg', alt: 'Греческий салат', caption: 'Греческий салат · фуршет' },

  // === Горячее (8 фото) ===
  { src: '/images/menu/goryachee/h1.jpg', alt: 'Мини-бургер', caption: 'Мини-бургер · фуршет' },
  { src: '/images/menu/goryachee/h2.jpg', alt: 'Куриные якитори', caption: 'Куриные якитори · фуршет' },
  { src: '/images/menu/goryachee/h3.jpg', alt: 'Овощи гриль', caption: 'Овощи гриль · веган · халяль' },
  { src: '/images/menu/goryachee/h4.jpg', alt: 'Бефстроганов', caption: 'Бефстроганов · банкет' },
  { src: '/images/menu/goryachee/h5.jpg', alt: 'Медальоны из вырезки', caption: 'Медальоны из говядины · банкет' },
  { src: '/images/menu/goryachee/h6.jpg', alt: 'Форель', caption: 'Форель с картофельным муссом · банкет' },
  { src: '/images/menu/goryachee/h7.jpg', alt: 'Курица с киноа', caption: 'Курица с киноа · банкет' },
  { src: '/images/menu/goryachee/h8.jpg', alt: 'Борщ', caption: 'Борщ · банкет' },

  // === Десерты (9 фото) ===
  { src: '/images/menu/deserty/d1.jpg', alt: 'Макаронс', caption: 'Макаронс-шутер · десертная станция' },
  { src: '/images/menu/deserty/d2.jpg', alt: 'Донат-стена', caption: 'Донат-стена · свадьба' },
  { src: '/images/menu/deserty/d3.jpg', alt: 'Чизкейк', caption: 'Чизкейк-шутер · кофе-брейк' },
  { src: '/images/menu/deserty/d4.jpg', alt: 'Шоколадный мусс', caption: 'Шоколадный мусс · веган · без сахара · СД1' },
  { src: '/images/menu/deserty/d5.jpg', alt: 'Чиа-пудинг', caption: 'Чиа-пудинг · веган · без сахара · СД1' },
  { src: '/images/menu/deserty/d6.jpg', alt: 'Брауни', caption: 'Брауни-шутер · кофе-брейк' },
  { src: '/images/menu/deserty/d7.jpg', alt: 'Печенье-шутер', caption: 'Молочно-печенье-шутер · детский' },
  { src: '/images/menu/deserty/d8.jpg', alt: 'Мини-тарт', caption: 'Мини-тарт ассорти · кофе-брейк' },
  { src: '/images/menu/deserty/d9.jpg', alt: 'Шоколадный брауни', caption: 'Шоколадный брауни · фуршет' },

  // === Напитки (4 фото) ===
  { src: '/images/menu/napitki/n1.jpg', alt: 'Облепиховый чай', caption: 'Облепиховый чай · без сахара · кофе-брейк' },
  { src: '/images/menu/napitki/n2.jpg', alt: 'Клюквенный морс', caption: 'Клюквенный морс · без сахара · кофе-брейк' },
  { src: '/images/menu/napitki/n3.jpg', alt: 'Кедровый раф', caption: 'Кедровый раф · кофе-брейк' },
  { src: '/images/menu/napitki/n4.jpg', alt: 'Лимонад', caption: 'Авторский лимонад · фуршет' },

  // === Сезонные (5 фото) ===
  { src: '/images/menu/sezonnye/se1.jpg', alt: 'Сезонное блюдо 1', caption: 'Сезонная закуска · весна 2025' },
  { src: '/images/menu/sezonnye/se2.jpg', alt: 'Сезонное блюдо 2', caption: 'Сезонный салат · лето 2025' },
  { src: '/images/menu/sezonnye/se3.jpg', alt: 'Сезонное блюдо 3', caption: 'Сезонное горячее · осень 2024' },
  { src: '/images/menu/sezonnye/se4.jpg', alt: 'Сезонное блюдо 4', caption: 'Сезонный десерт · зима 2024' },
  { src: '/images/menu/sezonnye/se5.jpg', alt: 'Сезонное блюдо 5', caption: 'Праздничное блюдо · Новый год 2025' },
];

export const HERO_IMAGE = '/images/gallery/wedding-banquet.jpg';

// Функция: получить фото для блюда по dishId или station
// Использует FNV-1a хэш для равномерного распределения (избегаем коллизий
// простого char-sum хэша, где 3+ разных блюда получали одно и то же фото).
export function getDishImage(dishId: string, station?: string): string {
  // Сначала проверяем специальный маппинг
  if (DISH_IMAGE_MAP[dishId]) return DISH_IMAGE_MAP[dishId];

  // Иначе берём по station — детерминированно по FNV-1a от dishId
  const images = STATION_IMAGES[station || 'cold'] || STATION_IMAGES.cold;

  // FNV-1a 32-bit
  let hash = 0x811c9dc5;
  for (let i = 0; i < dishId.length; i++) {
    hash ^= dishId.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  const idx = Math.abs(hash) % images.length;
  return images[idx];
}

// Альтернативная функция для каталожной выдачи: каждой странице каталога
// выдаёт индекс i в общем порядке, чтобы гарантировать разнообразие фото
// даже когда dishId'ы похожи (например, все vegan-блюда с префиксом vegan-).
export function getDishImageByIndex(dishId: string, station: string | undefined, index: number): string {
  if (DISH_IMAGE_MAP[dishId]) return DISH_IMAGE_MAP[dishId];
  const images = STATION_IMAGES[station || 'cold'] || STATION_IMAGES.cold;
  // round-robin — каждые N картинок цикл
  return images[index % images.length];
}

// Фотографии для форматов (hero images)
export const FORMAT_HERO_IMAGES: Record<string, string> = {
  furshet: '/images/gallery/furshet-menu.jpg',
  banket: '/images/gallery/wedding-banquet.jpg',
  'coffee-break': '/images/gallery/dessert-table.jpg',
  detskoe: '/images/gallery/kids.jpg',
  'chef-at-home': '/images/gallery/servirovka.jpg',
  'mobile-furshet': '/images/gallery/corporate-furshet.jpg',
};
