<template>
  <div class="p-6 bg-slate-50 min-h-screen">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Branch Team #101</h1>
        <p class="text-slate-500 text-sm">Staff contact information</p>
      </div>
      <button class="bg-green-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        Add Member
      </button>
    </div>
 
    <div class=" rounded-xl shadow-sm overflow-hidden p-3">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

  <div 
    v-for="user in team" 
    :key="user.id"
    class="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition"
  >
    
    <div class="flex items-center gap-4 mb-4">
      <div class="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 border">
        {{ user.name.split(' ')[0][0] }}{{ user.name.split(' ')[1]?.[0] }}
      </div>

      <div>
        <div class="font-bold text-slate-800">{{ user.name }}</div>
        <div class="text-xs text-slate-400">@{{ user.username }}</div>
      </div>
    </div>

    <div class="space-y-2 text-sm text-slate-600">
      <div>
        <span class="font-semibold text-slate-700">Email:</span>
        {{ user.email }}
      </div>

      <div>
        <span class="font-semibold text-slate-700">Phone:</span>
        {{ user.phone }}
      </div>

      
    </div>


    <div class="mt-3 text-xs text-slate-500">
      {{ user.address.street }}, {{ user.address.city }}
    </div>

    <div class="flex justify-end gap-2 mt-4">
      <button class="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
        View
      </button>

    </div>

  </div>
</div>
    </div>
  </div>
</template>

<script setup>
import { TeamService } from '~/api/Team/TeamService'

const teamService = new TeamService()

const { data: team, pending, error } = await useAsyncData('users', () => {
  return teamService.getTeams()
})
</script>