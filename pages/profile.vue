<template>
    <NuxtLayout>
  <div class="p-8 bg-[#FDFCFB] min-h-screen font-sans">
    <div class="relative mb-24">
      <div class="h-48 w-full bg-[#5D4037] rounded-[2.5rem] shadow-inner flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#FFB300 1px, transparent 1px); background-size: 20px 20px;"></div>
        <h2 class="text-white/10 text-9xl font-black select-none">FURNICRAFT</h2>
      </div>
      
      <div class="absolute -bottom-16 left-12 flex items-end gap-6">
        <div class="w-32 h-32 bg-white p-2 rounded-[2rem] shadow-xl">
          <div class="w-full h-full bg-amber-100 rounded-[1.5rem] flex items-center justify-center text-[#5D4037]">
            <UserIcon class="w-16 h-16" />
          </div>
        </div>
        <div class="mb-4">
          <h1 class="text-3xl font-black text-[#2D2424] tracking-tight">Juan Dela Cruz</h1>
          <p class="text-amber-600 font-bold uppercase text-xs tracking-[0.2em]">Senior Master Artisan</p>
        </div>
      </div>

      <div class="absolute -bottom-12 right-12 flex gap-3">
        <button class="bg-white border border-gray-200 p-3 rounded-xl shadow-sm hover:bg-gray-50 transition-all">
          <PencilSquareIcon class="w-5 h-5 text-gray-500" />
        </button>
        <button class="bg-[#5D4037] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all">
          Edit Profile
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="space-y-6">
        <section class="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm">
          <h3 class="font-black text-[#2D2424] text-xs uppercase tracking-widest mb-4">About Me</h3>
          <p class="text-sm text-gray-500 leading-relaxed">
            Specializing in traditional Filipino wood joinery and Narra restoration. With over 15 years of experience in high-end furniture manufacturing, I lead the Furnicraft workshop in maintaining quality standards.
          </p>
          
          <div class="mt-6 space-y-4">
            <div class="flex items-center gap-3 text-sm text-gray-600">
              <MapPinIcon class="w-4 h-4 text-amber-500" />
              <span>Cebu Workshop, Philippines</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-600">
              <EnvelopeIcon class="w-4 h-4 text-amber-500" />
              <span>juan.artisan@furnicraft.ph</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-600">
              <BriefcaseIcon class="w-4 h-4 text-amber-500" />
              <span>Full-time Senior Staff</span>
            </div>
          </div>
        </section>

        <section class="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm">
          <h3 class="font-black text-[#2D2424] text-xs uppercase tracking-widest mb-4">Specialties</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in skills" :key="skill" class="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black rounded-lg uppercase">
              {{ skill }}
            </span>
          </div>
        </section>
      </div>

      <div class="lg:col-span-2 space-y-6">
        <div class="grid grid-cols-3 gap-4">
          <div v-for="stat in personalStats" :key="stat.label" class="bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm text-center">
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{{ stat.label }}</p>
            <p class="text-2xl font-black text-[#2D2424]">{{ stat.value }}</p>
          </div>
        </div>

        <section class="bg-white p-8 rounded-[2.5rem] border border-gray-200 shadow-sm">
          <h3 class="font-black text-[#2D2424] text-xs uppercase tracking-widest mb-6">Recent Work Contributions</h3>
          <div class="space-y-6">
            <div v-for="work in recentWork" :key="work.title" class="flex items-center justify-between group">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                  <WrenchScrewdriverIcon class="w-6 h-6 text-[#5D4037]" />
                </div>
                <div>
                  <p class="text-sm font-black text-[#2D2424]">{{ work.title }}</p>
                  <p class="text-[10px] text-gray-400 font-bold uppercase">{{ work.date }} • {{ work.category }}</p>
                </div>
              </div>
              <span class="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">
                {{ work.status }}
              </span>
            </div>
          </div>
          <button class="w-full mt-8 py-4 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase hover:border-amber-300 hover:text-amber-600 transition-all">
            View All Historical Contributions
          </button>
        </section>
      </div>
    </div>
  </div>
    </NuxtLayout>
</template>

<script setup>
import { 
  UserIcon, MapPinIcon, EnvelopeIcon, BriefcaseIcon, 
  PencilSquareIcon, WrenchScrewdriverIcon 
} from '@heroicons/vue/24/outline'

const skills = ['Narra Specialist', 'Wood Carving', 'Varnish Master', 'Workshop Lead', 'Blueprinting']

const personalStats = [
  { label: 'Completed', value: '124' },
  { label: 'Active', value: '3' },
  { label: 'Rating', value: '4.9' },
]

const recentWork = [
  { title: 'Presidential Suite Dining Table', date: 'March 10, 2026', category: 'Assembly', status: 'Completed' },
  { title: 'Oak Lounge Chair (Batch 5)', date: 'March 08, 2026', category: 'Finishing', status: 'In Review' },
  { title: 'Restoration: Antique Altar', date: 'March 05, 2026', category: 'Restoration', status: 'In Progress' },
]
</script>