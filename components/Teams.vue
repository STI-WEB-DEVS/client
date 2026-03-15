<script setup>
  import { TeamService } from '~/api/Team/TeamService';

  const teamService = new TeamService();

  const {data: teams, pending, error} = await useAsyncData('teams', () => teamService.getTeams())

</script>

<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
      <div class="max-w-xl">
        <h2 class="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">Meet our drivers</h2>
        <p class="mt-6 text-lg/8 text-gray-600">We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.</p>
      </div>

      <div v-if="pending" class="xl:col-span-2 text-gray-500 italic">
        Loading fleets team...
      </div>

      <div v-else-if="error" class="xl:col-span-2 text-red-500">
        Error loading data. Please try again later.
      </div>

      <ul v-else role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
        <li v-for="teams in teams" :key="teams.id">
          <div class="flex items-center gap-x-6">
            <img 
              :src="`https://i.pravatar.cc/256?u=${teams.id}`" 
              alt="Profile Picture" 
              class="size-16 rounded-full outline-1 -outline-offset-1 outline-black/5" 
            />
            <div>
              <h3 class="text-base/7 font-semibold tracking-tight text-gray-900">{{ teams.name }}</h3>
              <p class="text-sm/6 font-semibold text-indigo-600">{{ teams.company.bs}}</p>
              <P class="text-sm/6 font-semibold text-indigo-600">{{ teams.email }}</P>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

