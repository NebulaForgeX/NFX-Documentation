import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

export type Language = 'zh' | 'en'

export const LANGUAGE = {
  ZH: 'zh' as Language,
  EN: 'en' as Language,
} as const

// 从localStorage恢复语言设置，默认使用英文
const savedLang = typeof localStorage !== 'undefined' ? localStorage.getItem('nfx-documentation-language') : null
const defaultLocale = (savedLang && (savedLang === 'zh' || savedLang === 'en')) ? savedLang : LANGUAGE.EN

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: LANGUAGE.EN,
  messages: {
    zh,
    en,
  },
})

export default i18n

export const changeLanguage = (lang: Language) => {
  i18n.global.locale.value = lang
}

