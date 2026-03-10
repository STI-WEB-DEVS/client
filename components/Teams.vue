<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Team Members</h1>

    <div class="mt-8 overflow-x-auto">
      <table class="min-w-full border border-gray-300 rounded-lg shadow-sm">
        <thead class="bg-[#8FA38C]">
          <tr>
            <th class="px-4 py-2 text-left font-semibold text-white">ID</th>
            <th class="px-4 py-2 text-left font-semibold text-white">Name</th>
            <th class="px-4 py-2 text-left font-semibold text-white">Contact</th>
            <th class="px-4 py-2 text-left font-semibold text-white">Address</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in teams" :key="team.id" class="border-t hover:bg-gray-50">
            <td class="px-4 py-2">{{ team.id }}</td>
            <td class="px-4 py-2">
              <div>{{ team.name }}</div>
              <div class="text-gray-600 text-sm">{{ team.company.name }}</div>
            </td>
            <td class="px-4 py-2">
              <div>{{ team.phone }}</div>
              <div>
                <a :href="`mailto:${team.email}`" class="text-blue-600 hover:underline text-sm">
                  {{ team.email }}
                </a>
              </div>
            </td>
            <td class="px-4 py-2">
              {{ team.address.street }}, {{ team.address.suite }},
              {{ team.address.city }}, {{ team.address.zipcode }}
            </td>
          </tr>
        </tbody>
      </table>
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
</script>
 