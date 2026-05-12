<template>
  <NuxtLayout>
    <div class="p-8 bg-gray-50 min-h-screen">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-2xl font-bold text-[#2d4123] mb-8">Product Inventory</h1>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- LEFT: Management Form -->
          <div class="lg:col-span-4">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 class="text-lg font-semibold text-gray-800 mb-6">
                {{ isEditing ? 'Edit Product' : 'Add New Product' }}
              </h2>

              <form class="space-y-5" @submit.prevent="handleSubmit">
                <!-- Product Name -->
                <div>
                  <label for="productName" class="block text-sm font-medium text-gray-700">Product Name</label>
                  <div class="mt-1">
                    <input 
                      v-model="productName"
                      type="text" 
                      id="productName" 
                      placeholder="e.g. Ultra Light Tent"
                      required 
                      class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#8fa386] sm:text-sm" 
                    />
                  </div>
                </div>

                <!-- Price -->
                <div>
                  <label for="price" class="block text-sm font-medium text-gray-700">Price (₱)</label>
                  <div class="mt-1">
                    <input 
                      v-model.number="productPrice"
                      type="number" 
                      id="price" 
                      placeholder="0.00"
                      step="0.01"
                      required 
                      class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#8fa386] sm:text-sm" 
                    />
                  </div>
                </div>

                <div class="pt-2 flex flex-col gap-3">
                  <button 
                    type="submit" 
                    class="flex w-full justify-center rounded-md bg-[#8fa386] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#7a8d72] transition-colors"
                  >
                    {{ isEditing ? 'Update Item' : 'Add to Inventory' }}
                  </button>

                  <button 
                    v-if="isEditing"
                    @click="resetForm"
                    type="button" 
                    class="flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel Edit
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- RIGHT: Product Table -->
          <div class="lg:col-span-8">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                    <th class="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 bg-white">
                  <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-semibold text-[#2d4123]">{{ product.name }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      ₱{{ product.price.toLocaleString() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button @click="editProduct(product)" class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                      <button @click="deleteProduct(product.id)" class="text-red-600 hover:text-red-900">Remove</button>
                    </td>
                  </tr>
                  <!-- Empty State -->
                  <tr v-if="products.length === 0">
                    <td colspan="3" class="px-6 py-10 text-center text-gray-400 italic">No products in stock.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Product {
  id: number;
  name: string;
  price: number;
}

// Form State
const productName = ref('');
const productPrice = ref<number | ''>('');
const isEditing = ref(false);
const editingId = ref<number | null>(null);

// Mock Data
const products = ref<Product[]>([
  { id: 1, name: 'Hiking Backpack 45L', price: 2500 },
  { id: 2, name: 'Waterproof Trekking Boots', price: 4200 },
  { id: 3, name: 'Portable Camping Stove', price: 1200 },
]);

// Methods
const handleSubmit = () => {
  if (isEditing.value && editingId.value !== null) {
    const index = products.value.findIndex(p => p.id === editingId.value);
    if (index !== -1) {
      products.value[index] = {
        id: editingId.value,
        name: productName.value,
        price: Number(productPrice.value)
      };
    }
  } else {
    products.value.push({
      id: Date.now(),
      name: productName.value,
      price: Number(productPrice.value)
    });
  }
  resetForm();
};

const editProduct = (product: Product) => {
  isEditing.value = true;
  editingId.value = product.id;
  productName.value = product.name;
  productPrice.value = product.price;
};

const deleteProduct = (id: number) => {
  if(confirm('Delete this product?')) {
    products.value = products.value.filter(p => p.id !== id);
  }
};

const resetForm = () => {
  productName.value = '';
  productPrice.value = '';
  isEditing.value = false;
  editingId.value = null;
};
</script>