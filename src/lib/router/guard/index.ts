import type { Router } from 'vue-router'
// @ts-ignore
import NProgress from "nprogress"
import '@/assets/style/nprogress.css'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

function setupPageGuard(context: Router) {
    context.beforeEach(async  (to, from, next) => {
        NProgress.start()

        next();
    })

    context.afterEach(() => {
        NProgress.done()
    })
}

export default function createRouteGuard(ctx: Router) {
    setupPageGuard(ctx)
}