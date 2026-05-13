<template>
  <div class="p-8 max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div>
        <h2 class="text-3xl font-black text-slate-900 tracking-tight">Customers</h2>
        <p class="text-slate-500 mt-1">Directory of users, drivers, and parking permit holders.</p>
      </div>
      
      <div class="flex items-center gap-3">
        <div class="relative group">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">🔍</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search name or email..."
            class="pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all w-64 shadow-sm"
          >
        </div>

        <button 
          @click="openModal()"
          class="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-xl shadow-slate-200"
        >
          <span class="text-lg">+</span> Add Customer
        </button>
      </div>
    </div>

    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
      
      <div v-if="pending" class="flex-1 flex flex-col items-center justify-center p-12">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
          <div class="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p class="mt-4 text-slate-400 font-bold text-sm uppercase tracking-widest">Syncing Database...</p>
      </div>

      <div v-else-if="filteredList.length === 0" class="flex-1 flex flex-col items-center justify-center p-16 text-center">
        <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-3xl mb-4">👥</div>
        <h3 class="text-lg font-bold text-slate-900">No customers found</h3>
        <p class="text-slate-500 max-w-xs mx-auto mb-6">We couldn't find any customers matching your criteria. Try adjusting your search or add a new user.</p>
        <button @click="openModal()" class="text-emerald-600 font-bold text-sm hover:underline">Add your first customer →</button>
      </div>

      <div v-else class="overflow-x-auto flex-1">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-100">
              <th class="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Profile</th>
              <th class="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact Information</th>
              <th class="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="customer in filteredList" :key="customer.uuid" class="hover:bg-slate-50/80 transition-colors group">
              <td class="px-8 py-5">
                <div class="flex items-center gap-4">
                  <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                    {{ customer.name?.charAt(0) || '?' }}
                  </div>
                  <div>
                    <div class="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{{ customer.name }}</div>
                    <div class="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">{{ customer.uuid.split('-')[0] }}...</div>
                  </div>
                </div>
              </td>
              <td class="px-8 py-5">
                <div class="text-sm text-slate-600 font-medium">{{ customer.email }}</div>
                <div class="flex items-center gap-2 mt-1">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span class="text-[10px] font-bold text-slate-400 uppercase">Verified Account</span>
                </div>
              </td>
              <td class="px-8 py-5 text-right">
                <div class="flex justify-end items-center gap-1">
                  <button @click="viewCustomer(customer.uuid)" class="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl hover:shadow-sm transition-all" title="View Profile">
                    👁️
                  </button>
                  <button @click="openModal(customer)" class="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl hover:shadow-sm transition-all" title="Edit Profile">
                    ✏️
                  </button>
                  <div class="w-[1px] h-4 bg-slate-200 mx-1"></div>
                  <button @click="deleteCustomer(customer.uuid)" class="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all" title="Delete Account">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center px-8">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing {{ filteredList.length }} Results</p>
      </div>
    </div>

    <Teleport to="body">
        <div v-if="isModalOpen" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
            <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-300">
                <div class="p-10">
                    <div class="flex justify-between items-start mb-8">
                        <div>
                            <h3 class="text-2xl font-black text-slate-900 tracking-tight">
                            {{ editingCustomer?.uuid ? 'Update Profile' : 'New Customer' }}
                            </h3>
                            <p class="text-slate-500 text-sm mt-1">Fill in the required information below.</p>
                        </div>
                    <button @click="isModalOpen = false" class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors">✕</button>
                    </div>
                
                    <form @submit.prevent="saveCustomer" class="space-y-6">
                        <div class="grid grid-cols-1 gap-6">
                            <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                            <input 
                                v-model="form.name" 
                                type="text" 
                                class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300" 
                                placeholder="Enter full legal name"
                                required
                            >
                            </div>
                            <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                            <input 
                                v-model="form.email" 
                                type="email" 
                                class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300" 
                                placeholder="name@company.com"
                                required
                            >
                            </div>
                        </div>

                        <div class="flex gap-4 pt-4">
                            <button 
                            type="submit" 
                            class="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
                            :disabled="submitting"
                            >
                            <span v-if="submitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            {{ submitting ? 'Saving...' : (editingCustomer?.uuid ? 'Save Changes' : 'Create Customer') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { customerService } from '~/api/customer/CustomerService' 

const customerList = ref<any[]>([])
const pending = ref(false)
const isModalOpen = ref(false)
const submitting = ref(false)
const editingCustomer = ref<any>({})
const searchQuery = ref('')

const form = reactive({
  name: '',
  email: ''
})

// Search logic
const filteredList = computed(() => {
  if (!searchQuery.value) return customerList.value
  return customerList.value.filter(c => 
    c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

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

const saveCustomer = async () => {
  submitting.value = true
  const uuid = editingCustomer.value?.uuid

  try {
    const payload = {
      name: form.name,
      email: form.email
    }

    if (uuid) {
      await customerService.update(uuid, payload)
    } else {
      await customerService.create(payload)
    }
    
    await fetchCustomers() 
    isModalOpen.value = false
    
    Object.assign(form, { name: '', email: '' })
    editingCustomer.value = {}
  } catch (error: any) {
    alert(error.message) 
  } finally {
    submitting.value = false
  }
}

const deleteCustomer = async (uuid: string) => {
  if (confirm('Delete this customer? This action cannot be undone.')) {
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
    editingCustomer.value = {} 
    form.name = ''
    form.email = ''
  }
  isModalOpen.value = true
}

const viewCustomer = (uuid: string) => {
  navigateTo(`/customers/${uuid}`)
}

onMounted(() => {
  fetchCustomers()
})
</script>