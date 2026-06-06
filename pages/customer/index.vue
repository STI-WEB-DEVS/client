<script setup>
definePageMeta({
  layout: 'customer',
})
</script>

<template>
  <section class="grid gap-6 md:grid-cols-3">
    <NuxtLink to="/customer/products" class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow">
      <p class="text-sm font-semibold text-indigo-600">Browse</p>
      <h2 class="mt-2 text-xl font-bold text-gray-900">Available Products</h2>
      <p class="mt-2 text-sm text-gray-600">View all items and add products to your cart.</p>
    </NuxtLink>
    <NuxtLink to="/customer/cart" class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow">
      <p class="text-sm font-semibold text-indigo-600">Checkout</p>
      <h2 class="mt-2 text-xl font-bold text-gray-900">Your Cart</h2>
      <p class="mt-2 text-sm text-gray-600">Review quantities and prepare your order payload.</p>
    </NuxtLink>
    <NuxtLink to="/customer/orders" class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow">
      <p class="text-sm font-semibold text-indigo-600">History</p>
      <h2 class="mt-2 text-xl font-bold text-gray-900">Orders</h2>
      <p class="mt-2 text-sm text-gray-600">Check your order area.</p>
    </NuxtLink>
  </section>
</template>
