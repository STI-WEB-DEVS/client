<template>
    <NuxtLayout>
        <div class="p-6 bg-gray-50 min-h-screen">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <p class="text-sm text-gray-500 font-medium">{{ stat.label }}</p>
        <div class="flex items-end justify-between mt-2">
          <h3 class="text-2xl font-bold text-gray-800">{{ stat.value }}</h3>
          <span :class="stat.trendingUp ? 'text-green-600' : 'text-red-600'" class="text-xs font-semibold px-2 py-1 bg-opacity-10 rounded-full">
            {{ stat.change }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div class="space-y-4">
          <div v-for="item in activities" :key="item.id" class="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0">
            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <span class="text-lg">●</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-700">{{ item.title }}</p>
              <p class="text-xs text-gray-500">{{ item.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="font-bold text-gray-800 mb-4">Project Status</h3>
        <div class="relative pt-1">
          <div class="flex mb-2 items-center justify-between text-xs">
            <span class="font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              In Progress
            </span>
            <span class="text-blue-600 font-semibold">75%</span>
          </div>
          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
            <div style="width:75%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
          </div>
        </div>
        <button class="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition">
          Generate Report
        </button>
      </div>
      
    </div>
  </div>
    </NuxtLayout>
</template>
<script setup>
const stats = [
  { label: 'Total Revenue', value: '$24,500', change: '+12%', trendingUp: true },
  { label: 'Active Users', value: '1,204', change: '+5%', trendingUp: true },
  { label: 'Conversion Rate', value: '3.2%', change: '-2%', trendingUp: false },
  { label: 'Session Time', value: '4m 32s', change: '+18%', trendingUp: true },
]

const activities = [
  { id: 1, title: 'New user registered', time: '2 minutes ago' },
  { id: 2, title: 'Invoice #204 paid', time: '1 hour ago' },
  { id: 3, title: 'Server rebooted', time: '3 hours ago' },
  { id: 4, title: 'New comment on project "Apollo"', time: 'Yesterday' },
]
</script>