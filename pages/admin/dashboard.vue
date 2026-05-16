<template>
  <div class="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
    <!-- Header & Date Filter -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div>
        <div class="flex items-center gap-2">
           <h1 class="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
           <span class="flex h-2 w-2 rounded-full bg-green-500 animate-pulse mt-1" title="Live Data"></span>
        </div>
        <p class="text-gray-500 text-sm mt-1 italic">Updating in real-time (every 30s)</p>
      </div>
      
      <div class="flex items-center gap-3">
        <div class="flex flex-col">
          <label class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">From</label>
          <input 
            type="date" 
            v-model="filters.from" 
            @change="fetchSummary"
            class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">To</label>
          <input 
            type="date" 
            v-model="filters.to" 
            @change="fetchSummary"
            class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
          />
        </div>
        <button 
          @click="fetchSummary" 
          class="mt-5 p-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
          title="Refresh Now"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" :class="{ 'animate-spin': loading }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Revenue Card -->
      <div class="bg-gradient-to-br from-indigo-600 to-indigo-700 p-8 rounded-3xl shadow-lg shadow-indigo-100 text-white relative overflow-hidden group">
        <div class="relative z-10">
          <p class="text-indigo-100 font-medium uppercase tracking-wider text-xs flex items-center gap-2">
            Total Revenue
          </p>
          <h2 class="text-5xl font-extrabold mt-3 flex items-baseline tracking-tight">
            <span class="text-2xl mr-1 font-medium">₱</span>
            {{ formatNumber(summary.total_revenue) }}
          </h2>
          <div class="mt-6 flex items-center text-sm">
            <span class="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full font-medium">
              Live updates active
            </span>
          </div>
        </div>
        <!-- Decorative Elements -->
        <div class="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
        <div class="absolute left-1/2 bottom-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>
      </div>

      <!-- Customers Card -->
      <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
        <div class="relative z-10">
          <p class="text-gray-500 font-medium uppercase tracking-wider text-xs">Total Customers</p>
          <h2 class="text-5xl font-extrabold mt-3 text-gray-900 tracking-tight">
            {{ summary.customer_count }}
          </h2>
          <div class="mt-6 flex items-center text-sm text-gray-400 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1.5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            Verified Unique Customers
          </div>
        </div>
        <!-- Decorative Icon -->
        <div class="absolute right-8 bottom-8 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-500 scale-110 group-hover:rotate-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Top Products -->
    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-50 flex items-center justify-between">
        <h3 class="text-lg font-bold text-gray-900">Top 5 Most Purchased Products</h3>
        <div class="flex items-center gap-2">
           <span class="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full uppercase tracking-wider">Top Sellers</span>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50/50">
            <tr>
              <th class="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product Ranking</th>
              <th class="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Units Sold</th>
              <th class="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Market Share</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="(product, index) in summary.top_products" :key="index" class="hover:bg-gray-50/80 transition-all duration-300">
              <td class="px-6 py-5">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-sm font-bold text-gray-400 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors">
                    #{{ index + 1 }}
                  </div>
                  <span class="font-bold text-gray-800 text-base">{{ product.name }}</span>
                </div>
              </td>
              <td class="px-6 py-5 text-right">
                <span class="font-black text-gray-900 text-lg">{{ product.total_quantity }}</span>
                <span class="text-xs text-gray-400 ml-1 font-medium">pcs</span>
              </td>
              <td class="px-6 py-5 text-right">
                <div class="flex items-center justify-end gap-3">
                   <div class="w-32 bg-gray-100 h-2 rounded-full overflow-hidden">
                     <div 
                       class="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out" 
                       :style="{ width: getPercentage(product.total_quantity) + '%' }"
                     ></div>
                   </div>
                   <span class="text-sm font-black text-indigo-600 min-w-[3rem]">{{ getPercentage(product.total_quantity) }}%</span>
                </div>
              </td>
            </tr>
            <tr v-if="summary.top_products.length === 0">
              <td colspan="3" class="px-6 py-16 text-center">
                <div class="flex flex-col items-center gap-3 grayscale opacity-40">
                   <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                   </svg>
                   <p class="text-gray-500 font-medium italic">No sales data found for this period</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const refreshInterval = ref(null)

const filters = ref({
  from: new Date().toISOString().split('T')[0], // Default to Today
  to: new Date().toISOString().split('T')[0]     // Default to Today
})

const summary = ref({
  total_revenue: 0,
  customer_count: 0,
  top_products: []
})

const loading = ref(false)

const fetchSummary = async () => {
  loading.value = true
  try {
    const data = await $fetch(`${config.public.apiBaseURL}/order/summary`, {
      params: {
        from: filters.value.from,
        to: filters.value.to
      }
    })
    summary.value = data
  } catch (err) {
    console.error('Failed to fetch summary:', err)
  } finally {
    loading.value = false
  }
}

const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num || 0)
}

const getPercentage = (qty) => {
  const total = summary.value.top_products.reduce((acc, p) => acc + p.total_quantity, 0)
  if (total === 0) return 0
  return Math.round((qty / total) * 100)
}

onMounted(() => {
  fetchSummary()
  // Set up auto-refresh every 30 seconds for "real-time" feel
  refreshInterval.value = setInterval(() => {
    fetchSummary()
  }, 5000)
})

onUnmounted(() => {
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value)
  }
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
e>