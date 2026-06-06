<template>
  <div class="p-8 bg-[#FDFCFB] min-h-screen font-sans text-slate-900">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div>
        <h1 class="text-3xl font-black text-[#2D2424] tracking-tight">Customers</h1>
        <p class="text-gray-500 mt-1">Manage customer records for orders and delivery coordination.</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative">
          <MagnifyingGlassIcon class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            v-model="search"
            type="text"
            placeholder="Search customers..."
            class="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none w-64 transition-all"
          />
        </div>
        <button
          class="bg-[#5D4037] hover:bg-[#4E342E] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 flex items-center gap-2"
          @click="openCustomerForm"
        >
          <PlusIcon class="w-5 h-5" />
          <span>Add Customer</span>
        </button>
      </div>
    </header>

    <div v-if="errorMessage" class="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
      {{ errorMessage }}
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div class="flex items-center gap-3">
          <div class="w-2 h-6 bg-[#FFB300] rounded-full"></div>
          <h3 class="text-lg font-bold text-[#2D2424]">Customer List</h3>
        </div>
        <span class="text-xs font-black uppercase tracking-widest text-gray-400">{{ filteredCustomers.length }} records</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-white">
              <th class="px-8 py-5">Name</th>
              <th class="px-8 py-5">Email</th>
              <th class="px-8 py-5">Customer ID</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="isLoading" class="text-sm font-bold text-gray-400">
              <td colspan="3" class="px-8 py-10 text-center">Loading customers...</td>
            </tr>
            <tr v-else-if="filteredCustomers.length === 0" class="text-sm font-bold text-gray-400">
              <td colspan="3" class="px-8 py-10 text-center">No customers found.</td>
            </tr>
            <template v-else>
              <tr
                v-for="customer in filteredCustomers"
                :key="customer.uuid || customer.id"
                class="hover:bg-amber-50/20 transition-colors"
              >
                <td class="px-8 py-5 text-sm font-bold text-gray-900">{{ customer.name }}</td>
                <td class="px-8 py-5 text-sm text-gray-600">{{ customer.email }}</td>
                <td class="px-8 py-5 text-sm font-mono font-bold text-[#5D4037]">{{ customer.uuid || customer.id }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showCustomerForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div class="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-100">
        <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-lg font-black text-[#2D2424]">Add Customer</h2>
          <button class="text-gray-400 hover:text-gray-700" @click="closeCustomerForm">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <form class="p-6 space-y-4" @submit.prevent="saveCustomer">
          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Customer Name</label>
            <input
              v-model.trim="customerForm.name"
              type="text"
              required
              class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Example: Amara Reyes"
            />
          </div>

          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Gmail</label>
            <input
              v-model.trim="customerForm.email"
              type="email"
              required
              class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="customer@gmail.com"
            />
          </div>

          <div v-if="formError" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {{ formError }}
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button type="button" class="px-5 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50" @click="closeCustomerForm">
              Cancel
            </button>
            <button
              type="submit"
              class="px-5 py-3 rounded-xl text-sm font-bold text-white bg-[#5D4037] hover:bg-[#4E342E] disabled:opacity-60"
              :disabled="isSaving"
            >
              {{ isSaving ? 'Saving...' : 'Save Customer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { customerService } from '~/api/customer/CustomerService'

const customers = ref([])
const search = ref('')
const isLoading = ref(false)
const isSaving = ref(false)
const showCustomerForm = ref(false)
const errorMessage = ref('')
const formError = ref('')
const customerForm = ref({ name: '', email: '' })

const filteredCustomers = computed(() => {
  const keyword = search.value.toLowerCase()

  return customers.value.filter((customer) => {
    return `${customer.name || ''} ${customer.email || ''}`.toLowerCase().includes(keyword)
  })
})

onMounted(fetchCustomers)

async function fetchCustomers() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await customerService.list()
    customers.value = Array.isArray(response?.data) ? response.data : []
  } catch (error) {
    errorMessage.value = error.message || 'Unable to load customers.'
  } finally {
    isLoading.value = false
  }
}

function openCustomerForm() {
  formError.value = ''
  customerForm.value = { name: '', email: '' }
  showCustomerForm.value = true
}

function closeCustomerForm() {
  showCustomerForm.value = false
}

async function saveCustomer() {
  isSaving.value = true
  formError.value = ''

  try {
    const response = await customerService.create({
      name: customerForm.value.name,
      email: customerForm.value.email,
    })

    const created = response?.data || response
    customers.value = [created, ...customers.value]
    closeCustomerForm()
  } catch (error) {
    formError.value = error.message || 'Unable to save customer.'
  } finally {
    isSaving.value = false
  }
}
</script>
