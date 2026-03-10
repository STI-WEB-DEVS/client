<template>
  <NuxtLayout>
    <div class="mb-8 rounded-2xl border border-[#E7DFDA] bg-white p-6 shadow-sm">
      <p class="text-xs font-semibold uppercase tracking-widest text-[#8F7A6E]">Operations Team</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-900">Team Members</h1>
      <p class="mt-2 text-sm text-slate-600">Manage operators, staff, and support members across SmartPark locations.
      </p>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="h-16 w-16 animate-spin rounded-full border-4 border-[#E7DFDA] border-t-[#8F7A6E]"></div>
    </div>

    <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
      <div class="flex items-center">
        <svg class="mr-2 h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd" />
        </svg>
        <p class="text-sm font-medium text-red-800">{{ error }}</p>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div v-for="member in teamMembers" :key="member.id"
        class="group relative rounded-2xl border border-[#E7DFDA] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8F7A6E] hover:shadow-md">
        <!-- Avatar and Name -->
        <div class="mb-4 flex items-start gap-4">
          <div class="relative">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#A38E82] to-[#8F7A6E] text-xl font-bold text-white shadow-md">
              {{ member.name.charAt(0) }}
            </div>
            <div class="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-[#B7C9A8]"></div>
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="truncate text-base font-semibold text-slate-900 transition-colors group-hover:text-[#8F7A6E]">
              {{ member.name }}
            </h3>
            <p class="mt-0.5 truncate text-sm text-slate-500">
              {{ member.email }}
            </p>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="space-y-3 border-t border-[#F0EAE6] pt-4">
          <div class="flex items-center text-sm text-slate-600">
            <svg class="mr-2 h-4 w-4 text-[#8F7A6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span class="truncate">{{ member.phone }}</span>
          </div>
          <div class="flex items-center text-sm text-slate-600">
            <svg class="mr-2 h-4 w-4 text-[#8F7A6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span class="truncate font-medium text-[#6F5E54]">{{ member.company.name }}</span>
          </div>
        </div>

        <!-- Action Button -->
        <div class="mt-4 border-t border-[#F0EAE6] pt-4">
          <button
            class="w-full rounded-xl bg-[#F3EFEC] px-4 py-2 text-sm font-semibold text-[#8F7A6E] transition hover:bg-[#E7DFDA]">
            View Details
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TeamService } from '~/api/Team/TeamService'

const teamMembers = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const service = new TeamService()
    const response = await service.getTeams()
    teamMembers.value = response
    loading.value = false
  } catch (err) {
    error.value = 'Failed to load team members'
    loading.value = false
    console.error(err)
  }
})
</script>