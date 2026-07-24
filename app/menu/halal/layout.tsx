import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Халяль-кейтеринг',
  description: 'Халяль-меню: сертификация Совета муфтиев России, забой по обряду зибха, отдельное оборудование, без алкоголя. 14 блюд: шашлык, кюфта, плов, самса, бургеры.',
  alternates: { canonical: '/menu/halal' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
