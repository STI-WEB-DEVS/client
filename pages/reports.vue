<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div>
        <h1 class="font-['Syne'] text-2xl font-bold text-[#CFFFB3]">Reports</h1>
        <p class="mt-1 font-['DM_Mono'] text-sm text-[#ADE25D]/70">System activity logs and performance overview</p>
      </div>

      <!-- Summary cards -->
      <div class="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <div v-for="s in reportStats" :key="s.label" class="bg-[#3B7080]/20 border border-[#3B7080] rounded-sm p-4">
          <p class="font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D] mb-1">{{ s.label }}</p>
          <p class="font-['Syne'] text-2xl font-bold text-[#CFFFB3]">{{ s.value }}</p>
        </div>
      </div>

      <!-- Monthly breakdown -->
      <div class="bg-[#3B7080]/20 border border-[#3B7080] rounded-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-[#3B7080]">
          <h2 class="font-['Syne'] text-sm font-semibold text-[#CFFFB3]">Monthly Activity Breakdown</h2>
        </div>
        <table class="min-w-full divide-y divide-[#3B7080]/40">
          <thead>
            <tr class="bg-[#3B7080]/30">
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Month</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">New Hikers</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Tours Run</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">New Organizers</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Revenue (PHP)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#3B7080]/30">
            <tr v-for="row in monthlyData" :key="row.month" class="hover:bg-[#3B7080]/20 transition-colors">
              <td class="px-6 py-4 font-['Syne'] text-sm font-semibold text-[#CFFFB3]">{{ row.month }}</td>
              <td class="px-6 py-4 font-['DM_Mono'] text-xs text-[#CFFFB3]">{{ row.hikers }}</td>
              <td class="px-6 py-4 font-['DM_Mono'] text-xs text-[#CFFFB3]">{{ row.tours }}</td>
              <td class="px-6 py-4 font-['DM_Mono'] text-xs text-[#CFFFB3]">{{ row.organizers }}</td>
              <td class="px-6 py-4 font-['DM_Mono'] text-xs text-[#CFFFB3]">{{ row.revenue.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Activity log -->
      <div class="bg-[#3B7080]/20 border border-[#3B7080] rounded-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-[#3B7080]">
          <h2 class="font-['Syne'] text-sm font-semibold text-[#CFFFB3]">Recent System Activity</h2>
        </div>
        <ul class="divide-y divide-[#3B7080]/30">
          <li v-for="log in activityLog" :key="log.id" class="px-6 py-3 flex items-center gap-4">
            <span class="w-2 h-2 rounded-full shrink-0" :class="log.type === 'approve' ? 'bg-[#ADE25D]' : log.type === 'deny' ? 'bg-red-400' : 'bg-[#3B7080]'"></span>
            <p class="font-['DM_Mono'] text-xs text-[#CFFFB3] flex-1">{{ log.message }}</p>
            <span class="font-['DM_Mono'] text-[10px] text-[#ADE25D]/40 shrink-0">{{ log.time }}</span>
          </li>
        </ul>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const reportStats = [
  { label: 'Total Hikers',     value: '1,284' },
  { label: 'Total Tours',      value: '94' },
  { label: 'Active Organizers',value: '41' },
  { label: 'Total Revenue',    value: '₱2.1M' },
]

const monthlyData = [
  { month: 'March 2026',    hikers: 38,  tours: 8,  organizers: 2, revenue: 842500 },
  { month: 'February 2026', hikers: 52,  tours: 11, organizers: 3, revenue: 1035000 },
  { month: 'January 2026',  hikers: 44,  tours: 9,  organizers: 1, revenue: 780000 },
  { month: 'December 2025', hikers: 71,  tours: 14, organizers: 4, revenue: 1240000 },
  { month: 'November 2025', hikers: 29,  tours: 6,  organizers: 0, revenue: 520000 },
]

const activityLog = [
  { id: 1, type: 'approve', message: 'Organizer "Summit Trail Co." approved by Admin',          time: '2h ago' },
  { id: 2, type: 'register',message: 'New hiker registration: Maria Santos → Mt. Apo Day Hike', time: '3h ago' },
  { id: 3, type: 'deny',    message: 'Organizer "Wild Paths Inc." denied — incomplete documents', time: '5h ago' },
  { id: 4, type: 'register',message: 'New tour created: Halcon Ridge Assault by Summit Trail',  time: '6h ago' },
  { id: 5, type: 'register',message: 'Commission payout processed: Ridge Walkers PH ₱17,500',   time: '8h ago' },
  { id: 6, type: 'approve', message: 'Document verified: DENR Accreditation — Peak Seekers',    time: '1d ago' },
]
</script>
