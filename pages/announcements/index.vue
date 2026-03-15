<template>
  <NuxtLayout>
    <h1 class="text-2xl font-bold mb-2" style="color: #1C3028;">Announcements</h1>
    <p class="text-gray-500 mb-8">Post updates and notices to all spa owners.</p>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-bold" style="color: #1C3028;">March 2025</h2>
        <div class="flex gap-2">
          <button class="px-3 py-1 rounded-lg border border-gray-200 text-sm hover:bg-gray-50">← Prev</button>
          <button class="px-3 py-1 rounded-lg border border-gray-200 text-sm hover:bg-gray-50">Next →</button>
        </div>
      </div>

      <div class="grid grid-cols-7 text-center text-xs font-semibold text-gray-400 mb-2">
        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      <div class="grid grid-cols-7 text-center gap-1">
        <div v-for="day in days" :key="day.id"
          class="rounded-lg py-2 text-sm cursor-pointer hover:opacity-80"
          :class="day.empty ? '' : 'border border-gray-100'"
          :style="day.hasEvent ? `background-color: ${day.color}; color: white;` : ''">
          <span v-if="!day.empty">{{ day.date }}</span>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <h2 class="text-lg font-bold mb-4" style="color: #1C3028;">Upcoming Appointments</h2>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          <div v-for="a in announcements" :key="a.id" class="p-6">
            <div class="flex items-center justify-between mb-1">
              <p class="font-semibold text-gray-900">{{ a.title }}</p>
              <span class="text-xs px-2 py-1 rounded-full text-white" :style="{ backgroundColor: a.tag === 'Update' ? '#1C3028' : a.tag === 'Maintenance' ? '#C9A96E' : a.tag === 'Feature' ? '#4a7c5e' : '#9ca3af' }">{{ a.tag }}</span>
            </div>
            <p class="text-sm text-gray-500 mb-2">{{ a.body }}</p>
            <p class="text-xs text-gray-400">{{ a.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const days = [
  ...Array(6).fill({ id: Math.random(), empty: true }),
  ...[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    .map(d => {
  const eventColors: Record<number, string> = {
    10: '#1C3028',
    8: '#C9A96E',
    28: '#4a7c5e',
    20: '#9ca3af',
  }
  return { id: d, date: d, empty: false, hasEvent: [10, 8, 28, 20].includes(d), color: eventColors[d] ?? '' }
})
]

const announcements = [
  { id: 1, title: 'v1.2 Now Live', body: 'Queue management improvements and bug fixes are now available.', date: 'Mar 10, 2025', tag: 'Update' },
  { id: 2, title: 'Scheduled Maintenance', body: 'The platform will be down on April 5 from 12AM to 2AM for server upgrades.', date: 'Mar 8, 2025', tag: 'Maintenance' },
  { id: 3, title: 'New Enterprise Features', body: 'Multi-branch support and advanced reporting are now available for Enterprise subscribers.', date: 'Feb 28, 2025', tag: 'Feature' },
  { id: 4, title: 'Holiday Reminder', body: 'Support hours will be limited during Holy Week. Please plan accordingly.', date: 'Feb 20, 2025', tag: 'Notice' },
]
</script>