<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
    
    <div class="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-green-950 tracking-tight">Active Projects</h1>
        <p class="text-gray-500 font-medium">Tracking trail maintenance, conservation, and summit expeditions</p>
      </div>
      
      <div class="flex items-center gap-3">
        <div class="px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
          <span class="text-xs font-bold text-gray-400 uppercase block">Budget Utilized</span>
          <span class="text-lg font-black text-green-700">68%</span>
        </div>
        <button class="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-green-900/20 transition-all">
          + New Project
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="project in projects" :key="project.id" 
           class="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row">
        
        <div class="w-full md:w-48 h-48 md:h-auto bg-gray-200 relative">
          <img :src="project.image" class="w-full h-full object-cover" />
          <div class="absolute top-3 left-3">
            <span :class="getStatusClass(project.status)" class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
              {{ project.status }}
            </span>
          </div>
        </div>

        <div class="p-6 flex-1">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="text-xl font-bold text-gray-800">{{ project.title }}</h3>
              <p class="text-sm text-gray-500 font-medium">{{ project.location }}</p>
            </div>
            <span class="text-xs font-bold bg-green-50 text-green-700 px-2 py-1 rounded-md">
              {{ project.difficulty }}
            </span>
          </div>

          <p class="text-sm text-gray-600 mb-6 line-clamp-2 italic">
            "{{ project.description }}"
          </p>

          <div class="space-y-2 mb-6">
            <div class="flex justify-between text-[10px] font-black uppercase text-gray-400">
              <span>Completion Progress</span>
              <span>{{ project.progress }}%</span>
            </div>
            <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-green-600 transition-all duration-1000" :style="{ width: project.progress + '%' }"></div>
            </div>
          </div>

          <div class="flex items-center justify-between border-t border-gray-50 pt-4">
            <div class="flex -space-x-2 overflow-hidden">
              <img v-for="member in project.team" :key="member" 
                   class="inline-block h-7 w-7 rounded-full ring-2 ring-white" 
                   :src="`https://i.pravatar.cc/100?u=${member}`" alt="">
            </div>
            <button class="text-xs font-bold text-green-700 hover:text-green-900 transition">
              View Roadmap →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const projects = ref([
  {
    id: 1,
    title: 'Peak Restoration 2026',
    location: 'Mt. Apo National Park',
    status: 'In Progress',
    difficulty: 'Hard',
    progress: 75,
    description: 'Reforestation of the eastern slope and trail reinforcement for the upcoming monsoon season.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80',
    team: ['datu', 'elena', 'rico']
  },
  {
    id: 2,
    title: 'Blue Water Survey',
    location: 'Lake Holon',
    status: 'Planning',
    difficulty: 'Medium',
    progress: 20,
    description: 'Ecological impact study of local tourism on the water quality and surrounding biodiversity.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80',
    team: ['liza', 'bong']
  },
  {
    id: 3,
    title: 'Summit Safety Network',
    location: 'Cordillera Range',
    status: 'Review',
    difficulty: 'Technical',
    progress: 95,
    description: 'Installation of solar-powered emergency radio beacons across high-altitude transition zones.',
    image: 'https://images.unsplash.com/photo-1551632432-c7360b949527?auto=format&fit=crop&w=400&q=80',
    team: ['rico', 'elena', 'bong']
  },
  {
    id: 4,
    title: 'Pathfinder Integration',
    location: 'Digital Infrastructure',
    status: 'In Progress',
    difficulty: 'Easy',
    progress: 45,
    description: 'Migrating all manual trail logs to the new real-time GPS tracking dashboard.',
    image: 'https://images.unsplash.com/photo-1526733170371-33230a1387aa?auto=format&fit=crop&w=400&q=80',
    team: ['liza', 'datu']
  }
])

const getStatusClass = (status) => {
  switch (status) {
    case 'In Progress': return 'bg-blue-100 text-blue-700'
    case 'Planning': return 'bg-amber-100 text-amber-700'
    case 'Review': return 'bg-purple-100 text-purple-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}
</script>