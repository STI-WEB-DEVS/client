<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productService } from '~/api/product/ProductService'
import { useCart } from '~/composables/useCart'

definePageMeta({ layout: 'customer' })

const route = useRoute()
const router = useRouter()
const { addToCart } = useCart()

const product = ref<any>(null)
const pending = ref(true)
const error = ref('')
const quantity = ref(1)
const added = ref(false)

onMounted(async () => {
  try {
    const res = await productService.show(route.params.uuid as string)
    product.value = res?.data ?? res
  } catch (err: any) {
    error.value = err.message
  } finally {
    pending.value = false
  }
})

const handleAddToCart = () => {
  if (!product.value) return
  addToCart(
    { uuid: product.value.uuid, name: product.value.name, price: Number(product.value.price) },
    quantity.value
  )
  added.value = true
  setTimeout(() => added.value = false, 2000)
}

const handleBuyNow = () => {
  handleAddToCart()
  router.push('/customer/cart')
}
</script>

<template>
  <div>
    <button @click="$router.back()" class="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back to catalog
    </button>

    <div v-if="pending" class="flex justify-center py-20">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />
    </div>

    <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
      <p class="text-sm text-red-700">{{ error }}</p>
    </div>

    <div v-else-if="product" class="grid gap-10 lg:grid-cols-2">
      <!-- Image -->
      <div class="aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
        <div class="flex h-full items-center justify-center text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <!-- Details -->
      <div class="flex flex-col">
        <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
        <p class="mt-3 text-sm text-gray-500">{{ product.description ?? 'No description available.' }}</p>

        <div class="mt-6 flex items-center gap-4">
          <span class="text-3xl font-bold text-gray-900">₱{{ Number(product.price).toFixed(2) }}</span>
          <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            Stock: {{ product.stock ?? 'N/A' }}
          </span>
        </div>

        <!-- Quantity selector component -->
        <div class="mt-8">
          <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
          <QuantitySelector v-model="quantity" :min="1" />
        </div>

        <!-- Added to cart feedback -->
        <div v-if="added" class="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          ✓ Added to cart successfully!
        </div>

        <!-- Actions -->
        <div class="mt-8 flex gap-3">
          <button
            @click="handleAddToCart"
            class="flex-1 rounded-lg border border-indigo-600 px-5 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
          >
            Add to Cart
          </button>
          <button
            @click="handleBuyNow"
            class="flex-1 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>