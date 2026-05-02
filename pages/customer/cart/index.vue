<template>
  <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="flex items-center gap-3">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Your Cart</h1>
      <span v-if="cartCount > 0" class="inline-flex items-center justify-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-800">
        {{ cartCount }} Items
      </span>
    </div>

    <div class="mt-8 grid gap-8 lg:grid-cols-12">
      <!-- Left side: Cart Items -->
      <div class="lg:col-span-8">
        <div v-if="cartItems.length === 0" class="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
          <div class="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
            <svg class="h-10 w-10 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 class="mt-4 text-lg font-bold text-gray-900">Your cart is empty</h2>
          <p class="mt-1 text-sm text-gray-500">Looks like you haven't added any products to your cart yet.</p>
          <NuxtLink
            to="/customer/shop"
            class="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </NuxtLink>
        </div>

        <ul v-else class="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
          <li
            v-for="item in cartItems"
            :key="item.product_uuid"
            class="flex items-center gap-6 p-6 transition-colors hover:bg-gray-50"
          >
            <!-- Product Image Placeholder -->
            <div class="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-300">
              <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>

            <!-- Details -->
            <div class="flex flex-1 flex-col justify-between">
              <div class="flex justify-between">
                <div>
                  <h3 class="text-base font-bold text-gray-900">{{ item.name }}</h3>
                  <p class="mt-1 text-sm text-gray-500">${{ item.price.toFixed(2) }} each</p>
                </div>
                <p class="text-lg font-extrabold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>

              <div class="mt-4 flex items-center justify-between">
                <!-- Quantity Stepper -->
                <div class="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
                  <button
                    @click="updateQuantity(item.product_uuid, item.quantity - 1)"
                    class="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:opacity-40"
                    :disabled="item.quantity <= 1"
                  >
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <span class="w-10 text-center text-sm font-semibold text-gray-900">{{ item.quantity }}</span>
                  <button
                    @click="updateQuantity(item.product_uuid, item.quantity + 1)"
                    class="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                  >
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                <!-- Remove Button -->
                <button
                  @click="removeFromCart(item.product_uuid)"
                  class="flex items-center gap-1.5 text-sm font-medium text-red-500 transition hover:text-red-700"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Right side: Summary -->
      <div class="lg:col-span-4">
        <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sticky top-24">
          <h2 class="text-lg font-bold text-gray-900">Order Summary</h2>
          
          <dl class="mt-6 space-y-4 text-sm text-gray-600">
            <div class="flex justify-between">
              <dt>Subtotal</dt>
              <dd class="font-medium text-gray-900">${{ cartTotal.toFixed(2) }}</dd>
            </div>
            <div class="flex justify-between">
              <dt>Shipping</dt>
              <dd class="font-medium text-gray-900">Calculated at checkout</dd>
            </div>
            <div class="flex justify-between border-t border-gray-100 pt-4 text-base font-extrabold text-gray-900">
              <dt>Estimated Total</dt>
              <dd>${{ cartTotal.toFixed(2) }}</dd>
            </div>
          </dl>

          <NuxtLink
            v-if="cartItems.length > 0"
            to="/customer/checkout"
            class="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-md transition hover:bg-indigo-700 hover:shadow-lg active:scale-95"
            @click="prepareCheckout"
          >
            Proceed to Checkout
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>

          <div class="mt-6 text-center">
            <p class="text-xs text-gray-500">
              Secure checkout. Free shipping on orders over $50.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart'

definePageMeta({
  layout: 'customer'
})

const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart, directCheckoutItems } = useCart()

// When clicking checkout from the cart page, we clear the direct checkout items so checkout uses the main cart
const prepareCheckout = () => {
  directCheckoutItems.value = []
}
</script>
