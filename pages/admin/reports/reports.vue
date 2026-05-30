<template>
  <div>
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Analytics Insights</h1>
        <p class="text-sm/6 text-gray-500 mt-1">Evaluate telemetry pipelines, operational yields, and network distribution trends.</p>
      </div>
      <div class="flex gap-3">
        <select class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6">
          <option>Billing Cycle (Current)</option>
          <option>Historical Baseline</option>
        </select>
        <button class="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm/6 font-medium text-gray-700 hover:bg-gray-50 shadow-sm whitespace-nowrap">Export Data</button>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
      <h2 class="text-base font-semibold text-gray-900 mb-6">Network Throughput Vector</h2>
      <div class="px-6 py-10 text-center text-sm/6 text-gray-400 border border-gray-100 rounded-md">
        [Telemetry Graph Plotting Area]
      </div>
    </div>

    <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100">
        <h2 class="text-base font-semibold text-gray-900">Operational Breakdown</h2>
      </div>
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-gray-200">
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Telemetry Node</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Observed Load</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Delta Variance</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="metric in metrics" :key="metric.label" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4 text-sm/6 font-medium text-gray-900">{{ metric.label }}</td>
            <td class="px-6 py-4 text-sm/6 text-gray-500">{{ metric.value }}</td>
            <td class="px-6 py-4 text-sm/6 font-semibold" :class="metric.isPositive ? 'text-green-600' : 'text-red-600'">
              {{ metric.change }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const metrics = [
  { label: 'Cluster Ingress Bandwidth', value: '84,912 p/s', change: '+14.2%', isPositive: true },
  { label: 'Pipeline Sync Overhead', value: '0.04ms', change: '-1.8%', isPositive: false },
  { label: 'Node Allocation Efficiency', value: '94.2%', change: '+2.5%', isPositive: true },
];
</script>