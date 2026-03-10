<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
    
    <div class="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-green-950 tracking-tight">Manaka Ta! Overview</h1>
        <p class="text-gray-500 font-medium">Real-time trail monitoring and hiker logistics</p>
      </div>
      
      <div class="flex items-center gap-3">
        <div class="relative">
          <input 
            type="text" 
            placeholder="Search hikers..." 
            class="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
          >
          <span class="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
        <button class="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-green-900/20 transition-all active:scale-95">
          + New Expedition
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div v-for="(val, label) in stats" :key="label" class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ label.replace(/([A-Z])/g, ' $1') }}</p>
        <div class="flex items-end justify-between mt-2">
          <h3 class="text-3xl font-black text-green-900 leading-none">{{ val }}</h3>
          <span class="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">Live</span>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <div class="lg:col-span-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 class="font-bold text-gray-800 text-lg">Active Queue</h3>
          <button class="text-sm font-bold text-green-700 hover:text-green-900">Export CSV</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="text-[11px] font-black text-gray-400 uppercase tracking-wider bg-gray-50/50">
                <th class="px-6 py-4">Lead Hiker</th>
                <th class="px-6 py-4">Trail / Route</th>
                <th class="px-6 py-4">Status</th>
                <th class="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="booking in recentBookings" :key="booking.id" class="group hover:bg-green-50/30 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs">
                      {{ booking.hiker.charAt(0) }}
                    </div>
                    <span class="font-semibold text-gray-700">{{ booking.hiker }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-gray-600 font-medium">{{ booking.trail }}</td>
                <td class="px-6 py-4">
                  <span :class="statusClass(booking.status)">{{ booking.status }}</span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="text-gray-400 hover:text-green-700 font-bold transition">Manage</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="lg:col-span-4 space-y-6">
        
        <div class="bg-green-950 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          <div class="relative z-10">
            <div class="flex items-center gap-2 mb-4">
              <span class="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              <span class="text-xs font-bold uppercase tracking-widest opacity-70">GPS Monitoring</span>
            </div>
            <p class="text-4xl font-black mb-1">98.2%</p>
            <p class="text-green-400 text-sm font-medium">Signal strength across all trails</p>
            <button class="mt-8 w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold transition-all shadow-lg">
              Launch Tracking Map
            </button>
          </div>
          <div class="absolute -right-10 -top-10 w-40 h-40 bg-green-900 rounded-full blur-3xl group-hover:bg-green-800 transition-colors"></div>
        </div>

        <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>⛈️</span> Trail Safety
          </h3>
          <div class="space-y-4">
            <div v-for="trail in trails" :key="trail.name" class="flex items-center justify-between p-3 rounded-2xl bg-gray-50">
              <div>
                <p class="text-sm font-bold text-gray-700">{{ trail.name }}</p>
                <p class="text-[10px] text-gray-500">{{ trail.location }}</p>
              </div>
              <span :class="trail.isSafe ? 'text-green-600' : 'text-orange-500'" class="text-xs font-black uppercase">
                {{ trail.isSafe ? 'Open' : 'Alert' }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const stats = reactive({
  ActiveHikers: 42,
  OpenTrails: 12,
  EmergencyAlerts: 0,
  MonthlyTours: 156
})

const trails = ref([
  { name: 'Mt. Apo Peak', location: 'Kidapawan Trail', isSafe: true },
  { name: 'Lake Holon', location: 'Tboli Route', isSafe: true },
  { name: 'Pine Ridge', location: 'Bukidnon Pass', isSafe: false },
])

const recentBookings = ref([
  { id: 1, hiker: 'Juan Dela Cruz', trail: 'Mt. Apo Peak', status: 'On Trail' },
  { id: 2, hiker: 'Maria Santos', trail: 'Lake Holon', status: 'Pending' },
  { id: 3, hiker: 'Kevin Hart', trail: 'Pine Ridge', status: 'Canceled' },
  { id: 4, hiker: 'Sarah Jenkins', trail: 'Mt. Apo Peak', status: 'Completed' },
])

const statusClass = (status) => {
  const base = 'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter '
  switch (status) {
    case 'Pending': return base + 'bg-amber-100 text-amber-700'
    case 'On Trail': return base + 'bg-green-100 text-green-700'
    case 'Completed': return base + 'bg-blue-100 text-blue-700'
    case 'Canceled': return base + 'bg-red-100 text-red-700'
    default: return base + 'bg-gray-100 text-gray-700'
  }
}
</script>