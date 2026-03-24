<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="font-['Syne'] text-2xl font-bold text-[#CFFFB3]">Hikers</h1>
          <p class="mt-1 font-['DM_Mono'] text-sm text-[#ADE25D]/70">Monitor hiker registrations across all tours</p>
        </div>
        <div class="flex items-center gap-3">
          <input
            v-model="search"
            type="text"
            placeholder="Search hikers..."
            class="font-['DM_Mono'] text-xs bg-[#3B7080]/20 border border-[#3B7080] text-[#CFFFB3] placeholder-[#ADE25D]/30 px-3 py-2 rounded-sm focus:outline-none focus:border-[#ADE25D] w-52 transition-colors"
          />
        </div>
      </div>

      <!-- Stats row -->
      <div class="grid grid-cols-3 gap-4">
        <div v-for="s in hikerStats" :key="s.label" class="bg-[#3B7080]/20 border border-[#3B7080] rounded-sm px-5 py-4">
          <p class="font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D] mb-1">{{ s.label }}</p>
          <p class="font-['Syne'] text-2xl font-bold text-[#CFFFB3]">{{ s.value }}</p>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-[#3B7080]/20 border border-[#3B7080] rounded-sm overflow-hidden">
        <table class="min-w-full divide-y divide-[#3B7080]/40">
          <thead>
            <tr class="bg-[#3B7080]/30">
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Hiker</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Tour</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Organizer</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Date</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#3B7080]/30">
            <tr v-for="hiker in filteredHikers" :key="hiker.id" class="hover:bg-[#3B7080]/20 transition-colors">
              <td class="px-6 py-4">
                <p class="font-['Syne'] text-sm font-semibold text-[#CFFFB3]">{{ hiker.name }}</p>
                <p class="font-['DM_Mono'] text-xs text-[#ADE25D]/60">{{ hiker.email }}</p>
              </td>
              <td class="px-6 py-4 font-['DM_Mono'] text-xs text-[#CFFFB3]">{{ hiker.tour }}</td>
              <td class="px-6 py-4 font-['DM_Mono'] text-xs text-[#ADE25D]/70">{{ hiker.organizer }}</td>
              <td class="px-6 py-4 font-['DM_Mono'] text-xs text-[#ADE25D]/70">{{ hiker.date }}</td>
              <td class="px-6 py-4">
                <span :class="hiker.status === 'Confirmed' ? 'text-[#ADE25D] bg-[#ADE25D]/10 border-[#ADE25D]/30' : 'text-[#CFFFB3]/50 bg-[#3B7080]/30 border-[#3B7080]'" class="font-['DM_Mono'] text-[10px] tracking-wider uppercase border px-2 py-0.5 rounded-sm">{{ hiker.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')

const hikerStats = [
  { label: 'Total Registered', value: '1,284' },
  { label: 'Confirmed',        value: '987' },
  { label: 'Pending',          value: '297' },
]

const hikers = ref([
  { id: 1, name: 'Maria Santos',    email: 'maria@email.com',  tour: 'Mt. Apo Day Hike',       organizer: 'Summit Trail Co.',   date: 'Apr 5, 2026',  status: 'Confirmed' },
  { id: 2, name: 'Juan dela Cruz',  email: 'juan@email.com',   tour: 'Pulag Overnight',        organizer: 'Ridge Walkers PH',   date: 'Apr 8, 2026',  status: 'Pending' },
  { id: 3, name: 'Ana Reyes',       email: 'ana@email.com',    tour: 'Osmeña Peak Trail',      organizer: 'Peak Seekers Group', date: 'Apr 6, 2026',  status: 'Confirmed' },
  { id: 4, name: 'Carlo Mendoza',   email: 'carlo@email.com',  tour: 'Mt. Kitanglad Traverse', organizer: 'Trailblaze PH',      date: 'Apr 12, 2026', status: 'Pending' },
  { id: 5, name: 'Sofia Lim',       email: 'sofia@email.com',  tour: 'Mt. Apo Day Hike',       organizer: 'Summit Trail Co.',   date: 'Apr 5, 2026',  status: 'Confirmed' },
  { id: 6, name: 'Ramon Torres',    email: 'ramon@email.com',  tour: 'Pulag Overnight',        organizer: 'Ridge Walkers PH',   date: 'Apr 8, 2026',  status: 'Confirmed' },
])

const filteredHikers = computed(() =>
  hikers.value.filter(h =>
    h.name.toLowerCase().includes(search.value.toLowerCase()) ||
    h.tour.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>
