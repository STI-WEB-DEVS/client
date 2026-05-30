<template>
  <div>
    <!-- Page header -->
    <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-[#1D3557]">Daily Schedule</h1>
        <p class="mt-1 text-sm text-[#457B9D]">Saturday, March 14, 2026</p>
      </div>
      <button class="inline-flex items-center gap-2 rounded-lg bg-[#D62828] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(29,53,87,0.06),0_8px_24px_rgba(29,53,87,0.08)] hover:bg-[#b52020] transition-colors duration-200 ease-out">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Event
      </button>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">

      <!-- Timeline -->
      <div class="lg:col-span-2 rounded-lg border border-[#A8DADC]/40 bg-white p-6 shadow-[0_1px_2px_rgba(29,53,87,0.06),0_8px_24px_rgba(29,53,87,0.08)]">
        <div class="space-y-0 relative">
          <!-- Timeline line -->
          <div class="absolute left-[19px] top-4 bottom-4 w-0.5 bg-[#A8DADC]/50"></div>

          <div v-for="item in schedule" :key="item.id" class="relative flex gap-5 pb-7 last:pb-0">
            <!-- Dot -->
            <div class="relative z-10 flex mt-0.5 h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#F1FAEE] shadow-[0_1px_2px_rgba(29,53,87,0.06),0_8px_24px_rgba(29,53,87,0.08)]"
              :class="item.type === 'Appointment' ? 'bg-[#D62828]' : 'bg-[#457B9D]'">
              <svg v-if="item.type === 'Appointment'" class="size-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              <svg v-else class="size-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </div>

            <!-- Content -->
            <div class="flex-1 border-b border-[#A8DADC]/30 pb-5 transition-colors duration-200 ease-out last:border-b-0 hover:bg-[#F1FAEE]/40"
              :class="item.type === 'Appointment' ? 'text-[#D62828]' : 'text-[#457B9D]'">
              <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div class="flex items-center gap-2">
                  <span class="text-[11px] font-bold uppercase tracking-widest"
                    :class="item.type === 'Appointment' ? 'text-[#D62828]' : 'text-[#457B9D]'">
                    {{ item.time }}
                  </span>
                  <span class="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
                    :class="item.type === 'Appointment' ? 'bg-[#D62828]/10 text-[#D62828]' : 'bg-[#457B9D]/10 text-[#457B9D]'">
                    {{ item.type }}
                  </span>
                </div>
                <span v-if="item.badge" class="rounded-full border border-[#D62828]/30 bg-[#D62828]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#D62828]">
                  {{ item.badge }}
                </span>
              </div>
              <h3 class="text-sm font-bold text-[#1D3557]">{{ item.title }}</h3>
              <p class="mt-1 inline-flex items-center gap-1 text-xs text-[#457B9D]">
                <UserIcon v-if="item.type === 'Appointment'" class="h-3.5 w-3.5" aria-hidden="true" />
                <MapPinIcon v-else class="h-3.5 w-3.5" aria-hidden="true" />
                <span v-if="item.type === 'Appointment'">{{ item.person }}</span>
                <span v-else>{{ item.location }} / {{ item.participants }} participants</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary sidebar -->
      <div class="space-y-4">
        <div class="rounded-lg border border-[#A8DADC]/40 bg-white p-6 shadow-[0_1px_2px_rgba(29,53,87,0.06),0_8px_24px_rgba(29,53,87,0.08)]">
          <h3 class="mb-4 text-sm font-bold text-[#1D3557]">Today's Summary</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between border-b border-[#A8DADC]/30 px-1 py-3">
              <span class="text-xs font-semibold text-[#D62828]">Appointments</span>
              <span class="text-lg font-bold text-[#D62828]">{{ appointments.length }}</span>
            </div>
            <div class="flex items-center justify-between border-b border-[#A8DADC]/30 px-1 py-3">
              <span class="text-xs font-semibold text-[#457B9D]">Programs</span>
              <span class="text-lg font-bold text-[#457B9D]">{{ programs.length }}</span>
            </div>
            <div class="flex items-center justify-between px-1 py-3">
              <span class="text-xs font-semibold text-[#1D3557]">Total Events</span>
              <span class="text-lg font-bold text-[#1D3557]">{{ schedule.length }}</span>
            </div>
          </div>
        </div>

        <div class="rounded-lg border border-[#A8DADC]/40 bg-[#1D3557] p-6 shadow-[0_1px_2px_rgba(29,53,87,0.06),0_8px_24px_rgba(29,53,87,0.08)] text-white">
          <h3 class="mb-1 text-sm font-bold">Next Event</h3>
          <p class="text-xs text-[#A8DADC]">Coming up in 2 hours</p>
          <div class="mt-4 border-t border-white/15 pt-4">
            <p class="text-xs font-semibold uppercase tracking-widest text-[#A8DADC]">02:00 PM</p>
            <p class="mt-1 text-sm font-bold">Community Outreach Drive</p>
            <p class="mt-0.5 inline-flex items-center gap-1 text-xs text-[#A8DADC]"><MapPinIcon class="h-3.5 w-3.5" aria-hidden="true" />City Hall</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MapPinIcon, UserIcon } from '@heroicons/vue/24/outline'

const appointments = ref([
  { id: 'A1', type: 'Appointment', time: '09:00 AM', title: 'Whole Blood Donation',  person: 'Sarah Jenkins', badge: 'Fast Track' },
  { id: 'A2', type: 'Appointment', time: '11:30 AM', title: 'Plasma Screening',      person: 'David Chen',    badge: null },
])

const programs = ref([
  { id: 'P1', type: 'Program', time: '02:00 PM', title: 'Community Outreach Drive',  location: 'City Hall', participants: 45 },
  { id: 'P2', type: 'Program', time: '05:00 PM', title: 'Volunteer Orientation',     location: 'Main Lab',  participants: 12 },
])

const schedule = [...appointments.value, ...programs.value]
</script>