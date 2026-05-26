<template>

        <div class="mb-8">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="text-3xl font-bold text-[#2E4DA7] mb-2">Products</h1>
                    <p class="text-gray-600">Manage and track all your products</p>
                </div>

                <button @click="openAddModal"
                    class="bg-[#2E4DA7] text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                    + Add Product
                </button>
            </div>
        </div>

        <!-- Search and Filter -->
        <div class="mb-6 bg-white rounded-lg shadow-md p-4">
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1">
                    <input v-model="searchQuery" type="text" placeholder="Search products..."
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E4DA7]" />
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="bg-white rounded-lg shadow-md p-12 text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E4DA7] mx-auto"></div>
            <p class="text-gray-600 mt-4">Loading products...</p>
        </div>

        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg shadow-md p-6">
            <p class="text-red-800 font-semibold">Error loading products</p>
            <p class="text-red-600 text-sm">{{ error }}</p>
        </div>

        <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">

                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Product</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Price</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Created</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-200">

                        <tr v-for="product in filteredProducts" :key="product.uuid" class="hover:bg-gray-50 transition">

                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">

                                    <div
                                        class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                                        {{ product.name.charAt(0) }}
                                    </div>

                                    <div class="ml-3">
                                        <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
                                    </div>

                                </div>
                            </td>

                            <td class="px-6 py-4 text-sm text-gray-600">
                                ₱ {{ product.price }}
                            </td>

                            <td class="px-6 py-4 text-sm text-gray-600">
                                {{ formatDate(product.created_at) }}
                            </td>

                            <td class="px-6 py-4 text-sm font-medium space-x-2">

                                <button @click="openViewModal(product)" class="text-blue-600 hover:text-blue-900">
                                    View
                                </button>

                                <button @click="openEditModal(product)" class="text-green-600 hover:text-green-900">
                                    Edit
                                </button>

                                <button @click="openDeleteConfirm(product)" class="text-red-600 hover:text-red-900">
                                    Delete
                                </button>

                            </td>

                        </tr>

                    </tbody>

                </table>
            </div>

            <div v-if="filteredProducts.length === 0" class="text-center py-12">
                <p class="text-gray-600">No products found</p>
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
import { productService } from '~/api/product/ProductService'

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