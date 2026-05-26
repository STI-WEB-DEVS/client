<!-- pages/customer/cart.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useState } from '#app'
import { TrashIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { orderService } from '~/api/order/OrderService'

definePageMeta({
  layout: 'customer'
})

// Core hook connections extracting globally reactive state tracking
const { cart, removeFromCart, cartTotal, cartItemCount } = useCart()

// Core authentication session cookie checks to handle manual browser reloads cleanly
const userCookie = useCookie<any>('auth_user')
const user = useState<any>('auth-user', () => userCookie.value || null)

const isCheckingOut = ref<boolean>(false)

// Rehydrate session profiles from LocalStorage on mount if memory state layer is empty
onMounted(() => {
  if (!user.value && typeof window !== 'undefined') {
    const storedUuid = localStorage.getItem('_uuid')
    const storedRole = localStorage.getItem('_role')
    
    if (storedUuid) {
      user.value = {
        customer_uuid: storedUuid,
        uuid: storedUuid,
        role: storedRole || 'customer'
      }
      userCookie.value = user.value
    }
  }
})

const handleCheckout = async () => {
  if (cart.value.length === 0) return
  
  // Resolve active session through either runtime memory state engine or persistent cookie layer
  const activeUser = user.value || userCookie.value

  if (!activeUser || !activeUser.customer_uuid) {
    alert('Authentication Missing: Please log in to complete your checkout process.')
    navigateTo('/login')
    return
  }
  
  isCheckingOut.value = true
  try {
    // Standardize frontend cart rows into the nested layout array your Laravel PHP expects
    const formattedItems = cart.value.map(item => ({
      product_uuid: item.uuid,
      quantity: item.quantity
    }))

    // Injecting the real customer_uuid pulled safely from your persistent active session storage maps
    const orderPayload = {
      customer_uuid: activeUser.customer_uuid, 
      items: formattedItems
    }

    const response = await orderService.create(orderPayload)

    if (response) {
      alert('Order placed successfully! Thank you for your purchase.')
      cart.value = [] // Flush global cart data clean post-checkout
      navigateTo('/customer/orders')
    }
  } catch (error: any) {
    console.error('Checkout Error details:', error)
    
    // 🌟 ENHANCED DIAGNOSTICS: Extracts the exact validation failure text returned from your Laravel database
    const serverErrorMessage = error.response?._data?.message || error.data?.message || error.message
    alert('Checkout Failed: ' + serverErrorMessage)
  } finally {
    isCheckingOut.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-7xl">
    <!-- Page Header Section -->
    <div class="border-b border-gray-200 pb-5">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>
      <p class="mt-2 text-sm text-gray-500">Review your selected items before proceeding to checkout operations.</p>
    </div>

    <!-- 🔍 LIVE DIAGNOSTIC BOX: Displays what is inside your memory array right now -->
    <div class="mt-4 rounded-md bg-slate-900 p-4 text-xs font-mono text-emerald-400 shadow-inner">
      <p class="mb-2 font-bold uppercase tracking-wider text-slate-400">// Live State Variable Inspection Debug Panel</p>
      <p class="mb-1">Logged In Account Customer UUID: <span class="text-white">{{ user?.customer_uuid || 'No Session Active' }}</span></p>
      <p class="mb-1">Cart Total Distinct Items Count: <span class="text-white">{{ cartItemCount }}</span></p>
      <pre class="overflow-x-auto whitespace-pre-wrap">{{ cart }}</pre>
    </div>

    <!-- Empty Basket Fallback Presentation Window Container -->
    <div v-if="cart.length === 0" class="mt-8 text-center py-16 rounded-xl border-2 border-dashed border-gray-200 bg-white">
      <ShoppingBagIcon class="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
      <h2 class="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h2>
      <p class="mt-1 text-sm text-gray-500">You haven't added any products to your shopping cart yet.</p>
      <div class="mt-6">
        <NuxtLink to="/customer/shop" class="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
          Go to Shop
        </NuxtLink>
      </div>
    </div>

    <!-- Active Cart Interaction Main Splitter Grid Workspace Layout -->
    <div v-else class="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
      
      <!-- Selection Content Area List Grid Block Column Column -->
      <section aria-labelledby="cart-heading" class="lg:col-span-7">
        <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

        <ul role="list" class="divide-y divide-gray-200 border-b border-gray-200 border-t border-gray-200 bg-white rounded-lg px-4 shadow-sm">
          <li v-for="item in cart" :key="item.uuid" class="flex py-6">
            <!-- Thumbnail Media Image Display Frame -->
            <div class="shrink-0">
              <img 
                :src="item.image_url || 'https://unsplash.com'" 
                :alt="item.name" 
                class="size-24 rounded-md object-cover object-center sm:size-32"
              />
            </div>

            <!-- Content Details Summary Blocks Info Container Grid Section Rows -->
            <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
              <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div>
                  <div class="flex justify-between">
                    <h3 class="text-sm font-semibold text-gray-700 hover:text-gray-800">
                      {{ item.name }}
                    </h3>
                  </div>
                  <p class="mt-1 text-sm font-medium text-gray-900">${{ Number(item.price).toFixed(2) }}</p>
                  <p class="mt-2 text-xs text-gray-500">Quantity Selection: <span class="font-bold text-gray-700">{{ item.quantity }}</span></p>
                </div>

                <!-- Delete Trash Interaction Trigger Wrapper Button Block -->
                <div class="mt-4 sm:mt-0 sm:pr-9 flex items-center justify-end">
                  <button 
                    @click="removeFromCart(item.uuid)"
                    type="button" 
                    class="-m-2 inline-flex p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <span class="sr-only">Remove</span>
                    <TrashIcon class="size-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <!-- Order Pricing Financial Ledger Ledger Summary Column Side Block Panel -->
      <section aria-labelledby="summary-heading" class="mt-16 rounded-lg border border-gray-200 bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 shadow-sm">
        <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order Summary</h2>

        <dl class="mt-6 space-y-4">
          <div class="flex items-center justify-between">
            <dt class="text-sm text-gray-600">Total Quantities Chosen</dt>
            <dd class="text-sm font-medium text-gray-900">{{ cartItemCount }} items</dd>
          </div>
          <div class="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt class="text-base font-medium text-gray-900">Calculated Order Subtotal</dt>
            <dd class="text-base font-medium text-gray-900">${{ cartTotal.toFixed(2) }}</dd>
          </div>
        </dl>

        <!-- Purchase Checkout Request Action Submit Control Button Element -->
        <div class="mt-6">
          <button 
            @click="handleCheckout"
            :disabled="isCheckingOut"
            type="button" 
            class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-x-2"
          >
            <div v-if="isCheckingOut" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>{{ isCheckingOut ? 'Processing Checkout Request...' : 'Confirm Order Checkout' }}</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
