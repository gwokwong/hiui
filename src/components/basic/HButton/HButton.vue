<template>
  <div class="h-button-container">
    <div class="h-button-wrapper group" :class="[plain ? 'is-plain' : '']">
      <button
        :type="nativeType"
        class="h-button"
        :class="[plain ? 'is-plain' : '', `is-${type}`]"
        @click="emit('click')"
      >
        <slot></slot>
      </button>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ButtonType, ButtonTypeMap } from './buttonType'

const emit = defineEmits(['click'])
const props = defineProps({
  nativeType: {
    type: String,
    default: 'button',
    required: false,
  },
  type: {
    type: String,
    default: ButtonType.Primary,
    required: false,
  },
  plain: {
    type: Boolean,
    default: false,
    required: false,
  },
})

</script>

<style lang="scss" scoped>
.h-button-container:not(:first-of-type) {
  @apply ml-4;
}

.h-button-wrapper {
  @apply rounded-md border border-transparent overflow-hidden transition;

  .h-button {
    @apply flex w-full justify-center py-2 px-4 text-sm font-medium
    text-white shadow-sm transition-all;
  }

  .h-button.is-primary {
    @apply bg-indigo-600 hover:bg-indigo-700;
  }

  .h-button.is-plain {
    @apply bg-white hover:bg-gray-50 text-gray-500;
  }
}

.h-button-wrapper:not(.is-plain) {
  @apply focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2;
}

.h-button-wrapper.is-plain {
  @apply border-gray-300 focus-within:ring-0;
}
</style>
