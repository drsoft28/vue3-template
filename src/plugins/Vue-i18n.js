import { createI18n } from 'vue-i18n'
import Cookies from 'js-cookie'
// Import locale files

export const defaul_locale = 'en'
export const fallback_locale = 'en'
export const availableLocales = [
  {
    code: 'Ar',
    locale: 'ar',
    label: 'عربي',
    abref: 'ع',
    direction: 'rtl',
    flag: '🇩🇿',
  },
  {
    code: 'En',
    locale: 'en',
    label: 'English',
    abref: 'En',
    direction: 'ltr',
    flag: '🇺🇸',
  },
  {
    code: 'Fr',
    locale: 'fr',
    label: 'Français',
    abref: 'Fr',
    direction: 'ltr',
    flag: '🇫🇷',
  },
]
export const listavailableLocales = () => {
  return availableLocales.map((l) => l.locale)
}
export const getCurrentLanguage = () => {
  return Cookies.get('i18n_lang') ?? defaul_locale
}
// Create I18n instance
const i18n = createI18n({
  locale: defaul_locale, // Default locale
  fallbackLocale: fallback_locale, // Fallback locale
  messages: {},
})
// Dynamically load a locale
export const loadLocaleMessages = async (locale) => {
  const messages = await import(`../locales/${locale}.json`)
  i18n.global.setLocaleMessage(locale, messages.default)
}
// Dynamically load a default locale
export const loadLocaleDefaultMessages = async () => {
  loadLocaleMessages(getCurrentLanguage())
}

// Change the locale dynamically
async function setLocale(locale) {
  if (!i18n.global.availableLocales.includes(locale)) {
    await loadLocaleMessages(locale)
  }
  i18n.global.locale.value = locale
}

export { i18n, setLocale }
