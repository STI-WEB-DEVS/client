<template>
  <div class="p-8 bg-[#0f172a] min-h-screen rounded-3xl shadow-2xl">

    <!-- Header -->
    <div class="flex justify-between items-center mb-10 border-b border-white/10 pb-8">
      <div>
        <p class="text-teal-400 text-xs font-black uppercase tracking-widest mb-2">Sutura TMS</p>
        <h1 class="text-3xl font-bold text-white tracking-tight">Job Order Tracking</h1>
        <p class="text-slate-400 mt-2">Manage customized clothing services and production status.</p>
      </div>
      <button class="bg-teal-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-400 transition-all flex items-center gap-2 shadow-lg shadow-teal-900/40">
        <span>+</span> New Job Order
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      <div v-for="stat in projectStats" :key="stat.label"
        class="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
        <p class="text-xs font-black text-slate-500 uppercase tracking-widest">{{ stat.label }}</p>
        <p class="text-3xl font-bold text-white mt-2">{{ stat.count }}</p>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-white/10 text-slate-500 text-[11px] uppercase tracking-widest font-black">
            <th class="pb-4">Customer & Order</th>
            <th class="pb-4">Service Type</th>
            <th class="pb-4">Measurements</th>
            <th class="pb-4">Status</th>
            <th class="pb-4">Deadline</th>
            <th class="pb-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr v-for="job in activeJobs" :key="job.id" class="group hover:bg-white/5 transition-colors">
            <td class="py-5">
              <div class="font-bold text-white">{{ job.customerName }}</div>
              <div class="text-xs text-slate-500">Order ID: #{{ job.id }}</div>
            </td>
            <td class="py-5 text-sm text-slate-400 font-medium">
              {{ job.serviceType }}
            </td>
            <td class="py-5">
              <span class="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-md font-bold text-slate-400 uppercase">
                {{ job.measurementStatus }}
              </span>
            </td>
            <td class="py-5">
              <span :class="getStatusStyles(job.status)" class="text-[10px] px-3 py-1 rounded-full font-black uppercase ring-1 ring-inset">
                {{ job.status }}
              </span>
            </td>
            <td class="py-5 text-sm font-bold" :class="isUrgent(job.deadline) ? 'text-red-400' : 'text-slate-300'">
              {{ job.deadline }}
            </td>
            <td class="py-5 text-right">
              <button class="text-teal-400 font-bold text-xs hover:text-teal-300 hover:underline transition">
                Update Status
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const projectStats = ref([
  { label: 'Active Productions', count: 18 },
  { label: 'Pending Fittings',   count: 5  },
  { label: 'Ready for Release',  count: 12 }
]);

const activeJobs = ref([
  {
    id: '1001',
    customerName: 'Alice Morgan',
    serviceType: 'Wedding Gown (Custom)',
    measurementStatus: 'Verified',
    status: 'In Production',
    deadline: 'March 25, 2026'
  },
  {
    id: '1002',
    customerName: 'Robert Vance',
    serviceType: 'Office Uniforms (Bulk)',
    measurementStatus: 'Manual Entry Required',
    status: 'Cutting',
    deadline: 'March 18, 2026'
  },
  {
    id: '1003',
    customerName: 'Sarah Jenkins',
    serviceType: 'Suit Alterations',
    measurementStatus: 'Verified',
    status: 'Ready for Fitting',
    deadline: 'March 16, 2026'
  }
]);

const getStatusStyles = (status) => {
  const base = "ring-1 ring-inset ";
  switch (status) {
    case 'In Production':    return base + "bg-blue-400/10 text-blue-400 ring-blue-400/20";
    case 'Cutting':          return base + "bg-yellow-400/10 text-yellow-400 ring-yellow-400/20";
    case 'Ready for Fitting':return base + "bg-purple-400/10 text-purple-400 ring-purple-400/20";
    default:                 return base + "bg-slate-400/10 text-slate-400 ring-slate-400/20";
  }
};

const isUrgent = (date) => {
  return date.includes('March 16') || date.includes('March 18');
};
</script>