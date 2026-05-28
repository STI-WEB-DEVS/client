<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Shop Products</h1>
        <p class="mt-1 text-sm text-gray-500">{{ filteredProducts.length }} products available</p>
      </div>
      <div class="relative">
        <MagnifyingGlassIcon class="absolute left-3 top-2.5 size-4 text-gray-400" />
        <input v-model="search" type="text" placeholder="Search products..."
          class="w-64 rounded-xl border border-gray-300 bg-white py-2 pl-9 pr-4 text-sm focus:border-indigo-500 focus:outline-none" />
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-4 border-indigo-200 border-t-indigo-600"></div>
    </div>

    <!-- Product Grid -->
    <div v-else-if="filteredProducts.length" class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <div v-for="product in filteredProducts" :key="product.uuid"
        class="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

        <!-- Product Image placeholder -->
        <div class="flex h-48 items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
          <CubeIcon class="size-16 text-indigo-200" />
        </div>

        <!-- Details -->
        <div class="p-5">
          <h2 class="text-base font-bold text-gray-900 leading-snug">{{ product.name }}</h2>
          <p class="mt-2 text-2xl font-bold text-indigo-600">${{ Number(product.price).toFixed(2) }}</p>

          <!-- Buttons -->
          <div class="mt-4 flex gap-2">
            <button @click="addToCart(product)"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-indigo-600 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50">
              <ShoppingCartIcon class="size-4" />
              Add to Cart
            </button>
            <button @click="buyNow(product)"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty -->
    <div v-else class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
      <CubeIcon class="mb-4 size-14 text-gray-300" />
      <h3 class="text-lg font-semibold text-gray-700">No Products Found</h3>
      <p class="mt-1 text-sm text-gray-500">Try a different search term.</p>
    </div>

    <!-- Toast notification -->
    <div v-if="toast" class="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-gray-900 px-5 py-3 text-sm text-white shadow-xl transition">
      <CheckCircleIcon class="size-5 text-green-400" />
      {{ toast }}
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'customer', middleware: 'auth' });

import { computed, onMounted, ref } from 'vue';
import { CubeIcon, MagnifyingGlassIcon, ShoppingCartIcon, CheckCircleIcon } from '@heroicons/vue/24/outline';
import { productService } from '~/api/product/ProductService';
import { cartService } from '~/api/cart/CartService';

const products = ref<any[]>([]);
const loading = ref(false);
const search = ref('');
const toast = ref('');

const filteredProducts = computed(() =>
  products.value.filter(p => p.name.toLowerCase().includes(search.value.toLowerCase()))
);

const fetchProducts = async () => {
  loading.value = true;
  try {
    const res = await productService.list();
    products.value = res?.data || res || [];
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const showToast = (msg: string) => {
  toast.value = msg;
  setTimeout(() => (toast.value = ''), 2500);
};

const addToCart = (product: any) => {
  cartService.addItem({ uuid: product.uuid, name: product.name, price: product.price });
  window.dispatchEvent(new Event('cart-updated'));
  showToast(`${product.name} added to cart!`);
};

const buyNow = (product: any) => {
  cartService.addItem({ uuid: product.uuid, name: product.name, price: product.price });
  window.dispatchEvent(new Event('cart-updated'));
  navigateTo('/customer/cart');
};

onMounted(fetchProducts);
</script>
