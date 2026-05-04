<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            NEW ARRIVALS
          </p>
          <h1 class="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Shop quality products made for everyday use.
          </h1>
          <p class="mt-5 max-w-xl text-base text-gray-600">
            Browse featured products, discover new items, and enjoy a simple shopping experience.
          </p>
          <div class="mt-8 flex gap-3">
            <NuxtLink to="/shop" class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
              Shop Now
            </NuxtLink>
            <NuxtLink to="/deals" class="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              View Deals
            </NuxtLink>
          </div>
        </div>
        <div class="rounded-2xl bg-gray-200 p-8">
          <div class="aspect-[4/3] rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-16 w-16 text-indigo-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'customer' })
</script>