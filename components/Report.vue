<script setup>
import { ref } from 'vue';

const selectedTimeframe = ref('This Month');
const timeframes = ['This Week', 'This Month', 'This Year', 'Custom Range'];

const reportMetrics = ref([
  { label: 'Total Donations', value: '1,284', trend: '+12%', positive: true, icon: '🩸' },
  { label: 'Units Dispatched', value: '856', trend: '+5%', positive: true, icon: '🚑' },
  { label: 'New Donors', value: '142', trend: '-2%', positive: false, icon: '👤' },
  { label: 'Wastage Rate', value: '0.8%', trend: '-15%', positive: true, icon: '🗑️' },
]);

const bloodTypeData = ref([
  { type: 'O+', percentage: 38, count: 488 },
  { type: 'A+', percentage: 32, count: 410 },
  { type: 'B+', percentage: 15, count: 192 },
  { type: 'O-', percentage: 7, count: 90 },
  { type: 'Other', percentage: 8, count: 104 },
]);
</script>

<template>
  <div class="min-h-screen bg-[#F0F2F6] p-4 md:p-8">
    <div class="max-w-6xl mx-auto space-y-8">
      
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 class="text-2xl font-bold text-[#2C334E]">Analytics Reports</h2>
          <p class="text-sm text-gray-400 font-medium">Data-driven insights for blood supply management</p>
        </div>
        
        <div class="flex items-center gap-3 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
          <button 
            v-for="time in timeframes" 
            :key="time"
            @click="selectedTimeframe = time"
            :class="[
              'px-4 py-2 text-xs font-bold rounded-xl transition-all',
              selectedTimeframe === time ? 'bg-[#2C334E] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'
            ]"
          >
            {{ time }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div v-for="metric in reportMetrics" :key="metric.label" 
             class="bg-white p-6 rounded-[2rem] shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] border border-white">
          <div class="flex justify-between items-start mb-4">
            <span class="text-2xl">{{ metric.icon }}</span>
            <span :class="[
              'text-[10px] font-black px-2 py-1 rounded-lg',
              metric.positive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            ]">
              {{ metric.trend }}
            </span>
          </div>
          <h4 class="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">{{ metric.label }}</h4>
          <p class="text-2xl font-black text-[#2C334E]">{{ metric.value }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 bg-white rounded-[2rem] p-8 shadow-xl border border-white">
          <div class="flex justify-between items-center mb-8">
            <h3 class="font-bold text-[#2C334E]">Donation Volume Trend</h3>
            <div class="flex gap-2">
              <span class="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                <span class="w-2 h-2 rounded-full bg-[#2C334E]"></span> This Year
              </span>
              <span class="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                <span class="w-2 h-2 rounded-full bg-gray-200"></span> Last Year
              </span>
            </div>
          </div>
          
          <div class="h-64 flex items-end justify-between gap-2 px-4 border-b border-gray-100">
            <div v-for="i in 12" :key="i" class="w-full bg-gray-50 rounded-t-lg relative group">
              <div 
                class="absolute bottom-0 w-full bg-[#2C334E] rounded-t-lg transition-all duration-1000 group-hover:bg-red-500"
                :style="{ height: Math.floor(Math.random() * 80) + 20 + '%' }"
              ></div>
            </div>
          </div>
          <div class="flex justify-between mt-4 px-4 text-[10px] font-bold text-gray-300">
            <span>JAN</span><span>MAR</span><span>MAY</span><span>JUL</span><span>SEP</span><span>NOV</span>
          </div>
        </div>

        <div class="bg-white rounded-[2rem] p-8 shadow-xl border border-white">
          <h3 class="font-bold text-[#2C334E] mb-6">Stock Distribution</h3>
          <div class="space-y-6">
            <div v-for="data in bloodTypeData" :key="data.type" class="space-y-2">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-[#2C334E]">{{ data.type }}</span>
                <span class="text-gray-400">{{ data.count }} units</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-red-500 rounded-full" 
                  :style="{ width: data.percentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
          <button class="w-full mt-8 py-3 bg-[#F8FAFC] text-[#2C334E] font-bold text-xs rounded-xl border border-gray-100 hover:bg-gray-50 transition">
            Download Full CSV Report
          </button>
        </div>
      </div>

    </div>
  </div>
</template>