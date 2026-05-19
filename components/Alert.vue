<template>
  <div
    :class="[
      'rounded-md p-4',
      {
        'bg-green-50 border border-green-200 text-green-800': variant === 'success',
        'bg-red-50 border border-red-200 text-red-800': variant === 'error',
        'bg-blue-50 border border-blue-200 text-blue-800': variant === 'info',
      }
    ]"
  >
    <p class="text-sm">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  variant: 'success' | 'error' | 'info'
  message: string
}>()
</script>