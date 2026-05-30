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
                        :disabled="item.quantity >= item.maxStock"
                        class="w-6 h-6 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >+</button>
                    </div>
                    <p class="mt-1 text-xs text-gray-500">
                      {{ item.maxStock > 0 ? `Stock Left: ${item.maxStock}` : 'Out of Stock' }}
                    </p>
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
                <div class="flex justify-between py-2 text-sm">
                  <span class="font-medium text-gray-600">Total Items</span>
                  <span class="font-semibold text-gray-900">{{ totalItems }}</span>
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
            <div class="mt-2 flex justify-between text-sm">
              <span class="font-medium text-gray-600">Total Items</span>
              <span class="font-semibold text-gray-900">{{ totalItems }}</span>
            </div>

            <div class="mt-6 space-y-3">
              <button 
                @click="placeOrder" 
                :disabled="cartItems.length === 0 || isPlacingOrder"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {{ isPlacingOrder ? 'Checking stock...' : 'Proceed to Checkout' }}
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
            <div class="mb-4">
              <h4 class="text-sm font-semibold text-gray-700 mb-2">Request Payload</h4>
              <pre class="max-h-64 overflow-auto bg-gray-900 p-4 rounded text-sm text-green-400">{{ JSON.stringify(payloadData, null, 2) }}</pre>
            </div>
            <div v-if="responseData" class="mb-4">
              <h4 class="text-sm font-semibold text-gray-700 mb-2">Response</h4>
              <pre class="max-h-64 overflow-auto bg-gray-900 p-4 rounded text-sm text-blue-300">{{ JSON.stringify(responseData, null, 2) }}</pre>
            </div>
            <div class="mt-6 flex justify-end gap-3">
              <button @click="showPayloadModal = false" class="px-4 py-2 border rounded-md hover:bg-gray-100">Close</button>
              <button @click="copyToClipboard" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Copy JSON</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseService from '~/api/BaseService'
import { productService } from '~/api/product/ProductService'
import { useCart } from '~/composables/useCart'

definePageMeta({ layout: 'customer' })

const baseService = new BaseService()

const { 
  cartItems, 
  totalItems, 
  totalPrice, 
  formattedTotal, 
  updateQuantity,
  removeItem,
  syncItemStock,
  clearCart,
  loadCart 
} = useCart()

const showPayloadModal = ref(false)
const payloadData = ref(null)
const responseData = ref(null)
const isPlacingOrder = ref(false)

const formatPrice = (price) => price.toLocaleString('en-PH', { minimumFractionDigits: 2 })

const validateCartStock = async () => {
  for (const item of cartItems.value) {
    const product = await productService.show(item.product_uuid)
    const currentStock = Number(product.stock_quantity ?? 0)

    syncItemStock(product)

    if (currentStock <= 0 || item.quantity > currentStock) {
      alert('Insufficient stock available.')
      return false
    }
  }

  return true
}

const placeOrder = async () => {
  if (isPlacingOrder.value) return

  // Get customer ID from localStorage (should be integer)
  const customerId = localStorage.getItem('customer_id')
  
  if (!customerId) {
    alert('Unable to place order. Please sign in again.')
    return
  }

  isPlacingOrder.value = true

  let hasStock = false
  try {
    hasStock = await validateCartStock()
  } catch (error) {
    console.error('Stock validation failed:', error)
    alert(error.message || 'Unable to verify stock. Please try again.')
    isPlacingOrder.value = false
    return
  }

  if (!hasStock) {
    isPlacingOrder.value = false
    return
  }

  // Build items array with product_uuid and unit_price
  const items = []
  let totalAmount = 0
  
  for (const item of cartItems.value) {
    if (!item.product_uuid) {
      console.error('Missing product_uuid for:', item.name)
      alert(`Missing product UUID for ${item.name}. Please refresh and try again.`)
      isPlacingOrder.value = false
      return
    }
    
    const itemTotal = item.price * item.quantity
    totalAmount += itemTotal
    
    items.push({
      product_uuid: item.product_uuid,
      quantity: item.quantity,
      unit_price: item.price
    })
  }

  // Build correct payload
  const payload = {
    customer_id: Number(customerId),
    total_amount: totalAmount,
    items: items
  }

  console.log('Sending payload:', payload)
  payloadData.value = payload

  try {
    const response = await baseService.request('/orders', 'POST', payload)
    responseData.value = response
    console.log('Order Response:', response)
    
    // Show success message
    alert(`Order placed successfully! Order ID: ${response.order?.id || 'N/A'}`)
    showPayloadModal.value = true
    
    // Clear cart after successful order
    clearCart()
    window.dispatchEvent(new CustomEvent('product-stock-updated'))
    
  } catch (error) {
    console.error('Order creation failed:', error)
    alert(error.message || 'Failed to place order. Please try again.')
  } finally {
    isPlacingOrder.value = false
  }
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(JSON.stringify(payloadData.value, null, 2))
  alert('JSON copied!')
}

onMounted(() => {
  loadCart()
})
</script>
