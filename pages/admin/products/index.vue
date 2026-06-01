<template>
  <NuxtLayout>
    <div class="py-6">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-900">Product Management</h1>
        <button 
          @click="showAddModal = true" 
          class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Product
        </button>
      </div>

      <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mt-8">
        <div class="overflow-hidden bg-white shadow sm:rounded-lg border border-gray-200">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Product Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Price</th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ product.name }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">₱{{ product.price }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium space-x-4">
                  <button @click="viewDetails(product)" class="text-indigo-600 hover:text-indigo-900">View</button>
                  <button @click="editProduct(product)" class="text-blue-600 hover:text-blue-900">Edit</button>
                  <button @click="confirmDelete(product.id)" class="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
              <tr v-if="products.length === 0">
                <td colspan="3" class="px-6 py-10 text-center text-gray-400 italic">No products found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="showAddModal" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <h3 class="text-base font-semibold leading-6 text-gray-900">Add New Product</h3>
                <div class="mt-4 space-y-4">
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">NAME</label>
                    <input v-model="newProduct.name" placeholder="e.g. Mouse" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">PRICE</label>
                    <input v-model.number="newProduct.price" type="number" placeholder="0.00" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button @click="addProduct" type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">Save Product</button>
                <button @click="showAddModal = false" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showViewModal" class="relative z-10" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="flex justify-between items-start">
                  <h3 class="text-lg font-semibold leading-6 text-gray-900">Product Details</h3>
                  <button @click="showViewModal = false" class="text-gray-400 hover:text-gray-500 text-2xl">&times;</button>
                </div>
                <div class="mt-6 border-t border-gray-100">
                  <dl class="divide-y divide-gray-100">
                    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-sm font-medium leading-6 text-gray-900">Product Name</dt>
                      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ selectedProduct?.name }}</dd>
                    </div>
                    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-sm font-medium leading-6 text-gray-900">Unit Price</dt>
                      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">₱{{ selectedProduct?.price }}</dd>
                    </div>
                    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-sm font-medium leading-6 text-gray-900">System ID</dt>
                      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">#{{ selectedProduct?.id }}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button @click="showViewModal = false" type="button" class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Product Modal -->
      <div v-if="showEditModal" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <h3 class="text-base font-semibold leading-6 text-gray-900">Edit Product</h3>
                <div class="mt-4 space-y-4">
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">PRODUCT NAME</label>
                    <input v-model="editForm.name" placeholder="e.g. Mouse" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">PRICE</label>
                    <input v-model.number="editForm.price" type="number" step="0.01" placeholder="0.00" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button @click="updateProduct" type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">Update Product</button>
                <button @click="showEditModal = false" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
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
import ProductService from '@/api/product/ProductService';

// Page States
const showAddModal = ref(false);
const showViewModal = ref(false);
const showEditModal = ref(false);
const selectedProduct = ref(null);
const products = ref([]);

// Form State
const newProduct = ref({ name: '', price: 0 });
const editForm = ref({ id: 0, name: '', price: 0 });

// 1. Fetch data from backend
const fetchProducts = async () => {
  try {
    const response = await ProductService.getAll();
    products.value = response.data || response; 
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

onMounted(() => {
  fetchProducts();
});

// 2. View Details
const viewDetails = (product: any) => {
  selectedProduct.value = product;
  showViewModal.value = true;
};

// 3. Edit Product
const editProduct = (product: any) => {
  editForm.value = {
    id: product.id,
    name: product.name,
    price: parseFloat(product.price)
  };
  showEditModal.value = true;
};

// 4. Update Product
const updateProduct = async () => {
  if (editForm.value.name && editForm.value.price >= 0) {
    try {
      await ProductService.update(editForm.value.id, {
        name: editForm.value.name,
        price: editForm.value.price
      });
      await fetchProducts();
      showEditModal.value = false;
      alert('Product updated successfully!');
    } catch (error: any) {
      console.error('Error updating product:', error);
      const errorMessage = error?.data?.message 
        || error?.message 
        || 'Failed to update product';
      alert("Error updating product: " + errorMessage);
    }
  } else {
    alert("Please provide a valid name and price.");
  }
};

// 5. Add Product
const addProduct = async () => {
  if (newProduct.value.name && newProduct.value.price >= 0) {
    try {
      await ProductService.create(newProduct.value);
      await fetchProducts();
      newProduct.value = { name: '', price: 0 };
      showAddModal.value = false;
      alert('Product added successfully!');
    } catch (error: any) {
      console.error('Error adding product:', error);
      const errorMessage = error?.data?.message 
        || error?.message 
        || 'Failed to add product';
      alert("Error adding product: " + errorMessage);
    }
  } else {
    alert("Please provide a valid name and price.");
  }
};

// 6. Delete Product
const confirmDelete = async (id: number) => {
  if (!id) {
    alert("Error: Product ID is undefined.");
    return;
  }

  if (confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
    try {
      await ProductService.deleteProduct(id);
      await fetchProducts();
      alert('Product deleted successfully!');
    } catch (error: any) {
      console.error("Delete failed for ID " + id, error);
      
      // Check if it's a foreign key constraint error
      if (error?.data?.error === 'FOREIGN_KEY_CONSTRAINT') {
        alert(error.data.message || 'Cannot delete this product because it has been ordered by customers.');
      } else {
        const errorMessage = error?.data?.message 
          || error?.message 
          || 'Failed to delete product';
        alert("Error deleting product: " + errorMessage);
      }
    }
  }
};
</script>