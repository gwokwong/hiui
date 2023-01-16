<template>
  <router-view v-if="$route.meta?.notUseLayout" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
  <main-layout v-else></main-layout>
</template>

<script setup>
import MainLayout from "@/layout/mainLayout.vue";

let counter = ref(0)
// const locale = localStorage.getItem('lang') || "zh_CN"

setInterval(() => {
  counter.value++
}, 1000)

</script>