<template>
  <NuxtLayout>
    <div class="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p class="text-xs font-semibold uppercase tracking-widest text-amber-600">Analytics</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-900">Reports</h1>
      <p class="mt-2 text-sm text-slate-600">Generate operational insights and financial summaries.</p>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      <div class="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <p class="text-sm font-medium text-slate-600">Total Revenue</p>
        <p class="text-3xl font-bold text-green-600 mt-2">₱45,230</p>
        <p class="text-xs text-green-600 mt-1">↑ 12% from last month</p>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <p class="text-sm font-medium text-slate-600">Transactions</p>
        <p class="text-3xl font-bold text-blue-600 mt-2">1,245</p>
        <p class="text-xs text-slate-600 mt-1">This month</p>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <p class="text-sm font-medium text-slate-600">Avg Session</p>
        <p class="text-3xl font-bold text-purple-600 mt-2">2.5h</p>
        <p class="text-xs text-slate-600 mt-1">Duration</p>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <p class="text-sm font-medium text-slate-600">Occupancy</p>
        <p class="text-3xl font-bold text-orange-600 mt-2">76%</p>
        <p class="text-xs text-slate-600 mt-1">Network average</p>
      </div>
    </div>

    <div class="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
        <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
          <h2 class="text-lg font-semibold text-slate-900">Monthly Revenue Trend</h2>
          <p class="mt-1 text-xs text-slate-500">Revenue performance over the last 6 months</p>
        </div>
        <div class="px-6 py-5">
          <svg viewBox="0 0 100 40" class="h-40 w-full">
            <polyline points="0,35 100,35" fill="none" stroke="#e2e8f0" stroke-width="0.6" />
            <polyline :points="revenuePolyline" fill="none" stroke="#0f172a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            <circle v-for="(point, index) in revenuePoints" :key="index" :cx="point.x" :cy="point.y" r="1.1" fill="#f59e0b" />
          </svg>
          <div class="mt-3 grid grid-cols-6 text-center text-xs font-medium text-slate-500">
            <span v-for="item in monthlyRevenue" :key="item.month">{{ item.month }}</span>
          </div>
        </div>
      </div>

      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
          <h2 class="text-lg font-semibold text-slate-900">Utilization by Site</h2>
          <p class="mt-1 text-xs text-slate-500">Current occupancy by location</p>
        </div>
        <div class="space-y-4 px-6 py-5">
          <div v-for="site in siteUtilization" :key="site.name">
            <div class="mb-1 flex items-center justify-between text-sm">
              <span class="font-medium text-slate-700">{{ site.name }}</span>
              <span class="text-slate-500">{{ site.rate }}%</span>
            </div>
            <div class="h-2 w-full rounded-full bg-slate-200">
              <div class="h-2 rounded-full bg-amber-500" :style="{ width: `${site.rate}%` }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
        <h2 class="text-lg font-semibold text-slate-900">Available Reports</h2>
      </div>
      <div class="divide-y divide-slate-100">
        <div v-for="report in reports" :key="report.id" class="px-6 py-4 transition-colors hover:bg-slate-50">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-slate-900">{{ report.name }}</h3>
              <p class="text-xs text-slate-500 mt-1">{{ report.description }}</p>
            </div>
            <button class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const monthlyRevenue = [
  { month: 'Oct', value: 32 },
  { month: 'Nov', value: 35 },
  { month: 'Dec', value: 39 },
  { month: 'Jan', value: 37 },
  { month: 'Feb', value: 42 },
  { month: 'Mar', value: 45 },
]

const maxRevenueValue = Math.max(...monthlyRevenue.map(item => item.value))

const revenuePoints = monthlyRevenue.map((item, index) => ({
  x: (index / (monthlyRevenue.length - 1)) * 100,
  y: 35 - (item.value / maxRevenueValue) * 28,
}))

const revenuePolyline = revenuePoints.map(point => `${point.x},${point.y}`).join(' ')

const siteUtilization = [
  { name: 'Mall Parking', rate: 68 },
  { name: 'Downtown Plaza', rate: 42 },
  { name: 'Airport Parking', rate: 89 },
  { name: 'City Center', rate: 55 },
]

const reports = [
  { id: 1, name: 'Daily Operations Report', description: 'Summary of daily parking operations and revenue' },
  { id: 2, name: 'Weekly Performance', description: 'Weekly analytics and performance metrics' },
  { id: 3, name: 'Monthly Revenue Report', description: 'Detailed breakdown of monthly revenue by location' },
  { id: 4, name: 'Occupancy Analysis', description: 'Parking lot occupancy rates and trends' },
  { id: 5, name: 'Customer Satisfaction', description: 'User feedback and satisfaction scores' }
]
</script>
