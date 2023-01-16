<template>
  <div class="header__container">
    <div class="header__nav-bar">
      <div class="left-wrap">
        <div class="header__logo-wrap">
          <img :src="isNavCollapsed ? logo.get('collapsed') : logo.get('normal')" alt="logo">
        </div>
        <div class="left-wrap__functions">
          <el-button @click="toggleNavigationBar()" type="primary" plain>
            <font-awesome-icon :icon="isNavCollapsed ? 'fa-solid fa-angles-right' : 'fa-solid fa-angles-left'"/>
          </el-button>
          <el-button @click="reloadRouter()" type="primary" plain>
            <font-awesome-icon icon="fa-solid fa-arrows-rotate" :spin="isReloadLoading"/>
          </el-button>
        </div>
      </div>

      <div class="extend-functions">
        <HeaderRightButton
            v-for="(item, key) in extendFunctions"
            :key="key"
            :item="item"
            :use-dropdown="item?.dropdowns?.length > 0"
        ></HeaderRightButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from "vue"
import {lazyImg} from "@/lib/utils/lazyImg"
import {useDark, useToggle} from "@vueuse/core"
import {useRouter, useRoute} from "vue-router"
import {LOCALE_OPTIONS} from "@/lib/i18n"

const router = useRouter()
const route = useRoute()

/* Fontawesome 图标引入 */
import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faEarthAsia
  , faUser
  , faSun
  , faMoon
  , faSliders
  , faBell
  , faAnglesLeft
  , faAnglesRight
  , faArrowsRotate
  , faUserGear
  , faLock
  , faArrowRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import HeaderRightButton from "@/components/globalHeader/headerRightButton.vue";
const fontawesomeIcons = [
  faEarthAsia
  , faUser
  , faSun
  , faMoon
  , faSliders
  , faBell
  , faAnglesLeft
  , faAnglesRight
  , faArrowsRotate
  , faUserGear
  , faLock
  , faArrowRightFromBracket
]
fontawesomeIcons.forEach(icon => library.add(icon))
/* Fontawesome 图标引入 */

// 暗色模式
const isDark = useDark()
const toggleDark = useToggle(isDark)
// logo
const logoImg = () => import('@/assets/images/main/logo.svg')
const logoImgCollapsed = () => import('@/assets/images/main/logoCollapsed.svg')
const defaultUserImg = () => import('@/assets/images/main/userAvatarPlaceholder.svg')
let logo = reactive(new Map())
let userImg = ref(null)

let isReloadLoading = ref(false)
let isNavCollapsed = ref(false)
const toggleNavCollapse = useToggle(isNavCollapsed)

const extendFunctions = reactive([
  {
    icon: 'fa-solid fa-earth-asia',
    name: 'language',
    // tips: 'language',
    dropdowns: [
      {
        name: LOCALE_OPTIONS.get('zh_CN'),
        value: 'zh_CN',
        click: () => changeLanguage('zh_CN')
      },
      {
        name: LOCALE_OPTIONS.get('en_US'),
        value: 'en_US',
        click: () => changeLanguage('en_US')
      }
    ],
  },
  {
    icon: isDark.value ? 'fa-solid fa-sun' : 'fa-solid fa-moon',
    name: 'dark',
    tips: 'globalHeader.changeLightOrDark',
    click: () => toggleDark()
  },
  {
    icon: 'fa-solid fa-sliders',
    name: 'settings',
    tips: 'globalHeader.settings'
  },
  {
    icon: 'fa-solid fa-bell',
    name: 'notifications',
    tips: 'globalHeader.notifications',
    notificationCounts: 0
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

function changeLanguage(lang) {
  localStorage.setItem('lang', lang)
  window.location.reload()
}

function toggleNavigationBar() {
  toggleNavCollapse()
  document.documentElement.style.setProperty('--side-bar-width', isNavCollapsed.value ? '65px' : '260px')
}

async function reloadRouter() {
  isReloadLoading.value = true
  await router.replace({path: '/redirect' + route.fullPath})
      .finally(() => {
    isReloadLoading.value = false
  })
}

onMounted(async () => {
  logo.set('normal', await lazyImg.resolve(logoImg()))
  logo.set('collapsed', await lazyImg.resolve(logoImgCollapsed()))
  userImg.value = await lazyImg.resolve(defaultUserImg())
})

watch(() => isDark.value, (val) => {
  extendFunctions[1].icon = val ? 'fa-solid fa-sun' : 'fa-solid fa-moon'
})
</script>

<style lang="scss" scoped>
.header__container {
  @apply relative bg-gray-900 w-full;
  height: var(--side-bar-height);
  box-shadow: 0 0 10px var(--color-shadow);
  z-index: 10;

  .header__nav-bar {
    @apply h-full flex items-center justify-between px-4;

    button {
      @apply mx-2.5;
      //width: 100%;
      //height: 100%;
      width: 32px;
      height: 32px;
    }

    .left-wrap {
      @apply flex items-center justify-start;

      .header__logo-wrap {
        @apply flex items-center justify-start;
        width: var(--side-bar-width);
        transition: width 0.3s cubic-bezier(1, 0, 0, 1);

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