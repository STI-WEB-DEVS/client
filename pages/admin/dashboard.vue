<template>
  <div class="space-y-8 p-4">
    <!-- Header mirroring Video -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Analytics Pro</h1>
        <p class="mt-1 text-sm text-gray-500 font-medium">
          Real-time performance insights and revenue tracking.
        </p>
      </div>

      <!-- Date Filters mirroring Video -->
      <div class="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
        <div class="flex items-center gap-2 px-2">
          <CalendarIcon class="h-4 w-4 text-gray-400" />
          <input
            v-model="filters.from"
            type="date"
            class="border-none p-0 text-sm focus:ring-0 text-gray-600 font-semibold"
          />
          <span class="text-gray-300">—</span>
          <input
            v-model="filters.to"
            type="date"
            class="border-none p-0 text-sm focus:ring-0 text-gray-600 font-semibold"
          />
        </div>
        <button
          @click="fetchDashboardData"
          class="rounded-xl bg-gray-900 p-2 text-white hover:bg-gray-800 transition"
        >
          <ArrowPathIcon class="h-4 w-4" :class="{ 'animate-spin': pending }" />
        </button>
      </div>
    </div>

    <!-- Main Stats Grid -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <!-- Revenue Card -->
      <div class="group relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-200/50 transition-all hover:shadow-indigo-100/50">
        <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-50/50 transition-transform group-hover:scale-110"></div>
        <div class="relative">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <CurrencyDollarIcon class="h-6 w-6" />
          </div>
          <p class="mt-6 text-sm font-bold uppercase tracking-widest text-gray-400">Total Revenue</p>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-4xl font-black text-gray-900">
              ₱{{ formatCurrency(summaryData?.total_revenue) }}
            </span>
          </div>
          <div class="mt-6 flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 w-fit px-3 py-1 rounded-full">
            <div class="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse"></div>
            LIFETIME EARNINGS
          </div>
        </div>
      </div>

      <!-- Active Customers Card -->
      <div class="group relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-200/50 transition-all hover:shadow-emerald-100/50">
        <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-50/50 transition-transform group-hover:scale-110"></div>
        <div class="relative">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-200">
            <UserGroupIcon class="h-6 w-6" />
          </div>
          <p class="mt-6 text-sm font-bold uppercase tracking-widest text-gray-400">Total Reach</p>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-4xl font-black text-gray-900">
              {{ summaryData?.unique_customers || 0 }}
            </span>
            <span class="text-sm font-bold text-gray-400">Customers</span>
          </div>
          <div class="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 w-fit px-3 py-1 rounded-full">
            <div class="h-1.5 w-1.5 rounded-full bg-emerald-600"></div>
            ACTIVE ORDERING
          </div>
        </div>
      </div>

      <!-- Best Seller Card -->
      <div class="group relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-200/50 transition-all hover:shadow-amber-100/50">
        <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-50/50 transition-transform group-hover:scale-110"></div>
        <div class="relative">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-200">
            <ShoppingBagIcon class="h-6 w-6" />
          </div>
          <p class="mt-6 text-sm font-bold uppercase tracking-widest text-gray-400">Top Performer</p>
          <div class="mt-2">
            <p class="text-xl font-black text-gray-900 truncate">
              {{ summaryData?.top_products?.[0]?.name || 'N/A' }}
            </p>
            <p class="text-sm font-bold text-amber-600">
              {{ summaryData?.top_products?.[0]?.total_quantity || 0 }} Units Sold
            </p>
          </div>
          <div class="mt-6 flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 w-fit px-3 py-1 rounded-full">
            <div class="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
            BEST SELLER
          </div>
        </div>
      </div>
    </div>

    <!-- Performance Matrix mirroring Video -->
    <div class="rounded-[2rem] border border-gray-100 bg-white shadow-2xl shadow-gray-200/50 overflow-hidden">
      <div class="border-b border-gray-50 bg-gray-50/30 px-8 py-6 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-black text-gray-900 uppercase tracking-tighter">Top Performance Matrix</h2>
          <p class="text-xs font-bold text-gray-400">PRODUCT SALES RANKING</p>
        </div>
        <ChartBarIcon class="h-6 w-6 text-gray-300" />
      </div>
      
      <div class="px-4 pb-4">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Rank</th>
              <th class="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
              <th class="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Sales Volume</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="(item, index) in summaryData?.top_products" :key="index" class="group hover:bg-gray-50/50 transition-all">
              <td class="px-6 py-5 whitespace-nowrap">
                <div 
                  class="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black shadow-sm"
                  :class="[
                    index === 0 ? 'bg-amber-100 text-amber-700' : 
                    index === 1 ? 'bg-slate-100 text-slate-700' : 
                    index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-400'
                  ]"
                >
                  {{ String(Number(index) + 1).padStart(2, '0') }}
                </div>
              </td>
              <td class="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-800">
                {{ item.name }}
              </td>
              <td class="px-6 py-5 whitespace-nowrap text-right">
                <span class="text-sm font-black text-gray-900">{{ item.total_quantity }}</span>
                <span class="ml-1 text-[10px] font-bold text-gray-400 uppercase">Units</span>
              </td>
            </tr>
            <tr v-if="!summaryData?.top_products?.length">
              <td colspan="3" class="px-6 py-20 text-center">
                <div class="flex flex-col items-center gap-2">
                  <div class="text-4xl">📊</div>
                  <p class="text-sm font-bold text-gray-400">No data available for this range</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  ShoppingBagIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline';
import { orderService } from '~/api/order/OrderService';

const summaryData = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

const filters = ref({
  from: new Date().toISOString().split('T')[0],
  to: new Date().toISOString().split('T')[0]
});

const formatCurrency = (val: any) => {
  return Number(val || 0).toLocaleString('en-PH', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  });
};

const fetchDashboardData = async () => {
  pending.value = true;
  error.value = null;
  try {
    const params: any = {};
    if (filters.value.from) params.from = filters.value.from;
    if (filters.value.to) params.to = filters.value.to;
    
    summaryData.value = await orderService.summary(params);
  } catch (err: any) {
    error.value = err;
    console.error('Failed to fetch dashboard data:', err);
  } finally {
    pending.value = false;
  }
};

onMounted(fetchDashboardData);
</script>
