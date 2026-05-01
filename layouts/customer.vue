<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NuxtLink to="/customer" class="text-xl font-bold text-gray-900 cursor-pointer">
          My Store
        </NuxtLink>

        <nav class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          <NuxtLink to="/customer/shop">Shop</NuxtLink>
          <NuxtLink to="#">Categories</NuxtLink>
          <NuxtLink to="/customer/order">Orders</NuxtLink>
          <NuxtLink to="#">Account</NuxtLink>
        </nav>

        <NuxtLink to="/customer/cart" class="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
          Cart
        </NuxtLink>
      </div>
    </header>

    <main class="flex-1 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <slot />
    </main>

    <footer class="border-t border-gray-200 bg-white">
      <div
        class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
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

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>