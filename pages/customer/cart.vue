<template>
  <div class="mx-auto max-w-3xl">
    <div class="mb-8 flex items-center justify-between">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">
        Your Cart
        <span v-if="!cart.isEmpty" class="ml-2 rounded-full bg-indigo-100 px-2.5 py-0.5 text-sm font-semibold text-indigo-700">
          {{ cart.totalItems }}
        </span>
      </h2>
      <NuxtLink
        to="/customer/shop"
        class="flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-gray-900"
      >
        <ArrowLeftIcon class="h-4 w-4" />
        Continue Shopping
      </NuxtLink>
    </div>

    <div v-if="cart.isEmpty" class="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-gray-200 py-24 text-center">
      <ShoppingBagIcon class="h-14 w-14 text-gray-200" />
      <p class="text-sm text-gray-400">Your cart is empty.</p>
      <NuxtLink
        to="/customer/shop"
        class="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
      >
        Browse Products
      </NuxtLink>
    </div>

    <template v-else>
      <!-- Cart items -->
      <div class="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div v-for="item in cart.items" :key="item.product_uuid" class="flex items-center gap-4 px-5 py-4">
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-300">
            {{ item.name.charAt(0).toUpperCase() }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-semibold text-gray-800">{{ item.name }}</p>
            <p class="text-xs text-gray-400">{{ formatPrice(item.price) }} each</p>
          </div>
          <div class="flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1">
            <button class="flex h-6 w-6 items-center justify-center rounded text-gray-500 transition hover:bg-gray-100" @click="cart.updateQuantity(item.product_uuid, item.quantity - 1)">−</button>
            <span class="w-6 text-center text-sm font-medium tabular-nums">{{ item.quantity }}</span>
            <button class="flex h-6 w-6 items-center justify-center rounded text-gray-500 transition hover:bg-gray-100" @click="cart.updateQuantity(item.product_uuid, item.quantity + 1)">+</button>
          </div>
          <p class="w-24 text-right text-sm font-bold text-gray-900">{{ formatPrice(item.price * item.quantity) }}</p>
          <button class="ml-1 rounded-lg p-1.5 text-gray-300 transition hover:bg-red-50 hover:text-red-500" @click="cart.removeItem(item.product_uuid)">
            <TrashIcon class="h-4 w-4" />
          </button>
        </div>
      </div>

      <!-- Summary -->
      <div class="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div class="flex items-center justify-between text-sm text-gray-500">
          <span>Subtotal ({{ cart.totalItems }} item{{ cart.totalItems > 1 ? 's' : '' }})</span>
          <span class="font-medium text-gray-800">{{ formatPrice(cart.totalPrice) }}</span>
        </div>
        <div class="mt-2 flex items-center justify-between border-t border-gray-100 pt-3 text-base font-bold text-gray-900">
          <span>Total</span>
          <span class="text-indigo-600">{{ formatPrice(cart.totalPrice) }}</span>
        </div>
        <div class="mt-5 flex gap-3">
          <button class="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50" @click="cart.clearCart()">Clear Cart</button>
          <NuxtLink to="/customer/checkout" class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95">
            Proceed to Checkout
            <ArrowRightIcon class="h-4 w-4" />
          </NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { ShoppingBagIcon, ArrowLeftIcon, ArrowRightIcon, TrashIcon } from '@heroicons/vue/24/outline'

definePageMeta({ layout: 'customer' })

const cart = useCartStore()

function formatPrice(val: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency', currency: 'PHP', minimumFractionDigits: 2,
  }).format(val)
}
</script>