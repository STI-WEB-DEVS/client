<template>
  <NuxtLayout>
    <div class="min-h-screen bg-[#0d0608] p-6">

      <!-- HEADER -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-white" style="font-family: Georgia, serif;">
            Fresh Drops
          </h1>
          <p class="mt-2 text-sm text-red-100/60">
            Quality pieces for everyday wear. Shop Now!
          </p>
        </div>

        <button
          class="relative flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
          style="background: linear-gradient(135deg,#c0392b,#e74c3c); box-shadow: 0 8px 20px rgba(192,57,43,.35);"
          @click="openCart"
        >
          🛒 Cart
          <span
            v-if="cartCount > 0"
            class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-red-700"
          >
            {{ cartCount }}
          </span>
        </button>
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-32">
        <div class="h-12 w-12 animate-spin rounded-full border-4 border-red-900 border-t-red-500" />
        <p class="mt-4 text-red-100/60">Loading products...</p>
      </div>

      <!-- PRODUCTS -->
      <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="product in products"
          :key="product.uuid"
          class="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-red-500/30"
        >
          <div class="mb-5 flex items-center justify-between">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 text-3xl">
              🩸
            </div>
            <span class="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
              Available
            </span>
          </div>

          <h3 class="text-lg font-bold text-white">{{ product.name }}</h3>
          <p class="mt-2 text-2xl font-bold text-red-400">
            ₱{{ Number(product.price).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
          </p>

          <div class="my-5 flex items-center justify-center gap-4 rounded-full border border-white/10 bg-black/20 py-2">
            <button class="text-xl font-bold text-red-400" @click="decreaseQty(product)">−</button>
            <span class="min-w-[25px] text-center font-bold text-white">{{ getQty(product.uuid) }}</span>
            <button class="text-xl font-bold text-red-400" @click="increaseQty(product)">+</button>
          </div>

          <button
            class="w-full rounded-xl py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style="background: linear-gradient(135deg,#c0392b,#e74c3c);"
            @click="addToCart(product)"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <!-- CART MODAL -->
      <Teleport to="body">
        <div
          v-if="showCart"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        >
          <!-- BACKDROP (separate from modal box) -->
          <div class="absolute inset-0" @click="showCart = false" />

          <!-- MODAL BOX -->
          <div class="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-[#14090c] p-8 text-white shadow-2xl">

            <!-- SUCCESS STATE -->
            <div v-if="checkoutSuccess" class="py-10 text-center">
              <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" style="background:linear-gradient(135deg,#16a34a,#22c55e);">
                <span class="text-3xl">✓</span>
              </div>
              <h2 class="text-2xl font-bold text-white">Order Placed!</h2>
              <p class="mt-2 text-sm text-gray-400">Your order has been successfully placed.</p>
              <button
                class="mt-6 w-full rounded-xl py-3 font-semibold text-white"
                style="background: linear-gradient(135deg,#c0392b,#e74c3c);"
                @click="closeAfterCheckout"
              >
                Continue Shopping
              </button>
            </div>

            <!-- CART STATE -->
            <div v-else>
              <div class="mb-6 flex items-center justify-between">
                <h2 class="text-2xl font-bold">Shopping Cart</h2>
                <button class="rounded-full bg-white/10 px-3 py-2 hover:bg-white/20" @click="showCart = false">✕</button>
              </div>

              <!-- EMPTY CART -->
              <div v-if="cart.length === 0" class="py-16 text-center">
                <div class="mb-4 text-6xl">🛒</div>
                <p class="text-red-100/50">Your cart is empty</p>
              </div>

              <!-- CART ITEMS -->
              <div v-else>
                <div
                  v-for="(item, index) in cart"
                  :key="index"
                  class="mb-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-semibold">{{ item.name }}</p>
                      <p class="text-sm text-red-100/50">x{{ item.quantity }}</p>
                    </div>
                    <div class="flex items-center gap-3">
                      <p class="font-bold text-red-400">
                        ₱{{ (Number(item.price) * item.quantity).toLocaleString() }}
                      </p>
                      <button
                        class="text-gray-500 hover:text-red-400 text-lg"
                        @click="removeFromCart(index)"
                      >✕</button>
                    </div>
                  </div>
                </div>

                <!-- TOTAL -->
                <div class="mt-5 rounded-2xl border border-white/10 bg-black/30 p-5">
                  <div class="flex justify-between">
                    <span>Total</span>
                    <span class="text-2xl font-bold text-red-400">
                      ₱{{ totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
                    </span>
                  </div>
                </div>

                <!-- ERROR -->
                <p v-if="checkoutError" class="mt-3 text-center text-sm text-red-400">
                  {{ checkoutError }}
                </p>

                <!-- CHECKOUT BUTTON -->
                <button
                  class="mt-5 w-full rounded-xl py-3 font-semibold text-white disabled:opacity-50"
                  style="background: linear-gradient(135deg,#c0392b,#e74c3c); box-shadow: 0 4px 14px rgba(192,57,43,0.35);"
                  :disabled="checkingOut"
                  @click.stop="handleCheckout"
                >
                  {{ checkingOut ? 'Placing Order...' : 'Proceed to Checkout' }}
                </button>
              </div>
            </div>

          </div>
        </div>
      </Teleport>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const products = ref<any[]>([])
const cart = ref<any[]>([])
const lastOrder = ref<any[]>([])
const lastTotal = ref(0)
const quantities = ref<Record<string, number>>({})
const loading = ref(true)
const showCart = ref(false)
const checkingOut = ref(false)
const checkoutError = ref('')
const checkoutSuccess = ref(false)
const customerUuid = ref('')

const runtimeConfig = useRuntimeConfig()
const token = localStorage.getItem('_token')

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
}

const cartCount = computed(() =>
  cart.value.reduce((sum, item) => sum + item.quantity, 0)
)

const totalAmount = computed(() =>
  cart.value.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
)

const getQty = (uuid: string) => quantities.value[uuid] || 1

const increaseQty = (product: any) => {
  quantities.value[product.uuid] = getQty(product.uuid) + 1
}

const decreaseQty = (product: any) => {
  if (getQty(product.uuid) > 1) {
    quantities.value[product.uuid] = getQty(product.uuid) - 1
  }
}

const addToCart = (product: any) => {
  const qty = getQty(product.uuid)
  const existing = cart.value.find((i) => i.uuid === product.uuid)
  if (existing) {
    existing.quantity += qty
  } else {
    cart.value.push({ ...product, quantity: qty })
  }
  quantities.value[product.uuid] = 1
}

const removeFromCart = (index: number) => {
  cart.value.splice(index, 1)
}

const openCart = () => {
  checkoutSuccess.value = false
  showCart.value = true
}

const closeAfterCheckout = () => {
  checkoutSuccess.value = false
  showCart.value = false
}

const fetchCustomer = async () => {
  try {
    const data = await $fetch<any>('customer', {
      baseURL: runtimeConfig.public.apiBaseURL,
      headers,
    })
    const email = localStorage.getItem('_email')
    const customer = (data.data || data).find((c: any) => c.email === email)
    if (customer) {
      customerUuid.value = customer.uuid
      localStorage.setItem('_uuid', customer.uuid)
    } else {
      checkoutError.value = 'No customer record found. Please contact admin.'
    }
  } catch (e) {
    console.error('fetchCustomer failed:', e)
  }
}

const fetchProducts = async () => {
  try {
    const data = await $fetch<any>('products', {
      baseURL: runtimeConfig.public.apiBaseURL,
      headers,
    })
    products.value = data.data || data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const handleCheckout = async () => {
  if (!customerUuid.value) {
    checkoutError.value = 'No customer record found. Please contact admin.'
    return
  }

  checkingOut.value = true
  checkoutError.value = ''

  try {
    await $fetch('orders', {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: 'POST',
      headers,
      body: {
        customer_uuid: customerUuid.value,
        items: cart.value.map((item: any) => ({
          product_uuid: item.uuid,
          quantity: item.quantity,
        })),
      },
    })

    lastOrder.value = [...cart.value]
    lastTotal.value = totalAmount.value
    cart.value = []
    checkoutSuccess.value = true
  } catch (e: any) {
    checkoutError.value = e?.message || 'Checkout failed. Please try again.'
  } finally {
    checkingOut.value = false
  }
}

onMounted(() => {
  fetchProducts()
  fetchCustomer()
})
</script>