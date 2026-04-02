import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale } from '../dictionaries'
import type { Locale } from '../dictionaries'

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isRu = lang === 'ru'
  return {
    title: isRu ? 'Политика конфиденциальности — VirtualSMS' : 'Privacy Policy — VirtualSMS',
    robots: { index: false, follow: false },
  }
}

export default async function PrivacyPage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const isRu = lang === 'ru'

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>{dict.privacy.title}</h1>
          <p>{dict.privacy.subtitle}</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-faint)' }}>
            {dict.privacy.lastUpdated}
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="legal-content" style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2>{isRu ? '1. Какую информацию мы собираем' : '1. Information We Collect'}</h2>
            <p>{isRu ? 'Мы собираем минимальное количество данных, необходимых для предоставления нашего сервиса. Это может включать:' : 'We collect the minimum data necessary to provide our service. This may include:'}</p>
            <ul>
              <li>{isRu ? 'Данные об использовании сервиса (выбранный номер, страна, время сессии)' : 'Service usage data (selected number, country, session time)'}</li>
              <li>{isRu ? 'Технические данные (IP-адрес, тип браузера) для защиты от злоупотреблений' : 'Technical data (IP address, browser type) for abuse prevention'}</li>
              <li>{isRu ? 'Платёжные данные обрабатываются сторонними платёжными системами — мы не храним данные карт' : 'Payment data processed by third-party providers — we do not store card details'}</li>
            </ul>

            <h2>{isRu ? '2. Как мы используем данные' : '2. How We Use Data'}</h2>
            <p>{isRu ? 'Собранные данные используются исключительно для:' : 'Collected data is used solely for:'}</p>
            <ul>
              <li>{isRu ? 'Предоставления виртуальных номеров и SMS-верификации' : 'Providing virtual numbers and SMS verification'}</li>
              <li>{isRu ? 'Предотвращения мошенничества и злоупотреблений' : 'Fraud and abuse prevention'}</li>
              <li>{isRu ? 'Улучшения качества сервиса' : 'Service quality improvement'}</li>
            </ul>

            <h2>{isRu ? '3. Анонимность' : '3. Anonymity'}</h2>
            <p>{isRu ? 'Мы не требуем регистрации и не привязываем номера телефонов к вашей личности. Наш сервис разработан с учётом принципа Privacy by Design — ваши данные не продаются третьим лицам.' : 'We do not require registration and do not link phone numbers to your identity. Our service is built with Privacy by Design — your data is never sold to third parties.'}</p>

            <h2>{isRu ? '4. Cookies' : '4. Cookies'}</h2>
            <p>{isRu ? 'Мы используем технические cookies, необходимые для работы сайта. Мы не используем cookies для отслеживания или рекламы. Вы можете отключить cookies в настройках браузера, однако это может повлиять на работу сайта.' : 'We use technical cookies necessary for site operation. We do not use cookies for tracking or advertising. You may disable cookies in your browser settings, though this may affect site functionality.'}</p>

            <h2>{isRu ? '5. Сторонние сервисы' : '5. Third-Party Services'}</h2>
            <p>{isRu ? 'Мы можем использовать сторонние платёжные процессоры и аналитические инструменты. Эти сервисы имеют собственную политику конфиденциальности и обрабатывают данные согласно ей.' : 'We may use third-party payment processors and analytics tools. These services have their own privacy policies and process data accordingly.'}</p>

            <h2>{isRu ? '6. Хранение данных' : '6. Data Retention'}</h2>
            <p>{isRu ? 'Минимальные технические данные хранятся не более 30 дней. Данные об операциях могут храниться дольше в соответствии с требованиями законодательства.' : 'Minimal technical data is retained for no more than 30 days. Transaction data may be stored longer in compliance with legal requirements.'}</p>

            <h2>{isRu ? '7. Ваши права' : '7. Your Rights'}</h2>
            <p>{isRu ? 'Вы имеете право запросить удаление ваших данных. Для этого свяжитесь с нами по адресу: support@virtualsms.io' : 'You have the right to request deletion of your data. Contact us at: support@virtualsms.io'}</p>

            <h2>{isRu ? '8. Изменения политики' : '8. Policy Changes'}</h2>
            <p>{isRu ? 'Мы можем обновлять настоящую Политику конфиденциальности. Актуальная версия всегда доступна на этой странице.' : 'We may update this Privacy Policy. The current version is always available on this page.'}</p>
          </div>
        </div>
      </div>
    </>
  )
}
