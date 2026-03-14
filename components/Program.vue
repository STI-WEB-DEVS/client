<template>
  <div>
    <!-- Page header -->
    <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-[#1D3557]">Blood Bank Programs</h1>
        <p class="mt-1 text-sm text-[#457B9D]">Manage and monitor donation drives and outreach events.</p>
      </div>
      <button class="inline-flex items-center gap-2 rounded-xl bg-[#D62828] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#b52020] transition-colors">
        <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        New Program
      </button>
    </div>

    <!-- Tab bar -->
    <div class="mb-6 inline-flex rounded-xl border border-[#A8DADC]/40 bg-white p-1 shadow-sm">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'rounded-lg px-5 py-2 text-sm font-semibold transition-all',
          activeTab === tab
            ? 'bg-[#1D3557] text-white shadow-sm'
            : 'text-[#457B9D] hover:text-[#1D3557]'
        ]"
      >
        {{ tab }}
        <span class="ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold"
          :class="activeTab === tab ? 'bg-white/20 text-white' : 'bg-[#A8DADC]/30 text-[#1D3557]'">
          {{ programs.filter(p => p.status === tab).length }}
        </span>
      </button>
    </div>

    <!-- Program list -->
    <div class="space-y-3">
      <div v-if="filteredPrograms.length === 0" class="rounded-2xl border border-[#A8DADC]/40 bg-white p-12 text-center shadow-sm">
        <p class="text-sm text-[#457B9D]">No programs currently {{ activeTab.toLowerCase() }}.</p>
      </div>

      <div
        v-for="program in filteredPrograms"
        :key="program.id"
        class="flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-all"
        :class="program.status === 'Ongoing' ? 'border-[#A8DADC]/50' : program.status === 'Upcoming' ? 'border-[#457B9D]/30' : 'border-[#A8DADC]/30'"
      >
        <div class="flex items-center gap-4">
          <!-- Status dot -->
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            :class="program.status === 'Ongoing' ? 'bg-green-50' : program.status === 'Upcoming' ? 'bg-[#457B9D]/10' : 'bg-[#A8DADC]/20'">
            <span class="h-2.5 w-2.5 rounded-full"
              :class="program.status === 'Ongoing' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse' : program.status === 'Upcoming' ? 'bg-[#457B9D]' : 'bg-[#A8DADC]'">
            </span>
          </div>

          <div>
            <div class="flex items-center gap-2">
              <h4 class="text-sm font-bold text-[#1D3557]">{{ program.title }}</h4>
              <span class="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
                :class="program.status === 'Ongoing' ? 'bg-green-100 text-green-700' : program.status === 'Upcoming' ? 'bg-[#457B9D]/10 text-[#457B9D]' : 'bg-[#A8DADC]/30 text-[#1D3557]'">
                {{ program.status }}
              </span>
            </div>
            <p class="mt-0.5 text-xs text-[#457B9D]">
              <span>📍 {{ program.location }}</span>
              <span class="mx-1.5 text-[#A8DADC]">•</span>
              <span>🗓 {{ program.date }}</span>
            </p>
          </div>
        </div>

        <div class="text-right">
          <p class="text-lg font-bold text-[#1D3557]">{{ program.donors }}</p>
          <p class="text-[10px] font-semibold uppercase tracking-widest text-[#457B9D]">Donors</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('Ongoing')
const tabs = ['Upcoming', 'Ongoing', 'Done']

const programs = ref([
  { id: 1, title: 'Annual City Drive',         date: 'Mar 20, 2026', location: 'Central Plaza',   status: 'Upcoming', donors: 0   },
  { id: 2, title: 'Emergency Type O+ Rally',   date: 'Mar 14, 2026', location: 'St. Jude Hosp.', status: 'Ongoing',  donors: 42  },
  { id: 3, title: 'University Blood Week',     date: 'Mar 14, 2026', location: 'Campus West',     status: 'Ongoing',  donors: 128 },
  { id: 4, title: 'Winter Gala Donation',      date: 'Feb 28, 2026', location: 'Grand Hall',      status: 'Done',     donors: 310 },
])

const filteredPrograms = computed(() => programs.value.filter(p => p.status === activeTab.value))
</script>