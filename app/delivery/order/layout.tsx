import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Заказ доставки',
  description: 'Кейтеринг Заказ доставки в Санкт-Петербурге. Цены, состав, аллергены. Закажите онлайн.',
  alternates: { canonical: '/delivery/order', languages: { 'ru': '/delivery/order', 'en': '/en', 'x-default': '/delivery/order' } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
