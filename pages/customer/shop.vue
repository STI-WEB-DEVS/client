<template>
  <div class="min-h-screen" style="background-color: #f5f0e8; font-family: sans-serif;">

    <!-- Header -->
    <header style="background-color: #1C3028;" class="sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span style="font-family: Georgia, serif; font-size: 1.4rem; color: white; letter-spacing: 0.05em;">
          Servor<span style="color: #C9A96E;">a</span>
        </span>

        <div class="flex items-center gap-6">
          <NuxtLink to="/customer/customers" class="text-xs text-white opacity-50 hover:opacity-100 transition-opacity">Customers</NuxtLink>
          <NuxtLink to="/product/products" class="text-xs text-white opacity-50 hover:opacity-100 transition-opacity">Products</NuxtLink>
          <NuxtLink to="/order/orders" class="text-xs text-white opacity-50 hover:opacity-100 transition-opacity">Orders</NuxtLink>
          <div class="w-px h-4 bg-white opacity-20"></div>
          <button @click="cartOpen = !cartOpen" class="relative flex items-center gap-2 text-sm font-semibold text-white opacity-80 hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cart
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold" style="background-color: #C9A96E; color: white; font-size: 10px;">
              {{ cartCount }}
            </span>
          </button>
          <button @click="logout" class="text-xs text-white opacity-30 hover:opacity-70 transition-opacity">Logout</button>
        </div>
      </div>
    </header>

    <!-- Main -->
    <div class="max-w-6xl mx-auto px-6 py-10">

      <div class="mb-8">
        <p class="text-xs uppercase tracking-widest text-gray-400 mb-1">Services</p>
        <h1 class="text-2xl font-bold" style="color: #1C3028; font-family: Georgia, serif;">Our Menu</h1>
      </div>

      <div v-if="loading" class="text-sm text-gray-400 py-20 text-center">Loading...</div>
      <div v-else-if="products.length === 0" class="text-sm text-gray-400 py-20 text-center">No services available.</div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="product in products" :key="product.uuid"
          class="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-4 hover:shadow-sm transition-shadow">
          <div>
            <p class="font-semibold text-gray-800">{{ product.name }}</p>
            <p class="text-lg font-bold mt-1" style="color: #C9A96E;">₱{{ Number(product.price).toFixed(2) }}</p>
          </div>
          <div class="flex items-center gap-2 mt-auto">
            <template v-if="getCartItem(product.uuid)">
              <button @click="decrease(product)" class="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 flex items-center justify-center transition-colors">−</button>
              <span class="w-8 text-center font-semibold text-gray-700 text-sm">{{ getCartItem(product.uuid)?.qty }}</span>
              <button @click="increase(product)" class="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 flex items-center justify-center transition-colors">+</button>
            </template>
            <button @click="addToCart(product)"
              class="flex-1 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style="background-color: #1C3028;">
              {{ getCartItem(product.uuid) ? 'Add More' : 'Add to Cart' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Drawer -->
    <transition name="slide">
      <div v-if="cartOpen" class="fixed inset-y-0 right-0 z-50 flex">
        <div class="fixed inset-0 bg-black/20" @click="cartOpen = false"></div>
        <div class="relative ml-auto w-80 bg-white h-full flex flex-col">

          <div class="px-5 py-4 border-b flex items-center justify-between">
            <h2 class="font-bold text-gray-800">Cart</h2>
            <button @click="cartOpen = false" class="text-gray-300 hover:text-gray-500 text-xl leading-none">×</button>
          </div>

          <div v-if="cart.length === 0" class="flex-1 flex items-center justify-center text-sm text-gray-400">
            Your cart is empty.
          </div>

          <div v-else class="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            <div v-for="item in cart" :key="item.uuid" class="flex items-center gap-3">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-800 truncate">{{ item.name }}</p>
                <p class="text-xs mt-0.5" style="color: #C9A96E;">₱{{ Number(item.price).toFixed(2) }}</p>
              </div>
              <div class="flex items-center gap-1">
                <button @click="decrease(item)" class="w-6 h-6 rounded border text-gray-400 hover:bg-gray-50 text-sm flex items-center justify-center">−</button>
                <span class="w-6 text-center text-sm text-gray-700">{{ item.qty }}</span>
                <button @click="increase(item)" class="w-6 h-6 rounded border text-gray-400 hover:bg-gray-50 text-sm flex items-center justify-center">+</button>
              </div>
              <p class="text-sm font-semibold text-gray-700 w-14 text-right">₱{{ (Number(item.price) * item.qty).toFixed(2) }}</p>
            </div>
          </div>

          <div v-if="cart.length > 0" class="border-t px-5 py-4 space-y-4">

            <!-- Customer picker -->
            <div>
              <label class="block text-xs uppercase tracking-widest text-gray-400 mb-1.5">Ordering as</label>
              <select v-model="selectedCustomer"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#1C3028] transition-colors bg-white">
                <option value="" disabled>Select a customer...</option>
                <option v-for="c in customers" :key="c.uuid" :value="c.uuid">{{ c.name }}</option>
              </select>
              <p v-if="!customers.length" class="text-xs text-gray-400 mt-1">
                No customers yet. <NuxtLink to="/customer/customers" class="underline" style="color: #C9A96E;">Add one first.</NuxtLink>
              </p>
            </div>

            <div class="flex items-center justify-between font-bold text-gray-800">
              <span class="text-sm">Total</span>
              <span>₱{{ total.toFixed(2) }}</span>
            </div>

            <p v-if="orderError" class="text-xs text-red-500">{{ orderError }}</p>
            <p v-if="orderSuccess" class="text-xs font-semibold text-green-600">Order placed successfully!</p>

            <button @click="placeOrder" :disabled="placing || !selectedCustomer"
              class="w-full py-2.5 rounded-lg text-sm font-semibold text-white hover:opacity-90 disabled:opacity-40 transition-opacity"
              style="background-color: #1C3028;">
              {{ placing ? 'Placing...' : 'Place Order' }}
            </button>
          </div>

        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });

import { ref, computed, onMounted } from 'vue';
import { productService } from '~/api/product/ProductService';
import { orderService } from '~/api/order/OrderService';
import { customerService } from '~/api/customer/CustomerService';

const products = ref<any[]>([]);
const customers = ref<any[]>([]);
const loading = ref(true);
const cart = ref<any[]>([]);
const cartOpen = ref(false);
const placing = ref(false);
const orderError = ref('');
const orderSuccess = ref(false);
const selectedCustomer = ref('');

onMounted(async () => {
  try {
    const [prodRes, custRes] = await Promise.all([
      productService.list(),
      customerService.list(),
    ]);
    products.value = prodRes.data ?? prodRes;
    customers.value = custRes.data ?? custRes;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});

const cartCount = computed(() => cart.value.reduce((s, i) => s + i.qty, 0));
const total = computed(() => cart.value.reduce((s, i) => s + Number(i.price) * i.qty, 0));

function getCartItem(uuid: string) { return cart.value.find(i => i.uuid === uuid); }
function addToCart(product: any) {
  const existing = getCartItem(product.uuid);
  if (existing) existing.qty++;
  else cart.value.push({ ...product, qty: 1 });
}
function increase(product: any) { const item = getCartItem(product.uuid); if (item) item.qty++; }
function decrease(product: any) {
  const item = getCartItem(product.uuid);
  if (!item) return;
  if (item.qty <= 1) cart.value = cart.value.filter(i => i.uuid !== product.uuid);
  else item.qty--;
}

async function placeOrder() {
  if (!selectedCustomer.value) { orderError.value = 'Please select a customer.'; return; }
  orderError.value = '';
  orderSuccess.value = false;
  placing.value = true;
  const items = cart.value.map(i => ({ product_uuid: i.uuid, quantity: i.qty }));
  try {
    await orderService.placeOrder(selectedCustomer.value, items);
    orderSuccess.value = true;
    cart.value = [];
    selectedCustomer.value = '';
    setTimeout(() => orderSuccess.value = false, 3000);
  } catch (e: any) {
    orderError.value = e?.message || 'Failed to place order.';
  } finally {
    placing.value = false;
  }
}

function logout() { localStorage.clear(); navigateTo('/'); }
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>