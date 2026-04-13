<!-- pages/teams.vue -->
<template>
  <NuxtLayout>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold text-gray-900">Team</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, email, and company.</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="mt-8 flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="mt-8 rounded-md bg-red-50 p-4">
      <p class="text-sm text-red-700">{{ error.message || 'Failed to load teams' }}</p>
    </div>

    <!-- Data State -->
    <div v-else class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">UUID</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">CreatedAt</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <!-- Ensure 'teams' is treated as an array -->
                <tr v-for="user in (teams as any[])" :key="user.id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ user.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ user.email }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ user.uuid }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ user.created_at }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { TeamService } from '~/api/Team/TeamService';

// Initialize service inside the component context
const teamService = new TeamService();

const { data: teams, pending, error } = await useAsyncData('teams', async () => {
    const response = await teamService.getTeams();
    
    /** 
     * FIX: If your API returns { data: [...] }, return response.data.
     * If it returns the array directly, return response.
     */
    return Array.isArray(response) ? response : (response as any).data;
});
</script>
