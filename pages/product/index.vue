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
                  UUID
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Description
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
                  {{ product.uuid }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  {{ product.name }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ product.description }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  ${{ product.price }}
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
                <td colspan="5" class="px-6 py-10 text-center text-sm text-gray-500">
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
        @close="closeFeedbackModal"
      />

      <ProductFormModal
        :open="isFormModalOpen"
        :title="modalTitle"
        :initialData="formData"
        :submitLabel="submitLabel"
        :submitting="submitting"
        :error="formError"
        @close="closeFormModal"
        @submit="handleSubmitProduct"
      />

      <ConfirmModal
        :open="isConfirmModalOpen"
        title="Delete product"
        :message="confirmMessage"
        confirmLabel="Delete"
        :submitting="submitting"
        @close="closeConfirmModal"
        @confirm="handleConfirmDelete"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  PlusIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';
import { productService } from '~/api/product/ProductService';
import ProductFormModal from '~/components/ProductFormModal.vue';
import ConfirmModal from '~/components/ConfirmModal.vue';

const router = useRouter();

const products = ref<any>(null);
const pending = ref(false);
const submitting = ref(false);
const error = ref<any>(null);

const isFeedbackModalOpen = ref(false);
const feedbackMessage = ref('');

const isFormModalOpen = ref(false);
const isConfirmModalOpen = ref(false);
const modalMode = ref<'create' | 'edit'>('create');
const selectedProduct = ref<any>(null);
const formData = reactive({ name: '', description: '', price: 0 });
const formError = ref('');
const confirmMessage = ref('');

const modalTitle = computed(() => (modalMode.value === 'create' ? 'Create product' : 'Edit product'));
const submitLabel = computed(() => (modalMode.value === 'create' ? 'Create product' : 'Save changes'));

const loadProducts = async () => {
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

onMounted(loadProducts);

const openFeedbackModal = (message: string) => {
  feedbackMessage.value = message;
  isFeedbackModalOpen.value = true;
};

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
  feedbackMessage.value = '';
};

const openCreateModal = () => {
  modalMode.value = 'create';
  selectedProduct.value = null;
  formError.value = '';
  formData.name = '';
  formData.description = '';
  formData.price = 0;
  isFormModalOpen.value = true;
};

const openEditModal = (product: any) => {
  modalMode.value = 'edit';
  selectedProduct.value = product;
  formError.value = '';
  formData.name = product.name ?? '';
  formData.description = product.description ?? '';
  formData.price = product.price ?? 0;
  isFormModalOpen.value = true;
};

const closeFormModal = () => {
  isFormModalOpen.value = false;
  formError.value = '';
};

const openConfirmDeleteModal = (product: any) => {
  selectedProduct.value = product;
  confirmMessage.value = `Delete ${product.name}? This action cannot be undone.`;
  isConfirmModalOpen.value = true;
};

const closeConfirmModal = () => {
  isConfirmModalOpen.value = false;
  selectedProduct.value = null;
};

const handleSubmitProduct = async (payload: { name: string; description: string; price: number }) => {
  if (!payload.name || !payload.description || payload.price < 0) {
    formError.value = 'Name, description, and valid price are required.';
    return;
  }

  formError.value = '';
  submitting.value = true;

  try {
    if (modalMode.value === 'create') {
      await productService.create(payload);
      openFeedbackModal('Product created successfully.');
    } else if (selectedProduct.value) {
      await productService.update(selectedProduct.value.uuid, payload);
      openFeedbackModal('Product updated successfully.');
    }

    isFormModalOpen.value = false;
    await loadProducts();
  } catch (err: any) {
    formError.value = err?.message || 'Unable to save product.';
  } finally {
    submitting.value = false;
  }
};

const handleView = (product: any) => {
  router.push(`/product/${product.uuid}`);
};

const handleCreate = () => {
  openCreateModal();
};

const handleEdit = (product: any) => {
  openEditModal(product);
};

const handleDelete = (product: any) => {
  openConfirmDeleteModal(product);
};

const handleConfirmDelete = async () => {
  if (!selectedProduct.value) {
    return;
  }

  submitting.value = true;

  try {
    await productService.delete(selectedProduct.value.uuid);
    isConfirmModalOpen.value = false;
    openFeedbackModal('Product deleted successfully.');
    await loadProducts();
  } catch (err: any) {
    openFeedbackModal(err?.message || 'Unable to delete product.');
  } finally {
    submitting.value = false;
  }
};
</script>