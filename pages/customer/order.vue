<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'customer'
})

const orders = ref([])

onMounted(() => {
  if (typeof window !== 'undefined') {
    orders.value = JSON.parse(localStorage.getItem('_fake_orders') || '[]')
  }
})
</script>

<template>
  <div class="max-w-ffull mx-auto">
    <PageHeader title="My Orders" description="View your order history and details." />

    <div v-if="orders.length > 0" class="mt-8 space-y-6">
      <div v-for="order in orders" :key="order.id" class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-lg font-bold text-gray-900">Order #{{ order.id }}</h3>
            <p class="text-sm text-gray-500">{{ new Date(order.date).toLocaleString() }}</p>
          </div>
          <span class="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Placed</span>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm font-mono text-gray-800 border border-gray-200">
          <pre>{{ JSON.stringify(order, null, 2) }}</pre>
        </div>
      </div>
    </div>

    <div v-else class="mt-8 py-20 text-center bg-white rounded-2xl border border-dashed border-gray-300">
      <Icon name="heroicons:shopping-bag" size="48" class="mx-auto text-gray-300 mb-4" />
      <h2 class="text-xl font-bold text-gray-900">No orders yet.</h2>
      <p class="text-gray-500 mt-2">When you place an order, it will appear here.</p>
    </div>
  </div>
</template>