<template>
  <div class="p-8 bg-[#FDFCFB] min-h-screen">
    <header class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-[#2D2424] tracking-tight">Workshop Calendar</h1>
        <p class="text-gray-500 font-medium italic">Furnicraft Production & Delivery Schedule</p>
      </div>
      <div class="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
        <button class="p-2 hover:bg-gray-100 rounded-xl transition-colors"><ChevronLeftIcon class="w-5 h-5"/></button>
        <span class="px-4 font-black text-[#2D2424] text-sm tracking-widest uppercase">March 2026</span>
        <button class="p-2 hover:bg-gray-100 rounded-xl transition-colors"><ChevronRightIcon class="w-5 h-5"/></button>
      </div>
    </header>

    <div class="bg-white rounded-[2.5rem] border border-gray-200 shadow-sm overflow-hidden">
      <div class="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
        <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" 
             class="py-5 text-center text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
          {{ day }}
        </div>
      </div>

      <div class="grid grid-cols-7 auto-rows-[140px]">
        <div v-for="cell in calendarGrid" :key="cell.id" 
             :class="['border-r border-b border-gray-100 p-3 transition-all hover:bg-amber-50/10', !cell.current ? 'bg-gray-50/30' : '']">
          <span :class="['text-sm font-black', cell.current ? 'text-[#2D2424]' : 'text-gray-300']">{{ cell.date }}</span>
          
          <div class="mt-2 space-y-1">
            <div v-for="event in cell.events" :key="event.title" 
                 :class="['px-2 py-1 rounded-lg border-l-4 shadow-sm text-[10px] font-bold leading-tight', event.style]">
              <span class="block opacity-60 text-[8px] uppercase font-black tracking-tighter">{{ event.type }}</span>
              <span class="truncate block">{{ event.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const calendarGrid = [
  // Days from previous month
  { id: 1, date: 23, current: false, events: [] },
  { id: 2, date: 24, current: false, events: [] },
  { id: 3, date: 25, current: false, events: [] },
  { id: 4, date: 26, current: false, events: [] },
  { id: 5, date: 27, current: false, events: [] },
  { id: 6, date: 28, current: false, events: [] },
  { id: 7, date: 1, current: true, events: [] },
  { id: 8, date: 2, current: true, events: [
    { type: 'Logistics', title: '6-Seater Narra Set Delivery', style: 'bg-amber-50 border-amber-500 text-amber-900' }
  ]},
  { id: 9, date: 3, current: true, events: [
    { type: 'Workshop', title: 'Start Sanding: Oak Bed', style: 'bg-blue-50 border-blue-500 text-blue-900' }
  ]},
  { id: 10, date: 4, current: true, events: [] },
  { id: 11, date: 5, current: true, events: [
    { type: 'Restock', title: 'Wood Varnish Arrival', style: 'bg-emerald-50 border-emerald-500 text-emerald-900' }
  ]},
  { id: 12, date: 6, current: true, events: [
    { type: 'Client', title: 'Meeting: SM Seaside Project', style: 'bg-purple-50 border-purple-500 text-purple-900' }
  ]},
  { id: 13, date: 7, current: true, events: [] },
  { id: 14, date: 8, current: true, events: [
    { type: 'Workshop', title: 'Assembly: Sofa Frames', style: 'bg-blue-50 border-blue-500 text-blue-900' }
  ]},
  { id: 15, date: 9, current: true, events: [] },
  { id: 16, date: 10, current: true, events: [
    { type: 'Logistics', title: 'Minimalist Desk (x5) Delivery', style: 'bg-amber-50 border-amber-500 text-amber-900' }
  ]},
  // ... pun-an pa nato if kailangan
]
</script>