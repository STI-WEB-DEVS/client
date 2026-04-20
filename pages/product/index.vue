<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { productService } from '~/api/product/ProductService'; 
import UniversalForm from '~/components/UniversalForm.vue';
import FeedbackModal from '~/components/FeedbackModal.vue';
import {
  PlusIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';

const router = useRouter();

const products = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

const showFeedback = ref(false);
const feedbackMessage = ref('');
const feedbackType = ref<'success' | 'error' | 'info'>('info');

// Create modal state
const showCreateModal = ref(false);
const createForm = ref({
  name: '',
  price: ''
});
const isSubmitting = ref(false);

const refreshProducts = async () => {
  try {
    products.value = await productService.list();
  } catch (err: any) {
    console.error("Failed to refresh products", err);
  }
};

onMounted(async () => {
  pending.value = true;
  error.value = null;

  try {
    products.value = await productService.list();
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
});

const handleCreate = () => {
  createForm.value = {
    name: '',
    price: ''
  };
  showCreateModal.value = true;
};

const submitCreate = async () => {
  isSubmitting.value = true;
  try {
    await productService.create({
      name: createForm.value.name,
      price: parseFloat(createForm.value.price)
    });
    showCreateModal.value = false;
    feedbackMessage.value = 'Product created successfully!';
    feedbackType.value = 'success';
    showFeedback.value = true;
    refreshProducts();
  } catch (err: any) {
    feedbackMessage.value = err.message || 'Failed to create product';
    feedbackType.value = 'error';
    showFeedback.value = true;
  } finally {
    isSubmitting.value = false;
  }
};

const handleView = (product: any) => {
  router.push(`/product/${product.uuid}`);
};

const handleEdit = (product: any) => {
  router.push(`/product/${product.uuid}?mode=edit`);
};

const handleDelete = async (product: any) => {
  if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
    try {
      await productService.delete(product.uuid);
      feedbackMessage.value = "Product deleted successfully!";
      feedbackType.value = 'success';
      showFeedback.value = true;
      refreshProducts();
    } catch (err: any) {
      feedbackMessage.value = err.message || "Failed to delete product.";
      feedbackType.value = 'error';
      showFeedback.value = true;
    }
  }
};

const handleFeedbackClose = () => {
  showFeedback.value = false;
};
</script>

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
              <tr
                v-for="(product, index) in [...(products?.data || [])].reverse()"
                :key="product.id"
                class="transition hover:bg-gray-50"
              >
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {{ index + 1 }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  {{ product.name }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
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

      <!-- Create Product Modal -->
      <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">Create Product</h2>
            <button @click="showCreateModal = false" class="text-gray-400 hover:text-gray-600">
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>
          <form @submit.prevent="submitCreate">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Product Name</label>
              <input 
                v-model="createForm.name" 
                type="text" 
                required 
                class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:ring-gray-500" 
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Price</label>
              <input 
                v-model="createForm.price" 
                type="number" 
                step="0.01"
                min="0"
                required 
                class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:ring-gray-500" 
              />
            </div>
            <div class="flex justify-end gap-3">
              <button
                type="button"
                @click="showCreateModal = false"
                class="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {{ isSubmitting ? 'Creating...' : 'Create' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <FeedbackModal 
        :open="showFeedback" 
        :message="feedbackMessage" 
        :type="feedbackType"
        @close="handleFeedbackClose" 
      />
    </div>
  </NuxtLayout>
</template>