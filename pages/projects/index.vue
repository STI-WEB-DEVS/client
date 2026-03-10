<template>
    <NuxtLayout>
      <div class="p-6 md:p-8 bg-gray-50 min-h-screen">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Projects</h1>
            <p class="text-gray-500 mt-1">Manage and track your active project portfolio.</p>
          </div>
          <button class="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition">
            + New Project
          </button>
        </div>
  
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="project in projects" :key="project.id" class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-semibold text-gray-900">{{ project.name }}</h3>
              <span :class="statusStyles[project.status]" class="px-2.5 py-0.5 rounded-full text-xs font-medium">
                {{ project.status }}
              </span>
            </div>
            
            <p class="text-gray-600 text-sm mb-6">{{ project.description }}</p>
  
            <div class="mb-4">
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-500">Progress</span>
                <span class="font-medium">{{ project.progress }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-600 h-2 rounded-full" :style="{ width: project.progress + '%' }"></div>
              </div>
            </div>
  
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <span class="text-xs text-gray-400">Due: {{ project.dueDate }}</span>
              <div class="flex -space-x-2">
                <div v-for="n in 3" :key="n" class="w-7 h-7 rounded-full bg-gray-300 border-2 border-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>
  
  <script setup>
  const statusStyles = {
    'In Progress': 'bg-green-100 text-green-700',
    'Review': 'bg-green-100 text-green-700',
    'Completed': 'bg-green-100 text-green-700'
  };
  
  const projects = [
    { id: 1, name: 'Website Redesign', description: 'Overhauling the main corporate landing page for better conversion.', progress: 75, status: 'In Progress', dueDate: 'Mar 25' },
    { id: 2, name: 'Mobile App API', description: 'Developing secure endpoints for the upcoming iOS release.', progress: 40, status: 'Review', dueDate: 'Apr 02' },
    { id: 3, name: 'Client Portal', description: 'Internal tool for managing client documents and feedback.', progress: 100, status: 'Completed', dueDate: 'Feb 15' },
  ];
  </script>