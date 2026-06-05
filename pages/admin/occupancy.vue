<template>
  <div class="p-8 bg-slate-50 min-h-screen">
    <header class="flex justify-between items-end mb-8">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight tracking-tight">Real-time Occupancy</h1>
        <p class="text-slate-500 mt-1 italic">Live sensor telemetry from all active SmartPark zones.</p>
      </div>
      <div class="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
        <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
        LIVE FEED ACTIVE
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div v-for="stat in metrics" :key="stat.label" class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ stat.label }}</p>
        <p class="text-2xl font-black text-slate-900 mt-1">{{ stat.value }}</p>
        <p :class="stat.trendUp ? 'text-emerald-500' : 'text-rose-500'" class="text-xs font-bold mt-2">
          {{ stat.trendUp ? '↑' : '↓' }} {{ stat.trend }}% <span class="text-slate-400 font-normal">vs last hour</span>
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
        <div class="p-4 bg-slate-800 flex justify-between items-center border-b border-slate-700">
          <h3 class="text-white font-bold text-sm uppercase tracking-wider">Recent Sensor Triggers</h3>
          <span class="text-slate-400 text-xs">UTC-08:00</span>
        </div>
        <div class="p-0 max-h-[400px] overflow-y-auto">
          <div v-for="event in liveEvents" :key="event.id" 
               class="flex items-center justify-between p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
            <div class="flex items-center gap-4">
              <div :class="event.type === 'ENTRY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'" 
                   class="w-10 h-10 rounded flex items-center justify-center font-bold text-xs border border-white/10">
                {{ event.type }}
              </div>
              <div>
                <p class="text-white font-medium text-sm">{{ event.plate }}</p>
                <p class="text-slate-500 text-xs">{{ event.zone }} • Slot {{ event.slot }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-slate-300 text-xs font-mono">{{ event.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 class="font-bold text-slate-900 mb-4 border-b pb-4">Sensor Infrastructure</h3>
        <div class="space-y-6">
          <div v-for="sensor in sensors" :key="sensor.area" class="flex justify-between items-center">
            <div>
              <p class="text-sm font-bold text-slate-800">{{ sensor.area }}</p>
              <p class="text-xs text-slate-500">{{ sensor.count }} Nodes Connected</p>
            </div>
            <div :class="sensor.health > 95 ? 'text-emerald-500' : 'text-amber-500'" class="text-sm font-black">
              {{ sensor.health }}%
            </div>
          </div>
        </div>
        <button class="w-full mt-8 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition">
          Run System Diagnostic
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const metrics = [
  { label: 'Avg Stay Time', value: '1h 42m', trend: '12', trendUp: false },
  { label: 'Peak Hour', value: '14:00', trend: '4', trendUp: true },
  { label: 'Current Revenue', value: '$1,240', trend: '18', trendUp: true },
  { label: 'Turnover Rate', value: '3.2x', trend: '7', trendUp: true },
];

const liveEvents = ref([
  { id: 1, plate: 'ABC-1234', zone: 'North Lot', slot: 'A-12', type: 'ENTRY', time: '14:22:10' },
  { id: 2, plate: 'XYZ-9876', zone: 'East Lot', slot: 'B-04', type: 'EXIT', time: '14:21:55' },
  { id: 3, plate: 'CAR-4421', zone: 'North Lot', slot: 'A-45', type: 'ENTRY', time: '14:20:01' },
  { id: 4, plate: 'VAN-0012', zone: 'VIP Ground', slot: 'V-01', type: 'ENTRY', time: '14:18:30' },
  { id: 5, plate: 'PRK-5566', zone: 'East Lot', slot: 'B-22', type: 'EXIT', time: '14:15:12' },
]);

const sensors = [
  { area: 'Ground Floor', count: 120, health: 99.8 },
  { area: 'Level 1', count: 85, health: 100 },
  { area: 'Level 2 (VIP)', count: 40, health: 92.4 },
  { area: 'Roof Deck', count: 60, health: 88.0 },
];
</script>