<template>
  <div>
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Project Workspace</h1>
        <p class="text-sm/6 text-gray-500 mt-1">Track structural operations, milestones, and system distribution metrics.</p>
      </div>
      <button class="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm/6 font-semibold shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
        New Project
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="project in projects" :key="project.id" class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 transition hover:shadow-md">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-base font-semibold text-gray-900">{{ project.name }}</h3>
          <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-md truncate">
            {{ project.status }}
          </span>
        </div>
        
        <p class="text-sm/6 text-gray-500 mb-6">{{ project.description }}</p>

        <div class="mb-4">
          <div class="flex justify-between text-xs mb-1">
            <span class="text-gray-500">Progress</span>
            <span class="font-medium text-gray-900">{{ project.progress }}%</span>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-2">
            <div class="bg-green-600 h-2 rounded-full" :style="{ width: project.progress + '%' }"></div>
          </div>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
          <span class="text-xs text-gray-400">Target: {{ project.dueDate }}</span>
          <div class="flex -space-x-2">
            <div v-for="n in 3" :key="n" class="w-7 h-7 rounded-full bg-gray-200 border-2 border-white"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const projects = [
  { id: 1, name: 'Enterprise System Architecture', description: 'Rebuilding backend routing protocols and layout layers for structural data loads.', progress: 75, status: 'In Progress', dueDate: 'Mar 25' },
  { id: 2, name: 'Data Synchronizer Module', description: 'Refactoring secure web endpoint pipelines for real-time asset tracking nodes.', progress: 40, status: 'Review', dueDate: 'Apr 02' },
  { id: 3, name: 'Central User Directory', description: 'Internal platform instance engineered to manage client profiles and authentication workflows.', progress: 100, status: 'Completed', dueDate: 'Feb 15' },
];
</script>