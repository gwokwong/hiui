<template>
  <div>
    <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
    </v-form-render>
    <el-button type="primary" @click="submitForm">Submit</el-button>
  </div>
</template>

<script setup>
/**
 * 重要提示：如果表单json对象是通过后台接口异步获取到的，
 * 用form-json属性传值则会导致表单校验提示异常，
 * 需要调用setFormJson(xxx)方法，具体参见此处文档——《渲染表单》。
 * @see https://www.yuque.com/variantdev/vform3/pi1mff#mE6tm
 * */
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

import json from '@/views/vForm/json/template.json'

const formJson = reactive(json)
const formData = reactive({})
const optionData = reactive({})
const vFormRef = ref(null)

const submitForm = () => {
  vFormRef.value?.getFormData().then(formData => {
    // Form Validation OK
    alert( JSON.stringify(formData) )
  }).catch(error => {
    // Form Validation failed
    ElMessage.error(error)
  })
}
</script>