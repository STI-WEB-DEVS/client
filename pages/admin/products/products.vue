<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Inventory Management</h1>
      <button 
        @click="toggleForm"
        class="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm/6 font-semibold shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        {{ showCreateForm ? 'Cancel' : 'Register Item' }}
      </button>
    </div>

    <!-- Compact Form -->
    <div v-if="showCreateForm" class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
      <h2 class="text-lg font-semibold mb-4 text-gray-800">{{ editingUuid ? 'Modify' : 'Register' }} Resource</h2>
      <form @submit.prevent="handleSave" class="flex flex-col md:flex-row items-end gap-4">
        
        <div class="flex-1 w-full">
          <label class="block text-sm/6 font-medium text-gray-900 mb-2">Resource Descriptor</label>
          <input 
            v-model="form.name" 
            type="text" 
            placeholder="e.g. Dedicated Compute Core v4" 
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" 
            required 
          />
        </div>

        <div class="w-full md:w-48">
          <label class="block text-sm/6 font-medium text-gray-900 mb-2">Rate Cost ($)</label>
          <input 
            v-model.number="form.price" 
            type="number" 
            step="0.01" 
            placeholder="0.00" 
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" 
            required 
          />
        </div>

        <button 
          type="submit" 
          :disabled="loading" 
          class="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm/6 font-semibold shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-50 h-[38px]"
        >
          {{ loading ? '...' : (editingUuid ? 'Modify' : 'Commit') }}
        </button>
      </form>
    </div>

    <!-- Product Table -->
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-gray-200">
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Resource Descriptor</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Base Provision Cost</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="product in products" :key="product.uuid" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4 text-sm/6 font-medium text-gray-900">{{ product.name }}</td>
            <td class="px-6 py-4 text-sm/6 text-gray-500 font-mono">${{ product.price }}</td>
            <td class="px-6 py-4 text-right space-x-4">
              <button @click="editProduct(product)" class="text-sm/6 font-semibold text-green-600 hover:text-green-500">Edit</button>
              <button @click="deleteProduct(product.uuid)" class="text-sm/6 font-semibold text-red-600 hover:text-red-500">Delete</button>
            </td>
          </tr>
          <tr v-if="products.length === 0 && !loading">
            <td colspan="3" class="px-6 py-10 text-center text-sm/6 text-gray-400">No tracked resources mapped.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { productService } from '~/api/product/ProductService';

const products = ref<any[]>([]);
const loading = ref(false);
const showCreateForm = ref(false);
const editingUuid = ref<string | null>(null);

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