<template>
  <header>
    header
  </header>
  <main>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </main>
</template>

<script>
export default {
  name: "mainLayout"
}
</script>

<style scoped>

</style>