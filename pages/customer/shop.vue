<script setup>
definePageMeta({
  layout: 'customer',
  role: 'customer'
})

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { productService } from '~/api/product/ProductService'
import { useCart } from '~/composables/useCart'

const router = useRouter()
const { addToCart } = useCart()

const products = ref([])
const loading = ref(true)
const error = ref('')
const feedback = ref('')

onMounted(async () => {
  try {
    const response = await productService.list()
    // Handle both data wrapper and direct array responses
    products.value = response.data || response || []
  } catch (err) {
    error.value = 'Failed to load products'
    console.error(err)
  } finally {
    loading.value = false
  }
})

const handleAddToCart = (product) => {
  const message = addToCart(product, 1)
  feedback.value = message
  // Auto-hide feedback after 3 seconds
  setTimeout(() => {
    feedback.value = ''
  }, 3000)
}

const handleBuyNow = (product) => {
  addToCart(product, 1)
  router.push('/customer/cart')
}

const goToCart = () => {
  router.push('/customer/cart')
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div class="mb-8 flex items-center justify-between">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Shop Products</h1>
      <button
        @click="goToCart"
        class="rounded-md bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 transition-all"
      >
        View Cart
      </button>
    </div>

    <Transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="feedback" class="fixed top-20 right-4 z-50 mb-4 rounded-lg p-4 text-white shadow-lg" :class="{
        'bg-green-600': feedback.includes('Successfully'),
        'bg-amber-600': !feedback.includes('Successfully')
      }">
        <div class="flex items-center gap-2">
          <svg v-if="feedback.includes('Successfully')" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span class="font-medium">{{ feedback }}</span>
        </div>
      </div>
    </Transition>

    <div v-if="loading" class="flex flex-col items-center justify-center py-24">
      <div class="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      <p class="mt-4 text-gray-500 font-medium">Fetching the best deals for you...</p>
    </div>

    <div v-else-if="error" class="rounded-md bg-red-50 p-6 text-center">
      <p class="text-sm font-bold text-red-700">{{ error }}</p>
      <button @click="window.location.reload()" class="mt-4 text-indigo-600 underline text-sm">Try refreshing</button>
    </div>

    <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="product in products"
        :key="product.uuid"
        class="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
      >
        <div class="aspect-square relative overflow-hidden bg-gray-100">
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.name"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div v-else class="flex h-full w-full items-center justify-center bg-gray-200">
             <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.587-1.587a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <div class="flex flex-1 flex-col p-6">
          <h3 class="text-xl font-bold text-gray-900">{{ product.name }}</h3>
          <p class="mt-2 line-clamp-2 text-sm text-gray-500">{{ product.description }}</p>
          
          <div class="mt-3 text-sm">
            <span v-if="product.stock > 5" class="text-emerald-600 font-medium">
              ✓ In Stock ({{ product.stock }} units available)
            </span>
            <span v-else-if="product.stock > 0 && product.stock <= 5" class="text-amber-600 font-bold animate-pulse">
              ⚠️ Only {{ product.stock }} left in stock!
            </span>
            <span v-else class="text-red-600 font-bold">
              🚫 Out of Stock / Sold Out
            </span>
          </div>
          
          <div class="mt-auto pt-4">
            <p class="text-2xl font-black text-indigo-600">
              ${{ Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
            </p>
            
            <div class="mt-4 flex gap-3">
              <button
                @click="handleAddToCart(product)"
                :disabled="product.stock <= 0"
                :class="product.stock > 0 
                  ? 'border-indigo-600 text-indigo-600 hover:bg-indigo-50' 
                  : 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'"
                class="flex-1 rounded-xl border-2 px-4 py-2 text-sm font-bold transition-colors"
              >
                {{ product.stock > 0 ? 'Add to Cart' : 'Sold Out' }}
              </button>

              <button
                @click="handleBuyNow(product)"
                :disabled="product.stock <= 0"
                :class="product.stock > 0 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'"
                class="flex-1 rounded-xl px-4 py-2 text-sm font-bold transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>