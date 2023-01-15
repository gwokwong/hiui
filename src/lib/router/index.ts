import {createRouter, createWebHistory} from 'vue-router'
import {routes} from "@/lib/router/routes"
import type {RouterOptions} from "vue-router"

console.log(routes)

const router = createRouter({
    history: createWebHistory(),
    routes,
} as RouterOptions)

// const router = createRouter({
//     history: createWebHistory(),
//     routes: routes
// } as RouterOptions)

export default router