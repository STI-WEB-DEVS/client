<template>
  <NuxtLayout>
    <div class="p-8 space-y-4">
      <h1 class="font-['DM_Mono'] text-[40px] font-medium tracking-[0.15em] uppercase text-[#ADE25D] mb-3.5">Team Members</h1>

      <div v-if="isLoading" class="text-gray-500">Loading team...</div>

      <div v-else-if="error" class="text-red-500">{{ error }}</div>

      <div v-else class="grid gap-6 md:grid-cols-2">
        <UserProfile
          v-for="user in teams"
          :key="user.id"
          :user="user"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TeamService } from '@/api/Team/TeamService'
import UserProfile from '@/components/TeamCard.vue'

const teamService = new TeamService()
const teams = ref([])
const isLoading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    teams.value = await teamService.getTeams()
  } catch (err) {
    console.error('Failed to load teams:', err)
    error.value = 'Failed to load team members.'
  } finally {
    isLoading.value = false
  }
})
</script>