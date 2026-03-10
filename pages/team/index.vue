<template>
  <NuxtLayout>
    <div class="mb-10 sm:flex sm:items-center sm:justify-between border-b border-gray-100 pb-6">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Team</h1>
        <p class="mt-2 text-sm text-gray-500">
          Manage and monitor your SmartPark library staff and field operators.
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button" class="block rounded-lg bg-black px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-all active:scale-95">
          Add Member
        </button>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in 6" :key="i" class="h-64 rounded-2xl bg-gray-50 animate-pulse border border-gray-100"></div>
    </div>

    <div v-else-if="error" class="flex flex-col items-center justify-center py-20 rounded-2xl border-2 border-dashed border-red-100 bg-red-50/30">
      <div class="rounded-full bg-red-100 p-3 text-red-600 mb-4">
        <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <p class="text-lg font-medium text-red-900">{{ error }}</p>
      <button @click="reloadPage" class="mt-4 text-sm font-semibold text-red-600 hover:text-red-500">Try again</button>
    </div>

    <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="member in teamMembers" :key="member.id" 
           class="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-xl hover:-translate-y-1">
        
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div class="h-12 w-12 flex-shrink-0 rounded-xl bg-gray-900 flex items-center justify-center text-white font-bold shadow-lg">
              {{ member.name.charAt(0) }}{{ member.name.split(' ')[1]?.charAt(0) || '' }}
            </div>
            <span class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Active
            </span>
          </div>

          <div class="mt-5">
            <h3 class="text-lg font-bold text-gray-900">{{ member.name }}</h3>
            <p class="text-sm font-medium text-blue-600 opacity-80 uppercase tracking-wider">{{ member.company.name }}</p>
          </div>

          <div class="mt-6 space-y-3">
            <div class="flex items-center text-sm text-gray-500">
              <span class="font-semibold text-gray-400 w-12">Mail</span>
              <span class="truncate">{{ member.email }}</span>
            </div>
            <div class="flex items-center text-sm text-gray-500">
              <span class="font-semibold text-gray-400 w-12">Tel</span>
              <span>{{ member.phone }}</span>
            </div>
          </div>
        </div>

        <div class="mt-auto bg-gray-50 p-4 flex items-center justify-between border-t border-gray-100">
          <NuxtLink :to="`/team/${member.id}`" class="text-sm font-bold text-gray-900 hover:text-blue-600">
            View Profile &rarr;
          </NuxtLink>
          <div class="flex -space-x-2">
             <div class="h-6 w-6 rounded-full border-2 border-white bg-gray-200"></div>
             <div class="h-6 w-6 rounded-full border-2 border-white bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TeamService } from '~/api/Team/TeamService'

const teamMembers = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const reloadPage = () => window.location.reload()

onMounted(async () => {
  try { 
    const service = new TeamService()
    teamMembers.value = await service.getTeams()
  } catch (err) {
    error.value = 'We couldn\'t load the team members right now.'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>