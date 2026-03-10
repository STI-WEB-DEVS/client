<template>
  <NuxtLayout>
    <div class="mb-10 sm:flex sm:items-center sm:justify-between border-b border-gray-100 pb-6">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Analytics & Reports</h1>
        <p class="mt-2 text-sm text-gray-500 font-medium">Monitor library performance, circulation metrics, and inventory health.</p>
      </div>
      <div class="mt-4 flex gap-3 sm:mt-0">
        <select class="rounded-lg border-gray-200 bg-white px-4 py-2 text-sm font-semibold shadow-sm focus:ring-2 focus:ring-black outline-none cursor-pointer">
          <option>Last 30 Days</option>
          <option>Last Quarter</option>
          <option>Year to Date</option>
        </select>
        <button class="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-all active:scale-95">
          <DocumentArrowDownIcon class="mr-2 size-4" /> Download PDF
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
      <div v-for="stat in summaryStats" :key="stat.label" 
           class="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="p-2 rounded-lg bg-gray-50 text-gray-900 border border-gray-100">
            <component :is="stat.icon" class="size-5" />
          </div>
          <span :class="stat.trendUp ? 'text-green-600' : 'text-red-600'" class="text-xs font-bold">
            {{ stat.trendUp ? '↑' : '↓' }} {{ stat.trend }}
          </span>
        </div>
        <p class="text-sm font-bold text-gray-400 uppercase tracking-widest">{{ stat.label }}</p>
        <p class="text-3xl font-extrabold text-gray-900 mt-1">{{ stat.value }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 class="text-sm font-bold text-gray-900 mb-6">Circulation by Category</h3>
        <div class="space-y-5">
          <div v-for="cat in categories" :key="cat.name">
            <div class="flex items-center justify-between text-xs font-bold mb-1.5 uppercase tracking-wide">
              <span class="text-gray-500">{{ cat.name }}</span>
              <span class="text-gray-900">{{ cat.percentage }}%</span>
            </div>
            <div class="h-2 w-full rounded-full bg-gray-100">
              <div class="h-2 rounded-full bg-black transition-all duration-1000" :style="{ width: cat.percentage + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 class="text-sm font-bold text-gray-900">Generated Reports History</h3>
        </div>
        <table class="min-w-full divide-y divide-gray-200">
          <tbody class="divide-y divide-gray-100">
            <tr v-for="report in recentReports" :key="report.id" class="hover:bg-gray-50/50 transition-colors group">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded bg-gray-100 flex items-center justify-center mr-3">
                    <ChartBarIcon class="size-4 text-gray-900" />
                  </div>
                  <div>
                    <p class="text-sm font-bold text-gray-900">{{ report.name }}</p>
                    <p class="text-xs text-gray-500 font-medium">{{ report.date }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <button class="text-xs font-bold text-blue-600 hover:underline">Download CSV</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { 
  DocumentArrowDownIcon, 
  ArrowTrendingUpIcon, 
  BookOpenIcon, 
  UsersIcon, 
  ExclamationCircleIcon,
  ChartBarIcon
} from '@heroicons/vue/24/outline'

const summaryStats = [
  { label: 'Total Loans', value: '4,281', trend: '12%', trendUp: true, icon: BookOpenIcon },
  { label: 'New Members', value: '156', trend: '4%', trendUp: true, icon: UsersIcon },
  { label: 'Avg. Return Time', value: '8 Days', trend: '2 Days', trendUp: false, icon: ArrowTrendingUpIcon },
  { label: 'Lost Items', value: '12', trend: '0%', trendUp: true, icon: ExclamationCircleIcon },
]

const categories = [
  { name: 'Fiction', percentage: 42 },
  { name: 'Non-Fiction', percentage: 28 },
  { name: 'Childrens', percentage: 18 },
  { name: 'Academic', percentage: 12 },
]

const recentReports = [
  { id: 1, name: 'Monthly Inventory Audit - Q1', date: 'March 01, 2026' },
  { id: 2, name: 'Top 100 Borrowed Titles - 2025', date: 'February 15, 2026' },
  { id: 3, name: 'Staff Performance Overview', date: 'January 30, 2026' },
  { id: 4, name: 'Digital Resource Usage Report', date: 'January 05, 2026' },
]
</script>