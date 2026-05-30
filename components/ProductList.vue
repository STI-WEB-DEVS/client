<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="p in products"
      :key="p.uuid"
      class="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 transition hover:border-gray-300 hover:shadow-sm"
    >
      <div
        class="mb-4 overflow-hidden rounded-lg bg-gray-100 ring-1 ring-inset ring-gray-200"
      >
        <div class="aspect-[16/10]">
          <img
            v-if="p.imageUrl"
            :src="p.imageUrl"
            :alt="p.name"
            class="h-full w-full object-cover"
            loading="lazy"
          />
          <div
            v-else
            class="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200"
          />
        </div>
      </div>

      <div class="flex items-start justify-between gap-4">
        <div class="min-w-0">
          <h3 class="truncate text-base font-semibold text-gray-900">
            {{ p.name }}
          </h3>
          <p
            v-if="p.description"
            class="mt-1 line-clamp-2 text-sm text-gray-600"
          >
            {{ p.description }}
          </p>
        </div>

        <div class="shrink-0">
          <span
            class="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200"
          >
            {{ formatMoney(p.price) }}
          </span>
        </div>
      </div>

      <div class="mt-3">
        <span 
          :class="[
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            p.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          ]"
        >
          {{ p.quantity > 0 ? `${p.quantity} in stock` : 'Out of Stock' }}
        </span>
      </div>

      <div class="mt-6 space-y-3">
        <NuxtLink
          :to="`/customer/product/${p.uuid}`"
          class="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          View Product
        </NuxtLink>

        <div class="flex gap-3">
          <button
            type="button"
            :disabled="p.quantity === 0"
            class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="$emit('add', p)"
          >
            Add to Cart
          </button>

          <button
            type="button"
            :disabled="p.quantity === 0"
            class="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="$emit('buyNow', p)"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/composables/useCart";

defineProps<{ products: Product[] }>();

defineEmits<{
  (e: "add", product: Product): void;
  (e: "buyNow", product: Product): void;
}>();

const formatMoney = (value: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value || 0);
};
</script>
