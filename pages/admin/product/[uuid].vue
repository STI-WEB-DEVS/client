<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">
          View Product
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Viewing details for the specific product record.
        </p>
      </div>

      <div v-if="pending" class="flex justify-center py-10">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="product" class="space-y-6">
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Product UUID</p>
          <p class="mt-2 break-all text-base font-medium text-gray-900">
            {{ product.uuid }}
          </p>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Product Name</p>
          <p class="mt-2 text-base font-medium text-gray-900">
            {{ product.name }}
          </p>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Product Price</p>
          <p class="mt-2 text-base font-medium text-gray-900">
            {{ product.price }}
          </p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Created at</p>
          <p class="mt-2 text-base font-medium text-gray-900">
            {{ product.created_at }}
          </p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Updated at</p>
          <p class="mt-2 text-base font-medium text-gray-900">
            {{ product.updated_at }}
          </p>
        </div>
      </div>

      <div v-else class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        Product not found or failed to load.
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { productService } from '~/api/product/ProductService';

const route = useRoute();
const uuid = String(route.params.uuid ?? '');

// State to store the fetched data
const product = ref<any>(null);
const pending = ref(true);

onMounted(async () => {
  try {
    pending.value = true;
    // FETCH: Use the show() method from your Service
    const response = await productService.show(uuid);
    
    // Most APIs return data inside a .data property
    product.value = response.data || response;
  } catch (error) {
    console.error('Error fetching product:', error);
  } finally {
    pending.value = false;
  }
});
</script>