<script setup>
import { productService } from '~/api/product/ProductService'

definePageMeta({
  layout: 'customer',
})

const products = ref([])
const isLoading = ref(true)
const errorMessage = ref('')
const cartMessage = ref('')
const { addItem } = useCustomerCart()
let refreshTimer = null

const loadProducts = async (silent = false) => {
  if (!silent) {
    isLoading.value = true
  }
  errorMessage.value = ''

  try {
    const response = await productService.list()
    products.value = Array.isArray(response?.data)
      ? response.data.map((product) => ({
          ...product,
          price: Number(product.price || 0),
          stock: Number(product.stock || 0),
        }))
      : []
  } catch (error) {
    if (!silent) {
      errorMessage.value = error?.message || 'Unable to load products.'
    }
  } finally {
    if (!silent) {
      isLoading.value = false
    }
  }
}

const addToCart = (product) => {
  cartMessage.value = addItem(product)
    ? `${product.name} added to cart.`
    : `Cannot add ${product.name}. Stock limit reached.`
}

onMounted(() => {
  loadProducts()
  window.addEventListener('customer-products-updated', refreshProducts)
  refreshTimer = window.setInterval(() => loadProducts(true), 10000)
})

onBeforeUnmount(() => {
  window.removeEventListener('customer-products-updated', refreshProducts)

  if (refreshTimer) {
    window.clearInterval(refreshTimer)
  }
})

const refreshProducts = () => {
  loadProducts(true)
}
</script>

<template>
  <section>
    <div class="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Products</h2>
        <p class="mt-1 text-sm text-gray-600">Choose products to add to your cart.</p>
      </div>
      <NuxtLink to="/customer/cart" class="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
        View Cart
      </NuxtLink>
    </div>

    <div v-if="cartMessage" class="mb-4 rounded-lg border border-indigo-100 bg-indigo-50 p-3 text-sm font-semibold text-indigo-700">
      {{ cartMessage }}
    </div>

    <div v-if="isLoading" class="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
      Loading products...
    </div>
    <div v-else-if="errorMessage" class="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {{ errorMessage }}
    </div>
    <div v-else-if="!products.length" class="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
      No products available.
    </div>
    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="product in products" :key="product.uuid" class="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div class="mb-4 aspect-[4/3] rounded-md bg-gray-100"></div>
        <div class="flex items-start justify-between gap-3">
          <h3 class="text-base font-bold text-gray-900">{{ product.name }}</h3>
          <span :class="['rounded-full px-3 py-1 text-xs font-bold', product.stock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700']">
            {{ product.stock > 0 ? `${product.stock} stock` : 'Out of stock' }}
          </span>
        </div>
        <p class="mt-2 min-h-10 text-sm text-gray-600">{{ product.description || 'No description available.' }}</p>
        <p class="mt-1 text-sm font-semibold text-indigo-600">PHP {{ Number(product.price || 0).toFixed(2) }}</p>
        <button type="button" class="mt-4 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:bg-gray-300 disabled:text-gray-500" :disabled="product.stock < 1" @click="addToCart(product)">
          {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
        </button>
      </article>
    </div>
  </section>
</template>
