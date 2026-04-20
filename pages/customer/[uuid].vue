<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">
          View Customer
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Details for the selected customer.
        </p>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <!-- Customer Details -->
      <div v-else class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <p class="text-sm text-gray-500">UUID</p>
          <p class="mt-2 break-all text-base font-medium text-gray-900">
            {{ customer?.uuid ?? customer?.data?.uuid ?? '—' }}
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
const uuid = String(route.params.uuid ?? '')

const customer = ref<any>(null)
const pending = ref(true)
const error = ref<any>(null)

const fetchCustomer = async () => {
  pending.value = true
  error.value = null

  try {
    customer.value = await customerService.show(uuid)
    console.log('Fetched customer:', customer.value) // 👈 log to confirm shape
  } catch (err: any) {
    error.value = err
  } finally {
    pending.value = false
  }
}

onMounted(fetchCustomer)
</script>
