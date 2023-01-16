<template>
  <header>
    <global-header></global-header>
  </header>
  <main>
    <nav>
      <side-navigation-bar></side-navigation-bar>
    </nav>
    <router-view class="router-view" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </main>
</template>

<script setup>
import SideNavigationBar from "@/components/sideNavigationBar.vue"
</script>

<style scoped>
main {
  @apply flex overflow-hidden;
}
</style>