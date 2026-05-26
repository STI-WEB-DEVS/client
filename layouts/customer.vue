<template>
  <div class="min-h-screen bg-gray-50 flex flex-col relative overflow-x-hidden">
 
    <header class="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
 
        <NuxtLink to="/customer/shop" class="text-xl font-bold text-gray-900 hover:opacity-80 transition-opacity">
          My Store
        </NuxtLink>
 
        <div class="hidden items-center gap-8 text-sm font-medium md:flex">
          <NuxtLink
            v-for="item in navigation" 
            :key="item.name" 
            :to="item.href"
            :class="[
              isActive(item.href) 
                ? 'text-indigo-600 font-semibold' 
                : 'text-gray-600 hover:text-gray-900', 
              'transition-colors'
            ]"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
 
        <div class="flex items-center gap-4">
 
          <button 
            @click="isCartOpen = !isCartOpen" 
            class="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-all relative active:scale-95"
          >
            <span>Cart</span>
            <span 
              v-if="totalCartCount > 0" 
              class="rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-semibold text-white transition-all scale-100"
            >
              {{ totalCartCount }}
            </span>
          </button>
 
          <div class="relative">
            <button @click="isDropdownOpen = !isDropdownOpen" class="flex rounded-full bg-white text-sm focus:outline-none">
              <div class="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm border border-gray-200">
                <span>U</span>
              </div>
            </button>
            <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              <NuxtLink to="/customer/account" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</NuxtLink>
              <hr class="border-gray-100 my-1" />
              <NuxtLink to="/" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">Sign out</NuxtLink>
            </div>
          </div>
        </div>
 
      </div>
    </header>
 
    <main class="flex-grow">
      <slot />
    </main>
 
    <footer class="border-t border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8 text-sm text-gray-500">
        <p>© 2026 My Store. All rights reserved.</p>
      </div>
    </footer>
 
    <div 
      v-if="showNotification" 
      class="fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-gray-800 transition-all transform animate-bounce-in"
    >
      <span class="flex h-2 w-2 rounded-full bg-green-400"></span>
      <p class="text-sm font-medium">{{ notificationText }}</p>
    </div>
 
    <div v-if="isCartOpen" class="fixed inset-0 z-50 flex justify-end">
      <div @click="isCartOpen = false" class="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"></div>
 
      <div class="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 p-6 border-l border-gray-200">
        <div>
          <div class="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
            <h2 class="text-lg font-bold text-gray-900">Your Shopping Cart</h2>
            <button @click="isCartOpen = false" class="text-gray-400 hover:text-gray-600 text-sm font-semibold p-1">
              ✕ Close
            </button>
          </div>
 
          <div v-if="cartItems.length === 0" class="text-center py-20 text-gray-400 italic text-sm">
            Your shopping selection is empty.
          </div>
 
          <div v-else class="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
            <div 
              v-for="item in cartItems" 
              :key="item.uuid" 
              class="flex items-center justify-between border border-gray-100 p-3 rounded-xl bg-gray-50"
            >
              <div class="flex flex-col gap-1">
                <span class="text-sm font-semibold text-gray-800">{{ item.name }}</span>
                <span class="text-xs text-gray-500">${{ item.price.toFixed(2) }} each</span>
 
                <div class="flex items-center gap-2 mt-2">
                  <button @click="changeQuantity(item, -1)" class="w-6 h-6 rounded-md bg-white border border-gray-200 text-xs flex items-center justify-center font-bold hover:bg-gray-100">-</button>
                  <span class="text-xs font-semibold px-1 text-gray-700">{{ item.quantity }}</span>
                  <button @click="changeQuantity(item, 1)" class="w-6 h-6 rounded-md bg-white border border-gray-200 text-xs flex items-center justify-center font-bold hover:bg-gray-100">+</button>
                </div>
              </div>
 
              <div class="flex flex-col items-end gap-2">
                <span class="text-sm font-bold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</span>
                <button @click="removeProductItem(item)" class="text-xs text-red-500 hover:underline">Remove</button>
              </div>
            </div>
          </div>
        </div>
 
        <div v-if="cartItems.length > 0" class="border-t border-gray-100 pt-4 mt-6 bg-white">
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm font-medium text-gray-600">Subtotal Balance:</span>
            <span class="text-xl font-black text-gray-900">${{ cartSubtotal.toFixed(2) }}</span>
          </div>
          <button @click="handleCheckout" class="w-full py-3 rounded-xl bg-gray-900 hover:bg-indigo-600 text-white font-semibold text-sm transition-colors shadow-sm">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { orderService } from '~/api/order/OrderService'
 
const route = useRoute()
const isDropdownOpen = ref(false)
const isCartOpen = ref(false)
const isSubmittingOrder = ref(false)
 
// State container for active session cart
const cartItems = ref([])
 
// Toast notification state
const showNotification = ref(false)
const notificationText = ref('')
let notificationTimeout = null
 
// --- Navigation ---
const navigation = [
  { name: 'Shop', href: '/customer/shop' },
  { name: 'Categories', href: '/customer/categories' },
  { name: 'Orders', href: '/customer/orders' },
  { name: 'Account', href: '/customer/account' },
]
 
// --- Computed Metrics ---
const totalCartCount = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})
 
const cartSubtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})
 
// --- Event Handler ---
const handleItemAddedToCart = (event) => {
  const incomingDbProduct = event.detail
  const productIdentifier = incomingDbProduct.uuid || incomingDbProduct.id
 
  const existingRecord = cartItems.value.find(item => item.uuid === productIdentifier)
 
  if (existingRecord) {
    existingRecord.quantity += 1
  } else {
    cartItems.value.push({
      uuid: productIdentifier,
      name: incomingDbProduct.name,
      price: Number(incomingDbProduct.price || 0),
      quantity: 1
    })
  }
 
  triggerNotification(`"${incomingDbProduct.name}" added to cart!`)
}
 
const triggerNotification = (text) => {
  notificationText.value = text
  showNotification.value = true
  if (notificationTimeout) clearTimeout(notificationTimeout)
  notificationTimeout = setTimeout(() => {
    showNotification.value = false
  }, 3000)
}
 
const changeQuantity = (item, direction) => {
  item.quantity += direction
  if (item.quantity <= 0) removeProductItem(item)
}
 
const removeProductItem = (item) => {
  cartItems.value = cartItems.value.filter(i => i.uuid !== item.uuid)
}
 
// --- Checkout Logic (Uses OrderService instance) ---
const handleCheckout = async () => {
  if (cartItems.value.length === 0) return
 
  try {
    isSubmittingOrder.value = true
 
    // Payload now only contains items; Backend Auth::user() provides the identity
    const checkoutPayload = {
      items: cartItems.value.map(item => ({
        product_uuid: item.uuid,
        quantity: item.quantity
      }))
    }
 
    // orderService is the instance of your OrderService class
    await orderService.create(checkoutPayload)
 
    cartItems.value = []
    isCartOpen.value = false
    triggerNotification('Order successfully saved to the database!')
 
  } catch (err) {
    console.error('Database connection transaction failure:', err)
    alert('Could not save order. Check the browser console for CORS details.')
  } finally {
    isSubmittingOrder.value = false
  }
}
 
const isActive = (path) => route.path === path
 
onMounted(() => {
  window.addEventListener('add-to-cart', handleItemAddedToCart)
})
 
onUnmounted(() => {
  window.removeEventListener('add-to-cart', handleItemAddedToCart)
})
</script>
 
