import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import router from '@/lib/router'
import { createHead } from '@vueuse/head'
import i18n from "./lib/i18n"
import '@/assets/style/global.scss'
import '@/assets/style/themes/default.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/style/anim.scss'

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)
app.use(i18n)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount(document.body)
