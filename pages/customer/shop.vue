<script setup>
import { ref, onMounted } from 'vue';
import { ShoppingCartIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline';
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
  <div class="py-8">
    <!-- Notification -->
    <Teleport to="body">
      <div v-if="showNotification" class="fixed top-20 right-4 z-50 animate-fade-in">
        <div class="bg-green-50 border border-green-200 rounded-lg px-4 py-3 shadow-lg">
          <p class="text-sm font-medium text-green-800">{{ notificationMessage }}</p>
        </div>
      </div>
    </Teleport>

    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Shop Products</h1>
      <p class="mt-2 text-sm text-gray-600">Browse our collection of quality products</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-16">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
      <p class="text-sm text-red-700">{{ error }}</p>
    </div>

    <!-- Products Grid -->
    <div v-else-if="products.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div 
        v-for="product in products" 
        :key="product.uuid"
        class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-shadow"
      >
        <!-- Product Image Placeholder -->
        <div class="aspect-square bg-gray-200 group-hover:bg-gray-300 transition-colors flex items-center justify-center">
          <span class="text-4xl font-bold text-gray-400">{{ product.name.substring(0, 2).toUpperCase() }}</span>
        </div>

        <!-- Product Info -->
        <div class="flex flex-1 flex-col p-4">
          <h3 class="text-sm font-medium text-gray-900">
            {{ product.name }}
          </h3>
          <p class="mt-1 text-lg font-semibold text-gray-900">
            ${{ parseFloat(product.price).toFixed(2) }}
          </p>

          <!-- Actions -->
          <div class="mt-4 flex gap-2">
            <button
              @click="addToCart(product)"
              class="flex-1 flex items-center justify-center gap-2 rounded-md bg-white border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ShoppingCartIcon class="h-4 w-4" />
              Add to Cart
            </button>
            <button
              @click="buyNow(product)"
              class="flex-1 flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              <ShoppingBagIcon class="h-4 w-4" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <ShoppingBagIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-4 text-sm font-medium text-gray-900">No products available</h3>
      <p class="mt-1 text-sm text-gray-500">Check back later for new products.</p>
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
</style>
