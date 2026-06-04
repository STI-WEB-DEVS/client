<template>
  <div class="space-y-6 bg-[#F8FAFC] min-h-screen p-6">

    <!-- HEADER -->

    <!-- HEADER -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

      <div>
        <h1
          class="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
        >
          Customers
        </h1>

        <p class="text-slate-500 mt-2">
        </p>
      </div>

      <button
        @click="openAddModal"
        class="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        + Add Customer
      </button>

    </div>

    <!-- SEARCH -->
    <div
      class="bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-xl p-5 mb-8"
    >
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search customers by name or email..."
        class="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
      />
    </div>

    <!-- LOADING -->
    <div
      v-if="loading"
      class="bg-white rounded-3xl shadow-xl border border-slate-100 p-16 text-center"
    >
      <div
        class="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"
      ></div>

      <p class="text-slate-500 mt-5 font-medium">
        Loading customers...
      </p>
    </div>

    <!-- ERROR -->
    <div
      v-else-if="error"
      class="bg-rose-50 border border-rose-200 rounded-3xl p-6 shadow-sm"
    >
      <p class="text-rose-600 font-semibold">
        Error loading customers
      </p>

      <p class="text-rose-500 text-sm mt-1">
        {{ error }}
      </p>
    </div>

    <!-- CUSTOMER TABLE -->
    <div
      v-else
      class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
    >

      <div class="overflow-x-auto">

        <table class="w-full">

          <!-- TABLE HEADER -->
          <thead
            class="bg-gradient-to-r from-indigo-50 to-violet-50 text-slate-600 text-xs uppercase tracking-wider"
          >
            <tr>
              <th class="text-left px-6 py-5 font-semibold">
                Customer
              </th>

              <th class="text-left px-6 py-5 font-semibold">
                Email
              </th>

              <th class="text-left px-6 py-5 font-semibold">
                Joined
              </th>

              <th class="text-left px-6 py-5 font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <!-- TABLE BODY -->
          <tbody>

            <tr
              v-for="customer in filteredCustomers"
              :key="customer.uuid"
              class="border-t border-slate-100 hover:bg-indigo-50/50 transition-all duration-200"
            >

              <!-- CUSTOMER -->
              <td class="px-6 py-5">

                <div class="flex items-center gap-4">

                  <div
                    class="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold shadow-md"
                  >
                    {{ customer.name.charAt(0).toUpperCase() }}
                  </div>

                  <div>
                    <p class="font-semibold text-slate-800">
                      {{ customer.name }}
                    </p>

                    <p class="text-xs text-slate-400">
                      Customer Account
                    </p>
                  </div>

                </div>

              </td>

              <!-- EMAIL -->
              <td class="px-6 py-5 text-slate-600">
                {{ customer.email }}
              </td>

              <!-- DATE -->
              <td class="px-6 py-5 text-slate-500 text-sm">
                {{ formatDate(customer.created_at) }}
              </td>

              <!-- ACTIONS -->
              <td class="px-6 py-5">

                <div class="flex flex-wrap gap-2">

                  <button
                    @click="openViewModal(customer)"
                    class="px-3 py-2 rounded-xl bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition"
                  >
                    View
                  </button>

                  <button
                    @click="openEditModal(customer)"
                    class="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-600 font-medium hover:bg-emerald-100 transition"
                  >
                    Edit
                  </button>

                  <button
                    @click="openDeleteConfirm(customer)"
                    class="px-3 py-2 rounded-xl bg-rose-50 text-rose-600 font-medium hover:bg-rose-100 transition"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

      <!-- EMPTY STATE -->
      <div
        v-if="filteredCustomers.length === 0"
        class="py-20 text-center"
      >

        <div
          class="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center"
        >
          <svg
            class="w-10 h-10 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5V4H2v16h5m10 0v-2a4 4 0 00-4-4H11a4 4 0 00-4 4v2m10 0H7m10-10a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>

        <h3 class="text-lg font-semibold text-slate-700">
          No Customers Found
        </h3>

        <p class="text-slate-500 mt-2">
          Try adjusting your search or add a new customer.
        </p>

      </div>

      <!-- FOOTER -->
      <div
        class="px-6 py-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between"
      >

        <span class="text-sm text-slate-500">
          Showing
          <span class="font-semibold text-slate-700">
            {{ filteredCustomers.length }}
          </span>
          of
          <span class="font-semibold text-slate-700">
            {{ customers.length }}
          </span>
          customers
        </span>

      </div>

    </div>

    <!-- TOAST -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-3 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showToast"
        :class="[
          'fixed top-6 right-6 px-6 py-4 rounded-2xl text-white shadow-2xl z-50',
          toastType === 'success'
            ? 'bg-emerald-500'
            : 'bg-rose-500'
        ]"
      >
        {{ toastMessage }}
      </div>
    </transition>

        <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-lg max-w-md w-full mx-4">

        <div class="flex justify-between items-center px-6 py-4 border-b">
          <h2 class="text-lg font-bold text-slate-800">
            {{ modalMode === 'add' ? 'Add Customer' : 'Edit Customer' }}
          </h2>
          <button @click="closeModal" class="text-slate-500 hover:text-slate-700">✕</button>
        </div>

        <form @submit.prevent="saveCustomer" class="p-6 space-y-4">

          <div>
            <label class="text-sm text-slate-600">Customer Name</label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#14B8A6]"
            />
          </div>

          <div>
            <label class="text-sm text-slate-600">Price</label>
            <input
              v-model="formData.email"
              type="email"
              required
              class="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#14B8A6]"
            />
          </div>

          <div class="flex gap-2 pt-4">

            <button
              type="button"
              @click="closeModal"
              class="flex-1 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              :disabled="saving"
              class="flex-1 px-4 py-2 bg-[#14B8A6] text-white rounded-xl hover:bg-[#0d9488]"
            >
              {{ saving ? 'Saving...' : 'Save' }}
            </button>

          </div>

        </form>

      </div>
    </div>

    <!-- VIEW MODAL -->
    <div v-if="showViewModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div class="bg-white rounded-2xl shadow-lg max-w-md w-full mx-4">

        <div class="flex justify-between items-center px-6 py-4 border-b">
          <h2 class="text-lg font-bold text-slate-800">Customer Details</h2>
          <button @click="closeViewModal" class="text-slate-500">✕</button>
        </div>

        <div v-if="selectedCustomer" class="p-6 space-y-4">

          <div class="flex items-center gap-4">

            <div
              class="h-14 w-14 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0f766e] flex items-center justify-center text-white text-xl font-bold"
            >
              {{ selectedCustomer.name.charAt(0) }}
            </div>

            <div>
              <p class="font-bold text-slate-800">{{ selectedCustomer.name }}</p>
            </div>

          </div>

          <div>
            <p class="text-sm text-slate-500">Created</p>
            <p class="text-slate-800">{{ formatDate(selectedCustomer.created_at) }}</p>
          </div>

          <button
            @click="closeViewModal"
            class="w-full mt-4 px-4 py-2 bg-slate-100 rounded-xl hover:bg-slate-200"
          >
            Close
          </button>

        </div>

      </div>

    </div>

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