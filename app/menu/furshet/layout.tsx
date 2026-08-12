import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Фуршет — кейтеринг в СПб — NiloV Catering' },
  description: 'Фуршетный кейтеринг в СПб: канапе, тарталетки, мини-бургеры. От 2 450 ₽/гость. 14 аллергенов маркированы. Веган, халяль, БГ-опции.',
  alternates: { canonical: '/menu/furshet', languages: { 'ru': '/menu/furshet', 'x-default': '/menu/furshet' } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
