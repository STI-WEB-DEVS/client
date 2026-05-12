<template>
  <div class="px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="sm:flex sm:items-center border-b border-gray-200 pb-5">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold text-gray-900">Products</h1>
        <p class="mt-2 text-sm text-gray-700">Manage your menu or inventory. Click a card to see details.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button 
          @click="openEditModal()"
          type="button" 
          class="block rounded-md bg-[#6D4C41] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#5d4037]"
        >
          Add Product
        </button>
      </div>
    </div>

    <!-- Product Grid -->
    <div v-if="isLoading" class="mt-8 text-center py-20 text-gray-500">
      <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#6D4C41] border-r-transparent"></div>
      <p class="mt-2 text-sm">Loading products...</p>
    </div>

    <div v-else class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div 
        v-for="product in products" 
        :key="product.uuid"
        @click="handleViewDetails(product.uuid)"
        class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-md transition-all cursor-pointer shadow-sm"
      >
        <!-- Placeholder Photo -->
        <div class="aspect-h-3 aspect-w-4 bg-gray-50 group-hover:opacity-75 sm:h-44 flex items-center justify-center border-b border-gray-100">
           <span class="text-gray-300 font-mono text-[10px] uppercase tracking-widest">No Image</span>
        </div>
        
        <div class="flex flex-1 flex-col p-4">
          <div class="flex justify-between items-start mb-1">
            <h3 class="text-sm font-bold text-gray-900">{{ product.name }}</h3>
            <p class="text-sm font-black text-[#6D4C41]">${{ formatDisplayPrice(product.price) }}</p>
          </div>

          <!-- Timestamp display -->
          <div class="flex items-center text-[11px] text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Updated: {{ formatDate(product.updated_at) }}</span>
          </div>
          
          <div class="flex justify-end gap-3 pt-4 mt-auto" @click.stop>
            <button @click="openEditModal(product)" class="text-xs font-semibold text-gray-500 hover:text-[#6D4C41]">Edit</button>
            <button @click="handleDelete(product.uuid)" class="text-xs font-semibold text-red-400 hover:text-red-600">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW DETAILS SLIDE-OVER -->
    <div v-if="isViewOpen" class="relative z-50">
      <div class="fixed inset-0 bg-gray-500/75 transition-opacity" @click="isViewOpen = false"></div>
      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div class="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out">
              <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div class="bg-[#6D4C41] px-4 py-6 sm:px-6 flex justify-between items-center">
                  <h2 class="text-base font-semibold leading-6 text-white">Product Profile</h2>
                  <button @click="isViewOpen = false" class="text-white hover:text-gray-200 text-xl leading-none">✕</button>
                </div>
                <div class="relative flex-1 px-4 py-6 sm:px-6">
                  <div v-if="selectedProduct" class="space-y-6">
                    <div>
                      <h3 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product Name</h3>
                      <p class="mt-1 text-xl font-semibold text-gray-900">{{ selectedProduct.name }}</p>
                    </div>
                    <div>
                      <h3 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price (USD)</h3>
                      <p class="mt-1 text-3xl font-bold text-[#6D4C41]">${{ formatDisplayPrice(selectedProduct.price) }}</p>
                    </div>
                    <div class="pt-4 border-t border-gray-100">
                      <h3 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last Modified</h3>
                      <p class="mt-1 text-sm text-gray-600">{{ formatDate(selectedProduct.updated_at, true) }}</p>
                    </div>
                  </div>
                  <div v-else class="flex justify-center py-10 text-gray-400">Loading details...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- EDIT/ADD MODAL -->
    <div v-if="isEditModalOpen" class="relative z-50">
      <div class="fixed inset-0 bg-gray-500/75" @click="isEditModalOpen = false"></div>
      <div class="fixed inset-0 z-10 flex items-center justify-center p-4">
        <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:w-full sm:max-w-md sm:p-6">
          <form @submit.prevent="submitForm">
            <h3 class="text-lg font-bold text-gray-900 mb-5 border-b pb-2">{{ editingUuid ? 'Update Product' : 'New Product' }}</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Product Name</label>
                <input v-model="form.name" required type="text" class="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#6D4C41]" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Price</label>
                <div class="relative mt-1 rounded-md shadow-sm">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <span class="sm:text-sm">$</span>
                  </div>
                  <input 
                    v-model="form.price" 
                    type="number" 
                    step="0.01" 
                    min="0"
                    required 
                    class="block w-full rounded-md border-0 py-2 pl-7 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#6D4C41]" 
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
            <div class="mt-6 flex justify-end gap-3">
              <button @click="isEditModalOpen = false" type="button" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">Cancel</button>
              <button type="submit" :disabled="isSaving" class="bg-[#6D4C41] hover:bg-[#5d4037] text-white px-6 py-2 rounded-md text-sm font-bold shadow-sm disabled:opacity-50 transition-colors">
                {{ isSaving ? 'Saving...' : 'Save Product' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { productService } from '~/api/ProductService'; 

// State Management
const products = ref<any[]>([]);
const isLoading = ref(false);
const isSaving = ref(false);
const isViewOpen = ref(false);
const selectedProduct = ref<any>(null);
const isEditModalOpen = ref(false);
const editingUuid = ref<string | null>(null);
const form = ref({ name: '', price: '' as any });

// Helpers: Display Formatting
const formatDisplayPrice = (val: any) => {
  const num = parseFloat(val);
  return isNaN(num) ? '0.00' : num.toFixed(2);
};

const formatDate = (dateString: string, includeTime = false) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...(includeTime && { hour: '2-digit', minute: '2-digit' })
  };
  return date.toLocaleDateString('en-US', options);
};

// Logic: Fetch Products
const loadData = async () => {
  isLoading.value = true;
  try {
    const res = await productService.list();
    products.value = res.data || res;
  } catch (e) {
    console.error("Fetch list error:", e);
  } finally {
    isLoading.value = false;
  }
};

// Logic: View Single Product
const handleViewDetails = async (uuid: string) => {
  isViewOpen.value = true;
  selectedProduct.value = null;
  try {
    const res = await productService.show(uuid);
    selectedProduct.value = res.data || res;
  } catch (e) {
    isViewOpen.value = false;
    alert("Could not load details");
  }
};

// Logic: Open Modal
const openEditModal = (product: any = null) => {
  if (product) {
    editingUuid.value = product.uuid;
    form.value = { name: product.name, price: parseFloat(product.price) };
  } else {
    editingUuid.value = null;
    form.value = { name: '', price: '' };
  }
  isEditModalOpen.value = true;
};

// Logic: Save (Strict Decimal Fix)
const submitForm = async () => {
  isSaving.value = true;
  try {
    const numPrice = parseFloat(form.value.price);
    
    // Satisfies strict backend validation by forcing exactly 2 decimal places in the string
    const payload = {
      name: form.value.name,
      price: numPrice.toFixed(2) 
    };

    if (editingUuid.value) {
      await productService.update(editingUuid.value, payload);
    } else {
      await productService.create(payload);
    }
    
    isEditModalOpen.value = false;
    loadData();
  } catch (e: any) {
    const errorMsg = e.response?.data?.message || "Verify decimal places and fields.";
    alert("Error: " + errorMsg);
  } finally {
    isSaving.value = false;
  }
};

// Logic: Delete
const handleDelete = async (uuid: string) => {
  if (!confirm("Are you sure you want to delete this product?")) return;
  try {
    await productService.delete(uuid);
    loadData();
  } catch (e) {
    alert("Delete failed");
  }
};

onMounted(loadData);
</script>