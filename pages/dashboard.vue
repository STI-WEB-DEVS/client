<template>
  <NuxtLayout>
    <div class="space-y-8">
      <div>
        <h1 class="font-['Syne'] text-2xl font-bold text-[#CFFFB3]">Dashboard</h1>
        <p class="mt-1 font-['DM_Mono'] text-sm text-[#ADE25D]/70">System overview and activity summary</p>
      </div>

      <!-- Stat Cards -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div v-for="stat in stats" :key="stat.label" class="bg-[#3B7080]/30 border border-[#3B7080] rounded-sm p-5">
          <div class="flex items-center justify-between mb-3">
            <p class="font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">{{ stat.label }}</p>
            <component :is="stat.icon" class="size-5 text-[#ADE25D]/50" />
          </div>
          <p class="font-['Syne'] text-3xl font-bold text-[#CFFFB3]">{{ stat.value }}</p>
          <p class="mt-1 font-['DM_Mono'] text-xs text-[#ADE25D]/60">{{ stat.sub }}</p>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Pending Organizers -->
        <div class="bg-[#3B7080]/20 border border-[#3B7080] rounded-sm">
          <div class="px-6 py-4 border-b border-[#3B7080] flex items-center justify-between">
            <h2 class="font-['Syne'] text-sm font-semibold text-[#CFFFB3]">Pending Organizer Approvals</h2>
            <NuxtLink to="/organizers" class="font-['DM_Mono'] text-xs text-[#ADE25D] hover:text-[#CFFFB3] transition-colors">View all →</NuxtLink>
          </div>
          <ul class="divide-y divide-[#3B7080]/40">
            <li v-for="org in pendingOrganizers" :key="org.name" class="px-6 py-3 flex items-center justify-between">
              <div>
                <p class="font-['Syne'] text-sm font-medium text-[#CFFFB3]">{{ org.name }}</p>
                <p class="font-['DM_Mono'] text-xs text-[#ADE25D]/60">{{ org.submitted }}</p>
              </div>
              <span class="font-['DM_Mono'] text-[10px] tracking-wider uppercase bg-[#ADE25D]/10 text-[#ADE25D] border border-[#ADE25D]/30 px-2 py-0.5 rounded-sm">Pending</span>
            </li>
          </ul>
        </div>

        <!-- Recent Hiker Registrations -->
        <div class="bg-[#3B7080]/20 border border-[#3B7080] rounded-sm">
          <div class="px-6 py-4 border-b border-[#3B7080] flex items-center justify-between">
            <h2 class="font-['Syne'] text-sm font-semibold text-[#CFFFB3]">Recent Hiker Registrations</h2>
            <NuxtLink to="/hikers" class="font-['DM_Mono'] text-xs text-[#ADE25D] hover:text-[#CFFFB3] transition-colors">View all →</NuxtLink>
          </div>
          <ul class="divide-y divide-[#3B7080]/40">
            <li v-for="hiker in recentHikers" :key="hiker.name" class="px-6 py-3 flex items-center justify-between">
              <div>
                <p class="font-['Syne'] text-sm font-medium text-[#CFFFB3]">{{ hiker.name }}</p>
                <p class="font-['DM_Mono'] text-xs text-[#ADE25D]/60">{{ hiker.tour }}</p>
              </div>
              <span :class="hiker.status === 'Confirmed' ? 'bg-[#ADE25D]/20 text-[#ADE25D] border-[#ADE25D]/40' : 'bg-[#3B7080]/40 text-[#CFFFB3]/60 border-[#3B7080]'" class="font-['DM_Mono'] text-[10px] tracking-wider uppercase border px-2 py-0.5 rounded-sm">{{ hiker.status }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { UsersIcon, FolderIcon, MapIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline'

const stats = [
  { label: 'Total Hikers',     value: '1,284', sub: '+38 this month',    icon: UsersIcon },
  { label: 'Organizers',       value: '47',    sub: '6 pending approval', icon: FolderIcon },
  { label: 'Active Tours',     value: '23',    sub: '5 this week',        icon: MapIcon },
  { label: 'Commission (PHP)', value: '84.2K', sub: 'This month',         icon: CurrencyDollarIcon },
]

const pendingOrganizers = [
  { name: 'Summit Trail Co.',    submitted: 'Submitted 2 days ago' },
  { name: 'Ridge Walkers PH',   submitted: 'Submitted 3 days ago' },
  { name: 'Alpino Adventures',  submitted: 'Submitted 5 days ago' },
  { name: 'Peak Seekers Group', submitted: 'Submitted 1 week ago' },
]

const recentHikers = [
  { name: 'Maria Santos',   tour: 'Mt. Apo Day Hike',       status: 'Confirmed' },
  { name: 'Juan dela Cruz', tour: 'Pulag Overnight',        status: 'Pending' },
  { name: 'Ana Reyes',      tour: 'Osmeña Peak Trail',      status: 'Confirmed' },
  { name: 'Carlo Mendoza',  tour: 'Mt. Kitanglad Traverse', status: 'Pending' },
]
</script>