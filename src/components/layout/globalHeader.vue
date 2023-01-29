<template>
  <div class="header__container">
    <div class="header__nav-bar">
      <div class="left-wrap">
        <div class="header__logo-wrap text-center">
          <!--          <img :src="isNavCollapsed ? logo.get('collapsed') : logo.get('normal')" alt="logo">-->
          <h1 class="header__logo-text">{{ isNavCollapsed ? 'HiUI' : 'HiUI by Hitosea' }}</h1>
        </div>
        <!--        TODO: error-->
        <div class="left-wrap__functions">
          <el-button @click="emit('sideBarCollapse')" type="primary" plain>
            <font-awesome-icon :icon="isNavCollapsed ? 'fa-solid fa-angles-right' : 'fa-solid fa-angles-left'"/>
          </el-button>
          <!--          <el-button @click="reloadRouter()" type="primary" plain>-->
          <!--            <font-awesome-icon icon="fa-solid fa-arrows-rotate" :spin="isReloadLoading"/>-->
          <!--          </el-button>-->
          <p class="text-lg text-white">{{ $t(pageTitle) }}</p>
        </div>
      </div>

      <div class="extend-functions">
        <HeaderRightButton
            v-for="(item, headBtnKey) in extendFunctions"
            :key="headBtnKey"
            :item="item"
            @click="headerRightBtnClick(item.event)"
            :use-dropdown="item?.dropdowns?.length > 0"
            :use-notifications="item.name === 'notifications'"
        ></HeaderRightButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from "vue"
import {lazyImg} from "@/lib/utils/lazyImg"
import {useRouter, useRoute} from "vue-router"
import {LOCALE_OPTIONS, changeLanguage} from "@/lib/i18n"
import HeaderRightButton from "@/components/layout/headerRightButton.vue"

import {useAppStore} from "@/lib/store/appStore"
import {storeToRefs} from 'pinia'

// 防止与context冲突，使用_app命名
const _app = useAppStore()
const {isNavCollapsed, isDarkMode, appNotifications} = storeToRefs(_app)

const router = useRouter()
const route = useRoute()
let pageTitle = ref(route.meta?.title || '')

const emit = defineEmits(['sideBarCollapse', 'notificationShow', 'toggleDark'])

/* Fontawesome 图标引入 */
import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faEarthAsia,
  faUser,
  faSun,
  faMoon,
  faSliders,
  faBell,
  faAnglesLeft,
  faAnglesRight,
  faArrowsRotate,
  faUserGear,
  faLock,
  faArrowRightFromBracket,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons"

const fontawesomeIcons = [
  faEarthAsia,
  faUser,
  faSun,
  faMoon,
  faSliders,
  faBell,
  faAnglesLeft,
  faAnglesRight,
  faArrowsRotate,
  faUserGear,
  faLock,
  faArrowRightFromBracket,
  faDesktop,
]
fontawesomeIcons.forEach(icon => library.add(icon))
/* Fontawesome 图标引入 */

// logo
const logoImg = () => import('@/assets/images/main/logo.svg')
const logoImgCollapsed = () => import('@/assets/images/main/logoCollapsed.svg')
const defaultUserImg = () => import('@/assets/images/main/userAvatarPlaceholder.svg')
let logo = reactive(new Map())
let userImg = ref(null)

/**
 * @name extendFunctions
 * @description 顶部右侧功能按钮，在此处定义其图标、文字、事件与子项目等
 * */
const extendFunctions = reactive([
  {
    icon: 'fa-solid fa-bell',
    name: 'notifications',
    tips: 'globalHeader.notifications',
    notificationCounts: 0,
    notificationContents: [...appNotifications.value]
    // event: 'notificationShow'
  },
  {
    icon: isDarkMode.value ? 'fa-solid fa-sun' : 'fa-solid fa-moon',
    name: 'dark',
    tips: 'globalHeader.darkMode.changeLightOrDark',
    dropdowns: [
      {
        icon: 'fa-solid fa-moon',
        name: 'globalHeader.darkMode.dark',
        click: () => {
          emit('toggleDark', 'dark')
        }
      },
      {
        icon: 'fa-solid fa-sun',
        name: 'globalHeader.darkMode.light',
        click: () => {
          emit('toggleDark', 'light')
        }
      },
      {
        icon: 'fa-solid fa-desktop',
        name: 'globalHeader.darkMode.auto',
        click: () => {
          emit('toggleDark', 'auto')
        }
      }
    ]
  },
  {
    icon: 'fa-solid fa-earth-asia',
    name: 'language',
    dropdowns: Array.from(
        LOCALE_OPTIONS,
        ([key, value]) => ({name: value, value: key, click: () => changeLanguage(key)})
    )
  },
  {
    icon: 'fa-solid fa-sliders',
    name: 'settings',
    tips: 'globalHeader.settings'
  },
  {
    icon: userImg,
    name: 'user',
    // tips: 'user',
    dropdowns: [
      {
        icon: 'fa-solid fa-user-gear',
        name: 'globalHeader.user.profile',
        click: () => {}
      },
      {
        icon: 'fa-solid fa-lock',
        name: 'globalHeader.user.security',
        click: () => {}
      },
      {
        icon: 'fa-solid fa-arrow-right-from-bracket',
        name: 'globalHeader.user.logout',
        click: () => {}
      }
    ]
  }
])

function headerRightBtnClick(e) {
  if (!e) {
    return
  }
  emit(e)
}

// async function reloadRouter() {
//   const currentPath = router.currentRoute.value.path
//   isReloadLoading.value = true
//   await router.push({path: '/redirect' + currentPath})
//     .then(() => {
//       isReloadLoading.value = false
//     })
// }

onMounted(async () => {
  // 图片延迟加载
  logo.set('normal', await lazyImg.resolve(logoImg()))
  logo.set('collapsed', await lazyImg.resolve(logoImgCollapsed()))
  userImg.value = await lazyImg.resolve(defaultUserImg())
})

watch(() => isDarkMode.value, (val) => {
  extendFunctions[1].icon = val ? 'fa-solid fa-sun' : 'fa-solid fa-moon'
})

watch(() => route.meta?.title, (val) => {
  pageTitle.value = val
})
</script>

<style lang="scss" scoped>
.header__container {
  @apply relative bg-gray-900 w-full;
  height: var(--global-header-height);
  box-shadow: 0 0 10px var(--color-shadow);
  z-index: 10;

  .header__nav-bar {
    @apply h-full flex items-center justify-between pr-4;

    button {
      @apply mx-2.5;
      //width: 100%;
      //height: 100%;
      width: 32px;
      height: 32px;
    }

    .left-wrap {
      @apply flex items-center justify-start;

      .left-wrap__functions {
        @apply flex items-center justify-start;

        p {
          @apply mx-2.5;
        }
      }

      .header__logo-wrap {
        @apply flex items-center justify-start;
        width: var(--side-bar-width);
        transition: width 0.3s cubic-bezier(1, 0, 0, 1);

        .header__logo-text {
          // font-sbt == 自定义字体soehne-breit
          @apply mx-auto font-sbt font-bold text-2xl text-white overflow-hidden;
          height: 2rem;
          overflow-wrap: anywhere;
        }

        img {
          width: 90px;
          height: 40px;
        }
      }
    }

    .extend-functions {
      @apply flex items-center justify-center text-white;
    }
  }
}
</style>