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
    <div class="rounded-[1.75rem] border border-stone-200 bg-white/90 p-6 shadow-sm shadow-stone-950/5 sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <p class="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">History</p>
        <h1 class="mt-2 text-3xl font-bold tracking-tight text-stone-950">Your Orders</h1>
        <p class="mt-2 text-sm text-stone-600">A list of all your local orders including their status and total amount.</p>
      </div>
    </div>

    <div v-if="pending" class="mt-16 text-center">
      <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-amber-600"></div>
      <p class="mt-4 text-sm font-semibold text-stone-950">Loading your orders...</p>
    </div>

    <div v-else-if="error" class="mt-16 text-center">
      <ClipboardDocumentListIcon class="mx-auto h-12 w-12 text-rose-400" />
      <h3 class="mt-2 text-sm font-semibold text-stone-950">Unable to load orders</h3>
      <p class="mt-1 text-sm text-stone-500">{{ error }}</p>
    </div>

    <div v-else-if="orders.length === 0" class="mt-16 text-center">
      <ClipboardDocumentListIcon class="mx-auto h-12 w-12 text-stone-400" />
      <h3 class="mt-2 text-sm font-semibold text-stone-950">No orders found</h3>
      <p class="mt-1 text-sm text-stone-500">You haven't placed any orders yet.</p>
      <div class="mt-6">
        <NuxtLink to="/customer/shop" class="inline-flex items-center rounded-full bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-stone-950/10 transition hover:-translate-y-0.5 hover:bg-stone-800">
          Go to Shop
        </NuxtLink>
      </div>
    </div>

    <div v-else class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm shadow-stone-950/5">
            <table class="min-w-full divide-y divide-stone-200">
              <thead class="bg-stone-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-bold text-stone-950 sm:pl-6">Order ID</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-bold text-stone-950">Date</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-bold text-stone-950">Items</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-bold text-stone-950">Total</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-bold text-stone-950">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-100 bg-white">
                <tr v-for="order in orders" :key="order.uuid" class="transition hover:bg-stone-50/80">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-stone-950 sm:pl-6">#{{ order.uuid }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-stone-500">{{ formatDate(order.created_at) }}</td>
                  <td class="px-3 py-4 text-sm text-stone-500">
                    <div v-for="item in order.items" :key="item.product_uuid">
                      {{ item.quantity }}x {{ item.product_name }}
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm font-bold text-stone-950">PHP {{ Number(order.total_amount).toLocaleString() }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">
                    <span class="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/15">
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
