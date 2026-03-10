<template>
    <NuxtLayout name="default">
      <div class="py-8 px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center border-b border-gray-200 pb-5 mb-8">
          <div class="sm:flex-auto">
            <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Event Calendar</h1>
            <p class="mt-2 text-sm text-gray-600">
              Upcoming schedules, ticket launch dates, and system maintenance windows.
            </p>
          </div>
          <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button type="button" class="block rounded-md bg-[#0f2573] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#1a3a8a]">
              Add Schedule
            </button>
          </div>
        </div>
  
        <div class="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl overflow-hidden">
          <ul role="list" class="divide-y divide-gray-100">
            <li v-for="event in calendarEvents" :key="event.id" class="flex items-center justify-between gap-x-6 py-5 px-6 hover:bg-gray-50 transition-colors">
              <div class="flex min-w-0 gap-x-4">
                <div class="flex-none w-16 h-16 rounded-lg bg-blue-50 flex flex-col items-center justify-center border border-blue-100">
                  <span class="text-[#0f2573] text-xs font-bold uppercase">{{ event.month }}</span>
                  <span class="text-xl font-black text-gray-900">{{ event.day }}</span>
                </div>
                <div class="min-w-0 flex-auto">
                  <p class="text-sm font-bold text-gray-900">{{ event.title }}</p>
                  <p class="mt-1 truncate text-xs text-gray-500">{{ event.description }}</p>
                </div>
              </div>
              <div class="flex flex-none items-center gap-x-4">
                <span :class="[
                  event.type === 'Launch' ? 'text-green-700 bg-green-50 ring-green-600/20' : 
                  event.type === 'Deadline' ? 'text-red-700 bg-red-50 ring-red-600/20' : 
                  'text-blue-700 bg-blue-50 ring-blue-600/20',
                  'hidden sm:inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'
                ]">
                  {{ event.type }}
                </span>
                <p class="text-sm font-medium text-gray-900">{{ event.time }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </NuxtLayout>
  </template>
  
  <script setup>
  // Static Schedule Data: Edit names, dates, and types here
  const calendarEvents = ref([
    {
      id: 1,
      title: 'Music Festival Early Bird Launch',
      description: 'Public ticket sales start for the Summer Music Festival.',
      month: 'MAR',
      day: '15',
      time: '09:00 AM',
      type: 'Launch'
    },
    {
      id: 2,
      title: 'Tech Summit Speaker Deadline',
      description: 'Final submission date for all keynote speaker abstracts.',
      month: 'MAR',
      day: '22',
      time: '05:00 PM',
      type: 'Deadline'
    },
    {
      id: 3,
      title: 'Database Maintenance',
      description: 'Scheduled system downtime for server optimization.',
      month: 'APR',
      day: '02',
      time: '01:00 AM',
      type: 'Maintenance'
    },
    {
      id: 4,
      title: 'Gala Seating Arrangement Finalization',
      description: 'Coordinating final floor plans for the Metropolitan Art Gala.',
      month: 'APR',
      day: '10',
      time: '10:30 AM',
      type: 'Task'
    }
  ])
  </script>