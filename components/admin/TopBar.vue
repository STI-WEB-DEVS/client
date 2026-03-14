<template>
  <header class="nm-topbar">
    <!-- Left -->
    <div>
      <div class="flex items-center gap-1.5 text-[.72rem] text-teal-700/60 mb-0.5">
        <span>NutriMatch</span>
        <ChevronRightIcon class="w-3 h-3"/>
        <span class="font-semibold text-teal-700">{{ page.crumb }}</span>
      </div>
      <h1 class="font-display text-[1.3rem] font-semibold text-[#1a2e2e] leading-tight">{{ page.title }}</h1>
    </div>

    <!-- Right -->
    <div class="flex items-center gap-2.5">
      <!-- Search -->
      <div class="relative hidden sm:block">
        <MagnifyingGlassIcon class="w-4 h-4 text-[#6b8080] absolute left-3 top-1/2 -translate-y-1/2"/>
        <input type="text" placeholder="Quick search…" class="nm-input pl-9 py-1.5 text-sm w-48"/>
      </div>

      <!-- Bell -->
      <button class="nm-topbar-btn relative">
        <BellIcon class="w-5 h-5"/>
        <span class="absolute top-0.5 right-0.5 w-2 h-2 bg-amber-600 rounded-full ring-2 ring-white"/>
      </button>

      <!-- Profile chip -->
      <NuxtLink to="/profile" class="nm-profile-chip">
        <div class="nm-avatar w-[30px] h-[30px] text-[.68rem]" style="background: linear-gradient(135deg,#0d6b6b,#1a8a8a)">SA</div>
        <span class="text-sm font-semibold text-[#1a2e2e] hidden md:block">Admin</span>
        <ChevronDownIcon class="w-3.5 h-3.5 text-[#6b8080] hidden md:block"/>
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon, BellIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

const route = useRoute()

const pages: Record<string, { title: string; crumb: string }> = {
  '/admin':      { title: 'Dashboard',          crumb: 'Dashboard' },
  '/teams':      { title: 'Team Management',    crumb: 'Team' },
  '/clients':    { title: 'Client Management',  crumb: 'Clients' },
  '/dietitians': { title: 'Dietitian Registry', crumb: 'Dietitians' },
  '/settings':   { title: 'System Settings',    crumb: 'Settings' },
  '/profile':    { title: 'My Profile',         crumb: 'Profile' },
}

const page = computed(() => pages[route.path] ?? { title: 'NutriMatch', crumb: 'Admin' })
</script>

<style scoped>
.nm-topbar-btn {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 8px; border: 1.5px solid var(--border);
  background: transparent; color: var(--muted); cursor: pointer; transition: all .16s;
}
.nm-topbar-btn:hover { border-color: var(--teal-400); color: var(--teal-700); background: var(--teal-50); }

.nm-profile-chip {
  display: flex; align-items: center; gap: .45rem;
  padding: .25rem .65rem .25rem .25rem;
  border-radius: 99px; border: 1.5px solid var(--border);
  text-decoration: none; transition: all .16s;
}
.nm-profile-chip:hover { border-color: var(--teal-400); background: var(--teal-50); }
</style>
