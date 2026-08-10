import type { Metadata } from 'next';
import EnLangFix from './EnLangFix';

export const metadata: Metadata = {
  title: 'Catering in St. Petersburg — from 390 ₽/guest',
  description: 'Restaurant-quality catering for any event in St. Petersburg since 2007. Buffet, banquet, coffee break, chef-at-home. English-speaking manager.',
  robots: { index: false, follow: true }, // English landing is a translation preview, not the primary site
  alternates: { canonical: '/en', languages: { 'ru': '/', 'en': '/en', 'x-default': '/' } },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EnLangFix />
      {children}
    </>
  );
}
