import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Детское меню — кейтеринг для детских праздников — NiloV Catering' },
  description: 'Детский кейтеринг в СПб: мини-пицца, капкейки, фрукты. Без орехов по умолчанию. Анафилаксия-протокол: EpiPen, отдельная смена. От 1 550 ₽/гость.',
  alternates: { canonical: '/menu/detskoe', languages: { 'ru': '/menu/detskoe', 'x-default': '/menu/detskoe' } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
