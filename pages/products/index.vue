<template>
    <NuxtLayout name="default">
        <div class="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4 py-10 sm:px-6 lg:px-8">

            <div class="mx-auto max-w-7xl">

                <div class="mb-8 overflow-hidden rounded-3xl bg-[#0f2573] p-8 shadow-xl">
                    <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p class="text-sm font-bold uppercase tracking-widest text-blue-200">
                                Product Inventory
                            </p>

                            <h1 class="mt-2 text-4xl font-black text-white">
                                Products
                            </h1>

                            <p class="mt-3 max-w-2xl text-green-100">
                                Manage product inventory, pricing, and stock availability in one place.
                            </p>
                        </div>

                        <button @click="openAddModal"
                            class="rounded-2xl bg-white px-6 py-4 font-black text-[#0f2573] shadow-lg transition hover:scale-105 hover:bg-blue-50">
                            + Add Product
                        </button>
                    </div>
                </div>

                <div class="mb-8 rounded-3xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200 backdrop-blur">
                    <div class="flex items-center gap-3">
                        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl">
                            🔍
                        </div>

                        <input v-model="search" type="text" placeholder="Search by product name, price, or stock..."
                            class="w-full border-0 bg-transparent px-2 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0" />
                    </div>
                </div>

                <div v-if="filteredProducts.length" class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <div v-for="product in filteredProducts" :key="product.id"
                        class="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
                        <div class="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-blue-50"></div>

                        <div class="relative">
                            <div class="mb-5 flex items-center gap-4">
                                <div
                                    class="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0f2573] text-2xl font-black text-white shadow">
                                    {{ getProductInitials(product.name) }}
                                </div>

                                <div>
                                    <h2 class="text-xl font-black text-gray-900">
                                        {{ product.name }}
                                    </h2>

                                    <p class="text-sm font-medium text-gray-400">
                                        Product ID: {{ product.id }}
                                    </p>
                                </div>
                            </div>

                            <div class="space-y-3">
                                <div class="rounded-2xl bg-slate-50 p-4">
                                    <p class="text-xs font-bold uppercase tracking-wide text-gray-400">
                                        Price
                                    </p>

                                    <p class="mt-1 text-sm font-semibold text-gray-700">
                                        ₱ {{ formatPrice(product.price) }}
                                    </p>
                                </div>

                                <div class="rounded-2xl bg-slate-50 p-4">
                                    <p class="text-xs font-bold uppercase tracking-wide text-gray-400">
                                        Stock
                                    </p>

                                    <p class="mt-1 text-sm font-semibold text-gray-700">
                                        {{ product.stock }} item/s available
                                    </p>
                                </div>
                            </div>

                            <div class="mt-6 flex gap-3">
                                <button @click="editProduct(product)"
                                    class="flex-1 rounded-2xl bg-blue-100 px-4 py-3 text-sm font-black text-blue-700 transition hover:bg-blue-200">
                                    Edit
                                </button>

                                <button @click="openDeleteModal(product)"
                                    class="flex-1 rounded-2xl bg-red-100 px-4 py-3 text-sm font-black text-red-700 transition hover:bg-red-200">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
                    <div
                        class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
                        📦
                    </div>

                    <h3 class="text-2xl font-black text-gray-900">
                        No products found
                    </h3>

                    <p class="mt-2 text-gray-500">
                        Try changing your search or add a new product.
                    </p>
                </div>

            </div>

            <div v-if="showModal"
                class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
                <div class="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">

                    <div class="bg-[#0f2573] px-8 py-6">
                        <h2 class="text-2xl font-black text-white">
                            {{ isEditing ? 'Edit Product' : 'Add Product' }}
                        </h2>

                        <p class="mt-1 text-sm text-green-100">
                            {{ isEditing ? 'Update existing product details.' : 'Create a new product record.' }}
                        </p>
                    </div>

                    <div class="space-y-5 p-8">
                        <div>
                            <label class="mb-2 block text-sm font-bold text-gray-700">
                                Product Name
                            </label>

                            <input v-model="form.name" type="text" placeholder="Enter product name"
                                class="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 font-semibold text-gray-800 outline-none transition focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-100" />
                        </div>

                        <div>
                            <label class="mb-2 block text-sm font-bold text-gray-700">
                                Price
                            </label>

                            <input v-model="form.price" type="number" min="0" placeholder="Enter price"
                                class="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 font-semibold text-gray-800 outline-none transition focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-100" />
                        </div>

                        <div>
                            <label class="mb-2 block text-sm font-bold text-gray-700">
                                Stock
                            </label>

                            <input v-model="form.stock" type="number" min="0" placeholder="Enter stock"
                                class="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 font-semibold text-gray-800 outline-none transition focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-100" />
                        </div>

                        <div class="flex justify-end gap-3 pt-4">
                            <button @click="resetForm"
                                class="rounded-2xl bg-gray-100 px-5 py-3 font-black text-gray-700 transition hover:bg-gray-200">
                                Cancel
                            </button>

                            <button @click="isEditing ? updateProduct() : addProduct()"
                                class="rounded-2xl bg-[#0f2573] px-5 py-3 font-black text-white shadow transition hover:bg-green-800">
                                {{ isEditing ? 'Update Product' : 'Save Product' }}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div v-if="showDeleteModal"
                class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
                <div class="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">

                    <div class="bg-red-600 px-8 py-6">
                        <h2 class="text-2xl font-black text-white">
                            Delete Product
                        </h2>

                        <p class="mt-1 text-sm text-red-100">
                            Please confirm before deleting this record.
                        </p>
                    </div>

                    <div class="p-8">
                        <div class="mb-6 flex items-center gap-4 rounded-2xl bg-red-50 p-4">
                            <div
                                class="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-xl font-black text-white">
                                !
                            </div>

                            <div>
                                <p class="text-sm font-bold text-gray-500">
                                    You are about to delete
                                </p>

                                <h3 class="text-lg font-black text-gray-900">
                                    {{ selectedProduct?.name }}
                                </h3>
                            </div>
                        </div>

                        <p class="text-sm font-semibold leading-6 text-gray-600">
                            This action will remove the product from the list. Are you sure you want to continue?
                        </p>

                        <div class="mt-8 flex justify-end gap-3">
                            <button @click="closeDeleteModal"
                                class="rounded-2xl bg-gray-100 px-5 py-3 font-black text-gray-700 transition hover:bg-gray-200">
                                Cancel
                            </button>

                            <button @click="confirmDeleteProduct"
                                class="rounded-2xl bg-red-600 px-5 py-3 font-black text-white shadow transition hover:bg-red-700">
                                Yes, Delete
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </NuxtLayout>
</template>

<script setup>
import { computed, ref } from 'vue'

const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const editId = ref(null)
const search = ref('')
const selectedProduct = ref(null)

const products = ref([
    {
        id: 1,
        name: 'Laptop',
        price: 35000,
        stock: 10
    }
])

const form = ref({
    name: '',
    price: '',
    stock: ''
})

const filteredProducts = computed(() => {
    const keyword = search.value.toLowerCase().trim()

    if (!keyword) {
        return products.value
    }

    return products.value.filter((product) => {
        return (
            product.name.toLowerCase().includes(keyword) ||
            String(product.price).toLowerCase().includes(keyword) ||
            String(product.stock).toLowerCase().includes(keyword)
        )
    })
})

const openAddModal = () => {
    form.value = {
        name: '',
        price: '',
        stock: ''
    }

    isEditing.value = false
    editId.value = null
    showModal.value = true
}

const addProduct = () => {
    if (!form.value.name || form.value.price === '' || form.value.stock === '') {
        alert('Please fill in all fields.')
        return
    }

    products.value.push({
        id: Date.now(),
        name: form.value.name,
        price: Number(form.value.price),
        stock: Number(form.value.stock)
    })

    resetForm()
}

const editProduct = (product) => {
    isEditing.value = true
    editId.value = product.id

    form.value = {
        name: product.name,
        price: product.price,
        stock: product.stock
    }

    showModal.value = true
}

const updateProduct = () => {
    if (!form.value.name || form.value.price === '' || form.value.stock === '') {
        alert('Please fill in all fields.')
        return
    }

    const index = products.value.findIndex((product) => {
        return product.id === editId.value
    })

    if (index !== -1) {
        products.value[index] = {
            id: editId.value,
            name: form.value.name,
            price: Number(form.value.price),
            stock: Number(form.value.stock)
        }
    }

    resetForm()
}

const openDeleteModal = (product) => {
    selectedProduct.value = product
    showDeleteModal.value = true
}

const closeDeleteModal = () => {
    selectedProduct.value = null
    showDeleteModal.value = false
}

const confirmDeleteProduct = () => {
    if (!selectedProduct.value) {
        return
    }

    products.value = products.value.filter((product) => {
        return product.id !== selectedProduct.value.id
    })

    closeDeleteModal()
}

const resetForm = () => {
    form.value = {
        name: '',
        price: '',
        stock: ''
    }

    showModal.value = false
    isEditing.value = false
    editId.value = null
}

const getProductInitials = (name) => {
    if (!name) {
        return '?'
    }

    return name
        .split(' ')
        .map((word) => word.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase()
}

const formatPrice = (price) => {
    return Number(price).toLocaleString('en-PH')
}
</script>