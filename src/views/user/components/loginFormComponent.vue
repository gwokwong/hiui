<template>
  <el-form
    ref="ruleFormRef"
    :model="loginForm"
    :rules="loginFormRules"
    label-width="0px"
  >
    <el-form-item prop="username">
      <el-input
          size="large"
          v-model="loginForm.username"
          :placeholder="$t('user.login.username')"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
          size="large"
          v-model="loginForm.password"
          :placeholder="$t('user.login.password')"
          type="password"
          show-password
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="w-full" size="large" type="primary" @click="emit('login', loginForm)">
        {{ $t('user.login.submit') }}
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button size="small" plain>{{ $t('user.login.forgetPassword') }}</el-button>
      <el-button size="small" plain>{{ $t('user.login.signup') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import patterns from "@/lib/utils/patterns"
import type { FormInstance, FormRules } from 'element-plus'
import type {LoginForm} from "@/lib/types/User"

const emit = defineEmits(['login'])

const ruleFormRef = ref<FormInstance>()
const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
})

const loginFormRules = reactive<FormRules>({
  username: [{
    required: true,
    message: '请输入用户名',
  }, {
    pattern: patterns.letterAndNumber,
    message: '用户名需为纯英文或英文数字组合'
  }],
  password: [
    {
      required: true,
      message: '请输入密码',
    }, {
      pattern: patterns.password,
      message: '密码至少包含大写、小写字母，数字，特殊字符各一个'
    }
  ],
})

</script>

<style lang="scss" scoped>
</style>