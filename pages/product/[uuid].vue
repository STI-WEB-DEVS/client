<template>
  <NuxtLayout>
    <div class="mx-auto max-w-2xl space-y-6">
      <div class="flex items-center gap-4">
        <button
          @click="router.back()"
          class="rounded-lg border border-gray-200 p-2 transition hover:bg-gray-50"
        >
          <ArrowLeftIcon class="h-5 w-5 text-gray-500" />
        </button>
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">
            {{ pageTitle }}
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            {{ pageSubtitle }}
          </p>
        </div>
      </div>

      <div v-if="loading && !isCreate" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <!-- Read-only view mode -->
      <div v-else-if="isViewMode && product" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p class="text-sm font-medium text-gray-500">UUID</p>
        <p class="mt-1 text-sm text-gray-900 font-mono bg-gray-50 rounded-lg px-4 py-2">{{ product.uuid }}</p>
      </div>

      <!-- Create / Edit form mode -->
      <EntityForm
        v-else-if="!isViewMode"
        :entityName="'Product'"
        :fields="fields"
        :service="productService"
        :initialData="product"
        :isEdit="!isCreate"
        :uuid="uuid"
        @success="handleSuccess"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { productService } from '~/api/product/ProductService';
import EntityForm from '~/components/EntityForm.vue';

const route = useRoute();
const router = useRouter();

// UUID extraction pattern as per instruction 7
const uuid = computed(() => String(route.params.uuid ?? ''));
const isCreate = computed(() => uuid.value === 'create');
const isViewMode = computed(() => route.query.mode === 'view');

const pageTitle = computed(() => {
  if (isCreate.value) return 'Create Product';
  if (isViewMode.value) return 'Product Details';
  return 'Edit Product';
});

const pageSubtitle = computed(() => {
  if (isCreate.value) return 'Fill in the information below to add a new product.';
  if (isViewMode.value) return `Viewing product: ${uuid.value}`;
  return `Editing product: ${uuid.value}`;
});

const product = ref<any>(null);
const loading = ref(false);

const fields = [
  { name: 'name', label: 'Product Name', placeholder: 'e.g. Premium Widget', required: true },
  { name: 'price', label: 'Price', type: 'number', placeholder: '0.00', required: true },
];

onMounted(async () => {
  if (!isCreate.value) {
    loading.value = true;
    try {
      const response = await productService.show(uuid.value);
      product.value = response.data || response;
    } catch (err) {
      console.error('Failed to fetch product', err);
    } finally {
      loading.value = false;
    }
  }
});

const handleSuccess = () => {
  if (isCreate.value) {
    router.push('/product');
  }
};
</script>
