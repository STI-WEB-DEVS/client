<template>
  <div class="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
    <!-- Image placeholder -->
    <div class="h-16 w-16 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-gray-300">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>

    <!-- Name + price -->
    <div class="flex-1">
      <p class="text-sm font-semibold text-gray-900">{{ item.name }}</p>
      <p class="text-sm text-gray-500">₱{{ Number(item.price).toFixed(2) }} each</p>
      <p class="mt-0.5 text-xs text-gray-400">{{ item.stock_quantity }} available</p>
    </div>

    <!-- Quantity selector capped to stock -->
    <QuantitySelector
      :model-value="item.quantity"
      :min="1"
      :max="item.stock_quantity"
      @update:model-value="(val) => $emit('update-quantity', item.product_uuid, val)"
    />

    <!-- Line total -->
    <p class="w-24 text-right text-sm font-bold text-gray-900">
      ₱{{ (Number(item.price) * item.quantity).toFixed(2) }}
    </p>

    <!-- Remove button -->
    <button
      type="button"
      @click="$emit('remove', item.product_uuid)"
      class="ml-2 text-red-400 transition hover:text-red-600"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '~/composables/useCart'

defineProps<{
  item: CartItem
}>()

defineEmits<{
  'update-quantity': [product_uuid: string, quantity: number]
  'remove': [product_uuid: string]
}>()
</script>