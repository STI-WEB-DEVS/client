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

    <!-- PRODUCTS MODAL -->
    <div
      v-if="showProductsModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div class="w-full max-w-4xl rounded-2xl bg-white shadow-xl">

        <!-- HEADER -->
        <div class="flex items-center justify-between border-b p-5">
          <h2 class="text-lg font-bold">Shop Products</h2>

          <button @click="showProductsModal = false">
            ✕
          </button>
        </div>

        <!-- BODY -->
        <div class="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">

          <!-- PRODUCT LIST -->
          <div class="max-h-[420px] space-y-3 overflow-y-auto">

            <div v-if="loadingProducts" class="text-center text-gray-500">
              Loading...
            </div>

            <div
              v-for="product in products"
              :key="product.uuid"
              class="rounded-xl border p-4"
            >
              <p class="font-semibold">{{ product.name }}</p>
              <p class="text-sm text-gray-500">₱ {{ product.price }}</p>

              <div class="mt-3 flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  class="w-24 rounded border px-2 py-1 text-center"
                  :value="cart[product.uuid]?.quantity || 0"
                  @input="updateCart(product, Number(($event.target as HTMLInputElement).value))"
                />

                <span class="text-xs text-gray-400">
                  0 = remove
                </span>
              </div>
            </div>

          </div>

          <!-- SUMMARY -->
          <div class="rounded-xl border bg-gray-50 p-4">

            <h3 class="font-semibold">Cart Summary</h3>

            <div v-if="Object.keys(cart).length" class="mt-4 space-y-3">

              <div
                v-for="item in Object.values(cart)"
                :key="item.product.uuid"
                class="text-sm"
              >
                <p class="font-semibold">
                  {{ item.product.name }}
                </p>

                <p>
                  {{ item.quantity }} × ₱ {{ item.product.price }}
                </p>

                <p class="font-medium">
                  ₱ {{ item.quantity * item.product.price }}
                </p>
              </div>

              <hr />

              <p class="font-bold">
                Total: ₱ {{ getTotal() }}
              </p>

            </div>

            <div v-else class="mt-4 text-sm text-gray-500">
              Cart is empty
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