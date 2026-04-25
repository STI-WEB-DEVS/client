<template>
  <NuxtLayout>
    <div class="space-y-6">
      
      <!-- Header -->
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">
          View Customer
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Dedicated customer page using the UUID from the route.
        </p>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-6">
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <!-- Customer Details -->
      <div v-else class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        
        <div class="grid grid-cols-3 gap-4 items-center">

          <!-- Name -->
          <p class="text-sm text-gray-500">Customer Name</p>
          <p class="col-span-2 text-lg font-semibold text-gray-900">
            {{ customer?.name || 'N/A' }}
          </p>

          <!-- Email -->
          <p class="text-sm text-gray-500">Email</p>
          <p class="col-span-2 text-gray-700">
            {{ customer?.email || 'N/A' }}
          </p>

          <!-- UUID -->
          <p class="text-sm text-gray-500">Customer UUID</p>
          <p class="col-span-2 font-mono text-gray-900 break-all">
            {{ uuid }}
          </p>

        </div>

      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { customerService } from '~/api/customer/CustomerService'

const route = useRoute()

const customer = ref<any>(null)
const pending = ref(true)
const error = ref<any>(null)

const uuid = ref(String(route.params.uuid ?? ''))

onMounted(async () => {
  if (!uuid.value) {
    error.value = { message: 'Customer UUID is missing from the URL.' }
    pending.value = false
    return
  }

  pending.value = true
  error.value = null

  try {
    const res = await customerService.show(uuid.value)

    // ✅ IMPORTANT FIX (handles Laravel API structure)
    customer.value = res.data ?? res

    console.log('Customer:', customer.value) // optional debug
  } catch (err: any) {
    console.error(err)
    error.value = { message: 'Failed to load customer data. Please check the UUID.' }
  } finally {
    pending.value = false
  }
})
</script>