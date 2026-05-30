<template>
  <div>
    <!-- Hero section -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div class="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p class="text-sm font-semibold uppercase tracking-widest text-indigo-600">New Arrivals</p>
            <h1 class="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl leading-tight">
              Quality products<br />made for everyday use.
            </h1>
            <p class="mt-5 max-w-xl text-base text-gray-500 leading-relaxed">
              Browse our featured products, discover new items, and enjoy a simple, fast shopping experience.
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <button
                @click="scrollToProducts"
                class="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-indigo-700 hover:shadow-lg active:scale-95"
              >
                Shop Now
              </button>
              <button
                class="rounded-xl border border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                View Deals
              </button>
            </div>
          </div>

          <!-- Hero visual -->
          <div class="flex items-center justify-center">
            <div class="relative h-64 w-full max-w-sm rounded-3xl bg-gradient-to-br from-indigo-100 via-violet-50 to-purple-100 p-6 shadow-xl">
              <div class="grid h-full grid-cols-2 gap-3">
                <div class="col-span-2 rounded-2xl bg-white/70 p-4 shadow-sm flex items-center gap-3">
                  <div class="h-10 w-10 rounded-xl bg-indigo-500 flex items-center justify-center">
                    <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Products Available</p>
                    <p class="text-xl font-extrabold text-gray-900">{{ products?.meta?.total ?? '–' }}</p>
                  </div>
                </div>
                <div class="rounded-2xl bg-white/70 p-3 shadow-sm flex flex-col justify-between">
                  <p class="text-xs text-gray-500">In Cart</p>
                  <p class="text-2xl font-extrabold text-indigo-600">{{ cartCount }}</p>
                </div>
                <div class="rounded-2xl bg-white/70 p-3 shadow-sm flex flex-col justify-between">
                  <p class="text-xs text-gray-500">Total</p>
                  <p class="text-lg font-extrabold text-gray-900">${{ cartTotal.toFixed(2) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products section -->
    <section id="products-section" class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-xl font-bold tracking-tight text-gray-900">All Products</h2>
          <p v-if="products?.meta" class="mt-0.5 text-sm text-gray-500">
            Showing {{ products.meta.from ?? 0 }}–{{ products.meta.to ?? 0 }} of {{ products.meta.total ?? 0 }} items
          </p>
        </div>

        <!-- Search (UI only) -->
        <div class="relative max-w-xs w-full">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-800 shadow-sm outline-none ring-0 transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
          />
          <svg class="absolute left-3 top-3 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          v-for="n in 8"
          :key="n"
          class="h-64 animate-pulse rounded-2xl bg-gray-200"
        />
      </div>

      <!-- Error -->
      <div v-else-if="fetchError" class="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p class="text-sm font-medium text-red-700">{{ fetchError.message || 'Failed to load products.' }}</p>
        <button @click="loadProducts" class="mt-3 text-sm font-semibold text-red-600 underline hover:text-red-800">
          Try again
        </button>
      </div>

      <!-- Empty -->
      <div v-else-if="filteredProducts.length === 0" class="py-20 text-center">
        <p class="text-base font-semibold text-gray-700">No products found.</p>
        <p class="mt-1 text-sm text-gray-500">Try a different search term.</p>
      </div>

      <!-- Product grid -->
      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          v-for="product in filteredProducts"
          :key="product.uuid"
          class="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg hover:-translate-y-0.5 hover:border-indigo-200"
        >
          <!-- Product image placeholder -->
          <div class="flex h-44 items-center justify-center bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50">
            <svg class="h-16 w-16 text-indigo-200 transition group-hover:text-indigo-400 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>

          <!-- Info -->
          <div class="flex flex-1 flex-col p-4">
            <h3 class="truncate text-sm font-bold text-gray-900 group-hover:text-indigo-700 transition">
              {{ product.name }}
            </h3>
            <p class="mt-1 line-clamp-2 text-xs text-gray-400">{{ product.description || 'No description available.' }}</p>

            <div class="mt-auto pt-4 flex items-center justify-between">
              <span class="text-lg font-extrabold text-gray-900">${{ Number(product.price).toFixed(2) }}</span>

              <!-- Stock and Cart indicator -->
              <span
                v-if="product.stock_quantity === 0"
                class="text-xs font-semibold text-red-600"
              >
                Out of Stock
              </span>
              <span
                v-else-if="product.stock_quantity <= 5"
                class="text-xs font-semibold text-orange-500"
              >
                Only {{ product.stock_quantity }} left
              </span>
              <span
                v-else-if="getCartQuantity(product.uuid) > 0"
                class="text-xs font-semibold text-indigo-600"
              >
                {{ getCartQuantity(product.uuid) }} in cart
              </span>
            </div>

            <div class="mt-3 flex gap-2">
              <button
                :id="`add-to-cart-${product.uuid}`"
                @click="handleAddToCart(product)"
                :disabled="product.stock_quantity === 0 || getCartQuantity(product.uuid) >= product.stock_quantity"
                class="flex-1 rounded-xl py-2.5 text-sm font-bold transition active:scale-95 border disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-200"
                :class="
                  getCartQuantity(product.uuid) > 0
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                    : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50 shadow-sm'
                "
              >
                {{ getCartQuantity(product.uuid) > 0 ? '+ Add' : 'Add to Cart' }}
              </button>
              <button
                @click="handleBuyNow(product)"
                :disabled="product.stock_quantity === 0"
                class="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-bold text-white shadow-md transition border border-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cart toast -->
    <CartToast :product-name="lastAddedName" :trigger="toastTrigger" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { productService } from '~/api/product/ProductService'
import { useCart } from '~/composables/useCart'
import CartToast from '~/components/CartToast.vue'

definePageMeta({
  layout: 'customer'
})

const { addToCart, cartCount, cartTotal, cartItems, directCheckoutItems } = useCart()

const products = ref<any>(null)
const pending = ref(true)
const fetchError = ref<any>(null)
const searchQuery = ref('')
const lastAddedName = ref('')
const toastTrigger = ref(0)

const loadProducts = async () => {
  pending.value = true
  fetchError.value = null
  try {
    products.value = await productService.list()
  } catch (err: any) {
    fetchError.value = err
  } finally {
    pending.value = false
  }
}

onMounted(loadProducts)

const filteredProducts = computed(() => {
  const all = products.value?.data ?? []
  if (!searchQuery.value.trim()) return all
  const q = searchQuery.value.trim().toLowerCase()
  return all.filter((p: any) => p.name?.toLowerCase().includes(q))
})

const getCartQuantity = (uuid: string) => {
  return cartItems.value.find((i) => i.product_uuid === uuid)?.quantity ?? 0
}

const handleAddToCart = (product: any) => {
  addToCart({
    uuid: product.uuid,
    name: product.name,
    price: Number(product.price),
    stock_quantity: Number(product.stock_quantity)
  })
  lastAddedName.value = product.name
  toastTrigger.value++
}

const handleBuyNow = async (product: any) => {
  directCheckoutItems.value = [{
    product_uuid: product.uuid,
    name: product.name,
    price: Number(product.price),
    quantity: 1,
    stock_quantity: Number(product.stock_quantity)
  }]
  await navigateTo('/customer/checkout')
}

const scrollToProducts = () => {
  document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
