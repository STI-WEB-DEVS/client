
<script setup>
    import { TeamService } from '~/api/Team/TeamService';

    const teamService = new TeamService();

    const {data: teams, pending, error} = await useAsyncData('team', () => 
    teamService.getTeams()
    )

</script>

<template>
  <div class="bg-gray-900 py-24 sm:py-32">
    <div class="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
      <div class="max-w-xl">
        <h2 class="text-3xl font-semibold tracking-tight text-pretty text-white sm:text-4xl">Meet our leadership</h2>
        <p class="mt-6 text-lg/8 text-gray-400">We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.</p>
      </div>
      <ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
        <li v-for="person in teams" :key="person.name">
          <div class="flex items-center gap-x-6">
            <img class="size-16 rounded-full outline-1 -outline-offset-1 outline-white/10" :src="person.imagesy" alt="" />
            <div>
              <h3 class="text-base/7 font-semibold tracking-tight text-white">{{ person.name }}</h3>
              <p class="text-sm/6 font-semibold text-indigo-400">{{ person.role }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
