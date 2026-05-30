<template>
  <NuxtLink
    :to="`/customer/catalog/${product.uuid}`"
    class="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    :class="{ 'pointer-events-none opacity-60': isOutOfStock }"
  >
    <!-- Out of stock overlay -->
    <div
      v-if="isOutOfStock"
      class="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/70"
    >
      <span class="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
        Out of Stock
      </span>
    </div>

    <!-- Image placeholder -->
    <div class="aspect-square w-full bg-gray-100">
      <div class="flex h-full items-center justify-center text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>

    <div class="flex flex-1 flex-col p-4">
      <h3 class="text-sm font-semibold text-gray-900 group-hover:text-indigo-600">
        {{ product.name }}
      </h3>
      <p class="mt-1 text-xs text-gray-500 line-clamp-2">
        {{ product.description ?? 'No description available.' }}
      </p>
      <div class="mt-auto flex items-center justify-between pt-4">
        <span class="text-base font-bold text-gray-900">
          ₱{{ Number(product.price).toFixed(2) }}
        </span>
        <span
          :class="[
            'text-xs font-medium',
            isOutOfStock ? 'text-red-500'
            : isLowStock  ? 'text-yellow-600'
            :               'text-gray-400'
          ]"
        >
          {{ isOutOfStock ? 'Out of stock' : isLowStock ? `Only ${product.stock_quantity} left` : `${product.stock_quantity} in stock` }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  product: {
    uuid: string
    name: string
    price: number | string
    description?: string
    stock_quantity: number
  }
}>()

const isOutOfStock = computed(() => props.product.stock_quantity <= 0)
const isLowStock   = computed(() => props.product.stock_quantity > 0 && props.product.stock_quantity <= 10)
</script>