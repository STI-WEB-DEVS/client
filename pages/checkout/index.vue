<template>
  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Checkout</h1>
          <p class="text-sm text-gray-500 mt-1">Review and manage all items in your cart</p>
        </div>
        <!-- Cart Summary Badge - Only shows when there are items -->
        <div v-if="totalItems > 0" class="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full">
          <svg class="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 1.5M17 13l1.5 1.5M9 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          <span class="font-semibold text-indigo-600">{{ totalItems }} {{ totalItems === 1 ? 'item' : 'items' }}</span>
        </div>
      </div>
    </div>

    <div class="lg:grid lg:grid-cols-12 lg:gap-8">
      <!-- Left Column - All Cart Items -->
      <div class="lg:col-span-7">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div class="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
            <h2 class="text-lg font-semibold text-gray-900">All Items in Cart ({{ cartItems.length }} products)</h2>
            <p class="text-sm text-gray-500">These are all the products you've added to your cart</p>
          </div>
          
          <!-- Cart History - Shows ALL products added -->
          <div class="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
            <div v-for="item in cartItems" :key="item.product_uuid" class="group p-6 hover:bg-gray-50 transition-all duration-300">
              <div class="flex items-start gap-4">
                <!-- Product Icon -->
                <div class="flex-shrink-0">
                  <div class="h-16 w-16 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <svg class="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                </div>
                
                <!-- Product Details -->
                <div class="flex-1">
                  <div class="flex items-start justify-between">
                    <div>
                      <h3 class="font-semibold text-gray-900 text-lg">{{ item.name }}</h3>
                      <p class="text-xs text-gray-400 mt-0.5">Added: {{ formatDate(item.addedAt) }}</p>
                    </div>
                    <button 
                      @click="removeItem(item.product_uuid)"
                      class="opacity-0 group-hover:opacity-100 transition-all duration-300 text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-lg"
                    >
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div class="flex items-center justify-between mt-3">
                    <!-- Quantity Controls -->
                    <div class="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button 
                        @click="updateQuantity(item.product_uuid, item.quantity - 1)"
                        class="h-8 w-8 rounded-lg bg-white text-gray-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center shadow-sm"
                      >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span class="w-10 text-center font-semibold text-gray-900">{{ item.quantity }}</span>
                      <button 
                        @click="updateQuantity(item.product_uuid, item.quantity + 1)"
                        class="h-8 w-8 rounded-lg bg-white text-gray-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center shadow-sm"
                      >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    
                    <!-- Price -->
                    <div class="text-right">
                      <p class="text-xl font-bold text-indigo-600">₱{{ formatPrice(item.price * item.quantity) }}</p>
                      <p class="text-xs text-gray-400">₱{{ formatPrice(item.price) }} each</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Empty Cart State -->
          <div v-if="cartItems.length === 0" class="py-16 text-center">
            <div class="mx-auto h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg class="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 1.5M17 13l1.5 1.5M9 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
            <p class="text-gray-500 font-medium">Your cart is empty</p>
            <p class="text-sm text-gray-400 mt-1">Go ahead and add some products to your cart!</p>
            <NuxtLink to="/shop" class="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all">
              Browse Products
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Price Summary -->
          <div v-if="cartItems.length > 0" class="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white px-6 py-5">
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal ({{ totalItems }} items)</span>
                <span class="font-medium text-gray-900">₱{{ formatPrice(totalPrice) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Shipping</span>
                <span class="text-green-600 font-medium">Free</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Tax (10%)</span>
                <span class="text-gray-900">₱{{ formatPrice(totalPrice * 0.1) }}</span>
              </div>
              <div class="flex justify-between pt-2 border-t border-gray-200 mt-2">
                <span class="text-lg font-bold text-gray-900">Total</span>
                <span class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ₱{{ formatPrice(totalPrice + (totalPrice * 0.1)) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Order Actions -->
      <div class="lg:col-span-5 mt-6 lg:mt-0">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24 border border-gray-100">
          <div class="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
            <h2 class="text-lg font-semibold text-gray-900">Order Summary</h2>
          </div>
          
          <div class="p-6">
            <!-- REMOVED: Items in Your Cart preview section - PERMANENTLY REMOVED -->
            
            <div class="space-y-3">
              <div class="flex justify-between pt-2">
                <span class="text-gray-700 font-medium">Final Total:</span>
                <span class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {{ formattedTotal }}
                </span>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="mt-6 space-y-3">
              <button 
                @click="placeOrder" 
                :disabled="cartItems.length === 0"
                class="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-base font-semibold text-white transition-all hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                Place Order ({{ totalItems }} items)
              </button>

              <button 
                v-if="cartItems.length > 0"
                @click="clearCart"
                class="w-full rounded-xl border-2 border-red-300 bg-white py-2.5 text-sm font-medium text-red-600 transition-all hover:bg-red-50 hover:border-red-400"
              >
                Clear All Items
              </button>
            </div>

            <NuxtLink to="/shop" class="mt-4 block text-center text-sm text-indigo-600 hover:text-indigo-700 hover:underline transition-all">
              ← Add More Items
            </NuxtLink>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="mt-6 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
          <p class="text-sm font-semibold text-gray-700 mb-3">💳 Accepted Payment Methods</p>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">Visa</span>
            <span class="px-3 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">Mastercard</span>
            <span class="px-3 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">PayPal</span>
            <span class="px-3 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">GCash</span>
            <span class="px-3 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">Maya</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Payload Modal -->
    <div v-if="showPayloadModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm" @click="showPayloadModal = false"></div>
        <div class="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h3 class="text-xl font-semibold text-white">Order Payload ({{ cartItems.length }} products)</h3>
            <p class="text-sm text-indigo-100">This JSON will be sent to the server</p>
          </div>
          <div class="p-6">
            <pre class="max-h-96 overflow-auto rounded-xl bg-gray-900 p-4 text-sm text-green-400 font-mono">{{ JSON.stringify(payloadData, null, 2) }}</pre>
            <div class="mt-6 flex justify-end gap-3">
              <button @click="showPayloadModal = false" class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                Close
              </button>
              <button @click="copyToClipboard" class="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white hover:from-indigo-700 hover:to-purple-700 transition-all">
                Copy JSON
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCart } from '~/composables/useCart'

definePageMeta({ layout: 'customer' })

const { 
  cartItems, 
  totalItems, 
  totalPrice, 
  formattedTotal, 
  updateQuantity,
  removeItem,
  clearCart,
  loadCart 
} = useCart()

const showPayloadModal = ref(false)
const payloadData = ref(null)

const formatPrice = (price) => price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const formatDate = (timestamp) => {
  if (!timestamp) return 'Just now'
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const placeOrder = () => {
  const customerUuid = localStorage.getItem('user_uuid')
  
  const payload = {
    customer_uuid: customerUuid,
    order_date: new Date().toISOString(),
    total_items: totalItems.value,
    total_amount: totalPrice.value,
    items: cartItems.value.map(item => ({
      product_uuid: item.product_uuid,
      product_name: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      subtotal: item.price * item.quantity
    }))
  }
  
  payloadData.value = payload
  
  console.log('=== ORDER PAYLOAD ===')
  console.log(JSON.stringify(payload, null, 2))
  console.log('Total items in order:', totalItems.value)
  console.log('=====================')
  
  showPayloadModal.value = true
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(JSON.stringify(payloadData.value, null, 2))
  alert('JSON copied to clipboard!')
}

onMounted(() => {
  loadCart()
  console.log('Cart loaded with', cartItems.value.length, 'items')
})
</script>

<style scoped>
/* No additional styles needed */
</style>