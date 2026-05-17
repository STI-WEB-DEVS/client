<template>
  <div class="space-y-10">
    <div class="flex flex-col gap-4 rounded-[1.75rem] border border-stone-200 bg-white/90 p-6 shadow-sm shadow-stone-950/5 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Catalog</p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-stone-950">Our Products</h2>
      </div>
      <NuxtLink to="/customer/cart" class="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-stone-950/10 transition duration-200 hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-xl">
        View Cart ({{ cartCount }})
        <ShoppingCartIcon class="h-5 w-5" />
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="flex justify-center py-20">
      <div class="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-amber-600"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-center shadow-sm shadow-rose-950/5">
      <p class="font-semibold text-rose-700">{{ error.message }}</p>
      <button @click="fetchProducts" class="mt-4 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-rose-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        Try again
      </button>
    </div>

    <!-- Product Grid -->
    <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div v-for="product in productsList" :key="product.uuid" class="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm shadow-stone-950/5 transition duration-300 ease-out hover:-translate-y-1 hover:border-amber-200 hover:shadow-2xl hover:shadow-stone-950/10">
        <div class="aspect-square w-full overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-stone-100 via-white to-amber-100 transition duration-300 group-hover:scale-[1.02]">
          <div class="flex h-full items-center justify-center">
            <div class="h-20 w-20 rounded-3xl bg-white/70 shadow-inner shadow-stone-950/5 ring-1 ring-stone-200/80"></div>
          </div>
        </div>
        <div class="mt-5 flex flex-1 flex-col">
          <h3 class="text-base font-bold tracking-tight text-stone-950">{{ product.name }}</h3>
          <p class="mt-2 text-xl font-bold text-stone-950">PHP {{ product.price.toLocaleString() }}</p>

          <div class="mt-5 flex items-center justify-between gap-3">
            <div class="flex items-center rounded-full border border-stone-200 bg-stone-50 shadow-inner shadow-stone-950/5">
              <button
                @click="decrementQty(product.uuid)"
                class="flex h-10 w-10 items-center justify-center rounded-l-full text-stone-600 transition hover:bg-white hover:text-stone-950"
              >
                <MinusIcon class="h-4 w-4" />
              </button>
              <input
                type="number"
                v-model.number="quantities[product.uuid]"
                class="w-12 border-none bg-transparent px-0 text-center text-sm font-semibold text-stone-950 focus:ring-0 [-webkit-appearance:none] [-moz-appearance:textfield]"
                min="1"
              />
              <button
                @click="incrementQty(product.uuid)"
                class="flex h-10 w-10 items-center justify-center rounded-r-full text-stone-600 transition hover:bg-white hover:text-stone-950"
              >
                <PlusIcon class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div class="mt-6 flex flex-col gap-3">
            <button
              @click="handleBuyNow(product)"
              class="flex w-full items-center justify-center rounded-full bg-stone-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-stone-950/10 transition duration-200 hover:-translate-y-0.5 hover:bg-stone-800"
            >
              Buy Now
            </button>
            <button
              @click="handleAddToCart(product)"
              class="flex w-full items-center justify-center rounded-full border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-50/60 hover:text-stone-950"
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
