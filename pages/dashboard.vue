<template>
  <NuxtLayout>
    <div class="min-h-screen bg-[#F6F2EF] p-4 sm:p-6">
      <div class="mx-auto max-w-7xl space-y-6">
        <!-- Top Header -->
        <div class="rounded-3xl bg-gradient-to-r from-[#8F7A6E] to-[#6F5E54] px-6 py-6 text-white shadow-lg">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.25em] text-[#F3EFEC]">
                SmartPark Admin
              </p>
              <h1 class="mt-2 text-3xl font-bold">Dashboard Overview</h1>
              <p class="mt-2 text-sm text-[#EDE4DE]">
                Track parking usage, monitor live vehicle activity, and review lot occupancy.
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div v-for="stat in quickStats" :key="stat.label"
                class="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                <p class="text-xs text-[#F3EFEC]">{{ stat.label }}</p>
                <p class="mt-1 text-xl font-bold text-white">{{ stat.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Grid -->
        <div class="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <!-- Left -->
          <div class="space-y-6 xl:col-span-8">
            <!-- KPI cards -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div v-for="stat in stats" :key="stat.label"
                class="rounded-3xl border border-[#E7DFDA] bg-white p-5 shadow-sm">
                <p class="text-sm font-medium text-[#9A877B]">{{ stat.label }}</p>
                <h2 class="mt-3 text-3xl font-bold text-[#4E413A]">{{ stat.value }}</h2>
                <p class="mt-2 text-xs font-medium text-[#B09C91]">{{ stat.note }}</p>
              </div>
            </div>

            <!-- Traffic section -->
            <div class="rounded-3xl border border-[#E7DFDA] bg-white p-6 shadow-sm">
              <div class="mb-6 flex items-center justify-between">
                <div>
                  <h2 class="text-xl font-bold text-[#4E413A]">Hourly Traffic</h2>
                  <p class="text-sm text-[#9A877B]">Live entry and exit activity</p>
                </div>
                <div class="flex items-center gap-4 text-xs text-[#9A877B]">
                  <span class="inline-flex items-center gap-2">
                    <span class="h-2.5 w-2.5 rounded-full bg-[#BFA79A]"></span>
                    Entry
                  </span>
                  <span class="inline-flex items-center gap-2">
                    <span class="h-2.5 w-2.5 rounded-full bg-[#6F5E54]"></span>
                    Exit
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-7">
                <div v-for="item in hourlyTraffic" :key="item.time" class="rounded-2xl bg-[#FBF8F6] p-4">
                  <p class="text-sm font-semibold text-[#6F5E54]">{{ item.time }}</p>

                  <div class="mt-4 flex h-28 items-end justify-center gap-2">
                    <div class="w-4 rounded-t-md bg-[#BFA79A]"
                      :style="{ height: `${(item.entry / maxHourlyTraffic) * 100}%` }"></div>
                    <div class="w-4 rounded-t-md bg-[#6F5E54]"
                      :style="{ height: `${(item.exit / maxHourlyTraffic) * 100}%` }"></div>
                  </div>

                  <div class="mt-4 space-y-1 text-xs text-[#9A877B]">
                    <p>
                      Entry:
                      <span class="font-semibold text-[#6F5E54]">{{ item.entry }}</span>
                    </p>
                    <p>
                      Exit:
                      <span class="font-semibold text-[#6F5E54]">{{ item.exit }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Parking status -->
            <div class="rounded-3xl border border-[#E7DFDA] bg-white p-6 shadow-sm">
              <div class="mb-6">
                <h2 class="text-xl font-bold text-[#4E413A]">Parking Lot Status</h2>
                <p class="text-sm text-[#9A877B]">Current occupancy across active locations</p>
              </div>

              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div v-for="lot in parkingLots" :key="lot.name"
                  class="rounded-2xl border border-[#E7DFDA] bg-[#FBF8F6] p-4">
                  <div class="flex items-start justify-between">
                    <div>
                      <p class="text-base font-semibold text-[#4E413A]">{{ lot.name }}</p>
                      <p class="mt-1 text-xs text-[#9A877B]">
                        {{ lot.occupied }} / {{ lot.total }} spots occupied
                      </p>
                    </div>
                    <span class="rounded-full bg-[#EFE7E2] px-3 py-1 text-xs font-semibold text-[#6F5E54]">
                      {{ lot.percent }}%
                    </span>
                  </div>

                  <div class="mt-4 h-3 w-full rounded-full bg-[#E7DFDA]">
                    <div class="h-3 rounded-full" :class="lot.color" :style="{ width: `${lot.percent}%` }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right -->
          <div class="space-y-6 xl:col-span-4">
            <!-- Ticket mix -->
            <div class="rounded-3xl border border-[#E7DFDA] bg-white p-6 shadow-sm">
              <div class="mb-5">
                <h2 class="text-xl font-bold text-[#4E413A]">Ticket Mix</h2>
                <p class="text-sm text-[#9A877B]">Distribution by vehicle type</p>
              </div>

              <div class="space-y-4">
                <div v-for="ticket in ticketMix" :key="ticket.label" class="rounded-2xl bg-[#FBF8F6] p-4">
                  <div class="mb-2 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="h-3 w-3 rounded-full" :class="ticket.dot"></span>
                      <span class="text-sm font-medium text-[#6F5E54]">{{ ticket.label }}</span>
                    </div>
                    <span class="text-sm font-bold text-[#4E413A]">{{ ticket.value }}%</span>
                  </div>

                  <div class="h-2.5 w-full rounded-full bg-[#E7DFDA]">
                    <div class="h-2.5 rounded-full" :class="ticket.dot" :style="{ width: `${ticket.value}%` }"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent activity -->
            <div class="rounded-3xl border border-[#E7DFDA] bg-white p-6 shadow-sm">
              <div class="mb-5">
                <h2 class="text-xl font-bold text-[#4E413A]">Recent Activity</h2>
                <p class="text-sm text-[#9A877B]">Latest parking events</p>
              </div>

              <div class="space-y-3">
                <div v-for="activity in recentActivity" :key="activity.place + activity.time"
                  class="rounded-2xl bg-[#FBF8F6] p-4">
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex items-start gap-3">
                      <div class="mt-1 h-3 w-3 rounded-full"
                        :class="activity.type === 'Entry' ? 'bg-[#A7B19A]' : 'bg-[#C58F7B]'"></div>

                      <div>
                        <p class="text-sm font-semibold text-[#4E413A]">{{ activity.place }}</p>
                        <p class="mt-1 text-xs text-[#9A877B]">
                          Vehicle {{ activity.type.toLowerCase() }} • {{ activity.time }}
                        </p>
                      </div>
                    </div>

                    <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="activity.type === 'Entry'
                        ? 'bg-[#EEF3E8] text-[#6F7B63]'
                        : 'bg-[#F7ECE7] text-[#A66E5D]'
                      ">
                      {{ activity.type }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Summary panel -->
            <div class="rounded-3xl bg-gradient-to-b from-[#8F7A6E] to-[#6F5E54] p-6 text-white shadow-sm">
              <h2 class="text-xl font-bold">System Summary</h2>
              <div class="mt-5 space-y-4">
                <div class="flex items-center justify-between border-b border-white/10 pb-3">
                  <span class="text-sm text-[#EDE4DE]">Operational Lots</span>
                  <span class="font-semibold">4 / 4</span>
                </div>
                <div class="flex items-center justify-between border-b border-white/10 pb-3">
                  <span class="text-sm text-[#EDE4DE]">Peak Traffic Hour</span>
                  <span class="font-semibold">4PM</span>
                </div>
                <div class="flex items-center justify-between border-b border-white/10 pb-3">
                  <span class="text-sm text-[#EDE4DE]">Most Occupied Lot</span>
                  <span class="font-semibold">Airport Parking</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-[#EDE4DE]">Scan Accuracy</span>
                  <span class="font-semibold">98.7%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const quickStats = [
  { label: 'Lots', value: '4' },
  { label: 'Available', value: '378' },
  { label: 'Entries', value: '253' },
  { label: 'Exits', value: '219' },
]

const stats = [
  { label: 'Total Parking Spots', value: '1,248', note: '95% operational' },
  { label: 'Active Sessions', value: '342', note: '+12% from yesterday' },
  { label: "Today's Revenue", value: '₱18,420', note: '+8% from average' },
  { label: 'QR Scans Today', value: '687', note: 'Entry & Exit combined' },
]

const hourlyTraffic = [
  { time: '6AM', entry: 24, exit: 12 },
  { time: '8AM', entry: 42, exit: 20 },
  { time: '10AM', entry: 37, exit: 30 },
  { time: '12PM', entry: 50, exit: 35 },
  { time: '2PM', entry: 46, exit: 40 },
  { time: '4PM', entry: 54, exit: 44 },
  { time: '6PM', entry: 38, exit: 56 },
]

const maxHourlyTraffic = Math.max(
  ...hourlyTraffic.map(item => Math.max(item.entry, item.exit))
)

const parkingLots = [
  { name: 'Mall Parking', percent: 68, occupied: 204, total: 300, color: 'bg-[#C7A86D]' },
  { name: 'Downtown Plaza', percent: 42, occupied: 84, total: 200, color: 'bg-[#A7B19A]' },
  { name: 'Airport Parking', percent: 89, occupied: 445, total: 500, color: 'bg-[#C58F7B]' },
  { name: 'City Center', percent: 55, occupied: 137, total: 248, color: 'bg-[#BFA79A]' },
]

const ticketMix = [
  { label: 'Cars', value: 52, dot: 'bg-[#8F7A6E]' },
  { label: 'Motorcycles', value: 30, dot: 'bg-[#BFA79A]' },
  { label: 'Vans / SUVs', value: 18, dot: 'bg-[#C7A86D]' },
]

const recentActivity = [
  { place: 'Mall Parking - Level 3', type: 'Entry', time: '2 minutes ago' },
  { place: 'Downtown Plaza - A2', type: 'Exit', time: '5 minutes ago' },
  { place: 'Airport Parking - B1', type: 'Entry', time: '8 minutes ago' },
  { place: 'City Center - Level 2', type: 'Exit', time: '12 minutes ago' },
]
</script>