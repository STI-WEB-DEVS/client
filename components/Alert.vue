<template>
  <div
    v-if="visible && message"
    class="rounded-md border px-4 py-3 text-sm"
    :class="
      variant === 'success'
        ? 'border-green-200 bg-green-50 text-green-800'
        : variant === 'error'
          ? 'border-red-200 bg-red-50 text-red-800'
          : 'border-gray-200 bg-gray-50 text-gray-700'
    "
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
type Variant = "success" | "error" | "info";

const props = defineProps<{
  message: string;
  variant?: Variant;
  duration?: number;
}>();

const visible = ref(true);

onMounted(() => {
  const time = props.duration ?? 3000;

  setTimeout(() => {
    visible.value = false;
  }, time);
});
</script>