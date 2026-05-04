<template>
  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <!-- Simplified header - removed the separate Cart button -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Shop</h1>
      <p class="text-sm text-gray-500 mt-1">Browse products and add items to your cart.</p>
    </div>

    <!-- Products grid -->
    <div v-if="pending" class="flex justify-center py-16">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600"></div>
    </div>

    <div v-else-if="products.length === 0" class="text-center py-16 bg-white rounded-lg shadow">
      <p class="text-gray-500">No products available.</p>
      <p class="text-sm text-gray-400 mt-2">Admin hasn't added any products yet.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.uuid" class="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div class="relative bg-gray-100 p-6">
          <svg class="mx-auto h-32 w-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
          <p class="text-2xl font-bold text-indigo-600 mt-2">₱{{ formatPrice(product.price) }}</p>
          
          <div class="mt-4 flex gap-2">
            <button @click="buyNow(product)" class="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
              Buy Now
            </button>
            <button @click="addToCart(product)" class="flex-1 border border-indigo-600 text-indigo-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { productService } from '~/api/product/ProductService'
import { useCart } from '~/composables/useCart'

definePageMeta({ layout: 'customer' })

const { addItem, clearCart } = useCart()
const products = ref([])
const pending = ref(true)

const formatPrice = (price) => Number(price).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const fetchProducts = async () => {
  pending.value = true
  try {
    const res = await productService.list()
    products.value = res.data || []
    console.log('Products loaded:', products.value.length)
    console.log('Product UUIDs:', products.value.map(p => ({ name: p.name, uuid: p.uuid })))
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    pending.value = false
  }
}

const addToCart = (product) => {
  console.log('Adding to cart:', product.name, 'UUID:', product.uuid)
  addItem({ 
    uuid: product.uuid, 
    name: product.name, 
    price: Number(product.price) 
  }, 1)
}

const buyNow = (product) => {
  console.log('Buy now:', product.name)
  clearCart()
  addItem({ 
    uuid: product.uuid, 
    name: product.name, 
    price: Number(product.price) 
  }, 1)
  navigateTo('/checkout')
}

onMounted(fetchProducts)
</script>