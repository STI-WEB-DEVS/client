<template>
  <div>

    <!-- ── Profile hero ───────────────────────────────────── -->
    <div class="relative overflow-hidden bg-gradient-to-br from-[#1D3557] via-[#457B9D] to-[#A8DADC]">

      <!-- Decorative -->
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-white/5"></div>
        <div class="absolute -bottom-16 left-[6%] h-56 w-56 rounded-full bg-white/5"></div>
        <div class="absolute inset-0 opacity-[0.03]" style="background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:40px 40px;"></div>
      </div>

      <div class="relative mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-end justify-between gap-6">

          <div class="flex flex-wrap items-end gap-5">
            <div class="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Tom Cook"
                class="h-24 w-24 rounded-2xl border-2 border-white/40 object-cover shadow-2xl"
              />
              <span class="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md">
                <span class="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500"></span>
              </span>
            </div>
            <div class="pb-1">
              <p class="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[#A8DADC]/80">
                Senior Blood Bank Administrator
              </p>
              <h1 class="mb-2.5 text-2xl font-bold text-white sm:text-3xl">Tom Cook</h1>
              <div class="flex flex-wrap gap-2">
                <span class="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                  <svg class="size-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8l-2 4h12l-2-4z"/></svg>
                  ID: ST-99203
                </span>
                <span class="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                  <svg class="size-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  Since Jan 2024
                </span>
                <span class="inline-flex items-center gap-1.5 rounded-full border border-[#D62828]/40 bg-[#D62828]/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <svg class="size-3 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>
                  Blood Type: O+
                </span>
              </div>
            </div>
          </div>

          <!-- Quick stats -->
          <div class="flex shrink-0 items-center divide-x divide-white/20 rounded-2xl border border-white/20 bg-white/10 px-2 py-3 backdrop-blur-sm">
            <div class="flex flex-col items-center px-5">
              <span class="text-2xl font-bold text-white">42</span>
              <span class="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/60">Drives</span>
            </div>
            <div class="flex flex-col items-center px-5">
              <span class="text-2xl font-bold text-white">1.2k</span>
              <span class="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/60">Donors</span>
            </div>
            <div class="flex flex-col items-center px-5">
              <span class="text-2xl font-bold text-white">98%</span>
              <span class="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/60">Success</span>
            </div>
          </div>

        </div>
      </div>
    </div>


    <div class="sticky top-16 z-30 border-b border-[#A8DADC]/30 bg-[#F1FAEE] shadow-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-1">

          <NuxtLink
            to="/profile/overview"
            class="inline-flex items-center gap-2 border-b-2 px-4 py-3.5 text-sm font-semibold transition-colors"
            :class="route.path === '/profile'
              ? 'border-[#D62828] text-[#D62828]'
              : 'border-transparent text-[#457B9D] hover:border-[#457B9D] hover:text-[#1D3557]'"
          >
            <UserCircleIcon class="size-4 shrink-0" />
            Overview
          </NuxtLink>

          <NuxtLink
            to="/profile/activity"
            class="inline-flex items-center gap-2 border-b-2 px-4 py-3.5 text-sm font-semibold transition-colors"
            :class="route.path.startsWith('/profile/activity')
              ? 'border-[#D62828] text-[#D62828]'
              : 'border-transparent text-[#457B9D] hover:border-[#457B9D] hover:text-[#1D3557]'"
          >
            <BoltIcon class="size-4 shrink-0" />
            Activity
          </NuxtLink>

          <NuxtLink
            to="/profile/document"
            class="inline-flex items-center gap-2 border-b-2 px-4 py-3.5 text-sm font-semibold transition-colors"
            :class="route.path.startsWith('/profile/documents')
              ? 'border-[#D62828] text-[#D62828]'
              : 'border-transparent text-[#457B9D] hover:border-[#457B9D] hover:text-[#1D3557]'"
          >
            <DocumentTextIcon class="size-4 shrink-0" />
            Documents
          </NuxtLink>

          <div class="ml-auto">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg border border-[#D62828]/30 bg-[#D62828]/10 px-4 py-2 text-sm font-semibold text-[#D62828] transition hover:bg-[#D62828]/20"
            >
              <PencilSquareIcon class="size-4 shrink-0" />
              Edit Profile
            </button>
          </div>

        </div>
      </div>
    </div>

    <main class="py-8 bg-[#F1FAEE] min-h-screen">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>

  </div>
</template>

<script setup>
import {
  BoltIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>