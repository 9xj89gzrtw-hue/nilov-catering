import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Веган-меню — растительный кейтеринг — NiloV Catering' },
  description: 'Веганский кейтеринг в СПб: 30 блюд без животных продуктов. Стейк из цветной капусты, будда-боул, чиа-пудинг. От 2 950 ₽/гость.',
  alternates: { canonical: '/menu/vegan', languages: { 'ru': '/menu/vegan', 'x-default': '/menu/vegan' } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
