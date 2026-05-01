<script setup>
import { cartService } from '~/api/cart/CartService';
definePageMeta({
  layout: 'customer'
})

const cart = computed(() => cartService.items)
const cartTotal = computed(() => cartService.getTotal())
const cartCount = computed(() => cartService.getCount())
const clearCart = () => cartService.clear()
</script>

<template>
  <div class="w-full mx-auto">
    <PageHeader title="Shopping Cart" :description="`You have ${cartCount} items in your cart.`" />

    <div v-if="cart.length > 0" class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-7">
      <div class="lg:col-span-2 space-y-4">
        <CartItem v-for="item in cart" :key="item.uuid || item.id" :item="item" />

        <button @click="clearCart"
          class="mt-4 text-sm text-gray-500 hover:text-red-500 flex items-center gap-2 transition-colors px-2">
          <Icon name="heroicons:trash" />
          Clear Shopping Cart
        </button>
      </div>

      <div class="h-fit sticky top-8">
        <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Summary</h2>

          <div class="space-y-4 text-sm">
            <div class="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span class="font-bold text-gray-900">₱{{ cartTotal }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span class="text-green-600 font-bold">Free</span>
            </div>
            <div class="pt-4 border-t border-gray-100 flex justify-between items-center">
              <span class="text-base font-bold text-gray-900">Estimated Total</span>
              <span class="text-2xl font-bold text-indigo-600">₱{{ cartTotal }}</span>
            </div>
          </div>

          <NuxtLink to="/customer/checkout"
            class="w-full mt-8 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 text-center">
            Checkout All
            <Icon name="heroicons:arrow-right" />
          </NuxtLink>

          <NuxtLink to="/customer/shop"
            class="w-full mt-4 text-center block text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors">
            Continue Shopping
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else class="mt-12 text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
      <div class="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
        <Icon name="lineicons:cart-2" size="40" />
      </div>
      <h2 class="text-2xl font-bold text-gray-900">Your cart is empty</h2>
      <p class="text-gray-500 mt-2 max-w-xs mx-auto">Looks like you haven't added anything to your cart yet.</p>
      <NuxtLink to="/customer/shop"
        class="mt-8 inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
        Start Shopping
      </NuxtLink>
    </div>
  </div>
</template>