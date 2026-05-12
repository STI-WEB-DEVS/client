<template>
  <NuxtLayout>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Product List</h1>
        <button 
          @click="toggleForm"
          class="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          {{ showCreateForm ? 'Cancel' : 'Add Product' }}
        </button>
      </div>

      <!-- Compact Form -->
      <div v-if="showCreateForm" class="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-200">
        <h2 class="text-lg font-semibold mb-4 text-gray-800">{{ editingUuid ? 'Update' : 'New' }} Product</h2>
        <form @submit.prevent="handleSave" class="flex flex-col md:flex-row items-end gap-4">
          
          <div class="flex-1 w-full">
            <label class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input v-model="form.name" type="text" placeholder="e.g. Wireless Mouse" class="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>

          <div class="w-full md:w-48">
            <label class="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input v-model.number="form.price" type="number" step="0.01" placeholder="0.00" class="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>

          <button type="submit" :disabled="loading" class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 font-bold transition h-[42px]">
            {{ loading ? '...' : (editingUuid ? 'Update' : 'Save') }}
          </button>
        </form>
      </div>

      <!-- Product Table -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Product Name</th>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="product in products" :key="product.uuid" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4 font-medium text-gray-900">{{ product.name }}</td>
              <td class="px-6 py-4 text-gray-700 font-mono">${{ product.price }}</td>
              <td class="px-6 py-4 text-right space-x-4">
                <button @click="editProduct(product)" class="text-indigo-600 hover:text-indigo-900 font-semibold text-sm">Edit</button>
                <button @click="deleteProduct(product.uuid)" class="text-red-600 hover:text-red-900 font-semibold text-sm">Delete</button>
              </td>
            </tr>
            <tr v-if="products.length === 0 && !loading">
              <td colspan="3" class="px-6 py-10 text-center text-gray-400">No products found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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

// Description removed from state
const form = ref({
  name: '',
  price: 0
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

const editProduct = (product: any) => {
  editingUuid.value = product.uuid;
  form.value = { 
    name: product.name, 
    price: product.price
  };
  showCreateForm.value = true;
};

const deleteProduct = async (uuid: string) => {
  if (!confirm('Delete this product?')) return;
  try {
    await productService.delete(uuid);
    await fetchProducts();
  } catch (error) {
    alert('Delete failed');
  }
};

const toggleForm = () => {
  showCreateForm.value ? resetForm() : (showCreateForm.value = true);
};

const resetForm = () => {
  form.value = { name: '', price: 0 };
  editingUuid.value = null;
  showCreateForm.value = false;
};

onMounted(fetchProducts);
</script>