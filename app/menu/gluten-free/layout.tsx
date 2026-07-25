import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Безглютеновое меню — кейтеринг <20 ppm',
  description: 'Безглютеновый кейтеринг в СПб: 53 блюда <20 ppm (GFCO). Отдельная линия кухни, отдельная посуда. БГ-торт, БГ-капкейки, БГ-пицца. От 1 550 ₽/гость.',
  alternates: { canonical: '/menu/gluten-free', languages: { 'ru': '/menu/gluten-free', 'en': '/en', 'x-default': '/menu/gluten-free' } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
