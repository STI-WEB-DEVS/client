<template>
    <div class="space-y-6">
      <PageHeader
        title="Products"
        description="Displaying product records from your API."
        button-text="Create Product"
        :show-button="true"
        :icon="PlusIcon"
        @action="handleCreate"
      />

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <div v-else>
        <BaseTable
          :headers="[
            { label: 'ID', key: 'id', class: 'font-medium text-gray-900' },
            { label: 'Name', key: 'name' },
            { label: 'Price', key: 'price' },
            { label: 'Created At', key: 'created_at' },
            { label: 'Actions', key: 'actions', align: 'right' }
          ]"
          :items="products?.data || []"
          :meta="products?.meta"
          resource-name="products"
          empty-message="No products found."
        >
          <template #cell(price)="{ value }">
            ${{ value }}
          </template>

          <template #cell(created_at)="{ value }">
            {{ value ? new Date(value).toLocaleString() : 'N/A' }}
          </template>

          <template #cell(actions)="{ item }">
            <div class="flex items-center justify-end gap-2">
              <button type="button" @click="handleView(item)"
                class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <EyeIcon class="h-4 w-4" />
                <span>View</span>
              </button>

              <button type="button" @click="handleEdit(item)"
                class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <PencilSquareIcon class="h-4 w-4" />
                <span>Edit</span>
              </button>

              <button type="button" @click="handleDelete(item)"
                class="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50">
                <TrashIcon class="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          </template>
        </BaseTable>
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
  router.push(`/admin/products/${product.uuid}`);
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