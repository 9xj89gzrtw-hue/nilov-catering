import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Каталог блюд',
  description: 'Кейтеринг Каталог блюд в Санкт-Петербурге. Цены, состав, аллергены. Закажите онлайн.',
  alternates: { canonical: '/menu/catalog' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
