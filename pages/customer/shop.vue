<!-- pages/customer/shop.vue -->
<template>
  <div class="py-6">
    <!-- Page Header & Search controls -->
    <div class="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Shop All Products</h1>
        <p v-if="!pending" class="mt-2 text-sm text-gray-500">
          Showing {{ filteredProducts.length }} products available today.
        </p>
        <p v-else class="mt-2 text-sm text-gray-400 animate-pulse">
          Loading catalog items...
        </p>
      </div>
      
      <!-- Search and Sort Filters -->
      <div class="mt-3 flex gap-3 sm:mt-0 sm:ml-4">
        <div class="relative rounded-md shadow-sm max-w-xs">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search products..." 
            class="block w-full rounded-md border-gray-300 pr-10 text-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <select 
          v-model="sortBy" 
          class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>

    <div class="mt-6 lg:grid lg:grid-cols-4 lg:gap-x-8">
      <!-- Sidebar Filters - Desktop -->
      <aside class="hidden lg:block">
        <h2 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Categories</h2>
        <ul role="list" class="mt-4 space-y-2 border-b border-gray-200 pb-6 text-sm font-medium text-gray-700">
          <li v-for="category in categories" :key="category">
            <button 
              @click="selectedCategory = category"
              :class="[
                selectedCategory === category ? 'text-indigo-600 font-bold' : 'text-gray-600 hover:text-indigo-600',
                'w-full text-left transition-colors'
              ]"
            >
              {{ category }}
            </button>
          </li>
        </ul>
      </aside>

      <!-- Main Display Section -->
      <div class="lg:col-span-3">
        <!-- Skeleton Loading State -->
        <div v-if="pending" class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          <div v-for="n in 6" :key="n" class="animate-pulse">
            <div class="aspect-square w-full rounded-xl bg-gray-200" />
            <div class="mt-4 h-4 w-2/3 rounded bg-gray-200" />
            <div class="mt-2 h-4 w-1/4 rounded bg-gray-200" />
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredProducts.length === 0" class="text-center py-24 border-2 border-dashed border-gray-200 rounded-xl">
          <p class="text-gray-500 text-lg">No matching products found.</p>
          <button @click="resetFilters" class="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Clear filters and start over
          </button>
        </div>

        <!-- Catalog Display Grid -->
        <div v-else class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          <div v-for="product in filteredProducts" :key="product.uuid" class="group relative flex flex-col justify-between">
            <div>
              <!-- Product Image Wrapper -->
              <div class="aspect-square w-full overflow-hidden rounded-xl bg-gray-100 group-hover:opacity-75 transition-opacity cursor-pointer" @click="viewProduct(product.uuid)">
                <div class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                  No Image Available
                </div>
              </div>
              
              <!-- Title and Pricing info -->
              <div class="mt-4 flex justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-700">
                    <NuxtLink :to="`/customer/shop/${product.uuid}`">
                      <span aria-hidden="true" class="absolute inset-0" />
                      {{ product.name }}
                    </NuxtLink>
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">{{ product.category || 'General' }}</p>
                </div>
                <p class="text-sm font-semibold text-gray-900">${{ Number(product.price).toFixed(2) }}</p>
              </div>
            </div>

            <!-- Action Button with Feedback Color Shift -->
            <div class="mt-4 z-10">
              <button 
                @click.stop="handleAddToCart(product)"
                :disabled="feedbackState[product.uuid]"
                :class="[
                  feedbackState[product.uuid]
                    ? 'bg-green-600 text-white hover:bg-green-600'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700',
                  'w-full flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all shadow-sm'
                ]"
              >
                <!-- Dynamic text and checkmark toggle -->
                <span v-if="feedbackState[product.uuid]" class="flex items-center gap-1.5">
                  <svg class="h-4 w-4 shrink-0 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Added!
                </span>
                <span v-else>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { productService } from '~/api/product/ProductService'
import { useCart } from '~/composables/useCart'

definePageMeta({
  layout: 'customer'
})

const productList = ref<any[]>([])
const pending = ref(true)

// Tracks active click feedback per product uuid
const feedbackState = reactive<Record<string, boolean>>({})

const { addToCart } = useCart()

const searchQuery = ref('')
const selectedCategory = ref('All')
const sortBy = ref('featured')

const categories = ['All', 'Apparel', 'Electronics', 'Accessories', 'Home Goods']

const fetchProducts = async () => {
  pending.value = true
  try {
    const response = await productService.list()
    productList.value = response.data || []
  } catch (error: any) {
    console.error('Fetch Error:', error.message)
  } finally {
    pending.value = false
  }
}

const filteredProducts = computed(() => {
  let items = [...productList.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    items = items.filter(p => p.name?.toLowerCase().includes(query))
  }

  if (selectedCategory.value !== 'All') {
    items = items.filter(p => (p.category || 'General') === selectedCategory.value)
  }

  if (sortBy.value === 'price-low') {
    items.sort((a, b) => Number(a.price) - Number(b.price))
  } else if (sortBy.value === 'price-high') {
    items.sort((a, b) => Number(b.price) - Number(a.price))
  }

  return items
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'All'
  sortBy.value = 'featured'
}

const viewProduct = (uuid: string) => {
  navigateTo(`/customer/shop/${uuid}`)
}

// Triggers global cart change and manages local button UI timeout
const handleAddToCart = (product: any) => {
  addToCart(product)
  
  // Turn button green
  feedbackState[product.uuid] = true
  
  // Revert color back after 2 seconds
  setTimeout(() => {
    feedbackState[product.uuid] = false
  }, 2000)
}

onMounted(() => {
  fetchProducts()
})
</script>
