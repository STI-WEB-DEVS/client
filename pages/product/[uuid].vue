<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">Product details</h1>
          <p class="mt-1 text-sm text-gray-500">This page shows the full product record fetched from the API.</p>
        </div>

        <NuxtLink
          to="/product"
          class="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Back to products
        </NuxtLink>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <div v-else-if="productRecord" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <p class="text-sm text-gray-500">Name</p>
            <p class="mt-2 text-base font-medium text-gray-900">{{ productRecord.name }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Price</p>
            <p class="mt-2 text-base font-medium text-gray-900">${{ productRecord.price }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Created at</p>
            <p class="mt-2 text-base font-medium text-gray-900">{{ formatDate(productRecord.created_at) }}</p>
          </div>
        </div>
      </div>

      <div v-else class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p class="text-sm text-gray-500">No product details were found for this UUID.</p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { productService } from '~/api/product/ProductService';

const route = useRoute();
const uuid = computed(() => String(route.params.uuid ?? ''));

const product = ref<any>(null);
const pending = ref(false);
const error = ref<any>(null);

const productRecord = computed(() => product.value?.data ?? product.value);

const formatDate = (value: string | null | undefined) => {
  if (!value) return '—';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const loadProduct = async () => {
  if (!uuid.value) {
    product.value = null;
    return;
  }

  pending.value = true;
  error.value = null;
  product.value = null;

  try {
    product.value = await productService.show(uuid.value);
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
};

watch(uuid, loadProduct, { immediate: true });
</script>
