<template>
  <div>
    <!-- Page header -->
    <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-[#1D3557]">Customer Management</h1>
        <p class="mt-1 text-sm text-[#457B9D]">Manage customer records and information.</p>
      </div>
      <div class="flex gap-3">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search customer..."
            class="rounded-xl border border-[#A8DADC]/60 bg-white pl-9 pr-4 py-2.5 text-sm text-[#1D3557] placeholder:text-[#457B9D]/50 shadow-sm outline-none focus:border-[#457B9D] focus:ring-2 focus:ring-[#457B9D]/20 transition-all"
          />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[#457B9D]/50 text-sm">🔍</span>
        </div>
        <button 
          @click="openCreateModal"
          class="inline-flex items-center gap-2 rounded-xl bg-[#D62828] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#b52020] transition-colors"
        >
          + Add Customer
        </button>
      </div>
    </div>

    <!-- Customer stats cards -->
    <div class="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      <div 
        v-for="stat in customerStats" 
        :key="stat.label"
        class="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-all"
        :class="stat.borderClass"
      >
        <div class="mb-3 flex items-start justify-between">
          <span class="text-3xl font-black text-[#1D3557]">{{ stat.value }}</span>
          <span 
            class="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-tight"
            :class="stat.badgeClass"
          >
            {{ stat.label }}
          </span>
        </div>
        <div class="h-1.5 rounded-full bg-[#A8DADC]/30 overflow-hidden">
          <div 
            class="h-full rounded-full transition-all duration-700"
            :class="stat.progressClass"
            :style="{ width: stat.percentage + '%' }"
          >
          </div>
        </div>
        <p class="mt-2 text-[10px] text-[#457B9D]/70 italic">{{ stat.description }}</p>
      </div>
    </div>

    <!-- Customer table -->
    <div class="rounded-2xl border border-[#A8DADC]/40 bg-white shadow-sm overflow-hidden">
      <div class="flex items-center justify-between border-b border-[#A8DADC]/30 px-6 py-4">
        <h3 class="font-bold text-[#1D3557]">Customer Records</h3>
        <button class="text-sm font-semibold text-[#457B9D] hover:text-[#1D3557] transition-colors">
          View All →
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-[#A8DADC]/20 bg-[#F1FAEE]">
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Name</th>
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Email</th>
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Phone</th>
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Address</th>
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Status</th>
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#A8DADC]/20">
            <tr 
              v-for="customer in customers" 
              :key="customer.uuid" 
              class="hover:bg-[#F1FAEE]/60 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#457B9D] text-xs font-bold text-white">
                    {{ getInitials(customer.name) }}
                  </div>
                  <span class="font-semibold text-[#1D3557]">{{ customer.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-[#457B9D]">{{ customer.email }}</td>
              <td class="px-6 py-4 text-sm text-[#1D3557]">{{ customer.phone || '-' }}</td>
              <td class="px-6 py-4 text-sm text-[#457B9D] max-w-[200px] truncate">
                {{ customer.address || '-' }}
              </td>
              <td class="px-6 py-4">
                <span 
                  class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                  :class="customer.deleted_at ? 'bg-[#D62828]/10 text-[#D62828]' : 'bg-green-100 text-green-700'"
                >
                  <span 
                    class="h-1.5 w-1.5 rounded-full"
                    :class="customer.deleted_at ? 'bg-[#D62828]' : 'bg-green-600'"
                  ></span>
                  {{ customer.deleted_at ? 'Deleted' : 'Active' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <button 
                    @click="openEditModal(customer)"
                    class="rounded-lg bg-[#457B9D]/10 px-3 py-1.5 text-xs font-semibold text-[#457B9D] hover:bg-[#457B9D]/20 transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    v-if="!customer.deleted_at"
                    @click="handleDelete(customer)"
                    class="rounded-lg bg-[#D62828]/10 px-3 py-1.5 text-xs font-semibold text-[#D62828] hover:bg-[#D62828]/20 transition-colors"
                  >
                    Delete
                  </button>
                  <button 
                    v-else
                    @click="handleRestore(customer)"
                    class="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-200 transition-colors"
                  >
                    Restore
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="customers.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-[#457B9D]">
                No customers found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Overlay -->
      <div 
        class="absolute inset-0 bg-[#1D3557]/50" 
        @click="closeModal"
      ></div>
      
      <!-- Modal Content -->
      <div class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-xl font-bold text-[#1D3557]">
            {{ isEdit ? 'Edit Customer' : 'Add Customer' }}
          </h2>
          <button 
            @click="closeModal"
            class="text-2xl text-[#457B9D] hover:text-[#1D3557]"
          >
            ×
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="mb-1 block text-xs font-semibold text-[#457B9D]">Name *</label>
            <input
              v-model="formData.name"
              type="text"
              required
              placeholder="Enter customer name"
              class="w-full rounded-xl border border-[#A8DADC]/60 bg-white px-4 py-2.5 text-sm text-[#1D3557] placeholder:text-[#457B9D]/50 shadow-sm outline-none focus:border-[#457B9D] focus:ring-2 focus:ring-[#457B9D]/20 transition-all"
            />
          </div>

          <div>
            <label class="mb-1 block text-xs font-semibold text-[#457B9D]">Email *</label>
            <input
              v-model="formData.email"
              type="email"
              required
              placeholder="Enter email address"
              class="w-full rounded-xl border border-[#A8DADC]/60 bg-white px-4 py-2.5 text-sm text-[#1D3557] placeholder:text-[#457B9D]/50 shadow-sm outline-none focus:border-[#457B9D] focus:ring-2 focus:ring-[#457B9D]/20 transition-all"
            />
          </div>

          <div>
            <label class="mb-1 block text-xs font-semibold text-[#457B9D]">Phone</label>
            <input
              v-model="formData.phone"
              type="tel"
              placeholder="Enter phone number"
              class="w-full rounded-xl border border-[#A8DADC]/60 bg-white px-4 py-2.5 text-sm text-[#1D3557] placeholder:text-[#457B9D]/50 shadow-sm outline-none focus:border-[#457B9D] focus:ring-2 focus:ring-[#457B9D]/20 transition-all"
            />
          </div>

          <div>
            <label class="mb-1 block text-xs font-semibold text-[#457B9D]">Address</label>
            <textarea
              v-model="formData.address"
              placeholder="Enter address"
              rows="3"
              class="w-full rounded-xl border border-[#A8DADC]/60 bg-white px-4 py-2.5 text-sm text-[#1D3557] placeholder:text-[#457B9D]/50 shadow-sm outline-none focus:border-[#457B9D] focus:ring-2 focus:ring-[#457B9D]/20 transition-all"
            ></textarea>
          </div>

          <div class="flex gap-3 pt-2">
            <button
              type="button"
              @click="closeModal"
              class="flex-1 rounded-xl border border-[#A8DADC]/60 bg-white px-5 py-2.5 text-sm font-semibold text-[#457B9D] hover:bg-[#F1FAEE] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="flex-1 rounded-xl bg-[#457B9D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1D3557] transition-colors disabled:opacity-50"
            >
              {{ loading ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { customerService } from '~/api/customer/CustomerService'

// State
const customers = ref([])
const loading = ref(false)
const error = ref('')
const searchQuery = ref('')

// Modal state
const showModal = ref(false)
const isEdit = ref(false)
const selectedCustomer = ref(null)
const formLoading = ref(false)

// Form data
const formData = ref({
  name: '',
  email: '',
  phone: '',
  address: ''
})

// Computed
const filteredCustomers = computed(() => {
  if (!searchQuery.value) return customers.value
  const query = searchQuery.value.toLowerCase()
  return customers.value.filter(c => 
    c.name.toLowerCase().includes(query) ||
    c.email.toLowerCase().includes(query)
  )
})

const customerStats = computed(() => {
  const total = customers.value.length
  const active = customers.value.filter(c => !c.deleted_at).length
  const deleted = total - active
  
  return [
    { 
      label: 'Total', 
      value: total, 
      borderClass: 'border-[#A8DADC]/40',
      badgeClass: 'bg-[#457B9D]/10 text-[#457B9D]',
      progressClass: 'bg-[#457B9D]',
      percentage: total > 0 ? 100 : 0,
      description: 'All customer records'
    },
    { 
      label: 'Active', 
      value: active, 
      borderClass: 'border-green-300/50',
      badgeClass: 'bg-green-100 text-green-700',
      progressClass: 'bg-green-500',
      percentage: total > 0 ? (active / total) * 100 : 0,
      description: 'Active customers'
    },
    { 
      label: 'Deleted', 
      value: deleted, 
      borderClass: deleted > 0 ? 'border-[#D62828]/30' : 'border-[#A8DADC]/40',
      badgeClass: deleted > 0 ? 'bg-[#D62828]/10 text-[#D62828]' : 'bg-gray-100 text-gray-700',
      progressClass: deleted > 0 ? 'bg-[#D62828]' : 'bg-gray-400',
      percentage: total > 0 ? (deleted / total) * 100 : 0,
      description: 'Soft-deleted records'
    },
  ]
})

// Methods
const getInitials = (name) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const fetchCustomers = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await customerService.list()
    customers.value = response.data || []
  } catch (err) {
    error.value = err.message || 'Failed to fetch customers'
  } finally {
    loading.value = false
  }
}

const openCreateModal = () => {
  isEdit.value = false
  selectedCustomer.value = null
  formData.value = {
    name: '',
    email: '',
    phone: '',
    address: ''
  }
  showModal.value = true
}

const openEditModal = (customer) => {
  isEdit.value = true
  selectedCustomer.value = customer
  formData.value = {
    name: customer.name,
    email: customer.email,
    phone: customer.phone || '',
    address: customer.address || ''
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedCustomer.value = null
}

const handleSubmit = async () => {
  formLoading.value = true
  
  try {
    if (isEdit.value && selectedCustomer.value) {
      await customerService.update(selectedCustomer.value.uuid, formData.value)
    } else {
      await customerService.create(formData.value)
    }
    
    closeModal()
    await fetchCustomers()
  } catch (err) {
    alert(err.message || 'Failed to save customer')
  } finally {
    formLoading.value = false
  }
}

const handleDelete = async (customer) => {
  if (!confirm(`Are you sure you want to delete "${customer.name}"?`)) return
  
  try {
    await customerService.delete(customer.uuid)
    await fetchCustomers()
  } catch (err) {
    alert(err.message || 'Failed to delete customer')
  }
}

const handleRestore = async (customer) => {
  try {
    await customerService.restore(customer.uuid)
    await fetchCustomers()
  } catch (err) {
    alert(err.message || 'Failed to restore customer')
  }
}

// Lifecycle
onMounted(() => {
  fetchCustomers()
})
</script>