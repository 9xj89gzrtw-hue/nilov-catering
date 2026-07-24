import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Веган-меню — растительный кейтеринг',
  description: 'Веганский кейтеринг в СПб: 24 блюда без животных продуктов. Стейк из цветной капусты, будда-боул, чиа-пудинг. От 2 950 ₽/гость.',
  alternates: { canonical: '/menu/vegan', languages: { 'ru': '/', 'en': '/en' } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
