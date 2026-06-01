<template>
  <NuxtLayout name="customer">
    <div class="space-y-8">
      <!-- Hero Section with SmartPark Branding -->
      <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
        <div class="px-8 py-16 md:py-20 text-center">
          <h1 class="text-5xl md:text-6xl font-bold text-white mb-4">SmartPark</h1>
          <p class="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Your one-stop solution for all parking essentials. Quality products, seamless experience, and unbeatable convenience.
          </p>
          <NuxtLink 
            to="/customer/Order"
            class="inline-flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Shop Now
          </NuxtLink>
        </div>
      </div>

      <!-- Featured Products Section -->
      <div v-if="productStore.items.length > 0">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Featured Products</h2>
            <p class="text-gray-600 mt-1">Discover our top parking essentials</p>
          </div>
          <NuxtLink 
            to="/customer/Order"
            class="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Loading State -->
        <div v-if="productStore.loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p class="mt-4 text-gray-600">Loading products...</p>
        </div>

        <!-- Products Grid (Limited to 4 products) -->
        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <NuxtLink 
            v-for="product in featuredProducts" 
            :key="product.id"
            :to="`/customer/Order`"
            class="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden group cursor-pointer">
            <!-- Product Image Placeholder -->
            <div class="aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center group-hover:from-indigo-200 group-hover:to-purple-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <!-- Product Name -->
            <div class="p-4 text-center">
              <h4 class="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{{ product.name }}</h4>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!productStore.loading" class="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <h3 class="text-xl font-bold text-gray-900 mb-2">No Products Available</h3>
        <p class="text-gray-600">Check back later for new products!</p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useProductStore } from '~/stores/products'

const productStore = useProductStore()

// Fetch products when component is mounted
onMounted(() => {
  productStore.fetchProducts()
})

// Get only first 4 products for featured section
const featuredProducts = computed(() => {
  return productStore.items.slice(0, 4)
})
</script>