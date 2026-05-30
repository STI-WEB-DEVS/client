<script setup>
import { useCart } from '~/composables/useCart'
import { useRouter } from 'vue-router'
import { ref } from 'vue' // Added ref to handle reactive tracking states

definePageMeta({ 
  layout: 'customer',
  role: 'customer' 
})

const { cart, getCartTotal, updateQuantity, clearCart } = useCart()
const router = useRouter()

const isSubmitting = ref(false)   // Tracks network submission animations
const checkoutError = ref(null)   // Holds inventory stock error exceptions

const formatCurrency = (n) => new Intl.NumberFormat('en-PH', { 
  style: 'currency', 
  currency: 'PHP' 
}).format(n)

/**
 * Whiteboard Requirement: Call the orders (post) creation.
 * Fixed: Added validation tracking hooks to intercept backend out-of-stock messages.
 */
const handlePlaceOrder = async () => {
  // Validate empty cart before checkout
  if (cart.value.length === 0) {
    checkoutError.value = "Your cart is empty. Please add items before placing an order."
    return
  }

  isSubmitting.value = true
  checkoutError.value = null

  try {
    // 1. Build specific payload structure
    const payload = {
      "customer_uuid": localStorage.getItem('_uuid'),
      "items": cart.value.map(item => ({
        "product_uuid": item.product_uuid,
        "quantity": item.quantity
      }))
    }

    // 2. Retrieve the auth token to pass the backend sanctum middleware security check
    const token = localStorage.getItem('_token')

    // 3. Submit to API with the required Authorization Bearer token
    const response = await $fetch('http://127.0.0.1:8000/api/orders', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: payload
    })

    // 4. Show UI success message and handle clean up
    alert("Success! Order payload has been generated, submitted, and logged.")
    
    if (clearCart) clearCart()
    router.push('/customer/order')
    
  } catch (err) {
    // 🛑 Capture custom stock exceptions sent back by Laravel ('Sorry, X item only has Y left...')
    console.error("Network Error Details:", err)
    checkoutError.value = err.data?.message || "An unexpected error occurred while processing your order over the network."
  } finally {
    isSubmitting.value = false
  }
}

const goBack = () => router.push('/customer/cart')
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-10">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
        <p class="mt-2 text-sm text-gray-500">Review your items before finalizing your purchase.</p>
      </div>
      <button 
        @click="goBack"
        class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
      >
        <span>←</span> Back to Cart
      </button>
    </div>

    <div class="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-start">
      <div class="lg:col-span-4">
        <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <h2 class="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
          
          <div v-if="cart.length > 0" class="space-y-6">
            <div v-for="item in cart" :key="item.product_uuid" class="flex items-center gap-4">
              <div class="h-14 w-14 flex-shrink-0 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                <svg class="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.587-1.587a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-sm font-bold text-gray-900">{{ item.name }}</h3>
                <div class="mt-1 flex items-center gap-3 text-xs font-medium text-gray-500">
                  <button @click="updateQuantity(item.product_uuid, item.quantity - 1)" class="hover:text-indigo-600 transition-colors"><span>−</span></button>
                  <span class="text-gray-900">{{ item.quantity }}</span>
                  <button @click="updateQuantity(item.product_uuid, item.quantity + 1)" class="hover:text-indigo-600 transition-colors"><span>+</span></button>
                </div>
              </div>
              <div class="text-sm font-bold text-gray-900">
                {{ formatCurrency(item.price * item.quantity) }}
              </div>
            </div>
          </div>
          
          <div v-else class="py-6 text-center text-sm text-gray-500 italic">
            Your cart is currently empty.
          </div>

          <div class="mt-8 border-t border-gray-100 pt-6">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-500">Subtotal</span>
              <span class="text-sm font-bold text-gray-900">{{ formatCurrency(getCartTotal()) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 lg:col-span-8 lg:mt-0">
        <div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm ring-1 ring-gray-900/5 h-full flex flex-col justify-between">
          <div>
            <h2 class="text-xl font-bold text-gray-900">Details</h2>
            <p class="mt-2 text-sm text-gray-500">
              This will fire an active HTTP POST request containing your credentials directly to your backend service.
            </p>

            <div v-if="checkoutError" class="mt-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
              <div class="flex gap-2 items-center">
                <svg class="h-5 w-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span class="font-bold tracking-tight">{{ checkoutError }}</span>
              </div>
            </div>

            <div class="mt-16">
              <span class="text-xs font-bold uppercase tracking-widest text-gray-400">Total Amount</span>
              <div class="mt-2 text-6xl font-black text-gray-900 tracking-tighter">
                {{ formatCurrency(getCartTotal()) }}
              </div>
            </div>
          </div>

          <div class="mt-12 flex justify-end">
            <button
              @click="handlePlaceOrder"
              class="rounded-xl bg-indigo-600 px-12 py-4 text-base font-bold text-white shadow-xl hover:bg-indigo-700 transition-all active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              :disabled="cart.length === 0 || isSubmitting"
            >
              <span v-if="isSubmitting" class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              {{ isSubmitting ? 'Verifying Stock Pool...' : 'Place Order' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>