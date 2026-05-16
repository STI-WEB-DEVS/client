<template>
  <div class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="mb-8 flex items-center gap-4">
      <button @click="$router.back()" class="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50 hover:text-gray-900">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Checkout</h1>
    </div>

    <!-- Success State -->
    <div v-if="orderPlaced" class="flex flex-col items-center justify-center rounded-2xl border border-green-100 bg-green-50 p-12 text-center shadow-sm">
      <div class="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <svg class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 class="mt-6 text-2xl font-bold text-green-900">Order Placed Successfully!</h2>
      <p class="mt-2 text-base text-green-700">Your payload has been logged to the console.</p>
      
      <div class="mt-8 flex gap-4">
        <NuxtLink
          to="/customer/Order"
          class="rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-700 shadow-md"
        >
          View My Orders
        </NuxtLink>
        <NuxtLink
          to="/customer/shop"
          class="rounded-xl border border-green-200 bg-white px-6 py-3 text-sm font-bold text-green-700 transition hover:bg-green-50"
        >
          Continue Shopping
        </NuxtLink>
      </div>
    </div>

    <div v-else class="grid gap-8 lg:grid-cols-12">
      <!-- Left side: Form & Items -->
      <div class="lg:col-span-7 space-y-6">
        
        <!-- Customer Details -->
        <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2">
            <svg class="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Customer Details
          </h2>
          <div class="mt-4 flex items-center gap-4 rounded-xl bg-gray-50 p-4 border border-gray-100">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white shadow-sm">
              {{ (userName.charAt(0) || userUuid.charAt(0) || 'C').toUpperCase() }}
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900">{{ userName || 'Authenticated Customer' }}</p>
              <p class="text-xs text-gray-500 mt-0.5">{{ userEmail || 'user@example.com' }}</p>
              <p class="text-xs text-gray-400 mt-1 font-mono">ID: {{ userUuid }}</p>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <svg class="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Items to Purchase ({{ totalQuantity }})
          </h2>
          <ul class="divide-y divide-gray-100">
            <li v-for="item in activeItems" :key="item.product_uuid" class="py-3 flex justify-between items-center">
              <div>
                <p class="text-sm font-bold text-gray-900">{{ item.name }}</p>
                <p class="text-xs text-gray-500 mt-0.5">Quantity: {{ item.quantity }} &times; ${{ item.price.toFixed(2) }}</p>
              </div>
              <p class="text-sm font-extrabold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- Right side: Place Order -->
      <div class="lg:col-span-5">
        <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sticky top-24">
          <h2 class="text-lg font-bold text-gray-900">Summary</h2>
          
          <dl class="mt-6 space-y-4 text-sm text-gray-600">
            <div class="flex justify-between">
              <dt>Subtotal</dt>
              <dd class="font-medium text-gray-900">${{ activeTotal.toFixed(2) }}</dd>
            </div>
            <div class="flex justify-between border-t border-gray-100 pt-4 text-xl font-extrabold text-gray-900">
              <dt>Total</dt>
              <dd>${{ activeTotal.toFixed(2) }}</dd>
            </div>
          </dl>

          <!-- Error Alert -->
          <div v-if="submitError" class="mt-4 rounded-xl border border-red-200 bg-red-50 p-3">
            <p class="text-sm text-red-700">{{ submitError }}</p>
          </div>

          <button
            @click="handlePlaceOrder"
            :disabled="pending || activeItems.length === 0"
            class="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-md transition hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="pending" class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ pending ? 'Processing...' : 'Place Order' }}
          </button>
          
          <div class="mt-4 rounded-xl bg-gray-900 p-4 border border-gray-700">
            <p class="text-xs text-gray-400 mb-2 font-semibold tracking-wider uppercase">Payload Preview</p>
            <pre class="overflow-x-auto text-[10px] leading-relaxed text-green-400"><code>{{ prettyPayload }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCart } from '~/composables/useCart'
import { orderService } from '~/api/order/OrderService'

definePageMeta({
  layout: 'customer'
})

const { cartItems, directCheckoutItems, clearCart } = useCart()

const pending = ref(false)
const orderPlaced = ref(false)
const submitError = ref<string | null>(null)

// If directCheckoutItems has items, we are in "Buy Now" flow. Otherwise, normal Cart flow.
const activeItems = computed(() => {
  return directCheckoutItems.value.length > 0 ? directCheckoutItems.value : cartItems.value
})

const activeTotal = computed(() => {
  return activeItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const totalQuantity = computed(() => {
  return activeItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

// User Context
const userUuid = computed(() => process.client ? (localStorage.getItem('_uuid') || '') : '')
const customerUuid = computed(() => process.client ? (localStorage.getItem('_customer_uuid') || '') : '')
const userName = computed(() => process.client ? (localStorage.getItem('_name') || '') : '')
const userEmail = computed(() => process.client ? (localStorage.getItem('_email') || '') : '')

// Payload Generation
const orderPayload = computed(() => {
  if (!customerUuid.value) return null
  return {
    customer_uuid: customerUuid.value,
    items: activeItems.value.map(item => ({
      product_uuid: item.product_uuid,
      quantity: item.quantity
    }))
  }
})

const prettyPayload = computed(() => {
  return orderPayload.value ? JSON.stringify(orderPayload.value, null, 2) : 'Missing user UUID context.'
})

// Submission
const handlePlaceOrder = async () => {
  if (!userUuid.value) {
    submitError.value = "You must be logged in to place an order."
    return
  }

  submitError.value = null
  pending.value = true

  try {
    const payload = orderPayload.value

    if (!payload) {
      throw new Error("Payload is missing.")
    }

    await orderService.create(payload)

    orderPlaced.value = true
    
    // If it was the normal cart, clear it
    if (directCheckoutItems.value.length === 0) {
      clearCart()
    } else {
      // Clear the temporary buy now items
      directCheckoutItems.value = []
    }

  } catch (err: any) {
    submitError.value = err?.message || 'Something went wrong.'
  } finally {
    pending.value = false
  }
}
</script>
