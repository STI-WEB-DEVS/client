<template>
  <div class="min-h-screen bg-[#faf7f2] font-serif text-[#1a1108] p-8">

    <!-- Header -->
    <div class="flex justify-between items-start mb-10">
      <div>
        <p class="text-[10px] tracking-[0.3em] uppercase text-[#b0a090] mb-1">Production Floor</p>
        <h1 class="text-3xl font-bold text-[#1a1108] tracking-tight">Job Order Tracking</h1>
        <p class="text-[#8a7060] mt-1 text-sm">Manage customized clothing services and production status.</p>
      </div>
      <button
        class="bg-[#1a1108] text-[#f5e6c8] px-6 py-3 rounded-xl font-bold text-sm tracking-[0.1em] uppercase hover:bg-[#2a1f0f] transition-all flex items-center gap-2">
        <span class="text-[#c9a84c] text-lg">+</span> New Job Order
      </button>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      <div v-for="stat in projectStats" :key="stat.label"
        class="bg-white border border-[#e8ddc8] rounded-2xl p-6 flex items-center gap-5 hover:border-[#c9a84c] transition-all">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" :style="{ backgroundColor: stat.bg }">
          <span class="text-xl">{{ stat.icon }}</span>
        </div>
        <div>
          <p class="text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em]">{{ stat.label }}</p>
          <p class="text-2xl font-bold text-[#1a1108] mt-0.5">{{ stat.count }}</p>
        </div>
      </div>
    </div>

    <!-- Job Orders Table -->
    <div class="bg-white border border-[#e8ddc8] rounded-2xl overflow-hidden">
      <div class="px-6 py-5 border-b border-[#ede4d3] flex justify-between items-center">
        <h2 class="font-bold text-[#1a1108]">Active Productions</h2>
        <div class="flex gap-2">
          <button v-for="filter in filters" :key="filter"
            @click="activeFilter = filter"
            :class="activeFilter === filter
              ? 'bg-[#1a1108] text-[#f5e6c8]'
              : 'bg-[#faf7f2] text-[#8a7060] hover:bg-[#f0e8d8]'"
            class="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all">
            {{ filter }}
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-[#f0e8d8] bg-[#fdf9f4]">
              <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em]">Customer & Order</th>
              <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em]">Service Type</th>
              <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em]">Measurements</th>
              <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em]">Production Stage</th>
              <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em]">Deadline</th>
              <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#f5efe5]">
            <tr v-for="job in activeJobs" :key="job.id"
              class="hover:bg-[#fdf9f4] transition-colors group">
              <td class="px-6 py-5">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-[#f0e8d8] flex items-center justify-center text-[#8a5a20] font-bold text-sm flex-shrink-0">
                    {{ job.customerName.charAt(0) }}
                  </div>
                  <div>
                    <div class="font-bold text-[#1a1108] text-sm">{{ job.customerName }}</div>
                    <div class="text-[10px] text-[#b0a090] font-mono">Order #{{ job.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-5 text-sm text-[#4a3820] font-medium">{{ job.serviceType }}</td>
              <td class="px-6 py-5">
                <span :class="job.measurementStatus === 'Verified'
                  ? 'bg-[#edf7ee] text-[#2d7a3a] border-[#b8debb]'
                  : 'bg-[#fdf5e8] text-[#8a5a20] border-[#e8c87a]'"
                  class="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase border">
                  {{ job.measurementStatus }}
                </span>
              </td>
              <td class="px-6 py-5">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full flex-shrink-0" :style="{ backgroundColor: getStageColor(job.status) }"></div>
                  <span class="text-xs font-bold" :style="{ color: getStageColor(job.status) }">{{ job.status }}</span>
                </div>
              </td>
              <td class="px-6 py-5">
                <div :class="isUrgent(job.deadline) ? 'text-[#b94040]' : 'text-[#4a3820]'"
                  class="text-sm font-bold">{{ job.deadline }}</div>
                <div v-if="isUrgent(job.deadline)" class="text-[10px] text-[#b94040] font-medium">⚠ Urgent</div>
              </td>
              <td class="px-6 py-5 text-right">
                <button class="text-[#c9a84c] font-bold text-xs hover:text-[#a07c3a] uppercase tracking-wider transition-colors">
                  Update Status
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeFilter = ref('All');
const filters = ['All', 'In Production', 'Fitting', 'Ready'];

const projectStats = ref([
  { label: 'Active Productions', count: 18, icon: '✂️', bg: '#f0e8d8' },
  { label: 'Pending Fittings', count: 5, icon: '📐', bg: '#fdf5e8' },
  { label: 'Ready for Release', count: 12, icon: '✅', bg: '#edf7ee' },
]);

const activeJobs = ref([
  { id: '1001', customerName: 'Alice Morgan', serviceType: 'Wedding Gown (Custom)', measurementStatus: 'Verified', status: 'In Production', deadline: 'March 25, 2026' },
  { id: '1002', customerName: 'Robert Vance', serviceType: 'Office Uniforms (Bulk)', measurementStatus: 'Manual Entry Required', status: 'Cutting', deadline: 'March 18, 2026' },
  { id: '1003', customerName: 'Sarah Jenkins', serviceType: 'Suit Alterations', measurementStatus: 'Verified', status: 'Ready for Fitting', deadline: 'March 16, 2026' },
]);

const getStageColor = (status) => {
  const map = {
    'In Production': '#c9a84c',
    'Cutting': '#a07c3a',
    'Ready for Fitting': '#2d7a3a',
  };
  return map[status] || '#8a7060';
};

const isUrgent = (date) => date.includes('March 16') || date.includes('March 18');
</script>