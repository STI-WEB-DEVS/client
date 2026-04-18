<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">Products</h1>
          <p class="mt-1 text-sm text-gray-500">
            Displaying product records from your API.
          </p>
        </div>

        <button type="button" @click="handleCreate"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
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
                  ID
                </th>
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
              <tr v-for="product in products?.data" :key="product.uuid" class="transition hover:bg-gray-50">
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {{ product.id }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  {{ product.name }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  ${{ product.price }}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  <div class="flex items-center justify-end gap-2">
                    <button type="button" @click="handleView(product)"
                      class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <EyeIcon class="h-4 w-4" />
                      <span>View</span>
                    </button>

                    <button type="button" @click="handleEdit(product)"
                      class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <PencilSquareIcon class="h-4 w-4" />
                      <span>Edit</span>
                    </button>

                    <button type="button" @click="handleDelete(product)"
                      class="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50">
                      <TrashIcon class="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="!products?.data?.length">
                <td colspan="4" class="px-6 py-10 text-center text-sm text-gray-500">
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

      <BaseModal
        :open="isModalOpen"
        title="Product"
        :fields="[
          { key: 'name', label: 'Name', placeholder: 'Product Name' },
          { key: 'price', label: 'Price', type: 'number', step: '0.01', placeholder: '0.00' }
        ]"
        :initial-data="selectedProduct"
        :pending="isSaving"
        @close="closeModal"
        @save="handleSave"
      />

      <FeedbackModal :open="isFeedbackModalOpen" :message="feedbackMessage" @close="closeFeedbackModal" />

      <FeedbackModal
        :open="isDeleteModalOpen"
        title="Confirm Delete"
        :message="`Are you sure you want to delete ${selectedProductToDelete?.name}?`"
        show-cancel
        @close="isDeleteModalOpen = false"
        @confirm="confirmDelete"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  PlusIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';
import { productService } from '~/api/product/ProductService';
import BaseModal from '~/components/BaseModal.vue';

const router = useRouter();

const products = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

const isFeedbackModalOpen = ref(false);
const feedbackMessage = ref('');

const isModalOpen = ref(false);
const isSaving = ref(false);
const selectedProduct = ref<any>(null);

const isDeleteModalOpen = ref(false);
const selectedProductToDelete = ref<any>(null);

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

onMounted(() => {
  fetchProducts();
});

const openFeedbackModal = (message: string) => {
  feedbackMessage.value = message;
  isFeedbackModalOpen.value = true;
};

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
  feedbackMessage.value = '';
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedProduct.value = null;
};

const handleCreate = () => {
  selectedProduct.value = null;
  isModalOpen.value = true;
};

const handleEdit = (product: any) => {
  selectedProduct.value = product;
  isModalOpen.value = true;
};

const handleSave = async (formData: any) => {
  isSaving.value = true;
  try {
    if (selectedProduct.value) {
      await productService.update(selectedProduct.value.uuid, formData);
    } else {
      await productService.create(formData);
    }
    await fetchProducts();
    closeModal();
    openFeedbackModal(`Product ${selectedProduct.value ? 'updated' : 'created'} successfully`);
  } catch (err: any) {
    console.error('Failed to save product:', err);
    openFeedbackModal('Failed to save product.');
  } finally {
    isSaving.value = false;
  }
};

const handleView = (product: any) => {
  router.push(`/products/${product.uuid}`);
};

const handleDelete = (product: any) => {
  selectedProductToDelete.value = product;
  isDeleteModalOpen.value = true;
};

const confirmDelete = async () => {
  if (!selectedProductToDelete.value) return;

  try {
    await productService.delete(selectedProductToDelete.value.uuid);
    await fetchProducts();
    isDeleteModalOpen.value = false;
    openFeedbackModal('Product deleted successfully');
  } catch (err: any) {
    console.error('Failed to delete product:', err);
    openFeedbackModal('Failed to delete product.');
  } finally {
    selectedProductToDelete.value = null;
  }
};
</script>