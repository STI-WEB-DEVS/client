<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">Order Summary</h1>
        <p class="mt-1 text-sm text-gray-500">
          Analytics and revenue overview for your business.
        </p>
      </div>

      <!-- Date Filters -->
      <div class="flex flex-wrap items-center gap-3">
        <div class="flex items-center gap-2">
          <label for="from" class="text-xs font-semibold uppercase text-gray-400">From</label>
          <input
            id="from"
            v-model="filters.from"
            type="date"
            class="block w-full rounded-lg border-gray-200 text-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div class="flex items-center gap-2">
          <label for="to" class="text-xs font-semibold uppercase text-gray-400">To</label>
          <input
            id="to"
            v-model="filters.to"
            type="date"
            class="block w-full rounded-lg border-gray-200 text-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <button
          @click="fetchSummary"
          class="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Update
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center py-20">
      <div class="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <p class="text-sm font-medium text-red-700">{{ error.message || 'Failed to load summary' }}</p>
    </div>

    <div v-else class="space-y-8">
      <!-- Stats Grid -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Revenue Card -->
        <div class="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-indigo-50 opacity-50"></div>
          <p class="text-sm font-medium text-gray-500">Total Revenue</p>
          <p class="mt-2 text-3xl font-bold text-gray-900">
            ₱{{ Number(summaryData?.total_revenue || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
          </p>
          <div class="mt-4 flex items-center text-sm text-green-600 font-medium">
            <ChartBarIcon class="mr-1.5 h-4 w-4" />
            <span>Lifetime Earnings</span>
          </div>
        </div>

        <!-- Customers Card -->
        <div class="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-50 opacity-50"></div>
          <p class="text-sm font-medium text-gray-500">Active Customers</p>
          <p class="mt-2 text-3xl font-bold text-gray-900">
            {{ summaryData?.unique_customers || 0 }}
          </p>
          <div class="mt-4 flex items-center text-sm text-emerald-600 font-medium">
            <UserGroupIcon class="mr-1.5 h-4 w-4" />
            <span>Who placed orders</span>
          </div>
        </div>

        <!-- Average Order Card (Calculated) -->
        <div class="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-purple-50 opacity-50"></div>
          <p class="text-sm font-medium text-gray-500">Avg. Revenue / Customer</p>
          <p class="mt-2 text-3xl font-bold text-gray-900">
             ₱{{ (summaryData?.total_revenue / (summaryData?.unique_customers || 1)).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}
          </p>
          <div class="mt-4 flex items-center text-sm text-purple-600 font-medium">
            <CurrencyDollarIcon class="mr-1.5 h-4 w-4" />
            <span>Customer Value</span>
          </div>
        </div>
      </div>

      <!-- Top Products Section -->
      <div class="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <h2 class="text-lg font-semibold text-gray-900">Top 5 Most Purchased Products</h2>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr class="bg-gray-50/50">
                <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Rank</th>
                <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Product Name</th>
                <th class="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">Quantity Sold</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 bg-white">
              <tr v-for="(item, index) in summaryData?.top_products" :key="index" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <span 
                      class="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                      :class="[
                        index === 0 ? 'bg-amber-100 text-amber-700' : 
                        index === 1 ? 'bg-slate-100 text-slate-700' : 
                        index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
                      ]"
                    >
                      {{ index + 1 }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ item.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-700">
                  {{ item.total_quantity }}
                </td>
              </tr>
              <tr v-if="!summaryData?.top_products?.length">
                <td colspan="3" class="px-6 py-12 text-center text-sm text-gray-500">
                  No purchase data available for this period.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  ShoppingBagIcon
} from '@heroicons/vue/24/outline';
import { orderService } from '~/api/order/OrderService';

const summaryData = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

const filters = ref({
  from: '',
  to: ''
});

const fetchSummary = async () => {
  pending.value = true;
  error.value = null;
  try {
    const params: any = {};
    if (filters.value.from) params.from = filters.value.from;
    if (filters.value.to) params.to = filters.value.to;
    
    summaryData.value = await orderService.summary(params);
  } catch (err: any) {
    error.value = err;
    console.error('Failed to fetch summary:', err);
  } finally {
    pending.value = false;
  }
};

onMounted(fetchSummary);
</script>
