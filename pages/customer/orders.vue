<script setup>
import { ref, onMounted } from 'vue';
import { ShoppingBagIcon, ClockIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline';
import { customerService } from '~/api/customer/CustomerService';

definePageMeta({
  layout: 'customer'
});

const orders = ref([]);
const loading = ref(true);
const error = ref(null);
const expandedOrders = ref(new Set());

onMounted(async () => {
  try {
    // Get customer UUID from localStorage
    const customerUuid = localStorage.getItem('customer_uuid') || localStorage.getItem('uuid');
    
    if (!customerUuid) {
      error.value = 'Customer not found. Please log in again.';
      loading.value = false;
      return;
    }

    const response = await customerService.getOrders(customerUuid);
    orders.value = response.orders || [];
  } catch (err) {
    console.error('Failed to fetch orders:', err);
    error.value = err.message || 'Failed to load orders';
  } finally {
    loading.value = false;
  }
});

const toggleOrderDetails = (orderUuid) => {
  if (expandedOrders.value.has(orderUuid)) {
    expandedOrders.value.delete(orderUuid);
  } else {
    expandedOrders.value.add(orderUuid);
  }
};

const isExpanded = (orderUuid) => {
  return expandedOrders.value.has(orderUuid);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
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

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="relative">
        <div class="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
        <ShoppingBagIcon class="h-8 w-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p class="mt-4 text-gray-500 font-medium">Loading your orders...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-pink-50 p-8 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <svg class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-red-900 mb-2">Failed to load orders</h3>
      <p class="text-red-700">{{ error }}</p>
    </div>

    <!-- Orders List -->
    <div v-else-if="orders.length > 0" class="space-y-6">
      <div 
        v-for="order in orders" 
        :key="order.uuid"
        class="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-200"
      >
        <!-- Order Header -->
        <div 
          @click="toggleOrderDetails(order.uuid)"
          class="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-2">
                <h3 class="text-lg font-bold text-gray-900">
                  Order #{{ order.uuid.substring(0, 8).toUpperCase() }}
                </h3>
                <span class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  <CheckCircleIcon class="h-3 w-3 mr-1" />
                  Completed
                </span>
              </div>
              <div class="flex items-center gap-6 text-sm text-gray-600">
                <div class="flex items-center gap-1">
                  <ClockIcon class="h-4 w-4" />
                  {{ formatDate(order.created_at) }}
                </div>
                <div class="flex items-center gap-1">
                  <ShoppingBagIcon class="h-4 w-4" />
                  {{ order.items.length }} item{{ order.items.length !== 1 ? 's' : '' }}
                </div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="text-right">
                <p class="text-sm text-gray-500">Total Amount</p>
                <p class="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  ₱{{ parseFloat(order.total_amount).toFixed(2) }}
                </p>
              </div>
              <ChevronDownIcon 
                :class="['h-6 w-6 text-gray-400 transition-transform', isExpanded(order.uuid) ? 'rotate-180' : '']"
              />
            </div>
          </div>
        </div>

        <!-- Order Details (Expandable) -->
        <div 
          v-if="isExpanded(order.uuid)"
          class="border-t-2 border-gray-100 bg-gradient-to-br from-gray-50 to-blue-50 p-6"
        >
          <h4 class="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">Order Items</h4>
          <div class="space-y-3">
            <div 
              v-for="item in order.items" 
              :key="item.product_uuid"
              class="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-200"
            >
              <div class="flex items-center gap-4">
                <div class="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <span class="text-xl font-black text-blue-600">
                    {{ item.product_name.substring(0, 2).toUpperCase() }}
                  </span>
                </div>
                <div>
                  <h5 class="font-semibold text-gray-900">{{ item.product_name }}</h5>
                  <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-500">₱{{ parseFloat(item.unit_price).toFixed(2) }} each</p>
                <p class="text-lg font-bold text-gray-900">₱{{ parseFloat(item.subtotal).toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20">
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
