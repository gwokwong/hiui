import type { Router } from 'vue-router'
import i18n from "@/lib/i18n"
// @ts-ignore
import NProgress from "nprogress"
import '@/assets/style/nprogress.css'
import {useTitle} from "@vueuse/core"

import {useAppStore} from "@/lib/store/appStore"
import {storeToRefs} from "pinia"

NProgress.configure({ showSpinner: false }) // NProgress Configuration

function titleHandler(title: string) {
    const appStore = useAppStore()
    const { appName } = storeToRefs(appStore)

    if (title.length === 0) {
        useTitle(appName.value)
        return
    }

    const splicedTitle = `${i18n.global.t(title)} - ${appName.value}`
    useTitle(splicedTitle)
}

function setupPageGuard(context: Router) {
    context.beforeEach(async  (to, from, next) => {
        NProgress.start()

        next();
    })

    context.afterEach((to) => {
        titleHandler(to.meta.title as string)

        NProgress.done()
    })
}

export default function createRouteGuard(ctx: Router) {
    setupPageGuard(ctx)
}