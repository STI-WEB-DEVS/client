<template>
  <div>

    <!-- ── Settings page header ────────────────────────────── -->
    <div class="border-b border-[#A8DADC]/30 bg-[#F1FAEE]">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <!-- Title row -->
        <div class="flex items-center gap-3 py-6">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1D3557]">
            <Cog6ToothIcon class="size-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-[#1D3557]">Settings</h1>
            <p class="text-sm text-[#457B9D]">Manage your account and system preferences</p>
          </div>
        </div>

        <!-- Sub-nav tabs -->
        <div class="flex items-center gap-1">

          <NuxtLink
            to="/setting/general"
            class="inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors"
            :class="route.path.startsWith('/setting/general')
              ? 'border-[#1D3557] text-[#1D3557]'
              : 'border-transparent text-[#457B9D] hover:border-[#457B9D] hover:text-[#1D3557]'"
          >
            <AdjustmentsHorizontalIcon class="size-4 shrink-0" />
            General
          </NuxtLink>

          <NuxtLink
            to="/setting/security"
            class="inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors"
            :class="route.path.startsWith('/setting/security')
              ? 'border-[#1D3557] text-[#1D3557]'
              : 'border-transparent text-[#457B9D] hover:border-[#457B9D] hover:text-[#1D3557]'"
          >
            <ShieldCheckIcon class="size-4 shrink-0" />
            Security
          </NuxtLink>

          <NuxtLink
            to="/setting/notification"
            class="inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors"
            :class="route.path.startsWith('/setting/notifications')
              ? 'border-[#1D3557] text-[#1D3557]'
              : 'border-transparent text-[#457B9D] hover:border-[#457B9D] hover:text-[#1D3557]'"
          >
            <BellAlertIcon class="size-4 shrink-0" />
            Notifications
          </NuxtLink>

          <NuxtLink
            to="/setting/billing"
            class="inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors"
            :class="route.path.startsWith('/setting/billing')
              ? 'border-[#1D3557] text-[#1D3557]'
              : 'border-transparent text-[#457B9D] hover:border-[#457B9D] hover:text-[#1D3557]'"
          >
            <CreditCardIcon class="size-4 shrink-0" />
            Billing
          </NuxtLink>

        </div>
      </div>
    </div>

    <!-- ── Slot: sub-page content ──────────────────────────── -->
    <main class="py-8 bg-[#F1FAEE] min-h-screen">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>

  </div>
</template>

<script setup>
import {
  AdjustmentsHorizontalIcon,
  BellAlertIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  ShieldCheckIcon,
} from '@heroicons/vue/24/outline'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>