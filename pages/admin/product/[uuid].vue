<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-900">Product Details</h1>
        <NuxtLink to="/product" class="text-sm text-indigo-600">&larr; Back</NuxtLink>
      </div>

      <div v-if="product" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="text-2xl font-bold text-gray-900">{{ product.name }}</h2>
        <p class="mt-2 text-lg text-gray-600">Price: ₱{{ product.price }}</p>
        <div class="mt-6 pt-6 border-t border-gray-100">
          <p class="text-xs text-gray-400 uppercase font-bold tracking-widest">Product ID</p>
          <p class="font-mono text-sm text-gray-500">{{ product.uuid }}</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { productService } from '~/api/product/ProductService';

const route = useRoute();
const product = ref<any>(null);

onMounted(async () => {
  const response = await productService.show(String(route.params.uuid));
  product.value = response.data;
});
</script>