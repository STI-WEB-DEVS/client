<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Dashboard Analytics</h1>

      <!-- Date Range Filter -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Filter by Date Range</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="startDate" class="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              id="startDate"
              v-model="startDate"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label for="endDate" class="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              id="endDate"
              v-model="endDate"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div class="flex items-end gap-2">
            <button
              @click="fetchAnalytics"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              :disabled="loading"
            >
              {{ loading ? 'Loading...' : 'Filter' }}
            </button>
            <button
              @click="resetFilters"
              class="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Analytics Cards -->
      <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Total Revenue Card -->
        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">
                ${{ formatCurrency(analytics.total_revenue) }}
              </p>
            </div>
            <div class="text-4xl text-green-500">📊</div>
          </div>
        </div>

        <!-- Total Customers Card -->
        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Total Customers</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">
                {{ analytics.total_customers }}
              </p>
            </div>
            <div class="text-4xl text-blue-500">👥</div>
          </div>
        </div>

        <!-- Top Product Card -->
        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Top Product Sales</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">
                {{ topProductSales }}
              </p>
              <p v-if="topProduct" class="text-gray-600 text-sm mt-2">
                {{ topProduct.name }}
              </p>
            </div>
            <div class="text-4xl text-purple-500">🏆</div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p class="text-gray-600 mt-4">Loading analytics...</p>
        </div>
      </div>

      <!-- Top Products Table -->
      <div v-if="!loading && analytics.top_products.length > 0" class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-2xl font-semibold text-gray-800">Top 10 Products</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total Quantity Sold</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total Orders</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in analytics.top_products" :key="product.uuid" class="border-b border-gray-200 hover:bg-gray-50">
                <td class="px-6 py-4 text-sm text-gray-900">
                  <span class="font-semibold">{{ index + 1 }}.</span> {{ product.name }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ product.total_quantity }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ product.total_orders }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mt-8">
        <p class="text-red-700 font-semibold">Error loading analytics</p>
        <p class="text-red-600 text-sm mt-1">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import DashboardService from '~/api/dashboard/DashboardService';
import { useOrderStore } from '~/stores/orderEvents';

interface Analytics {
  total_revenue: number;
  total_customers: number;
  top_products: Array<{
    uuid: string;
    name: string;
    total_quantity: number;
    total_orders: number;
  }>;
}

const startDate = ref<string>('');
const endDate = ref<string>('');
const analytics = ref<Analytics>({
  total_revenue: 0,
  total_customers: 0,
  top_products: [],
});
const loading = ref<boolean>(false);
const error = ref<string>('');
const orderStore = useOrderStore();

let orderRefreshTimeout: NodeJS.Timeout | null = null;

const topProduct = computed(() => analytics.value.top_products[0] || null);
const topProductSales = computed(() => topProduct.value?.total_quantity || 0);

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const fetchAnalytics = async () => {
  loading.value = true;
  error.value = '';
  try {
    analytics.value = await DashboardService.getAnalytics(startDate.value || undefined, endDate.value || undefined);
  } catch (err: any) {
    error.value = err.message || 'Failed to load analytics';
    console.error('Analytics error:', err);
  } finally {
    loading.value = false;
  }
};

const resetFilters = () => {
  startDate.value = '';
  endDate.value = '';
  fetchAnalytics();
};

// Watch for order completion events
watch(
  () => orderStore.orderCompleted,
  () => {
    // Wait 1 second after order is placed, then fetch new data
    if (orderRefreshTimeout) {
      clearTimeout(orderRefreshTimeout);
    }
    orderRefreshTimeout = setTimeout(() => {
      fetchAnalytics();
    }, 1000);
  }
);

onMounted(() => {
  fetchAnalytics();
});

onUnmounted(() => {
  if (orderRefreshTimeout) {
    clearTimeout(orderRefreshTimeout);
  }
});
</script>