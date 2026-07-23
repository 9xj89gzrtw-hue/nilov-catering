import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Халяль-меню',
  description: 'Кейтеринг Халяль-меню в Санкт-Петербурге. Цены, состав, аллергены. Закажите онлайн.',
  alternates: { canonical: '/menu/halal' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
