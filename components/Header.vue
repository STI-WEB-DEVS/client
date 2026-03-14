<!-- components/Header.vue -->
<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div class="px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h1 class="text-2xl font-semibold text-gray-900">{{ pageTitle }}</h1>
          <span class="px-2.5 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">Admin</span>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="relative">
            <input 
              type="text" 
              placeholder="Search patients, consultations..." 
              class="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400"
            />
            <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          
          <!-- Notifications -->
          <button class="relative p-2 text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitle = computed(() => {
  const titles = {
    '/dashboard': 'Dashboard',
    '/patients': 'Patient Management',
    '/consultations': 'Consultations',
    '/team': 'Dietitian Team',
    '/settings': 'System Settings',
    '/profile': 'User Profile'
  }
  return titles[route.path] || 'NutriMatch'
})
</script>