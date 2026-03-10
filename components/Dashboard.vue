<template>

    <div class="p-6 min-h-screen">
        <h1 class="text-2xl font-bold mb-6">Coffee Owners Dashboard</h1>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white shadow rounded-lg p-6 text-center">
            <h2 class="text-lg font-semibold text-gray-700">New Owners</h2>
            <p class="text-4xl font-bold text-[#7D5A50] mt-2">0</p>
        </div>
        <div class="bg-white shadow rounded-lg p-6 text-center">
            <h2 class="text-lg font-semibold text-gray-700">Subscriptions Active</h2>
            <p class="text-4xl font-bold text-[#7D5A50] mt-2">0</p>
        </div>
        <div class="bg-white shadow rounded-lg p-6 text-center">
            <h2 class="text-lg font-semibold text-gray-700">Subscriptions Expired</h2>
            <p class="text-4xl font-bold text-[#7D5A50] mt-2">0</p>
        </div>
        <div class="bg-white shadow rounded-lg p-6 text-center">
            <h2 class="text-lg font-semibold text-gray-700">Total Owners</h2>
            <p class="text-4xl font-bold text-[#7D5A50] mt-2">0</p>
        </div>
        </div>

        <div class="bg-white shadow rounded-lg p-6 flex items-center justify-between">
        <div>
            <h2 class="text-lg font-semibold text-gray-700 mb-2">Track Subscription</h2>
            <input 
            type="text" 
            placeholder="Enter Owner ID..." 
            class="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div class="text-gray-400 italic">
            
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
</script>
