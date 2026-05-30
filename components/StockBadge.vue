<template>
  <!-- 0 = out of stock -->
  <span
    v-if="quantity === 0"
    class="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700"
  >
    <XCircleIcon class="h-3 w-3" />
    Out of stock
  </span>

  <!-- 1–5 = low stock -->
  <span
    v-else-if="quantity <= lowThreshold"
    class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700"
  >
    <ExclamationTriangleIcon class="h-3 w-3" />
    Low — {{ quantity }} left
  </span>

  <!-- in stock -->
  <span
    v-else
    class="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700"
  >
    <CheckCircleIcon class="h-3 w-3" />
    {{ quantity }} in stock
  </span>
</template>

<script setup lang="ts">
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/outline';

withDefaults(
  defineProps<{
    quantity: number;
    lowThreshold?: number;
  }>(),
  { lowThreshold: 5 }
);
</script>