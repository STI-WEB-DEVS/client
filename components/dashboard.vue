<template>
  <div class="space-y-7">

    <!-- Section header -->
    <div class="flex items-center justify-between">
      <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest">Overview</p>
      <p class="text-[10px] font-sans text-stone-300 uppercase tracking-widest">This month</p>
    </div>

    <!-- Metric cards -->
    <div class="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
      <div v-for="metric in metrics" :key="metric.label" class="p-4 bg-white border rounded-sm border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-300 uppercase tracking-widest mb-2">{{ metric.label }}</p>
        <p class="font-serif text-2xl text-stone-900 font-normal tracking-tight leading-none mb-1.5">{{ metric.value }}</p>
        <p class="text-[11px] font-sans flex items-center gap-1" :class="metric.trend === 'up' ? 'text-green-700' : metric.trend === 'down' ? 'text-red-700' : 'text-stone-300'">
          <span v-if="metric.trend === 'up'">↑</span>
          <span v-else-if="metric.trend === 'down'">↓</span>
          {{ metric.delta }}
        </p>
      </div>
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 gap-2.5 lg:grid-cols-5">

      <!-- Bar chart -->
      <div class="p-5 bg-white border rounded-sm lg:col-span-3 border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-4">Monthly revenue</p>
        <div class="flex items-end gap-1.5 h-28">
          <div
            v-for="bar in chartBars"
            :key="bar.month"
            class="flex flex-col items-center flex-1 gap-1"
          >
            <div
              class="w-full transition-opacity rounded-sm hover:opacity-60"
              :class="bar.current ? 'bg-stone-900' : 'bg-stone-200'"
              :style="{ height: bar.height + '%' }"
            ></div>
            <span class="text-[9px] font-sans text-stone-300 uppercase tracking-wider">{{ bar.month }}</span>
          </div>
        </div>
      </div>

      <!-- Activity feed -->
      <div class="p-5 bg-white border rounded-sm lg:col-span-2 border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-3">Recent activity</p>
        <ul class="divide-y divide-stone-100">
          <li v-for="item in activity" :key="item.text" class="flex items-start gap-2.5 py-2.5">
            <span
              class="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
              :class="{
                'bg-green-600': item.type === 'success',
                'bg-amber-500': item.type === 'warning',
                'bg-stone-300': item.type === 'neutral',
              }"
            ></span>
            <div>
              <p class="font-sans text-xs leading-snug text-stone-900">{{ item.text }}</p>
              <p class="text-[10px] font-sans text-stone-300 mt-0.5">{{ item.time }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Projects table -->
    <div class="p-5 bg-white border rounded-sm border-stone-200">
      <div class="flex items-center justify-between mb-4">
        <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest">Active projects</p>
        <p class="text-[10px] font-sans text-stone-300 uppercase tracking-widest">6 of 38</p>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full font-sans text-xs" style="table-layout: fixed;">
          <thead>
            <tr class="border-b border-stone-200">
              <th class="text-left text-[10px] text-stone-300 uppercase tracking-widest font-medium pb-2.5 w-[30%]">Project</th>
              <th class="text-left text-[10px] text-stone-300 uppercase tracking-widest font-medium pb-2.5 w-[15%]">Status</th>
              <th class="text-left text-[10px] text-stone-300 uppercase tracking-widest font-medium pb-2.5 w-[15%]">Owner</th>
              <th class="text-left text-[10px] text-stone-300 uppercase tracking-widest font-medium pb-2.5 w-[15%]">Due</th>
              <th class="text-left text-[10px] text-stone-300 uppercase tracking-widest font-medium pb-2.5 w-[25%]">Progress</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100">
            <tr v-for="project in projects" :key="project.name" class="transition-colors hover:bg-stone-50">
              <td class="py-2.5 font-medium text-stone-900">{{ project.name }}</td>
              <td class="py-2.5">
                <span
                  class="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded-sm"
                  :class="{
                    'bg-green-50 text-green-700': project.status === 'Active',
                    'bg-amber-50 text-amber-700': project.status === 'Review',
                    'bg-stone-100 text-stone-500': project.status === 'Paused',
                  }"
                >{{ project.status }}</span>
              </td>
              <td class="py-2.5 text-stone-400">{{ project.owner }}</td>
              <td class="py-2.5 text-stone-400">{{ project.due }}</td>
              <td class="py-2.5">
                <div class="w-20 h-0.5 bg-stone-200 rounded-sm overflow-hidden">
                  <div class="h-full rounded-sm bg-stone-900" :style="{ width: project.progress + '%' }"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const metrics = [
  { label: 'Revenue', value: '$84.2k', delta: '+12.4%', trend: 'up' },
  { label: 'New users', value: '1,249', delta: '+8.1%', trend: 'up' },
  { label: 'Active projects', value: '38', delta: '— No change', trend: 'neutral' },
  { label: 'Churn rate', value: '2.4%', delta: '+0.3%', trend: 'down' },
]

const chartBars = [
  { month: 'Sep', height: 45, current: false },
  { month: 'Oct', height: 55, current: false },
  { month: 'Nov', height: 40, current: false },
  { month: 'Dec', height: 65, current: false },
  { month: 'Jan', height: 50, current: false },
  { month: 'Feb', height: 72, current: false },
  { month: 'Mar', height: 88, current: true },
]

const activity = [
  { text: 'New user signed up — Sarah M.', time: '2 min ago', type: 'success' },
  { text: 'Invoice #1042 pending approval', time: '18 min ago', type: 'warning' },
  { text: 'Project "Atlas" marked complete', time: '1 hr ago', type: 'success' },
  { text: 'Team meeting scheduled for 3 PM', time: '2 hr ago', type: 'neutral' },
  { text: 'Server utilization above 80%', time: '4 hr ago', type: 'warning' },
]

const projects = [
  { name: 'Atlas Redesign', status: 'Active', owner: 'Tom C.', due: 'Mar 28', progress: 82 },
  { name: 'API v3 Migration', status: 'Review', owner: 'Sarah M.', due: 'Apr 5', progress: 61 },
  { name: 'Marketing Site', status: 'Active', owner: 'James R.', due: 'Apr 12', progress: 44 },
  { name: 'Mobile App', status: 'Paused', owner: 'Lin W.', due: 'May 1', progress: 29 },
  { name: 'Data Warehouse', status: 'Active', owner: 'Tom C.', due: 'Apr 20', progress: 55 },
]
</script>