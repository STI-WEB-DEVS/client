<template>
  <div class="min-h-screen bg-[#faf7f2] font-serif text-[#1a1108] p-8">

    <!-- Header -->
    <div class="flex justify-between items-start mb-10">
      <div>
        <p class="text-[10px] tracking-[0.3em] uppercase text-[#b0a090] mb-1">Fabric & Materials</p>
        <h1 class="text-3xl font-bold text-[#1a1108] tracking-tight">Inventory & Supplies</h1>
        <p class="text-[#8a7060] mt-1 text-sm">Monitor tailoring materials and manage supplier procurement.</p>
      </div>
      <div class="flex gap-3">
        <button class="bg-white border border-[#e8ddc8] text-[#4a3820] px-5 py-2.5 rounded-xl font-bold text-sm hover:border-[#c9a84c] transition-all">
          Export Report
        </button>
        <button class="bg-[#1a1108] text-[#f5e6c8] px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#2a1f0f] transition-all flex items-center gap-2">
          <span class="text-[#c9a84c]">+</span> Add Material
        </button>
      </div>
    </div>

    <!-- Alert Banner -->
    <div v-if="lowStockItems.length > 0"
      class="mb-8 p-5 bg-[#fdf5e8] rounded-2xl border border-[#e8c87a] flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 bg-[#b94040] rounded-xl flex items-center justify-center text-white flex-shrink-0">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <p class="text-[#8a5a20] font-bold text-sm">Automated Reorder Alert</p>
          <p class="text-[#a07040] text-xs mt-0.5">
            {{ lowStockItems.length }} material{{ lowStockItems.length > 1 ? 's are' : ' is' }} below the minimum threshold.
          </p>
        </div>
      </div>
      <button class="text-[#8a5a20] font-bold text-sm hover:text-[#c9a84c] transition-colors uppercase tracking-wider text-xs">
        View Procurement →
      </button>
    </div>

    <!-- Stock Summary Cards -->
    <div class="grid grid-cols-3 gap-4 mb-8">
      <div class="bg-white border border-[#e8ddc8] rounded-2xl p-5 text-center hover:border-[#c9a84c] transition-all">
        <p class="text-2xl font-bold text-[#1a1108]">{{ inventoryItems.length }}</p>
        <p class="text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em] mt-1">Total Materials</p>
      </div>
      <div class="bg-[#fdf5e8] border border-[#e8c87a] rounded-2xl p-5 text-center">
        <p class="text-2xl font-bold text-[#8a5a20]">{{ lowStockItems.length }}</p>
        <p class="text-[9px] font-bold text-[#c9a84c] uppercase tracking-[0.2em] mt-1">Low / Critical</p>
      </div>
      <div class="bg-[#edf7ee] border border-[#b8debb] rounded-2xl p-5 text-center">
        <p class="text-2xl font-bold text-[#2d7a3a]">{{ inventoryItems.length - lowStockItems.length }}</p>
        <p class="text-[9px] font-bold text-[#2d7a3a] uppercase tracking-[0.2em] mt-1">In Stock</p>
      </div>
    </div>

    <!-- Inventory Table -->
    <div class="bg-white border border-[#e8ddc8] rounded-2xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-[#f0e8d8] bg-[#fdf9f4]">
              <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em]">Material ID</th>
              <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em]">Material Name</th>
              <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em]">Category</th>
              <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em] text-center">Stock Level</th>
              <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em]">Supplier</th>
              <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em]">Status</th>
              <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em] text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#f5efe5]">
            <tr v-for="item in inventoryItems" :key="item.id"
              class="hover:bg-[#fdf9f4] transition-colors group">
              <td class="px-6 py-5 font-mono text-xs text-[#b0a090]">{{ item.id }}</td>
              <td class="px-6 py-5">
                <div class="font-bold text-[#1a1108] text-sm">{{ item.name }}</div>
              </td>
              <td class="px-6 py-5">
                <span class="text-xs text-[#8a7060] font-medium bg-[#f0e8d8] px-2 py-1 rounded-lg">{{ item.category }}</span>
              </td>
              <td class="px-6 py-5">
                <div class="text-center">
                  <div class="font-bold text-[#1a1108] text-sm">{{ item.stock }} <span class="text-[#b0a090] font-normal text-xs">{{ item.unit }}</span></div>
                  <div class="mt-1.5 w-full bg-[#f0e8d8] h-1.5 rounded-full overflow-hidden max-w-[80px] mx-auto">
                    <div class="h-full rounded-full transition-all"
                      :style="{ width: Math.min(100, (item.stock / item.minStock) * 100) + '%', backgroundColor: getBarColor(item) }">
                    </div>
                  </div>
                  <div class="text-[9px] text-[#c0b0a0] mt-1">Min: {{ item.minStock }}</div>
                </div>
              </td>
              <td class="px-6 py-5 text-sm text-[#4a3820]">{{ item.supplier }}</td>
              <td class="px-6 py-5">
                <span :class="getStatusClass(getStockStatus(item))"
                  class="text-[10px] px-3 py-1 rounded-full font-bold uppercase border">
                  {{ getStockStatus(item) }}
                </span>
              </td>
              <td class="px-6 py-5 text-right">
                <button class="text-[#c9a84c] font-bold text-xs hover:text-[#a07c3a] uppercase tracking-wider transition-colors">
                  Request Stock
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
import { ref, computed } from 'vue';

const inventoryItems = ref([
  { id: 'MT-001', name: 'Premium Silk Fabric', category: 'Fabric', stock: 12, unit: 'Yards', minStock: 20, supplier: 'Textile Hub Inc.' },
  { id: 'MT-002', name: 'Heavy Duty Zippers', category: 'Fasteners', stock: 150, unit: 'Pieces', minStock: 50, supplier: 'ZipMaster Co.' },
  { id: 'MT-003', name: 'Invisible Thread (White)', category: 'Threads', stock: 5, unit: 'Rolls', minStock: 10, supplier: 'Stitch & Sew Supplies' },
  { id: 'MT-004', name: 'Luxury Suit Buttons', category: 'Buttons', stock: 300, unit: 'Pieces', minStock: 100, supplier: 'Elite Trim Ltd.' },
  { id: 'MT-005', name: 'Linen Blend (Beige)', category: 'Fabric', stock: 8, unit: 'Yards', minStock: 15, supplier: 'Textile Hub Inc.' },
]);

const lowStockItems = computed(() => inventoryItems.value.filter(i => i.stock <= i.minStock));

const getStockStatus = (item) => {
  if (item.stock <= item.minStock * 0.5) return 'Critical';
  if (item.stock <= item.minStock) return 'Low Stock';
  return 'In Stock';
};

const getStatusClass = (status) => {
  switch (status) {
    case 'Critical': return 'bg-[#fdf0f0] text-[#b94040] border-[#f0b8b8]';
    case 'Low Stock': return 'bg-[#fdf5e8] text-[#8a5a20] border-[#e8c87a]';
    default: return 'bg-[#edf7ee] text-[#2d7a3a] border-[#b8debb]';
  }
};

const getBarColor = (item) => {
  const status = getStockStatus(item);
  if (status === 'Critical') return '#b94040';
  if (status === 'Low Stock') return '#c9a84c';
  return '#2d7a3a';
};
</script>