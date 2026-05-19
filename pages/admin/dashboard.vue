<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { orderService } from '~/api/Order/OrderService';

const route = useRoute();
const router = useRouter();

const startDate = ref((route.query.from || route.query.start_date) as string || '');
const endDate = ref((route.query.to || route.query.end_date) as string || '');
const summary = ref<any>(null);
const pending = ref(true);
const error = ref<string | null>(null);

const fetchSummary = async () => {
    pending.value = true;
    error.value = null;
    try {
        summary.value = await orderService.getSummary({
            from: startDate.value || undefined,
            to: endDate.value || undefined
        });
    } catch (err: any) {
        console.error('Failed to fetch summary:', err);
        error.value = err.message || 'Failed to load summary data';
    } finally {
        pending.value = false;
    }
};

onMounted(() => {
    fetchSummary();
});

watch([startDate, endDate], () => {
    router.replace({
        query: {
            ...route.query,
            from: startDate.value || undefined,
            to: endDate.value || undefined
        }
    });
    fetchSummary();
});

const refresh = () => {
    fetchSummary();
};

const clearDateRange = () => {
    startDate.value = '';
    endDate.value = '';
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP'
    }).format(value);
};

const formatDateRange = () => {
    if (!startDate.value && !endDate.value) return 'All Time';
    return `${startDate.value || '...'} - ${endDate.value || '...'}`;
};
</script>

<template>
    <div class="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen font-sans">
  
  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-200">
    <div>
      <h1 class="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
      <p class="text-sm text-slate-500">Monitor your store's sales performance and customer metrics.</p>
    </div>
    
    <div class="flex flex-wrap items-center gap-3">
      <div class="flex flex-wrap items-center gap-3">
        <div class="flex items-center gap-2 bg-white border border-slate-300 rounded-lg px-3 py-1.5 shadow-sm hover:border-slate-400 transition">
          <span class="text-xs font-semibold text-slate-500 uppercase">From:</span>
          <input 
              type="date" 
              v-model="startDate" 
              class="text-sm font-medium text-slate-700 focus:outline-none bg-transparent cursor-pointer"
              title="Start Date"
          />
        </div>
        <div class="flex items-center gap-2 bg-white border border-slate-300 rounded-lg px-3 py-1.5 shadow-sm hover:border-slate-400 transition">
          <span class="text-xs font-semibold text-slate-500 uppercase">To:</span>
          <input 
              type="date" 
              v-model="endDate" 
              class="text-sm font-medium text-slate-700 focus:outline-none bg-transparent cursor-pointer"
              title="End Date"
          />
        </div>
        <button 
            v-if="startDate || endDate" 
            @click="clearDateRange" 
            class="text-xs font-semibold text-red-600 hover:text-red-700 transition px-2 py-1 rounded hover:bg-red-50"
        >
          Clear Date Filter
        </button>
      </div>
      
      <button @click="refresh" class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition">
        <svg xmlns="http://www.w3.org/2000/svg" :class="{'animate-spin': pending}" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        Refresh Data
      </button>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
      <div class="space-y-2">
        <span class="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Revenue</span>
        <div v-if="pending" class="h-9 w-32 bg-slate-100 animate-pulse rounded"></div>
        <div v-else class="text-3xl font-bold text-slate-900">{{ formatCurrency(summary?.total_revenue || 0) }}</div>
        <div class="flex items-center gap-1 text-xs text-slate-400 font-medium">
          <span>Based on orders in this period</span>
        </div>
      </div>
      <div class="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
      <div class="space-y-2">
        <span class="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Customers</span>
        <div v-if="pending" class="h-9 w-20 bg-slate-100 animate-pulse rounded"></div>
        <div v-else class="text-3xl font-bold text-slate-900">{{ summary?.customer_count || 0 }}</div>
        <div class="flex items-center gap-1 text-xs text-slate-400 font-medium">
          <span>Customers who ordered</span>
        </div>
      </div>
      <div class="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    
    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-slate-900">Top 5 Most Purchased Products</h2>
          <span class="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">By Units Sold</span>
        </div>
        
        <div v-if="pending" class="space-y-4">
            <div v-for="i in 5" :key="i" class="h-12 w-full bg-slate-50 animate-pulse rounded"></div>
        </div>
        <div v-else-if="!summary?.top_products?.length" class="py-10 text-center text-slate-400 text-sm">
            No product data available for this period.
        </div>
        <div v-else class="divide-y divide-slate-100">
          <div v-for="(product, index) in summary.top_products" :key="product.uuid" class="flex items-center justify-between py-3">
            <div class="flex items-center gap-3">
              <span class="w-6 text-sm font-bold text-slate-400">#{{ index + 1 }}</span>
              <div>
                <p class="text-sm font-semibold text-slate-800">{{ product.name }}</p>
                <p class="text-xs text-slate-400">Base Price: {{ formatCurrency(product.price) }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-bold text-slate-800">{{ product.total_sold }} sold</p>
              <p class="text-xs text-emerald-600 font-medium">{{ formatCurrency(product.total_revenue) }} revenue</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <div>
        <h2 class="text-lg font-bold text-slate-900 mb-4">Quick Order Summary</h2>
        <div class="space-y-4">
          <div class="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase">Total Orders</p>
              <p class="text-xl font-bold text-slate-800">{{ summary?.total_orders || 0 }}</p>
            </div>
            <span class="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse"></span>
          </div>
          
          <div class="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase">Completed Today</p>
              <p class="text-xl font-bold text-slate-800">-</p>
            </div>
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          </div>

          <div class="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase">Average Order Value</p>
              <p v-if="!summary?.total_revenue" class="text-xl font-bold text-slate-800">-</p>
              <p v-else class="text-xl font-bold text-slate-800">{{ formatCurrency(summary.total_revenue / (summary.customer_count || 1)) }}</p>
            </div>
            <span class="text-xs font-medium text-indigo-600">Avg.</span>
          </div>
        </div>
      </div>
      
      <NuxtLink to="/admin/orders" class="w-full mt-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 px-4 rounded-lg text-sm transition text-center">
        View All Orders
      </NuxtLink>
    </div>

  </div>

  <!-- Recent Customers Section -->
  <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <h2 class="text-lg font-bold text-slate-900 mb-4">Recent Active Customers</h2>
    <div v-if="pending" class="grid grid-cols-1 gap-4">
        <div v-for="i in 3" :key="i" class="h-16 bg-slate-50 animate-pulse rounded-lg"></div>
    </div>
    <div v-else-if="!summary?.customers?.length" class="text-center py-6 text-slate-400 text-sm">
        No active customers found for this period.
    </div>
    <!-- Customer list updated to 1 column -->
    <div v-else class="grid grid-cols-1 gap-4">
        <div v-for="customer in summary.customers" :key="customer.uuid" class="flex items-center gap-3 p-3 rounded-lg border border-slate-50 bg-slate-50/50">
            <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold uppercase">
                {{ customer.name.charAt(0) }}
            </div>
            <div class="min-w-0">
                <p class="text-sm font-semibold text-slate-800 truncate">{{ customer.name }}</p>
                <p class="text-xs text-slate-500 truncate">{{ customer.email }}</p>
            </div>
        </div>
    </div>
  </div>
</div>
</template>