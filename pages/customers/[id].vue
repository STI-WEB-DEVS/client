<template>
  <div class="p-8 max-w-5xl mx-auto">
    <div class="mb-8 flex items-center justify-between">
      <button 
        @click="navigateTo('/customers')" 
        class="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors"
      >
        <span class="transition-transform group-hover:-translate-x-1">←</span> 
        Back to Customer Directory
      </button>
      
      <div v-if="customer" class="flex gap-2">
        <span class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
          Active Profile
        </span>
      </div>
    </div>

    <div v-if="pending" class="flex flex-col items-center justify-center p-20 bg-white border border-slate-200 rounded-3xl shadow-sm">
      <div class="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
      <p class="mt-4 text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Retrieving Profile...</p>
    </div>

    <div v-else-if="customer" class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div class="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div class="relative flex flex-col md:flex-row items-center gap-8">
          <div class="w-32 h-32 rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-4xl font-black shadow-2xl shadow-emerald-500/20">
            {{ customer.name?.charAt(0) }}
          </div>
          <div class="text-center md:text-left">
            <h1 class="text-4xl font-black tracking-tight mb-2">{{ customer.name }}</h1>
            <div class="flex flex-wrap justify-center md:justify-start gap-4">
              <div class="flex items-center gap-2 text-slate-400">
                <span class="text-lg">📧</span>
                <span class="text-sm font-medium">{{ customer.email }}</span>
              </div>
              <div class="flex items-center gap-2 text-slate-400">
                <span class="text-lg">🆔</span>
                <span class="text-[10px] font-mono uppercase tracking-widest">{{ customer.uuid }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div class="md:col-span-2 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <h3 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Account Details</h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div class="space-y-1">
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Legal Name</label>
              <p class="text-slate-900 font-bold text-lg">{{ customer.name }}</p>
            </div>
            <div class="space-y-1">
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
              <p class="text-slate-900 font-bold text-lg">{{ customer.email }}</p>
            </div>
            <div class="space-y-1">
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member Since</label>
              <p class="text-slate-600 font-medium italic">Data sync pending...</p>
            </div>
          </div>
        </div>

        <div class="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-8">
          <h3 class="text-xs font-black text-emerald-800/40 uppercase tracking-[0.2em] mb-6">Profile Health</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-emerald-100">
              <span class="text-xs font-bold text-slate-500 uppercase">Verification</span>
              <span class="text-emerald-600 text-xs font-black">ACTIVE</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-emerald-100">
              <span class="text-xs font-bold text-slate-500 uppercase">System Sync</span>
              <span class="text-emerald-600 text-xs font-black">100%</span>
            </div>
          </div>
          
          <button 
            @click="navigateTo('/customers')"
            class="w-full mt-8 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
          >
            Edit Profile
          </button>
        </div>

      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center p-20 text-center">
      <div class="text-5xl mb-4">⚠️</div>
      <h3 class="text-xl font-black text-slate-900">Record Not Found</h3>
      <p class="text-slate-500 mt-2">The customer with UUID <strong>{{ $route.params.id }}</strong> does not exist or has been removed.</p>
      <button @click="navigateTo('/customers')" class="mt-6 text-emerald-600 font-bold hover:underline italic">Return to directory</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, navigateTo } from '#app'
import { customerService } from '~/api/customer/CustomerService'

const route = useRoute()
const customer = ref<any>(null)
const pending = ref(true)

const loadCustomer = async () => {
    pending.value = true
    try {
        const response = await customerService.show(route.params.id as string)
        customer.value = response.data
    } catch (error: any) {
        console.error("Profile Load Error:", error.message)
    } finally {
        pending.value = false
    }
}

onMounted(() => {
    if (route.params.id) {
        loadCustomer()
    }
})
</script>