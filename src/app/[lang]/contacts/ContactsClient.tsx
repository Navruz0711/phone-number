'use client'

import { useState } from 'react'
import { Send, MessageCircle, Mail } from 'lucide-react'

interface ContactsClientProps {
  dict: {
    contacts: {
      name: string
      email: string
      message: string
      send: string
      success: string
      telegram: string
      email_label: string
    }
  }
  lang: string
}

export default function ContactsClient({ dict, lang }: ContactsClientProps) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    alert(dict.contacts.success)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
      {/* Form */}
      <div>
        {submitted ? (
          <div style={{
            background: 'rgba(0,123,255,0.1)',
            border: '1px solid rgba(0,123,255,0.3)',
            borderRadius: 12,
            padding: '2rem',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.8)',
          }}>
            ✅ {dict.contacts.success}
          </div>
        ) : (
          <form className="contact-form" style={{ maxWidth: '100%' }} onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">{dict.contacts.name}</label>
              <input className="form-input" type="text" required placeholder={dict.contacts.name} />
            </div>
            <div className="form-group">
              <label className="form-label">{dict.contacts.email}</label>
              <input className="form-input" type="email" required placeholder="email@example.com" />
            </div>
            <div className="form-group">
              <label className="form-label">{dict.contacts.message}</label>
              <textarea className="form-input" required placeholder={dict.contacts.message} />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.75rem' }}>
              <Send size={16} />
              {dict.contacts.send}
            </button>
          </form>
        )}
      </div>

      {/* Contact info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="feature-card">
          <div className="feature-icon"><MessageCircle size={20} /></div>
          <div>
            <div className="feature-title">{dict.contacts.telegram}</div>
            <div className="feature-desc">
              <a href="/go" style={{ color: 'var(--blue-light)', textDecoration: 'none' }}>@virtualsms_support</a>
            </div>
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><Mail size={20} /></div>
          <div>
            <div className="feature-title">{dict.contacts.email_label}</div>
            <div className="feature-desc">
              <a href="mailto:support@virtualsms.io" style={{ color: 'var(--blue-light)', textDecoration: 'none' }}>support@virtualsms.io</a>
            </div>
          </div>
        </div>

        <div className="seo-block" style={{ marginTop: '0.5rem' }}>
          <p style={{ fontSize: '0.875rem' }}>
            {lang === 'ru'
              ? 'Среднее время ответа — менее 30 минут. Мы работаем 24 часа в сутки, 7 дней в неделю.'
              : 'Average response time is under 30 minutes. We operate 24 hours a day, 7 days a week.'}
          </p>
        </div>
      </div>
    </div>
  )
}
