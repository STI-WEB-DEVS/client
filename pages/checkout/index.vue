<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useOrdersStore } from '~/stores/order'   
import { CheckCircleIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'

definePageMeta({ layout: 'customer' })

const cart = useCartStore()
const ordersStore = useOrdersStore()

const customerUuid = ref(
  process.client ? (localStorage.getItem('uuid') ?? '') : ''
)
const errors = ref<{ customer_uuid?: string; items?: string }>({})
const showSuccess = ref(false)

function validate() {
  errors.value = {}
  if (!customerUuid.value.trim()) {
    errors.value.customer_uuid = 'Customer UUID is required.'
  }
  if (cart.isEmpty) {
    errors.value.items = 'Your cart is empty.'
  }
  return Object.keys(errors.value).length === 0
}

function placeOrder() {
  if (!validate()) return

  const orderItems = cart.items.map(item => ({
    product_uuid: item.product_uuid,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }))

  const total = cart.totalPrice
  const newOrder = {
    order_uuid: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    customer_uuid: customerUuid.value.trim(),
    date: new Date().toISOString(),
    total,
    items: orderItems,
  }

  console.log('Order Payload (Checkout):', JSON.stringify(newOrder, null, 2))

  ordersStore.addOrder(
    customerUuid.value.trim(),
    orderItems,
    total
  )

  cart.clearCart()
  showSuccess.value = true
}

function cancelOrder() {
  cart.clearCart()
  navigateTo('/shop')
}

function goToOrders() {
  navigateTo('/customer/orders')
}

function formatPrice(val: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency', currency: 'PHP', minimumFractionDigits: 2,
  }).format(val)
}
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <div class="mb-8 flex items-center justify-between">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Checkout</h2>
      <NuxtLink to="/cart" class="flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-gray-900">
        <ArrowLeftIcon class="h-4 w-4" />
        Back to Cart
      </NuxtLink>
    </div>

    <div class="grid gap-6 lg:grid-cols-5">
      <div class="lg:col-span-3 space-y-5">
        <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">Customer Details</h3>
          <label class="block">
            <span class="text-sm font-medium text-gray-700">Customer UUID</span>
            <input
              v-model="customerUuid"
              type="text"
              placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
              class="mt-1.5 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.customer_uuid }"
            />
            <p v-if="errors.customer_uuid" class="mt-1 text-xs text-red-500">{{ errors.customer_uuid }}</p>
            <p class="mt-1 text-xs text-gray-400">Auto-filled from your session. You can override this.</p>
          </label>
        </div>
        <p v-if="errors.items" class="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-500">{{ errors.items }}</p>
      </div>

      <div class="lg:col-span-2">
        <div class="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">Order Summary</h3>
          <ul class="divide-y divide-gray-50">
            <li v-for="item in cart.items" :key="item.product_uuid" class="flex items-start justify-between py-3 text-sm">
              <div class="min-w-0 flex-1 pr-2">
                <p class="truncate font-medium text-gray-800">{{ item.name }}</p>
                <p class="text-xs text-gray-400">× {{ item.quantity }}</p>
              </div>
              <span class="shrink-0 font-semibold text-gray-700">{{ formatPrice(item.price * item.quantity) }}</span>
            </li>
          </ul>
          <div class="mt-4 border-t border-gray-100 pt-4 flex items-center justify-between font-bold text-gray-900">
            <span>Total</span>
            <span class="text-indigo-600">{{ formatPrice(cart.totalPrice) }}</span>
          </div>
          <div class="mt-5 flex gap-3">
            <button
              @click="cancelOrder"
              class="flex-1 rounded-lg border border-red-200 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Cancel Order
            </button>
            <button
              class="flex-1 rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
              :disabled="cart.isEmpty"
              @click="placeOrder"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal – navigate only on button click -->
    <div
      v-if="showSuccess"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="goToOrders"
    >
      <div class="w-96 rounded-2xl bg-white p-6 text-center shadow-xl">
        <CheckCircleIcon class="mx-auto h-16 w-16 text-green-500" />
        <h3 class="mt-3 text-xl font-bold text-gray-900">Order Placed!</h3>
        <p class="mt-2 text-sm text-gray-500">Your order has been successfully placed.</p>
        <button
          @click="goToOrders"
          class="mt-5 w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          View Orders Now
        </button>
      </div>
    </div>
  </div>
</template>