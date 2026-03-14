<script setup>
import { ref, computed } from 'vue';

const activeTab = ref('Ongoing');
const tabs = ['Upcoming', 'Ongoing', 'Done'];

const programs = ref([
  { id: 1, title: 'Annual City Drive', date: 'Mar 20, 2026', location: 'Central Plaza', status: 'Upcoming', donors: 0 },
  { id: 2, title: 'Emergency Type O+ Rally', date: 'Mar 14, 2026', location: 'St. Jude Hospital', status: 'Ongoing', donors: 42 },
  { id: 3, title: 'University Blood Week', date: 'Mar 14, 2026', location: 'Campus West', status: 'Ongoing', donors: 128 },
  { id: 4, title: 'Winter Gala Donation', date: 'Feb 28, 2026', location: 'Grand Hall', status: 'Done', donors: 310 },
]);

const filteredPrograms = computed(() => {
  return programs.value.filter(p => p.status === activeTab.value);
});
</script>

<template>
  <div class="bg-[#11141B] rounded-xl border border-gray-800 p-6 w-full max-w-2xl">
    <div class="flex items-center justify-between mb-8">
      <h3 class="text-lg font-semibold text-white">Blood Bank Programs</h3>
      
      <div class="flex bg-[#0B0E14] p-1 rounded-lg border border-gray-800">
        <button 
          v-for="tab in tabs" 
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'px-4 py-1.5 text-xs font-medium rounded-md transition-all',
            activeTab === tab ? 'bg-[#1C212B] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
          ]"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <div class="space-y-4">
      <div v-if="filteredPrograms.length === 0" class="text-gray-500 text-sm text-center py-10">
        No programs currently {{ activeTab.toLowerCase() }}.
      </div>

      <div 
        v-for="program in filteredPrograms" 
        :key="program.id"
        class="flex items-center justify-between p-4 rounded-lg bg-[#1C212B]/50 border border-gray-800 hover:border-gray-700 transition-colors"
      >
        <div class="flex items-center gap-4">
          <div :class="[
            'w-2 h-2 rounded-full',
            program.status === 'Ongoing' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 
            program.status === 'Upcoming' ? 'bg-blue-500' : 'bg-gray-600'
          ]"></div>
          
          <div>
            <h4 class="text-sm font-medium text-white">{{ program.title }}</h4>
            <p class="text-xs text-gray-500">{{ program.location }} • {{ program.date }}</p>
          </div>
        </div>

        <div class="text-right">
          <p class="text-sm font-bold text-white">{{ program.donors }}</p>
          <p class="text-[10px] uppercase tracking-wider text-gray-500">Donors</p>
        </div>
      </div>
    </div>
  </div>
</template>