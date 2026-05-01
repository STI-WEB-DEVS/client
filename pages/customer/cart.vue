<script setup lang="ts">
import { useCart } from '~/composables/useCart'

definePageMeta({ layout: 'customer' })

const { cart, itemCount, totalPrice, updateQuantity, removeFromCart } = useCart()
</script>

<template>
  <div>
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900">Your Cart</h2>
      <p class="mt-1 text-sm text-gray-500">Review your items before checking out.</p>
    </div>

    <!-- Empty cart -->
    <div v-if="!cart.length" class="flex flex-col items-center justify-center py-20 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <p class="mt-4 text-gray-500">Your cart is empty.</p>
      <NuxtLink
        to="/customer/catalog"
        class="mt-4 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Browse Products
      </NuxtLink>
    </div>

    <div v-else class="grid gap-8 lg:grid-cols-3">
      <!-- Cart items list -->
      <div class="lg:col-span-2 space-y-4">
        <CartItem
          v-for="item in cart"
          :key="item.product_uuid"
          :item="item"
          @update-quantity="updateQuantity"
          @remove="removeFromCart"
        />
      </div>

      <!-- Order summary -->
      <OrderSummary
        :item-count="itemCount"
        :total-price="totalPrice"
        primary-label="Checkout"
        secondary-label="Continue Shopping"
        secondary-to="/customer/catalog"
        @primary-action="navigateTo('/customer/checkout')"
      />
    </div>
  </div>
</template>