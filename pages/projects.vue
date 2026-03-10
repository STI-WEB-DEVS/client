<template>
  <NuxtLayout>
    <div class="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p class="text-xs font-semibold uppercase tracking-widest text-amber-600">Operations</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-900">Parking Zones</h1>
      <p class="mt-2 text-sm text-slate-600">Monitor occupancy, availability, and condition across all parking zones.</p>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="zone in zones" :key="zone.id" class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-slate-900">{{ zone.name }}</h3>
          <span :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${zone.statusClass}`">
            {{ zone.status }}
          </span>
        </div>
        <p class="mb-4 text-sm text-slate-600">{{ zone.description }}</p>
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-slate-500">Occupancy</span>
            <span class="font-medium text-slate-900">{{ zone.occupancy }}%</span>
          </div>
          <div class="h-2 w-full rounded-full bg-slate-200">
            <div :class="`h-2 rounded-full ${zone.occupancyColor}`" :style="`width: ${zone.occupancy}%`"></div>
          </div>
          <p class="pt-1 text-xs text-slate-500">{{ zone.occupied }} / {{ zone.capacity }} slots occupied</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const zones = [
  {
    id: 1,
    name: 'Mall Parking - Zone A',
    description: 'Primary customer parking near the main entrance.',
    status: 'Busy',
    statusClass: 'bg-red-100 text-red-700',
    occupancy: 88,
    occupancyColor: 'bg-red-500',
    occupied: 264,
    capacity: 300,
  },
  {
    id: 2,
    name: 'Downtown Plaza - Zone B',
    description: 'Mixed parking for short-term and reserved users.',
    status: 'Available',
    statusClass: 'bg-emerald-100 text-emerald-700',
    occupancy: 46,
    occupancyColor: 'bg-emerald-500',
    occupied: 92,
    capacity: 200,
  },
  {
    id: 3,
    name: 'City Center - Zone C',
    description: 'Balanced occupancy zone with hourly turnover.',
    status: 'Moderate',
    statusClass: 'bg-amber-100 text-amber-700',
    occupancy: 61,
    occupancyColor: 'bg-amber-500',
    occupied: 151,
    capacity: 248,
  },
]
</script>
