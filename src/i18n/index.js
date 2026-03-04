/**
 * vue-i18n configuration.
 */
import { createI18n } from 'vue-i18n'
import cs from './cs.json'
import en from './en.json'

const i18n = createI18n({
  legacy: false,
  locale: 'cs',
  fallbackLocale: 'cs',
  messages: { cs, en },
})

export default i18n
