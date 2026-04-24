<template>
  <div
    class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
  >
    <div>
      <h1 class="text-xl font-semibold tracking-tight text-gray-900">
        {{ title }}
      </h1>
      <p class="mt-1 text-sm text-gray-500">
        {{ description }}
      </p>
    </div>

    <button
      v-if="buttonText"
      type="button"
      @click="$emit('click')"
      class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
    >
      <PlusIcon class="h-4 w-4" />
      <span>{{ buttonText }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/outline";

defineProps<{
  title: string;
  description?: string;
  buttonText?: string;
}>();

defineEmits<{
  (e: "click"): void;
}>();
</script>
