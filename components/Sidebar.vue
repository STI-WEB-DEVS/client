<template>
  <aside class="w-64 bg-slate-900 text-white min-h-screen p-4">
    <div class="mb-8 px-2 flex items-center gap-2">
      <div class="bg-emerald-500 p-2 rounded-lg">🅿️</div>
      <h1 class="text-xl font-bold tracking-tight">SmartPark <span class="text-emerald-400">Admin</span></h1>
    </div>
    
    <nav class="space-y-2">
      <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path" 
        class="flex items-center p-3 rounded-lg hover:bg-slate-800 transition-colors"
        active-class="bg-emerald-600 text-white">
        <span>{{ link.name }}</span>
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup>
const navLinks = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Parking Zones', path: '/zones' },
  { name: 'Real-time Occupancy', path: '/occupancy' },
  { name: 'Team Members', path: '/team' }, // Requirement 1.3
  { name: 'System Settings', path: '/settings' }, // Requirement 1.4
  { name: 'User Profile', path: '/profile' } // Requirement 1.4
]
</script>