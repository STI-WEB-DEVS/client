<template>
  <NuxtLayout name="customer">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h2>

      <!-- Cart Items -->
      <div v-if="cartStore.items.length > 0">
        <div class="bg-white rounded-xl border border-gray-200 shadow-lg p-6 mb-6">
          <div class="space-y-4">
            <div v-for="item in cartStore.items" :key="item.id" 
                 class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div class="flex-1">
                <h4 class="font-semibold text-gray-900 text-lg">{{ item.name }}</h4>
                <p class="text-sm text-gray-600 mt-1">₱{{ parseFloat(item.price).toFixed(2) }} each</p>
              </div>
              
              <div class="flex items-center gap-6">
                <!-- Quantity Controls -->
                <div class="flex items-center gap-2 bg-white rounded-lg border border-gray-300 shadow-sm">
                  <button 
                    @click="cartStore.decreaseQty(item.id)"
                    class="px-3 py-2 hover:bg-gray-100 rounded-l-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <span class="px-4 py-2 font-semibold min-w-[3rem] text-center">{{ item.quantity }}</span>
                  <button 
                    @click="cartStore.increaseQty(item.id)"
                    class="px-3 py-2 hover:bg-gray-100 rounded-r-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <!-- Subtotal -->
                <div class="min-w-[8rem] text-right">
                  <p class="text-sm text-gray-600">Subtotal</p>
                  <p class="font-bold text-gray-900 text-lg">₱{{ (parseFloat(item.price) * item.quantity).toFixed(2) }}</p>
                </div>
                
                <!-- Remove Button -->
                <button 
                  @click="cartStore.removeFromCart(item.id)"
                  class="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove item">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart Summary & Checkout -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-gray-600 mb-2">Total Items: <span class="font-semibold text-gray-900">{{ cartStore.totalItems }}</span></p>
              <p class="text-3xl font-bold text-gray-900">Total: ₱{{ cartStore.totalPrice.toFixed(2) }}</p>
            </div>
            <div class="flex gap-4">
              <NuxtLink 
                to="/customer/Order"
                class="bg-gray-200 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
                Continue Shopping
              </NuxtLink>
              <button 
                @click="handleCheckout"
                :disabled="isCheckingOut"
                class="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg">
                <svg v-if="!isCheckingOut" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd" />
                </svg>
                <div v-if="isCheckingOut" class="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span v-if="isCheckingOut">Processing...</span>
                <span v-else>Proceed to Checkout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Cart State -->
      <div v-else class="bg-white rounded-xl border border-gray-200 shadow-lg p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
        <p class="text-gray-600 mb-6">Add some products to get started!</p>
        <NuxtLink 
          to="/customer/Order"
          class="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
          </svg>
          Start Shopping
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const isCheckingOut = ref(false)

// Load cart from localStorage on mount
onMounted(() => {
  cartStore.loadCart()
})

// Handle checkout
const handleCheckout = async () => {
  if (cartStore.items.length === 0) {
    alert('Your cart is empty!')
    return
  }

  isCheckingOut.value = true
  try {
    await cartStore.checkout()
    alert('Order placed successfully! Your order has been saved to the database.')
    // Optionally redirect to dashboard
    await navigateTo('/customer/Dashboard')
  } catch (error) {
    console.error('Checkout failed:', error)
    const errorMessage = error.message || 'Failed to process checkout. Please try again.'
    alert(errorMessage)
  } finally {
    isCheckingOut.value = false
  }
}
</script>
