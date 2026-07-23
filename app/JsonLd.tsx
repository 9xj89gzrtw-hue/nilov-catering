import { SITE } from '@/lib/data';

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://${SITE.domain}/#organization`,
    name: SITE.name,
    url: `https://${SITE.domain}`,
    telephone: SITE.phoneTel,
    email: SITE.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Санкт-Петербург', addressCountry: 'RU' },
    sameAs: [
      'https://vk.com/nilovcatering',
      'https://t.me/nilovcatering',
    ],
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '09:00', closes: '21:00' },
  };

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
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function FAQPageJsonLd() {
  const qa = [
    { q: 'Какая минимальная стоимость заказа?', a: 'Минимальная стоимость заказа — от 20 000 ₽. Точная цена зависит от формата и количества гостей.' },
    { q: 'Можно ли заказать дегустацию?', a: 'Да, дегустация доступна. Свяжитесь с нами через сайт для записи.' },
    { q: 'Какие форматы кейтеринга вы предлагаете?', a: 'Фуршет, банкет, кофе-брейк, детский праздник, выезд шефа.' },
    { q: 'Что входит в стоимость?', a: 'В стоимость входит меню, персонал, координатор на площадке, доставка в пределах КАД. Скрытых доплат нет.' },
    { q: 'Работаете ли вы за пределами КАД?', a: 'Да, работаем по всей Ленинградской области. Стоимость доставки за КАД зависит от зоны.' },
  ];

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
