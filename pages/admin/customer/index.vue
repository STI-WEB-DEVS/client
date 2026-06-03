<template>
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-slate-900">Customers</h1>
        <p class="text-slate-500">Manage and monitor your TravelEase customers.</p>
      </div>

      <!-- Search + Add -->
      <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search customers..."
          class="w-full md:max-w-md rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <button
          @click="openAddModal"
          class="rounded-lg bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 transition"
        >
          + Add Customer
        </button>

      </div>

      <!-- Loading -->
      <div v-if="loading" class="rounded-xl bg-white border border-slate-100 shadow-sm p-12 text-center">
        <div class="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-sky-600"></div>
        <p class="mt-4 text-slate-500">Loading customers...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="rounded-xl bg-red-50 border border-red-200 p-6">
        <p class="font-semibold text-red-700">Error loading customers</p>
        <p class="text-sm text-red-600">{{ error }}</p>
      </div>

      <!-- Table Card -->
      <div v-else class="rounded-xl bg-white border border-slate-100 shadow-sm overflow-hidden">

        <!-- Table Header -->
        <div class="px-6 py-4 border-b border-slate-100">
          <h2 class="text-lg font-semibold text-slate-900">Customer List</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-100">

            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Customer
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Email
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Joined
                </th>
                <th class="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100 bg-white">

              <tr
                v-for="customer in filteredCustomers"
                :key="customer.uuid"
                class="hover:bg-slate-50 transition"
              >

                <!-- Customer -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">

                    <div class="h-10 w-10 rounded-full bg-sky-600 flex items-center justify-center text-white font-semibold">
                      {{ customer.name.charAt(0) }}
                    </div>

                    <div class="text-sm font-medium text-slate-900">
                      {{ customer.name }}
                    </div>

                  </div>
                </td>

                <!-- Email -->
                <td class="px-6 py-4 text-sm text-slate-500">
                  {{ customer.email }}
                </td>

                <!-- Joined -->
                <td class="px-6 py-4 text-sm text-slate-500">
                  {{ formatDate(customer.created_at) }}
                </td>

                <!-- Actions -->
                <td class="px-6 py-4 text-right text-sm space-x-3">

                  <button
                    @click="openViewModal(customer)"
                    class="text-sky-600 hover:text-sky-800 font-medium"
                  >
                    View
                  </button>

                  <button
                    @click="openEditModal(customer)"
                    class="text-emerald-600 hover:text-emerald-800 font-medium"
                  >
                    Edit
                  </button>

                  <button
                    @click="openDeleteConfirm(customer)"
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
        <div v-if="filteredCustomers.length === 0" class="p-12 text-center">
          <p class="text-slate-500">No customers found</p>
        </div>

        <!-- Footer -->
        <div v-if="filteredCustomers.length > 0" class="border-t border-slate-100 px-6 py-4">
          <p class="text-sm text-slate-500">
            Showing {{ filteredCustomers.length }} of {{ customers.length }} customers
          </p>
        </div>

      </div>
        <!-- Add/Edit Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
                <div class="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                    <h2 class="text-xl font-bold text-gray-900">{{ modalMode === 'add' ? 'Add New Customer' : 'Edit Customer' }}</h2>
                    <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="saveCustomer" class="p-6 space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                        <input 
                            v-model="formData.name"
                            type="text" 
                            required
                            placeholder="Enter customer name" 
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E4DA7]"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input 
                            v-model="formData.email"
                            type="email" 
                            required
                            placeholder="Enter email address" 
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E4DA7]"
                        />
                    </div>

                    <div class="flex gap-2 pt-4">
                        <button 
                            type="button"
                            @click="closeModal"
                            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            :disabled="saving"
                            class="flex-1 px-4 py-2 bg-[#2E4DA7] text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {{ saving ? 'Saving...' : 'Save' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- View Modal -->
        <div v-if="showViewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
                <div class="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                    <h2 class="text-xl font-bold text-gray-900">Customer Details</h2>
                    <button @click="closeViewModal" class="text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div v-if="selectedCustomer" class="p-6 space-y-4">
                    <div class="flex items-center space-x-4 pb-4 border-b border-gray-200">
                        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-semibold">
                            {{ selectedCustomer.name.charAt(0) }}
                        </div>
                        <div>
                            <p class="text-lg font-bold text-gray-900">{{ selectedCustomer.name }}</p>
                            <p class="text-sm text-gray-500">{{ selectedCustomer.email }}</p>
                        </div>
                    </div>

                    <div>
                        <p class="text-sm text-gray-600 font-medium">Email Address</p>
                        <p class="text-gray-900">{{ selectedCustomer.email }}</p>
                    </div>

                    <div>
                        <p class="text-sm text-gray-600 font-medium">Joined Date</p>
                        <p class="text-gray-900">{{ formatDate(selectedCustomer.created_at) }}</p>
                    </div>

                    <div class="pt-4 border-t border-gray-200">
                        <button 
                            @click="closeViewModal"
                            class="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg max-w-sm w-full mx-4">
                <div class="p-6">
                    <div class="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                        <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold text-center text-gray-900 mb-2">Delete Customer</h3>
                    <p class="text-center text-gray-600 mb-6">
                        Are you sure you want to delete <strong>{{ selectedCustomer?.name }}</strong>? This action cannot be undone.
                    </p>
                    <div class="flex gap-2">
                        <button 
                            @click="closeDeleteConfirm"
                            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            @click="deleteCustomer"
                            :disabled="deleting"
                            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                        >
                            {{ deleting ? 'Deleting...' : 'Delete' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Toast Notification -->
        <div v-if="showToast" :class="[
            'fixed bottom-4 right-4 px-6 py-4 rounded-lg text-white font-medium shadow-lg z-50 transition-all duration-300',
            toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
        ]">
            {{ toastMessage }}
        </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { customerService } from '~/api/Customer/CustomerService'

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