import {createRouter, createWebHistory} from 'vue-router'
import {routes} from "@/lib/router/routes"
import type {RouterOptions} from "vue-router"
import createRouteGuard from "./guard"

const router = createRouter({
    history: createWebHistory(),
    routes,
} as RouterOptions)

// const router = createRouter({
//     history: createWebHistory(),
//     routes: routes
// } as RouterOptions)

createRouteGuard(router)

export default router