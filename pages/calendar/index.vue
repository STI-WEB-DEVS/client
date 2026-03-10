<template>
  <NuxtLayout>
    <div class="mb-8 flex items-center justify-between border-b border-gray-100 pb-6">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 text-black">March 2026</h1>
        <p class="mt-2 text-sm text-gray-500 font-medium">Manage library events and reservation schedules.</p>
      </div>
      <div class="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-200">
        <button class="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"><ChevronLeftIcon class="size-5" /></button>
        <button class="px-4 py-1.5 text-sm font-bold bg-white shadow-sm rounded-lg">Today</button>
        <button class="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"><ChevronRightIcon class="size-5" /></button>
      </div>
    </div>

    <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div class="grid grid-cols-7 border-b border-gray-100 bg-gray-50 text-center text-xs font-bold uppercase tracking-widest text-gray-400">
        <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="py-3">
          {{ day }}
        </div>
      </div>

      <div class="grid grid-cols-7 text-sm">
        <div v-for="n in 31" :key="n" 
             class="relative min-h-[120px] border-b border-r border-gray-100 p-2 transition-colors hover:bg-gray-50/50">
          
          <time :class="[n === 10 ? 'bg-black text-white' : 'text-gray-900']" 
                class="flex h-7 w-7 items-center justify-center rounded-lg font-bold">
            {{ n }}
          </time>

          <div class="mt-2 space-y-1">
            <div v-for="event in getEventsForDay(n)" :key="event.id"
                 :class="eventStyles(event.type)"
                 class="truncate rounded-md px-2 py-1 text-[10px] font-bold shadow-sm">
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
  { id: 1, day: 10, title: 'Staff Meeting', type: 'internal' },
  { id: 2, day: 12, title: 'Kids Storytime', type: 'event' },
  { id: 3, day: 15, title: 'Book Club', type: 'event' },
  { id: 4, day: 15, title: 'System Maint.', type: 'urgent' },
  { id: 5, day: 22, title: 'Author Visit', type: 'event' },
]

const getEventsForDay = (day: number) => events.filter(e => e.day === day)

const eventStyles = (type: string) => {
  switch (type) {
    case 'event': return 'bg-blue-50 text-blue-700 border border-blue-100'
    case 'urgent': return 'bg-red-50 text-red-700 border border-red-100'
    case 'internal': return 'bg-gray-900 text-white'
    default: return 'bg-gray-50 text-gray-600'
  }
}
</script>