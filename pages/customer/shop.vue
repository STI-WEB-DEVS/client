<template>
  <div class="space-y-10">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Our Products</h2>
      <NuxtLink to="/customer/cart" class="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
        View Cart ({{ cartCount }})
        <ShoppingCartIcon class="h-5 w-5" />
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="flex justify-center py-20">
      <div class="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <p class="text-red-700 font-medium">{{ error.message }}</p>
      <button @click="fetchProducts" class="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-500">
        Try again
      </button>
    </div>

    <!-- Product Grid -->
    <div v-else class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      <div v-for="product in productsList" :key="product.uuid" class="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-4 transition hover:shadow-lg">
        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-100 group-hover:opacity-75">
         
        </div>
        <div class="mt-4 flex flex-1 flex-col">
          <h3 class="text-sm font-medium text-gray-900">{{ product.name }}</h3>
          <p class="mt-1 text-lg font-bold text-indigo-600">₱{{ product.price.toLocaleString() }}</p>
          
          <div class="mt-4 flex items-center gap-3">
            <div class="flex items-center rounded-lg border border-gray-200">
              <button 
                @click="decrementQty(product.uuid)" 
                class="flex h-8 w-8 items-center justify-center rounded-l-lg hover:bg-gray-50 text-gray-600"
              >
                <MinusIcon class="h-4 w-4" />
              </button>
              <input 
                type="number" 
                v-model.number="quantities[product.uuid]" 
                class="w-10 border-none bg-transparent p-0 text-center text-sm font-medium focus:ring-0 [-webkit-appearance:none] [-moz-appearance:textfield]"
                min="1"
              />
              <button 
                @click="incrementQty(product.uuid)" 
                class="flex h-8 w-8 items-center justify-center rounded-r-lg hover:bg-gray-50 text-gray-600"
              >
                <PlusIcon class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div class="mt-6 flex flex-col gap-2">
            <button 
              @click="handleBuyNow(product)"
              class="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
            >
              Buy Now
            </button>
            <button 
              @click="handleAddToCart(product)"
              class="flex w-full items-center justify-center rounded-lg border border-indigo-600 px-4 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Feedback Modal -->
    <FeedbackModal
      :open="isModalOpen"
      :message="modalMessage"
      @close="isModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ShoppingCartIcon, PlusIcon, MinusIcon } from '@heroicons/vue/24/outline'
import { productService } from '~/api/product/ProductService'
import { orderService } from '~/api/order/OrderService'
import { useCart } from '~/composables/useCart'
import FeedbackModal from '~/components/FeedbackModal.vue'

definePageMeta({
  layout: 'customer'
})

const { addToCart, cartCount, saveLocalOrder } = useCart()

const productsList = ref<any[]>([])
const pending = ref(true)
const error = ref<any>(null)
const quantities = ref<Record<string, number>>({})

const isModalOpen = ref(false)
const modalMessage = ref('')

const showFeedback = (message: string) => {
  modalMessage.value = message
  isModalOpen.value = true
}

const fetchProducts = async () => {
  pending.value = true
  error.value = null
  try {
    const response = await productService.list()
    // Assuming the response structure has data property
    productsList.value = response.data || response
    
    // Initialize quantities
    productsList.value.forEach(p => {
      quantities.value[p.uuid] = 1
    })
  } catch (err: any) {
    error.value = err
    console.error('Failed to fetch products:', err)
  } finally {
    pending.value = false
  }
}

onMounted(fetchProducts)

const incrementQty = (uuid: string) => {
  quantities.value[uuid]++
}

const decrementQty = (uuid: string) => {
  if (quantities.value[uuid] > 1) {
    quantities.value[uuid]--
  }
}

const handleAddToCart = (product: any) => {
  const qty = quantities.value[product.uuid] || 1
  addToCart(product, qty)
  showFeedback(`Added ${qty} ${product.name} to cart`)
}

const handleBuyNow = async (product: any) => {
  const qty = quantities.value[product.uuid] || 1
  const customerUuid = typeof window !== 'undefined' ? localStorage.getItem('_customer_uuid') : null
  const userUuid = typeof window !== 'undefined' ? localStorage.getItem('_user_uuid') : null

  if (!userUuid) {
    showFeedback('Please sign in before placing an order.')
    return
  }

  const payload: any = {
    items: [
      {
        product_uuid: product.uuid,
        product_name: product.name,
        quantity: qty,
        price: product.price,
        total: product.price * qty
      }
    ],
    total_amount: product.price * qty,
  }

  if (customerUuid) {
    payload.customer_uuid = customerUuid
  }

  try {
    await orderService.create(payload)
    saveLocalOrder(payload)
    showFeedback(`Order placed successfully for ${product.name}! Check the Orders page for history.`)
  } catch (err: any) {
    console.error('Buy now failed:', err)
    showFeedback('Unable to place order. Please try again.')
  }
}
</script>
