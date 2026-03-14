<template>
  <aside class="nm-sidebar">
    <!-- Logo -->
    <div class="px-5 pt-6 pb-4">
      <NuxtLink to="/admin" class="flex items-center gap-3 group">
        <div class="nm-logo-wrap">
          <svg viewBox="0 0 36 36" fill="none" class="w-8 h-8">
            <rect width="36" height="36" rx="9" fill="rgba(77,182,182,0.15)"/>
            <path d="M18 7C18 7 10 12 10 20c0 5.5 3.5 9 8 9s8-3.5 8-9c0-8-8-13-8-13Z"
                  fill="none" stroke="#4db6b6" stroke-width="1.5" stroke-linejoin="round"/>
            <line x1="18" y1="29" x2="18" y2="14" stroke="#d97706" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M18 20l-4.5-4M18 23l-4-3M18 20l4.5-4" stroke="#4db6b6" stroke-width="1" stroke-linecap="round" opacity=".7"/>
          </svg>
        </div>
        <div>
          <p class="font-display text-white font-semibold text-[1.1rem] leading-tight tracking-wide">NutriMatch</p>
          <p class="text-teal-400 text-[.6rem] uppercase tracking-widest opacity-60">Admin Portal</p>
        </div>
      </NuxtLink>
    </div>

    <div class="nm-sidebar-sep"/>
    <p class="nm-sidebar-label">Navigation</p>

    <!-- 6 Navigation links -->
    <nav class="flex-1 py-1">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="nm-nav-link"
      >
        <component :is="link.icon" class="nm-nav-icon"/>
        <span>{{ link.label }}</span>
        <span
          v-if="link.badge"
          class="ml-auto text-[.62rem] font-bold bg-amber-600/20 text-amber-400 px-1.5 py-0.5 rounded-full"
        >{{ link.badge }}</span>
      </NuxtLink>
    </nav>

    <div class="nm-sidebar-sep"/>

    <!-- Admin user row -->
    <div class="px-4 py-4">
      <div class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 mb-2">
        <div class="nm-avatar w-8 h-8 text-xs" style="background: linear-gradient(135deg,#0d6b6b,#1a8a8a)">SA</div>
        <div class="flex-1 min-w-0">
          <p class="text-white text-[.8rem] font-semibold leading-tight truncate">System Admin</p>
          <p class="text-teal-400/50 text-[.68rem] truncate">admin@nutrimatch.ph</p>
        </div>
      </div>

      <!-- Sign Out — redirects to / (login) -->
      <NuxtLink
        to="/"
        class="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg
               text-teal-400/55 hover:text-red-300 hover:bg-red-500/10
               transition-all duration-200 text-[.82rem] font-semibold group"
      >
        <ArrowRightStartOnRectangleIcon class="w-4 h-4"/>
        Sign Out
      </NuxtLink>
    </div>

    <p class="text-center text-[.58rem] text-teal-400/20 pb-3 tracking-wider">NutriMatch v1.0 · PH</p>
  </aside>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  UsersIcon,
  UserGroupIcon,
  IdentificationIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/vue/24/outline'

const navLinks = [
  { to: '/admin',       label: 'Dashboard',  icon: HomeIcon,              badge: null },
  { to: '/teams',       label: 'Team',        icon: UsersIcon,             badge: '7'  },
  { to: '/clients',     label: 'Clients',     icon: UserGroupIcon,         badge: null },
  { to: '/dietitians',  label: 'Dietitians',  icon: IdentificationIcon,    badge: '1'  },
  { to: '/settings',    label: 'Settings',    icon: Cog6ToothIcon,         badge: null },
  { to: '/profile',     label: 'My Profile',  icon: UserCircleIcon,        badge: null },
]
</script>

<style scoped>
.nm-logo-wrap { flex-shrink: 0; }
</style>
