<template>
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

      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <!-- Table -->
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
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Stock
                </th>
                <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-100 bg-white">
              <tr
                v-for="(product, index) in products?.data"
                :key="product.uuid"
                class="transition hover:bg-gray-50"
              >
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {{ index + 1 }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  {{ product.name }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  ${{ parseFloat(product.price || 0).toFixed(2) }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm">
                  <span 
                    :class="{
                      'text-emerald-600 font-medium': product.stock > 5,
                      'text-amber-600 font-bold': product.stock > 0 && product.stock <= 5,
                      'text-red-600 font-bold': product.stock <= 0
                    }"
                  >
                    {{ product.stock }} units
                  </span>
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      @click="handleRestock(product)"
                      class="inline-flex items-center gap-2 rounded-md border border-emerald-200 px-3 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                      title="Restock product"
                    >
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Restock</span>
                    </button>

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

      <!-- Modal -->
      <div 
        v-if="isModalOpen" 
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50" 
        @click="isModalOpen = false"
      >
        <div 
          @click.stop 
          class="bg-white p-6 rounded-lg max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto relative"
        >
          <button 
            @click="isModalOpen = false" 
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon class="h-6 w-6" />
          </button>
          
          <h2 class="text-lg font-medium mb-4">
            {{ mode === 'create' ? 'Create Product' : 'Update Product' }}
          </h2>
          
          <ProductForm
            :mode="mode"
            :product="selectedProduct"
            @submitted="handleSubmitted"
            @cancel="isModalOpen = false"
          />
        </div>
      </div>

      <!-- Restock Modal -->
      <div 
        v-if="isRestockModalOpen" 
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50" 
        @click="isRestockModalOpen = false"
      >
        <div 
          @click.stop 
          class="bg-white p-6 rounded-lg max-w-md w-full mx-4 relative"
        >
          <button 
            @click="isRestockModalOpen = false" 
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon class="h-6 w-6" />
          </button>
          
          <h2 class="text-lg font-medium mb-4">Restock Product</h2>
          
          <div class="space-y-4">
            <div>
              <p class="text-sm text-gray-600">Product: <span class="font-semibold text-gray-900">{{ restockProduct?.name }}</span></p>
              <p class="text-sm text-gray-600">Current Stock: <span class="font-semibold text-gray-900">{{ restockProduct?.stock }} units</span></p>
            </div>
            
            <div>
              <label for="restock-quantity" class="block text-sm font-medium text-gray-700 mb-1">
                Quantity to Add
              </label>
              <input
                id="restock-quantity"
                v-model="restockQuantity"
                type="number"
                min="1"
                step="1"
                required
                class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
                placeholder="Enter quantity to add"
              />
            </div>
            
            <div class="bg-blue-50 border border-blue-200 rounded-md p-3">
              <p class="text-sm text-blue-800">
                New stock will be: <span class="font-bold">{{ (restockProduct?.stock || 0) + (parseInt(restockQuantity) || 0) }} units</span>
              </p>
            </div>
            
            <div class="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                @click="isRestockModalOpen = false"
                class="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                @click="handleRestockSubmit"
                :disabled="!restockQuantity || parseInt(restockQuantity) < 1 || isRestocking"
                class="rounded-md bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {{ isRestocking ? 'Restocking...' : 'Confirm Restock' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Feedback -->
      <FeedbackModal
        :open="isFeedbackModalOpen"
        :message="feedbackMessage"
        @close="closeFeedbackModal"
      />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  role: 'admin'
})

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  PlusIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';

import { productService } from '~/api/product/ProductService';
import ProductForm from '~/components/ProductForm.vue';

const router = useRouter();

const products = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

const isFeedbackModalOpen = ref(false);
const feedbackMessage = ref('');

const selectedProduct = ref<any>(null);
const mode = ref<'create' | 'update'>('create');
const isModalOpen = ref(false);

const isRestockModalOpen = ref(false);
const restockProduct = ref<any>(null);
const restockQuantity = ref('');
const isRestocking = ref(false);

// Fetch products
const fetchProducts = async () => {
  pending.value = true;
  error.value = null;

  try {
    products.value = await productService.list();
    if (products.value?.data) {
      products.value.data.reverse(); // Keep your reverse order if needed
    }
  } catch (err: any) {
    error.value = err;
    console.error('Failed to fetch products:', err);
  } finally {
    pending.value = false;
  }
};

// Initial fetch
fetchProducts(); // Removed onMounted for simplicity (works in <script setup>)

const openFeedbackModal = (message: string) => {
  feedbackMessage.value = message;
  isFeedbackModalOpen.value = true;
};

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
  feedbackMessage.value = '';
};

// Handlers
const handleCreate = () => {
  mode.value = 'create';
  selectedProduct.value = null;
  isModalOpen.value = true;
};

const handleView = (product: any) => {
  router.push(`/admin/product/${product.uuid}`);
};

const handleEdit = (product: any) => {
  mode.value = 'update';
  selectedProduct.value = { ...product }; // Create a copy to avoid reactivity issues
  isModalOpen.value = true;
};

const handleRestock = (product: any) => {
  restockProduct.value = { ...product };
  restockQuantity.value = '';
  isRestockModalOpen.value = true;
};

const handleRestockSubmit = async () => {
  const quantity = parseInt(restockQuantity.value);
  if (!quantity || quantity < 1) {
    openFeedbackModal('Please enter a valid quantity.');
    return;
  }

  isRestocking.value = true;

  try {
    await productService.restock(restockProduct.value.uuid, quantity);
    openFeedbackModal(`Successfully added ${quantity} units to "${restockProduct.value.name}".`);
    isRestockModalOpen.value = false;
    await fetchProducts();
  } catch (err: any) {
    openFeedbackModal(`Failed to restock product: ${err.message || err}`);
  } finally {
    isRestocking.value = false;
  }
};

const handleDelete = async (product: any) => {
  if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;

  try {
    await productService.delete(product.uuid);
    openFeedbackModal(`Product "${product.name}" deleted successfully.`);
    await fetchProducts();           // ← Re-fetch after delete
  } catch (err: any) {
    openFeedbackModal(`Failed to delete product: ${err.message || err}`);
  }
};

const handleSubmitted = async (data: { success: boolean; message: string; item?: any; action: string }) => {
  openFeedbackModal(data.message);

  if (data.success) {
    isModalOpen.value = false;
    await fetchProducts();           // ← This is the key fix for Edit + Create
  }
};
</script>