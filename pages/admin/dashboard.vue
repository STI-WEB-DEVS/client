<template>
  <div class="min-h-screen bg-[#f8fafc] p-4 md:p-8 relative overflow-hidden font-sans text-slate-900">
    <!-- Animated Background Shapes -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[120px] animate-float"></div>
      <div class="absolute top-[60%] -right-[5%] w-[35%] h-[35%] bg-blue-100/40 rounded-full blur-[100px] animate-float-delayed"></div>
    </div>

    <div class="max-w-7xl mx-auto space-y-8 relative z-10 animate-fade-in">
      <!-- Premium Header Section -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div class="space-y-1">
          <div class="flex items-center gap-3">
            <div class="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h1 class="text-3xl font-black tracking-tight text-slate-900">Analytics <span class="text-indigo-600">Pro</span></h1>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <div class="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-100 rounded-full">
              <span class="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span class="text-[10px] font-bold text-green-700 uppercase tracking-widest">Live Engine</span>
            </div>
            <p class="text-slate-400 text-xs font-medium uppercase tracking-tighter">Syncing every 5 seconds</p>
          </div>
        </div>

        <!-- Glass Filter Control -->
        <div class="flex flex-wrap items-end gap-4 p-2 bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl shadow-slate-200/50">
          <div class="flex flex-col px-4 py-2">
            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Date Range Start</label>
            <input 
              type="date" 
              v-model="filters.from" 
              @change="fetchSummary"
              class="bg-transparent border-none text-slate-700 font-bold focus:ring-0 cursor-pointer text-sm"
            />
          </div>
          <div class="h-10 w-px bg-slate-200 self-center"></div>
          <div class="flex flex-col px-4 py-2">
            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Date Range End</label>
            <input 
              type="date" 
              v-model="filters.to" 
              @change="fetchSummary"
              class="bg-transparent border-none text-slate-700 font-bold focus:ring-0 cursor-pointer text-sm"
            />
          </div>
          <button 
            @click="fetchSummary" 
            class="p-4 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all active:scale-95 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" :class="{ 'animate-spin': loading }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Hero Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Revenue Card: Ultra Modern -->
        <div class="relative group cursor-default">
          <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 group-hover:blur-xl transition duration-500"></div>
          <div class="relative bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between h-full min-h-[240px] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-indigo-200/50">
            <div class="flex justify-between items-start">
              <div class="space-y-1">
                <p class="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Net Sales Volume</p>
                <h2 class="text-5xl font-black text-slate-900 tracking-tighter tabular-nums flex items-baseline gap-1 group-hover:text-indigo-600 transition-colors duration-500">
                  <span class="text-3xl text-indigo-600">₱</span>
                  {{ formatNumber(summary.total_revenue) }}
                </h2>
              </div>
              <div class="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-12 transition-all duration-500 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="mt-8 flex items-center justify-between border-t border-slate-50 pt-6">
              <div class="flex items-center gap-2 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                </svg>
                <span class="text-[10px] font-black uppercase tracking-widest">Real-time Performance</span>
              </div>
              <div class="flex -space-x-2">
                <div v-for="i in 3" :key="i" class="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-rotate-6">
                   <div class="w-full h-full rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 opacity-80"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Customer Card: Sleek & Clean -->
        <div class="relative group cursor-default">
          <div class="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div class="relative bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between h-full min-h-[240px] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-emerald-200/50">
            <div class="flex justify-between items-start">
              <div class="space-y-1">
                <p class="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Customer Base</p>
                <h2 class="text-5xl font-black text-slate-900 tracking-tighter tabular-nums flex items-baseline gap-2 group-hover:text-emerald-600 transition-colors duration-500">
                  {{ summary.customer_count }}
                  <span class="text-xl text-slate-300 font-bold">Total</span>
                </h2>
              </div>
              <div class="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white group-hover:rotate-12 transition-all duration-500 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div class="mt-8">
               <div class="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                 <span>Active Engagement</span>
                 <span class="text-emerald-500 group-hover:scale-110 transition-transform">88%</span>
               </div>
               <div class="w-full bg-slate-50 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-100">
                 <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[88%] rounded-full shadow-lg shadow-emerald-200 transition-all duration-1000 group-hover:w-[92%]"></div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Inventory Insights Table -->
      <div class="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden group/table">
        <div class="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div class="space-y-1">
            <h3 class="text-xl font-black text-slate-900 tracking-tight">Top Performance Matrix</h3>
            <p class="text-slate-400 text-xs font-medium uppercase tracking-widest">Inventory leaderboard by units sold</p>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm group-hover/table:border-indigo-200 transition-colors">
            <div class="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
            <span class="text-[10px] font-black uppercase tracking-widest text-indigo-600">Premium View</span>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/50">
                <th class="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Rank & Product</th>
                <th class="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Volume</th>
                <th class="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Dominance</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr v-for="(product, index) in summary.top_products" :key="index" class="group/row hover:bg-indigo-50/30 transition-all duration-500 cursor-pointer">
                <td class="px-8 py-8">
                  <div class="flex items-center gap-6 transition-transform duration-500 group-hover/row:translate-x-2">
                    <div class="relative">
                      <div class="w-14 h-14 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center group-hover/row:bg-indigo-600 group-hover/row:rotate-[360deg] group-hover/row:scale-110 transition-all duration-1000">
                        <span class="text-lg font-black text-slate-400 group-hover/row:text-white">0{{ index + 1 }}</span>
                      </div>
                      <div v-if="index === 0" class="absolute -top-2 -right-2 w-7 h-7 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center shadow-lg group-hover/row:scale-125 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                    </div>
                    <span class="text-lg font-bold text-slate-700 group-hover/row:text-indigo-600 transition-colors">{{ product.name }}</span>
                  </div>
                </td>
                <td class="px-8 py-8 text-center transition-all duration-500 group-hover/row:scale-110">
                  <div class="inline-flex flex-col items-center">
                    <span class="text-2xl font-black text-slate-900 tracking-tight group-hover/row:text-indigo-600 transition-colors">{{ product.total_quantity }}</span>
                    <span class="text-[10px] font-bold text-slate-400 uppercase">Units</span>
                  </div>
                </td>
                <td class="px-8 py-8 text-right">
                  <div class="flex items-center justify-end gap-5">
                    <div class="flex flex-col items-end gap-2 group-hover/row:scale-105 transition-transform">
                       <span class="text-sm font-black text-indigo-600 tracking-tighter">{{ getPercentage(product.total_quantity) }}%</span>
                       <div class="w-40 bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-50 shadow-inner">
                         <div 
                           class="bg-gradient-to-r from-indigo-500 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out shadow-sm group-hover/row:brightness-110" 
                           :style="{ width: getPercentage(product.total_quantity) + '%' }"
                         ></div>
                       </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr v-if="summary.top_products.length === 0">
                <td colspan="3" class="px-8 py-24 text-center">
                  <div class="flex flex-col items-center gap-4 animate-pulse">
                    <div class="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center">
                       <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                       </svg>
                    </div>
                    <p class="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">No Transactional Footprint Found</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const refreshInterval = ref(null)

const filters = ref({
  from: new Date().toLocaleDateString('en-CA'), // en-CA gives YYYY-MM-DD
  to: new Date().toLocaleDateString('en-CA')
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
  return new Intl.NumberFormat('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num || 0)
}

const getPercentage = (qty) => {
  const total = summary.value.top_products.reduce((acc, p) => acc + p.total_quantity, 0)
  if (total === 0) return 0
  return Math.round((qty / total) * 100)
}

onMounted(() => {
  fetchSummary()
  // High-frequency sync as requested
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
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.font-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.animate-fade-in {
  animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-float {
  animation: float 15s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 18s ease-in-out infinite reverse;
  animation-delay: -2s;
}

@keyframes float {
  0% { transform: translate(0, 0) rotate(0deg) scale(1); }
  33% { transform: translate(2%, 4%) rotate(2deg) scale(1.05); }
  66% { transform: translate(-2%, 2%) rotate(-1deg) scale(0.95); }
  100% { transform: translate(0, 0) rotate(0deg) scale(1); }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0.4;
  cursor: pointer;
  transition: opacity 0.2s;
}
input[type="date"]::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
</style>