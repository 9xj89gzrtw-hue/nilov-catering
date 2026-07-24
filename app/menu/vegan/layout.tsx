import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Веган-меню',
  description: 'Кейтеринг Веган-меню в Санкт-Петербурге. Цены, состав, аллергены. Закажите онлайн.',
  alternates: { canonical: '/menu/vegan' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
