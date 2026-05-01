<template>
  <div class="max-w-5xl mx-auto px-4 py-10">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Your Cart</h1>
        <p class="text-sm text-gray-500">
          Review items before checkout
        </p>
      </div>

      <button
        @click="clearCart"
        class="text-sm text-red-500 hover:text-red-700"
      >
        Clear Cart
      </button>
    </div>

    <!-- Empty state -->
    <div v-if="cart.length === 0" class="text-center py-20 text-gray-500">
      Your cart is empty.
    </div>

    <!-- Cart Items -->
    <div v-else class="space-y-4">

      <div
        v-for="item in cart"
        :key="item.id"
        class="flex items-center justify-between bg-white border rounded-xl p-4"
      >

        <!-- Product -->
        <div class="flex items-center gap-4">
          <img
            v-if="item.image"
            :src="item.image"
            class="w-16 h-16 object-cover rounded-md bg-gray-100"
          />

          <div>
            <h2 class="font-semibold text-gray-900">
              {{ item.name }}
            </h2>
            <p class="text-sm text-gray-500">
              ₱{{ formatPrice(item.price) }}
            </p>
          </div>
        </div>

        <!-- Quantity controls -->
        <div class="flex items-center gap-2">
          <button
            @click="decreaseQty(item.id)"
            class="px-3 py-1 border rounded-md"
          >
            -
          </button>

          <span class="w-8 text-center">{{ item.qty }}</span>

          <button
            @click="increaseQty(item.id)"
            class="px-3 py-1 border rounded-md"
          >
            +
          </button>
        </div>

        <!-- Subtotal -->
        <div class="text-right">
          <p class="font-semibold">
            ₱{{ formatPrice(item.price * item.qty) }}
          </p>
          <button
            @click="removeItem(item.id)"
            class="text-xs text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>

      </div>

      <!-- Checkout bar -->
      <div class="sticky bottom-0 bg-white border-t mt-10 p-4 flex items-center justify-between">

        <div>
          <p class="text-sm text-gray-500">Total Items</p>
          <p class="font-semibold">{{ totalItems }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Total Price</p>
          <p class="font-bold text-indigo-600">
            ₱{{ formatPrice(totalPrice) }}
          </p>
        </div>

        <button
          class="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
          @click="navigateTo('/customer/checkout')"
          >
          Checkout
        </button>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'customer'
})

const CART_KEY = 'cart'
const cart = ref([])

/* Load cart */
const loadCart = () => {
  if (process.client) {
    cart.value = JSON.parse(localStorage.getItem(CART_KEY)) || []
  }
}

/* Save cart */
const saveCart = () => {
  if (process.client) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart.value))
  }
}

/* Quantity */
const increaseQty = (id) => {
  const item = cart.value.find(p => p.id === id)
  if (item) item.qty++
  saveCart()
}

const decreaseQty = (id) => {
  const item = cart.value.find(p => p.id === id)

  if (!item) return

  item.qty--

  if (item.qty <= 0) {
    cart.value = cart.value.filter(p => p.id !== id)
  }

  saveCart()
}

/* Remove */
const removeItem = (id) => {
  cart.value = cart.value.filter(p => p.id !== id)
  saveCart()
}

/* Clear cart */
const clearCart = () => {
  cart.value = []
  saveCart()
}

/* Totals */
const totalItems = computed(() =>
  cart.value.reduce((sum, i) => sum + i.qty, 0)
)

const totalPrice = computed(() =>
  cart.value.reduce((sum, i) => sum + i.qty * i.price, 0)
)

/* Format */
const formatPrice = (price) => Number(price).toLocaleString()

onMounted(loadCart)
</script>