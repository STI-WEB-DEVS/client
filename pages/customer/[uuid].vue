<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">
            Customer Profile
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            Detailed information for the selected customer.
          </p>
        </div>
        <NuxtLink 
          to="/customer" 
          class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          &larr; Back to List
        </NuxtLink>
      </div>

      <div v-if="pending" class="flex justify-center py-12">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">Failed to load customer: {{ error.message }}</p>
      </div>

      <div v-else-if="customer" class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="px-6 py-5 border-b border-gray-100 bg-gray-50">
          <h3 class="text-lg font-medium text-gray-900">{{ customer.name }}</h3>
        </div>
        <div class="px-6 py-6 space-y-4">
          <div>
            <p class="text-sm font-medium text-gray-500">Email Address</p>
            <p class="mt-1 text-base text-gray-900">{{ customer.email }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Customer UUID</p>
            <p class="mt-1 break-all text-sm font-mono text-gray-600 bg-gray-50 p-2 rounded">
              {{ customer.uuid }}
            </p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Account Created</p>
            <p class="mt-1 text-base text-gray-900">
              {{ customer.created_at || 'N/A' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { customerService } from '~/api/customer/CustomerService'

const route = useRoute()
const uuid = computed(() => String(route.params.uuid ?? ''))

const customer = ref<any>(null)
const pending = ref(true)
const error = ref<any>(null)

// Fetch the data from the Laravel API
const fetchCustomerData = async () => {
  pending.value = true
  try {
    // This calls your ProductController@show logic (adapted for Customers)
    const response = await customerService.show(uuid.value)
    customer.value = response.data
  } catch (err: any) {
    error.value = err
  } finally {
    pending.value = false
  }
}

onMounted(fetchCustomerData)
</script>