<template>
  <div
    v-if="message"
    class="rounded-md border px-4 py-3 text-sm"
    :class="
      variant === 'success'
        ? 'border-green-200 bg-green-50 text-green-800'
        : variant === 'error'
          ? 'border-red-200 bg-red-50 text-red-800'
          : variant === 'warning'
            ? 'border-yellow-200 bg-yellow-50 text-yellow-800'
            : 'border-gray-200 bg-gray-50 text-gray-700'
    "
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
type Variant = "success" | "error" | "info" | "warning";

defineProps<{ message: string; variant?: Variant }>();
</script>
