<script setup>
import { ref } from 'vue';
import { TagIcon } from '@heroicons/vue/24/outline';

definePageMeta({
  layout: 'customer'
});

// Placeholder for categories - will be populated when API integration is added
const categories = ref([]);
const loading = ref(false);
</script>

<template>
  <div class="py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Categories</h1>
      <p class="mt-2 text-sm text-gray-600">Browse products by category</p>
    </div>

    <!-- Empty State -->
    <div class="text-center py-16 bg-white rounded-lg border border-gray-200">
      <TagIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-4 text-lg font-medium text-gray-900">No categories available</h3>
      <p class="mt-2 text-sm text-gray-500">Categories will be displayed here once they are added.</p>
      <NuxtLink 
        to="/customer/shop"
        class="mt-6 inline-block rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Browse All Products
      </NuxtLink>
    </div>
  </div>
</template>
