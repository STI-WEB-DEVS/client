<template>
  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Cart</h1>
      <p class="text-sm text-gray-500 mt-1">Inventory items, available quantities, and inventory totals.</p>
    </div>

    <div class="lg:grid lg:grid-cols-12 lg:gap-8">
      <!-- Left Column - Products Table -->
      <div class="lg:col-span-8">
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in cartItems" :key="item.product_uuid" class="hover:bg-gray-50">
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <button 
                        @click="updateQuantity(item.product_uuid, item.quantity - 1)"
                        class="w-6 h-6 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                      >-</button>
                      <span class="text-sm text-gray-900 w-8 text-center">{{ item.quantity }}</span>
                      <button 
                        @click="updateQuantity(item.product_uuid, item.quantity + 1)"
                        class="w-6 h-6 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                      >+</button>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">₱{{ formatPrice(item.price) }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">₱{{ formatPrice(item.price * item.quantity) }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <button 
                      @click="removeItem(item.product_uuid)"
                      class="text-red-600 hover:text-red-800 text-sm"
                    >Remove</button>
                  </td>
                </tr>
                <tr v-if="cartItems.length === 0">
                  <td colspan="5" class="px-6 py-16 text-center">
                    <p class="text-gray-500">Your cart is empty</p>
                    <NuxtLink to="/shop" class="mt-4 inline-block text-blue-600 hover:text-blue-800">
                      Continue Shopping
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="cartItems.length > 0" class="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div class="flex justify-end">
              <div class="w-64">
                <div class="flex justify-between py-2">
                  <span class="font-medium text-gray-600">Subtotal</span>
                  <span class="font-bold text-gray-900">₱{{ formatPrice(totalPrice) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Order Summary -->
      <div class="lg:col-span-4 mt-6 lg:mt-0">
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h2 class="text-lg font-semibold text-gray-900">Order Summary</h2>
          </div>
          
          <div class="p-6">
            <div class="border-b border-gray-200 pb-4 mb-4">
              <p class="text-sm font-medium text-gray-700 mb-3">Items</p>
              <div class="space-y-2">
                <div v-for="item in cartItems" :key="item.product_uuid" class="flex justify-between text-sm">
                  <span class="text-gray-600">{{ item.name }}</span>
                  <span class="text-gray-900">{{ item.quantity }} x ₱{{ formatPrice(item.price) }}</span>
                </div>
              </div>
            </div>

            <div class="flex justify-between pt-2">
              <span class="font-semibold text-gray-900">Total</span>
              <span class="text-xl font-bold text-blue-600">{{ formattedTotal }}</span>
            </div>

            <div class="mt-6 space-y-3">
              <button 
                @click="placeOrder" 
                :disabled="cartItems.length === 0"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                Proceed to Checkout
              </button>

              <button 
                v-if="cartItems.length > 0"
                @click="clearCart"
                class="w-full border border-gray-300 bg-white py-2 px-4 rounded-md font-medium text-gray-700 hover:bg-gray-50"
              >
                Clear Cart
              </button>
            </div>

            <NuxtLink to="/shop" class="mt-4 block text-center text-sm text-blue-600 hover:text-blue-700">
              Continue Shopping
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Payload Modal -->
    <div v-if="showPayloadModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75" @click="showPayloadModal = false"></div>
        <div class="relative w-full max-w-2xl bg-white rounded-lg shadow-xl">
          <div class="bg-gray-800 px-6 py-4 rounded-t-lg">
            <h3 class="text-lg font-semibold text-white">Order Payload</h3>
          </div>
          <div class="p-6">
            <pre class="max-h-96 overflow-auto bg-gray-900 p-4 rounded text-sm text-green-400">{{ JSON.stringify(payloadData, null, 2) }}</pre>
            <div class="mt-6 flex justify-end gap-3">
              <button @click="showPayloadModal = false" class="px-4 py-2 border rounded-md">Close</button>
              <button @click="copyToClipboard" class="px-4 py-2 bg-blue-600 text-white rounded-md">Copy JSON</button>
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

const formatPrice = (price) => price.toLocaleString('en-PH', { minimumFractionDigits: 2 })

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
  console.log('Order Payload:', JSON.stringify(payload, null, 2))
  showPayloadModal.value = true
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(JSON.stringify(payloadData.value, null, 2))
  alert('JSON copied!')
}

onMounted(() => {
  loadCart()
})
</script>