import { createI18n } from 'vue-i18n'

import en from '../locales/en.json'
import zhCn from '../locales/zh-CN.json'

const DEFAULT_LOCALE = 'zh-CN'
const FALLBACK_LOCALE = 'en'

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  messages: {
    en,
    'zh-CN': zhCn,
  },
  globalInjection: true,
})

if (typeof window !== 'undefined') {
  window.i18n = i18n
}

export default i18n

