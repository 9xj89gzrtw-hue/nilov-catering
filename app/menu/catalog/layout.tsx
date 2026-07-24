import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Каталог блюд — 132 позиции с фото и аллергенами',
  description: 'Полный каталог кейтеринг-блюд: 132 позиции с фото, составом, 14 аллергенов ТР ТС 022/2011, ХЕ для СД1. Фильтр по диете и аллергенам.',
  alternates: { canonical: '/menu/catalog' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
