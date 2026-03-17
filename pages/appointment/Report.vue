<template>
  <div class="p-8 bg-slate-50 min-h-screen font-sans">
    <div class="flex justify-between items-end mb-8">
      <div>
        <h1 class="text-3xl font-bold text-slate-900 tracking-tight">Business Analytics</h1>
        <p class="text-slate-500 mt-1">Generate operational and inventory reports for business monitoring.</p>
      </div>
      <div class="flex gap-3">
        <button class="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition shadow-sm">
          Download PDF
        </button>
        <button class="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
          Generate New Report
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div v-for="stat in reportStats" :key="stat.label" class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ stat.label }}</p>
        <div class="flex items-baseline gap-2 mt-2">
          <h3 class="text-3xl font-bold text-slate-900">{{ stat.value }}</h3>
          <span :class="stat.isUp ? 'text-green-500' : 'text-red-500'" class="text-xs font-bold">
            {{ stat.trend }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h4 class="font-bold text-slate-800 mb-6">Monthly Revenue Growth</h4>
        <div class="flex items-end justify-between h-48 gap-2 px-2">
          <div v-for="(val, idx) in revenueData" :key="idx" 
               class="flex-1 bg-indigo-500 rounded-t-lg hover:bg-indigo-400 transition-all cursor-pointer relative group"
               :style="{ height: val + '%' }">
            <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              {{ val }}%
            </span>
          </div>
        </div>
        <div class="flex justify-between mt-4 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h4 class="font-bold text-slate-800 mb-6">Top Material Usage</h4>
        <div class="space-y-5">
          <div v-for="material in topMaterials" :key="material.name">
            <div class="flex justify-between text-sm mb-2">
              <span class="font-bold text-slate-700">{{ material.name }}</span>
              <span class="text-slate-500">{{ material.usage }} Yards used</span>
            </div>
            <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div class="bg-indigo-600 h-full" :style="{ width: material.percent + '%' }"></div>
            </div>
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