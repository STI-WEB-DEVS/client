<template>
  <div class="min-h-screen bg-gray-100">

    <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Shop Products</h1>
        <p class="mt-1 text-sm text-gray-500">Browse our latest products</p>
      </div>

      <div class="relative">
        <MagnifyingGlassIcon class="absolute left-3 top-3 size-5 text-gray-400" />
        <input
          v-model="search"
          type="text"
          placeholder="Search product..."
          class="w-72 rounded-xl border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>
    </div>

    <div
      v-if="filteredProducts.length"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.uuid"
        class="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
      >
        <div class="relative">
          <div class="flex h-64 items-center justify-center overflow-hidden bg-gray-100">
            <img
              v-if="product.image"
              :src="product.image"
              alt="Product"
              class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <div v-else class="flex flex-col items-center text-gray-400">
              <PhotoIcon class="mb-2 size-12" />
              <span class="text-sm">No Image</span>
            </div>
          </div>
        </div>

        <div class="p-5">
          <div class="mb-4">
            <h2 class="text-lg font-bold text-gray-900">{{ product.name }}</h2>
            <p class="mt-2 text-3xl font-bold text-indigo-600">${{ product.price }}</p>
          </div>

          <div class="mb-4 flex gap-2">
            <button
              @click="addToCart(product)"
              :disabled="product.stock <= 0 || isSubmitting"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-500 py-3 text-sm font-semibold text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <ShoppingCartIcon class="size-5" />
              Add to Cart
            </button>

            <button
              @click="buyNow(product)"
              :disabled="product.stock <= 0 || isSubmitting"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              <span v-if="isSubmitting && targetedProductUuid === product.uuid">Processing...</span>
              <span v-else>Buy Now</span>
            </button>
          </div>

          <div class="border-t border-gray-100 pt-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">Free Shipping</span>
              <span class="text-sm font-medium text-green-600">Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!filteredProducts.length && !loading"
      class="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center"
    >
      <CubeIcon class="mb-4 size-16 text-gray-300" />
      <h3 class="text-lg font-semibold text-gray-700">No Products Found</h3>
      <p class="mt-2 text-sm text-gray-500">Try searching another product.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { CubeIcon, MagnifyingGlassIcon, PhotoIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline'

// API Services
import { productService } from '~/api/product/ProductService'
import { orderService } from '~/api/order/OrderService'

definePageMeta({
  layout: 'customer'
})

const products = ref<any[]>([])
const loading = ref(false)
const search = ref('')
const cart = ref<any[]>([])

// Transaction Loading State Handles
const isSubmitting = ref(false)
const targetedProductUuid = ref('')

const filteredProducts = computed(() => {
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const fetchProducts = async () => {
  loading.value = true
  try {
    const response = await productService.list()
    products.value = response?.data || response || []
  } catch (error) {
    console.error('Failed to load products:', error)
  } finally {
    loading.value = false
  }
}

// HANDLES ADD TO CART & LOCAL STORAGE PERSISTENCE
const addToCart = (product: any) => {
  if (typeof window === 'undefined') return

  const localCartData = localStorage.getItem('shopping-cart')
  let currentCart = localCartData ? JSON.parse(localCartData) : []

  const existingItemIndex = currentCart.findIndex((item: any) => item.uuid === product.uuid)

  if (existingItemIndex !== -1) {
    currentCart[existingItemIndex].quantity += 1
  } else {
    currentCart.push({
      id: product.uuid, 
      uuid: product.uuid,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
  }

  localStorage.setItem('shopping-cart', JSON.stringify(currentCart))
  cart.value = currentCart
  
  window.dispatchEvent(new Event('cart-updated'))
  alert(`${product.name} added to cart!`)
}

// DIRECT DATABASE CHECKOUT TRANSACTION
// DIRECT DATABASE CHECKOUT TRANSACTION
const buyNow = async (product: any) => {
  if (!product.uuid) return

  // 1. Retrieve and strictly validate customer_uuid from localStorage
  let dynamicCustomerUuid = ""
  if (typeof window !== 'undefined') {
    dynamicCustomerUuid = localStorage.getItem('_uuid') || ""
  }
  
  // If no customer UUID exists, prevent the checkout and alert the user
  if (!dynamicCustomerUuid) {
    alert('Checkout Failed: You must be logged in to place an order.')
    // Optional: useRouter().push('/login')
    return
  }

  // Prevent double clicks or multi-submissions once validation passes
  isSubmitting.value = true
  targetedProductUuid.value = product.uuid

  // 2. Structure payload parameters required by App\Service\OrderService::createOrder
  const orderPayload = {
    customer_uuid: dynamicCustomerUuid,
    items: [
      {
        product_uuid: product.uuid,
        quantity: 1
      }
    ]
  }

  try {
    // 3. Fire API payload right into your Laravel Repository Database Layer
    const response = await orderService.create(orderPayload)
    
    // Unpack response cleanly (handles standard responses or nested data packets)
    const orderData = response?.data || response

    alert(`Success! Order written directly to database. ID: ${orderData.id || 'Confirmed'}`)
    
    // 4. Reload local state array numbers to sync any backend stock decrements
    await fetchProducts()
  } catch (error: any) {
    console.error('Direct checkout submission failed:', error)
    const errorMsg = error?.response?._data?.message || error?.data?.message || 'An error occurred during checkout.'
    alert(`Checkout Error: ${errorMsg}`)
  } finally {
    // Release loading contexts safely
    isSubmitting.value = false
    targetedProductUuid.value = ''
  }
}

onMounted(() => {
  fetchProducts()
  
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('shopping-cart')
    if (savedCart) {
      cart.value = JSON.parse(savedCart)
    }
  }
})
</script>