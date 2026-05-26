<!-- pages/index.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'customer'
})

import { ref, onMounted } from 'vue'
import { productService } from '~/api/product/ProductService'
import { orderService } from '~/api/order/OrderService'
import { customerService } from '~/api/customer/CustomerService'

const showProductsModal = ref(false)
const loadingProducts = ref(false)
const loadingOrder = ref(false)

const products = ref<any[]>([])
const selectedProduct = ref<any>(null)

const quantities = ref<Record<string, number>>({})

const customer = ref<any>(null)

/**
 * LOAD LOGGED IN CUSTOMER
 */
const fetchCustomer = async () => {
  try {
    const response = await customerService.me()

    console.log('CUSTOMER:', response)

    customer.value = response?.data || response

  } catch (error) {
    console.error('FETCH CUSTOMER ERROR:', error)
  }
}

onMounted(() => {
  fetchCustomer()
})

/**
 * OPEN SHOP
 */
const openShop = async () => {
  showProductsModal.value = true
  await fetchProducts()
}

/**
 * FETCH PRODUCTS
 */
const fetchProducts = async () => {
  loadingProducts.value = true

  try {
    const response = await productService.list({
      per_page: 100
    })

    console.log('PRODUCT RESPONSE:', response)

    products.value = Array.isArray(response)
      ? response
      : response?.data || []

  } catch (err) {
    console.error('FETCH PRODUCTS ERROR:', err)
  } finally {
    loadingProducts.value = false
  }
}

/**
 * SELECT PRODUCT
 */
const selectProduct = (product: any) => {
  selectedProduct.value = product
}
const placeOrder = async () => {
  if (!selectedProduct.value) {
    alert('Please select a product')
    return
  }

  loadingOrder.value = true

  try {

    // GET CURRENT CUSTOMER
    const response = await customerService.me()

    const customer =
      response?.data || response

    if (!customer?.uuid) {
      alert('Customer not found')
      return
    }

    await orderService.create({
      customer_uuid: customer.uuid,
      product_uuid: selectedProduct.value.uuid,
      quantity:
        quantities.value[selectedProduct.value.uuid] || 1
    })

    alert('Order placed successfully!')

    selectedProduct.value = null
    quantities.value = {}
    showProductsModal.value = false

  } catch (error: any) {
    console.error(error)

    alert(error?.message || 'Failed to place order')

  } finally {
    loadingOrder.value = false
  }
}
</script>

<template>
  <div>

    <!-- HERO -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div class="grid items-center gap-10 lg:grid-cols-2">

          <!-- LEFT -->
          <div>

            <p class="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              New arrivals
            </p>

            <h1 class="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Shop quality products made for everyday use.
            </h1>

            <p class="mt-5 max-w-xl text-base text-gray-600">
              Browse products and place your order instantly.
            </p>

            <div class="mt-8 flex gap-3">

              <button
                type="button"
                @click="openShop"
                class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Shop Now
              </button>

              <button
                type="button"
                class="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700"
              >
                View Deals
              </button>

            </div>

          </div>

          <!-- RIGHT -->
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

      <div class="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">

        <!-- HEADER -->
        <div class="mb-4 flex items-center justify-between">

          <h2 class="text-xl font-bold text-gray-900">
            Select Product
          </h2>

          <button
            @click="showProductsModal = false"
            class="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>

        </div>

        <!-- LOADING -->
        <div
          v-if="loadingProducts"
          class="py-10 text-center text-gray-500"
        >
          Loading products...
        </div>

        <!-- PRODUCTS -->
        <div
          v-else
          class="max-h-[400px] space-y-3 overflow-y-auto"
        >

          <div
            v-for="product in products"
            :key="product.uuid"
            @click="selectProduct(product)"
            class="flex cursor-pointer items-center justify-between rounded-xl border p-4 transition"
            :class="
              selectedProduct?.uuid === product.uuid
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            "
          >

            <!-- LEFT -->
            <div>

              <p class="font-semibold text-gray-900">
                {{ product.name }}
              </p>

              <p class="text-sm text-gray-500">
                ₱ {{ product.price }}
              </p>

            </div>

            <!-- RIGHT -->
            <input
              v-model.number="quantities[product.uuid]"
              type="number"
              min="1"
              class="w-20 rounded-md border border-gray-300 px-2 py-1 text-center"
              @click.stop
            />

          </div>

        </div>

        <!-- ACTIONS -->
        <div class="mt-6 flex justify-end gap-3">

          <button
            @click="showProductsModal = false"
            class="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
          >
            Cancel
          </button>

          <button
            :disabled="loadingOrder"
            @click="placeOrder"
            class="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {{ loadingOrder ? 'Placing Order...' : 'Place Order' }}
          </button>

        </div>

      </div>

    </div>

  </div>
</template>