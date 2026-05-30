<template>
    <div class="space-y-6">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">
          View Product
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Dedicated product page using the UUID from the route.
        </p>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <div v-else class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p class="text-sm text-gray-500">Product UUID</p>
        <p class="mt-2 break-all text-base font-medium text-gray-900">
          {{ uuid }}
        </p>

        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p class="text-sm text-gray-500">Name</p>
            <p class="mt-1 text-gray-900">{{ product?.name ?? '-' }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Price</p>
            <p class="mt-1 text-gray-900">${{ parseFloat(product?.price || 0).toFixed(2) }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Stock Quantity</p>
            <p 
              class="mt-1 font-medium"
              :class="{
                'text-emerald-600': product?.stock > 5,
                'text-amber-600': product?.stock > 0 && product?.stock <= 5,
                'text-red-600': product?.stock <= 0
              }"
            >
              {{ product?.stock ?? 0 }} units
              <span v-if="product?.stock <= 0" class="text-xs">(Out of Stock)</span>
              <span v-else-if="product?.stock <= 5" class="text-xs">(Low Stock)</span>
            </p>
          </div>
          <div class="sm:col-span-2">
            <p class="text-sm text-gray-500">Description</p>
            <p class="mt-1 text-gray-900">{{ product?.description || 'No description provided.' }}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  role: 'admin'
})

import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { productService } from '~/api/product/ProductService';

const route = useRoute();

const uuid = computed(() => String(route.params.uuid ?? ''));

const product = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

onMounted(async () => {
  pending.value = true;
  error.value = null;

  try {
    product.value = await productService.show(uuid.value);
    product.value = product.value?.data ?? product.value;
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
});
</script>
