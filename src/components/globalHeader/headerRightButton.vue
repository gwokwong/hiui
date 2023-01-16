<template>
  <el-popover>
    <template #reference>
      <el-button class="header-btn" @click="item.click" circle>
        <el-badge
            is-dot
            :hidden="item.name !== 'notifications' || notificationCounts === 0"
            :value="notificationCounts"
        >
          <font-awesome-icon v-if="item.name !== 'user'" :icon="item.icon"/>
        </el-badge>
        <img v-if="item.name === 'user'" :src="icon" alt="user" width="32" height="32"/>
      </el-button>
    </template>
    <template #default>
      <div>
        <div class="button-menu" v-if="useDropdown">
          <el-button text plain v-for="btnItem in item.dropdowns" @click="btnItem.click">
            <font-awesome-icon v-if="!!btnItem?.icon" :icon="btnItem?.icon"/>
            <span>{{ $t(btnItem.name) }}</span>
          </el-button>
        </div>
        <p style="text-align: center" v-else>
          {{ $t(item.tips) }}
        </p>
      </div>
    </template>
  </el-popover>
</template>

<script setup>
const props = defineProps(['item', 'useDropdown'])

let icon = ref(props.item.icon)
let notificationCounts = ref(props.item.notificationCounts)

watch(() => props.item.icon, (val) => {
  icon.value = val
})

watch(() => props.item.notificationCounts, (val) => {
  notificationCounts.value = val
})
</script>

<style lang="scss" scoped>
button.header-btn {
  @apply mx-2.5;
  //width: 100%;
  //height: 100%;
  width: 32px;
  height: 32px;
  --el-button-bg-color: transparent;
  --el-button-border-color: #ffffff55;
  --el-button-text-color: #ffffff;

  span {
    img {
      width: 32px;
      height: 32px;
      max-width: max-content;
    }
  }
}

.button-menu {
  @apply w-full flex flex-col justify-start items-start;

  button {
    width: 100%;
    margin-left: 0;
    justify-content: flex-start;

    span svg {
      width: 30px;
    }
  }
}
</style>