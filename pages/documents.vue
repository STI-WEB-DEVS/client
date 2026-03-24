<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div>
        <h1 class="font-['Syne'] text-2xl font-bold text-[#CFFFB3]">Documents</h1>
        <p class="mt-1 font-['DM_Mono'] text-sm text-[#ADE25D]/70">Review submitted credentials and supporting documents</p>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <div v-for="doc in documents" :key="doc.id" class="bg-[#3B7080]/20 border border-[#3B7080] rounded-sm overflow-hidden hover:border-[#ADE25D]/50 transition-colors group">
          <div class="h-1 bg-gradient-to-r from-[#ADE25D] to-[#CFFFB3]"></div>
          <div class="p-5 space-y-3">
            <div class="flex items-start justify-between gap-2">
              <div class="w-9 h-9 rounded-sm bg-[#ADE25D]/10 border border-[#ADE25D]/20 flex items-center justify-center">
                <DocumentIcon class="size-5 text-[#ADE25D]" />
              </div>
              <span :class="doc.verified ? 'text-[#ADE25D] bg-[#ADE25D]/10 border-[#ADE25D]/30' : 'text-[#CFFFB3]/50 bg-[#3B7080]/30 border-[#3B7080]'" class="font-['DM_Mono'] text-[10px] tracking-wider uppercase border px-2 py-0.5 rounded-sm">{{ doc.verified ? 'Verified' : 'Unverified' }}</span>
            </div>
            <div>
              <p class="font-['Syne'] text-sm font-semibold text-[#CFFFB3]">{{ doc.name }}</p>
              <p class="font-['DM_Mono'] text-xs text-[#ADE25D]/60">{{ doc.organizer }}</p>
            </div>
            <div class="flex justify-between text-[10px] font-['DM_Mono'] text-[#ADE25D]/50 uppercase tracking-[0.1em]">
              <span>{{ doc.type }}</span>
              <span>{{ doc.date }}</span>
            </div>
            <button class="w-full font-['DM_Mono'] text-xs border border-[#3B7080] text-[#ADE25D] py-1.5 rounded-sm hover:bg-[#3B7080] hover:text-[#CFFFB3] transition-colors">
              View Document
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { DocumentIcon } from '@heroicons/vue/24/outline'

const documents = [
  { id: 1, name: 'Business Permit 2026',       organizer: 'Summit Trail Co.',   type: 'Business Permit',  date: 'Mar 22, 2026', verified: true },
  { id: 2, name: 'DTI Registration',           organizer: 'Summit Trail Co.',   type: 'Registration',     date: 'Mar 22, 2026', verified: true },
  { id: 3, name: 'Safety Compliance Cert.',    organizer: 'Ridge Walkers PH',   type: 'Certificate',      date: 'Mar 21, 2026', verified: true },
  { id: 4, name: 'Guide License - J. Reyes',   organizer: 'Ridge Walkers PH',   type: 'License',          date: 'Mar 21, 2026', verified: false },
  { id: 5, name: 'Business Permit 2026',       organizer: 'Alpino Adventures',  type: 'Business Permit',  date: 'Mar 19, 2026', verified: false },
  { id: 6, name: 'Insurance Certificate',      organizer: 'Alpino Adventures',  type: 'Insurance',        date: 'Mar 19, 2026', verified: false },
  { id: 7, name: 'DENR Accreditation',         organizer: 'Peak Seekers Group', type: 'Accreditation',    date: 'Mar 17, 2026', verified: true },
  { id: 8, name: 'First Aid Training Cert.',   organizer: 'Trailblaze PH',      type: 'Certificate',      date: 'Mar 10, 2026', verified: true },
  { id: 9, name: 'Guide License - M. Cruz',    organizer: 'Wild Paths Inc.',    type: 'License',          date: 'Mar 5, 2026',  verified: false },
]
</script>
