<template>
  <div class="py-6">
    <h1 class="text-3xl font-bold tracking-tight text-gray-900">Your Shopping Cart</h1>

    <div class="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
      <!-- Items Container -->
      <section class="lg:col-span-7">
        <div v-if="cart.length === 0" class="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
          <p class="text-gray-500 text-base">Your cart is currently empty.</p>
          <NuxtLink to="/customer/shop" class="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            Go back to shop products &rarr;
          </NuxtLink>
        </div>

        <ul v-else role="list" class="divide-y divide-gray-200 border-t border-b border-gray-200">
          <li v-for="item in cart" :key="item.product.uuid" class="flex py-6">
            <div class="flex-shrink-0 bg-gray-100 rounded-md w-24 h-24 flex items-center justify-center text-gray-400 text-xs">
              Product Image
            </div>

            <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
              <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div>
                  <h3 class="text-sm font-medium text-gray-700">{{ item.product.name }}</h3>
                  <p class="mt-1 text-sm text-gray-500">{{ item.product.category || 'General' }}</p>
                  <p class="mt-1 text-sm font-semibold text-gray-900">${{ Number(item.product.price).toFixed(2) }}</p>
                </div>

                <div class="mt-4 sm:mt-0 sm:pr-9">
                  <select 
                    :value="item.quantity" 
                    @change="updateQuantity(item.product.uuid, Number(($event.target as HTMLSelectElement).value))"
                    class="rounded-md border border-gray-300 py-1.5 text-sm font-medium text-gray-700 shadow-sm focus:border-indigo-500"
                  >
                    <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                  </select>

                  <div class="absolute top-0 right-0">
                    <button @click="removeFromCart(item.product.uuid)" type="button" class="text-sm font-medium text-red-600 hover:text-red-500">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <!-- Pricing Summary Card -->
      <section v-if="cart.length > 0" class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <h2 class="text-lg font-medium text-gray-900">Order Summary</h2>
        <div class="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
          <span class="text-base font-medium text-gray-900">Estimated Total</span>
          <span class="text-base font-medium text-gray-900">${{ subtotal.toFixed(2) }}</span>
        </div>

        <div class="mt-6">
          <button 
            @click="handleCheckout"
            :disabled="isSubmitting"
            class="w-full rounded-md bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? 'Processing Order...' : 'Proceed to Checkout' }}
          </button>
        </div>
      </section>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '~/composables/useCart'
import { orderService } from '~/api/order/OrderService'
import { AuthService } from '~/api/auth/AuthService'

definePageMeta({
  layout: 'customer'
})

const { cart, subtotal, clearCart } = useCart()
const authService = new AuthService()
const isSubmitting = ref(false)

const handleCheckout = async () => {
  if (cart.value.length === 0) return

  isSubmitting.value = true
  try {
    // 1. Fetch the real UUID of the currently logged in customer straight from the database
    const customerResponse = await authService.getCurrentUser()
    const customerUuid = customerResponse?.uuid || customerResponse?.data?.uuid

    if (!customerUuid) {
      throw new Error('Could not retrieve your customer identification key. Please re-login.')
    }

    // 2. Build the order payload with the real customer UUID
    const payload = {
      customer_uuid: customerUuid,
      items: cart.value.map(item => ({
        product_uuid: item.product.uuid,
        quantity: item.quantity
      }))
    }

    // 3. Create the order using the order service
    await orderService.create(payload)
    
    // 4. Reset checkout parameters on success
    clearCart()
    alert('Order placed successfully!')
    navigateTo('/customer/orders')

  } catch (error: any) {
    console.error('Checkout failed:', error.message)
    alert(`Checkout Failed: ${error.message}`)
  } finally {
    isSubmitting.value = false
  }
}
</script>