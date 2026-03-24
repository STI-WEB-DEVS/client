<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div>
        <h1 class="font-['Syne'] text-2xl font-bold text-[#CFFFB3]">Hiking Tours</h1>
        <p class="mt-1 font-['DM_Mono'] text-sm text-[#ADE25D]/70">Monitor all active and upcoming hiking tours</p>
      </div>

      <!-- Tour Cards -->
      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <div v-for="tour in tours" :key="tour.id"
          class="bg-[#3B7080]/20 border border-[#3B7080] rounded-sm overflow-hidden hover:border-[#ADE25D]/50 transition-colors">
          <div class="h-1 bg-gradient-to-r from-[#ADE25D] to-[#CFFFB3]"></div>
          <div class="p-5 space-y-4">
            <div class="flex items-start justify-between gap-2">
              <h2 class="font-['Syne'] text-base font-bold text-[#CFFFB3]">{{ tour.name }}</h2>
              <span :class="statusStyle(tour.status)"
                class="font-['DM_Mono'] text-[10px] tracking-wider uppercase border px-2 py-0.5 rounded-sm shrink-0">{{
                tour.status }}</span>
            </div>
            <div class="space-y-1.5">
              <div class="flex justify-between">
                <span class="font-['DM_Mono'] text-[10px] tracking-[0.1em] uppercase text-[#ADE25D]/60">Organizer</span>
                <span class="font-['DM_Mono'] text-xs text-[#CFFFB3]">{{ tour.organizer }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-['DM_Mono'] text-[10px] tracking-[0.1em] uppercase text-[#ADE25D]/60">Date</span>
                <span class="font-['DM_Mono'] text-xs text-[#CFFFB3]">{{ tour.date }}</span>
              </div>
              <div class="flex justify-between">
                <span
                  class="font-['DM_Mono'] text-[10px] tracking-[0.1em] uppercase text-[#ADE25D]/60">Difficulty</span>
                <span class="font-['DM_Mono'] text-xs text-[#CFFFB3]">{{ tour.difficulty }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-['DM_Mono'] text-[10px] tracking-[0.1em] uppercase text-[#ADE25D]/60">Slots</span>
                <span class="font-['DM_Mono'] text-xs text-[#CFFFB3]">{{ tour.registered }} / {{ tour.slots }}</span>
              </div>
            </div>
            <!-- Slots progress bar -->
            <div class="w-full bg-[#3B7080]/40 rounded-full h-1">
              <div class="bg-[#ADE25D] h-1 rounded-full transition-all"
                :style="`width: ${(tour.registered / tour.slots) * 100}%`"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const tours = [
  { id: 1, name: 'Mt. Apo Day Hike', organizer: 'Summit Trail Co.', date: 'Apr 5, 2026', difficulty: 'Moderate', slots: 30, registered: 27, status: 'Active' },
  { id: 2, name: 'Pulag Overnight', organizer: 'Ridge Walkers PH', date: 'Apr 8, 2026', difficulty: 'Difficult', slots: 20, registered: 12, status: 'Active' },
  { id: 3, name: 'Osmeña Peak Trail', organizer: 'Peak Seekers Group', date: 'Apr 6, 2026', difficulty: 'Easy', slots: 40, registered: 40, status: 'Full' },
  { id: 4, name: 'Mt. Kitanglad Traverse', organizer: 'Trailblaze PH', date: 'Apr 12, 2026', difficulty: 'Difficult', slots: 15, registered: 5, status: 'Active' },
  { id: 5, name: 'Halcon Ridge Assault', organizer: 'Summit Trail Co.', date: 'Apr 20, 2026', difficulty: 'Expert', slots: 12, registered: 2, status: 'Upcoming' },
  { id: 6, name: 'Dulang-dulang Trek', organizer: 'Alpino Adventures', date: 'Apr 25, 2026', difficulty: 'Difficult', slots: 18, registered: 0, status: 'Upcoming' },
]

const statusStyle = (status: string) => ({
  Active: 'text-[#ADE25D] bg-[#ADE25D]/10 border-[#ADE25D]/30',
  Full: 'text-[#CFFFB3] bg-[#3B7080]/50 border-[#3B7080]',
  Upcoming: 'text-[#ADE25D]/60 bg-transparent border-[#3B7080]',
}[status] ?? '')
</script>
