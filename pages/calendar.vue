<template>
  <NuxtLayout>
    <div class="p-8 bg-gray-50 min-h-screen">
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Trip Scheduler</h1>
          <p class="text-gray-500 text-sm">Manage bus departures and terminal assignments.</p>
        </div>
        <div class="flex items-center bg-white shadow-sm rounded-xl p-1 border border-gray-200">
          <button class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition">Day</button>
          <button class="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg shadow-sm">Week</button>
          <button class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition">Month</button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 class="font-bold text-gray-800 mb-4">March 2026</h2>
            <div class="grid grid-cols-7 gap-2 text-center text-xs mb-2 text-gray-400 font-bold">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div class="grid grid-cols-7 gap-2 text-center text-sm">
              <span class="p-2 text-gray-300">24</span><span class="p-2 text-gray-300">25</span>
              <span class="p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition">1</span>
              <span class="p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition">2</span>
              <span class="p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition">3</span>
              <span class="p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition">4</span>
              <span class="p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition">5</span>
              <span class="p-2 bg-blue-600 text-white font-bold rounded-lg shadow-md">20</span>
              <span v-for="n in 10" :key="n" class="p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition">{{ n + 20 }}</span>
            </div>
          </div>

          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 class="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Legend</h3>
            <div class="space-y-3 text-sm">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                <span class="text-gray-600 font-medium">Full Capacity</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                <span class="text-gray-600 font-medium">Scheduled Trip</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <span class="text-gray-600 font-medium">Maintenance</span>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3 space-y-4">
          <div class="bg-white p-5 rounded-2xl shadow-sm border-l-8 border-l-blue-500 border border-gray-100 flex items-center justify-between hover:shadow-md transition">
            <div class="flex items-center gap-6">
              <div class="text-center min-w-[60px]">
                <div class="text-xl font-black text-gray-800">08:30</div>
                <div class="text-xs font-bold text-gray-400 uppercase">AM</div>
              </div>
              <div class="h-10 w-px bg-gray-200"></div>
              <div>
                <h4 class="font-bold text-gray-800">Davao to Butuan (Express)</h4>
                <p class="text-sm text-gray-500">Bus Unit: #BUS-2026-A | Driver: J. Galo</p>
              </div>
            </div>
            <div class="text-right">
              <span class="block text-sm font-bold text-blue-600">45/45 Seats Sold</span>
              <span class="text-xs text-gray-400">Gate 3 - North Terminal</span>
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl shadow-sm border-l-8 border-l-green-500 border border-gray-100 flex items-center justify-between hover:shadow-md transition">
            <div class="flex items-center gap-6">
              <div class="text-center min-w-[60px]">
                <div class="text-xl font-black text-gray-800">10:45</div>
                <div class="text-xs font-bold text-gray-400 uppercase">AM</div>
              </div>
              <div class="h-10 w-px bg-gray-200"></div>
              <div>
                <h4 class="font-bold text-gray-800">Davao to Cagayan de Oro</h4>
                <p class="text-sm text-gray-500">Bus Unit: #BUS-2026-B | Driver: Team Member</p>
              </div>
            </div>
            <div class="text-right">
              <span class="block text-sm font-bold text-green-600">12/45 Seats Sold</span>
              <span class="text-xs text-gray-400">Gate 1 - North Terminal</span>
            </div>
          </div>

          <div class="bg-gray-100 p-5 rounded-2xl shadow-sm border-l-8 border-l-red-500 border border-gray-200 flex items-center justify-between opacity-80">
            <div class="flex items-center gap-6">
              <div class="text-center min-w-[60px]">
                <div class="text-xl font-black text-gray-500">01:00</div>
                <div class="text-xs font-bold text-gray-400 uppercase">PM</div>
              </div>
              <div class="h-10 w-px bg-gray-300"></div>
              <div>
                <h4 class="font-bold text-gray-500 underline decoration-red-300">Fleet Maintenance Window</h4>
                <p class="text-sm text-gray-400">Garage: Davao Central Depot</p>
              </div>
            </div>
            <div class="text-right">
              <span class="block text-sm font-bold text-red-500 italic">SYSTEM OFFLINE</span>
              <span class="text-xs text-gray-400">Refueling & Safety Check</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>