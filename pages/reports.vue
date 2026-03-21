<template>
  <NuxtLayout>
    <div class="p-8 bg-gray-50 min-h-screen text-gray-800">
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Financial Reports</h1>
          <p class="text-gray-500">Real-time data visualization of bus operations and revenue.</p>
        </div>
        <div class="flex gap-3">
          <button class="px-4 py-2 bg-white border rounded-lg text-sm font-semibold hover:bg-gray-50 shadow-sm">
            Export PDF
          </button>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-md transition">
            Generate Custom Report
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p class="text-sm font-bold text-gray-400 uppercase">Monthly Revenue</p>
          <h2 class="text-3xl font-black text-blue-600 mt-1">₱142,500</h2>
          <p class="text-xs text-green-500 font-bold mt-2">↑ 12% from last month</p>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p class="text-sm font-bold text-gray-400 uppercase">Tickets Issued</p>
          <h2 class="text-3xl font-black text-gray-800 mt-1">1,284</h2>
          <p class="text-xs text-gray-400 font-bold mt-2">Across all terminals</p>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p class="text-sm font-bold text-gray-400 uppercase">Active Buses</p>
          <h2 class="text-3xl font-black text-green-500 mt-1">18/20</h2>
          <p class="text-xs text-gray-400 font-bold mt-2">2 units in maintenance</p>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p class="text-sm font-bold text-gray-400 uppercase">System Uptime</p>
          <h2 class="text-3xl font-black text-purple-600 mt-1">99.9%</h2>
          <p class="text-xs text-purple-400 font-bold mt-2">Cloud Server: Active</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 class="font-bold text-xl mb-6">Top Performing Routes</h3>
          <div class="space-y-6">
            <div>
              <div class="flex justify-between mb-2">
                <span class="font-semibold text-gray-700">Davao ↔ Butuan</span>
                <span class="font-bold">₱52,000</span>
              </div>
              <div class="w-full bg-gray-100 h-4 rounded-full">
                <div class="bg-blue-500 h-4 rounded-full w-[85%] transition-all"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between mb-2">
                <span class="font-semibold text-gray-700">Davao ↔ CDO</span>
                <span class="font-bold">₱41,200</span>
              </div>
              <div class="w-full bg-gray-100 h-4 rounded-full">
                <div class="bg-green-500 h-4 rounded-full w-[70%] transition-all"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between mb-2">
                <span class="font-semibold text-gray-700">Davao ↔ Tagum</span>
                <span class="font-bold">₱28,400</span>
              </div>
              <div class="w-full bg-gray-100 h-4 rounded-full">
                <div class="bg-orange-400 h-4 rounded-full w-[50%] transition-all"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
          <h3 class="font-bold text-xl mb-4">Passenger Types</h3>
          <div class="relative w-40 h-40 rounded-full border-[12px] border-blue-600 border-t-green-500 border-r-orange-400 flex items-center justify-center mb-6 shadow-inner">
             <span class="text-2xl font-black text-gray-400">USERS</span>
          </div>
          <div class="grid grid-cols-2 gap-4 text-xs font-bold w-full">
            <div class="flex items-center gap-2"><div class="w-3 h-3 bg-blue-600 rounded"></div> Regular</div>
            <div class="flex items-center gap-2"><div class="w-3 h-3 bg-green-500 rounded"></div> Student</div>
            <div class="flex items-center gap-2"><div class="w-3 h-3 bg-orange-400 rounded"></div> Senior</div>
            <div class="flex items-center gap-2"><div class="w-3 h-3 bg-gray-300 rounded"></div> PWD</div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>