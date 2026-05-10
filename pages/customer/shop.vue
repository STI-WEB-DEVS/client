<script setup>
import { ref, onMounted } from 'vue';
import { ShoppingCartIcon, ShoppingBagIcon, SparklesIcon } from '@heroicons/vue/24/outline';
import { productService } from '~/api/product/ProductService';

definePageMeta({
  layout: 'customer'
});

const products = ref([]);
const loading = ref(true);
const error = ref(null);
const cart = useState('customerCart', () => []);

const showNotification = ref(false);
const notificationMessage = ref('');

onMounted(async () => {
  try {
    const response = await productService.list();
    products.value = response.data || [];
  } catch (err) {
    error.value = err.message || 'Failed to load products';
  } finally {
    loading.value = false;
  }
});

const addToCart = (product) => {
  const existingItem = cart.value.find(item => item.product.uuid === product.uuid);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.value.push({
      product: { ...product },
      quantity: 1
    });
  }

  notificationMessage.value = `${product.name} added to cart!`;
  showNotification.value = true;
  setTimeout(() => {
    showNotification.value = false;
  }, 2000);
};

const buyNow = (product) => {
  addToCart(product);
  navigateTo('/customer/checkout');
};
</script>

<template>
  <div class="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Notification -->
    <Teleport to="body">
      <div v-if="showNotification" class="fixed top-20 right-4 z-50 animate-fade-in">
        <div class="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg px-6 py-4 shadow-2xl flex items-center gap-3">
          <SparklesIcon class="h-5 w-5" />
          <p class="font-medium">{{ notificationMessage }}</p>
        </div>
      </div>
    </Teleport>

    <!-- Header Section -->
    <div class="mb-12">
      <div class="flex items-center gap-3 mb-3">
        <div class="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
          Shop Products
        </h1>
      </div>
      <p class="text-lg text-gray-600 ml-15">Discover our curated collection of quality products</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="relative">
        <div class="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
        <ShoppingBagIcon class="h-8 w-8 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p class="mt-4 text-gray-500 font-medium">Loading products...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-pink-50 p-8 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <svg class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-red-900 mb-2">Oops! Something went wrong</h3>
      <p class="text-red-700">{{ error }}</p>
    </div>

    <!-- Products Grid -->
    <div v-else-if="products.length > 0" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div 
        v-for="product in products" 
        :key="product.uuid"
        class="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-gray-100 bg-white hover:border-indigo-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <!-- Product Image with Gradient Overlay -->
        <div class="relative aspect-square bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 group-hover:from-indigo-200 group-hover:via-purple-100 group-hover:to-pink-200 transition-all duration-300 flex items-center justify-center overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span class="text-5xl font-black text-indigo-300 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-300">
            {{ product.name.substring(0, 2).toUpperCase() }}
          </span>
          
          <!-- Quick View Badge -->
          <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
            Quick View
          </div>
        </div>

        <!-- Product Info -->
        <div class="flex flex-1 flex-col p-5">
          <h3 class="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {{ product.name }}
          </h3>
          
          <div class="flex items-baseline gap-2 mb-4">
            <p class="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ₱{{ parseFloat(product.price).toFixed(2) }}
            </p>
            <span class="text-xs text-gray-500 font-medium">per item</span>
          </div>

          <!-- Action Buttons -->
          <div class="mt-auto flex gap-2">
            <button
              @click="addToCart(product)"
              class="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 hover:from-gray-100 hover:to-gray-200 hover:border-gray-300 transition-all duration-200 transform hover:scale-105"
            >
              <ShoppingCartIcon class="h-4 w-4" />
              Add
            </button>
            <button
              @click="buyNow(product)"
              class="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-bold text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <ShoppingBagIcon class="h-4 w-4" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20">
      <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 mb-6">
        <ShoppingBagIcon class="h-12 w-12 text-gray-400" />
      </div>
      <h3 class="text-2xl font-bold text-gray-900 mb-2">No products available</h3>
      <p class="text-gray-500 mb-6">Check back later for new products.</p>
      <NuxtLink 
        to="/customer/order"
        class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-bold text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
      >
        Back to Home
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
