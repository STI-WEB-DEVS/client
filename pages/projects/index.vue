<template>
  <NuxtLayout>
    <div class="mb-8 border-b border-gray-100 pb-8 sm:flex sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Active Projects</h1>
        <p class="mt-2 text-sm text-gray-500">Track library initiatives, system updates, and community events.</p>
      </div>
      <div class="mt-4 flex gap-3 sm:mt-0">
        <button class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50">
          Export Report
        </button>
        <button class="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800">
          + New Project
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      <div v-for="project in projects" :key="project.id" 
           class="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
        
        <div class="flex items-center justify-between mb-4">
          <span :class="statusStyles(project.status)" class="rounded-full px-2.5 py-0.5 text-xs font-medium border">
            {{ project.status }}
          </span>
          <span class="text-xs font-medium text-gray-400 uppercase tracking-widest">{{ project.category }}</span>
        </div>

        <div class="flex-1">
          <h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {{ project.title }}
          </h3>
          <p class="mt-2 text-sm/6 text-gray-600 line-clamp-2">
            {{ project.description }}
          </p>
        </div>

        <div class="mt-6">
          <div class="flex items-center justify-between text-xs font-medium text-gray-500 mb-1.5">
            <span>Progress</span>
            <span>{{ project.progress }}%</span>
          </div>
          <div class="h-2 w-full rounded-full bg-gray-100">
            <div class="h-2 rounded-full bg-black transition-all duration-1000" :style="{ width: project.progress + '%' }"></div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-between pt-5 border-t border-gray-50">
          <div class="flex items-center text-xs text-gray-500">
            <svg class="mr-1.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ project.dueDate }}
          </div>
          <div class="flex -space-x-2">
            <div v-for="i in 3" :key="i" class="h-7 w-7 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold">
              LD
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const projects = [
  {
    id: 1,
    title: 'Digital Archive Expansion',
    description: 'Digitizing the 19th-century manuscript collection for public online access.',
    category: 'IT / Archiving',
    status: 'In Progress',
    progress: 65,
    dueDate: 'Oct 12, 2026'
  },
  {
    id: 2,
    title: 'Annual Book Fair 2026',
    description: 'Planning logistics, vendor partnerships, and volunteer coordination for the summer event.',
    category: 'Events',
    status: 'Planning',
    progress: 20,
    dueDate: 'Aug 05, 2026'
  },
  {
    id: 3,
    title: 'Inventory RFID Tagging',
    description: 'Updating physical book stock with RFID tags to improve self-checkout speed.',
    category: 'Operations',
    status: 'Completed',
    progress: 100,
    dueDate: 'Jan 20, 2026'
  }
]

const statusStyles = (status: string) => {
  switch (status) {
    case 'In Progress': return 'bg-blue-50 text-blue-700 border-blue-100'
    case 'Completed': return 'bg-green-50 text-green-700 border-green-100'
    case 'Planning': return 'bg-amber-50 text-amber-700 border-amber-100'
    default: return 'bg-gray-50 text-gray-700 border-gray-100'
  }
}
</script>