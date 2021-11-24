import { intl } from 'serpens'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import ruRU from 'antd/lib/locale/ru_RU'

export const locales = {
	'zh-CN': '简体中文',
	'ru-RU': 'Россия',
	'en-US': 'English(US)',
}

export type Locales = keyof typeof locales

export const initializeLanguage = () => {
	const languages = Object.keys(locales)
	const localeStorageLanguage = localStorage.getItem('locale')
	const browserLocaleLanguage = navigator.language
	const lang = localeStorageLanguage || browserLocaleLanguage
	const initLanguage = languages.find(item => {
		return lang === item || new RegExp(item).test(lang.substr(1, 2))
	})
	intl.locale( 'en-US')
}

export const useAntdesignLocale = (locale: Locales) => {
	const localesData = {
		'zh-CN': zhCN,
		'en-US': enUS,
		'ru-RU': ruRU,
	}
	const shouldLocale = localesData[locale] || zhCN
	return shouldLocale
}
