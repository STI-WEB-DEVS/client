<!-- layouts/customer.vue -->
<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ShoppingCartIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';
import { authService } from '~/api/auth/AuthService';

const router = useRouter();
const showCartDrawer = ref(false);

// Get cart from composable
const cart = useState('customerCart', () => []);

const cartItemCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0);
});

const handleLogout = async () => {
  if (confirm('Are you sure you want to logout?')) {
    try {
      await authService.logout();
      // Clear console on logout
      console.clear();
      router.push('/');
    } catch (err) {
      console.error('Logout error:', err);
      // Clear localStorage anyway
      localStorage.removeItem('_token');
      localStorage.removeItem('uuid');
      localStorage.removeItem('role');
      // Clear console on logout
      console.clear();
      router.push('/');
    }
  }
};

const toggleCart = () => {
  showCartDrawer.value = !showCartDrawer.value;
};

const closeCart = () => {
  showCartDrawer.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NuxtLink to="/customer/order" class="text-xl font-bold text-gray-900 hover:text-indigo-600">
          My Store
        </NuxtLink>
 
        <nav class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          <NuxtLink to="/customer/shop" class="hover:text-gray-900">Shop</NuxtLink>
          <NuxtLink to="/customer/orders" class="hover:text-gray-900">Orders</NuxtLink>
          <NuxtLink to="/customer/account" class="hover:text-gray-900">Account</NuxtLink>
        </nav>
 
        <div class="flex items-center gap-3">
          <button 
            @click="toggleCart"
            class="relative rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <ShoppingCartIcon class="h-5 w-5" />
            <span>Cart</span>
            <span v-if="cartItemCount > 0" class="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartItemCount }}
            </span>
          </button>

          <button 
            @click="handleLogout"
            class="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <ArrowRightOnRectangleIcon class="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Cart Drawer -->
    <Teleport to="body">
      <div v-if="showCartDrawer" class="fixed inset-0 z-50 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div @click="closeCart" class="absolute inset-0 bg-black bg-opacity-50 transition-opacity"></div>
          
          <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div class="w-screen max-w-md">
              <div class="flex h-full flex-col bg-white shadow-xl">
                <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div class="flex items-start justify-between">
                    <h2 class="text-lg font-medium text-gray-900">Shopping Cart</h2>
                    <button @click="closeCart" class="text-gray-400 hover:text-gray-500">
                      <span class="sr-only">Close</span>
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div class="mt-8">
                    <div v-if="cart.length === 0" class="text-center py-12">
                      <ShoppingCartIcon class="mx-auto h-12 w-12 text-gray-400" />
                      <p class="mt-4 text-sm text-gray-500">Your cart is empty</p>
                      <NuxtLink to="/customer/shop" @click="closeCart" class="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Continue Shopping
                      </NuxtLink>
                    </div>

                    <div v-else class="flow-root">
                      <ul class="-my-6 divide-y divide-gray-200">
                        <li v-for="item in cart" :key="item.product.uuid" class="flex py-6">
                          <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100 flex items-center justify-center">
                            <span class="text-gray-400 text-xs">{{ item.product.name.substring(0, 2).toUpperCase() }}</span>
                          </div>

                          <div class="ml-4 flex flex-1 flex-col">
                            <div>
                              <div class="flex justify-between text-base font-medium text-gray-900">
                                <h3>{{ item.product.name }}</h3>
                                <p class="ml-4">₱{{ (item.product.price * item.quantity).toFixed(2) }}</p>
                              </div>
                              <p class="mt-1 text-sm text-gray-500">₱{{ item.product.price }} each</p>
                            </div>
                            <div class="flex flex-1 items-end justify-between text-sm">
                              <div class="flex items-center gap-2">
                                <button @click="item.quantity > 1 && item.quantity--" class="text-gray-500 hover:text-gray-700">-</button>
                                <span class="text-gray-500">Qty {{ item.quantity }}</span>
                                <button @click="item.quantity++" class="text-gray-500 hover:text-gray-700">+</button>
                              </div>

                              <button @click="cart.splice(cart.indexOf(item), 1)" class="font-medium text-indigo-600 hover:text-indigo-500">
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div v-if="cart.length > 0" class="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>₱{{ cart.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2) }}</p>
                  </div>
                  <p class="mt-0.5 text-sm text-gray-500">Shipping calculated at checkout.</p>
                  <div class="mt-6">
                    <NuxtLink 
                      to="/customer/checkout" 
                      @click="closeCart"
                      class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </NuxtLink>
                  </div>
                  <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <button @click="closeCart" class="font-medium text-indigo-600 hover:text-indigo-500">
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
 
    <main>
      <slot />
    </main>
 
    <footer class="border-t border-gray-200 bg-white mt-12">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 My Store. All rights reserved.</p>
 
        <div class="flex gap-6">
          <span>Help</span>
          <span>Contact</span>
          <span>Privacy</span>
        </div>
      </div>
    </footer>
  </div>
</template>