<script setup>
import { orderService } from '~/api/order/OrderService'

definePageMeta({
  layout: 'customer',
})

const { cartItems, total, readCart, updateQuantity, removeItem, clearCart, buildOrderPayload } = useCustomerCart()
const checkoutMessage = ref('')
const checkoutError = ref('')
const isCheckingOut = ref(false)

const checkout = async () => {
  const payload = buildOrderPayload()
  const overStockItem = cartItems.value.find((item) => item.quantity > item.stock)

  checkoutError.value = ''
  checkoutMessage.value = ''

  if (overStockItem) {
    checkoutError.value = `Only ${overStockItem.stock} stock available for ${overStockItem.name}.`
    return
  }

  if (!payload.customer_uuid) {
    checkoutError.value = 'Customer account is missing. Please login again.'
    return
  }

  console.log('Checkout order payload:', payload)

  isCheckingOut.value = true

  try {
    await orderService.create(payload)
    clearCart()
    checkoutMessage.value = 'Order placed successfully. Product stock has been deducted.'
    window.dispatchEvent(new CustomEvent('customer-products-updated'))
  } catch (error) {
    checkoutError.value = error?.message || 'Unable to checkout.'
  } finally {
    isCheckingOut.value = false
  }
}

onMounted(readCart)
</script>

<template>
  <section>
    <div class="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Cart</h2>
        <p class="mt-1 text-sm text-gray-600">Review items before placing the order.</p>
      </div>
      <NuxtLink to="/customer/products" class="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
        Continue Shopping
      </NuxtLink>
    </div>

    <div v-if="!cartItems.length" class="rounded-lg border border-gray-200 bg-white p-8 text-center">
      <p class="text-sm text-gray-500">Your cart is empty.</p>
      <NuxtLink to="/customer/products" class="mt-4 inline-flex rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
        Shop Products
      </NuxtLink>
    </div>

    <div v-else class="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div v-for="item in cartItems" :key="item.product_uuid" class="flex flex-col gap-4 border-b border-gray-100 p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 class="font-semibold text-gray-900">{{ item.name }}</h3>
            <p class="mt-1 text-sm text-gray-500">PHP {{ item.price.toFixed(2) }}</p>
            <p class="mt-1 text-xs font-semibold text-gray-500">{{ item.stock }} stock available</p>
          </div>
          <div class="flex items-center gap-3">
            <input :value="item.quantity" type="number" min="1" :max="item.stock" class="w-20 rounded-md border border-gray-300 px-3 py-2 text-sm" @input="updateQuantity(item.product_uuid, Number($event.target.value))" />
            <button type="button" class="rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50" @click="removeItem(item.product_uuid)">
              Remove
            </button>
          </div>
        </div>
      </div>

      <aside class="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h3 class="text-lg font-bold text-gray-900">Summary</h3>
        <div class="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <span class="text-sm text-gray-600">Total</span>
          <span class="font-bold text-gray-900">PHP {{ total.toFixed(2) }}</span>
        </div>
        <button type="button" class="mt-6 w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:bg-gray-300" :disabled="isCheckingOut" @click="checkout">
          {{ isCheckingOut ? 'Checking out...' : 'Checkout' }}
        </button>
        <p v-if="checkoutMessage" class="mt-3 text-sm text-emerald-700">{{ checkoutMessage }}</p>
        <p v-if="checkoutError" class="mt-3 text-sm text-red-700">{{ checkoutError }}</p>
      </aside>
    </div>
  </section>
</template>
