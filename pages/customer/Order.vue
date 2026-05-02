<script setup lang="ts">
definePageMeta({
  layout: 'customer'
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="mb-8">
      <h1 class="text-2xl font-extrabold tracking-tight text-gray-900">My Orders</h1>
      <p class="mt-1 text-sm text-gray-500">Your past and current orders will appear here.</p>
    </div>

    <!-- Empty state placeholder -->
    <div class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white py-20 text-center">
      <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 mb-4">
        <svg class="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <p class="text-base font-semibold text-gray-700">No orders yet</p>
      <p class="mt-1 text-sm text-gray-400">Head to the shop and place your first order!</p>
      <NuxtLink
        to="/customer/shop"
        class="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
      >
        Go to Shop
      </NuxtLink>
    </div>
  </div>
</template>
