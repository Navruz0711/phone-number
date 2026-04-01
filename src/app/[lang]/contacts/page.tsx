import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale } from '../dictionaries'
import type { Locale } from '../dictionaries'
import ContactsClient from './ContactsClient'

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isRu = lang === 'ru'
  return {
    title: isRu ? 'Контакты — VirtualSMS' : 'Contacts — VirtualSMS',
    description: isRu ? 'Свяжитесь с нами — поддержка 24/7' : 'Contact us — 24/7 support',
    robots: { index: false, follow: false },
  }
}

export default async function ContactsPage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>{dict.contacts.title}</h1>
          <p>{dict.contacts.subtitle}</p>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <ContactsClient dict={dict} lang={lang} />
        </div>
      </div>
    </>
  )
}
