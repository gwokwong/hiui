<template>
  <div class="nav__container"></div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.nav__container {
  width: var(--side-bar-width);
  height: calc(100vh - var(--side-bar-height));
  background-color: var(--color-bg);
  box-shadow: 2px 0 8px var(--color-shadow);
  transition: width 0.3s cubic-bezier(1, 0, 0, 1);
}
</style>