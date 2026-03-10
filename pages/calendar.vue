<template>
  <NuxtLayout>
    <div class="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p class="text-xs font-semibold uppercase tracking-widest text-amber-600">Parking</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-900">Tickets for Parking</h1>
      <p class="mt-2 text-sm text-slate-600">Track generated tickets, active sessions, and completed exits.</p>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2">
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="mb-5 text-xl font-semibold text-slate-900">Lifecycle Overview</h2>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Generated</p>
              <p class="mt-2 text-2xl font-bold text-slate-900">872</p>
              <p class="mt-1 text-xs text-slate-500">Today</p>
            </div>
            <div class="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p class="text-xs font-semibold uppercase tracking-wider text-amber-700">Active</p>
              <p class="mt-2 text-2xl font-bold text-amber-700">342</p>
              <p class="mt-1 text-xs text-amber-700/80">Currently parked</p>
            </div>
            <div class="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p class="text-xs font-semibold uppercase tracking-wider text-emerald-700">Completed</p>
              <p class="mt-2 text-2xl font-bold text-emerald-700">530</p>
              <p class="mt-1 text-xs text-emerald-700/80">Exited successfully</p>
            </div>
          </div>

          <div class="mt-6">
            <p class="mb-3 text-sm font-semibold text-slate-700">Flow Progress</p>
            <div class="h-3 w-full overflow-hidden rounded-full bg-slate-200">
              <div class="flex h-full">
                <div class="h-full bg-slate-700" style="width: 36%"></div>
                <div class="h-full bg-amber-500" style="width: 28%"></div>
                <div class="h-full bg-emerald-500" style="width: 36%"></div>
              </div>
            </div>
            <div class="mt-2 flex flex-wrap gap-4 text-xs text-slate-600">
              <span class="inline-flex items-center gap-2"><span
                  class="h-2.5 w-2.5 rounded-full bg-slate-700"></span>Generated</span>
              <span class="inline-flex items-center gap-2"><span
                  class="h-2.5 w-2.5 rounded-full bg-amber-500"></span>Active</span>
              <span class="inline-flex items-center gap-2"><span
                  class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>Completed</span>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="mb-4 text-lg font-semibold text-slate-900">Recent Ticket Scans</h3>
          <div class="space-y-4">
            <div v-for="scan in scans" :key="scan.id" class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p class="text-sm font-semibold text-slate-900">{{ scan.ticket }}</p>
              <p class="text-xs text-slate-500">{{ scan.zone }} • {{ scan.time }}</p>
              <span
                :class="`mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${scan.statusClass}`">{{
                scan.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const scans = [
  { id: 1, ticket: 'QR-240311-0018', zone: 'Mall Parking A', time: '2 min ago', status: 'Entry', statusClass: 'bg-emerald-100 text-emerald-700' },
  { id: 2, ticket: 'QR-240311-0011', zone: 'City Center C', time: '5 min ago', status: 'Exit', statusClass: 'bg-blue-100 text-blue-700' },
  { id: 3, ticket: 'QR-240311-0007', zone: 'Airport B', time: '8 min ago', status: 'Active', statusClass: 'bg-amber-100 text-amber-700' },
]
</script>
