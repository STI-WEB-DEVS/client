<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useOrdersStore } from '~/stores/order'

definePageMeta({ layout: 'customer' })

const ordersStore = useOrdersStore()
const customerUuid = ref(process.client ? (localStorage.getItem('uuid') ?? '') : '')
const orders = ref<any[]>([])

onMounted(() => {
  // 🔁 Force load from localStorage before fetching
  if (process.client) {
    ordersStore.loadOrders()
  }
  if (customerUuid.value) {
    orders.value = ordersStore.getOrdersByCustomer(customerUuid.value)
    console.log('Orders after load:', orders.value.length)
  }
})

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(value)
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

    <div v-if="orders.length === 0" class="text-center py-12">
      <p class="text-gray-500">You haven't placed any orders yet.</p>
      <NuxtLink to="/shop" class="mt-4 inline-block text-indigo-600 hover:underline">
        Start Shopping →
      </NuxtLink>
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="order in orders"
        :key="order.order_uuid"
        class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div class="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div>
            <p class="text-xs text-gray-500">Order #{{ order.order_uuid.slice(0, 8) }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(order.date) }}</p>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold text-indigo-600">{{ formatPrice(order.total) }}</p>
            <span class="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              Completed
            </span>
          </div>
        </div>

        <div class="space-y-2">
          <div
            v-for="item in order.items"
            :key="item.product_uuid"
            class="flex items-center justify-between text-sm"
          >
            <div>
              <span class="font-medium text-gray-800">{{ item.name }}</span>
              <span class="mx-2 text-gray-400">×</span>
              <span class="text-gray-600">{{ item.quantity }}</span>
            </div>
            <span class="font-medium text-gray-800">{{ formatPrice(item.price * item.quantity) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>