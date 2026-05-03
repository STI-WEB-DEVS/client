<script setup>
definePageMeta({
  layout: 'customer',
  role: 'customer'
})

// Mock data for your categories - you can later fetch this from your Laravel backend
const categories = [
  { id: 1, name: 'Electronics', description: 'Gadgets, computers, and more.', icon: '⚡' },
  { id: 2, name: 'Clothing', description: 'Trendy outfits for all seasons.', icon: '👕' },
  { id: 3, name: 'Home & Garden', description: 'Furniture and decor for your home.', icon: '🏠' },
  { id: 4, name: 'Accessories', description: 'Bags, watches, and jewelry.', icon: '⌚' }
]
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <header class="mb-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Product Categories</h1>
      <p class="mt-2 text-gray-600">Browse our collection by department.</p>
    </header>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div 
        v-for="category in categories" 
        :key="category.id"
        class="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-indigo-300"
      >
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
          {{ category.icon }}
        </div>
        <h3 class="text-lg font-bold text-gray-900 group-hover:text-indigo-600">
          <NuxtLink :to="`/customer/shop?category=${category.id}`">
            <span class="absolute inset-0" />
            {{ category.name }}
          </NuxtLink>
        </h3>
        <p class="mt-2 text-sm text-gray-500">{{ category.description }}</p>
      </div>
    </div>
  </div>
</template>