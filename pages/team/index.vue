<template>
    <NuxtLayout>
         <div class="p-8 space-y-4">
            <h1 class="text-2xl font-bold mb-6">Team Members</h1>

            <div v-if="isLoading" class="text-gray-500">Loading team...</div>

            <div v-else class="grid gap-4 md:grid-cols-2">
            <TeamCard 
                v-for="team in teams" 
                :key="team.id"
                :username="team.username"
                :name="team.name"
            />
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TeamService } from '@/api/Team/TeamService'; 
import TeamCard from '@/components/TeamCard'

const teamService = new TeamService();
const teams = ref([]);
onMounted(async () => {
  try {
    teams.value = await teamService.getTeams();
  } catch (error) {
    console.error("Failed to load teams:", error);
  }
});

console.log(teams)
</script>
