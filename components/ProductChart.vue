<template>
  <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h3 class="text-base font-bold text-gray-900">Top 5 Products</h3>
        <p class="text-xs font-medium text-gray-400">
          Top selling products by quantity
        </p>
      </div>
    </div>

    <div class="relative h-64 w-full px-4">
      <!-- Y-Axis Grid Lines -->
      <div class="absolute inset-0 flex flex-col justify-between pt-2 pb-12">
        <div v-for="i in 5" :key="i" class="border-t border-gray-50"></div>
      </div>

      <div class="relative flex h-full items-end justify-around gap-4 pb-10">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="group relative flex h-full flex-1 flex-col items-center justify-end"
        >
          <!-- Tooltip -->
          <div
            class="absolute -top-12 z-20 hidden -translate-y-2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-bold text-white shadow-xl transition-all group-hover:block"
          >
            {{ product.total_purchased }} sold
            <div
              class="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900"
            ></div>
          </div>

          <!-- Bar -->
          <div
            class="w-full max-w-[48px] rounded-t-xl shadow-lg transition-all duration-700 ease-in-out group-hover:brightness-110"
            :class="colors[index % colors.length]"
            :style="{
              height:
                (Number(product.total_purchased) / maxPurchased) * 100 + '%',
            }"
          >
            <!-- Top Cap Shine -->
            <div class="h-1.5 w-full rounded-t-xl bg-white/20"></div>
          </div>

          <!-- Label -->
          <div class="absolute -bottom-10 w-full text-center">
            <p
              class="truncate text-[10px] font-bold uppercase tracking-tight text-gray-400"
              :title="product.name"
            >
              {{ product.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Product {
  name: string;
  total_purchased: number;
}

const props = defineProps<{
  products: Product[];
}>();

const colors = [
  "bg-indigo-500 hover:bg-indigo-600",
  "bg-emerald-500 hover:bg-emerald-600",
  "bg-amber-500 hover:bg-amber-600",
  "bg-rose-500 hover:bg-rose-600",
  "bg-sky-500 hover:bg-sky-600",
];

const maxPurchased = computed(() => {
  const max = Math.max(...props.products.map((p) => Number(p.total_purchased)));
  return max > 0 ? max : 1;
});
</script>
