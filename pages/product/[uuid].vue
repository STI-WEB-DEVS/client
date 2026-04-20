<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          @click="goBackToProducts"
        >
          <span>&larr;</span>
          <span>Back to Products</span>
        </button>
      </div>

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
        <dl class="space-y-4">
          <div>
            <dt class="text-sm text-gray-500">UUID</dt>
            <dd class="mt-1 break-all text-base font-medium text-gray-900">{{ product?.uuid }}</dd>
          </div>
          <div>
            <dt class="text-sm text-gray-500">Name</dt>
            <dd class="mt-1 text-base font-medium text-gray-900">{{ product?.name }}</dd>
          </div>
          <div>
            <dt class="text-sm text-gray-500">Price</dt>
            <dd class="mt-1 text-base font-medium text-gray-900">{{ formatPrice(product?.price) }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { productService } from '~/api/product/ProductService';

const route = useRoute();
const router = useRouter();

const uuid = String(route.params.uuid ?? '');
const product = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

const formatPrice = (value: number | string | undefined) => {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const goBackToProducts = () => {
  router.push('/product');
};

onMounted(async () => {
  pending.value = true;
  error.value = null;

  try {
    const response = await productService.show(uuid);
    product.value = response?.data ?? response;

    if (!product.value?.uuid) {
      throw new Error('Product details could not be loaded.');
    }
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
});
</script>
