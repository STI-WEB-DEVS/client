<script setup>
import { computed } from 'vue'
import { useCart } from '~/composables/useCart'

definePageMeta({
  layout: 'customer'
})

const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart()

const isEmpty = computed(() => cartItems.value.length === 0)

const handleCheckout = () => {
  navigateTo('/customer/checkout')
}
</script>

<template>
  <section class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-10">
      <p class="text-sm font-semibold uppercase tracking-widest text-indigo-600">Review</p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Your Cart</h1>
      <p class="mt-2 text-base text-gray-500">Review your order summary. Modify quantities or remove items before checking out.</p>
    </div>

    <!-- Empty Cart -->
    <div v-if="isEmpty" class="flex flex-col items-center gap-4 py-20 text-center">
      <span class="text-6xl">🛒</span>
      <h2 class="text-xl font-semibold text-gray-700">Your cart is empty</h2>
      <p class="text-sm text-gray-500">Start shopping and add some products!</p>
      <NuxtLink
        to="/customer/shop"
        class="mt-4 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Browse Products
      </NuxtLink>
    </div>

    <!-- Cart Items -->
    <div v-else>
      <div class="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div
          v-for="item in cartItems"
          :key="item.product_uuid"
          class="flex items-center gap-5 p-5 transition-colors hover:bg-gray-50/50"
        >
          <!-- Product Icon -->
          <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-2xl">
            📦
          </div>

          <!-- Product Info -->
          <div class="flex-1">
            <h3 class="text-sm font-semibold text-gray-900">{{ item.name }}</h3>
            <p class="mt-0.5 text-xs text-gray-400">UUID: {{ item.product_uuid?.slice(0, 8) }}…</p>
            <p class="mt-1 text-sm font-medium text-indigo-600">
              ₱{{ Number(item.price).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }} each
            </p>
          </div>

          <!-- Quantity Controls -->
          <div class="flex flex-col items-center gap-1">
            <div class="flex items-center gap-2">
              <button
                @click="updateQuantity(item.product_uuid, item.quantity - 1)"
                class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition hover:bg-gray-100 active:bg-gray-200"
              >
                −
              </button>
              <span class="w-8 text-center text-sm font-semibold text-gray-900">{{ item.quantity }}</span>
              <button
                @click="updateQuantity(item.product_uuid, item.quantity + 1)"
                :disabled="item.quantity >= item.stock"
                class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition hover:bg-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>
            </div>
            <span v-if="item.quantity >= item.stock" class="text-[10px] font-semibold text-amber-600">
              Max: {{ item.stock }}
            </span>
          </div>

          <!-- Subtotal -->
          <div class="w-24 text-right">
            <p class="text-sm font-semibold text-gray-900">
              ₱{{ (item.price * item.quantity).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
            </p>
          </div>

          <!-- Remove -->
          <button
            @click="removeFromCart(item.product_uuid)"
            class="ml-2 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
            title="Remove item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Order Summary Footer -->
      <div class="mt-8 flex flex-col items-end gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-500">Order Total</p>
          <p class="text-2xl font-bold text-gray-900">
            ₱{{ cartTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
          </p>
        </div>
        <div class="flex gap-3">
          <NuxtLink
            to="/customer/shop"
            class="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-indigo-400 hover:text-indigo-600"
          >
            Continue Shopping
          </NuxtLink>
          <button
            @click="handleCheckout"
            class="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:bg-indigo-800"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
