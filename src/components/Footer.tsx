import Link from 'next/link'
import { Smartphone } from 'lucide-react'
import type { Locale } from '@/app/[lang]/dictionaries'

interface FooterProps {
  lang: Locale
  dict: {
    nav: {
      home: string
      about: string
      contacts: string
      terms: string
      privacy: string
    }
    footer: {
      description: string
      navigation: string
      legal: string
      copyright: string
    }
  }
}

export default function Footer({ lang, dict }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link href={`/${lang}`} className="logo" style={{ display: 'inline-flex' }}>
              <span className="logo-icon">
                <Smartphone size={16} color="#fff" />
              </span>
              Virtual<span style={{ color: 'var(--blue)' }}>SMS</span>
            </Link>
            <p>{dict.footer.description}</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="footer-col-title">{dict.footer.navigation}</p>
            <ul className="footer-links">
              <li><Link href={`/${lang}`}>{dict.nav.home}</Link></li>
              <li><Link href={`/${lang}/about`}>{dict.nav.about}</Link></li>
              <li><Link href={`/${lang}/contacts`}>{dict.nav.contacts}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="footer-col-title">{dict.footer.legal}</p>
            <ul className="footer-links">
              <li><Link href={`/${lang}/terms`}>{dict.nav.terms}</Link></li>
              <li><Link href={`/${lang}/privacy`}>{dict.nav.privacy}</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} VirtualSMS. {dict.footer.copyright}</p>
          <div className="lang-switcher">
            <Link href="/ru" className={`lang-btn${lang === 'ru' ? ' active' : ''}`}>RU</Link>
            <Link href="/en" className={`lang-btn${lang === 'en' ? ' active' : ''}`}>EN</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
