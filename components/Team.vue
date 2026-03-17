<script setup>
import { TeamService } from '~/api/Team/TeamService'

const teamService = new TeamService()
const members = ref([])
const loading = ref(true)
const error = ref(null)

const realTeam = [
  { name: 'Leanne Graham',          role: 'Master Cutter',       image: 'https://i.pravatar.cc/256?u=leanne1' },
  { name: 'Ervin Howell',           role: 'Fitting Specialist',  image: 'https://i.pravatar.cc/256?u=ervin2' },
  { name: 'Clementine Bauch',       role: 'Senior Seamstress',   image: 'https://i.pravatar.cc/256?u=clementine3' },
  { name: 'Patricia Lebsack',       role: 'Design Consultant',   image: 'https://i.pravatar.cc/256?u=patricia4' },
  { name: 'Chelsey Dietrich',       role: 'Alterations Expert',  image: 'https://i.pravatar.cc/256?u=chelsey5' },
  { name: 'Mrs. Dennis Schulist', role: 'Quality Inspector', image: 'https://i.pravatar.cc/256?img=47' },
  { name: 'Kurtis Weissnat',        role: 'Pattern Maker',       image: 'https://i.pravatar.cc/256?u=kurtis7' },
  { name: 'Nicholas Runolfsdottir', role: 'Embroidery Specialist',image: 'https://i.pravatar.cc/256?u=nicholas8' },
]

onMounted(async () => {
  try {
    const data = await teamService.getTeams()
    members.value = realTeam.map((member, index) => ({
      ...member,
      id: data[index]?.id ?? index + 1,
    }))
  } catch (err) {
    error.value = 'Failed to load team members.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="bg-[#0f172a] py-24 sm:py-32 rounded-3xl mx-4 my-8 shadow-2xl">
    <div class="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">

      <div class="max-w-xl">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl border-l-4 border-indigo-500 pl-4 uppercase">
          Our Tailoring Experts
        </h2>
        <p class="mt-6 text-lg/8 text-gray-400">
          From master cutters to senior seamstresses, our team is dedicated to delivering
          high-quality customized clothing and precision alterations.
        </p>

        <div class="mt-10 flex gap-4">
          <div class="bg-white/5 p-4 rounded-xl border border-white/10 flex-1">
            <p class="text-indigo-400 font-bold text-2xl">{{ members.length || 0 }}</p>
            <p class="text-gray-500 text-xs uppercase tracking-widest">On-Site Personnel</p>
          </div>
        </div>
      </div>

      <div class="xl:col-span-2">

        <!-- Loading Skeleton -->
        <div v-if="loading" class="grid gap-x-8 gap-y-12 sm:grid-cols-2">
          <div v-for="i in 8" :key="i" class="flex items-center gap-x-6 p-4 rounded-2xl bg-white/5 border border-white/10 animate-pulse">
            <div class="size-20 rounded-2xl bg-white/10 shrink-0"></div>
            <div class="space-y-2 flex-1">
              <div class="h-4 bg-white/10 rounded w-3/4"></div>
              <div class="h-3 bg-white/10 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-red-400 font-medium">
          System Error: Unable to retrieve staff records.
        </div>

        <!-- Team Grid -->
        <ul v-else role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16">
          <li v-for="member in members" :key="member.id" class="group">
            <div class="flex items-center gap-x-6 p-4 rounded-2xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-indigo-500/20">
              <img
                class="size-20 rounded-2xl object-cover outline-1 -outline-offset-1 outline-white/10 shadow-lg group-hover:scale-105 transition-transform shrink-0"
                :src="member.image"
                :alt="`Portrait of ${member.name}`"
              />
              <div>
                <h3 class="text-lg font-semibold tracking-tight text-white">{{ member.name }}</h3>
                <p class="text-sm font-bold text-indigo-400 uppercase tracking-tighter">{{ member.role }}</p>
                <span class="mt-2 inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">
                  Available
                </span>
              </div>
            </div>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>