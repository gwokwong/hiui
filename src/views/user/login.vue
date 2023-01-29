<template>
  <div class="login-wrap">
    <div class="login-container">
      <div class="login-left">

        <div class="login-left__top-wrap">
          <div class="login-left__text">
            {{ $t('user.login.title') }}
          </div>
        </div>

        <el-select v-model="selectedLanguage" placeholder="Language" size="small" @change="changeLanguage">
          <el-option
              v-for="item in languages"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>

      </div>
      <div class="login-right">
        <login-form-component class="login-right__form" @login="login"></login-form-component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {LoginForm} from "@/lib/types/User"
import LoginFormComponent from "@/views/user/components/loginFormComponent.vue"
import {LOCALE_OPTIONS, changeLanguage} from "@/lib/i18n"
import {useAppStore} from "@/lib/store/appStore"
import {storeToRefs} from "pinia"
import {useRouter, useRoute} from "vue-router"

const router = useRouter()
const route = useRoute()

interface LanguageOption {
  label: string
  value: string
}
const _app = useAppStore()
const {appLocale} = storeToRefs(_app)

const selectedLanguage = ref(appLocale)
const languages = reactive<Array<LanguageOption>>(
  Array.from(
    LOCALE_OPTIONS,
    ([key, value]) => ({label: value, value: key})
  )
)

function login(form: LoginForm) {
  // TODO: use login api
  console.log( JSON.stringify(form), route['params.redirect'] )
  if (route['query']?.['redirect']) {
    router.push(route['query']?.['redirect'] as string)
  } else {
    router.push('/dashboard')
  }
}
</script>

<style lang="scss" scoped>
@use "sass:math";

.login-wrap {
  @apply flex justify-center items-center;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-layout-bg);
  transition: background-color 0.3s cubic-bezier(1, 0, 0, 1);

  .login-container {
    @apply flex rounded-xl shadow-2xl overflow-hidden;
    $loginContainerWidth: 750px;
    $loginContainerHeight: math.div(750px, 1.618);
    $loginLeftWidth: 250px;
    $loginRightWidth: $loginContainerWidth - $loginLeftWidth;
    width: $loginContainerWidth;
    height: $loginContainerHeight;
    background-color: var(--color-content-bg);
    transition: background-color 0.3s cubic-bezier(1, 0, 0, 1);
    z-index: 1;

    .login-left {
      @apply relative py-10 flex flex-col justify-between items-center
      bg-gradient-to-br from-theme-400 via-theme-500 to-theme-600 overflow-hidden;
      width: $loginLeftWidth;

      .login-left__top-wrap {
        @apply w-full;

        .login-left__text {
          @apply text-white text-5xl text-center font-bold italic;
          font-family: sbt, "PingFang SC", "Microsoft YaHei", "微软雅黑", sans-serif;
          word-break: break-word;
        }
      }
    }

    .login-right {
      @apply relative flex flex-col justify-center items-center;
      width: $loginRightWidth;
      padding: 40px;

      .login-right__form {
        @apply w-full;
      }
    }
  }
}
</style>