<template>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">Product Details</h1>
        <NuxtLink to="/admin/product" class="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-1">
          <span>&larr;</span> Back to list
        </NuxtLink>
      </div>

      <div v-if="product" class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm p-6 space-y-6">
        <div>
          <span class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            Product Profile
          </span>
          <h2 class="mt-2 text-2xl font-bold tracking-tight text-gray-900">{{ product.name }}</h2>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-6 border-t border-gray-100">
          <div>
            <p class="text-xs font-bold uppercase tracking-wider text-gray-400">Price</p>
            <p class="mt-1 text-2xl font-bold font-mono text-gray-900">₱{{ product.price }}</p>
          </div>

          <div>
            <p class="text-xs font-bold uppercase tracking-wider text-gray-400">Available Stocks</p>
            <div class="mt-1 flex items-center gap-2">
              <span class="text-2xl font-bold font-mono" :class="product.stocks > 0 ? 'text-green-600' : 'text-red-500'">
                {{ product.stocks }}
              </span>
              <span class="text-sm text-gray-500">units</span>
            </div>
          </div>
        </div>

        <div class="pt-6 border-t border-gray-100">
          <p class="text-xs font-bold uppercase tracking-wider text-gray-400">Description</p>
          <p class="mt-2 text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-100 whitespace-pre-wrap">
            {{ product.description || 'No description provided' }}
          </p>
        </div>

        <div class="pt-6 border-t border-gray-100 flex flex-col gap-1">
          <p class="text-xs font-bold uppercase tracking-wider text-gray-400">Product ID (UUID)</p>
          <p class="font-mono text-sm text-gray-500 select-all">{{ product.uuid }}</p>
        </div>
      </div>

      <div v-else class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { productService } from '~/api/product/ProductService';

const route = useRoute();
const product = ref<any>(null);

onMounted(async () => {
  try {
    const response = await productService.show(String(route.params.uuid));
    product.value = response.data;
  } catch (err) {
    console.error('Failed to load product details:', err);
  }
});
</script>