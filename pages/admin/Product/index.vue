<template>

  <div class="py-6">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-slate-900">Products</h1>
        <p class="text-slate-500">Manage and track all your products</p>
      </div>

      <!-- Search + Add -->
      <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="w-full md:max-w-md rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <button
          @click="openAddModal"
          class="rounded-lg bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 transition"
        >
          + Add Product
        </button>

      </div>

      <!-- Loading -->
      <div v-if="loading" class="rounded-xl bg-white border border-slate-100 shadow-sm p-12 text-center">
        <div class="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-sky-600"></div>
        <p class="mt-4 text-slate-500">Loading products...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="rounded-xl bg-red-50 border border-red-200 p-6">
        <p class="font-semibold text-red-700">Error loading products</p>
        <p class="text-sm text-red-600">{{ error }}</p>
      </div>

      <!-- Table -->
      <div v-else class="rounded-xl bg-white border border-slate-100 shadow-sm overflow-hidden">

        <!-- Table Header -->
        <div class="px-6 py-4 border-b border-slate-100">
          <h2 class="text-lg font-semibold text-slate-900">Product List</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-100">

            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Product
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Price
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Created
                </th>
                <th class="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100 bg-white">

              <tr
                v-for="product in filteredProducts"
                :key="product.uuid"
                class="hover:bg-slate-50 transition"
              >

                <!-- Product -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">

                    <div class="h-10 w-10 rounded-full bg-sky-600 flex items-center justify-center text-white font-semibold">
                      {{ product.name.charAt(0) }}
                    </div>

                    <div class="text-sm font-medium text-slate-900">
                      {{ product.name }}
                    </div>

                  </div>
                </td>

                <!-- Price -->
                <td class="px-6 py-4 text-sm text-slate-500">
                  ₱ {{ product.price }}
                </td>

                <!-- Created -->
                <td class="px-6 py-4 text-sm text-slate-500">
                  {{ formatDate(product.created_at) }}
                </td>

                <!-- Actions -->
                <td class="px-6 py-4 text-right text-sm space-x-3">

                  <button
                    @click="openViewModal(product)"
                    class="text-sky-600 hover:text-sky-800 font-medium"
                  >
                    View
                  </button>

                  <button
                    @click="openEditModal(product)"
                    class="text-emerald-600 hover:text-emerald-800 font-medium"
                  >
                    Edit
                  </button>

                  <button
                    @click="openDeleteConfirm(product)"
                    class="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="p-12 text-center">
          <p class="text-slate-500">No products found</p>
        </div>

      </div>

    </div>
  </div>

        <!-- ADD / EDIT MODAL -->
        <div v-if="showModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            <div class="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">

                <div class="flex justify-between items-center px-6 py-4 border-b">

                    <h2 class="text-xl font-bold">
                        {{ modalMode === 'add' ? 'Add Product' : 'Edit Product' }}
                    </h2>

                    <button @click="closeModal" class="text-gray-500 hover:text-gray-700">✕</button>

                </div>

                <form @submit.prevent="saveProduct" class="p-6 space-y-4">

                    <div>
                        <label class="block text-sm font-medium mb-2">Product Name</label>
                        <input v-model="formData.name" type="text" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E4DA7]" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2">Price</label>
                        <input v-model="formData.price" type="number" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E4DA7]" />
                    </div>

                    <div class="flex gap-2 pt-4">

                        <button type="button" @click="closeModal"
                            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            Cancel
                        </button>

                        <button type="submit" :disabled="saving"
                            class="flex-1 px-4 py-2 bg-[#2E4DA7] text-white rounded-lg hover:bg-blue-700">
                            {{ saving ? 'Saving...' : 'Save' }}
                        </button>

                    </div>

                </form>

            </div>

        </div>

        <!-- VIEW MODAL -->
        <div v-if="showViewModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            <div class="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">

                <div class="flex justify-between items-center px-6 py-4 border-b">
                    <h2 class="text-xl font-bold">Product Details</h2>
                    <button @click="closeViewModal">✕</button>
                </div>

                <div v-if="selectedProduct" class="p-6 space-y-4">

                    <div class="flex items-center gap-4">
                        <div
                            class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-semibold">
                            {{ selectedProduct.name.charAt(0) }}
                        </div>

                        <div>
                            <p class="text-lg font-bold">{{ selectedProduct.name }}</p>
                            <p class="text-gray-600">₱ {{ selectedProduct.price }}</p>
                        </div>
                    </div>

                    <div>
                        <p class="text-sm text-gray-600">Created</p>
                        <p>{{ formatDate(selectedProduct.created_at) }}</p>
                    </div>

                    <button @click="closeViewModal"
                        class="w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                        Close
                    </button>

                </div>

            </div>

        </div>

</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { productService } from '~/api/Product/ProductService'

const searchQuery = ref('')
const products = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Modal
const showModal = ref(false)
const showViewModal = ref(false)
const modalMode = ref<'add' | 'edit'>('add')
const saving = ref(false)

// Selected
const selectedProduct = ref<any>(null)

// Form
const formData = ref({
    name: '',
    price: ''
})

// Computed
const filteredProducts = computed(() => {
    return products.value.filter(p =>
        searchQuery.value === '' ||
        p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

// Fetch
const fetchProducts = async () => {
    loading.value = true
    try {
        const response = await productService.list({ per_page: 100 })
        products.value = response.data ?? response
    } catch (err: any) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

// Modal
const openAddModal = () => {
    modalMode.value = 'add'
    formData.value = { name: '', price: '' }
    showModal.value = true
}

const openEditModal = (product: any) => {
    modalMode.value = 'edit'
    selectedProduct.value = product
    formData.value = {
        name: product.name,
        price: product.price
    }
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    selectedProduct.value = null
}

// Save
const saveProduct = async () => {
    saving.value = true
    try {
        if (modalMode.value === 'add') {
            await productService.create(formData.value)
        } else {
            await productService.update(selectedProduct.value.uuid, formData.value)
        }

        closeModal()
        await fetchProducts()
    } finally {
        saving.value = false
    }
}

// Delete
const openDeleteConfirm = async (product: any) => {
    if (!confirm(`Delete ${product.name}?`)) return

    await productService.delete(product.uuid)
    await fetchProducts()
}

// View
const openViewModal = (product: any) => {
    selectedProduct.value = product
    showViewModal.value = true
}

const closeViewModal = () => {
    showViewModal.value = false
    selectedProduct.value = null
}

// Utils
const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

onMounted(fetchProducts)
</script>