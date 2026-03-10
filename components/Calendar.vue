<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800">
    
    <div class="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-green-950 tracking-tight">Expedition Calendar</h1>
        <p class="text-gray-500 font-medium">March 2026 • Coordinating 12 upcoming treks</p>
      </div>
      
      <div class="flex items-center gap-2 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
        <button class="px-4 py-2 rounded-xl text-sm font-bold bg-green-700 text-white">Month</button>
        <button class="px-4 py-2 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50">Week</button>
        <button class="px-4 py-2 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50">Day</button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <div class="lg:col-span-3 space-y-6">
        <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 class="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Event Types</h3>
          <div class="space-y-3">
            <div v-for="type in eventTypes" :key="type.label" class="flex items-center gap-3">
              <div :class="type.color" class="w-3 h-3 rounded-full"></div>
              <span class="text-sm font-bold text-gray-700">{{ type.label }}</span>
            </div>
          </div>
        </div>

        <div class="bg-green-900 p-6 rounded-3xl text-white shadow-xl shadow-green-900/20">
          <p class="text-xs font-bold opacity-70 mb-1">Next Briefing</p>
          <h4 class="text-lg font-bold mb-4">Mt. Apo Safety Prep</h4>
          <div class="flex items-center gap-2 text-sm opacity-90 mb-4">
            <span>🕒 09:00 AM</span>
            <span>📍 Zoom Room 4</span>
          </div>
          <button class="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition">
            Join Meeting
          </button>
        </div>
      </div>

      <div class="lg:col-span-9">
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          
          <div class="grid grid-cols-7 border-b border-gray-50 bg-gray-50/50">
            <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" 
                 :key="day" 
                 class="py-4 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
              {{ day }}
            </div>
          </div>

          <div class="grid grid-cols-7">
            <div v-for="date in calendarDays" :key="date.id" 
                 class="min-h-[120px] p-2 border-r border-b border-gray-50 last:border-r-0 hover:bg-gray-50 transition-colors">
              
              <span :class="date.isCurrentMonth ? 'text-gray-800' : 'text-gray-300'" 
                    class="text-xs font-black block mb-2">
                {{ date.day }}
              </span>

              <div class="space-y-1">
                <div v-for="event in date.events" :key="event.title"
                     :class="event.colorClass"
                     class="px-2 py-1 rounded-md text-[9px] font-bold truncate cursor-pointer hover:brightness-95">
                  {{ event.title }}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const eventTypes = [
  { label: 'Summit Trek', color: 'bg-blue-500' },
  { label: 'Medical Check', color: 'bg-red-500' },
  { label: 'Trail Maintenance', color: 'bg-green-500' },
  { label: 'Training', color: 'bg-amber-500' }
]

const calendarDays = ref([
  { id: 1, day: 23, isCurrentMonth: false, events: [] },
  { id: 2, day: 24, isCurrentMonth: false, events: [] },
  { id: 3, day: 25, isCurrentMonth: false, events: [{ title: 'Datu: Apo Prep', colorClass: 'bg-blue-100 text-blue-700' }] },
  { id: 4, day: 26, isCurrentMonth: false, events: [] },
  { id: 5, day: 27, isCurrentMonth: false, events: [] },
  { id: 6, day: 28, isCurrentMonth: false, events: [] },
  { id: 7, day: 1, isCurrentMonth: true, events: [] },
  { id: 8, day: 2, isCurrentMonth: true, events: [{ title: 'Holon Trek', colorClass: 'bg-blue-100 text-blue-700' }] },
  { id: 9, day: 3, isCurrentMonth: true, events: [] },
  { id: 10, day: 4, isCurrentMonth: true, events: [{ title: 'Staff Check-up', colorClass: 'bg-red-100 text-red-700' }] },
  { id: 11, day: 5, isCurrentMonth: true, events: [] },
  { id: 12, day: 6, isCurrentMonth: true, events: [{ title: 'Trail Repair', colorClass: 'bg-green-100 text-green-700' }] },
  { id: 13, day: 7, isCurrentMonth: true, events: [] },
  { id: 14, day: 8, isCurrentMonth: true, events: [] },
  { id: 15, day: 9, isCurrentMonth: true, events: [{ title: 'Apo Summit', colorClass: 'bg-blue-100 text-blue-700' }, { title: 'Liza: Logistics', colorClass: 'bg-amber-100 text-amber-700' }] },
  { id: 16, day: 10, isCurrentMonth: true, events: [] },
  { id: 17, day: 11, isCurrentMonth: true, events: [] },
  { id: 18, day: 12, isCurrentMonth: true, events: [] },
  // ... more days can be added here
])
</script>