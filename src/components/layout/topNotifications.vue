<template>
  <div class="top-notifications">
    <div class="top-notifications__title">
      <slot></slot>
      <div class="top-notifications__func">
        <el-tag size="small" type="danger">{{ unreadCount }}</el-tag>
        <el-button size="small" :icon="Delete">

          清空
        </el-button>
      </div>
    </div>
    <div
        class="top-notifications__item"
        v-for="(contentItem, contentKey) in content"
        :key="contentKey"
    >
      <img :src="iconMap.get(contentItem.icon)" alt width="48" height="48">
      <div class="notification__content">
        <div class="notification__top">
          <span class="notification__title">{{ contentItem.title }}</span>
          <span class="notification__time">{{ contentItem.time }}</span>
        </div>
        <span>{{ contentItem.content }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from "vue"
import {lazyImg} from "@/lib/utils/lazyImg"
import {Delete} from '@element-plus/icons-vue'

const iconList = [
  {
    name: 'success',
    img: () => import('@/assets/images/notifications/circle-check.svg')
  },
  {
    name: 'warning',
    img: () => import('@/assets/images/notifications/circle-exclamation.svg')
  },
  {
    name: 'info',
    img: () => import('@/assets/images/notifications/circle-info.svg')
  },
  {
    name: 'danger',
    img: () => import('@/assets/images/notifications/circle-xmark.svg')
  },
]

const props = defineProps(['unreadCount', 'content'])
const iconMap = reactive(new Map())

onMounted(async () => {
  // 图片延迟加载
  for (const item of iconList) {
    iconMap.set(item.name, await lazyImg.resolve(item.img()))
  }
})
</script>

<style lang="scss" scoped>
.top-notifications {
  @apply w-[360px] flex flex-col justify-start items-center;

  .top-notifications__title {
    @apply w-full pb-[10px] flex flex-row justify-between border-b;

    .top-notifications__func > button {
      @apply ml-2;
    }
  }

  .top-notifications__item {
    @apply w-full min-h-[100px] py-[20px] flex flex-row justify-start items-center;

    .notification__content {
      @apply w-full mx-[5px] flex flex-col justify-start items-start self-start;
    }

    .notification__top {
      @apply w-full flex justify-between;

      .notification__title {
        @apply font-bold text-black;
      }

      .notification__time {
        @apply text-gray-600 text-sm;
      }
    }
  }
}
</style>