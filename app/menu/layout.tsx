import type { Metadata } from 'next';
import { MenuJsonLd } from '@/app/JsonLd';

export const metadata: Metadata = {
  title: 'Меню кейтеринга',
  description: 'Полный каталог кейтеринг-меню: фуршет, банкет, кофе-брейк, халяль, веган, без глютена. 132 блюда с фото, аллергенами, составом.',
  alternates: { canonical: '/menu', languages: { 'ru': '/', 'en': '/en', 'x-default': '/' } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MenuJsonLd />
      {children}
    </>
  );
}
