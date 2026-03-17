<script setup>
    import { TeamService } from '~/api/Team/TeamService';

    const teamService = new TeamService();

    
    const {data: teams, pending, error} = await useAsyncData('team', () => 
        teamService.getTeams()
    );
</script>

<template>
  <div class="bg-[#0f172a] py-24 sm:py-32 rounded-3xl mx-4 my-8 shadow-2xl">
    <div class="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
      
      <div class="max-w-xl">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl border-l-4 border-indigo-500 pl-4 uppercase">
          Our Tailoring Experts
        </h2>
        <p class="mt-6 text-lg/8 text-gray-400">
          From master cutters to senior seamstresses, our team is dedicated to delivering high-quality customized clothing and precision alterations. [cite: 3, 19]
        </p>
        
        <div class="mt-10 flex gap-4">
          <div class="bg-white/5 p-4 rounded-xl border border-white/10 flex-1">
            <p class="text-indigo-400 font-bold text-2xl">{{ teams?.length || 0 }}</p>
            <p class="text-gray-500 text-xs uppercase tracking-widest">On-Site Personnel</p>
          </div>
        </div>
      </div>

      <ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
        <div v-if="error" class="text-red-400 font-medium">System Error: Unable to retrieve staff records.</div>
        
        <div v-if="pending" class="text-indigo-400 animate-pulse font-medium">Accessing secure personnel database...</div>

        <li v-for="person in teams" :key="person.name" class="group">
          <div class="flex items-center gap-x-6 p-4 rounded-2xl transition-all duration-300 hover:bg-white/5">
            <img class="size-20 rounded-2xl object-cover outline-1 -outline-offset-1 outline-white/10 shadow-lg group-hover:scale-105 transition-transform" 
                 :src="person.imagesy" 
                 alt="Staff Portrait" />
            <div>
              <h3 class="text-lg font-semibold tracking-tight text-white">{{ person.name }}</h3>
              <p class="text-sm font-bold text-indigo-400 uppercase tracking-tighter">{{ person.role }}</p>
              
              <span class="mt-2 inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">
                Available
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>