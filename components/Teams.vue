<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Coffee Owners</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="team in teams" 
        :key="team.id" 
        class="bg-white shadow rounded-lg p-6 border hover:shadow-lg transition"
      >
        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ team.name }}</h2>
        <p class="text-gray-600"><span class="font-medium">Email:</span> {{ team.email }}</p>
        <p class="text-gray-600"><span class="font-medium">Phone:</span> {{ team.phone }}</p>
        <p class="text-gray-600">
          <span class="font-medium">Address:</span>
          {{ team.address.street }}, {{ team.address.suite }}, {{ team.address.city }}
        </p>

        <button 
          class="mt-4 w-full bg-[#7D5A50] text-white py-2 px-4 rounded-lg hover:bg-[#B4846C] transition"
          @click="viewDetails(team)"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TeamService } from '../api/Team/TeamService';

const teams = ref<any[]>([]);
const teamService = new TeamService();

onMounted(async () => {
  teams.value = await teamService.getTeams();
});

// Example handler for the button
function viewDetails(team: any) {
  alert(`Viewing details for ${team.name}`);
  // Later you can route to a detail page or open a modal
}
</script>
