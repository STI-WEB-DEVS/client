<template>
  <div class="p-6 space-y-6">
    <div v-for="promo in promos" :key="promo.code" 
      class="bg-white p-8 rounded-2xl shadow-md border border-slate-200 flex justify-between items-center transition-all hover:shadow-lg">
      
      <div class="flex items-center gap-x-6">
        <div class="p-4 bg-sky-50 rounded-2xl">
          <TagIcon class="size-8 text-[#0088cc]" />
        </div>
        
        <div>
          <h3 class="text-2xl font-black uppercase italic text-[#0088cc] tracking-tight">
            {{ promo.title }}
          </h3>
          <div class="mt-2 flex items-center gap-x-2 text-black font-bold text-sm">
            <ClockIcon class="size-5 text-slate-400" />
            <span>Valid until: {{ promo.expiry }}</span>
          </div>
        </div>
      </div>

      <button class="bg-[#0088cc] text-white px-10 py-4 rounded-xl font-mono font-black text-xl tracking-widest shadow-lg shadow-blue-200 hover:bg-[#0077b3] active:scale-95 transition-all">
        {{ promo.code }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { TagIcon, ClockIcon } from '@heroicons/vue/24/outline'

const promos = [
  { title: 'Summer Kickoff - 20% OFF', code: 'SUMMER2026', expiry: 'March 31, 2026' },
  { title: 'First Time Traveler', code: 'TRAVELNEW', expiry: 'Ongoing' }
]
</script>