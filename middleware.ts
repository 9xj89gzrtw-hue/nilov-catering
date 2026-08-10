import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const REDIRECTS: Record<string, string> = {
  '/about': '/why-us',
  '/testimonials': '/reviews',
  '/services': '/events',
  '/quote': '/plan/helper',
  '/constructor': '/plan/constructor',
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
  matcher: ['/about', '/testimonials', '/services', '/services/:path*', '/quote', '/constructor', '/en', '/en/:path*'],
};