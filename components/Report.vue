<template>
  <div class="p-8 bg-[#0f172a] min-h-screen font-sans">
    
    <!-- Header -->
    <div class="flex justify-between items-end mb-10 border-b border-white/10 pb-8">
      <div>
        <p class="text-teal-400 text-xs font-black uppercase tracking-widest mb-2">Sutura TMS</p>
        <h1 class="text-3xl font-bold text-white tracking-tight">Business Analytics</h1>
        <p class="text-slate-400 mt-1">Generate operational and inventory reports for business monitoring.</p>
      </div>
      <div class="flex gap-3">
        <button class="bg-white/5 border border-white/10 text-slate-300 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white/10 transition">
          Download PDF
        </button>
        <button class="bg-teal-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-teal-400 transition shadow-lg shadow-teal-900/40">
          Generate New Report
        </button>
      </div>
    </div>

    <!-- KPI Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      <div v-for="stat in reportStats" :key="stat.label"
        class="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all">
        <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">{{ stat.label }}</p>
        <div class="flex items-baseline gap-2 mt-3">
          <h3 class="text-3xl font-bold text-white">{{ stat.value }}</h3>
          <span :class="stat.isUp ? 'text-teal-400' : 'text-red-400'" class="text-xs font-bold">
            {{ stat.trend }}
          </span>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
      
      <!-- Revenue Chart — wider -->
      <div class="lg:col-span-3 bg-white/5 border border-white/10 p-6 rounded-2xl">
        <div class="flex items-center justify-between mb-8">
          <h4 class="font-bold text-white">Monthly Revenue Growth</h4>
          <span class="text-[10px] font-black text-teal-400 bg-teal-400/10 px-3 py-1 rounded-full uppercase tracking-widest">
            2026
          </span>
        </div>
        <div class="flex items-end justify-between h-48 gap-3 px-2">
          <div v-for="(val, idx) in revenueData" :key="idx"
               class="flex-1 rounded-t-lg transition-all cursor-pointer relative group"
               :class="val === Math.max(...revenueData) ? 'bg-teal-400' : 'bg-teal-700 hover:bg-teal-500'"
               :style="{ height: val + '%' }">
            <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] px-2 py-1 rounded font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
              {{ val }}%
            </span>
          </div>
        </div>
        <div class="flex justify-between mt-5 text-[10px] font-black text-slate-500 uppercase tracking-tighter">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
        </div>
      </div>

      <!-- Materials — narrower -->
      <div class="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-2xl">
        <div class="flex items-center justify-between mb-8">
          <h4 class="font-bold text-white">Top Material Usage</h4>
        </div>
        <div class="space-y-6">
          <div v-for="material in topMaterials" :key="material.name">
            <div class="flex justify-between text-sm mb-2">
              <span class="font-bold text-slate-300">{{ material.name }}</span>
              <span class="text-slate-500 text-xs">{{ material.usage }} Yards used</span>
            </div>
            <div class="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :class="material.percent >= 70 ? 'bg-teal-400' : material.percent >= 30 ? 'bg-teal-600' : 'bg-slate-500'"
                :style="{ width: material.percent + '%' }"
              ></div>
            </div>
            <p class="text-right text-[10px] text-slate-600 mt-1 font-bold">{{ material.percent }}%</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const reportStats = ref([
  { label: 'Total Sales (MTD)', value: '₱85,420', trend: '↑ 12%', isUp: true },
  { label: 'Avg. Order Value', value: '₱3,200', trend: '↓ 2%', isUp: false },
  { label: 'Completion Rate', value: '94.2%', trend: '↑ 5%', isUp: true }
]);

const revenueData = ref([40, 55, 45, 75, 65, 90]);

const topMaterials = ref([
  { name: 'Cotton-Polyester Blend', usage: 120, percent: 85 },
  { name: 'Premium Satin', usage: 45, percent: 40 },
  { name: 'Stretch Denim', usage: 32, percent: 25 },
  { name: 'Silk Linings', usage: 18, percent: 15 }
]);
</script>