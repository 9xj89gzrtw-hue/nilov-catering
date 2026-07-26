import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/gallery', languages: { 'ru': '/gallery', 'en': '/en', 'x-default': '/gallery' } },
  title: 'Галерея — фото мероприятий NiloV Catering',
  description: 'Фото с наших мероприятий: свадьбы, корпоративы, банкеты, фуршеты, детские праздники. Реальные события NiloV Catering.',
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
