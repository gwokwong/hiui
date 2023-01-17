import {defineStore} from "pinia"
import type {Ref} from "vue"

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
        setIsDarkMode,
    }
})