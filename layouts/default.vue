<template>
  <div class="flex min-h-screen bg-slate-50 font-sans text-slate-900">
    <aside class="w-72 bg-slate-900 text-white flex flex-col fixed h-full shadow-2xl z-20">
      <div class="p-8">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span class="text-2xl font-black">P</span>
          </div>
          <div>
            <h1 class="text-xl font-bold tracking-tight">SmartPark</h1>
            <p class="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Operations v2</p>
          </div>
        </div>
      </div>

      <nav class="flex-1 px-4 space-y-2 mt-4">
        <NuxtLink 
          v-for="link in navLinks" 
          :key="link.path" 
          :to="link.path"
          class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-slate-800"
          active-class="bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
        >
          <span class="text-xl group-hover:scale-110 transition-transform">{{ link.icon }}</span>
          <span class="font-medium text-sm">{{ link.name }}</span>
        </NuxtLink>
      </nav>

      <div class="p-6 border-t border-slate-800">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-8 rounded-full bg-slate-700 border border-slate-600"></div>
          <div class="overflow-hidden text-ellipsis">
            <p class="text-xs font-bold truncate">Admin User</p>
            <p class="text-[10px] text-slate-500 truncate">admin@smartpark.io</p>
          </div>
        </div>
        
        <button 
          @click="handleSignOut"
          class="w-full flex items-center justify-center gap-2 py-3 bg-rose-500/10 text-rose-400 rounded-xl text-xs font-bold hover:bg-rose-500 hover:text-white transition-all"
        >
          <span>Logout System</span>
        </button>
      </div>
    </aside>

    <main class="flex-1 ml-72">
      <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
        <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">
          SmartPark / {{ currentRouteName }}
        </div>
        <div class="flex items-center gap-4">
          <div class="h-8 w-[1px] bg-slate-200 mx-2"></div>
          <button class="text-slate-400 hover:text-slate-600">🔔</button>
        </div>
      </header>

      <div class="relative">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
// Navigation Definition (Exactly 6 Links as per Requirement 1.2)
const navLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  { name: 'Parking Zones', path: '/zones', icon: '🗺️' },
  { name: 'Real-time Occupancy', path: '/occupancy', icon: '📡' },
  { name: 'Team Members', path: '/team', icon: '👥' },
  { name: 'System Settings', path: '/settings', icon: '⚙️' },
  { name: 'User Profile', path: '/profile', icon: '👤' }
];

const route = useRoute();
const currentRouteName = computed(() => {
  const current = navLinks.find(l => l.path === route.path);
  return current ? current.name : 'Overview';
});

// Requirement 1.5: Sign Out Flow
const handleSignOut = () => {
  // Clear any local state here if needed
  navigateTo('/login');
};
</script>

<style>
/* Smooth Nuxt Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>

