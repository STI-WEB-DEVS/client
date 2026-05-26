<!-- pages/customer/shop.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { productService } from '~/api/product/ProductService'

definePageMeta({
  layout: 'customer'
})

// Access the global cart actions state hook
const { addToCart } = useCart()

// Core reactive state layers matching your service setup
const productList = ref<any[]>([])
const pending = ref<boolean>(true)

// Fetch method hooking directly into your repository pattern layer
const fetchProducts = async () => {
  pending.value = true
  try {
    const response = await productService.list()
    // Extracts array data from your backend API service instance
    productList.value = response.data || []
  } catch (error: any) {
    console.error('Fetch Error:', error.message)
  } finally {
    pending.value = false
  }
}

// Fire the service data fetching logic when component mounts
onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="mx-auto max-w-7xl">
    <!-- Header Page Description Section -->
    <div class="border-b border-gray-200 pb-5">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">All Products</h1>
      <p class="mt-2 text-sm text-gray-500">Explore premium essentials built for reliability and comfort.</p>
    </div>

    <!-- Interface Loading Spin Ring Spinner Wrapper -->
    <div v-if="pending" class="mt-12 flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>

    <!-- Empty Database Records State Fallback -->
    <div v-else-if="productList.length === 0" class="mt-12 text-center py-12 rounded-xl border border-gray-200 bg-white">
      <p class="text-gray-500 font-medium">No products are currently available in the shop.</p>
      <p class="text-xs text-gray-400 mt-1">Check back later for new arrivals.</p>
    </div>

    <!-- Live Storefront Database Product Presentation Layout Grid -->
    <div v-else class="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      <div 
        v-for="product in productList" 
        :key="product.id || product.uuid" 
        class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
      >
        <!-- Product Thumbnail Image Asset Wrapper Box (Uses placeholder if database image field is absent) -->
        <div class="aspect-[4/3] bg-gray-200 group-hover:opacity-75 transition-opacity">
          <img 
            :src="product.image_url || 'https://unsplash.com'" 
            :alt="product.name" 
            class="h-full w-full object-cover object-center"
          />
        </div>
        
        <!-- Content Summary Information Block Container -->
        <div class="flex flex-1 flex-col space-y-2 p-4">
          <h3 class="text-sm font-semibold text-gray-900">
            {{ product.name }}
          </h3>
          
          <p class="text-sm text-gray-500 flex-1 line-clamp-2">
            <!-- Dynamic safe text layout rendering database description safely -->
            {{ product.description || 'Premium grade consumer asset meticulously curated for high performance operation workflows.' }}
          </p>
          
          <div class="flex items-center justify-between pt-2">
            <p class="text-lg font-bold text-gray-900">
              ${{ Number(product.price).toFixed(2) }}
            </p>
            
            <!-- Connected the addToCart action on click -->
            <button 
              @click="addToCart(product)"
              class="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 active:scale-95 transition-all"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
