<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-900">
    
    <header class="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div class="text-2xl font-black tracking-widest uppercase">
          My<span class="text-blue-600">Store</span>
        </div>
        
        <nav class="hidden gap-8 text-sm font-semibold text-gray-500 md:flex">
          <a href="#" class="text-gray-900 transition-colors">Shop</a>
          <a href="#" class="hover:text-gray-900 transition-colors">Categories</a>
          <a href="#" class="hover:text-gray-900 transition-colors">About</a>
        </nav>
        
        <button @click="isCartOpen = true" class="relative flex items-center gap-2 p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span v-if="cartItemCount > 0" class="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white border-2 border-white transform translate-x-1 -translate-y-1">
            {{ cartItemCount }}
          </span>
        </button>
      </div>
    </header>

    <main>
      <section class="bg-white py-16 sm:py-24 border-b border-gray-200">
        <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 class="text-4xl font-black tracking-tight sm:text-5xl text-gray-900">
            Everyday Essentials.
          </h1>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Curated products for a better life. Select your items and checkout seamlessly.
          </p>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="mb-8 flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900 tracking-tight">New Arrivals</h2>
        </div>

        <div v-if="isLoading" class="flex justify-center py-20 text-gray-400">
          <div class="flex items-center gap-3">
            <svg class="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span class="text-lg font-medium">Loading catalog...</span>
          </div>
        </div>

        <div v-else-if="errorMessage" class="rounded-xl bg-red-50 p-6 text-red-700 text-center border border-red-100 font-medium">
          {{ errorMessage }}
        </div>

        <div v-else-if="products.length === 0" class="text-center py-20 text-gray-500 bg-white rounded-2xl border border-gray-100">
          No products currently available.
        </div>

        <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="product in products" :key="product.id" class="group flex flex-col bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300">
            
            <div class="aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-50 mb-5 relative">
              <img 
                :src="product.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=600&fit=crop'" 
                :alt="product.name" 
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
            
            <div class="flex justify-between items-start gap-2">
              <h3 class="text-lg font-bold text-gray-900 leading-tight">{{ product.name }}</h3>
              <p class="text-lg font-black text-blue-600">${{ product.price }}</p>
            </div>
            
            <p class="mt-2 text-sm text-gray-500 line-clamp-2 flex-grow">
              {{ product.description }}
            </p>
            
            <div class="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5">
              
              <div class="flex items-center gap-3">
                <div class="flex items-center border border-gray-200 rounded-lg bg-gray-50 px-2 py-1">
                  <span class="text-xs text-gray-500 font-medium mr-1">Qty</span>
                  <input 
                    type="number" 
                    min="1" 
                    v-model.number="product.selectedQuantity" 
                    class="w-10 bg-transparent text-center text-sm font-bold focus:outline-none" 
                  />
                </div>
                
                <button @click="addToBag(product)" class="flex-1 rounded-lg border-2 border-gray-900 bg-white py-2.5 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white">
                  Add to Bag
                </button>
              </div>

              <button @click="buyNow(product)" class="w-full rounded-lg bg-blue-600 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-md">
                Buy Now
              </button>

            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-gray-200 bg-white py-12 mt-12">
      <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 text-sm text-gray-500">
        <p>© 2026 MyStore. Modern & Seamless.</p>
      </div>
    </footer>

    <div v-if="isCartOpen" class="fixed inset-0 z-50 flex justify-end bg-gray-900/60 backdrop-blur-sm transition-opacity">
      <div class="w-full max-w-md bg-white shadow-2xl flex flex-col h-full transform transition-transform">
        
        <div class="flex justify-between items-center border-b border-gray-100 p-6">
          <h2 class="text-2xl font-black text-gray-900 flex items-center gap-2">
            Your Bag
            <span class="text-sm font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{{ cartItemCount }}</span>
          </h2>
          <button @click="isCartOpen = false" class="text-gray-400 hover:text-gray-900 transition-colors bg-gray-50 hover:bg-gray-100 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div v-if="cart.length === 0" class="flex-1 flex flex-col items-center justify-center p-6 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-24 h-24 mb-4 text-gray-300"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
          <p class="text-lg font-medium text-gray-900">Your bag is empty.</p>
          <p class="text-sm mt-1">Looks like you haven't added anything yet.</p>
          <button @click="isCartOpen = false" class="mt-6 text-blue-600 font-bold hover:underline">Continue Shopping</button>
        </div>
        
        <div v-else class="flex-1 overflow-y-auto p-6 space-y-6">
          <div v-for="(item, index) in cart" :key="item.id" class="flex gap-4 border-b border-gray-50 pb-6">
            <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
              <img :src="item.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'" :alt="item.name" class="h-full w-full object-cover">
            </div>
            
            <div class="flex flex-1 flex-col justify-between">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-bold text-gray-900">{{ item.name }}</h3>
                  <p class="text-sm text-gray-500 mt-1">Qty: {{ item.quantity }}</p>
                </div>
                <p class="font-bold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
              
              <div class="flex items-end text-sm">
                <button @click="removeItem(index)" class="text-red-500 hover:text-red-700 font-medium transition-colors">Remove</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-200 bg-gray-50 p-6" v-if="cart.length > 0">
          
          <div class="space-y-3 text-sm text-gray-600 mb-6">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span class="font-medium text-gray-900">${{ cartTotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping</span>
              <span class="font-medium text-green-600">Calculated at checkout</span>
            </div>
            <div class="flex justify-between border-t border-gray-200 pt-3 mt-3">
              <span class="text-lg font-bold text-gray-900">Total</span>
              <span class="text-lg font-black text-gray-900">${{ cartTotal.toFixed(2) }}</span>
            </div>
          </div>
          
          <button @click="submitOrder" :disabled="isSubmitting" class="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
            <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ isSubmitting ? 'Processing Order...' : 'Checkout securely' }}
          </button>
          <p class="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
            Secure data transmission via Nuxt & Laravel
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { productService } from '~/api/product/ProductService'

// Nuxt composables
const runtimeConfig = useRuntimeConfig()

// --- STATE ---
const products = ref([])
const isLoading = ref(true)
const errorMessage = ref(null)

const cart = ref([])
const isCartOpen = ref(false)
const isSubmitting = ref(false)

// --- COMPUTED ---
const cartItemCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0)
})

const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

// --- METHODS ---
const fetchProducts = async () => {
  isLoading.value = true
  errorMessage.value = null

  try {
    const result = await productService.list()
    const fetchedProducts = result.data || result || []
    
    products.value = fetchedProducts.map(p => ({
      ...p,
      selectedQuantity: 1 
    }))
  } catch (error) {
    errorMessage.value = "Could not load products. Ensure Laravel is running."
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

// 1. ADD TO BAG: Updates array but keeps drawer closed
const addToBag = (product) => {
  const existingItem = cart.value.find(item => item.id === product.id)
  const quantityToAdd = parseInt(product.selectedQuantity) || 1

  if (existingItem) {
    existingItem.quantity += quantityToAdd
  } else {
    cart.value.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantityToAdd,
      product_uuid: product.uuid,
      image_url: product.image_url // Passing image for the cart UI
    })
  }

  // Reset input
  product.selectedQuantity = 1
}

// 2. BUY NOW: Adds to bag and forces the drawer open immediately
const buyNow = (product) => {
  addToBag(product)
  isCartOpen.value = true
}

// Remove single item from cart
const removeItem = (index) => {
  cart.value.splice(index, 1)
}

const submitOrder = async () => {
  if (cart.value.length === 0) return
  isSubmitting.value = true

  try {
    const customerUuid = localStorage.getItem('_uuid')
    const token = localStorage.getItem('_token')
    
    if (!customerUuid || !token) {
      alert('You must be logged in to checkout.')
      isSubmitting.value = false
      return
    }
    
    const payload = {
      customer_uuid: customerUuid,
      items: cart.value,
      total_amount: cartTotal.value
    }
    
    // API Call
    await $fetch('/orders', {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: payload
    })
    
    alert('Success! Your order has been placed.')
    cart.value = [] 
    isCartOpen.value = false 
    
  } catch (error) {
    console.error('Failed to checkout:', error)
    alert('Checkout failed. Please check your network or token.')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>