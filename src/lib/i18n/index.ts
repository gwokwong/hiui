import {nextTick} from "vue"
import type {I18n} from "vue-i18n"
import {createI18n} from "vue-i18n"
import {zh_CN} from "./lang/zh_CN"
import {en_US} from "./lang/en_US"

interface I18nOptions {
    locale: string
}

export const LOCALE_OPTIONS = new Map([
    ["zh_CN", "中文(简体)"],
    ["en_US", "English"]
])

const defaultLocale = localStorage.getItem('lang') || 'zh_CN'

const i18nOptions = {
    legacy: false,
    globalInjection: true, // 全局模式，可以直接使用 $t
    locale: defaultLocale,
    fallbackLocale: 'zh_CN',
    allowComposition: true,
    messages: {
        zh_CN: zh_CN,
        en_US: en_US
    }
}

export function setupI18n(options: I18nOptions = {locale:'zh_CN'}) {
    const i18n = createI18n(options)
    setI18nLanguage(i18n, options.locale)
    return i18n
}

export function setI18nLanguage(i18nInstance: I18n, locale: string): string {
    // 设置语言
    if (i18nInstance.mode === 'legacy') {
        i18nInstance.global.locale = locale
    } else {
        // @ts-ignore
        i18nInstance.global.locale.value = locale
    }

    /**
     * NOTE:
     * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
     * The following is an example for axios.
     *
     * axios.defaults.headers.common['Accept-Language'] = locale
     */

    // @ts-ignore
    // document.querySelector('html').setAttribute('lang', locale)
    localStorage.setItem('lang', locale)
    return locale
}

/**
* @function changeLanguage
* @description 切换语言并刷新
* @param {string} lang 语言对应字符串，比如简体中文"zh_CN"
* */
 export function changeLanguage(lang = 'zh_CN') {
    localStorage.setItem('lang', lang)
    window.location.reload()
}

const i18n = setupI18n(i18nOptions)

export default i18n