<template>
  <div class="mt-16 mx-auto max-w-7xl">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900">My Dashboard</h2>
        <p class="mt-2 text-sm text-gray-600">
          View your order history and manage your account.
        </p>
      </div>
      <button
        @click="handleLogout"
        class="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Sign out
      </button>
    </div>

    <!-- Orders Section -->
    <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div class="border-b border-gray-200 bg-gray-50 px-6 py-5">
        <h3 class="text-lg font-semibold text-gray-900">Recent Orders</h3>
      </div>
      
      <div v-if="isLoading" class="p-8 text-center text-sm text-gray-500">
        Loading your orders...
      </div>
      
      <div v-else-if="error" class="p-8 text-center text-sm text-red-600">
        {{ error }}
      </div>
      
      <div v-else-if="orders.length === 0" class="p-12 text-center">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
          <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        <h3 class="mt-4 text-base font-semibold text-gray-900">No orders found</h3>
        <p class="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
        <button
          @click="scrollToShop"
          class="mt-6 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Start Shopping
        </button>
      </div>

      <ul v-else class="divide-y divide-gray-200">
        <li v-for="order in orders" :key="order.uuid" class="px-6 py-6 transition-colors hover:bg-gray-50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-indigo-600">
                Order #{{ order.id }}
              </p>
              <p class="mt-1 text-sm text-gray-500">
                Placed on <time :datetime="order.created_at">{{ new Date(order.created_at).toLocaleDateString() }}</time>
              </p>
            </div>
            <div class="text-right">
              <p class="text-base font-bold text-gray-900">
                ₱{{ Number(order.total_amount).toLocaleString() }}
              </p>
              <p class="mt-1 text-sm font-medium text-green-600">
                Completed
              </p>
            </div>
          </div>
          
          <!-- Order Items -->
          <div class="mt-4">
            <h4 class="text-xs font-semibold uppercase tracking-wider text-gray-500">Items</h4>
            <ul class="mt-2 divide-y divide-gray-100 border-t border-gray-100">
              <li v-for="item in order.items" :key="item.id" class="flex justify-between py-2 text-sm">
                <span class="text-gray-700">{{ item.product?.name || 'Unknown Product' }} <span class="text-gray-400">x{{ item.quantity }}</span></span>
                <span class="font-medium text-gray-900">₱{{ (Number(item.quantity) * Number(item.unit_price)).toLocaleString() }}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { AuthService } from '~/api/auth/AuthService'

definePageMeta({
  layout: 'customer'
})

const orders = ref<any[]>([])
const isLoading = ref(true)
const error = ref('')

const fetchOrders = async () => {
  try {
    const customerId = localStorage.getItem('_customer_id')
    const config = useRuntimeConfig()
    const token = localStorage.getItem('_token')
    
    if (!customerId) return
    
    const response = await $fetch<any>(`/customers/${customerId}/orders`, {
      baseURL: config.public.apiBaseURL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    
    orders.value = response?.data || response || []
  } catch (err: any) {
    error.value = 'Failed to load orders'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const handleLogout = async () => {
  const authService = new AuthService()
  await authService.logout()
  await navigateTo('/')
}

const scrollToShop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  fetchOrders()
})
</script>