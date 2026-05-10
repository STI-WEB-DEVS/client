<script setup>
import { ref } from 'vue';
import { TagIcon, SparklesIcon } from '@heroicons/vue/24/outline';

definePageMeta({
  layout: 'customer'
});

// Placeholder for categories - will be populated when API integration is added
const categories = ref([]);
const loading = ref(false);
</script>

<template>
  <div class="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Header Section -->
    <div class="mb-12">
      <div class="flex items-center gap-3 mb-3">
        <div class="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
          Categories
        </h1>
      </div>
      <p class="text-lg text-gray-600 ml-15">Browse products by category</p>
    </div>

    <!-- Empty State -->
    <div class="text-center py-20">
      <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 mb-6 relative">
        <TagIcon class="h-12 w-12 text-purple-500" />
        <SparklesIcon class="h-6 w-6 text-pink-500 absolute -top-1 -right-1 animate-pulse" />
      </div>
      <h3 class="text-2xl font-bold text-gray-900 mb-3">No categories available yet</h3>
      <p class="text-gray-500 mb-8 max-w-md mx-auto">
        Categories will be displayed here once they are added. In the meantime, explore all our products!
      </p>
      <NuxtLink 
        to="/customer/shop"
        class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-base font-bold text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        <ShoppingBagIcon class="h-5 w-5" />
        Browse All Products
      </NuxtLink>
    </div>
  </div>
</template>
