<template>
  <div class="p-8 bg-slate-50 min-h-screen">
    <header class="mb-8">
      <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Parking Zones</h1>
      <p class="text-slate-500 mt-1">Geospatial management of active parking lots and levels.</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="zone in parkingZones" :key="zone.id" 
           class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        
        <div class="p-6 border-b border-slate-100 flex justify-between items-start">
          <div>
            <h3 class="text-xl font-bold text-slate-900">{{ zone.name }}</h3>
            <span class="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-500 uppercase tracking-wider">
              {{ zone.type }}
            </span>
          </div>
          <div :class="getStatusBadge(zone.occupancy, zone.total)">
            {{ Math.round((zone.occupancy / zone.total) * 100) }}% Full
          </div>
        </div>

        <div class="p-6">
          <div class="flex justify-between mb-2 text-sm font-medium">
            <span class="text-slate-500">Live Occupancy</span>
            <span class="text-slate-900">{{ zone.occupancy }} / {{ zone.total }} Slots</span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-3">
            <div class="h-3 rounded-full transition-all duration-1000" 
                 :style="{ width: (zone.occupancy / zone.total * 100) + '%' }"
                 :class="getProgressColor(zone.occupancy, zone.total)">
            </div>
          </div>
        </div>

        <div class="bg-slate-50 px-6 py-4 flex gap-3">
          <button class="flex-1 bg-white border border-slate-300 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100">
            View Map
          </button>
          <button class="flex-1 bg-blue-900 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-800">
            Edit Rates
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const parkingZones = ref([
  { id: 1, name: 'North Multi-Level', type: 'Indoor', occupancy: 142, total: 200 },
  { id: 2, name: 'East Surface Lot', type: 'Outdoor', occupancy: 88, total: 90 },
  { id: 3, name: 'VIP Underground', type: 'Premium', occupancy: 12, total: 50 },
  { id: 4, name: 'Main Terminal B', type: 'Short Term', occupancy: 310, total: 400 },
  { id: 5, name: 'Employee Parking', type: 'Restricted', occupancy: 45, total: 100 },
]);

// Determine badge color based on congestion
const getStatusBadge = (occ, total) => {
  const ratio = occ / total;
  const base = "text-xs font-bold px-3 py-1 rounded-full ";
  if (ratio > 0.9) return base + "bg-red-100 text-red-600";
  if (ratio > 0.7) return base + "bg-amber-100 text-amber-600";
  return base + "bg-emerald-100 text-emerald-600";
};

// Determine progress bar color
const getProgressColor = (occ, total) => {
  const ratio = occ / total;
  if (ratio > 0.9) return "bg-red-500";
  if (ratio > 0.7) return "bg-amber-500";
  return "bg-emerald-500";
};
</script>