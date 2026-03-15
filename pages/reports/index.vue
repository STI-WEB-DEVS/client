<template>
  <NuxtLayout>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold" style="color: #1C3028;">Reports</h1>
        <p class="text-gray-500">Platform analytics and growth metrics.</p>
      </div>
      <span class="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">As of March 2025</span>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <p class="text-xs font-semibold uppercase tracking-widest text-gray-400">{{ stat.label }}</p>
        <p class="mt-2 text-3xl font-bold" style="color: #1C3028;">{{ stat.value }}</p>
        <p class="mt-1 text-xs" style="color: #C9A96E;">{{ stat.note }}</p>
      </div>
    </div>

    <!-- Chart + Plan Breakdown -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-base font-bold mb-4" style="color: #1C3028;">Monthly Spa Owners Growth</h2>
        <Bar :data="barData" :options="barOptions" style="max-height: 220px;" />
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-base font-bold mb-4" style="color: #1C3028;">Plan Breakdown</h2>
        <Doughnut :data="doughnutData" :options="doughnutOptions" style="max-height: 220px;" />
      </div>
    </div>

    <!-- spaowners Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 class="text-base font-bold" style="color: #1C3028;">Registered Spa Owners</h2>
        <span class="text-xs text-gray-400">{{ spaOwners.length }} total</span>
      </div>
      <div class="divide-y divide-gray-100">
        <div class="px-6 py-3 grid grid-cols-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
          <span>Spa Name</span><span>Plan</span><span>Joined</span><span>Status</span>
        </div>
        <div v-for="owner in spaOwners" :key="owner.id" class="px-6 py-4 grid grid-cols-4 text-sm text-gray-700 hover:bg-gray-50">
          <span class="font-medium text-gray-900">{{ owner.name }}</span>
          <span>
            <span class="px-2 py-0.5 rounded-full text-xs font-semibold text-white"
              :style="{ backgroundColor: owner.plan === 'Enterprise' ? '#1C3028' : owner.plan === 'Premium' ? '#C9A96E' : '#9ca3af' }">
              {{ owner.plan }}
            </span>
          </span>
          <span>{{ owner.joined }}</span>
          <span class="font-semibold" :style="{ color: owner.active ? '#1C3028' : '#C9A96E' }">
            {{ owner.active ? 'Active' : 'Inactive' }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Bar, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const barData = {
  labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
  datasets: [{
    label: 'Spa Owners',
    data: [18, 22, 25, 28, 34, 38],
    backgroundColor: '#1C3028',
    borderRadius: 6,
  }]
}

const barOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true, grid: { color: '#f3f4f6' } } }
}

const doughnutData = {
  labels: ['Basic', 'Premium', 'Enterprise'],
  datasets: [{
    data: [15, 16, 7],
    backgroundColor: ['#9ca3af', '#C9A96E', '#1C3028'],
    borderWidth: 0,
  }]
}

const doughnutOptions = {
  responsive: true,
  plugins: { legend: { position: 'bottom' as const } }
}

const stats = [
  { label: 'Total Spa Owners', value: '38', note: '+4 this month' },
  { label: 'Avg. Revenue / Spa Owner', value: '₱4,000', note: 'Per month' },
  { label: 'Churn Rate', value: '2.1%', note: '-0.3% vs last month' },
  { label: 'New Signups', value: '6', note: 'This month' },
]

const spaOwners = [
  { id: 1, name: 'Bliss Spa', plan: 'Premium', joined: 'Jan 2025', active: true },
  { id: 2, name: 'Serenity Wellness', plan: 'Basic', joined: 'Feb 2025', active: true },
  { id: 3, name: 'Zen Garden Spa', plan: 'Enterprise', joined: 'Nov 2024', active: true },
  { id: 4, name: 'Lotus Beauty', plan: 'Basic', joined: 'Oct 2024', active: false },
  { id: 5, name: 'Aurora Spa & Wellness', plan: 'Premium', joined: 'Mar 2025', active: true },
]
</script>