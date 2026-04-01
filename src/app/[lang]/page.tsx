import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Zap, Globe, Shield } from 'lucide-react'
import { getDictionary, hasLocale } from './dictionaries'
import type { Locale } from './dictionaries'
import { SERVICES, COUNTRIES } from '@/lib/data'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const isRu = lang === 'ru'
  return {
    title: isRu
      ? 'Виртуальные номера телефонов для SMS-верификации'
      : 'Virtual Phone Numbers for SMS Verification',
    description: isRu
      ? 'Получайте SMS онлайн на виртуальные номера из 21 страны. Telegram, WhatsApp, Google и ещё 14 сервисов.'
      : 'Receive SMS online with virtual numbers from 21 countries. Telegram, WhatsApp, Google and 14 more services.',
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="hero-badge">
            <Zap size={12} />
            {dict.hero.badge}
          </div>

          <h1>{dict.hero.title}</h1>

          <p className="hero-subtitle">{dict.hero.subtitle}</p>

          <div className="hero-actions">
            <Link href="/go" className="btn-primary">
              {dict.hero.cta}
            </Link>
            <Link href={`/${lang}/about`} className="btn-outline">
              {dict.cta.learnMore}
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">17+</span>
              <span className="hero-stat-label">
                {lang === 'ru' ? 'Сервисов' : 'Services'}
              </span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">21</span>
              <span className="hero-stat-label">
                {lang === 'ru' ? 'Стран' : 'Countries'}
              </span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">99.9%</span>
              <span className="hero-stat-label">Uptime</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">24/7</span>
              <span className="hero-stat-label">
                {lang === 'ru' ? 'Поддержка' : 'Support'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon"><Zap size={20} /></div>
              <div>
                <div className="feature-title">{lang === 'ru' ? 'Мгновенная активация' : 'Instant Activation'}</div>
                <div className="feature-desc">{lang === 'ru' ? 'Номер готов к использованию за секунды' : 'Number ready to use in seconds'}</div>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Globe size={20} /></div>
              <div>
                <div className="feature-title">{lang === 'ru' ? 'Весь мир' : 'Worldwide'}</div>
                <div className="feature-desc">{lang === 'ru' ? '21 страна на выбор' : '21 countries to choose from'}</div>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Shield size={20} /></div>
              <div>
                <div className="feature-title">{lang === 'ru' ? 'Анонимность' : 'Anonymity'}</div>
                <div className="feature-desc">{lang === 'ru' ? 'Без регистрации и личных данных' : 'No registration or personal data'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{dict.services.title}</h2>
            <p className="section-subtitle">{dict.services.subtitle}</p>
          </div>

          <div className="services-grid">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/${lang}/service/${service.slug}`}
                className="service-card"
                style={{ '--card-color': service.color } as React.CSSProperties}
              >
                <div
                  className="service-icon"
                  style={{ background: `${service.color}22` }}
                >
                  <span>{service.emoji}</span>
                </div>
                <span className="service-name">{service.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTRIES */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{dict.countries.title}</h2>
            <p className="section-subtitle">{dict.countries.subtitle}</p>
          </div>

          <div className="countries-grid">
            {COUNTRIES.map((country) => (
              <Link
                key={country.slug}
                href={`/${lang}/country/${country.slug}`}
                className="country-card"
              >
                <span className="country-flag">{country.flag}</span>
                <div className="country-info">
                  <div className="country-name">{country.name}</div>
                  <div className="country-code">{country.code}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>{lang === 'ru' ? 'Готовы начать?' : 'Ready to get started?'}</h2>
            <p>
              {lang === 'ru'
                ? 'Получите виртуальный номер мгновенно и начните принимать SMS прямо сейчас.'
                : 'Get a virtual number instantly and start receiving SMS right now.'}
            </p>
            <Link href="/go" className="btn-primary" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
              {dict.hero.cta}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
