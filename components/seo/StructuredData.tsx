export function OrganizationData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context":"https://schema.org","@type":"Organization","name":"NiloV Catering",
    "url":"https://nilov-catering.ru","telephone":"+7-812-919-59-11","email":"info@nilov-catering.ru",
    "address":{"@type":"PostalAddress","addressLocality":"Санкт-Петербург","addressCountry":"RU"}
  })}} />;
}
export function LocalBusinessData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context":"https://schema.org","@type":"LocalBusiness","name":"NiloV Catering",
    "image":"https://nilov-catering.ru/images/hero/catering-hero.jpg","priceRange":"₽₽₽",
    "telephone":"+7-812-919-59-11","address":{"@type":"PostalAddress","addressLocality":"Санкт-Петербург"},
    "openingHours":"Mo-Su 10:00-20:00","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"127"}
  })}} />;
}
