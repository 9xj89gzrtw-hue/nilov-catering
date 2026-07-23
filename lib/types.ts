// Типы данных NiloV Catering — единый источник правды
// Основа: 07_CALCULATOR_SPEC, 08_CONSTRUCTOR_SPEC, 04_BLOCKS, 23_MENU_STRATEGY

export type Format =
  | 'furshet'
  | 'banket'
  | 'coffee-break'
  | 'mobile-furshet'
  | 'detskoe'
  | 'chef-at-home';

export type Tier = 'economy' | 'standard' | 'premium' | 'luxury';

export const TIER_LABEL: Record<Tier, string> = {
  economy: 'Эконом',
  standard: 'Стандарт',
  premium: 'Расширенный',
  luxury: 'Максимальный',
};

export type Diet = 'vegan' | 'gluten-free' | 'halal';

export type Allergen =
  | 'gluten'
  | 'crustaceans'
  | 'eggs'
  | 'fish'
  | 'peanuts'
  | 'soy'
  | 'milk'
  | 'nuts'
  | 'celery'
  | 'mustard'
  | 'sesame'
  | 'sulphites'
  | 'lupin'
  | 'molluscs';

export const ALLERGEN_LABEL: Record<Allergen, string> = {
  gluten: 'Глютен',
  crustaceans: 'Ракообразные',
  eggs: 'Яйца',
  fish: 'Рыба',
  peanuts: 'Арахис',
  soy: 'Соя',
  milk: 'Молоко',
  nuts: 'Орехи',
  celery: 'Сельдерей',
  mustard: 'Горчица',
  sesame: 'Кунжут',
  sulphites: 'Сульфиты',
  lupin: 'Люпин',
  molluscs: 'Моллюски',
};

export interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
  video?: string;
  station: 'cold' | 'hot' | 'desserts' | 'drinks' | 'show';
  format: Format[];
  tier: Tier[];
  pricePerGuest: number;
  servingsPerGuest: number;
  allergens: Allergen[];
  crossContact?: boolean;
  dietBadges: Diet[];
  childFriendly: boolean;
  kcal?: number;
  proteins?: number;
  fats?: number;
  carbs?: number;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  priceType: 'fixed' | 'perGuest';
  price: number;
  category: 'service' | 'entertainment' | 'decoration' | 'tech';
  formats: Format[];
  image?: string;
}

export interface Package {
  id: string;
  format: Format;
  tier: Tier;
  name: string;
  pricePerGuest: number;
  dishes: string[]; // Dish IDs
  description: string;
  recommended?: boolean;
}

export type FactStatus = 'verified' | 'pending';

export interface TrustProofItem {
  id: string;
  claim: string;
  value: number;
  suffix: string;
  status: FactStatus;
  disclaimer?: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  status: FactStatus;
  disclaimer?: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  text: string;
  event: string;
  date: string;
  rating: number;
  video?: string;
  status: FactStatus;
  disclaimer?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
}

export interface Event {
  id: string;
  type: Format;
  title: string;
  description: string;
  image: string;
  guests: number;
  date: string;
  venue: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SocialLink {
  platform: 'vk' | 'instagram' | 'telegram' | 'whatsapp' | 'youtube' | 'rutube';
  url: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  domain: string;
  phone: string;
  phoneTel: string;
  whatsapp: string;
  email: string;
  address: string;
  ogImage: string;
}
