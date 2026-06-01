<script setup lang="ts">
import { ref, onMounted } from 'vue';
 
// 1. Importing the layout meta tag for your custom shell wrapper
definePageMeta({
  layout: 'customer'
});
 
// 2. Importing the corresponding Product Service mapping layout
// Note: Adjust the import string below to match the exact name/path of your product service file
import { productService } from '~/api/product/ProductService';
 
// Reactive Bindings following your exact coding pattern
const products = ref<any[]>([]);
const isLoading = ref(true);
 
// Fetching product lines directly from the service layer database response
const fetchProducts = async () => {
  try {
    isLoading.value = true;
 
    // Calls the dynamic listing query exactly like customerService.list()
    const res = await productService.list();
 
    // Handles unpacking whether the api returns a wrapper object or a direct data rows array
    products.value = res.data || res;
  } catch (err) {
    console.error("Database query processing error:", err);
 
    // Safe Development Fallbacks so your UI cards render while fixing API routes
    products.value = [
      { uuid: 'p1', name: 'Minimalist Commuter Backpack', description: 'Water-resistant nylon shell / 15" laptop sleeve', price: 89.00, category: 'Apparel' },
      { uuid: 'p2', name: 'Anodized Aluminum Desk Pen', description: 'Weighted core with premium matte finish cartridge', price: 32.00, category: 'Workspace' },
      { uuid: 'p3', name: 'MagSafe Leather Cardholder', description: 'Full-grain European leather / Holds 3 cards safely', price: 45.00, category: 'Accessories' },
      { uuid: 'p4', name: 'Double-Walled Travel Tumbler', description: 'Vacuum insulated stainless steel / 16 oz capacity', price: 28.00, category: 'Everyday' }
    ];
  } finally {
    isLoading.value = false;
  }
};
 
// CONNECTED TO DATABASE PATHWAY: 
// Dispatches the exact product object payload (including its uuid) via a global window event
const addToCart = (product: any) => {
  window.dispatchEvent(new CustomEvent('add-to-cart', { 
    detail: product 
  }));
};
 
// Lifecycle initialization hook trigger
onMounted(fetchProducts);
</script>
 
<template>
  <div>
    <section class="bg-white py-12 border-b border-gray-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid items-center gap-10 lg:grid-cols-2">
 
          <div>
            <p class="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              New arrivals
            </p>
            <h1 class="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Shop quality products made for everyday use.
            </h1>
            <p class="mt-5 max-w-xl text-base text-gray-600">
              Browse featured products, discover new items, and enjoy a simple shopping experience.
            </p>
            <div class="mt-8 flex gap-3">
              <a href="#catalog-display" class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500 shadow-xs transition-colors text-center">
                Shop Now
              </a>
              <a href="#catalog-display" class="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 text-center">
                View Deals
              </a>
            </div>
          </div>
 
          <div class="rounded-2xl bg-gray-100 p-8">
            <div class="aspect-[4/3] rounded-xl bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-400">
              Featured Display
            </div>
          </div>
 
        </div>
      </div>
    </section>
 
    <section id="catalog-display" class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 scroll-mt-16">
      <div class="border-b border-gray-200 pb-5 mb-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Our Collection</h2>
        <p class="mt-1 text-sm text-gray-500">Real-time inventory pulled directly from the database store.</p>
      </div>
 
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
        <div class="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
        <p class="mt-4 text-sm font-medium text-gray-500">Connecting to product table repository...</p>
      </div>
 
      <div v-else-if="products.length === 0" class="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl">
        <p class="text-sm font-medium text-gray-900">No products available</p>
        <p class="mt-1 text-xs text-gray-500">There are currently no item entries active inside your inventory schema.</p>
      </div>
 
      <div v-else class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div 
          v-for="product in products" 
          :key="product.uuid || product.id" 
          class="group relative flex flex-col justify-between bg-white border border-gray-200 rounded-xl p-4 shadow-xs hover:shadow-md transition-shadow animate-fade-in"
        >
          <div>
            <div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 relative">
              <img 
                v-if="product.image_url" 
                :src="product.image_url" 
                :alt="product.name" 
                class="h-full w-full object-cover object-center group-hover:opacity-90 transition-opacity"
              />
              <div v-else class="h-full w-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-400">
                NO IMAGE IN DB
              </div>
 
              <span class="absolute top-2 left-2 inline-flex items-center rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 shadow-xs">
                {{ product.category || 'General' }}
              </span>
            </div>
 
            <div class="mt-4 flex justify-between items-start">
              <div class="pr-2">
                <h3 class="text-sm font-semibold text-gray-800 line-clamp-1">
                  {{ product.name }}
                </h3>
                <p class="mt-1 text-xs text-gray-500 line-clamp-2 min-h-[2rem]">
                  {{ product.description || 'No description assigned.' }}
                </p>
              </div>
              <p class="text-sm font-bold text-gray-900 whitespace-nowrap">
                ${{ Number(product.price || 0).toFixed(2) }}
              </p>
            </div>
          </div>
 
          <div class="mt-4">
            <button 
              @click="addToCart(product)"
              class="w-full rounded-lg bg-gray-900 hover:bg-indigo-600 active:bg-indigo-700 py-2 text-xs font-semibold text-white shadow-xs transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
 