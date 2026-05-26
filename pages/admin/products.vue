<template>

        <!-- HEADER -->
        <div
            class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#8F7A6E] to-[#6F5E54] p-8 mb-8 text-white shadow-xl">

            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>
                    <h1 class="text-4xl font-bold mb-2">Products</h1>
                    <p class="text-blue-100 text-lg">
                        Manage and track all your products
                    </p>
                </div>

                <button @click="openAddModal"
                    class="bg-gradient-to-r from-[#8F7A6E] to-[#6F5E54] text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition duration-200">
                    + Add Product
                </button>

            </div>

        </div>

        <!-- SEARCH -->
        <div class="bg-white border border-gray-100 rounded-3xl shadow-lg p-5 mb-8">

            <div class="relative">

                <input v-model="searchQuery" type="text" placeholder="Search products..."
                    class="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E4DA7]" />

                <span class="absolute left-4 top-3.5 text-gray-400">
                    🔍
                </span>

            </div>

        </div>

        <!-- LOADING -->
        <div v-if="loading"
            class="bg-white rounded-3xl shadow-lg p-16 flex flex-col items-center justify-center">

            <div class="animate-spin rounded-full h-14 w-14 border-4 border-blue-100 border-t-[#2E4DA7]"></div>

            <p class="text-gray-600 mt-5 text-lg">
                Loading products...
            </p>

        </div>

        <!-- ERROR -->
        <div v-else-if="error"
            class="bg-red-50 border border-red-200 rounded-3xl shadow-lg p-6">

            <p class="text-red-700 text-lg font-bold">
                Error loading products
            </p>

            <p class="text-red-500 mt-1">
                {{ error }}
            </p>

        </div>

        <!-- PRODUCT CARDS -->
        <div v-else>

            <div v-if="filteredProducts.length > 0"
                class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <div v-for="product in filteredProducts" :key="product.uuid"
                    class="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition duration-300">

                    <div
                        class="bg-gradient-to-r from-[#8F7A6E] to-[#6F5E54] p-6 text-white">

                        <div
                            class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-bold shadow-md">

                            {{ product.name.charAt(0) }}

                        </div>

                    </div>

                    <!-- BODY -->
                    <div class="p-6">

                        <h2 class="text-xl font-bold text-gray-800 mb-2">
                            {{ product.name }}
                        </h2>

                        <p class="text-3xl font-bold text-[#2E4DA7] mb-4">
                            ₱ {{ product.price }}
                        </p>

                        <div class="flex items-center text-sm text-gray-500 mb-6">
                            📅 {{ formatDate(product.created_at) }}
                        </div>

                        <!-- ACTIONS -->
                        <div class="flex gap-2">

                            <button @click="openViewModal(product)"
                                class="flex-1 py-2 rounded-xl bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition">
                                View
                            </button>

                            <button @click="openEditModal(product)"
                                class="flex-1 py-2 rounded-xl bg-green-50 text-green-600 font-medium hover:bg-green-100 transition">
                                Edit
                            </button>

                            <button @click="openDeleteConfirm(product)"
                                class="flex-1 py-2 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition">
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            <!-- EMPTY -->
            <div v-else
                class="bg-white rounded-3xl shadow-lg p-16 text-center">

                <div class="text-6xl mb-4">📦</div>

                <h2 class="text-2xl font-bold text-gray-700 mb-2">
                    No products found
                </h2>

                <p class="text-gray-500">
                    Try searching or add a new product.
                </p>

            </div>

        </div>

        <!-- ADD / EDIT MODAL -->
        <div v-if="showModal"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div
                class="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">

                <!-- HEADER -->
                <div
                    class="bg-gradient-to-r from-[#8F7A6E] to-[#6F5E54] px-6 py-5 text-white flex justify-between items-center">

                    <h2 class="text-2xl font-bold">
                        {{ modalMode === 'add' ? 'Add Product' : 'Edit Product' }}
                    </h2>

                    <button @click="closeModal"
                        class="text-white text-xl hover:scale-110 transition">
                        ✕
                    </button>

                </div>

                <!-- FORM -->
                <form @submit.prevent="saveProduct" class="p-6 space-y-5">

                    <div>

                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Product Name
                        </label>

                        <input v-model="formData.name" type="text" required
                            class="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E4DA7]" />

                    </div>

                    <div>

                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Price
                        </label>

                        <input v-model="formData.price" type="number" required
                            class="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E4DA7]" />

                    </div>

                    <div class="flex gap-3 pt-3">

                        <button type="button" @click="closeModal"
                            class="flex-1 py-3 rounded-2xl border border-gray-300 font-medium hover:bg-gray-100 transition">
                            Cancel
                        </button>

                        <button type="submit" :disabled="saving"
                            class="flex-1 py-3 rounded-2xl bg-[#2E4DA7] text-white font-semibold hover:bg-blue-700 transition">

                            {{ saving ? 'Saving...' : 'Save Product' }}

                        </button>

                    </div>

                </form>

            </div>

        </div>

        <!-- VIEW MODAL -->
        <div v-if="showViewModal"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div
                class="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">

                <!-- TOP -->
                <div
                    class="bg-gradient-to-r from-[#8F7A6E] to-[#6F5E54] p-8 text-white text-center relative">

                    <button @click="closeViewModal"
                        class="absolute top-4 right-5 text-white text-xl hover:scale-110 transition">
                        ✕
                    </button>

                    <div v-if="selectedProduct">

                        <div
                            class="w-24 h-24 mx-auto rounded-3xl bg-white/20 flex items-center justify-center text-4xl font-bold mb-4 shadow-lg">

                            {{ selectedProduct.name.charAt(0) }}

                        </div>

                        <h2 class="text-3xl font-bold">
                            {{ selectedProduct.name }}
                        </h2>

                    </div>

                </div>

                <!-- CONTENT -->
                <div v-if="selectedProduct" class="p-8">

                    <div class="mb-6">

                        <p class="text-sm text-gray-500 mb-1">
                            Product Price
                        </p>

                        <p class="text-4xl font-bold text-[#2E4DA7]">
                            ₱ {{ selectedProduct.price }}
                        </p>

                    </div>

                    <div class="mb-8">

                        <p class="text-sm text-gray-500 mb-1">
                            Created Date
                        </p>

                        <p class="text-lg font-medium text-gray-700">
                            {{ formatDate(selectedProduct.created_at) }}
                        </p>

                    </div>

                    <button @click="closeViewModal"
                        class="w-full py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 font-semibold transition">
                        Close
                    </button>

                </div>

            </div>

        </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { productService } from '~/api/product/ProductService'

// State
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