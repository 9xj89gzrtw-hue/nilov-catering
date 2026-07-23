// Стандартные предложения тарифов с полным составом меню
// Для каждого события × тарифа: список блюд, цена, описание

import type { Tier, Format } from './types';

export interface TariffDishItem {
  dishId: string;
  name: string;
  desc: string;   // состав/ингредиенты — что внутри блюда
  category: string;
  qty: string;
}

export interface TariffOffer {
  eventId: string;
  eventName: string;
  tier: Tier;
  tierLabel: string;
  pricePerGuest: number;
  minGuests: number;
  description: string;
  highlights: string[]; // 3–4 ключевых пункта
  composition: TariffDishItem[];
  imagePlaceholder: string; // emoji-заглушка пока нет фото
}

// ═══════════════════════════════════════════
// СВАДЬБА
// ═══════════════════════════════════════════
const SVADBA: TariffOffer[] = [
  {
    eventId: 'svadba', eventName: 'Свадьба', tier: 'economy', tierLabel: 'Эконом',
    pricePerGuest: 3950, minGuests: 30,
    description: 'Свадебный приём в фуршетном формате (без посадки). 5 видов канапе, горячее, welcome drink. Достойно, без излишеств.',
    highlights: ['5 видов канапе', 'Горячее блюдо', 'Welcome drink', 'Чай/кофе'],
    imagePlaceholder: '💍',
    composition: [
      { dishId: 'canape-red-fish', name: 'Канапе с красной рыбой', desc: 'Лосось слабой соли, сливочный сыр, укроп на бородинском хлебе', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'canape-cheese', name: 'Канапе с сыром', desc: 'Сыр дор-блю, грецкий орех, медовые соты на крекере', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'tartlet-chicken', name: 'Тарталетка куриная', desc: 'Копчёная курица, вяленые томаты, сливочный мусс', category: 'Тарталетки', qty: '1 шт/гость' },
      { dishId: 'tartlet-mushroom', name: 'Тарталетка грибная', desc: 'Шампиньоны, лисички, трюфельное масло', category: 'Тарталетки', qty: '1 шт/гость' },
      { dishId: 'veggie-ragout', name: 'Овощное рагу', desc: 'Сезонные овощи (цуккини, баклажан, перец), томатный соус, базилик', category: 'Горячее', qty: '1 порция' },
      { dishId: 'chicken-grill', name: 'Куриное филе гриль', desc: 'Куриное филе су-вид, розмарин, чеснок, песто', category: 'Горячее', qty: '1 порция' },
      { dishId: 'mini-ekler', name: 'Мини-эклеры', desc: 'Заварное тесто, ванильный крем, шоколадная глазурь', category: 'Десерты', qty: '2 шт/гость' },
      { dishId: 'fruit-platter', name: 'Фруктовое плато', desc: 'Сезонные фрукты: ананас, манго, виноград, клубника, киви', category: 'Десерты', qty: '1 станция' },
      { dishId: 'cranberry-mors', name: 'Клюквенный морс', desc: 'Домашний морс из клюквы с мятой и лаймом', category: 'Напитки', qty: '2 стакана' },
      { dishId: 'lemonade-berry', name: 'Ягодный лимонад', desc: 'Микс лесных ягод, лимон, свежая мята, содовая', category: 'Напитки', qty: '2 стакана' },
    ],
  },
  {
    eventId: 'svadba', eventName: 'Свадьба', tier: 'standard', tierLabel: 'Стандарт',
    pricePerGuest: 5470, minGuests: 25,
    description: 'Полноценный свадебный банкет с посадкой. Официанты, вино, горячее.',
    highlights: ['5 закусок', '2 горячих блюда', 'Вино (2 бокала)', 'Welcome drink'],
    imagePlaceholder: '💍',
    composition: [
      { dishId: 'canape-red-fish', name: 'Канапе с красной рыбой', desc: 'Лосось слабой соли, сливочный сыр, укроп на бородинском хлебе', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'canape-cheese', name: 'Канапе с сыром', desc: 'Сыр дор-блю, грецкий орех, медовые соты на крекере', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'canape-ham', name: 'Канапе с хамоном', desc: 'Хамон, дыня, руккола на багете', category: 'Канапе', qty: '1 шт/гость' },
      { dishId: 'tartlet-chicken', name: 'Тарталетка куриная', desc: 'Копчёная курица, вяленые томаты, сливочный мусс', category: 'Тарталетки', qty: '1 шт/гость' },
      { dishId: 'tartlet-mushroom', name: 'Тарталетка грибная', desc: 'Шампиньоны, лисички, трюфельное масло', category: 'Тарталетки', qty: '1 шт/гость' },
      { dishId: 'meat-platter', name: 'Мясное плато', desc: 'Буженина, ростбиф, индейка, горчица, корнишоны', category: 'Закуски', qty: '1 станция' },
      { dishId: 'cheese-platter', name: 'Сырная тарелка', desc: 'Камамбер, маасдам, пармезан, мёд, грецкий орех, виноград', category: 'Закуски', qty: '1 станция' },
      { dishId: 'burrata-tomatoes', name: 'Буррата + томаты', desc: 'Свежая буррата, томаты черри, базилик, оливковое масло', category: 'Закуски', qty: '1 порция' },
      { dishId: 'chicken-grill', name: 'Куриное филе гриль', desc: 'Куриное филе су-вид, розмарин, чеснок, песто', category: 'Горячее', qty: '1 порция' },
      { dishId: 'beef-steak', name: 'Стейк из говядины', desc: 'Говядина Prime, прожарка medium, перечный соус', category: 'Горячее', qty: '1 порция' },
      { dishId: 'cauli-steak', name: 'Стейк из цветной капусты', desc: 'Цельный стейк из цветной капусты, тапенада из оливок', category: 'Горячее', qty: 'веган-опция' },
      { dishId: 'macaron-shooter', name: 'Макаронс-шутер', desc: '3 мини-макаронс (фисташка/малина/шоколад) в дегустационном стакане', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'donut-wall', name: 'Донат-стена', desc: 'Мини-донаты с глазурью (ваниль/шоколад/карамель), оформление стеной', category: 'Десерты', qty: '1 станция' },
      { dishId: 'welcome-drink', name: 'Welcome drink', desc: 'Игристое просекко + канапе с лососем', category: 'Напитки', qty: '1 бокал' },
      { dishId: 'cranberry-mors', name: 'Клюквенный морс', desc: 'Домашний морс из клюквы с мятой и лаймом', category: 'Напитки', qty: 'безлимит' },
      { dishId: 'wine-red', name: 'Вино красное', desc: 'Красное сухое: Кьянти/Риоха/Кот дю Рон', category: 'Бар', qty: '2 бокала' },
      { dishId: 'wine-white', name: 'Вино белое', desc: 'Белое сухое: Соаве/Альбариньо/Шабли', category: 'Бар', qty: '2 бокала' },
    ],
  },
  {
    eventId: 'svadba', eventName: 'Свадьба', tier: 'premium', tierLabel: 'Расширенный',
    pricePerGuest: 7350, minGuests: 20,
    description: 'Свадьба ресторанного уровня: морепродукты, бармен-шоу, живая станция.',
    highlights: ['Икорная станция', 'Морепродукты', 'Бармен-шоу', 'Живая станция пасты', 'Шампанское безлимит'],
    imagePlaceholder: '💎',
    composition: [
      { dishId: 'caviar-station', name: 'Икорная станция', desc: 'Красная икра, чёрная икра, бриошь, сливочное масло, лимон', category: 'Премиум', qty: '1 станция' },
      { dishId: 'oyster-bar', name: 'Устричный бар', desc: 'Устрицы фин де клер, лимон, соус миньонет', category: 'Премиум', qty: '3 шт/гость' },
      { dishId: 'canape-red-fish', name: 'Канапе с красной рыбой', desc: 'Лосось слабой соли, сливочный сыр, укроп на бородинском хлебе', category: 'Канапе', qty: '3 шт/гость' },
      { dishId: 'canape-ham', name: 'Канапе с хамоном', desc: 'Хамон, дыня, руккола на багете', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'antipasto', name: 'Антипасто-плато', desc: 'Прошутто, салями, артишоки, оливки, каперсы', category: 'Закуски', qty: '1 станция' },
      { dishId: 'burrata-tomatoes', name: 'Буррата + томаты', desc: 'Свежая буррата, томаты черри, базилик, оливковое масло', category: 'Закуски', qty: '1 порция' },
      { dishId: 'meat-platter', name: 'Мясное плато', desc: 'Буженина, ростбиф, индейка, горчица, корнишоны', category: 'Закуски', qty: '1 станция' },
      { dishId: 'beef-steak', name: 'Стейк из говядины', desc: 'Говядина Prime, прожарка medium, перечный соус', category: 'Горячее', qty: '1 порция' },
      { dishId: 'salmon-grill', name: 'Лосось гриль', desc: 'Филе лосося на гриле, лимонный бер-блан, спаржа', category: 'Горячее', qty: '1 порция' },
      { dishId: 'pasta-station', name: 'Живая паста-станция', desc: 'Паста на выбор (спагетти/пенне/равиоли), 3 соуса, пармезан', category: 'Шоу', qty: '1 станция' },
      { dishId: 'macaron-shooter', name: 'Макаронс-шутер', desc: '3 мини-макаронс (фисташка/малина/шоколад) в дегустационном стакане', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'cheesecake-shooter', name: 'Чизкейк-шутер', desc: 'Классический чизкейк нью-йорк в стакане, ягодное кули', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'welcome-drink', name: 'Welcome drink', desc: 'Игристое просекко + канапе с лососем', category: 'Напитки', qty: '1 бокал' },
      { dishId: 'champagne', name: 'Шампанское', desc: 'Игристое брют, просекко', category: 'Бар', qty: 'безлимит' },
      { dishId: 'wine-red', name: 'Вино красное', desc: 'Красное сухое: Кьянти/Риоха/Кот дю Рон', category: 'Бар', qty: 'безлимит' },
      { dishId: 'wine-white', name: 'Вино белое', desc: 'Белое сухое: Соаве/Альбариньо/Шабли', category: 'Бар', qty: 'безлимит' },
      { dishId: 'cocktail-bar', name: 'Коктейльный бар (бармен)', desc: 'Бармен + 5 коктейлей: Апероль Шприц, Мохито, Космополитен, Негрони, Маргарита', category: 'Бар', qty: '1 бармен' },
    ],
  },
  {
    eventId: 'svadba', eventName: 'Свадьба', tier: 'luxury', tierLabel: 'Максимальный',
    pricePerGuest: 9950, minGuests: 15,
    description: 'Всё включено. Чёрная икра, сомелье, гала-ужин под ключ.',
    highlights: ['Чёрная икра', 'Сомелье', 'Фейерверк-десерт', 'Полный бар', 'Координатор'],
    imagePlaceholder: '👑',
    composition: [
      { dishId: 'caviar-station', name: 'Икорная станция (чёрная + красная)', desc: 'Красная икра, чёрная икра, бриошь, сливочное масло, лимон', category: 'Премиум', qty: '1 станция' },
      { dishId: 'oyster-bar', name: 'Устричный бар', desc: 'Устрицы фин де клер, лимон, соус миньонет', category: 'Премиум', qty: '6 шт/гость' },
      { dishId: 'tuna-tartare', name: 'Тартар из тунца', desc: 'Тунец блюфин, авокадо, соус понзу, кунжут', category: 'Премиум', qty: '1 порция' },
      { dishId: 'foie-gras', name: 'Фуа-гра на бриоши', desc: 'Фуа-гра на бриоши, инжирное варенье, морская соль', category: 'Премиум', qty: '1 порция' },
      { dishId: 'antipasto', name: 'Антипасто-плато', desc: 'Прошутто, салями, артишоки, оливки, каперсы', category: 'Закуски', qty: '1 станция' },
      { dishId: 'cheese-platter-premium', name: 'Сырная тарелка премиум', desc: 'Бри де мо, горгонзола, манчего, трюфельный мёд, инжир', category: 'Закуски', qty: '1 станция' },
      { dishId: 'beef-wellington', name: 'Говядина Веллингтон', desc: 'Говяжья вырезка в слоёном тесте с грибным дюкселем', category: 'Горячее', qty: '1 порция' },
      { dishId: 'lobster-thermidor', name: 'Лобстер Термидор', desc: 'Лобстер в сливочно-горчичном соусе, запечённый под пармезаном', category: 'Горячее', qty: '½ шт/гость' },
      { dishId: 'pasta-station', name: 'Живая паста-станция', desc: 'Паста на выбор (спагетти/пенне/равиоли), 3 соуса, пармезан', category: 'Шоу', qty: '1 станция' },
      { dishId: 'sushi-station', name: 'Суши-станция', desc: 'Роллы Филадельфия, Калифорния, спайси тунец, поке', category: 'Шоу', qty: '1 станция' },
      { dishId: 'dessert-firework', name: 'Фейерверк-десерт', desc: 'Шоколадная сфера, которая тает от горячей карамели, открывая мусс', category: 'Десерты', qty: 'шоу-подача' },
      { dishId: 'macaron-tower', name: 'Макаронс-башня', desc: '120 макаронс в башне: фисташка, лаванда, роза, маракуйя, шоколад', category: 'Десерты', qty: '1 башня' },
      { dishId: 'wedding-cake', name: 'Свадебный торт', desc: 'Свадебный торт: бисквит, крем-чиз, ягоды, индивидуальный дизайн', category: 'Десерты', qty: 'индив. дизайн' },
      { dishId: 'champagne-premium', name: 'Шампанское премиум', desc: 'Шампанское AOC, брют/розе', category: 'Бар', qty: 'безлимит' },
      { dishId: 'wine-sommelier', name: 'Винное сопровождение (сомелье)', desc: 'Сомелье + 5 вин с рассказом о каждом, подобранных под меню', category: 'Бар', qty: '1 сомелье' },
      { dishId: 'cocktail-bar', name: 'Коктейльный бар', desc: 'Бармен + 5 коктейлей: Апероль Шприц, Мохито, Космополитен, Негрони, Маргарита', category: 'Бар', qty: '2 бармена' },
      { dishId: 'whisky-bar', name: 'Виски-бар', desc: 'Коллекция виски: бурбон, скотч, ирландский, японский', category: 'Бар', qty: '1 станция' },
      { dishId: 'coffee-specialty', name: 'Спешелти-кофе', desc: 'Бариста + эспрессо, капучино, флэт уайт, фильтр-кофе', category: 'Напитки', qty: '1 бариста' },
    ],
  },
];

// ═══════════════════════════════════════════
// КОРПОРАТИВ
// ═══════════════════════════════════════════
const KORPORATIV: TariffOffer[] = [
  {
    eventId: 'korporativ', eventName: 'Корпоратив', tier: 'economy', tierLabel: 'Эконом',
    pricePerGuest: 4470, minGuests: 30,
    description: 'Банкет с посадкой. Сытные закуски, горячее, напитки.',
    highlights: ['Закуски + салаты', 'Горячее блюдо', 'Чай/кофе/вода', 'Доставка в КАД'],
    imagePlaceholder: '💼',
    composition: [
      { dishId: 'canape-cheese', name: 'Канапе с сыром', desc: 'Сыр дор-блю, грецкий орех, медовые соты на крекере', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'canape-ham', name: 'Канапе с хамоном', desc: 'Хамон, дыня, руккола на багете', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'tartlet-chicken', name: 'Тарталетка куриная', desc: 'Копчёная курица, вяленые томаты, сливочный мусс', category: 'Тарталетки', qty: '1 шт/гость' },
      { dishId: 'tartlet-mushroom', name: 'Тарталетка грибная', desc: 'Шампиньоны, лисички, трюфельное масло', category: 'Тарталетки', qty: '1 шт/гость' },
      { dishId: 'mini-burger', name: 'Мини-бургер', desc: 'Говяжья котлета, чеддер, карамелизированный лук, булочка бриошь', category: 'Горячее', qty: '2 шт/гость' },
      { dishId: 'chicken-grill', name: 'Куриное филе гриль', desc: 'Куриное филе су-вид, розмарин, чеснок, песто', category: 'Горячее', qty: '1 порция' },
      { dishId: 'fruit-platter', name: 'Фруктовое плато', desc: 'Сезонные фрукты: ананас, манго, виноград, клубника, киви', category: 'Десерты', qty: '1 станция' },
      { dishId: 'cranberry-mors', name: 'Клюквенный морс', desc: 'Домашний морс из клюквы с мятой и лаймом', category: 'Напитки', qty: 'безлимит' },
      { dishId: 'lemonade-berry', name: 'Ягодный лимонад', desc: 'Микс лесных ягод, лимон, свежая мята, содовая', category: 'Напитки', qty: 'безлимит' },
    ],
  },
  {
    eventId: 'korporativ', eventName: 'Корпоратив', tier: 'standard', tierLabel: 'Стандарт',
    pricePerGuest: 5470, minGuests: 20,
    description: 'Банкет с посадкой. Мясное/рыбное горячее, вино, десерты.',
    highlights: ['7 закусок', '2 горячих', 'Вино/пиво', 'Десертный стол'],
    imagePlaceholder: '💼',
    composition: [
      { dishId: 'canape-red-fish', name: 'Канапе с красной рыбой', desc: 'Лосось слабой соли, сливочный сыр, укроп на бородинском хлебе', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'canape-cheese', name: 'Канапе с сыром', desc: 'Сыр дор-блю, грецкий орех, медовые соты на крекере', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'canape-ham', name: 'Канапе с хамоном', desc: 'Хамон, дыня, руккола на багете', category: 'Канапе', qty: '1 шт/гость' },
      { dishId: 'tartlet-chicken', name: 'Тарталетка куриная', desc: 'Копчёная курица, вяленые томаты, сливочный мусс', category: 'Тарталетки', qty: '1 шт/гость' },
      { dishId: 'meat-platter', name: 'Мясное плато', desc: 'Буженина, ростбиф, индейка, горчица, корнишоны', category: 'Закуски', qty: '1 станция' },
      { dishId: 'cheese-platter', name: 'Сырная тарелка', desc: 'Камамбер, маасдам, пармезан, мёд, грецкий орех, виноград', category: 'Закуски', qty: '1 станция' },
      { dishId: 'burrata-tomatoes', name: 'Буррата + томаты', desc: 'Свежая буррата, томаты черри, базилик, оливковое масло', category: 'Закуски', qty: '1 порция' },
      { dishId: 'chicken-grill', name: 'Куриное филе гриль', desc: 'Куриное филе су-вид, розмарин, чеснок, песто', category: 'Горячее', qty: '1 порция' },
      { dishId: 'beef-steak', name: 'Стейк из говядины', desc: 'Говядина Prime, прожарка medium, перечный соус', category: 'Горячее', qty: '1 порция' },
      { dishId: 'macaron-shooter', name: 'Макаронс-шутер', desc: '3 мини-макаронс (фисташка/малина/шоколад) в дегустационном стакане', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'cheesecake-shooter', name: 'Чизкейк-шутер', desc: 'Классический чизкейк нью-йорк в стакане, ягодное кули', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'fruit-platter', name: 'Фруктовое плато', desc: 'Сезонные фрукты: ананас, манго, виноград, клубника, киви', category: 'Десерты', qty: '1 станция' },
      { dishId: 'wine-red', name: 'Вино красное', desc: 'Красное сухое: Кьянти/Риоха/Кот дю Рон', category: 'Бар', qty: '2 бокала' },
      { dishId: 'wine-white', name: 'Вино белое', desc: 'Белое сухое: Соаве/Альбариньо/Шабли', category: 'Бар', qty: '2 бокала' },
      { dishId: 'beer-craft', name: 'Крафтовое пиво', desc: 'Крафтовое пиво: IPA, стаут, пшеничное', category: 'Бар', qty: '2 бут/гость' },
    ],
  },
  {
    eventId: 'korporativ', eventName: 'Корпоратив', tier: 'premium', tierLabel: 'Расширенный',
    pricePerGuest: 5950, minGuests: 20,
    description: 'Ресторанный уровень. Морепродукты, бармен, живая станция.',
    highlights: ['Устрицы/креветки', 'Живая станция', 'Бармен-шоу', 'Фотозона'],
    imagePlaceholder: '💎',
    composition: [
      { dishId: 'oyster-bar', name: 'Устричный бар', desc: 'Устрицы фин де клер, лимон, соус миньонет', category: 'Премиум', qty: '3 шт/гость' },
      { dishId: 'canape-red-fish', name: 'Канапе с красной рыбой', desc: 'Лосось слабой соли, сливочный сыр, укроп на бородинском хлебе', category: 'Канапе', qty: '3 шт/гость' },
      { dishId: 'antipasto', name: 'Антипасто-плато', desc: 'Прошутто, салями, артишоки, оливки, каперсы', category: 'Закуски', qty: '1 станция' },
      { dishId: 'meat-platter', name: 'Мясное плато', desc: 'Буженина, ростбиф, индейка, горчица, корнишоны', category: 'Закуски', qty: '1 станция' },
      { dishId: 'cheese-platter', name: 'Сырная тарелка', desc: 'Камамбер, маасдам, пармезан, мёд, грецкий орех, виноград', category: 'Закуски', qty: '1 станция' },
      { dishId: 'beef-steak', name: 'Стейк из говядины', desc: 'Говядина Prime, прожарка medium, перечный соус', category: 'Горячее', qty: '1 порция' },
      { dishId: 'salmon-grill', name: 'Лосось гриль', desc: 'Филе лосося на гриле, лимонный бер-блан, спаржа', category: 'Горячее', qty: '1 порция' },
      { dishId: 'pasta-station', name: 'Живая паста-станция', desc: 'Паста на выбор (спагетти/пенне/равиоли), 3 соуса, пармезан', category: 'Шоу', qty: '1 станция' },
      { dishId: 'macaron-shooter', name: 'Макаронс-шутер', desc: '3 мини-макаронс (фисташка/малина/шоколад) в дегустационном стакане', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'donut-wall', name: 'Донат-стена', desc: 'Мини-донаты с глазурью (ваниль/шоколад/карамель), оформление стеной', category: 'Десерты', qty: '1 станция' },
      { dishId: 'champagne', name: 'Шампанское', desc: 'Игристое брют, просекко', category: 'Бар', qty: '2 бокала' },
      { dishId: 'cocktail-bar', name: 'Коктейльный бар', desc: 'Бармен + 5 коктейлей: Апероль Шприц, Мохито, Космополитен, Негрони, Маргарита', category: 'Бар', qty: '1 бармен' },
      { dishId: 'wine-red', name: 'Вино красное', desc: 'Красное сухое: Кьянти/Риоха/Кот дю Рон', category: 'Бар', qty: 'безлимит' },
      { dishId: 'wine-white', name: 'Вино белое', desc: 'Белое сухое: Соаве/Альбариньо/Шабли', category: 'Бар', qty: 'безлимит' },
    ],
  },
  {
    eventId: 'korporativ', eventName: 'Корпоратив', tier: 'luxury', tierLabel: 'Максимальный',
    pricePerGuest: 7950, minGuests: 15,
    description: 'Полный бар, две живые станции, чёрная икра, сигары.',
    highlights: ['Чёрная икра', '2 шоу-станции', 'Полный бар', 'Сигарный lounge 21+', 'Координатор'],
    imagePlaceholder: '👑',
    composition: [
      { dishId: 'caviar-station', name: 'Икорная станция', desc: 'Красная икра, чёрная икра, бриошь, сливочное масло, лимон', category: 'Премиум', qty: '1 станция' },
      { dishId: 'oyster-bar', name: 'Устричный бар', desc: 'Устрицы фин де клер, лимон, соус миньонет', category: 'Премиум', qty: '6 шт/гость' },
      { dishId: 'tuna-tartare', name: 'Тартар из тунца', desc: 'Тунец блюфин, авокадо, соус понзу, кунжут', category: 'Премиум', qty: '1 порция' },
      { dishId: 'antipasto', name: 'Антипасто-плато', desc: 'Прошутто, салями, артишоки, оливки, каперсы', category: 'Закуски', qty: '1 станция' },
      { dishId: 'beef-wellington', name: 'Говядина Веллингтон', desc: 'Говяжья вырезка в слоёном тесте с грибным дюкселем', category: 'Горячее', qty: '1 порция' },
      { dishId: 'lobster-thermidor', name: 'Лобстер Термидор', desc: 'Лобстер в сливочно-горчичном соусе, запечённый под пармезаном', category: 'Горячее', qty: '½ шт/гость' },
      { dishId: 'pasta-station', name: 'Живая паста-станция', desc: 'Паста на выбор (спагетти/пенне/равиоли), 3 соуса, пармезан', category: 'Шоу', qty: '1 станция' },
      { dishId: 'sushi-station', name: 'Суши-станция', desc: 'Роллы Филадельфия, Калифорния, спайси тунец, поке', category: 'Шоу', qty: '1 станция' },
      { dishId: 'dessert-firework', name: 'Фейерверк-десерт', desc: 'Шоколадная сфера, которая тает от горячей карамели, открывая мусс', category: 'Десерты', qty: 'шоу-подача' },
      { dishId: 'champagne-premium', name: 'Шампанское премиум', desc: 'Шампанское AOC, брют/розе', category: 'Бар', qty: 'безлимит' },
      { dishId: 'cocktail-bar', name: 'Коктейльный бар', desc: 'Бармен + 5 коктейлей: Апероль Шприц, Мохито, Космополитен, Негрони, Маргарита', category: 'Бар', qty: '2 бармена' },
      { dishId: 'whisky-bar', name: 'Виски-бар', desc: 'Коллекция виски: бурбон, скотч, ирландский, японский', category: 'Бар', qty: '1 станция' },
      { dishId: 'cigar-service', name: 'Сигарный lounge (21+)', desc: 'Сигарный lounge по запросу, хьюмидор, гильотина. Только для совершеннолетних', category: 'Бар', qty: 'по запросу' },
    ],
  },
];

// ═══════════════════════════════════════════
// ВЫПУСКНОЙ
// ═══════════════════════════════════════════
const VYPUSKNOY: TariffOffer[] = [
  {
    eventId: 'vypusknoy', eventName: 'Выпускной', tier: 'economy', tierLabel: 'Школьный пакет',
    pricePerGuest: 1800, minGuests: 60,
    description: 'Спец. тариф для школ и образовательных учреждений. Канапе, мини-сэндвичи, фрукты, пицца, капкейки, морс/лимонад. Бумажная посуда.',
    highlights: ['Школы / вузы / детсады', 'Документы для Роспот', 'Бумажная посуда', 'Станция напитков'],
    imagePlaceholder: '🎓',
    composition: [
      { dishId: 'canape-red-fish', name: 'Канапе с красной рыбой', desc: 'Лосось слабой соли, сливочный сыр, укроп', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'canape-cheese', name: 'Канапе с сыром', desc: 'Сыр, виноград, крекер', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'mini-sandwich', name: 'Мини-сэндвичи', desc: 'Курица, огурец, булочка', category: 'Закуски', qty: '2 шт/гость' },
      { dishId: 'fruit-platter', name: 'Фруктовое плато', desc: 'Ананас, виноград, клубника, киви', category: 'Фрукты', qty: '150 г/гость' },
      { dishId: 'mini-pizza', name: 'Мини-пицца', desc: 'Маргарита, пепперони, 4 сыра', category: 'Горячее', qty: '2 шт/гость' },
      { dishId: 'cupcakes', name: 'Капкейки', desc: 'С кремом и посыпкой', category: 'Десерты', qty: '2 шт/гость' },
      { dishId: 'cranberry-mors', name: 'Клюквенный морс', desc: 'Домашний морс с мятой', category: 'Напитки', qty: '2 стакана' },
      { dishId: 'lemonade-berry', name: 'Ягодный лимонад', desc: 'Микс ягод, лимон, мята', category: 'Напитки', qty: '2 стакана' },
    ],
  },
  {
    eventId: 'vypusknoy', eventName: 'Выпускной', tier: 'economy', tierLabel: 'Эконом',
    pricePerGuest: 2450, minGuests: 20,
    description: 'Молодёжный фуршет. Пицца-станция, бургеры, лимонады.',
    highlights: ['Пицца-станция', 'Мини-бургеры', 'Лимонады', 'Фотозона'],
    imagePlaceholder: '🎓',
    composition: [
      { dishId: 'pizza-station', name: 'Пицца-станция', desc: 'Пицца из дровяной печи: маргарита, пепперони, 4 сыра', category: 'Горячее', qty: '1 станция' },
      { dishId: 'mini-burger', name: 'Мини-бургер', desc: 'Говяжья котлета, чеддер, карамелизированный лук, булочка бриошь', category: 'Горячее', qty: '2 шт/гость' },
      { dishId: 'canape-cheese', name: 'Канапе с сыром', desc: 'Сыр дор-блю, грецкий орех, медовые соты на крекере', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'tartlet-chicken', name: 'Тарталетка куриная', desc: 'Копчёная курица, вяленые томаты, сливочный мусс', category: 'Тарталетки', qty: '1 шт/гость' },
      { dishId: 'donut-wall', name: 'Донат-стена', desc: 'Мини-донаты с глазурью (ваниль/шоколад/карамель), оформление стеной', category: 'Десерты', qty: '1 станция' },
      { dishId: 'fruit-platter', name: 'Фруктовое плато', desc: 'Сезонные фрукты: ананас, манго, виноград, клубника, киви', category: 'Десерты', qty: '1 станция' },
      { dishId: 'lemonade-berry', name: 'Ягодный лимонад', desc: 'Микс лесных ягод, лимон, свежая мята, содовая', category: 'Напитки', qty: 'безлимит' },
      { dishId: 'lemonade-tarragon', name: 'Лимонад эстрагон', desc: 'Авторский лимонад с эстрагоном и лаймом', category: 'Напитки', qty: 'безлимит' },
    ],
  },
  {
    eventId: 'vypusknoy', eventName: 'Выпускной', tier: 'standard', tierLabel: 'Стандарт',
    pricePerGuest: 3450, minGuests: 15,
    description: 'Праздничный банкет. Горячее, десерты, безалкогольный бар.',
    highlights: ['2 горячих', 'Десертный стол', 'Mocktail-бар', 'DJ + свет'],
    imagePlaceholder: '🎓',
    composition: [
      { dishId: 'canape-red-fish', name: 'Канапе с красной рыбой', desc: 'Лосось слабой соли, сливочный сыр, укроп на бородинском хлебе', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'canape-cheese', name: 'Канапе с сыром', desc: 'Сыр дор-блю, грецкий орех, медовые соты на крекере', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'tartlet-chicken', name: 'Тарталетка куриная', desc: 'Копчёная курица, вяленые томаты, сливочный мусс', category: 'Тарталетки', qty: '1 шт/гость' },
      { dishId: 'meat-platter', name: 'Мясное плато', desc: 'Буженина, ростбиф, индейка, горчица, корнишоны', category: 'Закуски', qty: '1 станция' },
      { dishId: 'chicken-grill', name: 'Куриное филе гриль', desc: 'Куриное филе су-вид, розмарин, чеснок, песто', category: 'Горячее', qty: '1 порция' },
      { dishId: 'pasta-station', name: 'Живая паста-станция', desc: 'Паста на выбор (спагетти/пенне/равиоли), 3 соуса, пармезан', category: 'Шоу', qty: '1 станция' },
      { dishId: 'donut-wall', name: 'Донат-стена', desc: 'Мини-донаты с глазурью (ваниль/шоколад/карамель), оформление стеной', category: 'Десерты', qty: '1 станция' },
      { dishId: 'macaron-shooter', name: 'Макаронс-шутер', desc: '3 мини-макаронс (фисташка/малина/шоколад) в дегустационном стакане', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'brownie-shooter', name: 'Брауни-шутер', desc: 'Шоколадный брауни в стакане, солёная карамель, орех пекан', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'fruit-platter', name: 'Фруктовое плато', desc: 'Сезонные фрукты: ананас, манго, виноград, клубника, киви', category: 'Десерты', qty: '1 станция' },
      { dishId: 'mocktail-bar', name: 'Mocktail-бар', desc: 'Безалкогольные коктейли: Вирджин Мохито, Пина Колада, Малиновый спритц', category: 'Бар', qty: '1 бармен' },
      { dishId: 'lemonade-berry', name: 'Ягодный лимонад', desc: 'Микс лесных ягод, лимон, свежая мята, содовая', category: 'Напитки', qty: 'безлимит' },
    ],
  },
  {
    eventId: 'vypusknoy', eventName: 'Выпускной', tier: 'premium', tierLabel: 'Расширенный',
    pricePerGuest: 4950, minGuests: 15,
    description: 'Выпускной с размахом. Шоу-станции, бар, сладкий стол.',
    highlights: ['3 шоу-станции', 'Mocktail-бар', 'Конфетти-пушка', 'Фотограф'],
    imagePlaceholder: '🎓',
    composition: [
      { dishId: 'canape-red-fish', name: 'Канапе с красной рыбой', desc: 'Лосось слабой соли, сливочный сыр, укроп на бородинском хлебе', category: 'Канапе', qty: '3 шт/гость' },
      { dishId: 'antipasto', name: 'Антипасто-плато', desc: 'Прошутто, салями, артишоки, оливки, каперсы', category: 'Закуски', qty: '1 станция' },
      { dishId: 'burrata-tomatoes', name: 'Буррата + томаты', desc: 'Свежая буррата, томаты черри, базилик, оливковое масло', category: 'Закуски', qty: '1 порция' },
      { dishId: 'beef-steak', name: 'Стейк из говядины', desc: 'Говядина Prime, прожарка medium, перечный соус', category: 'Горячее', qty: '1 порция' },
      { dishId: 'salmon-grill', name: 'Лосось гриль', desc: 'Филе лосося на гриле, лимонный бер-блан, спаржа', category: 'Горячее', qty: '1 порция' },
      { dishId: 'pasta-station', name: 'Живая паста-станция', desc: 'Паста на выбор (спагетти/пенне/равиоли), 3 соуса, пармезан', category: 'Шоу', qty: '1 станция' },
      { dishId: 'pizza-station', name: 'Пицца-станция', desc: 'Пицца из дровяной печи: маргарита, пепперони, 4 сыра', category: 'Шоу', qty: '1 станция' },
      { dishId: 'donut-wall', name: 'Донат-стена', desc: 'Мини-донаты с глазурью (ваниль/шоколад/карамель), оформление стеной', category: 'Десерты', qty: '1 станция' },
      { dishId: 'macaron-shooter', name: 'Макаронс-шутер', desc: '3 мини-макаронс (фисташка/малина/шоколад) в дегустационном стакане', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'cheesecake-shooter', name: 'Чизкейк-шутер', desc: 'Классический чизкейк нью-йорк в стакане, ягодное кули', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'choc-mousse', name: 'Шоколадный мусс', desc: 'Мусс из бельгийского шоколада 70%, морская соль, какао', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'mocktail-bar', name: 'Mocktail-бар', desc: 'Безалкогольные коктейли: Вирджин Мохито, Пина Колада, Малиновый спритц', category: 'Бар', qty: '1 бармен' },
      { dishId: 'smoothie-bar', name: 'Смузи-бар', desc: 'Смузи на выбор: манго-маракуйя, клубника-банан, шпинат-яблоко', category: 'Бар', qty: '1 станция' },
    ],
  },
];

// ═══════════════════════════════════════════
// ЧАСТНОЕ (Дни рождения, юбилеи)
// ═══════════════════════════════════════════
const CHASTNOE: TariffOffer[] = [
  {
    eventId: 'chastnoe', eventName: 'Частное событие', tier: 'economy', tierLabel: 'Эконом',
    pricePerGuest: 2450, minGuests: 15,
    description: 'Камерный фуршет. Закуски, горячее, напитки — без лишнего.',
    highlights: ['6 видов закусок', '1 горячее', 'Чай/кофе', 'Доставка'],
    imagePlaceholder: '🥂',
    composition: [
      { dishId: 'canape-cheese', name: 'Канапе с сыром', desc: 'Сыр дор-блю, грецкий орех, медовые соты на крекере', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'canape-ham', name: 'Канапе с хамоном', desc: 'Хамон, дыня, руккола на багете', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'tartlet-chicken', name: 'Тарталетка куриная', desc: 'Копчёная курица, вяленые томаты, сливочный мусс', category: 'Тарталетки', qty: '1 шт/гость' },
      { dishId: 'tartlet-mushroom', name: 'Тарталетка грибная', desc: 'Шампиньоны, лисички, трюфельное масло', category: 'Тарталетки', qty: '1 шт/гость' },
      { dishId: 'chicken-grill', name: 'Куриное филе гриль', desc: 'Куриное филе су-вид, розмарин, чеснок, песто', category: 'Горячее', qty: '1 порция' },
      { dishId: 'fruit-platter', name: 'Фруктовое плато', desc: 'Сезонные фрукты: ананас, манго, виноград, клубника, киви', category: 'Десерты', qty: '1 станция' },
      { dishId: 'cranberry-mors', name: 'Клюквенный морс', desc: 'Домашний морс из клюквы с мятой и лаймом', category: 'Напитки', qty: 'безлимит' },
      { dishId: 'lemonade-berry', name: 'Ягодный лимонад', desc: 'Микс лесных ягод, лимон, свежая мята, содовая', category: 'Напитки', qty: 'безлимит' },
    ],
  },
  {
    eventId: 'chastnoe', eventName: 'Частное событие', tier: 'standard', tierLabel: 'Стандарт',
    pricePerGuest: 3950, minGuests: 10,
    description: 'Уютный банкет. Закуски, 2 горячих, вино, десерты.',
    highlights: ['Закуски + плато', '2 горячих', 'Вино', 'Десерты'],
    imagePlaceholder: '🥂',
    composition: [
      { dishId: 'canape-red-fish', name: 'Канапе с красной рыбой', desc: 'Лосось слабой соли, сливочный сыр, укроп на бородинском хлебе', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'meat-platter', name: 'Мясное плато', desc: 'Буженина, ростбиф, индейка, горчица, корнишоны', category: 'Закуски', qty: '1 станция' },
      { dishId: 'cheese-platter', name: 'Сырная тарелка', desc: 'Камамбер, маасдам, пармезан, мёд, грецкий орех, виноград', category: 'Закуски', qty: '1 станция' },
      { dishId: 'burrata-tomatoes', name: 'Буррата + томаты', desc: 'Свежая буррата, томаты черри, базилик, оливковое масло', category: 'Закуски', qty: '1 порция' },
      { dishId: 'chicken-grill', name: 'Куриное филе гриль', desc: 'Куриное филе су-вид, розмарин, чеснок, песто', category: 'Горячее', qty: '1 порция' },
      { dishId: 'beef-steak', name: 'Стейк из говядины', desc: 'Говядина Prime, прожарка medium, перечный соус', category: 'Горячее', qty: '1 порция' },
      { dishId: 'mini-ekler', name: 'Мини-эклеры', desc: 'Заварное тесто, ванильный крем, шоколадная глазурь', category: 'Десерты', qty: '2 шт/гость' },
      { dishId: 'cheesecake-shooter', name: 'Чизкейк-шутер', desc: 'Классический чизкейк нью-йорк в стакане, ягодное кули', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'wine-red', name: 'Вино красное', desc: 'Красное сухое: Кьянти/Риоха/Кот дю Рон', category: 'Бар', qty: '2 бокала' },
      { dishId: 'wine-white', name: 'Вино белое', desc: 'Белое сухое: Соаве/Альбариньо/Шабли', category: 'Бар', qty: '2 бокала' },
    ],
  },
  {
    eventId: 'chastnoe', eventName: 'Частное событие', tier: 'premium', tierLabel: 'Расширенный',
    pricePerGuest: 5950, minGuests: 8,
    description: 'Гастрономический ужин. Морепродукты, рибай, сомелье.',
    highlights: ['Устрицы', 'Рибай', 'Сомелье', 'Гастро-десерт'],
    imagePlaceholder: '🥂',
    composition: [
      { dishId: 'oyster-bar', name: 'Устричный бар', desc: 'Устрицы фин де клер, лимон, соус миньонет', category: 'Премиум', qty: '3 шт/гость' },
      { dishId: 'tuna-tartare', name: 'Тартар из тунца', desc: 'Тунец блюфин, авокадо, соус понзу, кунжут', category: 'Премиум', qty: '1 порция' },
      { dishId: 'antipasto', name: 'Антипасто-плато', desc: 'Прошутто, салями, артишоки, оливки, каперсы', category: 'Закуски', qty: '1 станция' },
      { dishId: 'beef-steak', name: 'Рибай', desc: 'Говядина Prime, прожарка medium, перечный соус', category: 'Горячее', qty: '1 порция' },
      { dishId: 'salmon-grill', name: 'Лосось гриль', desc: 'Филе лосося на гриле, лимонный бер-блан, спаржа', category: 'Горячее', qty: '1 порция' },
      { dishId: 'cheesecake-shooter', name: 'Чизкейк-шутер', desc: 'Классический чизкейк нью-йорк в стакане, ягодное кули', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'choc-mousse', name: 'Шоколадный мусс', desc: 'Мусс из бельгийского шоколада 70%, морская соль, какао', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'champagne', name: 'Шампанское', desc: 'Игристое брют, просекко', category: 'Бар', qty: 'безлимит' },
      { dishId: 'wine-sommelier', name: 'Винное сопровождение', desc: 'Сомелье + 5 вин с рассказом о каждом, подобранных под меню', category: 'Бар', qty: '1 сомелье' },
    ],
  },
];

// ═══════════════════════════════════════════
// ДЕТСКОЕ
// ═══════════════════════════════════════════
const DETSKOE: TariffOffer[] = [
  {
    eventId: 'detskoe', eventName: 'Детский праздник', tier: 'economy', tierLabel: 'Эконом',
    pricePerGuest: 1550, minGuests: 10,
    description: 'Весёлый детский фуршет. Бургеры, наггетсы, соки.',
    highlights: ['Мини-бургеры', 'Наггетсы', 'Соки/морсы', 'Аниматор (1 час)'],
    imagePlaceholder: '🎈',
    composition: [
      { dishId: 'mini-burger', name: 'Мини-бургер', desc: 'Говяжья котлета, чеддер, карамелизированный лук, булочка бриошь', category: 'Горячее', qty: '2 шт/гость' },
      { dishId: 'nuggets', name: 'Куриные наггетсы', desc: 'Куриная грудка в хрустящей панировке, томатный соус', category: 'Горячее', qty: '3 шт/гость' },
      { dishId: 'canape-cheese', name: 'Канапе с сыром', desc: 'Сыр дор-блю, грецкий орех, медовые соты на крекере', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'fruit-platter', name: 'Фруктовое плато', desc: 'Сезонные фрукты: ананас, манго, виноград, клубника, киви', category: 'Фрукты', qty: '1 станция' },
      { dishId: 'donut-wall', name: 'Донат-стена', desc: 'Мини-донаты с глазурью (ваниль/шоколад/карамель), оформление стеной', category: 'Десерты', qty: '1 станция' },
      { dishId: 'lemonade-berry', name: 'Ягодный лимонад', desc: 'Микс лесных ягод, лимон, свежая мята, содовая', category: 'Напитки', qty: 'безлимит' },
      { dishId: 'cranberry-mors', name: 'Клюквенный морс', desc: 'Домашний морс из клюквы с мятой и лаймом', category: 'Напитки', qty: 'безлимит' },
    ],
  },
  {
    eventId: 'detskoe', eventName: 'Детский праздник', tier: 'standard', tierLabel: 'Стандарт',
    pricePerGuest: 2450, minGuests: 10,
    description: 'Праздник с аниматором. Бургеры, мини-хот-доги, сладкий стол.',
    highlights: ['Мини-бургеры + хот-доги', 'Сладкий стол', 'Аниматор (2 часа)', 'Шоу мыльных пузырей'],
    imagePlaceholder: '🎈',
    composition: [
      { dishId: 'mini-burger', name: 'Мини-бургер', desc: 'Говяжья котлета, чеддер, карамелизированный лук, булочка бриошь', category: 'Горячее', qty: '2 шт/гость' },
      { dishId: 'mini-hotdog', name: 'Мини-хот-дог', desc: 'Колбаска гриль, карамелизированный лук, горчица, булочка', category: 'Горячее', qty: '2 шт/гость' },
      { dishId: 'nuggets', name: 'Куриные наггетсы', desc: 'Куриная грудка в хрустящей панировке, томатный соус', category: 'Горячее', qty: '3 шт/гость' },
      { dishId: 'pizza-station', name: 'Пицца-станция', desc: 'Пицца из дровяной печи: маргарита, пепперони, 4 сыра', category: 'Горячее', qty: '1 станция' },
      { dishId: 'fruit-platter', name: 'Фруктовое плато', desc: 'Сезонные фрукты: ананас, манго, виноград, клубника, киви', category: 'Фрукты', qty: '1 станция' },
      { dishId: 'donut-wall', name: 'Донат-стена', desc: 'Мини-донаты с глазурью (ваниль/шоколад/карамель), оформление стеной', category: 'Десерты', qty: '1 станция' },
      { dishId: 'macaron-shooter', name: 'Макаронс-шутер', desc: '3 мини-макаронс (фисташка/малина/шоколад) в дегустационном стакане', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'cookie-shooter', name: 'Молочно-печенье-шутер', desc: 'Крошка печенья, ванильный крем, карамель, взбитые сливки', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'lemonade-berry', name: 'Ягодный лимонад', desc: 'Микс лесных ягод, лимон, свежая мята, содовая', category: 'Напитки', qty: 'безлимит' },
      { dishId: 'smoothie-bar', name: 'Смузи-бар', desc: 'Смузи на выбор: манго-маракуйя, клубника-банан, шпинат-яблоко', category: 'Напитки', qty: '1 станция' },
    ],
  },
  {
    eventId: 'detskoe', eventName: 'Детский праздник', tier: 'premium', tierLabel: 'Расширенный',
    pricePerGuest: 3450, minGuests: 10,
    description: 'Мечта ребёнка. Шоу-программа, candy-bar, фотограф.',
    highlights: ['Шоу-программа', 'Candy-bar', 'Фотограф', 'Пиньята + квест'],
    imagePlaceholder: '🎈',
    composition: [
      { dishId: 'mini-burger', name: 'Мини-бургер', desc: 'Говяжья котлета, чеддер, карамелизированный лук, булочка бриошь', category: 'Горячее', qty: '2 шт/гость' },
      { dishId: 'mini-hotdog', name: 'Мини-хот-дог', desc: 'Колбаска гриль, карамелизированный лук, горчица, булочка', category: 'Горячее', qty: '2 шт/гость' },
      { dishId: 'nuggets', name: 'Куриные наггетсы', desc: 'Куриная грудка в хрустящей панировке, томатный соус', category: 'Горячее', qty: '3 шт/гость' },
      { dishId: 'pizza-station', name: 'Пицца-станция', desc: 'Пицца из дровяной печи: маргарита, пепперони, 4 сыра', category: 'Шоу', qty: '1 станция' },
      { dishId: 'candy-bar', name: 'Candy-bar', desc: 'Леденцы, маршмэллоу, шоколадные конфеты, желейные фигурки', category: 'Десерты', qty: '1 станция' },
      { dishId: 'donut-wall', name: 'Донат-стена', desc: 'Мини-донаты с глазурью (ваниль/шоколад/карамель), оформление стеной', category: 'Десерты', qty: '1 станция' },
      { dishId: 'macaron-shooter', name: 'Макаронс-шутер', desc: '3 мини-макаронс (фисташка/малина/шоколад) в дегустационном стакане', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'cake-custom', name: 'Именной торт', desc: 'Именной торт: бисквит/мусс, индивидуальный декор, надпись', category: 'Десерты', qty: 'индив. дизайн' },
      { dishId: 'fruit-platter', name: 'Фруктовое плато', desc: 'Сезонные фрукты: ананас, манго, виноград, клубника, киви', category: 'Фрукты', qty: '1 станция' },
      { dishId: 'smoothie-bar', name: 'Смузи-бар', desc: 'Смузи на выбор: манго-маракуйя, клубника-банан, шпинат-яблоко', category: 'Напитки', qty: '1 станция' },
      { dishId: 'lemonade-berry', name: 'Ягодный лимонад', desc: 'Микс лесных ягод, лимон, свежая мята, содовая', category: 'Напитки', qty: 'безлимит' },
    ],
  },
];

// ═══════════════════════════════════════════
// ШЕФ НА ДОМ
// ═══════════════════════════════════════════
const CHEF_AT_HOME: TariffOffer[] = [
  {
    eventId: 'chef-at-home', eventName: 'Шеф на дом', tier: 'standard', tierLabel: 'Стандарт',
    pricePerGuest: 4500, minGuests: 4,
    description: 'Шеф готовит у вас. 4 блюда, сервировка, уборка кухни.',
    highlights: ['4 курса', 'Сервировка', 'Уборка кухни', '4 часа работы шефа'],
    imagePlaceholder: '👨‍🍳',
    composition: [
      { dishId: 'burrata-tomatoes', name: 'Буррата + томаты', desc: 'Свежая буррата, томаты черри, базилик, оливковое масло', category: 'Закуска', qty: '1 порция' },
      { dishId: 'tuna-tartare', name: 'Тартар из тунца', desc: 'Тунец блюфин, авокадо, соус понзу, кунжут', category: 'Закуска', qty: '1 порция' },
      { dishId: 'beef-steak', name: 'Рибай', desc: 'Говядина Prime, прожарка medium, перечный соус', category: 'Основное', qty: '1 порция' },
      { dishId: 'salmon-grill', name: 'Лосось гриль', desc: 'Филе лосося на гриле, лимонный бер-блан, спаржа', category: 'Основное', qty: '1 порция' },
      { dishId: 'cheesecake-shooter', name: 'Чизкейк-шутер', desc: 'Классический чизкейк нью-йорк в стакане, ягодное кули', category: 'Десерт', qty: '1 стакан' },
      { dishId: 'wine-red', name: 'Вино красное', desc: 'Красное сухое: Кьянти/Риоха/Кот дю Рон', category: 'Бар', qty: '2 бокала' },
      { dishId: 'wine-white', name: 'Вино белое', desc: 'Белое сухое: Соаве/Альбариньо/Шабли', category: 'Бар', qty: '2 бокала' },
    ],
  },
  {
    eventId: 'chef-at-home', eventName: 'Шеф на дом', tier: 'premium', tierLabel: 'Расширенный',
    pricePerGuest: 7500, minGuests: 2,
    description: 'Гастрономический опыт. Шеф + сомелье, 6 курсов с wine pairing.',
    highlights: ['6 курсов', 'Wine pairing', 'Шеф + сомелье', '6 часов'],
    imagePlaceholder: '👨‍🍳',
    composition: [
      { dishId: 'oyster-bar', name: 'Устрицы', desc: 'Устрицы фин де клер, лимон, соус миньонет', category: 'Амюз-буш', qty: '3 шт/гость' },
      { dishId: 'tuna-tartare', name: 'Тартар из тунца', desc: 'Тунец блюфин, авокадо, соус понзу, кунжут', category: 'Закуска', qty: '1 порция' },
      { dishId: 'foie-gras', name: 'Фуа-гра на бриоши', desc: 'Фуа-гра на бриоши, инжирное варенье, морская соль', category: 'Закуска', qty: '1 порция' },
      { dishId: 'lobster-thermidor', name: 'Лобстер Термидор', desc: 'Лобстер в сливочно-горчичном соусе, запечённый под пармезаном', category: 'Основное', qty: '½ шт/гость' },
      { dishId: 'beef-wellington', name: 'Говядина Веллингтон', desc: 'Говяжья вырезка в слоёном тесте с грибным дюкселем', category: 'Основное', qty: '1 порция' },
      { dishId: 'cheese-platter-premium', name: 'Сырная тарелка премиум', desc: 'Бри де мо, горгонзола, манчего, трюфельный мёд, инжир', category: 'Сыр', qty: 'дегустация' },
      { dishId: 'dessert-firework', name: 'Фейерверк-десерт', desc: 'Шоколадная сфера, которая тает от горячей карамели, открывая мусс', category: 'Десерт', qty: 'шоу-подача' },
      { dishId: 'wine-sommelier', name: 'Wine pairing (5 вин)', desc: 'Сомелье + 5 вин с рассказом о каждом, подобранных под меню', category: 'Бар', qty: '1 сомелье' },
      { dishId: 'champagne-premium', name: 'Шампанское премиум', desc: 'Шампанское AOC, брют/розе', category: 'Бар', qty: 'безлимит' },
    ],
  },
];

// ═══════════════════════════════════════════
// КОФЕ-БРЕЙК (полноценные тарифы с составом)
// ═══════════════════════════════════════════
const COFFEE_BREAK: TariffOffer[] = [
  {
    eventId: 'coffee-break', eventName: 'Кофе-брейк', tier: 'economy', tierLabel: 'Эконом',
    pricePerGuest: 390, minGuests: 10,
    description: 'Базовый кофе-брейк: выпечка, чай, кофе. Для конференций и семинаров.',
    highlights: ['2 вида выпечки', 'Мини-сэндвич', 'Лимонад/морс безлимит'],
    imagePlaceholder: '☕',
    composition: [
      { dishId: 'croissant', name: 'Круассан классический', desc: 'Сливочное масло 82.5%, слоёное тесто', category: 'Выпечка', qty: '1 шт/гость' },
      { dishId: 'muffin', name: 'Маффин', desc: 'Черничный или шоколадный', category: 'Выпечка', qty: '1 шт/гость' },
      { dishId: 'mini-sandwich', name: 'Мини-сэндвич', desc: 'Ветчина, сыр, огурец на бриоши', category: 'Канапе', qty: '1 шт/гость' },
      { dishId: 'fruit-platter', name: 'Фруктовая тарелка', desc: 'Сезонные фрукты', category: 'Фрукты', qty: '1 станция' },
      { dishId: 'lemonade-tarragon', name: 'Лимонад эстрагон', desc: 'Эстрагон, лайм, содовая', category: 'Напитки', qty: 'безлимит' },
      { dishId: 'cranberry-mors', name: 'Клюквенный морс', desc: 'Домашний морс с мятой и лаймом', category: 'Напитки', qty: 'безлимит' },
    ],
  },
  {
    eventId: 'coffee-break', eventName: 'Кофе-брейк', tier: 'standard', tierLabel: 'Стандарт',
    pricePerGuest: 1450, minGuests: 10,
    description: 'Сытный кофе-брейк: 4 вида выпечки, канапе, десерты, бариста.',
    highlights: ['4 вида выпечки', 'Канапе', 'Десерты', 'Бариста', 'Соки/морсы'],
    imagePlaceholder: '☕',
    composition: [
      { dishId: 'croissant', name: 'Круассан классический', desc: 'Сливочное масло 82.5%, слоёное тесто', category: 'Выпечка', qty: '1 шт/гость' },
      { dishId: 'eclair', name: 'Эклер', desc: 'Заварное тесто, ванильный крем, глазурь', category: 'Выпечка', qty: '1 шт/гость' },
      { dishId: 'muffin', name: 'Маффин', desc: 'Черничный или шоколадный', category: 'Выпечка', qty: '1 шт/гость' },
      { dishId: 'mini-sandwich', name: 'Мини-сэндвич', desc: 'Ветчина, сыр, огурец на бриоши', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'canape-caprese', name: 'Канапе «Капрезе»', desc: 'Моцарелла, томаты черри, песто', category: 'Канапе', qty: '1 шт/гость' },
      { dishId: 'macaron-shooter', name: 'Макаронс-шутер', desc: '3 мини-макаронс в стакане', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'mini-tart', name: 'Мини-тарт-ассорти', desc: 'Лимонный, ягодный, шоколадный', category: 'Десерты', qty: '1 шт/гость' },
      { dishId: 'fruit-platter', name: 'Фруктовая тарелка', desc: 'Сезонные фрукты', category: 'Фрукты', qty: '1 станция' },
      { dishId: 'lemonade-berry', name: 'Ягодный лимонад', desc: 'Микс ягод, лимон, мята, содовая', category: 'Напитки', qty: 'безлимит' },
      { dishId: 'seabuckthorn-tea', name: 'Облепиховый чай', desc: 'Облепиха, имбирь, мёд', category: 'Напитки', qty: 'безлимит' },
      { dishId: 'latte', name: 'Латте (бариста)', desc: 'Кофейный бар с бариста', category: 'Кофе', qty: 'безлимит' },
    ],
  },
  {
    eventId: 'coffee-break', eventName: 'Кофе-брейк', tier: 'premium', tierLabel: 'Расширенный',
    pricePerGuest: 1950, minGuests: 10,
    description: 'Премиум-брейк: миндальные круассаны, бриошь с заварным кремом, 3 десерта, смузи-бар.',
    highlights: ['Премиум-выпечка', '3 десерта', 'Смузи-бар', 'Бариста', 'Канапе с лососем/хамоном'],
    imagePlaceholder: '✨',
    composition: [
      { dishId: 'croissant-ham', name: 'Круассан с ветчиной', desc: 'Тёплый, с ветчиной и сыром', category: 'Выпечка', qty: '1 шт/гость' },
      { dishId: 'eclair', name: 'Эклер', desc: 'Заварное тесто, ванильный крем, глазурь', category: 'Выпечка', qty: '1 шт/гость' },
      { dishId: 'greek-yogurt', name: 'Греческий йогурт', desc: 'С мёдом, гранолой и ягодами', category: 'Завтрак', qty: '1 порция' },
      { dishId: 'mini-sandwich', name: 'Мини-сэндвич', desc: 'Ветчина, сыр, огурец на бриоши', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'canape-caprese', name: 'Канапе «Капрезе»', desc: 'Моцарелла, томаты черри, песто', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'macaron-shooter', name: 'Макаронс-шутер', desc: '3 мини-макаронс в стакане', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'cheesecake-shooter', name: 'Чизкейк-шутер', desc: 'Чизкейк в стакане, ягодное кули', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'brownie-shooter', name: 'Брауни-шутер', desc: 'Шоколадный брауни в стакане с карамелью', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'fruit-platter', name: 'Фруктовая тарелка', desc: 'Сезонные фрукты', category: 'Фрукты', qty: '1 станция' },
      { dishId: 'cedar-raf', name: 'Кедровый раф', desc: 'Кофейный напиток с кедровым молоком', category: 'Кофе', qty: 'безлимит' },
      { dishId: 'lemonade-berry', name: 'Ягодный лимонад', desc: 'Микс ягод, лимон, мята, содовая', category: 'Напитки', qty: 'безлимит' },
      { dishId: 'seabuckthorn-tea', name: 'Облепиховый чай', desc: 'Облепиха, имбирь, мёд', category: 'Напитки', qty: 'безлимит' },
    ],
  },
  {
    eventId: 'coffee-break', eventName: 'Кофе-брейк', tier: 'luxury', tierLabel: 'Максимальный',
    pricePerGuest: 2450, minGuests: 10,
    description: 'Максимальный кофе-брейк: премиум-выпечка, яйца-бенедикт, сырное плато, игристое.',
    highlights: ['Премиум-выпечка', 'Яйца-бенедикт', 'Сырное плато', 'Игристое', 'Свежевыжатый сок', 'Бариста'],
    imagePlaceholder: '👑',
    composition: [
      { dishId: 'croissant-ham', name: 'Круассан с ветчиной', desc: 'Тёплый, с ветчиной и сыром', category: 'Выпечка', qty: '2 шт/гость' },
      { dishId: 'eggs-benedict', name: 'Яичница-бенедикт', desc: 'Яйцо пашот, бекон, голландский соус', category: 'Завтрак', qty: '1 порция' },
      { dishId: 'omelette', name: 'Омлет', desc: 'Нежный, с зеленью и сыром', category: 'Завтрак', qty: '1 порция' },
      { dishId: 'greek-yogurt', name: 'Греческий йогурт', desc: 'С мёдом, гранолой и ягодами', category: 'Завтрак', qty: '1 порция' },
      { dishId: 'cheese-platter', name: 'Сырная тарелка', desc: 'Камамбер, маасдам, пармезан, мёд, орехи, виноград', category: 'Премиум', qty: '1 станция' },
      { dishId: 'canape-caprese', name: 'Канапе «Капрезе»', desc: 'Моцарелла, томаты черри, песто', category: 'Канапе', qty: '2 шт/гость' },
      { dishId: 'macaron-shooter', name: 'Макаронс-шутер', desc: '3 мини-макаронс в стакане', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'cheesecake-shooter', name: 'Чизкейк-шутер', desc: 'Чизкейк в стакане, ягодное кули', category: 'Десерты', qty: '1 стакан' },
      { dishId: 'fruit-platter', name: 'Фруктовая тарелка', desc: 'Сезонные фрукты', category: 'Фрукты', qty: '1 станция' },
      { dishId: 'fresh-juice', name: 'Свежевыжатый сок', desc: 'Апельсиновый, грейпфрутовый', category: 'Напитки', qty: 'безлимит' },
      { dishId: 'cedar-raf', name: 'Кедровый раф', desc: 'Кофейный напиток с кедровым молоком', category: 'Кофе', qty: 'безлимит' },
      { dishId: 'lemonade-berry', name: 'Ягодный лимонад', desc: 'Микс ягод, лимон, мята, содовая', category: 'Напитки', qty: 'безлимит' },
      { dishId: 'seabuckthorn-tea', name: 'Облепиховый чай', desc: 'Облепиха, имбирь, мёд', category: 'Напитки', qty: 'безлимит' },
      { dishId: 'welcome-drink', name: 'Игристое (welcome)', desc: 'Игристое брют + канапе с лососем', category: 'Бар', qty: '1 бокал' },
    ],
  },
];

// ═══════════════════════════════════════════
// ЕДИНЫЙ КАТАЛОГ
// ═══════════════════════════════════════════

export const ALL_TARIFF_OFFERS: Record<string, TariffOffer[]> = {
  svadba: SVADBA,
  korporativ: KORPORATIV,
  vypusknoy: VYPUSKNOY,
  chastnoe: CHASTNOE,
  detskoe: DETSKOE,
  'chef-at-home': CHEF_AT_HOME,
  'coffee-break': COFFEE_BREAK,
};

export function getOffersForEvent(eventId: string): TariffOffer[] {
  return ALL_TARIFF_OFFERS[eventId] || [];
}

// ═══════════════════════════════════════════
// ЕДИНЫЙ ИСТОЧНИК ЦЕН ПО ФОРМАТАМ
// Используется в ConstructorWizard, pricing, menu — чтобы цены не расходились
// ═══════════════════════════════════════════

// Маппинг формат → событие-источник тарифов (для цен и составов)
export const FORMAT_TO_EVENT: Record<Format, string> = {
  banket: 'svadba',
  furshet: 'chastnoe',
  'coffee-break': 'coffee-break',
  'mobile-furshet': 'chastnoe',
  detskoe: 'detskoe',
  'chef-at-home': 'chef-at-home',
};

// Базовые цены для формата coffee-break (нет в tariff-offers как отдельных)
export const COFFEE_BREAK_PRICES: Record<Tier, number> = {
  economy: 390,
  standard: 1450,
  premium: 1950,
  luxury: 2450,
};

export interface FormatPriceTier {
  tier: Tier;
  pricePerGuest: number;
  minGuests: number;
  // Ссылка на оффер (если есть) для подгрузки состава в конструкторе
  eventId?: string;
}

// Получить 4 тарифа для формата — берёт из PRICE_PER_GUEST (единый источник)
// Возвращает состав из tariff-offers если есть
export function getPricesForFormat(format: Format): FormatPriceTier[] {
  const eventId = FORMAT_TO_EVENT[format];
  const offers = ALL_TARIFF_OFFERS[eventId] || [];

  const tierOrder: Tier[] = ['economy', 'standard', 'premium', 'luxury'];
  return tierOrder.map(tier => {
    const offer = offers.find(o => o.tier === tier);
    return {
      tier,
      pricePerGuest: offer?.pricePerGuest ?? 0,
      minGuests: offer?.minGuests ?? 10,
      eventId,
    };
  }).filter(p => p.pricePerGuest > 0); // не показывать недоступные тиры (например, luxury для furshet)
}