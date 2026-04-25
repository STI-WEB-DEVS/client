<template>
    <div class="space-y-6">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">
          View Customer
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Details for customer record: {{ uuid }}
        </p>
      </div>

      <div v-if="pending" class="flex justify-center py-12">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        {{ error.message || 'Failed to load customer data.' }}
      </div>

      <div v-else-if="customer" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Full Name</p>
          <p class="mt-1 text-lg font-medium text-gray-900">{{ customer.name }}</p>
        </div>

        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Email Address</p>
          <p class="mt-1 text-lg font-medium text-gray-900">{{ customer.email }}</p>
        </div>

        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Created At</p>
          <p class="mt-1 text-lg font-medium text-gray-900">{{ customer.created_at }}</p>
        </div>
        
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { customerService } from '~/api/customer/CustomerService'

const route = useRoute()
const uuid = String(route.params.uuid ?? '')

// State for the data
const customer = ref<any>(null)
const pending = ref(true)
const error = ref<any>(null)

const fetchCustomerDetails = async () => {
  pending.value = true
  try {
    // Assuming your service has a 'show' or 'get' method that takes a UUID
    const response = await customerService.show(uuid)
    
    // Adjust this based on your API structure (e.g., response.data if wrapped)
    customer.value = response.data || response
  } catch (err: any) {
    error.value = err
    console.error('Error fetching customer:', err)
  } finally {
    pending.value = false
  }
}

onMounted(() => {
  if (uuid) {
    fetchCustomerDetails()
  }
})
</script>