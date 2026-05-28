<template>
  <div>
    <!-- Mobile Sidebar -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>
        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                  <XMarkIcon class="size-6 text-white" />
                </button>
              </div>
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-700 px-6 pb-4">
                <div class="flex h-16 items-center gap-3">
                  <div class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                    <ShoppingBagIcon class="w-5 h-5 text-white" />
                  </div>
                  <span class="text-white font-semibold">My Store</span>
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul class="space-y-2">
                    <li v-for="item in navigation" :key="item.name">
                      <NuxtLink :to="item.href" :class="[route.path === item.href ? 'bg-white/10 text-white' : 'text-indigo-100 hover:bg-white/10 hover:text-white', 'group flex items-center gap-x-3 rounded-md p-3 text-sm font-semibold transition']">
                        <component :is="item.icon" class="size-5 shrink-0" />
                        {{ item.name }}
                      </NuxtLink>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Desktop Sidebar -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-700 px-6 pb-4">
        <div class="flex h-16 items-center gap-3">
          <div class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <ShoppingBagIcon class="w-5 h-5 text-white" />
          </div>
          <span class="text-white font-semibold text-sm">My Store</span>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul class="flex flex-1 flex-col gap-y-7">
            <li>
              <p class="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">Store</p>
              <ul class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink :to="item.href" :class="[route.path.startsWith(item.href) ? 'bg-white/10 text-white' : 'text-indigo-100 hover:bg-white/10 hover:text-white', 'group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold transition']">
                    <component :is="item.icon" class="size-5 shrink-0" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
            <li class="mt-auto">
              <button @click="logout" class="group -mx-2 flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold text-indigo-200 hover:bg-white/10 hover:text-white transition">
                <ArrowRightOnRectangleIcon class="size-5 shrink-0" />
                Sign out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <div class="lg:pl-64">
      <!-- Top Bar -->
      <div class="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
          <Bars3Icon class="size-6" />
        </button>
        <div class="h-6 w-px bg-gray-200 lg:hidden" />

        <div class="flex flex-1 items-center gap-4">
          <!-- Search -->
          <div class="relative hidden sm:block">
            <MagnifyingGlassIcon class="absolute left-3 top-2.5 size-4 text-gray-400" />
            <input type="text" placeholder="Search products..." class="w-56 rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-indigo-500 focus:outline-none" />
          </div>
        </div>

        <!-- Right side -->
        <div class="flex items-center gap-4">
          <!-- Cart icon with count -->
          <NuxtLink to="/customer/cart" class="relative group">
            <ShoppingCartIcon class="size-6 text-gray-600 group-hover:text-indigo-600 transition" />
            <span v-if="cartCount > 0" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {{ cartCount > 9 ? '9+' : cartCount }}
            </span>
          </NuxtLink>

          <!-- User avatar -->
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">{{ userInitials }}</div>
            <span class="hidden lg:block text-sm font-semibold text-gray-900">{{ userName }}</span>
          </div>
        </div>
      </div>

      <!-- Page Content -->
      <main class="py-8">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import {
  Dialog, DialogPanel, TransitionChild, TransitionRoot,
} from '@headlessui/vue';
import {
  Bars3Icon, BellIcon, ShoppingBagIcon, ShoppingCartIcon,
  ClipboardDocumentListIcon, XMarkIcon, ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { useRoute } from 'vue-router';
import { cartService } from '~/api/cart/CartService';

const route = useRoute();
const sidebarOpen = ref(false);
const cartCount = ref(0);
const userName = ref('Customer');
const userInitials = computed(() => {
  const name = userName.value.trim();
  if (!name) return 'U';
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
});

const navigation = [
  { name: 'Shop',        href: '/customer/products', icon: ShoppingBagIcon },
  { name: 'Cart',        href: '/customer/cart',     icon: ShoppingCartIcon },
  { name: 'My Orders',  href: '/customer/orders',   icon: ClipboardDocumentListIcon },
];

const refreshCart = () => {
  cartCount.value = cartService.count();
};

const logout = async () => {
  localStorage.removeItem('_token');
  localStorage.removeItem('_role');
  localStorage.removeItem('_uuid');
  cartService.clear();
  await navigateTo('/');
};

onMounted(() => {
  refreshCart();
  window.addEventListener('cart-updated', refreshCart);
  const storedName = localStorage.getItem('_name') || localStorage.getItem('_role') || 'Customer';
  userName.value = storedName;
});

onUnmounted(() => {
  window.removeEventListener('cart-updated', refreshCart);
});
</script>
