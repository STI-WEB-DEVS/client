<template>
  <div class="rounded-xl border border-gray-200 bg-white p-5">
    <h2 class="text-base font-semibold text-gray-900">Order Summary</h2>

    <div v-if="items.length" class="mt-4 space-y-3">
      <div
        v-for="i in items"
        :key="i.uuid"
        class="flex items-start justify-between gap-4"
      >
        <div>
          <p class="text-sm font-medium text-gray-900">{{ i.name }}</p>
          <p class="text-xs text-gray-600">Qty: {{ i.quantity }}</p>
        </div>
        <p class="text-sm font-semibold text-gray-900">
          {{ formatMoney(i.price * i.quantity) }}
        </p>
      </div>
    </div>

    <div v-else class="mt-4 text-sm text-gray-600">Your cart is empty.</div>

    <div class="mt-5 border-t border-gray-200 pt-4">
      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-600">Total</p>
        <p class="text-base font-semibold text-gray-900">
          {{ formatMoney(total) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from "~/composables/useCart";

const props = defineProps<{ items: CartItem[] }>();

const total = computed(() =>
  props.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
);

const formatMoney = (value: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value || 0);
};
</script>
