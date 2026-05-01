<script setup lang="ts">
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { useCart } from '~/composables/useCart'

const { cartCount } = useCart()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div class="text-xl font-bold text-gray-900">
          <NuxtLink to="/customer/shop">My Store</NuxtLink>
        </div>
        <div class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          <NuxtLink to="/customer/shop" class="hover:text-indigo-600 transition">Shop</NuxtLink>
          <span class="cursor-pointer hover:text-indigo-600 transition">Categories</span>
          <NuxtLink to="/customer/order" class="hover:text-indigo-600 transition">Orders</NuxtLink>
          <span class="cursor-pointer hover:text-indigo-600 transition">Account</span>
        </div>
        <NuxtLink to="/customer/cart" class="group flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
          <ShoppingCartIcon class="mr-2 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
          Cart
          <span v-if="cartCount > 0" class="ml-2 rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white">
            {{ cartCount }}
          </span>
        </NuxtLink>
      </div>
    </header>

    <main>
      <section v-if="$route.path === '/customer/shop'" class="bg-white border-b border-gray-100">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p class="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                New arrivals
              </p>
              <h1 class="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                Shop quality products made for everyday use.
              </h1>
              <p class="mt-6 max-w-xl text-lg text-gray-600 leading-relaxed">
                Browse featured products, discover new items, and enjoy a simple and premium shopping experience.
              </p>
              <div class="mt-10 flex gap-4">
                <button class="rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-indigo-500 transition-all hover:scale-105">
                  Shop Now
                </button>
                <button class="rounded-xl border border-gray-300 px-8 py-4 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                  View Deals
                </button>
              </div>
            </div>
            <div class="relative rounded-3xl bg-indigo-50 p-8 overflow-hidden aspect-square lg:aspect-auto lg:h-[500px]">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-700" alt="Hero image" />
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <slot />
      </section>
    </main>

    <footer class="border-t border-gray-200 bg-white">
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