import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const REDIRECTS: Record<string, string> = {
  '/about': '/why-us',
  '/testimonials': '/reviews',
  '/services': '/events',
  '/quote': '/plan/calculator',
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

  return NextResponse.next();
}

export const config = {
  matcher: ['/about', '/testimonials', '/services', '/services/:path*', '/quote', '/constructor'],
};