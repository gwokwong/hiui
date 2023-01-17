<template>
  <router-view v-if="$route.meta?.notUseLayout" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
  <main-layout v-else @toggleDarkMode="darkModeHandler"></main-layout>
</template>

<script setup>
import MainLayout from "@/layout/mainLayout.vue"
import {ElLoading} from "element-plus"
import {useAppStore} from "@/lib/store/appStore"
import {storeToRefs} from 'pinia'

// 防止与context冲突，使用_app命名
const _app = useAppStore()
const { isDarkMode } = storeToRefs(_app)

/**
 * @function setDarkMode
 * @description 设置深色/浅色模式
 * @param {string | boolean | MediaQueryList} e - 模式，可选值：'dark' | 'light' | 'auto',
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

// const ctx = getCurrentInstance()
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
}

function init() {
  // TODO: 改为自用的 loading
  const loading = ElLoading.service({
    lock: true,
    text: "loading",
    background: "rgba(0, 0, 0, 0.7)",
  })
  setTimeout(() => {
    loading.close()
  }, 2000)

  const darkMode = localStorage.getItem('darkMode')
  darkModeHandler(darkMode)
}

init()

watch(() => isDarkMode.value, val => {
  setDarkMode(val)
})
</script>