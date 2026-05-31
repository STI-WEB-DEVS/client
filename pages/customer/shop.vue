<script setup>
import { ref, onMounted, inject } from 'vue'
import { productsService } from '~/api/product/ProductsService'
import { useCart } from '~/composables/useCart'

definePageMeta({
  layout: 'customer'
})

const showToast = inject('showToast', () => {})
const { addToCart, cartItems } = useCart()

const products = ref([])
const isLoading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const response = await productsService.list()
    // The API returns paginated data – handle both shapes
    products.value = response?.data || response || []
  } catch (err) {
    error.value = err?.message || 'Failed to load products.'
  } finally {
    isLoading.value = false
  }
})

const getCartQuantity = (productUuid) => {
  return cartItems.value.find(i => i.product_uuid === productUuid)?.quantity ?? 0
}

const isMaxedOut = (product) => getCartQuantity(product.uuid) >= product.stock

const handleAddToCart = (product) => {
  if (product.stock === 0) return
  addToCart(product, 1)
  showToast(`Added "${product.name}" to cart!`)
}

const handleBuyNow = (product) => {
  if (product.stock === 0) return
  addToCart(product, 1)
  navigateTo('/customer/checkout')
}
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-10">
      <p class="text-sm font-semibold uppercase tracking-widest text-indigo-600">Browse</p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Products</h1>
      <p class="mt-2 text-base text-gray-500">Select products to add to your cart, or buy one right away.</p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <div class="flex flex-col items-center gap-4">
        <svg class="h-10 w-10 animate-spin text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span class="text-sm text-gray-500">Loading products…</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <p class="text-sm font-medium text-red-700">{{ error }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="products.length === 0" class="py-20 text-center">
      <p class="text-4xl">📭</p>
      <p class="mt-4 text-lg font-medium text-gray-700">No products available yet.</p>
      <p class="mt-1 text-sm text-gray-500">Check back later for new arrivals!</p>
    </div>

    <!-- Product Grid -->
    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="product in products"
        :key="product.uuid"
        class="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        :class="{ 'opacity-70': product.stock === 0 }"
      >
        <!-- Product Image Placeholder -->
        <div class="relative flex h-48 items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
          <span class="text-6xl opacity-60 transition-transform duration-300 group-hover:scale-110">📦</span>
          <div class="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-indigo-600 shadow-sm backdrop-blur">
            ₱{{ Number(product.price).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
          </div>
          <!-- Out of Stock Overlay -->
          <div
            v-if="product.stock === 0"
            class="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-[1px]"
          >
            <span class="rounded-full bg-gray-900 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
              Out of Stock
            </span>
          </div>
        </div>

        <!-- Product Info -->
        <div class="flex flex-1 flex-col gap-4 p-5">
          <div>
            <h3 class="text-base font-semibold text-gray-900">{{ product.name }}</h3>
            <!-- Description -->
            <p
              v-if="product.description"
              class="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2"
            >{{ product.description }}</p>
            <!-- Stock Badge -->
            <div class="mt-2 flex items-center gap-2">
              <span
                :class="[
                  product.stock === 0
                    ? 'bg-red-100 text-red-600'
                    : product.stock <= 10
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-emerald-100 text-emerald-700'
                ]"
                class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"
              >
                <span
                  :class="[
                    product.stock === 0 ? 'bg-red-500' : product.stock <= 10 ? 'bg-amber-500' : 'bg-emerald-500'
                  ]"
                  class="h-1.5 w-1.5 rounded-full"
                />
                {{
                  product.stock === 0
                    ? 'Out of Stock'
                    : product.stock <= 10
                    ? `Low Stock · ${product.stock} left`
                    : `In Stock · ${product.stock} available`
                }}
              </span>
            </div>
            <!-- Max in cart notice -->
            <p v-if="product.stock > 0 && isMaxedOut(product)" class="mt-1 text-xs text-indigo-600 font-medium">
              ✓ Max quantity added to cart
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="mt-auto flex gap-2">
            <button
              @click="handleAddToCart(product)"
              :disabled="product.stock === 0 || isMaxedOut(product)"
              class="flex-1 rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 active:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {{ product.stock === 0 ? 'Unavailable' : 'Add to Cart' }}
            </button>
            <button
              @click="handleBuyNow(product)"
              :disabled="product.stock === 0"
              class="rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-indigo-400 hover:text-indigo-600 active:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
