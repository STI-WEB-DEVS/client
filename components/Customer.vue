<template>
  <div class="p-8 bg-[#0f172a] min-h-screen font-sans text-white">

    <!-- HEADER -->
    <div class="flex justify-between items-end mb-10 border-b border-white/10 pb-8">
      <div>
        <p class="text-teal-400 text-xs font-black uppercase tracking-widest mb-2">
          Sutura TMS
        </p>
        <h1 class="text-2xl font-bold">Customers Management</h1>
        <p class="text-sm text-slate-400">
          Manage and track all your customer information
        </p>
      </div>

      <button
        @click="openAddModal"
        class="bg-teal-500 hover:bg-teal-400 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-teal-900/30 transition">
        + Add Customer
      </button>
    </div>

    <!-- SEARCH -->
    <div class="mb-8 bg-white/5 border border-white/10 rounded-2xl p-5">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search customers by name or email..."
        class="w-full bg-transparent outline-none text-sm text-white placeholder-slate-500"
      />
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
      <div class="animate-spin w-10 h-10 border-2 border-teal-400 border-t-transparent rounded-full mx-auto"></div>
      <p class="text-slate-400 mt-4 text-sm">Loading customers...</p>
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="bg-red-400/10 border border-red-400/20 rounded-2xl p-6">
      <p class="text-red-400 font-bold">Error loading customers</p>
      <p class="text-red-300 text-sm">{{ error }}</p>
    </div>

    <!-- TABLE -->
    <div v-else class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

      <table class="w-full">

        <thead class="bg-white/5 border-b border-white/10">
          <tr class="text-left text-xs uppercase text-slate-400">
            <th class="p-4">Customer</th>
            <th class="p-4">Email</th>
            <th class="p-4">Joined</th>
            <th class="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="customer in filteredCustomers"
            :key="customer.uuid"
            class="border-b border-white/5 hover:bg-white/5 transition">

            <!-- CUSTOMER -->
            <td class="p-4 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                {{ customer.name.charAt(0) }}
              </div>
              <p class="font-semibold text-sm">{{ customer.name }}</p>
            </td>

            <!-- EMAIL -->
            <td class="p-4 text-slate-300 text-sm">
              {{ customer.email }}
            </td>

            <!-- DATE -->
            <td class="p-4 text-slate-400 text-sm">
              {{ formatDate(customer.created_at) }}
            </td>

            <!-- ACTIONS -->
            <td class="p-4 flex gap-3 text-sm">

              <button @click="openViewModal(customer)"
                class="text-teal-400 hover:text-teal-300 font-semibold">
                View
              </button>

              <button @click="openEditModal(customer)"
                class="text-blue-400 hover:text-blue-300 font-semibold">
                Edit
              </button>

              <button @click="openDeleteConfirm(customer)"
                class="text-red-400 hover:text-red-300 font-semibold">
                Delete
              </button>

            </td>

          </tr>

        </tbody>

      </table>

      <div v-if="filteredCustomers.length === 0" class="p-10 text-center text-slate-500">
        No customers found
      </div>

      <!-- FOOTER -->
      <div class="px-6 py-4 border-t border-white/10 text-sm text-slate-500">
        Showing {{ filteredCustomers.length }} of {{ customers.length }} customers
      </div>

    </div>

    <!-- ================= ADD / EDIT MODAL ================= -->
    <div v-if="showModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div class="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-md">

        <div class="flex justify-between items-center p-5 border-b border-white/10">
          <h2 class="font-bold text-white text-lg">
            {{ modalMode === 'add' ? 'Add Customer' : 'Edit Customer' }}
          </h2>
          <button @click="closeModal" class="text-slate-400 hover:text-white">✕</button>
        </div>

        <form @submit.prevent="saveCustomer" class="p-6 space-y-4">

          <div>
            <label class="text-xs text-slate-400">Customer Name</label>
            <input
              v-model="formData.name"
              type="text"
              class="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-teal-400"
              required
            />
          </div>

          <div>
            <label class="text-xs text-slate-400">Email Address</label>
            <input
              v-model="formData.email"
              type="email"
              class="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-teal-400"
              required
            />
          </div>

          <div class="flex gap-3 pt-4">

            <button
              type="button"
              @click="closeModal"
              class="flex-1 bg-white/5 border border-white/10 rounded-xl py-2 text-slate-300 hover:bg-white/10">
              Cancel
            </button>

            <button
              type="submit"
              :disabled="saving"
              class="flex-1 bg-teal-500 hover:bg-teal-400 rounded-xl py-2 font-bold text-white shadow-lg shadow-teal-900/30">
              {{ saving ? 'Saving...' : 'Save' }}
            </button>

          </div>

        </form>

      </div>

    </div>

    <!-- ================= VIEW MODAL ================= -->
    <div v-if="showViewModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div class="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-md">

        <div class="flex justify-between items-center p-5 border-b border-white/10">
          <h2 class="font-bold text-white">Customer Details</h2>
          <button @click="closeViewModal" class="text-slate-400 hover:text-white">✕</button>
        </div>

        <div v-if="selectedCustomer" class="p-6 space-y-4">

          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xl">
              {{ selectedCustomer.name.charAt(0) }}
            </div>

            <div>
              <p class="font-bold text-white">{{ selectedCustomer.name }}</p>
              <p class="text-slate-400">{{ selectedCustomer.email }}</p>
            </div>
          </div>

          <div class="text-sm text-slate-400">
            Joined: {{ formatDate(selectedCustomer.created_at) }}
          </div>

          <button
            @click="closeViewModal"
            class="w-full mt-4 bg-white/5 border border-white/10 rounded-xl py-2 hover:bg-white/10">
            Close
          </button>

        </div>

      </div>

    </div>

    <!-- ================= DELETE MODAL ================= -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div class="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-sm p-6">

        <div class="text-center">

          <div class="w-12 h-12 mx-auto bg-red-400/10 border border-red-400/20 rounded-full flex items-center justify-center mb-4">
            ⚠
          </div>

          <h3 class="font-bold text-white mb-2">Delete Customer</h3>

          <p class="text-sm text-slate-400 mb-6">
            Are you sure you want to delete <span class="text-white font-semibold">{{ selectedCustomer?.name }}</span>?
          </p>

          <div class="flex gap-3">

            <button
              @click="closeDeleteConfirm"
              class="flex-1 bg-white/5 border border-white/10 rounded-xl py-2 text-slate-300 hover:bg-white/10">
              Cancel
            </button>

            <button
              @click="deleteCustomer"
              :disabled="deleting"
              class="flex-1 bg-red-500 hover:bg-red-400 rounded-xl py-2 font-bold text-white">
              {{ deleting ? 'Deleting...' : 'Delete' }}
            </button>

          </div>

        </div>

      </div>

    </div>

    <!-- TOAST -->
    <div
      v-if="showToast"
      :class="[
        'fixed bottom-4 right-4 px-5 py-3 rounded-xl text-white text-sm font-medium shadow-lg',
        toastType === 'success' ? 'bg-teal-500' : 'bg-red-500'
      ]">
      {{ toastMessage }}
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