<template>
  <NuxtLayout>
    <div class="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p class="text-xs font-semibold uppercase tracking-widest text-amber-600">SmartPark - Admin</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-900">Dashboard</h1>
      <p class="mt-2 text-sm text-slate-600">Overview of real-time parking operations and ticket lifecycle activity.</p>
    </div>

    <!-- Stats Grid -->
    <div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 py-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <dt class="truncate text-sm font-medium text-slate-500">Total Parking Spots</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-slate-900">1,248</dd>
        <div class="mt-2 text-xs text-emerald-600">95% operational</div>
      </div>

      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 py-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <dt class="truncate text-sm font-medium text-slate-500">Active Sessions</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-slate-900">342</dd>
        <div class="mt-2 text-xs text-blue-600">+12% from yesterday</div>
      </div>

      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 py-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <dt class="truncate text-sm font-medium text-slate-500">Today's Revenue</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-slate-900">₱18,420</dd>
        <div class="mt-2 text-xs text-emerald-600">+8% from avg</div>
      </div>

      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 py-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <dt class="truncate text-sm font-medium text-slate-500">QR Scans Today</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-slate-900">687</dd>
        <div class="mt-2 text-xs text-slate-500">Entry & Exit combined</div>
      </div>
    </div>

    <!-- Visual Analytics -->
    <div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
        <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
          <h2 class="text-lg font-semibold text-slate-900">Hourly Entry vs Exit</h2>
          <p class="mt-1 text-xs text-slate-500">Live traffic pattern across active parking zones</p>
        </div>
        <div class="px-6 py-5">
          <div class="grid grid-cols-7 gap-3">
            <div v-for="item in hourlyTraffic" :key="item.time" class="flex flex-col items-center gap-2">
              <div class="flex h-28 items-end gap-1">
                <div class="w-2 rounded-t bg-amber-400" :style="{ height: `${(item.entry / maxHourlyTraffic) * 100}%` }"></div>
                <div class="w-2 rounded-t bg-slate-700" :style="{ height: `${(item.exit / maxHourlyTraffic) * 100}%` }"></div>
              </div>
              <p class="text-[11px] font-medium text-slate-500">{{ item.time }}</p>
            </div>
          </div>
          <div class="mt-4 flex items-center gap-4 text-xs text-slate-600">
            <div class="inline-flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-amber-400"></span>Entry</div>
            <div class="inline-flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-slate-700"></span>Exit</div>
          </div>
        </div>
      </div>

      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
          <h2 class="text-lg font-semibold text-slate-900">Ticket Mix</h2>
          <p class="mt-1 text-xs text-slate-500">Distribution by vehicle category</p>
        </div>
        <div class="space-y-4 px-6 py-5">
          <div class="mx-auto h-36 w-36 rounded-full" :style="{ background: `conic-gradient(#f59e0b 0% 52%, #334155 52% 82%, #38bdf8 82% 100%)` }">
            <div class="flex h-full w-full items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-700">Today</div>
          </div>
          <div class="space-y-2 text-sm">
            <div v-for="ticket in ticketMix" :key="ticket.label" class="flex items-center justify-between">
              <span class="inline-flex items-center gap-2 text-slate-600">
                <span class="h-2.5 w-2.5 rounded-full" :class="ticket.dot"></span>
                {{ ticket.label }}
              </span>
              <span class="font-semibold text-slate-900">{{ ticket.value }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Parking Lots Overview -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Recent Activity -->
      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
          <h2 class="text-lg font-semibold text-slate-900">Recent Activity</h2>
        </div>
        <div class="divide-y divide-slate-100">
          <div class="px-6 py-4 flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-900">Mall Parking - Level 3</p>
              <p class="text-xs text-slate-500">Vehicle entered • 2 minutes ago</p>
            </div>
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Entry
            </span>
          </div>
          <div class="px-6 py-4 flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-900">Downtown Plaza - A2</p>
              <p class="text-xs text-slate-500">Vehicle exited • 5 minutes ago</p>
            </div>
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              Exit
            </span>
          </div>
          <div class="px-6 py-4 flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-900">Airport Parking - B1</p>
              <p class="text-xs text-slate-500">Vehicle entered • 8 minutes ago</p>
            </div>
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Entry
            </span>
          </div>
          <div class="px-6 py-4 flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-900">City Center - Level 2</p>
              <p class="text-xs text-slate-500">Vehicle exited • 12 minutes ago</p>
            </div>
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              Exit
            </span>
          </div>
        </div>
      </div>

      <!-- Parking Lot Status -->
      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
          <h2 class="text-lg font-semibold text-slate-900">Parking Lot Status</h2>
        </div>
        <div class="px-6 py-4 space-y-4">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-slate-900">Mall Parking</span>
              <span class="text-sm text-slate-600">68% Full</span>
            </div>
            <div class="h-2 w-full rounded-full bg-slate-200">
              <div class="bg-yellow-500 h-2 rounded-full" style="width: 68%"></div>
            </div>
            <p class="mt-1 text-xs text-slate-500">204 / 300 spots occupied</p>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-slate-900">Downtown Plaza</span>
              <span class="text-sm text-slate-600">42% Full</span>
            </div>
            <div class="h-2 w-full rounded-full bg-slate-200">
              <div class="bg-green-500 h-2 rounded-full" style="width: 42%"></div>
            </div>
            <p class="mt-1 text-xs text-slate-500">84 / 200 spots occupied</p>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-slate-900">Airport Parking</span>
              <span class="text-sm text-slate-600">89% Full</span>
            </div>
            <div class="h-2 w-full rounded-full bg-slate-200">
              <div class="bg-red-500 h-2 rounded-full" style="width: 89%"></div>
            </div>
            <p class="mt-1 text-xs text-slate-500">445 / 500 spots occupied</p>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-slate-900">City Center</span>
              <span class="text-sm text-slate-600">55% Full</span>
            </div>
            <div class="h-2 w-full rounded-full bg-slate-200">
              <div class="bg-yellow-500 h-2 rounded-full" style="width: 55%"></div>
            </div>
            <p class="mt-1 text-xs text-slate-500">137 / 248 spots occupied</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const hourlyTraffic = [
  { time: '6AM', entry: 24, exit: 12 },
  { time: '8AM', entry: 42, exit: 20 },
  { time: '10AM', entry: 37, exit: 30 },
  { time: '12PM', entry: 50, exit: 35 },
  { time: '2PM', entry: 46, exit: 40 },
  { time: '4PM', entry: 54, exit: 44 },
  { time: '6PM', entry: 38, exit: 56 },
]

const maxHourlyTraffic = Math.max(...hourlyTraffic.map(item => Math.max(item.entry, item.exit)))

const ticketMix = [
  { label: 'Cars', value: 52, dot: 'bg-amber-400' },
  { label: 'Motorcycles', value: 30, dot: 'bg-slate-700' },
  { label: 'Vans / SUVs', value: 18, dot: 'bg-sky-400' },
]
</script>