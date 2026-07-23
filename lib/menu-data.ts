// Единый каталог блюд NiloV — 78 уникальных SKU
// Источник: 23_MENU_STRATEGY.md, 04_BLOCKS.md
// Все цены 🟡 pending-verification
import type { Dish } from './types';

// ═══════════════════════════════════════════
// §1 — ТРЕНД-ЯКОРЯ 2026
// ═══════════════════════════════════════════

// 1. Global small plates (7 SKU)
const GLOBAL_SMALL_PLATES: Dish[] = [
  { id: 'bao-pork', name: 'Бао с томлёной свининой', description: 'Паровые булочки с томлёной свининой, хойсином и свежим огурцом', image: '', station: 'hot', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 350, servingsPerGuest: 1, allergens: ['gluten', 'soy', 'sesame'], dietBadges: [], childFriendly: false },
  { id: 'bao-duck', name: 'Бао с уткой и хойсином', description: 'Утка конфи, хойсин, зелёный лук в паровой булочке', image: '', station: 'hot', format: ['furshet', 'banket'], tier: ['premium', 'luxury'], pricePerGuest: 380, servingsPerGuest: 1, allergens: ['gluten', 'soy', 'sesame'], dietBadges: [], childFriendly: false },
  { id: 'taco-fish', name: 'Мини-тако с рыбой', description: 'Кукурузная тортилья, белая рыба, сальса, лайм', image: '', station: 'hot', format: ['furshet'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 320, servingsPerGuest: 1, allergens: ['fish'], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'taco-cauliflower', name: 'Мини-тако с цветной капустой', description: 'Кукурузная тортилья, цветная капуста с чимичурри, веган', image: '', station: 'hot', format: ['furshet'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 280, servingsPerGuest: 1, allergens: [], dietBadges: ['vegan', 'gluten-free'], childFriendly: true },
  { id: 'poke-salmon', name: 'Поке с лососем и авокадо', description: 'Рис, лосось, авокадо, эдамамэ, соус понзу (содержит пшеницу через соевый соус)', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['premium', 'luxury'], pricePerGuest: 420, servingsPerGuest: 1, allergens: ['fish', 'soy', 'sesame', 'gluten'], dietBadges: [], childFriendly: false },
  { id: 'thai-meatballs', name: 'Тайские мясные шарики с чили', description: 'Свинина/говядина, лемонграсс, чили, рыбный соус', image: '', station: 'hot', format: ['furshet'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 300, servingsPerGuest: 1, allergens: ['fish', 'soy'], dietBadges: [], childFriendly: false },
  { id: 'jerk-chicken', name: 'Jerk-курица на плантане', description: 'Куриное бедро в jerk-маринаде на жареном плантане', image: '', station: 'hot', format: ['furshet', 'banket'], tier: ['premium', 'luxury'], pricePerGuest: 360, servingsPerGuest: 1, allergens: [], dietBadges: ['gluten-free'], childFriendly: false },
];

// 2. Plant-based mains (6 SKU)
const PLANT_BASED: Dish[] = [
  { id: 'cauli-steak', name: 'Стейк из цветной капусты с тапенадой', description: 'Цельный стейк из цветной капусты, тапенада из оливок', image: '', station: 'hot', format: ['furshet', 'banket', 'detskoe'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 340, servingsPerGuest: 1, allergens: [], dietBadges: ['vegan', 'gluten-free'], childFriendly: true },
  { id: 'zucchini-curry', name: 'Цуккини-пюре с кокосовым карри', description: 'Кремовое пюре из цуккини с кокосовым карри и киноа', image: '', station: 'hot', format: ['banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 320, servingsPerGuest: 1, allergens: [], dietBadges: ['vegan', 'gluten-free'], childFriendly: true },
  { id: 'beet-carpaccio', name: 'Карпаччо из свёклы с дымком', description: 'Тонкие слайсы свёклы, козий сыр, руккола, бальзамик', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 280, servingsPerGuest: 1, allergens: ['milk'], dietBadges: ['gluten-free'], childFriendly: true },
  { id: 'mushroom-burger', name: 'Бургер из грибов и бобов', description: 'Котлета из шампиньонов и чёрных бобов, булочка бриошь, соус', image: '', station: 'hot', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 290, servingsPerGuest: 1, allergens: ['gluten', 'soy', 'sesame'], dietBadges: [], childFriendly: true },
  { id: 'veggie-ragout', name: 'Овощное рагу', description: 'Сезонные овощи, томатный соус, базилик', image: '', station: 'hot', format: ['banket', 'detskoe'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 250, servingsPerGuest: 1, allergens: [], dietBadges: ['vegan', 'gluten-free'], childFriendly: true },
  { id: 'buddha-bowl', name: 'Будда-боул с тофу', description: 'Киноа, тофу, авокадо, эдамамэ, мисо-дрессинг', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 380, servingsPerGuest: 1, allergens: ['soy', 'sesame'], dietBadges: ['vegan', 'gluten-free'], childFriendly: true },
];

// 4. Grazing table (5 SKU)
const GRAZING: Dish[] = [
  { id: 'meat-platter', name: 'Мясное плато', description: 'Буженина, ростбиф, индейка, горчица, корнишоны', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 450, servingsPerGuest: 1, allergens: ['mustard'], dietBadges: ['gluten-free'], childFriendly: true },
  { id: 'cheese-platter', name: 'Сырная тарелка', description: 'Камамбер, маасдам, пармезан, мёд, виноград, груши (БЕЗ орехов — nut-free версия)', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 420, servingsPerGuest: 1, allergens: ['milk'], dietBadges: ['gluten-free'], childFriendly: true },
  { id: 'burrata-tomatoes', name: 'Буррата + томаты', description: 'Свежая буррата, томаты черри, базилик', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 380, servingsPerGuest: 1, allergens: ['milk'], dietBadges: ['gluten-free'], childFriendly: true },
  { id: 'antipasto', name: 'Антипасто-плато', description: 'Прошутто, салями, артишоки, оливки', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['premium', 'luxury'], pricePerGuest: 480, servingsPerGuest: 1, allergens: [], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'vegan-grazing', name: 'Веган-граzing', description: 'Овощи гриль, хумус, оливки, пита', image: '', station: 'cold', format: ['furshet'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 320, servingsPerGuest: 1, allergens: ['gluten', 'sesame'], dietBadges: ['vegan'], childFriendly: true },
];

// 5. Dessert stations (8 SKU)
const DESSERTS: Dish[] = [
  { id: 'macaron-shooter', name: 'Макаронс-шутер', description: '3 мини-макаронс в дегустационном стакане', image: '', station: 'desserts', format: ['furshet', 'banket', 'coffee-break', 'detskoe'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 220, servingsPerGuest: 1, allergens: ['nuts', 'eggs', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'donut-wall', name: 'Донат-стена', description: 'Мини-донаты с глазурью (следы орехов возможны — НЕ для анафилаксии на орехи)', image: '', station: 'desserts', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 180, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk', 'nuts'], dietBadges: [], childFriendly: true },
  { id: 'cheesecake-shooter', name: 'Чизкейк-шутер', description: 'Классический чизкейк в стакане с ягодным кули', image: '', station: 'desserts', format: ['banket', 'coffee-break'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 200, servingsPerGuest: 1, allergens: ['milk', 'eggs', 'gluten'], dietBadges: [], childFriendly: true },
  { id: 'choc-mousse', name: 'Шоколадный мусс (веган)', description: 'Из авокадо и тёмного шоколада', image: '', station: 'desserts', format: ['furshet', 'banket', 'detskoe'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 190, servingsPerGuest: 1, allergens: [], dietBadges: ['vegan', 'gluten-free'], childFriendly: true },
  { id: 'chia-pudding', name: 'Веррин чиа-пудинг', description: 'Кокосовое молоко, чиа, манго, маракуйя', image: '', station: 'desserts', format: ['furshet', 'banket', 'detskoe'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 170, servingsPerGuest: 1, allergens: [], dietBadges: ['vegan', 'gluten-free'], childFriendly: true },
  { id: 'brownie-shooter', name: 'Брауни-шутер', description: 'Шоколадный брауни в стакане с карамелью (с грецким орехом — НЕ для анафилаксии на орехи)', image: '', station: 'desserts', format: ['furshet', 'banket', 'coffee-break'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 190, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk', 'nuts'], dietBadges: [], childFriendly: true },
  { id: 'cookie-shooter', name: 'Молочно-печенье-шутер', description: 'Крошка печенья, ванильный крем, карамель', image: '', station: 'desserts', format: ['furshet', 'banket', 'detskoe'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 180, servingsPerGuest: 1, allergens: ['gluten', 'milk', 'eggs'], dietBadges: [], childFriendly: true },
  { id: 'mini-tart', name: 'Мини-тарт-ассорти', description: 'Лимонный, ягодный, шоколадный', image: '', station: 'desserts', format: ['furshet', 'banket', 'coffee-break', 'detskoe'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 200, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: true },
];

// 6. Signature drinks (7 SKU)
const DRINKS: Dish[] = [
  { id: 'seabuckthorn-tea', name: 'Облепиховый чай с имбирём', description: 'Согревающий чай с облепихой и имбирём', image: '', station: 'drinks', format: ['furshet', 'banket', 'coffee-break'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 120, servingsPerGuest: 2, allergens: [], dietBadges: ['vegan', 'gluten-free'], childFriendly: true },
  { id: 'cranberry-mors', name: 'Клюквенный морс с мятой', description: 'Домашний морс из клюквы с мятой и лаймом', image: '', station: 'drinks', format: ['furshet', 'banket', 'coffee-break'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 100, servingsPerGuest: 2, allergens: [], dietBadges: ['vegan', 'gluten-free'], childFriendly: true },
  { id: 'cedar-raf', name: 'Кедровый раф', description: 'Кофейный напиток с кедровым молоком (содержит кедровый орех)', image: '', station: 'drinks', format: ['furshet', 'banket', 'coffee-break'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 150, servingsPerGuest: 1, allergens: ['milk', 'nuts'], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'lemonade-tarragon', name: 'Лимонад эстрагон', description: 'Авторский лимонад с эстрагоном и лаймом', image: '', station: 'drinks', format: ['furshet', 'banket', 'coffee-break', 'detskoe'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 100, servingsPerGuest: 2, allergens: [], dietBadges: ['vegan', 'gluten-free'], childFriendly: true },
  { id: 'lemonade-berry', name: 'Лимонад ягодный', description: 'Микс ягод, лимон, мята, содовая', image: '', station: 'drinks', format: ['furshet', 'banket', 'coffee-break', 'detskoe'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 110, servingsPerGuest: 2, allergens: [], dietBadges: ['vegan', 'gluten-free'], childFriendly: true },
  { id: 'kombucha', name: 'Комбуча', description: 'Ферментированный чайный напиток', image: '', station: 'drinks', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 140, servingsPerGuest: 1, allergens: [], dietBadges: ['vegan', 'gluten-free'], childFriendly: false },
  { id: 'welcome-drink', name: 'Welcome-drink', description: 'Игристое + канапе с лососем', image: '', station: 'drinks', format: ['furshet', 'banket'], tier: ['premium', 'luxury'], pricePerGuest: 350, servingsPerGuest: 1, allergens: ['fish', 'gluten'], dietBadges: [], childFriendly: false },
];

// ═══════════════════════════════════════════
// §2 — ФОРМАТНЫЕ ЛИНИИ
// ═══════════════════════════════════════════

// ФУРШЕТ (11 дополнительных)
const FURSHET_EXTRA: Dish[] = [
  { id: 'canape-salmon', name: 'Канапе с лососем', description: 'Сливочный сыр, лосось, укроп', image: '', station: 'cold', format: ['furshet'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 190, servingsPerGuest: 2, allergens: ['fish', 'milk', 'gluten'], dietBadges: [], childFriendly: true },
  { id: 'canape-caviar', name: 'Канапе с красной икрой', description: 'Икра лососёвая, сливочное масло, тарталетка', image: '', station: 'cold', format: ['furshet'], tier: ['premium', 'luxury'], pricePerGuest: 250, servingsPerGuest: 1, allergens: ['fish', 'gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: false },
  { id: 'tartaletka-olivier', name: 'Тарталетка с оливье', description: 'Мини-оливье в песочной тарталетке', image: '', station: 'cold', format: ['furshet'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 160, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'bruschetta-tomato', name: 'Брускетта с томатами', description: 'Чиабатта, томаты, базилик, чеснок', image: '', station: 'cold', format: ['furshet'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 140, servingsPerGuest: 1, allergens: ['gluten'], dietBadges: [], childFriendly: true },
  { id: 'canape-caprese', name: 'Канапе «Капрезе»', description: 'Моцарелла, томаты черри, песто', image: '', station: 'cold', format: ['furshet'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 180, servingsPerGuest: 1, allergens: ['milk', 'nuts'], dietBadges: ['gluten-free'], childFriendly: true },
  { id: 'lavash-roll', name: 'Рулетик из лаваша', description: 'Лаваш, курица, сыр, зелень', image: '', station: 'cold', format: ['furshet', 'mobile-furshet'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 150, servingsPerGuest: 1, allergens: ['gluten', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'mini-burger', name: 'Мини-бургер', description: 'Котлета свинина/курица, булочка, сыр', image: '', station: 'hot', format: ['furshet', 'detskoe'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 250, servingsPerGuest: 1, allergens: ['gluten', 'milk', 'eggs'], dietBadges: [], childFriendly: true },
  { id: 'yakitori', name: 'Куриные якитори', description: 'Шпажки в соусе терияки с кунжутом (содержит пшеницу через соевый соус)', image: '', station: 'hot', format: ['furshet', 'detskoe'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 220, servingsPerGuest: 1, allergens: ['soy', 'sesame', 'gluten'], dietBadges: [], childFriendly: true },
  { id: 'veggie-grill', name: 'Овощи гриль', description: 'Баклажан, перец, цуккини, шампиньоны', image: '', station: 'hot', format: ['furshet', 'banket'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 200, servingsPerGuest: 1, allergens: [], dietBadges: ['vegan', 'gluten-free'], childFriendly: true },
  { id: 'prophyroles', name: 'Профитроли с грибами', description: 'Заварное тесто, грибной мусс', image: '', station: 'hot', format: ['furshet'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 230, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: false },
  { id: 'chocolate-brownie', name: 'Шоколадный брауни', description: 'Классический брауни с грецким орехом (НЕ для анафилаксии на орехи)', image: '', station: 'desserts', format: ['furshet', 'coffee-break'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 160, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk', 'nuts'], dietBadges: [], childFriendly: true },
];

// БАНКЕТ (11 дополнительных)
const BANKET_EXTRA: Dish[] = [
  { id: 'borscht', name: 'Борщ', description: 'Классический со сметаной и пампушками', image: '', station: 'hot', format: ['banket'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 280, servingsPerGuest: 1, allergens: ['gluten', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'okroshka', name: 'Окрошка (сезон)', description: 'На квасе или кефире, свежие овощи', image: '', station: 'cold', format: ['banket'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 250, servingsPerGuest: 1, allergens: ['eggs', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'mushroom-soup', name: 'Крем-суп из белых грибов', description: 'Сливки, белые грибы, трюфельное масло', image: '', station: 'hot', format: ['banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 350, servingsPerGuest: 1, allergens: ['milk'], dietBadges: ['gluten-free'], childFriendly: true },
  { id: 'caesar', name: 'Салат Цезарь', description: 'Романо, курица, пармезан, гренки', image: '', station: 'cold', format: ['banket'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 320, servingsPerGuest: 1, allergens: ['gluten', 'milk', 'eggs', 'fish'], dietBadges: [], childFriendly: true },
  { id: 'salmon-salad', name: 'Салат с лососем и авокадо', description: 'Микс салатов, лосось, авокадо', image: '', station: 'cold', format: ['banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 380, servingsPerGuest: 1, allergens: ['fish'], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'beef-stroganoff', name: 'Бефстроганов', description: 'Говяжья вырезка, сливочный соус, пюре', image: '', station: 'hot', format: ['banket'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 480, servingsPerGuest: 1, allergens: ['milk'], dietBadges: ['gluten-free'], childFriendly: true },
  { id: 'beef-medallions', name: 'Медальоны из вырезки', description: 'Говядина, перечный соус, розмарин', image: '', station: 'hot', format: ['banket'], tier: ['premium', 'luxury'], pricePerGuest: 580, servingsPerGuest: 1, allergens: ['milk'], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'trout', name: 'Форель с картофельным муссом', description: 'Филе форели, картофельный мусс, шпинат', image: '', station: 'hot', format: ['banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 520, servingsPerGuest: 1, allergens: ['fish', 'milk'], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'chicken-quinoa', name: 'Курица с киноа', description: 'Куриное филе, киноа, овощи, лимон', image: '', station: 'hot', format: ['banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 380, servingsPerGuest: 1, allergens: [], dietBadges: ['gluten-free'], childFriendly: true },
  { id: 'tiramisu', name: 'Тирамису', description: 'Классическое в порционной подаче', image: '', station: 'desserts', format: ['banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 250, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: false },
  { id: 'apple-tart', name: 'Яблочный тарт', description: 'Тонкое тесто, яблоки, корица', image: '', station: 'desserts', format: ['banket'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 220, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: true },
];

// КОФЕ-БРЕЙК (5 дополнительных)
const COFFEE_BREAK_EXTRA: Dish[] = [
  { id: 'croissant', name: 'Круассан', description: 'Классический масляный', image: '', station: 'desserts', format: ['coffee-break'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 130, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'eclair', name: 'Эклер', description: 'Заварное тесто, ванильный крем, глазурь', image: '', station: 'desserts', format: ['coffee-break'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 150, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'muffin', name: 'Маффин', description: 'Черничный или шоколадный', image: '', station: 'desserts', format: ['coffee-break', 'detskoe'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 140, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'mini-sandwich', name: 'Мини-сэндвич', description: 'Ветчина, сыр, огурец на бриоши', image: '', station: 'cold', format: ['coffee-break'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 160, servingsPerGuest: 1, allergens: ['gluten', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'fruit-platter', name: 'Фруктовая тарелка', description: 'Сезонные фрукты', image: '', station: 'cold', format: ['coffee-break', 'furshet', 'detskoe'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 200, servingsPerGuest: 1, allergens: [], dietBadges: ['vegan', 'gluten-free'], childFriendly: true },
];

// СВАДЬБА (2)
const WEDDING_EXTRA: Dish[] = [
  { id: 'wedding-cake', name: 'Свадебный торт', description: 'Индивидуальный от кондитера, 3 яруса', image: '', station: 'desserts', format: ['banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 15000, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk', 'nuts'], dietBadges: [], childFriendly: true },
  { id: 'soup-shooter', name: 'Суп-шутер', description: 'Борщ/окрошка в дегустационном стакане', image: '', station: 'hot', format: ['furshet', 'banket'], tier: ['premium', 'luxury'], pricePerGuest: 180, servingsPerGuest: 1, allergens: ['milk'], dietBadges: [], childFriendly: false },
];

// ═══════════════════════════════════════════
// §7 — ДЕТСКОЕ МЕНЮ (9 блюд)
// ═══════════════════════════════════════════
const KIDS: Dish[] = [
  { id: 'kids-burger', name: 'Мини-бургер (детский)', description: 'Куриная котлета, булочка, сыр', image: '', station: 'hot', format: ['detskoe'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 220, servingsPerGuest: 1, allergens: ['gluten', 'milk', 'eggs'], dietBadges: [], childFriendly: true },
  { id: 'nuggets', name: 'Наггетсы', description: 'Куриные наггетсы, кетчуп', image: '', station: 'hot', format: ['detskoe'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 180, servingsPerGuest: 1, allergens: ['gluten', 'eggs'], dietBadges: [], childFriendly: true },
  { id: 'mini-pizza', name: 'Мини-пицца', description: 'Томатный соус, сыр, ветчина', image: '', station: 'hot', format: ['detskoe'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 170, servingsPerGuest: 1, allergens: ['gluten', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'pasta-cheese', name: 'Паста с сыром', description: 'Макароны, сливочный сырный соус', image: '', station: 'hot', format: ['detskoe'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 160, servingsPerGuest: 1, allergens: ['gluten', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'fruit-canape', name: 'Фруктовые канапе', description: 'Клубника, банан, виноград', image: '', station: 'cold', format: ['detskoe', 'furshet'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 140, servingsPerGuest: 1, allergens: [], dietBadges: ['vegan', 'gluten-free'], childFriendly: true },
  { id: 'pancakes', name: 'Панкейки', description: 'Мини-панкейки с ягодным соусом', image: '', station: 'desserts', format: ['detskoe'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 150, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'cupcakes', name: 'Капкейки', description: 'С кремом и посыпкой', image: '', station: 'desserts', format: ['detskoe', 'coffee-break'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 170, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'milkshake', name: 'Молочный коктейль', description: 'Клубничный или шоколадный', image: '', station: 'drinks', format: ['detskoe'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 130, servingsPerGuest: 1, allergens: ['milk'], dietBadges: [], childFriendly: true },
  { id: 'kids-fruit', name: 'Фруктовое ассорти', description: 'Нарезка свежих фруктов', image: '', station: 'cold', format: ['detskoe'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 160, servingsPerGuest: 1, allergens: [], dietBadges: ['vegan', 'gluten-free'], childFriendly: true },
];

// §8 — БРАНЧИ (7 блюд)
const BRUNCH: Dish[] = [
  { id: 'croissant-ham', name: 'Круассан с ветчиной', description: 'Тёплый, с ветчиной и сыром', image: '', station: 'hot', format: ['coffee-break', 'furshet'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 180, servingsPerGuest: 1, allergens: ['gluten', 'milk', 'eggs'], dietBadges: [], childFriendly: true },
  { id: 'omelette', name: 'Омлет', description: 'Нежный, с зеленью и сыром', image: '', station: 'hot', format: ['coffee-break', 'furshet'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 200, servingsPerGuest: 1, allergens: ['eggs', 'milk'], dietBadges: ['gluten-free'], childFriendly: true },
  { id: 'syrniki', name: 'Сырники', description: 'Творожные со сметаной и вареньем', image: '', station: 'hot', format: ['coffee-break', 'furshet'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 180, servingsPerGuest: 1, allergens: ['gluten', 'milk', 'eggs'], dietBadges: [], childFriendly: true },
  { id: 'greek-yogurt', name: 'Греческий йогурт', description: 'С мёдом, гранолой и ягодами', image: '', station: 'cold', format: ['coffee-break', 'furshet'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 160, servingsPerGuest: 1, allergens: ['milk', 'gluten', 'nuts'], dietBadges: [], childFriendly: true },
  { id: 'fresh-juice', name: 'Свежевыжатый сок', description: 'Апельсиновый, грейпфрутовый', image: '', station: 'drinks', format: ['coffee-break', 'furshet'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 150, servingsPerGuest: 1, allergens: [], dietBadges: ['vegan', 'gluten-free'], childFriendly: true },
  { id: 'latte', name: 'Латте', description: 'Классический с молочной пенкой', image: '', station: 'drinks', format: ['coffee-break'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 120, servingsPerGuest: 1, allergens: ['milk'], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'eggs-benedict', name: 'Яичница-бенедикт', description: 'Яйцо пашот, бекон, голландский соус', image: '', station: 'hot', format: ['coffee-break', 'furshet'], tier: ['premium', 'luxury'], pricePerGuest: 350, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: false },
];

// ═══════════════════════════════════════════
// §6 — SHOW-COOKING (6 станций)
// ═══════════════════════════════════════════
export interface ShowCookingStation {
  id: string;
  name: string;
  description: string;
  pricePerPortion: number;
  stationCost: number;
  minPortions: number;
}

export const SHOW_COOKING_STATIONS: ShowCookingStation[] = [
  { id: 'volcanic-beef', name: 'Телятина на вулканическом камне', description: 'Шеф готовит на раскалённом вулканическом камне при гостях', pricePerPortion: 605, stationCost: 62500, minPortions: 100 },
  { id: 'whole-salmon', name: 'Запечённый мурманский лосось', description: 'Целый лосось запекается при вас с травами', pricePerPortion: 605, stationCost: 72500, minPortions: 100 },
  { id: 'mexican-taco', name: 'Тако «Знойная Мексика»', description: 'Тако с начинками на выбор', pricePerPortion: 339, stationCost: 48500, minPortions: 75 },
  { id: 'parmesan-risotto', name: 'Ризотто в колесе пармезана', description: 'Ризотто доводится в головке пармезана', pricePerPortion: 605, stationCost: 64500, minPortions: 75 },
  { id: 'stroganina', name: 'Строганина из северных рыб', description: 'Тончайшие ломтики замороженной рыбы', pricePerPortion: 484, stationCost: 56500, minPortions: 100 },
  { id: 'raclette-bar', name: 'Раклет-бар', description: 'Швейцарский раклет плавится при гостях', pricePerPortion: 0, stationCost: 40000, minPortions: 0 },
];

// §9 — ХАЛЯЛЬ-МЕНЮ (8 блюд, готовится на отдельной линии по запросу, от 3 рабочих дней)
const HALAL: Dish[] = [
  { id: 'halal-chicken-shashlik', name: 'Шашлык из курицы (халяль)', description: 'Куриное бедро в маринаде из йогурта и специй, мангал. Без свинины, без алкоголя.', image: '', station: 'hot', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 380, servingsPerGuest: 1, allergens: ['milk'], dietBadges: ['halal'], childFriendly: true },
  { id: 'halal-lamb-kofta', name: 'Кюфта из баранины (халяль)', description: 'Баранина рубленая с кинзой и зирой, гриль. Без свинины, без алкоголя.', image: '', station: 'hot', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 420, servingsPerGuest: 1, allergens: [], dietBadges: ['halal', 'gluten-free'], childFriendly: false },
  { id: 'halal-beef-burger', name: 'Бургер с говядиной (халяль)', description: 'Говяжья котлета (халяль-забой), бриошь, чеддер, карамелизированный лук. Без свинины.', image: '', station: 'hot', format: ['furshet', 'detskoe'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 290, servingsPerGuest: 1, allergens: ['gluten', 'milk', 'eggs'], dietBadges: ['halal'], childFriendly: true },
  { id: 'halal-plov', name: 'Плов с говядиной (халяль)', description: 'Узбекский плов с говядиной халяль, морковь, нут, зира. Без свинины.', image: '', station: 'hot', format: ['banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 450, servingsPerGuest: 1, allergens: [], dietBadges: ['halal', 'gluten-free'], childFriendly: true },
  { id: 'halal-samsa', name: 'Самса с курицей (халяль)', description: 'Слоёное тесто, куриная начинка, лук, специи. Без свинины, без алкоголя.', image: '', station: 'hot', format: ['furshet'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 220, servingsPerGuest: 1, allergens: ['gluten', 'milk'], dietBadges: ['halal'], childFriendly: true },
  { id: 'halal-kebab-plate', name: 'Кебаб-плато (халяль)', description: 'Ассорти из курицы, баранины и говядины халяль на гриле. Без свинины.', image: '', station: 'hot', format: ['furshet', 'banket'], tier: ['premium', 'luxury'], pricePerGuest: 520, servingsPerGuest: 1, allergens: [], dietBadges: ['halal', 'gluten-free'], childFriendly: false },
  { id: 'halal-hummus', name: 'Хумус с питой (веганский, халяль)', description: 'Нут, тахини, лимон, чеснок. Подаётся с тёплой питой. Без животных жиров.', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 180, servingsPerGuest: 1, allergens: ['gluten', 'sesame'], dietBadges: ['halal', 'vegan'], childFriendly: true },
  { id: 'halal-fattoush', name: 'Салат фаттуш (веганский, халяль)', description: 'Овощи, зелень, обжаренная пита, сумах. Без животных жиров.', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 200, servingsPerGuest: 1, allergens: ['gluten'], dietBadges: ['halal', 'vegan'], childFriendly: true },
  { id: 'halal-chicken-rice', name: 'Курица с рисом (халяль)', description: 'Курица халяль на гриле, рис басмати, томлёные овощи. Без свинины.', image: '', station: 'hot', format: ['furshet', 'banket', 'detskoe'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 320, servingsPerGuest: 1, allergens: [], dietBadges: ['halal', 'gluten-free'], childFriendly: true },
  { id: 'halal-meatballs', name: 'Фрикадельки из говядины (халяль)', description: 'Говядина халяль, томатный соус, специи. Без свинины.', image: '', station: 'hot', format: ['furshet', 'banket', 'detskoe'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 280, servingsPerGuest: 1, allergens: [], dietBadges: ['halal', 'gluten-free'], childFriendly: true },
  { id: 'halal-tabouleh', name: 'Табуле (веганский, халяль)', description: 'Булгур, петрушка, мята, томаты, лимон. Без животных жиров.', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 190, servingsPerGuest: 1, allergens: ['gluten'], dietBadges: ['halal', 'vegan'], childFriendly: true },
  { id: 'halal-baklava', name: 'Пахлава (халяль)', description: 'Слоёное тесто, фисташки, мёд. Без свинины, без алкоголя.', image: '', station: 'desserts', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 210, servingsPerGuest: 1, allergens: ['gluten', 'nuts', 'milk'], dietBadges: ['halal'], childFriendly: true },
  { id: 'halal-lentil-soup', name: 'Чечевичный суп (веганский, халяль)', description: 'Красная чечевица, томаты, зира, лимон. Без животных жиров.', image: '', station: 'hot', format: ['furshet', 'banket'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 180, servingsPerGuest: 1, allergens: [], dietBadges: ['halal', 'vegan', 'gluten-free'], childFriendly: true },
  { id: 'halal-grilled-veg', name: 'Овощи гриль (веганский, халяль)', description: 'Баклажан, цуккини, перец, шампиньоны на гриле. Без животных жиров.', image: '', station: 'hot', format: ['furshet', 'banket'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 200, servingsPerGuest: 1, allergens: [], dietBadges: ['halal', 'vegan', 'gluten-free'], childFriendly: true },
];

// §10 — ПРЕМИУМ-БЛЮДА для свадебных/корпоративных тарифов (28 SKU)
// Эти dishId используются в lib/tariff-offers.ts SVADBA/KORPORATIV/CHASTNOE/CHEF_AT_HOME
// Ранее отсутствовали в ALL_DISHES → аллергены и цены не показывались
const PREMIUM_EXTRA: Dish[] = [
  { id: 'canape-red-fish', name: 'Канапе с красной рыбой', description: 'Лосось слабой соли, сливочный сыр, укроп на бородинском хлебе', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 190, servingsPerGuest: 2, allergens: ['fish', 'milk', 'gluten'], dietBadges: [], childFriendly: true },
  { id: 'canape-cheese', name: 'Канапе с сыром', description: 'Сыр дор-блю, грецкий орех, медовые соты на крекере', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 170, servingsPerGuest: 2, allergens: ['milk', 'nuts', 'gluten'], dietBadges: [], childFriendly: true },
  { id: 'canape-ham', name: 'Канапе с хамоном', description: 'Хамон, дыня, руккола на багете', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 280, servingsPerGuest: 1, allergens: ['gluten'], dietBadges: [], childFriendly: false },
  { id: 'tartlet-chicken', name: 'Тарталетка куриная', description: 'Копчёная курица, вяленые томаты, сливочный мусс', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 160, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'tartlet-mushroom', name: 'Тарталетка грибная', description: 'Шампиньоны, лисички, трюфельное масло', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 180, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'chicken-grill', name: 'Куриное филе гриль', description: 'Куриное филе су-вид, розмарин, чеснок, песто', image: '', station: 'hot', format: ['furshet', 'banket'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 320, servingsPerGuest: 1, allergens: ['milk', 'nuts'], dietBadges: ['gluten-free'], childFriendly: true },
  { id: 'beef-steak', name: 'Стейк из говядины', description: 'Говядина Prime, прожарка medium, перечный соус', image: '', station: 'hot', format: ['furshet', 'banket'], tier: ['premium', 'luxury'], pricePerGuest: 580, servingsPerGuest: 1, allergens: ['milk'], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'salmon-grill', name: 'Лосось гриль', description: 'Филе лосося на гриле, лимонный бер-блан, спаржа', image: '', station: 'hot', format: ['furshet', 'banket'], tier: ['premium', 'luxury'], pricePerGuest: 520, servingsPerGuest: 1, allergens: ['fish', 'milk'], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'pasta-station', name: 'Живая паста-станция', description: 'Паста на выбор (спагетти/пенне/равиоли), 3 соуса, пармезан', image: '', station: 'show', format: ['furshet', 'banket'], tier: ['premium', 'luxury'], pricePerGuest: 450, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'sushi-station', name: 'Суши-станция', description: 'Роллы Филадельфия, Калифорния, спайси тунец, поке', image: '', station: 'show', format: ['furshet', 'banket'], tier: ['luxury'], pricePerGuest: 550, servingsPerGuest: 1, allergens: ['fish', 'soy', 'sesame'], dietBadges: [], childFriendly: false },
  { id: 'caviar-station', name: 'Икорная станция', description: 'Красная икра, чёрная икра, бриошь, сливочное масло, лимон', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['luxury'], pricePerGuest: 850, servingsPerGuest: 1, allergens: ['fish', 'gluten', 'milk'], dietBadges: [], childFriendly: false },
  { id: 'oyster-bar', name: 'Устричный бар', description: 'Устрицы фин де клер, лимон, соус миньонет', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['premium', 'luxury'], pricePerGuest: 600, servingsPerGuest: 3, allergens: ['molluscs'], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'tuna-tartare', name: 'Тартар из тунца', description: 'Тунец блюфин, авокадо, соус понзу (содержит пшеницу через соевый соус), кунжут', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['premium', 'luxury'], pricePerGuest: 480, servingsPerGuest: 1, allergens: ['fish', 'soy', 'sesame', 'gluten'], dietBadges: [], childFriendly: false },
  { id: 'foie-gras', name: 'Фуа-гра на бриоши', description: 'Фуа-гра на бриоши, инжирное варенье, морская соль', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['luxury'], pricePerGuest: 720, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: false },
  { id: 'lobster-thermidor', name: 'Лобстер Термидор', description: 'Лобстер в сливочно-горчичном соусе, запечённый под пармезаном', image: '', station: 'hot', format: ['furshet', 'banket'], tier: ['luxury'], pricePerGuest: 980, servingsPerGuest: 1, allergens: ['crustaceans', 'milk'], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'beef-wellington', name: 'Говядина Веллингтон', description: 'Говяжья вырезка в слоёном тесте с грибным дюкселем', image: '', station: 'hot', format: ['furshet', 'banket'], tier: ['luxury'], pricePerGuest: 890, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: false },
  { id: 'cheese-platter-premium', name: 'Сырная тарелка премиум', description: 'Бри де мо, горгонзола, манчего, трюфельный мёд, инжир', image: '', station: 'cold', format: ['furshet', 'banket'], tier: ['luxury'], pricePerGuest: 520, servingsPerGuest: 1, allergens: ['milk'], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'dessert-firework', name: 'Фейерверк-десерт', description: 'Шоколадная сфера, которая тает от горячей карамели, открывая мусс', image: '', station: 'desserts', format: ['furshet', 'banket'], tier: ['luxury'], pricePerGuest: 450, servingsPerGuest: 1, allergens: ['gluten', 'eggs', 'milk', 'nuts'], dietBadges: [], childFriendly: true },
  { id: 'mini-ekler', name: 'Мини-эклеры', description: 'Заварное тесто, ванильный крем, шоколадная глазурь', image: '', station: 'desserts', format: ['furshet', 'banket'], tier: ['economy', 'standard', 'premium', 'luxury'], pricePerGuest: 150, servingsPerGuest: 2, allergens: ['gluten', 'eggs', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'macaron-tower', name: 'Башня макаронс', description: 'Многоярусная башня из макаронс (фисташка/малина/шоколад)', image: '', station: 'desserts', format: ['furshet', 'banket'], tier: ['luxury'], pricePerGuest: 380, servingsPerGuest: 1, allergens: ['nuts', 'eggs', 'milk'], dietBadges: [], childFriendly: true },
  { id: 'wine-red', name: 'Вино красное (опц. — безалк. для халяль)', description: 'Красное сухое: Кьянти/Риоха/Кот дю Рон. Для халяль — замена на безалкогольный напиток', image: '', station: 'drinks', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 350, servingsPerGuest: 2, allergens: ['sulphites'], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'wine-white', name: 'Вино белое (опц. — безалк. для халяль)', description: 'Белое сухое: Соаве/Альбариньо/Шабли. Для халяль — замена на безалкогольный напиток', image: '', station: 'drinks', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 320, servingsPerGuest: 2, allergens: ['sulphites'], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'champagne', name: 'Шампанское', description: 'Игристое брют, просекко', image: '', station: 'drinks', format: ['furshet', 'banket'], tier: ['premium', 'luxury'], pricePerGuest: 450, servingsPerGuest: 2, allergens: ['sulphites'], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'champagne-premium', name: 'Шампанское премиум', description: 'Шампанское AOC, брют/розе', image: '', station: 'drinks', format: ['furshet', 'banket'], tier: ['luxury'], pricePerGuest: 850, servingsPerGuest: 1, allergens: ['sulphites'], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'cocktail-bar', name: 'Коктейльный бар (бармен)', description: 'Бармен + 5 коктейлей: Апероль Шприц, Мохито, Космополитен, Негрони, Маргарита', image: '', station: 'show', format: ['furshet', 'banket'], tier: ['premium', 'luxury'], pricePerGuest: 600, servingsPerGuest: 1, allergens: [], dietBadges: [], childFriendly: false },
  { id: 'wine-sommelier', name: 'Wine pairing (5 вин)', description: 'Сомелье + 5 вин с рассказом о каждом, подобранных под меню', image: '', station: 'show', format: ['furshet', 'banket'], tier: ['luxury'], pricePerGuest: 1200, servingsPerGuest: 1, allergens: ['sulphites'], dietBadges: ['vegan'], childFriendly: false },
  { id: 'whisky-bar', name: 'Виски-бар', description: 'Коллекция виски: бурбон, скотч, ирландский, японский', image: '', station: 'drinks', format: ['furshet', 'banket'], tier: ['luxury'], pricePerGuest: 700, servingsPerGuest: 1, allergens: [], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'coffee-specialty', name: 'Кофе specialty', description: 'Бариста + эспрессо, капучино, флэт уайт', image: '', station: 'drinks', format: ['furshet', 'banket', 'coffee-break'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 200, servingsPerGuest: 1, allergens: ['milk'], dietBadges: ['gluten-free'], childFriendly: false },
  { id: 'beer-craft', name: 'Крафтовое пиво', description: 'Крафтовое пиво: IPA, стаут, пшеничное', image: '', station: 'drinks', format: ['furshet', 'banket'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 280, servingsPerGuest: 2, allergens: ['gluten'], dietBadges: ['vegan'], childFriendly: false },

  // ═══════════════════════════════════════════
  // БЕЗГЛЮТЕНОВЫЕ ДЕСЕРТЫ И ВЫПЕЧКА (отдельная линия, <20 ppm)
  // — Добавлены по запросам критиков (Светлана, ребёнок с целиакией)
  // ═══════════════════════════════════════════
  { id: 'gf-cake-chocolate', name: 'Безглютеновый шоколадный торт', description: 'Миндальная мука, тёмный шоколад Belgio, какао Valrhona. Без пшеничной муки. Тестирование <20 ppm.', image: '', station: 'desserts', format: ['furshet', 'banket', 'detskoe'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 380, servingsPerGuest: 1, allergens: ['eggs', 'milk', 'nuts'], dietBadges: ['gluten-free'], childFriendly: true },
  { id: 'gf-cake-berry', name: 'Безглютеновый ягодный торт', description: 'Рисовая мука, взбитые сливки, свежие ягоды (малина/клубника/черника). Без пшеницы.', image: '', station: 'desserts', format: ['furshet', 'banket', 'detskoe'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 360, servingsPerGuest: 1, allergens: ['eggs', 'milk'], dietBadges: ['gluten-free'], childFriendly: true },
  { id: 'gf-cupcakes', name: 'Безглютеновые капкейки', description: 'Миндальная мука, крем-чиз, ягоды. 3 шт/гость. Без пшеничной муки, <20 ppm.', image: '', station: 'desserts', format: ['furshet', 'banket', 'detskoe', 'coffee-break'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 220, servingsPerGuest: 3, allergens: ['eggs', 'milk', 'nuts'], dietBadges: ['gluten-free'], childFriendly: true },
  { id: 'gf-bread', name: 'Безглютеновый хлеб', description: 'Рисовая и миндальная мука, семена подсолнечника и тыквы. Без пшеницы, <20 ppm.', image: '', station: 'cold', format: ['furshet', 'banket', 'coffee-break'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 90, servingsPerGuest: 2, allergens: ['nuts'], dietBadges: ['gluten-free', 'vegan'], childFriendly: true },
  { id: 'gf-pizza', name: 'Безглютеновая мини-пицца (с миндалём)', description: 'Основа из миндальной муки, томаты, моццарелла, базилик. Без пшеничной муки, <20 ppm. СОДЕРЖИТ ОРЕХИ (миндаль).', image: '', station: 'hot', format: ['furshet', 'detskoe'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 240, servingsPerGuest: 2, allergens: ['milk', 'nuts'], dietBadges: ['gluten-free'], childFriendly: true },
  { id: 'gf-pancakes', name: 'Безглютеновые панкейки', description: 'Рисовая мука, кленовый сироп, ягоды. Без пшеницы, <20 ppm. Детский праздник любимое.', image: '', station: 'desserts', format: ['detskoe', 'furshet'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 180, servingsPerGuest: 2, allergens: ['eggs', 'milk'], dietBadges: ['gluten-free'], childFriendly: true },
  { id: 'gf-brownie', name: 'Безглютеновый брауни', description: 'Тёмный шоколад, миндальная мука, какао. Без пшеничной муки. <20 ppm.', image: '', station: 'desserts', format: ['furshet', 'banket', 'coffee-break'], tier: ['standard', 'premium', 'luxury'], pricePerGuest: 200, servingsPerGuest: 1, allergens: ['eggs', 'milk', 'nuts'], dietBadges: ['gluten-free'], childFriendly: true },
  { id: 'gf-tart-fruit', name: 'Безглютеновый фруктовый тарт', description: 'Основа из миндальной муки, заварной крем, сезонные фрукты. Без пшеницы.', image: '', station: 'desserts', format: ['furshet', 'banket'], tier: ['premium', 'luxury'], pricePerGuest: 280, servingsPerGuest: 1, allergens: ['eggs', 'milk', 'nuts'], dietBadges: ['gluten-free'], childFriendly: true },
];

// ═══════════════════════════════════════════
// ПОЛНЫЙ КАТАЛОГ (114 SKU: 78 базовых + 8 халяль + 28 премиум-экстра)
// ═══════════════════════════════════════════
export const ALL_DISHES: Dish[] = [
  ...GLOBAL_SMALL_PLATES,
  ...PLANT_BASED,
  ...GRAZING,
  ...DESSERTS,
  ...DRINKS,
  ...FURSHET_EXTRA,
  ...BANKET_EXTRA,
  ...COFFEE_BREAK_EXTRA,
  ...WEDDING_EXTRA,
  ...KIDS,
  ...BRUNCH,
  ...HALAL,
  ...PREMIUM_EXTRA,
];

// Группировки для UI
export const DISH_CATEGORIES: Record<string, string> = {
  'cold': 'Холодные закуски',
  'hot': 'Горячие блюда',
  'desserts': 'Десерты',
  'drinks': 'Напитки',
  'show': 'Шоу-станции',
};

export const DIET_FILTERS: Record<string, string> = {
  'vegan': 'Веган',
  'gluten-free': 'Без глютена',
  'halal': 'Халяль (по запросу)',
};

// Формат → список ID для быстрого поиска
export const FORMAT_DISHES: Record<string, string[]> = {
  'furshet': ALL_DISHES.filter(d => d.format.includes('furshet')).map(d => d.id),
  'banket': ALL_DISHES.filter(d => d.format.includes('banket')).map(d => d.id),
  'coffee-break': ALL_DISHES.filter(d => d.format.includes('coffee-break')).map(d => d.id),
  'detskoe': ALL_DISHES.filter(d => d.format.includes('detskoe')).map(d => d.id),
  'mobile-furshet': ALL_DISHES.filter(d => d.format.includes('mobile-furshet')).map(d => d.id),
};
