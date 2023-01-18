<template>
  <header>
    <GlobalHeader
        @sideBarCollapse="toggleNavigationBar"
        @notificationShow="!!isNotificationsDialogShown"
        @toggleDark="toggleDarkMode"
    ></GlobalHeader>
  </header>
  <main>
    <nav>
      <side-navigation-bar @sideBarCollapse="toggleNavigationBar"></side-navigation-bar>
    </nav>

    <div class="router-view">
      <div class="router-view__content" :data-is-designer="$route.name === 'VFormDesigner'">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
      </div>
    </div>
  </main>

<!--  <el-dialog-->
<!--      v-model="isNotificationsDialogShown"-->
<!--      :title="$t('notificationDialog')"-->
<!--      width="700px"-->
<!--      draggable-->
<!--  >-->
<!--    <span>It's a draggable Dialog</span>-->
<!--    <template #footer>-->
<!--      <span class="dialog-footer">-->
<!--        <el-button @click="!!isNotificationsDialogShown">Cancel</el-button>-->
<!--        <el-button type="primary" @click="isNotificationsDialogShown = false">-->
<!--          Confirm-->
<!--        </el-button>-->
<!--      </span>-->
<!--    </template>-->
<!--  </el-dialog>-->
</template>

<script setup>
import {is} from "@/lib/utils/is"
import {useToggle} from "@vueuse/core"
import {useAppStore} from "@/lib/store/appStore"
import {storeToRefs} from 'pinia'
import {onMounted} from "vue"

const emit = defineEmits(['toggleDarkMode'])

const _app = useAppStore()
const { isNavCollapsed, isNotificationsDialogShown } = storeToRefs(_app)
const toggleNavCollapse = useToggle(isNavCollapsed)
/**
 * @function toggleDarkMode
 * @description 切换深色/浅色模式，或者跟随系统
 * @param {string} mode - 模式，可选值：'dark' | 'light' | 'auto'
 * */
function toggleDarkMode(mode = 'auto') {
  emit('toggleDarkMode', mode)
}

/**
 * @function setNavBarWidth
 * @description 设置侧边栏宽度
 * */
function setSideBarWidth() {
  // document.documentElement.style
  //     .setProperty(
  //         '--side-bar-width',
  //         isNavCollapsed.value ? '65px' : '260px'
  //     )
  document.documentElement.setAttribute('data-nav-collapse', isNavCollapsed.value)
}

/**
 * @function toggleNavigationBar
 * @description 切换侧边栏展开，收缩状态
 * */
function toggleNavigationBar() {
  if (!is.smallDevice()) {
    toggleNavCollapse()
    setSideBarWidth()
  }
}

/**
 * @function resizeHandler
 * @description 当窗口尺寸变化时处理侧边栏宽度
 * */
function resizeHandler() {
  if (is.smallDevice()) {
    isNavCollapsed.value = true
    setSideBarWidth()
  }
}

onMounted(() => {
  resizeHandler()
  window.addEventListener('resize', resizeHandler)
})
</script>

<style lang="scss">
main {
  @apply flex overflow-hidden;
}

.router-view {
  @apply bg-gradient-to-br from-theme-400 via-theme-500 to-theme-600;
  height: available;
  width: calc(100vw - var(--side-bar-width));
  padding: var(--router-view-padding);
  transition: width 0s;
}

.router-view__content {
  @apply w-full p-10 bg-content shadow-2xl rounded-xl;
  height: var(--router-view-content-height);
  overflow-y: scroll;
  transition: all 0.3s cubic-bezier(1, 0, 0, 1);
}

.router-view__content[data-is-designer="true"] {
  @apply p-1;
}
</style>