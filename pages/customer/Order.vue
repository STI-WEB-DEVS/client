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
const fetchCustomer = async () => {
  try {
    const response = await customerService.list()

    console.log('CUSTOMERS RESPONSE:', response)

    const data =
      response?.data ?? response

    // ⚠️ ASSUMPTION: backend returns current user as first or filtered
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
    console.error('Customer not loaded:', customer.value)
    alert('Customer not loaded. Please refresh or login again.')
    return
  }

  const items = Object.values(cart.value)

  if (items.length === 0) {
    alert('Cart is empty')
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

    alert('Order placed successfully!')

    cart.value = {}
    showProductsModal.value = false

  } catch (error: any) {
    console.error(error)
    alert(error?.message || 'Failed to place order')

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

    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div class="grid items-center gap-10 lg:grid-cols-2">

          <div>
            <p class="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              New arrivals
            </p>

            <h1 class="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
              Shop quality products made for everyday use.
            </h1>

            <p class="mt-5 text-gray-600">
              Browse products and place your order instantly.
            </p>

            <div class="mt-8 flex gap-3">

              <button
                @click="openShop"
                class="rounded-md bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
              >
                Shop Now
              </button>

              <button class="rounded-md border px-5 py-3 text-gray-700">
                View Deals
              </button>

            </div>
          </div>

          <div class="rounded-2xl bg-gray-200 p-8">
            <div class="aspect-[4/3] rounded-xl bg-gray-300" />
          </div>

        </div>
      </div>
    </section>

<div
  v-if="showProductsModal"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
>
  <div class="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">

    <!-- HEADER -->
    <div class="flex items-center justify-between border-b bg-white px-6 py-5">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Shop Products</h2>
        <p class="text-sm text-gray-500">Select items and manage your cart</p>
      </div>

      <button
        @click="showProductsModal = false"
        class="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
      >
        ✕
      </button>
    </div>

    <!-- BODY -->
    <div class="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">

      <!-- PRODUCT LIST -->
      <div class="md:col-span-2">
        <div class="mb-3 flex items-center justify-between">
          <h3 class="text-sm font-semibold text-gray-700">Products</h3>
        </div>

        <div class="max-h-[460px] space-y-4 overflow-y-auto pr-2">

          <div v-if="loadingProducts" class="py-10 text-center text-gray-500">
            Loading products...
          </div>

          <div
            v-for="product in products"
            :key="product.uuid"
            class="group rounded-2xl border border-gray-100 bg-white p-4 transition hover:border-gray-200 hover:shadow-md"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-base font-semibold text-gray-900">
                  {{ product.name }}
                </p>
                <p class="text-sm text-gray-500">
                  ₱ {{ product.price }}
                </p>
              </div>

              <div class="text-xs text-gray-400">
                Stock item
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  class="w-24 rounded-xl border border-gray-200 px-3 py-2 text-center text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  :value="cart[product.uuid]?.quantity || 0"
                  @input="updateCart(product, Number(($event.target as HTMLInputElement).value))"
                />
              </div>

              <span class="text-xs text-gray-400">
                Set 0 to remove
              </span>
            </div>
          </div>

        </div>
      </div>

      <!-- SUMMARY -->
      <div class="rounded-2xl border border-gray-100 bg-gray-50 p-5">
        <div class="mb-4">
          <h3 class="text-sm font-semibold text-gray-800">Cart Summary</h3>
          <p class="text-xs text-gray-500">Review your selected items</p>
        </div>

        <div v-if="Object.keys(cart).length" class="space-y-3">

          <div
            v-for="item in Object.values(cart)"
            :key="item.product.uuid"
            class="rounded-xl border bg-white p-3 shadow-sm"
          >
            <p class="text-sm font-medium text-gray-800">
              {{ item.product.name }}
            </p>

            <p class="text-xs text-gray-500">
              {{ item.quantity }} × ₱ {{ item.product.price }}
            </p>

            <p class="mt-1 text-sm font-semibold text-gray-900">
              ₱ {{ item.quantity * item.product.price }}
            </p>
          </div>

          <div class="border-t pt-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Total</span>
              <span class="text-lg font-bold text-gray-900">
                ₱ {{ getTotal() }}
              </span>
            </div>
          </div>

        </div>

        <div v-else class="py-10 text-center text-sm text-gray-500">
          Your cart is empty
        </div>
      </div>

    </div>

    <!-- ACTIONS -->
    <div class="flex items-center justify-end gap-3 border-t bg-white px-6 py-5">

      <button
        @click="showProductsModal = false"
        class="rounded-xl border border-gray-200 px-5 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
      >
        Cancel
      </button>

      <button
        :disabled="loadingOrder"
        @click="placeOrder"
        class="rounded-xl bg-green-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
      >
        {{ loadingOrder ? 'Placing Order...' : 'Place Order' }}
      </button>

    </div>

  </div>
</div>
  </div>
</template>