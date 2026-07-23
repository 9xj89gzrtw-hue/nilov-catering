import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Фуршет',
  description: 'Кейтеринг Фуршет в Санкт-Петербурге. Цены, состав, аллергены. Закажите онлайн.',
  alternates: { canonical: '/menu/furshet' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
