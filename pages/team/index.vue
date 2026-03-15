<template>
  <NuxtLayout>
    <h1 class="text-2xl font-bold mb-2" style="color: #1C3028;">Team</h1>
    <p class="text-gray-500 mb-8">All registered team members.</p>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
      <div v-for="member in team" :key="member.id" class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <div class="flex items-center gap-4">
          <div class="size-12 rounded-full overflow-hidden">
            <img
                :src="member.name === 'Nika Espantaleon' ? 'https://cdn-images.dzcdn.net/images/artist/56c65ac9ea451119ddc8c0b02915d103/1900x1900-000000-80-0-0.jpg' : undefined"
                :class="member.name === 'Nika Espantaleon' ? 'w-full h-full object-cover' : 'hidden'"
            />
            <div v-if="member.name !== 'Nika Espantaleon'" class="size-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style="background-color: #1C3028;">
                {{ member.name.charAt(0) }}
            </div>
            </div>
          <div>
            <p class="font-semibold text-gray-900">{{ member.name }}</p>
            <p class="text-sm text-gray-500">{{ member.email }}</p>
          </div>
        </div>
        <div class="mt-4 text-sm text-gray-500">
          <p>{{ member.role }}</p>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <div class="flex items-center gap-4 mb-6">
        <div class="flex-1 border-t border-gray-200"></div>
        <p class="text-sm font-semibold text-gray-400 uppercase tracking-widest">From TeamService</p>
        <div class="flex-1 border-t border-gray-200"></div>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="member in apiTeam" :key="member.id" class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
          <div class="flex items-center gap-4">
            <div class="size-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style="background-color: #C9A96E;">
              {{ member.name.charAt(0) }}
            </div>
            <div>
              <p class="font-semibold text-gray-900">{{ member.name }}</p>
              <p class="text-sm text-gray-500">{{ member.email }}</p>
            </div>
          </div>
          <div class="mt-4 text-sm text-gray-500">
            <p>📞 {{ member.phone }}</p>
            <p>🏢 {{ member.company.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
interface TeamMember {
  id: number
  name: string
  role: string
  email: string
}

import { TeamService } from '~/api/Team/TeamService'

interface TeamMember {
  id: number
  name: string
  role: string
  email: string
}

interface ApiMember {
  id: number
  name: string
  email: string
  phone: string
  company: { name: string }
}

const team = ref<TeamMember[]>([
  { id: 1, name: 'Jake Julius Maunas', role: 'Leader / Backend Developer', email: 'jake@servora.com' },
  { id: 2, name: 'Ram Llanes', role: 'Frontend Developer', email: 'ram@servora.com' },
  { id: 3, name: 'Nika Espantaleon', role: 'Designer', email: 'nika@servora.com' },
  { id: 4, name: 'Nicole De la Gente', role: 'Designer', email: 'nicole@servora.com' },
])

const apiTeam = ref<ApiMember[]>([])

onMounted(async () => {
  const teamService = new TeamService()
  apiTeam.value = await teamService.getTeams() as ApiMember[]
})
</script>