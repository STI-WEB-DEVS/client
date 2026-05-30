<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '~/composables/useCart'
import { orderService } from '~/api/order/OrderService'

definePageMeta({ layout: 'customer' })

const { cart, itemCount, totalPrice, buildOrderPayload, clearCart } = useCart()
const loading = ref(false)
const error = ref('')

// Redirect to catalog if cart is empty
if (import.meta.client && !cart.value.length) {
  navigateTo('/customer/catalog')
}

const handlePlaceOrder = async () => {
  const payload = buildOrderPayload()

  console.log('📦 Order Payload:', JSON.stringify(payload, null, 2))

  loading.value = true
  error.value = ''

  try {
    await orderService.create(payload)
    clearCart()
    await navigateTo('/customer/order')
  } catch (err: any) {
    // Surface stock validation errors from the backend
    error.value = err?.response?.data?.errors?.items?.[0]
      ?? err?.response?.data?.message
      ?? err?.message
      ?? 'Failed to place order. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900">Checkout</h2>
      <p class="mt-1 text-sm text-gray-500">Review your order then place it.</p>
    </div>

    <div class="grid gap-8 lg:grid-cols-3">
      <!-- Left: items review -->
      <div class="lg:col-span-2">
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 class="text-base font-semibold text-gray-900">Order Items</h3>
          <div class="mt-4 divide-y divide-gray-100">
            <div
              v-for="item in cart"
              :key="item.product_uuid"
              class="flex items-center justify-between py-3"
            >
              <div>
                <p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
                <p class="text-xs text-gray-500">
                  Qty: {{ item.quantity }} × ₱{{ Number(item.price).toFixed(2) }}
                </p>
              </div>
              <p class="text-sm font-semibold text-gray-900">
                ₱{{ (Number(item.price) * item.quantity).toFixed(2) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: summary + place order -->
      <div class="space-y-4">
        <!-- Stock / order error -->
        <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
          <p class="text-sm text-red-700">{{ error }}</p>
        </div>

        <OrderSummary
          :item-count="itemCount"
          :total-price="totalPrice"
          :primary-label="loading ? 'Placing Order...' : 'Place Order'"
          :disabled="loading"
          secondary-label="Back to Cart"
          secondary-to="/customer/cart"
          @primary-action="handlePlaceOrder"
        />
      </div>
    </div>
  </div>
</template>