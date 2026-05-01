<template>
  <div>
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Shop</h1>
        <p class="text-sm text-gray-500">Browse available products</p>
      </div>

      <!-- Cart count preview -->
      <div class="text-sm text-gray-600">
        Cart: <span class="font-semibold">{{ totalItems }}</span>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div v-for="i in 8" :key="i" class="animate-pulse bg-white p-4 rounded-xl border">
        <div class="aspect-square bg-gray-200 rounded mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div class="h-8 bg-gray-200 rounded"></div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-16">
      <p class="text-red-500 mb-4">Failed to load products.</p>
      <button
        @click="fetchProducts"
        class="px-4 py-2 bg-gray-900 text-white rounded-md text-sm"
      >
        Retry
      </button>
    </div>

    <!-- Empty -->
    <div v-else-if="products.length === 0" class="text-center py-16 text-gray-500">
      No products available.
    </div>

    <!-- Product Grid -->
    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      
      <div
        v-for="product in products"
        :key="product.id"
        class="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
      >
        <!-- Image -->
        <div class="aspect-square bg-gray-100 overflow-hidden">
          <img
            v-if="product.image"
            :src="product.image"
            class="w-full h-full object-cover group-hover:scale-105 transition"
          />
        </div>

        <!-- Content -->
        <div class="p-4 flex flex-col flex-1">
          
          <h2 class="text-sm font-semibold text-gray-900 line-clamp-2">
            {{ product.name }}
          </h2>

          <p class="mt-1 text-xs text-gray-500 line-clamp-2">
            {{ product.description }}
          </p>

          <div class="mt-3 text-lg font-bold text-indigo-600">
            ₱{{ formatPrice(product.price) }}
          </div>

          <div class="flex-1"></div>

          <!-- Add to Cart -->
          <button
            @click="handleAddToCart(product)"
            class="mt-4 flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition active:scale-95"
          >
            <CartIcon class="size-4" />
            Add
          </button>
        </div>
      </div>

    </div>
  </div>
  <FeedbackModal
  :open="isFeedbackModalOpen"
  :message="feedbackMessage"
  @close="closeFeedbackModal"
/>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { ShoppingCartIcon as CartIcon } from '@heroicons/vue/24/outline'
import { productService } from '~/api/product/ProductService'

definePageMeta({
  layout: 'customer'
})

const products = ref([])
const loading = ref(false)
const error = ref(false)

/* TEMP CART */
const CART_KEY = 'cart'

const loadCart = () => {
  if (process.client) {
    return JSON.parse(localStorage.getItem(CART_KEY)) || []
  }
  return []
}

const saveCart = (cartData) => {
  if (process.client) {
    localStorage.setItem(CART_KEY, JSON.stringify(cartData))
  }
}

const cart = ref(loadCart())

const handleAddToCart = (product) => {
  addToCart(product)
  showFeedback('Added to cart!')
}
const addToCart = (product) => {
  const existing = cart.value.find(item => item.product_uuid === product.uuid)

  if (existing) {
    existing.qty++
  } else {
    cart.value.push({
        product_uuid: product.uuid,
        name: product.name,
        price: product.price,
      image: product.image,
      qty: 1
    })
  }

  saveCart(cart.value)
}

// --- Feedback State ---
const isFeedbackModalOpen = ref(false);
const feedbackMessage = ref('');

const showFeedback = (msg) => {
  feedbackMessage.value = msg
  isFeedbackModalOpen.value = true

  setTimeout(() => {
    isFeedbackModalOpen.value = false
  }, 2000)
}

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
};


/* Derived total count */
const totalItems = computed(() =>
  cart.value.reduce((sum, item) => sum + item.qty, 0)
)

/* Fetch products */
const fetchProducts = async () => {
  loading.value = true
  error.value = false

  try {
    const response = await productService.list()
    products.value = response?.data ?? response ?? []
  } catch (err) {
    console.error(err)
    error.value = true
  } finally {
    loading.value = false
  }
}


/* Format price */
const formatPrice = (price) => {
  return Number(price).toLocaleString()
}

/* ONLY run on client */
onMounted(fetchProducts)

</script>