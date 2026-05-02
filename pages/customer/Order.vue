<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCart } from '~/composables/useCart'
import { orderService } from '~/api/order/OrderService'
import { ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'

definePageMeta({
 layout: 'customer'
})

const { getLocalOrders } = useCart()
const orders = ref<any[]>([])
const pending = ref(false)
const error = ref<string | null>(null)

const loadOrders = async () => {
  pending.value = true
  error.value = null

  const customerUuid = typeof window !== 'undefined' ? localStorage.getItem('_customer_uuid') : null

  try {
    if (customerUuid) {
      const response = await orderService.listByCustomer(customerUuid)
      orders.value = response?.data || response || []
      return
    }

    orders.value = getLocalOrders()
  } catch (err: any) {
    console.error('Failed to fetch backend orders:', err)
    error.value = err?.message || 'Unable to load orders from server.'
  } finally {
    pending.value = false
  }
}

onMounted(loadOrders)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Your Orders</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all your local orders including their status and total amount.</p>
      </div>
    </div>

    <div v-if="pending" class="mt-16 text-center">
      <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
      <p class="mt-4 text-sm font-medium text-gray-900">Loading your orders...</p>
    </div>

    <div v-else-if="error" class="mt-16 text-center">
      <ClipboardDocumentListIcon class="mx-auto h-12 w-12 text-red-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900">Unable to load orders</h3>
      <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
    </div>

    <div v-else-if="orders.length === 0" class="mt-16 text-center">
      <ClipboardDocumentListIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
      <p class="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
      <div class="mt-6">
        <NuxtLink to="/customer/shop" class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
          Go to Shop
        </NuxtLink>
      </div>
    </div>

    <div v-else class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Order ID</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Items</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="order in orders" :key="order.uuid">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">#{{ order.uuid }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatDate(order.created_at) }}</td>
                  <td class="px-3 py-4 text-sm text-gray-500">
                    <div v-for="item in order.items" :key="item.product_uuid">
                      {{ item.quantity }}x {{ item.product_name }}
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-semibold">₱{{ Number(order.total_amount).toLocaleString() }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">
                    <span class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      {{ order.status || 'Completed' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
