<template>
    <NuxtLayout>
      <div class="p-6 md:p-8 bg-gray-50 min-h-screen">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Reports</h1>
            <p class="text-gray-500 mt-1">Analyze performance metrics and generate custom insights.</p>
          </div>
          <div class="flex gap-3">
            <select class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
            </select>
            <button class="bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">Download PDF</button>
          </div>
        </div>
  
        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Performance Trend</h2>
          <div class="h-72 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
            [Line Chart Visualization Area]
          </div>
        </div>
  
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="font-semibold text-gray-900">Detailed Breakdown</h2>
          </div>
          <table class="w-full text-left">
            <thead class="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
              <tr>
                <th class="px-6 py-3">Metric</th>
                <th class="px-6 py-3">Current Value</th>
                <th class="px-6 py-3">Change</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="metric in metrics" :key="metric.label" class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm text-gray-900">{{ metric.label }}</td>
                <td class="px-6 py-4 text-sm text-gray-700">{{ metric.value }}</td>
                <td class="px-6 py-4 text-sm font-medium" :class="metric.isPositive ? 'text-green-600' : 'text-red-600'">
                  {{ metric.change }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </NuxtLayout>
  </template>
  
  <script setup>
  const metrics = [
    { label: 'Organic Search Traffic', value: '12,402', change: '+12.5%', isPositive: true },
    { label: 'Paid Advertising ROI', value: '4.2x', change: '-2.1%', isPositive: false },
    { label: 'Conversion Rate', value: '3.8%', change: '+0.5%', isPositive: true },
  ];
  </script>