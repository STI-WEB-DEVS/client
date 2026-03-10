<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800">
    
    <div class="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-green-950 tracking-tight">Performance Reports</h1>
        <p class="text-gray-500 font-medium">Quarterly analytics and expedition impact summaries</p>
      </div>
      
      <div class="flex items-center gap-3">
        <select class="bg-white border border-gray-200 px-4 py-2.5 rounded-xl font-bold text-sm text-gray-600 outline-none focus:ring-2 focus:ring-green-500">
          <option>Q1 (Jan - Mar) 2026</option>
          <option>Q4 (Oct - Dec) 2025</option>
        </select>
        <button class="bg-green-900 hover:bg-black text-white px-5 py-2.5 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2">
          <span>📊</span> Export PDF
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in quickStats" :key="stat.label" class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{{ stat.label }}</p>
        <div class="flex items-end gap-2">
          <span class="text-2xl font-black text-gray-800">{{ stat.value }}</span>
          <span :class="stat.trendUp ? 'text-green-600' : 'text-red-600'" class="text-xs font-bold mb-1">
            {{ stat.trendUp ? '↑' : '↓' }} {{ stat.percentage }}%
          </span>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div class="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 class="font-bold text-gray-800">Trail Completion Rates</h3>
          <span class="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded-md">Live Data</span>
        </div>
        <table class="w-full text-left">
          <thead>
            <tr class="text-[10px] font-black uppercase text-gray-400 bg-gray-50/50">
              <th class="p-4">Trail Location</th>
              <th class="p-4">Total Treks</th>
              <th class="p-4">Success Rate</th>
              <th class="p-4">Avg. Duration</th>
            </tr>
          </thead>
          <tbody class="text-sm font-medium">
            <tr v-for="report in trailReports" :key="report.name" class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td class="p-4 font-bold text-gray-700">{{ report.name }}</td>
              <td class="p-4 text-gray-500">{{ report.total }}</td>
              <td class="p-4">
                <div class="flex items-center gap-2">
                  <div class="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-green-500" :style="{ width: report.rate + '%' }"></div>
                  </div>
                  <span class="text-xs font-black">{{ report.rate }}%</span>
                </div>
              </td>
              <td class="p-4 text-gray-500">{{ report.duration }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-green-950 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between">
        <div>
          <h3 class="text-xl font-bold mb-2">Guide Excellence</h3>
          <p class="text-green-300 text-sm mb-8">Based on 450+ post-trek user reviews this quarter.</p>
          
          <div class="space-y-6">
            <div v-for="metric in satisfactionMetrics" :key="metric.label">
              <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                <span>{{ metric.label }}</span>
                <span class="text-green-400">{{ metric.score }}/5.0</span>
              </div>
              <div class="w-full h-1 bg-white/10 rounded-full">
                <div class="h-full bg-green-400" :style="{ width: (metric.score / 5 * 100) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-white/10">
          <p class="text-[10px] font-black uppercase tracking-tighter text-green-500 mb-1">Top Performer</p>
          <div class="flex items-center gap-3">
            <img src="https://i.pravatar.cc/100?img=12" class="w-10 h-10 rounded-full border-2 border-green-500" />
            <div>
              <p class="text-sm font-bold">Datu Bagani</p>
              <p class="text-xs text-green-300">98% Positive Feedback</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const quickStats = ref([
  { label: 'Total Hikers', value: '1,284', trendUp: true, percentage: '12' },
  { label: 'Safety Incidents', value: '2', trendUp: false, percentage: '40' },
  { label: 'Revenue (PHP)', value: '4.2M', trendUp: true, percentage: '18' },
  { label: 'Active Guides', value: '16', trendUp: true, percentage: '5' }
])

const trailReports = ref([
  { name: 'Mt. Apo (Kidapawan)', total: 142, rate: 94, duration: '3D/2N' },
  { name: 'Lake Holon', total: 310, rate: 99, duration: '2D/1N' },
  { name: 'Mt. Dulang-Dulang', total: 64, rate: 82, duration: '4D/3N' },
  { name: 'Mt. Pulag (Ambangeg)', total: 205, rate: 96, duration: '2D/1N' }
])

const satisfactionMetrics = ref([
  { label: 'Safety Knowledge', score: 4.9 },
  { label: 'Pace & Comfort', score: 4.7 },
  { label: 'Storytelling/Local History', score: 4.5 },
  { label: 'Equipment Quality', score: 4.2 }
])
</script>