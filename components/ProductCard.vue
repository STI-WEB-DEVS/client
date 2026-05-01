<script setup lang="ts">
const props = defineProps<{
  product: any;
}>();

const emit = defineEmits<{
  (e: "addToCart", product: any): void;
  (e: "buyNow", product: any): void;
}>();
</script>

<template>
  <div
    class="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
  >
    <!-- Product Image Placeholder -->
    <div
      class="aspect-square rounded-lg bg-gray-100 flex items-center justify-center mb-4"
    >
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
    </div>

    <!-- Product Info -->
    <h3 class="text-sm font-semibold text-gray-900">{{ product.name }}</h3>
    <p class="mt-1 text-lg font-bold text-indigo-600">
      ₱{{ Number(product.price).toFixed(2) }}
    </p>

    <!-- Action Buttons -->
    <div class="mt-4 flex gap-2">
      <button
        @click="emit('addToCart', product)"
        class="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
      >
        Add to Cart
      </button>
      <button
        @click="emit('buyNow', product)"
        class="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition"
      >
        Buy Now
      </button>
    </div>
  </div>
</template>
