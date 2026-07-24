import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Детское меню — кейтеринг для детских праздников',
  description: 'Детский кейтеринг в СПб: мини-пицца, капкейки, фрукты. Без орехов по умолчанию. Анафилаксия-протокол: EpiPen, отдельная смена. От 1 550 ₽/гость.',
  alternates: { canonical: '/menu/detskoe' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
