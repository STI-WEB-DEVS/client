<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useOrdersStore } from '~/stores/order'

definePageMeta({ layout: 'customer' })

const ordersStore = useOrdersStore()
const isMounted = ref(false)

// Kuhaon ang UUID sa customer
const customerUuid = ref('')

  onMounted(async () => {
    isMounted.value = true
    if (process.client) {
      customerUuid.value = localStorage.getItem('uuid') ?? ''

      // Load offline orders first
      ordersStore.loadOrders()

      // Fetch fresh orders from backend
      if (customerUuid.value) {
        await ordersStore.fetchOrdersByCustomer(customerUuid.value)
      }
    }
  })

/**
 * 🚀 Epektibong pag-filter sa orders.
 * Gigamit nato ang .filter() base sa customer_uuid para ang 
 * makita ra sa customer kay ang iyang kaugalingon nga orders.
 */
const customerOrders = computed(() => {
  if (!isMounted.value) return []
  return ordersStore.orders.filter(o => o.customer_uuid === customerUuid.value)
})

function formatPrice(value: any) {
  const num = parseFloat(value) || 0
  return new Intl.NumberFormat('en-PH', {
    style: 'currency', 
    currency: 'PHP', 
    minimumFractionDigits: 2,
  }).format(num)
}

function formatDate(dateString: string) {
  if (!dateString) return 'N/A'
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
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900">My Order History</h1>
        <span v-if="isMounted" class="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          {{ customerOrders.length }} total orders
        </span>
      </div>

      <!-- 
        ClientOnly: Importante ni para ma-fix ang Hydration Mismatch error.
        Dili i-render sa server ang listahan kay ang data naa ra sa localStorage sa browser.
      -->
      <ClientOnly>
        <!-- Empty State -->
        <div v-if="customerOrders.length === 0 && !ordersStore.loading" 
             class="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <div class="text-6xl mb-4">📦</div>
          <p class="text-gray-400 text-lg">Wala pa kay order history diri.</p>
          <NuxtLink to="/customer/shop" class="mt-4 inline-block text-indigo-600 font-semibold hover:underline">
            Pangita og products karon →
          </NuxtLink>
        </div>

        <!-- Orders List -->
        <div v-else class="space-y-6">
          <div
            v-for="order in customerOrders"
            :key="order.order_uuid || order.uuid"
            class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <!-- Card Header -->
            <div class="flex flex-wrap items-center justify-between gap-4 border-b border-gray-50 bg-gray-50/30 px-6 py-4">
              <div>
                <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400">Order ID</p>
                <p class="text-sm font-mono font-bold text-gray-700 uppercase">
                  #{{ (order.order_uuid || order.uuid || '').slice(0, 8) }}
                </p>
              </div>
              <div>
                <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400">Date</p>
                <p class="text-sm text-gray-700 font-medium">{{ formatDate(order.created_at || order.date) }}</p>
              </div>
              <div class="text-right">
                <span class="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase"
                      :class="order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'">
                  {{ order.status }}
                </span>
              </div>
            </div>

            <!-- Items Content -->
            <div class="p-6">
              <div class="space-y-4">
                <div
                  v-for="(item, idx) in order.items"
                  :key="idx"
                  class="flex items-center justify-between text-sm"
                >
                  <div class="flex items-center gap-4">
                    <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">
                      {{ item.quantity }}x
                    </span>
                    <div>
                      <p class="font-bold text-gray-800 uppercase leading-none">{{ item.name }}</p>
                      <p class="text-[10px] text-gray-400 mt-1">UUID: {{ item.product_uuid?.slice(0, 8) }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-gray-900">{{ formatPrice(item.price * item.quantity) }}</p>
                    <p class="text-[10px] text-gray-400 italic">{{ formatPrice(item.price) }} each</p>
                  </div>
                </div>
              </div>

              <!-- Order Footer Summary -->
              <div class="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <div class="text-xs text-gray-400">
                  Customer UUID: <span class="font-mono">{{ order.customer_uuid?.slice(0, 8) }}</span>
                </div>
                <div class="text-right">
                  <p class="text-xs text-gray-500 font-medium uppercase tracking-tighter">Grand Total</p>
                  <p class="text-2xl font-black text-indigo-600">
                    {{ formatPrice(order.total_price || order.total) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State Fallback -->
        <template #fallback>
          <div class="space-y-4 animate-pulse">
            <div v-for="i in 3" :key="i" class="h-48 w-full bg-gray-200 rounded-xl"></div>
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>