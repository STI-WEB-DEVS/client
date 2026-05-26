<template>
  <div class="py-6">
    <h1 class="text-3xl font-bold tracking-tight text-gray-900">My Orders</h1>

    <!-- Loading State -->
    <div v-if="isLoading" class="mt-12 flex flex-col items-center justify-center py-16 text-gray-400">
      <svg class="animate-spin h-8 w-8 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <p class="text-sm">Loading your orders...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="mt-12 text-center py-16 border-2 border-dashed border-red-200 rounded-xl">
      <p class="text-red-500 text-base">{{ error }}</p>
      <button @click="fetchOrders" class="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
        Try again &rarr;
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="orders.length === 0" class="mt-12 text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
      <p class="text-gray-500 text-base">You haven't placed any orders yet.</p>
      <NuxtLink to="/customer/shop" class="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
        Start shopping &rarr;
      </NuxtLink>
    </div>

    <!-- Orders List -->
    <div v-else class="mt-8 space-y-6">
      <div
        v-for="order in orders"
        :key="order.uuid"
        class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
      >
        <!-- Order Header -->
        <div class="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200">
          <div class="flex flex-wrap gap-6 text-sm text-gray-600">
            <div>
              <span class="font-medium text-gray-900">Order</span>
              <p class="font-mono text-xs text-gray-500 mt-0.5">{{ order.uuid }}</p>
            </div>
            <div>
              <span class="font-medium text-gray-900">Date</span>
              <p class="text-xs text-gray-500 mt-0.5">{{ formatDate(order.created_at) }}</p>
            </div>
            <div>
              <span class="font-medium text-gray-900">Total</span>
              <p class="text-xs font-semibold text-gray-900 mt-0.5">${{ Number(order.total_amount).toFixed(2) }}</p>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <ul role="list" class="divide-y divide-gray-100">
          <li
            v-for="item in order.items"
            :key="item.id"
            class="flex items-center gap-4 px-6 py-4"
          >
            <!-- Product image placeholder -->
            <div class="flex-shrink-0 bg-gray-100 rounded-md w-16 h-16 flex items-center justify-center text-gray-400 text-xs">
              Item
            </div>

            <div class="flex flex-1 items-center justify-between gap-4">
              <div>
                <p class="text-sm font-medium text-gray-800">Product #{{ item.product_id }}</p>
                <p class="text-xs text-gray-500 mt-0.5">Qty: {{ item.quantity }}</p>
              </div>
              <p class="text-sm font-semibold text-gray-900 whitespace-nowrap">
                ${{ Number(item.unit_price).toFixed(2) }} ea.
              </p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Pagination -->
      <div v-if="pagination && pagination.last_page > 1" class="flex items-center justify-between pt-4 border-t border-gray-200">
        <p class="text-sm text-gray-500">
          Page {{ pagination.current_page }} of {{ pagination.last_page }}
        </p>
        <div class="flex gap-2">
          <button
            @click="goToPage(pagination.current_page - 1)"
            :disabled="pagination.current_page === 1"
            class="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            @click="goToPage(pagination.current_page + 1)"
            :disabled="pagination.current_page === pagination.last_page"
            class="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { orderService } from '~/api/order/OrderService'

definePageMeta({
  layout: 'customer'
})

interface OrderItem {
  id: number
  product_id: number
  quantity: number
  unit_price: string | number
}

interface Order {
  uuid: string
  total_amount: string | number
  created_at: string
  items: OrderItem[]
}

interface Pagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

const orders = ref<Order[]>([])
const pagination = ref<Pagination | null>(null)
const isLoading = ref(false)
const error = ref('')

const getCustomerUuid = (): string | null => {
  if (!process.client) return null
  const raw = localStorage.getItem('_customer_uuid') ?? localStorage.getItem('_uuid')
  return raw ? raw.replace(/^"|"$/g, '') : null
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const fetchOrders = async (page = 1) => {
  const customerUuid = getCustomerUuid()
  if (!customerUuid) {
    error.value = 'Could not find your session. Please log in again.'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const response = await orderService.list(customerUuid, { page, per_page: 10 })

    // Laravel paginated resource: { data: [...], meta: { current_page, last_page, ... } }
    orders.value = response.data ?? response
    if (response.meta) {
      pagination.value = {
        current_page: response.meta.current_page,
        last_page: response.meta.last_page,
        per_page: response.meta.per_page,
        total: response.meta.total,
      }
    }
  } catch (err: any) {
    error.value = err?.message || 'Failed to load orders.'
  } finally {
    isLoading.value = false
  }
}

const goToPage = (page: number) => {
  fetchOrders(page)
}

onMounted(() => {
  fetchOrders()
})
</script>