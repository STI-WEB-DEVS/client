<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed top-4 right-4 z-[9999] rounded-lg px-4 py-3 shadow-lg text-sm text-white"
      :class="typeClass"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  message: string
  type: 'success' | 'error'
  visible: boolean
}>()

const typeClass = computed(() =>
  props.type === 'success' ? 'bg-green-600' : 'bg-red-600'
)
</script>