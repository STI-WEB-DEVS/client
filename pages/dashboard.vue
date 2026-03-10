<template>
    <NuxtLayout>
      <div class="p-6 md:p-8 bg-gray-50 min-h-screen">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p class="text-gray-500 mt-1">Track your platform performance and key KPIs.</p>
        </div>
  
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div v-for="stat in stats" :key="stat.title" class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p class="text-sm font-medium text-gray-500">{{ stat.title }}</p>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl font-bold text-gray-900">{{ stat.value }}</span>
              <span class="text-sm font-medium" :class="stat.trend > 0 ? 'text-green-600' : 'text-red-600'">
                {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
              </span>
            </div>
          </div>
        </div>
  
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Traffic Overview</h2>
            <div class="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
              [Chart Placeholder]
            </div>
          </div>
  
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div class="space-y-6">
              <div v-for="i in 4" :key="i" class="flex gap-4">
                <div class="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                <div>
                  <p class="text-sm font-medium text-gray-900">New user registration</p>
                  <p class="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>
  
  <script setup>
  const stats = [
    { title: 'Total Revenue', value: '$45,231', trend: 12.5 },
    { title: 'Impressions', value: '1.2M', trend: 5.2 },
    { title: 'Click Rate', value: '4.8%', trend: -1.1 },
    { title: 'Sessions', value: '84,203', trend: 8.4 },
  ]
  </script>