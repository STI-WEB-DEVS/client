<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from '@heroicons/vue/24/outline'
import { productService } from '~/api/product/ProductService'
import { useCartStore } from '~/stores/cart'
import OrderModal from '~/components/Shop/OrderModal.vue'

definePageMeta({ layout: 'customer' })

interface Product {
  uuid: string
  name: string
  price: number
  description: string
  stocks: number
}

interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

const cart = useCartStore()
const products = ref<Product[]>([])
const meta = ref<PaginationMeta | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const search = ref('')
const sortBy = ref<'name_asc' | 'name_desc' | 'price_asc' | 'price_desc'>('name_asc')
const currentPage = ref(1)
const flashUuid = ref<string | null>(null)

const showOrderModal = ref(false)
const selectedProduct = ref<Product | null>(null)

async function fetchProducts(page = 1) {
  loading.value = true
  error.value = null
  try {
    const res: any = await productService.list({ page, per_page: 12 })
    products.value = res?.data ?? (Array.isArray(res) ? res : [])
    if (res?.current_page !== undefined) {
      meta.value = {
        current_page: res.current_page,
        last_page: res.last_page,
        per_page: res.per_page,
        total: res.total,
      }
    }
    currentPage.value = page
  } catch (e: any) {
    error.value = e?.message ?? 'Failed to load products.'
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchProducts())

const filtered = computed(() => {
  let list = [...products.value]
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(q))
  }
  switch (sortBy.value) {
    case 'name_asc': list.sort((a, b) => a.name.localeCompare(b.name)); break
    case 'name_desc': list.sort((a, b) => b.name.localeCompare(a.name)); break
    case 'price_asc': list.sort((a, b) => a.price - b.price); break
    case 'price_desc': list.sort((a, b) => b.price - a.price); break
  }
  return list
})

function addToCart(product: Product) {
  if (product.stocks === 0) return
  cart.addItem(product)
  flashUuid.value = product.uuid
  setTimeout(() => { flashUuid.value = null }, 1500)
}

function openBuyNow(product: Product) {
  if (product.stocks === 0) return
  selectedProduct.value = product
  showOrderModal.value = true
}

function handleOrderSuccess(uuid: string, quantity: number) {
  const product = products.value.find(p => p.uuid === uuid)
  if (product) {
    product.stocks = Math.max(0, product.stocks - quantity)
  }
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(value)
}

const PALETTES = [
  'bg-rose-50',
  'bg-sky-50',
  'bg-amber-50',
  'bg-violet-50',
  'bg-emerald-50',
  'bg-orange-50',
]
function cardBg(index: number) {
  return PALETTES[index % PALETTES.length]
}
</script>

<template>
  <!-- Search + Sort -->
  <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div class="relative w-full sm:max-w-xs">
      <MagnifyingGlassIcon class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        v-model="search"
        type="text"
        placeholder="Search products…"
        class="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
    <div class="flex items-center gap-2">
      <FunnelIcon class="h-4 w-4 text-gray-400" />
      <select
        v-model="sortBy"
        class="rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      >
        <option value="name_asc">Name: A → Z</option>
        <option value="name_desc">Name: Z → A</option>
        <option value="price_asc">Price: Low → High</option>
        <option value="price_desc">Price: High → Low</option>
      </select>
    </div>
  </div>

  <!-- Loading skeleton -->
  <div v-if="loading" class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
    <div v-for="n in 8" :key="n" class="animate-pulse rounded-2xl bg-gray-100">
      <div class="aspect-square rounded-t-2xl bg-gray-200" />
      <div class="space-y-2 p-4">
        <div class="h-3 w-3/4 rounded bg-gray-200" />
        <div class="h-3 w-1/2 rounded bg-gray-200" />
        <div class="mt-4 h-8 rounded-lg bg-gray-200" />
      </div>
    </div>
  </div>

  <!-- Error -->
  <div v-else-if="error" class="flex flex-col items-center gap-3 py-20 text-center">
    <p class="text-sm text-red-500">{{ error }}</p>
    <button
      class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
      @click="fetchProducts(currentPage)"
    >
      Retry
    </button>
  </div>

  <!-- Empty -->
  <div v-else-if="filtered.length === 0" class="flex flex-col items-center gap-2 py-20 text-center">
    <ShoppingCartIcon class="h-12 w-12 text-gray-300" />
    <p class="text-sm text-gray-400">
      {{ search ? 'No products match your search.' : 'No products available yet.' }}
    </p>
  </div>

  <!-- Product Grid -->
  <div v-else>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="(product, index) in filtered"
        :key="product.uuid"
        class="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
        :class="product.stocks === 0 ? 'opacity-70' : ''"
      >
        <!-- Card image area -->
        <div :class="[cardBg(index), 'relative flex aspect-square items-center justify-center']">
          <span class="select-none text-4xl font-bold tracking-tight text-gray-300">
            {{ product.name.charAt(0).toUpperCase() }}
          </span>
          
          <!-- Out of stock badge -->
          <span
            v-if="product.stocks === 0"
            class="absolute top-2 right-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600"
          >
            Out of Stock
          </span>
          <!-- Low stock badge -->
          <span
            v-else-if="product.stocks <= 5"
            class="absolute top-2 right-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-600"
          >
            Only {{ product.stocks }} left!
          </span>
        </div>

        <div class="flex flex-1 flex-col gap-1 p-4">
          <h3 class="line-clamp-2 text-sm font-semibold text-gray-800">{{ product.name }}</h3>
          <p class="text-base font-bold text-indigo-600">{{ formatPrice(product.price) }}</p>

            <p v-if="product.description" class="text-xs text-gray-500 line-clamp-2">
              {{ product.description }}
            </p> 

          <!-- Stocks indicator -->
          <p
            class="text-xs"
            :class="product.stocks === 0
              ? 'text-red-400 font-medium'
              : product.stocks <= 5
                ? 'text-amber-500 font-medium'
                : 'text-gray-400'"
          >
            {{ product.stocks === 0 ? 'Out of stock' : `${product.stocks} in stock` }}
          </p>

          <div class="mt-auto flex flex-col gap-2">
            <!-- Add to Cart -->
            <button
              class="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition"
              :class="product.stocks === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : flashUuid === product.uuid
                  ? 'bg-green-500 hover:bg-green-500'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'"
              :disabled="product.stocks === 0"
              @click="addToCart(product)"
            >
              <ShoppingCartIcon class="h-3.5 w-3.5" />
              {{ flashUuid === product.uuid ? 'Added!' : 'Add to Cart' }}
            </button>

            <!-- Buy Now -->
            <button
              class="flex items-center justify-center rounded-lg border px-3 py-2 text-xs font-semibold transition"
              :class="product.stocks === 0
                ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95'"
              :disabled="product.stocks === 0"
              @click="openBuyNow(product)"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="meta && meta.last_page > 1" class="mt-10 flex items-center justify-center gap-2">
      <button
        :disabled="currentPage === 1"
        class="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        @click="fetchProducts(currentPage - 1)"
      >
        ← Prev
      </button>

      <template v-for="page in meta.last_page" :key="page">
        <button
          v-if="Math.abs(page - currentPage) <= 2 || page === 1 || page === meta.last_page"
          :class="[
            'rounded-lg border px-3 py-1.5 text-sm transition',
            page === currentPage
              ? 'border-indigo-600 bg-indigo-600 text-white'
              : 'border-gray-200 text-gray-600 hover:bg-gray-50',
          ]"
          @click="fetchProducts(page)"
        >
          {{ page }}
        </button>
        <span v-else-if="Math.abs(page - currentPage) === 3" class="px-1 text-gray-400">…</span>
      </template>

      <button
        :disabled="currentPage === meta.last_page"
        class="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        @click="fetchProducts(currentPage + 1)"
      >
        Next →
      </button>
    </div>

    <p v-if="meta" class="mt-4 text-center text-xs text-gray-400">
      Showing {{ products.length }} of {{ meta.total }} products
    </p>
  </div>

  <!-- Order Modal -->
  <OrderModal
    v-model="showOrderModal"
    :product="selectedProduct"
    @order-success="handleOrderSuccess"
  />
</template>