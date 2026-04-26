<template>
    <main class="flex-1 p-6">
      <!-- View mode stays inline -->
      <div v-if="isViewMode && product" class="mx-auto max-w-2xl space-y-6">
        <h1 class="text-xl font-semibold text-gray-900">Product Details</h1>
        <p class="text-sm text-gray-500">Viewing product: {{ uuid }}</p>

        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p class="text-sm font-medium text-gray-500">UUID</p>
          <p class="mt-1 text-sm text-gray-900 font-mono bg-gray-50 rounded-lg px-4 py-2">{{ product.uuid }}</p>

          <p class="text-sm font-medium text-gray-500 mt-4">Name</p>
          <p class="mt-1 text-sm text-gray-900">{{ product.name }}</p>

          <p class="text-sm font-medium text-gray-500 mt-4">Price</p>
          <p class="mt-1 text-sm text-gray-900">{{ product.price }}</p>

          <p class="text-sm font-medium text-gray-500 mt-4">Description</p>
          <p class="mt-1 text-sm text-gray-900">{{ product.description }}</p>
        </div>
      </div>
    </main>

    <!-- Modal for create & edit -->
    <div
      v-if="(isCreate || !isViewMode) && showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="w-full max-w-2xl rounded-2xl bg-white shadow-lg p-6 relative">
        <!-- Close button -->
        <button
          @click="closeModal"
          class="absolute top-4 right-4 rounded-lg border border-gray-200 p-2 transition hover:bg-gray-50"
        >
          <ArrowLeftIcon class="h-5 w-5 text-gray-500" />
        </button>

        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">
            {{ pageTitle }}
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            {{ pageSubtitle }}
          </p>
        </div>

        <!-- Loading spinner (only for edit mode) -->
        <div v-if="loading && !isCreate" class="flex justify-center py-16">
          <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
        </div>

        <!-- Create / Edit form -->
        <EntityForm
          v-else
          :entityName="'Product'"
          :fields="fields"
          :service="productService"
          :initialData="product"
          :isEdit="!isCreate"
          :uuid="uuid"
          @success="handleSuccess"
          @error="handleError"
        />

        <!-- Feedback banner -->
        <Feedback v-if="feedbackMessage" :message="feedbackMessage" :type="feedbackType" />
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { productService } from '~/api/product/ProductService';
import EntityForm from '~/components/EntityForm.vue';
import Feedback from '~/components/Feedback.vue';

const route = useRoute();
const router = useRouter();

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
  { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter description' },
];

const feedbackMessage = ref('');
const feedbackType = ref<'success' | 'error'>('success');

// Modal state
const showModal = ref(true);
const closeModal = () => {
  showModal.value = false;
  router.push('/admin/product'); // navigate away when closing
};

onMounted(async () => {
  if (!isCreate.value) {
    loading.value = true;
    try {
      const response = await productService.show(uuid.value);
      product.value = response.data || response;
    } catch (err) {
      feedbackMessage.value = 'Failed to fetch product';
      feedbackType.value = 'error';
    } finally {
      loading.value = false;
    }
  }
});

const handleSuccess = () => {
  feedbackMessage.value = isCreate.value
    ? 'Product created successfully!'
    : 'Product updated successfully!';
  feedbackType.value = 'success';
  setTimeout(() => closeModal(), 1500);
};

const handleError = (err: any) => {
  feedbackMessage.value = err?.message || 'Error saving product.';
  feedbackType.value = 'error';
};
</script>
