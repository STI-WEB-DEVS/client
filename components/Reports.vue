<template>
  <div class="p-8 bg-[#FDFCFB] min-h-screen">
    <header class="mb-10">
      <h1 class="text-3xl font-black text-[#2D2424] tracking-tight">Business Reports</h1>
      <p class="text-gray-500 font-medium italic">Furnicraft Q1 Performance & Analytics</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-gray-200 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h3 class="font-black text-gray-400 text-xs uppercase tracking-[0.2em] mb-1">Monthly Gross Revenue</h3>
            <p class="text-4xl font-black text-[#2D2424]">₱842,500.00</p>
          </div>
          <div class="flex gap-2">
            <span class="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase">↑ 24% Growth</span>
          </div>
        </div>

        <div class="h-64 flex items-end justify-between gap-4 border-b border-gray-100 pb-2">
          <div v-for="bar in salesPerformance" :key="bar.month" class="flex-1 flex flex-col items-center gap-4 group">
            <div :style="{ height: bar.height + '%' }" 
                 class="w-full bg-[#F4F1EE] group-hover:bg-[#FFB300] rounded-t-xl transition-all duration-500 relative shadow-sm">
              <span class="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">₱{{ bar.val }}k</span>
            </div>
            <span class="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{{ bar.month }}</span>
          </div>
        </div>
      </div>

      <div class="bg-[#2D2424] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
        <div class="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
        <h3 class="font-black text-amber-500 text-xs uppercase tracking-[0.2em] mb-10">Material Critical Levels</h3>
        
        <div class="space-y-10">
          <div v-for="item in resourceStock" :key="item.label">
            <div class="flex justify-between text-[11px] font-black mb-3 uppercase tracking-widest">
              <span class="text-gray-400">{{ item.label }}</span>
              <span :class="item.percentage < 30 ? 'text-red-400' : 'text-amber-500'">{{ item.percentage }}%</span>
            </div>
            <div class="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div :style="{ width: item.percentage + '%' }" 
                   :class="['h-full transition-all duration-1000 ease-out', item.percentage < 30 ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]']">
              </div>
            </div>
          </div>
        </div>

        <div class="mt-14 p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
          <p class="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Top Selling Product</p>
          <p class="text-lg font-black text-white">Classic Narra Dining Table</p>
          <p class="text-[10px] font-bold text-amber-500/80 mt-1 uppercase italic">14 Units Sold this month</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const salesPerformance = [
  { month: 'Oct 2025', height: 35, val: '145' },
  { month: 'Nov 2025', height: 55, val: '220' },
  { month: 'Dec 2025', height: 95, val: '580' },
  { month: 'Jan 2026', height: 45, val: '190' },
  { month: 'Feb 2026', height: 75, val: '310' },
  { month: 'Mar 2026', height: 85, val: '442' },
]

const resourceStock = [
  { label: 'Solid Narra Planks', percentage: 14 },
  { label: 'High Gloss Varnish', percentage: 78 },
  { label: 'Upholstery Foam (Standard)', percentage: 32 },
  { label: 'Mahogany Logs', percentage: 22 },
  { label: 'Steel Hardware (Handles)', percentage: 95 },
]
</script>