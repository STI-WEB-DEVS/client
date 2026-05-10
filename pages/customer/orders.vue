<script setup>
import { ref } from 'vue';
import { ShoppingBagIcon, ClockIcon, CheckCircleIcon } from '@heroicons/vue/24/outline';

definePageMeta({
  layout: 'customer'
});

// Placeholder for orders - will be populated when API integration is added
const orders = ref([]);
const loading = ref(false);
</script>

<template>
  <div class="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Header Section -->
    <div class="mb-12">
      <div class="flex items-center gap-3 mb-3">
        <div class="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-cyan-900 bg-clip-text text-transparent">
          My Orders
        </h1>
      </div>
      <p class="text-lg text-gray-600 ml-15">View and track your order history</p>
    </div>

    <!-- Empty State -->
    <div class="text-center py-20">
      <div class="relative inline-flex items-center justify-center w-32 h-32 mb-6">
        <!-- Animated circles -->
        <div class="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 animate-pulse"></div>
        <div class="absolute inset-4 rounded-full bg-gradient-to-br from-blue-200 to-cyan-200 animate-pulse" style="animation-delay: 0.2s"></div>
        <ShoppingBagIcon class="relative h-16 w-16 text-blue-600" />
      </div>
      
      <h3 class="text-2xl font-bold text-gray-900 mb-3">No orders yet</h3>
      <p class="text-gray-500 mb-8 max-w-md mx-auto">
        Start shopping to see your orders here. Your purchase history will be displayed once you place your first order.
      </p>
      
      <!-- Features -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
          <ClockIcon class="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h4 class="font-bold text-gray-900 mb-1">Track Orders</h4>
          <p class="text-sm text-gray-600">Real-time order tracking</p>
        </div>
        <div class="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 border-2 border-cyan-100">
          <CheckCircleIcon class="h-8 w-8 text-cyan-600 mx-auto mb-3" />
          <h4 class="font-bold text-gray-900 mb-1">Order History</h4>
          <p class="text-sm text-gray-600">View past purchases</p>
        </div>
        <div class="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border-2 border-teal-100">
          <ShoppingBagIcon class="h-8 w-8 text-teal-600 mx-auto mb-3" />
          <h4 class="font-bold text-gray-900 mb-1">Easy Reorder</h4>
          <p class="text-sm text-gray-600">Buy again with one click</p>
        </div>
      </div>

      <NuxtLink 
        to="/customer/shop"
        class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 text-base font-bold text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        <ShoppingBagIcon class="h-5 w-5" />
        Start Shopping
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
