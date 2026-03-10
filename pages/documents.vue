<template>
  <NuxtLayout>
    <div class="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p class="text-xs font-semibold uppercase tracking-widest text-amber-600">Monitoring</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-900">Operations Logs</h1>
      <p class="mt-2 text-sm text-slate-600">Review parking entries, exits, alerts, and system audit activity.</p>
    </div>

    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-slate-900">Recent Activity Logs</h2>
          <button class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            Export Logs
          </button>
        </div>
      </div>
      
      <div class="divide-y divide-slate-100">
        <div v-for="log in logs" :key="log.id" class="px-6 py-4 transition-colors hover:bg-slate-50">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div :class="`h-10 w-10 rounded-lg flex items-center justify-center ${log.iconBg}`">
                <svg class="h-6 w-6" :class="log.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-slate-900">{{ log.event }}</p>
                <p class="text-xs text-slate-500">{{ log.zone }} • {{ log.time }}</p>
              </div>
            </div>
            <button class="rounded-xl bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700 hover:bg-amber-100">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const logs = [
  { id: 1, event: 'Vehicle Entry Confirmed - QR-240311-0018', zone: 'Mall Parking A', time: 'Mar 10, 2026 • 08:12 AM', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
  { id: 2, event: 'Vehicle Exit Processed - QR-240311-0011', zone: 'City Center C', time: 'Mar 10, 2026 • 08:20 AM', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 3, event: 'Capacity Alert Triggered (85%+)', zone: 'Airport B', time: 'Mar 10, 2026 • 08:25 AM', iconBg: 'bg-amber-100', iconColor: 'text-amber-700' },
  { id: 4, event: 'Payment Validation Completed', zone: 'Downtown Plaza B', time: 'Mar 10, 2026 • 08:33 AM', iconBg: 'bg-violet-100', iconColor: 'text-violet-600' },
  { id: 5, event: 'System Health Check Passed', zone: 'Central Server', time: 'Mar 10, 2026 • 08:40 AM', iconBg: 'bg-slate-200', iconColor: 'text-slate-700' }
]
</script>
