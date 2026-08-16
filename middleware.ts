import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware — sets x-content-lang header for /en routes so the root layout
 * can render <html lang="en"> server-side (avoids client-only EnLangFix hydration gap).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isEn = pathname === "/en" || pathname.startsWith("/en/");

  if (isEn) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-content-lang", "en");
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/en", "/en/:path*"],
};
