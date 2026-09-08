import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
})

export const config = {
  // Run on every page (so unprefixed French routes like /about resolve correctly),
  // but skip API routes, Next.js internals, and static files.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
