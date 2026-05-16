<template>
  <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <div class="mb-6 flex items-center justify-between">
      <h3 class="text-base font-semibold text-gray-900">Top 5 Most Purchased Products</h3>
      <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</span>
    </div>

    <div class="relative h-64 w-full">
      <div class="flex h-full items-end justify-around gap-2 px-2">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="group relative flex flex-1 flex-col items-center"
        >
          <!-- Tooltip -->
          <div
            class="absolute -top-10 z-10 hidden rounded bg-gray-900 px-2 py-1 text-[10px] font-medium text-white group-hover:block"
          >
            {{ product.total_purchased }} orders
          </div>

          <!-- Bar -->
          <div
            class="w-full max-w-[40px] rounded-t-lg bg-gray-900 transition-all duration-500 ease-out group-hover:bg-gray-700"
            :style="{ height: (product.total_purchased / maxPurchased) * 100 + '%' }"
          ></div>

          <!-- Label -->
          <div class="mt-4 w-full text-center">
            <p class="truncate text-[10px] font-medium text-gray-500" :title="product.name">
              {{ product.name }}
            </p>
          </div>
        </div>
      </div>

      <!-- Background Grid Lines -->
      <div class="absolute inset-0 -z-0 flex flex-col justify-between pt-4 pb-14 pointer-events-none">
        <div v-for="i in 4" :key="i" class="border-t border-gray-100 w-full h-0"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Product {
  name: string;
  total_purchased: number;
}

const props = defineProps<{
  products: Product[];
}>();

const maxPurchased = computed(() => {
  const max = Math.max(...props.products.map(p => p.total_purchased));
  return max > 0 ? max : 1;
});
</script>
