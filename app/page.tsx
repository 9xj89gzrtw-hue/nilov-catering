import type { Metadata } from 'next';
import HeroBlock from '@/components/blocks/HeroBlock';
import EventTypeSelector from '@/components/blocks/EventTypeSelector';
import MenuPreview from '@/components/blocks/MenuPreview';
import TestimonialsCarousel from '@/components/blocks/TestimonialsCarousel';
import CTASection from '@/components/blocks/CTASection';
import { getReviews } from '@/lib/cms';

export const metadata: Metadata = {
  alternates: { canonical: '/', languages: { 'ru': '/', 'en': '/en', 'x-default': '/' } },
  openGraph: { images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
};

export const revalidate = 3600;

export default async function HomePage() {
  const cmsReviews = await getReviews();

  return (
    <main id="main">
      <HeroBlock />
      <EventTypeSelector />
      <MenuPreview />
      <TestimonialsCarousel cmsReviews={cmsReviews.length > 0 ? cmsReviews : undefined} />
      <CTASection />
    </main>
  );
}
