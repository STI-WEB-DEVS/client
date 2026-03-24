<template>
  <div class="p-8">
    <header class="mb-6">
      <h2 class="text-2xl font-bold">SmartPark Operations Team</h2>
      <p class="text-gray-500">Manage parking attendants and system administrators.</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="member in team" :key="member.id" class="bg-white p-6 rounded-xl shadow-sm border">
        <div class="w-12 h-12 bg-blue-100 rounded-full mb-4 flex items-center justify-center text-blue-700 font-bold">
          {{ member.name.charAt(0) }}
        </div>
        <h3 class="font-semibold text-lg">{{ member.name }}</h3>
        <p class="text-sm text-emerald-600 font-medium">{{ member.role }}</p>
        <p class="text-sm text-gray-400 mt-1">{{ member.email }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importing the specific service requested
import { TeamService } from '/api/Team/TeamService';

const team = ref([]);

onMounted(() => {
  // Use the mocked service to fetch data
  team.value = TeamService.getAllMembers(); 
});
</script>