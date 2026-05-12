<template>
  <NuxtLayout>
    <div class="flex gap-x-8 items-start min-h-[calc(100vh-8rem)] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      
      <div class="flex-1 space-y-6 transition-all duration-300">
        
        <div class="sm:flex sm:items-center sm:justify-between pb-2">
          <div>
            <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Product Catalog</h1>
            <p class="mt-1 text-sm text-gray-400">
              Browse and manage your product offerings, update details, or review inventory status.
            </p>
          </div>
          <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center gap-x-3">
            <button
              v-if="!showCreateForm && !viewingProduct"
              type="button"
              @click="toggleForm"
              class="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-all duration-150 cursor-pointer"
            >
              <svg class="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Add Product
            </button>
          </div>
        </div>

        <div class="relative bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          
          <div v-if="loading" class="absolute top-0 inset-x-0 h-0.5 bg-gray-100 overflow-hidden z-20">
            <div class="h-full bg-gray-900 animate-pulse w-full"></div>
          </div>

          <table class="min-w-full divide-y divide-gray-100">
            <thead>
              <tr class="bg-gray-50/60">
                <th scope="col" class="py-4 pl-6 pr-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                  Product Name
                </th>
                <th scope="col" class="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                  Price
                </th>
                
                <th scope="col" class="relative py-4 pl-3 pr-6 text-right text-xs font-bold uppercase tracking-wider text-gray-400">
                  Management
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 bg-white">
              <tr 
                v-for="product in products" 
                :key="product.uuid" 
                :class="[
                  editingUuid === product.uuid || viewingProduct?.uuid === product.uuid ? 'bg-gray-50' : 'hover:bg-gray-50/50',
                  'transition-colors duration-100'
                ]"
              >
                <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm">
                  <div class="flex items-center gap-x-3">
                    <div class="h-9 w-9 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center font-bold text-sm uppercase border border-gray-200/60 shadow-sm">
                      {{ product.name ? product.name.charAt(0) : 'P' }}
                    </div>
                    <span class="text-gray-900 font-semibold">{{ product.name }}</span>
                  </div>
                </td>
                
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">
                  {{ Number(product.price).toFixed(2) }}
                </td>

            
                
                <td class="whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-semibold space-x-4">
                  <button 
                    @click="viewProductDetails(product)" 
                    class="text-gray-900 hover:text-black underline transition-colors duration-150 cursor-pointer"
                  >
                    View
                  </button>
                  <button 
                    @click="editProduct(product)" 
                    class="text-gray-600 hover:text-black transition-colors duration-150 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button 
                    @click="deleteProduct(product.uuid)" 
                    class="text-gray-400 hover:text-black transition-colors duration-150 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              
              <tr v-if="!loading && products.length === 0">
                <td colspan="4" class="py-16 text-center text-sm text-gray-400 font-medium">
                  No product items found. Open the panel to register inventory.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <transition
        enter-active-class="transition ease-out duration-300 transform"
        enter-from="opacity-0 translate-x-8"
        enter-to="opacity-100 translate-x-0"
        leave-active-class="transition ease-in duration-200 transform"
        leave-from="opacity-100 translate-x-0"
        leave-to="opacity-0 translate-x-8"
      >
        <div v-if="showCreateForm || viewingProduct" class="w-80 shrink-0 bg-white border border-gray-200/80 rounded-xl p-5 shadow-sm space-y-5 sticky top-24">
          
          <div v-if="viewingProduct" class="space-y-5">
            <div class="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 class="text-base font-bold text-gray-900">Product Profile</h3>
                <p class="text-xs text-gray-400 mt-0.5">Stored database catalog insights.</p>
              </div>
              <button @click="resetForm" class="rounded-lg p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="flex flex-col items-center text-center p-4 bg-gray-50/50 rounded-xl border border-gray-100">
              <div class="h-16 w-16 rounded-xl bg-black text-white flex items-center justify-center font-bold text-2xl uppercase shadow-md mb-3">
                {{ viewingProduct.name ? viewingProduct.name.charAt(0) : 'P' }}
              </div>
              <h4 class="text-base font-bold text-gray-900 break-words w-full">{{ viewingProduct.name }}</h4>
            </div>

            <div class="space-y-3 text-sm border-t border-b border-gray-100 py-3">  
              <div class="flex justify-between">
                <span class="text-gray-400 font-medium">Price:</span>
                <span class="text-gray-900 font-bold">${{ Number(viewingProduct.price).toFixed(2) }}</span>
              </div>
              
            </div>

            <div class="flex gap-x-2 pt-2">
              <button
                type="button"
                @click="editProduct(viewingProduct)"
                class="flex-1 inline-flex justify-center items-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Modify Records
              </button>
              <button
                type="button"
                @click="resetForm"
                class="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>

          <div v-else class="space-y-5">
            <div class="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 class="text-base font-bold text-gray-900">
                  {{ editingUuid ? 'Modify Product' : 'New Product' }}
                </h3>
                <p class="text-xs text-gray-400 mt-0.5">
                  {{ editingUuid ? 'Update database catalog assets.' : 'Append a single data item.' }}
                </p>
              </div>
              <button @click="resetForm" class="rounded-lg p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form @submit.prevent="handleSave" class="space-y-4">
              <div>
                <label for="side-name" class="block text-xs font-bold uppercase tracking-wider text-gray-400">Product Name</label>
                <div class="mt-1.5">
                  <input
                    v-model="form.name"
                    type="text"
                    id="side-name"
                    required
                    placeholder="e.g. Premium Wireless Mouse"
                    class="block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label for="side-price" class="block text-xs font-bold uppercase tracking-wider text-gray-400">Price</label>
                <div class="mt-1.5">
                  <input
                    v-model.number="form.price"
                    type="number"
                    step="0.01"
                    min="0"
                    id="side-price"
                    required
                    placeholder="0.00"
                    class="block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all shadow-inner"
                  />
                </div>
              </div>

              <div class="flex items-center gap-x-2 pt-2">
                <button
                  type="submit"
                  :disabled="loading"
                  class="flex-1 inline-flex justify-center items-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {{ editingUuid ? 'Update Product' : 'Save Product' }}
                </button>
                <button
                  type="button"
                  @click="resetForm"
                  class="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

        </div>
      </transition>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { productService } from '~/api/product/ProductService';

const products = ref<any[]>([]);
const loading = ref(false);
const showCreateForm = ref(false);
const editingUuid = ref<string | null>(null);
const viewingProduct = ref<any | null>(null);

const form = ref({
  name: '',
  price: 0,
  stock: 0
});

const fetchProducts = async () => {
  loading.value = true;
  try {
    const response = await productService.list();
    products.value = response?.data || response || [];
  } catch (error) {
    console.error('Failed to load products:', error);
  } finally {
    loading.value = false;
  }
};

const handleSave = async () => {
  loading.value = true;
  try {
    if (editingUuid.value) {
      await productService.update(editingUuid.value, form.value);
    } else {
      await productService.create(form.value);
    }
    resetForm();
    await fetchProducts();
  } catch (error: any) {
    alert(error?.message || 'Action failed');
  } finally {
    loading.value = false;
  }
};

const viewProductDetails = (product: any) => {
  showCreateForm.value = false;
  editingUuid.value = null;
  viewingProduct.value = product;
};

const editProduct = (product: any) => {
  viewingProduct.value = null;
  editingUuid.value = product.uuid;
  form.value = { 
    name: product.name, 
    price: product.price,
    stock: product.stock
  };
  showCreateForm.value = true;
};

const deleteProduct = async (uuid: string) => {
  if (!confirm('Delete this product?')) return;
  loading.value = true;
  try {
    await productService.delete(uuid);
    if (viewingProduct.value?.uuid === uuid) {
      resetForm();
    }
    await fetchProducts();
  } catch (error) {
    alert('Delete failed');
  } finally {
    loading.value = false;
  }
};

const toggleForm = () => {
  viewingProduct.value = null;
  showCreateForm.value ? resetForm() : (showCreateForm.value = true);
};

const resetForm = () => {
  form.value = { name: '', price: 0, stock: 0 };
  editingUuid.value = null;
  showCreateForm.value = false;
  viewingProduct.value = null;
};

onMounted(fetchProducts);
</script>