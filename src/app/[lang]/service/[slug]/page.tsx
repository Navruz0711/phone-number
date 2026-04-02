import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getDictionary, hasLocale } from '../../dictionaries'
import type { Locale } from '../../dictionaries'
import { SERVICES, COUNTRIES, SERVICE_MAP } from '@/lib/data'
import type { ServiceSlug } from '@/lib/data'

const SERVICE_SEO: Record<
  ServiceSlug,
  { en: { h2: string; p1: string; p2: string }; ru: { h2: string; p1: string; p2: string } }
> = {
  telegram: {
    en: {
      h2: 'Why use a virtual number for Telegram?',
      p1: 'Telegram requires a valid phone number for account registration and verification. With a virtual number, you can create multiple accounts without exposing your personal phone number. Our service provides real SIM-based numbers that pass Telegram\'s verification instantly.',
      p2: 'Whether you need a secondary account for business, privacy, or testing bots, our virtual numbers for Telegram are the fastest and most affordable solution available.',
    },
    ru: {
      h2: 'Зачем нужен виртуальный номер для Telegram?',
      p1: 'Telegram требует действующий номер телефона для регистрации и верификации аккаунта. С виртуальным номером вы можете создавать несколько аккаунтов, не раскрывая свой личный номер. Наш сервис предоставляет реальные SIM-номера, которые мгновенно проходят верификацию в Telegram.',
      p2: 'Нужен второй аккаунт для бизнеса, конфиденциальности или тестирования ботов — наши виртуальные номера для Telegram это самое быстрое и доступное решение.',
    },
  },
  whatsapp: {
    en: {
      h2: 'Virtual numbers for WhatsApp registration',
      p1: 'WhatsApp account registration requires SMS verification to a phone number. Our virtual numbers let you register WhatsApp accounts in seconds from any country without using your personal SIM card.',
      p2: 'Use numbers from Russia, USA, UK, Germany and 17 other countries to pass WhatsApp verification smoothly.',
    },
    ru: {
      h2: 'Виртуальные номера для регистрации WhatsApp',
      p1: 'Регистрация в WhatsApp требует верификации по SMS. Наши виртуальные номера позволяют регистрировать аккаунты WhatsApp за секунды из любой страны без использования личной SIM-карты.',
      p2: 'Используйте номера из России, США, Великобритании, Германии и 17 других стран для прохождения верификации WhatsApp.',
    },
  },
  google: {
    en: {
      h2: 'Create Google accounts with virtual numbers',
      p1: 'Google requires phone verification for new account creation and for securing existing accounts. Our virtual numbers bypass the need to share your personal phone number with Google, ensuring your privacy.',
      p2: 'Get a verified Google account in minutes using a virtual number from any of our 21 supported countries.',
    },
    ru: {
      h2: 'Создание аккаунтов Google с виртуальными номерами',
      p1: 'Google требует верификацию по телефону при создании нового аккаунта и для защиты существующих. Наши виртуальные номера позволяют не раскрывать личный номер Google, сохраняя вашу конфиденциальность.',
      p2: 'Получите верифицированный аккаунт Google за несколько минут, используя виртуальный номер из любой из 21 поддерживаемой нами страны.',
    },
  },
  instagram: {
    en: {
      h2: 'Instagram verification with virtual numbers',
      p1: 'Instagram requires phone number verification during signup and for account recovery. Virtual numbers let you register multiple Instagram accounts or verify an existing account securely.',
      p2: 'Our numbers are fresh and not flagged by Instagram, giving you a smooth registration experience every time.',
    },
    ru: {
      h2: 'Верификация Instagram с помощью виртуальных номеров',
      p1: 'Instagram требует верификацию по номеру телефона при регистрации и восстановлении аккаунта. Виртуальные номера позволяют регистрировать несколько аккаунтов Instagram или безопасно верифицировать существующий.',
      p2: 'Наши номера свежие и не заблокированы Instagram, что обеспечивает плавную регистрацию каждый раз.',
    },
  },
  tiktok: {
    en: {
      h2: 'TikTok account creation using virtual numbers',
      p1: 'TikTok requires SMS verification for account registration. Our virtual numbers from multiple countries let you create TikTok accounts without revealing your personal phone number.',
      p2: 'Choose from numbers in USA, UK, Germany, and more to get your TikTok account verified in seconds.',
    },
    ru: {
      h2: 'Создание аккаунта TikTok с виртуальным номером',
      p1: 'TikTok требует SMS-верификацию для регистрации аккаунта. Наши виртуальные номера из разных стран позволяют создавать аккаунты TikTok, не раскрывая личный номер телефона.',
      p2: 'Выбирайте номера из США, Великобритании, Германии и других стран, чтобы верифицировать аккаунт TikTok за секунды.',
    },
  },
  vkontakte: {
    en: {
      h2: 'VKontakte registration with virtual numbers',
      p1: 'VK (VKontakte) requires phone verification during signup. Our Russian and international virtual numbers pass VK verification without issues.',
      p2: 'Russian phone numbers have the highest acceptance rate for VK registration. Get yours instantly.',
    },
    ru: {
      h2: 'Регистрация ВКонтакте с виртуальным номером',
      p1: 'ВКонтакте требует верификацию по телефону при регистрации. Наши российские и международные виртуальные номера без проблем проходят верификацию ВК.',
      p2: 'Российские номера имеют наивысший процент принятия для регистрации ВК. Получите свой мгновенно.',
    },
  },
  youtube: {
    en: {
      h2: 'YouTube channel verification via virtual numbers',
      p1: 'YouTube uses Google accounts, which may require phone verification. Our virtual numbers help you create and verify YouTube channels without exposing your personal number.',
      p2: 'Manage multiple YouTube channels with ease — each with its own verified Google account.',
    },
    ru: {
      h2: 'Верификация YouTube-канала через виртуальные номера',
      p1: 'YouTube использует аккаунты Google, которые могут требовать верификацию по телефону. Наши виртуальные номера помогают создавать и верифицировать YouTube-каналы без раскрытия личного номера.',
      p2: 'Легко управляйте несколькими YouTube-каналами — каждый с собственным верифицированным аккаунтом Google.',
    },
  },
  avito: {
    en: {
      h2: 'Avito account registration with virtual numbers',
      p1: 'Avito is Russia\'s leading classifieds marketplace and requires phone number verification. Our Russian virtual numbers are perfect for creating Avito accounts quickly.',
      p2: 'Get a verified Avito account in seconds — no personal data required.',
    },
    ru: {
      h2: 'Регистрация на Авито с виртуальным номером',
      p1: 'Авито — ведущая доска объявлений в России — требует верификацию по номеру телефона. Наши российские виртуальные номера идеально подходят для быстрого создания аккаунтов на Авито.',
      p2: 'Получите верифицированный аккаунт Авито за секунды — без личных данных.',
    },
  },
  yandex: {
    en: {
      h2: 'Yandex account registration with virtual numbers',
      p1: 'Yandex services (Mail, Drive, Market, and more) require phone number verification. Our Russian virtual numbers are the ideal choice for Yandex account creation.',
      p2: 'Access the full Yandex ecosystem with a verified account created in minutes.',
    },
    ru: {
      h2: 'Регистрация аккаунта Яндекс с виртуальным номером',
      p1: 'Сервисы Яндекса (Почта, Диск, Маркет и другие) требуют верификацию по номеру телефона. Наши российские виртуальные номера — идеальный выбор для создания аккаунтов Яндекс.',
      p2: 'Получите доступ ко всей экосистеме Яндекс с верифицированным аккаунтом, созданным за несколько минут.',
    },
  },
  roblox: {
    en: {
      h2: 'Roblox account verification with virtual numbers',
      p1: 'Roblox allows phone number verification to unlock additional account features and security. Our virtual numbers from various countries work seamlessly with Roblox verification.',
      p2: 'Verify your Roblox account instantly and enjoy extra security and features.',
    },
    ru: {
      h2: 'Верификация аккаунта Roblox с виртуальным номером',
      p1: 'Roblox позволяет верифицировать аккаунт по номеру телефона для разблокировки дополнительных функций и повышения безопасности. Наши виртуальные номера из разных стран отлично работают с верификацией Roblox.',
      p2: 'Мгновенно верифицируйте аккаунт Roblox и получите дополнительные возможности безопасности.',
    },
  },
  samokat: {
    en: {
      h2: 'Samokat registration with virtual numbers',
      p1: 'Samokat, Russia\'s popular grocery delivery app, requires SMS verification during registration. Our Russian virtual numbers let you register a Samokat account quickly.',
      p2: 'Get registered on Samokat in seconds using a virtual Russian phone number.',
    },
    ru: {
      h2: 'Регистрация в Самокате с виртуальным номером',
      p1: 'Самокат — популярный сервис доставки продуктов в России — требует SMS-верификацию при регистрации. Наши российские виртуальные номера позволяют быстро зарегистрировать аккаунт в Самокате.',
      p2: 'Зарегистрируйтесь в Самокате за секунды с помощью виртуального российского номера.',
    },
  },
  twitch: {
    en: {
      h2: 'Twitch phone verification with virtual numbers',
      p1: 'Twitch requires phone verification to enable additional features like streaming. Our virtual numbers from USA, UK, Canada, and more work perfectly for Twitch verification.',
      p2: 'Start your streaming journey with a verified Twitch account — get a virtual number now.',
    },
    ru: {
      h2: 'Верификация Twitch по номеру телефона',
      p1: 'Twitch требует верификацию по телефону для включения дополнительных функций, включая стриминг. Наши виртуальные номера из США, Великобритании, Канады и других стран отлично работают для верификации Twitch.',
      p2: 'Начните стримерский путь с верифицированным аккаунтом Twitch — получите виртуальный номер прямо сейчас.',
    },
  },
  ozon: {
    en: {
      h2: 'Ozon marketplace account with virtual numbers',
      p1: 'Ozon, one of Russia\'s largest e-commerce platforms, requires phone verification for account registration. Our Russian virtual numbers are ideal for Ozon account creation.',
      p2: 'Create an Ozon buyer or seller account in minutes using a virtual phone number.',
    },
    ru: {
      h2: 'Аккаунт на маркетплейсе Ozon с виртуальным номером',
      p1: 'Ozon — один из крупнейших интернет-магазинов России — требует верификацию по телефону при регистрации. Наши российские виртуальные номера идеально подходят для создания аккаунтов на Ozon.',
      p2: 'Создайте аккаунт покупателя или продавца на Ozon за несколько минут с помощью виртуального номера.',
    },
  },
  twitter: {
    en: {
      h2: 'Twitter / X phone verification',
      p1: 'Twitter (now X) requires phone number verification for new accounts and for improving account trust scores. Our virtual numbers from multiple countries make Twitter registration smooth.',
      p2: 'Bypass Twitter\'s phone requirement while maintaining your anonymity — choose any of our 21 country numbers.',
    },
    ru: {
      h2: 'Верификация телефона в Twitter / X',
      p1: 'Twitter (теперь X) требует верификацию номера телефона для новых аккаунтов и для повышения рейтинга доверия. Наши виртуальные номера из разных стран делают регистрацию в Twitter плавной.',
      p2: 'Обойдите требование Twitter к телефону, сохраняя анонимность — выбирайте из 21 страны.',
    },
  },
  blizzard: {
    en: {
      h2: 'Blizzard Battle.net SMS verification',
      p1: 'Blizzard requires SMS verification for Battle.net accounts as part of their security measures for games like World of Warcraft, Diablo, and Overwatch.',
      p2: 'Our virtual numbers pass Blizzard\'s SMS verification reliably — get gaming immediately.',
    },
    ru: {
      h2: 'SMS-верификация Blizzard Battle.net',
      p1: 'Blizzard требует SMS-верификацию для аккаунтов Battle.net в рамках мер безопасности для игр World of Warcraft, Diablo и Overwatch.',
      p2: 'Наши виртуальные номера надёжно проходят SMS-верификацию Blizzard — можно сразу играть.',
    },
  },
  coinbase: {
    en: {
      h2: 'Coinbase account verification with virtual numbers',
      p1: 'Coinbase requires phone number verification as part of their Know Your Customer (KYC) process. Our virtual numbers from USA, UK, Canada, and Australia are accepted by Coinbase.',
      p2: 'Start trading crypto securely with a Coinbase-verified account — get your virtual number today.',
    },
    ru: {
      h2: 'Верификация аккаунта Coinbase с виртуальным номером',
      p1: 'Coinbase требует верификацию по номеру телефона как часть процедуры KYC. Наши виртуальные номера из США, Великобритании, Канады и Австралии принимаются Coinbase.',
      p2: 'Безопасно торгуйте криптовалютой с верифицированным аккаунтом Coinbase — получите номер уже сегодня.',
    },
  },
  wildberries: {
    en: {
      h2: 'Wildberries registration using virtual numbers',
      p1: 'Wildberries, Russia\'s #1 fashion and lifestyle marketplace, requires SMS verification during account creation. Our Russian virtual numbers are perfect for Wildberries registration.',
      p2: 'Shop on Wildberries anonymously with a virtual Russian phone number — instant setup.',
    },
    ru: {
      h2: 'Регистрация на Wildberries с виртуальным номером',
      p1: 'Wildberries — маркетплейс №1 в России — требует SMS-верификацию при создании аккаунта. Наши российские виртуальные номера идеально подходят для регистрации на Wildberries.',
      p2: 'Совершайте покупки на Wildberries анонимно с виртуальным российским номером — мгновенная настройка.',
    },
  },
}

export async function generateStaticParams() {
  const langs = ['en', 'ru']
  return langs.flatMap((lang) =>
    SERVICES.map((s) => ({ lang, slug: s.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const service = SERVICE_MAP[slug as ServiceSlug]
  if (!service) return {}
  const isRu = lang === 'ru'
  return {
    title: isRu
      ? `Виртуальный номер для ${service.name} — купить SMS онлайн`
      : `Virtual number for ${service.name} — Buy SMS online`,
    description: isRu
      ? `Получите виртуальный номер для верификации в ${service.name}. Быстро, анонимно, дёшево. 21 страна на выбор.`
      : `Get a virtual number for ${service.name} verification. Fast, anonymous, affordable. 21 countries available.`,
    robots: { index: false, follow: false },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()

  const service = SERVICE_MAP[slug as ServiceSlug]
  if (!service) notFound()

  const dict = await getDictionary(lang as Locale)
  const seo = SERVICE_SEO[service.slug]?.[lang as 'en' | 'ru'] ?? SERVICE_SEO.telegram[lang as 'en' | 'ru']

  return (
    <>
      <section className="section">
        <div className="container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link href={`/${lang}`}>{lang === 'ru' ? 'Главная' : 'Home'}</Link>
            <span>/</span>
            <span>{service.name}</span>
          </div>

          {/* Service Header */}
          <div className="service-page-header">
            <div
              className="service-page-logo"
              style={{ background: `${service.color}22` }}
            >
              <span>{service.emoji}</span>
            </div>
            <div className="service-page-title">
              <h1>
                {dict.service_page.receive_sms} {service.name}
              </h1>
              <p>{lang === 'ru' ? 'Виртуальный номер для SMS-верификации' : 'Virtual number for SMS verification'}</p>
            </div>
          </div>

          <div className="page-grid">
            {/* Main content */}
            <div>
              {/* How it works */}
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.25rem', fontSize: '1.25rem' }}>
                {dict.service_page.how_it_works}
              </h2>
              <div className="steps">
                <div className="step">
                  <span className="step-number">1</span>
                  <p>{dict.service_page.step1}</p>
                </div>
                <div className="step">
                  <span className="step-number">2</span>
                  <p>{dict.service_page.step2}</p>
                </div>
                <div className="step">
                  <span className="step-number">3</span>
                  <p>{dict.service_page.step3}</p>
                </div>
              </div>

              {/* SEO block */}
              <div className="seo-block" style={{ marginTop: '2rem' }}>
                <h2>{seo.h2}</h2>
                <p>{seo.p1}</p>
                <p>{seo.p2}</p>
              </div>

              {/* Available countries */}
              <h2
                className="section-title"
                style={{ textAlign: 'left', fontSize: '1.2rem', margin: '2rem 0 1rem' }}
              >
                {dict.service_page.available_countries}
              </h2>
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

            {/* Sidebar */}
            <div className="service-sidebar" style={{ position: 'sticky', top: '80px' }}>
              <div className="cta-banner" style={{ textAlign: 'left', padding: '1.5rem' }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: `${service.color}22`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem',
                    marginBottom: '1rem',
                  }}
                >
                  {service.emoji}
                </div>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{service.name}</h2>
                <p style={{ marginBottom: '1.25rem', fontSize: '0.875rem' }}>
                  {lang === 'ru'
                    ? 'Получите номер и пройдите верификацию за секунды'
                    : 'Get a number and pass verification in seconds'}
                </p>
                <Link href="/go" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  {dict.service_page.get_number}
                </Link>

                <div style={{ marginTop: '1.5rem' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginBottom: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {dict.service_page.why_us}
                  </p>
                  <ul className="check-list">
                    <li>{dict.service_page.instant}</li>
                    <li>{dict.service_page.cheap}</li>
                    <li>{dict.service_page.reliable}</li>
                    <li>{dict.service_page.anonymous}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
