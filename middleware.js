import { NextResponse } from 'next/server';

// Paths where returnTo is functional and must be preserved
const RETURN_TO_ALLOWED_PATHS = [
  '/login',
  '/after-sso',
  '/corporate-login',
  '/password-reset-success',
  '/express-signin',
  '/sso-prepare',
];

// Paths where price_id is functional and must be preserved
const PRICE_ID_ALLOWED_PATHS = ['/enroll'];

/**
 * SEO middleware — 301 redirects URLs with ?returnTo or ?price_id
 * to their clean equivalents on pages where those params do not
 * affect rendered content. Params on allowlisted paths pass through.
 */
export function middleware(request) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  const hasReturnTo = url.searchParams.has('returnTo');
  const hasPriceId = url.searchParams.has('price_id');

  // Nothing to do if neither param is present
  if (!hasReturnTo && !hasPriceId) {
    return NextResponse.next();
  }

  let shouldRedirect = false;

  if (hasReturnTo) {
    const allowed = RETURN_TO_ALLOWED_PATHS.some(
      (p) => pathname === p || pathname.startsWith(p + '/')
    );
    if (!allowed) {
      url.searchParams.delete('returnTo');
      shouldRedirect = true;
    }
  }

  if (hasPriceId) {
    const allowed = PRICE_ID_ALLOWED_PATHS.some(
      (p) => pathname === p || pathname.startsWith(p + '/')
    );
    if (!allowed) {
      url.searchParams.delete('price_id');
      shouldRedirect = true;
    }
  }

  if (shouldRedirect) {
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// Only run on page routes — skip API routes, static assets, and files with extensions
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|.*\\..*).*)',],
};
