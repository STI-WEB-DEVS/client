<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">View Product</h1>
          <p class="mt-1 text-sm text-gray-500">Product details loaded from the API.</p>
        </div>

        <div class="flex gap-2">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            @click="router.push('/product')"
          >
            Back
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            @click="handleEdit"
          >
            Edit Product
          </button>
        </div>
      </div>

      <div v-if="pending" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div class="text-sm text-gray-500">Loading product...</div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message ?? error }}</p>
      </div>

      <div v-else-if="product" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <p class="text-sm text-gray-500">Name</p>
            <p class="mt-2 text-base font-medium text-gray-900">{{ product.name }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Price</p>
            <p class="mt-2 text-base font-medium text-gray-900">${{ product.price }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Created At</p>
            <p class="mt-2 text-base font-medium text-gray-900">{{ new Date(product.created_at).toLocaleString() }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Updated At</p>
            <p class="mt-2 text-base font-medium text-gray-900">{{ new Date(product.updated_at).toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { productService } from '~/api/product/ProductService';

const route = useRoute();
const router = useRouter();

const uuid = computed(() => String(route.params.uuid ?? ''));
const product = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

const loadProduct = async () => {
  pending.value = true;
  error.value = null;

  try {
    const response: any = await productService.show(uuid.value);
    product.value = response?.data ?? response;
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
};

onMounted(loadProduct);

const handleEdit = () => {
  router.push(`/product/${uuid.value}/edit`);
};
</script>
