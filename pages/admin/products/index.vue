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
                v-for="product in products?.data"
                :key="product.id"
                class="transition hover:bg-gray-50"
              >
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {{ product.id }}
                </td>
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

      <FeedbackModal
        :open="isFeedbackModalOpen"
        :message="feedbackMessage"
        @close="closeFeedbackModal"
      />
      <CreateModal
  :open="isCreateModalOpen"
  title="Product"
  :fields="[
    { key: 'name', label: 'Product Name', placeholder: 'Enter product name' },
    { key: 'price', label: 'Price', type: 'number', placeholder: 'Enter price' },
  ]"
  :on-save="handleSave"
  @close="isCreateModalOpen = false"
  @created="onCreated"
/>

<EditModal
  :open="isEditModalOpen"
  title="Product"
  :item="selectedItem"
  :fields="[
    { key: 'name', label: 'Product Name', placeholder: 'Enter product name' },
    { key: 'price', label: 'Price', type: 'number', placeholder: 'Enter price' },
  ]"
  :on-save="handleSave"
  @close="isEditModalOpen = false"
  @saved="onSaved"
/>

<DeleteModal
  :open="isDeleteModalOpen"
  title="Product"
  :item="selectedItem"
  label-key="name"
  :on-delete="handleDeleteConfirm"
  @close="isDeleteModalOpen = false"
  @deleted="onDeleted"
/>
    </div>
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

const products = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

const isFeedbackModalOpen = ref(false);
const feedbackMessage = ref('');
const isCreateModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const selectedItem = ref<any>(null);

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
  isCreateModalOpen.value = true;
};

const handleView = (product: any) => {
  router.push(`/products/${product.uuid}`);
};

const handleEdit = (product: any) => {
  selectedItem.value = product;
  isEditModalOpen.value = true;
};

const handleDelete = (product: any) => {
  selectedItem.value = product;
  isDeleteModalOpen.value = true;
};

const handleSave = async (form: Record<string, any>) => {
  if (isCreateModalOpen.value) {
    return await productService.create(form);
  } else {
    return await productService.update(selectedItem.value.uuid, form);
  }
};

const handleDeleteConfirm = async () => {
  await productService.delete(selectedItem.value.uuid);
};

const onCreated = (created: any) => {
  const newProduct = created.data ?? created;

  products.value.data = [newProduct, ...products.value.data];
  products.value.meta.total += 1;

  openFeedbackModal('Product created successfully!');
};

const onSaved = (updated: any) => {
  const updatedProduct = updated.data ?? updated;

  const index = products.value.data.findIndex(
    (p: any) => p.uuid === updatedProduct.uuid
  );

  if (index !== -1) {
    products.value.data[index] = updatedProduct;
  }

  openFeedbackModal('Product updated successfully!');
};

const onDeleted = () => {
  products.value.data = products.value.data.filter(
    (p: any) => p.uuid !== selectedItem.value.uuid
  );

  products.value.meta.total -= 1;

  openFeedbackModal('Product deleted successfully!');
};

const openFeedbackModal = (message: string) => {
  feedbackMessage.value = message;
  isFeedbackModalOpen.value = true;
};

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
  feedbackMessage.value = '';
};

const formatPrice = (price: any) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(price));
};
</script>