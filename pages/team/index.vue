<template>
  <NuxtLayout>
    <div class="p-10 bg-gray-50 min-h-screen overflow-x-auto">
      <div class="max-w-7xl mx-auto text-center mb-16">
        <h1 class="text-3xl font-black text-gray-900 tracking-tight">Team Hierarchy</h1>
        <p class="text-gray-500 mt-2">Visualizing our organizational structure</p>
      </div>

      <div v-if="status === 'pending'" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="error" class="text-center text-red-500 bg-red-50 p-6 rounded-lg">
        <p>Failed to load team data: {{ error.message }}</p>
      </div>

      <div v-else-if="team" class="flex justify-center pb-20">
        <OrgNode :member="team" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { TeamService } from "~/api/Team/TeamService";
 
// 1. Create an instance of the class
const teamServiceInstance = new TeamService();
 
// 2. Fetch data using the correct method name 'getTeams'
const {data: members, pending, error, refresh,} = await 
useAsyncData("team-data", () => teamServiceInstance.getTeams());
 
const reloadTeam = () => refresh();
</script>

<style scoped>
/* Optional: ensures the horizontal lines don't bleed out on the ends */
.flex > div:first-child > .absolute {
  left: 50%;
  width: 50%;
}
.flex > div:last-child > .absolute {
  right: 50%;
  width: 50%;
}
.flex > div:only-child > .absolute {
  display: none;
}
</style>