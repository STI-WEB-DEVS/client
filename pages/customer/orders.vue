<script setup>
import { ref, onMounted } from 'vue'
import { orderService } from '~/api/order/OrderService'
import { AuthService } from '~/api/auth/AuthService'

definePageMeta({
  layout: 'customer'
})

const orders = ref([])
const isLoading = ref(true)
const error = ref('')


onMounted(async () => {
  await fetchOrders()
})

const fetchOrders = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const customerUuid = localStorage.getItem('_customer_uuid') || ''
    if (!customerUuid) {
      error.value = 'No customer UUID found. Please log in again.'
      return
    }
    const response = await orderService.listByCustomer(customerUuid)
    orders.value = response?.data || response || []
  } catch (err) {
    error.value = err?.message || 'Failed to load orders.'
  } finally {
    isLoading.value = false
  }
}

const authService = new AuthService()

const handleLogout = async () => {
  try {
    await authService.logout()
  } catch (err) {
    console.warn('Logout API failed:', err)
  } finally {
    authService.clearToken()
    localStorage.removeItem('_role')
    localStorage.removeItem('_uuid')
    localStorage.removeItem('_customer_uuid')
    await navigateTo('/')
  }
}
</script>

<template>
  <section class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
    <div class="mb-10 flex items-start justify-between">
      <div>
        <p class="text-sm font-semibold uppercase tracking-widest text-indigo-600">History</p>
        <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">My Orders</h1>
        <p class="mt-2 text-base text-gray-500">View all your past orders.</p>
      </div>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <div class="flex flex-col items-center gap-4">
        <svg class="h-10 w-10 animate-spin text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span class="text-sm text-gray-500">Loading orders…</span>
      </div>
    </div>

    <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <p class="text-sm font-medium text-red-700">{{ error }}</p>
      <button @click="fetchOrders" class="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
        Retry
      </button>
    </div>

    <div v-else-if="orders.length === 0" class="flex flex-col items-center gap-4 py-20 text-center">
      <span class="text-6xl">📋</span>
      <h2 class="text-xl font-semibold text-gray-700">No orders yet</h2>
      <p class="text-sm text-gray-500">Place your first order to see it here!</p>
      <NuxtLink
        to="/customer/shop"
        class="mt-4 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Start Shopping
      </NuxtLink>
    </div>

    <div v-else class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table class="w-full">
        <thead class="border-b border-gray-200 bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Order #</th>
            <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Items</th>
            <th class="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Total</th>
            <th class="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="order in orders" :key="order.uuid" class="transition-colors hover:bg-gray-50/50">
            <td class="whitespace-nowrap px-6 py-4">
              <span class="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
                {{ order.uuid?.slice(0, 8) }}…
              </span>
            </td>
            <td class="px-6 py-4">
              <div v-if="order.items && order.items.length" class="flex flex-col gap-1">
                <span v-for="item in order.items" :key="item.product_uuid || item.id" class="text-xs text-gray-600">
                  {{ item.product?.name || item.product_uuid || 'Product' }} × {{ item.quantity }}
                </span>
              </div>
              <span v-else class="text-xs text-gray-400">—</span>
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-right text-sm font-semibold text-gray-900">
              ₱{{ Number(order.total_amount || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-right text-xs text-gray-500">
              {{ order.created_at ? new Date(order.created_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' }) : '—' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>




  </section>
</template>
