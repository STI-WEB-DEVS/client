<script setup>
definePageMeta({
  layout: 'customer'
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
    <div class="mb-8 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Shop Products</h1>
      <button
        @click="goToCart"
        class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        View Cart
      </button>
    </div>

    <div v-if="feedback" class="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700">
      {{ feedback }}
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <p class="text-gray-500">Loading products...</p>
    </div>

    <div v-else-if="error" class="rounded-md bg-red-50 p-4 text-sm text-red-700">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="product in products"
        :key="product.uuid"
        class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
      >
        <div class="aspect-square bg-gray-200">
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.name"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
          <p class="mt-1 text-sm text-gray-500">{{ product.description }}</p>
          <p class="mt-2 text-lg font-bold text-indigo-600">${{ product.price }}</p>
          <div class="mt-4 flex gap-2">
            <button
              @click="handleAddToCart(product)"
              class="flex-1 rounded-md border border-indigo-600 px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
            >
              Add to Cart
            </button>
            <button
              @click="handleBuyNow(product)"
              class="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
