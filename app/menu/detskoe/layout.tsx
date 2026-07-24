import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Детское меню',
  description: 'Кейтеринг Детское меню в Санкт-Петербурге. Цены, состав, аллергены. Закажите онлайн.',
  alternates: { canonical: '/menu/detskoe' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
