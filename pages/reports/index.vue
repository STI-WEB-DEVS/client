<template>
    <NuxtLayout name="default">
      <div class="py-8 px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200 pb-5 mb-8">
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Sales Reports</h1>
          <p class="mt-2 text-sm text-gray-600">Real-time analytics for revenue and ticket distribution.</p>
        </div>
  
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div v-for="stat in stats" :key="stat.name" class="overflow-hidden rounded-xl bg-white px-4 py-5 shadow-sm ring-1 ring-gray-200 sm:p-6">
            <dt class="truncate text-sm font-medium text-gray-500">{{ stat.name }}</dt>
            <dd class="mt-1 text-3xl font-bold tracking-tight text-[#0f2573]">{{ stat.value }}</dd>
            <dd class="mt-1 text-xs font-semibold text-green-600">{{ stat.change }} from last month</dd>
          </div>
        </div>
  
        <div class="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200">
          <h3 class="text-base font-semibold text-gray-900 mb-4">Revenue by Event Category</h3>
          <div class="space-y-4">
            <div v-for="cat in categories" :key="cat.name">
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium text-gray-700">{{ cat.name }}</span>
                <span class="text-gray-900 font-bold">₱{{ cat.amount.toLocaleString() }}</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-4">
                <div class="bg-[#0f2573] h-4 rounded-full" :style="{ width: cat.percent + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>
  
  <script setup>
  const stats = ref([
    { name: 'Total Revenue', value: '₱1,240,500', change: '+12.5%' },
    { name: 'Active Tickets', value: '15,432', change: '+5.2%' },
    { name: 'Customer Retention', value: '84%', change: '+1.4%' },
    { name: 'Avg. Ticket Price', value: '₱2,500', change: '-2.1%' }
  ])
  
  const categories = ref([
    { name: 'Concerts', amount: 850000, percent: 70 },
    { name: 'Conferences', amount: 240500, percent: 20 },
    { name: 'Sports', amount: 150000, percent: 10 }
  ])
  </script>