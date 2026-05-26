<script setup lang="ts">
definePageMeta({
  layout: 'customer'
})

import { ref, onMounted, computed } from 'vue'
import { productService } from '~/api/product/ProductService'
import { orderService } from '~/api/order/OrderService'
import { customerService } from '~/api/customer/CustomerService'

/* =========================
   STATE
========================= */
const showProductsModal = ref(false)
const loadingProducts = ref(false)
const loadingOrder = ref(false)

const products = ref<any[]>([])
const customer = ref<any>(null)

const cart = ref<Record<string, { product: any; quantity: number }>>({})

/* =========================
   TOAST (NO ALERT REPLACEMENT)
========================= */
const toast = ref<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  toast.value = { message, type }

  setTimeout(() => {
    toast.value = null
  }, 3000)
}

/* =========================
   CUSTOMER
========================= */
const fetchCustomer = async () => {
  try {
    const response = await customerService.list()

    console.log('CUSTOMERS RESPONSE:', response)

    const data = response?.data ?? response

    const currentUser = Array.isArray(data) ? data[0] : data

    const uuid = currentUser?.uuid

    if (!uuid) {
      throw new Error('No customer UUID found')
    }

    customer.value = {
      ...currentUser,
      uuid
    }

  } catch (error) {
    console.error('FETCH CUSTOMER ERROR:', error)
    customer.value = null
  }
}

onMounted(fetchCustomer)

const customerReady = computed(() => !!customer.value?.uuid)

/* =========================
   PRODUCTS
========================= */
const openShop = async () => {
  showProductsModal.value = true
  await fetchProducts()
}

const fetchProducts = async () => {
  loadingProducts.value = true

  try {
    const response = await productService.list({ per_page: 100 })

    products.value = Array.isArray(response)
      ? response
      : response?.data || []

  } catch (err) {
    console.error(err)
    showToast('Failed to load products', 'error')

  } finally {
    loadingProducts.value = false
  }
}

/* =========================
   CART
========================= */
const updateCart = (product: any, quantity: number) => {
  if (quantity <= 0) {
    delete cart.value[product.uuid]
    return
  }

  cart.value[product.uuid] = {
    product,
    quantity
  }
}

/* =========================
   PLACE ORDER
========================= */
const placeOrder = async () => {
  if (!customer.value?.uuid) {
    showToast('Customer not loaded. Please refresh or login again.', 'error')
    return
  }

  const items = Object.values(cart.value)

  if (items.length === 0) {
    showToast('Cart is empty', 'info')
    return
  }

  loadingOrder.value = true

  try {
    await orderService.create({
      customer_uuid: customer.value.uuid,
      items: items.map(item => ({
        product_uuid: item.product.uuid,
        quantity: item.quantity
      }))
    })

    showToast('Order placed successfully!', 'success')

    cart.value = {}
    showProductsModal.value = false

  } catch (error: any) {
    console.error(error)
    showToast(error?.message || 'Failed to place order', 'error')

  } finally {
    loadingOrder.value = false
  }
}

/* =========================
   TOTAL
========================= */
const getTotal = () => {
  return Object.values(cart.value).reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  )
}
</script>
<template>
  <div class="bg-gray-50 min-h-screen">

    <!-- HERO -->
    <section class="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
      <div class="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-10 items-center">

        <div>
          <p class="text-sm uppercase tracking-widest text-indigo-100">
            Welcome to your shop
          </p>

          <h1 class="mt-3 text-4xl font-bold leading-tight">
            Discover products made for your everyday needs
          </h1>

          <p class="mt-4 text-indigo-100">
            Browse, add to cart, and place your order instantly.
          </p>

          <div class="mt-8 flex gap-3">
            <button
              @click="openShop"
              class="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Shop Now
            </button>

            <button class="border border-white px-6 py-3 rounded-lg hover:bg-white/10">
              View Deals
            </button>
          </div>
        </div>

        <div class="hidden lg:block">
          <div class="rounded-2xl bg-white/10 backdrop-blur p-10">
            <div class="aspect-[4/3] rounded-xl bg-white/20"></div>
          </div>
        </div>

      </div>
    </section>
<!-- PRODUCTS MODAL -->
<div
  v-if="showProductsModal"
  class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
>
  <div class="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">

    <!-- HEADER -->
    <div class="flex items-center justify-between px-6 py-4 border-b bg-white">
      <h2 class="text-lg font-bold text-gray-900">Available Products</h2>

      <button
        @click="showProductsModal = false"
        class="text-gray-500 hover:text-black text-xl"
      >
        ✕
      </button>
    </div>

    <!-- BODY -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">

      <!-- PRODUCT GRID (LEFT 2 COLS) -->
      <div class="lg:col-span-2">

        <div v-if="loadingProducts" class="text-gray-500 text-sm">
          Loading products...
        </div>

        <div class="grid sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">

          <div
            v-for="product in products"
            :key="product.uuid"
            class="border rounded-xl p-4 bg-white hover:shadow-md transition"
          >

            <!-- PRODUCT INFO -->
            <div class="flex justify-between items-start">
              <div>
                <p class="font-semibold text-gray-900">
                  {{ product.name }}
                </p>
                <p class="text-sm text-gray-500">
                  ₱ {{ product.price }}
                </p>
              </div>
            </div>

            <!-- ACTION -->
            <div class="mt-4 flex items-center justify-between">

              <!-- STEP BUTTONS -->
              <div class="flex items-center gap-2">

                <button
                  class="w-8 h-8 border rounded-lg"
                  @click="updateCart(product, (cart[product.uuid]?.quantity || 0) - 1)"
                >
                  -
                </button>

                <span class="w-8 text-center text-sm">
                  {{ cart[product.uuid]?.quantity || 0 }}
                </span>

                <button
                  class="w-8 h-8 border rounded-lg"
                  @click="updateCart(product, (cart[product.uuid]?.quantity || 0) + 1)"
                >
                  +
                </button>

              </div>

              <span class="text-xs text-gray-400">
                in cart
              </span>

            </div>

          </div>

        </div>

      </div>

      <!-- CART SIDEBAR (RIGHT) -->
      <div class="border rounded-xl bg-gray-50 p-5">

        <h3 class="font-semibold text-gray-800">Your Cart</h3>

        <div v-if="Object.keys(cart).length" class="mt-4 space-y-3">

          <div
            v-for="item in Object.values(cart)"
            :key="item.product.uuid"
            class="text-sm border-b pb-2"
          >
            <p class="font-medium">{{ item.product.name }}</p>
            <p class="text-gray-600">
              {{ item.quantity }} × ₱ {{ item.product.price }}
            </p>
            <p class="font-semibold">
              ₱ {{ item.quantity * item.product.price }}
            </p>
          </div>

          <div class="pt-3 font-bold text-lg">
            Total: ₱ {{ getTotal() }}
          </div>

        </div>

        <div v-else class="text-sm text-gray-500 mt-4">
          No items in cart
        </div>

      </div>

    </div>

    <!-- FOOTER ACTIONS -->
    <div class="flex justify-end gap-3 border-t px-6 py-4 bg-white">

      <button
        @click="showProductsModal = false"
        class="px-4 py-2 border rounded-lg"
      >
        Close
      </button>

      <button
        @click="placeOrder"
        :disabled="loadingOrder"
        class="px-5 py-2 rounded-lg bg-green-600 text-white disabled:opacity-50"
      >
        {{ loadingOrder ? 'Placing...' : 'Place Order' }}
      </button>

    </div>

  </div>
</div>

  </div><!-- CENTER TOAST -->
<div
  v-if="toast"
  class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
>
  <div
    class="px-6 py-4 rounded-xl shadow-xl text-white text-center min-w-[280px]"
    :class="{
      'bg-green-600': toast.type === 'success',
      'bg-red-600': toast.type === 'error',
      'bg-blue-600': toast.type === 'info'
    }"
  >
    <p class="text-lg font-semibold">
      {{ toast.message }}
    </p>
  </div>
</div>
</template>