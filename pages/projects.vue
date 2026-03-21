<template>
  <NuxtLayout>
    <div class="p-8 bg-gray-50 min-h-screen">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">System Modules</h1>
          <p class="text-gray-500">Track the development progress of the Bus Ticketing System.</p>
        </div>
        <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-lg transition">
          + New Module
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div class="flex justify-between items-start mb-4">
            <div class="p-3 bg-blue-100 rounded-lg text-blue-600 text-2xl">🎫</div>
            <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">ACTIVE</span>
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-1">Ticketing System</h3>
          <p class="text-gray-500 text-sm mb-4 text-justify">Core module for seat selection, ticket generation, and real-time booking confirmation.</p>
          <div class="space-y-2">
            <div class="flex justify-between text-xs font-semibold text-gray-600">
              <span>Progress</span>
              <span>85%</span>
            </div>
            <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div class="bg-blue-600 h-full w-[85%]"></div>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div class="flex justify-between items-start mb-4">
            <div class="p-3 bg-green-100 rounded-lg text-green-600 text-2xl">🚌</div>
            <span class="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">IN PROGRESS</span>
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-1">Fleet Management</h3>
          <p class="text-gray-500 text-sm mb-4 text-justify">Monitoring bus health, maintenance schedules, and real-time GPS tracking integration.</p>
          <div class="space-y-2">
            <div class="flex justify-between text-xs font-semibold text-gray-600">
              <span>Progress</span>
              <span>45%</span>
            </div>
            <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div class="bg-green-500 h-full w-[45%]"></div>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div class="flex justify-between items-start mb-4">
            <div class="p-3 bg-purple-100 rounded-lg text-purple-600 text-2xl">📊</div>
            <span class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">PLANNED</span>
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-1">Admin Analytics</h3>
          <p class="text-gray-500 text-sm mb-4 text-justify">Visual reports for sales, passenger volume, and route popularity for management.</p>
          <div class="space-y-2">
            <div class="flex justify-between text-xs font-semibold text-gray-600">
              <span>Progress</span>
              <span>15%</span>
            </div>
            <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div class="bg-purple-500 h-full w-[15%]"></div>
            </div>
          </div>
        </div>

      </div>

      <div class="mt-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <h4 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Developed with</h4>
        <div class="flex gap-4 flex-wrap">
          <span class="px-4 py-2 bg-gray-100 rounded-lg text-gray-600 font-medium text-sm border border-gray-200">Nuxt 3</span>
          <span class="px-4 py-2 bg-gray-100 rounded-lg text-gray-600 font-medium text-sm border border-gray-200">Tailwind CSS</span>
          <span class="px-4 py-2 bg-gray-100 rounded-lg text-gray-600 font-medium text-sm border border-gray-200">TypeScript</span>
          <span class="px-4 py-2 bg-gray-100 rounded-lg text-gray-600 font-medium text-sm border border-gray-200">Vite</span>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>