import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Дегустация меню',
  description: 'Запишитесь на бесплатную дегустацию меню для свадьбы или корпоратива.',
  alternates: { canonical: '/tasting' },
  robots: { index: false, follow: true },
};

export default function DegustatsiyaPage() {
  // 301 redirect to canonical /tasting page (W94-v33: deduplicate, was duplicate content)
  redirect('/tasting');
}
