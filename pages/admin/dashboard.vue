<template>
  <div class="p-6 md:p-8 bg-gray-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="mb-8 border-b border-gray-200 pb-5">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">FurniCraft Analytics</h1>
      <p class="text-sm text-gray-500 mt-1">Monitor order queues, material utilization, and workshop production throughput.</p>
    </div>

    <!-- Core KPI Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in stats" :key="stat.title" class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <p class="text-xs font-bold uppercase tracking-wider text-gray-400">{{ stat.title }}</p>
        <div class="mt-2 flex items-baseline gap-2">
          <span class="text-2xl font-bold text-gray-900 tracking-tight">{{ stat.value }}</span>
          <span class="text-xs font-semibold px-1.5 py-0.5 rounded" 
                :class="stat.isPositive ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'">
            {{ stat.context }}
          </span>
        </div>
      </div>
    </div>

    <!-- Data Layout Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Chart Area -->
      <div class="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-semibold text-gray-900">Material Allocation Index</h2>
            <p class="text-xs text-gray-500">Estimated board feet consumption vs available storage stock</p>
          </div>
          <span class="text-xs font-medium text-gray-400">Live Production Load</span>
        </div>
        <div class="h-64 flex items-center justify-center border border-dashed border-gray-200 rounded-lg text-xs font-medium bg-gray-50/30 text-gray-400 italic">
          [FurniCraft Custom Vector Chart Area - Board Feet Tracks]
        </div>
      </div>

      <!-- Real-Time Shop Timeline -->
      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 class="text-base font-semibold text-gray-900 mb-5">Production Lifecycle Logs</h2>
        <div class="space-y-5">
          <div v-for="log in activities" :key="log.id" class="flex items-start gap-4 text-xs">
            <!-- Status Node Dot -->
            <div class="relative flex items-center justify-center mt-1">
              <div class="w-2.5 h-2.5 rounded-full" :class="log.dotClass"></div>
              <div class="absolute w-4 h-4 rounded-full animate-ping opacity-25" :class="log.dotClass" v-if="log.isUrgent"></div>
            </div>
            <!-- Log Body -->
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900">{{ log.title }}</p>
              <p class="text-gray-500 mt-0.5 leading-relaxed">{{ log.description }}</p>
              <span class="inline-block text-[10px] text-gray-400 font-semibold mt-1">{{ log.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Custom metrics mapping precisely to your system's operational parameters
const stats = ref([
  { title: 'Active Order Backlog', value: '34 Units', context: '12 Queued', isPositive: false },
  { title: 'Gross Revenue (PHP)', value: '₱184,500', context: '+14.2% MoM', isPositive: true },
  { title: 'Raw Lumber Reserve', value: '4,120 bft', context: 'Narra/Mahogany', isPositive: true },
  { title: 'Avg Craftsmanship Cycle', value: '6.4 Days', context: '-0.8 Days Drop', isPositive: true }
])

// Simulated order processing lifecycle feeds
const activities = ref([
  {
    id: 1,
    title: 'Custom Specification Ingested',
    description: 'Bulk order of 15 office desks generated custom cutting layout requirement.',
    time: '3 mins ago',
    dotClass: 'bg-green-600',
    isUrgent: false
  },
  {
    id: 2,
    title: 'Queue Pipeline Cap Warning',
    description: 'Mahogany desk build queuing exceeds standard 30-day single craftsman threshold.',
    time: '14 mins ago',
    dotClass: 'bg-amber-500',
    isUrgent: true
  },
  {
    id: 3,
    title: 'Material Deduction Applied',
    description: 'Allocated 240 board feet of prime Gmelina lumber to active cutting floor line.',
    time: '1 hour ago',
    dotClass: 'bg-blue-600',
    isUrgent: false
  },
  {
    id: 4,
    title: 'BIR Compliance Exported',
    description: 'Automated receipt journal ledger sync compiled successfully for quarterly bookkeeper check.',
    time: '4 hours ago',
    dotClass: 'bg-gray-400',
    isUrgent: false
  }
])
</script>