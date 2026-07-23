import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Кофе-брейк',
  description: 'Кейтеринг coffee break в Санкт-Петербурге. Цены, состав, аллергены. Закажите онлайн.',
  alternates: { canonical: '/menu/coffee-break' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
