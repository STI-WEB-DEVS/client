<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div v-if="pending" class="text-[#ADE25D] font-['DM_Mono'] text-sm animate-pulse">
      Accessing hiker profile {{ $route.params.id }}...
    </div>

    <div v-else-if="customer" class="bg-[#3B7080]/20 border border-[#3B7080] p-8 rounded-sm">
      <div class="flex justify-between items-start mb-8">
        <div>
          <h1 class="font-['Syne'] text-3xl font-bold text-[#CFFFB3]">{{ customer.name }}</h1>
          <p class="font-['DM_Mono'] text-[#ADE25D]/70 uppercase tracking-widest text-[10px] mt-1">
            UUID: {{ customer.uuid }}
          </p>
        </div>
        <button 
          @click="navigateTo('/customers')" 
          class="font-['DM_Mono'] text-[10px] text-[#ADE25D] border border-[#ADE25D]/30 px-3 py-1 hover:bg-[#ADE25D]/10 transition-colors"
        >
          ← Back to Database
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-4">
          <div>
            <label class="block font-['DM_Mono'] text-[10px] uppercase text-[#ADE25D]/50">Email Address</label>
            <p class="font-['DM_Mono'] text-[#CFFFB3]">{{ customer.email }}</p>
          </div>
          </div>
      </div>
    </div>

    <div v-else class="text-red-400 font-['DM_Mono'] text-sm">
      Customer record not found.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// Use the service instance
import { customerService } from '~/api/Customer/CustomerService' 

const route = useRoute()
const customer = ref<any>(null)
const pending = ref(true)

const loadCustomer = async () => {
  pending.value = true
  try {
    // The response from the backend is { data: { name: '...', email: '...' } }
    const response = await customerService.show(route.params.id as string)
    
    // Assign response.data so the template can access customer.name directly
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