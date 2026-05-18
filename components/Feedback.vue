<!-- components/Feedback.vue -->
<template>
  <div
    :class="[
      type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700',
      'rounded-md p-3 text-sm font-medium'
    ]"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string
  type?: 'success' | 'error'
}>()
</script>
