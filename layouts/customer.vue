<!-- layouts/customer.vue -->
<template>
  <div class="min-h-screen bg-gray-50">

    <header class="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div class="text-lg font-semibold tracking-tight text-gray-900">
          My Store
        </div>

        <nav class="hidden items-center gap-6 md:flex">
          <span class="cursor-pointer border-b-2 border-transparent py-1 text-sm font-medium text-gray-500 transition hover:border-gray-900 hover:text-gray-900">Shop</span>
          <span class="cursor-pointer border-b-2 border-transparent py-1 text-sm font-medium text-gray-500 transition hover:border-gray-900 hover:text-gray-900">Categories</span>
          <span class="cursor-pointer border-b-2 border-transparent py-1 text-sm font-medium text-gray-500 transition hover:border-gray-900 hover:text-gray-900">Orders</span>
          <span class="cursor-pointer border-b-2 border-transparent py-1 text-sm font-medium text-gray-500 transition hover:border-gray-900 hover:text-gray-900">Account</span>
        </nav>

        <button class="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-95">
          <ShoppingBagIcon class="h-4 w-4" />
          Cart
          <span class="rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-medium text-white">3</span>
        </button>
      </div>
    </header>

    <main>
      <section class="bg-white">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p class="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                New arrivals
              </p>
              <h1 class="mt-3 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Shop quality products made for everyday use.
              </h1>
              <p class="mt-5 max-w-xl text-base leading-relaxed text-gray-500">
                Browse featured products, discover new items, and enjoy a simple shopping experience.
              </p>
              <div class="mt-8 flex gap-3">
                <button class="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-95">
                  Shop Now
                </button>
                <button class="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-95">
                  View Deals
                </button>
              </div>
            </div>

            <div class="rounded-2xl bg-gray-100 p-8">
              <div class="aspect-[4/3] rounded-xl bg-gray-200" />
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <slot />
      </section>
    </main>

    <footer class="border-t border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 My Store. All rights reserved.</p>
        <div class="flex gap-6">
          <span class="cursor-pointer transition hover:text-gray-700">Help</span>
          <span class="cursor-pointer transition hover:text-gray-700">Contact</span>
          <span class="cursor-pointer transition hover:text-gray-700">Privacy</span>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'
</script>