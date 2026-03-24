<template>
  <div class="p-8 bg-[#FDFCFB] min-h-screen font-sans text-slate-900">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div>
        <h1 class="text-3xl font-black text-[#2D2424] tracking-tight">Furnicraft Artisans</h1>
        <p class="text-gray-500 mt-1">Manage staff roles, workshop permissions, and performance.</p>
      </div>
      
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 border-2 border-[#5D4037] text-[#5D4037] px-5 py-2.5 rounded-xl font-bold hover:bg-stone-100 transition-all">
          <PrinterIcon class="w-5 h-5" />
          <span>Roster Report</span>
        </button>
        <button class="flex items-center gap-2 bg-[#5D4037] hover:bg-[#4E342E] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95">
          <UserPlusIcon class="w-5 h-5" />
          <span>Add Member</span>
        </button>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="member in team" :key="member.id" 
           class="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all group">
        
        <div class="p-6 flex items-start justify-between">
          <div class="flex items-center gap-4">
            <div class="relative">
              <div class="w-16 h-16 rounded-2xl bg-[#F4F1EE] flex items-center justify-center text-[#5D4037] font-black text-xl border-2 border-amber-100">
                {{ member.initials }}
              </div>
              <div :class="['absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white', member.online ? 'bg-emerald-500' : 'bg-gray-300']"></div>
            </div>
            <div>
              <h3 class="font-bold text-[#2D2424] text-lg">{{ member.name }}</h3>
              <p class="text-xs font-bold text-amber-600 uppercase tracking-widest">{{ member.role }}</p>
            </div>
          </div>
          <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
            <EllipsisVerticalIcon class="w-5 h-5" />
          </button>
        </div>

        <div class="px-6 py-4 bg-gray-50/50 flex border-t border-b border-gray-100">
          <div class="flex-1 text-center border-r border-gray-200">
            <p class="text-[10px] text-gray-400 uppercase font-bold">Active Orders</p>
            <p class="font-bold text-[#2D2424]">{{ member.activeTasks }}</p>
          </div>
          <div class="flex-1 text-center">
            <p class="text-[10px] text-gray-400 uppercase font-bold">Rating</p>
            <p class="font-bold text-[#2D2424]">{{ member.rating }} / 5.0</p>
          </div>
        </div>

        <div class="p-4 px-6 flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-[10px] text-gray-400 font-bold uppercase">Contact</span>
            <span class="text-sm text-gray-600 truncate max-w-[150px]">{{ member.email }}</span>
          </div>
          <button class="text-sm font-bold text-[#5D4037] hover:underline transition-all">
            Manage Access
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  UserPlusIcon, 
  EllipsisVerticalIcon, 
  PrinterIcon 
} from '@heroicons/vue/24/outline'

const team = [
  { 
    id: 1, 
    name: 'Ricardo Daluz', 
    initials: 'RD', 
    role: 'Master Carpenter', 
    email: 'ricardo.d@furnicraft.ph', 
    activeTasks: 4, 
    rating: '4.9', 
    online: true 
  },
  { 
    id: 2, 
    name: 'Elena Santos', 
    initials: 'ES', 
    role: 'Inventory Manager', 
    email: 'elena.s@furnicraft.ph', 
    activeTasks: 12, 
    rating: '5.0', 
    online: true 
  },
  { 
    id: 3, 
    name: 'Mark Tirona', 
    initials: 'MT', 
    role: 'Order Coordinator', 
    email: 'mark.t@furnicraft.ph', 
    activeTasks: 8, 
    rating: '4.7', 
    online: false 
  },
  { 
    id: 4, 
    name: 'Sarah Gomez', 
    initials: 'SG', 
    role: 'Upholstery Lead', 
    email: 'sarah.g@furnicraft.ph', 
    activeTasks: 3, 
    rating: '4.8', 
    online: true 
  },
  { 
    id: 5, 
    name: 'Juan Abad', 
    initials: 'JA', 
    role: 'Delivery Lead', 
    email: 'juan.a@furnicraft.ph', 
    activeTasks: 15, 
    rating: '4.6', 
    online: false 
  },
  { 
    id: 6, 
    name: 'Patricia Lim', 
    initials: 'PL', 
    role: 'Quality Inspector', 
    email: 'pat.l@furnicraft.ph', 
    activeTasks: 0, 
    rating: '5.0', 
    online: true 
  }
]
</script>