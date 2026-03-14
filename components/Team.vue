<template>
  <div>
    <!-- Page header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-[#1D3557]">Our Team</h1>
      <p class="mt-1 text-sm text-[#457B9D]">Meet the dedicated staff behind our blood bank operations.</p>
    </div>

    <div class="grid gap-8 xl:grid-cols-3">
      <!-- Intro column -->
      <div class="rounded-2xl border border-[#A8DADC]/40 bg-white p-8 shadow-sm">
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1D3557]">
          <svg class="size-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>
        </div>
        <h2 class="text-xl font-bold text-[#1D3557]">Meet our leadership</h2>
        <p class="mt-3 text-sm leading-relaxed text-[#457B9D]">
          We're a dynamic group of individuals passionate about what we do — dedicated to delivering life-saving blood supply management for our community.
        </p>
        <div class="mt-6 flex items-center gap-3 rounded-xl border border-[#A8DADC]/40 bg-[#F1FAEE] px-4 py-3">
          <span class="text-2xl font-bold text-[#D62828]">{{ teams?.length ?? 0 }}</span>
          <span class="text-sm font-medium text-[#457B9D]">Team members</span>
        </div>
      </div>

      <!-- Team grid -->
      <ul role="list" class="grid gap-5 sm:grid-cols-2 xl:col-span-2">
        <li v-for="person in teams" :key="person.name">
          <div class="flex items-center gap-4 rounded-2xl border border-[#A8DADC]/40 bg-white p-5 shadow-sm hover:border-[#457B9D]/40 hover:shadow-md transition-all">
            <img
              class="size-14 rounded-xl object-cover ring-2 ring-[#A8DADC]"
              :src="'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'"
              :alt="person.name"
            />
            <div class="min-w-0">
              <h3 class="truncate text-sm font-bold text-[#1D3557]">{{ person.name }}</h3>
              <p class="mt-0.5 truncate text-xs font-semibold text-[#457B9D]">{{ person.role }}</p>
              <span class="mt-2 inline-flex items-center gap-1 rounded-full bg-[#A8DADC]/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#1D3557]">
                Active
              </span>
            </div>
          </div>
        </li>

        <!-- Loading state -->
        <li v-if="pending" v-for="n in 4" :key="'sk-' + n">
          <div class="flex items-center gap-4 rounded-2xl border border-[#A8DADC]/40 bg-white p-5 shadow-sm animate-pulse">
            <div class="size-14 rounded-xl bg-[#A8DADC]/30"></div>
            <div class="flex-1 space-y-2">
              <div class="h-3 w-3/4 rounded bg-[#A8DADC]/30"></div>
              <div class="h-3 w-1/2 rounded bg-[#A8DADC]/20"></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { TeamService } from '~/api/Team/TeamService'

const teamService = new TeamService()
const { data: teams, pending, error } = await useAsyncData('team', () => teamService.getTeams())
console.log(teams.value)
</script>