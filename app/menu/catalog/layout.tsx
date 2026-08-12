import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Каталог блюд — 130 позиций с фото и аллергенами — NiloV Catering' },
  description: 'Полный каталог кейтеринг-блюд: 130 позиций с фото, составом, 14 аллергенов ТР ТС 022/2011, ХЕ для СД1. Фильтр по диете и аллергенам.',
  alternates: { canonical: '/menu/catalog', languages: { 'ru': '/menu/catalog', 'x-default': '/menu/catalog' } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
