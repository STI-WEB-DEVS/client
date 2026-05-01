<script setup lang="ts">
import { useCart } from '~/composables/useCart'

definePageMeta({ layout: 'customer' })

const { cart, itemCount, totalPrice, buildOrderPayload } = useCart()

// Redirect to catalog if cart is empty
if (import.meta.client && !cart.value.length) {
  navigateTo('/customer/catalog')
}

const handlePlaceOrder = () => {
  const payload = buildOrderPayload()

  // Per instructions: log the payload, do not send the request yet
  console.log('📦 Order Payload:', JSON.stringify(payload, null, 2))

  alert('Order payload logged! Open DevTools > Console to see it.')
}
</script>

<template>
  <div>
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900">Checkout</h2>
      <p class="mt-1 text-sm text-gray-500">Review your order then place it.</p>
    </div>

    <div class="grid gap-8 lg:grid-cols-3">
      <!-- Left: items + payload preview -->
      <div class="lg:col-span-2 space-y-6">

        <!-- Order items -->
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

      <!-- Right: order summary + place order -->
      <div class="space-y-4">
        <OrderSummary
          :item-count="itemCount"
          :total-price="totalPrice"
          primary-label="Place Order"
          secondary-label="Back to Cart"
          secondary-to="/customer/cart"
          @primary-action="handlePlaceOrder"
        />
      </div>
    </div>
  </div>
</template>