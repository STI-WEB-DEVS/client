<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">Products</h1>
        <p class="mt-1 text-sm text-gray-500">Displaying product records from your API.</p>
      </div>

      <button
        type="button"
        @click="handleCreate"
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 cursor-pointer"
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
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">ID</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Description</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Stocks</th>
              <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100 bg-white">
            <tr v-for="product in products?.data" :key="product.id" class="transition hover:bg-gray-50">
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ product.id }}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-700">{{ product.name }}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 font-mono">₱{{ product.price }}</td>
              <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{{ product.description || 'No description provided' }}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm">
                <span :class="product.stocks > 0 ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold bg-red-50 px-2.5 py-1 rounded-md'">
                  {{ product.stocks }}
                </span>
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                <div class="flex items-center justify-end gap-2">
                  <button @click="handleView(product)" class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                    <EyeIcon class="h-4 w-4" />
                    <span>View</span>
                  </button>
                  <button @click="handleEdit(product)" class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                    <PencilSquareIcon class="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button @click="handleDelete(product)" class="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 cursor-pointer">
                    <TrashIcon class="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!products?.data?.length">
              <td colspan="6" class="px-6 py-10 text-center text-sm text-gray-500">No products found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="border-t border-gray-200 bg-gray-50 px-6 py-4">
        <p class="text-sm text-gray-500">
          Showing <span class="font-medium text-gray-900">{{ products?.meta?.from ?? 0 }}</span>
          to <span class="font-medium text-gray-900">{{ products?.meta?.to ?? 0 }}</span>
          of <span class="font-medium text-gray-900">{{ products?.meta?.total ?? 0 }}</span> products
        </p>
      </div>
    </div>

    <!-- Modal Form container -->
    <div v-if="isFormModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 class="mb-4 text-lg font-bold text-gray-900">{{ selectedProduct ? 'Edit' : 'Create' }} Product</h2>
        <EntityForm
          :config="productFormConfig"
          :initialData="selectedProduct"
          :buttonLabel="selectedProduct ? 'Update Product' : 'Save Product'"
          @submit="handleFormSubmit"
          @cancel="closeFormModal"
        />
      </div>
    </div>

    <!-- Feedback alerts popup -->
    <FeedbackModal
      :open="isFeedbackModalOpen"
      :title="feedbackTitle"
      :message="feedbackMessage"
      :confirm-text="feedbackConfirmText"
      @close="closeFeedbackModal"
      @confirm="handleConfirmAction"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { PlusIcon, EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { productService } from '~/api/product/ProductService';

const router = useRouter();

// --- API State ---
const products = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

// --- Modal & Feedback State ---
const isFeedbackModalOpen = ref(false);
const feedbackMessage = ref('');
const feedbackTitle = ref('Success');
const feedbackConfirmText = ref('Close');

const isFormModalOpen = ref(false);
const selectedProduct = ref<any>(null);
const pendingDeleteUuid = ref<string | null>(null);

// --- Dynamic Form configuration ---
const productFormConfig = computed(() => {
  const base = [
    { key: 'name', label: 'Product Name', placeholder: 'Enter product name (No numbers/digits)' },
    { key: 'price', label: 'Price (₱)', type: 'number', placeholder: '0.00' },
    { key: 'description', label: 'Description', placeholder: 'Describe this product here...' },
  ];

  if (selectedProduct.value) {
    // Edit mode: stocks cannot be manually changed, they are viewable and allow additions
    return [
      ...base,
      { key: 'current_stocks', label: 'Current Stocks Balance', type: 'number', placeholder: '0', disabled: true },
      { key: 'stock_addition', label: 'Add Extra Stocks', type: 'number', placeholder: 'Type quantity to add...' }
    ];
  }

  // Create mode: allow entering initial stocks directly
  return [
    ...base,
    { key: 'stocks', label: 'Initial Stocks Quantity', type: 'number', placeholder: '0' }
  ];
});

const fetchProducts = async () => {
  pending.value = true;
  try {
    products.value = await productService.list();
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
};

onMounted(fetchProducts);

// --- Feedback Logic ---
const openFeedbackModal = (title: string, message: string) => {
  feedbackTitle.value = title;
  feedbackMessage.value = message;
  feedbackConfirmText.value = 'Close';
  isFeedbackModalOpen.value = true;
};

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
  feedbackMessage.value = '';
  pendingDeleteUuid.value = null;
};

const handleConfirmAction = async () => {
  if (feedbackTitle.value === 'Confirmation' && pendingDeleteUuid.value) {
    try {
      await productService.delete(pendingDeleteUuid.value);
      pendingDeleteUuid.value = null;
      openFeedbackModal('Success', 'Product deleted successfully.');
      fetchProducts();
    } catch (err) {
      openFeedbackModal('Error', 'Failed to delete product.');
    }
  } else {
    closeFeedbackModal();
  }
};

// --- Form Logic ---
const handleCreate = () => {
  selectedProduct.value = null;
  isFormModalOpen.value = true;
};

const handleEdit = (product: any) => {
  // Map current stocks into read-only layout and init additions at 0
  selectedProduct.value = { 
    ...product, 
    current_stocks: product.stocks,
    stock_addition: 0 
  };
  isFormModalOpen.value = true;
};

const closeFormModal = () => {
  isFormModalOpen.value = false;
  selectedProduct.value = null;
};

const handleFormSubmit = async (formData: any) => {
  try {
    if (selectedProduct.value) {
      const payload = {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description || '',
        stock_addition: formData.stock_addition ? parseInt(formData.stock_addition) : 0
      };
      await productService.update(selectedProduct.value.uuid, payload);
      openFeedbackModal('Success', 'Product and stock balances modernized successfully!');
    } else {
      const payload = {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description || '',
        stocks: formData.stocks ? parseInt(formData.stocks) : 0
      };
      await productService.create(payload);
      openFeedbackModal('Success', 'Product saved successfully!');
    }
    closeFormModal();
    fetchProducts();
  } catch (err: any) {
    // Elegant check to show detailed form field validations if any fail
    let errorMessage = '';
    if (err.response?.data?.errors) {
      errorMessage = Object.values(err.response.data.errors).flat().join('\n');
    } else {
      errorMessage = err.response?.data?.message || err.message || 'An item validation error occurred.';
    }
    openFeedbackModal('Error', errorMessage);
  }
};

// --- Action Logic ---
const handleView = (product: any) => {
  router.push(`/admin/product/${product.uuid}`);
};

const handleDelete = (product: any) => {
  pendingDeleteUuid.value = product.uuid;
  feedbackTitle.value = 'Confirmation';
  feedbackConfirmText.value = 'Delete';
  feedbackMessage.value = `Are you sure you want to delete ${product.name}?`;
  isFeedbackModalOpen.value = true;
};
</script>