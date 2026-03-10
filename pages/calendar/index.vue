<template>
    <NuxtLayout>
      <div class="p-6 md:p-8 bg-gray-50 min-h-screen">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Calendar</h1>
          <div class="flex gap-2">
            <button class="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">Today</button>
            <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">+ Add Event</button>
          </div>
        </div>
  
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="grid grid-cols-7 border-b border-gray-200">
            <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" 
                 class="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {{ day }}
            </div>
          </div>
  
          <div class="grid grid-cols-7 auto-rows-fr">
            <div v-for="date in 35" :key="date" 
                 class="min-h-[120px] p-2 border-b border-r border-gray-100 hover:bg-gray-50 transition">
              <span class="text-sm text-gray-700 font-medium">{{ date <= 31 ? date : '' }}</span>
              
              <div v-if="date === 12" class="mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded truncate">
                Client Meeting
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>