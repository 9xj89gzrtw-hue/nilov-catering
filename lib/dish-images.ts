// Маппинг блюд на реальные фотографии из /public/images/menu/
// Фото разбиты по категориям: kanape, salaty, goryachee, deserty, napitki, sezonne, bbq
// + новые фото в /public/images/dishes-new/ (W83, август 2026)

// Базовый путь к фото
const IMG_BASE = '/images/menu';
const NEW_DISHES = '/images/dishes-new'; // 46 новых фото, скачанных в W83

// Маппинг по station (тип блюда) — расширен в W46 для увеличения уникальности
const STATION_IMAGES: Record<string, string[]> = {
  cold: [
    `${IMG_BASE}/kanape/k1.jpg`, `${IMG_BASE}/kanape/k2.jpg`, `${IMG_BASE}/kanape/k3.jpg`,
    `${IMG_BASE}/kanape/k4.jpg`, `${IMG_BASE}/kanape/k5.jpg`, `${IMG_BASE}/kanape/k6.jpg`,
    `${IMG_BASE}/kanape/k7.jpg`, `${IMG_BASE}/kanape/k8.jpg`, `${IMG_BASE}/kanape/k9.jpg`,
    `${IMG_BASE}/salaty/s1.jpg`, `${IMG_BASE}/salaty/s2.jpg`, `${IMG_BASE}/salaty/s3.jpg`,
    `${IMG_BASE}/salaty/s4.jpg`, `${IMG_BASE}/salaty/s5.jpg`, `${IMG_BASE}/salaty/s6.jpg`,
    `${IMG_BASE}/salaty/s7.jpg`, `${IMG_BASE}/salaty/s8.jpg`, `${IMG_BASE}/salaty/s9.jpg`,
  ],
  hot: [
    `${IMG_BASE}/goryachee/h1.jpg`, `${IMG_BASE}/goryachee/h2.jpg`, `${IMG_BASE}/goryachee/h3.jpg`,
    `${IMG_BASE}/goryachee/h4.jpg`, `${IMG_BASE}/goryachee/h5.jpg`, `${IMG_BASE}/goryachee/h6.jpg`,
    `${IMG_BASE}/goryachee/h7.jpg`, `${IMG_BASE}/goryachee/h8.jpg`,
    `${IMG_BASE}/bbq/b1.jpg`, `${IMG_BASE}/bbq/b2.jpg`, `${IMG_BASE}/bbq/b3.jpg`,
    `${IMG_BASE}/bbq/b4.jpg`, `${IMG_BASE}/bbq/b5.jpg`,
  ],
  desserts: [
    `${IMG_BASE}/deserty/d1.jpg`, `${IMG_BASE}/deserty/d2.jpg`, `${IMG_BASE}/deserty/d3.jpg`,
    `${IMG_BASE}/deserty/d4.jpg`, `${IMG_BASE}/deserty/d5.jpg`, `${IMG_BASE}/deserty/d6.jpg`,
    `${IMG_BASE}/deserty/d7.jpg`, `${IMG_BASE}/deserty/d8.jpg`, `${IMG_BASE}/deserty/d9.jpg`,
    `${IMG_BASE}/sezonnye/se4.jpg`, `${IMG_BASE}/sezonnye/se5.jpg`,
    `${IMG_BASE}/sezonnye/se6.jpg`, `${IMG_BASE}/sezonnye/se7.jpg`,
  ],
  drinks: [
    `${IMG_BASE}/napitki/n1.jpg`, `${IMG_BASE}/napitki/n2.jpg`, `${IMG_BASE}/napitki/n3.jpg`,
    `${IMG_BASE}/napitki/n4.jpg`,
  ],
  show: [
    `${IMG_BASE}/sezonnye/se1.jpg`, `${IMG_BASE}/sezonnye/se2.jpg`,
    `${IMG_BASE}/sezonnye/se3.jpg`, `${IMG_BASE}/sezonnye/se6.jpg`,
    `${IMG_BASE}/bbq/b3.jpg`, `${IMG_BASE}/bbq/b4.jpg`,
  ],
  bbq: [
    `${IMG_BASE}/bbq/b1.jpg`, `${IMG_BASE}/bbq/b2.jpg`, `${IMG_BASE}/bbq/b3.jpg`,
    `${IMG_BASE}/bbq/b4.jpg`, `${IMG_BASE}/bbq/b5.jpg`,
    `${NEW_DISHES}/halal-chicken-shashlik.jpg`, `${NEW_DISHES}/halal-lamb-kofta.jpg`,
    `${NEW_DISHES}/halal-kebab-plate.jpg`, `${NEW_DISHES}/beef-steak.jpg`,
  ],
};

// Per-station objectPosition map — different framing for different dish types
export const STATION_OBJECT_POSITION: Record<string, string> = {
  cold: 'center 40%',
  hot: 'center 45%',
  desserts: 'center 50%',
  drinks: 'center 30%',
  show: 'center 45%',
  bbq: 'center 50%',
};


const DISH_IMG_BASE = '/images/dishes';

// === W83: ПОЛНОСТЬЮ ОБНОВЛЁННЫЙ МАППИНГ ===
// 14 mismatch'ей исправлены, 46 новых фото подключены, 10 "quick wins" применены
const DISH_IMAGE_MAP: Record<string, string> = {
  // === Канапе (k1-k9) — оригинальные фото корректны ===
  'canape-salmon': `${IMG_BASE}/kanape/k1.jpg`,
  'canape-cheese': `${IMG_BASE}/kanape/k2.jpg`,
  'canape-caprese': `${IMG_BASE}/kanape/k3.jpg`,
  'canape-ham': `${IMG_BASE}/kanape/k4.jpg`,
  'canape-red-fish': `${NEW_DISHES}/canape-red-fish.jpg`, // W83: было k9 (ассорти), стало конкретно красная рыба
  'tartlet-chicken': `${IMG_BASE}/kanape/k5.jpg`,
  'tartlet-mushroom': `${IMG_BASE}/kanape/k6.jpg`,
  'bruschetta-tomato': `${IMG_BASE}/kanape/k7.jpg`,
  'lavash-roll': `${IMG_BASE}/kanape/k8.jpg`,
  'canape-caviar': `${NEW_DISHES}/caviar-station.jpg`, // W83: новое фото

  // Горячее
  'mini-burger': `${IMG_BASE}/goryachee/h1.jpg`,
  'beef-stroganoff': `${IMG_BASE}/goryachee/h4.jpg`,
  'beef-medallions': '/images/real/beef-medallions.jpg',
  'trout': `${DISH_IMG_BASE}/trout.png`,
  'chicken-quinoa': `${IMG_BASE}/goryachee/h7.jpg`,
  'borscht': `${IMG_BASE}/goryachee/h8.jpg`,
  'yakitori': `${IMG_BASE}/goryachee/h2.jpg`,
  'veggie-grill': `${IMG_BASE}/goryachee/h3.jpg`,
  'jerk-chicken': `${DISH_IMG_BASE}/jerk-chicken.png`,
  'bao-pork': `${DISH_IMG_BASE}/bao-pork.png`,
  'bao-duck': `${DISH_IMG_BASE}/bao-duck.png`,
  'mushroom-burger': `${DISH_IMG_BASE}/mushroom-burger.png`,
  'taco-fish': '/images/real/fish-taco.jpg',
  'poke-salmon': '/images/real/poke-bowl.jpg',
  'cauli-steak': `${DISH_IMG_BASE}/cauli-steak.png`,
  // W85 P0: VEGAN dishes — fixed from hash-fallback (was showing MEAT)
  'taco-cauliflower': `${NEW_DISHES}/taco-cauliflower.jpg`, // W85: было bbq/b3.jpg (Бао со СВИНИНОЙ) → taco с цветной капустой
  'zucchini-curry': `${NEW_DISHES}/zucchini-curry.jpg`, // W85: было bbq/b1.jpg (Джерк-курица) → цуккини-карри
  'veggie-ragout': `${NEW_DISHES}/veggie-ragout.jpg`, // W85: было goryachee/h2.jpg (куриные якитори) → овощное рагу
  'vegan-grazing': `${NEW_DISHES}/vegan-grazing.jpg`, // W85: было kanape/k8.jpg (рулет с курицей+сыром) → vegan grazing board
  'fruit-canape': `${NEW_DISHES}/fruit-canape.jpg`, // W85: было kanape/k1.jpg (канапе с лососем) → фруктовые канапе
  'buddha-bowl': '/images/real/vegetarian-bowl.jpg',

  // Premium блюда — W83: добавлены конкретные фото
  'beef-steak': `${NEW_DISHES}/beef-steak.jpg`,
  'beef-wellington': `${NEW_DISHES}/beef-wellington.jpg`,
  'lobster-thermidor': `${NEW_DISHES}/lobster-thermidor.jpg`,
  'tuna-tartare': `${NEW_DISHES}/tuna-tartare.jpg`,
  'foie-gras': `${NEW_DISHES}/foie-gras.jpg`,
  'oyster-bar': '/images/real/salmon-dish.jpg', // fallback на seafood
  'caviar-station': `${NEW_DISHES}/caviar-station.jpg`,
  'cheese-platter-premium': `${DISH_IMG_BASE}/cheese-platter.png`,
  'dessert-firework': `${IMG_BASE}/deserty/d2.jpg`,
  // W85 P1: Other hash-fallback fixes
  'thai-meatballs': `${NEW_DISHES}/thai-meatballs.jpg`, // W85: было goryachee/h8.jpg (борщ) → тайские мясные шарики
  'tartaletka-olivier': `${NEW_DISHES}/tartaletka-olivier.jpg`, // W85: было kanape/k2.jpg (cheese canape) → тарталетка с оливье
  'okroshka': `${NEW_DISHES}/okroshka.jpg`, // W85: было kanape/k2.jpg (cheese canape) → окрошка
  'mushroom-soup': `${NEW_DISHES}/mushroom-soup.jpg`, // W85: было goryachee/h8.jpg (борщ) → крем-суп из грибов
  'croissant-ham': `${NEW_DISHES}/croissant-ham.jpg`, // W85: было goryachee/h6.jpg (форель) → круассан с ветчиной
  'volcanic-beef': `${NEW_DISHES}/volcanic-beef.jpg`, // W85: было goryachee/h2.jpg (куриные якитори) → телятина на камне
  'salmon-grill': `${NEW_DISHES}/salmon-grill-better.jpg`, // W85: улучшено с salmon-dish.jpg
  'chicken-grill': '/images/real/grilled-chicken.jpg', // W83: было fallback, стало конкретное

  // Салаты и закуски
  'burrata-tomatoes': `${DISH_IMG_BASE}/burrata-tomatoes.png`,
  'beet-carpaccio': `${DISH_IMG_BASE}/beet-carpaccio.png`,
  'meat-platter': `${DISH_IMG_BASE}/meat-platter.png`, // W83: было charcuterie (дубликат), стало своё фото
  'cheese-platter': `${DISH_IMG_BASE}/cheese-platter.png`, // W83: было charcuterie (дубликат), стало своё фото
  'antipasto': `${IMG_BASE}/salaty/s4.jpg`,
  'caesar': `${IMG_BASE}/salaty/s5.jpg`,
  'salmon-salad': `${IMG_BASE}/salaty/s6.jpg`,
  'greek-salad': `${IMG_BASE}/salaty/s9.jpg`,
  'fruit-platter': `${NEW_DISHES}/fruit-platter.jpg`, // W83: было se2 (сезонный салат), стало фруктовая тарелка

  // Десерты
  'macaron-shooter': '/images/real/macarons.jpg',
  'choc-mousse': '/images/real/chocolate-mousse.jpg',
  'chia-pudding': `${DISH_IMG_BASE}/chia-pudding.png`,
  'brownie-shooter': `${DISH_IMG_BASE}/brownie-shooter.png`,
  'gluten-free-cake': `${DISH_IMG_BASE}/gluten-free-cake.png`, // W83: было cake-berry (близко), стало своё
  'donut-wall': `${IMG_BASE}/deserty/d2.jpg`,
  'cheesecake-shooter': `${IMG_BASE}/deserty/d3.jpg`,
  'cookie-shooter': `${IMG_BASE}/deserty/d7.jpg`,
  'mini-tart': `${IMG_BASE}/deserty/d8.jpg`,
  'chocolate-brownie': `${IMG_BASE}/deserty/d9.jpg`,
  'apple-tart': `${IMG_BASE}/sezonnye/se4.jpg`,
  'tiramisu': `${IMG_BASE}/sezonnye/se5.jpg`,
  'croissant': `${IMG_BASE}/sezonnye/se6.jpg`,
  'eclair': `${IMG_BASE}/sezonnye/se7.jpg`,
  'wedding-cake': `${NEW_DISHES}/wedding-cake.jpg`, // W83: новое фото
  'macaron-tower': '/images/real/macarons.jpg', // W83: используем существующее
  'cupcakes': `${NEW_DISHES}/cupcakes.jpg`, // W83: новое фото
  'muffin': `${NEW_DISHES}/cupcakes.jpg`, // W83: новое фото
  'mini-ekler': `${IMG_BASE}/sezonnye/se7.jpg`,
  'prophyroles': `${IMG_BASE}/sezonnye/se6.jpg`,
  // W85 P0: GLUTEN-FREE dishes — fixed from wheat photos (celiac risk)
  'gluten-free-cupcakes': `${NEW_DISHES}/gluten-free-cupcakes.jpg`, // W85: было cupcakes.jpg (обычные пшеничные) → БГ капкейки
  'gluten-free-pizza': `${NEW_DISHES}/gluten-free-pizza.jpg`, // W85: было pizza.jpg (обычная пшеничная) → БГ мини-пицца
  'soup-shooter': `${IMG_BASE}/goryachee/h8.jpg`,

  // Напитки — W83: исправлены все mismatch'и
  'seabuckthorn-tea': `${DISH_IMG_BASE}/seabuckthorn-tea.png`, // W83: было генерический tea-drink
  'cranberry-mors': '/images/real/cranberry-juice.jpg',
  'cedar-raf': `${DISH_IMG_BASE}/cedar-raf.png`, // W83: было генерический coffee-drink
  'lemonade-tarragon': `${DISH_IMG_BASE}/lemonade-tarragon.png`, // W83: было cranberry-juice (красный!), стало своё
  'lemonade-berry': `${NEW_DISHES}/lemonade-berry.jpg`, // W83: было n3 (кедровый раф/кофе!), стало своё
  'fresh-juice': `${NEW_DISHES}/fresh-juice.jpg`, // W83: было n1 (облепиховый чай!), стало orange juice
  'latte': `${NEW_DISHES}/latte.jpg`, // W83: было n4 (лимонад!), стало latte art
  'kombucha': `${NEW_DISHES}/fresh-juice.jpg`,
  'welcome-drink': `${NEW_DISHES}/welcome-bar.jpg`,
  'coffee-specialty': `${NEW_DISHES}/coffee-bar.jpg`,

  // Барные напитки — W83: НОВЫЕ конкретные фото
  'wine-red': `${NEW_DISHES}/wine-red.jpg`,
  'wine-white': `${NEW_DISHES}/wine-white.jpg`,
  'champagne': `${NEW_DISHES}/champagne.jpg`,
  'champagne-premium': `${NEW_DISHES}/champagne.jpg`,
  'whisky-bar': `${NEW_DISHES}/whisky-bar.jpg`,
  'beer-craft': `${NEW_DISHES}/beer-craft.jpg`,
  'cocktail-bar': `${NEW_DISHES}/cocktail-bar.jpg`,

  // Барные станции/сервисы — W83: НОВЫЕ
  'wine-sommelier': `${NEW_DISHES}/wine-sommelier.jpg`,
  'pasta-station': `${NEW_DISHES}/pasta-station.jpg`,
  'sushi-station': `${NEW_DISHES}/sushi-station.jpg`,

  // === Халяль — W83: ИСПРАВЛЕНЫ КРИТИЧЕСКИЕ mismatch'и ===
  // 🚨 БЫЛО: halal-beef-burger → b3.jpg ("Бао с СВИНИНОЙ") — критическое нарушение!
  'halal-chicken-shashlik': `${NEW_DISHES}/halal-chicken-shashlik.jpg`, // W83: было b1 (Джерк-курица), стало chicken shashlik
  'halal-lamb-kofta': `${NEW_DISHES}/halal-lamb-kofta.jpg`, // W83: было b2 (тайские шарики со свининой!), стало lamb kofta
  'halal-beef-burger': '/images/real/burger.jpg', // W83: 🚨 БЫЛО b3 (Бао со свининой) → СТАЛО burger.jpg (говядина)
  'halal-plov': `${NEW_DISHES}/halal-plov.jpg`, // W83: было h6 (форель!), стало plov
  'halal-samsa': `${NEW_DISHES}/halal-samsa.jpg`, // W83: было h4 (бефстроганов!), стало samsa
  'halal-kebab-plate': `${NEW_DISHES}/halal-kebab-plate.jpg`, // W83: было b5 (вегги-бургер!), стало kebab assortment
  'halal-hummus': `${IMG_BASE}/salaty/s7.jpg`,
  'halal-fattoush': `${IMG_BASE}/salaty/s8.jpg`,
  'halal-chicken-rice': `${NEW_DISHES}/halal-chicken-rice.jpg`, // W83: новое
  'halal-meatballs': `${NEW_DISHES}/halal-meatballs.jpg`, // W83: новое
  'halal-lentil-soup': `${NEW_DISHES}/halal-lentil-soup.jpg`, // W83: новое
  'halal-grilled-veg': `${NEW_DISHES}/halal-grilled-veg.jpg`, // W83: новое
  'halal-tabouleh': `${NEW_DISHES}/halal-tabouleh.jpg`, // W83: новое
  'halal-baklava': `${NEW_DISHES}/halal-baklava.jpg`, // W83: новое

  // === Завтрак / brunch — W83: ИСПРАВЛЕНЫ mismatch'и ===
  'omelette': `${NEW_DISHES}/omelette.jpg`, // W83: было h8 (борщ!), стало omelette
  'syrniki': `${NEW_DISHES}/syrniki.jpg`, // W83: было d3 (чизкейк-шутер!), стало syrniki
  'greek-yogurt': `${NEW_DISHES}/greek-yogurt.jpg`, // W83: было d5 (чиа-пудинг!), стало greek yogurt
  'eggs-benedict': `${NEW_DISHES}/eggs-benedict.jpg`, // W83: было h5 (медальоны!), стало eggs benedict
  'mini-sandwich': `${NEW_DISHES}/mini-sandwich.jpg`, // W83: было k6 (тарталетка грибная!), стало mini sandwich

  // === Детское меню — W83: новые фото ===
  'kids-burger': `${NEW_DISHES}/kids-burger.jpg`,
  'nuggets': `${NEW_DISHES}/nuggets.jpg`,
  'mini-pizza': `${NEW_DISHES}/mini-pizza.jpg`,
  'pasta-cheese': `${NEW_DISHES}/pasta-station.jpg`,
  'pancakes': `${NEW_DISHES}/syrniki.jpg`,
  'milkshake': `${NEW_DISHES}/fresh-juice.jpg`, // fallback на напиток
  'kids-fruit': `${NEW_DISHES}/fruit-platter.jpg`,

  // === Сезонные (se1-se3) ===
  'seasonal-spring': `${IMG_BASE}/sezonnye/se1.jpg`,
  'seasonal-summer': `${IMG_BASE}/sezonnye/se2.jpg`,
  'seasonal-autumn': `${IMG_BASE}/sezonnye/se3.jpg`,
};

// Фотографии для галереи — расширенный набор
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

  // === BBQ (5 фото) ===
  { src: '/images/menu/bbq/b1.jpg', alt: 'Джерк-курица на плантане', caption: 'Джерк-курица · гриль · фуршет' },
  { src: '/images/menu/bbq/b2.jpg', alt: 'Тайские мясные шарики', caption: 'Мясные шарики с чили · фуршет' },
  { src: '/images/menu/bbq/b3.jpg', alt: 'Бао с томлёной свининой', caption: 'Бао · паровые булочки · фуршет' },
  { src: '/images/menu/bbq/b4.jpg', alt: 'Бао с уткой', caption: 'Бао с уткой · премиум-фуршет' },
  { src: '/images/menu/bbq/b5.jpg', alt: 'Бургер из грибов и бобов', caption: 'Вегетарианский бургер · веган' },

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

  // === Сезонные (7 фото) ===
  { src: '/images/menu/sezonnye/se1.jpg', alt: 'Сезонное блюдо 1', caption: 'Сезонная закуска · весна 2025' },
  { src: '/images/menu/sezonnye/se2.jpg', alt: 'Сезонное блюдо 2', caption: 'Сезонный салат · лето 2025' },
  { src: '/images/menu/sezonnye/se3.jpg', alt: 'Сезонное блюдо 3', caption: 'Сезонное горячее · осень 2024' },
  { src: '/images/menu/sezonnye/se4.jpg', alt: 'Сезонное блюдо 4', caption: 'Сезонный десерт · зима 2024' },
  { src: '/images/menu/sezonnye/se5.jpg', alt: 'Сезонное блюдо 5', caption: 'Праздничное блюдо · Новый год 2025' },
  { src: '/images/menu/sezonnye/se6.jpg', alt: 'Сезонное блюдо 6', caption: 'Сезонная выпечка · осень 2025' },
  { src: '/images/menu/sezonnye/se7.jpg', alt: 'Сезонное блюдо 7', caption: 'Десерт фестивальный · 2025' },
];

export const HERO_IMAGE = '/images/gallery/wedding-banquet.jpg';

// Функция: получить фото для блюда по dishId или station
export function getDishImage(dishId: string, station?: string): string {
  if (DISH_IMAGE_MAP[dishId]) return DISH_IMAGE_MAP[dishId];
  const images = STATION_IMAGES[station || 'cold'] || STATION_IMAGES.cold;
  let hash = 0x811c9dc5;
  for (let i = 0; i < dishId.length; i++) {
    hash ^= dishId.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  const idx = Math.abs(hash) % images.length;
  return images[idx];
}

export function getDishImageByIndex(dishId: string, station: string | undefined, index: number): string {
  if (DISH_IMAGE_MAP[dishId]) return DISH_IMAGE_MAP[dishId];
  const images = STATION_IMAGES[station || 'cold'] || STATION_IMAGES.cold;
  return images[index % images.length];
}

export function getObjectPositionForStation(station?: string): string {
  return STATION_OBJECT_POSITION[station || 'cold'] || 'center 40%';
}

export function getObjectPositionForDish(dishId: string, station?: string): string {
  return getObjectPositionForStation(station);
}

export const FORMAT_HERO_IMAGES: Record<string, string> = {
  furshet: '/images/gallery/furshet-menu.jpg',
  banket: '/images/gallery/wedding-banquet.jpg',
  'coffee-break': '/images/gallery/dessert-table.jpg',
  detskoe: '/images/gallery/kids.jpg',
  'chef-at-home': '/images/gallery/servirovka.jpg',
  'mobile-furshet': '/images/gallery/corporate-furshet.jpg',
};

// Real photos from Unsplash
export const REAL_GALLERY_IMAGES = [
  { src: '/images/real/wedding-banquet.jpg', alt: 'Свадебный банкет', caption: 'Свадебный банкет · 100 гостей · Загородный отель' },
  { src: '/images/real/corporate-buffet.jpg', alt: 'Корпоративный буфет', caption: 'Корпоратив · 150 гостей · Бизнес-центр' },
  { src: '/images/real/canape-platter.jpg', alt: 'Канапе плато', caption: 'Канапе-плато · 8 видов · фуршет' },
  { src: '/images/real/dessert-table.jpg', alt: 'Десертный стол', caption: 'Десертная станция · свадьба' },
  { src: '/images/real/beef-medallions.jpg', alt: 'Медальоны из говядины', caption: 'Медальоны из вырезки · банкет' },
  { src: '/images/real/poke-bowl.jpg', alt: 'Поке-боул', caption: 'Поке с лососем · фуршет' },
  { src: '/images/real/macarons.jpg', alt: 'Макаронс', caption: 'Французские макаронс · кофе-брейк' },
  { src: '/images/real/charcuterie.jpg', alt: 'Шаркетери-борд', caption: 'Мясное и сырное плато · банкет' },
  { src: '/images/real/chocolate-mousse.jpg', alt: 'Шоколадный мусс', caption: 'Десерт · веган · без сахара' },
  { src: '/images/real/vegetarian-bowl.jpg', alt: 'Вегетарианский боул', caption: 'Будда-боул · веган · фуршет' },
  { src: '/images/real/cranberry-juice.jpg', alt: 'Клюквенный морс', caption: 'Авторские напитки · кофе-брейк' },
  { src: '/images/real/coffee-drink.jpg', alt: 'Кофе', caption: 'Кофейная станция · конференция' },
];
