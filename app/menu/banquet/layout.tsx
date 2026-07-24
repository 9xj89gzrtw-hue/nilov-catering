import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Банкет — кейтеринг в СПб',
  description: 'Банкетный кейтеринг в СПб: посадка за стол, официанты, классическая подача. От 3 950 ₽/гость. Свадьбы, корпоративы, юбилеи.',
  alternates: { canonical: '/menu/banquet', languages: { 'ru': '/', 'en': '/en' } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
