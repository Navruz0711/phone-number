import Link from 'next/link'
import { Smartphone } from 'lucide-react'
import type { Locale } from '@/app/[lang]/dictionaries'

interface HeaderProps {
  lang: Locale
  dict: {
    nav: {
      home: string
      about: string
      contacts: string
      terms: string
      privacy: string
    }
    cta: { getNumber: string }
  }
}

export default function Header({ lang, dict }: HeaderProps) {
  const otherLang = lang === 'ru' ? 'en' : 'ru'

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <Link href={`/${lang}`} className="logo">
            <span className="logo-icon">
              <Smartphone size={18} color="#fff" />
            </span>
            Virtual<span style={{ color: 'var(--blue-light)' }}>SMS</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="nav">
            <Link href={`/${lang}`} className="nav-link">
              {dict.nav.home}
            </Link>
            <Link href={`/${lang}/about`} className="nav-link">
              {dict.nav.about}
            </Link>
            <Link href={`/${lang}/contacts`} className="nav-link">
              {dict.nav.contacts}
            </Link>
            <Link href={`/${lang}/terms`} className="nav-link">
              {dict.nav.terms}
            </Link>
            <Link href={`/${lang}/privacy`} className="nav-link">
              {dict.nav.privacy}
            </Link>
          </nav>

          {/* Right side */}
          <div className="header-right">
            {/* Language switcher */}
            <div className="lang-switcher">
              <Link
                href={`/ru`}
                className={`lang-btn${lang === 'ru' ? ' active' : ''}`}
              >
                RU
              </Link>
              <Link
                href={`/en`}
                className={`lang-btn${lang === 'en' ? ' active' : ''}`}
              >
                EN
              </Link>
            </div>

            {/* CTA */}
            <Link href="/go" className="btn-primary">
              {dict.cta.getNumber}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
