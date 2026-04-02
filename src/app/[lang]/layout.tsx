import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getDictionary, hasLocale } from './dictionaries'
import type { Locale } from './dictionaries'
import '../globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ru' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const isRu = lang === 'ru'

  return {
    title: {
      default: isRu ? 'VirtualSMS — Виртуальные номера телефонов' : 'VirtualSMS — Virtual Phone Numbers',
      template: `%s | VirtualSMS`,
    },
    description: isRu
      ? 'Получайте SMS онлайн для любого сервиса. Виртуальные номера телефонов из 21 страны.'
      : 'Receive SMS online for any service. Virtual phone numbers from 21 countries.',
    robots: { index: false, follow: false },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)

  return (
    <html lang={lang} className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#007bff" />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header lang={lang as Locale} dict={dict} />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer lang={lang as Locale} dict={dict} />
      </body>
    </html>
  )
}
