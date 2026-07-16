export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  category: string;
  categoryLabel: string;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  /** Allergens per TR TS 021/2011 (14 allergens). Empty array = none declared. */
  allergens?: string[];
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  image: string;
  imageAlt?: string;
  video?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  event: string;
  rating: number;
  text: string;
  avatar: string;
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialization: string;
  photo: string;
  bio: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  categoryLabel: string;
  width: number;
  height: number;
}

export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  pricePerPerson: number;
  pricePerGuest?: number;
  minGuests?: number;
  features: string[];
  isPopular?: boolean;
  includes?: string[];
  menuItems?: string[];
  /** Format group: furshet (фуршет), banket (банкет), kofe-breyk (кофе-брейк). */
  format: 'furshet' | 'banket' | 'kofe-breyk';
  /** Approx ready-to-serve output per guest, e.g. "≈355 г + 250 мл". */
  exitWeight?: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export interface AdditionalService {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: "per-guest" | "fixed" | "per-hour";
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _IMG_WIDE = "/images/hero/catering-hero.jpg";

const AVATARS = [
  "/images/testimonials/avatar1.jpg",
  "/images/testimonials/avatar2.jpg",
  "/images/testimonials/avatar3.jpg",
  "/images/testimonials/avatar4.jpg",
  "/images/testimonials/avatar5.jpg",
  "/images/testimonials/avatar6.jpg",
  "/images/testimonials/avatar7.jpg",
];

const GALLERY_IMGS = [
  "/images/gallery/wedding-banquet.jpg",
  "/images/gallery/corporate-furshet.jpg",
  "/images/gallery/servirovka.jpg",
  "/images/gallery/dessert-table.jpg",
  "/images/gallery/show-station.jpg",
  "/images/gallery/banket.jpg",
  "/images/gallery/furshet-menu.jpg",
  "/images/gallery/cocktail.jpg",
  "/images/gallery/kids.jpg",
];

const TEAM_PHOTOS = [
  "/images/team/chef-nilov.jpg",
  "/images/team/art-director.jpg",
  "/images/team/manager.jpg",
  "/images/team/sommelier.jpg",
];

export const menuItems: MenuItem[] = [
  // ===== Канапе и закуски (9) =====
  {
    id: "k1",
    name: "Канапе с лососем и сливочным сыром",
    description: "Слабосолёный лосось, крем-чиз, укроп, чёрный хлеб",
    price: 120,
    weight: "25 г",
    category: "kanape",
    categoryLabel: "Канапе и закуски",
    isPopular: true,
    allergens: ["рыба", "молоко", "глютен"],
    calories: 65,
    proteins: 5,
    fats: 4,
    carbs: 4,
    image: "/images/menu/kanape/k1.jpg",
    imageAlt: "Канапе с лососем и сливочным сыром на чёрном хлебе — кейтеринг NiloV СПб",
  },
  {
    id: "k2",
    name: "Канапе с икрой красной",
    description: "Красная икра, сливочное масло, бородинский хлеб",
    price: 180,
    weight: "25 г",
    category: "kanape",
    categoryLabel: "Канапе и закуски",
    isPopular: true,
    allergens: ["рыба", "молоко", "глютен"],
    calories: 70,
    proteins: 5,
    fats: 5,
    carbs: 4,
    image: "/images/menu/kanape/k2.jpg",
    imageAlt: "Канапе с красной икрой на бородинском хлебе — премиум-кейтеринг Санкт-Петербург",
  },
  {
    id: "k3",
    name: "Тарталетка с салатом «Оливье»",
    description: "Классический оливье с курицей в песочной тарталетке",
    price: 90,
    weight: "30 г",
    category: "kanape",
    categoryLabel: "Канапе и закуски",
    allergens: ["яйца", "молоко", "глютен", "сельдерей"],
    calories: 75,
    proteins: 4,
    fats: 5,
    carbs: 6,
    image: "/images/menu/kanape/k3.jpg",
    imageAlt: "Тарталетка с салатом оливье в песочной корзиночке — кейтеринг NiloV",
  },
  {
    id: "k4",
    name: "Канапе с ветчиной и сыром",
    description: "Пармская ветчина, моцарелла, черри",
    price: 100,
    weight: "25 г",
    category: "kanape",
    categoryLabel: "Канапе и закуски",
    allergens: ["молоко", "глютен"],
    calories: 70,
    proteins: 5,
    fats: 4,
    carbs: 4,
    image: "/images/menu/kanape/k4.jpg",
    imageAlt: "Канапе с пармской ветчиной и моцареллой — фуршетный кейтеринг СПб",
  },
  {
    id: "k5",
    name: "Рулетик из лаваша с курицей",
    description: "Куриная грудка, овощи, соус «Цезарь»",
    price: 85,
    weight: "35 г",
    category: "kanape",
    categoryLabel: "Канапе и закуски",
    allergens: ["глютен", "молоко", "яйца", "горчица"],
    calories: 80,
    proteins: 6,
    fats: 4,
    carbs: 7,
    image: "/images/menu/kanape/k5.jpg",
    imageAlt: "Рулетик из лаваша с курицей и овощами — кейтеринг на выезд СПб",
  },
  {
    id: "k6",
    name: "Канапе с креветкой и авокадо",
    description: "Тигровая креветка, авокадо, лайм, чиабатта",
    price: 150,
    weight: "30 г",
    category: "kanape",
    categoryLabel: "Канапе и закуски",
    allergens: ["ракообразные", "глютен", "молоко"],
    calories: 75,
    proteins: 5,
    fats: 4,
    carbs: 5,
    image: "/images/menu/kanape/k6.jpg",
    imageAlt: "Канапе с тигровой креветкой и авокадо — премиум-кейтеринг NiloV",
  },
  {
    id: "k7",
    name: "Брускетта с томатами и базиликом",
    description: "Чиабатта, томаты, моцарелла, базилик",
    price: 95,
    weight: "40 г",
    category: "kanape",
    categoryLabel: "Канапе и закуски",
    isVegetarian: true,
    allergens: ["глютен", "молоко"],
    calories: 110,
    proteins: 4,
    fats: 4,
    carbs: 14,
    image: "/images/menu/kanape/k7.jpg",
    imageAlt: "Брускетта с томатами моцареллой и базиликом — итальянский кейтеринг СПб",
  },
  {
    id: "k8",
    name: "Канапе с сыром бри и виноградом",
    description: "Сыр бри, виноград, мёд, грецкий орех",
    price: 130,
    weight: "30 г",
    category: "kanape",
    categoryLabel: "Канапе и закуски",
    isVegetarian: true,
    allergens: ["молоко", "орехи"],
    calories: 95,
    proteins: 4,
    fats: 6,
    carbs: 7,
    image: "/images/menu/kanape/k8.jpg",
    imageAlt: "Канапе с сыром бри виноградом и мёдом — сырная тарелка кейтеринг",
  },
  {
    id: "k9",
    name: "Канапе «Капрезе» с песто",
    description: "Моцарелла, томаты, базилик, песто",
    price: 140,
    weight: "25 г",
    category: "kanape",
    categoryLabel: "Канапе и закуски",
    isVegetarian: true,
    allergens: ["молоко", "глютен", "орехи"],
    calories: 80,
    proteins: 4,
    fats: 6,
    carbs: 4,
    image: "/images/menu/kanape/k9.jpg",
    imageAlt: "Капрезе на шпажке с песто — итальянская закуска кейтеринг NiloV",
  },

  // ===== Салаты (9) =====
  {
    id: "s1",
    name: "«Цезарь» с курицей",
    description: "Куриная грудка, романо, пармезан, гренки",
    price: 280,
    weight: "150 г",
    category: "salaty",
    categoryLabel: "Салаты",
    isPopular: true,
    allergens: ["яйца", "молоко", "глютен", "рыба", "орехи"],
    calories: 240,
    proteins: 22,
    fats: 14,
    carbs: 8,
    image: "/images/menu/salaty/s1.jpg",
    imageAlt: "Салат Цезарь с курицей гренками и пармезаном — кейтеринг СПб",
  },
  {
    id: "s2",
    name: "Греческий салат",
    description: "Овощи, фета, оливки, оливковое масло",
    price: 250,
    weight: "150 г",
    category: "salaty",
    categoryLabel: "Салаты",
    isVegetarian: true,
    allergens: ["молоко"],
    calories: 180,
    proteins: 6,
    fats: 14,
    carbs: 10,
    image: "/images/menu/salaty/s2.jpg",
    imageAlt: "Греческий салат с фетой оливками и овощами — кейтеринг NiloV",
  },
  {
    id: "s3",
    name: "Салат с лососем и авокадо",
    description: "Слабосолёный лосось, авокадо, микс салатов",
    price: 380,
    weight: "150 г",
    category: "salaty",
    categoryLabel: "Салаты",
    isPopular: true,
    allergens: ["рыба", "молоко"],
    calories: 260,
    proteins: 18,
    fats: 18,
    carbs: 6,
    image: "/images/menu/salaty/s3.jpg",
    imageAlt: "Салат с слабосолёным лососем и авокадо — премиум-кейтеринг СПб",
  },
  {
    id: "s4",
    name: "«Оливье» классический",
    description: "Курица, картофель, морковь, яйца, огурцы",
    price: 220,
    weight: "150 г",
    category: "salaty",
    categoryLabel: "Салаты",
    allergens: ["яйца", "молоко", "сельдерей", "горчица"],
    calories: 220,
    proteins: 10,
    fats: 14,
    carbs: 14,
    image: "/images/menu/salaty/s4.jpg",
    imageAlt: "Классический оливье с курицей — традиционный салат кейтеринг",
  },
  {
    id: "s5",
    name: "«Капрезе»",
    description: "Моцарелла, томаты, базилик, бальзамик",
    price: 290,
    weight: "150 г",
    category: "salaty",
    categoryLabel: "Салаты",
    isVegetarian: true,
    allergens: ["молоко"],
    calories: 200,
    proteins: 10,
    fats: 14,
    carbs: 8,
    image: "/images/menu/salaty/s5.jpg",
    imageAlt: "Капрезе с моцареллой томатами и бальзамиком — кейтеринг NiloV",
  },
  {
    id: "s6",
    name: "Салат с тигровыми креветками",
    description: "Креветки, манго, авокадо, чили-лайм",
    price: 420,
    weight: "150 г",
    category: "salaty",
    categoryLabel: "Салаты",
    allergens: ["ракообразные", "молоко"],
    calories: 220,
    proteins: 18,
    fats: 12,
    carbs: 10,
    image: "/images/menu/salaty/s6.jpg",
    imageAlt: "Салат с тигровыми креветками манго и авокадо — премиум-кейтеринг",
  },
  {
    id: "s7",
    name: "Тёплый салат с говядиной",
    description: "Говяжья вырезка, шпинат, шампиньоны",
    price: 350,
    weight: "160 г",
    category: "salaty",
    categoryLabel: "Салаты",
    allergens: [],
    calories: 240,
    proteins: 22,
    fats: 14,
    carbs: 6,
    image: "/images/menu/salaty/s7.jpg",
    imageAlt: "Тёплый салат с говяжьей вырезкой и шпинатом — кейтеринг СПб",
  },
  {
    id: "s8",
    name: "«Селёдка под шубой»",
    description: "Сельдь, свёкла, картофель, морковь",
    price: 200,
    weight: "150 г",
    category: "salaty",
    categoryLabel: "Салаты",
    allergens: ["рыба", "яйца", "молоко"],
    calories: 210,
    proteins: 10,
    fats: 14,
    carbs: 14,
    image: "/images/menu/salaty/s8.jpg",
    imageAlt: "Селёдка под шубой — классический русский салат кейтеринг NiloV",
  },
  {
    id: "s9",
    name: "Салат с клубникой и фетой",
    description: "Клубника, фета, шпинат, кедровые орехи, бальзамик",
    price: 320,
    weight: "150 г",
    category: "salaty",
    categoryLabel: "Салаты",
    isVegetarian: true,
    isPopular: true,
    allergens: ["молоко", "орехи"],
    calories: 200,
    proteins: 8,
    fats: 14,
    carbs: 12,
    image: "/images/menu/salaty/s9.jpg",
    imageAlt: "Салат с клубникой фетой и кедровыми орехами — летний кейтеринг",
  },

  // ===== Горячие блюда (8) =====
  {
    id: "h1",
    name: "Сибас на гриле",
    description: "Сибас, лимон, розмарин, овощи гриль",
    price: 650,
    weight: "200 г",
    category: "goryachee",
    categoryLabel: "Горячие блюда",
    isPopular: true,
    allergens: ["рыба"],
    calories: 280,
    proteins: 32,
    fats: 14,
    carbs: 4,
    image: "/images/menu/goryachee/h1.jpg",
    imageAlt: "Сибас на гриле с лимоном и розмарином — рыбное блюдо кейтеринг СПб",
  },
  {
    id: "h2",
    name: "Медальоны из говяжьей вырезки",
    description: "Говяжья вырезка, соус «красное вино»",
    price: 720,
    weight: "220 г",
    category: "goryachee",
    categoryLabel: "Горячие блюда",
    isPopular: true,
    allergens: ["сульфиты"],
    calories: 360,
    proteins: 38,
    fats: 18,
    carbs: 6,
    image: "/images/menu/goryachee/h2.jpg",
    imageAlt: "Медальоны из говяжьей вырезки в соусе красное вино — премиум-кейтеринг",
  },
  {
    id: "h3",
    name: "Куриная грудка в соусе песто",
    description: "Курица, песто, черри, моцарелла",
    price: 480,
    weight: "200 г",
    category: "goryachee",
    categoryLabel: "Горячие блюда",
    allergens: ["молоко", "орехи", "глютен"],
    calories: 280,
    proteins: 32,
    fats: 14,
    carbs: 8,
    image: "/images/menu/goryachee/h3.jpg",
    imageAlt: "Куриная грудка в соусе песто с черри — кейтеринг NiloV СПб",
  },
  {
    id: "h4",
    name: "Лосось в сливочно-шпинатном соусе",
    description: "Лосось, сливки, шпинат, чеснок",
    price: 590,
    weight: "200 г",
    category: "goryachee",
    categoryLabel: "Горячие блюда",
    isPopular: true,
    allergens: ["рыба", "молоко"],
    calories: 340,
    proteins: 30,
    fats: 22,
    carbs: 6,
    image: "/images/menu/goryachee/h4.jpg",
    imageAlt: "Лосось в сливочно-шпинатном соусе — рыбное блюдо кейтеринг",
  },
  {
    id: "h5",
    name: "Свиная вырезка с яблоками",
    description: "Свиная вырезка, запечённые яблоки",
    price: 520,
    weight: "220 г",
    category: "goryachee",
    categoryLabel: "Горячие блюда",
    allergens: [],
    calories: 360,
    proteins: 32,
    fats: 18,
    carbs: 14,
    image: "/images/menu/goryachee/h5.jpg",
    imageAlt: "Свиная вырезка с запечёнными яблоками — мясное блюдо кейтеринг СПб",
  },
  {
    id: "h6",
    name: "Дорадо с цитрусовыми",
    description: "Дорадо, апельсин, лимон, тимьян",
    price: 620,
    weight: "200 г",
    category: "goryachee",
    categoryLabel: "Горячие блюда",
    allergens: ["рыба"],
    calories: 270,
    proteins: 30,
    fats: 13,
    carbs: 6,
    image: "/images/menu/goryachee/h6.jpg",
    imageAlt: "Дорадо на гриле с цитрусовыми — средиземноморский кейтеринг",
  },
  {
    id: "h7",
    name: "Бефстроганов",
    description: "Говядина, грибы, сметанный соус",
    price: 450,
    weight: "200 г",
    category: "goryachee",
    categoryLabel: "Горячие блюда",
    allergens: ["молоко", "сельдерей"],
    calories: 320,
    proteins: 28,
    fats: 18,
    carbs: 10,
    image: "/images/menu/goryachee/h7.jpg",
    imageAlt: "Бефстроганов из говядины с грибами — классическое блюдо кейтеринг",
  },
  {
    id: "h8",
    name: "Овощное рагу по-летнему",
    description: "Кабачки, баклажаны, перец, томаты",
    price: 380,
    weight: "200 г",
    category: "goryachee",
    categoryLabel: "Горячие блюда",
    isVegetarian: true,
    isGlutenFree: true,
    allergens: [],
    calories: 140,
    proteins: 4,
    fats: 8,
    carbs: 16,
    image: "/images/menu/goryachee/h8.jpg",
    imageAlt: "Овощное рагу по-летнему с кабачками и баклажанами — веганский кейтеринг",
  },

  // ===== Десерты (9) =====
  {
    id: "d1",
    name: "Тирамису",
    description: "Маскарпоне, савоярди, кофе, какао",
    price: 250,
    weight: "120 г",
    category: "deserty",
    categoryLabel: "Десерты",
    isPopular: true,
    allergens: ["молоко", "яйца", "глютен", "сульфиты"],
    calories: 340,
    proteins: 7,
    fats: 22,
    carbs: 30,
    image: "/images/menu/deserty/d1.jpg",
    imageAlt: "Тирамису с маскарпоне и кофе — итальянский десерт кейтеринг NiloV",
  },
  {
    id: "d2",
    name: "Чизкейк «Нью-Йорк»",
    description: "Сливочный сыр, песочное тесто, ягоды",
    price: 230,
    weight: "120 г",
    category: "deserty",
    categoryLabel: "Десерты",
    isPopular: true,
    allergens: ["молоко", "яйца", "глютен"],
    calories: 320,
    proteins: 6,
    fats: 20,
    carbs: 30,
    image: "/images/menu/deserty/d2.jpg",
    imageAlt: "Чизкейк Нью-Йорк с ягодами — десерт кейтеринг СПб",
  },
  {
    id: "d3",
    name: "Эклеры с заварным кремом",
    description: "Заварное тесто, ванильный крем",
    price: 180,
    weight: "60 г",
    category: "deserty",
    categoryLabel: "Десерты",
    allergens: ["яйца", "молоко", "глютен"],
    calories: 220,
    proteins: 5,
    fats: 12,
    carbs: 24,
    image: "/images/menu/deserty/d3.jpg",
    imageAlt: "Эклеры с заварным кремом — французский десерт кейтеринг",
  },
  {
    id: "d4",
    name: "Макаронс ассорти",
    description: "5 вкусов: малина, фисташка, шоколад",
    price: 300,
    weight: "100 г",
    category: "deserty",
    categoryLabel: "Десерты",
    allergens: ["орехи", "яйца", "молоко"],
    calories: 380,
    proteins: 7,
    fats: 18,
    carbs: 48,
    image: "/images/menu/deserty/d4.jpg",
    imageAlt: "Макаронс ассорти малина фисташка шоколад — премиум-десерт кейтеринг",
  },
  {
    id: "d5",
    name: "Фруктовая тарелка",
    description: "Клубника, черника, дыня, манго",
    price: 280,
    weight: "200 г",
    category: "deserty",
    categoryLabel: "Десерты",
    isVegetarian: true,
    isGlutenFree: true,
    allergens: [],
    calories: 110,
    proteins: 2,
    fats: 1,
    carbs: 26,
    image: "/images/menu/deserty/d5.jpg",
    imageAlt: "Фруктовая тарелка клубника черника дыня — свежие фрукты кейтеринг",
  },
  {
    id: "d6",
    name: "Шоколадный фондан",
    description: "Тёмный шоколад, мороженое",
    price: 290,
    weight: "120 г",
    category: "deserty",
    categoryLabel: "Десерты",
    isPopular: true,
    allergens: ["молоко", "яйца", "глютен", "соя"],
    calories: 380,
    proteins: 6,
    fats: 24,
    carbs: 36,
    image: "/images/menu/deserty/d6.jpg",
    imageAlt: "Шоколадный фондан с мороженым — тёплый десерт кейтеринг NiloV",
  },
  {
    id: "d7",
    name: "Панкейки с ягодами",
    description: "Пышные панкейки, клубника, сироп",
    price: 240,
    weight: "180 г",
    category: "deserty",
    categoryLabel: "Десерты",
    allergens: ["яйца", "молоко", "глютен"],
    calories: 360,
    proteins: 8,
    fats: 14,
    carbs: 48,
    image: "/images/menu/deserty/d7.jpg",
    imageAlt: "Панкейки с клубникой и сиропом — утренний десерт кейтеринг СПб",
  },
  {
    id: "d8",
    name: "Торт «Наполеон»",
    description: "Слоёное тесто, заварной крем",
    price: 220,
    weight: "120 г",
    category: "deserty",
    categoryLabel: "Десерты",
    allergens: ["яйца", "молоко", "глютен"],
    calories: 340,
    proteins: 6,
    fats: 18,
    carbs: 38,
    image: "/images/menu/deserty/d8.jpg",
    imageAlt: "Торт Наполеон с заварным кремом — классический десерт кейтеринг",
  },
  {
    id: "d9",
    name: "Шоколадный брауни с солёной карамелью",
    description: "Тёмный шоколад, карамель",
    price: 130,
    weight: "45 г",
    category: "deserty",
    categoryLabel: "Десерты",
    isPopular: true,
    allergens: ["яйца", "молоко", "глютен", "соя"],
    calories: 200,
    proteins: 3,
    fats: 12,
    carbs: 22,
    image: "/images/menu/deserty/d9.jpg",
    imageAlt: "Шоколадный брауни с солёной карамелью — десерт кейтеринг NiloV",
  },

  // ===== Напитки (4, безалкогольные) =====
  {
    id: "n1",
    name: "Морс клюквенный",
    description: "Натуральный клюквенный морс",
    price: 80,
    weight: "200 мл",
    category: "napitki",
    categoryLabel: "Напитки",
    isVegetarian: true,
    isGlutenFree: true,
    allergens: [],
    calories: 80,
    proteins: 0,
    fats: 0,
    carbs: 20,
    image: "/images/menu/napitki/n1.jpg",
    imageAlt: "Клюквенный морс в стакане — натуральный напиток кейтеринг СПб",
  },
  {
    id: "n2",
    name: "Лимонад домашний",
    description: "Лимон, мята, имбирь, мёд",
    price: 100,
    weight: "300 мл",
    category: "napitki",
    categoryLabel: "Напитки",
    isVegetarian: true,
    isGlutenFree: true,
    isPopular: true,
    allergens: [],
    calories: 90,
    proteins: 0,
    fats: 0,
    carbs: 22,
    image: "/images/menu/napitki/n2.jpg",
    imageAlt: "Домашний лимонад с лимоном мятой и имбирём — кейтеринг NiloV",
  },
  {
    id: "n3",
    name: "Чай ассорти",
    description: "Чёрный, зелёный, травяной",
    price: 60,
    weight: "300 мл",
    category: "napitki",
    categoryLabel: "Напитки",
    isVegetarian: true,
    isGlutenFree: true,
    allergens: [],
    calories: 5,
    proteins: 0,
    fats: 0,
    carbs: 1,
    image: "/images/menu/napitki/n3.jpg",
    imageAlt: "Чай ассорти чёрный зелёный травяной — кейтеринг напитки СПб",
  },
  {
    id: "n4",
    name: "Кофе эспрессо",
    description: "Свежеобжаренный кофе",
    price: 90,
    weight: "30 мл",
    category: "napitki",
    categoryLabel: "Напитки",
    isVegetarian: true,
    isGlutenFree: true,
    allergens: [],
    calories: 5,
    proteins: 0,
    fats: 0,
    carbs: 0,
    image: "/images/menu/napitki/n4.jpg",
    imageAlt: "Эспрессо кофе в чашке — кофейная станция кейтеринг NiloV",
  },

  // ===== Сезонные хиты (7) =====
  {
    id: "se1",
    name: "Костный бульон с пирожком",
    description: "Наваристый бульон shooter + пирожок",
    price: 180,
    weight: "150 мл + 20 г",
    category: "sezonnye",
    categoryLabel: "Сезонные хиты",
    isNew: true,
    isPopular: true,
    allergens: ["глютен", "яйца", "сельдерей"],
    calories: 120,
    proteins: 8,
    fats: 6,
    carbs: 10,
    image: "/images/menu/sezonnye/se1.jpg",
    imageAlt: "Костный бульон с пирожком — ЗОЖ-кейтеринг NiloV СПб",
  },
  {
    id: "se2",
    name: "Крем-суп из тыквы с семечками",
    description: "Нежный крем-суп, тыквенные семечки",
    price: 160,
    weight: "150 мл",
    category: "sezonnye",
    categoryLabel: "Сезонные хиты",
    isVegetarian: true,
    isNew: true,
    allergens: ["молоко", "орехи"],
    calories: 110,
    proteins: 4,
    fats: 7,
    carbs: 10,
    image: "/images/menu/sezonnye/se2.jpg",
    imageAlt: "Крем-суп из тыквы с семечками — вегетарианский кейтеринг осень",
  },
  {
    id: "se3",
    name: "Том-ям с креветкой (shooter)",
    description: "Острый том-ям с тигровой креветкой",
    price: 220,
    weight: "150 мл",
    category: "sezonnye",
    categoryLabel: "Сезонные хиты",
    isNew: true,
    isPopular: true,
    allergens: ["ракообразные", "рыба", "соя"],
    calories: 90,
    proteins: 6,
    fats: 4,
    carbs: 6,
    image: "/images/menu/sezonnye/se3.jpg",
    imageAlt: "Том-ям с креветкой в шотере — азиатский кейтеринг NiloV",
  },
  {
    id: "se4",
    name: "Поке с лососем и авокадо",
    description: "Лосось, авокадо, рис, кунжут, соевый соус",
    price: 390,
    weight: "250 г",
    category: "sezonnye",
    categoryLabel: "Сезонные хиты",
    isGlutenFree: true,
    isNew: true,
    isPopular: true,
    allergens: ["рыба", "соя", "кунжут"],
    calories: 320,
    proteins: 22,
    fats: 14,
    carbs: 28,
    image: "/images/menu/sezonnye/se4.jpg",
    imageAlt: "Поке с лососем авокадо и киноа — ЗОЖ-кейтеринг СПб",
  },
  {
    id: "se5",
    name: "Будда-боул с тофу",
    description: "Тофу, киноа, овощи, кунжутная заправка",
    price: 350,
    weight: "280 г",
    category: "sezonnye",
    categoryLabel: "Сезонные хиты",
    isVegetarian: true,
    isGlutenFree: true,
    isNew: true,
    allergens: ["соя", "кунжут"],
    calories: 280,
    proteins: 14,
    fats: 10,
    carbs: 32,
    image: "/images/menu/sezonnye/se5.jpg",
    imageAlt: "Будда-боул с тофу и овощами — веганский кейтеринг NiloV",
  },
  {
    id: "se6",
    name: "Бао с томлёной свининой",
    description: "Свинина су-вид, соус хойсин, кунжут",
    price: 150,
    weight: "60 г",
    category: "sezonnye",
    categoryLabel: "Сезонные хиты",
    isNew: true,
    isPopular: true,
    allergens: ["глютен", "соя", "кунжут"],
    calories: 180,
    proteins: 9,
    fats: 8,
    carbs: 18,
    image: "/images/menu/sezonnye/se6.jpg",
    imageAlt: "Бао с томлёной свининой — азиатский фьюжн кейтеринг СПб",
  },
  {
    id: "se7",
    name: "Кедровый раф",
    description: "Эспрессо, сливки, кедровые орехи",
    price: 180,
    weight: "200 мл",
    category: "sezonnye",
    categoryLabel: "Сезонные хиты",
    isNew: true,
    allergens: ["молоко", "орехи"],
    calories: 180,
    proteins: 4,
    fats: 12,
    carbs: 14,
    image: "/images/menu/sezonnye/se7.jpg",
    imageAlt: "Кедровый раф кофе — премиум-напиток кейтеринг NiloV",
  },

  // ===== BBQ и гриль (5) =====
  {
    id: "b1",
    name: "Шашлык из свинины классический",
    description: "Свиная шея, луковый маринад, на углях",
    price: 550,
    weight: "250 г",
    category: "bbq",
    categoryLabel: "BBQ и гриль",
    isPopular: true,
    allergens: ["горчица", "сельдерей"],
    calories: 420,
    proteins: 32,
    fats: 28,
    carbs: 6,
    image: "/images/menu/bbq/b1.jpg",
    imageAlt: "Шашлык из свинины на углях — летний BBQ кейтеринг СПб",
  },
  {
    id: "b2",
    name: "Шашлык из курицы",
    description: "Куриное филе в йогуртном маринаде, на углях",
    price: 420,
    weight: "200 г",
    category: "bbq",
    categoryLabel: "BBQ и гриль",
    allergens: ["молоко"],
    calories: 280,
    proteins: 32,
    fats: 12,
    carbs: 6,
    image: "/images/menu/bbq/b2.jpg",
    imageAlt: "Шашлык из курицы в йогуртном маринаде — BBQ кейтеринг NiloV",
  },
  {
    id: "b3",
    name: "Люля-кебаб из баранины",
    description: "Баранина, лук, специи, на углях, лаваш",
    price: 580,
    weight: "250 г",
    category: "bbq",
    categoryLabel: "BBQ и гриль",
    allergens: ["глютен", "горчица"],
    calories: 460,
    proteins: 28,
    fats: 32,
    carbs: 12,
    image: "/images/menu/bbq/b3.jpg",
    imageAlt: "Люля-кебаб из баранины на углях с лавашем — восточный кейтеринг",
  },
  {
    id: "b4",
    name: "Овощи гриль",
    description: "Кабачки, баклажаны, перец, томаты, шампиньоны",
    price: 350,
    weight: "200 г",
    category: "bbq",
    categoryLabel: "BBQ и гриль",
    isVegetarian: true,
    isGlutenFree: true,
    allergens: [],
    calories: 130,
    proteins: 4,
    fats: 8,
    carbs: 14,
    image: "/images/menu/bbq/b4.jpg",
    imageAlt: "Овощи гриль кабачки баклажаны перец — веганский BBQ кейтеринг",
  },
  {
    id: "b5",
    name: "Стейк «Рибай» на гриле",
    description: "Рибай, соль, перец, розмарин, на углях",
    price: 890,
    weight: "300 г",
    category: "bbq",
    categoryLabel: "BBQ и гриль",
    isPopular: true,
    allergens: [],
    calories: 650,
    proteins: 48,
    fats: 48,
    carbs: 2,
    image: "/images/menu/bbq/b5.jpg",
    imageAlt: "Стейк рибай на гриле с розмарином — премиум-мясо кейтеринг СПб",
    video: "/videos/menu/b5.mp4",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Анна Петрова",
    event: "Свадьба, 120 гостей",
    rating: 5,
    text: "Невероятно вкусно и красиво! Гости были в восторге от подачи и качества блюд. Отдельное спасибо за внимание к деталям и индивидуальный подход к нашему меню.",
    avatar: AVATARS[0],
    date: "2024-11-15",
  },
  {
    id: "2",
    name: "Дмитрий Козлов",
    event: "Корпоратив, 80 гостей",
    rating: 5,
    text: "Заказывали кейтеринг для годового собрания компании. Всё было организовано безупречно — от фуршета до десертов. Коллеги до сих пор вспоминают стейк!",
    avatar: AVATARS[1],
    date: "2024-10-22",
  },
  {
    id: "3",
    name: "Елена Смирнова",
    event: "День рождения, 40 гостей",
    rating: 5,
    text: "Отличный сервис и потрясающая еда. Особенно порадовали десерты — крем-брюле просто тает во рту. Обязательно закажем ещё!",
    avatar: AVATARS[2],
    date: "2024-09-08",
  },
  {
    id: "4",
    name: "Михаил Волков",
    event: "Выпускной вечер, 200 гостей",
    rating: 4,
    text: "Огромный объём работы выполнен на высшем уровне. Всё было горячим, свежим и вовремя. Спасибо команде Nilov Catering за профессионализм!",
    avatar: AVATARS[3],
    date: "2024-08-30",
  },
  {
    id: "5",
    name: "Ольга Новикова",
    event: "Юбилей, 60 гостей",
    rating: 5,
    text: "Замечательный кейтеринг! Шеф-повар подобрал идеальное меню с учётом всех пожеланий. Сервис на высоте — отдельное спасибо официантам.",
    avatar: AVATARS[4],
    date: "2024-12-01",
  },
  {
    id: "6",
    name: "Александр Иванов",
    event: "Конференция, 150 гостей",
    rating: 5,
    text: "Третий раз обращаемся в Nilov Catering для проведения конференций. Всегда стабильное качество, пунктуальность и вкуснейшая еда. Рекомендуем!",
    avatar: AVATARS[5],
    date: "2024-11-10",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Николай Нилов",
    role: "Основатель и шеф-повар",
    specialization: "Европейская и авторская кухня",
    photo: TEAM_PHOTOS[0],
    bio: "Более 15 лет опыта в сфере кейтеринга. Закончил кулинарную академию в Париже. Работал в ведущих ресторанах Санкт-Петербурга и Москвы.",
  },
  {
    id: "2",
    name: "Мария Кузнецова",
    role: "Арт-директор по подаче",
    specialization: "Сервировка и декор",
    photo: TEAM_PHOTOS[1],
    bio: "Специалист по сервировке и оформлению банкетов. Создаёт уникальные концепции оформления для каждого мероприятия.",
  },
  {
    id: "3",
    name: "Андрей Соколов",
    role: "Менеджер мероприятий",
    specialization: "Координация и логистика",
    photo: TEAM_PHOTOS[2],
    bio: "Организует мероприятия любой сложности. Отвечает за координацию команды и безупречное проведение каждого заказа.",
  },
  {
    id: "4",
    name: "Екатерина Белова",
    role: "Сомелье и бар-менеджер",
    specialization: "Напитки и бар",
    photo: TEAM_PHOTOS[3],
    bio: "Дипломированный сомелье с опытом работы в лучших ресторанах. Подбирает идеальные напитки к каждому меню.",
  },
];

export const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "За какое время нужно сделать заказ?",
    answer: "Рекомендуем обращаться минимум за 7-14 дней до мероприятия. Для крупных заказов (от 100 человек) — за 3-4 недели. В отдельных случаях мы можем принять срочный заказ за 3-5 дней.",
  },
  {
    id: "2",
    question: "Какой минимальный заказ?",
    answer: "Минимальный заказ зависит от типа мероприятия. Для фуршета — от 20 человек, для банкета с полным обслуживанием — от 30 человек. Сверьтесь с нашими тарифами или свяжитесь с менеджером для уточнения.",
  },
  {
    id: "3",
    question: "Можно ли изменить меню?",
    answer: "Да, мы гибко подстраиваемся под ваши пожелания. Вы можете выбрать блюда из нашего меню, предложить свои варианты или заказать полностью индивидуальное меню. Шеф-повар проконсультирует по сочетаемости блюд.",
  },
  {
    id: "4",
    question: "Работаете ли вы с аллергиками?",
    answer: "Безусловно. Мы учитываем все виды аллергий и пищевых непереносимостей. В нашем меню есть вегетарианские, безглютеновые и другие специальные позиции. Обязательно сообщите менеджеру о любых ограничениях.",
  },
  {
    id: "5",
    question: "Что входит в стоимость?",
    answer: "В стоимость включается: приготовление блюд, доставка, сервировка, посуда и приборы, обслуживание официантами. Дополнительно можно заказать: аренду оборудования, декор, флористику, звукотехнику.",
  },
  {
    id: "6",
    question: "Как происходит оплата?",
    answer: "Оплата производится в два этапа: 50% предоплата при заключении договора и 50% за 2 дня до мероприятия. Принимаем безналичную оплату для юридических лиц и перевод для физических лиц.",
  },
  {
    id: "7",
    question: "Доставляете ли вы за город?",
    answer: "Да, мы выезжаем за город в радиусе 100 км от Санкт-Петербурга. Доставка за город оплачивается дополнительно в зависимости от расстояния. Также доступны выезды в другие регионы по договорённости.",
  },
  {
    id: "8",
    question: "Есть ли у вас лицензии и сертификаты?",
    answer: "Да, наша компания имеет все необходимые лицензии, санитарные сертификаты и допуски для организации общественного питания. Все сотрудники проходят регулярные медосмотры.",
  },
  {
    id: "9",
    question: "Можете ли вы организовать кейтеринг на открытой площадке?",
    answer: "Да, у нас есть большой опыт работы на открытых площадках. Мы обеспечиваем мобильные кухни, маркизы и всё необходимое оборудование для комфортной работы в любых условиях.",
  },
  {
    id: "10",
    question: "Какова политика отмены заказа?",
    answer: "При отмене более чем за 7 дней — полный возврат предоплаты. При отмене за 3-7 дней — удерживается 30%. При отмене менее чем за 3 дня — предоплата не возвращается. Подробности в договоре.",
  },
];

export const pricingPackages: PricingPackage[] = [
  // ===== Фуршет (4 тарифа, min 20) =====
  {
    id: "furshet-econom",
    name: "Эконом",
    description: "Бюджетный фуршет для корпоративов и дней рождений. Оформление: стандартное.",
    pricePerPerson: 2450,
    pricePerGuest: 2450,
    minGuests: 20,
    format: "furshet",
    exitWeight: "≈355 г + 250 мл",
    menuItems: ["k1", "k3", "k4", "k7", "k5", "n1", "n3"],
    features: [
      "5 холодных закусок на гостя",
      "3 горячие закуски на гостя",
      "Морс / лимонад + чай / кофе",
      "Обслуживание официантами",
      "Сервировка и посуда",
      "Доставка в пределах КАД включена",
    ],
    includes: [
      "Канапе с лососем",
      "Тарталетка с оливье",
      "Мини-бургер с курицей",
      "Куриные шашлычки якитори",
      "Овощи гриль",
    ],
  },
  {
    id: "furshet-standart",
    name: "Стандарт",
    description: "Оптимальный выбор для большинства мероприятий. Оформление: стильное.",
    pricePerPerson: 3450,
    pricePerGuest: 3450,
    minGuests: 20,
    isPopular: true,
    format: "furshet",
    exitWeight: "≈520 г + 250 мл",
    menuItems: ["k1", "k2", "k3", "k8", "k7", "k4", "k5", "s1", "d9", "n1", "n2", "n3"],
    features: [
      "7 холодных закусок на гостя",
      "Салат «Цезарь» (1 на 4 гостей)",
      "4 горячие закуски на гостя",
      "Десерт: шоколадный брауни",
      "Морс / лимонад + чай / кофе + вода",
      "Обслуживание и сервировка",
    ],
    includes: [
      "Канапе с лососем",
      "Канапе с икрой",
      "Салат «Цезарь»",
      "Мини-бургер со свининой",
      "Профитроль с утиным риетом",
      "Шоколадный брауни",
    ],
  },
  {
    id: "furshet-premium",
    name: "Премиум",
    description: "Для стильных мероприятий, свадеб и юбилеев. Оформление: премиальное, ярусная подача.",
    pricePerPerson: 4350,
    pricePerGuest: 4350,
    minGuests: 20,
    format: "furshet",
    exitWeight: "≈770 г + 300 мл",
    menuItems: ["k1", "k2", "k6", "k8", "k9", "k7", "s3", "s9", "b1", "b4", "h1", "d9"],
    features: [
      "9 холодных закусок на гостя",
      "2 салата (на 4 гостей)",
      "5 горячих закусок на гостя",
      "2 десерта на гостя",
      "4 вида напитков (вкл. авторский лимонад)",
      "Премиальная ярусная подача",
    ],
    includes: [
      "Канапе с лососем и каперсами",
      "Канапе с креветкой и авокадо",
      "Салат с лососем и авокадо",
      "Шашлык из свинины",
      "Рыбные стейки на гриле",
      "Шоколадный брауни + веррин чиа",
    ],
  },
  {
    id: "furshet-lyux",
    name: "Люкс",
    description: "VIP-мероприятия: авторская подача, шеф-повар на площадке. Оформление: люкс, архитектурное освещение.",
    pricePerPerson: 5350,
    pricePerGuest: 5350,
    minGuests: 20,
    format: "furshet",
    exitWeight: "≈1230 г + 400 мл",
    menuItems: ["k1", "k2", "k6", "k8", "k9", "b1", "b5", "h1", "d6", "d4"],
    features: [
      "12 холодных закусок на гостя",
      "2 салата (на 4 гостей)",
      "7 горячих на гостя (вкл. стейк «Рибай»)",
      "3 десерта на гостя",
      "5 видов напитков + свежевыжатый сок",
      "Show-cooking станция на выбор",
      "Шеф-повар на площадке",
    ],
    includes: [
      "Мясное плато",
      "Ассорти сыров",
      "Стейк «Рибай» на гриле",
      "Сибас на гриле",
      "Шоколадный фондан + макаронс",
      "Ризотто в пармезане / телятина на камне",
    ],
  },

  // ===== Банкет (3 тарифа, min 15) =====
  {
    id: "banket-klassik",
    name: "Классик",
    description: "Классический посидельный банкет с полным обслуживанием официантов.",
    pricePerPerson: 4470,
    pricePerGuest: 4470,
    minGuests: 15,
    format: "banket",
    exitWeight: "≈700 г + 300 мл",
    menuItems: ["s1", "h7", "d8", "n1", "n3"],
    features: [
      "Суп на выбор: окрошка / борщ (250 мл)",
      "Мясное плато + салат «Цезарь»",
      "Бефстроганов из говядины (200 г)",
      "Гарнир: пюре / гречка (150 г)",
      "Торт «Наполеон» (120 г)",
      "Чай, кофе, морс, вода (300 мл)",
      "Посидельная подача, официанты",
    ],
    includes: [
      "Мясное плато",
      "Салат «Цезарь»",
      "Бефстроганов",
      "Торт «Наполеон»",
    ],
  },
  {
    id: "banket-premium",
    name: "Премиум",
    description: "Праздничный банкет с выбором горячих и show-cooking. Координатор и бармен.",
    pricePerPerson: 5970,
    pricePerGuest: 5970,
    minGuests: 15,
    format: "banket",
    exitWeight: "≈1020 г + 300 мл",
    menuItems: ["s3", "h4", "h1", "d1", "n2", "n3"],
    features: [
      "2 супа (холодный борщ + грибной «Ленинградский»)",
      "3 холодные закуски (вкл. сырное ассорти)",
      "2 горячих на выбор: форель / брискет",
      "2 гарнира (запечённые овощи + картофель)",
      "2 десерта: яблочный тарт + тирамису",
      "Авторский лимонад, чай, кофе, морс",
      "Координатор и бармен",
    ],
    includes: [
      "Мясное плато",
      "Сырное ассорти с мёдом и орехами",
      "Салат с лососем и авокадо",
      "Форель с картофельным муссом",
      "Брискет с пюре из пастернака",
      "Тирамису",
    ],
  },
  {
    id: "banket-vip",
    name: "VIP",
    description: "Роскошный банкет для особых случаев. Шеф-повар на площадке, бармен-шоу включено.",
    pricePerPerson: 6970,
    pricePerGuest: 6970,
    minGuests: 15,
    format: "banket",
    exitWeight: "≈1670 г + 400 мл",
    menuItems: ["h2", "h1", "d6", "d2", "d4", "n2", "n1"],
    features: [
      "Крем-суп из белых грибов (250 мл)",
      "4 холодные закуски (премиум мясное плато, сыры, утка, ростбиф)",
      "3 горячих: медальоны в соусе «красное вино», сибас, грибной кокот",
      "3 гарнира (пюре из пастернака, картофель, овощи гриль)",
      "3 десерта: фондан, чизкейк, макаронс",
      "Show-cooking станция (включена)",
      "Бармен-шоу",
      "Лимонады, морсы, соки, чай, кофе, вода (400 мл)",
    ],
    includes: [
      "Мясное плато премиум",
      "Сырная тарелка",
      "Утиная грудка с грушей",
      "Медальоны из говяжьей вырезки",
      "Сибас на гриле",
      "Шоколадный фондан + макаронс",
    ],
  },

  // ===== Кофе-брейк (4 тарифа, min 10) =====
  {
    id: "kofe-breyk-legkiy",
    name: "Лёгкий",
    description: "Минимальный кофе-брейк: кофе/чай + 2 вида выпечки. Длительность: 30 мин.",
    pricePerPerson: 950,
    pricePerGuest: 950,
    minGuests: 10,
    format: "kofe-breyk",
    exitWeight: "≈120 г + напитки",
    menuItems: ["n3", "n4", "d3"],
    features: [
      "Кофе / чай без ограничения",
      "2 вида выпечки: круассан, маффин",
      "Сервировка кофейной станции",
      "Длительность перерыва — 30 мин",
    ],
    includes: [
      "Круассан",
      "Маффин",
      "Кофе, чай",
    ],
  },
  {
    id: "kofe-breyk-standart",
    name: "Стандарт",
    description: "Кофе/чай + 3 вида выпечки и 1 канапе с лососем. Длительность: 45 мин.",
    pricePerPerson: 1450,
    pricePerGuest: 1450,
    minGuests: 10,
    format: "kofe-breyk",
    exitWeight: "≈180 г + напитки",
    menuItems: ["n3", "n4", "d3", "k1"],
    features: [
      "Кофе / чай без ограничения",
      "3 вида выпечки: круассан, эклер, маффин",
      "1 канапе с лососем на гостя",
      "Длительность перерыва — 45 мин",
    ],
    includes: [
      "Круассан",
      "Эклер",
      "Маффин",
      "Канапе с лососем",
    ],
  },
  {
    id: "kofe-breyk-premium",
    name: "Премиум",
    description: "Расширенный кофе-брейк: 4 вида выпечки, 2 канапе, фруктовая тарелка. Длительность: 60 мин.",
    pricePerPerson: 1950,
    pricePerGuest: 1950,
    minGuests: 10,
    format: "kofe-breyk",
    exitWeight: "≈300 г + напитки",
    menuItems: ["n3", "n4", "d3", "k1", "k8", "d5"],
    features: [
      "Кофе / чай без ограничения",
      "4 вида выпечки",
      "2 канапе (лосось, бри)",
      "Фруктовая тарелка",
      "Длительность перерыва — 60 мин",
    ],
    includes: [
      "4 вида выпечки",
      "Канапе с лососем",
      "Канапе с бри",
      "Фруктовая тарелка",
    ],
  },
  {
    id: "kofe-breyk-lyux",
    name: "Люкс",
    description: "Премиальный кофе-брейк: 5 видов выпечки, 3 канапе, фрукты, макаронс. Длительность: 90 мин.",
    pricePerPerson: 2450,
    pricePerGuest: 2450,
    minGuests: 10,
    format: "kofe-breyk",
    exitWeight: "≈400 г + напитки",
    menuItems: ["n3", "n4", "d3", "k1", "k2", "k6", "d5", "d4"],
    features: [
      "Кофе / чай без ограничения",
      "5 видов выпечки",
      "3 канапе (лосось, икра, креветка)",
      "Фруктовая тарелка",
      "Макаронс ассорти",
      "Длительность перерыва — 90 мин",
    ],
    includes: [
      "5 видов выпечки",
      "Канапе с лососем",
      "Канапе с икрой",
      "Канапе с креветкой",
      "Фруктовая тарелка",
      "Макаронс",
    ],
  },
];

export const services: Service[] = [
  {
    id: "1",
    slug: "weddings",
    title: "Свадебный кейтеринг",
    description: "Создаём гастрономическое настроение для самого важного дня. От изысканных канапе до многосоставного банкета — каждое блюдо станет украшением вашего торжества.",
    image: "/images/gallery/wedding-banquet.jpg",
    features: [
      "Дегустация меню перед мероприятием",
      "Индивидуальное проектирование меню",
      "Приветственный фуршет для гостей",
      "Десертный стол и торт по заказу",
      "Детское меню при необходимости",
      "Координация с ведущим и фотографом",
    ],
  },
  {
    id: "2",
    slug: "corporate",
    title: "Корпоративный кейтеринг",
    description: "Организуем питание для деловых мероприятий любого масштаба — от офисных фуршетов до масштабных конференций и корпоративов.",
    image: "/images/gallery/corporate-furshet.jpg",
    features: [
      "Бизнес-ланчи и кофе-брейки",
      "Фуршет для конференций",
      "Питание для командировочных",
      "Сезонные спецпредложения",
      "Безналичная оплата для юрлиц",
      "Налоговые документы",
    ],
  },
  {
    id: "3",
    slug: "private",
    title: "Частные мероприятия",
    description: "Дни рождения, юбилеи, семейные праздники и романтические ужины. Превратим ваш праздник в незабываемое гастрономическое путешествие.",
    image: "/images/gallery/dessert-table.jpg",
    features: [
      "Тематические меню",
      "Кейтеринг на дому",
      "Выездная кухня",
      "Декор и оформление столов",
      "Аниматоры и шоу-программы",
      "Фотозона и видеосъёмка",
    ],
  },
  {
    id: "4",
    slug: "buffets",
    title: "Фуршеты",
    description: "Коктейльные приёмы, презентации и лёгкие форматы. Элегантные канапе, шоу-станции и авторские коктейли для любой аудитории.",
    image: "/images/gallery/show-station.jpg",
    features: [
      "Канапе и мини-закуски",
      "Шоу-станции на выбор",
      "Авторские коктейли",
      "Кофе-брейк обслуживание",
      "Мобильные бары",
      "Эко-посуда по запросу",
    ],
  },
];

export const additionalServices: AdditionalService[] = [
  {
    id: "1",
    name: "Декор столов",
    description: "Профессиональное оформление столов цветами, свечами и текстилем",
    price: 500,
    priceType: "per-guest",
  },
  {
    id: "2",
    name: "Аренда оборудования",
    description: "Мобильная кухня, маркизы, обогреватели, холодильное оборудование",
    price: 15000,
    priceType: "fixed",
  },
  {
    id: "3",
    name: "Шоу-программа шефа",
    description: "Приготовление блюд на глазах у гостей с комментариями шеф-повара",
    price: 3000,
    priceType: "per-hour",
  },
  {
    id: "4",
    name: "Флористика",
    description: "Цветочные композиции для столов, фуршетных зон и фотозон",
    price: 800,
    priceType: "per-guest",
  },
];

export const stats: Stat[] = [
  { value: 800, suffix: "+", label: "Мероприятий" },
  { value: 12, suffix: "", label: "Лет опыта" },
  { value: 50, suffix: "+", label: "Корпоративных клиентов" },
  { value: 98, suffix: "%", label: "Довольных клиентов" },
];

export const galleryImages: GalleryImage[] = [
    { id: "g1", src: GALLERY_IMGS[0], alt: "Свадебный банкет", category: "weddings", categoryLabel: "Свадьбы", width: 800, height: 600 },
    { id: "g2", src: GALLERY_IMGS[1], alt: "Корпоративный фуршет", category: "corporate", categoryLabel: "Корпоративы", width: 800, height: 600 },
    { id: "g3", src: GALLERY_IMGS[2], alt: "Выездная сервировка", category: "private", categoryLabel: "Частные мероприятия", width: 800, height: 600 },
    { id: "g4", src: GALLERY_IMGS[3], alt: "Десертный стол", category: "weddings", categoryLabel: "Свадьбы", width: 800, height: 600 },
    { id: "g5", src: GALLERY_IMGS[4], alt: "Шоу-станция", category: "corporate", categoryLabel: "Корпоративы", width: 800, height: 600 },
    { id: "g6", src: GALLERY_IMGS[5], alt: "Банкетная подача", category: "private", categoryLabel: "Частные мероприятия", width: 800, height: 600 },
    { id: "g7", src: GALLERY_IMGS[6], alt: "Фуршетное меню", category: "weddings", categoryLabel: "Свадьбы", width: 800, height: 600 },
    { id: "g8", src: GALLERY_IMGS[7], alt: "Коктейльный приём", category: "corporate", categoryLabel: "Корпоративы", width: 800, height: 600 },
    { id: "g9", src: GALLERY_IMGS[8], alt: "Детское меню", category: "private", categoryLabel: "Частные мероприятия", width: 800, height: 600 },
    { id: "g10", src: GALLERY_IMGS[9], alt: "Шведский стол", category: "weddings", categoryLabel: "Свадьбы", width: 800, height: 600 },
    { id: "g11", src: GALLERY_IMGS[10], alt: "Сезонное меню", category: "corporate", categoryLabel: "Корпоративы", width: 800, height: 600 },
    { id: "g12", src: GALLERY_IMGS[11], alt: "Праздничный стол", category: "private", categoryLabel: "Частные мероприятия", width: 800, height: 600 },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "tendencii-keyteringa-2026",
    title: "Тренды кейтеринга 2026 года",
    excerpt: "Гастрономические тренды 2026: ИИ-меню, устойчивое развитие, иммерсивные гастрономические опыты и новые форматы питания на мероприятиях.",
    content: `Гастрономическая индустрия переживает трансформацию, и 2026 год стал переломным для кейтеринга в России и мире. Мы проанализировали десятки мероприятий и выделили ключевые тренды.

1. ИИ-персонализация меню
Алгоритмы анализируют предпочтения гостей и предлагают оптимальные комбинации блюд. Мы внедрили конструктор меню на сайте, который помогает собрать идеальный набор для любого мероприятия.

2. Устойчивое развитие и нулевые отходы
Эко-подход стал стандартом: компостируемая посуда, локальные продукты с короткой цепочкой поставок, минимизация пищевых отходов. Клиенты требуют экологической ответственности.

3. Иммерсивные гастрономические опыты
Гости хотят не просто есть, а проживать впечатления. Шоу-станции с интерактивным приготовлением, дегустации с сомелье, молекулярная кухня — всё это обязательные элементы премиального кейтеринга.

4. Здоровое питание как норма
Безглютеновые, веганские, кето- и палео-опции присутствуют в каждом меню. Чёткая маркировка аллергенов и БЖУ на каждом блюде — теперь требование, а не опция.

5. Фьюжн с азиатскими и латиноамериканскими акцентами
Японские канапе, мексиканские тако-бары, тайские супы на фуршете — глобальные вкусы прочно вошли в российский кейтеринг.

6. Комфорт-фуд премиум-класса
Бургеры с трюфелем, ремесленные пиццы, авторские рамены —Simple блюда с премиальными ингредиентами и безупречным исполнением.`,
    image: "/images/gallery/banket.jpg",
    author: "Николай Нилов",
    date: "2026-06-15",
    category: "Тренды",
  },
  {
    id: "2",
    slug: "kak-vybrat-menyu-dlya-svadby",
    title: "Как выбрать меню для свадьбы: полное руководство",
    excerpt: "Пошаговый гид по подбору свадебного меню — от количества позиций до учёта диетических предпочтений гостей.",
    content: `Выбор меню для свадьбы — один из важнейших этапов подготовки. От правильного подбора блюд зависит впечатление гостей о торжестве.

Определите формат питания
Первый шаг — решить, какой формат подходит вашему мероприятию: фуршет, полусидячий или полноценный банкет. Это определит количество и тип блюд.

Рассчитайте количество позиций
Для фуршета рекомендуем 6-8 позиций на человека. Для банкета — 3-4 закуски, 2 горячих блюда, гарнир и 2 десерта.

Учтите предпочтения гостей
Обязательно уточните у гостей наличие аллергий и диетических ограничений. Подготовьте вегетарианские и безглютеновые альтернативы.

Дегустация
Не пропускайте этап дегустации! Это возможность попробовать блюда, скорректировать вкусы и убедиться в качестве.

Напитки
Рассчитывайте 2-3 бокала на человека в первый час и 1-2 бокала в последующие часы. Обязательно предусмотрите безалкогольные варианты.`,
    image: "/images/gallery/furshet-menu.jpg",
    author: "Мария Кузнецова",
    date: "2026-05-20",
    category: "Гайды",
  },
  {
    id: "3",
    slug: "oshibki-pri-organizacii-keyteringa",
    title: "10 частых ошибок при организации кейтеринга",
    excerpt: "Рассказываем о главных ошибках, которые допускают заказчики при планировании кейтеринга, и как их избежать.",
    content: `Организация кейтеринга — сложный процесс, и даже небольшие ошибки могут испортить впечатление от мероприятия. Вот 10 самых частых промахов.

1. Недостаточное количество еды
Всегда заказывайте на 10-15% больше расчётного количества. Лучше остаться с остатками, чем столкнуться с нехваткой.

2. Игнорирование сезонности
Используйте сезонные продукты — они вкуснее, свежее и дешевле.

3. Забытые диетические ограничения
Всегда собирайте информацию об аллергиях и диетах заранее.

4. Экономия на обслуживании
Качественный сервис официантов — половина успеха мероприятия.

5. Слишком сложное меню
Лучше 8 идеально приготовленных блюд, чем 15 средних.

6. Последний момент заказа
Срочные заказы всегда дороже и ограничены в выборе.

7. Отсутствие дегустации
Дегустация — обязательный этап.

8. Неучтённая логистика
Продумайте доставку, разгрузку и размещение кухни заранее.

9. Забытый план Б
Всегда имейте запасной план на случай непогоды или других форс-мажоров.

10. Экономия на напитках
Гармонично подобранные напитки завершают гастрономическое впечатление.`,
    image: "/images/gallery/cocktail.jpg",
    author: "Андрей Соколов",
    date: "2026-04-10",
    category: "Советы",
  },
  {
    id: "4",
    slug: "sezonnye-ingredienty-letо-2026",
    title: "Летние ингредиенты: что предложить гостям в жару",
    excerpt: "Свежие сезонные продукты июля — от томатов черри до белых персиков — и как мы превращаем их в шедевры кейтеринга.",
    content: `Июль — пик сезона свежих продуктов. Мы рассказываем, какие ингредиенты сейчас на пике формы и как они звучат в банкетном меню.

Томаты и базилик
Томаты черри с моцареллой, базиликом и бальзамическим кремом — классика, которая никогда не подведёт. Мы добавляем в это блюдо копчёный буррату для глубины вкуса.

Арбуз и фета
Арбузные канапе с фетой, мятой и reduz de винегретом — освежающий хит этого сезона. Нежная текстура арбуза контрастирует с солёной фетой.

Белые персики и прошутто
Канапе с белым персиком, прошутто ди Парма и каперсами — идеальный баланс сладкого и солёного.

Летние супы
Гаспачо, окрошка на квасе с треской, тайский том-ям — холодные супы спасают в жару и придают разнообразие фуршету.`,
    image: "/images/gallery/kids.jpg",
    author: "Николай Нилов",
    date: "2026-07-01",
    category: "Гастрономия",
  },
  {
    id: "5",
    slug: "korporativnyj-furshet-sekrety-uspeha",
    title: "Корпоративный фуршет: 7 секретов безупречного мероприятия",
    excerpt: "Как организовать питание для корпоративного мероприятия так, чтобы коллеги вспомнили гастрономию, а не формальности.",
    content: `Корпоративный кейтеринг — это не просто еда. Это инструмент создания атмосферы, который влияет на восприятие всего мероприятия. За 12 лет мы вывели формулу идеального корпоративного фуршета.

1. Вариативность меню
Минимум 8-10 позиций на человека. Учитывайте вегетарианцев, аллергиков и тех, кто соблюдает пост. Без вариантов — это неуважение к гостям.

2. Шоу-станции
Живые станции приготовления — фокальный пункт любого фуршета. Паста-станция, станция карве, тапас-бар — гости запоминают взаимодействие с поваром.

3. Тайминг подачи
Сервируйте волнами: закуски → горячее → десерты. Каждая волна — мини-событие, которое переключает внимание гостей.

4. Кофе-брейк с характером
Капучино из свежеобжаренных зёрен, домашняя выпечка, макаронс — инвестируйте в кофе-брейк, это запоминается.

5. Безалкогольные коктейли
Тренд 2026 — авторские безалкогольные коктейли. Они выглядят празднично и позволяют всем чувствовать себя частью вечеринки.

6. Фуд-пейринг с презентацией
Если на мероприятии есть презентации или выступления, подбирайте лёгкие закуски, которые не мешают восприятию.

7. Упаковка с заботой
Коробочки с канапе на вынос — гость уходит с приятным впечатлением и вашим брендом в руках.`,
    image: "/images/gallery/servirovka.jpg",
    author: "Мария Кузнецова",
    date: "2026-06-22",
    category: "Гайды",
  },
  {
    id: "6",
    slug: "deserty-na-zakaz-trendy-2026",
    title: "Тренды десертов 2026: от мини-пирожных до шоко-фонтанов",
    excerpt: "Десертный стол — финальный аккорд любого банкета. Обзор трендов и наших лучших авторских десертов.",
    content: `Десерт — это то, что гости вспоминают последним и самым ярким. В 2026 году тренды десертного кейтеринга направлены на интерактивность и визуальный вау-эффект.

Мини-десерты
Макаронс, профитроли, тарталетки, чизкейк-биты — маленькие порции позволяют попробовать больше вкусов. Правило: 4-5 мини-десертов на человека.

Шоколадные фонтаны и станции
Классический шоколадный фонтан вернулся, но в премиальном исполнении: бельгийский шоколад, свежие ягоды, маршмеллоу ручной работы.

Авторские кейки
Мини-кейки с индивидуальным декором — хит свадеб и дней рождения. Едимый принт с логотипом компании для корпоративов.

Мороженое-станции
Сорбеты, джелато, мягкое мороженое с топпингами — освежающий вариант для летних мероприятий.

Без сахара
Стевия, эритрит, monk fruit — десерты без сахара стали полноценными по вкусу и появились в каждом нашем меню.`,
    image: "/images/gallery/wedding-banquet.jpg",
    author: "Николай Нилов",
    date: "2026-06-08",
    category: "Гастрономия",
  },
];

export const navItems: NavItem[] = [
  { label: "Услуги", href: "/services" },
  { label: "Меню", href: "/menu" },
  { label: "Галерея", href: "/gallery" },
  { label: "О нас", href: "/about" },
  { label: "Контакты", href: "/contact" },
];

export const mobileNavItems: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "Услуги", href: "/services" },
  { label: "Меню", href: "/menu" },
  { label: "Галерея", href: "/gallery" },
  { label: "О нас", href: "/about" },
  { label: "Контакты", href: "/contact" },
];

export const menuCategories = [
  { value: "all", label: "Все" },
  { value: "kanape", label: "Канапе и закуски" },
  { value: "salaty", label: "Салаты" },
  { value: "goryachee", label: "Горячие блюда" },
  { value: "deserty", label: "Десерты" },
  { value: "napitki", label: "Напитки" },
  { value: "sezonnye", label: "Сезонные хиты" },
  { value: "bbq", label: "BBQ и гриль" },
];

export const menuTypeFilters = [
  { value: "all", label: "Все" },
  { value: "vegetarian", label: "Вегетарианское" },
  { value: "gluten-free", label: "Без глютена" },
  { value: "new", label: "Новинки" },
  { value: "popular", label: "Популярное" },
];

export const galleryCategories = [
  { value: "all", label: "Все" },
  { value: "weddings", label: "Свадьбы" },
  { value: "corporate", label: "Корпоративы" },
  { value: "private", label: "Частные" },
  { value: "details", label: "Детали" },
];

export const eventTypes = [
  { value: "wedding", label: "Свадьба" },
  { value: "corporate", label: "Корпоративное мероприятие" },
  { value: "birthday", label: "День рождения" },
  { value: "anniversary", label: "Юбилей" },
  { value: "conference", label: "Конференция" },
  { value: "private", label: "Частное мероприятие" },
  { value: "other", label: "Другое" },
];

export const serviceFormats = [
  { value: "buffet", label: "Фуршет" },
  { value: "banquet", label: "Банкет" },
  { value: "semi-banquet", label: "Полусидячий формат" },
  { value: "cocktail", label: "Коктейльная вечеринка" },
];