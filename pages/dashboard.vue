<template>
  <NuxtLayout>
    <h1 class="text-2xl font-bold mb-1" style="color: #1C3028;">Dashboard</h1>
    <p class="text-gray-500 mb-8">Welcome back, Nika. Here's what's going on.</p>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <p class="text-sm text-gray-500">{{ stat.label }}</p>
        <p class="mt-1 text-3xl font-bold" style="color: #1C3028;">{{ stat.value }}</p>
        <p class="mt-1 text-xs" style="color: #C9A96E;">{{ stat.note }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

      <!-- Recent Activity -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-base font-bold mb-4" style="color: #1C3028;">Recent Activity</h2>
        <ul class="space-y-4">
          <li v-for="activity in activities" :key="activity.id" class="flex items-start gap-3">
            <div class="size-2 mt-2 rounded-full shrink-0" style="background-color: #C9A96E;"></div>
            <div>
              <p class="text-sm text-gray-800">{{ activity.text }}</p>
              <p class="text-xs text-gray-400">{{ activity.time }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Quick Links -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-base font-bold mb-4" style="color: #1C3028;">Quick Links</h2>
        <div class="space-y-2">
          <NuxtLink v-for="link in quickLinks" :key="link.label" :to="link.href"
            class="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 text-sm text-gray-700">
            <span>{{ link.label }}</span>
            <span style="color: #C9A96E;">→</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Latest Spa Owners + Charts -->
    <div class="grid grid-cols-3 gap-6 mb-8">
      <div class="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-base font-bold mb-4" style="color: #1C3028;">Latest Spa Owners</h2>
        <div class="divide-y divide-gray-100">
          <div class="grid grid-cols-4 text-xs font-semibold text-gray-400 uppercase pb-2">
            <span>Name</span><span>Plan</span><span>Joined</span><span>Status</span>
          </div>
          <div v-for="owner in spaOwners" :key="owner.id" class="grid grid-cols-4 text-sm text-gray-700 py-3">
            <span class="font-medium text-gray-900">{{ owner.name }}</span>
            <span>{{ owner.plan }}</span>
            <span>{{ owner.joined }}</span>
            <span class="font-semibold" :style="{ color: owner.active ? '#1C3028' : '#C9A96E' }">
              {{ owner.active ? 'Active' : 'Inactive' }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 class="text-sm font-bold mb-2" style="color: #1C3028;">owner Growth</h2>
          <Bar :data="barData" :options="barOptions" style="max-height: 130px;" />
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 class="text-sm font-bold mb-2" style="color: #1C3028;">Plan Distribution</h2>
          <Doughnut :data="doughnutData" :options="doughnutOptions" style="max-height: 130px;" />
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
    label: 'New Spa Owners',
    data: [18, 22, 25, 28, 34, 38],
    backgroundColor: '#1C3028',
    borderRadius: 6,
  }]
}

const barOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true } }
}

const doughnutData = {
  labels: ['Basic', 'Premium', 'Enterprise'],
  datasets: [{
    data: [15, 16, 7],
    backgroundColor: ['#C9A96E', '#1C3028', '#4a7c5e'],
    borderWidth: 0,
  }]
}

const doughnutOptions = {
  responsive: true,
  plugins: { legend: { position: 'bottom' as const } }
}

const stats = [
  { label: 'Active Spa Spa Owners', value: '38', note: '+4 this month' },
  { label: 'Monthly Revenue', value: '₱152,000', note: '+11% vs last month' },
  { label: 'Open Support Tickets', value: '5', note: 'Needs attention' },
  { label: 'Platform Uptime', value: '99.9%', note: 'Last 30 days' },
]

const activities = [
  { id: 1, text: 'Bliss Spa signed up for the Premium plan.', time: '2 hours ago' },
  { id: 2, text: 'Support ticket #012 was resolved.', time: '4 hours ago' },
  { id: 3, text: 'Aurora Spa & Wellness upgraded to Enterprise.', time: 'Yesterday' },
  { id: 4, text: 'v1.2 was successfully deployed to production.', time: 'Yesterday' },
  { id: 5, text: 'Lotus Beauty subscription was cancelled.', time: '2 days ago' },
]

const quickLinks = [
  { label: 'View Announcements', href: '/announcements' },
  { label: 'Manage Team', href: '/team' },
  { label: 'Subscriptions', href: '/subscriptions' },
  { label: 'System Settings', href: '/settings' },
]

const spaOwners = [
  { id: 1, name: 'Bliss Spa', plan: 'Premium', joined: 'Mar 2025', active: true },
  { id: 2, name: 'Serenity Wellness', plan: 'Enterprise', joined: 'Feb 2025', active: true },
  { id: 3, name: 'Zen Garden Spa', plan: 'Premium', joined: 'Nov 2024', active: true },
  { id: 4, name: 'Lotus Beauty', plan: 'Basic', joined: 'Oct 2024', active: false },
  { id: 5, name: 'Aurora Spa & Wellness', plan: 'Enterprise', joined: 'Mar 2025', active: true },
]
</script>