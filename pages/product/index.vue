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
                :key="product.id"
                class="transition hover:bg-gray-50"
              >
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  {{ product.name }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {{ formatPrice(product.price) }}
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
      </div>

      <FeedbackModal
        :open="isFeedbackModalOpen"
        :title="feedbackTitle"
        :message="feedbackMessage"
        :tone="feedbackTone"
        @close="closeFeedbackModal"
      />

      <teleport to="body">
        <transition name="fade">
          <div
            v-if="isFormModalOpen"
            class="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              class="absolute inset-0 bg-black/30 backdrop-blur-sm"
              @click="closeFormModal"
            />

            <div class="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-lg font-semibold text-gray-900">
                    {{ formMode === 'create' ? 'Create product' : 'Edit product' }}
                  </h2>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ formMode === 'create'
                      ? 'Add a new product to the database.'
                      : 'Update the selected product record in the database.' }}
                  </p>
                </div>

                <button
                  type="button"
                  class="rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                  @click="closeFormModal"
                >
                  x
                </button>
              </div>

              <form class="mt-6 space-y-4" @submit.prevent="submitProductForm">
                <div>
                  <label for="product-name" class="block text-sm font-medium text-gray-900">Name</label>
                  <input
                    id="product-name"
                    v-model="form.name"
                    type="text"
                    required
                    class="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-900"
                  />
                </div>

                <div>
                  <label for="product-price" class="block text-sm font-medium text-gray-900">Price</label>
                  <input
                    id="product-price"
                    v-model="form.price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    class="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-900"
                  />
                </div>

                <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>

                <div class="flex justify-end gap-3">
                  <button
                    type="button"
                    class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    @click="closeFormModal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {{ isSubmitting ? 'Saving...' : formMode === 'create' ? 'Create product' : 'Save changes' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </transition>
      </teleport>
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

const router = useRouter();

type Product = {
  id: number;
  uuid: string;
  name: string;
  price: number | string;
};

const products = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);
const isSubmitting = ref(false);
const isFormModalOpen = ref(false);
const formMode = ref<'create' | 'edit'>('create');
const selectedProductUuid = ref('');
const formError = ref('');
const form = ref({
  name: '',
  price: '0.00',
});

const isFeedbackModalOpen = ref(false);
const feedbackTitle = ref('Feedback');
const feedbackMessage = ref('');
const feedbackTone = ref<'neutral' | 'success' | 'error'>('neutral');

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

const formatPrice = (value: number | string) => {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const openFeedbackModal = (
  title: string,
  message: string,
  tone: 'neutral' | 'success' | 'error' = 'neutral',
) => {
  feedbackTitle.value = title;
  feedbackMessage.value = message;
  feedbackTone.value = tone;
  isFeedbackModalOpen.value = true;
};

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
  feedbackTitle.value = 'Feedback';
  feedbackMessage.value = '';
  feedbackTone.value = 'neutral';
};

const openCreateModal = () => {
  formMode.value = 'create';
  selectedProductUuid.value = '';
  form.value = { name: '', price: '0.00' };
  formError.value = '';
  isFormModalOpen.value = true;
};

const openEditModal = (product: Product) => {
  formMode.value = 'edit';
  selectedProductUuid.value = product.uuid;
  form.value = {
    name: product.name,
    price: Number(product.price).toFixed(2),
  };
  formError.value = '';
  isFormModalOpen.value = true;
};

const closeFormModal = () => {
  isFormModalOpen.value = false;
  formError.value = '';
};

const submitProductForm = async () => {
  isSubmitting.value = true;
  formError.value = '';

  try {
    const payload = {
      name: form.value.name,
      price: Number(form.value.price),
    };

    if (formMode.value === 'create') {
      await productService.create(payload);
      openFeedbackModal('Success', 'Product created successfully.', 'success');
    } else {
      await productService.update(selectedProductUuid.value, payload);
      openFeedbackModal('Success', 'Product updated successfully.', 'success');
    }

    closeFormModal();
    await fetchProducts();
  } catch (err: any) {
    formError.value = err?.message || 'Unable to save product.';
  } finally {
    isSubmitting.value = false;
  }
};

const handleCreate = () => {
  openCreateModal();
};

const handleView = (product: Product) => {
  router.push(`/product/${product.uuid}`);
};

const handleEdit = (product: Product) => {
  openEditModal(product);
};

const handleDelete = async (product: Product) => {
  const confirmed = window.confirm(`Delete product "${product.name}"?`);

  if (!confirmed) {
    return;
  }

  try {
    await productService.delete(product.uuid);
    openFeedbackModal('Success', 'Product deleted successfully.', 'success');
    await fetchProducts();
  } catch (err: any) {
    openFeedbackModal('Delete failed', err?.message || 'Unable to delete product.', 'error');
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
