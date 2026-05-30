<script setup>
import { ref, computed } from 'vue'
import { useCart } from '~/composables/useCart'
import { orderService } from '~/api/order/OrderService'

definePageMeta({
  layout: 'customer'
})

const { cartItems, cartTotal, buildOrderPayload, clearCart } = useCart()

const isEmpty = computed(() => cartItems.value.length === 0)
const isPlacing = ref(false)
const orderSuccess = ref(false)
const orderError = ref('')

const placeOrder = async () => {
  orderError.value = ''

  if (isEmpty.value) {
    orderError.value = 'Your cart is empty. Add products before placing an order.'
    return
  }

  isPlacing.value = true

  const payload = buildOrderPayload()

  try {
    const response = await orderService.create(payload)

    if (!response || !response?.data) {
      throw new Error('Order could not be placed. Please try again.')
    }

    orderSuccess.value = true
    clearCart()
  } catch (err) {
    orderError.value = err?.message || 'Failed to place order. Please try again.'
  } finally {
    isPlacing.value = false
  }
}

const goToOrders = () => {
  navigateTo('/customer/orders')
}
</script>

<template>
  <section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
    <div class="mb-10">
      <p class="text-sm font-semibold uppercase tracking-widest text-indigo-600">Checkout</p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Place Your Order</h1>
      <p class="mt-2 text-base text-gray-500">Review your items and confirm your order.</p>
    </div>

    <div v-if="orderSuccess" class="flex flex-col items-center gap-6 rounded-2xl border border-green-200 bg-green-50 p-12 text-center">
      <div class="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
        ✅
      </div>
      <div>
        <h2 class="text-2xl font-bold text-green-800">Order Placed Successfully!</h2>
        <p class="mt-2 text-sm text-green-600">Your order has been placed. You can view it in your order history.</p>
      </div>
      <button
        @click="goToOrders"
        class="rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
      >
        View My Orders
      </button>
    </div>

    <div v-else>
      <div v-if="isEmpty" class="flex flex-col items-center gap-4 py-16 text-center">
        <span class="text-5xl">🛒</span>
        <h2 class="text-xl font-semibold text-gray-700">Nothing to check out</h2>
        <p class="text-sm text-gray-500">Your cart is empty. Add some products first!</p>
        <NuxtLink
          to="/customer/shop"
          class="mt-4 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Browse Products
        </NuxtLink>
      </div>

      <div v-else>
        <div class="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div class="border-b border-gray-100 px-6 py-4">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-500">Order Summary</h3>
          </div>

          <div class="divide-y divide-gray-100">
            <div
              v-for="item in cartItems"
              :key="item.product_uuid"
              class="flex items-center justify-between px-6 py-4"
            >
              <div class="flex items-center gap-4">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-lg">📦</div>
                <div>
                  <p class="text-sm font-semibold text-gray-900">{{ item.name }}</p>
                  <p class="text-xs text-gray-400">Qty: {{ item.quantity }}</p>
                </div>
              </div>
              <p class="text-sm font-semibold text-gray-900">
                ₱{{ (item.price * item.quantity).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4">
            <span class="text-sm font-medium text-gray-600">Total</span>
            <span class="text-xl font-bold text-gray-900">
              ₱{{ cartTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
            </span>
          </div>
        </div>

        <div class="mt-6 rounded-2xl border border-gray-200 bg-gray-900 p-6 shadow-sm">
          <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Payload Preview (JSON)</p>
          <pre class="overflow-x-auto text-sm leading-relaxed text-green-400"><code>{{ JSON.stringify(buildOrderPayload(), null, 2) }}</code></pre>
        </div>

        <div v-if="orderError" class="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {{ orderError }}
        </div>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <NuxtLink
            to="/customer/cart"
            class="rounded-lg border border-gray-300 px-5 py-3 text-center text-sm font-semibold text-gray-700 transition hover:border-indigo-400 hover:text-indigo-600"
          >
            ← Back to Cart
          </NuxtLink>
          <button
            @click="placeOrder"
            :disabled="isPlacing"
            class="rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ isPlacing ? 'Placing Order…' : '🎉 Place Order' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
