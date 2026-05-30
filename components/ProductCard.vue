<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  product: any;
}>();

const emit = defineEmits<{
  (e: 'addToCart', product: any): void;
  (e: 'buyNow', product: any): void;
}>();

const isOutOfStock = computed(() => props.product.stock_quantity === 0);
const isLowStock   = computed(() => props.product.stock_quantity > 0 && props.product.stock_quantity <= 5);
</script>

<template>
  <div
    class="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
    :class="{ 'opacity-60': isOutOfStock }"
  >
    <!-- Product Image Placeholder -->
    <div class="aspect-square rounded-lg bg-gray-100 flex items-center justify-center mb-4 relative">
      <svg
        class="h-12 w-12 text-gray-300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
        />
      </svg>

      <!-- Out-of-stock overlay -->
      <div
        v-if="isOutOfStock"
        class="absolute inset-0 rounded-lg bg-gray-100/80 flex items-center justify-center"
      >
        <span class="rounded-full bg-gray-800 px-3 py-1 text-xs font-semibold text-white tracking-wide">
          Out of Stock
        </span>
      </div>
    </div>

    <!-- Product Info -->
    <h3 class="text-sm font-semibold text-gray-900">{{ product.name }}</h3>
    <p class="mt-1 text-lg font-bold text-indigo-600">
      ₱{{ Number(product.price).toFixed(2) }}
    </p>

    <!-- Stock status -->
    <div class="mt-1.5 h-4">
      <p v-if="isOutOfStock" class="text-xs font-medium text-red-500">
        Currently unavailable
      </p>
      <p v-else-if="isLowStock" class="text-xs font-medium text-amber-500">
        Only {{ product.stock_quantity }} left!
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="mt-4 flex gap-2">
      <button
        @click="emit('addToCart', product)"
        :disabled="isOutOfStock"
        class="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:cursor-not-allowed disabled:opacity-40"
      >
        Add to Cart
      </button>
      <button
        @click="emit('buyNow', product)"
        :disabled="isOutOfStock"
        class="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition disabled:cursor-not-allowed disabled:opacity-40"
      >
        Buy Now
      </button>
    </div>
  </div>
</template>