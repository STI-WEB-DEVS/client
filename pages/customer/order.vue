<script setup lang="ts">
definePageMeta({
  layout: 'customer'
})

import { ref, onMounted, computed } from 'vue'
import { productService } from '~/api/product/ProductService'
import { orderService } from '~/api/order/OrderService'
import { customerService } from '~/api/customer/CustomerService'

const showProductsModal = ref(false)
const loadingProducts = ref(false)
const loadingOrder = ref(false)

const products = ref<any[]>([])
const customer = ref<any>(null)

const cart = ref<Record<string, { product: any; quantity: number }>>({})

/* =========================
   CUSTOM NOTIFICATION
========================= */
const notification = ref<{
  type: 'success' | 'error' | 'info'
  message: string
} | null>(null)

const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
  notification.value = { type, message }

  setTimeout(() => {
    notification.value = null
  }, 3000)
}

/* =========================
   CUSTOMER
========================= */
const fetchCustomer = async () => {
  try {
    const response = await customerService.list()

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
    showNotification('error', 'Failed to load customer')
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
    showNotification('error', 'Failed to load products')
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
   ORDER
========================= */
const placeOrder = async () => {
  if (!customer.value?.uuid) {
    showNotification('error', 'Customer not loaded. Please login again.')
    return
  }

  const items = Object.values(cart.value)

  if (items.length === 0) {
    showNotification('info', 'Cart is empty')
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

    cart.value = {}
    showProductsModal.value = false

    showNotification('success', 'Order placed successfully!')

  } catch (error: any) {
    console.error(error)
    showNotification('error', error?.message || 'Failed to place order')

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
  <div>
<!-- NOTIFICATION TOAST -->
<div
  v-if="notification"
  class="fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow text-white"
  :class="{
    'bg-green-600': notification.type === 'success',
    'bg-red-600': notification.type === 'error',
    'bg-blue-600': notification.type === 'info'
  }"
>
  {{ notification.message }}
</div>
    <!-- HERO (clean modern layout) -->
    <section class="bg-gradient-to-r from-indigo-50 to-white">
      <div class="mx-auto max-w-7xl px-6 py-16">
        
        <div class="grid gap-10 lg:grid-cols-2 items-center">

          <!-- TEXT -->
          <div>
            <p class="text-indigo-600 font-semibold uppercase tracking-wide text-sm">
              New arrivals
            </p>

            <h1 class="mt-4 text-4xl font-bold text-gray-900 leading-tight">
              Shop quality products for your everyday needs
            </h1>

            <p class="mt-4 text-gray-600">
              Discover items and place orders instantly in just a few clicks.
            </p>

            <div class="mt-8 flex gap-4">
              <button
                @click="openShop"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow"
              >
                Start Shopping
              </button>

              <button class="border px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                Explore Deals
              </button>
            </div>
          </div>

          <!-- VISUAL -->
          <div class="bg-white rounded-2xl shadow p-6">
            <div class="aspect-video rounded-xl bg-gradient-to-br from-gray-200 to-gray-300"></div>
          </div>

        </div>

      </div>
    </section>

    <!-- MODAL (now like a side checkout drawer style) -->
    <div
      v-if="showProductsModal"
      class="fixed inset-0 z-50 bg-black/60 flex justify-end"
    >

      <div class="w-full max-w-5xl bg-white h-full flex flex-col shadow-xl">

        <!-- HEADER -->
        <div class="flex items-center justify-between border-b px-6 py-4">
          <h2 class="text-xl font-bold">Shop Products</h2>

          <button
            @click="showProductsModal = false"
            class="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        <!-- CONTENT -->
        <div class="flex flex-1 overflow-hidden">

          <!-- PRODUCTS -->
          <div class="w-2/3 p-6 overflow-y-auto space-y-4 bg-gray-50">

            <div v-if="loadingProducts" class="text-center text-gray-500">
              Loading products...
            </div>

            <div
              v-for="product in products"
              :key="product.uuid"
              class="bg-white border rounded-xl p-4 flex justify-between items-center"
            >

              <div>
                <p class="font-semibold text-gray-900">{{ product.name }}</p>
                <p class="text-sm text-gray-500">₱ {{ product.price }}</p>
              </div>

              <div class="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  class="w-20 border rounded px-2 py-1 text-center"
                  :value="cart[product.uuid]?.quantity || 0"
                  @input="updateCart(product, Number(($event.target as HTMLInputElement).value))"
                />

                <span class="text-xs text-gray-400">qty</span>
              </div>

            </div>

          </div>

          <!-- CART SIDEBAR -->
          <div class="w-1/3 border-l p-6 flex flex-col">

            <h3 class="font-bold text-lg">Your Cart</h3>

            <div class="flex-1 overflow-y-auto mt-4 space-y-3">

              <div
                v-if="Object.keys(cart).length === 0"
                class="text-gray-500 text-sm"
              >
                No items yet
              </div>

              <div
                v-for="item in Object.values(cart)"
                :key="item.product.uuid"
                class="border rounded-lg p-3 text-sm bg-gray-50"
              >
                <p class="font-semibold">{{ item.product.name }}</p>
                <p>{{ item.quantity }} × ₱ {{ item.product.price }}</p>
                <p class="font-bold text-gray-800">
                  ₱ {{ item.quantity * item.product.price }}
                </p>
              </div>

            </div>

            <!-- TOTAL -->
            <div class="border-t pt-4 mt-4">
              <p class="font-bold text-lg">
                Total: ₱ {{ getTotal() }}
              </p>

              <button
                :disabled="loadingOrder"
                @click="placeOrder"
                class="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg disabled:opacity-50"
              >
                {{ loadingOrder ? 'Placing Order...' : 'Place Order' }}
              </button>

              <button
                @click="showProductsModal = false"
                class="mt-2 w-full border py-2 rounded-lg"
              >
                Close
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>

  </div>
</template>