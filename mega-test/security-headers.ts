import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function securityHeadersMiddleware(req: NextRequest) {
  const res = NextResponse.next();

  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self'; connect-src 'self' ws: wss:;"
  );
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  return res;
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};
