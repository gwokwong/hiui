import {defineStore} from "pinia"
import type {Ref} from "vue"
import {useStorage} from "@vueuse/core"

/**
 * ref() 就是 state 属性
 * computed() 就是 getters
 * function() 就是 actions
 * */

export const useAppStore = defineStore('app', () => {
    // state
    const isDarkMode = ref(false)
    const isNavCollapsed: Ref<boolean> = ref(false)
    const isNotificationsDialogShown: Ref<boolean> = ref(false)
    const appVersion = ref(import.meta.env.VITE_APP_VERSION)
    const appName = ref(import.meta.env.VITE_APP_NAME)
    const appLocale = ref(useStorage('appLocale', 'zh_CN'))
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
        isDarkMode,
        isNavCollapsed,
        isNotificationsDialogShown,
        appVersion,
        appName,
        appLocale,
        appNotifications,
        setIsDarkMode,
    }
})