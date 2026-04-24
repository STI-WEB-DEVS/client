<template>
  <NuxtLayout>
    <div class="mx-auto max-w-2xl space-y-6">
      <div class="flex items-center gap-4">
        <button
          @click="router.push('/product')"
          class="rounded-lg border border-gray-200 p-2 transition hover:bg-gray-50"
        >
          <ArrowLeftIcon class="h-5 w-5 text-gray-500" />
        </button>
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">
            Product Details
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            Viewing product information.
          </p>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="product" class="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="divide-y divide-gray-100">
          <div class="px-6 py-4">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">UUID</p>
            <p class="mt-1 text-sm font-mono text-gray-900 bg-gray-50 rounded-lg px-4 py-2">{{ product.uuid }}</p>
          </div>
          <div class="px-6 py-4">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Product Name</p>
            <p class="mt-1 text-sm text-gray-900">{{ product.name }}</p>
          </div>
          <div class="px-6 py-4">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Price</p>
            <p class="mt-1 text-sm text-gray-900">${{ product.price }}</p>
          </div>
          <div v-if="product.created_at" class="px-6 py-4">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Created At</p>
            <p class="mt-1 text-sm text-gray-900">{{ product.created_at }}</p>
          </div>
          <div v-if="product.updated_at" class="px-6 py-4">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Updated At</p>
            <p class="mt-1 text-sm text-gray-900">{{ product.updated_at }}</p>
          </div>
        </div>
      </div>

      <div v-else class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">Product not found.</p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { productService } from '~/api/product/ProductService';

const route = useRoute();
const router = useRouter();

const uuid = computed(() => String(route.params.uuid ?? ''));

const product = ref<any>(null);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await productService.show(uuid.value);
    product.value = response.data || response;
  } catch (err) {
    console.error('Failed to fetch product', err);
  } finally {
    loading.value = false;
  }
});
</script>
