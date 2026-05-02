<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useOrdersStore } from '~/stores/order'   
import { useRoute } from 'vue-router'
import { CheckCircleIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'

definePageMeta({ layout: 'customer' })

const route = useRoute()
const cart = useCartStore()
const ordersStore = useOrdersStore()

// Direct purchase query params
const directUuid = route.query.direct_uuid as string
const directName = route.query.direct_name as string
const directPrice = route.query.direct_price ? parseFloat(route.query.direct_price as string) : 0
const directQty = route.query.direct_qty ? parseInt(route.query.direct_qty as string) : 1
const directCustomerUuid = route.query.direct_customer_uuid as string

const isDirectBuy = !!directUuid

// Customer UUID – from direct query or localStorage
const customerUuid = ref(
  isDirectBuy && directCustomerUuid ? directCustomerUuid : (process.client ? (localStorage.getItem('uuid') ?? '') : '')
)

// Customer name – from localStorage
const customerName = ref(process.client ? (localStorage.getItem('name') || '') : '')

const errors = ref<{ customer_uuid?: string; items?: string }>({})
const showSuccess = ref(false)
const isPlacing = ref(false)

const orderItems = computed(() => {
  if (isDirectBuy) {
    return [{
      product_uuid: directUuid,
      name: directName,
      price: directPrice,
      quantity: directQty,
    }]
  }
  return cart.items.map(item => ({
    product_uuid: item.product_uuid,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }))
})

const totalPrice = computed(() => {
  return orderItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

function validate() {
  errors.value = {}
  if (!customerUuid.value.trim()) {
    errors.value.customer_uuid = 'Customer UUID is required.'
  }
  if (orderItems.value.length === 0) {
    errors.value.items = 'No items to order.'
  }
  return Object.keys(errors.value).length === 0
}

async function placeOrder() {

  if (!validate()) {
    console.log('VALIDATION FAILED', errors.value)
    return
  }

  const payload = {
    customer_uuid: customerUuid.value.trim(),
    items: orderItems.value,
    total: totalPrice.value
  }

  console.log('CONSOLE PAYLOAD:', payload)

  if (!validate()) return
  isPlacing.value = true

  try {
    await ordersStore.addOrder(
      customerUuid.value.trim(),
      orderItems.value,
      totalPrice.value
    )

    if (!isDirectBuy) {
      cart.clearCart()
    }

    showSuccess.value = true
  } catch (err) {
    console.error('Failed to place order:', err)
    errors.value.customer_uuid = 'Failed to place order. Please try again.'
  } finally {
    isPlacing.value = false
  }
}

function cancelOrder() {
  navigateTo('/customer/shop')
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
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">Checkout</h1>
          <p class="mt-1 text-sm text-gray-500">Complete your order securely</p>
        </div>
        <NuxtLink 
          to="/customer/cart" 
          class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <ArrowLeftIcon class="h-4 w-4" />
          Back to Cart
        </NuxtLink>
      </div>

      <!-- Main Grid -->
      <div class="grid gap-8 lg:grid-cols-3">
        <div class="lg:col-span-2 space-y-6">
          <!-- Step 1: Customer Info -->
          <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4 font-semibold text-gray-900">
              1. Customer Information
            </div>
            <div class="p-6 space-y-4">
              <div v-if="customerName && customerName !== 'Guest'" class="rounded-xl bg-indigo-50 p-3 text-sm">
                <span class="font-medium text-indigo-800">👤 {{ customerName }}</span>
              </div>

              <label class="block">
                <span class="text-sm font-medium text-gray-700">Customer UUID</span>
                <input
                  v-model="customerUuid"
                  type="text"
                  class="mt-1.5 block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  :class="{ 'border-red-500': errors.customer_uuid }"
                />
                <p v-if="errors.customer_uuid" class="mt-1.5 text-xs text-red-500">{{ errors.customer_uuid }}</p>
              </label>
            </div>
          </div>

          <!-- Step 2: Items (for Cart only) -->
          <div v-if="orderItems.length > 1" class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4 font-semibold text-gray-900">
              2. Order Items
            </div>
            <div class="divide-y divide-gray-100">
              <div v-for="item in orderItems" :key="item.product_uuid" class="flex items-center justify-between p-4 hover:bg-gray-50/50">
                <div>
                  <p class="font-medium text-gray-900">{{ item.name }}</p>
                  <p class="text-xs text-gray-500">{{ formatPrice(item.price) }} × {{ item.quantity }}</p>
                </div>
                <p class="font-semibold text-gray-900">{{ formatPrice(item.price * item.quantity) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Summary -->
        <div class="lg:col-span-1">
          <div class="sticky top-8 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
            <div class="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 text-white">
              <h3 class="text-lg font-semibold">Order Summary</h3>
            </div>
            
            <div class="p-6 space-y-4">
              <div class="max-h-60 overflow-y-auto space-y-3">
                <div v-for="item in orderItems" :key="item.product_uuid" class="flex justify-between text-sm">
                  <span class="text-gray-600">{{ item.name }} x{{ item.quantity }}</span>
                  <span class="font-medium">{{ formatPrice(item.price * item.quantity) }}</span>
                </div>
              </div>

              <div class="border-t pt-4">
                <div class="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span class="text-indigo-600 text-xl">{{ formatPrice(totalPrice) }}</span>
                </div>
              </div>

              <div class="pt-4 space-y-3">
                <button
                  @click="placeOrder"
                  :disabled="isPlacing"
                  class="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
                >
                  {{ isPlacing ? 'Processing...' : 'Place Order' }}
                </button>
                <button
                  @click="cancelOrder"
                  class="w-full rounded-xl border border-red-100 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showSuccess" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div class="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-2xl">
            <CheckCircleIcon class="mx-auto h-16 w-16 text-green-500" />
            <h3 class="mt-4 text-2xl font-bold text-gray-900">Order Placed!</h3>
            <p class="mt-2 text-gray-500 text-sm">Salamat sa pagpalit! Malampuson ang imong order.</p>
            <div class="mt-8 flex gap-3">
              <button @click="goToOrders" class="flex-1 rounded-xl bg-indigo-600 py-3 text-white font-bold hover:bg-indigo-700">View Orders</button>
              <button @click="navigateTo('/customer/shop')" class="flex-1 rounded-xl border border-gray-200 py-3 font-bold hover:bg-gray-50">Shop Again</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>