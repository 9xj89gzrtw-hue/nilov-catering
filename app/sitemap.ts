import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/data';

// W93-v8: per-route lastmod so crawlers get a real freshness signal.
// Update these dates when a page's content materially changes.
const ROUTE_LASTMOD: Record<string, string> = {
  '': '2026-08-10',
  '/events': '2026-07-15',
  '/events/korporativ': '2026-07-15',
  '/events/svadba': '2026-08-10',
  '/events/chastnoe': '2026-07-15',
  '/events/detskoe': '2026-07-15',
  '/events/vypusknoy': '2026-08-11',
  '/events/chef-at-home': '2026-07-15',
  '/events/recap': '2026-06-01',
  '/events/pominki': '2026-07-15',
  '/events/nikah': '2026-07-15',
  '/events/yubiley': '2026-07-15',
  '/menu': '2026-08-10',
  '/menu/furshet': '2026-08-10',
  '/menu/banquet': '2026-08-10',
  '/menu/coffee-break': '2026-08-10',
  '/menu/detskoe': '2026-07-15',
  '/menu/catalog': '2026-08-10',
  '/menu/vegan': '2026-07-15',
  '/menu/gluten-free': '2026-07-15',
  '/menu/halal': '2026-08-10',
  '/menu/show-cooking': '2026-06-01',
  '/menu/bar': '2026-06-01',
  '/gallery': '2026-06-01',
  '/why-us': '2026-07-15',
  '/team': '2026-07-15',
  '/reviews': '2026-08-10',
  '/seasonal': '2026-06-01',
  '/seasonal/bbq': '2026-06-01',
  '/seasonal/maslenitsa': '2026-02-01',
  '/seasonal/new-year': '2025-12-01',
  '/plan/constructor': '2026-08-10',
  '/plan/helper': '2026-08-10',
  '/pricing': '2026-08-10',
  '/contact': '2026-07-15',
  '/faq': '2026-08-10',
  '/blog': '2026-05-01',
  '/delivery': '2026-06-01',
  '/delivery/order': '2026-06-01',
  '/certificates': '2026-08-11',
  '/venues': '2026-06-01',
  '/tasting': '2026-07-15',
  '/accessibility': '2026-06-01',
  '/help/formats': '2026-06-01',
  '/allergens': '2026-08-10',
  '/privacy': '2026-08-01',
  '/terms': '2026-08-01',
  '/cookies': '2026-08-01',
  '/offer': '2026-08-01',
  '/en': '2026-06-01',
  '/media-kit': '2026-06-01',
  '/careers': '2026-06-01',
  '/partners': '2026-06-01',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${SITE.domain}`;

  const routes = Object.keys(ROUTE_LASTMOD);

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(ROUTE_LASTMOD[route]),
    changeFrequency: route === '' ? 'weekly' : route.startsWith('/events') || route.startsWith('/plan') ? 'monthly' : 'yearly',
    priority: route === '' ? 1 : route.startsWith('/events') || route.startsWith('/plan') ? 0.8 : 0.5,
  }));
}
