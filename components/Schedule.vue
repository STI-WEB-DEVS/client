<script setup>
import { ref } from 'vue';

const appointments = ref([
  { id: 'A1', type: 'Appointment', time: '09:00 AM', title: 'Whole Blood Donation', person: 'Sarah Jenkins', badge: 'Fast Track' },
  { id: 'A2', type: 'Appointment', time: '11:30 AM', title: 'Plasma Screening', person: 'David Chen', badge: null },
]);

const programs = ref([
  { id: 'P1', type: 'Program', time: '02:00 PM', title: 'Community Outreach Drive', location: 'City Hall', participants: 45 },
  { id: 'P2', type: 'Program', time: '05:00 PM', title: 'Volunteer Orientation', location: 'Main Lab', participants: 12 },
]);

// Merging and sorting by time
const schedule = [...appointments.value, ...programs.value];
</script>

<template>
  <div class="bg-[#0B0E14] text-white p-6 rounded-xl border border-gray-800 shadow-2xl max-w-md mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-xl font-bold italic tracking-tight uppercase">Daily Schedule</h2>
        <p class="text-xs text-gray-500 font-medium">Saturday, March 14, 2026</p>
      </div>
      <button class="bg-red-600/10 hover:bg-red-600/20 text-red-500 p-2 rounded-full transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>

    <div class="space-y-6 relative">
      <div class="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-800"></div>

      <div v-for="item in schedule" :key="item.id" class="relative pl-10">
        <div :class="[
          'absolute left-0 top-1.5 w-[24px] h-[24px] rounded-full border-4 border-[#0B0E14] z-10 flex items-center justify-center',
          item.type === 'Appointment' ? 'bg-red-500' : 'bg-blue-500'
        ]">
          <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>

        <div class="flex flex-col gap-1">
          <div class="flex justify-between items-start">
            <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{{ item.time }}</span>
            <span v-if="item.badge" class="text-[9px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 uppercase font-black">
              {{ item.badge }}
            </span>
          </div>
          
          <h3 class="text-sm font-semibold text-gray-100">{{ item.title }}</h3>
          
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <span v-if="item.type === 'Appointment'" class="flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg>
              {{ item.person }}
            </span>
            <span v-else class="flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>
              {{ item.location }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>