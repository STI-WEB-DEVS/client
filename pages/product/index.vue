<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">Products</h1>
          <p class="mt-1 text-sm text-gray-500">
            Manage your product catalog.
          </p>
        </div>

        <button
          type="button"
          @click="handleCreate"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <PlusIcon class="h-4 w-4" />
          <span>Create Product</span>
        </button>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <div v-else class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Price
                </th>
                <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-100 bg-white">
              <tr
                v-for="product in products?.data"
                :key="product.uuid"
                class="transition hover:bg-gray-50"
              >
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {{ product.name }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  {{ product.price }}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      @click="handleView(product)"
                      class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <EyeIcon class="h-4 w-4" />
                      <span>View</span>
                    </button>

                    <button
                      type="button"
                      @click="handleEdit(product)"
                      class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <PencilSquareIcon class="h-4 w-4" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      @click="handleDelete(product)"
                      class="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <TrashIcon class="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="!products?.data?.length">
                <td colspan="3" class="px-6 py-10 text-center text-sm text-gray-500">
                  No products found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <p class="text-sm text-gray-500">
            Showing
            <span class="font-medium text-gray-900">{{ products?.meta?.from ?? 0 }}</span>
            to
            <span class="font-medium text-gray-900">{{ products?.meta?.to ?? 0 }}</span>
            of
            <span class="font-medium text-gray-900">{{ products?.meta?.total ?? 0 }}</span>
            products
          </p>
        </div>
      </div>

      <FeedbackModal
        :open="isFeedbackModalOpen"
        :message="feedbackMessage"
        :type="feedbackType"
        @close="closeFeedbackModal"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  PlusIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';
import { productService } from '~/api/product/ProductService';
import FeedbackModal from '~/components/FeedbackModal.vue';

const router = useRouter();

const products = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

const isFeedbackModalOpen = ref(false);
const feedbackMessage = ref('');
const feedbackType = ref<'success' | 'error' | 'info'>('info');

const fetchProducts = async () => {
  pending.value = true;
  error.value = null;
  try {
    products.value = await productService.list();
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
};

onMounted(fetchProducts);

const openFeedbackModal = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  feedbackMessage.value = message;
  feedbackType.value = type;
  isFeedbackModalOpen.value = true;
};

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
  feedbackMessage.value = '';
};

const handleCreate = () => {
  router.push('/product/create');
};

const handleView = (product: any) => {
  router.push(`/product/${product.uuid}?mode=view`);
};

const handleEdit = (product: any) => {
  router.push(`/product/${product.uuid}`);
};

const handleDelete = async (product: any) => {
  if (confirm(`Are you sure you want to delete ${product.name}?`)) {
    try {
      await productService.delete(product.uuid);
      openFeedbackModal('Product deleted successfully!', 'success');
      fetchProducts();
    } catch (err: any) {
      openFeedbackModal(err.message || 'Failed to delete product', 'error');
    }
  }
};
</script>
