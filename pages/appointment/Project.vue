<template>
  <div class="p-8 bg-white min-h-screen rounded-3xl shadow-sm border border-gray-100">
    <div class="flex justify-between items-center mb-10">
      <div>
        <h1 class="text-3xl font-bold text-slate-900 tracking-tight">Job Order Tracking</h1>
        <p class="text-slate-500 mt-2">Manage customized clothing services and production status.</p>
      </div>
      <button class="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
        <span>+</span> New Job Order
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div v-for="stat in projectStats" :key="stat.label" class="p-6 rounded-2xl bg-slate-50 border border-slate-100">
        <p class="text-xs font-black text-slate-400 uppercase tracking-widest">{{ stat.label }}</p>
        <p class="text-3xl font-bold text-slate-900 mt-2">{{ stat.count }}</p>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-slate-100 text-slate-400 text-sm uppercase tracking-widest font-black">
            <th class="pb-4 font-black">Customer & Order</th>
            <th class="pb-4 font-black">Service Type</th>
            <th class="pb-4 font-black">Measurements</th>
            <th class="pb-4 font-black">Status</th>
            <th class="pb-4 font-black">Deadline</th>
            <th class="pb-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-for="job in activeJobs" :key="job.id" class="group hover:bg-slate-50 transition-colors">
            <td class="py-5">
              <div class="font-bold text-slate-900">{{ job.customerName }}</div>
              <div class="text-xs text-slate-500">Order ID: #{{ job.id }}</div>
            </td>
            <td class="py-5 text-sm text-slate-600 font-medium">
              {{ job.serviceType }}
            </td>
            <td class="py-5">
              <span class="text-xs bg-slate-200 px-2 py-1 rounded font-bold text-slate-700 uppercase">
                {{ job.measurementStatus }}
              </span>
            </td>
            <td class="py-5">
              <span :class="getStatusStyles(job.status)" class="text-[10px] px-3 py-1 rounded-full font-black uppercase">
                {{ job.status }}
              </span>
            </td>
            <td class="py-5 text-sm font-bold" :class="isUrgent(job.deadline) ? 'text-red-500' : 'text-slate-700'">
              {{ job.deadline }}
            </td>
            <td class="py-5 text-right">
              <button class="text-indigo-600 font-bold text-xs hover:underline">Update Status</button>
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
  { label: 'Pending Fittings', count: 5 },
  { label: 'Ready for Release', count: 12 }
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
    case 'In Production': return base + "bg-blue-50 text-blue-700 ring-blue-700/10";
    case 'Cutting': return base + "bg-yellow-50 text-yellow-700 ring-yellow-700/10";
    case 'Ready for Fitting': return base + "bg-purple-50 text-purple-700 ring-purple-700/10";
    default: return base + "bg-slate-50 text-slate-700 ring-slate-700/10";
  }
};

const isUrgent = (date) => {
  return date.includes('March 16') || date.includes('March 18');
};
</script>