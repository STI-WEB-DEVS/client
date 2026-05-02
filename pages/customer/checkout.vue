<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useOrdersStore } from '~/stores/order'   
import { useRoute } from 'vue-router'
import { CheckCircleIcon, ArrowLeftIcon, CreditCardIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/vue/24/outline'

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

// Customer name – from localStorage (set during login)
const customerName = ref(process.client ? (localStorage.getItem('customer_name') || '') : '')

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
  if (!validate()) return
  isPlacing.value = true
  
  await new Promise(resolve => setTimeout(resolve, 500))
  
  ordersStore.addOrder(
    customerUuid.value.trim(),
    orderItems.value,
    totalPrice.value
  )

  if (!isDirectBuy) {
    cart.clearCart()
  }

  isPlacing.value = false
  showSuccess.value = true
}

function cancelOrder() {
  if (isDirectBuy) {
    navigateTo('/customer/shop')
  } else {
    cart.clearCart()
    navigateTo('/customer/shop')
  }
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

      <!-- Grid with equal-height columns -->
      <div class="grid gap-8 lg:grid-cols-3">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Customer Information Card – flex column to fill height -->
          <div class="h-full flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
              <div class="flex items-center gap-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                  <span class="text-sm font-bold text-indigo-600">1</span>
                </div>
                <h2 class="text-lg font-semibold text-gray-900">Customer Information</h2>
              </div>
            </div>
            <div class="flex-1 p-6 space-y-4">
              <!-- Customer name only -->
              <div v-if="customerName && customerName !== 'Guest'" class="rounded-xl bg-indigo-50 p-3 text-sm">
                <div class="flex items-center gap-2 text-indigo-800">
                  <span class="font-medium">👤 {{ customerName }}</span>
                </div>
                <p class="text-xs text-indigo-600 mt-1">Order will be processed under this customer</p>
              </div>

              <label class="block">
                <span class="text-sm font-medium text-gray-700">Customer UUID</span>
                <input
                  v-model="customerUuid"
                  type="text"
                  placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                  class="mt-1.5 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-200': errors.customer_uuid }"
                />
                <p v-if="errors.customer_uuid" class="mt-1.5 text-xs text-red-500">{{ errors.customer_uuid }}</p>
                <p class="mt-2 text-xs text-gray-400 flex items-center gap-1">
                  <ShieldCheckIcon class="h-3 w-3" />
                  Auto-filled from your session. You can override this.
                </p>
              </label>
            </div>
          </div>

          <!-- Order Items Card (only shown if more than one item) -->
          <div v-if="orderItems.length > 1" class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
              <div class="flex items-center gap-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                  <span class="text-sm font-bold text-indigo-600">2</span>
                </div>
                <h2 class="text-lg font-semibold text-gray-900">Order Items</h2>
              </div>
            </div>
            <div class="divide-y divide-gray-100">
              <div v-for="item in orderItems" :key="item.product_uuid" class="flex items-center gap-4 p-4 transition hover:bg-gray-50/50">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-lg font-bold text-indigo-300">
                  {{ item.name.charAt(0).toUpperCase() }}
                </div>
                <div class="min-w-0 flex-1">
                  <p class="font-medium text-gray-900">{{ item.name }}</p>
                  <p class="text-sm text-gray-500">{{ formatPrice(item.price) }} × {{ item.quantity }}</p>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-gray-900">{{ formatPrice(item.price * item.quantity) }}</p>
                </div>
              </div>
            </div>
          </div>

          <p v-if="errors.items" class="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 flex items-center gap-2">
            <span class="text-red-500">⚠️</span> {{ errors.items }}
          </p>
        </div>

        <!-- Right Column: Order Summary – flex column to match height -->
        <div class="lg:col-span-1">
          <div class="h-full flex flex-col rounded-xl border border-gray-200 bg-white shadow-lg">
            <div class="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 rounded-t-xl">
              <h3 class="text-lg font-semibold text-white">Order Summary</h3>
              <p class="text-sm text-indigo-200">{{ orderItems.length }} item{{ orderItems.length !== 1 ? 's' : '' }}</p>
            </div>
            
            <div class="flex-1 p-6 space-y-4">
              <!-- Items list -->
              <div class="space-y-3 max-h-64 overflow-y-auto">
                <div v-for="item in orderItems" :key="item.product_uuid" class="flex justify-between items-center text-sm">
                  <span class="text-gray-600">{{ item.name }} × {{ item.quantity }}</span>
                  <span class="font-medium text-gray-900">{{ formatPrice(item.price * item.quantity) }}</span>
                </div>
              </div>
              
              <!-- Totals -->
              <div class="border-t border-gray-100 pt-4 space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Subtotal</span>
                  <span class="text-gray-700">{{ formatPrice(totalPrice) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Shipping</span>
                  <span class="text-green-600">Free</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Tax</span>
                  <span class="text-gray-700">Included</span>
                </div>
                <div class="border-t border-gray-200 pt-3 mt-2">
                  <div class="flex justify-between text-base font-bold">
                    <span class="text-gray-900">Total</span>
                    <span class="text-indigo-600 text-xl">{{ formatPrice(totalPrice) }}</span>
                  </div>
                </div>
              </div>

              <!-- Action buttons -->
              <div class="mt-6 flex flex-col gap-3">
                <button
                  @click="cancelOrder"
                  class="inline-flex w-full items-center justify-center rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Cancel Order
                </button>
                <button
                  @click="placeOrder"
                  :disabled="orderItems.length === 0 || isPlacing"
                  class="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
                >
                  <div v-if="isPlacing" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  {{ isPlacing ? 'Processing...' : 'Place Order' }}
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
        <div
          v-if="showSuccess"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="goToOrders"
        >
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="goToOrders" />
          <div class="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-center shadow-xl transition-all">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircleIcon class="h-10 w-10 text-green-500" />
            </div>
            <h3 class="mt-4 text-2xl font-bold text-gray-900">Order Placed!</h3>
            <p class="mt-2 text-sm text-gray-500">
              Your order has been successfully placed. You can view your order history in the Orders section.
            </p>
            <div class="mt-6 flex gap-3">
              <button
                @click="goToOrders"
                class="flex-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
              >
                View Orders
              </button>
              <button
                @click="navigateTo('/customer/shop')"
                class="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>