import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale } from '../dictionaries'
import type { Locale } from '../dictionaries'
import { Zap, Globe, Shield, Clock } from 'lucide-react'

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isRu = lang === 'ru'
  return {
    title: isRu ? 'О нас — VirtualSMS' : 'About Us — VirtualSMS',
    description: isRu
      ? 'Узнайте больше о нашем сервисе виртуальных номеров телефонов для SMS-верификации.'
      : 'Learn more about our virtual phone number service for SMS verification.',
    robots: { index: false, follow: false },
  }
}

export default async function AboutPage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>{dict.about.title}</h1>
          <p>{dict.about.subtitle}</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              {dict.about.description}
            </p>

            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-card-value">21</div>
                <div className="stat-card-label">{dict.about.stats.countries}</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">17+</div>
                <div className="stat-card-label">{dict.about.stats.services}</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">99.9%</div>
                <div className="stat-card-label">{dict.about.stats.uptime}</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">24/7</div>
                <div className="stat-card-label">{dict.about.stats.support}</div>
              </div>
            </div>

            {/* Mission */}
            <div className="seo-block" style={{ marginTop: '2rem' }}>
              <h2>{dict.about.mission}</h2>
              <p>{dict.about.missionText}</p>
            </div>

            {/* Features */}
            <div className="feature-grid" style={{ marginTop: '2rem' }}>
              <div className="feature-card">
                <div className="feature-icon"><Zap size={20} /></div>
                <div>
                  <div className="feature-title">{lang === 'ru' ? 'Мгновенно' : 'Instant'}</div>
                  <div className="feature-desc">{lang === 'ru' ? 'Номер готов к работе за секунды' : 'Number ready in seconds'}</div>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><Globe size={20} /></div>
                <div>
                  <div className="feature-title">{lang === 'ru' ? 'Глобально' : 'Global'}</div>
                  <div className="feature-desc">{lang === 'ru' ? '21 страна, 17+ сервисов' : '21 countries, 17+ services'}</div>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><Shield size={20} /></div>
                <div>
                  <div className="feature-title">{lang === 'ru' ? 'Анонимно' : 'Anonymous'}</div>
                  <div className="feature-desc">{lang === 'ru' ? 'Без регистрации и личных данных' : 'No registration required'}</div>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><Clock size={20} /></div>
                <div>
                  <div className="feature-title">{lang === 'ru' ? 'Всегда онлайн' : 'Always Online'}</div>
                  <div className="feature-desc">{lang === 'ru' ? 'Поддержка 24/7 без выходных' : '24/7 support year-round'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
