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
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">ID</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
                <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-100 bg-white">
              <tr v-for="product in products?.data" :key="product.id" class="transition hover:bg-gray-50">
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ product.id }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{{ product.name }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{{ product.price }}</td>
                <td class="whitespace-nowrap px-6 py-4">
                  <div class="flex items-center justify-end gap-2">
                    <button @click="handleView(product)" class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <EyeIcon class="h-4 w-4" />
                      <span>View</span>
                    </button>
                    <button @click="handleEdit(product)" class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <PencilSquareIcon class="h-4 w-4" />
                    </button>
                    <button @click="handleDelete(product)" class="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50">
                      <TrashIcon class="h-4 w-4" />
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

             <!--  FOOTER -->
<div class="border-t px-6 py-4 text-sm text-gray-500">
  Showing 
  <span class="font-bold text-black">{{ products?.meta?.from ?? 0 }}</span>
  to 
  <span class="font-bold text-black">{{ products?.meta?.to ?? 0 }}</span>
  of 
  <span class="font-bold text-black">{{ products?.meta?.total ?? 0 }}</span> 
  products
</div>
      </div>
          

      <ProductForm
        :open="isModalOpen"
        :loading="isSaving"
        :product="selectedProduct"
        @close="isModalOpen = false"
        @submit="handleFormSubmit"
      />

      <DeleteModal
        :open="isDeleteModalOpen"
        :loading="isSaving"
        :title="productToDelete?.name || 'this product'"
        @close="isDeleteModalOpen = false"
        @confirm="confirmDelete"
      />  

      <FeedbackModal :open="isFeedbackModalOpen" :message="feedbackMessage" @close="closeFeedbackModal" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { PlusIcon, EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { productService } from '~/api/product/ProductService';
import DeleteModal from '~/components/DeleteModal.vue';

const router = useRouter();

const products = ref<any>(null);   
const pending = ref(true);
const error = ref<any>(null);
const isSaving = ref(false);

const isModalOpen = ref(false);
const selectedProduct = ref<any>(null);

const isDeleteModalOpen = ref(false);
const productToDelete = ref<any>(null);

const isFeedbackModalOpen = ref(false);
const feedbackMessage = ref('');

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

const handleCreate = () => {
  selectedProduct.value = null; 
  isModalOpen.value = true;
};

const handleEdit = (product: any) => {
  selectedProduct.value = product;
  isModalOpen.value = true;
};

const handleFormSubmit = async (formData: any) => {
  isSaving.value = true;
  try {
    if (selectedProduct.value) {
      await productService.update(selectedProduct.value.uuid, formData);
      openFeedbackModal('Product updated successfully!');
    } else {
      await productService.create(formData);
      openFeedbackModal('Product created successfully!');
    }
    isModalOpen.value = false;
    await fetchProducts();
  } catch (err: any) {
    alert('Error: ' + err.message);
  } finally {
    isSaving.value = false;
  }
};

const handleDelete = (product: any) => {
  productToDelete.value = product;
  isDeleteModalOpen.value = true;
};

const confirmDelete = async () => {
  if (!productToDelete.value) return;
  isSaving.value = true;
  try {
    await productService.delete(productToDelete.value.uuid);
    isDeleteModalOpen.value = false;
    productToDelete.value = null;
    await fetchProducts();
    openFeedbackModal('Product deleted successfully!');
  } catch (err: any) {
    alert('Error: ' + err.message);
  } finally {
    isSaving.value = false;
  }
};

const openFeedbackModal = (message: string) => {
  feedbackMessage.value = message;
  isFeedbackModalOpen.value = true;
};

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
  feedbackMessage.value = '';
};

const handleView = (product: any) => {
  router.push(`/product/${product.uuid}`);
};
</script>