<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Featured Products
        </h1>
        <p class="mt-3 text-lg text-gray-600">
          Check out our latest products with real-time stock availability
        </p>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600"></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in products"
          :key="product.uuid"
          class="group relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
        >
          <div class="aspect-square rounded-xl bg-gray-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-12 w-12 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </div>

          <div class="mt-4">
            <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">{{ product.name }}</h3>
            <p class="mt-1 text-sm text-gray-500 line-clamp-2">{{ product.description || 'No description available' }}</p>
            
            <div class="mt-3 flex items-center justify-between">
              <span class="text-xl font-bold text-indigo-600">₱{{ formatPrice(product.price) }}</span>
              <span
                :class="[
                  'rounded-full px-2 py-1 text-xs font-medium',
                  product.stock_quantity <= 0 ? 'bg-red-100 text-red-700' :
                  product.stock_quantity < 10 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                ]"
              >
                {{ getStockStatus(product) }}
              </span>
            </div>

            <div v-if="product.stock_quantity > 0" class="mt-3">
              <div class="flex items-center gap-2">
                <button
                  @click="decrementQuantity(product)"
                  class="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50"
                >
                  -
                </button>
                <span class="w-8 text-center text-sm font-medium">{{ quantities[product.uuid] || 1 }}</span>
                <button
                  @click="incrementQuantity(product)"
                  class="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  :disabled="(quantities[product.uuid] || 1) >= product.stock_quantity"
                >
                  +
                </button>
              </div>
            </div>

            <button
              @click="addToCart(product)"
              :disabled="product.stock_quantity <= 0"
              class="mt-4 w-full rounded-lg py-2.5 text-sm font-medium transition-colors"
              :class="product.stock_quantity <= 0
                ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'"
            >
              {{ product.stock_quantity <= 0 ? 'Out of Stock' : 'Add to Cart' }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="!pending && products.length === 0" class="text-center py-16">
        <p class="text-gray-500">No products available at the moment.</p>
      </div>
    </div>

    <div
      v-if="showToast"
      class="fixed bottom-4 right-4 z-50 rounded-lg bg-green-600 px-6 py-3 text-white shadow-lg transition-all"
    >
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { productService } from '~/api/product/ProductService'
import { useCart } from '~/composables/useCart'

definePageMeta({ layout: 'customer' })

const { addItem, loadCart } = useCart()
const products = ref([])
const pending = ref(true)
const showToast = ref(false)
const toastMessage = ref('')
const quantities = reactive({})

const formatPrice = (price) => Number(price).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const getStockStatus = (product) => {
  if (product.stock_quantity <= 0) return 'Out of Stock'
  return `Stock Left: ${product.stock_quantity}`
}

const incrementQuantity = (product) => {
  const currentQty = quantities[product.uuid] || 1
  if (currentQty < product.stock_quantity) {
    quantities[product.uuid] = currentQty + 1
  }
}

const decrementQuantity = (product) => {
  const currentQty = quantities[product.uuid] || 1
  if (currentQty > 1) {
    quantities[product.uuid] = currentQty - 1
  }
}

const fetchProducts = async () => {
  pending.value = true
  try {
    const res = await productService.list()
    products.value = (res.data || []).map(product => ({
      ...product,
      price: Number(product.price),
      stock_quantity: Number(product.stock_quantity ?? 0)
    }))

    products.value.forEach(product => {
      if (!quantities[product.uuid]) {
        quantities[product.uuid] = 1
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    pending.value = false
  }
}

const addToCart = (product) => {
  if (product.stock_quantity <= 0) return

  const quantity = quantities[product.uuid] || 1

  if (quantity > product.stock_quantity) {
    showToastMessage(`Only ${product.stock_quantity} items available`)
    return
  }

  const added = addItem(product, quantity)

  if (added) {
    showToastMessage(`${quantity} x ${product.name} added to cart!`)
  }
}

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}

onMounted(() => {
  loadCart()
  fetchProducts()
})
</script>
