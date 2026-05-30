<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCart } from '~/composables/useCart'
import { orderService } from '~/api/order/OrderService'
import { ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'customer'
})

const { getLocalOrders, clearLocalOrders } = useCart()
const orders  = ref<any[]>([])
const pending = ref(false)
const error   = ref<string | null>(null)

const loadOrders = async () => {
  pending.value = true
  error.value   = null

  const customerUuid = typeof window !== 'undefined'
    ? localStorage.getItem('_customer_uuid')
    : null

  try {
    if (customerUuid) {
      const response = await orderService.listByCustomer(customerUuid)
      // Normalize API response — items come as order.items from OrderResource
      const raw = response?.data ?? response ?? []
      orders.value = raw.map((order: any) => ({
        uuid:         order.uuid,
        created_at:   order.created_at,
        total_amount: Number(order.total_amount),
        status:       order.status ?? 'Completed',
        // API returns items with product relation loaded
        items: (order.items ?? []).map((item: any) => ({
          product_name: item.product?.name ?? item.product_name ?? '—',
          quantity:     item.quantity,
          unit_price:   Number(item.unit_price),
          total:        item.quantity * Number(item.unit_price),
        })),
      }))
      return
    }

    // Fallback to localStorage only if no customer_uuid at all
    orders.value = getLocalOrders()
  } catch (err: any) {
    console.error('Failed to fetch orders:', err)
    error.value = err?.message || 'Unable to load orders from server.'
    // Fallback to local on network error
    orders.value = getLocalOrders()
  } finally {
    pending.value = false
  }
}

onMounted(loadOrders)

const formatDate = (date: string) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-PH', {
    year:   'numeric',
    month:  'short',
    day:    'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  })
}

const formatCurrency = (amount: number) => {
  return Number(amount).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Your Orders</h1>
        <p class="mt-2 text-sm text-gray-700">A history of all your orders.</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <NuxtLink
          to="/customer/shop"
          class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          Continue Shopping
        </NuxtLink>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="mt-16 text-center">
      <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
      <p class="mt-4 text-sm font-medium text-gray-500">Loading your orders...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="mt-16 text-center">
      <ClipboardDocumentListIcon class="mx-auto h-12 w-12 text-red-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900">Unable to load orders</h3>
      <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
      <button
        @click="loadOrders"
        class="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
      >
        Try again
      </button>
    </div>

    <!-- Empty -->
    <div v-else-if="orders.length === 0" class="mt-16 text-center">
      <ClipboardDocumentListIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
      <p class="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
      <div class="mt-6">
        <NuxtLink
          to="/customer/shop"
          class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          Go to Shop
        </NuxtLink>
      </div>
    </div>

    <!-- Orders table -->
    <div v-else class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Order ID
                  </th>
                  <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Items</th>
                  <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
                  <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="order in orders" :key="order.uuid" class="hover:bg-gray-50">
                  <!-- Order ID -->
                  <td class="py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <span class="font-mono text-xs text-gray-500">#{{ order.uuid?.slice(0, 8) }}...</span>
                  </td>

                  <!-- Date -->
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ formatDate(order.created_at) }}
                  </td>

                  <!-- Items -->
                  <td class="px-3 py-4 text-sm text-gray-500">
                    <div
                      v-for="(item, i) in order.items"
                      :key="i"
                      class="flex items-center gap-1"
                    >
                      <span class="font-medium text-gray-900">{{ item.quantity }}×</span>
                      {{ item.product_name }}
                      <span class="text-gray-400">(₱{{ formatCurrency(item.unit_price) }})</span>
                    </div>
                    <!-- Fallback for localStorage orders that have no items array -->
                    <span v-if="!order.items?.length" class="italic text-gray-400">No item details</span>
                  </td>

                  <!-- Total -->
                  <td class="whitespace-nowrap px-3 py-4 text-sm font-semibold text-gray-900">
                    ₱{{ formatCurrency(order.total_amount) }}
                  </td>

                  <!-- Status -->
                  <td class="whitespace-nowrap px-3 py-4 text-sm">
                    <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
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