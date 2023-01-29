import type {RouteRecordRaw} from "vue-router/auto"

import Dashboard from "@/views/index.vue"

const Login = () => import("@/views/user/login.vue")
// const Redirect = () => import("@/components/redirect.vue")
const Settings = () => import("@/views/settings/index.vue")
const VFormDesigner = () => import("@/views/vForm/designer.vue")
const VFormRender = () => import("@/views/vForm/components/vFormRender.vue")
const NotFound = () => import("@/views/[...404].vue")

/** @type {import('vue-router/auto').RouterOptions['routes']} */
export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
        meta: {
            title: "routes.dashboard"
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            title: "routes.dashboard"
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
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: {
            title: "routes.settings",
            requiresAuth: true,
        }
    },
    {
        path: '/designer',
        name: 'VFormDesigner',
        component: VFormDesigner,
        meta: {
            title: "routes.vFormDesigner",
            requiresAuth: false,
            notUseLayout: false
        }
    },
    {
        path: '/form',
        name: 'VFormRenderParent',
        redirect: {name: 'notFound'},
    },
    {
        path: '/form/:id',
        name: 'VFormRender',
        component: VFormRender,
        meta: {
            requiresAuth: true,
            notUseLayout: false
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