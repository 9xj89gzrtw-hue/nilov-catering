import { SITE, LEGAL } from '@/lib/data';
import reviews from '@/data/reviews.json';
import type { Review } from '@/lib/cms-store';

/**
 * JSON-LD структуры для SEO.
 *
 * ВАЖНО: aggregateRating и reviewCount берём из РЕАЛЬНОГО data/reviews.json
 * (не выдумываем). Если отзывов 17 — пишем 17. Средний рейтинг 4.8.
 *
 * FAQPageJsonLd удалён из этого файла — JSON-LD для FAQ генерируется
 * на странице /faq напрямую (см. app/faq/page.tsx). Дублирование убрано.
 */

const REVIEWS: Review[] = reviews as Review[];

function calcAggregateRating() {
  if (!REVIEWS || REVIEWS.length === 0) {
    return null;
  }
  const rated = REVIEWS.filter((r) => typeof r.rating === 'number');
  if (rated.length === 0) return null;
  const sum = rated.reduce((acc, r) => acc + (r.rating || 0), 0);
  const avg = sum / rated.length;
  return {
    '@type': 'AggregateRating',
    ratingValue: avg.toFixed(1),
    reviewCount: String(rated.length),
    bestRating: '5',
    worstRating: '1',
  };
}

export function OrganizationJsonLd() {
  const rating = calcAggregateRating();
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://${SITE.domain}/#organization`,
    name: SITE.name,
    legalName: LEGAL.operatorFull,
    url: `https://${SITE.domain}`,
    telephone: SITE.phoneTel,
    email: SITE.email,
    image: [`https://${SITE.domain}/images/catering/wedding-01.jpg`],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Санкт-Петербург',
      addressCountry: 'RU',
      streetAddress: LEGAL.legalAddress,
      postalCode: '199106',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 59.931038,
      longitude: 30.276615,
    },
    hasMap: 'https://yandex.ru/maps/?text=59.931038,30.276615',
    priceRange: '₽₽₽',
    taxID: LEGAL.inn,
    foundingDate: '2007',
    areaServed: 'Санкт-Петербург и Ленинградская область',
    sameAs: [
      'https://vk.com/nilovcatering',
      'https://t.me/nilovcatering',
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '21:00',
    },
  };

  if (rating) {
    data.aggregateRating = rating;
    // Добавляем до 5 свежих отзывов как Review entities
    data.review = REVIEWS.slice(0, 5).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.clientName },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(r.rating || 5),
        bestRating: '5',
        worstRating: '1',
      },
      datePublished: r.date,
      reviewBody: r.quote,
      name: r.eventType,
    }));
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function MenuJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'Меню кейтеринга NiloV',
    url: `https://${SITE.domain}/menu`,
    hasMenuSection: [
      { '@type': 'MenuSection', name: 'Фуршет', url: `https://${SITE.domain}/menu/furshet` },
      { '@type': 'MenuSection', name: 'Банкет', url: `https://${SITE.domain}/menu/banquet` },
      { '@type': 'MenuSection', name: 'Кофе-брейк', url: `https://${SITE.domain}/menu/coffee-break` },
      { '@type': 'MenuSection', name: 'Халяль', url: `https://${SITE.domain}/menu/halal` },
      { '@type': 'MenuSection', name: 'Веган', url: `https://${SITE.domain}/menu/vegan` },
      { '@type': 'MenuSection', name: 'Без глютена', url: `https://${SITE.domain}/menu/gluten-free` },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// FAQPageJsonLd удалён — дублировал JSON-LD, который генерируется на странице /faq напрямую.
// См. app/faq/page.tsx для актуальной FAQPage schema.

export function ServiceJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Кейтеринг под ключ',
    'provider': { '@type': 'LocalBusiness', '@id': `https://${SITE.domain}/#organization` },
    'areaServed': 'Санкт-Петербург и Ленинградская область',
    'serviceType': 'Кейтеринг, выездное ресторанное обслуживание',
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'RUB',
      'lowPrice': '390',
      'highPrice': '9950',
      'offerCount': '4',
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
