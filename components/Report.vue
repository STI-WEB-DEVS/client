<template>
  <div class="min-h-screen bg-[#faf7f2] font-serif text-[#1a1108] p-8">

    <!-- Header -->
    <div class="flex justify-between items-start mb-10">
      <div>
        <p class="text-[10px] tracking-[0.3em] uppercase text-[#b0a090] mb-1">Business Intelligence</p>
        <h1 class="text-3xl font-bold text-[#1a1108] tracking-tight">Business Analytics</h1>
        <p class="text-[#8a7060] mt-1 text-sm">Generate operational and inventory reports for monitoring.</p>
      </div>
      <div class="flex gap-3">
        <button class="bg-white border border-[#e8ddc8] text-[#4a3820] px-5 py-2.5 rounded-xl font-bold text-sm hover:border-[#c9a84c] transition-all flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Download PDF
        </button>
        <button class="bg-[#1a1108] text-[#f5e6c8] px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#2a1f0f] transition-all">
          Generate Report
        </button>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      <div v-for="stat in reportStats" :key="stat.label"
        class="bg-white border border-[#e8ddc8] rounded-2xl p-6 hover:border-[#c9a84c] transition-all">
        <p class="text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em] mb-3">{{ stat.label }}</p>
        <div class="flex items-end gap-3">
          <h3 class="text-2xl font-bold text-[#1a1108]">{{ stat.value }}</h3>
          <span :class="stat.isUp ? 'text-[#2d7a3a]' : 'text-[#b94040]'"
            class="text-sm font-bold pb-0.5">{{ stat.trend }}</span>
        </div>
        <div class="mt-4 w-full bg-[#f0e8d8] h-1 rounded-full overflow-hidden">
          <div class="h-full rounded-full bg-[#c9a84c]" :style="{ width: stat.barPct + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

      <!-- Revenue Chart -->
      <div class="bg-white border border-[#e8ddc8] rounded-2xl p-6">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h4 class="font-bold text-[#1a1108]">Monthly Revenue Growth</h4>
            <p class="text-[10px] text-[#b0a090] uppercase tracking-wider mt-0.5">Jan — Jun 2026</p>
          </div>
          <span class="text-xs text-[#c9a84c] font-bold bg-[#fdf5e8] px-3 py-1 rounded-lg border border-[#e8c87a]">+12% avg</span>
        </div>
        <div class="flex items-end justify-between gap-3 h-48 px-2">
          <div v-for="(val, idx) in revenueData" :key="idx"
            class="flex flex-col items-center flex-1 group cursor-pointer">
            <span class="text-[10px] font-bold text-[#c9a84c] mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
              ₱{{ (val * 1000).toLocaleString() }}
            </span>
            <div class="w-full rounded-t-lg transition-all duration-200 group-hover:opacity-80"
              :style="{ height: val + '%', backgroundColor: idx === revenueData.length - 1 ? '#c9a84c' : idx % 2 === 0 ? '#e8ddc8' : '#d4c4a8' }">
            </div>
          </div>
        </div>
        <div class="flex justify-between mt-4 text-[10px] font-bold text-[#b0a090] uppercase tracking-widest px-1">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
        </div>
      </div>

      <!-- Material Usage -->
      <div class="bg-white border border-[#e8ddc8] rounded-2xl p-6">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h4 class="font-bold text-[#1a1108]">Top Material Usage</h4>
            <p class="text-[10px] text-[#b0a090] uppercase tracking-wider mt-0.5">Fabric consumption this quarter</p>
          </div>
        </div>
        <div class="space-y-5">
          <div v-for="material in topMaterials" :key="material.name" class="group">
            <div class="flex justify-between text-sm mb-2">
              <span class="font-bold text-[#1a1108]">{{ material.name }}</span>
              <span class="text-[#8a7060] text-xs font-medium">{{ material.usage }} yards</span>
            </div>
            <div class="w-full bg-[#f0e8d8] h-2 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-500"
                :style="{ width: material.percent + '%', backgroundColor: material.color }">
              </div>
            </div>
            <p class="text-[10px] text-[#c0b0a0] mt-1">{{ material.percent }}% of total usage</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Reports Table -->
    <div class="bg-white border border-[#e8ddc8] rounded-2xl overflow-hidden">
      <div class="px-6 py-5 border-b border-[#ede4d3]">
        <h2 class="font-bold text-[#1a1108]">Generated Reports</h2>
      </div>
      <div class="divide-y divide-[#f5efe5]">
        <div v-for="report in recentReports" :key="report.name"
          class="px-6 py-4 flex items-center justify-between hover:bg-[#fdf9f4] transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-9 h-9 rounded-xl bg-[#f0e8d8] flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-[#8a5a20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div>
              <p class="font-bold text-sm text-[#1a1108]">{{ report.name }}</p>
              <p class="text-xs text-[#8a7060]">Generated {{ report.date }}</p>
            </div>
          </div>
          <button class="text-[#c9a84c] font-bold text-xs uppercase tracking-wider hover:text-[#a07c3a] transition-colors">Download</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const reportStats = ref([
  { label: 'Total Sales (MTD)', value: '₱85,420', trend: '↑ 12%', isUp: true, barPct: 72 },
  { label: 'Avg. Order Value', value: '₱3,200', trend: '↓ 2%', isUp: false, barPct: 55 },
  { label: 'Completion Rate', value: '94.2%', trend: '↑ 5%', isUp: true, barPct: 94 },
]);

const revenueData = ref([40, 55, 45, 75, 65, 90]);

const topMaterials = ref([
  { name: 'Cotton-Polyester Blend', usage: 120, percent: 85, color: '#1a1108' },
  { name: 'Premium Satin', usage: 45, percent: 40, color: '#c9a84c' },
  { name: 'Stretch Denim', usage: 32, percent: 25, color: '#a07c3a' },
  { name: 'Silk Linings', usage: 18, percent: 15, color: '#d4c4a8' },
]);

const recentReports = ref([
  { name: 'Q1 2026 Revenue Summary', date: 'March 10, 2026' },
  { name: 'Fabric Consumption Report', date: 'March 5, 2026' },
  { name: 'Job Order Completion Analysis', date: 'February 28, 2026' },
]);
</script>