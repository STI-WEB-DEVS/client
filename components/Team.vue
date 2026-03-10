<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
    
    <div class="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-green-950 tracking-tight">Trail Team</h1>
        <p class="text-gray-500 font-medium">Manage guides, medical staff, and tour coordinators</p>
      </div>
      
      <div class="flex items-center gap-3">
        <div class="flex -space-x-2 overflow-hidden mr-4">
          <img v-for="i in 4" :key="i" class="inline-block h-8 w-8 rounded-full ring-2 ring-white" :src="`https://i.pravatar.cc/100?img=${i+10}`" alt="">
          <div class="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white text-[10px] font-bold text-gray-600">+12</div>
        </div>
        <button class="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-green-900/20 transition-all">
          + Add Member
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      <div class="lg:col-span-3 flex items-center gap-2 overflow-x-auto pb-2">
        <button v-for="filter in ['All Staff', 'Mountain Guides', 'Medical', 'Coordinators']" 
                :key="filter"
                class="whitespace-nowrap px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-bold text-gray-600 hover:border-green-500 hover:text-green-700 transition">
          {{ filter }}
        </button>
      </div>
      <div class="bg-green-100 px-4 py-2 rounded-xl flex items-center justify-between">
        <span class="text-green-800 text-xs font-black uppercase">Active Now</span>
        <span class="text-green-900 font-bold">8 / 16 Guides</span>
      </div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="member in team" :key="member.id" 
           class="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all p-6 group">
        
        <div class="flex justify-between items-start mb-4">
          <div class="relative">
            <img :src="member.avatar" class="w-16 h-16 rounded-2xl object-cover border-2 border-gray-50" />
            <span :class="member.available ? 'bg-green-500' : 'bg-amber-500'" 
                  class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"></span>
          </div>
          <div class="text-right">
            <span class="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Rating</span>
            <span class="text-sm font-bold text-amber-500">⭐ {{ member.rating }}</span>
          </div>
        </div>

        <div class="mb-4">
          <h3 class="text-xl font-bold text-gray-800">{{ member.name }}</h3>
          <p class="text-sm text-green-700 font-semibold">{{ member.role }}</p>
        </div>

        <div class="flex flex-wrap gap-2 mb-6">
          <span v-for="tag in member.tags" :key="tag" 
                class="text-[10px] font-bold px-2 py-1 bg-gray-100 text-gray-500 rounded-md group-hover:bg-green-50 group-hover:text-green-700 transition">
            {{ tag }}
          </span>
        </div>

        <div class="border-t border-gray-50 pt-4 flex items-center justify-between">
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase">Current Trail</p>
            <p class="text-sm font-bold text-gray-700">{{ member.currentTrail || 'On Standby' }}</p>
          </div>
          <button class="p-2 hover:bg-gray-100 rounded-lg transition">
            <span class="text-gray-400">💬</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const team = ref([
  {
    id: 1,
    name: 'Justine Mantua',
    role: 'Lead Mountain Guide',
    avatar: 'https://i.pravatar.cc/150?img=12',
    available: true,
    rating: '4.9',
    tags: ['Survivalist', 'Local History', 'First Aid'],
    currentTrail: 'Mt. Apo - Kidapawan'
  },
  {
    id: 2,
    name: 'Matt Pojadas',
    role: 'Medical Officer',
    avatar: 'https://i.pravatar.cc/150?img=26',
    available: true,
    rating: '5.0',
    tags: ['EMT', 'Search & Rescue'],
    currentTrail: null
  },
  {
    id: 3,
    name: 'Anikan Villa-Abrille',
    role: 'Senior Guide',
    avatar: 'https://i.pravatar.cc/150?img=11',
    available: false,
    rating: '4.8',
    tags: ['Photography', 'Navigation'],
    currentTrail: 'Lake Holon'
  },
  {
    id: 4,
    name: 'John Lloyd Adlaw',
    role: 'Tour Coordinator',
    avatar: 'https://i.pravatar.cc/150?img=32',
    available: true,
    rating: '4.7',
    tags: ['Logistics', 'Multilingual'],
    currentTrail: 'Base Camp Alpha'
  },
  {
    id: 5,
    name: 'Bryce Opaw',
    role: 'Junior Guide',
    avatar: 'https://i.pravatar.cc/150?img=13',
    available: true,
    rating: '4.5',
    tags: ['First Aid', 'High Altitude'],
    currentTrail: null
  }
])
</script>