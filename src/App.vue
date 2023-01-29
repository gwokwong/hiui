<template>
  <el-config-provider :locale="elLocale">
    <router-view v-if="$route.meta?.notUseLayout" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <main-layout v-else @toggleDarkMode="darkModeHandler"></main-layout>

    <LoadingMask :visibility="isAppLoading"></LoadingMask>
  </el-config-provider>
</template>

<script setup>
import MainLayout from "@/layout/mainLayout.vue"
import {useAppStore} from "@/lib/store/appStore"
import {storeToRefs} from 'pinia'
import * as echarts from "echarts"

provide("echarts", echarts)
import zhCNLang from 'element-plus/lib/locale/lang/zh-cn'
import enUSLang from 'element-plus/lib/locale/lang/en'

// 防止与context冲突，使用_app命名
const _app = useAppStore()
const { isAppLoading, isDarkMode, appName, appLocale } = storeToRefs(_app)

const elLocaleMap = new Map([
  ['zh-CN', zhCNLang],
  ['en-US', enUSLang]
])
const elLocale = computed(() => {
  let curLocale = localStorage.getItem('lang') || 'zh_CN'
  return elLocaleMap.get(curLocale)
})

/**
 * @function setDarkMode
 * @description 设置深色/浅色模式
 * @param {string | boolean} mode - 模式，可选值：'dark' | 'light' | true | false
 * */
function setDarkMode(mode = 'light') {
  const html = document.documentElement
  if (typeof mode === 'boolean') {
    _app.setIsDarkMode(mode)
  } else {
    _app.setIsDarkMode(mode === 'dark')
  }

  if (mode === true || mode === 'dark') {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
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

watch(() => isDarkMode.value, val => {
  setDarkMode(val)
})
</script>