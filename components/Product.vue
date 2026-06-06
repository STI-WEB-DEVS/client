<template>
  <div class="min-h-screen bg-slate-50 p-6 md:p-10">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <div class="flex items-start justify-between mb-10">
        <div>
          <p class="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-1">Inventory</p>
          <h1 class="text-3xl font-bold text-slate-900 tracking-tight">Products</h1>
          <p class="mt-1 text-sm text-slate-500">{{ products.length }} items in inventory</p>
        </div>
        <button
          v-if="!showForm && !showView"
          @click="openCreateForm"
          type="button"
          class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-500 active:scale-95 transition-all duration-150"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Product
        </button>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-24 gap-3">
        <div class="w-8 h-8 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
        <p class="text-sm text-slate-400">Loading products...</p>
      </div>

      <!-- View -->
      <div v-else-if="showView" class="max-w-lg mx-auto">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="bg-slate-700 px-6 py-4">
            <h2 class="text-base font-semibold text-white">View Product</h2>
            <p class="text-xs text-slate-300 mt-0.5">Product details (read-only).</p>
          </div>

          <div class="p-6 space-y-5">
            <!-- Product Name -->
            <div>
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Product Name
              </label>
              <div class="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900">
                {{ viewProduct.name }}
              </div>
            </div>

            <!-- Price -->
            <div>
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Price (₱)
              </label>
              <div class="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900">
                ₱{{ parseFloat(viewProduct.price as string).toFixed(2) }}
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-end gap-3 pt-2">
              <button
                @click="closeView"
                type="button"
                class="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              >
                Close
              </button>
              <button
                @click="switchToEdit"
                type="button"
                class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 active:scale-95 transition-all shadow-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                </svg>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Form (Create / Edit) -->
      <div v-else-if="showForm" class="max-w-lg mx-auto">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="bg-blue-600 px-6 py-4">
            <h2 class="text-base font-semibold text-white">
              {{ isEditing ? 'Edit Product' : 'New Product' }}
            </h2>
            <p class="text-xs text-blue-100 mt-0.5">
              {{ isEditing ? 'Update the product details below.' : 'Fill in the details to add a new product.' }}
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
            <!-- Product Name -->
            <div>
              <label for="name" class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Product Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                id="name"
                required
                placeholder="e.g. Wireless Mouse"
                class="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
              />
            </div>

            <!-- Price -->
            <div>
              <label for="price" class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Price (₱) <span class="text-red-500">*</span>
              </label>
              <input
                v-model.number="form.price"
                type="number"
                id="price"
                step="0.01"
                min="0"
                required
                placeholder="0.00"
                class="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
              />
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-end gap-3 pt-2">
              <button
                @click="cancelForm"
                type="button"
                class="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isSaving"
                class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                <svg v-if="isSaving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                {{ isSaving ? 'Saving...' : (isEditing ? 'Update Product' : 'Save Product') }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Table -->
      <div v-else>
        <div v-if="products.length === 0" class="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <div class="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-2">
            <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <p class="text-sm font-semibold text-slate-700">No products yet</p>
          <p class="text-xs text-slate-400">Click "Add Product" to get started.</p>
        </div>

        <div v-else class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table class="min-w-full divide-y divide-slate-100">
            <thead>
              <tr class="bg-slate-50">
                <th class="py-3.5 pl-6 pr-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                <th class="px-3 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                <th class="py-3.5 pl-3 pr-6 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="product in products"
                :key="product.uuid"
                class="group hover:bg-slate-50 transition-colors"
              >
                <td class="whitespace-nowrap py-4 pl-6 pr-3">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span class="text-blue-700 text-xs font-bold uppercase">{{ product.name.charAt(0) }}</span>
                    </div>
                    <span class="text-sm font-medium text-slate-900">{{ product.name }}</span>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                  ₱{{ parseFloat(product.price as string).toFixed(2) }}
                </td>
                <td class="whitespace-nowrap py-4 pl-3 pr-6 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="openView(product)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.641 0-8.573-3.007-9.964-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      View
                    </button>
                    <button
                      @click="openEditForm(product)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      @click="handleDelete(product.uuid!)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="px-6 py-3 border-t border-slate-100 bg-slate-50">
            <p class="text-xs text-slate-400">{{ products.length }} product{{ products.length !== 1 ? 's' : '' }} total</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { productService } from '~/api/product/ProductService';

interface Product {
  uuid?: string;
  name: string;
  price: number | string;
}

const products = ref<Product[]>([]);
const isLoading = ref(true);
const isSaving = ref(false);
const showForm = ref(false);
const showView = ref(false);
const isEditing = ref(false);

const defaultForm: Product = { name: '', price: 0 };
const form = reactive<Product>({ ...defaultForm });
const viewProduct = ref<Product>({ name: '', price: 0 });

const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const response = await productService.list();
    products.value = response.data || response;
  } catch (error) {
    console.error('Failed to fetch products:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleSubmit = async () => {
  isSaving.value = true;
  try {
    const payload = {
      name: form.name,
      price: Number(form.price),
    };
    if (isEditing.value && form.uuid) {
      await productService.update(form.uuid, payload);
    } else {
      await productService.create(payload);
    }
    await fetchProducts();
    cancelForm();
  } catch (error) {
    console.error('Failed to save product:', error);
  } finally {
    isSaving.value = false;
  }
};

const handleDelete = async (uuid?: string) => {
  if (!uuid || !confirm('Delete this product?')) return;
  isLoading.value = true;
  try {
    await productService.delete(uuid);
    await fetchProducts();
  } catch (error) {
    console.error('Failed to delete product:', error);
  } finally {
    isLoading.value = false;
  }
};

const openCreateForm = () => {
  Object.assign(form, defaultForm);
  delete form.uuid;
  isEditing.value = false;
  showForm.value = true;
};

const openEditForm = (product: Product) => {
  Object.assign(form, product);
  isEditing.value = true;
  showForm.value = true;
  showView.value = false;
};

const openView = (product: Product) => {
  viewProduct.value = { ...product };
  showView.value = true;
  showForm.value = false;
};

const closeView = () => {
  showView.value = false;
  viewProduct.value = { name: '', price: 0 };
};

const switchToEdit = () => {
  openEditForm(viewProduct.value);
};

const cancelForm = () => {
  showForm.value = false;
  Object.assign(form, defaultForm);
  delete form.uuid;
  isEditing.value = false;
};

onMounted(fetchProducts);
</script>