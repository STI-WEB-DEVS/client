<template>
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
              <button @click="viewCustomer(customer.uuid)" class="text-blue-400 hover:text-blue-300 transition-colors">
                <EyeIcon class="size-4" />
              </button>
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
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
// Import the service instance directly
import { customerService } from '~/api/Customer/CustomerService' 

const customerList = ref<any[]>([])
const pending = ref(false)
const isModalOpen = ref(false)
const submitting = ref(false)
const editingCustomer = ref<any>({})

const form = reactive({
  name: '',
  email: ''
})

// READ: Uses the list() method from your new service
const fetchCustomers = async () => {
  pending.value = true
  try {
    const response = await customerService.list() 
    customerList.value = response.data || []
  } catch (error: any) {
    console.error("Fetch Error:", error.message)
  } finally {
    pending.value = false
  }
}

// CREATE & UPDATE: Uses create() and update() from your service
const saveCustomer = async () => {
  submitting.value = true
  const uuid = editingCustomer.value?.uuid

  try {
    // Create a clean payload object
    const payload = {
      name: form.name,
      email: form.email
    }

    if (uuid) {
      // Calls updateCustomer in backend
      await customerService.update(uuid, payload)
    } else {
      // Calls createCustomer in backend
      await customerService.create(payload)
    }
    
    await fetchCustomers() 
    isModalOpen.value = false
    
    // Reset form after successful creation
    Object.assign(form, { name: '', email: '' })
    editingCustomer.value = {}
  } catch (error: any) {
    // BaseService throws a standard Error object with the backend message
    alert(error.message) 
  } finally {
    submitting.value = false
  }
}

// DELETE: Uses the delete() method
const deleteCustomer = async (uuid: string) => {
  if (confirm('Are you sure?')) {
    try {
      await customerService.delete(uuid)
      await fetchCustomers()
    } catch (error: any) {
      console.error(error.message)
    }
  }
}

const openModal = (customer: any = null) => {
  if (customer) {
    editingCustomer.value = { ...customer }
    form.name = customer.name
    form.email = customer.email
  } else {
    // CRITICAL: Reset these to ensure 'saveCustomer' hits the 'else' block
    editingCustomer.value = {} 
    form.name = ''
    form.email = ''
  }
  isModalOpen.value = true
}

const viewCustomer = (uuid: string) => {
  // This must match your file structure: pages/customers/[id].vue
  navigateTo(`/customers/${uuid}`)
}

onMounted(() => {
  fetchCustomers()
})
</script>