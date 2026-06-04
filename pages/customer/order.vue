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

const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

const showToast = (message, type = 'success') => {
  toast.value = {
    show: true,
    message,
    type
  }

  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}
const placeOrder = async () => {
  if (!customer.value?.uuid) {
    console.error('Customer not loaded:', customer.value)
    showToast('Customer not loaded. Please refresh or login again.', 'error')
    return
  }

  const items = Object.values(cart.value)

  if (items.length === 0) {
    showToast('Cart is empty', 'error')
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

  } catch (error) {
    console.error(error)
    showToast(error?.message || 'Failed to place order', 'error')

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
  v-if="toast.show"
  class="fixed bottom-5 right-5 px-4 py-3 rounded-lg text-white shadow-lg"
  :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
>
  {{ toast.message }}
</div>
    <!-- HERO -->
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
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div class="w-full max-w-4xl rounded-2xl bg-white shadow-xl">

        <div class="flex items-center justify-between border-b p-5">
          <h2 class="text-lg font-bold">Shop Products</h2>

          <button @click="showProductsModal = false">
            ✕
          </button>
        </div>

        <!-- BODY --><div class="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">

  <!-- PRODUCTS -->
  <div class="lg:col-span-2">
    <div class="rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div class="border-b p-5">
        <h3 class="text-lg font-semibold text-gray-800">
          Products
        </h3>
        <p class="text-sm text-gray-500">
          Select products and set quantities
        </p>
      </div>

      <div class="max-h-[500px] space-y-3 overflow-y-auto p-5">

        <div
          v-if="loadingProducts"
          class="flex justify-center py-10 text-gray-500"
        >
          Loading products...
        </div>

        <div
          v-for="product in products"
          :key="product.uuid"
          class="group flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:border-[#2E4DA7] hover:bg-white hover:shadow-md"
        >
          <div>
            <h4 class="font-semibold text-gray-800">
              {{ product.name }}
            </h4>

            <p class="mt-1 text-sm font-medium text-[#2E4DA7]">
              ₱ {{ product.price }}
            </p>
          </div>

          <div class="flex items-center gap-2">

            <button
              class="flex h-9 w-9 items-center justify-center rounded-lg border bg-white hover:bg-gray-100"
              @click="updateCart(product, Math.max((cart[product.uuid]?.quantity || 0) - 1, 0))"
            >
              −
            </button>

            <input
              type="number"
              min="0"
              class="h-9 w-16 rounded-lg border text-center focus:border-[#2E4DA7] focus:outline-none"
              :value="cart[product.uuid]?.quantity || 0"
              @input="updateCart(product, Number(($event.target as HTMLInputElement).value))"
            />

            <button
              class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2E4DA7] text-white hover:opacity-90"
              @click="updateCart(product, (cart[product.uuid]?.quantity || 0) + 1)"
            >
              +
            </button>

          </div>
        </div>

      </div>

    </div>
  </div>

  <!-- CART SUMMARY -->
  <div>
    <div class="sticky top-4 rounded-2xl bg-[#2E4DA7] p-5 text-white shadow-lg">

      <h3 class="text-lg font-semibold">
        Cart Summary
      </h3>

      <p class="mt-1 text-sm text-blue-100">
        Selected items
      </p>

      <div
        v-if="Object.keys(cart).length"
        class="mt-5 space-y-4"
      >
        <div
          v-for="item in Object.values(cart)"
          :key="item.product.uuid"
          class="rounded-xl bg-white/10 p-3"
        >
          <div class="flex justify-between">
            <span class="font-medium">
              {{ item.product.name }}
            </span>

            <span>
              x{{ item.quantity }}
            </span>
          </div>

          <div class="mt-1 text-sm text-blue-100">
            ₱ {{ item.product.price }}
          </div>

          <div class="mt-2 text-right font-semibold">
            ₱ {{ item.quantity * item.product.price }}
          </div>
        </div>

        <div class="border-t border-white/20 pt-4">
          <div class="flex items-center justify-between text-lg font-bold">
            <span>Total</span>
            <span>₱ {{ getTotal() }}</span>
          </div>
        </div>
      </div>

      <div
        v-else
        class="mt-8 rounded-xl border border-dashed border-white/30 p-6 text-center text-blue-100"
      >
        No products added yet
      </div>

    </div>
  </div>

</div>

        <!-- ACTIONS -->
        <div class="flex justify-end gap-3 border-t p-5">

          <button
            @click="showProductsModal = false"
            class="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            :disabled="loadingOrder"
            @click="placeOrder"
            class="rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50"
          >
            {{ loadingOrder ? 'Placing...' : 'Place Order' }}
          </button>

        </div>

      </div>
    </div>

  </div>
</template>