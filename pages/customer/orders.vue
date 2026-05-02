<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useOrdersStore } from '~/stores/order'
import { 
  ShoppingBagIcon, 
  ChevronRightIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ArchiveBoxIcon 
} from '@heroicons/vue/24/outline'

definePageMeta({ layout: 'customer' })

const ordersStore = useOrdersStore()
const isMounted = ref(false)
const customerUuid = ref('')

onMounted(async () => {
  isMounted.value = true
  if (process.client) {
    customerUuid.value = localStorage.getItem('uuid') ?? ''
    ordersStore.loadOrders()
    if (customerUuid.value) {
      await ordersStore.fetchOrdersByCustomer(customerUuid.value)
    }
  }
})

const customerOrders = computed(() => {
  if (!isMounted.value) return []
  // Sorting by newest first
  return [...ordersStore.orders]
    .filter(o => o.customer_uuid === customerUuid.value)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
})

const formatPrice = (value: any) => {
  const num = parseFloat(value) || 0
  return new Intl.NumberFormat('en-PH', {
    style: 'currency', 
    currency: 'PHP',
  }).format(num)
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-PH', {
    month: 'long', day: 'numeric', year: 'numeric'
  })
}

// Helper to determine status styles
const getStatusTheme = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'pending': return 'bg-amber-50 text-amber-700 border-amber-100'
    case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-100'
    case 'cancelled': return 'bg-rose-50 text-rose-700 border-rose-100'
    default: return 'bg-gray-50 text-gray-700 border-gray-100'
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#f9fafb] py-12">
    <div class="max-w-3xl mx-auto px-4">
      
      <!-- Header Section -->
      <div class="mb-10 flex items-end justify-between">
        <div>
          <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">Orders</h1>
          <p class="mt-2 text-gray-500 font-medium">Check the status of recent orders and manage returns.</p>
        </div>
        <div v-if="isMounted && customerOrders.length > 0" class="hidden sm:block">
          <p class="text-sm font-semibold text-gray-400 uppercase tracking-widest">History Count</p>
          <p class="text-2xl font-bold text-right text-indigo-600">{{ customerOrders.length }}</p>
        </div>
      </div>

      <ClientOnly>
        <!-- Empty State -->
        <div v-if="customerOrders.length === 0 && !ordersStore.loading" 
             class="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm text-center">
          <div class="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
            <ShoppingBagIcon class="w-10 h-10 text-indigo-500" />
          </div>
          <h3 class="text-xl font-bold text-gray-900">No orders found</h3>
          <p class="text-gray-500 mt-2 max-w-xs mx-auto">Looks like you haven't made any purchases yet. Let's change that!</p>
          <NuxtLink to="/customer/shop" 
            class="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            Start Shopping
          </NuxtLink>
        </div>

        <!-- Orders List -->
        <div v-else class="space-y-8">
          <div
            v-for="order in customerOrders"
            :key="order.order_uuid || order.uuid"
            class="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-indigo-300 transition-all duration-300"
          >
            <!-- Card Top Bar -->
            <div class="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center">
              <div class="flex gap-6">
                <div>
                  <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date Placed</p>
                  <p class="text-sm font-semibold text-gray-700">{{ formatDate(order.created_at || order.date) }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Order Number</p>
                  <p class="text-sm font-mono font-bold text-gray-900">#{{ (order.order_uuid || order.uuid || '').slice(0, 8).toUpperCase() }}</p>
                </div>
              </div>
              <div :class="['px-3 py-1 rounded-full text-xs font-bold border', getStatusTheme(order.status)]">
                {{ order.status }}
              </div>
            </div>

            <!-- Items List -->
            <div class="px-6 py-2 divide-y divide-gray-50">
              <div v-for="(item, idx) in order.items" :key="idx" class="py-6 flex items-center justify-between">
                <div class="flex items-center gap-5">
                  <!-- Product Icon Placeholder -->
                  <div class="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                    <ArchiveBoxIcon class="w-7 h-7 text-gray-400 group-hover:text-indigo-400" />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 uppercase tracking-tight">{{ item.name }}</h4>
                    <p class="text-sm text-gray-500 font-medium">Qty: {{ item.quantity }} × {{ formatPrice(item.price) }}</p>
                  </div>
                </div>
                <p class="font-bold text-gray-900 text-lg">{{ formatPrice(item.price * item.quantity) }}</p>
              </div>
            </div>

            <!-- Footer Summary -->
            <div class="bg-indigo-600 px-8 py-5 flex justify-between items-center text-white">
              <div class="flex items-center gap-2">
                <div class="p-1.5 bg-indigo-500 rounded-lg">
                  <CheckCircleIcon class="w-5 h-5" />
                </div>
                <span class="text-sm font-medium text-indigo-100 italic">Total Amount Paid</span>
              </div>
              <p class="text-2xl font-black tracking-tight">
                {{ formatPrice(order.total_price || order.total) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Skeleton Loading -->
        <template #fallback>
          <div class="space-y-6">
            <div v-for="i in 3" :key="i" class="h-64 w-full bg-white border border-gray-100 rounded-3xl animate-pulse"></div>
          </div>
        </template>
      </ClientOnly>

    </div>
  </div>
</template>

<style scoped>
/* Optional: Adding a soft entry animation */
.group {
  animation: slideUp 0.4s ease-out forwards;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>