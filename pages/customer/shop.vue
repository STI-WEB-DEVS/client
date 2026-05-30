<template>
  <div class="space-y-10">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Our Products</h2>
      <NuxtLink
        to="/customer/cart"
        class="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
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
      <p class="font-medium text-red-700">{{ error.message }}</p>
      <button
        @click="fetchProducts"
        class="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
      >
        Try again
      </button>
    </div>

    <!-- Empty -->
    <div
      v-else-if="!productsList.length"
      class="flex flex-col items-center justify-center py-24 text-center"
    >
      <ShoppingBagIcon class="h-12 w-12 text-gray-300" />
      <p class="mt-4 text-sm text-gray-500">No products available yet.</p>
    </div>

    <!-- Product Grid -->
    <div
      v-else
      class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        v-for="product in productsList"
        :key="product.uuid"
        class="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
        :class="{ 'opacity-60': product.stock === 0 }"
      >
        <!-- Stock badge -->
        <div class="flex items-center justify-between">
          <span
            class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
            :class="stockBadgeClass(product.stock)"
          >
            {{ stockLabel(product.stock) }}
          </span>
        </div>

        <!-- Info -->
        <div class="mt-3 flex flex-1 flex-col">
          <h3 class="text-sm font-semibold text-gray-900">{{ product.name }}</h3>

          <p
            v-if="product.description"
            class="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500"
          >
            {{ product.description }}
          </p>

          <p class="mt-3 text-xl font-bold text-indigo-600">
            ₱{{ Number(product.price).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
          </p>
        </div>

        <!-- Quantity control -->
        <div class="mt-4">
          <label class="mb-1.5 block text-xs font-medium text-gray-500">Quantity</label>
          <div class="flex items-center gap-2">
            <div
              class="flex items-center rounded-lg border"
              :class="product.stock === 0 ? 'border-gray-100 opacity-40' : 'border-gray-200'"
            >
              <button
                type="button"
                @click="decrementQty(product.uuid)"
                :disabled="product.stock === 0 || quantities[product.uuid] <= 1"
                class="flex h-8 w-8 items-center justify-center rounded-l-lg text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <MinusIcon class="h-3.5 w-3.5" />
              </button>

              <span class="w-10 select-none text-center text-sm font-medium text-gray-900">
                {{ quantities[product.uuid] ?? 1 }}
              </span>

              <button
                type="button"
                @click="incrementQty(product)"
                :disabled="product.stock === 0 || quantities[product.uuid] >= product.stock"
                class="flex h-8 w-8 items-center justify-center rounded-r-lg text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <PlusIcon class="h-3.5 w-3.5" />
              </button>
            </div>

            <span
              v-if="product.stock > 0 && quantities[product.uuid] >= product.stock"
              class="text-xs font-medium text-amber-600"
            >
              Max reached
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-5 flex flex-col gap-2">
          <button
            type="button"
            @click="handleBuyNow(product)"
            :disabled="product.stock === 0 || orderingUuid === product.uuid"
            class="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
          >
            <span
              v-if="orderingUuid === product.uuid"
              class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
            />
            <BoltIcon v-else class="h-4 w-4" />
            {{ orderingUuid === product.uuid ? 'Placing order...' : 'Buy Now' }}
          </button>

          <button
            type="button"
            @click="handleAddToCart(product)"
            :disabled="product.stock === 0"
            class="flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-600 px-4 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:border-indigo-200 disabled:text-indigo-300"
          >
            <ShoppingCartIcon class="h-4 w-4" />
            Add to Cart
          </button>
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
import {
  ShoppingCartIcon,
  ShoppingBagIcon,
  PlusIcon,
  MinusIcon,
  BoltIcon,
} from '@heroicons/vue/24/outline'
import { productService } from '~/api/product/ProductService'
import { orderService } from '~/api/order/OrderService'
import { useCart } from '~/composables/useCart'
import FeedbackModal from '~/components/FeedbackModal.vue'

definePageMeta({ layout: 'customer' })

const { addToCart, cartCount, saveLocalOrder } = useCart()

// ─── State ────────────────────────────────────────────────────────────────────
const productsList = ref<any[]>([])
const pending      = ref(true)
const error        = ref<any>(null)
const quantities   = ref<Record<string, number>>({})
const orderingUuid = ref<string | null>(null) // tracks which product is being ordered

const isModalOpen  = ref(false)
const modalMessage = ref('')

// ─── Helpers ─────────────────────────────────────────────────────────────────
const showFeedback = (message: string) => {
  modalMessage.value = message
  isModalOpen.value  = true
}

const stockLabel = (stock: number) => {
  if (stock === 0) return 'Out of stock'
  if (stock <= 5)  return `Only ${stock} left`
  return `${stock} in stock`
}

const stockBadgeClass = (stock: number) => {
  if (stock === 0) return 'bg-red-100 text-red-700'
  if (stock <= 5)  return 'bg-amber-100 text-amber-700'
  return 'bg-green-100 text-green-700'
}

// ─── Data fetching ────────────────────────────────────────────────────────────
const fetchProducts = async () => {
  pending.value = true
  error.value   = null
  try {
    const response     = await productService.list()
    productsList.value = response.data ?? response
    productsList.value.forEach((p) => {
      quantities.value[p.uuid] = 1
    })
  } catch (err: any) {
    error.value = err
  } finally {
    pending.value = false
  }
}

onMounted(fetchProducts)

// ─── Quantity controls ────────────────────────────────────────────────────────
const incrementQty = (product: any) => {
  const current = quantities.value[product.uuid] ?? 1
  if (current < product.stock) {
    quantities.value[product.uuid] = current + 1
  }
}

const decrementQty = (uuid: string) => {
  const current = quantities.value[uuid] ?? 1
  if (current > 1) {
    quantities.value[uuid] = current - 1
  }
}

// ─── Actions ──────────────────────────────────────────────────────────────────
const handleAddToCart = (product: any) => {
  if (product.stock === 0) return
  const qty = Math.min(quantities.value[product.uuid] ?? 1, product.stock)
  addToCart(product, qty)
  showFeedback(`Added ${qty}× ${product.name} to your cart.`)
}

const handleBuyNow = async (product: any) => {
  if (product.stock === 0 || orderingUuid.value === product.uuid) return

  const userUuid = typeof window !== 'undefined'
    ? localStorage.getItem('_user_uuid')
    : null

  if (!userUuid) {
    showFeedback('Please sign in before placing an order.')
    return
  }

  const qty          = Math.min(quantities.value[product.uuid] ?? 1, product.stock)
  const customerUuid = typeof window !== 'undefined'
    ? localStorage.getItem('_customer_uuid')
    : null

  // Only send what OrderStoreRequest validates:
  // customer_uuid, items.*.product_uuid, items.*.quantity
  const payload: any = {
    items: [
      {
        product_uuid: product.uuid,
        quantity:     qty,
      },
    ],
  }

  if (customerUuid) payload.customer_uuid = customerUuid

  orderingUuid.value = product.uuid

  try {
    await orderService.create(payload)
    saveLocalOrder(payload)

    // Deduct stock locally so the UI updates immediately
    const found = productsList.value.find(p => p.uuid === product.uuid)
    if (found) {
      found.stock = Math.max(0, found.stock - qty)
      // Reset quantity selector back to 1 (or max remaining stock)
      quantities.value[product.uuid] = found.stock > 0 ? 1 : 0
    }

    showFeedback(`Order placed for ${qty}× ${product.name}! Check the Orders page for history.`)
  } catch (err: any) {
    // Show the actual error from the server (e.g. "Insufficient stock for...")
    showFeedback(err?.message || 'Unable to place order. Please try again.')
  } finally {
    orderingUuid.value = null
  }
}
</script>