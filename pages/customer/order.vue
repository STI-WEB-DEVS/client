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

const openShop = async () => {
  showProductsModal.value = true
  await fetchProducts()
}
const fetchProducts = async () => {
  loadingProducts.value = true

  try {
    const response = await productService.list({
      per_page: 100
    })

    console.log('PRODUCT RESPONSE:', response)

    const data = response?.data ?? response

    if (Array.isArray(data)) {
      products.value = data
    }
    else if (Array.isArray(data?.items)) {
      products.value = data.items
    }
    else if (Array.isArray(data?.products)) {
      products.value = data.products
    }
    else {
      products.value = []
    }

    console.log(
      'PRODUCTS LOADED:',
      products.value
    )

  } catch (err) {
    console.error(
      'PRODUCT FETCH ERROR:',
      err
    )

    showNotification(
      'error',
      'Failed to load products'
    )

  } finally {
    loadingProducts.value = false
  }
}

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
  total_amount: getTotal(), // ✅ ADD THIS TEMP FIX
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
const getTotal = () => {
  return Object.values(cart.value).reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  )
}
</script>

<template>
  <div>

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

            <!-- ONLY THIS PART CHANGED -->
            <div class="mt-8 flex gap-4 items-center">

              <button
                @click="openShop"
                class="relative overflow-hidden bg-indigo-600 text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg transition duration-300 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
              >
                <span class="relative z-10">Shop Now</span>

                <span class="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-600 opacity-0 hover:opacity-30 transition"></span>
              </button>

              <button class="border px-6 py-3.5 rounded-xl text-gray-700 hover:bg-gray-100">
                Explore Deals
              </button>

            </div>
            <!-- END ONLY CHANGE -->

          </div>

          <!-- VISUAL -->
          <div class="bg-white rounded-2xl shadow p-6">
            <div class="aspect-video rounded-xl bg-gradient-to-br from-gray-200 to-gray-300"></div>
          </div>

        </div>

      </div>
    </section>
<div
  v-if="showProductsModal"
  class="fixed inset-0 z-50 bg-black/60 flex justify-end"
>

  <div class="w-full max-w-6xl bg-white h-full flex flex-col shadow-2xl">

    <!-- HEADER -->
    <div class="flex items-center justify-between border-b px-8 py-5 bg-white">
      <div>
        <h2 class="text-2xl font-extrabold text-gray-900">
          Shop Products
        </h2>
        <p class="text-xs text-gray-400">
          Select items and manage your cart
        </p>
      </div>

      <button
        @click="showProductsModal = false"
        class="h-10 w-10 rounded-full hover:bg-gray-100 text-xl"
      >
        ✕
      </button>
    </div>

    <!-- CONTENT -->
    <div class="flex flex-1 overflow-hidden">

      <!-- PRODUCTS -->
      <div class="w-2/3 p-8 overflow-y-auto bg-gray-50">

        <div v-if="loadingProducts" class="text-center text-gray-500 py-10">
          Loading products...
        </div>

        <div
          v-if="!loadingProducts && products.length === 0"
          class="text-center py-10 text-gray-500"
        >
          No products found
        </div>

        <div class="grid sm:grid-cols-2 gap-5">

          <div
            v-for="product in products"
            :key="product.uuid"
            class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >

            <div class="flex justify-between items-start">

              <div>
                <p class="font-bold text-gray-900 text-lg">
                  {{ product.name }}
                </p>

                <p class="text-indigo-600 font-extrabold mt-1">
                  ₱ {{ product.price }}
                </p>
              </div>

              <div class="text-xs text-gray-400">
                Stock
              </div>

            </div>

            <div class="mt-5 flex items-center justify-between">

              <input
                type="number"
                min="0"
                class="w-24 border rounded-xl px-3 py-2 text-center"
                :value="cart[product.uuid]?.quantity || 0"
                @input="updateCart(product, Number(($event.target as HTMLInputElement).value))"
              />

              <span class="text-xs text-gray-400 font-medium">
                Qty
              </span>

            </div>

          </div>

        </div>

      </div>

      <!-- CART SIDEBAR -->
      <div class="w-1/3 border-l bg-white p-8 flex flex-col">

        <h3 class="text-xl font-extrabold text-gray-900">
          Your Cart
        </h3>

        <p class="text-xs text-gray-400 mb-5">
          Order summary
        </p>

        <div class="flex-1 overflow-y-auto space-y-3">

          <div
            v-if="Object.keys(cart).length === 0"
            class="text-gray-400 text-sm text-center py-10"
          >
            Your cart is empty
          </div>

          <div
            v-for="item in Object.values(cart)"
            :key="item.product.uuid"
            class="border rounded-xl p-4 bg-gray-50"
          >

            <p class="font-semibold text-gray-900">
              {{ item.product.name }}
            </p>

            <p class="text-sm text-gray-500">
              {{ item.quantity }} × ₱ {{ item.product.price }}
            </p>

            <p class="font-extrabold text-indigo-600 mt-2">
              ₱ {{ item.quantity * item.product.price }}
            </p>

          </div>

        </div>

        <!-- TOTAL -->
        <div class="border-t pt-5 mt-5">

          <div class="flex justify-between mb-4">

            <span class="font-semibold text-gray-700">
              Total
            </span>

            <span class="text-xl font-extrabold text-indigo-600">
              ₱ {{ getTotal() }}
            </span>

          </div>

          <button
            :disabled="loadingOrder"
            @click="placeOrder"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold disabled:opacity-50"
          >
            {{ loadingOrder ? 'Placing Order...' : 'Place Order' }}
          </button>

          <button
            @click="showProductsModal = false"
            class="w-full mt-3 border py-3 rounded-xl hover:bg-gray-50"
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