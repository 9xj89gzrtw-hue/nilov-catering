import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Безглютеновое меню — кейтеринг <20 ppm — NiloV Catering' },
  description: 'Безглютеновый кейтеринг в СПб: 56 блюд <20 ppm (GFCO). Отдельная линия кухни, отдельная посуда. БГ-торт, БГ-капкейки, БГ-пицца. От 1 550 ₽/гость.',
  alternates: { canonical: '/menu/gluten-free', languages: { 'ru': '/menu/gluten-free', 'x-default': '/menu/gluten-free' } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
