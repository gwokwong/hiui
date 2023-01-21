<template>
  <div class="nav__container" :data-nav-collapse="isNavCollapsed">
    <div class="nav__menu">
      <el-menu
          default-active="Dashboard"
          router
      >
<!--        @open="handleOpen"-->
<!--        @close="handleClose"-->
        <el-menu-item
            v-for="(item, sideMenuKey) in appSideBarItems"
            :key="sideMenuKey"
            :index="item.name"
            :data-active="route.name === item.name"
            :data-nav-collapse="isNavCollapsed"
            @click="$router.push({name: item.name})"
        >
          <font-awesome-icon :icon="item.icon"/>
          <span :data-nav-collapse="isNavCollapsed">
            {{ $t(item.title) }}
          </span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="nav__version">
      <span>V{{ appVersion }}</span>
    </div>
    <el-button id="navCollapseBtn" @click="emit('sideBarCollapse')" circle plain>
      <font-awesome-icon icon="fa-solid fa-chevron-left" :rotation="isNavCollapsed ? '180' : '0'"/>
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import {useAppStore} from "@/lib/store/appStore"
import {storeToRefs} from 'pinia'
import {useRoute} from "vue-router"

// 防止与context冲突，使用_app命名
const _app = useAppStore()
const { isNavCollapsed, appVersion, appSideBarItems } = storeToRefs(_app)
const route = useRoute()

const emit = defineEmits(['sideBarCollapse'])

/* Fontawesome 图标引入 */
import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faChartLine,
  faChevronLeft,
  faGrip,
} from "@fortawesome/free-solid-svg-icons"
const fontawesomeIcons = [
  faChartLine,
  faChevronLeft,
  faGrip,
]
fontawesomeIcons.forEach(icon => library.add(icon))
/* Fontawesome 图标引入 end */

// function handleOpen(key: string, keyPath: string[]) {
//   // TODO: Do something
//   console.log(key, keyPath)
// }
//
// function handleClose(key: string, keyPath: string[]) {
//   // TODO: Do something
//   console.log(key, keyPath)
// }
</script>

<style lang="scss" scoped>
.nav__container {
  @apply relative px-[16px] py-[16px] flex flex-col justify-between items-center;
  width: var(--side-bar-width);
  height: calc(100vh - var(--global-header-height));
  //padding: 16px;
  background-color: var(--color-content-bg);
  box-shadow: 2px 0 8px var(--color-shadow);
  transition: all 0.3s cubic-bezier(1, 0, 0, 1);

  #navCollapseBtn {
    @apply absolute top-1/2 -right-5 w-[32px] h-[32px] overflow-hidden border-theme-500 drop-shadow-md;
    span > svg {
      transition: all 0.15s linear;
    }
  }
}

.nav__container[data-nav-collapse="true"] {
  @apply px-[4px] py-[16px];
}

.nav__menu {
  @apply overflow-x-hidden;
  width: 100%;
  transition: all 0.3s linear;

  .el-menu {
    width: 100%;
    display: grid;
    grid-gap: 6px;
    border: none;
    transition: all 0.3s cubic-bezier(1, 0, 0, 1);

    .el-menu-item {
      border-radius: 5px;
      transition: all 0.3s ease;
      transition-delay: 0s;

      svg, img {
        @apply w-[14px] h-[14px] mr-2 lg:mr-4 transition-all;
      }

      span {
        --menu-item-span-width: 100%;
        width: var(--menu-item-span-width);
        overflow: hidden;
        opacity: 1;
        transition: all 0.3s cubic-bezier(1, 0, 0, 1);
      }

      span[data-nav-collapse="true"] {
        --menu-item-span-width: 0;
        opacity: 0;
      }
    }

    .el-menu-item[data-active="true"] {
      background-color: var(--el-menu-hover-bg-color);
    }

    .el-menu-item[data-nav-collapse="true"] {
      border-radius: 100px;

      svg, img {
        @apply mr-0 lg:mr-0;
      }
    }
  }
}

.nav__version {
  @apply text-gray-600 text-sm;
}
</style>