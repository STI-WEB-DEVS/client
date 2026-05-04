<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'customer'
})

const orders = ref([])
const pending = ref(true)

const fetchOrders = async () => {
  pending.value = true
  try {
    orders.value = []
  } catch (error) {
    console.error('Error fetching orders:', error)
  } finally {
    pending.value = false
  }
}

const formatPrice = (price) => {
  return price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

onMounted(() => {
  fetchOrders()
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">My Orders</h1>
        <p class="mt-1 text-sm text-gray-500">View your order history.</p>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600"></div>
      </div>

      <div v-else-if="orders.length === 0" class="bg-white rounded-lg shadow p-8 text-center">
        <p class="text-gray-500">No orders yet.</p>
        <NuxtLink to="/shop" class="mt-4 inline-block text-indigo-600 hover:text-indigo-800">
          Start Shopping →
        </NuxtLink>
      </div>

      <div v-else class="space-y-4">
        <div v-for="order in orders" :key="order.id" class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-start border-b pb-3">
            <div>
              <p class="text-sm text-gray-500">Order #{{ order.id }}</p>
              <p class="text-xs text-gray-400">{{ formatDate(order.created_at) }}</p>
            </div>
            <span class="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
              {{ order.status || 'Completed' }}
            </span>
          </div>
          
          <div class="mt-4 space-y-2">
            <div v-for="item in order.items" :key="item.id" class="flex justify-between">
              <span>{{ item.name }} x {{ item.quantity }}</span>
              <span>₱{{ formatPrice(item.price * item.quantity) }}</span>
            </div>
          </div>
          
          <div class="mt-4 pt-3 border-t flex justify-between font-bold">
            <span>Total:</span>
            <span class="text-indigo-600">₱{{ formatPrice(order.total_amount) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.format-price {
  font-weight: 500;
}
</style>