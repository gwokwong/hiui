<template>
  <div class="nav__container" :data-nav-collapse="isNavCollapsed">
    <div class="nav__menu">
      <div class="nav__logo-wrap text-center">
        <!--          <img :src="isNavCollapsed ? logo.get('collapsed') : logo.get('normal')" alt="logo">-->
        <h1 class="nav__logo-text">{{ isNavCollapsed ? 'HiUI' : 'HiUI by Hitosea' }}</h1>
      </div>
      <div class="nav__items-container">
        <el-menu
            default-active="Dashboard"
            router
        >
          <!--        @open="handleOpen"-->
          <!--        @close="handleClose"-->
          <el-menu-item
              v-for="(item, sideMenuKey) in appSideBarItems"
              class="group"
              :key="sideMenuKey"
              :index="item.name"
              :data-active="route.name === item.name"
              :data-nav-collapse="isNavCollapsed"
              @click="$router.push({name: item.name})"
          >
            <div class="icon">
              <!-- <font-awesome-icon :icon="item.icon"/>-->
              <component :is="item.icon"/>
            </div>
            <span :data-nav-collapse="isNavCollapsed">
              {{ $t(item.title) }}
            </span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="nav__version">
      <span>V{{ appVersion }}</span>
    </div>
    <el-button id="navCollapseBtn" @click="emit('sideBarCollapse')" circle plain>
      <font-awesome-icon icon="fa-solid fa-chevron-up" :rotation="isNavCollapsed ? '90' : '270'"/>
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
  faChevronUp,
  faGrip,
  faUser,
  faSliders,
} from "@fortawesome/free-solid-svg-icons"
const fontawesomeIcons = [
  faChartLine,
  faChevronUp,
  faGrip,
  faUser,
  faSliders,
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
  @apply relative h-screen pt-5 flex flex-col justify-between items-center;
  // px-[16px] py-[16px]
  width: var(--side-bar-width);
  //height: calc(100vh - var(--global-header-height));
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

  &[data-nav-collapse="true"] {
    //@apply px-[4px] py-[16px];
    .nav__menu {
      .nav__logo-wrap {
        @apply px-2;
        h1 {
          @apply mx-auto;
        }
      }
    }
  }
}

.nav__menu {
  @apply overflow-x-hidden;
  width: 100%;
  transition: all 0.3s linear;

  .nav__logo-wrap {
    @apply w-full min-h-[32px] flex items-center justify-start px-4;
    //width: var(--side-bar-width);
    transition: width 0.3s cubic-bezier(1, 0, 0, 1);

    .nav__logo-text {
      // font-sbt == 自定义字体soehne-breit
      @apply font-sbt font-bold text-2xl overflow-hidden text-theme-500;
      height: 2rem;
      overflow-wrap: anywhere;
    }

    svg, img {
      @apply text-gray-400;
      width: 90px;
      height: 40px;
    }
  }

  .nav__items-container {
    @apply mt-5 w-full;
    .el-menu {
      @apply pb-4 px-2 flex flex-col space-y-1;
      border: none;
      transition: all 0.3s cubic-bezier(1, 0, 0, 1);

      .el-menu-item {
        @apply h-[40px] p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900;
        border-radius: 5px;
        transition: all 0.3s ease;
        transition-delay: 0s;

        .icon {
          @apply w-[24px] h-[24px] flex justify-center items-center mr-2 lg:mr-3;
          svg, img {
            @apply h-full text-gray-400 group-hover:text-gray-500 transition-all;
          }
        }

        span {
          @apply text-sm font-medium;
          --menu-item-span-width: 100%;
          width: var(--menu-item-span-width);
          overflow: hidden;
          opacity: 1;
          transition: all 0.3s cubic-bezier(1, 0, 0, 1);

          &[data-nav-collapse="true"] {
            --menu-item-span-width: 0;
            opacity: 0;
          }
        }

        &[data-active="true"] {
          @apply bg-gray-100 text-gray-900;
          //background-color: var(--el-menu-hover-bg-color);

          .icon {
            svg, img {
              @apply text-gray-500;
            }
          }
        }

        &[data-nav-collapse="true"] {
          @apply px-[18px];
        }
      }

      //.el-menu-item[data-nav-collapse="true"] {
      //  border-radius: 100px;
      //
      //  svg, img {
      //    @apply mr-0 lg:mr-0;
      //  }
      //}
    }
  }
}

.nav__version {
  @apply text-gray-600 text-sm;
}
</style>
