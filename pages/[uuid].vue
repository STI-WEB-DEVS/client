<template>
  <NuxtLayout>
    <div class="p-8 bg-gray-50 min-h-screen">
      <div class="max-w-4xl mx-auto">
        <button 
          @click="navigateTo('/customers')" 
          class="mb-6 flex items-center text-sm font-medium text-gray-500 hover:text-[#2d4123] transition-colors"
        >
          <span class="mr-2">←</span> Back to Management
        </button>

        <div v-if="customer" class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="bg-[#8fa386] h-32 w-full relative">
            <div class="absolute -bottom-10 left-8 bg-white p-1.5 rounded-full shadow-md">
              <div class="bg-gray-100 h-20 w-20 rounded-full flex items-center justify-center text-3xl font-bold text-[#2d4123] border border-gray-100">
                {{ customer.name?.charAt(0).toUpperCase() }}
              </div>
            </div>
          </div>

          <div class="pt-16 px-8 pb-10">
            <div class="flex justify-between items-start">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 tracking-tight">{{ customer.name }}</h1>
                <p class="text-lg text-gray-500">{{ customer.email }}</p>
              </div>
              <span class="inline-flex items-center rounded-full bg-green-50 px-4 py-1.5 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
                Active Hiker
              </span>
            </div>

            <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-1">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Unique Identifier</h3>
                <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p class="text-sm font-mono text-gray-600 break-all">{{ customer.uuid }}</p>
                </div>
              </div>
              
              <div class="space-y-1">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Account Created</h3>
                <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p class="text-sm text-gray-700 font-medium">
                    {{ customer.created_at ? new Date(customer.created_at).toLocaleDateString() : 'May 12, 2026' }}
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-12">
              <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Trail History</h3>
              <div class="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p class="text-sm text-gray-500">No hiking activity recorded yet for this user.</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <p class="text-gray-500 italic">Hiker data not found.</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { customerService } from '~/api/customer/CustomerService';

const route = useRoute();
const customer = ref<any>(null);
const isLoading = ref(true);

const fetchCustomerDetails = async () => {
  const uuid = route.params.uuid as string;
  
  try {
    isLoading.value = true;
    // Calling your service's show method
    const response = await customerService.show(uuid);
    
    // Accommodate both { data: ... } and direct responses
    customer.value = response.data || response;
  } catch (err: any) {
    console.error("Failed to load customer:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchCustomerDetails();
});
</script>