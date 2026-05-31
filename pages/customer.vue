<template>
  <NuxtLayout>
    <div class="min-h-screen bg-[#faf7f2] font-serif text-[#1a1108] p-8">

      <!-- Header -->
      <div class="flex justify-between items-start mb-10">
        <div>
          <p class="text-[10px] tracking-[0.3em] uppercase text-[#b0a090] mb-1">
            Sutura Tailoring
          </p>
          <h1 class="text-3xl font-bold tracking-tight">Customer Atelier</h1>
          <p class="text-xs text-[#8a7060] mt-1">
            Manage and track your valued clientele
          </p>
        </div>

        <button
          @click="openAddModal"
          class="bg-[#1a1108] text-[#f5e6c8] px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#2a1f0f] transition"
        >
          + Add Customer
        </button>
      </div>

      <!-- Search -->
      <div class="bg-white border border-[#e8ddc8] rounded-2xl p-4 mb-8">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search clients by name or email..."
          class="w-full bg-transparent outline-none text-sm placeholder-[#b0a090]"
        />
      </div>

      <!-- Loading -->
      <div v-if="loading" class="bg-white border border-[#e8ddc8] rounded-2xl p-10 text-center">
        <div class="text-[#8a7060] text-sm animate-pulse">
          Loading customer atelier...
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-[#fdf0f0] border border-[#b94040]/30 rounded-2xl p-6">
        <p class="text-[#b94040] font-bold text-sm">Customer Load Error</p>
        <p class="text-xs text-[#8a5a5a] mt-1">{{ error }}</p>
      </div>

      <!-- Customer Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div
          v-for="customer in filteredCustomers"
          :key="customer.uuid"
          class="bg-white border border-[#e8ddc8] rounded-2xl p-5 hover:border-[#c9a84c] transition group"
        >

          <!-- Header -->
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-[#f0e8d8] flex items-center justify-center text-[#8a5a20] font-bold">
              {{ customer.name.charAt(0) }}
            </div>

            <div>
              <p class="font-bold text-sm">{{ customer.name }}</p>
              <p class="text-[10px] text-[#b0a090] uppercase tracking-wider">Client Record</p>
            </div>
          </div>

          <!-- Email -->
          <div class="mb-4">
            <p class="text-[10px] text-[#b0a090] uppercase tracking-wider">Email</p>
            <p class="text-sm font-medium text-[#1a1108] break-all">
              {{ customer.email }}
            </p>
          </div>

          <!-- Joined -->
          <div class="mb-4">
            <p class="text-[10px] text-[#b0a090] uppercase tracking-wider">Joined</p>
            <p class="text-sm text-[#8a7060]">
              {{ formatDate(customer.created_at) }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex gap-2">

            <button
              @click="openViewModal(customer)"
              class="flex-1 text-xs font-bold uppercase tracking-wider text-[#8a5a20] bg-[#faf7f2] border border-[#e8ddc8] rounded-lg py-2 hover:border-[#c9a84c]"
            >
              View
            </button>

            <button
              @click="openEditModal(customer)"
              class="flex-1 text-xs font-bold uppercase tracking-wider text-[#2d7a3a] bg-[#edf7ee] rounded-lg py-2"
            >
              Edit
            </button>

            <button
              @click="openDeleteConfirm(customer)"
              class="flex-1 text-xs font-bold uppercase tracking-wider text-[#b94040] bg-[#fdf0f0] rounded-lg py-2"
            >
              Delete
            </button>

          </div>
        </div>

      </div>

      <!-- Empty -->
      <div v-if="filteredCustomers.length === 0 && !loading"
        class="text-center py-16 text-[#8a7060] text-sm">
        No clients found in atelier
      </div>

      <!-- MODAL -->
      <div v-if="showModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div class="bg-[#faf7f2] border border-[#e8ddc8] rounded-2xl w-full max-w-md p-6">

          <div class="flex justify-between items-center mb-6">
            <h2 class="font-bold text-lg">
              {{ modalMode === 'add' ? 'Add Customer' : 'Edit Customer' }}
            </h2>
            <button @click="closeModal" class="text-[#8a7060]">✕</button>
          </div>

          <form @submit.prevent="saveCustomer" class="space-y-4">

            <div>
              <label class="text-xs text-[#8a7060] uppercase tracking-wider">Name</label>
              <input
                v-model="formData.name"
                class="w-full mt-1 bg-white border border-[#e8ddc8] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c9a84c]"
              />
            </div>

            <div>
              <label class="text-xs text-[#8a7060] uppercase tracking-wider">Email</label>
              <input
                v-model="formData.email"
                type="email"
                class="w-full mt-1 bg-white border border-[#e8ddc8] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c9a84c]"
              />
            </div>

            <div class="flex gap-2 pt-4">

              <button
                type="button"
                @click="closeModal"
                class="flex-1 text-xs uppercase tracking-wider bg-white border border-[#e8ddc8] rounded-lg py-2"
              >
                Cancel
              </button>

              <button
                type="submit"
                class="flex-1 text-xs uppercase tracking-wider bg-[#1a1108] text-[#f5e6c8] rounded-lg py-2"
              >
                {{ saving ? 'Saving...' : 'Save' }}
              </button>

            </div>

          </form>

        </div>
      </div>

    </div>
  </NuxtLayout>
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