<template>
  <div class="min-h-screen bg-gray-50/50 p-4 md:p-8">
    <div class="mb-8 border-b border-gray-200 pb-5">
      <h1 class="text-2xl font-bold tracking-tight text-gray-900">
        Project Manifest &amp; Orders
      </h1>
      <p class="mt-1 text-sm text-gray-500">
        Monitor the real-time production phase, wood selection configurations, and settlement ledger details for your commissions.
      </p>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-24 gap-3">
      <div class="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-700"></div>
      <p class="text-xs font-medium text-gray-400 uppercase tracking-wider">
        Querying platform ledger...
      </p>
    </div>

    <div v-else-if="orders.length" class="space-y-8 max-w-5xl">
      <div 
        v-for="order in orders" 
        :key="order.uuid" 
        class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
      >
        <div class="bg-gray-50/70 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100">
          <div>
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Commission Ref</span>
            <h2 class="text-sm font-mono font-bold text-gray-900">
              #{{ order.uuid.substring(0, 8) }}...{{ order.uuid.slice(-4) }}
            </h2>
          </div>
          
          <div class="flex items-center gap-6">
            <div class="text-left sm:text-right">
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Allocated Units</span>
              <p class="text-sm font-semibold text-gray-700">
                {{ order.items?.length || 0 }} Production Slots
              </p>
            </div>
            <div class="text-right">
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Valuation</span>
              <p class="text-xl font-black text-green-700 tracking-tight">
                ₱{{ Number(order.total_amount).toLocaleString() }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="order.items?.length" class="divide-y divide-gray-100 px-6">
          <div 
            v-for="item in order.items" 
            :key="item.uuid" 
            class="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div class="flex items-start gap-5">
              <img 
                v-if="item.product?.image" 
                :src="item.product.image" 
                class="h-16 w-16 rounded-lg object-cover border border-gray-100 shadow-inner shrink-0" 
              />
              <div v-else class="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100 border border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center p-1">
                No Spec Drawing
              </div>

              <div class="space-y-1">
                <h3 class="text-sm font-semibold text-gray-900">
                  {{ item.product?.name || 'Custom Spec Build' }}
                </h3>
                <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                  <p>
                    <span class="font-medium text-gray-400">Batch Qty:</span> 
                    {{ item.quantity }}
                  </p>
                  <p>
                    <span class="font-medium text-gray-400">Unit Valuation:</span> 
                    ₱{{ Number(item.unit_price).toLocaleString() }}
                  </p>
                </div>
              </div>
            </div>

            <div class="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-50 flex sm:flex-col justify-between items-center sm:items-end">
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider sm:block">Item Valuation Subtotal</span>
              <p class="text-base font-bold text-gray-900 tracking-tight mt-0.5">
                ₱{{ (item.quantity * item.unit_price).toLocaleString() }}
              </p>
            </div>
          </div>
        </div>

        <div v-else class="p-8 text-center text-xs text-gray-400 italic bg-gray-50/30">
          No manufacturing specifications attached to this ledger slot.
        </div>
      </div>
    </div>

    <div v-else class="rounded-xl border-2 border-dashed border-gray-200 bg-white py-16 px-4 text-center max-w-md mx-auto mt-12 shadow-sm">
      <div class="text-3xl mb-3">🪵</div>
      <h2 class="text-base font-bold text-gray-800">
        No Active Projects Configured
      </h2>
      <p class="mt-1 text-xs text-gray-500 leading-relaxed">
        We haven't parsed any operational orders mapped to this validation sequence token. Explore the catalog to start a custom furniture build commission.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { orderService } from '~/api/order/OrderService'

// Component metadata layout bindings matching your Nuxt client file tree
definePageMeta({
  layout: 'customer'
})

const loading = ref(false)
const orders = ref<any[]>([])

/**
 * FETCH CURRENT COMMISSION MANIFEST
 */
const fetchCustomerManifestLogs = async () => {
  loading.value = true
  try {
    let internalSessionKey = ''

    if (typeof window !== 'undefined') {
      internalSessionKey = localStorage.getItem('_uuid') || ''
    }

    if (!internalSessionKey) {
      console.warn('System Pipeline Aborted: Missing identification validation hash token (_uuid).')
      return
    }

    // Processing data request from backend client service layer hooks
    const serverPayload = await orderService.show(internalSessionKey)
    orders.value = serverPayload?.data || serverPayload || []
    
    console.log('FURNICRAFT SYSTEM LOAD - CUSTOMER LOGS:', orders.value)
  } catch (pipelineException) {
    console.error('Operational failure parsing order manifest stream:', pipelineException)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCustomerManifestLogs()
})
</script>