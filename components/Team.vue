<template>
  <div class="min-h-screen bg-[#faf7f2] font-serif text-[#1a1108] p-8">

    <!-- Header -->
    <div class="flex justify-between items-start mb-10">
      <div>
        <p class="text-[10px] tracking-[0.3em] uppercase text-[#b0a090] mb-1">Personnel</p>
        <h1 class="text-3xl font-bold text-[#1a1108] tracking-tight">Our Tailoring Experts</h1>
        <p class="text-[#8a7060] mt-1 text-sm">From master cutters to senior seamstresses — meet the hands behind every garment.</p>
      </div>
      <button class="bg-[#1a1108] text-[#f5e6c8] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#2a1f0f] transition-all flex items-center gap-2">
        <span class="text-[#c9a84c]">+</span> Add Staff
      </button>
    </div>

    <!-- Team Stats -->
    <div class="grid grid-cols-3 gap-4 mb-10">
      <div class="bg-[#1a1108] rounded-2xl p-5 text-center relative overflow-hidden">
        <div class="absolute inset-0 opacity-10"
          style="background-image: repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%); background-size: 10px 10px;">
        </div>
        <p class="text-2xl font-bold text-[#c9a84c] relative z-10">{{ teams?.length || 0 }}</p>
        <p class="text-[9px] font-bold text-[#a09080] uppercase tracking-[0.2em] mt-1 relative z-10">Total Staff</p>
      </div>
      <div class="bg-white border border-[#e8ddc8] rounded-2xl p-5 text-center hover:border-[#c9a84c] transition-all">
        <p class="text-2xl font-bold text-[#2d7a3a]">{{ (teams || []).length }}</p>
        <p class="text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em] mt-1">Available Today</p>
      </div>
      <div class="bg-white border border-[#e8ddc8] rounded-2xl p-5 text-center hover:border-[#c9a84c] transition-all">
        <p class="text-2xl font-bold text-[#c9a84c]">3</p>
        <p class="text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em] mt-1">Departments</p>
      </div>
    </div>

    <!-- Loading / Error -->
    <div v-if="pending" class="flex items-center justify-center py-20">
      <div class="text-center">
        <div class="w-12 h-12 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-[#b0a090] font-medium text-sm">Loading personnel database...</p>
      </div>
    </div>

    <div v-else-if="error"
      class="bg-[#fdf0f0] border border-[#f0b8b8] rounded-2xl p-6 flex items-center gap-4">
      <div class="w-10 h-10 bg-[#b94040] rounded-xl flex items-center justify-center text-white flex-shrink-0">!</div>
      <div>
        <p class="font-bold text-[#b94040]">Unable to retrieve staff records</p>
        <p class="text-xs text-[#c07070] mt-0.5">Please check your connection and try again.</p>
      </div>
    </div>

    <!-- Team Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <div v-for="person in teams" :key="person.name"
        class="bg-white border border-[#e8ddc8] rounded-2xl p-5 hover:border-[#c9a84c] hover:shadow-md transition-all duration-200 group">
        <div class="flex items-start gap-4">
          <div class="relative flex-shrink-0">
            <img
              v-if="person.imagesy"
              :src="person.imagesy"
              alt="Staff Portrait"
              class="w-16 h-16 rounded-2xl object-cover border-2 border-[#f0e8d8] group-hover:border-[#c9a84c] transition-colors"
            />
            <div v-else
              class="w-16 h-16 rounded-2xl bg-[#f0e8d8] flex items-center justify-center text-[#8a5a20] font-black text-2xl border-2 border-[#f0e8d8] group-hover:border-[#c9a84c] transition-colors">
              {{ person.name?.charAt(0) || '?' }}
            </div>
            <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-[#2d7a3a] rounded-full border-2 border-white"></div>
          </div>

          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-[#1a1108] text-sm leading-tight">{{ person.name }}</h3>
            <p class="text-[10px] font-bold text-[#c9a84c] uppercase tracking-[0.15em] mt-1">{{ person.role }}</p>
            <span class="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-[#2d7a3a] bg-[#edf7ee] px-2.5 py-1 rounded-full border border-[#b8debb]">
              ● Available
            </span>
          </div>

          <button class="text-[#d4c4a8] hover:text-[#c9a84c] transition-colors flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Empty Slot Placeholder -->
      <div class="bg-[#fdf9f4] border-2 border-dashed border-[#e8ddc8] rounded-2xl p-5 flex items-center justify-center hover:border-[#c9a84c] transition-all cursor-pointer group">
        <div class="text-center">
          <div class="w-10 h-10 rounded-xl bg-[#f0e8d8] flex items-center justify-center mx-auto mb-2 group-hover:bg-[#e8ddc8] transition-colors">
            <span class="text-[#c9a84c] text-lg font-bold">+</span>
          </div>
          <p class="text-xs font-bold text-[#b0a090]">Add Staff Member</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TeamService } from '~/api/Team/TeamService';

const teamService = new TeamService();

const { data: teams, pending, error } = await useAsyncData('team', () =>
  teamService.getTeams()
);
</script>