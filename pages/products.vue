<template>
  <NuxtLayout>
    <div class="p-8 bg-gray-50 min-h-screen">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-2xl font-bold text-[#2d4123] mb-8">Product Inventory</h1>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div class="lg:col-span-4">
            <div 
              v-if="statusMessage" 
              :class="[
                'mb-4 p-3 rounded-md text-sm font-medium border transition-all',
                isError ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'
              ]"
            >
              {{ statusMessage }}
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 class="text-lg font-semibold text-gray-800 mb-6">
                {{ isEditing ? 'Edit Product' : 'Add New Product' }}
              </h2>

              <form class="space-y-5" @submit.prevent="handleSubmit">
                <div>
                  <label for="productName" class="block text-sm font-medium text-gray-700">Product Name</label>
                  <input 
                    v-model="productName"
                    type="text" 
                    id="productName" 
                    required 
                    class="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#8fa386] sm:text-sm" 
                  />
                </div>

                <div>
                  <label for="price" class="block text-sm font-medium text-gray-700">Price (₱)</label>
                  <input 
                    v-model.number="productPrice"
                    type="number" 
                    id="price" 
                    step="0.01"
                    required 
                    class="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#8fa386] sm:text-sm" 
                  />
                </div>

                <div class="pt-2 flex flex-col gap-3">
                  <button 
                    type="submit" 
                    :disabled="isSubmitting"
                    class="w-full rounded-md bg-[#8fa386] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#7a8d72] transition-colors disabled:opacity-50"
                  >
                    {{ isSubmitting ? 'Saving...' : (isEditing ? 'Update Item' : 'Add to Inventory') }}
                  </button>

                  <button 
                    v-if="isEditing"
                    @click="resetForm"
                    type="button" 
                    class="w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel Edit
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="lg:col-span-8">
            <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div v-for="i in 4" :key="i" class="h-64 bg-gray-200 animate-pulse rounded-xl"></div>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
              <div 
                v-for="product in products" 
                :key="product.uuid" 
                class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div class="h-40 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  <span class="text-gray-300 text-4xl font-bold uppercase">{{ product.name.charAt(0) }}</span>
                  <div class="absolute inset-0 bg-[#2d4123] opacity-0 group-hover:opacity-5 transition-opacity"></div>
                </div>

                <div class="p-5">
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="text-md font-bold text-[#2d4123] truncate pr-2">{{ product.name }}</h3>
                    <span class="text-sm font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">
                      ₱{{ product.price.toLocaleString() }}
                    </span>
                  </div>
                  
                  <p class="text-xs text-gray-400 mb-6 uppercase tracking-wider">SKU: {{ product.uuid.split('-')[0] }}</p>

                  <div class="flex border-t border-gray-100 pt-4 gap-4">
                    <button 
                      @click="editProduct(product)" 
                      class="flex-1 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 py-2 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      @click="deleteProduct(product.uuid)" 
                      class="flex-1 text-sm font-semibold text-red-600 hover:bg-red-50 py-2 rounded-md transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="products.length === 0" class="col-span-full bg-white rounded-xl border border-dashed border-gray-300 p-20 text-center">
                <p class="text-gray-400 italic">Inventory is empty.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { productService } from '~/api/product/ProductService';

const products = ref<any[]>([]);
const productName = ref("");
const productPrice = ref<number | "">("");
const isEditing = ref(false);
const editingUuid = ref<string | null>(null);

const isLoading = ref(false);
const isSubmitting = ref(false);
const statusMessage = ref("");
const isError = ref(false);

const setNotification = (msg: string, error = false) => {
  statusMessage.value = msg;
  isError.value = error;
  setTimeout(() => {
    statusMessage.value = "";
    isError.value = false;
  }, 4000);
};

const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const response = await productService.list();
    products.value = response.data || response;
  } catch (err: any) {
    console.error("Fetch failed:", err);
  } finally {
    isLoading.value = false;
  }
};

const handleSubmit = async () => {
  const isDuplicate = products.value.some(p => 
    p.name.toLowerCase() === productName.value.toLowerCase() && p.uuid !== editingUuid.value
  );

  if (isDuplicate) {
    setNotification("Product already exists.", true);
    return;
  }

  isSubmitting.value = true;
  try {
    const payload = { name: productName.value, price: Number(productPrice.value) };
    if (isEditing.value && editingUuid.value) {
      await productService.update(editingUuid.value, payload);
      setNotification("Product updated!");
    } else {
      await productService.create(payload);
      setNotification("Product added!");
    }
    await fetchProducts();
    resetForm();
  } catch (err: any) {
    setNotification("Save failed.", true);
  } finally {
    isSubmitting.value = false;
  }
};

const deleteProduct = async (uuid: string) => {
  if (!confirm("Remove this item?")) return;
  try {
    await productService.delete(uuid);
    await fetchProducts();
    setNotification("Removed successfully.");
  } catch (err: any) {
    setNotification("Delete failed.", true);
  }
};

const editProduct = (product: any) => {
  isEditing.value = true;
  editingUuid.value = product.uuid; 
  productName.value = product.name;
  productPrice.value = product.price;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const resetForm = () => {
  productName.value = "";
  productPrice.value = "";
  isEditing.value = false;
  editingUuid.value = null;
};

onMounted(fetchProducts);
</script>