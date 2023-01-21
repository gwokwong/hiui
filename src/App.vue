<template>
  <router-view v-if="$route.meta?.notUseLayout" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
  <main-layout v-else @toggleDarkMode="darkModeHandler"></main-layout>

  <LoadingMask :visibility="isAppLoading"></LoadingMask>
</template>

<script setup>
import MainLayout from "@/layout/mainLayout.vue"
import {ElLoading} from "element-plus"
import {useAppStore} from "@/lib/store/appStore"
import {storeToRefs} from 'pinia'
import i18n from "@/lib/i18n"
import {useTitle} from "@vueuse/core"
import {useRoute} from "vue-router"

const appStore = useAppStore()
const { appName, appLocale } = storeToRefs(appStore)
const route = useRoute()

// 防止与context冲突，使用_app命名
const _app = useAppStore()
const { isAppLoading, isDarkMode } = storeToRefs(_app)

/**
 * @function setDarkMode
 * @description 设置深色/浅色模式
 * @param {string} e - 模式，可选值：'dark' | 'light' | 'auto',
 * 如为boolean类型，为true时为dark，false时为light
 * */
function setDarkMode(e) {
  const html = document.documentElement

  if (typeof e === 'string') {
    _app.setIsDarkMode(e === 'dark')

    if (e === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }
}

/**
 * @function darkModeHandler
 * @description 切换深色/浅色模式，或者跟随系统
 * 首先从store(_app)中获取深色设置，仍然没有就读取系统设置深色模式 prefers-color-scheme
 * @param {string} mode - 模式，可选值：'dark' | 'light' | 'auto'
 * */
function darkModeHandler(mode = 'auto') {
  if (mode === '' || mode === 'auto') {
    window.matchMedia('(prefers-color-scheme: dark)').matches
        ? setDarkMode('dark')
        : setDarkMode('light')
    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => darkModeHandler('auto'), {capture: true})
    return
  }
  setDarkMode(mode)
  window.matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', () => darkModeHandler('auto'))

  localStorage.setItem('darkMode', mode)
}

/**
 * @function init
 * @description 初始化
 * */
function init() {
  // 加载画面
  // TODO: 接入加载信息API
  const timer = setTimeout(() => {
    isAppLoading.value = false
    clearTimeout(timer)
  }, 2500)
  // 设置深色模式
  const darkMode = localStorage.getItem('darkMode')
  darkModeHandler(darkMode)
}

init()

onMounted(() => {
  console.log('i18n', i18n, i18n.global, i18n.global?.t(route.meta?.title))
  // @ts-ignore
  const translatedTitle = i18n.global?.t(route.meta?.title, appLocale.value)
  const splicedTitle = `${translatedTitle} - ${appName.value}`
  useTitle(splicedTitle)
})

watch(() => isDarkMode.value, val => {
  setDarkMode(val)
})
</script>