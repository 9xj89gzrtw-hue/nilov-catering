import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Без глютена',
  description: 'Кейтеринг gluten free в Санкт-Петербурге. Цены, состав, аллергены. Закажите онлайн.',
  alternates: { canonical: '/menu/gluten-free' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
