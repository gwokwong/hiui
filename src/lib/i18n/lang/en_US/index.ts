import i18nRoutes from '@/lib/router/i18n/en_US'

/** Simplified import start */
import i18nGlobalHeader from '@/components/layout/i18n/en_US'
import i18nViews from '@/views/i18n/en_US'
import i18nUser from "@/views/user/i18n/en_US"
/** Simplified import end */

export const en_US = {
    test: 'test2',
    // ...more localized files here
    ...i18nGlobalHeader,
    ...i18nRoutes,
    ...i18nViews,
    ...i18nUser,
}