import i18nRoutes from '@/lib/router/i18n/en_US'

/** Simplified import start */
import i18nGlobalHeader from '@/components/layout/i18n/zh_CN'
import i18nViews from '@/views/i18n/zh_CN'
/** Simplified import end */

export const zh_CN = {
    test: '测试2',
    // ...more localized files here
    ...i18nGlobalHeader,
    ...i18nRoutes,
    ...i18nViews,
}