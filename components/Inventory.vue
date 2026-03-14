<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');

const bloodInventory = ref([
  { type: 'A+', units: 45, status: 'Stable', lastUpdated: '2 hours ago', color: 'bg-green-500' },
  { type: 'O-', units: 8, status: 'Critical', lastUpdated: '15 mins ago', color: 'bg-red-500' },
  { type: 'B+', units: 22, status: 'Low', lastUpdated: '1 hour ago', color: 'bg-yellow-500' },
  { type: 'AB+', units: 56, status: 'Stable', lastUpdated: '5 hours ago', color: 'bg-green-500' },
  { type: 'O+', units: 12, status: 'Low', lastUpdated: '45 mins ago', color: 'bg-yellow-500' },
]);

const filteredInventory = computed(() => {
  return bloodInventory.value.filter(item => 
    item.type.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const getProgressWidth = (units) => {
  // Assuming 60 units is the "Max Capacity" for a shelf
  return Math.min((units / 60) * 100, 100) + '%';
};
</script>

<template>
  <div class="min-h-screen bg-[#F0F2F6] p-4 md:p-8">
    <div class="max-w-6xl mx-auto space-y-8">
      
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-[#2C334E]">Blood Stock Inventory</h2>
          <p class="text-sm text-gray-400 font-medium">Real-time supply monitoring and management</p>
        </div>
        <div class="flex gap-3">
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search type..." 
              class="bg-white border border-gray-100 rounded-xl px-10 py-2.5 text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#2C334E]/10 transition-all"
            />
            <span class="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
          </div>
          <button class="bg-[#2C334E] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-[#1e253d] transition-all">
            + Add Units
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="item in filteredInventory" :key="item.type" 
             class="bg-white p-6 rounded-[2rem] shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] border border-white">
          <div class="flex justify-between items-start mb-4">
            <span class="text-2xl font-black text-[#2C334E]">{{ item.type }}</span>
            <span :class="[
              'text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter',
              item.status === 'Critical' ? 'bg-red-100 text-red-600' : 
              item.status === 'Low' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
            ]">
              {{ item.status }}
            </span>
          </div>
          
          <div class="space-y-2">
            <div class="flex justify-between text-xs text-gray-400 font-bold uppercase">
              <span>Current Stock</span>
              <span>{{ item.units }}u</span>
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <div 
                class="h-full rounded-full transition-all duration-1000"
                :class="item.color"
                :style="{ width: getProgressWidth(item.units) }"
              ></div>
            </div>
            <p class="text-[10px] text-gray-300 italic">Updated {{ item.lastUpdated }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-[2rem] shadow-xl border border-white overflow-hidden">
        <div class="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 class="font-bold text-[#2C334E]">Recent Stock Activity</h3>
          <button class="text-sm text-blue-500 font-bold hover:underline">View All Logs</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-[#F8FAFC] text-[10px] uppercase tracking-widest text-gray-400 font-black">
              <tr>
                <th class="px-8 py-4">Transaction ID</th>
                <th class="px-8 py-4">Blood Type</th>
                <th class="px-8 py-4">Amount</th>
                <th class="px-8 py-4">Source/Destination</th>
                <th class="px-8 py-4">Date</th>
                <th class="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody class="text-sm divide-y divide-gray-50">
              <tr v-for="i in 3" :key="i" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-8 py-5 font-mono text-xs">#TRX-99{{ i }}24</td>
                <td class="px-8 py-5 font-bold text-[#2C334E]">O- (Negative)</td>
                <td class="px-8 py-5 text-red-500 font-bold">-2 Units</td>
                <td class="px-8 py-5 text-gray-500">St. Mary's ER</td>
                <td class="px-8 py-5 text-gray-500">Mar 14, 2026</td>
                <td class="px-8 py-5">
                  <span class="w-2 h-2 rounded-full bg-blue-500 inline-block mr-2"></span>
                  <span class="text-xs font-medium">Dispatched</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.shadow-inner {
  box-shadow: inset 2px 2px 4px rgba(0,0,0,0.05);
}
</style>