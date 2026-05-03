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
  // Auto-hide feedback after 2 seconds
  setTimeout(() => {
    feedback.value = ''
  }, 2000)
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
    <!-- Header Section -->
    <div class="mb-8 flex items-center justify-between">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Shop Products</h1>
      <button
        @click="goToCart"
        class="rounded-md bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 transition-all"
      >
        View Cart
      </button>
    </div>

    <!-- Success Feedback Toast -->
    <Transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="feedback" class="fixed top-20 right-4 z-50 mb-4 rounded-lg bg-green-600 p-4 text-white shadow-lg">
        <div class="flex items-center gap-2">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="font-medium">{{ feedback }}</span>
        </div>
      </div>
    </Transition>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-24">
      <div class="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      <p class="mt-4 text-gray-500 font-medium">Fetching the best deals for you...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="rounded-md bg-red-50 p-6 text-center">
      <p class="text-sm font-bold text-red-700">{{ error }}</p>
      <button @click="window.location.reload()" class="mt-4 text-indigo-600 underline text-sm">Try refreshing</button>
    </div>

    <!-- Product Grid -->
    <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="product in products"
        :key="product.uuid"
        class="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-hover hover:shadow-md"
      >
        <!-- Image Area -->
        <div class="aspect-square relative overflow-hidden bg-gray-100">
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.name"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <!-- Placeholder if no image -->
          <div v-else class="flex h-full w-full items-center justify-center bg-gray-200">
             <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.587-1.587a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <!-- Details -->
        <div class="flex flex-1 flex-col p-6">
          <h3 class="text-xl font-bold text-gray-900">{{ product.name }}</h3>
          <p class="mt-2 line-clamp-2 text-sm text-gray-500">{{ product.description }}</p>
          
          <div class="mt-auto pt-6">
            <p class="text-2xl font-black text-indigo-600">
              ${{ Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
            </p>
            
            <div class="mt-4 flex gap-3">
              <button
                @click="handleAddToCart(product)"
                class="flex-1 rounded-xl border-2 border-indigo-600 px-4 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                Add to Cart
              </button>
              <button
                @click="handleBuyNow(product)"
                class="flex-1 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700 transition-colors"
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