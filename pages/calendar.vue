<template>
  <NuxtLayout>
    <div class="mb-8 flex items-center justify-between border-b border-[#d0d4c9] pb-6">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-[#2d4123]">March 2026</h1>
        <p class="mt-2 text-sm text-gray-600 font-medium">Manage hiking events and schedules.</p>
      </div>
      <div class="flex items-center gap-2 bg-[#e6e5ce] p-1 rounded-xl border border-[#d0d4c9]">
        <button class="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all">
          <ChevronLeftIcon class="size-5 text-[#2d4123]" />
        </button>
        <button class="px-4 py-1.5 text-sm font-bold bg-white shadow-sm rounded-lg text-[#2d4123]">Today</button>
        <button class="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all">
          <ChevronRightIcon class="size-5 text-[#2d4123]" />
        </button>
      </div>
    </div>

    <div class="overflow-hidden rounded-2xl border border-[#d0d4c9] bg-[#e6e5ce] shadow-sm">
      <div class="grid grid-cols-7 border-b border-[#d0d4c9] bg-[#8FA38C] text-center text-xs font-bold uppercase tracking-widest text-white">
        <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="py-3">
          {{ day }}
        </div>
      </div>

      <div class="grid grid-cols-7 text-sm">
        <div
          v-for="n in 31"
          :key="n"
          class="relative min-h-[120px] border-b border-r border-[#d0d4c9] p-2 transition-colors hover:bg-[#f5f4e9]"
        >
          <time
            :class="[n === 10 ? 'bg-[#2d4123] text-white' : 'text-gray-900']"
            class="flex h-7 w-7 items-center justify-center rounded-lg font-bold"
          >
            {{ n }}
          </time>

          <div class="mt-2 space-y-1">
            <div
              v-for="event in getEventsForDay(n)"
              :key="event.id"
              :class="eventStyles(event.type)"
              class="truncate rounded-md px-2 py-1 text-[10px] font-bold shadow-sm"
            >
              {{ event.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

const events = [
  { id: 1, day: 10, title: 'Trail Committee Meeting', type: 'internal' },
  { id: 2, day: 12, title: 'Group Hike - Mt. Apo', type: 'event' },
  { id: 3, day: 15, title: 'Gear Check Workshop', type: 'event' },
  { id: 4, day: 15, title: 'Emergency Drill', type: 'urgent' },
  { id: 5, day: 22, title: 'Eco-Clean Trek', type: 'event' },
]

const getEventsForDay = (day: number) => events.filter(e => e.day === day)

const eventStyles = (type: string) => {
  switch (type) {
    case 'event':
      return 'bg-[#d0d4c9] text-[#2d4123] border border-[#bfc3b7]'
    case 'urgent':
      return 'bg-red-50 text-red-700 border border-red-100'
    case 'internal':
      return 'bg-[#2d4123] text-white'
    default:
      return 'bg-gray-50 text-gray-600'
  }
}
</script>
