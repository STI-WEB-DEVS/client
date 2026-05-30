<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { productService } from '~/api/product/ProductService';
import FeedbackModal from '~/components/FeedbackModal.vue';
import {
  PencilSquareIcon,
  TrashIcon,
  ArrowLeftIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();
const uuid = computed(() => String(route.params.uuid ?? ''));

const productData = ref(null);
const pending = ref(true);
const error = ref(null);

// Check if coming from edit button
const isEditMode = ref(route.query.mode === 'edit');
const isSubmitting = ref(false);

const showFeedback = ref(false);
const feedbackMessage = ref('');
const feedbackType = ref('info');

// Restock modal
const showRestockModal = ref(false);
const restockQuantity = ref(0);
const isRestocking = ref(false);

const editForm = reactive({
  name: '',
  price: '',
  description: ''
});

onMounted(async () => {
  pending.value = true;
  error.value = null;

  try {
    const response = await productService.show(uuid.value);
    productData.value = response.data;
    // Initialize edit form with existing data
    editForm.name = response.data.name || '';
    editForm.price = response.data.price?.toString() || '';
    editForm.description = response.data.description || '';
  } catch (err) {
    error.value = err;
  } finally {
    pending.value = false;
  }
});

const cancelEdit = () => {
  // Reset form to original data
  if (productData.value) {
    editForm.name = productData.value.name || '';
    editForm.price = productData.value.price?.toString() || '';
    editForm.description = productData.value.description || '';
  }
  isEditMode.value = false;
};

const submitUpdate = async () => {
  isSubmitting.value = true;
  try {
    await productService.update(uuid.value, {
      name: editForm.name,
      price: parseFloat(editForm.price),
      description: editForm.description
    });
    // Refresh data
    const response = await productService.show(uuid.value);
    productData.value = response.data;
    isEditMode.value = false;
    feedbackMessage.value = 'Product updated successfully!';
    feedbackType.value = 'success';
    showFeedback.value = true;
  } catch (err) {
    feedbackMessage.value = err.message || 'Failed to update product';
    feedbackType.value = 'error';
    showFeedback.value = true;
  } finally {
    isSubmitting.value = false;
  }
};

const openRestockModal = () => {
  restockQuantity.value = 0;
  showRestockModal.value = true;
};

const submitRestock = async () => {
  if (restockQuantity.value <= 0) {
    feedbackMessage.value = 'Please enter a valid quantity';
    feedbackType.value = 'error';
    showFeedback.value = true;
    return;
  }

  isRestocking.value = true;
  try {
    await productService.restock(uuid.value, restockQuantity.value);
    // Refresh data
    const response = await productService.show(uuid.value);
    productData.value = response.data;
    showRestockModal.value = false;
    feedbackMessage.value = `Successfully added ${restockQuantity.value} items to stock!`;
    feedbackType.value = 'success';
    showFeedback.value = true;
  } catch (err) {
    feedbackMessage.value = err.message || 'Failed to restock product';
    feedbackType.value = 'error';
    showFeedback.value = true;
  } finally {
    isRestocking.value = false;
  }
};

const handleDelete = async () => {
  if (confirm(`Are you sure you want to delete "${productData.value?.name}"?`)) {
    try {
      await productService.delete(uuid.value);
      feedbackMessage.value = 'Product deleted successfully!';
      feedbackType.value = 'success';
      showFeedback.value = true;
      setTimeout(() => router.push('/admin/product'), 1500);
    } catch (err) {
      feedbackMessage.value = err.message || 'Failed to delete product';
      feedbackType.value = 'error';
      showFeedback.value = true;
    }
  }
};

const goBack = () => {
  router.push('/admin/product');
};

const handleFeedbackClose = () => {
  showFeedback.value = false;
};
</script>

<template>
    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center py-16">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="space-y-6">
      <div class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>
      <button @click="goBack" class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeftIcon class="h-4 w-4" />
        Back to Products
      </button>
    </div>

    <!-- Product View/Edit -->
    <div v-else-if="productData" class="space-y-6">
      <button @click="goBack" class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeftIcon class="h-4 w-4" />
        Back to Products
      </button>

      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">
            {{ isEditMode ? 'Edit Product' : 'Product Details' }}
          </h1>
        </div>
        <div class="flex gap-2">
          <button 
            v-if="!isEditMode"
            @click="isEditMode = true" 
            class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <PencilSquareIcon class="h-4 w-4" />
            Edit
          </button>
          <button 
            @click="handleDelete" 
            class="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <TrashIcon class="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      <!-- View Mode -->
      <div v-if="!isEditMode" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div class="space-y-4">
          <div>
            <p class="text-xs font-medium uppercase tracking-wider text-gray-500">ID</p>
            <p class="mt-1 text-sm text-gray-900">{{ productData.id }}</p>
          </div>
          <div>
            <p class="text-xs font-medium uppercase tracking-wider text-gray-500">Name</p>
            <p class="mt-1 text-base font-medium text-gray-900">{{ productData.name }}</p>
          </div>
          <div>
            <p class="text-xs font-medium uppercase tracking-wider text-gray-500">Price</p>
            <p class="mt-1 text-lg font-semibold text-gray-900">₱{{ productData.price }}</p>
          </div>
          <div>
            <p class="text-xs font-medium uppercase tracking-wider text-gray-500">Stock Quantity</p>
            <span 
              :class="[
                'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
                productData.quantity === 0 ? 'bg-red-100 text-red-800' : 
                productData.quantity < 10 ? 'bg-yellow-100 text-yellow-800' : 
                'bg-green-100 text-green-800'
              ]"
            >
              {{ productData.quantity || 0 }} items
            </span>
          </div>
          <div v-if="productData.description">
            <p class="text-xs font-medium uppercase tracking-wider text-gray-500">Description</p>
            <p class="mt-1 text-sm text-gray-700">{{ productData.description }}</p>
          </div>
          <div v-if="productData.created_at">
            <p class="text-xs font-medium uppercase tracking-wider text-gray-500">Created At</p>
            <p class="mt-1 text-sm text-gray-900">{{ new Date(productData.created_at).toLocaleString() }}</p>
          </div>
          <div v-if="productData.updated_at">
            <p class="text-xs font-medium uppercase tracking-wider text-gray-500">Updated At</p>
            <p class="mt-1 text-sm text-gray-900">{{ new Date(productData.updated_at).toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <!-- Edit Mode -->
      <div v-else class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form @submit.prevent="submitUpdate">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Product Name</label>
            <input 
              v-model="editForm.name" 
              type="text" 
              required 
              pattern="[a-zA-Z\s\-']+"
              title="Product name must contain only letters, spaces, hyphens, and apostrophes"
              class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:ring-gray-500" 
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Price</label>
            <input 
              v-model="editForm.price" 
              type="number" 
              step="0.01"
              min="0"
              required 
              class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:ring-gray-500" 
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Stock Quantity</label>
            <div class="mt-1 flex items-center gap-3">
              <span 
                :class="[
                  'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
                  productData.quantity === 0 ? 'bg-red-100 text-red-800' : 
                  productData.quantity < 10 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'
                ]"
              >
                {{ productData.quantity || 0 }} items
              </span>
              <button
                type="button"
                @click="openRestockModal"
                class="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-1 text-xs font-medium text-white hover:bg-indigo-700"
              >
                <PlusIcon class="h-3 w-3" />
                Restock
              </button>
            </div>
            <p class="mt-1 text-xs text-gray-500">Use the Restock button to add more items to the current stock</p>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              v-model="editForm.description" 
              rows="3"
              class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:ring-gray-500" 
            ></textarea>
          </div>
          <div class="flex justify-end gap-3">
            <button
              type="button"
              @click="cancelEdit"
              class="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Restock Modal -->
      <div v-if="showRestockModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">Restock Product</h2>
            <button @click="showRestockModal = false" class="text-gray-400 hover:text-gray-600">
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>
          <div class="mb-4">
            <p class="text-sm text-gray-600 mb-4">
              Current stock: <span class="font-semibold">{{ productData.quantity || 0 }}</span> items
            </p>
            <label class="block text-sm font-medium text-gray-700">Quantity to Add</label>
            <input 
              v-model="restockQuantity" 
              type="number" 
              min="1"
              required 
              class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:ring-gray-500" 
              placeholder="Enter quantity to add"
            />
            <p class="mt-2 text-sm text-gray-500">
              New stock will be: <span class="font-semibold">{{ (productData.quantity || 0) + (parseInt(restockQuantity) || 0) }}</span> items
            </p>
          </div>
          <div class="flex justify-end gap-3">
            <button
              type="button"
              @click="showRestockModal = false"
              class="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              @click="submitRestock"
              :disabled="isRestocking"
              class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {{ isRestocking ? 'Adding...' : 'Add to Stock' }}
            </button>
          </div>
        </div>
      </div>

      <FeedbackModal 
        :open="showFeedback" 
        :message="feedbackMessage" 
        :type="feedbackType"
        @close="handleFeedbackClose" 
      />
    </div>
</template>