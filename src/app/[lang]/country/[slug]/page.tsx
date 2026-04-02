import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getDictionary, hasLocale } from '../../dictionaries'
import type { Locale } from '../../dictionaries'
import { COUNTRIES, SERVICES, COUNTRY_MAP } from '@/lib/data'
import type { CountrySlug } from '@/lib/data'

const COUNTRY_SEO: Record<
  CountrySlug,
  { en: { h2: string; p1: string; p2: string }; ru: { h2: string; p1: string; p2: string } }
> = {
  russia: {
    en: { h2: 'Russian virtual phone numbers', p1: 'Russian phone numbers (+7) are accepted by virtually all popular services including Telegram, VK, Avito, Yandex, Ozon, Wildberries, and WhatsApp. Russia is the most popular country for virtual number purchases.', p2: 'Our Russian numbers are real SIM-based numbers with fast SMS delivery — usually under 30 seconds.' },
    ru: { h2: 'Виртуальные номера России', p1: 'Российские номера (+7) принимаются практически всеми популярными сервисами: Telegram, ВК, Авито, Яндекс, Ozon, Wildberries и WhatsApp. Россия — самая популярная страна для покупки виртуальных номеров.', p2: 'Наши российские номера — реальные SIM-номера с быстрой доставкой SMS, обычно менее 30 секунд.' },
  },
  usa: {
    en: { h2: 'USA virtual phone numbers', p1: 'American phone numbers (+1) are accepted by nearly every global service and are especially valuable for Google, Coinbase, Twitter, Instagram, and TikTok verification.', p2: 'US numbers have the highest global acceptance rate — perfect for international service registrations.' },
    ru: { h2: 'Виртуальные номера США', p1: 'Американские номера (+1) принимаются почти всеми глобальными сервисами и особенно ценны для верификации в Google, Coinbase, Twitter, Instagram и TikTok.', p2: 'Американские номера имеют наивысший глобальный процент принятия — идеально для международной регистрации.' },
  },
  kazakhstan: {
    en: { h2: 'Kazakhstan virtual phone numbers', p1: 'Kazakh phone numbers (+7) are widely accepted by Russian and CIS services. An excellent alternative to Russian numbers for SMS verification on platforms like VK, Telegram, and Yandex.', p2: 'Fast delivery and affordable pricing make Kazakh numbers a popular choice.' },
    ru: { h2: 'Виртуальные номера Казахстана', p1: 'Казахстанские номера (+7) широко принимаются российскими и СНГ-сервисами. Отличная альтернатива российским номерам для SMS-верификации на платформах ВК, Telegram и Яндекс.', p2: 'Быстрая доставка и доступные цены делают казахстанские номера популярным выбором.' },
  },
  turkey: {
    en: { h2: 'Turkey virtual phone numbers', p1: 'Turkish phone numbers (+90) are excellent for international service registrations. Widely accepted by WhatsApp, Telegram, Instagram, and many global platforms.', p2: 'Turkish numbers offer great value and fast SMS delivery for popular app verifications.' },
    ru: { h2: 'Виртуальные номера Турции', p1: 'Турецкие номера (+90) отлично подходят для регистрации на международных сервисах. Широко принимаются WhatsApp, Telegram, Instagram и многими глобальными платформами.', p2: 'Турецкие номера обеспечивают хорошее соотношение цены и качества, быструю доставку SMS для верификации.' },
  },
  china: {
    en: { h2: 'China virtual phone numbers', p1: 'Chinese phone numbers (+86) are especially useful for verifying accounts on international platforms that restrict Chinese users, and for accessing region-specific services.', p2: 'Our Chinese numbers support WeChat, TikTok, Alibaba and other Chinese platform verifications.' },
    ru: { h2: 'Виртуальные номера Китая', p1: 'Китайские номера (+86) особенно полезны для верификации аккаунтов на международных платформах и для доступа к региональным сервисам.', p2: 'Наши китайские номера поддерживают верификацию в WeChat, TikTok, Alibaba и других платформах.' },
  },
  indonesia: {
    en: { h2: 'Indonesia virtual phone numbers', p1: 'Indonesian phone numbers (+62) are cost-effective and accepted by all major global services. Indonesia is one of the fastest-growing markets for digital service registrations.', p2: 'Get an Indonesian virtual number instantly and verify your accounts on any platform.' },
    ru: { h2: 'Виртуальные номера Индонезии', p1: 'Индонезийские номера (+62) экономичны и принимаются всеми крупными глобальными сервисами.', p2: 'Получите виртуальный индонезийский номер мгновенно и верифицируйте аккаунты на любой платформе.' },
  },
  uk: {
    en: { h2: 'UK virtual phone numbers', p1: 'British phone numbers (+44) are trusted globally and accepted by all major platforms including Google, WhatsApp, Coinbase, Twitch, Twitter, and Instagram.', p2: 'UK numbers are ideal for opening accounts that require high-trust western phone numbers.' },
    ru: { h2: 'Виртуальные номера Великобритании', p1: 'Британские номера (+44) признаны во всём мире и принимаются всеми крупными платформами: Google, WhatsApp, Coinbase, Twitch, Twitter и Instagram.', p2: 'Номера Великобритании идеальны для открытия аккаунтов, требующих надёжных западных номеров.' },
  },
  ukraine: {
    en: { h2: 'Ukraine virtual phone numbers', p1: 'Ukrainian phone numbers (+380) are widely accepted across CIS and European platforms. Great for Telegram, WhatsApp, and social media registrations.', p2: 'Ukrainian numbers are affordable and reliable — get one instantly for your registration needs.' },
    ru: { h2: 'Виртуальные номера Украины', p1: 'Украинские номера (+380) широко принимаются на CIS и европейских платформах. Отлично подходят для регистрации в Telegram, WhatsApp и социальных сетях.', p2: 'Украинские номера доступны по цене и надёжны — получите мгновенно.' },
  },
  germany: {
    en: { h2: 'Germany virtual phone numbers', p1: 'German phone numbers (+49) are among the most trusted European numbers. They are accepted by all global services and are particularly useful for Google, PayPal, and financial service verifications.', p2: 'A German virtual number gives you access to EU-only features on many platforms.' },
    ru: { h2: 'Виртуальные номера Германии', p1: 'Немецкие номера (+49) среди наиболее доверенных европейских номеров. Принимаются всеми глобальными сервисами, особенно для верификации в Google, PayPal и финансовых сервисах.', p2: 'Немецкий виртуальный номер даёт доступ к европейским функциям многих платформ.' },
  },
  'south-korea': {
    en: { h2: 'South Korea virtual phone numbers', p1: 'South Korean phone numbers (+82) are accepted by international platforms and are especially useful for K-pop fandoms, gaming services, and tech platform registrations.', p2: 'Get a Korean virtual number instantly for fast SMS verification on any service.' },
    ru: { h2: 'Виртуальные номера Южной Кореи', p1: 'Южнокорейские номера (+82) принимаются международными платформами и особенно полезны для K-pop сообществ, игровых сервисов и регистрации на технических платформах.', p2: 'Получите корейский виртуальный номер мгновенно для быстрой SMS-верификации.' },
  },
  taiwan: {
    en: { h2: 'Taiwan virtual phone numbers', p1: 'Taiwanese phone numbers (+886) are useful for Asian market service registrations. Accepted by major global platforms for SMS verification.', p2: 'Instant delivery and reliable SMS reception with Taiwanese virtual numbers.' },
    ru: { h2: 'Виртуальные номера Тайваня', p1: 'Тайваньские номера (+886) полезны для регистрации на сервисах азиатского рынка и принимаются крупными глобальными платформами.', p2: 'Мгновенная доставка и надёжное получение SMS с тайваньскими виртуальными номерами.' },
  },
  canada: {
    en: { h2: 'Canada virtual phone numbers', p1: 'Canadian phone numbers (+1) share the North American numbering plan with the USA, making them equally trusted by global services. Ideal for Coinbase, Twitter, and Google verifications.', p2: 'Canadian numbers are highly accepted worldwide — a great alternative to US numbers.' },
    ru: { h2: 'Виртуальные номера Канады', p1: 'Канадские номера (+1) входят в северноамериканский план нумерации вместе с США, что делает их одинаково надёжными для глобальных сервисов.', p2: 'Канадские номера широко принимаются по всему миру — отличная альтернатива американским.' },
  },
  poland: {
    en: { h2: 'Poland virtual phone numbers', p1: 'Polish phone numbers (+48) are trusted EU numbers accepted by major global platforms. Perfect for European service registrations and EU-specific account access.', p2: 'Polish virtual numbers offer great value with fast SMS delivery across all major services.' },
    ru: { h2: 'Виртуальные номера Польши', p1: 'Польские номера (+48) — надёжные европейские номера, принимаемые крупными глобальными платформами. Идеальны для европейских сервисов.', p2: 'Польские виртуальные номера обеспечивают хорошее соотношение цены и качества.' },
  },
  india: {
    en: { h2: 'India virtual phone numbers', p1: 'Indian phone numbers (+91) are widely accepted by global services. With over a billion mobile subscribers, Indian numbers are trusted by WhatsApp, Google, Instagram, and more.', p2: 'Affordable Indian virtual numbers with fast SMS delivery for all major platform verifications.' },
    ru: { h2: 'Виртуальные номера Индии', p1: 'Индийские номера (+91) широко принимаются глобальными сервисами: WhatsApp, Google, Instagram и другими.', p2: 'Доступные индийские виртуальные номера с быстрой доставкой SMS.' },
  },
  australia: {
    en: { h2: 'Australia virtual phone numbers', p1: 'Australian phone numbers (+61) are premium English-speaking market numbers accepted by all global platforms. Especially useful for Coinbase, Twitter, and financial service verifications.', p2: 'Australian numbers give you access to features limited to English-speaking markets on many platforms.' },
    ru: { h2: 'Виртуальные номера Австралии', p1: 'Австралийские номера (+61) — первоклассные номера англоязычного рынка, принимаемые всеми глобальными платформами. Особенно полезны для Coinbase и финансовых сервисов.', p2: 'Австралийские номера открывают доступ к функциям, ограниченным англоязычными рынками.' },
  },
  japan: {
    en: { h2: 'Japan virtual phone numbers', p1: 'Japanese phone numbers (+81) are highly trusted and accepted by all major global platforms. Essential for accessing Japan-specific services, gaming platforms, and international registrations.', p2: 'Japanese virtual numbers are in high demand — get yours instantly for reliable SMS verification.' },
    ru: { h2: 'Виртуальные номера Японии', p1: 'Японские номера (+81) пользуются высоким доверием и принимаются всеми крупными глобальными платформами. Необходимы для доступа к японским сервисам и игровым платформам.', p2: 'Японские виртуальные номера пользуются большим спросом — получите свой мгновенно.' },
  },
  netherlands: {
    en: { h2: 'Netherlands virtual phone numbers', p1: 'Dutch phone numbers (+31) are reliable EU numbers perfect for European service registrations. Accepted by all major global platforms with high trust ratings.', p2: 'Netherlands numbers are great for accessing EU-specific services and features on global platforms.' },
    ru: { h2: 'Виртуальные номера Нидерландов', p1: 'Нидерландские номера (+31) — надёжные европейские номера для регистрации в европейских сервисах.', p2: 'Номера Нидерландов отлично подходят для доступа к европейским функциям глобальных платформ.' },
  },
  finland: {
    en: { h2: 'Finland virtual phone numbers', p1: 'Finnish phone numbers (+358) are clean EU numbers with excellent acceptance rates across all major platforms. Finland is known for high-quality telecom infrastructure.', p2: 'Finnish virtual numbers deliver SMS reliably and quickly for any verification need.' },
    ru: { h2: 'Виртуальные номера Финляндии', p1: 'Финские номера (+358) — чистые европейские номера с отличным процентом принятия на всех крупных платформах.', p2: 'Финские виртуальные номера надёжно и быстро доставляют SMS для любой верификации.' },
  },
  brazil: {
    en: { h2: 'Brazil virtual phone numbers', p1: 'Brazilian phone numbers (+55) are the go-to choice for Latin American market registrations. Widely accepted by WhatsApp, Instagram, Facebook, and all major global services.', p2: 'Brazilian numbers are affordable and deliver SMS fast — ideal for both personal and business use.' },
    ru: { h2: 'Виртуальные номера Бразилии', p1: 'Бразильские номера (+55) — основной выбор для регистрации на латиноамериканском рынке. Широко принимаются WhatsApp, Instagram и всеми крупными сервисами.', p2: 'Бразильские номера доступны и быстро доставляют SMS — для личного и делового использования.' },
  },
  uzbekistan: {
    en: { h2: 'Uzbekistan virtual phone numbers', p1: 'Uzbek phone numbers (+998) are accepted by major CIS and international services. A growing market with reliable SMS infrastructure for Telegram, WhatsApp, and other verifications.', p2: 'Uzbekistan virtual numbers offer excellent value and quick SMS delivery.' },
    ru: { h2: 'Виртуальные номера Узбекистана', p1: 'Узбекские номера (+998) принимаются крупными СНГ и международными сервисами. Растущий рынок с надёжной SMS-инфраструктурой для Telegram, WhatsApp и других верификаций.', p2: 'Виртуальные номера Узбекистана обеспечивают отличное соотношение цены и качества.' },
  },
  hongkong: {
    en: { h2: 'Hong Kong virtual phone numbers', p1: 'Hong Kong phone numbers (+852) bridge East and West — accepted by both Asian and Western platforms. Ideal for registrations that require a trusted Asian number without mainland China restrictions.', p2: 'Hong Kong numbers are perfect for crypto, finance, and international platform verifications.' },
    ru: { h2: 'Виртуальные номера Гонконга', p1: 'Гонконгские номера (+852) — мост между Востоком и Западом: принимаются как азиатскими, так и западными платформами. Идеальны для регистраций, требующих надёжного азиатского номера без ограничений материкового Китая.', p2: 'Гонконгские номера идеальны для криптовалюты, финансов и верификации на международных платформах.' },
  },
}

export async function generateStaticParams() {
  const langs = ['en', 'ru']
  return langs.flatMap((lang) =>
    COUNTRIES.map((c) => ({ lang, slug: c.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const country = COUNTRY_MAP[slug as CountrySlug]
  if (!country) return {}
  const isRu = lang === 'ru'
  return {
    title: isRu
      ? `Виртуальные номера ${country.name} — SMS онлайн`
      : `Virtual numbers from ${country.name} — SMS online`,
    description: isRu
      ? `Получите виртуальный номер ${country.flag} ${country.name} для SMS-верификации. Мгновенно, анонимно, дёшево.`
      : `Get a virtual phone number from ${country.flag} ${country.name} for SMS verification. Instant, anonymous, affordable.`,
    robots: { index: false, follow: false },
  }
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()

  const country = COUNTRY_MAP[slug as CountrySlug]
  if (!country) notFound()

  const dict = await getDictionary(lang as Locale)
  const seo = COUNTRY_SEO[country.slug]?.[lang as 'en' | 'ru'] ?? COUNTRY_SEO.russia[lang as 'en' | 'ru']

  return (
    <section className="section">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href={`/${lang}`}>{lang === 'ru' ? 'Главная' : 'Home'}</Link>
          <span>/</span>
          <span>{country.flag} {country.name}</span>
        </div>

        {/* Country Header */}
        <div className="service-page-header">
          <span style={{ fontSize: '4rem', lineHeight: 1 }}>{country.flag}</span>
          <div className="service-page-title">
            <h1>
              {dict.country_page.numbers_from} {country.name}
            </h1>
            <p>{country.code} · {lang === 'ru' ? 'Виртуальные номера для SMS-верификации' : 'Virtual numbers for SMS verification'}</p>
          </div>
        </div>

        <div className="page-grid">
          {/* Main */}
          <div>
            {/* SEO block */}
            <div className="seo-block">
              <h2>{seo.h2}</h2>
              <p>{seo.p1}</p>
              <p>{seo.p2}</p>
            </div>

            {/* Why this country */}
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '2rem 0 1rem' }}>
              {dict.country_page.why_this_country}
            </h2>
            <ul className="check-list">
              <li>{dict.country_page.local_numbers}</li>
              <li>{dict.country_page.accepted_globally}</li>
              <li>{dict.country_page.instant_delivery}</li>
              <li>{lang === 'ru' ? 'Без регистрации' : 'No registration required'}</li>
              <li>{lang === 'ru' ? 'Конкурентные цены' : 'Competitive pricing'}</li>
            </ul>

            {/* Available services */}
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '2rem 0 1rem' }}>
              {dict.country_page.available_services}
            </h2>
            <div className="services-grid">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/${lang}/service/${service.slug}`}
                  className="service-card"
                  style={{ '--card-color': service.color } as React.CSSProperties}
                >
                  <div className="service-icon" style={{ background: `${service.color}22` }}>
                    <span>{service.emoji}</span>
                  </div>
                  <span className="service-name">{service.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="country-sidebar" style={{ position: 'sticky', top: '80px' }}>
            <div className="cta-banner" style={{ textAlign: 'left', padding: '1.5rem' }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.75rem' }}>{country.flag}</span>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{country.name}</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                {country.code}
              </p>
              <Link href="/go" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {dict.country_page.get_number}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
