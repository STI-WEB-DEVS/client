<script setup>
import { useCart } from '~/composables/useCart'
const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart()

definePageMeta({ layout: 'customer' })

const formatCurrency = (n) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(n)
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12">
    <div class="flex justify-between items-end mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Cart</h1>
        <p class="text-gray-500">Review items, update quantities, or remove products.</p>
      </div>
      <NuxtLink to="/customer/shop" class="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50">Continue Shopping</NuxtLink>
    </div>

    <div class="lg:grid lg:grid-cols-12 lg:gap-x-12">
      <div class="lg:col-span-8">
        <!-- Header Labels -->
        <div class="hidden sm:grid grid-cols-12 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">
          <div class="col-span-6">Product</div>
          <div class="col-span-4 text-center">Quantity</div>
          <div class="col-span-2 text-right">Price</div>
        </div>

        <div class="space-y-4">
          <div v-for="item in cart" :key="item.product_uuid" class="bg-white border rounded-xl p-4 shadow-sm grid grid-cols-12 items-center">
            <div class="col-span-6 flex items-center gap-4">
              <div class="h-20 w-20 bg-gray-100 rounded-lg flex-shrink-0"></div>
              <div>
                <h3 class="font-bold text-gray-900">{{ item.name }}</h3>
                <p class="text-sm text-gray-500">{{ formatCurrency(item.price) }} each</p>
              </div>
            </div>
            
            <div class="col-span-4 flex justify-center">
              <div class="flex items-center border rounded-lg overflow-hidden">
                <button @click="updateQuantity(item.product_uuid, item.quantity - 1)" class="px-3 py-1 bg-gray-50 hover:bg-gray-100">-</button>
                <span class="px-4 py-1 bg-white text-sm font-bold">{{ item.quantity }}</span>
                <button @click="updateQuantity(item.product_uuid, item.quantity + 1)" class="px-3 py-1 bg-gray-50 hover:bg-gray-100">+</button>
              </div>
              <button @click="removeFromCart(item.product_uuid)" class="ml-4 p-2 text-red-500 border border-red-100 rounded-lg hover:bg-red-50">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>

            <div class="col-span-2 text-right font-bold text-gray-900">
              {{ formatCurrency(item.price * item.quantity) }}
            </div>
          </div>
        </div>
        
        <div class="mt-6 flex justify-between items-center p-6 border-t">
          <span class="text-lg font-medium text-gray-600">Subtotal</span>
          <span class="text-xl font-bold">{{ formatCurrency(getCartTotal()) }}</span>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-4 mt-12 lg:mt-0">
        <div class="bg-white border rounded-2xl p-8 shadow-sm">
          <h2 class="text-lg font-bold mb-6">Order Summary</h2>
          <div class="flex justify-between items-center mb-8">
            <span class="text-gray-500">Total</span>
            <span class="text-xl font-bold">{{ formatCurrency(getCartTotal()) }}</span>
          </div>
          <NuxtLink to="/customer/checkout" class="block w-full bg-indigo-600 text-white text-center py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all">
            Proceed to Checkout
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>