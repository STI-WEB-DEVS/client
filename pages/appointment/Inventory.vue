<script setup>
import { ref, computed } from 'vue';

const inventoryItems = ref([
  { id: 'MT-001', name: 'Premium Silk Fabric', category: 'Fabric', stock: 12, unit: 'Yards', minStock: 20, supplier: 'Textile Hub Inc.' },
  { id: 'MT-002', name: 'Heavy Duty Zippers', category: 'Fasteners', stock: 150, unit: 'Pieces', minStock: 50, supplier: 'ZipMaster Co.' },
  { id: 'MT-003', name: 'Invisible Thread (White)', category: 'Threads', stock: 5, unit: 'Rolls', minStock: 10, supplier: 'Stitch & Sew Supplies' },
  { id: 'MT-004', name: 'Luxury Suit Buttons', category: 'Buttons', stock: 300, unit: 'Pieces', minStock: 100, supplier: 'Elite Trim Ltd.' },
  { id: 'MT-005', name: 'Linen Blend (Beige)', category: 'Fabric', stock: 8, unit: 'Yards', minStock: 15, supplier: 'Textile Hub Inc.' }
]);

const lowStockItems = computed(() => {
  return inventoryItems.value.filter(item => item.stock <= item.minStock);
});

const getStockStatus = (item) => {
  if (item.stock <= item.minStock * 0.5) return 'Critical';
  if (item.stock <= item.minStock) return 'Low Stock';
  return 'In Stock';
};

const getStatusClass = (status) => {
  switch (status) {
    case 'Critical': return 'bg-red-100 text-red-700 ring-red-600/20';
    case 'Low Stock': return 'bg-yellow-100 text-yellow-700 ring-yellow-600/20';
    default: return 'bg-green-100 text-green-700 ring-green-600/20';
  }
};
</script>

<template>
  <div class="p-8 bg-white min-h-screen rounded-3xl shadow-sm border border-gray-100">
    <div class="flex justify-between items-start mb-8">
      <div>
        <h1 class="text-3xl font-bold text-slate-900 tracking-tight">Inventory & Supplies</h1>
        <p class="text-slate-500 mt-2">Monitor tailoring materials and manage supplier procurement.</p>
      </div>
      <div class="flex gap-3">
        <button class="px-4 py-2 border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition">
          Export Report
        </button>
        <button class="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
          + Add Material
        </button>
      </div>
    </div>

    <div v-if="lowStockItems.length > 0" class="mb-10 p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="bg-red-600 p-2 rounded-lg text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <p class="text-red-800 font-bold">Automated Reorder Alert </p>
          <p class="text-red-600 text-sm">{{ lowStockItems.length }} materials are below the minimum threshold.</p>
        </div>
      </div>
      <button class="text-red-700 font-bold text-sm hover:underline">View Procurement List</button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-slate-100 text-slate-400 text-[11px] uppercase tracking-widest font-black">
            <th class="pb-4">Material ID</th>
            <th class="pb-4">Material Name</th>
            <th class="pb-4">Category</th>
            <th class="pb-4 text-center">Current Stock</th>
            <th class="pb-4">Supplier [cite: 32]</th>
            <th class="pb-4">Status</th>
            <th class="pb-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-for="item in inventoryItems" :key="item.id" class="group hover:bg-slate-50 transition-colors">
            <td class="py-5 font-mono text-xs text-slate-400">{{ item.id }}</td>
            <td class="py-5">
              <div class="font-bold text-slate-900">{{ item.name }}</div>
            </td>
            <td class="py-5">
              <span class="text-xs text-slate-500 font-medium">{{ item.category }}</span>
            </td>
            <td class="py-5 text-center">
              <div class="font-bold text-slate-900">{{ item.stock }} {{ item.unit }}</div>
              <div class="text-[10px] text-slate-400 italic">Min: {{ item.minStock }}</div>
            </td>
            <td class="py-5 text-sm text-slate-600">{{ item.supplier }}</td>
            <td class="py-5">
              <span :class="getStatusClass(getStockStatus(item))" class="text-[10px] px-3 py-1 rounded-full font-black uppercase ring-1 ring-inset">
                {{ getStockStatus(item) }}
              </span>
            </td>
            <td class="py-5 text-right">
              <button class="text-indigo-600 font-bold text-xs hover:underline">Request Stock </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>