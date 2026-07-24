import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${SITE.domain}`;

  const routes = [
    '', '/events', '/events/korporativ', '/events/svadba', '/events/chastnoe',
    '/events/detskoe', '/events/vypusknoy', '/events/chef-at-home', '/events/recap',
    '/menu', '/menu/furshet', '/menu/banquet', '/menu/coffee-break', '/menu/detskoe',
    '/menu/catalog', '/menu/vegan', '/menu/gluten-free', '/menu/halal',
    '/menu/show-cooking', '/menu/bar',
    '/gallery', '/why-us', '/team', '/reviews', '/seasonal',
    '/plan', '/plan/calculator', '/plan/constructor', '/plan/helper',
    '/contact', '/faq', '/blog', '/delivery', '/delivery/order', '/certificates', '/venues',
    '/tasting', '/accessibility', '/help/formats', '/allergens',
    '/privacy', '/terms', '/cookies',
    '/en', '/subscribe', '/media-kit', '/careers',
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/events') || route.startsWith('/plan') ? 0.8 : 0.5,
  }));
}
