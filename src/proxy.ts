import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['ru', 'en']
const defaultLocale = 'ru'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip if already has a locale prefix
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (hasLocale) return

  // Skip /go route
  if (pathname.startsWith('/go')) return

  // Redirect to default locale
  const locale = defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|sitemap.xml|robots.txt).*)'],
}
