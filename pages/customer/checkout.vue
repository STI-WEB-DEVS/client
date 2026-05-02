<script setup>
definePageMeta({
  layout: 'customer'
})

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '~/composables/useCart'

const router = useRouter()
const { cart, getCartTotal, getCartItems, clearCart } = useCart()

const form = ref({
  name: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  phone: ''
})

const errors = ref({})
const step = ref('form') // 'form' | 'review' | 'success'

const subtotal = computed(() => getCartTotal())
const shipping = ref(10)
const total = computed(() => subtotal.value + shipping.value)

const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!form.value.name.trim()) {
    errors.value.name = 'Name is required'
    isValid = false
  }
  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Invalid email format'
    isValid = false
  }
  if (!form.value.address.trim()) {
    errors.value.address = 'Address is required'
    isValid = false
  }
  if (!form.value.city.trim()) {
    errors.value.city = 'City is required'
    isValid = false
  }
  if (!form.value.postalCode.trim()) {
    errors.value.postalCode = 'Postal code is required'
    isValid = false
  }
  if (!form.value.phone.trim()) {
    errors.value.phone = 'Phone is required'
    isValid = false
  }

  return isValid
}

const proceedToReview = () => {
  if (validateForm()) {
    step.value = 'review'
  }
}

const submitOrder = () => {
  const customerUuid = localStorage.getItem('_uuid') || ''
  
  const payload = {
    customer_uuid: customerUuid,
    items: getCartItems()
  }

  console.log('Order Payload:', JSON.stringify(payload, null, 2))

  clearCart()
  step.value = 'success'
}

const goToOrders = () => {
  router.push('/customer/order')
}

const backToForm = () => {
  step.value = 'form'
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <h1 class="mb-8 text-2xl font-bold text-gray-900">Checkout</h1>

    <div v-if="cart.length === 0 && step !== 'success'" class="text-center py-12">
      <p class="text-gray-500">Your cart is empty</p>
    </div>

    <div v-else-if="step === 'form'" class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">Shipping Information</h2>
        <form @submit.prevent="proceedToReview" class="mt-6 space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <div>
            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
            <input
              id="address"
              v-model="form.address"
              type="text"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              :class="{ 'border-red-500': errors.address }"
            />
            <p v-if="errors.address" class="mt-1 text-sm text-red-600">{{ errors.address }}</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700">City</label>
              <input
                id="city"
                v-model="form.city"
                type="text"
                class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                :class="{ 'border-red-500': errors.city }"
              />
              <p v-if="errors.city" class="mt-1 text-sm text-red-600">{{ errors.city }}</p>
            </div>

            <div>
              <label for="postalCode" class="block text-sm font-medium text-gray-700">Postal Code</label>
              <input
                id="postalCode"
                v-model="form.postalCode"
                type="text"
                class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                :class="{ 'border-red-500': errors.postalCode }"
              />
              <p v-if="errors.postalCode" class="mt-1 text-sm text-red-600">{{ errors.postalCode }}</p>
            </div>
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              :class="{ 'border-red-500': errors.phone }"
            />
            <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
          </div>

          <button
            type="submit"
            class="mt-6 w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Review Order
          </button>
        </form>
      </div>

      <div>
        <h2 class="text-lg font-semibold text-gray-900">Order Summary</h2>
        <div class="mt-6 rounded-lg border border-gray-200 bg-white p-6">
          <ul role="list" class="divide-y divide-gray-200">
            <li v-for="item in cart" :key="item.product_uuid" class="flex py-4">
              <div class="flex-1">
                <h3 class="text-sm font-medium text-gray-900">{{ item.name }}</h3>
                <p class="mt-1 text-sm text-gray-500">Qty: {{ item.quantity }}</p>
              </div>
              <p class="text-sm font-medium text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</p>
            </li>
          </ul>
          <div class="mt-6 space-y-2 border-t border-gray-200 pt-4">
            <div class="flex justify-between text-sm text-gray-600">
              <p>Subtotal</p>
              <p>${{ subtotal.toFixed(2) }}</p>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <p>Shipping</p>
              <p>${{ shipping.toFixed(2) }}</p>
            </div>
            <div class="flex justify-between text-base font-medium text-gray-900">
              <p>Total</p>
              <p>${{ total.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="step === 'review'" class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">Review Order</h2>
        <div class="mt-6 rounded-lg border border-gray-200 bg-white p-6">
          <h3 class="font-medium text-gray-900">Shipping To</h3>
          <p class="mt-2 text-sm text-gray-600">{{ form.name }}</p>
          <p class="text-sm text-gray-600">{{ form.email }}</p>
          <p class="text-sm text-gray-600">{{ form.address }}</p>
          <p class="text-sm text-gray-600">{{ form.city }}, {{ form.postalCode }}</p>
          <p class="text-sm text-gray-600">{{ form.phone }}</p>
        </div>
        <div class="mt-6 flex gap-4">
          <button
            @click="backToForm"
            class="flex-1 rounded-md border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            @click="submitOrder"
            class="flex-1 rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Place Order
          </button>
        </div>
      </div>

      <div>
        <h2 class="text-lg font-semibold text-gray-900">Order Items</h2>
        <div class="mt-6 rounded-lg border border-gray-200 bg-white p-6">
          <ul role="list" class="divide-y divide-gray-200">
            <li v-for="item in cart" :key="item.product_uuid" class="flex py-4">
              <div class="flex-1">
                <h3 class="text-sm font-medium text-gray-900">{{ item.name }}</h3>
                <p class="mt-1 text-sm text-gray-500">Qty: {{ item.quantity }}</p>
              </div>
              <p class="text-sm font-medium text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</p>
            </li>
          </ul>
          <div class="mt-6 space-y-2 border-t border-gray-200 pt-4">
            <div class="flex justify-between text-sm text-gray-600">
              <p>Subtotal</p>
              <p>${{ subtotal.toFixed(2) }}</p>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <p>Shipping</p>
              <p>${{ shipping.toFixed(2) }}</p>
            </div>
            <div class="flex justify-between text-base font-medium text-gray-900">
              <p>Total</p>
              <p>${{ total.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="step === 'success'" class="text-center py-12">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 class="mt-4 text-2xl font-bold text-gray-900">Order Placed Successfully!</h2>
      <p class="mt-2 text-gray-600">Thank you for your purchase.</p>
      <button
        @click="goToOrders"
        class="mt-6 rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        View Orders
      </button>
    </div>
  </div>
</template>
