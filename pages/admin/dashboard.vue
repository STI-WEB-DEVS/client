<template>
  <NuxtLayout>
    <div class="min-h-screen bg-gray-50 p-6 text-gray-900 font-sans">
      <div class="max-w-7xl mx-auto space-y-6">
        
        <header class="flex items-end justify-between border-b border-gray-200 pb-6">
          <div>
            <h1 class="text-2xl font-bold tracking-tight text-gray-900">Statistics</h1>
            <p class="text-sm text-gray-500 mt-1">Customer orders and system performance metrics.</p>
          </div>
          <div class="flex gap-3">
            <button class="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
              Export PDF
            </button>
            <button 
              @click="navigateTo('/logout')" 
              class="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p class="mt-4 text-gray-600">Loading statistics...</p>
        </div>

        <!-- Statistics -->
        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="item in summary" :key="item.label" class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <dt class="text-xs font-medium text-gray-500 uppercase tracking-wider">{{ item.label }}</dt>
              <dd class="mt-1 flex items-baseline justify-between">
                <span class="text-2xl font-bold text-gray-900">{{ item.value }}</span>
                <span v-if="item.change" class="text-xs font-mono text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                  {{ item.change }}
                </span>
              </dd>
            </div>
          </div>

          <!-- Recent Orders Table -->
          <div class="bg-white border border-gray-200 rounded-xl p-6 mt-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Recent Orders</h3>
            <div v-if="orders.length > 0" class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{{ order.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.customer_name || 'N/A' }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₱{{ parseFloat(order.total_amount).toFixed(2) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getStatusClass(order.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {{ order.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(order.created_at) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              No orders yet
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import OrderService from '~/api/order/OrderService'

const loading = ref(true)
const orders = ref([])
const stats = ref({
  totalOrders: 0,
  totalRevenue: 0,
  pendingOrders: 0,
  completedOrders: 0
})

const summary = computed(() => [
  { label: 'Total Orders', value: stats.value.totalOrders.toString() },
  { label: 'Total Revenue', value: `₱${stats.value.totalRevenue.toFixed(2)}` },
  { label: 'Pending Orders', value: stats.value.pendingOrders.toString() },
  { label: 'Completed Orders', value: stats.value.completedOrders.toString() }
])

// Fetch orders on mount
onMounted(async () => {
  try {
    const response = await OrderService.getAll()
    const orderData = response.data || response
    
    if (Array.isArray(orderData)) {
      orders.value = orderData.slice(0, 10) // Show last 10 orders
      
      // Calculate statistics
      stats.value.totalOrders = orderData.length
      stats.value.totalRevenue = orderData.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0)
      stats.value.pendingOrders = orderData.filter(o => o.status === 'pending').length
      stats.value.completedOrders = orderData.filter(o => o.status === 'completed').length
    }
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  } finally {
    loading.value = false
  }
})

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    processing: 'bg-blue-100 text-blue-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>