```vue
<template>
  <div class="min-h-screen bg-[#0d0608] p-8">

    <!-- HEADER -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white">
        My Orders
      </h1>

      <p class="mt-2 text-sm text-gray-400">
        View all your purchased products
      </p>
    </div>

    <!-- LOADING -->
    <div
      v-if="loading"
      class="flex items-center justify-center py-20"
    >
      <p class="text-gray-400">
        Loading orders...
      </p>
    </div>

    <!-- ORDERS -->
    <div
      v-else-if="orders.length"
      class="space-y-6"
    >

      <div
        v-for="order in orders"
        :key="order.uuid"
        class="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
      >

        <!-- ORDER HEADER -->
        <div
          class="mb-6 flex items-center justify-between border-b border-white/10 pb-4"
        >

          <div>
            <h2 class="text-lg font-bold text-white">
              Order #{{ order.uuid }}
            </h2>

            <p class="mt-1 text-sm text-gray-400">
              Ordered Items:
              {{ order.items?.length || 0 }}
            </p>
          </div>

          <div class="text-right">
            <p class="text-sm text-gray-500">
              Total Amount
            </p>

            <p class="text-2xl font-bold text-red-400">
              ₱{{ order.total_amount }}
            </p>
          </div>
        </div>

        <!-- ORDER ITEMS -->
        <div
          v-if="order.items?.length"
          class="space-y-4"
        >

          <div
            v-for="item in order.items"
            :key="item.uuid"
            class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4"
          >

            <!-- PRODUCT INFO -->
            <div class="flex items-center gap-4">

              <!-- IMAGE -->
              <img
                v-if="item.product?.image"
                :src="item.product.image"
                class="h-20 w-20 rounded-2xl object-cover"
              />

              <!-- FALLBACK -->
              <div
                v-else
                class="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-gray-500"
              >
                🩸
              </div>

              <!-- DETAILS -->
              <div>

                <h3 class="text-lg font-semibold text-white">
                  {{ item.product?.name || 'Unknown Product' }}
                </h3>

                <p class="mt-1 text-sm text-gray-400">
                  Quantity:
                  {{ item.quantity }}
                </p>

                <p class="mt-1 text-sm text-gray-400">
                  Unit Price:
                  ₱{{ item.unit_price }}
                </p>

              </div>

            </div>

            <!-- SUBTOTAL -->
            <div class="text-right">

              <p class="text-sm text-gray-500">
                Subtotal
              </p>

              <p class="text-xl font-bold text-red-400">
                ₱{{ item.quantity * item.unit_price }}
              </p>

            </div>

          </div>

        </div>

        <!-- EMPTY ITEMS -->
        <div
          v-else
          class="rounded-2xl border border-white/10 bg-white/5 py-8 text-center text-sm text-gray-400"
        >
          No ordered items found.
        </div>

      </div>

    </div>

    <!-- EMPTY -->
    <div
      v-else
      class="rounded-3xl border border-dashed border-white/10 bg-white/5 py-20 text-center backdrop-blur-xl"
    >
      <div
        class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
        style="background:linear-gradient(135deg,#c0392b,#e74c3c)"
      >
        🩸
      </div>

      <h2 class="text-xl font-semibold text-white">
        No Orders Found
      </h2>

      <p class="mt-2 text-sm text-gray-400">
        You have not placed any orders yet.
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { orderService } from '~/api/order/OrderService'
 
definePageMeta({
  layout: 'customer'
})
 
const loading = ref(false)
const orders = ref<any[]>([])
 
const runtimeConfig = useRuntimeConfig()
 
const resolveCustomerUuid = async (): Promise<string> => {

  const stored = localStorage.getItem('_uuid') || ''
  if (stored) return stored
 
  const email = localStorage.getItem('_email') || ''
  if (!email) return ''
 
  try {
    const data = await $fetch<any>('customer', {
      baseURL: runtimeConfig.public.apiBaseURL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('_token')}`,
        Accept: 'application/json',
      },
    })
    const customer = (data.data || data).find((c: any) => c.email === email)
    if (customer) {
      localStorage.setItem('_uuid', customer.uuid)
      return customer.uuid
    }
  } catch (e) {
    console.error('resolveCustomerUuid failed:', e)
  }
 
  return ''
}
 
/**
 * FETCH CUSTOMER ORDERS
 */
const fetchOrders = async () => {
  loading.value = true
 
  try {
    const customerUuid = await resolveCustomerUuid()
 
    console.log('UUID:', customerUuid)
 
    if (!customerUuid) {
      console.error('Customer UUID not found.')
      return
    }
 
    const response = await orderService.show(customerUuid)
 
    console.log('FULL RESPONSE:', response)
 
    orders.value = response.data || response || []
 
    console.log('CUSTOMER ORDERS:', orders.value)
 
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  } finally {
    loading.value = false
  }
}
 
/**
 * PAGE LOAD
 */
onMounted(() => {
  fetchOrders()
})
</script>