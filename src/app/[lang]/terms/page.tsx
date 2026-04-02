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
    title: isRu ? 'Условия использования — VirtualSMS' : 'Terms of Service — VirtualSMS',
    robots: { index: false, follow: false },
  }
}

export default async function TermsPage({
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
          <h1>{dict.terms.title}</h1>
          <p>{dict.terms.subtitle}</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-faint)' }}>
            {dict.terms.lastUpdated}
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="legal-content" style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2>{isRu ? '1. Принятие условий' : '1. Acceptance of Terms'}</h2>
            <p>{isRu ? 'Используя наш сервис виртуальных номеров телефонов, вы соглашаетесь соблюдать настоящие Условия использования. Если вы не согласны с какими-либо условиями, пожалуйста, не используйте наш сервис.' : 'By using our virtual phone number service, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our service.'}</p>

            <h2>{isRu ? '2. Описание сервиса' : '2. Service Description'}</h2>
            <p>{isRu ? 'VirtualSMS предоставляет виртуальные номера телефонов для SMS-верификации. Наши номера предназначены для личного использования в целях верификации учётных записей на различных платформах.' : 'VirtualSMS provides virtual phone numbers for SMS verification purposes. Our numbers are intended for personal use in verifying accounts on various platforms.'}</p>

            <h2>{isRu ? '3. Допустимое использование' : '3. Acceptable Use'}</h2>
            <p>{isRu ? 'Вы соглашаетесь использовать наш сервис только в законных целях. Запрещается использовать наши номера для:' : 'You agree to use our service only for lawful purposes. You must not use our numbers for:'}</p>
            <ul>
              <li>{isRu ? 'Мошенничества или обмана' : 'Fraud or deception'}</li>
              <li>{isRu ? 'Спама или нежелательных сообщений' : 'Spam or unsolicited messages'}</li>
              <li>{isRu ? 'Нарушения условий использования сторонних платформ' : 'Violating third-party platform terms of service'}</li>
              <li>{isRu ? 'Незаконной деятельности' : 'Any illegal activity'}</li>
            </ul>

            <h2>{isRu ? '4. Доступность сервиса' : '4. Service Availability'}</h2>
            <p>{isRu ? 'Мы стремимся обеспечить доступность сервиса 99.9% времени, однако не гарантируем бесперебойную работу. Мы оставляем за собой право приостановить работу сервиса для технического обслуживания.' : 'We strive for 99.9% service availability but do not guarantee uninterrupted service. We reserve the right to suspend service for maintenance.'}</p>

            <h2>{isRu ? '5. Оплата и возврат' : '5. Payment and Refunds'}</h2>
            <p>{isRu ? 'Оплата за номера производится заранее. Возврат средств возможен только в случае технической неисправности с нашей стороны. Если SMS не было получено по нашей вине, мы произведём возврат или замену номера.' : 'Payment for numbers is made in advance. Refunds are only available in case of technical failure on our part. If SMS was not received due to our fault, we will provide a refund or number replacement.'}</p>

            <h2>{isRu ? '6. Изменения условий' : '6. Changes to Terms'}</h2>
            <p>{isRu ? 'Мы оставляем за собой право изменять настоящие Условия в любое время. Продолжение использования сервиса после внесения изменений означает ваше согласие с новыми условиями.' : 'We reserve the right to modify these Terms at any time. Continued use of the service after changes constitutes your agreement to the new terms.'}</p>

            <h2>{isRu ? '7. Ограничение ответственности' : '7. Limitation of Liability'}</h2>
            <p>{isRu ? 'В максимальной степени, разрешённой законом, VirtualSMS не несёт ответственности за косвенные, случайные или последующие убытки, возникшие в результате использования нашего сервиса.' : 'To the maximum extent permitted by law, VirtualSMS shall not be liable for any indirect, incidental, or consequential damages arising from your use of our service.'}</p>

            <h2>{isRu ? '8. Контакты' : '8. Contact'}</h2>
            <p>{isRu ? 'По вопросам, связанным с настоящими Условиями, обращайтесь к нам: support@virtualsms.io' : 'For questions about these Terms, contact us at: support@virtualsms.io'}</p>
          </div>
        </div>
      </div>
    </>
  )
}
