<template>
  <div class="space-y-7">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest">Team</p>
      <div class="flex items-center gap-2">
        <div class="relative">
          <svg class="absolute -translate-y-1/2 left-3 top-1/2 text-stone-300" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="6.5" cy="6.5" r="4.5"/><path d="M10.5 10.5l3 3"/>
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Search members..."
            class="pl-8 pr-3 py-1.5 text-xs font-sans text-stone-900 bg-white border border-stone-200 rounded-sm outline-none focus:border-stone-900 transition-colors placeholder:text-stone-300 w-48"
          />
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
      <div class="p-4 bg-white border rounded-sm border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-300 uppercase tracking-widest mb-2">Total members</p>
        <p class="font-serif text-2xl font-normal leading-none tracking-tight text-stone-900">{{ team.length }}</p>
      </div>
      <div class="p-4 bg-white border rounded-sm border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-300 uppercase tracking-widest mb-2">Cities</p>
        <p class="font-serif text-2xl font-normal leading-none tracking-tight text-stone-900">{{ uniqueCities }}</p>
      </div>
      <div class="p-4 bg-white border rounded-sm border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-300 uppercase tracking-widest mb-2">Companies</p>
        <p class="font-serif text-2xl font-normal leading-none tracking-tight text-stone-900">{{ uniqueCompanies }}</p>
      </div>
      <div class="p-4 bg-white border rounded-sm border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-300 uppercase tracking-widest mb-2">Results</p>
        <p class="font-serif text-2xl font-normal leading-none tracking-tight text-stone-900">{{ filteredTeam.length }}</p>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="n in 6"
        :key="n"
        class="p-5 bg-white border rounded-sm border-stone-200 animate-pulse"
      >
        <div class="flex items-center gap-3 mb-4">
          <div class="flex-shrink-0 w-10 h-10 rounded-sm bg-stone-100"></div>
          <div class="flex-1 space-y-2">
            <div class="w-3/4 h-3 rounded-sm bg-stone-100"></div>
            <div class="h-2.5 bg-stone-100 rounded-sm w-1/2"></div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="h-2.5 bg-stone-100 rounded-sm w-full"></div>
          <div class="h-2.5 bg-stone-100 rounded-sm w-5/6"></div>
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="p-8 text-center bg-white border border-red-200 rounded-sm">
      <p class="mb-1 font-serif text-base font-normal text-red-400">Failed to load team</p>
      <p class="text-[11px] font-sans text-stone-400 mb-4">{{ error }}</p>
      <button
        @click="fetchTeam"
        class="px-4 py-2 bg-stone-900 text-[#F7F6F3] text-[10px] font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors"
      >Retry</button>
    </div>

    <!-- Team grid -->
    <div v-else class="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="member in filteredTeam"
        :key="member.id"
        class="p-5 transition-colors bg-white border rounded-sm cursor-pointer border-stone-200 hover:border-stone-400"
        @click="selectedMember = member; showModal = true"
      >
        <!-- Avatar + name -->
        <div class="flex items-center gap-3 mb-4">
          <div
            class="flex items-center justify-center flex-shrink-0 w-10 h-10 font-sans text-sm font-medium rounded-sm"
            :class="avatarColor(member.id)"
          >
            {{ initials(member.name) }}
          </div>
          <div class="min-w-0">
            <p class="font-sans text-sm font-medium truncate text-stone-900">{{ member.name }}</p>
            <p class="text-[11px] font-sans text-stone-400 truncate">@{{ member.username }}</p>
          </div>
        </div>

        <!-- Details -->
        <div class="pt-3 space-y-2 border-t border-stone-100">
          <div class="flex items-center gap-2">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#B0ADA6" stroke-width="1.5" class="flex-shrink-0">
              <path d="M2 4l6 5 6-5M2 4h12v9H2V4z"/>
            </svg>
            <p class="text-[11px] font-sans text-stone-400 truncate">{{ member.email }}</p>
          </div>
          <div class="flex items-center gap-2">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#B0ADA6" stroke-width="1.5" class="flex-shrink-0">
              <path d="M8 2C5.8 2 4 3.8 4 6c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4z"/><circle cx="8" cy="6" r="1.5"/>
            </svg>
            <p class="text-[11px] font-sans text-stone-400 truncate">{{ member.address.city }}</p>
          </div>
          <div class="flex items-center gap-2">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#B0ADA6" stroke-width="1.5" class="flex-shrink-0">
              <rect x="1" y="4" width="14" height="10" rx="1"/><path d="M4 4V3a1 1 0 011-1h6a1 1 0 011 1v1"/>
            </svg>
            <p class="text-[11px] font-sans text-stone-400 truncate">{{ member.company.name }}</p>
          </div>
        </div>

        <!-- Website badge -->
        <div class="pt-3 mt-3 border-t border-stone-100">
          <p class="text-[10px] font-sans text-stone-300 truncate">{{ member.website }}</p>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="filteredTeam.length === 0" class="text-center bg-white border rounded-sm col-span-full border-stone-200 py-14">
        <p class="mb-1 font-serif text-base font-normal text-stone-400">No members found</p>
        <p class="text-[11px] font-sans text-stone-300">Try a different search term.</p>
      </div>
    </div>

    <!-- Member detail modal -->
    <div
      v-if="showModal && selectedMember"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/50"
      @click.self="showModal = false"
    >
      <div class="w-full max-w-sm p-8 bg-white border rounded-sm border-stone-200">
        <!-- Modal header -->
        <div class="flex items-start justify-between mb-5">
          <div class="flex items-center gap-3">
            <div
              class="flex items-center justify-center flex-shrink-0 font-sans text-sm font-medium rounded-sm w-11 h-11"
              :class="avatarColor(selectedMember.id)"
            >
              {{ initials(selectedMember.name) }}
            </div>
            <div>
              <p class="font-serif text-base font-normal text-stone-900">{{ selectedMember.name }}</p>
              <p class="text-[11px] font-sans text-stone-400">@{{ selectedMember.username }}</p>
            </div>
          </div>
          <button @click="showModal = false" class="ml-4 text-xl leading-none transition-colors text-stone-300 hover:text-stone-700">&times;</button>
        </div>

        <!-- Details -->
        <div class="pt-4 space-y-3 border-t border-stone-100">
          <div class="flex justify-between gap-4">
            <span class="text-[10px] font-sans text-stone-300 uppercase tracking-widest flex-shrink-0">Email</span>
            <span class="font-sans text-xs text-right truncate text-stone-700">{{ selectedMember.email }}</span>
          </div>
          <div class="flex justify-between gap-4">
            <span class="text-[10px] font-sans text-stone-300 uppercase tracking-widest flex-shrink-0">Phone</span>
            <span class="font-sans text-xs text-right text-stone-700">{{ selectedMember.phone }}</span>
          </div>
          <div class="flex justify-between gap-4">
            <span class="text-[10px] font-sans text-stone-300 uppercase tracking-widest flex-shrink-0">Website</span>
            <span class="font-sans text-xs text-right text-stone-700">{{ selectedMember.website }}</span>
          </div>
          <div class="flex justify-between gap-4">
            <span class="text-[10px] font-sans text-stone-300 uppercase tracking-widest flex-shrink-0">City</span>
            <span class="font-sans text-xs text-right text-stone-700">{{ selectedMember.address.city }}, {{ selectedMember.address.zipcode }}</span>
          </div>

          <div class="pt-3 space-y-2 border-t border-stone-100">
            <p class="text-[10px] font-sans text-stone-300 uppercase tracking-widest">Company</p>
            <p class="font-sans text-xs font-medium text-stone-900">{{ selectedMember.company.name }}</p>
            <p class="text-[11px] font-sans text-stone-400 italic">"{{ selectedMember.company.catchPhrase }}"</p>
            <p class="text-[10px] font-sans text-stone-300">{{ selectedMember.company.bs }}</p>
          </div>
        </div>

        <button
          @click="showModal = false"
          class="mt-5 w-full py-2.5 bg-stone-900 text-[#F7F6F3] text-[10px] font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors"
        >Close</button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { TeamService } from '~/api/Team/TeamService'

const teamService = new TeamService()

const team = ref([])
const loading = ref(true)
const error = ref('')
const search = ref('')
const showModal = ref(false)
const selectedMember = ref(null)

const fetchTeam = async () => {
  loading.value = true
  error.value = ''
  try {
    team.value = await teamService.getTeams()
  } catch (e: any) {
    error.value = e?.message || 'Something went wrong.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchTeam)

const filteredTeam = computed(() => {
  if (!search.value) return team.value
  const q = search.value.toLowerCase()
  return team.value.filter((m: any) =>
    m.name.toLowerCase().includes(q) ||
    m.username.toLowerCase().includes(q) ||
    m.email.toLowerCase().includes(q) ||
    m.company.name.toLowerCase().includes(q) ||
    m.address.city.toLowerCase().includes(q)
  )
})

const uniqueCities = computed(() =>
  new Set(team.value.map((m: any) => m.address.city)).size
)

const uniqueCompanies = computed(() =>
  new Set(team.value.map((m: any) => m.company.name)).size
)

const initials = (name: string) =>
  name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()

const avatarPalette = [
  'bg-stone-100 text-stone-600',
  'bg-green-50 text-green-700',
  'bg-blue-50 text-blue-700',
  'bg-amber-50 text-amber-700',
  'bg-red-50 text-red-700',
  'bg-teal-50 text-teal-700',
  'bg-purple-50 text-purple-700',
  'bg-pink-50 text-pink-700',
]

const avatarColor = (id: number) => avatarPalette[(id - 1) % avatarPalette.length]
</script>