<script setup>
definePageMeta({
  layout: 'customer'
})

import { useRouter } from 'vue-router'
import { useCart } from '~/composables/useCart'

const router = useRouter()
const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()

const goToCheckout = () => {
  router.push('/customer/checkout')
}

const goToShop = () => {
  router.push('/customer/shop')
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <h1 class="mb-8 text-2xl font-bold text-gray-900">Shopping Cart</h1>

    <div v-if="cart.length === 0" class="text-center py-12">
      <p class="text-gray-500">Your cart is empty</p>
      <button
        @click="goToShop"
        class="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Continue Shopping
      </button>
    </div>

    <div v-else>
      <div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <ul role="list" class="divide-y divide-gray-200">
          <li v-for="item in cart" :key="item.product_uuid" class="flex py-6 px-4 sm:px-6">
            <div class="flex-shrink-0">
              <div class="h-24 w-24 rounded-md bg-gray-200">
                <img v-if="item.image" :src="item.image" :alt="item.name" class="h-full w-full rounded-md object-cover" />
              </div>
            </div>

            <div class="ml-4 flex flex-1 flex-col">
              <div>
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <h3>{{ item.name }}</h3>
                  <p class="ml-4">${{ (item.price * item.quantity).toFixed(2) }}</p>
                </div>
                <p class="mt-1 text-sm text-gray-500">${{ item.price.toFixed(2) }} each</p>
              </div>
              <div class="flex flex-1 items-end justify-between text-sm">
                <div class="flex items-center gap-2">
                  <label for="quantity" class="text-gray-500">Qty</label>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    :value="item.quantity"
                    @change="updateQuantity(item.product_uuid, parseInt($event.target.value))"
                    class="w-16 rounded-md border border-gray-300 px-2 py-1 text-center"
                  />
                </div>

                <button
                  type="button"
                  @click="removeFromCart(item.product_uuid)"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="mt-8 rounded-lg border border-gray-200 bg-white p-6">
        <div class="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${{ getCartTotal().toFixed(2) }}</p>
        </div>
        <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div class="mt-6">
          <button
            @click="goToCheckout"
            class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </button>
        </div>
        <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <button
              type="button"
              @click="goToShop"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
