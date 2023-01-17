import type {RouteRecordRaw} from "vue-router/auto"

import Dashboard from "@/views/index.vue"

const Login = () => import("@/views/user/login.vue")
const Redirect = () => import("@/components/redirect.vue")
const NotFound = () => import("@/views/[...404].vue")

/** @type {import('vue-router/auto').RouterOptions['routes']} */
export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            title: "routes.home"
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: "routes.login",
            requiresAuth: false,
            notUseLayout: true
        }
    },
    // {
    //     path: '/redirect/:path',
    //     redirect: to => {
    //         return { path: '/redirect', query: { path: to.params.path } }
    //     }
    // },
    // {
    //     path: '/redirect',
    //     name: 'Redirect',
    //     component: Redirect,
    // },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFound,
        meta: {
            title: "routes.notFound",
            requiresAuth: false,
        }
    }
]