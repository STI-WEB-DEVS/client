<script setup>
import { ref, computed, provide, watch } from 'vue'

// --- 1. Fetch Live Products directly from your Laravel Local Server Port ---
const { data: productsData, pending, error } = await useFetch('http://localhost:8000/api/products')

watch(error, (newError) => {
  if (newError) {
    console.error('🔴 Laravel Backend Connection Error:', newError)
  }
})

// --- 2. State Management Variables ---
const isShopModalOpen = ref(false)
const cart = ref([])

const checkoutForm = ref({
  customer_id: 1, 
})

// Safely unpack your array regardless of how Laravel formats the response object
const productsList = computed(() => {
  if (!productsData.value) return []
  if (Array.isArray(productsData.value)) return productsData.value
  if (productsData.value.data && Array.isArray(productsData.value.data)) {
    return productsData.value.data
  }
  return []
})

// --- 3. Shopping Cart Computations ---
const cartCount = computed(() => cart.value.reduce((total, item) => total + item.quantity, 0))
const cartTotalAmount = computed(() => cart.value.reduce((total, item) => total + (item.price * item.quantity), 0))

provide('openShopModal', () => { isShopModalOpen.value = true })

// --- 4. UI Layout Control Actions ---
const openShopModal = () => { isShopModalOpen.value = true }
const closeShopModal = () => { isShopModalOpen.value = false }

const addToCart = (product) => {
  // Check tracking by either uuid string or auto-incrementing id integer
  const productId = product.uuid || product.id
  const existingItem = cart.value.find(item => item.id === productId)
  
  if (existingItem) {
    if (existingItem.quantity < product.stock) {
      existingItem.quantity++
    } else {
      alert(`Cannot add more items. Only ${product.stock} items left in stock!`)
    }
  } else {
    cart.value.push({ 
      id: productId, 
      name: product.name, 
      price: Number(product.price), 
      quantity: 1 
    })
  }
}

const removeFromCart = (productId) => {
  const existingItem = cart.value.find(item => item.id === productId)
  if (existingItem && existingItem.quantity > 1) {
    existingItem.quantity--
  } else {
    cart.value = cart.value.filter(item => item.id !== productId)
  }
}

// --- 5. Submit Multi-Item Checkout Orders to Laravel ---
const processCheckout = async () => {
  if (cart.value.length === 0) return

  const payload = {
    customer_id: checkoutForm.value.customer_id,
    total_amount: cartTotalAmount.value,
    items: cart.value.map(item => ({
      product_identifier: item.id, 
      product_name: item.name,
      quantity: item.quantity,
      price: item.price
    }))
  }

  try {
    await $fetch('http://localhost:8000/api/orders', {
      method: 'POST',
      body: payload
    })
    alert('Order placed successfully!')
    cart.value = [] 
    closeShopModal()
  } catch (error) {
    alert('Failed processing the checkout order transaction.')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-between">
    <div>
      <header class="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div class="text-xl font-bold text-gray-900 tracking-tight">
            My Store
          </div>
     
          <div class="hidden items-center gap-8 text-sm font-semibold text-gray-600 md:flex">
            <span class="cursor-pointer hover:text-indigo-600 transition" @click="openShopModal">Shop</span>
            <span class="cursor-pointer hover:text-indigo-600 transition">Categories</span>
            <span class="cursor-pointer hover:text-indigo-600 transition">Orders</span>
            <span class="cursor-pointer hover:text-indigo-600 transition">Account</span>
          </div>
     
          <div 
            @click="openShopModal"
            class="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition flex items-center gap-2"
          >
            <span>Cart</span>
            <span v-if="cartCount > 0" class="bg-indigo-600 text-white rounded-full text-xs px-2 py-0.5">{{ cartCount }}</span>
          </div>
        </div>
      </header>
   
      <main>
        <slot />
      </main>
    </div>
 
    <footer class="border-t border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 My Store. All rights reserved.</p>
        <div class="flex gap-6 font-medium">
          <span>Help</span><span>Contact</span><span>Privacy</span>
        </div>
      </div>
    </footer>

    <div v-if="isShopModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-6xl h-[80vh] overflow-hidden grid grid-cols-1 lg:grid-cols-3 border border-gray-100">
        
        <div class="lg:col-span-2 p-8 overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-black text-gray-900 tracking-tight">Available Tickets & Products</h2>
              <p class="text-xs text-gray-400 font-bold mt-0.5">Click items to build out your checkout order.</p>
            </div>
            <button @click="closeShopModal" class="lg:hidden h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center font-bold">✕</button>
          </div>

          <div v-if="pending" class="text-center py-12 text-gray-500 font-bold">
            Pulling inventory matrices from live server core...
          </div>

          <div v-else-if="productsList.length" class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div v-for="product in productsList" :key="product.uuid || product.id" class="bg-gray-50 border border-gray-200/60 rounded-2xl p-5 flex flex-col justify-between transition hover:bg-white hover:shadow-md">
              <div>
                <div class="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-base font-black mb-4">
                  {{ product.name ? product.name.charAt(0).toUpperCase() : 'P' }}
                </div>
                <h3 class="text-base font-black text-gray-900 truncate">{{ product.name }}</h3>
                <p class="text-[10px] text-gray-400 font-bold mb-3">ID SKU: #{{ product.uuid || product.id }}</p>
                <p class="text-lg font-black text-gray-900 mb-2">₱ {{ Number(product.price).toLocaleString() }}</p>
              </div>
              
              <div class="flex items-center justify-between mt-2 border-t border-gray-200/40 pt-3">
                <span class="text-xs font-bold" :class="product.stock > 0 ? 'text-emerald-600' : 'text-rose-500'">
                  {{ product.stock > 0 ? `${product.stock} items left` : 'Sold Out' }}
                </span>
                <button @click="addToCart(product)" :disabled="product.stock <= 0" class="bg-indigo-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl disabled:bg-gray-200 disabled:text-gray-400">
                  + Add Item
                </button>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-12 text-gray-400 font-semibold">
            No items are published on the backend catalog currently.
          </div>
        </div>

        <div class="bg-gray-50 p-8 overflow-y-auto flex flex-col justify-between h-full">
          <div>
            <div class="hidden lg:flex items-center justify-between mb-6">
              <h3 class="text-lg font-black text-gray-900 tracking-tight">Order Summary Invoice</h3>
              <button @click="closeShopModal" class="h-8 w-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center font-bold">✕</button>
            </div>

            <div v-if="cart.length" class="space-y-3 max-h-[42vh] overflow-y-auto">
              <div v-for="item in cart" :key="item.id" class="bg-white border border-gray-200/60 p-4 rounded-xl flex items-center justify-between gap-3">
                <div class="truncate">
                  <h4 class="font-bold text-sm text-gray-800 truncate">{{ item.name }}</h4>
                  <p class="text-xs text-gray-400 font-semibold">₱ {{ item.price.toLocaleString() }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <button @click="removeFromCart(item.id)" class="h-6 w-6 bg-gray-100 font-black rounded text-xs">-</button>
                  <span class="text-xs font-black text-gray-800 min-w-[12px] text-center">{{ item.quantity }}</span>
                  <button @click="addToCart(productsList.find(p => (p.uuid || p.id) === item.id))" class="h-6 w-6 bg-gray-100 font-black rounded text-xs">+</button>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-16 border border-dashed border-gray-300 rounded-2xl bg-white">
              <p class="font-bold text-gray-800 text-xs">Your shopping cart is empty</p>
            </div>
          </div>

          <div class="pt-5 border-t border-gray-200">
            <div class="flex justify-between items-center mb-1">
              <span class="text-[11px] text-gray-400 font-bold uppercase">Total Product Items:</span>
              <span class="text-xs font-black text-gray-800">{{ cartCount }} units</span>
            </div>
            <div class="flex justify-between items-center mb-5">
              <span class="text-xs text-gray-500 font-bold">Gross Final Amount:</span>
              <span class="text-xl font-black text-indigo-600">₱ {{ cartTotalAmount.toLocaleString() }}</span>
            </div>
            <button @click="processCheckout" :disabled="cart.length === 0" class="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl disabled:bg-gray-200 disabled:text-gray-400">
              Confirm & Place Order
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>