<!-- layouts/customer.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Horizontal Navigation Bar -->
    <header class="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div class="text-xl font-bold text-gray-900">
          <NuxtLink to="/customer" class="hover:opacity-80 transition-opacity">My Store</NuxtLink>
        </div>
 
        <!-- Main Menu List Array Dynamic Loop -->
        <div class="hidden items-center gap-8 text-sm font-medium md:flex">
          <template v-for="item in navigation" :key="item.name">
            <!-- Clickable Page Link -->
            <NuxtLink 
              v-if="item.isLink" 
              :to="item.href" 
              :class="[route.path === item.href ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600', 'transition-colors flex items-center gap-x-1.5']"
            >
              <component :is="item.icon" class="size-4 shrink-0" aria-hidden="true" />
              {{ item.name }}
            </NuxtLink>

            <!-- Static Text Label -->
            <div 
              v-else 
              class="text-gray-400 select-none cursor-default flex items-center gap-x-1.5"
            >
              <component :is="item.icon" class="size-4 shrink-0 opacity-60" aria-hidden="true" />
              {{ item.name }}
            </div>
          </template>
        </div>
 
        <!-- Active Link Aware Cart Button -->
        <NuxtLink 
          to="/customer/cart" 
          :class="[route.path === '/customer/cart' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50', 'rounded-full border px-4 py-2 text-sm font-medium transition-colors flex items-center gap-x-2']"
        >
          <span>Cart</span>
          <span 
            v-if="cartItemCount > 0" 
            class="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white ring-2 ring-white"
            :class="{ 'bg-white !text-indigo-600': route.path === '/customer/cart' }"
          >
            {{ cartItemCount }}
          </span>
        </NuxtLink>
      </div>
    </header>
 
    <main>
      <!-- Hero Banner Section - Only shows on the main /customer landing page -->
      <section v-if="route.path === '/customer'" class="bg-white border-b border-gray-100">
        <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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
                <button class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
                  Shop Now
                </button>
 
                <button class="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  View Deals
                </button>
              </div>
            </div>
 
            <div class="rounded-2xl bg-gray-200 p-8">
              <div class="aspect-[4/3] rounded-xl bg-gray-300" />
            </div>
          </div>
        </div>
      </section>
 
      <!-- Content Render Window -->
      <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <slot />
      </section>
    </main>
 
    <footer class="border-t border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 My Store. All rights reserved.</p>
 
        <div class="flex gap-6">
          <span class="hover:text-gray-900 cursor-pointer transition-colors">Help</span>
          <span class="hover:text-gray-900 cursor-pointer transition-colors">Contact</span>
          <span class="hover:text-gray-900 cursor-pointer transition-colors">Privacy</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// 1. All imports MUST sit strictly at the very top of the script block
import { useRoute } from 'vue-router'
import { 
  BuildingStorefrontIcon, 
  Squares2X2Icon, 
  ShoppingBagIcon, 
  UserIcon 
} from '@heroicons/vue/24/outline'

// 2. Execution states and hooks run after imports are evaluated
const route = useRoute()
const { cartItemCount } = useCart()

// Clean configuration map array
const navigation = [
  { name: 'Shop', href: '/customer/shop', icon: BuildingStorefrontIcon, isLink: true },
  { name: 'Categories', href: '#', icon: Squares2X2Icon, isLink: false }, // Set to false if page doesn't exist yet to avoid 404s
  { name: 'Orders', href: '/customer/orders', icon: ShoppingBagIcon, isLink: true },
  { name: 'Account', href: '#', icon: UserIcon, isLink: false }, // Set to false if page doesn't exist yet to avoid 404s
]
</script>
