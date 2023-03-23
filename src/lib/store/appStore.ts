import {defineStore} from "pinia"
import type {Ref} from "vue"
import {useStorage} from "@vueuse/core"

import {
    AdjustmentsHorizontalIcon,
    HomeIcon,
    UserIcon,
    WrenchScrewdriverIcon,
} from '@heroicons/vue/24/outline'

/**
 * ref() 就是 state 属性
 * computed() 就是 getters
 * function() 就是 actions
 * */

export const useAppStore = defineStore('app', () => {
    // state
    const isAppLoading = ref(true)
    const isDarkMode = ref(false)
    const isNavCollapsed: Ref<boolean> = ref(false)
    const isNotificationsDialogShown: Ref<boolean> = ref(false)
    const appVersion = ref(import.meta.env.VITE_APP_VERSION)
    const appName = ref(import.meta.env.VITE_APP_NAME)
    const appLocale = ref(useStorage('appLocale', 'zh_CN'))
    const appSideBarItems = reactive([
        {
            name: 'Dashboard',
            icon: HomeIcon,
            title: 'sideNav.dashboard'
        },
        {
            name: 'Settings',
            icon: AdjustmentsHorizontalIcon,
            title: 'sideNav.settings'
        },
        {
            name: 'Profile',
            icon: UserIcon,
            title: 'sideNav.profile'
        },
        {
            name: 'Designer',
            icon: WrenchScrewdriverIcon,
            title: 'sideNav.VFormDesigner'
        },
    ])
    const appNotifications = reactive([
        {
            content: 'This is a test notification, id: 0',
            id: 0,
            icon: 'success',
            title: 'Test Notification',
            time: '2022-01-01 00:00:00',
        },
        {
            content: 'This is a test notification, id: 1',
            id: 1,
            icon: 'warning',
            title: 'Test Notification',
            time: '2022-01-01 00:00:00',
        },
        {
            content: 'This is a test notification, id: 2',
            id: 2,
            icon: 'info',
            title: 'Test Notification',
            time: '2022-01-01 00:00:00',
        },
        {
            content: 'This is a test notification, id: 3',
            id: 3,
            icon: 'danger',
            title: 'Test Notification',
            time: '2022-01-01 00:00:00',
        },
    ])
    // getters

    // actions
    function setIsDarkMode(bool: boolean) {
        isDarkMode.value = bool
    }
    // 摞上面定义的冚棒唥return出去
    return {
        isAppLoading,
        isDarkMode,
        isNavCollapsed,
        isNotificationsDialogShown,
        appVersion,
        appName,
        appLocale,
        appSideBarItems,
        appNotifications,
        setIsDarkMode,
    }
})
