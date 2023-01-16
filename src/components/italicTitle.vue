<template>
  <div class="top-title-wrap first-active">
    <h1 class="top-title-text">{{ props.text }}</h1>
  </div>
</template>

<script setup>
const props = defineProps(['text'])
</script>

<style scoped>
.top-title-wrap {
  @apply cursor-default text-4xl mb-5 pl-4 md:pl-2 relative;
  font-weight: bold;
  font-style: italic;
}
.top-title-wrap::before {
  content: "";
  position: absolute;
  width: 5px;
  height: 100%;
  /*background-color: var(--el-color-primary);*/
  /* Created with https://www.css-gradient.com */
  /* Default color was #60A6FA, #2563EB */
  background: var(--color-primary-light);
  background: -webkit-linear-gradient(top right, var(--color-primary-light), var(--color-primary));
  background: -moz-linear-gradient(top right, var(--color-primary-light), var(--color-primary));
  background: linear-gradient(to bottom left, var(--color-primary-light), var(--color-primary));
  top: 0;
  left: 0;
  transform: skewX(-18deg);
}
.top-title-text {
  transform: skewX(-8deg);
}
</style>