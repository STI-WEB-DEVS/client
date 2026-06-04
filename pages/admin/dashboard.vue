<template>
  <div class="flex h-screen bg-gradient-to-br from-gray-50 to-indigo-50 text-gray-800">

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">

      <!-- Topbar -->
      <header class="bg-white/80 backdrop-blur border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-semibold tracking-tight">Dashboard</h1>

        <div class="flex items-center gap-4">
          <input
            placeholder="Search..."
            class="px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />
          <div class="w-10 h-10 bg-indigo-500 rounded-full shadow-sm"></div>
        </div>
      </header>

      <!-- Content -->
      <main class="p-6 space-y-6 overflow-y-auto">

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <p class="text-sm text-gray-500">Revenue</p>
            <h2 class="text-3xl font-bold mt-2 text-gray-900">$12,340</h2>
            <span class="text-xs text-green-500 mt-1 inline-block">+8.2% this month</span>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <p class="text-sm text-gray-500">Users</p>
            <h2 class="text-3xl font-bold mt-2 text-gray-900">1,245</h2>
            <span class="text-xs text-indigo-500 mt-1 inline-block">+120 new users</span>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <p class="text-sm text-gray-500">Growth</p>
            <h2 class="text-3xl font-bold mt-2 text-green-500">+23%</h2>
            <span class="text-xs text-gray-400 mt-1 inline-block">Compared to last month</span>
          </div>

        </div>

        <!-- Chart Section -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-64 flex items-center justify-center text-gray-400">
          Chart Area (Integrate Chart.js / ApexCharts)
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold">Recent Activity</h2>
            <button class="text-sm text-indigo-600 hover:underline">
              View all
            </button>
          </div>

          <table class="w-full text-sm">
            <thead class="text-gray-400 border-b">
              <tr>
                <th class="pb-2 text-left">User</th>
                <th class="pb-2 text-left">Action</th>
                <th class="pb-2 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              <tr class="border-b hover:bg-gray-50 transition">
                <td class="py-3 flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-semibold">
                    P
                  </div>
                  Princess Fernando
                </td>
                <td>Logged in</td>
                <td class="text-gray-500">June 4, 2026</td>
              </tr>

              <tr class="border-b hover:bg-gray-50 transition">
                <td class="py-3 flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 text-xs font-semibold">
                    F
                  </div>
                  Fernando
                </td>
                <td>Updated Profile</td>
                <td class="text-gray-500">June 3, 2026</td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>
    </div>
  </div>
</template>