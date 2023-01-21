<template>
  <div :class="visibility ? 'loading-mask' : 'loading-mask anim__hide'">
    <div class="loading-img__wrap">
      <div class="loading-img__grid">
        <div class="loading-img__grid-item"></div>
        <div class="loading-img__grid-item"></div>
        <div class="loading-img__grid-item"></div>
        <div class="loading-img__grid-item"></div>
        <div class="loading-img__cover anim__width-and-height-to-full"></div><!-- anim__width-and-height-to-full -->
        <div class="loading-img__cover-horizontal anim__width-to-full anim__delay-3q4"></div><!-- anim__width-to-full -->
        <div class="loading-img__cover-vertical anim__height-to-full anim__delay-3q4"></div><!-- anim__height-to-full -->
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['visibility'])
</script>

<style lang="scss" scoped>
.loading-mask {
  @apply absolute block top-0 left-0 w-[100vw] h-[100vh] m-0 p-0 z-[100];
  background-color: rgb(255, 255, 255);

  .loading-img__wrap {
    @apply absolute top-1/2 left-1/2 w-[110px] h-[110px] -translate-y-1/2 -translate-x-1/2;

    .loading-img__grid {
      @apply relative grid grid-cols-2 gap-[10px] w-full h-full;

      .loading-img__grid-item {
        @apply w-[50px] h-[50px] bg-theme z-10 overflow-hidden;
      }

      .loading-img__cover {
        @apply absolute top-0 left-0 bg-theme z-20;
        width: 0;
        height: 0;
      }

      .loading-img__cover-horizontal {
        @apply absolute top-1/2 w-full h-[10px] bg-white z-30 -translate-y-1/2;
      }

      .loading-img__cover-vertical {
        @apply absolute left-1/2 w-[10px] h-full bg-white z-30 -translate-x-1/2;
      }
    }
  }
}
</style>