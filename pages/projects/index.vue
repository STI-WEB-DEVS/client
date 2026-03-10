<template>
    <NuxtLayout name="default">
      <div class="py-8 px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center border-b border-gray-200 pb-5 mb-8">
          <div class="sm:flex-auto">
            <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Event Projects</h1>
            <p class="mt-2 text-sm text-gray-600">
              Manage and monitor active ticketing projects, sales progress, and event status.
            </p>
          </div>
          <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button type="button" class="block rounded-md bg-[#0f2573] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#1a3a8a]">
              New Event
            </button>
          </div>
        </div>
  
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="project in projects" :key="project.id" 
               class="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <span :class="[
                  project.status === 'Active' ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
                  'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'
                ]">
                  {{ project.status }}
                </span>
                <p class="text-sm text-gray-500 font-medium">{{ project.category }}</p>
              </div>
              
              <h3 class="text-lg font-bold text-gray-900 mb-2 uppercase">{{ project.title }}</h3>
              
              <div class="mt-4">
                <div class="flex justify-between text-xs mb-1">
                  <span class="text-gray-600 font-semibold">Tickets Sold: {{ project.sold }}</span>
                  <span class="text-gray-400">Goal: {{ project.total }}</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                  <div class="bg-[#0f2573] h-2 rounded-full" :style="{ width: (project.sold / project.total * 100) + '%' }"></div>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
              <button class="text-sm font-semibold text-[#0f2573] hover:underline">View Analytics</button>
              <button class="text-gray-400 hover:text-gray-600">
                <span class="sr-only">Settings</span>
                <Cog6ToothIcon class="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>
  
  <script setup>
  import { Cog6ToothIcon } from '@heroicons/vue/24/outline'
  
  // Hardcoded Event Data: Edit titles, status, and sales numbers here
  const projects = ref([
    {
      id: 1,
      title: 'Summer Music Festival 2026',
      category: 'Concert',
      status: 'Active',
      sold: 850,
      total: 1000
    },
    {
      id: 2,
      title: 'Global Tech Summit',
      category: 'Conference',
      status: 'Active',
      sold: 420,
      total: 500
    },
    {
      id: 3,
      title: 'Regional Sports Expo',
      category: 'Sports',
      status: 'Draft',
      sold: 0,
      total: 1200
    },
    {
      id: 4,
      title: 'Metropolitan Art Gala',
      category: 'Gala',
      status: 'Active',
      sold: 150,
      total: 200
    }
  ])
  </script>