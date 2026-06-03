<template>
  <div class="py-6">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold text-slate-900">TravelEase Dashboard</h1>
      <p class="text-slate-500">Welcome back, Admin. Here is what's happening today.</p>

      <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="stat in stats" :key="stat.name" class="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-slate-100">
          <div class="flex items-center">
            <div class="rounded-lg bg-sky-500/10 p-3">
              <component :is="stat.icon" class="h-6 w-6 text-sky-600" aria-hidden="true" />
            </div>
            <div class="ml-5">
              <p class="truncate text-sm font-medium text-slate-500">{{ stat.name }}</p>
              <p class="text-2xl font-semibold text-slate-900">{{ stat.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TicketIcon, UserGroupIcon, GlobeAmericasIcon, BanknotesIcon } from '@heroicons/vue/24/outline'

const stats = [
  { name: 'Active Reservations', value: '124', icon: TicketIcon },
  { name: 'Total Travel Agents', value: '12', icon: UserGroupIcon },
  { name: 'Pending Packages', value: '8', icon: GlobeAmericasIcon },
  { name: 'Monthly Revenue', value: '$45,200', icon: BanknotesIcon },
]
</script>