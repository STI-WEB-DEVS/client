<template>
  <div class="min-h-screen bg-gray-50/50 p-4 md:p-8">
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-5">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">Design Showroom</h1>
        <p class="mt-1 text-sm text-gray-500">Explore base furniture profiles and initiate custom craft commissions.</p>
      </div>

      <div class="relative">
        <MagnifyingGlassIcon class="absolute left-3 top-2.5 size-4 text-gray-400" />
        <input
          v-model="search"
          type="text"
          placeholder="Filter by piece, style, or wood..."
          class="w-full sm:w-72 rounded-lg border border-gray-300 bg-white py-1.5 pl-9 pr-4 text-sm text-gray-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 transition"
        />
      </div>
    </div>

    <div
      v-if="filteredProducts.length"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.uuid"
        class="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
      >
        <div class="relative bg-gray-50 border-b border-gray-100">
          <div class="flex h-56 items-center justify-center overflow-hidden">
            <img
              v-if="product.image"
              :src="product.image"
              alt="FurniCraft Design Profile"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-102"
            />
            <div v-else class="flex flex-col items-center text-gray-400 p-4 text-center">
              <PhotoIcon class="mb-1.5 size-8 text-gray-300" />
              <span class="text-xs font-medium tracking-wide uppercase">No Design Schematic</span>
            </div>
          </div>
        </div>

        <div class="p-5">
          <div class="mb-4">
            <h2 class="text-sm font-bold text-gray-900 truncate">{{ product.name }}</h2>
            <p class="mt-1.5 text-xl font-black text-green-700 tracking-tight">
              ₱{{ Number(product.price).toLocaleString() }}
            </p>
          </div>

          <div class="mb-4 grid grid-cols-2 gap-2">
            <button
              @click="addItemToWorkshopCart(product)"
              :disabled="product.stock <= 0 || isSubmitting"
              class="flex items-center justify-center gap-1.5 rounded-lg bg-gray-100 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
              title="Add Base Design to Cart"
            >
              <ShoppingCartIcon class="size-4" />
              <span>Queue Design</span>
            </button>

            <button
              @click="executeImmediateCommission(product)"
              :disabled="product.stock <= 0 || isSubmitting"
              class="flex items-center justify-center gap-1.5 rounded-lg bg-green-700 py-2.5 text-xs font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <span v-if="isSubmitting && targetedProductUuid === product.uuid">Processing Build...</span>
              <span v-else>Instant Order</span>
            </button>
          </div>

          <div class="border-t border-gray-100 pt-3.5 text-[11px] font-medium text-gray-500">
            <div class="flex items-center justify-between">
              <span>Material Inquiries</span>
              <span class="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Crafting Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!filteredProducts.length && !loading"
      class="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white py-16 px-4 text-center max-w-md mx-auto mt-12"
    >
      <CubeIcon class="mb-3 size-10 text-gray-300" />
      <h3 class="text-sm font-bold text-gray-800">No Showroom Matches</h3>
      <p class="mt-1 text-xs text-gray-500">We couldn't parse any registered furniture profiles matching that description template.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { CubeIcon, MagnifyingGlassIcon, PhotoIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline'

// API Structural Communication Nodes
import { productService } from '~/api/product/ProductService'
import { orderService } from '~/api/order/OrderService'

definePageMeta({
  layout: 'customer'
})

const products = ref<any[]>([])
const loading = ref(false)
const search = ref('')
const cart = ref<any[]>([])

// Transaction Loading State Handles
const isSubmitting = ref(false)
const targetedProductUuid = ref('')

const filteredProducts = computed(() => {
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const fetchShowroomItems = async () => {
  loading.value = true
  try {
    const rawPayload = await productService.list()
    products.value = rawPayload?.data || rawPayload || []
  } catch (err) {
    console.error('Error fetching data from platform database repository:', err)
  } finally {
    loading.value = false
  }
}

// PERSIST DESIGN SELECTIONS IN CLIENT LOCALSTORAGE HOOKS
const addItemToWorkshopCart = (product: any) => {
  if (typeof window === 'undefined') return

  const rawStorageInstance = localStorage.getItem('shopping-cart')
  let internalCartState = rawStorageInstance ? JSON.parse(rawStorageInstance) : []

  const itemIndexMatched = internalCartState.findIndex((item: any) => item.uuid === product.uuid)

  if (itemIndexMatched !== -1) {
    internalCartState[itemIndexMatched].quantity += 1
  } else {
    internalCartState.push({
      id: product.uuid, 
      uuid: product.uuid,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
  }

  localStorage.setItem('shopping-cart', JSON.stringify(internalCartState))
  cart.value = internalCartState
  
  window.dispatchEvent(new Event('cart-updated'))
  alert(`Design spec for ${product.name} appended to your build cart configuration!`)
}

// BIND DIRECT LEAN CHECKOUT ACTION TO LARAVEL ORDERING MODULE
const executeImmediateCommission = async (product: any) => {
  if (!product.uuid) return

  let resolvedAuthKey = ""
  if (typeof window !== 'undefined') {
    resolvedAuthKey = localStorage.getItem('_uuid') || ""
  }
  
  if (!resolvedAuthKey) {
    alert('Validation Aborted: An active session key token (_uuid) must be configured to complete this order request.')
    return
  }

  isSubmitting.value = true
  targetedProductUuid.value = product.uuid

  const transactionalPayload = {
    customer_uuid: resolvedAuthKey,
    items: [
      {
        product_uuid: product.uuid,
        quantity: 1
      }
    ]
  }

  try {
    const backendResponseStream = await orderService.create(transactionalPayload)
    const normalizedDataToken = backendResponseStream?.data || backendResponseStream

    alert(`Success! Project pipeline assigned in database. Build Ref: ${normalizedDataToken.id || 'Confirmed'}`)
    
    await fetchShowroomItems()
  } catch (errorDetails: any) {
    console.error('API submission transaction rejected at data repository layer:', errorDetails)
    const messageDetails = errorDetails?.response?._data?.message || errorDetails?.data?.message || 'Processing anomaly.'
    alert(`Commission Configuration Rejection: ${messageDetails}`)
  } finally {
    isSubmitting.value = false
    targetedProductUuid.value = ''
  }
}

onMounted(() => {
  fetchShowroomItems()
  
  if (typeof window !== 'undefined') {
    const temporarySessionPayload = localStorage.getItem('shopping-cart')
    if (temporarySessionPayload) {
      cart.value = JSON.parse(temporarySessionPayload)
    }
  }
})
</script>