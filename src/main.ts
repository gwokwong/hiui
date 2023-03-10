import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from '@/lib/router'
import i18n from "./lib/i18n"
import echarts from "@/lib/echarts"
import './tailwind.css'
import '@/assets/style/global.scss'
import '@/assets/style/themes/default.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'

// VForm3
import VForm3 from '@/../lib/vform3/designer.umd'
// import 'virtual:svg-icons-register'
import '../lib/vform3/designer.style.css'

import '@/assets/style/anim.scss'
import '@/assets/style/webfont/soehne-breit/soehne-breit.css'

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"

const pinia = createPinia()
const app = createApp(App)
const head = createHead()

// Vue.prototype.$echarts = echarts
app.config.globalProperties.$echarts = echarts

app.use(i18n)
app.use(pinia)
app.use(router)
app.use(head)
app.use(ElementPlus)
app.use(VForm3)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount(document.body)
