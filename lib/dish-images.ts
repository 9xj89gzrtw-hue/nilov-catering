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
  'canape-red-fish': `${IMG_BASE}/kanape/k1.jpg`,
  'tartlet-chicken': `${IMG_BASE}/kanape/k5.jpg`,
  'tartlet-mushroom': `${IMG_BASE}/kanape/k6.jpg`,
  'bruschetta-tomato': `${IMG_BASE}/kanape/k7.jpg`,
  'lavash-roll': `${IMG_BASE}/kanape/k8.jpg`,
  'mini-burger': `${IMG_BASE}/goryachee/h1.jpg`,
  'yakitori': `${IMG_BASE}/goryachee/h2.jpg`,
  'veggie-grill': `${IMG_BASE}/goryachee/h3.jpg`,
  'beef-stroganoff': `${IMG_BASE}/goryachee/h4.jpg`,
  'beef-medallions': `${IMG_BASE}/goryachee/h5.jpg`,
  'trout': `${IMG_BASE}/goryachee/h6.jpg`,
  'chicken-quinoa': `${IMG_BASE}/goryachee/h7.jpg`,
  'borscht': `${IMG_BASE}/goryachee/h8.jpg`,
  'macaron-shooter': `${IMG_BASE}/deserty/d1.jpg`,
  'donut-wall': `${IMG_BASE}/deserty/d2.jpg`,
  'cheesecake-shooter': `${IMG_BASE}/deserty/d3.jpg`,
  'choc-mousse': `${IMG_BASE}/deserty/d4.jpg`,
  'chia-pudding': `${IMG_BASE}/deserty/d5.jpg`,
  'brownie-shooter': `${IMG_BASE}/deserty/d6.jpg`,
  'cookie-shooter': `${IMG_BASE}/deserty/d7.jpg`,
  'mini-tart': `${IMG_BASE}/deserty/d8.jpg`,
  'chocolate-brownie': `${IMG_BASE}/deserty/d9.jpg`,
  'seabuckthorn-tea': `${IMG_BASE}/napitki/n1.jpg`,
  'cranberry-mors': `${IMG_BASE}/napitki/n2.jpg`,
  'cedar-raf': `${IMG_BASE}/napitki/n3.jpg`,
  'lemonade-tarragon': `${IMG_BASE}/napitki/n4.jpg`,
  'lemonade-berry': `${IMG_BASE}/napitki/n4.jpg`,
  'fruit-platter': `${IMG_BASE}/deserty/d8.jpg`,
  'meat-platter': `${IMG_BASE}/salaty/s1.jpg`,
  'cheese-platter': `${IMG_BASE}/salaty/s2.jpg`,
  'burrata-tomatoes': `${IMG_BASE}/salaty/s3.jpg`,
  'antipasto': `${IMG_BASE}/salaty/s4.jpg`,
  'caesar': `${IMG_BASE}/salaty/s5.jpg`,
  'salmon-salad': `${IMG_BASE}/salaty/s6.jpg`,
  'croissant': `${IMG_BASE}/deserty/d1.jpg`,
  'eclair': `${IMG_BASE}/deserty/d2.jpg`,
  'muffin': `${IMG_BASE}/deserty/d3.jpg`,
  'mini-sandwich': `${IMG_BASE}/kanape/k8.jpg`,
  'latte': `${IMG_BASE}/napitki/n3.jpg`,
  'omelette': `${IMG_BASE}/goryachee/h7.jpg`,
  'syrniki': `${IMG_BASE}/deserty/d5.jpg`,
  'greek-yogurt': `${IMG_BASE}/deserty/d6.jpg`,
  'fresh-juice': `${IMG_BASE}/napitki/n1.jpg`,
  'eggs-benedict': `${IMG_BASE}/goryachee/h8.jpg`,
  'halal-chicken-shashlik': `${IMG_BASE}/goryachee/h2.jpg`,
  'halal-lamb-kofta': `${IMG_BASE}/goryachee/h1.jpg`,
  'halal-beef-burger': `${IMG_BASE}/goryachee/h1.jpg`,
  'halal-plov': `${IMG_BASE}/goryachee/h4.jpg`,
  'halal-samsa': `${IMG_BASE}/goryachee/h3.jpg`,
  'halal-kebab-plate': `${IMG_BASE}/goryachee/h5.jpg`,
  'halal-hummus': `${IMG_BASE}/salaty/s7.jpg`,
  'halal-fattoush': `${IMG_BASE}/salaty/s8.jpg`,
};

// Фотографии для галереи и hero
export const GALLERY_IMAGES = [
  { src: '/images/gallery/wedding-banquet.jpg', alt: 'Свадебный банкет', caption: 'Свадьба · 120 гостей' },
  { src: '/images/gallery/corporate-furshet.jpg', alt: 'Корпоративный фуршет', caption: 'Корпоратив · 300 гостей' },
  { src: '/images/gallery/dessert-table.jpg', alt: 'Десертный стол', caption: 'Десертная станция' },
  { src: '/images/gallery/cocktail.jpg', alt: 'Коктейльный бар', caption: 'Бармен-шоу' },
  { src: '/images/gallery/show-station.jpg', alt: 'Шоу-станция', caption: 'Живая станция' },
  { src: '/images/gallery/furshet-menu.jpg', alt: 'Фуршетное меню', caption: 'Канапе и закуски' },
  { src: '/images/gallery/banket.jpg', alt: 'Банкет', caption: 'Банкет под ключ' },
  { src: '/images/gallery/kids.jpg', alt: 'Детский праздник', caption: 'Детский праздник' },
  { src: '/images/gallery/servirovka.jpg', alt: 'Сервировка', caption: 'Авторская сервировка' },
];

export const HERO_IMAGE = '/images/gallery/wedding-banquet.jpg';

// Функция: получить фото для блюда по dishId или station
export function getDishImage(dishId: string, station?: string): string {
  // Сначала проверяем специальный маппинг
  if (DISH_IMAGE_MAP[dishId]) return DISH_IMAGE_MAP[dishId];

  // Иначе берём по station — детерминированно по hash от dishId
  const images = STATION_IMAGES[station || 'cold'] || STATION_IMAGES.cold;
  const hash = dishId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return images[hash % images.length];
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
