<template>
  <div>
    <!-- Page header -->
    <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-[#1D3557]">Analytics Reports</h1>
        <p class="mt-1 text-sm text-[#457B9D]">Data-driven insights for blood supply management.</p>
      </div>
      <!-- Timeframe selector -->
      <div class="flex items-center gap-1 rounded-xl border border-[#A8DADC]/40 bg-white p-1 shadow-sm">
        <button
          v-for="time in timeframes"
          :key="time"
          @click="selectedTimeframe = time"
          :class="[
            'rounded-lg px-4 py-2 text-xs font-semibold transition-all',
            selectedTimeframe === time ? 'bg-[#1D3557] text-white shadow-sm' : 'text-[#457B9D] hover:text-[#1D3557]'
          ]"
        >
          {{ time }}
        </button>
      </div>
    </div>

    <!-- Metric cards -->
    <div class="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="metric in reportMetrics" :key="metric.label"
        class="rounded-2xl border border-[#A8DADC]/40 bg-white p-6 shadow-sm hover:shadow-md transition-all">
        <div class="mb-4 flex items-start justify-between">
          <span class="text-2xl">{{ metric.icon }}</span>
          <span class="rounded-lg px-2.5 py-1 text-[10px] font-bold"
            :class="metric.positive ? 'bg-green-50 text-green-700' : 'bg-[#D62828]/10 text-[#D62828]'">
            {{ metric.trend }}
          </span>
        </div>
        <p class="text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">{{ metric.label }}</p>
        <p class="mt-1 text-2xl font-bold text-[#1D3557]">{{ metric.value }}</p>
      </div>
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">

      <!-- Bar chart -->
      <div class="lg:col-span-2 rounded-2xl border border-[#A8DADC]/40 bg-white p-6 shadow-sm">
        <div class="mb-6 flex items-center justify-between">
          <h3 class="font-bold text-[#1D3557]">Donation Volume Trend</h3>
          <div class="flex gap-4">
            <span class="flex items-center gap-1.5 text-[11px] font-semibold text-[#457B9D]">
              <span class="h-2 w-2 rounded-full bg-[#1D3557]"></span> This Year
            </span>
            <span class="flex items-center gap-1.5 text-[11px] font-semibold text-[#457B9D]">
              <span class="h-2 w-2 rounded-full bg-[#A8DADC]"></span> Last Year
            </span>
          </div>
        </div>

        <div class="flex h-52 items-end justify-between gap-1.5 border-b border-[#A8DADC]/30 px-2">
          <div v-for="(bar, i) in chartBars" :key="i" class="group flex w-full flex-col items-center gap-1">
            <!-- Last year bar (lighter, behind) -->
            <div class="w-full rounded-t-md bg-[#A8DADC]/40 transition-all"
              :style="{ height: bar.last + '%' }"></div>
          </div>
        </div>
        <!-- Overlay this year bars on top using absolute positioning approach via grid -->
        <div class="relative -mt-52 flex h-52 items-end justify-between gap-1.5 px-2">
          <div v-for="(bar, i) in chartBars" :key="'cur-' + i" class="group flex w-full flex-col items-center">
            <div class="w-3/4 rounded-t-md bg-[#457B9D] transition-all hover:bg-[#D62828] cursor-pointer"
              :style="{ height: bar.current + '%' }"></div>
          </div>
        </div>

        <div class="mt-3 flex justify-between px-2 text-[10px] font-semibold uppercase tracking-widest text-[#457B9D]/60">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
          <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
          <span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
        </div>
      </div>

      <!-- Stock distribution -->
      <div class="rounded-2xl border border-[#A8DADC]/40 bg-white p-6 shadow-sm">
        <h3 class="mb-6 font-bold text-[#1D3557]">Stock Distribution</h3>
        <div class="space-y-5">
          <div v-for="data in bloodTypeData" :key="data.type">
            <div class="mb-1.5 flex justify-between text-xs font-semibold">
              <span class="text-[#1D3557]">{{ data.type }}</span>
              <span class="text-[#457B9D]">{{ data.count }} units</span>
            </div>
            <div class="h-2 rounded-full bg-[#A8DADC]/30 overflow-hidden">
              <div class="h-full rounded-full bg-[#D62828] transition-all duration-700"
                :style="{ width: data.percentage + '%' }"></div>
            </div>
            <p class="mt-0.5 text-right text-[10px] font-semibold text-[#457B9D]/60">{{ data.percentage }}%</p>
          </div>
        </div>
        <button class="mt-6 w-full rounded-xl border border-[#A8DADC]/40 bg-[#F1FAEE] py-3 text-xs font-bold text-[#1D3557] transition hover:bg-[#A8DADC]/20">
          Download Full CSV Report
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedTimeframe = ref('This Month')
const timeframes = ['This Week', 'This Month', 'This Year', 'Custom Range']

const reportMetrics = ref([
  { label: 'Total Donations', value: '1,284', trend: '+12%', positive: true,  icon: '🩸' },
  { label: 'Units Dispatched', value: '856',  trend: '+5%',  positive: true,  icon: '🚑' },
  { label: 'New Donors',       value: '142',  trend: '-2%',  positive: false, icon: '👤' },
  { label: 'Wastage Rate',     value: '0.8%', trend: '-15%', positive: true,  icon: '🗑️' },
])

const bloodTypeData = ref([
  { type: 'O+',    percentage: 38, count: 488 },
  { type: 'A+',    percentage: 32, count: 410 },
  { type: 'B+',    percentage: 15, count: 192 },
  { type: 'O-',    percentage: 7,  count: 90  },
  { type: 'Other', percentage: 8,  count: 104 },
])

// Generate stable bar heights for chart
const chartBars = Array.from({ length: 12 }, (_, i) => ({
  current: 25 + ((i * 37 + 17) % 60),
  last:    15 + ((i * 29 + 11) % 50),
}))
</script>