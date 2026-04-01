export type ServiceSlug =
  | 'telegram'
  | 'vkontakte'
  | 'youtube'
  | 'avito'
  | 'yandex'
  | 'whatsapp'
  | 'roblox'
  | 'samokat'
  | 'twitch'
  | 'tiktok'
  | 'ozon'
  | 'instagram'
  | 'google'
  | 'twitter'
  | 'blizzard'
  | 'coinbase'
  | 'wildberries'

export type CountrySlug =
  | 'russia'
  | 'usa'
  | 'kazakhstan'
  | 'turkey'
  | 'china'
  | 'indonesia'
  | 'uk'
  | 'ukraine'
  | 'germany'
  | 'south-korea'
  | 'taiwan'
  | 'canada'
  | 'poland'
  | 'india'
  | 'australia'
  | 'japan'
  | 'netherlands'
  | 'finland'
  | 'brazil'
  | 'uzbekistan'
  | 'hongkong'

export interface Service {
  slug: ServiceSlug
  name: string
  color: string
  emoji: string
}

export interface Country {
  slug: CountrySlug
  name: string
  flag: string
  code: string
}

export const SERVICES: Service[] = [
  { slug: 'telegram', name: 'Telegram', color: '#229ED9', emoji: '✈️' },
  { slug: 'vkontakte', name: 'VKontakte', color: '#4680C2', emoji: '🅥' },
  { slug: 'youtube', name: 'YouTube', color: '#FF0000', emoji: '▶️' },
  { slug: 'avito', name: 'Avito', color: '#00AEEF', emoji: '🛒' },
  { slug: 'yandex', name: 'Yandex', color: '#FF0000', emoji: '🔴' },
  { slug: 'whatsapp', name: 'WhatsApp', color: '#25D366', emoji: '💬' },
  { slug: 'roblox', name: 'Roblox', color: '#E83B3B', emoji: '🎮' },
  { slug: 'samokat', name: 'Samokat', color: '#FF6B35', emoji: '🛵' },
  { slug: 'twitch', name: 'Twitch', color: '#9146FF', emoji: '🎙️' },
  { slug: 'tiktok', name: 'TikTok', color: '#010101', emoji: '🎵' },
  { slug: 'ozon', name: 'Ozon', color: '#005BFF', emoji: '🛍️' },
  { slug: 'instagram', name: 'Instagram', color: '#E1306C', emoji: '📸' },
  { slug: 'google', name: 'Google', color: '#4285F4', emoji: '🔵' },
  { slug: 'twitter', name: 'Twitter / X', color: '#1DA1F2', emoji: '🐦' },
  { slug: 'blizzard', name: 'Blizzard', color: '#148EFF', emoji: '🎮' },
  { slug: 'coinbase', name: 'Coinbase', color: '#1652F0', emoji: '💰' },
  { slug: 'wildberries', name: 'Wildberries', color: '#CB11AB', emoji: '🛒' },
]

export const COUNTRIES: Country[] = [
  { slug: 'russia', name: 'Russia', flag: '🇷🇺', code: '+7' },
  { slug: 'usa', name: 'USA', flag: '🇺🇸', code: '+1' },
  { slug: 'kazakhstan', name: 'Kazakhstan', flag: '🇰🇿', code: '+7' },
  { slug: 'turkey', name: 'Turkey', flag: '🇹🇷', code: '+90' },
  { slug: 'china', name: 'China', flag: '🇨🇳', code: '+86' },
  { slug: 'indonesia', name: 'Indonesia', flag: '🇮🇩', code: '+62' },
  { slug: 'uk', name: 'United Kingdom', flag: '🇬🇧', code: '+44' },
  { slug: 'ukraine', name: 'Ukraine', flag: '🇺🇦', code: '+380' },
  { slug: 'germany', name: 'Germany', flag: '🇩🇪', code: '+49' },
  { slug: 'south-korea', name: 'South Korea', flag: '🇰🇷', code: '+82' },
  { slug: 'taiwan', name: 'Taiwan', flag: '🇹🇼', code: '+886' },
  { slug: 'canada', name: 'Canada', flag: '🇨🇦', code: '+1' },
  { slug: 'poland', name: 'Poland', flag: '🇵🇱', code: '+48' },
  { slug: 'india', name: 'India', flag: '🇮🇳', code: '+91' },
  { slug: 'australia', name: 'Australia', flag: '🇦🇺', code: '+61' },
  { slug: 'japan', name: 'Japan', flag: '🇯🇵', code: '+81' },
  { slug: 'netherlands', name: 'Netherlands', flag: '🇳🇱', code: '+31' },
  { slug: 'finland', name: 'Finland', flag: '🇫🇮', code: '+358' },
  { slug: 'brazil', name: 'Brazil', flag: '🇧🇷', code: '+55' },
  { slug: 'uzbekistan', name: 'Uzbekistan', flag: '🇺🇿', code: '+998' },
  { slug: 'hongkong', name: 'Hong Kong', flag: '🇭🇰', code: '+852' },
]

export const SERVICE_MAP = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s])
) as Record<ServiceSlug, Service>

export const COUNTRY_MAP = Object.fromEntries(
  COUNTRIES.map((c) => [c.slug, c])
) as Record<CountrySlug, Country>
