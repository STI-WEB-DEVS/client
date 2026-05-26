<template>
        <!-- Header -->
        <div
            class="bg-gradient-to-r from-[#8F7A6E] to-[#6F5E54] rounded-2xl p-6 mb-6 text-white shadow-lg">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold mb-1">Customers</h1>
                    <p class="text-white/80">
                        Manage and track all your customer information
                    </p>
                </div>

                <button @click="openAddModal"
                    class="flex items-center gap-2 bg-white text-[#6F5E54] px-5 py-3 rounded-xl font-semibold hover:bg-gray-100 transition shadow">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Add Customer
                </button>
            </div>
        </div>

        <!-- Search & Filter -->
        <div class="bg-white rounded-2xl shadow-md p-4 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
                <div class="relative flex-1">
                    <svg class="w-5 h-5 absolute left-4 top-3 text-gray-400"
                        fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>

                    <input v-model="searchQuery" type="text"
                        placeholder="Search by name or email..."
                        class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8F7A6E] focus:outline-none" />
                </div>

                <select
                    class="px-4 py-3 border border-gray-200 rounded-xl text-gray-600 focus:ring-2 focus:ring-[#8F7A6E] focus:outline-none">
                    <option>All</option>
                    <option>Recent</option>
                    <option>Older</option>
                </select>
            </div>
        </div>

        <!-- Loading -->
        <div v-if="loading"
            class="bg-white rounded-2xl shadow-md p-12 text-center">
            <div
                class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6F5E54] mx-auto"></div>
            <p class="text-gray-600 mt-4">Loading customers...</p>
        </div>

        <!-- Error -->
        <div v-else-if="error"
            class="bg-red-50 border border-red-200 rounded-2xl shadow-md p-6">
            <p class="text-red-800 font-semibold">
                Error loading customers
            </p>
            <p class="text-red-600 text-sm">{{ error }}</p>
        </div>

        <!-- Customer Cards -->
        <div v-else>
            <div v-if="filteredCustomers.length > 0"
                class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <div v-for="customer in filteredCustomers"
                    :key="customer.uuid"
                    class="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100">

                    <!-- Card Header -->
                    <div
                        class="bg-gradient-to-r from-[#8F7A6E] to-[#6F5E54] p-5 text-white">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold">
                                {{ customer.name.charAt(0) }}
                            </div>

                            <div>
                                <h2 class="text-lg font-bold">
                                    {{ customer.name }}
                                </h2>
                                <p class="text-sm text-white/80">
                                    Customer Account
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Card Body -->
                    <div class="p-5 space-y-4">
                        <div>
                            <p
                                class="text-xs uppercase text-gray-400 font-semibold mb-1">
                                Email
                            </p>
                            <p class="text-gray-700 break-all">
                                {{ customer.email }}
                            </p>
                        </div>

                        <div>
                            <p
                                class="text-xs uppercase text-gray-400 font-semibold mb-1">
                                Joined Date
                            </p>
                            <p class="text-gray-700">
                                {{ formatDate(customer.created_at) }}
                            </p>
                        </div>

                        <!-- Actions -->
                        <div class="flex gap-2 pt-3">
                            <button @click="openViewModal(customer)"
                                class="flex-1 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition font-medium">
                                View
                            </button>

                            <button @click="openEditModal(customer)"
                                class="flex-1 py-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition font-medium">
                                Edit
                            </button>

                            <button
                                @click="openDeleteConfirm(customer)"
                                class="flex-1 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition font-medium">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else
                class="bg-white rounded-2xl shadow-md p-16 text-center">
                <div
                    class="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg class="w-10 h-10 text-gray-400" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="2"
                            d="M17 20h5V4H2v16h5m10 0v-4a3 3 0 00-3-3H10a3 3 0 00-3 3v4m10 0H7" />
                    </svg>
                </div>

                <h3 class="text-xl font-bold text-gray-700 mb-2">
                    No Customers Found
                </h3>

                <p class="text-gray-500">
                    Try adjusting your search or add a new customer.
                </p>
            </div>

            <!-- Footer -->
            <div v-if="filteredCustomers.length > 0"
                class="mt-6 bg-white rounded-2xl shadow-md px-6 py-4 flex items-center justify-between">
                <p class="text-sm text-gray-600">
                    Showing {{ filteredCustomers.length }} of
                    {{ customers.length }} customers
                </p>
            </div>
        </div>

<!-- Add/Edit Modal -->
<div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        
        <div class="bg-gradient-to-r from-[#8F7A6E] to-[#6F5E54] px-6 py-4 text-white flex justify-between items-center">
            <h2 class="text-xl font-bold">
                {{ modalMode === 'add' ? 'Add Customer' : 'Edit Customer' }}
            </h2>

            <button @click="closeModal" class="hover:opacity-80">
                ✕
            </button>
        </div>

        <form @submit.prevent="saveCustomer" class="p-6 space-y-4">

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name
                </label>

                <input
                    v-model="formData.name"
                    type="text"
                    required
                    placeholder="Enter customer name"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8F7A6E] focus:outline-none"
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                </label>

                <input
                    v-model="formData.email"
                    type="email"
                    required
                    placeholder="Enter email address"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8F7A6E] focus:outline-none"
                />
            </div>

            <div class="flex gap-3 pt-4">
                <button
                    type="button"
                    @click="closeModal"
                    class="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    :disabled="saving"
                    class="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#8F7A6E] to-[#6F5E54] text-white hover:opacity-90 transition"
                >
                    {{ saving ? 'Saving...' : 'Save Customer' }}
                </button>
            </div>

        </form>
    </div>
</div>

<!-- View Modal -->
<div v-if="showViewModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">

        <div class="bg-gradient-to-r from-[#8F7A6E] to-[#6F5E54] p-6 text-white text-center">
            <div class="w-20 h-20 rounded-full bg-white/20 mx-auto flex items-center justify-center text-3xl font-bold mb-3">
                {{ selectedCustomer?.name?.charAt(0) }}
            </div>

            <h2 class="text-2xl font-bold">
                {{ selectedCustomer?.name }}
            </h2>

            <p class="text-white/80">
                Customer Account
            </p>
        </div>

        <div class="p-6 space-y-4">

            <div>
                <p class="text-sm text-gray-400 mb-1">Email Address</p>
                <p class="text-gray-800 font-medium">
                    {{ selectedCustomer?.email }}
                </p>
            </div>

            <div>
                <p class="text-sm text-gray-400 mb-1">Joined Date</p>
                <p class="text-gray-800 font-medium">
                    {{ formatDate(selectedCustomer?.created_at) }}
                </p>
            </div>

            <button
                @click="closeViewModal"
                class="w-full py-3 rounded-xl bg-gradient-to-r from-[#8F7A6E] to-[#6F5E54] text-white hover:opacity-90 transition mt-4"
            >
                Close
            </button>

        </div>
    </div>
</div>

<!-- Delete Confirmation -->
<div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 p-6">

        <div class="text-center">
            <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0" />
                </svg>
            </div>

            <h2 class="text-xl font-bold text-gray-800 mb-2">
                Delete Customer
            </h2>

            <p class="text-gray-500 mb-6">
                Are you sure you want to delete
                <span class="font-semibold text-gray-700">
                    {{ selectedCustomer?.name }}
                </span>?
            </p>

            <div class="flex gap-3">
                <button
                    @click="closeDeleteConfirm"
                    class="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                    Cancel
                </button>

                <button
                    @click="deleteCustomer"
                    :disabled="deleting"
                    class="flex-1 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                >
                    {{ deleting ? 'Deleting...' : 'Delete' }}
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Toast -->
<div
    v-if="showToast"
    :class="[
        'fixed bottom-5 right-5 px-6 py-4 rounded-xl shadow-2xl text-white z-50 transition-all',
        toastType === 'success'
            ? 'bg-green-500'
            : 'bg-red-500'
    ]"
>
    {{ toastMessage }}
</div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { customerService } from '~/api/customer/CustomerService'

// State - Main
const searchQuery = ref('')
const customers = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// State - Modals
const showModal = ref(false)
const showViewModal = ref(false)
const showDeleteConfirm = ref(false)
const modalMode = ref<'add' | 'edit'>('add')
const saving = ref(false)
const deleting = ref(false)

// State - Form & Selected
const selectedCustomer = ref<any>(null)
const formData = ref({
    name: '',
    email: ''
})

// State - Toast
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

// Computed
const filteredCustomers = computed(() => {
    return customers.value.filter(customer => {
        const matchesSearch = searchQuery.value === '' || 
            customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
        
        return matchesSearch
    })
})

const openAddModal = () => {
    modalMode.value = 'add'
    formData.value = { name: '', email: '' }
    showModal.value = true
}

const openEditModal = (customer: any) => {
    modalMode.value = 'edit'
    selectedCustomer.value = customer
    formData.value = {
        name: customer.name,
        email: customer.email
    }
    showModal.value = true
}

const openViewModal = (customer: any) => {
    selectedCustomer.value = customer
    showViewModal.value = true
}

const closeModal = () => {
    showModal.value = false
    formData.value = { name: '', email: '' }
    selectedCustomer.value = null
}

const closeViewModal = () => {
    showViewModal.value = false
    selectedCustomer.value = null
}

const openDeleteConfirm = (customer: any) => {
    selectedCustomer.value = customer
    showDeleteConfirm.value = true
}

const closeDeleteConfirm = () => {
    showDeleteConfirm.value = false
    selectedCustomer.value = null
}

// Methods - CRUD Operations
const saveCustomer = async () => {
    saving.value = true
    try {
        if (modalMode.value === 'add') {
            await customerService.create(formData.value)
            displayToast('Customer added successfully', 'success')
        } else {
            await customerService.update(selectedCustomer.value.uuid, formData.value)
            displayToast('Customer updated successfully', 'success')
        }
        closeModal()
        await fetchCustomers()
    } catch (err: any) {
        displayToast(err.message || 'Failed to save customer', 'error')
    } finally {
        saving.value = false
    }
}

const deleteCustomer = async () => {
    deleting.value = true
    try {
        await customerService.delete(selectedCustomer.value.uuid)
        displayToast('Customer deleted successfully', 'success')
        closeDeleteConfirm()
        await fetchCustomers()
    } catch (err: any) {
        displayToast(err.message || 'Failed to delete customer', 'error')
    } finally {
        deleting.value = false
    }
}

// Methods - Data Fetching
const fetchCustomers = async () => {
    loading.value = true
    error.value = null
    try {
        const response = await customerService.list({ per_page: 100 })
        // Handle paginated response
        if (response.data) {
            customers.value = response.data
        } else {
            customers.value = response
        }
    } catch (err: any) {
        error.value = err.message || 'Failed to load customers'
        console.error('Error fetching customers:', err)
    } finally {
        loading.value = false
    }
}

// Methods - Utilities
const formatDate = (date: string) => {
    if (!date) return 'N/A'
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const displayToast = (message: string, type: 'success' | 'error' = 'success') => {
    toastMessage.value = message
    toastType.value = type
    showToast.value = true
    setTimeout(() => {
        showToast.value = false
    }, 3000)
}

// Lifecycle
onMounted(() => {
    fetchCustomers()
})
</script> 