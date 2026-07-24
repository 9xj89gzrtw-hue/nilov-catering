import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Банкет',
  description: 'Кейтеринг Банкет в Санкт-Петербурге. Цены, состав, аллергены. Закажите онлайн.',
  alternates: { canonical: '/menu/banquet' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
