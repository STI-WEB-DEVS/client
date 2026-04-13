<template>
  <NuxtLayout>
    <div class="p-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold text-gray-900">Team Members</h1>
          <p class="mt-2 text-sm text-gray-700">A list of names, emails, and created dates from your account.</p>
        </div>
      </div>

      <div v-if="pending" class="mt-8 flex justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>

      <div v-else-if="error" class="mt-8 rounded-md bg-red-50 p-4">
        <p class="text-sm text-red-700">Error: {{ error.message }}</p>
      </div>

      <div v-else class="mt-8 flow-root">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">UUID</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Created At</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="user in (teams || [])" :key="user.uuid">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                  {{ user.name || 'No name provided' }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ user.uuid}}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ user.email }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ new Date(user.created_at).toLocaleString() }}
                </td>
              </tr>
              <tr v-if="teams && teams.length === 0">
                <td colspan="3" class="py-10 text-center text-gray-500">No members found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { TeamService } from '~/api/Team/TeamService';

const teamService = new TeamService();

const { data: teams, pending, error } = await useAsyncData('teams', async () => {
  const response = await teamService.getTeams();

  // Ensure the response is an array of objects with uuid, name, email, created_at
  return Array.isArray(response) ? response : (response.data || response.customers || []);
}, { 
  server: false // Keeps the request on the client to access your LocalStorage token
});
</script>
