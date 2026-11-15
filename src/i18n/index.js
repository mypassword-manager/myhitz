import { createI18n } from 'vue-i18n'
import en from './en.json'
import ms from './ms.json'

const saved = localStorage.getItem('lang') || 'en'
export default createI18n({
  legacy: false, locale: saved, fallbackLocale: 'en',
  messages: { en, ms }
})