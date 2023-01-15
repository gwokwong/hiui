import type {RouteRecordRaw} from "vue-router/auto"

import Home from "@/views/index.vue"
const About = () => import("@/views/about.vue")
const Login = () => import("@/views/user/login.vue")
const NotFound = () => import("@/views/[...404].vue")

/** @type {import('vue-router/auto').RouterOptions['routes']} */
export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            title: "Home"
        }
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
            title: "About"
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: "Login",
            requiresAuth: false,
            notUseLayout: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFound,
    }
]