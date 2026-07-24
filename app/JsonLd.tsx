import { SITE, LEGAL } from '@/lib/data';
import reviews from '@/data/reviews.json';
import type { Review } from '@/lib/cms-store';

/**
 * JSON-LD структуры для SEO.
 *
 * ВАЖНО: aggregateRating и reviewCount берём из РЕАЛЬНОГО data/reviews.json
 * (не выдумываем). Если отзывов 17 — пишем 17. Если средний рейтинг 4.9 — пишем 4.9.
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
    image: [`https://${SITE.domain}/og-image.svg`],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Санкт-Петербург',
      addressCountry: 'RU',
      streetAddress: LEGAL.legalAddress,
      postalCode: '199106',
    },
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

export function FAQPageJsonLd() {
  const qa = [
    { q: 'Какая минимальная стоимость заказа?', a: 'Минимум зависит от формата и тарифа. Кофе-брейк от 10 гостей × 390 ₽ = 3 900 ₽. Фуршет от 20 гостей × 2 450 ₽ = 49 000 ₽. Банкет от 30 гостей × 3 950 ₽ = 118 500 ₽. Бесплатная дегустация при заказе от 100 000 ₽.' },
    { q: 'Можно ли заказать дегустацию?', a: 'Бесплатная дегустация при заказе от 100 000 ₽ для событий от 30 гостей. Для меньших заказов — платная от 3 000 ₽/чел (сумма зачисляется в заказ). Запись по телефону +7 (812) 919-59-11.' },
    { q: 'Какие форматы кейтеринга вы предлагаете?', a: 'Фуршет, банкет, кофе-брейк, детский праздник, выезд шефа, поминки, ифтар.' },
    { q: 'Что входит в стоимость?', a: 'В стоимость входит меню, персонал (1 официант на 15 гостей для банкета, 1 на 25 для фуршета), координатор на площадке, доставка в пределах КАД, посуда одноразовая (фарфор/стекло — за доплату). Скрытых доплат нет.' },
    { q: 'Работаете ли вы за пределами КАД?', a: 'Да, работаем по всей Ленинградской области. В пределах КАД — бесплатно. Зона 1 (до 30 км) — 3 000 ₽. Зона 2 (30–60 км) — 5 500 ₽. Зона 3 (60+ км) — индивидуально.' },
    { q: 'Можно ли работать с юрлицами?', a: 'Да. ИП Нилов Д.И. (ИНН 781433059704), УСН 6%. ЭДО: Диадок и СБИС. Договор юрлицо↔ИП, счёт на оплату, акт, УПД. 44-ФЗ и 223-ФЗ. Подробности на странице /certificates.' },
  ];

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
