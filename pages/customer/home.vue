<script setup>
definePageMeta({
  layout: 'customer'
})
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <!-- Hero Greeting -->
    <div class="mb-16 text-center">
      <p class="text-sm font-semibold uppercase tracking-widest text-indigo-600">Welcome back 👋</p>
      <h1 class="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        What would you like to do?
      </h1>
      <p class="mx-auto mt-4 max-w-xl text-base text-gray-500">
        Browse our latest products or review your cart before checking out.
      </p>
    </div>

    <!-- Two Option Cards -->
    <div class="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
      <!-- Want to Shop -->
      <NuxtLink
        to="/customer/shop"
        class="group relative flex flex-col items-center gap-5 rounded-2xl border border-gray-200 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl"
      >
        <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 text-4xl transition-transform duration-300 group-hover:scale-110">
          🛒
        </div>
        <div class="text-center">
          <h2 class="text-xl font-bold text-gray-900">Want to Shop?</h2>
          <p class="mt-2 text-sm text-gray-500">Browse products, add to cart, and discover great deals.</p>
        </div>
        <span class="mt-auto inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-indigo-700">
          Shop Now
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-4 w-4 transition-transform group-hover:translate-x-0.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </NuxtLink>

      <!-- Want to Check Cart -->
      <NuxtLink
        to="/customer/cart"
        class="group relative flex flex-col items-center gap-5 rounded-2xl border border-gray-200 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl"
      >
        <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-50 text-4xl transition-transform duration-300 group-hover:scale-110">
          📦
        </div>
        <div class="text-center">
          <h2 class="text-xl font-bold text-gray-900">Want to Check Cart?</h2>
          <p class="mt-2 text-sm text-gray-500">Review items, modify quantities, and proceed to checkout.</p>
        </div>
        <span class="mt-auto inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors group-hover:border-amber-400 group-hover:text-amber-700">
          View Cart
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-4 w-4 transition-transform group-hover:translate-x-0.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </NuxtLink>
    </div>
  </section>
</template>
