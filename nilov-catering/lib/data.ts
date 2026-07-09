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
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  image: string;
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

// Menu item images by category — real food photography from Unsplash
const MENU_IMGS = {
  zakuski: [
    "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=450&fit=crop",
  ],
  goryachee: [
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1432139509613-5c4255a1d197?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=450&fit=crop",
  ],
  garniry: [
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1598103442097-8b74f5352c4e?w=600&h=450&fit=crop",
  ],
  deserty: [
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=600&h=450&fit=crop",
  ],
  napitki: [
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&h=450&fit=crop",
  ],
  "set-meny": [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=450&fit=crop",
  ],
};

function menuImg(category: string, index: number): string {
  const imgs = (MENU_IMGS as Record<string, string[]>)[category] || MENU_IMGS.zakuski;
  return imgs[index % imgs.length];
}

const IMG_WIDE = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop";

const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
];

const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=700&fit=crop",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=900&fit=crop",
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=700&fit=crop",
];

const TEAM_PHOTOS = [
  "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=500&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=500&fit=crop&crop=face",
];

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Тартар из лосося",
    description: "Свежий лосось с авокадо, каперсами и домашними гренками",
    price: 890,
    weight: "150 г",
    category: "zakuski",
    categoryLabel: "Закуски",
    isPopular: true,
    calories: 220,
    proteins: 24,
    fats: 14,
    carbs: 8,
    image: menuImg("zakuski", 0),
  },
  {
    id: "2",
    name: "Брускетта с томатами",
    description: "Хрустящий хлеб с маринованными томатами, базиликом и моцареллой",
    price: 450,
    weight: "120 г",
    category: "zakuski",
    categoryLabel: "Закуски",
    isVegetarian: true,
    calories: 180,
    proteins: 8,
    fats: 7,
    carbs: 22,
    image: menuImg("zakuski", 1),
  },
  {
    id: "3",
    name: "Карпаччо из говядины",
    description: "Тонко нарезанная вырезка с рукколой, пармезаном и трюфельным маслом",
    price: 980,
    weight: "130 г",
    category: "zakuski",
    categoryLabel: "Закуски",
    isPopular: true,
    calories: 260,
    proteins: 28,
    fats: 16,
    carbs: 4,
    image: menuImg("zakuski", 2),
  },
  {
    id: "4",
    name: "Стейк рибай",
    description: "Мраморная говядина прожарки medium с соусом из розмарина и овощами гриль",
    price: 2490,
    weight: "300 г",
    category: "goryachee",
    categoryLabel: "Горячие блюда",
    isPopular: true,
    calories: 650,
    proteins: 52,
    fats: 42,
    carbs: 6,
    image: menuImg("goryachee", 0),
  },
  {
    id: "5",
    name: "Сёмга на гриле",
    description: "Филе сёмги с лимонным соусом, спаржей и мини-картофелем",
    price: 1890,
    weight: "250 г",
    category: "goryachee",
    categoryLabel: "Горячие блюда",
    isGlutenFree: true,
    calories: 420,
    proteins: 46,
    fats: 22,
    carbs: 8,
    image: menuImg("goryachee", 1),
  },
  {
    id: "6",
    name: "Куриная грудка фаршированная",
    description: "Куриная грудка со шпинатом, сыром горгонзола и ореховым соусом",
    price: 1290,
    weight: "220 г",
    category: "goryachee",
    categoryLabel: "Горячие блюда",
    isGlutenFree: true,
    calories: 340,
    proteins: 42,
    fats: 16,
    carbs: 6,
    image: menuImg("goryachee", 2),
  },
  {
    id: "7",
    name: "Картофель гранд",
    description: "Запечённый картофель с трюфельным маслом, сметаной и зеленью",
    price: 590,
    weight: "200 г",
    category: "garniry",
    categoryLabel: "Гарниры",
    isVegetarian: true,
    isGlutenFree: true,
    calories: 310,
    proteins: 6,
    fats: 14,
    carbs: 38,
    image: menuImg("garniry", 0),
  },
  {
    id: "8",
    name: "Овощи гриль ассорти",
    description: "Цуккини, баклажан, болгарский перец и помидоры с прованскими травами",
    price: 650,
    weight: "180 г",
    category: "garniry",
    categoryLabel: "Гарниры",
    isVegetarian: true,
    isGlutenFree: true,
    isNew: true,
    calories: 120,
    proteins: 4,
    fats: 8,
    carbs: 12,
    image: menuImg("garniry", 1),
  },
  {
    id: "9",
    name: "Рис басмати с шафраном",
    description: "Ароматный рис с шафраном, сливочным маслом и зеленью",
    price: 450,
    weight: "150 г",
    category: "garniry",
    categoryLabel: "Гарниры",
    isVegetarian: true,
    isGlutenFree: true,
    calories: 220,
    proteins: 5,
    fats: 4,
    carbs: 42,
    image: menuImg("garniry", 2),
  },
  {
    id: "10",
    name: "Тирамису классический",
    description: "Итальянский десерт с маскарпоне, савоярди и эспрессо",
    price: 590,
    weight: "150 г",
    category: "deserty",
    categoryLabel: "Десерты",
    isPopular: true,
    calories: 380,
    proteins: 8,
    fats: 22,
    carbs: 36,
    image: menuImg("deserty", 0),
  },
  {
    id: "11",
    name: "Крем-брюле",
    description: "Ванильный крем с карамельной корочкой и свежими ягодами",
    price: 520,
    weight: "120 г",
    category: "deserty",
    categoryLabel: "Десерты",
    isGlutenFree: true,
    calories: 290,
    proteins: 6,
    fats: 18,
    carbs: 28,
    image: menuImg("deserty", 1),
  },
  {
    id: "12",
    name: "Шоколадный фондан",
    description: "Тёплый шоколадный кекс с жидким центром и мороженым",
    price: 680,
    weight: "180 г",
    category: "deserty",
    categoryLabel: "Десерты",
    isVegetarian: true,
    isNew: true,
    calories: 450,
    proteins: 8,
    fats: 28,
    carbs: 42,
    image: menuImg("deserty", 2),
  },
  {
    id: "13",
    name: "Лимонад домашний",
    description: "Свежевыжатый лимонад с мятой и льдом",
    price: 290,
    weight: "300 мл",
    category: "napitki",
    categoryLabel: "Напитки",
    isVegetarian: true,
    isGlutenFree: true,
    calories: 90,
    proteins: 0,
    fats: 0,
    carbs: 22,
    image: menuImg("napitki", 0),
  },
  {
    id: "14",
    name: "Кофе американо",
    description: "Двойной эспрессо с горячей водой из арабики",
    price: 250,
    weight: "250 мл",
    category: "napitki",
    categoryLabel: "Напитки",
    isVegetarian: true,
    isGlutenFree: true,
    calories: 10,
    proteins: 0,
    fats: 0,
    carbs: 0,
    image: menuImg("napitki", 1),
  },
  {
    id: "15",
    name: "Вино белое сухое",
    description: "Шардоне, регион Бургундия, Франция",
    price: 890,
    weight: "150 мл",
    category: "napitki",
    categoryLabel: "Напитки",
    isVegetarian: true,
    isGlutenFree: true,
    calories: 120,
    proteins: 0,
    fats: 0,
    carbs: 3,
    image: menuImg("napitki", 2),
  },
  {
    id: "16",
    name: "Сет-меню «Премиум»",
    description: "Тартар из лосося, стейк рибай, картофель гранд, тирамису, лимонад",
    price: 4990,
    weight: "1000 г",
    category: "set-meny",
    categoryLabel: "Сет-меню",
    isPopular: true,
    calories: 1870,
    proteins: 106,
    fats: 104,
    carbs: 120,
    image: menuImg("napitki", 3),
  },
  {
    id: "17",
    name: "Сет-меню «Классика»",
    description: "Брускетта, куриная грудка, рис басмати, крем-брюле, кофе",
    price: 2990,
    weight: "900 г",
    category: "set-meny",
    categoryLabel: "Сет-меню",
    calories: 1240,
    proteins: 67,
    fats: 57,
    carbs: 122,
    image: menuImg("napitki", 4),
  },
  {
    id: "18",
    name: "Сет-меню «Вегетарианский»",
    description: "Брускетта, овощи гриль, картофель гранд, шоколадный фондан, лимонад",
    price: 2590,
    weight: "950 г",
    category: "set-meny",
    categoryLabel: "Сет-меню",
    isVegetarian: true,
    isNew: true,
    calories: 1350,
    proteins: 22,
    fats: 63,
    carbs: 168,
    image: menuImg("napitki", 5),
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
    name: "Дмитрий Нилов",
    role: "Основатель компании",
    specialization: "Кейтеринг и выездной ресторанный сервис",
    photo: TEAM_PHOTOS[0],
    bio: "С 2007 года создаёт кейтеринговую компанию, которая стала одной из ведущих в Санкт-Петербурге. Организовал более 3000 мероприятий — от камерных ужинов до торжеств на 500 гостей. Работал с международными брендами, включая Emporio Armani.",
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
    answer: "Да, мы гибко подстраиваемся под ваши пожелания. Вы можете выбрать блюда из нашего меню, предложить свои варианты или заказать полностью индивидуальное меню. Шеф-подарок проконсультирует по сочетаемости блюд.",
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
  {
    id: "basic",
    name: "Фуршет Эконом",
    description: "Идеально для небольших мероприятий и корпоративных встреч",
    pricePerPerson: 2450,
    includes: ["1", "2", "3", "4", "20", "21", "28", "29", "36"],
    pricePerGuest: 2450,
    minGuests: 20,
    features: [
      "Фуршет из 6 позиций",
      "Обслуживание официантами",
      "Сервировка и посуда",
      "Доставка и выезд кухни",
      "Меню без алкоголя",
    ],
    includes: [
      "3 вида закусок",
      "2 горячих блюда",
      "1 гарнир",
      "Безалкогольные напитки",
    ],
  },
  {
    id: "premium",
    name: "Фуршет Премиум",
    description: "Лучший выбор для свадеб, юбилеев и торжественных мероприятий",
    pricePerPerson: 3950,
    includes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "20", "21", "22", "23", "24", "25", "28", "29", "30", "31", "36", "37", "38", "39", "40"],
    pricePerGuest: 3950,
    minGuests: 30,
    isPopular: true,
    features: [
      "Банкет из 10 позиций",
      "Персональный шеф-повар",
      "Обслуживание 1 официант на 8 гостей",
      "Сервировка премиум-класса",
      "Приветственный фуршет",
      "Десертный стол",
    ],
    includes: [
      "4 вида закусок",
      "3 горячих блюда",
      "2 гарнира",
      "3 десерта",
      "Чайная станция",
      "Безалкогольные напитки",
    ],
  },
  {
    id: "vip",
    name: "Фуршет VIP",
    description: "Эксклюзивное обслуживание для особых мероприятий",
    pricePerPerson: 5350,
    pricePerGuest: 5350,
    minGuests: 50,
    features: [
      "Авторское меню от шефа",
      "Персональный шеф-повар и су-шеф",
      "Обслуживание 1 официант на 5 гостей",
      "Сервировка люкс",
      "Приветственный фуршет с шампанским",
      "Десертный стол с шоу-десертами",
      "Сомелье-сервис",
      "Координатор мероприятия",
    ],
    includes: [
      "6 видов закусок (включая авторские)",
      "4 горячих блюда",
      "3 гарнира",
      "4 десерта",
      "Чайная и кофейная станции",
      "Алкогольные и безалкогольные напитки",
    ],
  },
];

export const services: Service[] = [
  {
    id: "1",
    slug: "weddings",
    title: "Свадебный кейтеринг",
    description: "Создаём гастрономическое настроение для самого важного дня. От изысканных канапе до многосоставного банкета — каждое блюдо станет украшением вашего торжества.",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&h=800&fit=crop",
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
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop",
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
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=800&fit=crop",
    features: [
      "Тематические меню",
      "Кейтеринг на дому",
      "Выездная кухня",
      "Декор и оформление столов",
      "Аниматоры и шоу-программы",
      "Фотозона и видеосъёмка",
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
    description: "Цветочные композиции для столов и фотозон. При заказе свадебного банкета — до 4 композиций в подарок!",
    price: 0,
    priceType: "fixed",
  },
];

export const stats: Stat[] = [
  { value: 19, suffix: "", label: "Лет на рынке" },
  { value: 3000, suffix: "+", label: "Мероприятий" },
  { value: 50000, suffix: "+", label: "Довольных гостей" },
  { value: 99, suffix: "%", label: "Положительных отзывов" },
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
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
    author: "Дмитрий Нилов",
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
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
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
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
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
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
    author: "Дмитрий Нилов",
    date: "2026-07-01",
    category: "Гастрономия",
  },
  {
    id: "5",
    slug: "korporativnyj-furshet-sekrety-uspeha",
    title: "Корпоративный фуршет: 7 секретов безупречного мероприятия",
    excerpt: "Как организовать питание для корпоративного мероприятия так, чтобы коллеги вспомнили гастрономию, а не формальности.",
    content: `Корпоративный кейтеринг — это не просто еда. Это инструмент создания атмосферы, который влияет на восприятие всего мероприятия. За 19 лет мы вывели формулу идеального корпоративного фуршета.

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
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
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
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop",
    author: "Дмитрий Нилов",
    date: "2026-06-08",
    category: "Гастрономия",
  },
];

export const navItems: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "О нас", href: "/about" },
  { label: "Услуги", href: "/services" },
  { label: "Меню", href: "/menu" },
  { label: "Галерея", href: "/gallery" },
  { label: "Отзывы", href: "/testimonials" },
  { label: "Цены", href: "/pricing" },
  { label: "Контакты", href: "/contact" },
];

export const mobileNavItems: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "Меню", href: "/menu" },
  { label: "Калькулятор", href: "/menu#calculator" },
  { label: "Галерея", href: "/gallery" },
  { label: "Контакты", href: "/contact" },
];

export const menuCategories = [
  { value: "all", label: "Все" },
  { value: "zakuski", label: "Закуски" },
  { value: "goryachee", label: "Горячие блюда" },
  { value: "garniry", label: "Гарниры" },
  { value: "deserty", label: "Десерты" },
  { value: "napitki", label: "Напитки" },
  { value: "set-meny", label: "Сет-меню" },
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