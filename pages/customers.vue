<template>
  <NuxtLayout>
    <div class="space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="font-['Syne'] text-2xl font-bold text-[#CFFFB3]">Customer Management</h1>
          <p class="mt-1 font-['DM_Mono'] text-sm text-[#ADE25D]/70">Manage your hiker database and profiles</p>
        </div>
        <button 
          @click="openModal()"
          class="font-['DM_Mono'] text-[10px] font-bold uppercase tracking-[0.15em] bg-[#ADE25D] text-[#1E2F23] px-4 py-2 rounded-sm hover:bg-[#CFFFB3] transition-colors shadow-[4px_4px_0px_0px_#3B7080]"
        >
          + Add New Customer
        </button>
      </div>

      <div v-if="pending" class="text-[#ADE25D] font-['DM_Mono'] text-xs animate-pulse">
        Fetching records from database...
      </div>

      <div v-else class="bg-[#3B7080]/20 border border-[#3B7080] rounded-sm overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-[#3B7080] bg-[#3B7080]/30">
              <th class="px-6 py-4 font-['DM_Mono'] text-[10px] uppercase tracking-widest text-[#ADE25D]">Name</th>
              <th class="px-6 py-4 font-['DM_Mono'] text-[10px] uppercase tracking-widest text-[#ADE25D]">Email</th>
              <th class="px-6 py-4 font-['DM_Mono'] text-[10px] uppercase tracking-widest text-[#ADE25D] text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#3B7080]/40">
            <tr v-for="customer in customerList" :key="customer.uuid" class="hover:bg-[#3B7080]/10 transition-colors">
              <td class="px-6 py-4 font-['Syne'] text-sm text-[#CFFFB3]">{{ customer.name }}</td>
              <td class="px-6 py-4 font-['DM_Mono'] text-xs text-[#ADE25D]/70">{{ customer.email }}</td>
              <td class="px-6 py-4 text-right space-x-3">
                <button @click="openModal(customer)" class="text-[#ADE25D] hover:text-[#CFFFB3] transition-colors">
                  <PencilSquareIcon class="size-4" />
                </button>
                <button @click="deleteCustomer(customer.uuid)" class="text-red-400 hover:text-red-300 transition-colors">
                  <TrashIcon class="size-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div class="bg-[#1E2F23] border border-[#ADE25D]/30 p-8 w-full max-w-md shadow-2xl">
          <h2 class="font-['Syne'] text-xl font-bold text-[#CFFFB3] mb-6">
            {{ editingCustomer.uuid ? 'Edit Customer' : 'Add New Customer' }}
          </h2>
          
          <form @submit.prevent="saveCustomer" class="space-y-4">
            <div>
              <label class="block font-['DM_Mono'] text-[10px] uppercase text-[#ADE25D] mb-1">Full Name</label>
              <input v-model="form.name" type="text" required class="w-full bg-[#3B7080]/20 border border-[#3B7080] p-2 text-[#CFFFB3] font-['Syne'] focus:outline-none focus:border-[#ADE25D]" />
            </div>
            <div>
              <label class="block font-['DM_Mono'] text-[10px] uppercase text-[#ADE25D] mb-1">Email Address</label>
              <input v-model="form.email" type="email" required class="w-full bg-[#3B7080]/20 border border-[#3B7080] p-2 text-[#CFFFB3] font-['DM_Mono'] focus:outline-none focus:border-[#ADE25D]" />
            </div>
                        
            <div class="flex justify-end gap-3 mt-8">
              <button type="button" @click="isModalOpen = false" class="font-['DM_Mono'] text-[10px] uppercase text-[#ADE25D]/60 hover:text-[#ADE25D]">Cancel</button>
              <button type="submit" :disabled="submitting" class="font-['DM_Mono'] text-[10px] font-bold uppercase bg-[#ADE25D] text-[#1E2F23] px-6 py-2 rounded-sm shadow-[4px_4px_0px_0px_#3B7080] disabled:opacity-50">
                {{ submitting ? 'Saving...' : (editingCustomer.uuid ? 'Update Customer' : 'Create Customer') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import BaseService from '@/api/BaseService' // Adjust path as needed

// Initialize the service
const api = new BaseService()
const customerList = ref<any[]>([])
const pending = ref(false)
const isModalOpen = ref(false)
const submitting = ref(false)
const editingCustomer = ref<any>({})

const form = reactive({
  name: '',
  email: ''
})

// READ: Fetch customers using the BaseService request helper

const fetchCustomers = async () => {
  pending.value = true
  try {
    // Laravel Paginated Response structure: { data: [...], links: {...}, meta: {...} }
    const response = await api.request<any>('/customers', 'GET')
    
    // Assign the data array to your list variable
    customerList.value = response.data || []
  } catch (error: any) {
    console.error("Fetch Error:", error.message)
  } finally {
    pending.value = false
  }
}

const openModal = (customer: any = null) => {
  if (customer) {
    editingCustomer.value = { ...customer }
    form.name = customer.name
    form.email = customer.email
  } else {
    editingCustomer.value = {}
    form.name = ''
    form.email = ''
  }
  isModalOpen.value = true
}

// CREATE & UPDATE: Unified save logic
const saveCustomer = async () => {
  submitting.value = true
  
  // Identify if we use the UUID for the path (Update) or the base endpoint (Create)
  const uuid = editingCustomer.value?.uuid
  const url = uuid ? `/customers/${uuid}` : '/customers'
  const method = uuid ? 'PUT' : 'POST'

  try {
    // BaseService handles the headers and baseURL automatically
    await api.request(url, method, {
      name: form.name,
      email: form.email,
    })
    
    await fetchCustomers() // Refresh list
    isModalOpen.value = false
  } catch (error: any) {
    alert(error.message) // Uses the error mapping from BaseService
  } finally {
    submitting.value = false
  }
}

// DELETE: Uses the uuid string required by CustomerService.php
const deleteCustomer = async (uuid: string) => {
  if (confirm('Are you sure you want to remove this customer?')) {
    try {
      await api.request(`/customers/${uuid}`, 'DELETE')
      await fetchCustomers()
    } catch (error: any) {
      console.error(error.message)
    }
  }
}

onMounted(() => {
  fetchCustomers()
})
</script>