```vue
<template>
  <div class="min-h-screen bg-gray-100 p-6">

    <!-- PAGE HEADER -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">
        My Orders
      </h1>

      <p class="mt-2 text-sm text-gray-500">
        View all your purchased products
      </p>
    </div>

    <!-- LOADING -->
    <div
      v-if="loading"
      class="flex items-center justify-center py-20"
    >
      <p class="text-gray-500">
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
        class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
      >

        <!-- ORDER HEADER -->
        <div class="mb-6 flex items-center justify-between border-b pb-4">

          <div>
            <h2 class="text-lg font-bold text-gray-900">
              Order #{{ order.uuid }}
            </h2>

            <p class="mt-1 text-sm text-gray-500">
              Ordered Items:
              {{ order.items?.length || 0 }}
            </p>
          </div>

          <div class="text-right">
            <p class="text-sm text-gray-500">
              Total Amount
            </p>

            <p class="text-2xl font-bold text-indigo-600">
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
            class="flex items-center justify-between rounded-2xl border border-gray-100 p-4"
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
                class="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-gray-400"
              >
                No Image
              </div>

              <!-- DETAILS -->
              <div>

                <h3 class="text-lg font-semibold text-gray-900">
                  {{ item.product?.name || 'Unknown Product' }}
                </h3>

                <p class="mt-1 text-sm text-gray-500">
                  Quantity:
                  {{ item.quantity }}
                </p>

                <p class="mt-1 text-sm text-gray-500">
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

              <p class="text-xl font-bold text-indigo-600">
                ₱{{ item.quantity * item.unit_price }}
              </p>
            </div>
          </div>
        </div>

        <!-- EMPTY ITEMS -->
        <div
          v-else
          class="rounded-2xl bg-gray-50 py-8 text-center text-sm text-gray-500"
        >
          No ordered items found.
        </div>
      </div>
    </div>

    <!-- EMPTY -->
    <div
      v-else
      class="rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center"
    >
      <h2 class="text-xl font-semibold text-gray-700">
        No Orders Found
      </h2>

      <p class="mt-2 text-sm text-gray-500">
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

/**
 * FETCH CUSTOMER ORDERS
 */
const fetchOrders = async () => {

  loading.value = true

  try {

    let customerUuid = ''

    // GET CUSTOMER UUID FROM LOCAL STORAGE
    if (typeof window !== 'undefined') {
      customerUuid = localStorage.getItem('_uuid') || ''
    }

    // PREVENT EMPTY REQUEST
    if (!customerUuid) {
      console.error('Customer UUID not found.')
      return
    }

    // API REQUEST
    const response = await orderService.show(customerUuid)

    // STORE RESPONSE
    orders.value = response?.data || response || []

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
```
