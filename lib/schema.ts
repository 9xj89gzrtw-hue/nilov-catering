/**
 * Schema.org хелперы для структурированных данных (SEO)
 *
 * Использование:
 * ```tsx
 * import { generateOrganizationSchema, generateEventSchema } from '@/lib/schema';
 *
 * // В layout.tsx или page.tsx
 * export const metadata = {
 *   other: {
 *     'script:ld+json': JSON.stringify(generateOrganizationSchema({
 *       name: 'Nilov Catering',
 *       url: 'https://nilov-catering.ru',
 *     }))
 *   }
 * };
 * ```
 */

// Базовая информация о компании (замените на свои данные)
const COMPANY_INFO = {
  name: "Nilov Catering",
  url: "https://nilov-catering.ru",
  logo: "https://nilov-catering.ru/logo.png",
  telephone: "+7-800-000-00-00",
  email: "info@nilov-catering.ru",
  address: {
    "@type": "PostalAddress",
    addressCountry: "RU",
    addressLocality: "Санкт-Петербург",
  },
  sameAs: ["https://t.me/nilovcatering", "https://vk.com/nilovcatering"],
};

/**
 * Генерация Schema.org для организации (кейтеринг)
 */
export function generateOrganizationSchema(overrides?: Record<string, unknown>) {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    ...COMPANY_INFO,
    servesCuisine: ["Русская", "Европейская", "Азиатская"],
    priceRange: "$$",
    image: "/images/catering/finedining-01.avif",
    description:
      "Премиальный кейтеринг в Санкт-Петербурге. Организация банкетов, фуршетов, корпоративных мероприятий.",
    ...overrides,
  };
}

/**
 * Генерация Schema.org для типа мероприятия
 */
export function generateEventSchema(event: {
  name: string;
  startDate: string;
  endDate?: string;
  description: string;
  location?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    description: event.description,
    location: {
      "@type": "Place",
      name: event.location || "Санкт-Петербург",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Санкт-Петербург",
        addressCountry: "RU",
      },
    },
    image: event.image || "/images/catering/wedding-01.avif",
    organizer: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.url,
    },
  };
}

/**
 * Генерация Schema.org для хлебных крошек
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Генерация Schema.org для страницы FAQ
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Типы мероприятий для Schema.org
 */
export const EVENT_TYPES = {
  WEDDING: "Wedding",
  CORPORATE: "BusinessEvent",
  BIRTHDAY: "BirthdayParty",
  ANNIVERSARY: "Anniversary",
  CHILDREN: "ChildrensParty",
  FUNERAL: "Wake",
} as const;

/**
 * Сервисы кейтеринга для Schema.org
 */
export const CATERING_SERVICES = [
  "BanquetService",
  "CateringService",
  "FoodService",
  "Restaurant",
] as const;
