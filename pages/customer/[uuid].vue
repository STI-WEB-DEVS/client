<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          @click="goBackToCustomers"
        >
          <span>&larr;</span>
          <span>Back to Customers</span>
        </button>
      </div>

      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">
          View Customer
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Dedicated customer page using the UUID from the route.
        </p>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error }}</p>
      </div>

      <div v-else class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <dl class="grid gap-6 sm:grid-cols-2">
          <div>
            <dt class="text-sm text-gray-500">Customer Name</dt>
            <dd class="mt-2 text-base font-medium text-gray-900">
              {{ customer?.name || 'N/A' }}
            </dd>
          </div>

          <div>
            <dt class="text-sm text-gray-500">Customer Email</dt>
            <dd class="mt-2 text-base font-medium text-gray-900">
              {{ customer?.email || 'N/A' }}
            </dd>
          </div>

          <div class="sm:col-span-2">
            <dt class="text-sm text-gray-500">Customer UUID</dt>
            <dd class="mt-2 break-all text-base font-medium text-gray-900">
              {{ customer?.uuid || uuid }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { customerService } from '~/api/customer/CustomerService'

const route = useRoute()
const router = useRouter()

type Customer = {
  id: number;
  uuid: string;
  name: string;
  email: string;
}

const uuid = computed(() => String(route.params.uuid ?? ''))
const customer = ref<Customer | null>(null)
const pending = ref(true)
const error = ref('')

const fetchCustomer = async () => {
  pending.value = true
  error.value = ''

  try {
    const response = await customerService.show(uuid.value) as Customer | { data?: Customer }
    customer.value = 'data' in response ? (response.data ?? null) : response
  } catch (err: any) {
    error.value = err?.message || 'Unable to load customer.'
  } finally {
    pending.value = false
  }
}

const goBackToCustomers = () => {
  router.push('/customer')
}

onMounted(fetchCustomer)
</script>
