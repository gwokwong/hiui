import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import router from '@/lib/router'
import { createHead } from '@vueuse/head'
import i18n from "./lib/i18n"
import '@/assets/style/global.scss'

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)
app.use(i18n)
app.mount(document.body)
