import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const REDIRECTS: Record<string, string> = {
  // Existing redirects
  '/about': '/why-us',
  '/testimonials': '/reviews',
  '/services': '/events',
  '/quote': '/plan/helper',
  '/constructor': '/plan/constructor',
  
  // Cycle 1 fixes — common typos and legacy URLs
  '/prices': '/pricing',
  '/tariffs': '/pricing',
  '/contacts': '/contact',
  '/career': '/careers',
  '/account': '/account/orders',
  '/delivery-zones': '/delivery',
  '/subscription': '/subscribe',
  
  // Menu legacy URLs
  '/menu/buffet': '/menu/furshet',
  '/menu/kids': '/menu/detskoe',
  '/menu/banket': '/menu/banquet',
  
  // Events legacy URLs (English → Russian slugs)
  '/events/wedding': '/events/svadba',
  '/events/corporate': '/events/korporativ',
  
  // Other common misspellings
  '/menu-picker': '/menu/catalog',
  '/assistant': '/plan/helper',
  '/help': '/faq',
  '/tarify': '/pricing',
};

// Legacy slug → каноничный slug
const SERVICE_SLUG_MAP: Record<string, string> = {
  weddings: 'svadba',
  corporate: 'korporativ',
  private: 'chastnoe',
  kids: 'detskoe',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const target = REDIRECTS[pathname];

  if (target) {
    return NextResponse.redirect(new URL(target, request.url), 301);
  }

  // /services/:slug → /events/:canonicalSlug
  if (pathname.startsWith('/services/')) {
    const slug = pathname.replace('/services/', '');
    const canonical = SERVICE_SLUG_MAP[slug] || slug;
    return NextResponse.redirect(new URL(`/events/${canonical}`, request.url), 301);
  }

  // /en → set <html lang="en"> via response header (EnLangFix client component
  // only patches after hydration; this ensures SSR HTML also gets lang="en")
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const response = NextResponse.next();
    response.headers.set('x-content-lang', 'en');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Original matchers
    '/about', '/testimonials', '/services', '/services/:path*', '/quote', '/constructor', '/en', '/en/:path*',
    // Cycle 1 fix matchers
    '/prices', '/tariffs', '/contacts', '/career', '/account', '/delivery-zones', '/subscription',
    '/menu/buffet', '/menu/kids', '/menu/banket', '/events/wedding', '/events/corporate',
    '/menu-picker', '/assistant', '/help', '/tarify',
  ],
};